define("js/data/site_url", [], function () {
    return {
        profile: FI._data.base_url + "/account/main",
        indexPage: FI._data.base_url + "/home",
        walletIndexPage: "https://pay.sina.com.cn",
        preciousHome: FI._data.base_url + "/my/savingsbank",
        cpbHome: "https://pay.sina.com.cn/caopanbao/cpb/home"
    }
});
define("js/components/nunjucks", [], function () {
    return function () {
        Function.prototype.bind || (Function.prototype.bind = function (a) {
            var b = [].slice, c = this, d = b.call(arguments, 1), e = function () {
                if (this instanceof e) {
                    var f, g, h = function () {
                    };
                    return h.prototype = c.prototype, f = new h, g = c.apply(f, d.concat(b.call(arguments))), "object" == typeof g && null !== g ? g : f
                }
                return c.apply(a, d.concat(b.call(arguments)))
            };
            return e
        });
        var a = {};
        !function () {
            function b(a, c, d) {
                var e = function () {
                };
                e.prototype = a.prototype;
                var f = new e, g = /xyz/.test(function () {
                }) ? /\bparent\b/ : /.*/;
                d = d || {};
                for (var h in d) {
                    var i = d[h], j = f[h];
                    f[h] = "function" == typeof j && "function" == typeof i && g.test(i) ? function (a, b) {
                        return function () {
                            var c = this.parent;
                            this.parent = b;
                            var d = a.apply(this, arguments);
                            return this.parent = c, d
                        }
                    }(i, j) : i
                }
                f.typename = c;
                var k = function () {
                    f.init && f.init.apply(this, arguments)
                };
                return k.prototype = f, k.prototype.constructor = k, k.extend = function (a, c) {
                    return "object" == typeof a && (c = a, a = "anonymous"), b(k, a, c)
                }, k
            }

            a.object = b(Object, "Object", {})
        }(), function () {
            var b = Array.prototype, c = Object.prototype, d = {
                "&": "&amp;",
                '"': "&quot;",
                "'": "&#39;",
                "<": "&lt;",
                ">": "&gt;"
            }, e = function (a) {
                return d[a]
            }, f = a.lib = {};
            f.withPrettyErrors = function (a, b, c) {
                try {
                    return c()
                } catch (d) {
                    if (d.Update || (d = new f.TemplateError(d)), d.Update(a), !b) {
                        var e = d;
                        d = new Error(e.message), d.name = e.name
                    }
                    throw d
                }
            }, f.TemplateError = function (a, b, c) {
                var d = this;
                return a instanceof Error ? (d = a, a = a.name + ": " + a.message) : Error.captureStackTrace && Error.captureStackTrace(d), d.name = "Template render error", d.message = a, d.lineno = b, d.colno = c, d.firstUpdate = !0, d.Update = function (a) {
                    var b = "(" + (a || "unknown path") + ")";
                    return this.firstUpdate && (this.lineno && this.colno ? b += " [Line " + this.lineno + ", Column " + this.colno + "]" : this.lineno && (b += " [Line " + this.lineno + "]")), b += "\n ", this.firstUpdate && (b += " "), this.message = b + (this.message || ""), this.firstUpdate = !1, this
                }, d
            }, f.TemplateError.prototype = Error.prototype, f.escape = function (a) {
                return a.replace(/[&"'<>]/g, e)
            }, f.isFunction = function (a) {
                return "[object Function]" == c.toString.call(a)
            }, f.isArray = Array.isArray || function (a) {
                return "[object Array]" == c.toString.call(a)
            }, f.isString = function (a) {
                return "[object String]" == c.toString.call(a)
            }, f.isObject = function (a) {
                return a === Object(a)
            }, f.groupBy = function (a, b) {
                for (var c = {}, d = f.isFunction(b) ? b : function (a) {
                    return a[b]
                }, e = 0; e < a.length; e++) {
                    var g = a[e], h = d(g, e);
                    (c[h] || (c[h] = [])).push(g)
                }
                return c
            }, f.toArray = function (a) {
                return Array.prototype.slice.call(a)
            }, f.without = function (a) {
                var b = [];
                if (!a)return b;
                for (var c = -1, d = a.length, e = f.toArray(arguments).slice(1); ++c < d;)-1 === e.indexOf(a[c]) && b.push(a[c]);
                return b
            }, f.extend = function (a, b) {
                for (var c in b)a[c] = b[c];
                return a
            }, f.repeat = function (a, b) {
                for (var c = "", d = 0; b > d; d++)c += a;
                return c
            }, f.each = function (a, c, d) {
                if (null != a)if (b.each && a.each == b.each)a.forEach(c, d); else if (a.length === +a.length)for (var e = 0, f = a.length; f > e; e++)c.call(d, a[e], e, a)
            }, f.map = function (a, c) {
                var d = [];
                if (null == a)return d;
                if (b.map && a.map === b.map)return a.map(c);
                for (var e = 0; e < a.length; e++)d[d.length] = c(a[e], e);
                return a.length === +a.length && (d.length = a.length), d
            }, f.asyncParallel = function (a, b) {
                for (var c = a.length, d = new Array(c), e = 0, f = function (a) {
                    return function (f) {
                        d[a] = f, e += 1, e === c && b(d)
                    }
                }, g = 0; c > g; g++)a[g](f(g))
            }, f.asyncIter = function (a, b, c) {
                function d() {
                    e++, e < a.length ? b(a[e], e, d, c) : c()
                }

                var e = -1;
                d()
            }, f.asyncFor = function (a, b, c) {
                function d() {
                    h++;
                    var f = e[h];
                    g > h ? b(f, a[f], h, g, d) : c()
                }

                var e = f.keys(a), g = e.length, h = -1;
                d()
            }, Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
                if (null == a)throw new TypeError;
                var c = Object(a), d = c.length >>> 0;
                if (0 === d)return -1;
                var e = 0;
                if (arguments.length > 2 && (e = Number(arguments[2]), e != e ? e = 0 : 0 != e && 1 / 0 != e && e != -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e)))), e >= d)return -1;
                for (var f = e >= 0 ? e : Math.max(d - Math.abs(e), 0); d > f; f++)if (f in c && c[f] === b)return f;
                return -1
            }), Array.prototype.map || (Array.prototype.map = function () {
                throw new Error("map is unimplemented for this js engine")
            }), f.keys = function (a) {
                if (Object.prototype.keys)return a.keys();
                var b = [];
                for (var c in a)a.hasOwnProperty(c) && b.push(c);
                return b
            }
        }(), function () {
            function b(a, b, c) {
                return function () {
                    var f, g = e(arguments), h = d(arguments);
                    if (g > a.length) {
                        f = Array.prototype.slice.call(arguments, 0, a.length);
                        for (var i = Array.prototype.slice.call(arguments, f.length, g), j = 0; j < i.length; j++)j < b.length && (h[b[j]] = i[j]);
                        f.push(h)
                    } else if (g < a.length) {
                        f = Array.prototype.slice.call(arguments, 0, g);
                        for (var j = g; j < a.length; j++) {
                            var k = a[j];
                            f.push(h[k]), delete h[k]
                        }
                        f.push(h)
                    } else f = arguments;
                    return c.apply(this, f)
                }
            }

            function c(a) {
                return a.__keywords = !0, a
            }

            function d(a) {
                var b = a.length;
                if (b) {
                    var c = a[b - 1];
                    if (c && c.hasOwnProperty("__keywords"))return c
                }
                return {}
            }

            function e(a) {
                var b = a.length;
                if (0 === b)return 0;
                var c = a[b - 1];
                return c && c.hasOwnProperty("__keywords") ? b - 1 : b
            }

            function f(a) {
                if ("string" != typeof a)return a;
                this.toString = function () {
                    return a
                }, this.length = a.length;
                for (var b = ["charAt", "charCodeAt", "concat", "contains", "endsWith", "fromCharCode", "indexOf", "lastIndexOf", "length", "localeCompare", "match", "quote", "replace", "search", "slice", "split", "startsWith", "substr", "substring", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase", "trim", "trimLeft", "trimRight"], c = 0; c < b.length; c++)this[b[c]] = h(a[b[c]])
            }

            function g(a, b) {
                return a instanceof f ? new f(b) : b.toString()
            }

            function h(a) {
                var b = typeof a;
                return "string" === b ? new f(a) : "function" !== b ? a : function () {
                    var b = a.apply(this, arguments);
                    return "string" == typeof b ? new f(b) : b
                }
            }

            function i(a, b) {
                return a = void 0 !== a && null !== a ? a : "", b && "string" == typeof a && (a = p.escape(a)), a
            }

            function j(a, b) {
                return a = a || {}, "function" == typeof a[b] ? function () {
                    return a[b].apply(a, arguments)
                } : a[b]
            }

            function k(a, b, c) {
                if (!a)throw new Error("Unable to call `" + b + "`, which is undefined or falsey");
                if ("function" != typeof a)throw new Error("Unable to call `" + b + "`, which is not a function");
                return a.apply(this, c)
            }

            function l(a, b, c) {
                var d = b.lookup(c);
                return void 0 !== d && null !== d ? d : a.lookup(c)
            }

            function m(a, b, c) {
                return a.lineno ? a : new p.TemplateError(a, b, c)
            }

            function n(a, b, c, d) {
                if (p.isArray(a)) {
                    var e = a.length;
                    p.asyncIter(a, function (a, d, f) {
                        switch (b) {
                            case 1:
                                c(a, d, e, f);
                                break;
                            case 2:
                                c(a[0], a[1], d, e, f);
                                break;
                            case 3:
                                c(a[0], a[1], a[2], d, e, f);
                                break;
                            default:
                                a.push(d, f), c.apply(this, a)
                        }
                    }, d)
                } else p.asyncFor(a, function (a, b, d, e, f) {
                    c(a, b, d, e, f)
                }, d)
            }

            function o(a, b, c, d) {
                function e(a, b) {
                    h++, g[a] = b, h == f && d(null, g.join(""))
                }

                var f, g, h = 0;
                if (p.isArray(a))if (f = a.length, g = new Array(f), 0 == f)d(null, ""); else for (var i = 0; i < a.length; i++) {
                    var j = a[i];
                    switch (b) {
                        case 1:
                            c(j, i, f, e);
                            break;
                        case 2:
                            c(j[0], j[1], i, f, e);
                            break;
                        case 3:
                            c(j[0], j[1], j[2], i, f, e);
                            break;
                        default:
                            j.push(i, e), c.apply(this, j)
                    }
                } else {
                    var k = p.keys(a);
                    if (f = k.length, g = new Array(f), 0 == f)d(null, ""); else for (var i = 0; i < k.length; i++) {
                        var l = k[i];
                        c(l, a[l], i, f, e)
                    }
                }
            }

            var p = a.lib, q = a.object, r = q.extend({
                init: function (a) {
                    this.variables = {}, this.parent = a
                }, set: function (a, b) {
                    for (var c = a.split("."), d = this.variables, e = 0; e < c.length - 1; e++) {
                        var f = c[e];
                        d[f] || (d[f] = {}), d = d[f]
                    }
                    d[c[c.length - 1]] = b
                }, get: function (a) {
                    var b = this.variables[a];
                    return void 0 !== b && null !== b ? b : null
                }, lookup: function (a) {
                    var b = this.parent, c = this.variables[a];
                    return void 0 !== c && null !== c ? c : b && b.lookup(a)
                }, push: function () {
                    return new r(this)
                }, pop: function () {
                    return this.parent
                }
            });
            a.runtime = {
                Frame: r,
                makeMacro: b,
                makeKeywordArgs: c,
                numArgs: e,
                suppressValue: i,
                memberLookup: j,
                contextOrFrameLookup: l,
                callWrap: k,
                handleError: m,
                isArray: p.isArray,
                asyncEach: p.asyncEach,
                keys: p.keys,
                SafeString: f,
                copySafeness: g,
                markSafe: h,
                asyncEach: n,
                asyncAll: o
            }
        }(), function () {
            var b = a.object, c = a.lib, d = b.extend({
                on: function (a, b) {
                    this.listeners = this.listeners || {}, this.listeners[a] = this.listeners[a] || [], this.listeners[a].push(b)
                }, emit: function (a) {
                    var b = Array.prototype.slice.call(arguments, 1);
                    this.listeners && this.listeners[a] && c.each(this.listeners[a], function (a) {
                        a.apply(null, b)
                    })
                }
            });
            a.loader = d
        }(), function () {
            var b = a.loader, c = b.extend({
                init: function (a, b) {
                    this.precompiled = window.nunjucksPrecompiled || {}, this.baseURL = a || "", this.neverUpdate = b
                }, getSource: function (a) {
                    if (this.precompiled[a])return {src: {type: "code", obj: this.precompiled[a]}, path: a};
                    var b = this.fetch(this.baseURL + "/" + a);
                    return b ? {src: b, path: a, noCache: this.neverUpdate} : null
                }, fetch: function (a) {
                    var b, c, d = !0;
                    return window.XMLHttpRequest ? b = new XMLHttpRequest : window.ActiveXObject && (b = new ActiveXObject("Microsoft.XMLHTTP")), b.onreadystatechange = function () {
                        4 == b.readyState && 200 == b.status && d && (d = !1, c = b.responseText)
                    }, a += (-1 === a.indexOf("?") ? "?" : "&") + "s=" + (new Date).getTime(), b.open("GET", a, !1), b.send(), c
                }
            });
            a["web-loaders"] = {WebLoader: c}
        }(), function () {
            a.loaders = "undefined" == typeof window ? a["node-loaders"] : a["web-loaders"]
        }(), function () {
            var b = a.lib, c = a.runtime, d = {
                abs: function (a) {
                    return Math.abs(a)
                }, batch: function (a, b, c) {
                    for (var d = [], e = [], f = 0; f < a.length; f++)0 === f % b && e.length && (d.push(e), e = []), e.push(a[f]);
                    if (e.length) {
                        if (c)for (var f = e.length; b > f; f++)e.push(c);
                        d.push(e)
                    }
                    return d
                }, capitalize: function (a) {
                    var b = a.toLowerCase();
                    return c.copySafeness(a, b.charAt(0).toUpperCase() + b.slice(1))
                }, center: function (a, d) {
                    if (d = d || 80, a.length >= d)return a;
                    var e = d - a.length, f = b.repeat(" ", e / 2 - e % 2), g = b.repeat(" ", e / 2);
                    return c.copySafeness(a, f + a + g)
                }, "default": function (a, b) {
                    return a ? a : b
                }, dictsort: function (a, c, d) {
                    if (!b.isObject(a))throw new b.TemplateError("dictsort filter: val must be an object");
                    var e = [];
                    for (var f in a)e.push([f, a[f]]);
                    var g;
                    if (void 0 === d || "key" === d)g = 0; else {
                        if ("value" !== d)throw new b.TemplateError("dictsort filter: You can only sort by either key or value");
                        g = 1
                    }
                    return e.sort(function (a, d) {
                        var e = a[g], f = d[g];
                        return c || (b.isString(e) && (e = e.toUpperCase()), b.isString(f) && (f = f.toUpperCase())), e > f ? 1 : e == f ? 0 : -1
                    }), e
                }, escape: function (a) {
                    return "string" == typeof a || a instanceof c.SafeString ? b.escape(a) : a
                }, safe: function (a) {
                    return c.markSafe(a)
                }, first: function (a) {
                    return a[0]
                }, groupby: function (a, c) {
                    return b.groupBy(a, c)
                }, indent: function (a, d, e) {
                    d = d || 4;
                    for (var f = "", g = a.split("\n"), h = b.repeat(" ", d), i = 0; i < g.length; i++)f += 0 != i || e ? h + g[i] + "\n" : g[i] + "\n";
                    return c.copySafeness(a, f)
                }, join: function (a, c, d) {
                    return c = c || "", d && (a = b.map(a, function (a) {
                        return a[d]
                    })), a.join(c)
                }, last: function (a) {
                    return a[a.length - 1]
                }, length: function (a) {
                    return a.length
                }, list: function (a) {
                    if (b.isString(a))return a.split("");
                    if (b.isObject(a)) {
                        var c = [];
                        if (Object.keys)c = Object.keys(a); else for (var d in a)c.push(d);
                        return b.map(c, function (b) {
                            return {key: b, value: a[b]}
                        })
                    }
                    throw new b.TemplateError("list filter: type not iterable")
                }, lower: function (a) {
                    return a.toLowerCase()
                }, random: function (a) {
                    return a[Math.floor(Math.random() * a.length)]
                }, replace: function (a, b, d, e) {
                    var f = a, g = f, h = 1;
                    for (f = f.replace(b, d); g != f && !(h >= e);)g = f, f = f.replace(b, d), h++;
                    return c.copySafeness(a, f)
                }, reverse: function (a) {
                    var e;
                    return e = b.isString(a) ? d.list(a) : b.map(a, function (a) {
                        return a
                    }), e.reverse(), b.isString(a) ? c.copySafeness(a, e.join("")) : e
                }, round: function (a, b, c) {
                    b = b || 0;
                    var d, e = Math.pow(10, b);
                    return d = "ceil" == c ? Math.ceil : "floor" == c ? Math.floor : Math.round, d(a * e) / e
                }, slice: function (a, b, c) {
                    for (var d = Math.floor(a.length / b), e = a.length % b, f = 0, g = [], h = 0; b > h; h++) {
                        var i = f + h * d;
                        e > h && f++;
                        var j = f + (h + 1) * d, k = a.slice(i, j);
                        c && h >= e && k.push(c), g.push(k)
                    }
                    return g
                }, sort: function (a, c, d, e) {
                    return a = b.map(a, function (a) {
                        return a
                    }), a.sort(function (a, f) {
                        var g, h;
                        return e ? (g = a[e], h = f[e]) : (g = a, h = f), !d && b.isString(g) && b.isString(h) && (g = g.toLowerCase(), h = h.toLowerCase()), h > g ? c ? 1 : -1 : g > h ? c ? -1 : 1 : 0
                    }), a
                }, string: function (a) {
                    return c.copySafeness(a, a)
                }, title: function (a) {
                    for (var b = a.split(" "), e = 0; e < b.length; e++)b[e] = d.capitalize(b[e]);
                    return c.copySafeness(a, b.join(" "))
                }, trim: function (a) {
                    return c.copySafeness(a, a.replace(/^\s*|\s*$/g, ""))
                }, truncate: function (a, b, d, e) {
                    var f = a;
                    if (b = b || 255, a.length <= b)return a;
                    if (d)a = a.substring(0, b); else {
                        var g = a.lastIndexOf(" ", b);
                        -1 === g && (g = b), a = a.substring(0, g)
                    }
                    return a += void 0 !== e && null !== e ? e : "...", c.copySafeness(f, a)
                }, upper: function (a) {
                    return a.toUpperCase()
                }, urlencode: function (a) {
                    var c = encodeURIComponent;
                    if (b.isString(a))return c(a);
                    var d;
                    if (b.isArray(a))d = a.map(function (a) {
                        return c(a[0]) + "=" + c(a[1])
                    }); else {
                        d = [];
                        for (var e in a)a.hasOwnProperty(e) && d.push(c(e) + "=" + c(a[e]))
                    }
                    return d.join("&")
                }, wordcount: function (a) {
                    return a.match(/\w+/g).length
                }, "float": function (a, b) {
                    var c = parseFloat(a);
                    return isNaN(c) ? b : c
                }, "int": function (a, b) {
                    var c = parseInt(a, 10);
                    return isNaN(c) ? b : c
                }
            };
            d.d = d["default"], d.e = d.escape, a.filters = d
        }(), function () {
            function b(a) {
                var b = -1, c = null;
                return {
                    reset: function () {
                        b = -1, c = null
                    }, next: function () {
                        return b++, b >= a.length && (b = 0), c = a[b]
                    }
                }
            }

            function c(a) {
                a = a || ",";
                var b = !0;
                return function () {
                    var c = b ? "" : a;
                    return b = !1, c
                }
            }

            var d = {
                range: function (a, b, c) {
                    b ? c || (c = 1) : (b = a, a = 0, c = 1);
                    for (var d = [], e = a; b > e; e += c)d.push(e);
                    return d
                }, cycler: function () {
                    return b(Array.prototype.slice.call(arguments))
                }, joiner: function (a) {
                    return c(a)
                }
            };
            a.globals = d
        }(), function () {
            var b = a.lib, c = a.object, d = a.lexer, e = a.compiler, f = a.filters, g = a.loaders, h = a.runtime, i = a.globals, j = h.Frame, k = c.extend({
                init: function (a, c) {
                    c = c || {}, this.dev = !!c.dev, this.autoesc = !!c.autoescape, this.loaders = a ? b.isArray(a) ? a : [a] : g.FileSystemLoader ? [new g.FileSystemLoader("views")] : [new g.WebLoader("/views")], this.initCache(), this.filters = {}, this.asyncFilters = [], this.extensions = {}, this.extensionsList = [], c.tags && d.setTags(c.tags);
                    for (var e in f)this.addFilter(e, f[e])
                }, initCache: function () {
                    var a = {};
                    b.each(this.loaders, function (b) {
                        b.on("update", function (b) {
                            a[b] = null
                        })
                    }), this.cache = a
                }, addExtension: function (a, b) {
                    b._name = a, this.extensions[a] = b, this.extensionsList.push(b)
                }, getExtension: function (a) {
                    return this.extensions[a]
                }, addFilter: function (a, b, c) {
                    var d = b;
                    c && this.asyncFilters.push(a), this.filters[a] = d
                }, getFilter: function (a) {
                    if (!this.filters[a])throw new Error("filter not found: " + a);
                    return this.filters[a]
                }, getTemplate: function (a, c, d) {
                    if (a && a.raw && (a = a.raw), b.isFunction(c) && (d = c, c = !1), "string" != typeof a)throw new Error("template names must be a string: " + a);
                    var e = this.cache[a];
                    if (!e) {
                        var f;
                        return b.asyncIter(this.loaders, function (b, c, d, e) {
                            function f(a) {
                                a ? e(a) : d()
                            }

                            b.async ? b.getSource(a, function (a, b) {
                                if (a)throw a;
                                f(b)
                            }) : f(b.getSource(a))
                        }, function (b) {
                            if (b) {
                                var e = new m(b.src, this, b.path, c);
                                b.noCache || (this.cache[a] = e), d ? d(null, e) : f = e
                            } else {
                                var g = new Error("template not found: " + a);
                                if (!d)throw g;
                                d(g)
                            }
                        }.bind(this)), f
                    }
                    return c && e.compile(), d ? (d(null, e), void 0) : e
                }, express: function (a) {
                    function b(a) {
                        this.name = a, this.path = a
                    }

                    var c = this;
                    b.prototype.render = function (a, b) {
                        c.render(this.name, a, b)
                    }, a.set("view", b)
                }, render: function (a, c, d) {
                    b.isFunction(c) && (d = c, c = null);
                    var e = null;
                    return this.getTemplate(a, function (a, b) {
                        if (a && d)d(a); else {
                            if (a)throw a;
                            b.render(c, d || function (a, b) {
                                if (a)throw a;
                                e = b
                            })
                        }
                    }), e
                }, renderString: function (a, b, c) {
                    var d = new m(a, this);
                    return d.render(b, c)
                }
            }), l = c.extend({
                init: function (a, b) {
                    this.ctx = a, this.blocks = {}, this.exported = [];
                    for (var c in b)this.addBlock(c, b[c])
                }, lookup: function (a) {
                    return a in i && !(a in this.ctx) ? i[a] : this.ctx[a]
                }, setVariable: function (a, b) {
                    this.ctx[a] = b
                }, getVariables: function () {
                    return this.ctx
                }, addBlock: function (a, b) {
                    this.blocks[a] = this.blocks[a] || [], this.blocks[a].push(b)
                }, getBlock: function (a) {
                    if (!this.blocks[a])throw new Error('unknown block "' + a + '"');
                    return this.blocks[a][0]
                }, getSuper: function (a, b, c, d, e, f) {
                    var g = (this.blocks[b] || []).indexOf(c), h = this.blocks[b][g + 1], i = this;
                    if (-1 == g || !h)throw new Error('no super block available for "' + b + '"');
                    h(a, i, d, e, f)
                }, addExport: function (a) {
                    this.exported.push(a)
                }, getExported: function () {
                    for (var a = {}, b = 0; b < this.exported.length; b++) {
                        var c = this.exported[b];
                        a[c] = this.ctx[c]
                    }
                    return a
                }
            }), m = c.extend({
                init: function (a, c, d, e) {
                    if (this.env = c || new k, b.isObject(a))switch (a.type) {
                        case"code":
                            this.tmplProps = a.obj;
                            break;
                        case"string":
                            this.tmplStr = a.obj
                    } else {
                        if (!b.isString(a))throw new Error("src must be a string or an object describing the source");
                        this.tmplStr = a
                    }
                    this.path = d, e ? b.withPrettyErrors(this.path, this.env.dev, this._compile.bind(this)) : this.compiled = !1
                }, render: function (a, c, d) {
                    return "function" == typeof a ? (d = a, a = {}) : "function" == typeof c && (d = c, c = null), b.withPrettyErrors(this.path, this.env.dev, function () {
                        this.compile();
                        var b = new l(a || {}, this.blocks), e = null;
                        return this.rootRenderFunc(this.env, b, c || new j, h, d || function (a, b) {
                            if (a)throw a;
                            e = b
                        }), e
                    }.bind(this))
                }, getExported: function (a) {
                    this.compile();
                    var b = new l({}, this.blocks);
                    this.rootRenderFunc(this.env, b, new j, h, function () {
                        a(null, b.getExported())
                    })
                }, compile: function () {
                    this.compiled || this._compile()
                }, _compile: function () {
                    var a;
                    if (this.tmplProps)a = this.tmplProps; else {
                        var b = e.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path), c = new Function(b);
                        a = c()
                    }
                    this.blocks = this._getBlocks(a), this.rootRenderFunc = a.root, this.compiled = !0
                }, _getBlocks: function (a) {
                    var b = {};
                    for (var c in a)"b_" == c.slice(0, 2) && (b[c.slice(2)] = a[c]);
                    return b
                }
            });
            a.environment = {Environment: k, Template: m}
        }();
        var b, c = a.lib, d = a.environment, e = a.compiler, f = a.parser, g = a.lexer, h = a.runtime;
        a.loader;
        var i = a.loaders, j = a.precompile;
        b = {}, b.Environment = d.Environment, b.Template = d.Template, b.Loader = d.Loader, b.FileSystemLoader = i.FileSystemLoader, b.WebLoader = i.WebLoader, b.compiler = e, b.parser = f, b.lexer = g, b.runtime = h;
        var k;
        b.configure = function (a, b) {
            b = b || {}, c.isObject(a) && (b = a, a = null);
            var e = i.FileSystemLoader || i.WebLoader;
            return k = new d.Environment(new e(a, b.watch), b), b && b.express && k.express(b.express), k
        }, b.render = function (a, c, d) {
            return k || b.configure(), k.render(a, c, d)
        }, b.renderString = function (a, c, d) {
            return k || b.configure(), k.renderString(a, c, d)
        }, j && (b.precompile = j.precompile, b.precompileString = j.precompileString), b.require = function (b) {
            return a[b]
        }, window.nunjucks = b
    }(), nunjucks
});
define("js/tpl/html/pub/userinfo", [], function () {
    !function () {
        (window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["tpl/html/pub/userinfo.html"] = function () {
            function a(a, b, c, d, e) {
                var f = null, g = null, h = "";
                try {
                    h += '<div id="J-userinfo">\r\n', "0" == d.contextOrFrameLookup(b, c, "isLogin") ? h += '\r\n<a href="javascript: void 0;" class="btn-normal-w100 btn-login" id="J-login_now">登录</a>\r\n<a href="http://login.sina.com.cn/signup/signup.php?entry=weicaifu" target="_blank" class="btn-signup">注册</a>\r\n' : (h += '\r\n<div class="account_menu_wrapper">\r\n    <a href="', h += d.suppressValue(d.contextOrFrameLookup(b, c, "preciousHome"), a.autoesc), h += '?sv=a" class="btn-account" id="J-account">我的微财富', h += "</a>\r\n    ", h += '\r\n</div>\r\n<a href="/v/signout" class="J-logout link-logout" id="T-logout">安全退出</a>\r\n</div>\r\n'), e(null, h)
                } catch (i) {
                    e(d.handleError(i, f, g))
                }
            }

            return {root: a}
        }()
    }()
});
define("js/lib/base", ["jquery"], function (a) {
    var b;
    return function (a, c, d) {
        function e(a) {
            var b;
            switch (a) {
                case"origin":
                    b = -1 !== c.location.href.indexOf("pay.sina.com.cn/caopanbao") ? "https://pay.sina.com.cn/caopanbao" : c.SITEURL.index + "/v";
                    break;
                case"ajax_base_url":
                    b = -1 !== c.location.href.indexOf("pay.sina.com.cn/caopanbao") ? "/caopanbao" : "/v";
                    break;
                case"base_url":
                default:
                    b = -1 !== c.location.href.indexOf("pay.sina.com.cn/caopanbao") ? "https://pay.sina.com.cn/caopanbao" : c.SITEURL.index + "/v"
            }
            return b
        }

        function f() {
            a("#J-userinfo").css("visibility", "visible"), b.util.cookie("SSOLoginState", null, {expires: -1})
        }

        "undefined" == typeof c.location.host && (c.location.host = c.location.hostname), c.SITEURL = c.SITEURL || (-1 !== c.location.host.indexOf("func") ? {
            index: "https://func.weicaifu.com",
            list: "https://funclist.weicaifu.com",
            detail: "https://func.weicaifu.com/v",
            trade: "https://func.weicaifu.com/v",
            my: "https://func.weicaifu.com/v",
            product: "https://func.weicaifu.com/v"
        } : {
            index: "https://www.weicaifu.com",
            list: "https://list.weicaifu.com",
            detail: "https://www.weicaifu.com/v",
            trade: "https://www.weicaifu.com/v",
            my: "https://www.weicaifu.com/v",
            product: "https://www.weicaifu.com/v"
        }), b = {
            util: {
                cookie: function (a, b, c) {
                    if ("undefined" == typeof b) {
                        var d = null;
                        if (document.cookie && "" != document.cookie)for (var e = document.cookie.split(";"), f = 0; f < e.length; f++) {
                            var g = jQuery.trim(e[f]);
                            if (g.substring(0, a.length + 1) == a + "=") {
                                d = decodeURIComponent(g.substring(a.length + 1));
                                break
                            }
                        }
                        return d
                    }
                    c = c || {}, null === b && (b = "", c.expires = -1);
                    var h = "";
                    if (c.expires && ("number" == typeof c.expires || c.expires.toUTCString())) {
                        var i;
                        "number" == typeof c.expires ? (i = new Date, i.setTime(i.getTime() + 1e3 * 60 * 60 * 24 * c.expires), i = i.toUTCString()) : i = c.expires, h = "; expires=" + i
                    }
                    var j = c.path ? "; path=" + c.path : "", k = c.domain ? "; domain=" + c.domain : "", l = c.secure ? "; secure" : "";
                    document.cookie = [a, "=", encodeURIComponent(b), h, j, k, l].join("")
                }, getUrlParam: function (a, b) {
                    var e = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"), f = "string" == typeof b ? b : c.location.search, g = f.substr(1).match(e);
                    return g = null != g ? decodeURIComponent(g[2]) : d
                }, setUrlParam: function (a, b, d) {
                    var e = new RegExp("(^|&)" + a + "=([^&]*)"), f = "string" == typeof d ? d : c.location.search, g = f.substr(1);
                    return g = f.length > 3 && e.test(f.substr(1)) ? g.replace(e, a + "=" + b) : d + (-1 === d.indexOf("=") ? "" : "&") + a + "=" + b, "?" + g
                }, getUrlWithoutParam: function (a) {
                    return a = a || c.location.href, a = -1 === a.indexOf("?") ? -1 === a.indexOf("#") ? a : a.slice(0, a.indexOf("#")) : a.slice(0, a.indexOf("?"))
                }, parseUrl: function (a) {
                    a = a || c.location.href;
                    try {
                        if (-1 !== a.indexOf("?") && (a = a.split("?")[1]), -1 === a.indexOf("&"))return {};
                        for (var b, d, e, f = a.split("&"), g = {}, h = 0; h < f.length; h++)b = f[h].split("="), d = b[0], e = b[1], "" == d && (d = "unkown"), "undefined" == typeof g[d] ? g[d] = e : "string" == typeof g[d] ? (g[d] = [g[d]], g[d].push(e)) : g[d].push(e);
                        return g
                    } catch (i) {
                        return {}
                    }
                }, htmlEncode: function (a) {
                    var b = {"&": "&amp;", "<": "&lt;", ">": "&gt;", " ": "&nbsp;", "'": "&#039;", '"': "&quot;"};
                    return "string" != typeof a ? a : 0 == a.length ? "" : a.replace(/[&<> \'\"]/g, function (a) {
                        return b[a]
                    })
                }, htmlDecode: function (b) {
                    return a("<div/>").html(b).text().replace(/\u00a0/g, " ")
                }, jsonToString: function (a) {
                    var b = this;
                    switch (typeof a) {
                        case"string":
                            return '"' + a.replace(/(["\\])/g, "\\$1") + '"';
                        case"array":
                            return "[" + a.map(b.jsonToString).join(",") + "]";
                        case"object":
                            if (a instanceof Array) {
                                for (var c = [], d = a.length, e = 0; d > e; e++)c.push(b.jsonToString(a[e]));
                                return "[" + c.join(",") + "]"
                            }
                            if (null == a)return "null";
                            var f = [];
                            for (var g in a)f.push(b.jsonToString(g) + ":" + b.jsonToString(a[g]));
                            return "{" + f.join(",") + "}";
                        case"number":
                            return a;
                        case!1:
                            return a
                    }
                }, transJQSelector: function (a) {
                    return "string" == typeof a && (a = a.replace(/(:|\.|\[|\]|\#|\@|\$|\%|\^|\&|\*|\!)/g, "\\$&")), a
                }, redirect: function (a, d) {
                    b.UI.loading(!0), d ? c.location.replace(a) : c.location.href = a
                }, amtFormat: function (a) {
                    if ("string" !== b.atom.type(a) && (a = a.toString()), -1 === a.indexOf(",")) {
                        var c = a.split(".")[0].split("").reverse(), d = a.split(".")[1], e = "";
                        for (d = d ? "." + d : "", i = 0; i < c.length; i++)e += c[i] + (0 == (i + 1) % 3 && i + 1 != c.length ? "," : "");
                        a = e.split("").reverse().join("") + d
                    }
                    return a
                }, timeFormat: function (a) {
                    function b(a) {
                        return 10 > a ? "0" + a : a
                    }

                    var c = new Date(a), d = c.getFullYear(), e = c.getMonth() + 1;
                    e = b(e);
                    var f = c.getDate();
                    f = b(f);
                    var g = c.getHours();
                    g = b(g);
                    var h = c.getMinutes();
                    h = b(h);
                    var i = c.getSeconds();
                    return i = b(i), d + "-" + e + "-" + f + "   " + g + ":" + h + ":" + i
                }
            },
            Math: {
                Mul: function (a, b) {
                    var c = 0, d = a.toString(), e = b.toString();
                    try {
                        c += d.split(".")[1].length
                    } catch (f) {
                    }
                    try {
                        c += e.split(".")[1].length
                    } catch (f) {
                    }
                    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c)
                }, Div: function (a, b) {
                    var c, d, e = 0, f = 0;
                    try {
                        e = a.toString().split(".")[1].length
                    } catch (g) {
                    }
                    try {
                        f = b.toString().split(".")[1].length
                    } catch (g) {
                    }
                    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), c / d * Math.pow(10, f - e)
                }, Add: function (a, b) {
                    var c, d, e;
                    try {
                        c = a.toString().split(".")[1].length
                    } catch (f) {
                        c = 0
                    }
                    try {
                        d = b.toString().split(".")[1].length
                    } catch (f) {
                        d = 0
                    }
                    return e = Math.pow(10, Math.max(c, d)), (a * e + b * e) / e
                }, Subtr: function (a, b) {
                    var c, d, e, f;
                    try {
                        c = a.toString().split(".")[1].length
                    } catch (g) {
                        c = 0
                    }
                    try {
                        d = b.toString().split(".")[1].length
                    } catch (g) {
                        d = 0
                    }
                    return e = Math.pow(10, Math.max(c, d)), f = c >= d ? c : d, ((a * e - b * e) / e).toFixed(f)
                }
            },
            UI: {
                shade: function (c, d) {
                    isNaN(d) && (d = 0), c ? a("#shade").length || (a("body").append('<div id="shade" class="fixed_shade"/>'), a("#shade").fadeTo(d, .5), b.helper.obj_blocker(!0), a(".main,.header,.footer").addClass("fblur3")) : a("#shade").length && (a("#shade").fadeOut(d, function () {
                        a("#shade").remove()
                    }), b.helper.obj_blocker(!1), a(".main,.header,.footer").removeClass("fblur3"))
                }, generate_select: function (b, c) {
                    c = c || a(".J-select[data-done!=yes]"), c.wrap('<div class="custom_selector custom_selector-' + b + '"/>').before('<span class="arrow"></span><input type="text" class="input_field input_field-' + b + '" />').on("change.ui", function () {
                        a(this).val() && "selectplease" !== a(this).val() ? a(this).siblings(".input_field").removeClass("c-disabled").val(a(this).find("option:selected").text()) : a(this).siblings(".input_field").addClass("c-disabled").val(a(this).find("option:selected").text())
                    }).trigger("change.ui").bind("focus", function () {
                        a(this).siblings(".input_field").addClass("focus")
                    }).bind("blur", function () {
                        a(this).siblings(".input_field").removeClass("focus")
                    }).attr("data-done", "yes")
                }, generate_radio: function (b) {
                    b = b || a(".J-radio"), b.each(function () {
                        var b = a(this);
                        b.prop("checked", "checked" === b.attr("checked") ? !0 : !1).wrap('<div class="custom_radio"/>').on("change.ui", function () {
                            a("input[name=" + a(this).attr("name") + "]").each(function () {
                                a(this).prop("checked") ? a(this).parent().addClass("custom_radio-checked") : a(this).parent().removeClass("custom_radio-checked")
                            })
                        }).trigger("change.ui")
                    })
                }, generate_checkbox: function (b) {
                    b = b || a(".J-checkbox"), b.each(function () {
                        var b = a(this);
                        b.prop("checked", "checked" === b.attr("checked") ? !0 : !1).wrap('<div class="custom_checkbox"/>').on("change.ui", function () {
                            a(this).prop("checked") ? a(this).parent().addClass("custom_checkbox-checked") : a(this).parent().removeClass("custom_checkbox-checked")
                        }).trigger("change.ui")
                    })
                }, generate_placeholder: function (b) {
                    "placeholder"in document.createElement("input") || (b = b || a("input[type]"), b.each(function () {
                        var b = a(this).attr("placeholder");
                        "undefined" != typeof b && a(this).before('<span class="placeholder">' + b + "</span>")
                    }).on("focus", function () {
                        a(this).prev(".placeholder").hide()
                    }).on("blur", function () {
                        "" !== a(this).val() ? a(this).prev(".placeholder").hide() : a(this).prev(".placeholder").show()
                    }))
                }, show_top_dialog: function (c) {
                    function d() {
                        var c = a('<div class="dialog_top d_t-' + e.type + '" id="' + f + '"><span class="close_cross" data-shade="no" data-close="#' + f + '" data-animate="fadeOut" data-animate_time="' + e.time + '"></span><div class="d_t-content">' + "<i>&nbsp;&nbsp;&nbsp;</i>" + e.msg + "</div></div>").appendTo("body"), d = a("#" + f);
                        d.css({
                            top: b.helper.compute_layer_y(d.outerHeight()) + "px",
                            "margin-left": "-" + d.outerWidth() / 2 + "px"
                        }).fadeIn(200).addClass("d-e-popin"), e.auto_hide && setTimeout(function () {
                            c.removeClass("d-e-popin").fadeOut(e.time, function () {
                                c.remove()
                            })
                        }, e.hide_time)
                    }

                    var e = {};
                    a.extend(e, {msg: "", type: "", auto_hide: !1, hide_time: 0, time: 230}, c);
                    var f = b.helper.generate_rdmid("J-dialog_"), g = a(".dialog_top:visible");
                    g.length ? g.stop(!0, !0).removeClass("d-e-popin").fadeOut(e.time, function () {
                        g.remove(), d()
                    }) : d()
                }, count_down: function (b, c) {
                    var d = {
                        start: 60, end: 0, suffix: "", speed: 1, cb: function () {
                            console.log("count down over!")
                        }, set_context: function (a, b) {
                            a.html(b)
                        }
                    };
                    a.extend(d, c), b.data("cd", parseInt(d.start, 10) + 1);
                    var e = function () {
                        if (d.end != b.data("cd")) {
                            var a = b.data("cd") - 1;
                            0 > a ? d.cb() : (b.data("cd", a), d.set_context(b, a + d.suffix), setTimeout(e, 1e3 * d.speed))
                        } else d.cb()
                    };
                    e()
                }, show_form_error: function (b, c, d, e) {
                    e = e || 5e3, b.addClass("error");
                    var f = b.parent();
                    f.children("span.input_hint:last").stop(!0, !0).remove();
                    var g = "";
                    b.attr("data-hint_id") && (g = ' id="' + b.attr("data-hint_id") + '"'), f.append("<span" + g + ' class="input_hint' + (d ? " " + d : "") + '" style="display: none;">' + c + "</span>").children("span.input_hint:last").show().delay(e).fadeOut(200, function () {
                        a(this).remove()
                    })
                }, all_form_err: function (c, d) {
                    if (d.body && d.body.reasons) {
                        var e = 0;
                        a.each(d.body.reasons, function (a, d) {
                            var f = c.find("[name=" + a + "],[data-name=" + a + "]");
                            f.length && (e++, 2 === f.length && (f = f.filter("[type=password]")), b.UI.show_form_error(f, d, "input_hint-failure"))
                        }), 0 === e && b.UI.show_top_dialog({
                            msg: d.head.msg,
                            type: "failure",
                            auto_hide: !0,
                            hide_time: 5e3,
                            time: 88
                        })
                    } else d.body && d.body.errMsg && (d.head.msg = d.body.errMsg), b.UI.show_top_dialog({
                        msg: d.head.msg,
                        type: "failure",
                        auto_hide: !0,
                        hide_time: 5e3,
                        time: 88
                    })
                }, show_login_dialog: function (a) {
                    b.g_var.LOGIN_DIALOG ? b.g_var.LOGIN_DIALOG.show(a) : require(["js/widget/login_dialog"], function (c) {
                        b.g_var.LOGIN_DIALOG = new c({
                            cancel_callback: function () {
                            }, init_callback: function () {
                                b.g_var.LOGIN_DIALOG.show(a)
                            }
                        })
                    })
                }, _show_layer: function (a, c) {
                    b.UI.shade(!0, c || 100), a.css("top", b.helper.compute_layer_y(a.height() / 2) + "px").fadeIn(100), a.find(".close_cross:visible").length && b.helper.event_handle.esc_keyup(".layer", function () {
                        b.UI._hide_layer(a)
                    })
                }, _hide_layer: function (c) {
                    c = c || a(".shade_layer:visible"), c.each(function () {
                        var c = a(this), d = c.find(".close_cross:visible");
                        d.attr("data-close") && (a(d.attr("data-close")).stop(!0, !0)[d.attr("data-animate") ? d.attr("data-animate") : "fadeOut"](d.attr("data-animate_time") ? parseFloat(d.attr("data-animate_time"), 10) : 300), "no" !== d.attr("data-shade") && b.UI.shade(!1))
                    })
                }, show_deposit_layer: function (c) {
                    function d() {
                        var b = a("#J-show_deposit_layer-wqb_amount").val(), c = /^(([1-9][0-9]*)|0)\.[0-9]{1,2}$|^[1-9][0-9]*$/;
                        "" == b ? (a("#J-show_deposit_layer-wqb_amount-hint").html("充值金额不能为空").stop(!0, !0).show(function () {
                            setTimeout(function () {
                                a("#J-show_deposit_layer-wqb_amount-hint").fadeOut(300)
                            }, 5e3)
                        }), e = !1) : c.test(b) ? b > 1e6 || 1 > b ? (a("#J-show_deposit_layer-wqb_amount-hint").html("充值金额不能小于1.00元且不能大于1000000.00元").show(function () {
                            setTimeout(function () {
                                a("#J-show_deposit_layer-wqb_amount-hint").fadeOut(300)
                            }, 5e3)
                        }), e = !1) : e = !0 : (a("#J-show_deposit_layer-wqb_amount-hint").html("充值金额只能是整数或2位以内小数").show(function () {
                            setTimeout(function () {
                                a("#J-show_deposit_layer-wqb_amount-hint").fadeOut(300)
                            }, 5e3)
                        }), e = !1)
                    }

                    var e = !0;
                    if (!a("#J-show_deposit_layer-deposit").length) {
                        var f = '<div class="shade_layer" id="J-show_deposit_layer-deposit" style="width: 450px;margin-left: -225px;"><span class="close_cross" data-close="#J-show_deposit_layer-deposit"></span><h4 class="shade_layer-title">请输入充值金额</h4><form class="form-normal" method="GET" id="J-show_deposit_layer-deposit_form" target="_blank" action="' + b._data.origin + '/deoposit"><p class="form-row"><label class="input_field_label">账户余额：</label><span class="hlight-markedness" style="font-size: 15px;vertical-align: middle;font-weight: bold;">' + parseFloat(c, 10) + ' </span><span class="text_field">元</span></p><p class="form-row"><label class="input_field_label">充值金额：</label><input autocomplete="off" class="input_field input_field-148" type="text" id="J-show_deposit_layer-wqb_amount" name="wqb_amount"/><span class="text_field">元</span><span id="J-show_deposit_layer-wqb_amount-hint" class="input_hint" style="display: none;"></span></p><div class="form-action" style="padding: 0 0 5px 48px;"><input type="submit" class="btn-normal-w70" value="确认" id="J-show_deposit_layer-deposit_try" style="font-size: 14px;" /><a href="javascript: void 0;" class="J-show_deposit_layer-deposit_cancel" data-layer="#J-deposit" style="font-size: 14px;vertical-align: middle;margin-left: 30px;">取消</a></div></form></div>';
                        a(".footer").after(f), a(".J-show_deposit_layer-deposit_cancel").on("click", function () {
                            b.UI._hide_layer(a("#J-show_deposit_layer-deposit"))
                        }), a("#J-show_deposit_layer-wqb_amount").on("blur", function () {
                            d()
                        }), "" == a("#J-show_deposit_layer-wqb_amount").val() && (e = !1), a("#J-show_deposit_layer-deposit_try").on("click", function (c) {
                            return e ? (a("#J-show_deposit_layer-deposit_form").submit(), b.UI._hide_layer(a("#J-show_deposit_layer-deposit")), c.preventDefault(), !1) : (d(), !1)
                        })
                    }
                    b.UI._show_layer(a("#J-show_deposit_layer-deposit"))
                }, safeInput_display: function (b, c, d) {
                    b ? a(".safeInput-hidden").removeClass("safeInput-hidden") : a(".safeInput:visible").each(function () {
                        var b = a(this).offset();
                        b.top > c.top && b.top < c.top + d && a(this).addClass("safeInput-hidden")
                    })
                }, submiter_block: function (a, c) {
                    return "undefined" == typeof c ? a.hasClass("btn-disabled") : (c ? (a.addClass("btn-disabled").attr("disabled", "disabled"), b.UI.loading(!0)) : (a.removeClass("btn-disabled").removeAttr("disabled", "disabled"), b.UI.loading(!1)), void 0)
                }, loading: function (b) {
                    b ? a(".loading-bar").show() : a(".loading-bar").hide()
                }, loading_info: function (c, d) {
                    if (b.UI.loading(c), c) {
                        b.UI.shade(!0, 100);
                        var e = a(".loading-info:first");
                        e.html(d).css("visibility", "hidden").show().css({
                            "margin-left": "-" + e.width() / 2 + "px",
                            visibility: "visible"
                        })
                    } else b.UI.shade(!1, 100), a(".loading-info").hide()
                }, reflow_area: function (a, c) {
                    setTimeout(function () {
                        c() ? (a.hide(), setTimeout(function () {
                            a.show()
                        }, 88)) : b.UI.reflow_area(a, c)
                    }, 100)
                }, cache_vfeild: function (b, c) {
                    c ? b.each(function () {
                        a(this).attr("data-vfield", a(this).attr("data-vfield-cached")).removeAttr("data-vfield-cached")
                    }) : b.each(function () {
                        a(this).attr("data-vfield-cached", a(this).attr("data-vfield")).removeAttr("data-vfield")
                    })
                }, gen_rd_color: function () {
                    var a = ["#d69d23", "#d69d23", "#f74646", "#33b246", "#8546cb", "#4792ef", "#e32436", "#e1ab00", "#6389ff", "#83dac5", "#724cce", "#e455d3", "#b3db38", "#ea5125", "#61dd6b"];
                    return a[Math.floor(Math.random() * a.length)]
                }, number_exciting: function (d) {
                    function e() {
                        d.each(function () {
                            function d(a, b, c) {
                                setTimeout(function () {
                                    if (l > a) {
                                        a += c, a > l && (a = l);
                                        var f = a.toString();
                                        i !== !1 && (f.length < k && (f = new Array(k - f.length + 1).join("0") + f), f = f.slice(0, i) + "." + f.slice(i)), e.html(f + j), (new Date).getTime() - m > 3e3 ? e.html(h) : d(a, b , c)
                                    }
                                }, b)
                            }

                            var e = a(this);
                            if (!e.data("number_exciting") && (e.css("visibility", "hidden").removeClass("dn").show(), b.browser.isIOS || a(c).height() + a(c).scrollTop() > e.offset().top && e.offset().top > a(c).scrollTop())) {
                                var f = e.html(), g = e.children().remove().end().html();
                                if ("" === g || isNaN(parseFloat(g, 10)))e.css("visibility", "visible").removeClass("dn").show(); else {
                                    var h = f, i = !1, j = f.replace(g, "");
                                    f = g, j = f.replace(/[0-9\.]/g, "") + j, f = f.replace(/[^0-9\.]/g, ""), -1 !== f.indexOf(".") && (i = 0 - f.slice(f.indexOf(".")).length + 1), f = f.replace(".", "");
                                    var k = f.length, l = parseInt(f, 10), m = (new Date).getTime();
                                    e.html("0" + j).css("visibility", "visible"), d(0, 10, Math.ceil(l / 30)), e.data("number_exciting", !0)
                                }
                            }
                        })
                    }

                    a(c).on("scroll.number_exciting" + Math.random(), function () {
                        e()
                    }), e()
                }, blank_window: function (c) {
                    function d() {
                        setTimeout(function () {
                            var b = c.data("blank_window");
                            b ? (a("#" + c.data("blank_window-a")).attr("href", b), a("#" + c.data("blank_window-a") + "span").click(), c.removeData("blank_window-a").removeData("blank_window"), a("#" + e).remove()) : d()
                        }, 88)
                    }

                    var e = b.helper.generate_rdmid("temp_a-");
                    a("body").append('<a id="' + e + '" target="_blank" style="position:absolute;"><span id="' + e + 'span">aaaa</span></a>'), c.data("blank_window-a", e), d()
                }, show_sche: function (c) {
                    return a(c).length ? (a(c).each(function () {
                        var c = a(this).attr("data-sche"), d = parseInt(360 * (c / 100)), e = 0;
                        if (b.helper.ie_version() < 9) {
                            var f = '<span class="sche_ie"></span>', g = '<span class="sche_rate_ie"></span><span class="sche_rate_ie_bg"></span>';
                            if (a(this).append(f), a(this).append(g), a(this).find(".sche_ie").text(c + "%"), c >= 0 && 100 >= c) {
                                var h = 50 * (c / 100);
                                a(this).find(".sche_rate_ie").css("width", h + "px")
                            } else alert("请配置0-100范围内的值")
                        } else {
                            var i = '<span class="sche_gray_left"></span><span class="sche_gray_right"></span><span class="sche_green_left"></span><span class="sche_green_right"></span>', j = '<span class="sche_rate"></span>', k = '<span class="sche_rotate"></span>';
                            a(this).html(i), d >= 0 && 180 >= d ? (a(this).find(".sche_green_right").hide(), a(this).find(".sche_green_left").css({
                                "-moz-transform": "rotate(" + d + "deg)",
                                "-webkit-transform": "rotate(" + d + "deg)",
                                "-o-transform": "rotate(" + d + "deg)",
                                "-ms-transform": "rotate(" + d + "deg)"
                            })) : d > 180 && 360 >= d ? (e = d - 180, a(this).find(".sche_green_right").show(), a(this).find(".sche_green_left").css({
                                "-moz-transform": "rotate(180deg)",
                                "-webkit-transform": "rotate(180deg)",
                                "-o-transform": "rotate(180deg)",
                                "-ms-transform": "rotate(180deg)",
                                transform: "rotate(180deg)"
                            }), a(this).find(".sche_green_right").css({
                                "-moz-transform": "rotate(" + e + "deg)",
                                "-webkit-transform": "rotate(" + e + "deg)",
                                "-o-transform": "rotate(" + e + "deg)",
                                "-ms-transform": "rotate(" + e + "deg)"
                            })) : alert("请配置0-100范围内的值"), a(this).append(j), a(this).find(".sche_rate").text(c + "%"), a(this).append(k)
                        }
                    }), void 0) : !1
                }, layer_tips: function (b) {
                    b.length && b.mouseenter(function () {
                        var b = a(this).offset(), c = a(a(this).attr("data-layer")), d = {};
                        d = "yes" === c.attr("data-paralleling") ? {
                            marginTop: parseInt(c.attr("data-y"), 10) + "px",
                            marginLeft: parseInt(c.attr("data-x"), 10) + "px"
                        } : {
                            top: b.top - parseInt(c.attr("data-y"), 10) + "px",
                            left: b.left - parseInt(c.attr("data-x"), 10) + "px"
                        }, c.show().css(d).one("mouseleave", function () {
                            a(this).hide()
                        })
                    }).mouseleave(function (b) {
                        var c = a(this).attr("data-layer"), d = a(b.relatedTarget);
                        return d.attr("id") === c.slice(1) || d.parents(c).length ? (b.preventDefault(), !1) : (a(a(this).attr("data-layer")).hide(), void 0)
                    })
                }, op_side: function (d, e) {
                    if (!d.length)return !1;
                    var f = d.position().top, g = d.offset().top, h = d.width(), i = b.Math.Subtr(c.innerWidth, 960) / 2;
                    i > h ? (e && d.css("margin-right", e), d.css("right", -h - 20)) : d.css("right", -i + 10), a(window).scroll(function () {
                        a(window).scrollTop() <= g + f ? d.css("top", f) : a(window).scrollTop() + (g + f) <= a("body").height() && d.css("top", a(window).scrollTop() - g)
                    })
                }, positionads: function (c) {
                    function d(d) {
                        if ("undefined" != typeof d.adOrder) {
                            var e = c.filter("[data-order=" + d.adOrder + "]");
                            if (d = a.parseJSON(d.param)[0], d && d.type && "string" == typeof d.type) {
                                switch (a.trim(d.type)) {
                                    case"carousel":
                                        b.jsonfn[d.data] = function (b) {
                                            e.css("visibility", "hidden").html(b), require(["js/gallery/slides"], function () {
                                                e.slidesjs({
                                                    width: e.width(),
                                                    height: e.height(),
                                                    navigation: {active: !1, effect: d.effect_str || "slide"},
                                                    pagination: a.parseJSON(d.pagination) || {
                                                        active: !1,
                                                        effect: "fade"
                                                    },
                                                    effect: a.parseJSON(d.effect) || {
                                                        slide: {speed: 400},
                                                        fade: {speed: 600, crossfade: !0}
                                                    },
                                                    play: d.play || {
                                                        active: !1,
                                                        effect: d.effect_str,
                                                        interval: 7e3,
                                                        auto: !0,
                                                        swap: !1,
                                                        pauseOnHover: !0,
                                                        restartDelay: 5e3
                                                    }
                                                }), e.css("visibility", "visible")
                                            })
                                        };
                                        break;
                                    case"weight":
                                        b.jsonfn[d.data] = function (b) {
                                            var c = 0, d = "";
                                            a.each(b, function (a, b) {
                                                var e = parseInt(b.w, 10) * Math.random();
                                                e > c && (c = e, d = b.c)
                                            }), e.html(d)
                                        };
                                        break;
                                    case"dshow":
                                    default:
                                        b.jsonfn[d.data] = function (a) {
                                            e.html(a)
                                        }
                                }
                                a.getScript(b._data.js_url + "/cms/js/pyramid/" + d.data + ".js")
                            }
                            e.removeClass("dn")
                        }
                    }

                    c.on("click.ga", "a", function () {
                        ga && ga("send", "event", "推广位点击统计", "click", c.attr("data-pos") + "|" + a(this).attr("href")), _hmt && _hmt.push(["_trackEvent", "推广位点击统计", "click", c.attr("data-pos") + "|" + a(this).attr("href")])
                    }), b.helper.jsonpCall(b._data.origin + "/promoteAd/list/" + c.attr("data-pos"), function (c) {
                        b.helper.ajax_success(c, function (b) {
                            a.each(b, function (a, b) {
                                d(b)
                            })
                        }, function () {
                        })
                    })
                }
            },
            helper: {
                ajax_success: function (d, e, f, g) {
                    switch (g && a("input[type=password]").val(""), f = f || function (a) {
                        b.UI.show_top_dialog({
                            msg: a.head.msg,
                            type: "failure",
                            auto_hide: !0,
                            hide_time: 5e3,
                            time: 88
                        })
                    }, d.body && d.body.errMsg && (d.head.msg = d.body.errMsg), d.head.code) {
                        case"200":
                            e(d.body);
                            break;
                        case"205":
                            f(d), setTimeout(function () {
                                c.location.reload()
                            }, 4888);
                            break;
                        case"500":
                            d.head.msg = "网络错误，请稍后再试！", f(d);
                            break;
                        case"401":
                            b.UI.show_login_dialog(!0);
                            break;
                        case"400":
                        case"403":
                        case"412":
                        case"413":
                        case"500":
                        default:
                            f(d)
                    }
                }, ajax_error: function (c, d, e, f, g) {
                    switch (g && a("input[type=password]").val(""), f = f || function (a) {
                        b.UI.show_top_dialog({msg: a, type: "failure", auto_hide: !0, hide_time: 5e3, time: 88})
                    }, d) {
                        case"timeout":
                            f("服务器响应超时，请重新再试！");
                            break;
                        case"error":
                            401 == c.status ? b.UI.show_login_dialog(!0) : f("服务器错误，请重新再试！");
                            break;
                        case"abort":
                            console.log("用户放弃请求");
                            break;
                        case"parsererror":
                            console.log("ajax parsererror:", e);
                            break;
                        case null:
                        default:
                            f("网络错误，请稍后再试！")
                    }
                }, hidden_form_submit: function (c, d) {
                    var e = "";
                    d && a.each(d, function (a) {
                        e += '<input type="hidden" name="' + b.util.htmlEncode(a) + '"/>'
                    });
                    var f = a('<form action="' + c.action + '" target="' + ("undefined" == typeof c.target ? "_self" : c.target) + '" method="' + ("undefined" == typeof c.method ? "POST" : c.method) + '" style="display:none;">' + e + "</form>");
                    f.appendTo("body").children("input").each(function () {
                        a(this).val(d[a(this).attr("name")])
                    }).end().submit()
                }, event_handle: {
                    esc_keyup: function (b, c) {
                        a(document).bind("keyup" + b, function (d) {
                            27 == d.which && (a(document).unbind("keyup" + b), c())
                        })
                    }, click: function (b, c) {
                        a(document).on("click" + b, function () {
                            a(document).unbind("click" + b), c()
                        })
                    }
                }, generate_rdmid: function (a) {
                    return a + parseInt(1e8 * Math.random(), 10)
                }, pwdStrength: function (a) {
                    function b(a) {
                        return a >= 48 && 57 >= a ? 1 : a >= 65 && 90 >= a ? 2 : a >= 97 && 122 >= a ? 4 : 8
                    }

                    function c(a) {
                        for (var b = 0, c = 0; 4 > c; c++)1 & a && b++, a >>>= 1;
                        return b
                    }

                    function d(a) {
                        if (a.length <= 4)return 0;
                        for (var d = 0, e = 0; e < a.length; e++)d |= b(a.charCodeAt(e));
                        return c(d)
                    }

                    var e;
                    if (null == a || "" == a)e = "0"; else switch (S_level = d(a)) {
                        case 0:
                            e = "0";
                        case 1:
                            e = "1";
                            break;
                        case 2:
                            e = "2";
                            break;
                        case 3:
                        default:
                            e = "3"
                    }
                    return e
                }, compute_layer_y: function (b) {
                    var d = a(c).scrollTop() + a(c).height() / 2 - b;
                    return 0 > d && (d = 0), d
                }, obj_blocker: function (c, d, e) {
                    if (e)return d.children(".mask_iframe").height(d.height()).width(d.width()), !1;
                    var f = d ? !1 : !0;
                    if (d = d || a("body"), c)if (d.attr("data-mi_id"))a(d.attr("data-mi_id")).show(); else {
                        var g = b.helper.generate_rdmid("J_mask_iframe_");
                        d.attr("data-mi_id", "#" + g).append('<iframe class="mask_iframe" id="' + g + '" frameborder="0" border="0" scrolling="" style="filter:Alpha(opacity=0);position:absolute; top:0px; left:0px; height:' + d.height() + "px; width:" + (f ? "100%;" : d.width() + "px;") + '" ></iframe>')
                    } else a(d.attr("data-mi_id")).hide()
                }, _init_login_controller: function (a, b) {
                    -1 !== c.location.host.indexOf("weicaifu.com") ? (c[b] = new a(b), c[b].init(), c[b].entry = "weicaifu", c[b].service = "weicaifu", c[b].domain = "weicaifu.com", c[b].feedBackUrl = "https://www.weicaifu.com/sso/ajaxlogin", c[b].setDomain = !1, c[b].useTicket = !0, c[b].crossDomain = !1, c[b].loginExtraQuery.vsnf = 1) : -1 !== c.location.host.indexOf("sina.com.cn") ? (c[b] = new a(b), c[b].init()) : (c[b] = new a(b), c[b].init())
                }, track_login: function () {
                    function a(a) {
                        b.helper.jsonpCall(b._data.origin + "/srv/userAnalysis?c=" + encodeURIComponent(a) + "&g=" + encodeURIComponent(b.util.cookie("_ga")) + "&u=" + encodeURIComponent(c.location.href), function () {
                        })
                    }

                    if (-1 === c.location.host.indexOf("weicaifu.com"))return !1;
                    if (b.util.getUrlParam("utm_source")) {
                        var d = b.util.getUrlParam("utm_source");
                        b.util.cookie("utm_s", d, {expires: 365, path: "/", domain: ".weicaifu.com"}), a(d)
                    } else {
                        var e = b.util.cookie("utm_s") || "";
                        a(e)
                    }
                }, get_login_info: function (d, e, f) {
                    return a("#J-userinfo").length ? ("function" == typeof d && d(data), !1) : (b.helper.jsonpCall(b._data.origin + "/srv/accountinfo", function (g) {
                        b.helper.ajax_success(g, function (g) {
                            b.g_var.isLogin = g.isLogin;
                            var h = -1 !== c.location.href.indexOf("sina.com.cn/caopanbao") ? "userinfo-cpb" : "userinfo";
                            require(["js/components/nunjucks", "js/tpl/html/pub/" + h, "js/widget/login_dialog", "js/data/site_url"], function (c, d, i, j) {
                                var k = c.render("tpl/html/pub/" + h + ".html", a.extend({needloginbox: !f}, g, j));
                                a(".jewelry").html(k), a("#J-userinfo").css("visibility", "visible"), "0" !== b.g_var.isLogin || f || (b.g_var.LOGIN_DIALOG = new i(e || {}), a("#J-login_now").click(function () {
                                    b.g_var.LOGIN_DIALOG.show()
                                }))
                            }), "function" == typeof d && d(g)
                        })
                    }), void 0)
                }, sina_auto_login: function () {
                    require(["js/lib/sinasso"], function (a) {
                        b.helper._init_login_controller(a, "sinaSSOControllerAutologin"), c.sinaSSOControllerAutologin.autoLogin(function () {
                            b.util.cookie("SSOLoginState", null, {expires: -1}), b.helper.jsonpCall(b._data.origin + "/srv/accountinfo", function (a) {
                                b.helper.ajax_success(a, function (a) {
                                    "1" === a.isLogin && c.location.reload()
                                }, function (a) {
                                    console.log(a)
                                })
                            })
                        })
                    })
                }, jsonpCall: function (d, e, f) {
                    if (0 === d.replace(/http[s]:\/\//, "").indexOf(c.location.hostname))a.ajax({
                        url: d,
                        type: "GET",
                        data: {_: f || Math.random()},
                        dataType: "json"
                    }).done(function (a) {
                        e(a)
                    }).fail(function (a, c, d) {
                        b.helper.ajax_error(a, c, d)
                    }); else {
                        var g = b.helper.generate_rdmid("jsonp");
                        b.jsonfn[g] = function (a) {
                            e(a)
                        }, a.getScript(d + (-1 === d.indexOf("?") ? "?" : "&") + "jsonpcallback=FI.jsonfn." + g + (f ? "&_=" + f : ""))
                    }
                }, pinPicCode: function (b, c) {
                    b.attr("src", c), b.on("click.piccode", function () {
                        a(this).attr("src", c + "?_=" + Math.random())
                    }), this.refresh = function () {
                        b.trigger("click.piccode")
                    }
                }, ie_version: function () {
                    var a = navigator.userAgent, b = a.indexOf("MSIE") > -1, c = b ? /\d+/.exec(a.split(";")[1]) : "no ie";
                    return isNaN(c) ? 9999 : c
                }
            },
            browser: {
                isMac: function () {
                    return navigator.userAgent.toLowerCase().indexOf("mac os x") > 0
                }, isIOS: function () {
                    return navigator.userAgent.toLowerCase().indexOf("ios") > 0
                }
            },
            _fix_browser: function () {
                a("html").hasClass("lt-ie9") && a("html").hasClass("lt-ie8") && (a("body").on("mousedown", ".J-active", function () {
                    a(this).addClass("active")
                }).on("mouseup mouseleave", ".J-active", function () {
                    a(this).removeClass("active")
                }), a("body").on("focus", ".J-focus", function () {
                    a(this).addClass("focus")
                }).on("blur", ".J-focus", function () {
                    a(this).removeClass("focus")
                }), a("html").hasClass("lt-ie7") && a("body").on("mouseenter", ".J-hover", function () {
                    a(this).addClass("hover")
                }).on("mouseleave", ".J-hover", function () {
                    a(this).removeClass("hover")
                })), "placeholder"in document.createElement("input") || (b.UI.generate_placeholder(), a("body").on("click", ".placeholder", function () {
                    a(this).next("input").focus()
                }))
            },
            tools: {
                getCssClass: function (b) {
                    function c(b) {
                        var c = a.trim(b.attr("class"));
                        if (-1 === c.indexOf(" "))d[c] = !0; else {
                            c = c.split(" ");
                            for (var e = 0; e < c.length; e++)d[c[e]] = !0
                        }
                    }

                    var d = {};
                    c(b), b.find("[class]").each(function () {
                        c(a(this))
                    });
                    var e = "";
                    for (var f in d)"undefined" !== f && (e += "." + f + " {}\n");
                    console.log(e)
                }, getServerTime: function (a, d) {
                    if (-1 !== c.location.host.indexOf("func") && b.util.getUrlParam("__stime"))return a(b.util.getUrlParam("__stime")), void 0;
                    if (!b.g_var.stime || d) {
                        var e = new Date;
                        e = e.getTime(), b.helper.jsonpCall(b._data.origin + "/srv/nowtime", function (c) {
                            b.helper.ajax_success(c, function () {
                                b.helper.ajax_success(c, function (c) {
                                    c = parseInt(c, 10), a(c), b.g_var.stime = c
                                }, function () {
                                    a(e), b.g_var.stime = e
                                })
                            }, function () {
                                a(e), b.g_var.stime = e
                            })
                        })
                    } else a(b.g_var.stime)
                }, getTimeStamp: function (a, b, c, d, e, f) {
                    if (b) {
                        var g = new Date;
                        return g.setFullYear(a), g.setMonth(b - 1), g.setDate(c), g.setHours(d), g.setMinutes(e), g.setSeconds(f), g.setMilliseconds(0), g.getTime()
                    }
                    var g = new Date(a);
                    return g.toLocaleDateString() + g.toTimeString()
                }
            },
            atom: {
                type: function (a) {
                    return Object.prototype.toString.call(a).slice(8, -1).toLowerCase()
                }
            },
            _data: {
                base_url: -1 !== c.location.host.indexOf("local") ? "/v" : e("base_url"),
                ajax_base_url: e("ajax_base_url"),
                origin: e("origin"),
                js_url: "https://js.weibopay.com",
                zc_url: -1 !== c.location.host.indexOf("func") ? "https://funczc.weicaifu.com" : ""
            },
            g_var: {LOGIN_DIALOG: !1, isLogin: !1, stime: !1, SAFE_DIALOG: !1},
            jsonfn: {},
            iframefn: {}
        }, b.Math.round = function (a, c) {
            return b.Math.Div(Math.round(b.Math.Mul(a, Math.pow(10, c))), Math.pow(10, c))
        }, b.Math.ceil = function (a, c) {
            return b.Math.Div(Math.ceil(b.Math.Mul(a, Math.pow(10, c))), Math.pow(10, c))
        }, b.Math.floor = function (a, c) {
            return b.Math.Div(Math.floor(b.Math.Mul(a, Math.pow(10, c))), Math.pow(10, c))
        }, c.FI = b, "undefined" == typeof console && (console = {
            log: function () {
            }, error: function () {
            }
        }), b.util.cookie("SSOLoginState") ? b.helper.jsonpCall(b._data.origin + "/srv/accountinfo", function (a) {
            b.helper.ajax_success(a, function (a) {
                b.g_var.isLogin = a.isLogin, "0" === b.g_var.isLogin ? b.helper.sina_auto_login() : f()
            }, function () {
                f()
            })
        }) : a("#J-userinfo").css("visibility", "visible"), a(function () {
            function d(b) {
                var e = b / 10, f = parseInt(b - e, 10);
                f = f > 3 ? f : 0, setTimeout(function () {
                    a(c).scrollTop(f), 0 != f ? d(f) : a(c).removeData("scrolling")
                }, 28)
            }

            if (a.ajaxSetup({timeout: 1e5}), b.UI.generate_radio(), b.UI.generate_checkbox(), a("body").on("click", ".close_cross,.J-close_cross", function () {
                    a(this).attr("data-close") && (a(a(this).attr("data-close")).stop(!0, !0)[a(this).attr("data-animate") ? a(this).attr("data-animate") : "fadeOut"](a(this).attr("data-animate_time") ? parseFloat(a(this).attr("data-animate_time"), 10) : 300), "no" !== a(this).attr("data-shade") && b.UI.shade(!1))
                }), a("#J-return_top").length) {
                var e = a("#J-return_top");
                a(c).scroll(function () {
                    "yes" != a(c).data("scrolling") && (a(c).scrollTop() > 800 ? (IS_IE6 && e.animate({top: a(c).scrollTop() + a(c).height() - 100}, 50), e.fadeIn(200)) : e.fadeOut(200))
                }), e.click(function () {
                    a(c).data("scrolling", "yes"), d(a(c).scrollTop()), e.fadeOut(200)
                })
            }
            b.UI.layer_tips(a(".layer_tips")), setTimeout(function () {
                a("#J-login_now").length && !a(".account_sgs").length && require(["js/widget/login_dialog"], function (c) {
                    b.g_var.LOGIN_DIALOG = new c({}), a("#J-login_now").click(function () {
                        b.g_var.LOGIN_DIALOG.show()
                    })
                })
            }, 4444), a("body").on("click", ".J-logout", function (a) {
                var d = b._data.origin + "/signout";
                return c.location.href = "https://login.sina.com.cn/sso/logout.php?entry=weicaifu&r=" + encodeURIComponent(d), a.preventDefault(), !1
            }), b._fix_browser(), a("body").append('<div class="loading-bar"></div><div class="loading-info"></div>'), a(".nav_side").length && (a(".nav_side").on("click", ".J-item_toggle", function () {
                var b = a(this), c = ["icon-lart", "icon-larb"], d = a(".item_sub[data-subitem=" + b.attr("data-subitem") + "]"), e = d.eq(0).is(":hidden") ? 1 : 0;
                b.find("span").removeClass().addClass(c[e]), d.each(function () {
                    a(this).slideToggle()
                })
            }), a(".nav_side-item_current").removeClass("nav_side-item_current"), a(".nav_side-item_sub_current").removeClass("nav_side-item_sub_current"), a(".nav_side-item").each(function () {
                var b = a(this), d = b.children("a").attr("href");
                return d && (d = d.replace(/\.\./g, "")), -1 !== c.location.pathname.indexOf(a.trim(d)) ? (b.hasClass("item_sub") ? b.addClass("nav_side-item_sub_current") : b.addClass("nav_side-item_current"), !1) : void 0
            }), a(".J-item_toggle[data-subitem]").click()), a(".J-pyramids[data-pos]").length && setTimeout(function () {
                b.UI.positionads(a(".J-pyramids[data-pos]"))
            }, 0);
            var f, g = [{hostname: "www.weicaifu.com", pathname: "/", AP2: "微财富首页"}, {
                hostname: "www.weicaifu.com",
                pathname: "/detail",
                AP2: "详细页"
            }, {
                hostname: "www.weicaifu.com",
                pathname: "/list/fund",
                AP2: "基金列表页"
            }], h = window.location.hostname, i = window.location.pathname, j = "全局a标签点击统计", k = h + i;
            a.each(g, function (a, b) {
                -1 !== h.indexOf(b.hostname) && -1 !== i.indexOf(b.pathname) && (k = b.AP2)
            }), a("body").on("click.analytics", "a", function () {
                f = a(this).attr("href") + a(this).text(), ga && ga("send", "event", j, k, f), _hmt && _hmt.push(["_trackEvent", j, k, f])
            }), a("input[type=password],input[type=text]").val("").attr("autocomplete", "off"), a("a[href][target!=_blank]").on("click.loading", function () {
                var c = a(this).attr("href");
                0 !== c.indexOf("#") && 0 !== c.indexOf("javascript") && (b.UI.loading(!0), setTimeout(function () {
                    b.UI.loading(!1)
                }, 2333))
            }), !a(".head_link > a.active").length && a(".head_link > a").each(function () {
                (a(this).attr("href") === c.location.href || a(this).attr("href") === c.location.href.slice(0, -1)) && a(this).addClass("active")
            }), setTimeout(function () {
                b.helper.track_login()
            }, 1888)
        })
    }(a, window), b
});