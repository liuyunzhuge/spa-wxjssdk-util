import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import wx from 'wxjssdk-copy';

function noop() {}

function getHref() {
  return location.href.split('#')[0];
}

function isObjectType(param, type) {
  return Object.prototype.toString.call(param) === "[object ".concat(type, "]");
}

function getLandingUrl() {
  return LANDING_URL;
}

function logInfo() {
  var _console;

  (_console = console).info.apply(_console, arguments);
}

function logGroup() {
  var _console2;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (_console2 = console).group.apply(_console2, ["[".concat(LOGGER, "]")].concat(args));
}

function logGroupEnd() {
  console.groupEnd();
}

function isMiniProgram() {
  return window.__wxjs_environment === 'miniprogram' || /miniprogram/i.test(navigator.userAgent);
} // iOS and miniProgram using landing page for the first-time signature,
// if it fails, fallback to use current page and retry;
// other environment works in the opposite order.


function getSignUrl(times) {
  if (isMiniProgram() || IS_IOS) {
    return times === 1 ? getLandingUrl() : getHref();
  } else {
    return times === 1 ? getHref() : getLandingUrl();
  }
}

var SignTask =
/*#__PURE__*/
function () {
  function SignTask() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        url = _ref.url,
        _ref$success = _ref.success,
        success = _ref$success === void 0 ? noop : _ref$success,
        _ref$fail = _ref.fail,
        fail = _ref$fail === void 0 ? noop : _ref$fail,
        request = _ref.request,
        debug = _ref.debug,
        jsApiList = _ref.jsApiList,
        _ref$signData = _ref.signData,
        signData = _ref$signData === void 0 ? null : _ref$signData;

    _classCallCheck(this, SignTask);

    this.url = url;
    this.state = SIGN_TASK_STATE.PENDING;
    this.success = success;
    this.fail = fail;
    this.request = request;
    this.debug = debug;
    this.jsApiList = jsApiList;
    this.signData = signData;

    this._sign();
  }

  _createClass(SignTask, [{
    key: "getUrl",
    value: function getUrl() {
      return this.url;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.reject(new Error('canceled'));
    }
  }, {
    key: "isPending",
    value: function isPending() {
      return this.state === SIGN_TASK_STATE.PENDING;
    }
  }, {
    key: "_finish",
    value: function _finish(state, res, logs) {
      var method = state === SIGN_TASK_STATE.RESOLVED ? 'success' : 'fail';
      this[method](res);
      this.state = state;
      logGroup("sign task finished, config result: ".concat(method));

      if (logs) {
        logInfo.apply(void 0, _toConsumableArray(logs));
      }

      logInfo(this.signData || {});
      logGroupEnd();
    }
  }, {
    key: "resolve",
    value: function resolve() {
      if (this.state !== SIGN_TASK_STATE.PENDING) {
        return;
      }

      this._finish(SIGN_TASK_STATE.RESOLVED, this.signData);
    }
  }, {
    key: "reject",
    value: function reject(error, logPrefix) {
      if (this.state !== SIGN_TASK_STATE.PENDING) {
        return;
      }

      var err = error;

      if (!(err instanceof Error)) {
        err = new Error(error);
      }

      var args = [err.message];

      if (logPrefix) {
        args.unshift(logPrefix);
      }

      this._finish(SIGN_TASK_STATE.REJECTED, err, args);
    }
  }, {
    key: "_sign",
    value: function _sign() {
      var _this = this;

      var promise;

      if (this.signData) {
        promise = Promise.resolve(this.signData);
      } else {
        if (!isObjectType(this.request, 'Function')) {
          return this.reject('WxjssdkUtil.defaults.request must be set with a function.');
        }

        promise = this.request(this.url);

        if (!(promise instanceof Promise)) {
          return this.reject('WxjssdkUtil.defaults.request must return an promise.');
        }
      }

      promise.then(function (data) {
        // in case that self has been canceled
        if (!_this.isPending()) {
          return;
        }

        if (!data) {
          return _this.reject("data resolved in WxjssdkUtil.defaults.request can not be empty.");
        }

        if (!isObjectType(data, 'Object')) {
          return _this.reject("data resolved in WxjssdkUtil.defaults.request is not an object.");
        }

        var configKeys = ['appId', 'timestamp', 'nonceStr', 'signature'];
        var config = {
          debug: _this.debug,
          jsApiList: _this.jsApiList
        };
        var notContains = [];
        configKeys.forEach(function (key) {
          if (!(key in data)) {
            notContains.push(key);
          }

          config[key] = data[key];
        });

        if (notContains.length) {
          return _this.reject(new Error("data resolved in WxjssdkUtil.defaults.request doesn't contains [".concat(notContains.join(','), "] fields.")));
        }

        _this.signData = data;

        if (_this.url) {
          // save sign url
          _this.signData.signUrl = _this.url;
        } // wx.config is also asynchronous, need to deal with case that self has been canceled
        // use a queue to make serialized wx.config calls


        WX_CONFIG_CALLS.push({
          task: _this,
          config: config,
          pending: false
        });
        wxConfig();
      })["catch"](function (err) {
        _this.reject(err, 'error occurs in WxjssdkUtil.defaults.request:');
      });
    }
  }]);

  return SignTask;
}();

function wxConfig() {
  if (WX_CONFIG_CALLS.length === 0) return;
  var call = WX_CONFIG_CALLS[0];
  if (call.pending) return;
  call.pending = true;
  wx.config(call.config);
}

