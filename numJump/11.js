define("js/widget/account_sgs", ["jquery"], function (a) {
    return function (b, c) {
        function d() {
            a(c.divTip).css({left: parseInt(b.offset().left + 1) + "px", top: parseInt(b.offset().top + 30) + "px"})
        }

        function e() {
            setTimeout(function () {
                a(c.divTip).hide()
            }, 200)
        }

        function f() {
            setTimeout(function () {
                a(c.divTip).children("[data-active=yes]").length && (d(), a(c.divTip).show())
            }, 200)
        }

        function g(d) {
            if (38 !== d && 40 !== d && 13 !== d) {
                var g = b.val(), h = "", j = /@/, k = new RegExp(g.substring(g.indexOf("@")));
                "" == g ? e() : j.test(g) ? (a(c.divTip).children().each(function (b) {
                    var c = a(this).attr("email");
                    b && j.test(g) && (h = g.substring(g.indexOf("@"), 0), a(this).text(h + c), k.test(a(this).attr("email")) ? a(this).show().attr("data-active", "yes") : (a(this).hide().removeAttr("data-active"), i = 0))
                }), console.log("height:" + a(c.divTip).height()), a(c.divTip).height() < 25 ? (console.log("hide~~"), a(c.divTip).children("li").eq(0).hide()) : a(c.divTip).children("li").eq(0).show(), a(c.divTip).children("[data-active=yes]").length || a(c.divTip).hide(), f()) : e()
            }
        }

        function h(b) {
            var d, e = a(c.divTip).children("li.active[name='show']");
            "up" == b ? (d = e.prevAll('li[name="show"][data-active="yes"]:first'), d.length || (d = a(c.divTip).children("li[name='show'][data-active='yes']:last"))) : (d = e.nextAll('li[name="show"][data-active="yes"]:first'), d.length || (d = a(c.divTip).children("li[name='show'][data-active='yes']:first"))), i = a(c.divTip).children('li[name="show"]').index(d), e.removeClass("active"), d.addClass("active")
        }

        c = a.extend({divTip: ".account_sgs"}, c);
        var i = 0, j = ["sina.com", "163.com", "qq.com", "126.com", "vip.sina.com", "sina.cn", "hotmail.com", "gmail.com", "sohu.com", "139.com", "wo.com.cn", "189.cn", "21cn.com"], k = '<ul class="account_sgs">';
        k += '<li name="show" email="">请选择邮箱类型</li>';
        for (var l = 0; l < j.length; l++)k += '<li name="show" email = "@' + j[l] + '"></li>';
        k += "</ul>", a("body").append(k), a(c.divTip).children().hover(function () {
            i = a(this).index(), 0 != i && a(this).addClass("active").siblings().removeClass()
        }), a(c.divTip).click(function (c) {
            if (a(c.target).attr("email")) {
                var d = a(c.target).text();
                b.val(d), e()
            }
        }), a(window).resize(function () {
            d()
        }), b.bind("keyup", function (a) {
            g(a.which)
        }), b.focus(function () {
            b.val() && f()
        }), b.blur(function () {
            e()
        }), b.keydown(function (d) {
            if (38 == d.which)return h("up"), !1;
            if (40 == d.which)return h(), !1;
            if (13 == d.which) {
                if (i) {
                    var f = a(c.divTip).children("li.active").text();
                    b.val(f), b.blur()
                }
                return e(), !1
            }
        })
    }
});
define("js/lib/sinasso", [], function () {
    function getAppLoginURL() {
        return "www.weicaifu.com"
    }

    function SSOController(cname) {
        var undefined, me = this, updateCookieTimer = null, updateCookieTimeHardLimit = 1800, cookieExpireTimeLength = 86400, crossDomainForward = null, crossDomainTimer = null, crossDomainTime = 3, autoLoginCallBack2 = null, ssoCrosssDomainUrl = "https://login.sina.com.cn/sso/crossdomain.php", ssoLoginUrl = "https://login.sina.com.cn/sso/login.php", ssoLogoutUrl = "https://login.sina.com.cn/sso/logout.php", ssoUpdateCookieUrl = "https://login.sina.com.cn/sso/updatetgt.php", ssoPreLoginUrl = "https://login.sina.com.cn/sso/prelogin.php", pincodeUrl = "https://login.sina.com.cn/cgi/pin.php", vfValidUrl = "http://weibo.com/sguide/vdun.php", crossDomainUrlList = null, loginMethod = "", ssoServerTimeTimer = null, ssoLoginTimer = null, loginByConfig = null, loginMethodCheck = null, https = 1, rsa = 2, wsse = 4, pcid = "", tmpData = {}, preloginTimeStart = 0, preloginTime = 0, callbackLogoutStatus;
        this.https = 1, this.rsa = 2, this.wsse = 4, this.name = cname, this.loginFormId = "ssoLoginForm", this.scriptId = "ssoLoginScript", this.ssoCrossDomainScriptId = "ssoCrossDomainScriptId", this.loginFrameName = "ssoLoginFrame", this.appLoginURL = {
            "51uc.com": "http://passport.51uc.com/sso/login.php",
            "weibo.com": "http://weibo.com/sso/login.php",
            "weicaifu.com": "https://" + getAppLoginURL(window.location.host) + "/sso/ajaxlogin"
        }, this.appDomainService = {
            "51uc.com": "51uc",
            "weibo.com": "miniblog"
        }, this.loginExtraQuery = {}, this.setDomain = !1, this.feedBackUrl = "", this.service = "sso", this.domain = "sina.com.cn", this.from = "", this.pageCharset = "UTF-8", this.useTicket = !1, this.isCheckLoginState = !1, this.isUpdateCookieOnLoad = !0, this.useIframe = !0, this.noActiveTime = 7200, this.autoUpdateCookieTime = 1800, this.loginType = rsa, this.timeoutEnable = !1, this.loginTimeout = 5e3, this.crossDomain = !0, this.scriptLoginHttps = !1, this.allowAutoFoundServerTime = !1, this.allowAutoFoundServerTimeError = !0, this.calcServerTimeInterval = 2e3, this.servertime = null, this.nonce = null, this.rsaPubkey = null, this.rsakv = null, this.loginExtraFlag = {}, this.cdult = !1, this.crossDomainTime = 5, this.failRedirect = !1, this.getVersion = function () {
            return "ssologin.js(v1.4.14) 2013-12-18"
        }, this.getEntry = function () {
            return me.entry
        }, this.getClientType = function () {
            return me.getVersion().split(" ")[0]
        }, this.init = function () {
            if ("object" === getType(arguments[0]))return customPrepare(arguments[0]);
            me.setLoginType(me.loginType);
            var a = window.sinaSSOConfig;
            "object" != typeof a && (a = {});
            var b;
            for (b in a)me[b] = a[b];
            me.entry || (me.entry = me.service), me.isUpdateCookieOnLoad && setTimeout(me.name + ".updateCookie()", 1e4), me.isCheckLoginState && addEventListener(window, "load", function () {
                me.checkLoginState()
            }), me.allowAutoFoundServerTime && ssoLoginServerTime && me.setServerTime(ssoLoginServerTime), me.customInit()
        }, this.getLoginInfo = function () {
            var a = getCookie("sso_info");
            return a ? parse_str(sinaSSOEncoder.Cookie.decode(a)) : {}
        }, this.customInit = function () {
        }, this.customUpdateCookieCallBack = function () {
        }, this.customLoginCallBack = function () {
        }, this.customLogoutCallBack = function () {
            me.customLoginCallBack({result: !1})
        };
        var customLogin, customPrepare, customLogout;
        (function () {
            var a = function () {
            }, b = {
                username: "",
                password: "",
                savestate: 0,
                vsnf: 0,
                vsnval: "",
                door: "",
                setCookie: 1,
                ssoSimpleLogin: 0,
                onComplete: a,
                onSuccess: a,
                onFailure: a
            }, c = {onComplete: a, onSuccess: a, onFailure: a}, d = {
                vsnf: "vsnf",
                vsnval: "vsnval",
                door: "door",
                setCookie: "s",
                ssoSimpleLogin: "ssosimplelogin"
            }, e = {}, f = {}, g = function (a, b) {
                var c, d = {};
                a = a || {}, b = b || {}, objMerge(d, a);
                for (c in b)a.hasOwnProperty(c) && (d[c] = b[c]);
                return d
            }, h = function (a, b, c) {
                "function" == typeof a[b] && a[b](c)
            };
            this.callbackLoginStatus = function (a) {
                me.customLoginCallBack(a), h(e, "onComplete", a), a && a.result === !0 ? h(e, "onSuccess", a) : h(e, "onFailure", a)
            }, callbackLogoutStatus = function (a) {
                me.customLogoutCallBack(a), h(f, "onComplete", a), a && a.result === !0 ? h(f, "onSuccess", a) : h(f, "onFailure", a)
            }, customPrepare = function (a) {
                var c;
                a = a || {}, e = objMerge({
                    entry: "sso",
                    useTicket: !1,
                    service: "sso",
                    domain: "sina.com.cn",
                    feedBackUrl: "",
                    setDomain: !1,
                    crossDomain: !0,
                    name: cname
                }, b), e = g(e, a), window[e.name] = window[e.name] || me;
                for (c in e)b.hasOwnProperty(c) || (me[c] = e[c]);
                me.loginExtraQuery = {}, objMerge(me.loginExtraQuery, e.loginExtraQuery);
                for (c in d)e.hasOwnProperty(c) && (me.loginExtraQuery[d[c]] = e[c])
            }, customLogin = function (a) {
                a = a || {}, customPrepare(a), me.login(e.username, e.password, e.savestate)
            }, customLogout = function (a) {
                a = a || {}, f = objMerge({}, c), f = g(f, a), me.logout()
            }
        }).apply(this), this.login = function (a, b, c) {
            return ga && ga("send", "event", "user", "login", "调用登录函数"), "object" === getType(arguments[0]) ? customLogin(arguments[0]) : (ssoLoginTimer ? ssoLoginTimer.clear() : ssoLoginTimer = new prototypeTimer(me.timeoutEnable), ssoLoginTimer.start(me.loginTimeout, function () {
                ssoLoginTimer.clear(), me.callbackLoginStatus({
                    result: !1,
                    errno: -1,
                    reason: unescape("%u767B%u5F55%u8D85%u65F6%uFF0C%u8BF7%u91CD%u8BD5")
                })
            }), c = c == undefined ? 0 : c, tmpData.savestate = c, loginByConfig = function () {
                if (!me.feedBackUrl && loginByXMLHttpRequest(a, b, c))return !0;
                if (me.useIframe && (me.setDomain || me.feedBackUrl)) {
                    me.setDomain && (document.domain = me.domain, me.feedBackUrl || "sina.com.cn" == me.domain || (me.feedBackUrl = makeURL(me.appLoginURL[me.domain], {domain: 1}))), loginMethod = "post";
                    var d = loginByIframe(a, b, c);
                    d || (loginMethod = "get", me.scriptLoginHttps ? me.setLoginType(me.loginType | https) : me.setLoginType(me.loginType | rsa), loginByScript(a, b, c))
                } else loginMethod = "get", loginByScript(a, b, c);
                me.nonce = null
            }, loginMethodCheck = function () {
                if (me.loginType & wsse || me.loginType & rsa) {
                    if (me.servertime)return me.nonce || (me.nonce = makeNonce(6)), loginByConfig(), !0;
                    me.getServerTime(a, loginByConfig)
                } else loginByConfig()
            }, loginMethodCheck(), !0)
        }, this.prelogin = function (a, b) {
            var c = "https:" == location.protocol ? ssoPreLoginUrl.replace(/^http:/, "https:") : ssoPreLoginUrl, d = a.username || "";
            d = sinaSSOEncoder.base64.encode(urlencode(d)), delete a.username;
            var e = {entry: me.entry, callback: me.name + ".preloginCallBack", su: d, rsakt: "mod"};
            c = makeURL(c, objMerge(e, a)), me.preloginCallBack = function (a) {
                a && 0 == a.retcode && (me.setServerTime(a.servertime), me.nonce = a.nonce, me.rsaPubkey = a.pubkey, me.rsakv = a.rsakv, pcid = a.pcid, preloginTime = (new Date).getTime() - preloginTimeStart - (parseInt(a.exectime, 10) || 0)), "function" == typeof b && b(a)
            }, preloginTimeStart = (new Date).getTime(), excuteScript(me.scriptId, c)
        }, this.getServerTime = function (a, b) {
            return me.servertime ? ("function" == typeof b && b({
                retcode: 0,
                servertime: me.servertime
            }), !0) : (me.prelogin({username: a}, b), void 0)
        }, this.logout = function () {
            try {
                if ("object" === getType(arguments[0]))return customLogout(arguments[0]);
                var a = {entry: me.getEntry(), callback: me.name + ".ssoLogoutCallBack"};
                try {
                    a.sr = window.screen.width + "*" + window.screen.height
                } catch (b) {
                }
                var c = "https:" == location.protocol ? ssoLogoutUrl.replace(/^http:/, "https:") : ssoLogoutUrl;
                c = makeURL(c, a), excuteScript(me.scriptId, c)
            } catch (b) {
            }
            return !0
        }, this.ssoLogoutCallBack = function (a) {
            a.arrURL && me.setCrossDomainUrlList(a), me.crossDomainAction("logout", function () {
                callbackLogoutStatus({result: !0})
            })
        }, this.updateCookie = function () {
            try {
                me.autoUpdateCookieTime > 5 && (null != updateCookieTimer && clearTimeout(updateCookieTimer), updateCookieTimer = setTimeout(me.name + ".updateCookie()", 1e3 * me.autoUpdateCookieTime));
                var a = me.getCookieExpireTime(), b = (new Date).getTime() / 1e3, c = {};
                if (null == a ? c = {retcode: 6102} : b > a ? c = {retcode: 6203} : a - cookieExpireTimeLength + updateCookieTimeHardLimit > b ? c = {retcode: 6110} : a - b > me.noActiveTime && (c = {retcode: 6111}), c.retcode !== undefined)return me.customUpdateCookieCallBack(c), !1;
                var d = "https:" == location.protocol ? ssoUpdateCookieUrl.replace(/^http:/, "https:") : ssoUpdateCookieUrl;
                d = makeURL(d, {
                    entry: me.getEntry(),
                    callback: me.name + ".updateCookieCallBack"
                }), excuteScript(me.scriptId, d)
            } catch (e) {
            }
            return !0
        }, this.setCrossDomainUrlList = function (a) {
            crossDomainUrlList = a
        }, this.checkAltLoginName = function () {
            return !0
        }, this.callFeedBackUrl = function (a) {
            try {
                var b = {callback: me.name + ".feedBackUrlCallBack"};
                a.ticket && (b.ticket = a.ticket), a.retcode !== undefined && (b.retcode = a.retcode);
                var c = makeURL(me.feedBackUrl, b);
                excuteScript(me.scriptId, c)
            } catch (d) {
            }
            return !0
        }, this.loginCallBack = function (a) {
            try {
                if (me.timeoutEnable && !ssoLoginTimer.isset())return;
                ssoLoginTimer.clear(), me.loginExtraFlag = {};
                var b = {}, c = a.ticket, d = a.uid;
                if (d)b.result = !0, b.retcode = 0, b.userinfo = {uniqueid: a.uid}, c && (b.ticket = c), a.cookie && (b.cookie = a.cookie), me.feedBackUrl ? me.crossDomain ? me.crossDomainAction("login", function () {
                    me.callFeedBackUrl(b)
                }) : me.callFeedBackUrl(b) : me.crossDomain ? (a.crossDomainUrlList && me.setCrossDomainUrlList({
                    retcode: 0,
                    arrURL: a.crossDomainUrlList
                }), me.crossDomainAction("login", function () {
                    c && me.appLoginURL[me.domain] ? me.appLogin(c, me.domain, me.name + ".callbackLoginStatus") : (b.userinfo = objMerge(b.userinfo, me.getSinaCookie()), me.callbackLoginStatus(b))
                })) : me.callbackLoginStatus(b); else {
                    if (loginMethodCheck && "2092" == a.retcode && me.allowAutoFoundServerTimeError)return me.setServerTime(0), me.loginExtraFlag = objMerge(me.loginExtraFlag, {wsseretry: "servertime_error"}), loginMethodCheck(), loginMethodCheck = null, !1;
                    if (b.result = !1, b.errno = a.retcode, "4069" == b.errno) {
                        var e = a.reason.split("|");
                        if (b.reason = e[0], 2 == e.length && (b.rurl = e[1]), b.rurl)try {
                            return console.log(13), top.location.href = b.rurl, void 0
                        } catch (f) {
                        }
                    } else b.reason = a.reason;
                    me.callbackLoginStatus(b)
                }
            } catch (f) {
            }
            return !0
        }, this.updateCookieCallBack = function (a) {
            0 == a.retcode ? me.crossDomainAction("update", function () {
                me.customUpdateCookieCallBack(a)
            }) : me.customUpdateCookieCallBack(a)
        }, this.feedBackUrlCallBack = function (a) {
            if ("post" != loginMethod || !me.timeoutEnable || ssoLoginTimer.isset()) {
                if (ssoLoginTimer.clear(), "2092" == a.errno && me.setServerTime(0), "4069" == a.errno) {
                    var b = a.reason.split("|");
                    if (a.reason = b[0], 2 == b.length) {
                        a.rurl = b[1];
                        try {
                            return console.log(14), top.location.href = a.rurl, void 0
                        } catch (c) {
                        }
                    }
                }
                me.callbackLoginStatus(a), removeNode(me.loginFrameName)
            }
        }, this.doCrossDomainCallBack = function (a) {
            me.crossDomainCounter++, a && removeNode(a.scriptId), me.crossDomainCounter == me.crossDomainCount && (clearTimeout(crossDomainTimer), me.crossDomainResult())
        }, this.crossDomainCallBack = function (a) {
            if (removeNode(me.ssoCrossDomainScriptId), !a || 0 != a.retcode)return !1;
            var b, c, d = a.arrURL, e = {callback: me.name + ".doCrossDomainCallBack"};
            if (me.crossDomainCount = d.length, me.crossDomainCounter = 0, 0 == d.length)return clearTimeout(crossDomainTimer), me.crossDomainResult(), !0;
            for (var f = 0; f < d.length; f++)b = d[f], c = "ssoscript" + f, e.scriptId = c, b = makeURL(b, e), isSafari() ? excuteIframe(c, b) : excuteScript(c, b)
        }, this.crossDomainResult = function () {
            crossDomainUrlList = null, "function" == typeof crossDomainForward && crossDomainForward()
        }, this.crossDomainAction = function (a, b) {
            if (crossDomainTimer = setTimeout(me.name + ".crossDomainResult()", 1e3 * crossDomainTime), crossDomainForward = "function" == typeof b ? b : null, crossDomainUrlList)return me.crossDomainCallBack(crossDomainUrlList), !1;
            var c = me.domain;
            "update" == a && (a = "login", c = "sina.com.cn");
            var d = {
                scriptId: me.ssoCrossDomainScriptId,
                callback: me.name + ".crossDomainCallBack",
                action: a,
                domain: c,
                sr: window.screen.width + "*" + window.screen.height
            }, e = makeURL(ssoCrosssDomainUrl, d);
            excuteScript(me.ssoCrossDomainScriptId, e)
        }, this.checkLoginState = function (a) {
            a ? me.autoLogin(a) : me.autoLogin(function (a) {
                var b = {};
                if (null !== a) {
                    var c = {displayname: a.nick, uniqueid: a.uid, userid: a.user};
                    b.result = !0, b.userinfo = c
                } else b.result = !1, b.reason = "";
                me.callbackLoginStatus(b)
            })
        }, this.getCookieExpireTime = function () {
            return getCookieExpireTimeByDomain(me.domain)
        }, this.getSinaCookie = function (a) {
            var b = urldecode(getCookie("SUP"));
            if (!b && !urldecode(getCookie("ALF")))return null;
            if (b || (b = urldecode(getCookie("SUR"))), !b)return null;
            var c = parse_str(b);
            return a && c.et && 1e3 * c.et < (new Date).getTime() ? null : c
        }, this.get51UCCookie = function () {
            return me.getSinaCookie()
        }, this.autoLogin = function (a, b) {
            if ("sina.com.cn" == me.domain) {
                if (null === getCookie("SUP") && null !== getCookie("ALF"))return sinaAutoLogin(a), !0
            } else if (null === getCookie("SUP") && (b || null !== getCookie("SSOLoginState") || null !== getCookie("ALF")))return sinaAutoLogin(a), !0;
            return a(me.getSinaCookie()), !0
        }, this.autoLoginCallBack2 = function () {
            try {
                autoLoginCallBack2(me.getSinaCookie())
            } catch (a) {
            }
            return !0
        }, this.appLogin = function (a, b, c) {
            var d = tmpData.savestate ? parseInt((new Date).getTime() / 1e3 + 86400 * tmpData.savestate) : 0, e = getCookie("ALF") ? getCookie("ALF") : 0, f = {
                callback: c,
                ticket: a,
                ssosavestate: d || e
            }, g = me.appLoginURL[b], h = makeURL(g, f);
            return excuteScript(me.scriptId, h, "gb2312"), !0
        }, this.autoLoginCallBack3 = function (a) {
            if (0 != a.retcode)return me.autoLoginCallBack2(a), !1;
            var b = "sina.com.cn" == me.domain ? "weicaifu.com" : me.domain;
            return me.appLogin(a.ticket, b, me.name + ".autoLoginCallBack2"), !0
        }, this.setLoginType = function (a) {
            var b = "https:" == location.protocol ? me.https : 0;
            return b && (me.crossDomain = !1), me.loginType = a | b, !0
        }, this.setServerTime = function (a) {
            if (ssoServerTimeTimer || (ssoServerTimeTimer = new prototypeTimer(!0)), 0 == a)return ssoServerTimeTimer.clear(), me.servertime = a, !0;
            if (1294935546 > a)return !1;
            var b = function () {
                me.servertime && (me.servertime += me.calcServerTimeInterval / 1e3, ssoServerTimeTimer.start(me.calcServerTimeInterval, b))
            };
            me.servertime = a, ssoServerTimeTimer.start(me.calcServerTimeInterval, b)
        }, this.getPinCodeUrl = function (a) {
            a == undefined && (a = 0), pcid && (me.loginExtraQuery.pcid = pcid);
            var b = "https:" == location.protocol ? pincodeUrl.replace(/^http:/, "https:") : pincodeUrl;
            return b + "?r=" + Math.floor(1e8 * Math.random()) + "&s=" + a + (pcid.length > 0 ? "&p=" + pcid : "")
        }, this.showPinCode = function (a) {
            me.$(a).src = me.getPinCodeUrl()
        }, this.isVfValid = function () {
            return 1 != me.getSinaCookie(!0).vf
        }, this.getVfValidUrl = function () {
            return vfValidUrl
        }, this.enableFailRedirect = function () {
            me.failRedirect = !0
        };
        var makeNonce = function (a) {
            for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c = "", d = 0; a > d; d++)c += b.charAt(Math.ceil(1e6 * Math.random()) % b.length);
            return c
        }, sinaAutoLogin = function (a) {
            autoLoginCallBack2 = a;
            var b = {
                entry: me.getEntry(),
                service: me.service,
                encoding: "UTF-8",
                gateway: 1,
                returntype: "TEXT",
                from: me.from
            };
            "sina.com.cn" == me.domain ? (b.callback = me.name + ".autoLoginCallBack3", b.service = "miniblog", b.useticket = 1) : (b.callback = me.name + ".autoLoginCallBack3", b.useticket = 1);
            var c = "https:" == location.protocol ? ssoLoginUrl.replace(/^http:/, "https:") : ssoLoginUrl;
            return c = makeURL(c, b), excuteScript(me.scriptId, c, "gb2312"), !0
        }, getCookieExpireTimeByDomain = function () {
            var a = null, b = null;
            return b = me.getSinaCookie(), b && (a = b.et), a
        }, addEventListener = function (a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
        }, prototypeTimer = function (a) {
            var b = !1;
            this.start = function (c, d) {
                a && (b = setTimeout(d, c))
            }, this.clear = function () {
                a && (clearTimeout(b), b = !1)
            }, this.isset = function () {
                return b !== !1
            }
        }, excuteScript = function (a, b, c) {
            removeNode(a);
            var d = document.getElementsByTagName("head")[0], e = document.createElement("script");
            e.charset = c || "gb2312", e.id = a, e.type = "text/javascript", e.src = makeURL(b, {
                client: me.getClientType(),
                _: (new Date).getTime()
            }), d.appendChild(e)
        }, excuteIframe = function (a, b) {
            removeNode(a);
            var c = document.getElementsByTagName("body")[0], d = document.createElement("iframe");
            d.style.display = "none", d.src = makeURL(b, {
                client: me.getClientType(),
                _: (new Date).getTime()
            }), d.isReady = !1, addEventListener(d, "load", function () {
                d.isReady || (d.isReady = !0, me.doCrossDomainCallBack({scriptId: a}))
            }), c.appendChild(d)
        }, makeRequest = function (a, b, c) {
            var d = {entry: me.getEntry(), gateway: 1, from: me.from, savestate: c, useticket: me.useTicket ? 1 : 0};
            if (me.failRedirect && (me.loginExtraQuery.frd = 1), d = objMerge(d, {pagerefer: document.referrer || ""}), d = objMerge(d, me.loginExtraFlag), d = objMerge(d, me.loginExtraQuery), d.su = sinaSSOEncoder.base64.encode(urlencode(a)), me.service && (d.service = me.service), me.loginType & rsa && me.servertime && sinaSSOEncoder && sinaSSOEncoder.RSAKey) {
                d.servertime = me.servertime, d.nonce = me.nonce, d.pwencode = "rsa2", d.rsakv = me.rsakv;
                var e = new sinaSSOEncoder.RSAKey;
                e.setPublic(me.rsaPubkey, "10001"), b = e.encrypt([me.servertime, me.nonce].join("	") + "\n" + b)
            } else me.loginType & wsse && me.servertime && sinaSSOEncoder && sinaSSOEncoder.hex_sha1 && (d.servertime = me.servertime, d.nonce = me.nonce, d.pwencode = "wsse", b = sinaSSOEncoder.hex_sha1("" + sinaSSOEncoder.hex_sha1(sinaSSOEncoder.hex_sha1(b)) + me.servertime + me.nonce));
            d.sp = b;
            try {
                d.sr = window.screen.width + "*" + window.screen.height
            } catch (f) {
            }
            return d
        }, loginByXMLHttpRequest = function (a, b, c) {
            if ("undefined" == typeof XMLHttpRequest)return !1;
            var d = new XMLHttpRequest;
            if (!1 in d)return !1;
            var e = makeXMLRequestQuery(a, b, c), f = me.loginType & https ? ssoLoginUrl.replace(/^http:/, "https:") : ssoLoginUrl;
            f = makeURL(f, {client: me.getClientType(), _: (new Date).getTime()});
            try {
                d.open("POST", f, !0), d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), d.withCredentials = !0, d.onreadystatechange = function () {
                    if (4 == d.readyState && 200 == d.status) {
                        var a = parseJSON(d.responseText);
                        console && console.log(a), me.loginCallBack(a)
                    }
                }, d.send(httpBuildQuery(e))
            } catch (g) {
                return !1
            }
            return !0
        }, makeXMLRequestQuery = function (a, b, c) {
            me.appLoginURL[me.domain] && (me.useTicket = 1, me.service = me.appDomainService[me.domain] || me.service);
            var d = 0;
            me.domain && (d = 2), me.appLoginURL[me.domain] || (d = 3), me.cdult !== !1 && (d = me.cdult), 3 == d && (crossDomainTime = me.crossDomainTime, delete me.appLoginURL[me.domain]);
            var e = makeRequest(a, b, c);
            return objMerge(e, {
                encoding: "UTF-8",
                cdult: d,
                domain: me.domain,
                useticket: me.appLoginURL[me.domain] ? 1 : 0,
                prelt: preloginTime,
                returntype: "TEXT"
            })
        }, loginByScript = function (a, b, c) {
            var d = makeXMLRequestQuery(a, b, c);
            d = objMerge(d, {callback: me.name + ".loginCallBack"});
            var e = me.loginType & https ? ssoLoginUrl.replace(/^http:/, "https:") : ssoLoginUrl;
            e = makeURL(e, d), excuteScript(me.scriptId, e, "gb2312")
        }, loginByIframe = function (a, b, c) {
            createIFrame(me.loginFrameName);
            var d = createForm(me.loginFormId), e = makeRequest(a, b, c);
            e.encoding = "UTF-8", 0 == me.crossDomain && (e.crossdomain = 0), e.prelt = preloginTime, me.feedBackUrl ? (e.url = makeURL(me.feedBackUrl, {
                framelogin: 1,
                callback: "parent." + me.name + ".feedBackUrlCallBack"
            }), e.returntype = "META") : (e.callback = "parent." + me.name + ".loginCallBack", e.returntype = "IFRAME", e.setdomain = me.setDomain ? 1 : 0);
            for (var f in me.loginExtraQuery)"function" != typeof me.loginExtraQuery[f] && (e[f] = me.loginExtraQuery[f]);
            for (var g in e)d.addInput(g, e[g]);
            var h = me.loginType & https ? ssoLoginUrl.replace(/^http:/, "https:") : ssoLoginUrl;
            h = makeURL(h, objMerge({client: me.getClientType()}, me.loginExtraFlag)), d.method = "post", d.action = h, d.target = me.loginFrameName;
            var i = !0;
            try {
                d.submit()
            } catch (j) {
                removeNode(me.loginFrameName), i = !1
            }
            return setTimeout(function () {
                removeNode(d)
            }, 10), i
        }, createIFrame = function (a, b) {
            null == b && (b = "javascript:false;"), removeNode(a);
            var c = document.createElement("iframe");
            return c.height = 0, c.width = 0, c.style.display = "none", c.name = a, c.id = a, c.src = b, appendChild(document.body, c), window.frames[a].name = a, c
        }, createForm = function (a, b) {
            null == b && (b = "none"), removeNode(a);
            var c = document.createElement("form");
            return c.height = 0, c.width = 0, c.style.display = b, c.name = a, c.id = a, appendChild(document.body, c), document.forms[a].name = a, c.addInput = function (a, b, c) {
                null == c && (c = "text");
                var d = this.getElementsByTagName("input")[a];
                d && this.removeChild(d), d = document.createElement("input"), this.appendChild(d), d.id = a, d.name = a, d.type = c, d.value = b
            }, c
        }, removeNode = function (a) {
            try {
                "string" == typeof a && (a = me.$(a)), a.parentNode.removeChild(a)
            } catch (b) {
            }
        }, getType = function (a) {
            return "undefined" == typeof a ? "undefined" : null === a ? "null" : Object.prototype.toString.call(a).replace(/^\[object\s|\]$/gi, "").toLowerCase()
        }, isSafari = function () {
            var a = navigator.userAgent.toLowerCase();
            return /webkit/i.test(a) && !/chrome/i.test(a)
        }, appendChild = function (a, b) {
            a.appendChild(b)
        }, getCookie = function (a) {
            var b = new RegExp(a + "=([^;]+)").exec(document.cookie);
            return null == b ? null : b[1]
        }, makeURL = function (a, b) {
            return a + urlAndChar(a) + httpBuildQuery(b)
        }, urlAndChar = function (a) {
            return /\?/.test(a) ? "&" : "?"
        }, urlencode = function (a) {
            return encodeURIComponent(a)
        }, urldecode = function (a) {
            if (null == a)return "";
            try {
                return decodeURIComponent(a)
            } catch (b) {
                return ""
            }
        }, httpBuildQuery = function (a) {
            if ("object" != typeof a)return "";
            var b = new Array;
            for (var c in a)"function" != typeof a[c] && b.push(c + "=" + urlencode(a[c]));
            return b.join("&")
        }, parse_str = function (a) {
            for (var b, c = a.split("&"), d = {}, e = 0; e < c.length; e++)b = c[e].split("="), d[b[0]] = urldecode(b[1]);
            return d
        }, parseJSON = function (str) {
            try {
                return "object" == typeof str ? str : window.JSON ? JSON.parse(str) : eval("(" + str + ")")
            } catch (err) {
                return console && console.log(err, str), {}
            }
        }, objMerge = function (a, b) {
            for (var c in b)a[c] = b[c];
            return a
        };
        this.$ = function (a) {
            return document.getElementById(a)
        }
    }

    var sinaSSOEncoder = sinaSSOEncoder || {};
    return function () {
        var a = 0, b = 8;
        this.hex_sha1 = function (a) {
            return i(c(h(a), a.length * b))
        };
        var c = function (a, b) {
            a[b >> 5] |= 128 << 24 - b % 32, a[(b + 64 >> 9 << 4) + 15] = b;
            for (var c = Array(80), h = 1732584193, i = -271733879, j = -1732584194, k = 271733878, l = -1009589776, m = 0; m < a.length; m += 16) {
                for (var n = h, o = i, p = j, q = k, r = l, s = 0; 80 > s; s++) {
                    c[s] = 16 > s ? a[m + s] : g(c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16], 1);
                    var t = f(f(g(h, 5), d(s, i, j, k)), f(f(l, c[s]), e(s)));
                    l = k, k = j, j = g(i, 30), i = h, h = t
                }
                h = f(h, n), i = f(i, o), j = f(j, p), k = f(k, q), l = f(l, r)
            }
            return Array(h, i, j, k, l)
        }, d = function (a, b, c, d) {
            return 20 > a ? b & c | ~b & d : 40 > a ? b ^ c ^ d : 60 > a ? b & c | b & d | c & d : b ^ c ^ d
        }, e = function (a) {
            return 20 > a ? 1518500249 : 40 > a ? 1859775393 : 60 > a ? -1894007588 : -899497514
        }, f = function (a, b) {
            var c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | 65535 & c
        }, g = function (a, b) {
            return a << b | a >>> 32 - b
        }, h = function (a) {
            for (var c = Array(), d = (1 << b) - 1, e = 0; e < a.length * b; e += b)c[e >> 5] |= (a.charCodeAt(e / b) & d) << 24 - e % 32;
            return c
        }, i = function (b) {
            for (var c = a ? "0123456789ABCDEF" : "0123456789abcdef", d = "", e = 0; e < 4 * b.length; e++)d += c.charAt(15 & b[e >> 2] >> 8 * (3 - e % 4) + 4) + c.charAt(15 & b[e >> 2] >> 8 * (3 - e % 4));
            return d
        };
        this.base64 = {
            encode: function (a) {
                if (a = "" + a, "" == a)return "";
                var b, c, d, e, f, g = "", h = "", i = "", j = 0;
                do b = a.charCodeAt(j++), c = a.charCodeAt(j++), h = a.charCodeAt(j++), d = b >> 2, e = (3 & b) << 4 | c >> 4, f = (15 & c) << 2 | h >> 6, i = 63 & h, isNaN(c) ? f = i = 64 : isNaN(h) && (i = 64), g = g + this._keys.charAt(d) + this._keys.charAt(e) + this._keys.charAt(f) + this._keys.charAt(i), b = c = h = "", d = e = f = i = ""; while (j < a.length);
                return g
            },
            decode: function (a, b, c) {
                var d = function (a, b) {
                    for (var c = 0; c < a.length; c++)if (a[c] === b)return c;
                    return -1
                };
                "string" == typeof a && (a = a.split(""));
                var e, f, g, h, i, j = [], k = "", l = "";
                0 != a.length % 4;
                var m = /[^A-Za-z0-9\+\/\=]/g, n = this._keys.split("");
                "urlsafe" == b && (m = /[^A-Za-z0-9\-_\=]/g, n = this._keys_urlsafe.split(""));
                var o = 0;
                if ("binnary" == b)for (n = [], o = 0; 64 >= o; o++)n[o] = o + 128;
                if ("binnary" != b && m.exec(a.join("")))return "array" == c ? [] : "";
                o = 0;
                do g = d(n, a[o++]), h = d(n, a[o++]), i = d(n, a[o++]), l = d(n, a[o++]), e = g << 2 | h >> 4, f = (15 & h) << 4 | i >> 2, k = (3 & i) << 6 | l, j.push(e), 64 != i && -1 != i && j.push(f), 64 != l && -1 != l && j.push(k), e = f = k = "", g = h = i = l = ""; while (o < a.length);
                if ("array" == c)return j;
                for (var p = "", q = 0; q < j.lenth; q++)p += String.fromCharCode(j[q]);
                return p
            },
            _keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _keys_urlsafe: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="
        }, this.Cookie = {
            decode: function (a) {
                var b = function (a) {
                    for (var b = "", d = 0; d < a.length; d++)b += "%" + c(a[d]);
                    return decodeURIComponent(b)
                }, c = function (a) {
                    var b = "0" + a.toString(16);
                    return b.length <= 2 ? b : b.substr(1)
                }, d = [], e = a.substr(0, 3), f = a.substr(3);
                switch (e) {
                    case"v01":
                        for (var g = 0; g < f.length; g += 2)d.push(parseInt(f.substr(g, 2), 16));
                        return decodeURIComponent(b(sinaSSOEncoder.base64.decode(d, "binnary", "array")));
                    case"v02":
                        return d = sinaSSOEncoder.base64.decode(f, "urlsafe", "array"), b(sinaSSOEncoder.base64.decode(d, "binnary", "array"));
                    default:
                        return decodeURIComponent(a)
                }
            }
        }
    }.call(sinaSSOEncoder), function () {
        function a(a, b, c) {
            null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
        }

        function b() {
            return new a(null)
        }

        function c(a, b, c, d, e, f) {
            for (; --f >= 0;) {
                var g = b * this[a++] + c[d] + e;
                e = Math.floor(g / 67108864), c[d++] = 67108863 & g
            }
            return e
        }

        function d(a, b, c, d, e, f) {
            for (var g = 32767 & b, h = b >> 15; --f >= 0;) {
                var i = 32767 & this[a], j = this[a++] >> 15, k = h * i + j * g;
                i = g * i + ((32767 & k) << 15) + c[d] + (1073741823 & e), e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30), c[d++] = 1073741823 & i
            }
            return e
        }

        function e(a, b, c, d, e, f) {
            for (var g = 16383 & b, h = b >> 14; --f >= 0;) {
                var i = 16383 & this[a], j = this[a++] >> 14, k = h * i + j * g;
                i = g * i + ((16383 & k) << 14) + c[d] + e, e = (i >> 28) + (k >> 14) + h * j, c[d++] = 268435455 & i
            }
            return e
        }

        function f(a) {
            return kb.charAt(a)
        }

        function g(a, b) {
            var c = lb[a.charCodeAt(b)];
            return null == c ? -1 : c
        }

        function h(a) {
            for (var b = this.t - 1; b >= 0; --b)a[b] = this[b];
            a.t = this.t, a.s = this.s
        }

        function i(a) {
            this.t = 1, this.s = 0 > a ? -1 : 0, a > 0 ? this[0] = a : -1 > a ? this[0] = a + DV : this.t = 0
        }

        function j(a) {
            var c = b();
            return c.fromInt(a), c
        }

        function k(b, c) {
            var d;
            if (16 == c)d = 4; else if (8 == c)d = 3; else if (256 == c)d = 8; else if (2 == c)d = 1; else if (32 == c)d = 5; else {
                if (4 != c)return this.fromRadix(b, c), void 0;
                d = 2
            }
            this.t = 0, this.s = 0;
            for (var e = b.length, f = !1, h = 0; --e >= 0;) {
                var i = 8 == d ? 255 & b[e] : g(b, e);
                0 > i ? "-" == b.charAt(e) && (f = !0) : (f = !1, 0 == h ? this[this.t++] = i : h + d > this.DB ? (this[this.t - 1] |= (i & (1 << this.DB - h) - 1) << h, this[this.t++] = i >> this.DB - h) : this[this.t - 1] |= i << h, h += d, h >= this.DB && (h -= this.DB))
            }
            8 == d && 0 != (128 & b[0]) && (this.s = -1, h > 0 && (this[this.t - 1] |= (1 << this.DB - h) - 1 << h)), this.clamp(), f && a.ZERO.subTo(this, this)
        }

        function l() {
            for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a;)--this.t
        }

        function m(a) {
            if (this.s < 0)return "-" + this.negate().toString(a);
            var b;
            if (16 == a)b = 4; else if (8 == a)b = 3; else if (2 == a)b = 1; else if (32 == a)b = 5; else {
                if (4 != a)return this.toRadix(a);
                b = 2
            }
            var c, d = (1 << b) - 1, e = !1, g = "", h = this.t, i = this.DB - h * this.DB % b;
            if (h-- > 0)for (i < this.DB && (c = this[h] >> i) > 0 && (e = !0, g = f(c)); h >= 0;)b > i ? (c = (this[h] & (1 << i) - 1) << b - i, c |= this[--h] >> (i += this.DB - b)) : (c = this[h] >> (i -= b) & d, 0 >= i && (i += this.DB, --h)), c > 0 && (e = !0), e && (g += f(c));
            return e ? g : "0"
        }

        function n() {
            var c = b();
            return a.ZERO.subTo(this, c), c
        }

        function o() {
            return this.s < 0 ? this.negate() : this
        }

        function p(a) {
            var b = this.s - a.s;
            if (0 != b)return b;
            var c = this.t;
            if (b = c - a.t, 0 != b)return b;
            for (; --c >= 0;)if (0 != (b = this[c] - a[c]))return b;
            return 0
        }

        function q(a) {
            var b, c = 1;
            return 0 != (b = a >>> 16) && (a = b, c += 16), 0 != (b = a >> 8) && (a = b, c += 8), 0 != (b = a >> 4) && (a = b, c += 4), 0 != (b = a >> 2) && (a = b, c += 2), 0 != (b = a >> 1) && (a = b, c += 1), c
        }

        function r() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + q(this[this.t - 1] ^ this.s & this.DM)
        }

        function s(a, b) {
            var c;
            for (c = this.t - 1; c >= 0; --c)b[c + a] = this[c];
            for (c = a - 1; c >= 0; --c)b[c] = 0;
            b.t = this.t + a, b.s = this.s
        }

        function t(a, b) {
            for (var c = a; c < this.t; ++c)b[c - a] = this[c];
            b.t = Math.max(this.t - a, 0), b.s = this.s
        }

        function u(a, b) {
            var c, d = a % this.DB, e = this.DB - d, f = (1 << e) - 1, g = Math.floor(a / this.DB), h = this.s << d & this.DM;
            for (c = this.t - 1; c >= 0; --c)b[c + g + 1] = this[c] >> e | h, h = (this[c] & f) << d;
            for (c = g - 1; c >= 0; --c)b[c] = 0;
            b[g] = h, b.t = this.t + g + 1, b.s = this.s, b.clamp()
        }

        function v(a, b) {
            b.s = this.s;
            var c = Math.floor(a / this.DB);
            if (c >= this.t)return b.t = 0, void 0;
            var d = a % this.DB, e = this.DB - d, f = (1 << d) - 1;
            b[0] = this[c] >> d;
            for (var g = c + 1; g < this.t; ++g)b[g - c - 1] |= (this[g] & f) << e, b[g - c] = this[g] >> d;
            d > 0 && (b[this.t - c - 1] |= (this.s & f) << e), b.t = this.t - c, b.clamp()
        }

        function w(a, b) {
            for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c;)d += this[c] - a[c], b[c++] = d & this.DM, d >>= this.DB;
            if (a.t < this.t) {
                for (d -= a.s; c < this.t;)d += this[c], b[c++] = d & this.DM, d >>= this.DB;
                d += this.s
            } else {
                for (d += this.s; c < a.t;)d -= a[c], b[c++] = d & this.DM, d >>= this.DB;
                d -= a.s
            }
            b.s = 0 > d ? -1 : 0, -1 > d ? b[c++] = this.DV + d : d > 0 && (b[c++] = d), b.t = c, b.clamp()
        }

        function x(b, c) {
            var d = this.abs(), e = b.abs(), f = d.t;
            for (c.t = f + e.t; --f >= 0;)c[f] = 0;
            for (f = 0; f < e.t; ++f)c[f + d.t] = d.am(0, e[f], c, f, 0, d.t);
            c.s = 0, c.clamp(), this.s != b.s && a.ZERO.subTo(c, c)
        }

        function y(a) {
            for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0;)a[c] = 0;
            for (c = 0; c < b.t - 1; ++c) {
                var d = b.am(c, b[c], a, 2 * c, 0, 1);
                (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t + 1] = 1)
            }
            a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)), a.s = 0, a.clamp()
        }

        function z(c, d, e) {
            var f = c.abs();
            if (!(f.t <= 0)) {
                var g = this.abs();
                if (g.t < f.t)return null != d && d.fromInt(0), null != e && this.copyTo(e), void 0;
                null == e && (e = b());
                var h = b(), i = this.s, j = c.s, k = this.DB - q(f[f.t - 1]);
                k > 0 ? (f.lShiftTo(k, h), g.lShiftTo(k, e)) : (f.copyTo(h), g.copyTo(e));
                var l = h.t, m = h[l - 1];
                if (0 != m) {
                    var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0), o = this.FV / n, p = (1 << this.F1) / n, r = 1 << this.F2, s = e.t, t = s - l, u = null == d ? b() : d;
                    for (h.dlShiftTo(t, u), e.compareTo(u) >= 0 && (e[e.t++] = 1, e.subTo(u, e)), a.ONE.dlShiftTo(l, u), u.subTo(h, h); h.t < l;)h[h.t++] = 0;
                    for (; --t >= 0;) {
                        var v = e[--s] == m ? this.DM : Math.floor(e[s] * o + (e[s - 1] + r) * p);
                        if ((e[s] += h.am(0, v, e, t, 0, l)) < v)for (h.dlShiftTo(t, u), e.subTo(u, e); e[s] < --v;)e.subTo(u, e)
                    }
                    null != d && (e.drShiftTo(l, d), i != j && a.ZERO.subTo(d, d)), e.t = l, e.clamp(), k > 0 && e.rShiftTo(k, e), 0 > i && a.ZERO.subTo(e, e)
                }
            }
        }

        function A(c) {
            var d = b();
            return this.abs().divRemTo(c, null, d), this.s < 0 && d.compareTo(a.ZERO) > 0 && c.subTo(d, d), d
        }

        function B(a) {
            this.m = a
        }

        function C(a) {
            return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
        }

        function D(a) {
            return a
        }

        function E(a) {
            a.divRemTo(this.m, null, a)
        }

        function F(a, b, c) {
            a.multiplyTo(b, c), this.reduce(c)
        }

        function G(a, b) {
            a.squareTo(b), this.reduce(b)
        }

        function H() {
            if (this.t < 1)return 0;
            var a = this[0];
            if (0 == (1 & a))return 0;
            var b = 3 & a;
            return b = 15 & b * (2 - (15 & a) * b), b = 255 & b * (2 - (255 & a) * b), b = 65535 & b * (2 - (65535 & (65535 & a) * b)), b = b * (2 - a * b % this.DV) % this.DV, b > 0 ? this.DV - b : -b
        }

        function I(a) {
            this.m = a, this.mp = a.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << a.DB - 15) - 1, this.mt2 = 2 * a.t
        }

        function J(c) {
            var d = b();
            return c.abs().dlShiftTo(this.m.t, d), d.divRemTo(this.m, null, d), c.s < 0 && d.compareTo(a.ZERO) > 0 && this.m.subTo(d, d), d
        }

        function K(a) {
            var c = b();
            return a.copyTo(c), this.reduce(c), c
        }

        function L(a) {
            for (; a.t <= this.mt2;)a[a.t++] = 0;
            for (var b = 0; b < this.m.t; ++b) {
                var c = 32767 & a[b], d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
                for (c = b + this.m.t, a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV;)a[c] -= a.DV, a[++c]++
            }
            a.clamp(), a.drShiftTo(this.m.t, a), a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
        }

        function M(a, b) {
            a.squareTo(b), this.reduce(b)
        }

        function N(a, b, c) {
            a.multiplyTo(b, c), this.reduce(c)
        }

        function O() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
        }

        function P(c, d) {
            if (c > 4294967295 || 1 > c)return a.ONE;
            var e = b(), f = b(), g = d.convert(this), h = q(c) - 1;
            for (g.copyTo(e); --h >= 0;)if (d.sqrTo(e, f), (c & 1 << h) > 0)d.mulTo(f, g, e); else {
                var i = e;
                e = f, f = i
            }
            return d.revert(e)
        }

        function Q(a, b) {
            var c;
            return c = 256 > a || b.isEven() ? new B(b) : new I(b), this.exp(a, c)
        }

        function R() {
            this.i = 0, this.j = 0, this.S = new Array
        }

        function S(a) {
            var b, c, d;
            for (b = 0; 256 > b; ++b)this.S[b] = b;
            for (c = 0, b = 0; 256 > b; ++b)c = 255 & c + this.S[b] + a[b % a.length], d = this.S[b], this.S[b] = this.S[c], this.S[c] = d;
            this.i = 0, this.j = 0
        }

        function T() {
            var a;
            return this.i = 255 & this.i + 1, this.j = 255 & this.j + this.S[this.i], a = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = a, this.S[255 & a + this.S[this.i]]
        }

        function U() {
            return new R
        }

        function V(a) {
            nb[ob++] ^= 255 & a, nb[ob++] ^= 255 & a >> 8, nb[ob++] ^= 255 & a >> 16, nb[ob++] ^= 255 & a >> 24, ob >= pb && (ob -= pb)
        }

        function W() {
            V((new Date).getTime())
        }

        function X() {
            if (null == mb) {
                for (W(), mb = U(), mb.init(nb), ob = 0; ob < nb.length; ++ob)nb[ob] = 0;
                ob = 0
            }
            return mb.next()
        }

        function Y(a) {
            var b;
            for (b = 0; b < a.length; ++b)a[b] = X()
        }

        function Z() {
        }

        function $(b, c) {
            return new a(b, c)
        }

        function _(b, c) {
            if (c < b.length + 11)return alert("Message too long for RSA"), null;
            for (var d = new Array, e = b.length - 1; e >= 0 && c > 0;) {
                var f = b.charCodeAt(e--);
                128 > f ? d[--c] = f : f > 127 && 2048 > f ? (d[--c] = 128 | 63 & f, d[--c] = 192 | f >> 6) : (d[--c] = 128 | 63 & f, d[--c] = 128 | 63 & f >> 6, d[--c] = 224 | f >> 12)
            }
            d[--c] = 0;
            for (var g = new Z, h = new Array; c > 2;) {
                for (h[0] = 0; 0 == h[0];)g.nextBytes(h);
                d[--c] = h[0]
            }
            return d[--c] = 2, d[--c] = 0, new a(d)
        }

        function ab() {
            this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
        }

        function bb(a, b) {
            null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = $(a, 16), this.e = parseInt(b, 16)) : alert("Invalid RSA public key")
        }

        function cb(a) {
            return a.modPowInt(this.e, this.n)
        }

        function db(a) {
            var b = _(a, this.n.bitLength() + 7 >> 3);
            if (null == b)return null;
            var c = this.doPublic(b);
            if (null == c)return null;
            var d = c.toString(16);
            return 0 == (1 & d.length) ? d : "0" + d
        }

        var eb, fb = 0xdeadbeefcafe, gb = 15715070 == (16777215 & fb);
        gb && "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = d, eb = 30) : gb && "Netscape" != navigator.appName ? (a.prototype.am = c, eb = 26) : (a.prototype.am = e, eb = 28), a.prototype.DB = eb, a.prototype.DM = (1 << eb) - 1, a.prototype.DV = 1 << eb;
        var hb = 52;
        a.prototype.FV = Math.pow(2, hb), a.prototype.F1 = hb - eb, a.prototype.F2 = 2 * eb - hb;
        var ib, jb, kb = "0123456789abcdefghijklmnopqrstuvwxyz", lb = new Array;
        for (ib = "0".charCodeAt(0), jb = 0; 9 >= jb; ++jb)lb[ib++] = jb;
        for (ib = "a".charCodeAt(0), jb = 10; 36 > jb; ++jb)lb[ib++] = jb;
        for (ib = "A".charCodeAt(0), jb = 10; 36 > jb; ++jb)lb[ib++] = jb;
        B.prototype.convert = C, B.prototype.revert = D, B.prototype.reduce = E, B.prototype.mulTo = F, B.prototype.sqrTo = G, I.prototype.convert = J, I.prototype.revert = K, I.prototype.reduce = L, I.prototype.mulTo = N, I.prototype.sqrTo = M, a.prototype.copyTo = h, a.prototype.fromInt = i, a.prototype.fromString = k, a.prototype.clamp = l, a.prototype.dlShiftTo = s, a.prototype.drShiftTo = t, a.prototype.lShiftTo = u, a.prototype.rShiftTo = v, a.prototype.subTo = w, a.prototype.multiplyTo = x, a.prototype.squareTo = y, a.prototype.divRemTo = z, a.prototype.invDigit = H, a.prototype.isEven = O, a.prototype.exp = P, a.prototype.toString = m, a.prototype.negate = n, a.prototype.abs = o, a.prototype.compareTo = p, a.prototype.bitLength = r, a.prototype.mod = A, a.prototype.modPowInt = Q, a.ZERO = j(0), a.ONE = j(1), R.prototype.init = S, R.prototype.next = T;
        var mb, nb, ob, pb = 256;
        if (null == nb) {
            nb = new Array, ob = 0;
            var qb;
            if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && "function" == typeof window.crypto.random) {
                var rb = window.crypto.random(32);
                for (qb = 0; qb < rb.length; ++qb)nb[ob++] = 255 & rb.charCodeAt(qb)
            }
            for (; pb > ob;)qb = Math.floor(65536 * Math.random()), nb[ob++] = qb >>> 8, nb[ob++] = 255 & qb;
            ob = 0, W()
        }
        Z.prototype.nextBytes = Y, ab.prototype.doPublic = cb, ab.prototype.setPublic = bb, ab.prototype.encrypt = db, this.RSAKey = ab
    }.call(sinaSSOEncoder), SSOController
});
define("js/plugin/validation", ["jquery"], function (a) {
    var b = function (b) {
        var c = {
            empty: {exp: /[^\s]/, err: "请填写%s"},
            number: {exp: /^[0-9]+$/, err: "%s只能输入数字"},
            integer: {exp: /^[0-9]+$/, err: "%s只能输入整数"},
            decimal: {exp: /^[0-9]+(\.[0-9]+)?$/, err: "%s只能输入整数或小数"},
            chinese: {exp: /^[\u2E80-\uFE4F]+$/, err: "%s只能输入汉字"},
            name: {exp: /^([\u4e00-\u9fa5|A-Z]+\s*\.?\s*)+$/, err: "%s只能由中文汉字或大写英文字母构成"},
            consignee: {exp: /^[a-zA-Z\u4E00-\u9FA5]+$/i, err: "%s只能由中文汉字或英文字母构成"},
            address: {exp: /^[0-9a-zA-Z\-\u4E00-\u9FA5]+$/i, err: "%s只能由中文汉字、英文字母或者数字构成"},
            truename: {exp: /^[^\*]{2,50}$/, err: "%s输入错误，请重新输入"},
            ID: {exp: /^\d{14}[0-9a-zA-Z]$|^\d{17}[0-9a-zA-Z]$/, err: "身份证号码输入错误，请重新输入"},
            passport: {exp: /^[A-Za-z]\d{7,8}$/, err: "护照号码输入错误，请重新输入"},
            email: {exp: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, err: "邮箱格式错误"},
            miemail: {exp: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2,5})?)$/, err: "邮箱格式错误"},
            mobile: {exp: /^1\d{10}$/, err: "手机号输入错误，请重新输入"},
            r_mobile: {exp: /^1\d{10}$/, err: "请填写11位手机号码"},
            t_mobile_e: {exp: /[^\s]/, err: "手机号未填写"},
            t_mobile: {exp: /^1\d{10}$/, err: "请填写11位手机号码"},
            bank_card: {exp: /^[0-9\-]{8,32}$/, err: "请输入正确的%s"},
            CVV: {exp: /^\d{3}$/, err: "%s只能是3位数字"},
            vcode: {exp: /^\w{4,10}$/, err: "%s有误，请重新输入"},
            pvcode: {exp: /^\w{4,8}$/, err: "%s有误，请重新输入"},
            sms_vcode: {exp: /^\w{6,8}$/, err: "%s有误，请重新输入"},
            validDate: {exp: /^\d{4,10}$/, err: "%s只能是4~10位数字"},
            amount: {exp: /^[0-9]+(\.[0-9]{0,2})?$/, err: "%s必须为整数或小数，小数点后不超过2位"},
            wbAccount: {
                exp: /^1\d{10}$|^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                err: "%s必须是手机号或邮箱地址"
            },
            password: {exp: /^\S{6,20}$/, err: "%s长度只能为6~20位"},
            paypassword: {exp: /^\S{8,20}$/, err: "%s长度只能为8~20位"},
            v_paypassword: {exp: /^\S{1,50}$/, err: "%s长度必须小于50位"},
            wbPassword: {exp: /[^\s]/, err: "请输入微博登录密码"},
            zip: {exp: /^\d{6}$|^[\s]$/, err: "请正确的邮政编码"}
        }, d = {
            len: "%s1长度为%s2位",
            minlen: "%s1长度不能小于%s2位",
            maxlen: "%s1长度不能超过%s2位",
            minval: "%s1不能小于%s2",
            maxval: "%s1不能大于%s2"
        }, e = b.find("input[data-vfield]:visible:enabled"), f = !0, g = "";
        return a.each(e, function () {
            var b = a(this), e = b.attr("data-rules"), h = b.attr("data-vfield"), i = b.val();
            e = e.split(" ");
            for (var j = 0; j < e.length; j++) {
                if ("v_paypassword" == e[j] && (/[^\x00-\xff]/.test(i) || /\s+/.test(i))) {
                    b.val(""), f = !1, g = "支付密码错误";
                    break
                }
                if ("paypassword" == e[j]) {
                    if (parseInt(w.pwdStrength(i), 10) < 2) {
                        b.val(""), f = !1, g = "支付密码太简单了，请重新输入，建议你修改成大小写字母+数字+符号的混合式密码";
                        break
                    }
                    if (/[^\x00-\xff]/.test(i) || /\s+/.test(i)) {
                        b.val(""), f = !1, g = "支付密码必须由8-20位字母、数字或符号组成";
                        break
                    }
                }
                if ("amount" == e[j] && 0 == parseFloat(i, 10)) {
                    b.val(""), f = !1, g = "金额必须大于0";
                    break
                }
                if (c[e[j]] && !c[e[j]].exp.test(i)) {
                    var k = b.attr("data-etext_" + e[j]) || c[e[j]].err;
                    f = !1, g = k.replace(/%s/g, h);
                    break
                }
                if (d[e[j]]) {
                    var l = !0, m = b.attr("data-" + e[j]), n = parseInt(m, 10), o = parseFloat(m, 10);
                    switch (e[j]) {
                        case"len":
                            l = i.length == n;
                            break;
                        case"minlen":
                            l = i.length >= n;
                            break;
                        case"maxlen":
                            l = i.length <= n;
                            break;
                        case"minval":
                            l = parseFloat(i, 10) >= o;
                            break;
                        case"maxval":
                            l = parseFloat(i, 10) <= o;
                            break;
                        default:
                            l = !0
                    }
                    if (!l) {
                        var k = b.attr("data-etext_" + e[j]) || d[e[j]];
                        f = !1, g = k.replace(/%s1/g, h).replace(/%s2/g, m);
                        break
                    }
                }
            }
            return f ? void 0 : !1
        }), {result: f, msg: g}
    };
    return b
});
define("js/tpl/js/widget/login_dialog/dialog_box", [], function () {
    !function () {
        (window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tpl/js/widget/login_dialog/dialog_box.html"] = function () {
            function a(a, b, c, d, e) {
                var f = null, g = null, h = "";
                try {
                    h += '<div class="login_dialog d-e-sign" id="', h += d.suppressValue(d.contextOrFrameLookup(b, c, "rid"), a.autoesc), h += '">\r\n\r\n<span class="close_cross" data-close="#', h += d.suppressValue(d.contextOrFrameLookup(b, c, "rid"), a.autoesc), h += '" data-abandon="yes"></span>\r\n\r\n<h2>使用<img src="https://i1.weibopay.com/f/img/icon/weibo_23x19.gif" alt="weibo.com" />新浪微博账号登录</h2>\r\n\r\n<form class="login_dialog_form">\r\n<p><input class="input_field login_dialog-uname" autocomplete="off" type="text" placeholder="微博账号" tabindex="1" data-vfield="微博账号" data-rules="empty" /></p>\r\n\r\n<p><input class="input_field login_dialog-sinapwd" autocomplete="off" type="password" placeholder="登录密码" tabindex="2" data-vfield="登录密码" data-rules="empty" /></p>\r\n\r\n<p class="vcode_p login_dialog-pic_vcode"><input class="input_field login_dialog-vcode" type="text" placeholder="验证码" data-vfield="验证码" data-rules="empty" /><img class="login_dialog-vcimg" src="https://i1.weibopay.com/f/img/trinket/ing.png" alt="加载中……" /></p>\r\n\r\n<p class="vcode_p login_dialog-weidun_input"><a href="http://account.weibo.com/forgot/vdun" target="_blank">微盾挂失</a><input class="input_field weidun" type="text" placeholder="请输入微盾动态码" data-vfield="微盾动态码" data-rules="empty" /></p>\r\n\r\n<div class="tips"><a href="http://login.sina.com.cn/getpass.html" target="_blank">忘记密码？</a>', h += '</div>\r\n\r\n<p><input type="submit" class="btn-submit-w128" value="登&nbsp;&nbsp;&nbsp;录" />还没有微博账号？<a href="http://login.sina.com.cn/signup/signup.php?entry=weicaifu" target="_blank">注册</a></p>\r\n\r\n<!-- <p><a>使用其它账号登录</a></p> -->\r\n</form>\r\n\r\n<div class="login_dialog_register"><img src="https://i1.weibopay.com/f/img/separator/1.jpg" alt="|" class="separator" /><h3>还没有开通？</h3><h4>赶紧免费注册一个吧！</h4><a href="http://login.sina.com.cn/signup/signup.php?entry=weicaifu" class="instance_register_link btn-gently-w160" target="_blank">立即免费注册</a></div>\r\n</div>', e(null, h)
                } catch (i) {
                    e(d.handleError(i, f, g))
                }
            }

            return {root: a}
        }()
    }()
});
define("js/widget/login_dialog", ["jquery", "js/lib/base", "js/widget/account_sgs", "js/lib/sinasso", "js/plugin/validation", "js/components/nunjucks", "js/tpl/js/widget/login_dialog/dialog_box"], function (a, b, c, d, e, f) {
    return function (g) {
        var h = this;
        g = a.extend({
            cancel_callback: function () {
            }, login_callback: function () {
                a("#J-userinfo").remove(), b.helper.jsonpCall(b._data.origin + "/srv/accountinfo", function (c) {
                    b.helper.ajax_success(c, function (c) {
                        b.g_var.isLogin = c.isLogin;
                        var d = -1 !== window.location.host.indexOf("sina.com.cn") ? "userinfo-cpb" : "userinfo";
                        require(["js/components/nunjucks", "js/tpl/html/pub/" + d, "js/data/site_url"], function (b, e, f) {
                            var g = b.render("tpl/html/pub/" + d + ".html", a.extend(c, f));
                            a(".jewelry").prepend(g), a("#J-userinfo").css("visibility", "visible"), h.destroy()
                        }), b.helper.track_login()
                    }, function (a) {
                        console.log(a)
                    })
                })
            }, exlogin_callback: function () {
            }, init_callback: function () {
            }
        }, g), this.rid = b.helper.generate_rdmid("login_dialog_");
        var i = "sinaSSOController_" + this.rid;
        b.helper._init_login_controller(d, i), this.get_dialog = function () {
            return a("#" + h.rid)
        }, this.find_descendant = function (a) {
            return h.get_dialog().find(a)
        }, this.show = function (a) {
            b.util.cookie("SSOLoginState") ? b.helper.sina_auto_login() : (a ? h.get_dialog().children(".close_cross").hide() : h.get_dialog().children(".close_cross").show(), h.find_descendant(".login_dialog-uname").val(""), h.find_descendant(".login_dialog-sinapwd").val(""), h.get_dialog().css("top", b.helper.compute_layer_y(200) + "px").show().addClass("d-e-sign-active"), b.UI.shade(!0, 300), a || b.helper.event_handle.esc_keyup(".login_dialog", function () {
                h.hide()
            }))
        }, this.hide = function () {
            h.get_dialog().hide().removeClass("d-e-sign-active"), b.UI.shade(!1, 300)
        }, this._init = function () {
            j(), k(), setTimeout(function () {
                g.init_callback()
            }, 100)
        }, this.destroy = function () {
            b.UI.shade(!1), h.get_dialog().remove()
        }, this.change_account = function () {
            function a() {
                window[i].customLogoutCallBack = function (a) {
                    a.result ? h.show() : h.show()
                }, window[i].logout()
            }

            a()
        }, this.getSSOCTRL = function () {
            return window[i]
        }, this.setLoginCallback = function () {
            g.login_callback = cbfn
        }, this.getLoginCallBack = function () {
            return g.login_callback
        };
        var j = function () {
            var c = f.render("tpl/js/widget/login_dialog/dialog_box.html", {rid: h.rid});
            a("body").append(c), b.UI.generate_checkbox(h.find_descendant(".login_dialog-remember_me")), b.UI.generate_placeholder(h.find_descendant("input[type]"))
        }, k = function () {
            function d(a) {
                f(a.showpin)
            }

            function f(a) {
                h.find_descendant(".vcode_p").hide(), 1 == a && (j(), h.find_descendant(".login_dialog-pic_vcode").show(), h.find_descendant(".login_dialog-vcode").val("")), 2 == a && (h.find_descendant(".login_dialog-weidun_input").show(), h.find_descendant(".weidun").val(""))
            }

            function j() {
                h.find_descendant(".login_dialog-vcimg").attr("src", window[i].getPinCodeUrl())
            }

            h.find_descendant(".close_cross").click(function () {
                h.hide(), g.cancel_callback()
            }), window[i].customLoginCallBack = function (a) {
                if (b.UI.submiter_block(h.find_descendant("[type=submit]"), !1), a.result)g.login_callback(), g.exlogin_callback(), ga && ga("send", "event", "user", "login", "登录成功"); else switch (b.UI.show_top_dialog({
                    msg: a.reason,
                    type: "failure",
                    auto_hide: !0,
                    hide_time: 6e3,
                    time: 230
                }), a.errno) {
                    case 5025:
                    case"5025":
                    case 5024:
                    case"5024":
                        f(2);
                        break;
                    case 4049:
                    case"4049":
                    case 2070:
                    case"2070":
                        f(1)
                }
            }, h.find_descendant(".login_dialog_form").submit(function () {
                var c = e(a(this));
                if (!c.result)return b.UI.show_top_dialog({msg: c.msg, auto_hide: !0, hide_time: 6e3, time: 230}), !1;
                ga && ga("send", "event", "user", "login", "头部尝试登录"), h.find_descendant(".login_dialog-weidun_input:visible").length && (window[i].loginExtraQuery.vsnval = a.trim(h.find_descendant(".weidun").val())), h.find_descendant(".login_dialog-pic_vcode:visible").length && (window[i].loginExtraQuery.door = a.trim(h.find_descendant(".login_dialog-vcode").val()));
                var d = h.find_descendant("[type=submit]");
                return b.UI.submiter_block(d) ? !1 : (b.UI.submiter_block(d, !0), window[i].login(a.trim(h.find_descendant(".login_dialog-uname").val()), h.find_descendant(".login_dialog-sinapwd").val(), h.find_descendant(".login_dialog-remember_me").prop("checked") ? "14" : "1"), setTimeout(function () {
                    b.UI.submiter_block(h.find_descendant("[type=submit]")) && window.location.reload()
                }, 6666), !1)
            }), h.find_descendant(".login_dialog-uname").blur(function () {
                window[i].prelogin({username: a.trim(a(this).val()), checkpin: "1"}, d)
            }), h.find_descendant(".login_dialog-vcimg").click(function () {
                j()
            }), c(h.find_descendant(".login_dialog-uname"))
        };
        this._init()
    }
});
define("js/gallery/count_down", ["jquery"], function (a) {
    return function (b, c, d, e, f, g) {
        function h(a, b, c) {
            if (a.data("over"))return !1;
            var d = parseInt(a.html(), 10);
            if (0 === d) {
                var e = parseInt(b.html(), 10);
                if (0 === e) {
                    var f = parseInt(c.html(), 10);
                    0 === f ? (a.data("over", !0), "function" == typeof g && g(a, b, c)) : (c.html(--f), b.html(59), a.html(59))
                } else b.html(--e), a.html(59)
            } else a.html(--d)
        }

        function i(b) {
            var f = (b - j.start) % 1e3 > 500 ? 0 : (b - j.start) % 1e3;
            setTimeout(function () {
                a("." + e).each(function () {
                    h(a(this), a(this).siblings("." + d), a(this).siblings("." + c))
                }), i((new Date).getTime())
            }, 1e3 - f)
        }

        var j = this;
        this.init = function (g) {
            var h = !0;
            a("." + b).each(function () {
                var b = a(this), g = parseInt(b.html(), 10), i = b.parent();
                if (isNaN(g))i.remove(), h = !1; else if (f > g)i.remove(), h = !1; else {
                    var j = g - f;
                    if (j /= 1e3, j = Math.round(j), j > 86400)b.replaceWith("<span>" + Math.floor(j / 86400) + "</span>天"); else {
                        var k = "0", l = "0", m = "0";
                        j > 0 ? (k = Math.floor(j / 3600), j %= 3600, l = Math.floor(j / 60), j %= 60, m = j, b.replaceWith('<span class="' + c + '">' + k.toString() + '</span>小时 <span class="' + d + '">' + l.toString() + '</span>分 <span class="' + e + '">' + m.toString() + "</span>秒")) : (i.remove(), h = !1)
                    }
                    i.removeClass("dn")
                }
            }), j.start = (new Date).getTime(), i(j.start), "function" == typeof g && g(h)
        }
    }
});
define("js/app/index/list/main", ["js/lib/base", "js/widget/login_dialog", "js/gallery/count_down"], function (a, b, c) {
    return function (d) {
        $("body").addClass("dark-bg"), $(function () {
            function f(b, c) {
                if (!a.g_var.stime || c) {
                    var d = new Date;
                    d = d.getTime(), a.helper.jsonpCall(a._data.origin + "/srv/nowtime?", function (c) {
                        a.helper.ajax_success(c, function (c) {
                            c = parseInt(c, 10), b(c), a.g_var.stime = c
                        }, function () {
                            b(d), a.g_var.stime = d
                        })
                    })
                } else b(a.g_var.stime)
            }

            function g(a, b) {
                b ? (a.find(".now_buy").removeClass("dn"), a.find(".see_detail").addClass("dn")) : (a.find(".now_buy").addClass("dn"), a.find(".see_detail").removeClass("dn"))
            }

            var h = d.category;
            "all" === h && $("#J-all").addClass("active"), "p2b" === h && $("#J-bills").addClass("active"), "p2p" === h && $("#J-P2P").addClass("active"), "combination" === h && $("#J-combination").addClass("active"), "other" === h && $("#J-others").addClass("active"), "insurance" === h && $("#J-Insurance").addClass("active"), $(".floor-card").each(function () {
                $(this).prepend('<span class="colorful_column" style="background:' + a.UI.gen_rd_color() + '"></span>')
            }), a.helper.jsonpCall(a._data.origin + "/srv/getLast7NetsAndDate", function (b) {
                a.helper.ajax_success(b, function (b) {
                    var c = $(".precious_per");
                    $(".today_time").html(a.util.htmlEncode(b.reasons.lastNetDate)), c.html(a.util.htmlEncode(b.reasons.last7Nets + "%")),
                        a.UI.number_exciting(c)
                }, function () {
                })
            }),
                f(function (b) {
                    function d(c, d) {
                        var e = "", f = {};
                        $(".floor-card[data-status=1][data-type=" + c + "]").each(function () {
                            var a = $(this);
                            if (!a.find(".now_buy").hasClass("dn")) {
                                var b = a.attr("data-id");
                                e += b + ",", f[b] = a
                            }
                        }), "" !== e && (e = e.slice(0, -1), a.helper.jsonpCall(a._data.origin + "/srv/" + d + "?c=" + e, function (c) {
                            a.helper.ajax_success(c, function (a) {
                                $.each(a.reasons, function (a, c) {
                                    var d = $(".floor-card[data-id=" + a + "]"), e = parseInt(d.attr("data-end"), 10);
                                    "0" === c ? (d.prepend('<img class="status_img" src="https://i1.weibopay.com/f/img/app/index/home/status-sell_out.png?2015061219" alt="已售罄">'), g(d, !1)) : !isNaN(e) && b > e && (d.prepend('<img class="status_img" src="https://i1.weibopay.com/f/img/app/index/home/status-end.png?2015061219" alt="已过期">'), g(d, !1))
                                })
                            }, function () {
                            })
                        }))
                    }

                    $(".cd-timestamp").each(function () {
                        var a = parseInt($(this).html(), 10), b = $(this).parents(".floor-card");
                        !b.attr("data-start") && b.attr("data-start", a)
                    });
                    var e = new c("cd-timestamp", "cd-hour", "cd-min", "cd-sec", b, function (a) {
                        a.parents(".floor-card").find(".status_img").remove(), a.parents(".floor-card").find(".f-c-time").remove(), g(a.parents(".floor-card"), !0)
                    });
                    e.init(), $(".floor-card[data-status]").each(function () {
                        var a = $(this), c = parseInt(a.attr("data-start"), 10), d = $(this).attr("data-status");
                        "1" === d ? !isNaN(c) && c > b ? (a.prepend('<img class="status_img" src="https://i1.weibopay.com/f/img/app/index/home/status-coming.png?2015061219" alt="即将开售">'), a.find(".see_detail").removeClass("dn")) : a.find(".now_buy").removeClass("dn") : (a.find(".see_detail").removeClass("dn"), "2" === d ? (a.prepend('<img class="status_img" src="https://i1.weibopay.com/f/img/app/index/home/status-sell_out.png?2015061219" alt="已售罄">'), a.find(".f-c-time").addClass("dn")) : "3" === d && (a.prepend('<img class="status_img" src="https://i1.weibopay.com/f/img/app/index/home/status-end.png?2015061219" alt="已过期">'), a.find(".f-c-time").addClass("dn")))
                    }), d("p2p", "getP2pInfos"), d("p2b", "getExclusiveInfos"), d("p2bw", "getExclusiveInfos"), d("insurance", "getExclusiveInfos")
                }), a.helper.get_login_info(function () {
                $(".now_buy, .now_in").on("click", function () {
                    if ("0" === a.g_var.isLogin) {
                        var c = new b({
                            exlogin_callback: function () {
                                window.location.reload()
                            }
                        });
                        return c.show(), !1
                    }
                    return $(this).hasClass("now_in") && a.util.redirect(a._data.base_url + "/savingsbank/purchase"), e.preventDefault(), !1
                })
            }),
                a.UI.number_exciting($(".per"))
        })
    }
});