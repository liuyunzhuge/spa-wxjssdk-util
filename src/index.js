import wx from 'wxjssdk-copy'

function noop () {
}

function getHref () {
    return location.href.split('#')[0]
}

function isObjectType (param, type) {
    return Object.prototype.toString.call(param) === `[object ${type}]`
}

function getLandingUrl () {
    return LANDING_URL
}

function logInfo (...args) {
    console.info(...args)
}

function logGroup (...args) {
    console.group(`[${LOGGER}]`, ...args)
}

function logGroupEnd (...args) {
    console.groupEnd()
}

function isMiniProgram () {
    return window.__wxjs_environment === 'miniprogram' || /miniprogram/i.test(navigator.userAgent)
}

// iOS and miniProgram using landing page for the first-time signature,
// if it fails, fallback to use current page and retry;
// other environment works in the opposite order.
function getSignUrl (times) {
    if (isMiniProgram() || IS_IOS) {
        return times === 1 ? getLandingUrl() : getHref()
    } else {
        return times === 1 ? getHref() : getLandingUrl()
    }
}

class SignTask {
    constructor ({ url, success = noop, fail = noop, request, debug, jsApiList, signData = null } = {}) {
        this.url = url
        this.state = SIGN_TASK_STATE.PENDING
        this.success = success
        this.fail = fail
        this.request = request
        this.debug = debug
        this.jsApiList = jsApiList
        this.signData = signData
        this._sign()
    }

    getUrl () {
        return this.url
    }

    cancel () {
        this.reject(new Error('canceled'))
    }

    isPending () {
        return this.state === SIGN_TASK_STATE.PENDING
    }

    _finish (state, res, logs) {
        let method = state === SIGN_TASK_STATE.RESOLVED ? 'success' : 'fail'
        this[method](res)
        this.state = state
        logGroup(`sign task finished, config result: ${method}`)
        if (logs) {
            logInfo(...logs)
        }
        logInfo({
            url: this.url || this.signData.url,
            signData: this.signData
        })
        logGroupEnd()
    }

    resolve () {
        if (this.state !== SIGN_TASK_STATE.PENDING) {
            return
        }

        this._finish(SIGN_TASK_STATE.RESOLVED, this.signData)
    }

    reject (error, logPrefix) {
        if (this.state !== SIGN_TASK_STATE.PENDING) {
            return
        }

        let err = error
        if (!(err instanceof Error)) {
            err = new Error(error)
        }
        let args = [err.message]
        if (logPrefix) {
            args.unshift(logPrefix)
        }
        this._finish(SIGN_TASK_STATE.REJECTED, err, args)
    }

    _sign () {
        let promise
        if (this.signData) {
            promise = Promise.resolve(this.signData)
        } else {
            if (!isObjectType(this.request, 'Function')) {
                return this.reject('WxjssdkUtil.defaults.request must be set with a function.')
            }

            promise = this.request(this.url)
            if (!(promise instanceof Promise)) {
                return this.reject('WxjssdkUtil.defaults.request must return an promise.')
            }
        }

        promise.then((data) => {
                // in case that self has been canceled
                if (!this.isPending()) {
                    return
                }

                if (!data) {
                    return this.reject(`data resolved in WxjssdkUtil.defaults.request can not be empty.`)
                }

                if (!isObjectType(data, 'Object')) {
                    return this.reject(`data resolved in WxjssdkUtil.defaults.request is not an object.`)
                }

                let configKeys = ['appId', 'timestamp', 'nonceStr', 'signature']
                let config = {
                    debug: this.debug,
                    jsApiList: this.jsApiList
                }
                let notContains = []

                configKeys.forEach(key => {
                    if (!(key in data)) {
                        notContains.push(key)
                    }
                    config[key] = data[key]
                })

                if (notContains.length) {
                    return this.reject(new Error(`data resolved in WxjssdkUtil.defaults.request doesn't contains [${
                        notContains.join(',')}] fields.`))
                }

                this.signData = data
                if (this.url) {
                    // save url
                    this.signData.url = this.url
                }

                // wx.config is also asynchronous, need to deal with case that self has been canceled
                // use a queue to make serialized wx.config calls
                WX_CONFIG_CALLS.push({
                    task: this,
                    config: config,
                    pending: false
                })

                wxConfig()
            }
        ).catch(err => {
            this.reject(err, 'error occurs in WxjssdkUtil.defaults.request:')
        })
    }
}