var WX_CONFIG_CALLS = [];
var LAST_RESOLVED_CONFIG = {};
var LAST_REJECTED_CONFIG = {}; // wx.complete is not official
// it is added by wxjssdk-copy

wx.complete(function (state, data) {
  var call = WX_CONFIG_CALLS.shift();
  var task = call.task;

  if (!task.isPending()) {
    return wxConfig();
  }

  if (state) {
    LAST_RESOLVED_CONFIG.signature = call.config.signature;
    LAST_RESOLVED_CONFIG.timestamp = call.config.timestamp;
    LAST_RESOLVED_CONFIG.signedAt = Date.now() / 1000 | 0;
    task.resolve();
  } else {
    var error = new Error(data.errMsg);
    LAST_REJECTED_CONFIG.signData = task.signData;
    task.reject(error, 'error occurs in wx.config:');
  } // this is not necessary~, I use it for some tests.


  return wxConfig();
});

var SignTaskManager =
/*#__PURE__*/
function () {
  function SignTaskManager() {
    _classCallCheck(this, SignTaskManager);

    this.current = null;
  }

  _createClass(SignTaskManager, [{
    key: "create",
    value: function create(_ref2) {
      var _this2 = this;

      var url = _ref2.url,
          signData = _ref2.signData;
      var old = this.promise;
      this.promise = new Promise(function (resolve, reject) {
        if (_this2.current && _this2.current.isPending()) {
          // avoid unnecessary sign request
          if (url && _this2.current.getUrl() === url) {
            return resolve(old);
          }

          _this2.current.cancel();
        }

        _this2.current = new SignTask({
          url: url,
          signData: signData,
          success: resolve,
          fail: reject,
          request: WxjssdkUtil.defaults.request,
          debug: WxjssdkUtil.defaults.debug,
          jsApiList: WxjssdkUtil.defaults.jsApiList
        });
      });
      return this.promise;
    }
  }]);

  return SignTaskManager;
}();

function errorOfInvalidSignature(error) {
  return error && error instanceof Error && error.message.indexOf('invalid signature') > -1;
}

function checkSignDataValidState(signData) {
  if (signData && LAST_RESOLVED_CONFIG && LAST_RESOLVED_CONFIG.timestamp === signData.timestamp && LAST_RESOLVED_CONFIG.signature === signData.signature && (Date.now() / 1000 | 0) - LAST_RESOLVED_CONFIG.signedAt <= WxjssdkUtil.defaults.signExpiresIn) {
    return true;
  }

  return false;
}

function request(signData) {
  return taskManager.create({
    url: signData ? '' : getSignUrl(1),
    signData: signData
  })["catch"](function (error) {
    if (errorOfInvalidSignature(error)) {
      // retry
      return taskManager.create({
        url: signData ? '' : getSignUrl(2),
        signData: signData
      });
    }

    return Promise.reject(error);
  });
}

var WxjssdkUtil =
/*#__PURE__*/
function () {
  function WxjssdkUtil() {
    _classCallCheck(this, WxjssdkUtil);

    this.signData = null;
  }

  _createClass(WxjssdkUtil, [{
    key: "ready",
    value: function ready(callback) {
      var _this3 = this;

      var next;
      var source;

      if (!IS_WECHAT) {
        next = Promise.reject(new Error('Non wechat client.'));
      } else if (this.signData) {
        if (checkSignDataValidState(this.signData)) {
          source = 'checkSignDataValidState:true';
          next = Promise.resolve(this.signData);
        } else {
          source = 'checkSignDataValidState:false';
          next = request(this.signData)["catch"](function (error) {
            if (errorOfInvalidSignature(error)) {
              source = 'request(signData):invalid';
              return request(null);
            }

            return Promise.reject(error);
          });
        }
      } else {
        source = 'request(null)';
        next = request(null);
      }

      return next.then(function (res) {
        _this3.signData = res;
        callback(wx);
        return wx;
      })["catch"](function (error) {
        callback();

        if (errorOfInvalidSignature(error)) {
          WxjssdkUtil.defaults.onSignInvalid(error, {
            source: source,
            landingUrl: getLandingUrl(),
            currentUrl: getHref(),
            signData: LAST_REJECTED_CONFIG.signData
          });
        }

        if (!WxjssdkUtil.defaults.ignoreRejectedState) {
          return Promise.reject(error);
        }
      });
    }
  }]);

  return WxjssdkUtil;
}();

var _window = window,
    navigator = _window.navigator,
    location = _window.location;
var IS_IOS = /(iphone|ipad|ipod)/i.test(navigator.userAgent);
var LOGGER = 'spa-wxjssdk-util';
var LANDING_URL = getHref();
var IS_WECHAT = /MicroMessenger/i.test(navigator.userAgent);
var SIGN_TASK_STATE = {
  PENDING: 0,
  RESOLVED: 1,
  REJECTED: 2
};
var taskManager = new SignTaskManager(); // as official docs says, signature has an valid time, but we do not know how long it is, en......
// so signExpiresIn is not a reliable option

WxjssdkUtil.defaults = {
  ignoreRejectedState: true,
  signExpiresIn: 3600,
  // avoid unnecessary sign task
  debug: false,
  // Directly used in `wx.config({debug:...})`
  jsApiList: [],
  // Directly used in `wx.config({jsApiList:...})`
  request: null,
  // A callback that should return a promise to provider other `wx.config` data,
  onSignInvalid: noop
};

export default WxjssdkUtil;
