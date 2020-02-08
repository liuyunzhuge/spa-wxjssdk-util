# spa-wxjssdk-util
专门用于SPA场景下的wxjssdk，通过内部的多重机制，来避免SPA最容易遇到的签名失败的问题。

0.2.0已经发布，在使用20来天之后，签名失败的情况仍会出现，但是概率很小。

## 安装
```
npm install spa-wxjssdk-util --save
npm install wxjssdk-copy --save
```

## 使用
app级别的配置:
```js
SpaWxjssdkUtil.defaults.debug = false
SpaWxjssdkUtil.defaults.jsApiList = [
    'checkJsApi',
    'openLocation',
    'onMenuShareTimeline',
    'onMenuShareAppMessage'
]
SpaWxjssdkUtil.defaults.request = function (url) {
    let _ajax = (appUtil && appUtil.ajax) || Ajax
    return _ajax.get(Service.weixin_jssdk_sign, {
        url: url
    }).then((res) => {
        if (res.code === 200) {
            return res.data
        }
    })
}
SpaWxjssdkUtil.defaults.onSignInvalid = function (error, info) {
    ErrorReporter.makeReport(error, 'invalid sign', info)
}
```
所有配置项及含义如下：
* ignoreRejectedState

    {boolean|default: true}

    在`SpaWxjssdkUtil`内部用`Promise`来处理异步状态，某些逻辑会触发`rejected`状态，如果不想要这个状态，就把这个`option`配置为`true`，避免控制台反复看到`unhandled promise`之类的错误。

* signExpiresIn

    {number|default: 5400}

    单位：秒。从官方文档看到说微信jssdk的签名数据是有过期时间的，但是并不清楚过期时间是多少，5400只是一个猜测值。在同一个页面访问状态下，如果签名获取成功了，则签名状态会缓存起来，缓存的失效就是`signExpiresIn`指定的时长，在这个时长内，通过`SpaWxjssdkUtil.prototype.ready`发生的调用，都不会再进行签名请求。

* debug

    这个值将会被直接应用于官方wxjssdk的`wx.config({debug: ...})`的调用中。

* jsApiList

    将会被直接应用于官方wxjssdk的`wx.config({jsApiList: ...})`的调用中。

* request

    {Promise|default: null}

    通过这个option指定当前单页app用来进行签名数据后端请求的任务，需要返回一个`Promise`实例。

* onSignInvalid

    {function|default: noop}

    签名失败的回调函数，可以利用它做一些数据上报。

**注意**
`request`返回的`promise`应该`resolve`以下的数据结构：
```js
appId: "..."
nonceStr: "..."
signature: "17001437758c36bbda4be3e0b4b4dffaf8ce3803"
timestamp: 1581129406
```

页面级使用：
```js
let wxjssdkUtil = new SpaWxjssdkUtil()

wxjssdkUtil.ready(wx => {
    if (wx) {
        let shareData = {/*imgUrl link title desc*/};
        wx.onMenuShareTimeline(shareData)
        wx.onMenuShareAppMessage(shareData)
    }
})
```

用起来很简单，就是先构造一个`SpaWxjssdkUtil`实例，然后利用这个实例提供的`ready`方法去使用官方wxjssdk的api:`ready`方法接收一个回调函数，这个回调函数，会把官方wxjssdk的`wx`对象传入，如果传入的`wx`对象为空，则说明`wx`对象获取失败，通常都是签名失败导致的。

这个实例，在单页场景中，最好一个`route`对应的页面实例里面，能单独持有一份，因为SpaWxjssdkUtil实例，内部会缓存签名状态。