function wxConfig () {
    if (WX_CONFIG_CALLS.length === 0) return
    let call = WX_CONFIG_CALLS[0]

    if (call.pending) return
    call.pending = true
    wx.config(call.config)
}

const WX_CONFIG_CALLS = []
const LAST_RESOLVED_CONFIG = {}

// wx.complete is not official
// it is added by wxjssdk-copy
wx.complete((state, data) => {
    let call = WX_CONFIG_CALLS.shift()

    let task = call.task
    if (!task.isPending()) {
        return wxConfig()
    }

    if (state) {
        LAST_RESOLVED_CONFIG.signature = call.config.signature
        LAST_RESOLVED_CONFIG.timestamp = call.config.timestamp
        LAST_RESOLVED_CONFIG.signedAt = Date.now() / 1000 | 0
        task.resolve()
    } else {
        let error = new Error(data.errMsg)
        task.reject(error, 'error occurs in wx.config:')
    }

    // this is not necessary~, I use it for some tests.
    return wxConfig()
})

class SignTaskManager {
    constructor () {
        this.current = null
    }

    create ({ url, signData }) {
        let old = this.promise

        this.promise = new Promise((resolve, reject) => {
            if (this.current && this.current.isPending()) {
                // avoid unnecessary sign request
                if (url && this.current.getUrl() === url) {
                    return resolve(old)
                }

                this.current.cancel()
            }

            this.current = new SignTask({
                url,
                signData,
                success: resolve,
                fail: reject,
                request: WxjssdkUtil.defaults.request,
                debug: WxjssdkUtil.defaults.debug,
                jsApiList: WxjssdkUtil.defaults.jsApiList
            })
        })

        return this.promise
    }
}

function errorOfInvalidSignature (error) {
    return error &&
        (error instanceof Error) &&
        error.message.indexOf('invalid signature') > -1
}

function checkSignDataValidState (signData) {
    if (signData && LAST_RESOLVED_CONFIG &&
        LAST_RESOLVED_CONFIG.timestamp === signData.timestamp &&
        LAST_RESOLVED_CONFIG.signature === signData.signature &&
        ((Date.now() / 1000 | 0) - LAST_RESOLVED_CONFIG.signedAt) <= WxjssdkUtil.defaults.signatureValidTime
    ) {
        return true
    }

    return false
}

function request (signData) {
    return taskManager.create({
        url: signData ? '' : getSignUrl(1),
        signData: signData
    }).catch(error => {
        if (errorOfInvalidSignature(error)) {
            // retry
            return taskManager.create({
                url: signData ? '' : getSignUrl(2),
                signData: signData
            })
        }

        return Promise.reject(error)
    })
}

class WxjssdkUtil {
    constructor () {
        this.signData = null
    }

    ready (callback) {
        let next
        if (!IS_WECHAT) {
            next = Promise.reject(new Error('Non wechat client.'))
        } else if (this.signData) {
            if (checkSignDataValidState(this.signData)) {
                next = Promise.resolve(this.signData)
            } else {
                next = request(this.signData).catch(error => {
                    if (errorOfInvalidSignature(error)) {
                        return request(null)
                    }

                    return Promise.reject(error)
                })
            }
        } else {
            next = request(null)
        }

        next.then(res => {
            this.signData = res
            callback(wx)
        }).catch((error) => {
            callback(null)
            if (errorOfInvalidSignature(error)) {
                return Promise.reject(error)
            }
        })
    }
}

const { navigator, location } = window
const IS_IOS = /(iphone|ipad|ipod)/i.test(navigator.userAgent)
const LOGGER = 'spa-wxjssdk-util'
const LANDING_URL = getHref()
const IS_WECHAT = /MicroMessenger/i.test(navigator.userAgent)
const SIGN_TASK_STATE = {
    PENDING: 0,
    RESOLVED: 1,
    REJECTED: 2
}
const taskManager = new SignTaskManager()

// as official docs says, signature has an valid time, but we do not know how long it is, en......
// so signatureValidTime is not a reliable option
WxjssdkUtil.defaults = {
    signatureValidTime: 3600, // avoid unnecessary sign task
    debug: false, // Directly used in `wx.config({debug:...})`
    jsApiList: [], // Directly used in `wx.config({jsApiList:...})`
    request: null // A callback that should return a promise to provider other `wx.config` data
}

WxjssdkUtil.wx = wx

export default WxjssdkUtil
