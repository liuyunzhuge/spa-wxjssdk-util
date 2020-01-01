(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SpaWxjssdkUtil = factory());
}(this, (function () { 'use strict';

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _1_4_1_wxjssdkCopy = createCommonjsModule(function (module, exports) {
  !function (global, factory) {
       module.exports = factory(global) ;
  } (window,
  function(e, n) {
      function i(n, i, t) {
          e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i),
          function(e) {
              c(n, e, t);
          }) : u(n, t);
      }
      function t(n, i, t) {
          e.WeixinJSBridge ? WeixinJSBridge.on(n,
          function(e) {
              t && t.trigger && t.trigger(e),
              c(n, e, i);
          }) : t ? u(n, t) : u(n, i);
      }
      function o(e) {
          return e = e || {},
          e.appId = C.appId,
          e.verifyAppId = C.appId,
          e.verifySignType = "sha1",
          e.verifyTimestamp = C.timestamp + "",
          e.verifyNonceStr = C.nonceStr,
          e.verifySignature = C.signature,
          e
      }
      function r(e) {
          return {
              timeStamp: e.timestamp + "",
              nonceStr: e.nonceStr,
              package: e.package,
              paySign: e.paySign,
              signType: e.signType || "SHA1"
          }
      }
      function a(e) {
          return e.postalCode = e.addressPostalCode,
          delete e.addressPostalCode,
          e.provinceName = e.proviceFirstStageName,
          delete e.proviceFirstStageName,
          e.cityName = e.addressCitySecondStageName,
          delete e.addressCitySecondStageName,
          e.countryName = e.addressCountiesThirdStageName,
          delete e.addressCountiesThirdStageName,
          e.detailInfo = e.addressDetailInfo,
          delete e.addressDetailInfo,
          e
      }
      function c(e, n, i) {
          "openEnterpriseChat" == e && (n.errCode = n.err_code),
          delete n.err_code,
          delete n.err_desc,
          delete n.err_detail;
          var t = n.errMsg;
          t || (t = n.err_msg, delete n.err_msg, t = s(e, t), n.errMsg = t),
          (i = i || {})._complete && (i._complete(n), delete i._complete),
          t = n.errMsg || "",
          C.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
          var o = t.indexOf(":");
          switch (t.substring(o + 1)) {
          case "ok":
              i.success && i.success(n);
              break;
          case "cancel":
              i.cancel && i.cancel(n);
              break;
          default:
              i.fail && i.fail(n);
          }
          i.complete && i.complete(n);
      }
      function s(e, n) {
          var i = e,
          t = v[i];
          t && (i = t);
          var o = "ok";
          if (n) {
              var r = n.indexOf(":");
              "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
              "failed" == o && (o = "fail"),
              -1 != o.indexOf("failed_") && (o = o.substring(7)),
              -1 != o.indexOf("fail_") && (o = o.substring(5)),
              "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"),
              "config" == i && "function not exist" == o && (o = "ok"),
              "" == o && (o = "fail");
          }
          return n = i + ":" + o
      }
      function d(e) {
          if (e) {
              for (var n = 0,
              i = e.length; n < i; ++n) {
                  var t = e[n],
                  o = h[t];
                  o && (e[n] = o);
              }
              return e
          }
      }
      function u(e, n) {
          if (! (!C.debug || n && n.isInnerInvoke)) {
              var i = v[e];
              i && (e = i),
              n && n._complete && delete n._complete,
              console.log('"' + e + '",', n || "");
          }
      }
      function l(e) {
          if (! (k || w || C.debug || x < "6.0.2" || V.systemType < 0)) {
              var n = new Image;
              V.appId = C.appId,
              V.initTime = A.initEndTime - A.initStartTime,
              V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime,
              N.getNetworkType({
                  isInnerInvoke: !0,
                  success: function(e) {
                      V.networkType = e.networkType;
                      var i = "https://open.weixin.qq.com/sdk/report?v=" + V.version + "&o=" + V.isPreVerifyOk + "&s=" + V.systemType + "&c=" + V.clientVersion + "&a=" + V.appId + "&n=" + V.networkType + "&i=" + V.initTime + "&p=" + V.preVerifyTime + "&u=" + V.url;
                      n.src = i;
                  }
              });
          }
      }
      function p() {
          return (new Date).getTime()
      }
      function f(n) {
          T && (e.WeixinJSBridge ? n() : S.addEventListener && S.addEventListener("WeixinJSBridgeReady", n, !1));
      }
      function m() {
          N.invoke || (N.invoke = function(n, i, t) {
              e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t);
          },
          N.on = function(n, i) {
              e.WeixinJSBridge && WeixinJSBridge.on(n, i);
          });
      }
      function g(e) {
          if ("string" == typeof e && e.length > 0) {
              var n = e.split("?")[0],
              i = e.split("?")[1];
              return n += ".html",
              void 0 !== i ? n + "?" + i: n
          }
      }
      if (!e.jWeixin) {
          var h = {
              config: "preVerifyJSAPI",
              onMenuShareTimeline: "menu:share:timeline",
              onMenuShareAppMessage: "menu:share:appmessage",
              onMenuShareQQ: "menu:share:qq",
              onMenuShareWeibo: "menu:share:weiboApp",
              onMenuShareQZone: "menu:share:QZone",
              previewImage: "imagePreview",
              getLocation: "geoLocation",
              openProductSpecificView: "openProductViewWithPid",
              addCard: "batchAddCard",
              openCard: "batchViewCard",
              chooseWXPay: "getBrandWCPayRequest",
              openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
              startSearchBeacons: "startMonitoringBeacons",
              stopSearchBeacons: "stopMonitoringBeacons",
              onSearchBeacons: "onBeaconsInRange",
              consumeAndShareCard: "consumedShareCard",
              openAddress: "editAddress"
          },
          v = function() {
              var e = {};
              for (var n in h) e[h[n]] = n;
              return e
          } (),
          S = e.document,
          I = S.title,
          y = navigator.userAgent.toLowerCase(),
          _ = navigator.platform.toLowerCase(),
          k = !(!_.match("mac") && !_.match("win")),
          w = -1 != y.indexOf("wxdebugger"),
          T = -1 != y.indexOf("micromessenger"),
          M = -1 != y.indexOf("android"),
          P = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"),
          x = function() {
              var e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/);
              return e ? e[1] : ""
          } (),
          A = {
              initStartTime: p(),
              initEndTime: 0,
              preVerifyStartTime: 0,
              preVerifyEndTime: 0
          },
          V = {
              version: 1,
              appId: "",
              initTime: 0,
              preVerifyTime: 0,
              networkType: "",
              isPreVerifyOk: 1,
              systemType: P ? 1 : M ? 2 : -1,
              clientVersion: x,
              url: encodeURIComponent(location.href)
          },
          C = {},
          L = {
              _completes: []
          },
          B = {
              state: 0,
              data: {}
          };
          f(function() {
              A.initEndTime = p();
          });
          var O = !1,
          E = [],
          N = {
              config: function(e) {
                  C = e,
                  u("config", e);
                  var n = !1 !== C.check;
                  f(function() {
                      if (n) i(h.config, {
                          verifyJsApiList: d(C.jsApiList)
                      },
                      function() {
                          L._complete = function(e) {
                              A.preVerifyEndTime = p(),
                              B.state = 1,
                              B.data = e;
                          },
                          L.success = function(e) {
                              V.isPreVerifyOk = 0;
                          },
                          L.fail = function(e) {
                              L._fail ? L._fail(e) : B.state = -1;
                          };
                          var e = L._completes;
                          return e.push(function() {
                              l();
                          }),
                          L.complete = function(n) {
                              if(L._complete_non_official) {
                                  L._complete_non_official(B.state === 1, B.data);
                              }
                              for (var i = 0,
                              t = e.length; i < t; ++i) e[i]();
                              L._completes = [];
                          },
                          L
                      } ()),
                      A.preVerifyStartTime = p();
                      else {
                          B.state = 1;
                          for (var e = L._completes,
                          t = 0,
                          o = e.length; t < o; ++t) e[t]();
                          L._completes = [];
                      }
                  }),
                  m();
              },
              ready: function(e) {
                  0 != B.state ? e() : (L._completes.push(e), !T && C.debug && e());
              },
              error: function(e) {
                  x < "6.0.2" || ( - 1 == B.state ? e(B.data) : L._fail = e);
              },
              complete: function(e) {
                  L._complete_non_official = e;
              },
              checkJsApi: function(e) {
                  var n = function(e) {
                      var n = e.checkResult;
                      for (var i in n) {
                          var t = v[i];
                          t && (n[t] = n[i], delete n[i]);
                      }
                      return e
                  };
                  i("checkJsApi", {
                      jsApiList: d(e.jsApiList)
                  },
                  (e._complete = function(e) {
                      if (M) {
                          var i = e.checkResult;
                          i && (e.checkResult = JSON.parse(i));
                      }
                      e = n(e);
                  },
                  e));
              },
              onMenuShareTimeline: function(e) {
                  t(h.onMenuShareTimeline, {
                      complete: function() {
                          i("shareTimeline", {
                              title: e.title || I,
                              desc: e.title || I,
                              img_url: e.imgUrl || "",
                              link: e.link || location.href,
                              type: e.type || "link",
                              data_url: e.dataUrl || ""
                          },
                          e);
                      }
                  },
                  e);
              },
              onMenuShareAppMessage: function(e) {
                  t(h.onMenuShareAppMessage, {
                      complete: function(n) {
                          "favorite" === n.scene ? i("sendAppMessage", {
                              title: e.title || I,
                              desc: e.desc || "",
                              link: e.link || location.href,
                              img_url: e.imgUrl || "",
                              type: e.type || "link",
                              data_url: e.dataUrl || ""
                          }) : i("sendAppMessage", {
                              title: e.title || I,
                              desc: e.desc || "",
                              link: e.link || location.href,
                              img_url: e.imgUrl || "",
                              type: e.type || "link",
                              data_url: e.dataUrl || ""
                          },
                          e);
                      }
                  },
                  e);
              },
              onMenuShareQQ: function(e) {
                  t(h.onMenuShareQQ, {
                      complete: function() {
                          i("shareQQ", {
                              title: e.title || I,
                              desc: e.desc || "",
                              img_url: e.imgUrl || "",
                              link: e.link || location.href
                          },
                          e);
                      }
                  },
                  e);
              },
              onMenuShareWeibo: function(e) {
                  t(h.onMenuShareWeibo, {
                      complete: function() {
                          i("shareWeiboApp", {
                              title: e.title || I,
                              desc: e.desc || "",
                              img_url: e.imgUrl || "",
                              link: e.link || location.href
                          },
                          e);
                      }
                  },
                  e);
              },
              onMenuShareQZone: function(e) {
                  t(h.onMenuShareQZone, {
                      complete: function() {
                          i("shareQZone", {
                              title: e.title || I,
                              desc: e.desc || "",
                              img_url: e.imgUrl || "",
                              link: e.link || location.href
                          },
                          e);
                      }
                  },
                  e);
              },
              updateTimelineShareData: function(e) {
                  i("updateTimelineShareData", {
                      title: e.title,
                      link: e.link,
                      imgUrl: e.imgUrl
                  },
                  e);
              },
              updateAppMessageShareData: function(e) {
                  i("updateAppMessageShareData", {
                      title: e.title,
                      desc: e.desc,
                      link: e.link,
                      imgUrl: e.imgUrl
                  },
                  e);
              },
              startRecord: function(e) {
                  i("startRecord", {},
                  e);
              },
              stopRecord: function(e) {
                  i("stopRecord", {},
                  e);
              },
              onVoiceRecordEnd: function(e) {
                  t("onVoiceRecordEnd", e);
              },
              playVoice: function(e) {
                  i("playVoice", {
                      localId: e.localId
                  },
                  e);
              },
              pauseVoice: function(e) {
                  i("pauseVoice", {
                      localId: e.localId
                  },
                  e);
              },
              stopVoice: function(e) {
                  i("stopVoice", {
                      localId: e.localId
                  },
                  e);
              },
              onVoicePlayEnd: function(e) {
                  t("onVoicePlayEnd", e);
              },
              uploadVoice: function(e) {
                  i("uploadVoice", {
                      localId: e.localId,
                      isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                  },
                  e);
              },
              downloadVoice: function(e) {
                  i("downloadVoice", {
                      serverId: e.serverId,
                      isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                  },
                  e);
              },
              translateVoice: function(e) {
                  i("translateVoice", {
                      localId: e.localId,
                      isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                  },
                  e);
              },
              chooseImage: function(e) {
                  i("chooseImage", {
                      scene: "1|2",
                      count: e.count || 9,
                      sizeType: e.sizeType || ["original", "compressed"],
                      sourceType: e.sourceType || ["album", "camera"]
                  },
                  (e._complete = function(e) {
                      if (M) {
                          var n = e.localIds;
                          try {
                              n && (e.localIds = JSON.parse(n));
                          } catch(e) {}
                      }
                  },
                  e));
              },
              getLocation: function(e) {},
              previewImage: function(e) {
                  i(h.previewImage, {
                      current: e.current,
                      urls: e.urls
                  },
                  e);
              },
              uploadImage: function(e) {
                  i("uploadImage", {
                      localId: e.localId,
                      isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                  },
                  e);
              },
              downloadImage: function(e) {
                  i("downloadImage", {
                      serverId: e.serverId,
                      isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                  },
                  e);
              },
              getLocalImgData: function(e) { ! 1 === O ? (O = !0, i("getLocalImgData", {
                      localId: e.localId
                  },
                  (e._complete = function(e) {
                      if (O = !1, E.length > 0) {
                          var n = E.shift();
                          wx.getLocalImgData(n);
                      }
                  },
                  e))) : E.push(e);
              },
              getNetworkType: function(e) {
                  var n = function(e) {
                      var n = e.errMsg;
                      e.errMsg = "getNetworkType:ok";
                      var i = e.subtype;
                      if (delete e.subtype, i) e.networkType = i;
                      else {
                          var t = n.indexOf(":"),
                          o = n.substring(t + 1);
                          switch (o) {
                          case "wifi":
                          case "edge":
                          case "wwan":
                              e.networkType = o;
                              break;
                          default:
                              e.errMsg = "getNetworkType:fail";
                          }
                      }
                      return e
                  };
                  i("getNetworkType", {},
                  (e._complete = function(e) {
                      e = n(e);
                  },
                  e));
              },
              openLocation: function(e) {
                  i("openLocation", {
                      latitude: e.latitude,
                      longitude: e.longitude,
                      name: e.name || "",
                      address: e.address || "",
                      scale: e.scale || 28,
                      infoUrl: e.infoUrl || ""
                  },
                  e);
              },
              getLocation: function(e) {
                  e = e || {},
                  i(h.getLocation, {
                      type: e.type || "wgs84"
                  },
                  (e._complete = function(e) {
                      delete e.type;
                  },
                  e));
              },
              hideOptionMenu: function(e) {
                  i("hideOptionMenu", {},
                  e);
              },
              showOptionMenu: function(e) {
                  i("showOptionMenu", {},
                  e);
              },
              closeWindow: function(e) {
                  i("closeWindow", {},
                  e = e || {});
              },
              hideMenuItems: function(e) {
                  i("hideMenuItems", {
                      menuList: e.menuList
                  },
                  e);
              },
              showMenuItems: function(e) {
                  i("showMenuItems", {
                      menuList: e.menuList
                  },
                  e);
              },
              hideAllNonBaseMenuItem: function(e) {
                  i("hideAllNonBaseMenuItem", {},
                  e);
              },
              showAllNonBaseMenuItem: function(e) {
                  i("showAllNonBaseMenuItem", {},
                  e);
              },
              scanQRCode: function(e) {
                  i("scanQRCode", {
                      needResult: (e = e || {}).needResult || 0,
                      scanType: e.scanType || ["qrCode", "barCode"]
                  },
                  (e._complete = function(e) {
                      if (P) {
                          var n = e.resultStr;
                          if (n) {
                              var i = JSON.parse(n);
                              e.resultStr = i && i.scan_code && i.scan_code.scan_result;
                          }
                      }
                  },
                  e));
              },
              openAddress: function(e) {
                  i(h.openAddress, {},
                  (e._complete = function(e) {
                      e = a(e);
                  },
                  e));
              },
              openProductSpecificView: function(e) {
                  i(h.openProductSpecificView, {
                      pid: e.productId,
                      view_type: e.viewType || 0,
                      ext_info: e.extInfo
                  },
                  e);
              },
              addCard: function(e) {
                  for (var n = e.cardList,
                  t = [], o = 0, r = n.length; o < r; ++o) {
                      var a = n[o],
                      c = {
                          card_id: a.cardId,
                          card_ext: a.cardExt
                      };
                      t.push(c);
                  }
                  i(h.addCard, {
                      card_list: t
                  },
                  (e._complete = function(e) {
                      var n = e.card_list;
                      if (n) {
                          for (var i = 0,
                          t = (n = JSON.parse(n)).length; i < t; ++i) {
                              var o = n[i];
                              o.cardId = o.card_id,
                              o.cardExt = o.card_ext,
                              o.isSuccess = !!o.is_succ,
                              delete o.card_id,
                              delete o.card_ext,
                              delete o.is_succ;
                          }
                          e.cardList = n,
                          delete e.card_list;
                      }
                  },
                  e));
              },
              chooseCard: function(e) {
                  i("chooseCard", {
                      app_id: C.appId,
                      location_id: e.shopId || "",
                      sign_type: e.signType || "SHA1",
                      card_id: e.cardId || "",
                      card_type: e.cardType || "",
                      card_sign: e.cardSign,
                      time_stamp: e.timestamp + "",
                      nonce_str: e.nonceStr
                  },
                  (e._complete = function(e) {
                      e.cardList = e.choose_card_info,
                      delete e.choose_card_info;
                  },
                  e));
              },
              openCard: function(e) {
                  for (var n = e.cardList,
                  t = [], o = 0, r = n.length; o < r; ++o) {
                      var a = n[o],
                      c = {
                          card_id: a.cardId,
                          code: a.code
                      };
                      t.push(c);
                  }
                  i(h.openCard, {
                      card_list: t
                  },
                  e);
              },
              consumeAndShareCard: function(e) {
                  i(h.consumeAndShareCard, {
                      consumedCardId: e.cardId,
                      consumedCode: e.code
                  },
                  e);
              },
              chooseWXPay: function(e) {
                  i(h.chooseWXPay, r(e), e);
              },
              openEnterpriseRedPacket: function(e) {
                  i(h.openEnterpriseRedPacket, r(e), e);
              },
              startSearchBeacons: function(e) {
                  i(h.startSearchBeacons, {
                      ticket: e.ticket
                  },
                  e);
              },
              stopSearchBeacons: function(e) {
                  i(h.stopSearchBeacons, {},
                  e);
              },
              onSearchBeacons: function(e) {
                  t(h.onSearchBeacons, e);
              },
              openEnterpriseChat: function(e) {
                  i("openEnterpriseChat", {
                      useridlist: e.userIds,
                      chatname: e.groupName
                  },
                  e);
              },
              launchMiniProgram: function(e) {
                  i("launchMiniProgram", {
                      targetAppId: e.targetAppId,
                      path: g(e.path),
                      envVersion: e.envVersion
                  },
                  e);
              },
              miniProgram: {
                  navigateBack: function(e) {
                      e = e || {},
                      f(function() {
                          i("invokeMiniProgramAPI", {
                              name: "navigateBack",
                              arg: {
                                  delta: e.delta || 1
                              }
                          },
                          e);
                      });
                  },
                  navigateTo: function(e) {
                      f(function() {
                          i("invokeMiniProgramAPI", {
                              name: "navigateTo",
                              arg: {
                                  url: e.url
                              }
                          },
                          e);
                      });
                  },
                  redirectTo: function(e) {
                      f(function() {
                          i("invokeMiniProgramAPI", {
                              name: "redirectTo",
                              arg: {
                                  url: e.url
                              }
                          },
                          e);
                      });
                  },
                  switchTab: function(e) {
                      f(function() {
                          i("invokeMiniProgramAPI", {
                              name: "switchTab",
                              arg: {
                                  url: e.url
                              }
                          },
                          e);
                      });
                  },
                  reLaunch: function(e) {
                      f(function() {
                          i("invokeMiniProgramAPI", {
                              name: "reLaunch",
                              arg: {
                                  url: e.url
                              }
                          },
                          e);
                      });
                  },
                  postMessage: function(e) {
                      f(function() {
                          i("invokeMiniProgramAPI", {
                              name: "postMessage",
                              arg: e.data || {}
                          },
                          e);
                      });
                  },
                  getEnv: function(n) {
                      f(function() {
                          n({
                              miniprogram: "miniprogram" === e.__wxjs_environment
                          });
                      });
                  }
              }
          },
          b = 1,
          R = {};
          return S.addEventListener("error",
          function(e) {
              if (!M) {
                  var n = e.target,
                  i = n.tagName,
                  t = n.src;
                  if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
                      e.preventDefault(),
                      e.stopPropagation();
                      var o = n["wx-id"];
                      if (o || (o = b++, n["wx-id"] = o), R[o]) return;
                      R[o] = !0,
                      wx.ready(function() {
                          wx.getLocalImgData({
                              localId: t,
                              success: function(e) {
                                  n.src = e.localData;
                              }
                          });
                      });
                  }
              }
          },
          !0),
          S.addEventListener("load",
          function(e) {
              if (!M) {
                  var n = e.target,
                  i = n.tagName;
                  n.src;
                  if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
                      var t = n["wx-id"];
                      t && (R[t] = !1);
                  }
              }
          },
          !0),
          n && (e.wx = e.jWeixin = N),
          N
      }
  });
  });

  function noop() {}

  function getHref() {
    return location$1.href.split('#')[0];
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
    return window.__wxjs_environment === 'miniprogram' || /miniprogram/i.test(navigator$1.userAgent);
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

      classCallCheck(this, SignTask);

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

    createClass(SignTask, [{
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
          logInfo.apply(void 0, toConsumableArray(logs));
        }

        logInfo({
          url: this.url || this.signData.url,
          signData: this.signData
        });
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
            // save url
            _this.signData.url = _this.url;
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
    _1_4_1_wxjssdkCopy.config(call.config);
  }

  var WX_CONFIG_CALLS = [];
  var LAST_RESOLVED_CONFIG = {}; // wx.complete is not official
  // it is added by wxjssdk-copy

  _1_4_1_wxjssdkCopy.complete(function (state, data) {
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
      task.reject(error, 'error occurs in wx.config:');
    } // this is not necessary~, I use it for some tests.


    return wxConfig();
  });

  var SignTaskManager =
  /*#__PURE__*/
  function () {
    function SignTaskManager() {
      classCallCheck(this, SignTaskManager);

      this.current = null;
    }

    createClass(SignTaskManager, [{
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
    if (signData && LAST_RESOLVED_CONFIG && LAST_RESOLVED_CONFIG.timestamp === signData.timestamp && LAST_RESOLVED_CONFIG.signature === signData.signature && (Date.now() / 1000 | 0) - LAST_RESOLVED_CONFIG.signedAt <= WxjssdkUtil.defaults.signatureValidTime) {
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
      classCallCheck(this, WxjssdkUtil);

      this.signData = null;
    }

    createClass(WxjssdkUtil, [{
      key: "ready",
      value: function ready(callback) {
        var _this3 = this;

        var next;

        if (!IS_WECHAT) {
          next = Promise.reject(new Error('Non wechat client.'));
        } else if (this.signData) {
          if (checkSignDataValidState(this.signData)) {
            next = Promise.resolve(this.signData);
          } else {
            next = request(this.signData)["catch"](function (error) {
              if (errorOfInvalidSignature(error)) {
                return request(null);
              }

              return Promise.reject(error);
            });
          }
        } else {
          next = request(null);
        }

        next.then(function (res) {
          _this3.signData = res;
          callback(_1_4_1_wxjssdkCopy);
        })["catch"](function (error) {
          callback(null);

          if (errorOfInvalidSignature(error)) {
            return Promise.reject(error);
          }
        });
      }
    }]);

    return WxjssdkUtil;
  }();

  var _window = window,
      navigator$1 = _window.navigator,
      location$1 = _window.location;
  var IS_IOS = /(iphone|ipad|ipod)/i.test(navigator$1.userAgent);
  var LOGGER = 'spa-wxjssdk-util';
  var LANDING_URL = getHref();
  var IS_WECHAT = /MicroMessenger/i.test(navigator$1.userAgent);
  var SIGN_TASK_STATE = {
    PENDING: 0,
    RESOLVED: 1,
    REJECTED: 2
  };
  var taskManager = new SignTaskManager(); // as official docs says, signature has an valid time, but we do not know how long it is, en......
  // so signatureValidTime is not a reliable option

  WxjssdkUtil.defaults = {
    signatureValidTime: 3600,
    // avoid unnecessary sign task
    debug: false,
    // Directly used in `wx.config({debug:...})`
    jsApiList: [],
    // Directly used in `wx.config({jsApiList:...})`
    request: null // A callback that should return a promise to provider other `wx.config` data

  };
  WxjssdkUtil.wx = _1_4_1_wxjssdkCopy;

  return WxjssdkUtil;

})));
