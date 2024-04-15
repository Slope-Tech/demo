window.spb = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = !0;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    };
    __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    };
    __webpack_require__.t = function(value, mode) {
        1 & mode && (value = __webpack_require__(value));
        if (8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        });
        if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return {}.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 6);
}([ function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(4);
    module.exports.default = module.exports;
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0;
    exports.CHANNEL = void 0;
    exports.CHANNEL = {
        DESKTOP: "desktop-web",
        MOBILE: "mobile-web"
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return $Class;
    }));
    let EmptyConstructor = function() {};
    let create = Object.create || function(obj) {
        EmptyConstructor.prototype = obj;
        let instance = new EmptyConstructor;
        EmptyConstructor.prototype = null;
        return instance;
    };
    function _extend(obj, source) {
        if (!source) return obj;
        for (let key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
        return obj;
    }
    function isobject(obj) {
        return obj && "object" == typeof obj && obj instanceof Object;
    }
    function transpose(recipient, args) {
        for (let i = 0; i < args.length; i++) {
            let ob = args[i];
            if (isobject(ob)) for (let key in ob) {
                if (!ob.hasOwnProperty(key)) continue;
                let item = ob[key];
                item instanceof Function && (item.__name__ = key);
                recipient[key] = item;
            }
        }
    }
    function construct() {
        if (this.construct) {
            let ob = this.construct.apply(this, arguments);
            if (isobject(ob)) return ob;
        }
        transpose(this, arguments);
        this.init && this.init();
    }
    function reopen() {
        transpose(this.prototype, arguments);
        return this;
    }
    function reopenClass() {
        transpose(this, arguments);
        transpose(this.__classmethods__, arguments);
        return this;
    }
    function isChild(Cls) {
        return Cls && Cls.prototype instanceof this;
    }
    let id = 0;
    function extend(name) {
        let Cls, className, args, argsLength, startIndex;
        if ("string" == typeof name) {
            if (!name.match(/^[\w$][\w\d]*$/)) throw new Error("Class name can not include special characters: " + name);
            className = name;
            argsLength = arguments.length && arguments.length - 1;
            startIndex = 1;
        } else {
            className = this.name || "Object";
            argsLength = arguments.length;
            startIndex = 0;
        }
        args = new Array(argsLength);
        for (let i = startIndex; i < arguments.length; i++) args[i - startIndex] = arguments[i];
        eval("Cls = function " + className + "() { return construct.apply(this, arguments) }");
        Cls.__name__ = className;
        Cls.__classmethods__ = {
            extend: extend,
            reopen: reopen,
            reopenClass: reopenClass,
            isChild: isChild
        };
        id += 1;
        Cls.id = id;
        if (this && this !== window) {
            Cls.prototype = create(this.prototype);
            Cls.prototype.constructor = Cls;
            Cls.prototype._super = this.prototype;
            _extend(Cls.__classmethods__, this.__classmethods__);
        }
        _extend(Cls, Cls.__classmethods__);
        transpose(Cls.prototype, args);
        0 === className.indexOf("$") ? window[className] = Cls : window["$" + className] = Cls;
        return Cls;
    }
    function get(item, path, def) {
        if (!path) return def;
        path = path.split(".");
        for (let i = 0; i < path.length; i++) {
            if (!isobject(item)) return def;
            item = item[path[i]];
        }
        return void 0 === item ? def : item;
    }
    function set(item, path, value) {
        path = path.split(".");
        for (let i = 0; i < path.length - 1; i++) if (!isobject(item = item[path[i]])) throw new Error(path[i - 1] + "." + path[i] + " is not an object");
        item[path[path.length - 1]] = value;
    }
    function each(ob, callback) {
        for (let key in ob) ob.hasOwnProperty(key) && callback.call(ob, key, ob[key]);
    }
    function keys(ob) {
        if (Object.keys) return Object.keys(ob);
        let result = [];
        for (let key in ob) ob.hasOwnProperty(key) && result.push(key);
        return result;
    }
    let $Class = extend("Class", {
        init: function() {},
        get: function(path, def) {
            return get(this, path, def);
        },
        set: function(path, value) {
            set(this, path, value);
        },
        setProperties: function() {
            transpose(this, arguments);
        },
        forEach: function(callback) {
            each(this, callback);
        },
        keys: function() {
            return keys(this);
        }
    });
    $Class.get = get;
    $Class.set = set;
    $Class.keys = keys;
}, function(module, exports) {
    try {
        var props = window.paypal.Checkout.props;
        props.style = props.style || {
            type: "object",
            required: !1
        };
        props.fundingSource = props.fundingSource || {
            type: "string",
            required: !1
        };
    } catch (err) {}
}, function(module, exports, __webpack_require__) {
    factory = function() {
        return function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
                if (installedModules[moduleId]) return installedModules[moduleId].exports;
                var module = installedModules[moduleId] = {
                    exports: {},
                    id: moduleId,
                    loaded: !1
                };
                modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                module.loaded = !0;
                return module.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.p = "";
            return __webpack_require__(0);
        }([ function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _interface = __webpack_require__(1);
            Object.keys(_interface).forEach((function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _interface[key];
                    }
                });
            }));
            var INTERFACE = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) ({}).hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            }(_interface);
            exports.default = INTERFACE;
        }, function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _logger = __webpack_require__(2);
            Object.keys(_logger).forEach((function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _logger[key];
                    }
                });
            }));
            var _init = __webpack_require__(7);
            Object.keys(_init).forEach((function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _init[key];
                    }
                });
            }));
            var _transitions = __webpack_require__(9);
            Object.keys(_transitions).forEach((function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _transitions[key];
                    }
                });
            }));
            var _builders = __webpack_require__(5);
            Object.keys(_builders).forEach((function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _builders[key];
                    }
                });
            }));
            var _config = __webpack_require__(6);
            Object.keys(_config).forEach((function(key) {
                "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                    enumerable: !0,
                    get: function() {
                        return _config[key];
                    }
                });
            }));
        }, function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.flush = exports.tracking = exports.buffer = void 0;
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            exports.print = print;
            exports.immediateFlush = immediateFlush;
            exports.log = log;
            exports.prefix = function(name) {
                return {
                    debug: function(event, payload) {
                        return log("debug", name + "_" + event, payload);
                    },
                    info: function(event, payload) {
                        return log("info", name + "_" + event, payload);
                    },
                    warn: function(event, payload) {
                        return log("warn", name + "_" + event, payload);
                    },
                    error: function(event, payload) {
                        return log("error", name + "_" + event, payload);
                    },
                    flush: function() {
                        return _flush();
                    }
                };
            };
            exports.debug = function(event, payload) {
                return log("debug", event, payload);
            };
            exports.info = function(event, payload) {
                return log("info", event, payload);
            };
            exports.warn = function(event, payload) {
                return log("warn", event, payload);
            };
            exports.error = function(event, payload) {
                return log("error", event, payload);
            };
            exports.track = function(payload) {
                (0, _util.extend)(tracking, payload || {}, !1);
            };
            var _util = __webpack_require__(3);
            var _builders = __webpack_require__(5);
            var _config = __webpack_require__(6);
            var buffer = exports.buffer = [];
            var tracking = exports.tracking = {};
            (function() {}).bind && window.console && "object" === _typeof(console.log) && [ "log", "info", "warn", "error" ].forEach((function(method) {
                console[method] = this.bind(console[method], console);
            }), function() {}.call);
            var loaded = !1;
            setTimeout((function() {
                loaded = !0;
            }), 1);
            function print(level, event, payload) {
                if (!loaded) return setTimeout((function() {
                    return print(level, event, payload);
                }), 1);
                if (window.console && window.console.log) {
                    var logLevel = window.LOG_LEVEL || _config.config.logLevel;
                    if (!(_config.logLevels.indexOf(level) > _config.logLevels.indexOf(logLevel))) {
                        payload = payload || {};
                        var args = [ event ];
                        (0, _util.isIE)() && (payload = JSON.stringify(payload));
                        args.push(payload);
                        (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                        try {
                            window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                        } catch (err) {}
                    }
                }
            }
            function immediateFlush() {
                var async = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                if (_config.config.uri) {
                    var hasBuffer = buffer.length;
                    var hasTracking = Object.keys(tracking).length;
                    if (hasBuffer || hasTracking) {
                        hasTracking && print("info", "tracking", tracking);
                        var meta = {};
                        var _iterator = _builders.metaBuilders, _isArray = Array.isArray(_iterator), _i = 0;
                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                if ((_i = _iterator.next()).done) break;
                                _ref = _i.value;
                            }
                            var builder = _ref;
                            try {
                                (0, _util.extend)(meta, builder(), !1);
                            } catch (err) {
                                console.error("Error in custom meta builder:", err.stack || err.toString());
                            }
                        }
                        var _iterator2 = _builders.trackingBuilders, _isArray2 = Array.isArray(_iterator2), _i2 = 0;
                        for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                            var _ref2;
                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) break;
                                _ref2 = _iterator2[_i2++];
                            } else {
                                if ((_i2 = _iterator2.next()).done) break;
                                _ref2 = _i2.value;
                            }
                            var _builder = _ref2;
                            try {
                                (0, _util.extend)(tracking, _builder(), !1);
                            } catch (err) {
                                console.error("Error in custom tracking builder:", err.stack || err.toString());
                            }
                        }
                        var headers = {};
                        var _iterator3 = _builders.headerBuilders, _isArray3 = Array.isArray(_iterator3), _i3 = 0;
                        for (_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                            var _ref3;
                            if (_isArray3) {
                                if (_i3 >= _iterator3.length) break;
                                _ref3 = _iterator3[_i3++];
                            } else {
                                if ((_i3 = _iterator3.next()).done) break;
                                _ref3 = _i3.value;
                            }
                            var _builder2 = _ref3;
                            try {
                                (0, _util.extend)(headers, _builder2(), !1);
                            } catch (err) {
                                console.error("Error in custom header builder:", err.stack || err.toString());
                            }
                        }
                        var events = buffer;
                        var req = (0, _util.ajax)("post", _config.config.uri, headers, {
                            events: events,
                            meta: meta,
                            tracking: tracking
                        }, async);
                        exports.buffer = buffer = [];
                        exports.tracking = tracking = {};
                        return req;
                    }
                }
            }
            var _flush = (0, _util.promiseDebounce)(immediateFlush, _config.config.debounceInterval);
            exports.flush = _flush;
            function enqueue(level, event, payload) {
                buffer.push({
                    level: level,
                    event: event,
                    payload: payload
                });
                _config.config.autoLog.indexOf(level) > -1 && _flush();
            }
            function log(level, event, payload) {
                _config.config.prefix && (event = _config.config.prefix + "_" + event);
                "string" == typeof (payload = payload || {}) ? payload = {
                    message: payload
                } : payload instanceof Error && (payload = {
                    error: payload.stack || payload.toString()
                });
                payload.timestamp = Date.now();
                var _iterator4 = _builders.payloadBuilders, _isArray4 = Array.isArray(_iterator4), _i4 = 0;
                for (_iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ;) {
                    var _ref4;
                    if (_isArray4) {
                        if (_i4 >= _iterator4.length) break;
                        _ref4 = _iterator4[_i4++];
                    } else {
                        if ((_i4 = _iterator4.next()).done) break;
                        _ref4 = _i4.value;
                    }
                    var builder = _ref4;
                    try {
                        (0, _util.extend)(payload, builder(), !1);
                    } catch (err) {
                        console.error("Error in custom payload builder:", err.stack || err.toString());
                    }
                }
                _config.config.silent || print(level, event, payload);
                buffer.length === _config.config.sizeLimit ? enqueue("info", "logger_max_buffer_length") : buffer.length < _config.config.sizeLimit && enqueue(level, event, payload);
            }
        }, function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.windowReady = void 0;
            exports.extend = function(dest, src) {
                var over = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                dest = dest || {};
                src = src || {};
                for (var i in src) src.hasOwnProperty(i) && (!over && dest.hasOwnProperty(i) || (dest[i] = src[i]));
                return dest;
            };
            exports.isSameProtocol = isSameProtocol;
            exports.isSameDomain = isSameDomain;
            exports.ajax = function(method, url) {
                var headers = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                var data = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                var async = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                return new _promise.SyncPromise((function(resolve) {
                    var XRequest = window.XMLHttpRequest || window.ActiveXObject;
                    if (window.XDomainRequest && !isSameDomain(url)) {
                        if (!isSameProtocol(url)) return resolve();
                        XRequest = window.XDomainRequest;
                    }
                    var req = new XRequest("MSXML2.XMLHTTP.3.0");
                    req.open(method.toUpperCase(), url, async);
                    req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    req.setRequestHeader("Content-type", "application/json");
                    for (var headerName in headers) headers.hasOwnProperty(headerName) && req.setRequestHeader(headerName, headers[headerName]);
                    req.onreadystatechange = function() {
                        req.readyState > 3 && resolve();
                    };
                    req.send(JSON.stringify(data).replace(/&/g, "%26"));
                }));
            };
            exports.promiseDebounce = function(method, interval) {
                var debounce = {};
                return function() {
                    var args = arguments;
                    if (debounce.timeout) {
                        clearTimeout(debounce.timeout);
                        delete debounce.timeout;
                    }
                    debounce.timeout = setTimeout((function() {
                        var resolver = debounce.resolver;
                        var rejector = debounce.rejector;
                        delete debounce.promise;
                        delete debounce.resolver;
                        delete debounce.rejector;
                        delete debounce.timeout;
                        return _promise.SyncPromise.resolve().then((function() {
                            return method.apply(null, args);
                        })).then(resolver, rejector);
                    }), interval);
                    debounce.promise = debounce.promise || new _promise.SyncPromise((function(resolver, rejector) {
                        debounce.resolver = resolver;
                        debounce.rejector = rejector;
                    }));
                    return debounce.promise;
                };
            };
            exports.safeInterval = function(method, time) {
                var timeout = void 0;
                !function loop() {
                    timeout = setTimeout((function() {
                        method();
                        loop();
                    }), time);
                }();
                return {
                    cancel: function() {
                        clearTimeout(timeout);
                    }
                };
            };
            exports.uniqueID = function() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, (function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                }));
            };
            exports.isIE = function() {
                return Boolean(window.document.documentMode);
            };
            var _promise = __webpack_require__(4);
            function isSameProtocol(url) {
                return window.location.protocol === url.split("/")[0];
            }
            function isSameDomain(url) {
                var match = url.match(/https?:\/\/[^/]+/);
                return !match || match[0] === window.location.protocol + "//" + window.location.host;
            }
            exports.windowReady = new _promise.SyncPromise((function(resolve) {
                "complete" === document.readyState && resolve();
                window.addEventListener("load", resolve);
            }));
        }, function(module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.patchPromise = function() {
                window.Promise = SyncPromise;
            };
            var possiblyUnhandledPromiseHandlers = [];
            var possiblyUnhandledPromises = [];
            var possiblyUnhandledPromiseTimeout = void 0;
            function flushPossiblyUnhandledPromises() {
                possiblyUnhandledPromiseTimeout = null;
                var promises = possiblyUnhandledPromises;
                possiblyUnhandledPromises = [];
                var _loop = function(i) {
                    var promise = promises[i];
                    if (promise.silentReject) return "continue";
                    promise.handlers.push({
                        onError: function(err) {
                            promise.silentReject || function(err) {
                                if (-1 === dispatchedErrors.indexOf(err)) {
                                    dispatchedErrors.push(err);
                                    setTimeout((function() {
                                        throw err;
                                    }), 1);
                                    for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err);
                                }
                            }(err);
                        }
                    });
                    promise.dispatch();
                };
                for (var i = 0; i < promises.length; i++) _loop(i);
            }
            var dispatchedErrors = [];
            var toString = {}.toString;
            function isPromise(item) {
                try {
                    if (!item) return !1;
                    if (window.Window && item instanceof window.Window) return !1;
                    if (window.constructor && item instanceof window.constructor) return !1;
                    if (toString) {
                        var name = toString.call(item);
                        if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                    }
                    if (item && item.then instanceof Function) return !0;
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            var SyncPromise = exports.SyncPromise = function(handler) {
                this.resolved = !1;
                this.rejected = !1;
                this.silentReject = !1;
                this.handlers = [];
                !function(promise) {
                    possiblyUnhandledPromises.push(promise);
                    possiblyUnhandledPromiseTimeout = possiblyUnhandledPromiseTimeout || setTimeout(flushPossiblyUnhandledPromises, 1);
                }(this);
                if (handler) {
                    var self = this;
                    !function(method, successHandler, errorHandler) {
                        var isCalled = !1;
                        var isSuccess = !1;
                        var isError = !1;
                        var err = void 0, res = void 0;
                        function flush() {
                            if (isCalled) {
                                if (isError) return errorHandler(err);
                                if (isSuccess) return function(res) {
                                    return self.resolve(res);
                                }(res);
                            }
                        }
                        try {
                            method((function(result) {
                                res = result;
                                isSuccess = !0;
                                flush();
                            }), (function(error) {
                                err = error;
                                isError = !0;
                                flush();
                            }));
                        } catch (error) {
                            return errorHandler(error);
                        }
                        isCalled = !0;
                        flush();
                    }(handler, 0, (function(err) {
                        return self.reject(err);
                    }));
                }
            };
            SyncPromise.resolve = function(value) {
                return isPromise(value) ? value : (new SyncPromise).resolve(value);
            };
            SyncPromise.reject = function(error) {
                return (new SyncPromise).reject(error);
            };
            SyncPromise.prototype.resolve = function(result) {
                if (this.resolved || this.rejected) return this;
                if (isPromise(result)) throw new Error("Can not resolve promise with another promise");
                this.resolved = !0;
                this.value = result;
                this.dispatch();
                return this;
            };
            SyncPromise.prototype.reject = function(error) {
                if (this.resolved || this.rejected) return this;
                if (isPromise(error)) throw new Error("Can not reject promise with another promise");
                this.rejected = !0;
                this.value = error;
                this.dispatch();
                return this;
            };
            SyncPromise.prototype.asyncReject = function(error) {
                this.silentReject = !0;
                this.reject(error);
            };
            SyncPromise.prototype.dispatch = function() {
                var _this = this;
                if (this.resolved || this.rejected) {
                    var _loop2 = function() {
                        var handler = _this.handlers.shift();
                        var result = void 0, error = void 0;
                        try {
                            _this.resolved ? result = handler.onSuccess ? handler.onSuccess(_this.value) : _this.value : _this.rejected && (handler.onError ? result = handler.onError(_this.value) : error = _this.value);
                        } catch (err) {
                            error = err;
                        }
                        if (result === _this) throw new Error("Can not return a promise from the the then handler of the same promise");
                        if (!handler.promise) return "continue";
                        error ? handler.promise.reject(error) : isPromise(result) ? result.then((function(res) {
                            handler.promise.resolve(res);
                        }), (function(err) {
                            handler.promise.reject(err);
                        })) : handler.promise.resolve(result);
                    };
                    for (;this.handlers.length; ) _loop2();
                }
            };
            SyncPromise.prototype.then = function(onSuccess, onError) {
                if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                var promise = new SyncPromise(null, this);
                this.handlers.push({
                    promise: promise,
                    onSuccess: onSuccess,
                    onError: onError
                });
                this.silentReject = !0;
                this.dispatch();
                return promise;
            };
            SyncPromise.prototype.catch = function(onError) {
                return this.then(null, onError);
            };
            SyncPromise.prototype.finally = function(handler) {
                return this.then((function(result) {
                    return SyncPromise.try(handler).then((function() {
                        return result;
                    }));
                }), (function(err) {
                    return SyncPromise.try(handler).then((function() {
                        throw err;
                    }));
                }));
            };
            SyncPromise.all = function(promises) {
                var promise = new SyncPromise;
                var count = promises.length;
                var results = [];
                var _loop3 = function(i) {
                    (isPromise(promises[i]) ? promises[i] : SyncPromise.resolve(promises[i])).then((function(result) {
                        results[i] = result;
                        0 == (count -= 1) && promise.resolve(results);
                    }), (function(err) {
                        promise.reject(err);
                    }));
                };
                for (var i = 0; i < promises.length; i++) _loop3(i);
                count || promise.resolve(results);
                return promise;
            };
            SyncPromise.onPossiblyUnhandledException = function(handler) {
                possiblyUnhandledPromiseHandlers.push(handler);
            };
            SyncPromise.try = function(method) {
                return SyncPromise.resolve().then(method);
            };
            SyncPromise.delay = function(delay) {
                return new SyncPromise((function(resolve) {
                    setTimeout(resolve, delay);
                }));
            };
            SyncPromise.hash = function(obj) {
                var results = {};
                var promises = [];
                var _loop4 = function(key) {
                    obj.hasOwnProperty(key) && promises.push(SyncPromise.resolve(obj[key]).then((function(result) {
                        results[key] = result;
                    })));
                };
                for (var key in obj) _loop4(key);
                return SyncPromise.all(promises).then((function() {
                    return results;
                }));
            };
            SyncPromise.promisifyCall = function() {
                var args = [].slice.call(arguments);
                var method = args.shift();
                if ("function" != typeof method) throw new Error("Expected promisifyCall to be called with a function");
                return new SyncPromise((function(resolve, reject) {
                    args.push((function(err, result) {
                        return err ? reject(err) : resolve(result);
                    }));
                    return method.apply(null, args);
                }));
            };
        }, function(module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.addPayloadBuilder = function(builder) {
                payloadBuilders.push(builder);
            };
            exports.addMetaBuilder = function(builder) {
                metaBuilders.push(builder);
            };
            exports.addTrackingBuilder = function(builder) {
                trackingBuilders.push(builder);
            };
            exports.addHeaderBuilder = function(builder) {
                headerBuilders.push(builder);
            };
            var payloadBuilders = exports.payloadBuilders = [];
            var metaBuilders = exports.metaBuilders = [];
            var trackingBuilders = exports.trackingBuilders = [];
            var headerBuilders = exports.headerBuilders = [];
        }, function(module, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.config = {
                uri: "",
                prefix: "",
                initial_state_name: "init",
                flushInterval: 6e5,
                debounceInterval: 10,
                sizeLimit: 300,
                silent: !1,
                heartbeat: !0,
                heartbeatConsoleLog: !0,
                heartbeatInterval: 5e3,
                heartbeatTooBusy: !1,
                heartbeatTooBusyThreshold: 1e4,
                logLevel: "debug",
                autoLog: [ "warn", "error" ],
                logUnload: !0,
                logUnloadSync: !1,
                logPerformance: !0
            };
            exports.logLevels = [ "error", "warn", "info", "debug" ];
        }, function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.init = function(conf) {
                (0, _util.extend)(_config.config, conf || {});
                if (!initiated) {
                    initiated = !0;
                    _config.config.logPerformance && (0, _performance.initPerformance)();
                    _config.config.heartbeat && (0, _performance.initHeartBeat)();
                    if (_config.config.logUnload) {
                        var async = !_config.config.logUnloadSync;
                        window.addEventListener("beforeunload", (function() {
                            (0, _logger.info)("window_beforeunload");
                            (0, _logger.immediateFlush)(async);
                        }));
                        window.addEventListener("unload", (function() {
                            (0, _logger.info)("window_unload");
                            (0, _logger.immediateFlush)(async);
                        }));
                    }
                    _config.config.flushInterval && setInterval(_logger.flush, _config.config.flushInterval);
                    if (window.beaverLogQueue) {
                        window.beaverLogQueue.forEach((function(payload) {
                            (0, _logger.log)(payload.level, payload.event, payload);
                        }));
                        delete window.beaverLogQueue;
                    }
                }
            };
            var _config = __webpack_require__(6);
            var _util = __webpack_require__(3);
            var _performance = __webpack_require__(8);
            var _logger = __webpack_require__(2);
            var initiated = !1;
        }, function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.reqTimer = exports.clientTimer = void 0;
            exports.now = now;
            exports.reqStartElapsed = reqStartElapsed;
            exports.initHeartBeat = function() {
                var heartBeatTimer = timer();
                var heartbeatCount = 0;
                (0, _util.safeInterval)((function() {
                    if (!(_config.config.heartbeatMaxThreshold && heartbeatCount > _config.config.heartbeatMaxThreshold)) {
                        heartbeatCount += 1;
                        var elapsed = heartBeatTimer.elapsed();
                        var lag = elapsed - _config.config.heartbeatInterval;
                        var heartbeatPayload = {
                            count: heartbeatCount,
                            elapsed: elapsed
                        };
                        if (_config.config.heartbeatTooBusy) {
                            heartbeatPayload.lag = lag;
                            lag >= _config.config.heartbeatTooBusyThreshold && (0, _logger.info)("toobusy", heartbeatPayload, {
                                noConsole: !_config.config.heartbeatConsoleLog
                            });
                        }
                        (0, _logger.info)("heartbeat", heartbeatPayload, {
                            noConsole: !_config.config.heartbeatConsoleLog
                        });
                    }
                }), _config.config.heartbeatInterval);
            };
            exports.initPerformance = function() {
                if (!enablePerformance) return (0, _logger.info)("no_performance_data");
                (0, _builders.addPayloadBuilder)((function() {
                    var payload = {};
                    payload.client_elapsed = clientTimer.elapsed();
                    enablePerformance && (payload.req_elapsed = reqTimer.elapsed());
                    return payload;
                }));
                _util.windowReady.then((function() {
                    var timing = {};
                    [ "connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart" ].forEach((function(key) {
                        timing[key] = parseInt(window.performance.timing[key], 10) || 0;
                    }));
                    var offset = timing.connectEnd - timing.navigationStart;
                    timing.connectEnd && Object.keys(timing).forEach((function(name) {
                        var time = timing[name];
                        time && (0, _logger.info)("timing_" + name, {
                            client_elapsed: parseInt(time - timing.connectEnd - (clientTimer.startTime - offset), 10),
                            req_elapsed: parseInt(time - timing.connectEnd, 10)
                        });
                    }));
                    (0, _logger.info)("timing", timing);
                    (0, _logger.info)("memory", window.performance.memory);
                    (0, _logger.info)("navigation", window.performance.navigation);
                    window.performance.getEntries && window.performance.getEntries().forEach((function(resource) {
                        [ "link", "script", "img", "css" ].indexOf(resource.initiatorType) > -1 && (0, _logger.info)(resource.initiatorType, resource);
                    }));
                }));
            };
            var _config = __webpack_require__(6);
            var _logger = __webpack_require__(2);
            var _builders = __webpack_require__(5);
            var _util = __webpack_require__(3);
            var enablePerformance = window && window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0;
            function now() {
                return enablePerformance ? performance.now() : Date.now();
            }
            function timer(startTime) {
                return {
                    startTime: startTime = void 0 !== startTime ? startTime : now(),
                    elapsed: function() {
                        return parseInt(now() - startTime, 10);
                    },
                    reset: function() {
                        startTime = now();
                    }
                };
            }
            function reqStartElapsed() {
                if (enablePerformance) {
                    var timing = window.performance.timing;
                    return parseInt(timing.connectEnd - timing.navigationStart, 10);
                }
            }
            var clientTimer = exports.clientTimer = timer();
            var reqTimer = exports.reqTimer = timer(reqStartElapsed());
        }, function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            exports.startTransition = startTransition;
            exports.endTransition = endTransition;
            exports.transition = function(toState) {
                startTransition();
                endTransition(toState);
            };
            var _performance = __webpack_require__(8);
            var _logger = __webpack_require__(2);
            var _builders = __webpack_require__(5);
            var _util = __webpack_require__(3);
            var _config = __webpack_require__(6);
            var windowID = (0, _util.uniqueID)();
            var pageID = (0, _util.uniqueID)();
            var currentState = _config.config.initial_state_name;
            var startTime = void 0;
            function startTransition() {
                startTime = (0, _performance.now)();
            }
            function endTransition(toState) {
                startTime = startTime || (0, _performance.reqStartElapsed)();
                var currentTime = (0, _performance.now)();
                var elapsedTime = void 0;
                void 0 !== startTime && (elapsedTime = parseInt(currentTime - startTime, 0));
                var transitionName = "transition_" + currentState + "_to_" + toState;
                (0, _logger.info)(transitionName, {
                    duration: elapsedTime
                });
                (0, _logger.track)({
                    transition: transitionName,
                    transition_time: elapsedTime
                });
                (0, _logger.immediateFlush)();
                startTime = currentTime;
                currentState = toState;
                pageID = (0, _util.uniqueID)();
            }
            (0, _builders.addPayloadBuilder)((function() {
                return {
                    windowID: windowID,
                    pageID: pageID
                };
            }));
            (0, _builders.addMetaBuilder)((function() {
                return {
                    state: "ui_" + currentState
                };
            }));
        } ]);
    }, module.exports = factory();
    var factory;
}, function(module, exports) {
    !function(self) {
        "use strict";
        if (!self.fetch) {
            var support_searchParams = "URLSearchParams" in self, support_iterable = "Symbol" in self && "iterator" in Symbol, support_blob = "FileReader" in self && "Blob" in self && function() {
                try {
                    new Blob;
                    return !0;
                } catch (e) {
                    return !1;
                }
            }(), support_formData = "FormData" in self, support_arrayBuffer = "ArrayBuffer" in self;
            if (support_arrayBuffer) {
                var viewClasses = [ "[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]" ];
                var isDataView = function(obj) {
                    return obj && DataView.prototype.isPrototypeOf(obj);
                };
                var isArrayBufferView = ArrayBuffer.isView || function(obj) {
                    return obj && viewClasses.indexOf({}.toString.call(obj)) > -1;
                };
            }
            Headers.prototype.append = function(name, value) {
                name = normalizeName(name);
                value = normalizeValue(value);
                var oldValue = this.map[name];
                this.map[name] = oldValue ? oldValue + "," + value : value;
            };
            Headers.prototype.delete = function(name) {
                delete this.map[normalizeName(name)];
            };
            Headers.prototype.get = function(name) {
                name = normalizeName(name);
                return this.has(name) ? this.map[name] : null;
            };
            Headers.prototype.has = function(name) {
                return this.map.hasOwnProperty(normalizeName(name));
            };
            Headers.prototype.set = function(name, value) {
                this.map[normalizeName(name)] = normalizeValue(value);
            };
            Headers.prototype.forEach = function(callback, thisArg) {
                for (var name in this.map) this.map.hasOwnProperty(name) && callback.call(thisArg, this.map[name], name, this);
            };
            Headers.prototype.keys = function() {
                var items = [];
                this.forEach((function(value, name) {
                    items.push(name);
                }));
                return iteratorFor(items);
            };
            Headers.prototype.values = function() {
                var items = [];
                this.forEach((function(value) {
                    items.push(value);
                }));
                return iteratorFor(items);
            };
            Headers.prototype.entries = function() {
                var items = [];
                this.forEach((function(value, name) {
                    items.push([ name, value ]);
                }));
                return iteratorFor(items);
            };
            support_iterable && (Headers.prototype[Symbol.iterator] = Headers.prototype.entries);
            var methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
            Request.prototype.clone = function() {
                return new Request(this, {
                    body: this._bodyInit
                });
            };
            Body.call(Request.prototype);
            Body.call(Response.prototype);
            Response.prototype.clone = function() {
                return new Response(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new Headers(this.headers),
                    url: this.url
                });
            };
            Response.error = function() {
                var response = new Response(null, {
                    status: 0,
                    statusText: ""
                });
                response.type = "error";
                return response;
            };
            var redirectStatuses = [ 301, 302, 303, 307, 308 ];
            Response.redirect = function(url, status) {
                if (-1 === redirectStatuses.indexOf(status)) throw new RangeError("Invalid status code");
                return new Response(null, {
                    status: status,
                    headers: {
                        location: url
                    }
                });
            };
            self.Headers = Headers;
            self.Request = Request;
            self.Response = Response;
            self.fetch = function(input, init) {
                return new Promise((function(resolve, reject) {
                    var request = new Request(input, init);
                    var xhr = new XMLHttpRequest;
                    xhr.onload = function() {
                        var options = {
                            status: xhr.status,
                            statusText: xhr.statusText,
                            headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                        };
                        options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
                        resolve(new Response("response" in xhr ? xhr.response : xhr.responseText, options));
                    };
                    xhr.onerror = function() {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.ontimeout = function() {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.open(request.method, request.url, !0);
                    "include" === request.credentials ? xhr.withCredentials = !0 : "omit" === request.credentials && (xhr.withCredentials = !1);
                    "responseType" in xhr && support_blob && (xhr.responseType = "blob");
                    request.headers.forEach((function(value, name) {
                        xhr.setRequestHeader(name, value);
                    }));
                    xhr.send(void 0 === request._bodyInit ? null : request._bodyInit);
                }));
            };
            self.fetch.polyfill = !0;
        }
        function normalizeName(name) {
            "string" != typeof name && (name = String(name));
            if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
            return name.toLowerCase();
        }
        function normalizeValue(value) {
            "string" != typeof value && (value = String(value));
            return value;
        }
        function iteratorFor(items) {
            var iterator = {
                next: function() {
                    var value = items.shift();
                    return {
                        done: void 0 === value,
                        value: value
                    };
                }
            };
            support_iterable && (iterator[Symbol.iterator] = function() {
                return iterator;
            });
            return iterator;
        }
        function Headers(headers) {
            this.map = {};
            headers instanceof Headers ? headers.forEach((function(value, name) {
                this.append(name, value);
            }), this) : Array.isArray(headers) ? headers.forEach((function(header) {
                this.append(header[0], header[1]);
            }), this) : headers && Object.getOwnPropertyNames(headers).forEach((function(name) {
                this.append(name, headers[name]);
            }), this);
        }
        function consumed(body) {
            if (body.bodyUsed) return Promise.reject(new TypeError("Already read"));
            body.bodyUsed = !0;
        }
        function fileReaderReady(reader) {
            return new Promise((function(resolve, reject) {
                reader.onload = function() {
                    resolve(reader.result);
                };
                reader.onerror = function() {
                    reject(reader.error);
                };
            }));
        }
        function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader;
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
        }
        function bufferClone(buf) {
            if (buf.slice) return buf.slice(0);
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
        }
        function Body() {
            this.bodyUsed = !1;
            this._initBody = function(body) {
                this._bodyInit = body;
                if (body) if ("string" == typeof body) this._bodyText = body; else if (support_blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body; else if (support_formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body; else if (support_searchParams && URLSearchParams.prototype.isPrototypeOf(body)) this._bodyText = body.toString(); else if (support_arrayBuffer && support_blob && isDataView(body)) {
                    this._bodyArrayBuffer = bufferClone(body.buffer);
                    this._bodyInit = new Blob([ this._bodyArrayBuffer ]);
                } else {
                    if (!support_arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(body) && !isArrayBufferView(body)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = bufferClone(body);
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof body ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : support_searchParams && URLSearchParams.prototype.isPrototypeOf(body) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
            };
            if (support_blob) {
                this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                    if (this._bodyArrayBuffer) return Promise.resolve(new Blob([ this._bodyArrayBuffer ]));
                    if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                    return Promise.resolve(new Blob([ this._bodyText ]));
                };
                this.arrayBuffer = function() {
                    return this._bodyArrayBuffer ? consumed(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(readBlobAsArrayBuffer);
                };
            }
            this.text = function() {
                var rejected = consumed(this);
                if (rejected) return rejected;
                if (this._bodyBlob) return function(blob) {
                    var reader = new FileReader;
                    var promise = fileReaderReady(reader);
                    reader.readAsText(blob);
                    return promise;
                }(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(function(buf) {
                    var view = new Uint8Array(buf);
                    var chars = new Array(view.length);
                    for (var i = 0; i < view.length; i++) chars[i] = String.fromCharCode(view[i]);
                    return chars.join("");
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText);
            };
            support_formData && (this.formData = function() {
                return this.text().then(decode);
            });
            this.json = function() {
                return this.text().then(JSON.parse);
            };
            return this;
        }
        function Request(input, options) {
            var body = (options = options || {}).body;
            if (input instanceof Request) {
                if (input.bodyUsed) throw new TypeError("Already read");
                this.url = input.url;
                this.credentials = input.credentials;
                options.headers || (this.headers = new Headers(input.headers));
                this.method = input.method;
                this.mode = input.mode;
                if (!body && null != input._bodyInit) {
                    body = input._bodyInit;
                    input.bodyUsed = !0;
                }
            } else this.url = String(input);
            this.credentials = options.credentials || this.credentials || "omit";
            !options.headers && this.headers || (this.headers = new Headers(options.headers));
            this.method = (upcased = (method = options.method || this.method || "GET").toUpperCase(), 
            methods.indexOf(upcased) > -1 ? upcased : method);
            var method, upcased;
            this.mode = options.mode || this.mode || null;
            this.referrer = null;
            if (("GET" === this.method || "HEAD" === this.method) && body) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(body);
        }
        function decode(body) {
            var form = new FormData;
            body.trim().split("&").forEach((function(bytes) {
                if (bytes) {
                    var split = bytes.split("=");
                    var name = split.shift().replace(/\+/g, " ");
                    var value = split.join("=").replace(/\+/g, " ");
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                }
            }));
            return form;
        }
        function parseHeaders(rawHeaders) {
            var headers = new Headers;
            rawHeaders.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach((function(line) {
                var parts = line.split(":");
                var key = parts.shift().trim();
                if (key) {
                    var value = parts.join(":").trim();
                    headers.append(key, value);
                }
            }));
            return headers;
        }
        function Response(bodyInit, options) {
            options || (options = {});
            this.type = "default";
            this.status = void 0 === options.status ? 200 : options.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = "statusText" in options ? options.statusText : "OK";
            this.headers = new Headers(options.headers);
            this.url = options.url || "";
            this._initBody(bodyInit);
        }
    }("undefined" != typeof self ? self : this);
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, "setup", (function() {
        return button_setup;
    }));
    __webpack_require__(3);
    function _extends() {
        return (_extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) ({}).hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }).apply(this, arguments);
    }
    var get_get = function(item, path, def) {
        if (!path) return def;
        var splitPath = path.split(".");
        for (var i = 0; i < splitPath.length; i++) {
            if (!((value = item) && "object" == typeof value && value instanceof Object)) return def;
            item = item[splitPath[i]];
        }
        var value;
        return void 0 === item ? def : item;
    };
    var state_state = {
        contentHeight: 300,
        isZomboRendered: !1,
        currentCardType: void 0,
        isExpanded: !1,
        zipCode: void 0
    };
    var state_getState = function() {
        return state_state || {};
    };
    var state_setState = function(newState) {
        state_state = _extends({}, state_state, newState);
    };
    function memoize(method) {
        var called = !1;
        var result;
        function memoizeWrapper() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (called) return result;
            called = !0;
            return result = method.apply(this, arguments);
        }
        memoizeWrapper.reset = function() {
            called = !1;
        };
        return memoizeWrapper;
    }
    function querySelectorAll(selector, doc) {
        void 0 === doc && (doc = window.document);
        return [].slice.call(doc.querySelectorAll(selector));
    }
    function noop() {}
    function util_redirect(win, url) {
        void 0 === win && (win = window);
        return new window.paypal.Promise((function(resolve, reject) {
            setTimeout((function() {
                if (url.toLowerCase().replace(/[^a-z:]+/g, "").match(/^javascript:/)) return reject(new Error("Invalid redirect URL"));
                win.location = url;
                (function(url) {
                    return -1 === url.indexOf("#") || 0 !== url.indexOf("#") && url.split("#")[0] !== window.location.href.split("#")[0];
                })(url) || resolve();
            }), 1);
        }));
    }
    function sendBeacon(url) {
        var img = document.createElement("img");
        img.src = url;
        img.style.visibility = "hidden";
        img.style.position = "absolute";
        document.body && document.body.appendChild(img);
    }
    var clearFormAction = {
        type: "@@redux-form/RESET",
        meta: {
            form: "card_fields"
        }
    };
    var getButtonHeight_getButtonHeight = function() {
        var buttons = querySelectorAll(".paypal-button-number-0");
        if (!buttons || 0 === buttons.length) return 46;
        var button = buttons[0];
        var style = button.currentStyle || window.getComputedStyle(button);
        var marginBottom = Number(get_get(style, "marginBottom", "0").replace("px", ""));
        return button.clientHeight + marginBottom;
    };
    function addClass(element, className) {
        if (element) {
            var classes = element.className.split(" ");
            classes.indexOf(className) < 0 && "string" == typeof className && classes.push(className);
            element.className = classes.join(" ");
        }
    }
    function removeClass(element, className) {
        if (element) {
            var classes = element.className.split(" ");
            var i = classes.indexOf(className);
            i >= 0 && classes.splice(i, 1);
            element.className = classes.join(" ");
        }
    }
    var CARD_CLASSES = (querySelectorAll(".paypal-button-card") || []).reduce((function(acc, el) {
        if (el) {
            var cardType = el.getAttribute("data-card");
            cardType && (acc[cardType.toUpperCase()] = cardType);
        }
        return acc;
    }), {});
    var utils_getCardElementFromCardType = function(type) {
        var cardElements = querySelectorAll(function(type) {
            return ".paypal-button-card-" + type;
        }(type));
        return cardElements && cardElements[0] ? cardElements[0] : null;
    };
    var enableCard = function(cardEl) {
        cardEl && cardEl.style && (cardEl.style.opacity = "1");
    };
    var beaver_logger = __webpack_require__(0);
    var beaver_logger_default = __webpack_require__.n(beaver_logger);
    let $meta = window.meta || {};
    window;
    let $config = window.config || {};
    let $integration = {
        flow: "DEFAULT",
        init(flow, config) {
            this.config = config || {};
            flow && this.setFlow(flow);
            this.setContext(this.getContext());
        },
        getContext() {
            return this.isIFrame() ? "LIGHTBOX" : this.isPopup() ? "POPUP" : "FULLPAGE";
        },
        isPopup: () => Boolean(window.opener),
        isIFrame: () => window.top !== window.self,
        setContext(context) {
            beaver_logger_default.a.info("integration_context_" + context);
            this.context = context;
        },
        setFlow(flow) {
            beaver_logger_default.a.info("integration_flow_" + flow);
            this.flow = flow;
        },
        is(context, flow) {
            return this.isContext(context) && this.isFlow(flow);
        },
        isContext(context) {
            return this.context === context;
        },
        isFlow(flow) {
            return this.flow === flow;
        },
        getConfig(key) {
            this.context = this.getContext();
            if (this.config) return this.config.hasOwnProperty(this.context) && this.config[this.context].hasOwnProperty(this.flow) && this.config[this.context][this.flow].hasOwnProperty(key) ? this.config[this.context][this.flow][key] : this.config.hasOwnProperty(this.context) && this.config[this.context].hasOwnProperty(key) ? this.config[this.context][key] : this.config.hasOwnProperty("DEFAULT") && this.config.DEFAULT.hasOwnProperty(this.flow) && this.config.DEFAULT[this.flow].hasOwnProperty(key) ? this.config.DEFAULT[this.flow][key] : this.config.hasOwnProperty("DEFAULT") && this.config.DEFAULT.hasOwnProperty(key) ? this.config.DEFAULT[key] : void 0;
        },
        error(message) {
            return new Error(`Integration error: ${this.context} / ${this.flow} :: ${message}`);
        }
    };
    let redirected = !1;
    let paramCache = {};
    let $util = {
        forEach: function(collection, method) {
            if (collection instanceof Array) for (let i = 0; i < collection.length; i++) method(collection[i], i); else if (collection instanceof Object) for (var key in collection) collection.hasOwnProperty(key) && method(collection[key], key);
        },
        idleTimeout(time) {
            setTimeout((function() {
                beaver_logger_default.a.info("page_idle");
                $util.reload();
            }), time);
        },
        reload: function() {
            beaver_logger_default.a.info("reload");
            window.location.reload();
        },
        redirect: function(url, options) {
            if (-1 !== url.indexOf("javascript:")) {
                beaver_logger_default.a.error("unsafe_redirect_url", {
                    url: url
                });
                throw new Error("Unsafe redirect url: " + url);
            }
            beaver_logger_default.a.info("redirect", {
                url: url
            });
            $event.on("$stateChangeStart", (function(event) {
                beaver_logger_default.a.info("state_change_after_redirect");
                event.preventDefault();
            }));
            function redir() {
                if (!redirected) {
                    beaver_logger_default.a.info("redirect", {
                        url: url
                    });
                    window.onunload = window.onbeforeunload = function() {};
                    !1 !== $integration.getConfig("REDIRECT_TOP") ? window.top.location = url : window.location = url;
                    redirected = !0;
                }
            }
            $event.emit("loading");
            beaver_logger_default.a.flush().then(redir);
            setTimeout(redir, 500);
            beaver_logger_default.a.done();
        },
        cookiesEnabled: function() {
            let cookiesEnabled;
            document.cookie = "_cookiecheck=1";
            cookiesEnabled = Boolean(document.cookie.indexOf("_cookiecheck") > -1);
            document.cookie = "_cookiecheck=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "_cookiecheck; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            return cookiesEnabled;
        },
        params: function(string) {
            "string" != typeof string && (string = this.queryString().slice(1));
            let params = {};
            if (!string) return params;
            if (paramCache[string]) return paramCache[string];
            $util.forEach(string.split("&"), (function(pair) {
                (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }));
            paramCache[string] = params;
            return params;
        },
        queryString: function() {
            if (window.location.search) return window.location.search;
            {
                let string = window.location.href;
                let idx = string.indexOf("&");
                let rIdx = string.lastIndexOf("#");
                if (idx) return "?" + string.substring(idx, rIdx >= 0 ? rIdx : string.length);
            }
            return "";
        },
        queryStringSplice: function(qs, insert, remove) {
            0 === qs.indexOf("?") && (qs = qs.slice(1));
            let params = $util.extend(this.params(qs), insert);
            $util.forEach(remove, (function(key) {
                delete params[key];
            }));
            return "?" + this.paramToQueryString(params);
        },
        extend(obj, source) {
            if (!source) return obj;
            for (let key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
            return obj;
        },
        paramToQueryString: function(params) {
            return this.filter(this.map(Object.keys(params).sort(), (function(key) {
                if (params[key]) return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            }))).join("&");
        },
        extendUrl: (url, query) => (url += -1 === url.indexOf("?") ? "?" : "&") + $util.paramToQueryString(query),
        param: function(name) {
            return this.params()[name];
        },
        hashParam: function(name) {
            return this.params(window.location.hash.slice(1))[name];
        },
        base64Decode: function(encodedString) {
            return encodedString && window.atob(encodedString);
        },
        decodeAndParse: function(encodedString) {
            if (encodedString) return this.params(decodeURIComponent(this.base64Decode(encodedString)));
        },
        assert: function(value, message, payload) {
            if (!value) throw new Error(message, payload || {});
        },
        map: function(array, method) {
            let results;
            if ((array = array || []) instanceof Array) {
                results = [];
                $util.forEach(array, (function() {
                    results.push(method.apply(this, arguments));
                }));
                return results;
            }
            if (array instanceof Object) {
                results = {};
                $util.forEach(array, (function(val, key) {
                    results[key] = method.apply(this, arguments);
                }));
                return results;
            }
            throw new Error("$util.map expects array or object");
        },
        filter: function(array, method) {
            method = method || Boolean;
            let results = [];
            $util.forEach(array, (function(item) {
                method.apply(this, arguments) && results.push(item);
            }));
            return results;
        },
        find: function(array, method) {
            if (array) for (let i = 0; i < array.length; i++) if (method(array[i])) return array[i];
        },
        findIndex: function(array, method) {
            if (array) for (let i = 0; i < array.length; i++) if (method(array[i])) return i;
        },
        range: function(start, end) {
            if (!end) {
                end = start;
                start = 0;
            }
            let result = [];
            for (let i = start; i < end; i++) result.push(i);
            return result;
        },
        pad: function(string, n, char) {
            n = n || 0;
            char = char || "0";
            return (Array(n + 1).join(char.toString()) + string).slice(-n);
        },
        some: function(array, method) {
            let result;
            $util.forEach(array, (function(item, key) {
                result || (result = method(item, key));
            }));
            return result;
        },
        every: function(array, method) {
            method = method || Boolean;
            let result = !0;
            $util.forEach(array, (function(item) {
                method(item) || (result = !1);
            }));
            return result;
        },
        reduce: function(array, method, intial) {
            $util.forEach(array, (function(item) {
                intial = method(intial, item);
            }));
            return intial;
        },
        isPopup: () => $integration.isPopup(),
        isIFrame: () => $integration.isIFrame(),
        buildURL: function(url, params) {
            this.assert(url, "buildURL :: expected url");
            let paramKeys = Object.keys(params || {});
            if ("{}" === JSON.stringify(params)) return url;
            if (!paramKeys.length) return url;
            -1 === url.indexOf("?") ? url += "?" : url += "&";
            return url + this.paramToQueryString(params);
        },
        paypalURL: function(url, params) {
            url = "https://" + ($meta.stage ? $meta.stage : window.location.host) + url;
            return this.buildURL(url, params);
        },
        override: function(obj, methodName, handler) {
            let existing = obj[methodName];
            obj[methodName] = function() {
                if (existing) try {
                    existing.apply(obj, arguments);
                } catch (err) {
                    beaver_logger_default.a.error(methodName + "event_error", {
                        error: err.toString
                    });
                }
                return handler.apply(obj, arguments);
            };
        },
        result: function(method) {
            return method();
        },
        memoize: function(method) {
            let result;
            let called = !1;
            function memoized() {
                called || (result = method.apply(this, arguments));
                called = !0;
                return result;
            }
            memoized.flush = function() {
                called = !1;
            };
            return memoized;
        },
        now: function() {
            return window.enablePerformance ? parseInt(window.performance.now(), 10) : Date.now();
        },
        bindObject: function(obj, self) {
            return $util.map(obj, (function(method) {
                return method.bind(self);
            }));
        },
        hashStr: function(str) {
            let i, chr, len, hash = 0;
            if (0 === str.length) return hash;
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0;
            }
            return Math.abs(hash);
        },
        hash: function() {
            return this.hashStr(Math.random());
        },
        popup: function(name, url, options, callback) {
            callback = $util.once(callback);
            let win = window.open(url, name, $util.map(Object.keys(options), (function(key) {
                return `${key}=${options[key]}`;
            })).join(", "));
            let interval;
            function checkWindowClosed() {
                if (win.closed) {
                    clearInterval(interval);
                    callback();
                }
            }
            interval = setInterval(checkWindowClosed, 50);
            setTimeout(checkWindowClosed);
            try {
                let close = win.close;
                win.close = function() {
                    close.apply(this, arguments);
                    checkWindowClosed();
                };
            } catch (err) {}
            return win;
        },
        unique: function(collection) {
            return collection.filter((function(value, index, self) {
                return self.indexOf(value) === index;
            }));
        },
        monkeyPatch(mod, prop, method) {
            let original = mod[prop];
            mod[prop] = function() {
                return method.call(this, arguments, (self, args) => {
                    if (original) return original.apply(self || this, args || arguments);
                });
            };
        },
        once(method) {
            let called = !1;
            return function() {
                if (!called) {
                    called = !0;
                    return method.apply(this, arguments);
                }
            };
        },
        camelToDasherize: string => string.replace(/([A-Z])/g, (function(g) {
            return "-" + g.toLowerCase();
        })),
        camelToCapsUnderscore: string => string.replace(/([a-z][A-Z])/g, (function(g) {
            return g[0] + "_" + g[1];
        })).toUpperCase(),
        dasherizeToCamel: string => string.replace(/-([a-z])/g, (function(g) {
            return g[1].toUpperCase();
        })),
        parentWindow: function() {
            return window.opener ? window.opener : window.parent !== window ? window.parent : void 0;
        },
        noop() {}
    };
    window.Promise && (window.Promise.prototype.finally = function(callback) {
        const promise = this.constructor;
        return this.then((function(value) {
            return promise.resolve(callback()).then((function() {
                return value;
            }));
        }), (function(err) {
            return promise.resolve(callback()).then((function() {
                throw err;
            }));
        }));
    });
    let promise_Promise = window.Promise;
    function $promise(obj) {
        return promise_Promise.resolve(obj);
    }
    $util.extend($promise, {
        use(CustomPromise) {
            promise_Promise = CustomPromise;
        },
        resolver: method => new promise_Promise(method),
        resolve: value => promise_Promise.resolve(value),
        reject: value => promise_Promise.reject(value),
        run: function(method) {
            return promise_Promise.resolve().then(method);
        },
        call: function(method) {
            return promise_Promise.resolve().then(method);
        },
        sequential: function(methods) {
            let prom = promise_Promise.resolve();
            $util.forEach(methods, (function(method) {
                prom = prom.then(method);
            }));
            return prom;
        },
        sleep: function(time) {
            return new promise_Promise((function(resolve) {
                setTimeout(resolve, time);
            }));
        },
        map: function(items, method) {
            let promises;
            if (items instanceof Array) promises = []; else {
                if (!(items instanceof Object)) return promise_Promise.resolve();
                promises = {};
            }
            return this.all($util.map(items, (function(item, key) {
                promises[key] = promise_Promise.resolve(item).then((function(result) {
                    return method(result, key, promises);
                }));
                return promises[key];
            })));
        },
        all: function(items) {
            return items instanceof Array ? promise_Promise.all(items) : items instanceof Object ? this.hash(items) : promise_Promise.resolve([]);
        },
        hash: function(obj) {
            let results = {};
            return promise_Promise.all($util.map(obj, (function(item, key) {
                return promise_Promise.resolve(item).then((function(result) {
                    results[key] = result;
                }));
            }))).then((function() {
                return results;
            }));
        },
        extend: function(obj, hash) {
            return this.hash(hash || {}).then((function(data) {
                $util.extend(obj, data);
            }));
        },
        attempt: function(attempts, method) {
            attempts -= 1;
            return promise_Promise.resolve().then((function() {
                return method(attempts);
            })).catch((function(err) {
                return attempts ? $promise.attempt(attempts, method) : promise_Promise.reject(err);
            }));
        },
        debounce: function(method, time) {
            let timeout;
            let resolvers = {};
            return function() {
                let self = this;
                let args = arguments;
                let key = JSON.stringify(args);
                resolvers[key] = resolvers[key] || [];
                return new promise_Promise((function(resolve) {
                    resolvers[key].push(resolve);
                    clearTimeout(timeout);
                    timeout = setTimeout((function() {
                        let result = method.apply(self, args);
                        $util.forEach(resolvers[key], (function(resolver) {
                            resolver(result);
                        }));
                        delete resolvers[key];
                    }), time);
                }));
            };
        },
        every: function(collection, handler) {
            return this.map(collection, (function(item) {
                return handler(item);
            })).then((function(results) {
                return $util.every(results);
            }));
        },
        providing: function(condition, handler) {
            return promise_Promise.resolve(condition).then((function(result) {
                if (result) return handler(result);
            }));
        },
        until: function(condition, pollTime, timeout, alwaysResolve) {
            return new promise_Promise((function(resolve, reject) {
                if (condition()) return resolve();
                let interval = setInterval((function() {
                    if (condition()) {
                        clearInterval(interval);
                        return resolve();
                    }
                }), pollTime);
                timeout && setTimeout((function() {
                    clearInterval(interval);
                    return alwaysResolve ? resolve() : reject();
                }), timeout);
            }));
        },
        first: function(handlers) {
            let prom = $promise.resolve();
            let result;
            $util.forEach(handlers, (function(handler) {
                prom = prom.then((function() {
                    return result || handler();
                })).then((function(handlerResult) {
                    result = handlerResult;
                    return result;
                }));
            }));
            return prom;
        }
    });
    let event_handlers = {};
    let customEventEmitter;
    let $event = {
        use(eventEmitter) {
            customEventEmitter = eventEmitter;
            for (let eventName of Object.keys(event_handlers)) if (event_handlers[eventName]) for (let handler of event_handlers[eventName]) customEventEmitter.on(eventName, handler);
        },
        on(eventName, method) {
            if (customEventEmitter) return customEventEmitter.on(eventName, method);
            event_handlers[eventName] = event_handlers[eventName] || [];
            event_handlers[eventName].push(method);
            var cancelled = !1;
            function cancel() {
                if (!cancelled) {
                    event_handlers[eventName].splice(event_handlers[eventName].indexOf(method), 1);
                    cancelled = !0;
                }
            }
            cancel.cancel = cancel;
            return cancel;
        },
        once(eventName, method) {
            if (customEventEmitter) return customEventEmitter.once(eventName, method);
            var listener = $event.on(eventName, (function() {
                listener.cancel();
                return method.apply(this, arguments);
            }));
            return listener;
        },
        emit(eventName) {
            if (customEventEmitter) return customEventEmitter.emit(...arguments);
            let event = {
                preventDefault() {
                    event.defaultPrevented = !0;
                }
            };
            if (event_handlers[eventName]) for (let handler of [].slice.apply(event_handlers[eventName])) handler.apply(this, event, ...arguments);
            return event;
        },
        broadcast(eventName) {
            return customEventEmitter ? customEventEmitter.broadcast(...arguments) : $event.emit(...arguments);
        },
        refCount: function($scope, start, stop) {
            return $promise.resolver((function(resolve) {
                let count = 0;
                function res() {
                    if (!count) {
                        if (cancelStartListener && cancelStopListener) {
                            cancelStartListener();
                            cancelStopListener();
                        }
                        return resolve();
                    }
                }
                let cancelStartListener = $scope.$on(start, (function(event, data) {
                    count += 1;
                }));
                let cancelStopListener = $scope.$on(stop, (function(event, data) {
                    setTimeout((function() {
                        count -= 1;
                        res();
                    }), 50);
                }));
                setTimeout(res, 50);
            }));
        },
        compose(start, end, startAll, endAll) {
            var count = 0;
            $event.on(start, (function() {
                count || setTimeout((function() {
                    $event.emit(startAll);
                }));
                count += 1;
            }));
            $event.on(end, (function() {
                setTimeout((function() {
                    (count -= 1) || $event.emit(endAll);
                }), 50);
            }));
            return {
                getCount: () => count,
                isActive: () => Boolean(count),
                reset() {
                    count = 0;
                }
            };
        }
    };
    var dist_class = __webpack_require__(2);
    $util.monkeyPatch(window, "onerror", (function([message, file, line, col, err], original) {
        original();
        $event.emit("$windowError", {
            message: message && (message.stack || message).toString(),
            file: file && file.toString(),
            line: line && line.toString(),
            col: col && col.toString(),
            stack: err && (err.stack || err).toString()
        });
    }));
    let $Error = dist_class.a.extend.call(Error, "$Error", {
        construct: function(err, properties) {
            err instanceof Error && (err = err.message);
            properties && $util.extend(this, properties);
            this.payload = properties;
            this.message = err;
        }
    });
    let $Contingency = $Error.extend("$Contingency", {
        handle: function(handlers) {
            let handler = handlers[this.message] || handlers.DEFAULT;
            if (handler) {
                let result = handler.call(this, this.message, this);
                return void 0 === result || result;
            }
        }
    });
    let $Forbidden = $Error.extend("$Forbidden");
    let $ApiError = $Error.extend("$ApiError");
    let $BatchShortCircuit = $Error.extend("$BatchShortCircuit");
    $Error.extend("$FallbackError", {
        init: function() {
            this.reason = this.reason || "";
            this.product = this.product || "";
            this.entryPoint = this.entryPoint || "";
        }
    });
    let firstLoad = !1;
    $event.compose("loading", "loaded", "startLoad", "allLoaded");
    $event.on("allLoaded", (function() {
        firstLoad = !0;
    }));
    let standardHeaders = {};
    $meta.headers = $meta.headers || {};
    $meta.headers["x-cookies"] = "object" != typeof $meta.headers["x-cookies"] ? JSON.parse($meta.headers["x-cookies"] || "{}") : $meta.headers["x-cookies"];
    function cookiesEnabled() {
        return $util.cookiesEnabled() && window.location.hostname.indexOf(".paypal.com") > -1;
    }
    let api_cache = {};
    let windowLoad = $util.memoize(() => $promise.resolver(resolve => {
        "complete" === document.readyState ? resolve() : window.addEventListener("load", resolve);
    }));
    let batchQueue = {};
    window.pre = window.pre || {};
    let transientCache = {};
    Object.keys(window.pre).forEach(key => {
        let {method: method, uri: uri, res: res} = window.pre[key];
        transientCache[`${method}:${uri}`] = res;
    });
    let transientCacheResolvers = {};
    let metaBuilder;
    window.preload = function(method, url, data, name) {
        name && (window.pre[name] = {
            method: method,
            uri: url,
            res: data
        });
        let key = `${method}:${url}`;
        let resolvers = transientCacheResolvers[key] || [];
        transientCache[key] = data;
        for (;resolvers.length; ) resolvers.pop().call();
    };
    let preloadComplete = !1;
    window.preloadComplete = function() {
        preloadComplete = !0;
        Object.keys(transientCacheResolvers).forEach((function(key) {
            let resolvers = transientCacheResolvers[key] || [];
            for (;resolvers.length; ) resolvers.pop().call();
        }));
    };
    beaver_logger_default.a.info(cookiesEnabled() ? "cookies_enabled" : "cookies_disabled");
    let $Api = dist_class.a.extend("$Api", {
        cache: !1,
        timeout: 45e3,
        getAttempts: 3,
        postAttempts: 1,
        action: function(action, options) {
            options.action = action;
            return this.post(options);
        },
        retrieve: function(options = {}) {
            options.method = "get";
            return this.call(options);
        },
        post: function(options) {
            options.method = "post";
            return this.call(options);
        },
        call: function(options) {
            let self = this;
            options.api = this;
            options.uri = this.getURI(options.model, options.action);
            options.params = options.params || {};
            options.cache = options.cache || self.cache && "get" === options.method;
            options.name = this.buildAPIName(options);
            options.meta = this.buildMeta();
            options.transientError = options.transientError || !1;
            options.cacheKey = $util.buildURL(options.uri, options.params);
            beaver_logger_default.a.info(options.name + "_call", {
                name: options.name,
                method: options.method,
                uri: options.uri
            });
            options.silent || $event.emit("loading");
            return $promise.first([ function() {
                if (options.cache && api_cache[options.cacheKey]) return api_cache[options.cacheKey];
            }, function() {
                return $promise.providing(self.hasTransientCacheData(options), (function() {
                    return self.attemptRequest(options);
                }));
            }, function() {
                if (options.batch) return self.batchRequest(options);
            }, function() {
                return self.attemptRequest(options);
            } ]).finally((function() {
                options.silent || $event.emit("loaded");
            })).then((function(res) {
                options.cache && (api_cache[options.cacheKey] = res);
                return self.handleResponse(res.data, options);
            }), (function(err) {
                return err instanceof $BatchShortCircuit ? $promise.reject(err) : self.handleErrorResponse(err, options);
            }));
        },
        batchRequest: function(options) {
            $util.assert(options.batch.name, 'Must define a "name" for batch request: ' + options.batch);
            $util.assert(options.batch.id, 'Must define a "id" for batch request: ' + options.batch);
            let name = options.batch.name;
            let id = options.batch.id;
            (batchQueue[name] = batchQueue[name] || {})[id] = options;
            return this.buildBatchRequest(name).then((function(results) {
                return results[id].then((function(result) {
                    return result || $promise.reject(new $BatchShortCircuit);
                }));
            }));
        },
        buildBatchRequest: $promise.debounce((function(name) {
            let self = this;
            let batch = batchQueue[name];
            let batchIds = dist_class.a.keys(batch);
            let batchData = {};
            let headers = {};
            delete batchQueue[name];
            if (1 === batchIds.length) {
                let batchId = batchIds[0];
                let opts = batch[batchId];
                let results = {};
                results[batchId] = opts.api.attemptRequest(opts);
                return results;
            }
            $util.forEach(batch, (function(options, id) {
                batchData[id] = {
                    method: options.method,
                    uri: options.api.getURI(options.model, options.action, !0),
                    data: options.data,
                    params: options.params,
                    dependencies: options.batch.dependencies
                };
                $util.extend(headers, options.headers);
            }));
            return $batchApi.action(name, {
                data: batchData,
                headers: headers
            }).then((function(res) {
                return self.handleBatchResponse(batch, res.data);
            }));
        })),
        handleBatchResponse: function(batch, data) {
            let self = this;
            let promises = {};
            $util.forEach(batch, (function(options, id) {
                promises[id] = $promise.run((function() {
                    let depsPresent = $promise.every(options.batch.dependencies || [], (function(depName) {
                        batch[depName] || beaver_logger_default.a.info("missing_batch_dependency", {
                            dependency: depName,
                            available: Object.keys(batch).join("|")
                        });
                        return !batch[depName] || promises[depName].then((function(dependency) {
                            return dependency && dependency.data && "success" === dependency.data.ack;
                        }));
                    }));
                    return $promise.providing(depsPresent, (function() {
                        return $promise.providing(data[id], (function(result) {
                            self.addTransientCacheData(options.method, options.api.getURI(options.model, options.action), result);
                        })).then((function() {
                            return options.api.attemptRequest(options);
                        }));
                    }));
                }));
            }));
            return promises;
        },
        attemptRequest: function(options) {
            let self = this;
            let attempts = "get" === options.method ? this.getAttempts : this.postAttempts;
            return $promise.attempt(attempts, (function(remaining) {
                return self.getTransientCacheResponse(options).then((function(res) {
                    return res || self.getHttpResponse(options);
                })).catch((function(res) {
                    if (!(res && res.status || 1 !== attempts)) {
                        beaver_logger_default.a.warn("api_retry_aborted", {
                            method: options.method,
                            uri: options.uri
                        });
                        return self.getHttpResponse(options);
                    }
                    return $promise.reject(res);
                })).catch((function(res) {
                    if (401 === res.status) {
                        beaver_logger_default.a.warn("api_retry_401", {
                            method: options.method,
                            uri: options.uri
                        });
                        return self.getHttpResponse(options);
                    }
                    return $promise.reject(res);
                })).catch((function(res) {
                    if (401 === res.status) return {
                        data: {
                            ack: "permission_denied"
                        }
                    };
                    if (remaining) {
                        beaver_logger_default.a.warn("api_retry", {
                            method: options.method,
                            uri: options.uri
                        });
                        return $promise.reject(res);
                    }
                    return $promise.reject(res && res.data && "error" === res.data.ack ? new $ApiError("api_error", {
                        name: options.name,
                        method: options.method,
                        uri: options.uri,
                        stack: res.data.stack,
                        transient: options.transientError
                    }) : new $ApiError(res && res.status ? "response_status_" + res.status : res && res.error ? "request_" + res.error : "request_aborted", {
                        uri: options.uri,
                        transient: options.transientError
                    }));
                }));
            }));
        },
        getHttpResponse: function(options) {
            let self = this;
            let startTime = $util.now();
            return this.http(options).finally((function() {
                options.duration = $util.now() - startTime;
            })).catch((function(res) {
                return res && res.status && "400" === res.status.toString() && res.data && res.data.ack ? res : $promise.reject(res);
            })).then((function(res) {
                self.saveResponseState(res);
                let loggerPayload = {
                    name: options.name,
                    method: options.method,
                    uri: options.uri,
                    server: res.data.server,
                    time: options.duration,
                    duration: options.duration
                };
                window.performance && window.performance.getEntries && $util.forEach(window.performance.getEntries(), (function(resource) {
                    resource.name && resource.name.indexOf(options.uri) > -1 && $util.extend(loggerPayload, resource);
                }));
                beaver_logger_default.a.info("api_response", loggerPayload);
                res && res.status && beaver_logger_default.a.info("http_response_" + res.status);
                return res;
            }), (function(res) {
                self.saveResponseState(res);
                res && res.status && beaver_logger_default.a.info("http_response_" + res.status);
                return $promise.reject(res);
            }));
        },
        setTransientCache: function(data) {
            throw new Error("NotImplemented");
        },
        getTransientCacheData: function(options, pop) {
            if (!$config.enablePreload) return $promise.resolve();
            let key = `${options.method.toLowerCase()}:${$util.buildURL(options.uri, options.params)}`;
            return $promise.resolver((function(resolve) {
                function res() {
                    let data = transientCache[key];
                    pop && delete transientCache[key];
                    resolve(data);
                }
                transientCacheResolvers[key] = transientCacheResolvers[key] || [];
                transientCacheResolvers[key].push(res);
                if (transientCache[key] || "complete" === document.readyState || preloadComplete) return res();
                windowLoad().then(res);
            }));
        },
        hasTransientCacheData: function(options) {
            return this.getTransientCacheData(options, !1).then((function(data) {
                return Boolean(data);
            }));
        },
        addTransientCacheData: function(method, uri, data) {
            window.preload(method, uri, data);
        },
        getTransientCacheResponse: function(options) {
            return this.getTransientCacheData(options, !0).then((function(data) {
                if (data) return "error" === data.ack ? $promise.reject({
                    status: 500,
                    data: data
                }) : "permission_denied" === data.ack ? $promise.reject({
                    status: 401,
                    data: data
                }) : "contingency" === data.ack || "validation_error" === data.ack ? {
                    status: 400,
                    data: data
                } : {
                    status: 200,
                    data: data
                };
                "get" !== options.method || firstLoad || options.silent || beaver_logger_default.a.info("preload_cache_miss", {
                    uri: options.uri
                });
            }));
        },
        getHeaders(options) {
            $meta.headers["x-csrf-jwt"] || $meta.csrfJwt || beaver_logger_default.a.warn("missing_csrf_jwt");
            let headers = {
                "X-Requested-With": "XMLHttpRequest",
                "x-csrf-jwt": $meta.headers["x-csrf-jwt"] || $meta.csrfJwt
            };
            cookiesEnabled() || (headers["x-cookies"] = JSON.stringify($meta.headers["x-cookies"]));
            $util.extend(headers, standardHeaders);
            options.headers && $util.extend(headers, options.headers);
            return headers;
        },
        http(options) {
            return this.httpNative(options);
        },
        httpJQuery: function(options) {
            let settings = {
                method: options.method,
                data: "get" === options.method ? options.params : JSON.stringify({
                    data: options.data,
                    meta: options.meta || {}
                }),
                headers: this.getHeaders(options),
                timeout: this.timeout
            };
            "post" === options.method ? settings.headers["Content-Type"] = "application/json;charset=UTF-8" : "get" === options.method && (settings.data.meta = JSON.stringify(options.meta));
            return $promise.resolver((resolve, reject) => {
                function getRes(res, data) {
                    return {
                        status: res.status,
                        data: data,
                        headers: function(name) {
                            return res.getResponseHeader(name);
                        }
                    };
                }
                settings.success = function(data, status, res) {
                    return resolve(getRes(res, data));
                };
                settings.error = function(res) {
                    return res && res.status ? res.status >= 400 ? reject(getRes(res, res.responseJSON)) : resolve(getRes(res, res.responseJSON)) : reject({
                        status: 0,
                        headers: $util.noop,
                        error: res && res.statusText
                    });
                };
                jQuery.ajax(options.uri, settings);
            });
        },
        httpNative(options) {
            options.params = options.params || {};
            return (config = {
                method: options.method,
                url: options.uri,
                query: {
                    ...options.params,
                    meta: JSON.stringify(options.meta)
                },
                json: {
                    data: options.data,
                    meta: options.meta || {}
                },
                headers: this.getHeaders(options),
                timeout: this.timeout
            }, $promise.resolver((resolve, reject) => {
                config.method = config.method || "get";
                if ("get" === config.method) {
                    delete config.body;
                    delete config.json;
                }
                "post" === config.method && delete config.query;
                config.query && (config.url = $util.extendUrl(config.url, config.query));
                let headers = config.headers || {};
                config.json ? headers["Content-Type"] = headers["Content-Type"] || "application/json" : config.body && (headers["Content-Type"] = headers["Content-Type"] || "application/x-www-form-urlencoded; charset=utf-8");
                headers.Accept = headers.Accept || "application/json";
                let xhr = new window.XMLHttpRequest;
                xhr.addEventListener("load", (function() {
                    let status = this.status;
                    if (!status) return reject(new Error("Request did not return a response"));
                    let json = JSON.parse(this.responseText);
                    let responseHeaders = {};
                    this.getAllResponseHeaders().split("\n").forEach(line => {
                        let i = line.indexOf(":");
                        responseHeaders[line.slice(0, i).trim()] = line.slice(i + 1).trim();
                    });
                    return resolve({
                        status: status,
                        headers: responseHeaders,
                        json: json
                    });
                }), !1);
                xhr.addEventListener("error", evt => {
                    reject(new Error(`Request to ${config.method.toLowerCase()} ${config.url} failed: ${evt.toString()}`));
                }, !1);
                xhr.open(config.method, config.url, !0);
                if (headers) for (let key in headers) xhr.setRequestHeader(key, headers[key]);
                config.json && !config.body && (config.body = JSON.stringify(config.json));
                config.body && "object" == typeof config.body && (config.body = Object.keys(config.body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(config.body[key])}`).join("&"));
                xhr.send(config.body);
            })).then(res => ({
                status: res.status,
                data: res.json,
                headers: function(name) {
                    return res.headers[name];
                }
            })).catch(err => ({
                status: 0,
                headers: $util.noop,
                error: err.message
            })).then(res => {
                if (res.status >= 400) throw res;
                return res;
            });
            var config;
        },
        saveResponseState: function(res) {
            if (res.headers("x-csrf-jwt")) {
                $meta.headers["x-csrf-jwt"] = res.headers("x-csrf-jwt");
                $meta.csrfJwt = res.headers("x-csrf-jwt");
                $meta.headers["x-csrf-jwt-hash"] = res.headers("x-csrf-jwt-hash");
            }
            if (res.headers("X-cookies")) {
                $meta.headers["x-cookies-hash"] = res.headers("x-cookies-hash");
                $util.extend($meta.headers["x-cookies"], JSON.parse(res.headers("X-cookies") || "{}"));
            }
        },
        handleResponse: function(res, options) {
            let loggerName = "ui_" + options.name;
            let loggerPayload = {
                name: options.name,
                method: options.method,
                uri: options.uri,
                time: options.duration,
                duration: options.duration
            };
            let resultModel = options.resultModel || options.model;
            return $promise.call((function() {
                res.data && resultModel && (resultModel.populate ? resultModel.populate(res.data) : $util.extend(resultModel, res.data));
                if (res && "success" === res.ack && resultModel && resultModel.fetchChildren) return $promise.resolve(resultModel.fetchChildren()).then((function(children) {
                    return $util.extend(resultModel, children);
                }));
            })).then((function() {
                if ("success" === res.ack) {
                    beaver_logger_default.a.info(loggerName + "_success", loggerPayload);
                    return options.success ? options.success instanceof Function ? options.success(res.data) : options.success : res;
                }
                if (!options.failSilently) {
                    if ("contingency" === res.ack) {
                        beaver_logger_default.a.info(loggerName + "_contingency", $util.extend(loggerPayload, {
                            contingency: res.contingency
                        }));
                        if (!res.contingency) throw new $ApiError("expected_contingency_name", {
                            api: options.name
                        });
                        let contingency = new $Contingency(res.contingency, {
                            transient: options.transientError
                        });
                        resultModel && (resultModel.errorData = res.errorData || {});
                        let handler = options.contingencies && (options.contingencies[contingency.message] || options.contingencies.DEFAULT);
                        $util.extend(contingency, res.errorData);
                        if (handler) return handler instanceof Function ? handler(contingency.message, contingency) : handler;
                        throw contingency;
                    }
                    if ("validation" === res.ack) {
                        beaver_logger_default.a.info(loggerName + "_validation", $util.extend(loggerPayload, {
                            validation: res.validation
                        }));
                        if (options.validation) return options.validation(res.validation);
                        throw new $ApiError("validation", {
                            transient: options.transientError
                        });
                    }
                    if ("permission_denied" === res.ack) {
                        beaver_logger_default.a.info(loggerName + "_denied", loggerPayload);
                        throw new $Forbidden(options.uri + ": forbidden", {
                            transient: options.transientError
                        });
                    }
                    beaver_logger_default.a.info(loggerName + "_noack", loggerPayload);
                    throw new $ApiError("noack", {
                        transient: options.transientError
                    });
                }
            }));
        },
        handleErrorResponse: function(err, options) {
            return $promise.run((function() {
                if (options.error) return options.error(err);
                throw err;
            }));
        },
        getURI: function(model, action, relative) {
            let self = this;
            let uri = [];
            uri.push(this.uri.replace(/\/:[\w\.]+\?/g, (function(key) {
                key = (key = key.slice(2)).substring(0, key.length - 1);
                let component = model.get ? model.get(key) : model[key];
                return component ? "/" + component : "";
            })).replace(/:[\w\.]+/g, (function(key) {
                key = key.slice(1);
                let component = model.get ? model.get(key) : model[key];
                if (!component) throw new Error('Property "' + key + '" not found in model for: ' + self.uri);
                return component;
            })));
            action && uri.push(action);
            this.ext && (uri[uri.length - 1] += "." + this.ext);
            uri = "/" + uri.join("/").replace(/\/{2,}/g, "/").replace(/^\//, "");
            relative || (uri = (this.baseURI || $config.urls.baseUrl) + uri);
            return uri;
        },
        buildMeta: function() {
            if (metaBuilder) return metaBuilder();
        },
        buildAPIName: function(options) {
            let apiName = this.uri.replace(/^\/+/, "").replace(/\//g, "_").replace(/\?(.*)/, "").replace(/[^a-zA-Z0-9_]/g, "");
            apiName = options.action ? apiName + "_" + options.action : apiName;
            apiName = "_" === apiName.charAt(0) ? apiName.slice(1) : apiName;
            return apiName;
        }
    });
    $Api.reopenClass({
        clearCache() {
            api_cache = {};
        }
    });
    $Api.registerMetaBuilder = function(builder) {
        metaBuilder = builder;
    };
    $Api.addHeader = function(name, value) {
        standardHeaders[name] = value;
    };
    let $batchApi = new $Api({
        uri: "/api/batch",
        postAttempts: 3
    });
    var lastAccessToken;
    function persistAccessToken(accessToken) {
        return window.paypal.Promise.try((function() {
            if (accessToken !== lastAccessToken) {
                lastAccessToken = accessToken;
                $Api.addHeader("x-paypal-internal-euat", accessToken);
            }
        }));
    }
    function getPersistedAccessToken() {
        return lastAccessToken;
    }
    var UPDATE_CLIENT_CONFIGURATION = Boolean(window.xprops && window.xprops.updateClientConfiguration);
    $Api.addHeader("x-requested-by", "smart-payment-buttons");
    var $checkoutAppDataApi = new $Api({
        uri: "/api/checkout/:id/appData"
    });
    var $checkoutCartApi = new $Api({
        uri: "/api/checkout/:id/cart"
    });
    new $Api({
        uri: "/api/checkout/:id/session"
    });
    var $paymentApi = new $Api({
        uri: "/api/payment/:id"
    });
    var $orderApi = new $Api({
        uri: "/api/order/:id"
    });
    var $localeApi = new $Api({
        uri: "/api/locale"
    });
    var $buttonFundingApi = new $Api({
        uri: "/api/button/funding"
    });
    function getLocale() {
        return $localeApi.retrieve({
            params: {
                ipCountry: $meta.ipcountry,
                localeTestUrlParam: $util.param("locale.test"),
                countryParam: $util.param("country.x"),
                localeParam: $util.param("locale.x")
            }
        }).then((function(res) {
            return res.data;
        }));
    }
    function getPayment(paymentID, token) {
        return $paymentApi.retrieve({
            model: {
                id: paymentID
            },
            params: {
                token: token
            }
        }).then((function(res) {
            if ("success" !== res.ack) throw new Error("Get payment failed");
            return res.data;
        }));
    }
    function executePayment(paymentID, payerID, token, facilitatorAccessToken) {
        return $paymentApi.action("execute", {
            model: {
                id: paymentID
            },
            data: {
                payer_id: payerID,
                token: token,
                facilitatorAccessToken: facilitatorAccessToken
            }
        }).then((function(res) {
            if ("success" !== res.ack) throw new Error("Execute payment failed");
            return res.data;
        }));
    }
    function getOrder(orderID) {
        return $orderApi.retrieve({
            model: {
                id: orderID
            }
        }).then((function(res) {
            if ("success" !== res.ack) throw new Error("Get order failed");
            return res.data;
        }));
    }
    function captureOrder(orderID, facilitatorAccessToken) {
        return $orderApi.action("capture", {
            model: {
                id: orderID
            },
            data: {
                facilitatorAccessToken: facilitatorAccessToken
            }
        }).then((function(res) {
            if ("success" !== res.ack) throw new Error("Capture order failed");
            return res.data;
        }));
    }
    function getCheckoutCart(token) {
        return $checkoutCartApi.retrieve({
            model: {
                id: token
            }
        }).then((function(res) {
            if ("success" !== res.ack) throw new Error("Get payment failed");
            return res.data;
        }));
    }
    function callGraphQL(query, variables) {
        return window.paypal.request({
            url: "/graphql",
            method: "POST",
            json: {
                query: query,
                variables: variables
            },
            headers: {
                "x-app-name": "xo_buttonjs"
            }
        }).then((function(body) {
            var errors = (body.errors || []).filter((function(error) {
                return "ACCOUNT_CANNOT_BE_FETCHED" !== error.message;
            }));
            if (errors.length) {
                var message = errors[0].message || JSON.stringify(errors[0]);
                throw new Error(message);
            }
            return body;
        }));
    }
    var normalizeMap = {};
    function normalizeECToken(id) {
        normalizeMap[id] = normalizeMap[id] || window.paypal.Promise.try((function() {
            return 0 === id.indexOf("PAY-") || 0 === id.indexOf("PAYID-") || 0 === id.indexOf("BA-") ? function(id) {
                return $paymentApi.action("ectoken", {
                    model: {
                        id: id
                    }
                }).then((function(res) {
                    if ("success" !== res.ack) throw new Error("Map payment failed");
                    return res.data.token;
                }));
            }(id) : id;
        }));
        return normalizeMap[id];
    }
    function updateClientConfig(_ref) {
        var _ref$buttonSessionID = _ref.buttonSessionID, buttonSessionID = void 0 === _ref$buttonSessionID ? null : _ref$buttonSessionID, fundingSource = _ref.fundingSource, integrationArtifact = _ref.integrationArtifact, userExperienceFlow = _ref.userExperienceFlow, productFlow = _ref.productFlow;
        return normalizeECToken(_ref.paymentToken).then((function(normalizedToken) {
            return callGraphQL("\n            mutation UpdateClientConfig(\n                $paymentToken : String!,\n                $fundingSource : ButtonFundingSourceType!,\n                $integrationArtifact : IntegrationArtifactType!,\n                $userExperienceFlow : UserExperienceFlowType!,\n                $productFlow : ProductFlowType!,\n                $buttonSessionID : String\n            ) {\n                updateClientConfig(\n                    token: $paymentToken,\n                    fundingSource: $fundingSource,\n                    integrationArtifact: $integrationArtifact,\n                    userExperienceFlow: $userExperienceFlow,\n                    productFlow: $productFlow,\n                    buttonSessionID: $buttonSessionID\n                )\n            }\n        ", {
                paymentToken: normalizedToken,
                fundingSource: fundingSource,
                integrationArtifact: integrationArtifact,
                userExperienceFlow: userExperienceFlow,
                productFlow: productFlow,
                buttonSessionID: buttonSessionID
            });
        }));
    }
    function utils_isPromise(item) {
        try {
            if (!item) return !1;
            if ("undefined" != typeof Promise && item instanceof Promise) return !0;
            if ("undefined" != typeof window && "function" == typeof window.Window && item instanceof window.Window) return !1;
            if ("undefined" != typeof window && "function" == typeof window.constructor && item instanceof window.constructor) return !1;
            var _toString = {}.toString;
            if (_toString) {
                var name = _toString.call(item);
                if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
            }
            if ("function" == typeof item.then) return !0;
        } catch (err) {
            return !1;
        }
        return !1;
    }
    var dispatchedErrors = [];
    var possiblyUnhandledPromiseHandlers = [];
    var activeCount = 0;
    var flushPromise;
    function flushActive() {
        if (!activeCount && flushPromise) {
            var promise = flushPromise;
            flushPromise = null;
            promise.resolve();
        }
    }
    function startActive() {
        activeCount += 1;
    }
    function endActive() {
        activeCount -= 1;
        flushActive();
    }
    var promise_ZalgoPromise = function() {
        function ZalgoPromise(handler) {
            var _this = this;
            this.resolved = void 0;
            this.rejected = void 0;
            this.errorHandled = void 0;
            this.value = void 0;
            this.error = void 0;
            this.handlers = void 0;
            this.dispatching = void 0;
            this.stack = void 0;
            this.resolved = !1;
            this.rejected = !1;
            this.errorHandled = !1;
            this.handlers = [];
            if (handler) {
                var _result;
                var _error;
                var resolved = !1;
                var rejected = !1;
                var isAsync = !1;
                startActive();
                try {
                    handler((function(res) {
                        if (isAsync) _this.resolve(res); else {
                            resolved = !0;
                            _result = res;
                        }
                    }), (function(err) {
                        if (isAsync) _this.reject(err); else {
                            rejected = !0;
                            _error = err;
                        }
                    }));
                } catch (err) {
                    endActive();
                    this.reject(err);
                    return;
                }
                endActive();
                isAsync = !0;
                resolved ? this.resolve(_result) : rejected && this.reject(_error);
            }
        }
        var _proto = ZalgoPromise.prototype;
        _proto.resolve = function(result) {
            if (this.resolved || this.rejected) return this;
            if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
            this.resolved = !0;
            this.value = result;
            this.dispatch();
            return this;
        };
        _proto.reject = function(error) {
            var _this2 = this;
            if (this.resolved || this.rejected) return this;
            if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
            if (!error) {
                var _err = error && "function" == typeof error.toString ? error.toString() : {}.toString.call(error);
                error = new Error("Expected reject to be called with Error, got " + _err);
            }
            this.rejected = !0;
            this.error = error;
            this.errorHandled || setTimeout((function() {
                _this2.errorHandled || function(err, promise) {
                    if (-1 === dispatchedErrors.indexOf(err)) {
                        dispatchedErrors.push(err);
                        setTimeout((function() {
                            throw err;
                        }), 1);
                        for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                    }
                }(error, _this2);
            }), 1);
            this.dispatch();
            return this;
        };
        _proto.asyncReject = function(error) {
            this.errorHandled = !0;
            this.reject(error);
            return this;
        };
        _proto.dispatch = function() {
            var resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
            if (!this.dispatching && (resolved || rejected)) {
                this.dispatching = !0;
                startActive();
                var chain = function(firstPromise, secondPromise) {
                    return firstPromise.then((function(res) {
                        secondPromise.resolve(res);
                    }), (function(err) {
                        secondPromise.reject(err);
                    }));
                };
                for (var i = 0; i < handlers.length; i++) {
                    var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise;
                    var _result2 = void 0;
                    if (resolved) try {
                        _result2 = onSuccess ? onSuccess(this.value) : this.value;
                    } catch (err) {
                        promise.reject(err);
                        continue;
                    } else if (rejected) {
                        if (!onError) {
                            promise.reject(this.error);
                            continue;
                        }
                        try {
                            _result2 = onError(this.error);
                        } catch (err) {
                            promise.reject(err);
                            continue;
                        }
                    }
                    if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
                        var promiseResult = _result2;
                        promiseResult.resolved ? promise.resolve(promiseResult.value) : promise.reject(promiseResult.error);
                        promiseResult.errorHandled = !0;
                    } else utils_isPromise(_result2) ? _result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected) ? _result2.resolved ? promise.resolve(_result2.value) : promise.reject(_result2.error) : chain(_result2, promise) : promise.resolve(_result2);
                }
                handlers.length = 0;
                this.dispatching = !1;
                endActive();
            }
        };
        _proto.then = function(onSuccess, onError) {
            if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
            if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
            var promise = new ZalgoPromise;
            this.handlers.push({
                promise: promise,
                onSuccess: onSuccess,
                onError: onError
            });
            this.errorHandled = !0;
            this.dispatch();
            return promise;
        };
        _proto.catch = function(onError) {
            return this.then(void 0, onError);
        };
        _proto.finally = function(onFinally) {
            if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
            return this.then((function(result) {
                return ZalgoPromise.try(onFinally).then((function() {
                    return result;
                }));
            }), (function(err) {
                return ZalgoPromise.try(onFinally).then((function() {
                    throw err;
                }));
            }));
        };
        _proto.timeout = function(time, err) {
            var _this3 = this;
            if (this.resolved || this.rejected) return this;
            var timeout = setTimeout((function() {
                _this3.resolved || _this3.rejected || _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
            }), time);
            return this.then((function(result) {
                clearTimeout(timeout);
                return result;
            }));
        };
        _proto.toPromise = function() {
            if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
            return Promise.resolve(this);
        };
        _proto.lazy = function() {
            this.errorHandled = !0;
            return this;
        };
        ZalgoPromise.resolve = function(value) {
            return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise((function(resolve, reject) {
                return value.then(resolve, reject);
            })) : (new ZalgoPromise).resolve(value);
        };
        ZalgoPromise.reject = function(error) {
            return (new ZalgoPromise).reject(error);
        };
        ZalgoPromise.asyncReject = function(error) {
            return (new ZalgoPromise).asyncReject(error);
        };
        ZalgoPromise.all = function(promises) {
            var promise = new ZalgoPromise;
            var count = promises.length;
            var results = [].slice();
            if (!count) {
                promise.resolve(results);
                return promise;
            }
            var chain = function(i, firstPromise, secondPromise) {
                return firstPromise.then((function(res) {
                    results[i] = res;
                    0 == (count -= 1) && promise.resolve(results);
                }), (function(err) {
                    secondPromise.reject(err);
                }));
            };
            for (var i = 0; i < promises.length; i++) {
                var prom = promises[i];
                if (prom instanceof ZalgoPromise) {
                    if (prom.resolved) {
                        results[i] = prom.value;
                        count -= 1;
                        continue;
                    }
                } else if (!utils_isPromise(prom)) {
                    results[i] = prom;
                    count -= 1;
                    continue;
                }
                chain(i, ZalgoPromise.resolve(prom), promise);
            }
            0 === count && promise.resolve(results);
            return promise;
        };
        ZalgoPromise.hash = function(promises) {
            var result = {};
            var awaitPromises = [];
            var _loop = function(key) {
                if (promises.hasOwnProperty(key)) {
                    var value = promises[key];
                    utils_isPromise(value) ? awaitPromises.push(value.then((function(res) {
                        result[key] = res;
                    }))) : result[key] = value;
                }
            };
            for (var key in promises) _loop(key);
            return ZalgoPromise.all(awaitPromises).then((function() {
                return result;
            }));
        };
        ZalgoPromise.map = function(items, method) {
            return ZalgoPromise.all(items.map(method));
        };
        ZalgoPromise.onPossiblyUnhandledException = function(handler) {
            return function(handler) {
                possiblyUnhandledPromiseHandlers.push(handler);
                return {
                    cancel: function() {
                        possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                    }
                };
            }(handler);
        };
        ZalgoPromise.try = function(method, context, args) {
            if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
            var result;
            startActive();
            try {
                result = method.apply(context, args || []);
            } catch (err) {
                endActive();
                return ZalgoPromise.reject(err);
            }
            endActive();
            return ZalgoPromise.resolve(result);
        };
        ZalgoPromise.delay = function(_delay) {
            return new ZalgoPromise((function(resolve) {
                setTimeout(resolve, _delay);
            }));
        };
        ZalgoPromise.isPromise = function(value) {
            return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
        };
        ZalgoPromise.flush = function() {
            return function(Zalgo) {
                var promise = flushPromise = flushPromise || new Zalgo;
                flushActive();
                return promise;
            }(ZalgoPromise);
        };
        return ZalgoPromise;
    }();
    function getUserAgent() {
        return window.navigator.mockUserAgent || window.navigator.userAgent;
    }
    function isDevice(userAgent) {
        void 0 === userAgent && (userAgent = getUserAgent());
        return !!userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i);
    }
    function isOperaMini(ua) {
        void 0 === ua && (ua = getUserAgent());
        return /Opera Mini/i.test(ua);
    }
    function isAndroid(ua) {
        void 0 === ua && (ua = getUserAgent());
        return /Android/.test(ua);
    }
    function isIos(ua) {
        void 0 === ua && (ua = getUserAgent());
        return /iPhone|iPod|iPad/.test(ua);
    }
    function supportsPopups(ua) {
        void 0 === ua && (ua = getUserAgent());
        return !(function(ua) {
            void 0 === ua && (ua = getUserAgent());
            return !!isIos(ua) && (!!function(ua) {
                void 0 === ua && (ua = getUserAgent());
                return /\bGSA\b/.test(ua);
            }(ua) || /.+AppleWebKit(?!.*Safari)|.*WKWebView/.test(ua));
        }(ua) || function(ua) {
            void 0 === ua && (ua = getUserAgent());
            return !!isAndroid(ua) && /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
        }(ua) || isOperaMini(ua) || function(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /FxiOS/i.test(ua);
        }(ua) || function(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /EdgiOS/i.test(ua);
        }(ua) || function(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /FBAN/.test(ua) || /FBAV/.test(ua);
        }(ua) || function(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /QQBrowser/.test(ua);
        }(ua) || "undefined" != typeof process && process.versions && process.versions.electron || (userAgent = getUserAgent(), 
        /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent)) || !0 === window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches);
        var userAgent;
    }
    function isChrome(ua) {
        void 0 === ua && (ua = getUserAgent());
        return /Chrome|Chromium|CriOS/.test(ua) && !/SamsungBrowser|Silk|EdgA/.test(ua);
    }
    function _setPrototypeOf(o, p) {
        return (_setPrototypeOf = Object.setPrototypeOf || function(o, p) {
            o.__proto__ = p;
            return o;
        })(o, p);
    }
    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
    }
    var IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
    function getActualProtocol(win) {
        void 0 === win && (win = window);
        return win.location.protocol;
    }
    function getProtocol(win) {
        void 0 === win && (win = window);
        if (win.mockDomain) {
            var protocol = win.mockDomain.split("//")[0];
            if (protocol) return protocol;
        }
        return getActualProtocol(win);
    }
    function isAboutProtocol(win) {
        void 0 === win && (win = window);
        return "about:" === getProtocol(win);
    }
    function getParent(win) {
        void 0 === win && (win = window);
        if (win) try {
            if (win.parent && win.parent !== win) return win.parent;
        } catch (err) {}
    }
    function canReadFromWindow(win) {
        try {
            return !0;
        } catch (err) {}
        return !1;
    }
    function getActualDomain(win) {
        void 0 === win && (win = window);
        var location = win.location;
        if (!location) throw new Error("Can not read window location");
        var protocol = getActualProtocol(win);
        if (!protocol) throw new Error("Can not read window protocol");
        if ("file:" === protocol) return "file://";
        if ("about:" === protocol) {
            var parent = getParent(win);
            return parent && canReadFromWindow() ? getActualDomain(parent) : "about://";
        }
        var host = location.host;
        if (!host) throw new Error("Can not read window host");
        return protocol + "//" + host;
    }
    function getDomain(win) {
        void 0 === win && (win = window);
        var domain = getActualDomain(win);
        return domain && win.mockDomain && 0 === win.mockDomain.indexOf("mock:") ? win.mockDomain : domain;
    }
    function isSameDomain(win) {
        if (!function(win) {
            try {
                if (win === window) return !0;
            } catch (err) {}
            try {
                var desc = Object.getOwnPropertyDescriptor(win, "location");
                if (desc && !1 === desc.enumerable) return !1;
            } catch (err) {}
            try {
                if (isAboutProtocol(win) && canReadFromWindow()) return !0;
            } catch (err) {}
            try {
                if (function(win) {
                    void 0 === win && (win = window);
                    return "mock:" === getProtocol(win);
                }(win) && canReadFromWindow()) return !0;
            } catch (err) {}
            try {
                if (getActualDomain(win) === getActualDomain(window)) return !0;
            } catch (err) {}
            return !1;
        }(win)) return !1;
        try {
            if (win === window) return !0;
            if (isAboutProtocol(win) && canReadFromWindow()) return !0;
            if (getDomain(window) === getDomain(win)) return !0;
        } catch (err) {}
        return !1;
    }
    function assertSameDomain(win) {
        if (!isSameDomain(win)) throw new Error("Expected window to be same domain");
        return win;
    }
    function isAncestorParent(parent, child) {
        if (!parent || !child) return !1;
        var childParent = getParent(child);
        return childParent ? childParent === parent : -1 !== function(win) {
            var result = [];
            try {
                for (;win.parent !== win; ) {
                    result.push(win.parent);
                    win = win.parent;
                }
            } catch (err) {}
            return result;
        }(child).indexOf(parent);
    }
    var iframeWindows = [];
    var iframeFrames = [];
    function isWindowClosed(win, allowMock) {
        void 0 === allowMock && (allowMock = !0);
        try {
            if (win === window) return !1;
        } catch (err) {
            return !0;
        }
        try {
            if (!win) return !0;
        } catch (err) {
            return !0;
        }
        try {
            if (win.closed) return !0;
        } catch (err) {
            return !err || err.message !== IE_WIN_ACCESS_ERROR;
        }
        if (allowMock && isSameDomain(win)) try {
            if (win.mockclosed) return !0;
        } catch (err) {}
        try {
            if (!win.parent || !win.top) return !0;
        } catch (err) {}
        var iframeIndex = function(collection, item) {
            for (var i = 0; i < collection.length; i++) try {
                if (collection[i] === item) return i;
            } catch (err) {}
            return -1;
        }(iframeWindows, win);
        if (-1 !== iframeIndex) {
            var frame = iframeFrames[iframeIndex];
            if (frame && function(frame) {
                if (!frame.contentWindow) return !0;
                if (!frame.parentNode) return !0;
                var doc = frame.ownerDocument;
                if (doc && doc.documentElement && !doc.documentElement.contains(frame)) {
                    var parent = frame;
                    for (;parent.parentNode && parent.parentNode !== parent; ) parent = parent.parentNode;
                    if (!parent.host || !doc.documentElement.contains(parent.host)) return !0;
                }
                return !1;
            }(frame)) return !0;
        }
        return !1;
    }
    function onCloseWindow(win, callback, delay, maxtime) {
        void 0 === delay && (delay = 1e3);
        void 0 === maxtime && (maxtime = 1 / 0);
        var timeout;
        !function check() {
            if (isWindowClosed(win)) {
                timeout && clearTimeout(timeout);
                return callback();
            }
            if (maxtime <= 0) clearTimeout(timeout); else {
                maxtime -= delay;
                timeout = setTimeout(check, delay);
            }
        }();
        return {
            cancel: function() {
                timeout && clearTimeout(timeout);
            }
        };
    }
    function isWindow(obj) {
        try {
            if (obj === window) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if ("[object Window]" === {}.toString.call(obj)) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (window.Window && obj instanceof window.Window) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (obj && obj.self === obj) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (obj && obj.parent === obj) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (obj && obj.top === obj) return !0;
        } catch (err) {
            if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
        }
        try {
            if (obj && "__unlikely_value__" === obj.__cross_domain_utils_window_check__) return !1;
        } catch (err) {
            return !0;
        }
        try {
            if ("postMessage" in obj && "self" in obj && "location" in obj) return !0;
        } catch (err) {}
        return !1;
    }
    function util_safeIndexOf(collection, item) {
        for (var i = 0; i < collection.length; i++) try {
            if (collection[i] === item) return i;
        } catch (err) {}
        return -1;
    }
    var weakmap_CrossDomainSafeWeakMap = function() {
        function CrossDomainSafeWeakMap() {
            this.name = void 0;
            this.weakmap = void 0;
            this.keys = void 0;
            this.values = void 0;
            this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__";
            if (function() {
                if ("undefined" == typeof WeakMap) return !1;
                if (void 0 === Object.freeze) return !1;
                try {
                    var testWeakMap = new WeakMap;
                    var testKey = {};
                    Object.freeze(testKey);
                    testWeakMap.set(testKey, "__testvalue__");
                    return "__testvalue__" === testWeakMap.get(testKey);
                } catch (err) {
                    return !1;
                }
            }()) try {
                this.weakmap = new WeakMap;
            } catch (err) {}
            this.keys = [];
            this.values = [];
        }
        var _proto = CrossDomainSafeWeakMap.prototype;
        _proto._cleanupClosedWindows = function() {
            var weakmap = this.weakmap;
            var keys = this.keys;
            for (var i = 0; i < keys.length; i++) {
                var value = keys[i];
                if (isWindow(value) && isWindowClosed(value)) {
                    if (weakmap) try {
                        weakmap.delete(value);
                    } catch (err) {}
                    keys.splice(i, 1);
                    this.values.splice(i, 1);
                    i -= 1;
                }
            }
        };
        _proto.isSafeToReadWrite = function(key) {
            return !isWindow(key);
        };
        _proto.set = function(key, value) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                weakmap.set(key, value);
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) try {
                var name = this.name;
                var entry = key[name];
                entry && entry[0] === key ? entry[1] = value : Object.defineProperty(key, name, {
                    value: [ key, value ],
                    writable: !0
                });
                return;
            } catch (err) {}
            this._cleanupClosedWindows();
            var keys = this.keys;
            var values = this.values;
            var index = util_safeIndexOf(keys, key);
            if (-1 === index) {
                keys.push(key);
                values.push(value);
            } else values[index] = value;
        };
        _proto.get = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                if (weakmap.has(key)) return weakmap.get(key);
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) try {
                var entry = key[this.name];
                return entry && entry[0] === key ? entry[1] : void 0;
            } catch (err) {}
            this._cleanupClosedWindows();
            var index = util_safeIndexOf(this.keys, key);
            if (-1 !== index) return this.values[index];
        };
        _proto.delete = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                weakmap.delete(key);
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) try {
                var entry = key[this.name];
                entry && entry[0] === key && (entry[0] = entry[1] = void 0);
            } catch (err) {}
            this._cleanupClosedWindows();
            var keys = this.keys;
            var index = util_safeIndexOf(keys, key);
            if (-1 !== index) {
                keys.splice(index, 1);
                this.values.splice(index, 1);
            }
        };
        _proto.has = function(key) {
            if (!key) throw new Error("WeakMap expected key");
            var weakmap = this.weakmap;
            if (weakmap) try {
                if (weakmap.has(key)) return !0;
            } catch (err) {
                delete this.weakmap;
            }
            if (this.isSafeToReadWrite(key)) try {
                var entry = key[this.name];
                return !(!entry || entry[0] !== key);
            } catch (err) {}
            this._cleanupClosedWindows();
            return -1 !== util_safeIndexOf(this.keys, key);
        };
        _proto.getOrSet = function(key, getter) {
            if (this.has(key)) return this.get(key);
            var value = getter();
            this.set(key, value);
            return value;
        };
        return CrossDomainSafeWeakMap;
    }();
    function _getPrototypeOf(o) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        })(o);
    }
    function _isNativeReflectConstruct() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            Date.prototype.toString.call(Reflect.construct(Date, [], (function() {})));
            return !0;
        } catch (e) {
            return !1;
        }
    }
    function construct_construct(Parent, args, Class) {
        return (construct_construct = _isNativeReflectConstruct() ? Reflect.construct : function(Parent, args, Class) {
            var a = [ null ];
            a.push.apply(a, args);
            var instance = new (Function.bind.apply(Parent, a));
            Class && _setPrototypeOf(instance, Class.prototype);
            return instance;
        }).apply(null, arguments);
    }
    function wrapNativeSuper_wrapNativeSuper(Class) {
        var _cache = "function" == typeof Map ? new Map : void 0;
        return (wrapNativeSuper_wrapNativeSuper = function(Class) {
            if (null === Class || !(fn = Class, -1 !== Function.toString.call(fn).indexOf("[native code]"))) return Class;
            var fn;
            if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== _cache) {
                if (_cache.has(Class)) return _cache.get(Class);
                _cache.set(Class, Wrapper);
            }
            function Wrapper() {
                return construct_construct(Class, arguments, _getPrototypeOf(this).constructor);
            }
            Wrapper.prototype = Object.create(Class.prototype, {
                constructor: {
                    value: Wrapper,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            return _setPrototypeOf(Wrapper, Class);
        })(Class);
    }
    function getFunctionName(fn) {
        return fn.name || fn.__name__ || fn.displayName || "anonymous";
    }
    function setFunctionName(fn, name) {
        try {
            delete fn.name;
            fn.name = name;
        } catch (err) {}
        fn.__name__ = fn.displayName = name;
        return fn;
    }
    function base64encode(str) {
        if ("function" == typeof btoa) return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function(m, p1) {
            return String.fromCharCode(parseInt(p1, 16));
        }))).replace(/[=]/g, "");
        if ("undefined" != typeof Buffer) return Buffer.from(str, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
    }
    function uniqueID() {
        var chars = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, (function() {
            return chars.charAt(Math.floor(Math.random() * chars.length));
        })) + "_" + base64encode((new Date).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    }
    function getGlobal() {
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("No global found");
    }
    var objectIDs;
    function serializeArgs(args) {
        try {
            return JSON.stringify([].slice.call(args), (function(subkey, val) {
                return "function" == typeof val ? "memoize[" + function(obj) {
                    objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap;
                    if (null == obj || "object" != typeof obj && "function" != typeof obj) throw new Error("Invalid object");
                    var uid = objectIDs.get(obj);
                    if (!uid) {
                        uid = typeof obj + ":" + uniqueID();
                        objectIDs.set(obj, uid);
                    }
                    return uid;
                }(val) + "]" : function(element) {
                    var passed = !1;
                    try {
                        (element instanceof window.Element || null !== element && "object" == typeof element && 1 === element.nodeType && "object" == typeof element.style && "object" == typeof element.ownerDocument) && (passed = !0);
                    } catch (_) {}
                    return passed;
                }(val) ? {} : val;
            }));
        } catch (err) {
            throw new Error("Arguments not serializable -- can not be used to memoize");
        }
    }
    function getEmptyObject() {
        return {};
    }
    var memoizeGlobalIndex = 0;
    var memoizeGlobalIndexValidFrom = 0;
    function util_memoize(method, options) {
        void 0 === options && (options = {});
        var _options$thisNamespac = options.thisNamespace, thisNamespace = void 0 !== _options$thisNamespac && _options$thisNamespac, cacheTime = options.time;
        var simpleCache;
        var thisCache;
        var memoizeIndex = memoizeGlobalIndex;
        memoizeGlobalIndex += 1;
        var memoizedFunction = function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (memoizeIndex < memoizeGlobalIndexValidFrom) {
                simpleCache = null;
                thisCache = null;
                memoizeIndex = memoizeGlobalIndex;
                memoizeGlobalIndex += 1;
            }
            var cache;
            cache = thisNamespace ? (thisCache = thisCache || new weakmap_CrossDomainSafeWeakMap).getOrSet(this, getEmptyObject) : simpleCache = simpleCache || {};
            var cacheKey;
            try {
                cacheKey = serializeArgs(args);
            } catch (_unused) {
                return method.apply(this, arguments);
            }
            var cacheResult = cache[cacheKey];
            if (cacheResult && cacheTime && Date.now() - cacheResult.time < cacheTime) {
                delete cache[cacheKey];
                cacheResult = null;
            }
            if (cacheResult) return cacheResult.value;
            var time = Date.now();
            var value = method.apply(this, arguments);
            cache[cacheKey] = {
                time: time,
                value: value
            };
            return value;
        };
        memoizedFunction.reset = function() {
            simpleCache = null;
            thisCache = null;
        };
        return setFunctionName(memoizedFunction, (options.name || getFunctionName(method)) + "::memoized");
    }
    util_memoize.clear = function() {
        memoizeGlobalIndexValidFrom = memoizeGlobalIndex;
    };
    function inlineMemoize(method, logic, args) {
        void 0 === args && (args = []);
        var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
        var key = serializeArgs(args);
        return cache.hasOwnProperty(key) ? cache[key] : cache[key] = logic.apply(void 0, args);
    }
    function belter_src_util_noop() {}
    function once(method) {
        var called = !1;
        return setFunctionName((function() {
            if (!called) {
                called = !0;
                return method.apply(this, arguments);
            }
        }), getFunctionName(method) + "::once");
    }
    function stringifyError(err, level) {
        void 0 === level && (level = 1);
        if (level >= 3) return "stringifyError stack overflow";
        try {
            if (!err) return "<unknown error: " + {}.toString.call(err) + ">";
            if ("string" == typeof err) return err;
            if (err instanceof Error) {
                var stack = err && err.stack;
                var message = err && err.message;
                if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                if (stack) return stack;
                if (message) return message;
            }
            return err && err.toString && "function" == typeof err.toString ? err.toString() : {}.toString.call(err);
        } catch (newErr) {
            return "Error while stringifying error: " + stringifyError(newErr, level + 1);
        }
    }
    function stringifyErrorMessage(err) {
        var defaultMessage = "<unknown error: " + {}.toString.call(err) + ">";
        return err ? err instanceof Error ? err.message || defaultMessage : "string" == typeof err.message && err.message || defaultMessage : defaultMessage;
    }
    util_memoize((function(obj) {
        if (Object.values) return Object.values(obj);
        var result = [];
        for (var key in obj) obj.hasOwnProperty(key) && result.push(obj[key]);
        return result;
    }));
    function objFilter(obj, filter) {
        void 0 === filter && (filter = Boolean);
        var result = {};
        for (var key in obj) obj.hasOwnProperty(key) && filter(obj[key], key) && (result[key] = obj[key]);
        return result;
    }
    function arrayFrom(item) {
        return [].slice.call(item);
    }
    var util_ExtendableError = function(_Error) {
        _inheritsLoose(ExtendableError, _Error);
        function ExtendableError(message) {
            var _this6;
            (_this6 = _Error.call(this, message) || this).name = _this6.constructor.name;
            "function" == typeof Error.captureStackTrace ? Error.captureStackTrace(function(self) {
                if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return self;
            }(_this6), _this6.constructor) : _this6.stack = new Error(message).stack;
            return _this6;
        }
        return ExtendableError;
    }(wrapNativeSuper_wrapNativeSuper(Error));
    function isDocumentReady() {
        return Boolean(document.body) && "complete" === document.readyState;
    }
    function isDocumentInteractive() {
        return Boolean(document.body) && "interactive" === document.readyState;
    }
    function urlEncode(str) {
        return encodeURIComponent(str);
    }
    var waitForDocumentReady = util_memoize((function() {
        return new promise_ZalgoPromise((function(resolve) {
            if (isDocumentReady() || isDocumentInteractive()) return resolve();
            var interval = setInterval((function() {
                if (isDocumentReady() || isDocumentInteractive()) {
                    clearInterval(interval);
                    return resolve();
                }
            }), 10);
        }));
    }));
    function parseQuery(queryString) {
        return inlineMemoize(parseQuery, (function() {
            var params = {};
            if (!queryString) return params;
            if (-1 === queryString.indexOf("=")) return params;
            for (var _i2 = 0, _queryString$split2 = queryString.split("&"); _i2 < _queryString$split2.length; _i2++) {
                var pair = _queryString$split2[_i2];
                (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }
            return params;
        }), [ queryString ]);
    }
    function extendQuery(originalQuery, props) {
        void 0 === props && (props = {});
        return props && Object.keys(props).length ? function(obj) {
            void 0 === obj && (obj = {});
            return Object.keys(obj).filter((function(key) {
                return "string" == typeof obj[key] || "boolean" == typeof obj[key];
            })).map((function(key) {
                var val = obj[key];
                if ("string" != typeof val && "boolean" != typeof val) throw new TypeError("Invalid type for query");
                return urlEncode(key) + "=" + urlEncode(val.toString());
            })).join("&");
        }(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
    }
    function extendUrl(url, options) {
        var query = options.query || {};
        var hash = options.hash || {};
        var originalUrl;
        var originalHash;
        var _url$split = url.split("#");
        originalHash = _url$split[1];
        var _originalUrl$split = (originalUrl = _url$split[0]).split("?");
        originalUrl = _originalUrl$split[0];
        var queryString = extendQuery(_originalUrl$split[1], query);
        var hashString = extendQuery(originalHash, hash);
        queryString && (originalUrl = originalUrl + "?" + queryString);
        hashString && (originalUrl = originalUrl + "#" + hashString);
        return originalUrl;
    }
    function getPerformance() {
        return inlineMemoize(getPerformance, (function() {
            var performance = window.performance;
            if (performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1e3 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0) return performance;
        }));
    }
    function dom_isBrowser() {
        return "undefined" != typeof window && void 0 !== window.location;
    }
    function dom_querySelectorAll(selector, doc) {
        void 0 === doc && (doc = window.document);
        return [].slice.call(doc.querySelectorAll(selector));
    }
    function isLocalStorageEnabled() {
        return inlineMemoize(isLocalStorageEnabled, (function() {
            try {
                if ("undefined" == typeof window) return !1;
                if (window.localStorage) {
                    var value = Math.random().toString();
                    window.localStorage.setItem("__test__localStorage__", value);
                    var result = window.localStorage.getItem("__test__localStorage__");
                    window.localStorage.removeItem("__test__localStorage__");
                    if (value === result) return !0;
                }
            } catch (err) {}
            return !1;
        }));
    }
    var dom_PopupOpenError = function(_ExtendableError) {
        _inheritsLoose(PopupOpenError, _ExtendableError);
        function PopupOpenError() {
            return _ExtendableError.apply(this, arguments) || this;
        }
        return PopupOpenError;
    }(util_ExtendableError);
    var currentScript = "undefined" != typeof document ? document.currentScript : null;
    var getCurrentScript = util_memoize((function() {
        if (currentScript) return currentScript;
        if (currentScript = function() {
            try {
                var stack = function() {
                    try {
                        throw new Error("_");
                    } catch (err) {
                        return err.stack || "";
                    }
                }();
                var stackDetails = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(stack);
                var scriptLocation = stackDetails && stackDetails[1];
                if (!scriptLocation) return;
                for (var _i22 = 0, _Array$prototype$slic2 = [].slice.call(document.getElementsByTagName("script")).reverse(); _i22 < _Array$prototype$slic2.length; _i22++) {
                    var script = _Array$prototype$slic2[_i22];
                    if (script.src && script.src === scriptLocation) return script;
                }
            } catch (err) {}
        }()) return currentScript;
        throw new Error("Can not determine current script");
    }));
    var currentUID = uniqueID();
    util_memoize((function() {
        var script;
        try {
            script = getCurrentScript();
        } catch (err) {
            return currentUID;
        }
        var uid = script.getAttribute("data-uid");
        if (uid && "string" == typeof uid) return uid;
        if ((uid = script.getAttribute("data-uid-auto")) && "string" == typeof uid) return uid;
        if (script.src) {
            var hashedString = function(str) {
                var hash = "";
                for (var i = 0; i < str.length; i++) {
                    var total = str[i].charCodeAt(0) * i;
                    str[i + 1] && (total += str[i + 1].charCodeAt(0) * (i - 1));
                    hash += String.fromCharCode(97 + Math.abs(total) % 26);
                }
                return hash;
            }(JSON.stringify({
                src: script.src,
                dataset: script.dataset
            }));
            uid = "uid_" + hashedString.slice(hashedString.length - 30);
        } else uid = uniqueID();
        script.setAttribute("data-uid-auto", uid);
        return uid;
    }));
    function getStorage(_ref) {
        var name = _ref.name, _ref$lifetime = _ref.lifetime, lifetime = void 0 === _ref$lifetime ? 12e5 : _ref$lifetime;
        return inlineMemoize(getStorage, (function() {
            var STORAGE_KEY = "__" + name + "_storage__";
            var newStateID = uniqueID();
            var accessedStorage;
            function getState(handler) {
                var localStorageEnabled = isLocalStorageEnabled();
                var storage;
                accessedStorage && (storage = accessedStorage);
                if (!storage && localStorageEnabled) {
                    var rawStorage = window.localStorage.getItem(STORAGE_KEY);
                    rawStorage && (storage = JSON.parse(rawStorage));
                }
                storage || (storage = getGlobal()[STORAGE_KEY]);
                storage || (storage = {
                    id: newStateID
                });
                storage.id || (storage.id = newStateID);
                accessedStorage = storage;
                var result = handler(storage);
                localStorageEnabled ? window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage)) : getGlobal()[STORAGE_KEY] = storage;
                accessedStorage = null;
                return result;
            }
            function getID() {
                return getState((function(storage) {
                    return storage.id;
                }));
            }
            function getSession(handler) {
                return getState((function(storage) {
                    var session = storage.__session__;
                    var now = Date.now();
                    session && now - session.created > lifetime && (session = null);
                    session || (session = {
                        guid: uniqueID(),
                        created: now
                    });
                    storage.__session__ = session;
                    return handler(session);
                }));
            }
            return {
                getState: getState,
                getID: getID,
                isStateFresh: function() {
                    return getID() === newStateID;
                },
                getSessionState: function(handler) {
                    return getSession((function(session) {
                        session.state = session.state || {};
                        return handler(session.state);
                    }));
                },
                getSessionID: function() {
                    return getSession((function(session) {
                        return session.guid;
                    }));
                }
            };
        }), [ {
            name: name,
            lifetime: lifetime
        } ]);
    }
    function getBelterExperimentStorage() {
        return getStorage({
            name: "belter_experiment"
        });
    }
    function isEventUnique(name) {
        return getBelterExperimentStorage().getSessionState((function(state) {
            state.loggedBeacons = state.loggedBeacons || [];
            if (-1 === state.loggedBeacons.indexOf(name)) {
                state.loggedBeacons.push(name);
                return !0;
            }
            return !1;
        }));
    }
    function getRandomInteger(range) {
        return Math.floor(Math.random() * range);
    }
    var http_headerBuilders = [];
    function http_request(_ref) {
        var url = _ref.url, _ref$method = _ref.method, method = void 0 === _ref$method ? "get" : _ref$method, _ref$headers = _ref.headers, headers = void 0 === _ref$headers ? {} : _ref$headers, json = _ref.json, data = _ref.data, body = _ref.body, _ref$win = _ref.win, win = void 0 === _ref$win ? window : _ref$win, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 0 : _ref$timeout;
        return new promise_ZalgoPromise((function(resolve, reject) {
            if (json && data || json && body || data && json) throw new Error("Only options.json or options.data or options.body should be passed");
            var normalizedHeaders = {};
            for (var _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
                var _key2 = _Object$keys2[_i4];
                normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
            }
            json ? normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/json" : (data || body) && (normalizedHeaders["content-type"] = normalizedHeaders["content-type"] || "application/x-www-form-urlencoded; charset=utf-8");
            normalizedHeaders.accept = normalizedHeaders.accept || "application/json";
            for (var _i6 = 0; _i6 < http_headerBuilders.length; _i6++) {
                var builtHeaders = (0, http_headerBuilders[_i6])();
                for (var _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
                    var _key3 = _Object$keys4[_i8];
                    normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
                }
            }
            var xhr = new win.XMLHttpRequest;
            xhr.addEventListener("load", (function() {
                var responseHeaders = function(rawHeaders) {
                    void 0 === rawHeaders && (rawHeaders = "");
                    var result = {};
                    for (var _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split("\n"); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
                        var _line$split = _rawHeaders$trim$spli2[_i2].split(":"), _key = _line$split[0], values = _line$split.slice(1);
                        result[_key.toLowerCase()] = values.join(":").trim();
                    }
                    return result;
                }(this.getAllResponseHeaders());
                if (!this.status) return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
                var contentType = responseHeaders["content-type"];
                var isJSON = contentType && (0 === contentType.indexOf("application/json") || 0 === contentType.indexOf("text/json"));
                var responseBody = this.responseText;
                try {
                    responseBody = JSON.parse(responseBody);
                } catch (err) {
                    if (isJSON) return reject(new Error("Invalid json: " + this.responseText + "."));
                }
                return resolve({
                    status: this.status,
                    headers: responseHeaders,
                    body: responseBody
                });
            }), !1);
            xhr.addEventListener("error", (function(evt) {
                reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
            }), !1);
            xhr.open(method, url, !0);
            for (var _key4 in normalizedHeaders) normalizedHeaders.hasOwnProperty(_key4) && xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
            json ? body = JSON.stringify(json) : data && (body = Object.keys(data).map((function(key) {
                return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : "");
            })).join("&"));
            xhr.timeout = timeout;
            xhr.ontimeout = function() {
                reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
            };
            xhr.send(body);
        }));
    }
    var _FUNDING_SKIP_LOGIN, _AMPLITUDE_API_KEY;
    var FUNDING_SKIP_LOGIN = ((_FUNDING_SKIP_LOGIN = {}).paypal = "paypal", _FUNDING_SKIP_LOGIN.paylater = "paypal", 
    _FUNDING_SKIP_LOGIN.credit = "paypal", _FUNDING_SKIP_LOGIN);
    var AMPLITUDE_API_KEY = ((_AMPLITUDE_API_KEY = {}).test = "a23fb4dfae56daf7c3212303b53a8527", 
    _AMPLITUDE_API_KEY.local = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.stage = "a23fb4dfae56daf7c3212303b53a8527", 
    _AMPLITUDE_API_KEY.sandbox = "a23fb4dfae56daf7c3212303b53a8527", _AMPLITUDE_API_KEY.production = "ce423f79daba95faeb0694186170605c", 
    _AMPLITUDE_API_KEY);
    var LSAT_UPGRADE_EXCLUDED_MERCHANTS = [ "AQipcJ1uXz50maKgYx49lKUB8MlSOXP573M6cpsFpHqDZOqnopsJpfYY7bQC_9CtQJsEhGlk8HLs2oZz", "Aco-yrRKihknb5vDBbDOdtYywjYMEPaM7mQg6kev8VDAz01lLA88J4oAUnF4UV9F_InqkqX7K62_jOjx", "AeAiB9K2rRsTXsFKZt4FMAQ8a6VEu4hijducis3a8NcIjV2J_c5I2H2PYhT3qCOwxT8P4l17skqgBlmg", "AXKrWRqEvxiDoUIZQaD1tFi2QhtmhWve3yTDBi58bxWjieYJ9j73My-yJmM7hP00JvOXu4YD6L2eaI5O", "AfRTnXv_QcuVyalbUxThtgk1xTygygsdevlBUTz36dDgD6XZNHp3Ym99a-mjMaokXyTTiI8VJ9mRgaFB", "AejlsIlg_KjKjmLKqxJqFIAwn3ZP02emx41Z2It4IfirQ-nNgZgzWk1CU-Q1QDbYUXjWoYJZ4dq1S2pK", "AQXD7-m_2yMo-5AxJ1fQaPeEWYDE7NZ9XrLzEXeiPLTHDu9vfe_T0foF8BoX8K5cMfXuRDysUEmhw-8Z" ];
    var AUTO_FLUSH_LEVEL = [ "warn", "error" ];
    var LOG_LEVEL_PRIORITY = [ "error", "warn", "info", "debug" ];
    var util_sendBeacon = function(_ref2) {
        var _ref2$win = _ref2.win, win = void 0 === _ref2$win ? window : _ref2$win, url = _ref2.url, data = _ref2.data, _ref2$useBlob = _ref2.useBlob, useBlob = void 0 === _ref2$useBlob || _ref2$useBlob;
        try {
            var json = JSON.stringify(data);
            if (!win.navigator.sendBeacon) throw new Error("No sendBeacon available");
            if (useBlob) {
                var blob = new Blob([ json ], {
                    type: "application/json"
                });
                return win.navigator.sendBeacon(url, blob);
            }
            return win.navigator.sendBeacon(url, json);
        } catch (e) {
            return !1;
        }
    };
    var extendIfDefined = function(target, source) {
        for (var key in source) source.hasOwnProperty(key) && (target[key] = source[key]);
    };
    function getLogger() {
        return inlineMemoize(getLogger, (function() {
            return function(_ref) {
                var url = _ref.url, prefix = _ref.prefix, _ref$logLevel = _ref.logLevel, logLevel = void 0 === _ref$logLevel ? "warn" : _ref$logLevel, _ref$transport = _ref.transport, transport = void 0 === _ref$transport ? function(httpWin) {
                    void 0 === httpWin && (httpWin = window);
                    var win = isSameDomain(httpWin) ? assertSameDomain(httpWin) : window;
                    return function(_ref) {
                        var url = _ref.url, method = _ref.method, headers = _ref.headers, json = _ref.json, _ref$enableSendBeacon = _ref.enableSendBeacon, enableSendBeacon = void 0 !== _ref$enableSendBeacon && _ref$enableSendBeacon;
                        return promise_ZalgoPromise.try((function() {
                            var beaconResult = !1;
                            (function(_ref) {
                                var headers = _ref.headers, enableSendBeacon = _ref.enableSendBeacon;
                                var hasHeaders = headers && Object.keys(headers).length;
                                return !!(window && window.navigator.sendBeacon && !hasHeaders && enableSendBeacon && window.Blob);
                            })({
                                headers: headers,
                                enableSendBeacon: enableSendBeacon
                            }) && (beaconResult = function(url) {
                                return "https://api2.amplitude.com/2/httpapi" === url;
                            }(url) ? util_sendBeacon({
                                win: win,
                                url: url,
                                data: json,
                                useBlob: !1
                            }) : util_sendBeacon({
                                win: win,
                                url: url,
                                data: json,
                                useBlob: !0
                            }));
                            return beaconResult || http_request({
                                win: win,
                                url: url,
                                method: method,
                                headers: headers,
                                json: json
                            });
                        })).then(belter_src_util_noop);
                    };
                }() : _ref$transport, amplitudeApiKey = _ref.amplitudeApiKey, _ref$flushInterval = _ref.flushInterval, flushInterval = void 0 === _ref$flushInterval ? 6e4 : _ref$flushInterval, _ref$enableSendBeacon = _ref.enableSendBeacon, enableSendBeacon = void 0 !== _ref$enableSendBeacon && _ref$enableSendBeacon;
                var events = [];
                var tracking = [];
                var payloadBuilders = [];
                var metaBuilders = [];
                var trackingBuilders = [];
                var headerBuilders = [];
                function print(level, event, payload) {
                    if (dom_isBrowser() && window.console && window.console.log && !(LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(logLevel))) {
                        var args = [ event ];
                        args.push(payload);
                        (payload.error || payload.warning) && args.push("\n\n", payload.error || payload.warning);
                        try {
                            window.console[level] && window.console[level].apply ? window.console[level].apply(window.console, args) : window.console.log && window.console.log.apply && window.console.log.apply(window.console, args);
                        } catch (err) {}
                    }
                }
                function immediateFlush() {
                    return promise_ZalgoPromise.try((function() {
                        if (dom_isBrowser() && "file:" !== window.location.protocol && (events.length || tracking.length)) {
                            var meta = {};
                            for (var _i2 = 0; _i2 < metaBuilders.length; _i2++) extendIfDefined(meta, (0, metaBuilders[_i2])(meta));
                            var headers = {};
                            for (var _i4 = 0; _i4 < headerBuilders.length; _i4++) extendIfDefined(headers, (0, 
                            headerBuilders[_i4])(headers));
                            var res;
                            url && (res = transport({
                                method: "POST",
                                url: url,
                                headers: headers,
                                json: {
                                    events: events,
                                    meta: meta,
                                    tracking: tracking
                                },
                                enableSendBeacon: enableSendBeacon
                            }).catch(belter_src_util_noop));
                            amplitudeApiKey && transport({
                                method: "POST",
                                url: "https://api2.amplitude.com/2/httpapi",
                                headers: {},
                                json: {
                                    api_key: amplitudeApiKey,
                                    events: tracking.map((function(payload) {
                                        return _extends({
                                            event_type: payload.transition_name || "event",
                                            event_properties: payload
                                        }, payload);
                                    }))
                                },
                                enableSendBeacon: enableSendBeacon
                            }).catch(belter_src_util_noop);
                            events = [];
                            tracking = [];
                            return promise_ZalgoPromise.resolve(res).then(belter_src_util_noop);
                        }
                    }));
                }
                var flush = function(method, delay) {
                    void 0 === delay && (delay = 50);
                    var promise;
                    var timeout;
                    return setFunctionName((function() {
                        timeout && clearTimeout(timeout);
                        var localPromise = promise = promise || new promise_ZalgoPromise;
                        timeout = setTimeout((function() {
                            promise = null;
                            timeout = null;
                            promise_ZalgoPromise.try(method).then((function(result) {
                                localPromise.resolve(result);
                            }), (function(err) {
                                localPromise.reject(err);
                            }));
                        }), delay);
                        return localPromise;
                    }), getFunctionName(method) + "::promiseDebounced");
                }(immediateFlush);
                function log(level, event, payload) {
                    void 0 === payload && (payload = {});
                    if (!dom_isBrowser()) return logger;
                    prefix && (event = prefix + "_" + event);
                    var logPayload = _extends({}, objFilter(payload), {
                        timestamp: Date.now().toString()
                    });
                    for (var _i6 = 0; _i6 < payloadBuilders.length; _i6++) extendIfDefined(logPayload, (0, 
                    payloadBuilders[_i6])(logPayload));
                    !function(level, event, payload) {
                        events.push({
                            level: level,
                            event: event,
                            payload: payload
                        });
                        -1 !== AUTO_FLUSH_LEVEL.indexOf(level) && flush();
                    }(level, event, logPayload);
                    print(level, event, logPayload);
                    return logger;
                }
                function addBuilder(builders, builder) {
                    builders.push(builder);
                    return logger;
                }
                dom_isBrowser() && (method = flush, time = flushInterval, function loop() {
                    setTimeout((function() {
                        method();
                        loop();
                    }), time);
                }());
                var method, time;
                if ("object" == typeof window) {
                    window.addEventListener("beforeunload", (function() {
                        immediateFlush();
                    }));
                    window.addEventListener("unload", (function() {
                        immediateFlush();
                    }));
                    window.addEventListener("pagehide", (function() {
                        immediateFlush();
                    }));
                }
                var logger = {
                    debug: function(event, payload) {
                        return log("debug", event, payload);
                    },
                    info: function(event, payload) {
                        return log("info", event, payload);
                    },
                    warn: function(event, payload) {
                        return log("warn", event, payload);
                    },
                    error: function(event, payload) {
                        return log("error", event, payload);
                    },
                    track: function(payload) {
                        void 0 === payload && (payload = {});
                        if (!dom_isBrowser()) return logger;
                        var trackingPayload = objFilter(payload);
                        for (var _i8 = 0; _i8 < trackingBuilders.length; _i8++) extendIfDefined(trackingPayload, (0, 
                        trackingBuilders[_i8])(trackingPayload));
                        print("debug", "track", trackingPayload);
                        tracking.push(trackingPayload);
                        return logger;
                    },
                    flush: flush,
                    immediateFlush: immediateFlush,
                    addPayloadBuilder: function(builder) {
                        return addBuilder(payloadBuilders, builder);
                    },
                    addMetaBuilder: function(builder) {
                        return addBuilder(metaBuilders, builder);
                    },
                    addTrackingBuilder: function(builder) {
                        return addBuilder(trackingBuilders, builder);
                    },
                    addHeaderBuilder: function(builder) {
                        return addBuilder(headerBuilders, builder);
                    },
                    setTransport: function(newTransport) {
                        transport = newTransport;
                        return logger;
                    },
                    configure: function(opts) {
                        opts.url && (url = opts.url);
                        opts.prefix && (prefix = opts.prefix);
                        opts.logLevel && (logLevel = opts.logLevel);
                        opts.transport && (transport = opts.transport);
                        opts.amplitudeApiKey && (amplitudeApiKey = opts.amplitudeApiKey);
                        opts.flushInterval && (flushInterval = opts.flushInterval);
                        opts.enableSendBeacon && (enableSendBeacon = opts.enableSendBeacon);
                        return logger;
                    }
                };
                return logger;
            }({
                url: "/xoplatform/logger/api/logger",
                enableSendBeacon: !0
            });
        }));
    }
    function unresolvedPromise() {
        return new promise_ZalgoPromise(belter_src_util_noop);
    }
    function loadScript(url) {
        return new promise_ZalgoPromise((function(resolve, reject) {
            var container = document.body || document.head;
            if (!container) return reject(new Error("Can not find container for script: " + url));
            var script = document.createElement("script");
            script.setAttribute("src", url);
            script.addEventListener("load", (function() {
                return resolve(script);
            }));
            script.addEventListener("error", (function(err) {
                return reject(err);
            }));
            container.appendChild(script);
        }));
    }
    function isIOSSafari() {
        return isIos() && function(ua) {
            void 0 === ua && (ua = getUserAgent());
            return /Safari/.test(ua) && !isChrome(ua) && !/Silk|FxiOS|EdgiOS/.test(ua);
        }();
    }
    function isAndroidChrome() {
        return isAndroid() && isChrome();
    }
    function getNonce() {
        var nonce = "";
        document.body && (nonce = document.body.getAttribute("data-nonce") || "");
        return nonce;
    }
    function getSDKStorage() {
        return getStorage({
            name: "paypal"
        });
    }
    function getStorageState(handler) {
        return getSDKStorage().getState(handler);
    }
    function getStorageID() {
        return getSDKStorage().getID();
    }
    function isStorageStateFresh() {
        return getSDKStorage().isStateFresh();
    }
    function callRestAPI(_ref) {
        var _extends2;
        var accessToken = _ref.accessToken, method = _ref.method, url = _ref.url, data = _ref.data, headers = _ref.headers, eventName = _ref.eventName;
        if (!accessToken) throw new Error("No access token passed to " + url);
        var requestHeaders = _extends(((_extends2 = {}).authorization = "Bearer " + accessToken, 
        _extends2["content-type"] = "application/json", _extends2), headers);
        return http_request({
            method: method,
            url: url,
            headers: requestHeaders,
            json: data
        }).then((function(_ref2) {
            var status = _ref2.status, body = _ref2.body, responseHeaders = _ref2.headers;
            if (status >= 300) {
                var error = new Error(url + " returned status " + status + " (Corr ID: " + responseHeaders["paypal-debug-id"] + ").\n\n" + JSON.stringify(body));
                error.response = {
                    status: status,
                    headers: responseHeaders,
                    body: body
                };
                if (429 === status) {
                    var _getLogger$track;
                    getLogger().track(((_getLogger$track = {}).transition_name = "call_rest_api", _getLogger$track.int_error_desc = "Error: " + status + " - " + body, 
                    _getLogger$track.info_msg = "URL: " + url, _getLogger$track));
                }
                getLogger().warn("rest_api_" + eventName + "_error");
                throw error;
            }
            return body;
        }));
    }
    function callSmartAPI(_ref3) {
        var accessToken = _ref3.accessToken, url = _ref3.url, _ref3$method = _ref3.method, method = void 0 === _ref3$method ? "get" : _ref3$method, _ref3$headers = _ref3.headers, reqHeaders = void 0 === _ref3$headers ? {} : _ref3$headers, json = _ref3.json, _ref3$authenticated = _ref3.authenticated, authenticated = void 0 === _ref3$authenticated || _ref3$authenticated, eventName = _ref3.eventName;
        reqHeaders["x-requested-by"] = "smart-payment-buttons";
        if (authenticated && !accessToken) throw new Error("Buyer access token not present - can not call smart api: " + url);
        accessToken && (reqHeaders["x-paypal-internal-euat"] = accessToken);
        return http_request({
            url: url,
            method: method,
            headers: reqHeaders,
            json: json
        }).then((function(_ref4) {
            var status = _ref4.status, body = _ref4.body, headers = _ref4.headers;
            if ("contingency" === body.ack) {
                var err = new Error(body.contingency);
                err.response = {
                    url: url,
                    method: method,
                    headers: reqHeaders,
                    body: body
                };
                err.data = body.data;
                getLogger().warn("smart_api_" + eventName + "_contingency_error");
                throw err;
            }
            if (429 === status) {
                var _getLogger$track2;
                getLogger().track(((_getLogger$track2 = {}).transition_name = "call_rest_api", _getLogger$track2.int_error_desc = "Error: " + status + " - " + body, 
                _getLogger$track2.info_msg = "URL: " + url, _getLogger$track2));
            }
            if (status > 400) {
                getLogger().warn("smart_api_" + eventName + "_status_" + status + "_error");
                throw new Error("Api: " + url + " returned status code: " + status + " (Corr ID: " + headers["paypal-debug-id"] + ")\n\n" + JSON.stringify(body));
            }
            if ("success" !== body.ack) {
                getLogger().warn("smart_api_" + eventName + "_ack_error");
                throw new Error("Api: " + url + " returned ack: " + body.ack + " (Corr ID: " + headers["paypal-debug-id"] + ")\n\n" + JSON.stringify(body));
            }
            return {
                data: body.data,
                headers: headers
            };
        }));
    }
    function api_callGraphQL(_ref5) {
        var name = _ref5.name, _ref5$variables = _ref5.variables, _ref5$headers = _ref5.headers;
        return http_request({
            url: "/graphql?" + name,
            method: "POST",
            json: {
                query: _ref5.query,
                variables: void 0 === _ref5$variables ? {} : _ref5$variables
            },
            headers: _extends({
                "x-app-name": "smart-payment-buttons"
            }, void 0 === _ref5$headers ? {} : _ref5$headers)
        }).then((function(_ref6) {
            var status = _ref6.status, body = _ref6.body;
            var errors = body.errors || [];
            if (errors.length) {
                var message = errors[0].message || JSON.stringify(errors[0]);
                getLogger().warn("graphql_" + name + "_error", {
                    err: message
                });
                throw new Error(message);
            }
            if (200 !== status) {
                getLogger().warn("graphql_" + name + "_status_" + status + "_error");
                throw new Error("/graphql returned status " + status + "\n\n" + JSON.stringify(body));
            }
            return body.data;
        }));
    }
    function getResponseCorrelationID(res) {
        return res.headers["paypal-debug-id"];
    }
    function getErrorResponseCorrelationID(err) {
        var res = null == err ? void 0 : err.response;
        if (res) return getResponseCorrelationID(res);
    }
    function createAccessToken(clientID, _temp) {
        var targetSubject = (void 0 === _temp ? {} : _temp).targetSubject;
        return inlineMemoize(createAccessToken, (function() {
            getLogger().info("rest_api_create_access_token");
            var basicAuth = base64encode((clientID || "") + ":");
            var data = {
                grant_type: "client_credentials"
            };
            targetSubject && (data.target_subject = targetSubject);
            return http_request({
                method: "post",
                url: "/v1/oauth2/token",
                headers: {
                    Authorization: "Basic " + basicAuth
                },
                data: data
            }).then((function(_ref2) {
                var body = _ref2.body;
                if (body && "invalid_client" === body.error) {
                    getLogger().warn("rest_api_v1_oauth2_token_create_error", {
                        err: "invalid client id"
                    });
                    throw new Error("Auth Api invalid client id: " + (clientID || "") + ":\n\n" + JSON.stringify(body, null, 4));
                }
                if (!body || !body.access_token) {
                    getLogger().warn("rest_api_v1_oauth2_token_create_error");
                    throw new Error("Auth Api response error:\n\n" + JSON.stringify(body, null, 4));
                }
                return body.access_token;
            }));
        }), [ clientID, targetSubject ]);
    }
    function getFirebaseSessionToken(sessionUID) {
        return api_callGraphQL({
            name: "GetFireBaseSessionToken",
            query: "\n            query GetFireBaseSessionToken($sessionUID: String!) {\n                firebase {\n                    auth(sessionUID: $sessionUID) {\n                        sessionToken\n                    }\n                }\n            }\n        ",
            variables: {
                sessionUID: sessionUID
            }
        }).then((function(res) {
            return res.firebase.auth.sessionToken;
        }));
    }
    var lsatUpgradeCalled = !1;
    var onLsatUpgradeCalled = function() {
        lsatUpgradeCalled = !1;
    };
    var getLsatUpgradeCalled = function() {
        return lsatUpgradeCalled;
    };
    function isProcessorDeclineError(err) {
        var _err$response, _err$response$body, _err$response$body$da, _err$response$body$da2;
        return Boolean(null == err || null == (_err$response = err.response) || null == (_err$response$body = _err$response.body) || null == (_err$response$body$da = _err$response$body.data) || null == (_err$response$body$da2 = _err$response$body$da.details) ? void 0 : _err$response$body$da2.some((function(detail) {
            return "INSTRUMENT_DECLINED" === detail.issue || "PAYER_ACTION_REQUIRED" === detail.issue;
        })));
    }
    util_memoize((function(orderID) {
        var _headers21;
        return api_callGraphQL({
            name: "GetCheckoutDetails",
            query: "\n            query GetCheckoutDetails($orderID: String!) {\n                checkoutSession(token: $orderID) {\n                    cart {\n                        billingType\n                        intent\n                        paymentId\n                        billingToken\n                        amounts {\n                            total {\n                                currencyValue\n                                currencyCode\n                                currencyFormatSymbolISOCurrency\n                            }\n                        }\n                        supplementary {\n                            initiationIntent\n                        }\n                        category\n                    }\n                    flags {\n                        isChangeShippingAddressAllowed\n                    }\n                    payees {\n                        merchantId\n                        email {\n                            stringValue\n                        }\n                    }\n                }\n            }\n        ",
            variables: {
                orderID: orderID
            },
            headers: (_headers21 = {}, _headers21["paypal-client-context"] = orderID, _headers21)
        });
    }));
    var loadFirebaseSDK = util_memoize((function(config) {
        return promise_ZalgoPromise.try((function() {
            if (!window.firebase || !window.firebase.auth || !window.firebase.database) return loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-app.js").then((function() {
                return promise_ZalgoPromise.all([ loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js"), loadScript("https://www.paypalobjects.com/checkout/js/lib/firebase-database.js") ]);
            }));
        })).then((function() {
            var firebase = window.firebase;
            if (!firebase) throw new Error("Firebase failed to load");
            firebase.initializeApp(config);
            return firebase;
        }));
    }));
    var _FRAUDNET_URL;
    var FRAUDNET_URL = ((_FRAUDNET_URL = {}).local = "https://www.stage2d0107.stage.paypal.com/FDRegression/fb.js", 
    _FRAUDNET_URL.stage = "https://www.stage2d0107.stage.paypal.com/FDRegression/fb.js", 
    _FRAUDNET_URL.sandbox = "https://c.paypal.com/da/r/fb.js", _FRAUDNET_URL.production = "https://c.paypal.com/da/r/fb.js", 
    _FRAUDNET_URL.test = "https://c.paypal.com/da/r/fb.js", _FRAUDNET_URL);
    var loadFraudnet = util_memoize((function(_ref) {
        var env = _ref.env, clientMetadataID = _ref.clientMetadataID, cspNonce = _ref.cspNonce, _ref$timeout = _ref.timeout, timeout = void 0 === _ref$timeout ? 1e3 : _ref$timeout;
        return new promise_ZalgoPromise((function(resolve) {
            var config = {
                f: clientMetadataID,
                s: "SMART_PAYMENT_BUTTONS",
                cb1: "fnCallback"
            };
            "sandbox" === env && (config.sandbox = !0);
            var configScript = document.createElement("script");
            configScript.setAttribute("nonce", cspNonce || "");
            configScript.setAttribute("type", "application/json");
            configScript.setAttribute("id", "fconfig");
            configScript.setAttribute("fncls", "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99");
            configScript.textContent = JSON.stringify(config);
            var fraudnetScript = document.createElement("script");
            fraudnetScript.setAttribute("nonce", cspNonce || "");
            fraudnetScript.setAttribute("src", FRAUDNET_URL[env]);
            fraudnetScript.addEventListener("error", (function() {
                return resolve();
            }));
            window.fnCallback = resolve;
            setTimeout(resolve, timeout);
            var body = function() {
                var body = document.body;
                if (!body) throw new Error("Document body not found");
                return body;
            }();
            body.appendChild(configScript);
            body.appendChild(fraudnetScript);
        }));
    }));
    var getSmartWallet = util_memoize((function(_ref) {
        var _headers;
        var _ref$amount = _ref.amount, _ref$vetted = _ref.vetted;
        return api_callGraphQL({
            name: "GetSmartWallet",
            query: "\n            query GetSmartWallet(\n                $clientID: String!\n                $merchantID: [String!]\n                $currency: String\n                $amount: String\n                $userIDToken: String\n                $vetted: Boolean\n                $paymentMethodToken: String\n                $branded: Boolean\n            ) {\n                smartWallet(\n                    clientId: $clientID\n                    merchantId: $merchantID\n                    currency: $currency\n                    amount: $amount\n                    userIdToken: $userIDToken\n                    vetted: $vetted\n                    paymentMethodNonce: $paymentMethodToken\n                    branded: $branded\n                ) {\n                    paypal {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                            accessToken\n                        }\n                    }\n                    credit {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                            accessToken\n                        }\n                    }\n                    card {\n                        instruments {\n                            type\n                            label\n                            logoUrl\n                            instrumentID\n                            tokenID\n                            vendor\n                            oneClick\n                        }\n                    }\n                }\n            }\n        ",
            variables: {
                clientID: _ref.clientID,
                merchantID: _ref.merchantID,
                currency: _ref.currency,
                amount: void 0 === _ref$amount ? "0.00" : _ref$amount,
                userIDToken: _ref.userIDToken,
                vetted: void 0 === _ref$vetted || _ref$vetted,
                paymentMethodToken: _ref.paymentMethodToken,
                branded: _ref.branded
            },
            headers: (_headers = {}, _headers["paypal-client-metadata-id"] = _ref.clientMetadataID, 
            _headers)
        }).then((function(_ref2) {
            return _ref2.smartWallet;
        }));
    }));
    function getNativeEligibility(_ref2) {
        var buttonSessionID = _ref2.buttonSessionID, cookies = _ref2.cookies, orderID = _ref2.orderID, enableFunding = _ref2.enableFunding, stickinessID = _ref2.stickinessID, domain = _ref2.domain, _ref2$skipElmo = _ref2.skipElmo, skipElmo = void 0 !== _ref2$skipElmo && _ref2$skipElmo;
        return api_callGraphQL({
            name: "GetNativeEligibility",
            query: "\n            query GetNativeEligibility(\n                $vault : Boolean,\n                $shippingCallbackEnabled : Boolean,\n                $merchantID : String,\n                $clientID : String,\n                $buyerCountry : String,\n                $currency : String,\n                $userAgent : String,\n                $buttonSessionID : String,\n                $cookies : String,\n                $orderID : String,\n                $enableFunding : [String],\n                $stickinessID : String,\n                $domain : String,\n                $skipElmo : Boolean\n            ) {\n                mobileSDKEligibility(\n                    vault: $vault,\n                    shippingCallbackEnabled: $shippingCallbackEnabled,\n                    merchantID: $merchantID,\n                    facilitatorClientID: $clientID,\n                    buyerCountry: $buyerCountry,\n                    currency: $currency,\n                    userAgent: $userAgent,\n                    buttonSessionID: $buttonSessionID,\n                    cookies: $cookies,\n                    token: $orderID,\n                    enableFunding: $enableFunding,\n                    stickinessID: $stickinessID,\n                    domain: $domain,\n                    skipElmo: $skipElmo\n                ) {\n                    paypal {\n                        eligibility\n                        ineligibilityReason\n                    }\n                    venmo {\n                        eligibility\n                        ineligibilityReason\n                    }\n                }\n            }\n        ",
            variables: {
                vault: _ref2.vault,
                shippingCallbackEnabled: _ref2.shippingCallbackEnabled,
                merchantID: _ref2.merchantID,
                clientID: _ref2.clientID,
                buyerCountry: _ref2.buyerCountry,
                currency: _ref2.currency,
                userAgent: getUserAgent(),
                buttonSessionID: buttonSessionID,
                cookies: cookies,
                orderID: orderID,
                enableFunding: enableFunding,
                stickinessID: stickinessID,
                domain: domain,
                skipElmo: skipElmo
            }
        }).then((function(gqlResult) {
            if (!gqlResult || !gqlResult.mobileSDKEligibility) throw new Error("GraphQL GetNativeEligibility returned no mobileSDKEligibility object");
            return gqlResult.mobileSDKEligibility;
        }));
    }
    var logger_track = window.paypal && window.paypal.logger && window.paypal.logger.track || noop;
    var logger_error = window.paypal && window.paypal.logger && window.paypal.logger.error || noop;
    var logger_info = window.paypal && window.paypal.logger && window.paypal.logger.info || noop;
    var logger_flush = window.paypal && window.paypal.logger && window.paypal.logger.flush || noop;
    var lightboxEligibilityTimeout;
    var lastFacilitatorAccessToken;
    function getPersistedFacilitatorAccessToken() {
        return lastFacilitatorAccessToken;
    }
    function buildPatchActions(data) {
        var facilitatorAccessToken = getPersistedFacilitatorAccessToken();
        var handlePatchError = function() {
            throw new Error("Payment could not be patched, error occured in API call.");
        };
        return {
            paymentPatch: function(patch) {
                var paymentID = data.paymentID;
                if (!paymentID) throw new Error("Client side patch is only available for REST based transactions");
                logger_info("patch_payment_facilitator_access_token_" + (facilitatorAccessToken ? "present" : "not_present"), {
                    paymentID: paymentID
                });
                return function(paymentID, patch, token, facilitatorAccessToken) {
                    return $paymentApi.action("patch", {
                        model: {
                            id: paymentID
                        },
                        data: {
                            patch: patch,
                            token: token,
                            facilitatorAccessToken: facilitatorAccessToken
                        }
                    }).then((function(res) {
                        if ("success" !== res.ack) throw new Error("Patch payment failed");
                        return res.data;
                    }));
                }(paymentID, patch, data.orderID, facilitatorAccessToken).catch(handlePatchError);
            },
            orderPatch: function(patch) {
                var orderID = data.orderID;
                if (!orderID) throw new Error("Client side patch is only available for REST based transactions");
                logger_info("patch_order_facilitator_access_token_" + (facilitatorAccessToken ? "present" : "not_present"), {
                    orderID: orderID
                });
                return function(orderID, patch, facilitatorAccessToken) {
                    return $orderApi.action("patch", {
                        model: {
                            id: orderID
                        },
                        data: {
                            patch: patch,
                            facilitatorAccessToken: facilitatorAccessToken
                        }
                    }).then((function(res) {
                        if ("success" !== res.ack) throw new Error("Patch order failed");
                        return res.data;
                    }));
                }(orderID, patch, facilitatorAccessToken).catch(handlePatchError);
            }
        };
    }
    function buildCheckoutProps(props) {
        var memoizedPayment = memoize(props.payment || function() {
            return window.xprops.payment({
                button_version: "4.0.47"
            });
        });
        var payment = function() {
            return memoizedPayment().then(normalizeECToken);
        };
        var builtProps = _extends({
            payment: payment,
            locale: window.xprops.locale,
            commit: window.xprops.commit,
            onError: window.xprops.onError,
            onAuthorize: function(data, actions) {
                var _this = this;
                void 0 === data && (data = {});
                data.button_version = "4.0.47";
                actions = function(checkout, data, actions, overrides) {
                    var fundingSource = overrides.fundingSource, _overrides$isNative = overrides.isNative, isNative = void 0 !== _overrides$isNative && _overrides$isNative, partnerAttributionID = overrides.partnerAttributionID;
                    var facilitatorAccessToken = getPersistedFacilitatorAccessToken();
                    var restartFlow = function() {
                        return checkout.close().then((function() {
                            !function() {
                                lightboxEligibilityTimeout && clearTimeout(lightboxEligibilityTimeout);
                                lightboxEligibilityTimeout = setTimeout((function() {
                                    window.paypal.Checkout.contexts.lightbox = !1;
                                    window.paypal.Checkout.contexts.iframe = !1;
                                }), 3e5);
                                window.paypal.Checkout.contexts.lightbox = !0;
                                window.paypal.Checkout.contexts.iframe = !0;
                            }();
                            renderCheckout({
                                fundingSource: fundingSource,
                                payment: function() {
                                    return window.paypal.Promise.resolve(data.paymentToken);
                                }
                            });
                            return new window.paypal.Promise(noop);
                        }));
                    };
                    var handleExecuteError = function(err) {
                        return err && "CC_PROCESSOR_DECLINED" === err.message || err && "INSTRUMENT_DECLINED" === err.message ? restartFlow() : void 0;
                    };
                    var handleOrderExecuteError = function(err) {
                        handleExecuteError(err);
                        throw new Error("Order could not be executed");
                    };
                    var handlePaymentExecuteError = function(err) {
                        handleExecuteError(err);
                        throw new Error("Payment could not be executed");
                    };
                    var token = data.paymentToken;
                    var paymentGet = memoize((function() {
                        var paymentID = data.paymentID, forceRestAPI = data.forceRestAPI;
                        if (!paymentID) throw new Error("Client side payment get is only available for REST based transactions");
                        var buyerAccessToken = getPersistedAccessToken();
                        logger_info(buyerAccessToken ? "payment_get_buyer_access_token_present" : "payment_get_buyer_access_token_not_present");
                        if ((isNative || forceRestAPI) && facilitatorAccessToken) {
                            logger_info("v4_using_smart_get_payment", {
                                paymentID: paymentID,
                                token: token
                            });
                            return function(paymentID, _ref4) {
                                var _headers2;
                                return callRestAPI({
                                    accessToken: _ref4.facilitatorAccessToken,
                                    eventName: "v1_payments_payment_get",
                                    url: "/v1/payments/payment/" + paymentID,
                                    headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = _ref4.partnerAttributionID || "", 
                                    _headers2)
                                });
                            }(paymentID, {
                                facilitatorAccessToken: facilitatorAccessToken,
                                buyerAccessToken: buyerAccessToken,
                                partnerAttributionID: partnerAttributionID
                            });
                        }
                        return getPayment(paymentID, token);
                    }));
                    var paymentExecute = memoize((function() {
                        var paymentID = data.paymentID, payerID = data.payerID, forceRestAPI = data.forceRestAPI;
                        if (!paymentID) throw new Error("Client side payment execute is only available for REST based transactions");
                        checkout.closeComponent();
                        var buyerAccessToken = getPersistedAccessToken();
                        logger_info(buyerAccessToken ? "payment_execute_buyer_access_token_present" : "payment_execute_buyer_access_token_not_present");
                        if ((forceRestAPI || isNative) && facilitatorAccessToken && !buyerAccessToken) {
                            if (!payerID) throw new Error("payerID is required");
                            logger_info("v4_using_smart_execute_payment", {
                                paymentID: paymentID,
                                token: token,
                                buyerAccessTokenPresent: Boolean(buyerAccessToken)
                            });
                            return function(paymentID, payerID, _ref5) {
                                var _headers3;
                                return callRestAPI({
                                    accessToken: _ref5.facilitatorAccessToken,
                                    method: "post",
                                    eventName: "v1_payments_payment_execute",
                                    url: "/v1/payments/payment/" + paymentID + "/execute",
                                    headers: (_headers3 = {}, _headers3["paypal-partner-attribution-id"] = _ref5.partnerAttributionID || "", 
                                    _headers3),
                                    data: {
                                        payer_id: payerID
                                    }
                                });
                            }(paymentID, payerID, {
                                facilitatorAccessToken: facilitatorAccessToken,
                                partnerAttributionID: partnerAttributionID
                            });
                        }
                        logger_info("execute_payment_facilitator_access_token_" + (facilitatorAccessToken ? "present" : "not_present"), {
                            paymentID: paymentID,
                            token: token
                        });
                        return executePayment(paymentID, payerID, token, facilitatorAccessToken).catch(handlePaymentExecuteError).finally(paymentGet.reset);
                    }));
                    var orderGet = memoize((function() {
                        var orderID = data.orderID, forceRestAPI = data.forceRestAPI;
                        if (!orderID) throw new Error("Client side order get is only available for REST based transactions");
                        var buyerAccessToken = getPersistedAccessToken();
                        logger_info(buyerAccessToken ? "order_get_buyer_access_token_present" : "order_get_buyer_access_token_not_present");
                        return forceRestAPI && facilitatorAccessToken ? function(orderID, _ref2) {
                            var _headers4;
                            var facilitatorAccessToken = _ref2.facilitatorAccessToken, buyerAccessToken = _ref2.buyerAccessToken, partnerAttributionID = _ref2.partnerAttributionID, _ref2$forceRestAPI = _ref2.forceRestAPI, forceRestAPI = void 0 !== _ref2$forceRestAPI && _ref2$forceRestAPI;
                            getLogger().info("get_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                            getLogger().info("get_order_lsat_upgrade_did_not_error", {
                                err: stringifyError(void 0)
                            });
                            if (forceRestAPI) {
                                var _headers2;
                                return callRestAPI({
                                    accessToken: facilitatorAccessToken,
                                    url: "/v2/checkout/orders/" + orderID,
                                    eventName: "v2_checkout_orders_get",
                                    headers: (_headers2 = {}, _headers2["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                    _headers2.prefer = "return=representation", _headers2)
                                }).catch((function(err) {
                                    var _headers3;
                                    var restCorrID = getErrorResponseCorrelationID(err);
                                    getLogger().warn("get_order_call_rest_api_error", {
                                        restCorrID: restCorrID,
                                        orderID: orderID,
                                        err: stringifyError(err)
                                    });
                                    return callSmartAPI({
                                        accessToken: buyerAccessToken,
                                        url: "/smart/api/order/" + orderID,
                                        eventName: "order_get",
                                        headers: (_headers3 = {}, _headers3["paypal-client-context"] = orderID, _headers3)
                                    }).then((function(res) {
                                        var smartCorrID = getResponseCorrelationID(res);
                                        getLogger().info("get_order_smart_fallback_success", {
                                            smartCorrID: smartCorrID,
                                            restCorrID: restCorrID,
                                            orderID: orderID
                                        });
                                        return res.data;
                                    })).catch((function(smartErr) {
                                        var smartCorrID = getErrorResponseCorrelationID(err);
                                        getLogger().error("get_order_smart_fallback_error", {
                                            smartCorrID: smartCorrID,
                                            restCorrID: restCorrID,
                                            orderID: orderID,
                                            err: stringifyError(smartErr)
                                        });
                                        throw smartErr;
                                    }));
                                }));
                            }
                            return callSmartAPI({
                                accessToken: buyerAccessToken,
                                url: "/smart/api/order/" + orderID,
                                eventName: "order_get",
                                headers: (_headers4 = {}, _headers4["paypal-client-context"] = orderID, _headers4)
                            }).then((function(_ref3) {
                                return _ref3.data;
                            }));
                        }(orderID, {
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID,
                            forceRestAPI: forceRestAPI
                        }) : getOrder(data.orderID);
                    }));
                    var orderCapture = memoize((function() {
                        var orderID = data.orderID, forceRestAPI = data.forceRestAPI;
                        if (!orderID) throw new Error("Client side order capture is only available for REST based transactions");
                        checkout.closeComponent();
                        var buyerAccessToken = getPersistedAccessToken();
                        logger_info(buyerAccessToken ? "order_capture_buyer_access_token_present" : "order_capture_buyer_access_token_not_present");
                        if (forceRestAPI && facilitatorAccessToken) return function(orderID, _ref4) {
                            var _headers7;
                            var facilitatorAccessToken = _ref4.facilitatorAccessToken, buyerAccessToken = _ref4.buyerAccessToken, partnerAttributionID = _ref4.partnerAttributionID, _ref4$forceRestAPI = _ref4.forceRestAPI, forceRestAPI = void 0 !== _ref4$forceRestAPI && _ref4$forceRestAPI;
                            getLogger().info("capture_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                            getLogger().info("capture_order_lsat_upgrade_did_not_error", {
                                err: stringifyError(void 0)
                            });
                            if (forceRestAPI) {
                                var _headers5;
                                return callRestAPI({
                                    accessToken: facilitatorAccessToken,
                                    method: "post",
                                    eventName: "v2_checkout_orders_capture",
                                    url: "/v2/checkout/orders/" + orderID + "/capture",
                                    headers: (_headers5 = {}, _headers5["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                    _headers5.prefer = "return=representation", _headers5["paypal-request-id"] = orderID, 
                                    _headers5)
                                }).catch((function(err) {
                                    var _headers6;
                                    var restCorrID = getErrorResponseCorrelationID(err);
                                    getLogger().warn("capture_order_call_rest_api_error", {
                                        restCorrID: restCorrID,
                                        orderID: orderID,
                                        err: stringifyError(err)
                                    });
                                    if (isProcessorDeclineError(err)) throw err;
                                    return callSmartAPI({
                                        accessToken: buyerAccessToken,
                                        method: "post",
                                        eventName: "order_capture",
                                        url: "/smart/api/order/" + orderID + "/capture",
                                        headers: (_headers6 = {}, _headers6["paypal-client-context"] = orderID, _headers6)
                                    }).then((function(res) {
                                        var smartCorrID = getResponseCorrelationID(res);
                                        getLogger().info("capture_order_smart_fallback_success", {
                                            smartCorrID: smartCorrID,
                                            restCorrID: restCorrID,
                                            orderID: orderID
                                        });
                                        return res.data;
                                    })).catch((function(smartErr) {
                                        var smartCorrID = getErrorResponseCorrelationID(err);
                                        getLogger().info("capture_order_smart_fallback_error", {
                                            smartCorrID: smartCorrID,
                                            restCorrID: restCorrID,
                                            orderID: orderID,
                                            err: stringifyError(smartErr)
                                        });
                                        throw smartErr;
                                    }));
                                }));
                            }
                            return callSmartAPI({
                                accessToken: buyerAccessToken,
                                method: "post",
                                eventName: "order_capture",
                                url: "/smart/api/order/" + orderID + "/capture",
                                headers: (_headers7 = {}, _headers7["paypal-client-context"] = orderID, _headers7)
                            }).then((function(_ref5) {
                                return _ref5.data;
                            }));
                        }(orderID, {
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID,
                            forceRestAPI: forceRestAPI
                        });
                        logger_info("capture_order_facilitator_access_token_" + (facilitatorAccessToken ? "present" : "not_present"), {
                            orderID: orderID,
                            token: token
                        });
                        return captureOrder(data.orderID, facilitatorAccessToken).catch(handleOrderExecuteError).finally(orderGet.reset);
                    }));
                    var orderAuthorize = memoize((function() {
                        var orderID = data.orderID, forceRestAPI = data.forceRestAPI;
                        if (!orderID) throw new Error("Client side order capture is only available for REST based transactions");
                        checkout.closeComponent();
                        var buyerAccessToken = getPersistedAccessToken();
                        logger_info(buyerAccessToken ? "order_authorize_buyer_access_token_present" : "order_authorize_buyer_access_token_not_present");
                        if (forceRestAPI && facilitatorAccessToken) return function(orderID, _ref6) {
                            var _headers10;
                            var facilitatorAccessToken = _ref6.facilitatorAccessToken, buyerAccessToken = _ref6.buyerAccessToken, partnerAttributionID = _ref6.partnerAttributionID, _ref6$forceRestAPI = _ref6.forceRestAPI, forceRestAPI = void 0 !== _ref6$forceRestAPI && _ref6$forceRestAPI;
                            getLogger().info("authorize_order_lsat_upgrade_" + (getLsatUpgradeCalled() ? "called" : "not_called"));
                            getLogger().info("authorize_order_lsat_upgrade_did_not_error", {
                                err: stringifyError(void 0)
                            });
                            if (forceRestAPI) {
                                var _headers8;
                                return callRestAPI({
                                    accessToken: facilitatorAccessToken,
                                    method: "post",
                                    eventName: "v2_checkout_orders_authorize",
                                    url: "/v2/checkout/orders/" + orderID + "/authorize",
                                    headers: (_headers8 = {}, _headers8["paypal-partner-attribution-id"] = partnerAttributionID || "", 
                                    _headers8.prefer = "return=representation", _headers8)
                                }).catch((function(err) {
                                    var _headers9;
                                    var restCorrID = getErrorResponseCorrelationID(err);
                                    getLogger().warn("authorize_order_call_rest_api_error", {
                                        restCorrID: restCorrID,
                                        orderID: orderID,
                                        err: stringifyError(err)
                                    });
                                    if (isProcessorDeclineError(err)) throw err;
                                    return callSmartAPI({
                                        accessToken: buyerAccessToken,
                                        method: "post",
                                        eventName: "order_authorize",
                                        url: "/smart/api/order/" + orderID + "/authorize",
                                        headers: (_headers9 = {}, _headers9["paypal-client-context"] = orderID, _headers9)
                                    }).then((function(res) {
                                        var smartCorrID = getResponseCorrelationID(res);
                                        getLogger().info("authorize_order_smart_fallback_success", {
                                            smartCorrID: smartCorrID,
                                            restCorrID: restCorrID,
                                            orderID: orderID
                                        });
                                        return res.data;
                                    })).catch((function(smartErr) {
                                        var smartCorrID = getErrorResponseCorrelationID(err);
                                        getLogger().info("authorize_order_smart_fallback_error", {
                                            smartCorrID: smartCorrID,
                                            restCorrID: restCorrID,
                                            orderID: orderID,
                                            err: stringifyError(smartErr)
                                        });
                                        throw smartErr;
                                    }));
                                }));
                            }
                            getLogger().info("lsat_upgrade_false");
                            return callSmartAPI({
                                accessToken: buyerAccessToken,
                                method: "post",
                                eventName: "order_authorize",
                                url: "/smart/api/order/" + orderID + "/authorize",
                                headers: (_headers10 = {}, _headers10["paypal-client-context"] = orderID, _headers10)
                            }).then((function(_ref7) {
                                return _ref7.data;
                            }));
                        }(orderID, {
                            facilitatorAccessToken: facilitatorAccessToken,
                            buyerAccessToken: buyerAccessToken,
                            partnerAttributionID: partnerAttributionID,
                            forceRestAPI: forceRestAPI
                        });
                        logger_info("authorize_order_facilitator_access_token_" + (facilitatorAccessToken ? "present" : "not_present"), {
                            orderID: orderID,
                            token: token
                        });
                        return function(orderID, facilitatorAccessToken) {
                            return $orderApi.action("authorize", {
                                model: {
                                    id: orderID
                                },
                                data: {
                                    facilitatorAccessToken: facilitatorAccessToken
                                }
                            }).then((function(res) {
                                if ("success" !== res.ack) throw new Error("Authorize order failed");
                                return res.data;
                            }));
                        }(data.orderID, facilitatorAccessToken).catch(handleOrderExecuteError).finally(orderGet.reset);
                    }));
                    var _buildPatchActions = buildPatchActions(data);
                    return _extends({
                        payment: {
                            execute: paymentExecute,
                            patch: _buildPatchActions.paymentPatch,
                            get: paymentGet
                        },
                        order: {
                            capture: orderCapture,
                            authorize: orderAuthorize,
                            patch: _buildPatchActions.orderPatch,
                            get: orderGet
                        },
                        redirect: function(win, url) {
                            return window.paypal.Promise.all([ util_redirect(win || window.top, url || data.returnUrl), actions.close() ]);
                        },
                        restart: restartFlow
                    }, actions);
                }({
                    close: function() {
                        return window.paypal.Promise.try((function() {
                            if (_this && _this.close) return _this.close();
                        }));
                    },
                    closeComponent: function() {
                        return window.paypal.Promise.try((function() {
                            if (_this && _this.closeComponent) return _this.closeComponent();
                        }));
                    }
                }, data, actions, props);
                if (!data.paymentID && !data.billingToken) {
                    var _data$orderID;
                    data.paymentID = null == (_data$orderID = data.orderID) ? void 0 : _data$orderID.replace(/EC-/, "");
                }
                return window.xprops.onAuthorize(data, actions).catch((function(err) {
                    return window.xchild.error(err);
                }));
            },
            onCancel: function(data, actions) {
                return window.paypal.Promise.try((function() {
                    return function(payment) {
                        return payment().then((function(paymentToken) {
                            return window.paypal.Promise.all([ (token = paymentToken, $checkoutAppDataApi.retrieve({
                                model: {
                                    id: token
                                }
                            }).then((function(res) {
                                if ("success" !== res.ack) throw new Error("Get payment failed");
                                return res.data;
                            }))), getCheckoutCart(paymentToken) ]).then((function(_ref) {
                                var appData = _ref[0], cart = _ref[1];
                                return {
                                    paymentToken: paymentToken,
                                    paymentID: appData.payment_id,
                                    intent: cart.payment_action,
                                    billingID: paymentToken,
                                    billingToken: cart.billing && cart.billing.ba_token,
                                    cancelUrl: appData.urls.cancel_url,
                                    button_version: "4.0.47"
                                };
                            }));
                            var token;
                        }));
                    }(payment);
                })).then((function(cancelData) {
                    var cancelActions = function(checkout, data, actions) {
                        return _extends({}, actions, {
                            redirect: function(win, url) {
                                return window.paypal.Promise.all([ util_redirect(win || window.top, url || data.cancelUrl), actions.close() ]).then(noop);
                            }
                        });
                    }(0, cancelData, actions);
                    return window.xprops.onCancel(cancelData, cancelActions);
                })).catch((function(err) {
                    return window.xchild.error(err);
                }));
            },
            onAuth: function(_ref2) {
                var accessToken = _ref2.accessToken;
                logger_info(accessToken ? "onauth_buyer_access_token_present" : "onauth_buyer_access_token_not_present");
                persistAccessToken(accessToken);
            },
            style: {
                overlayColor: window.xprops.style.overlayColor
            }
        }, props);
        window.xprops.onShippingChange && (builtProps = _extends({}, builtProps, {
            onShippingChange: function(data, actions) {
                void 0 === data && (data = {});
                var _buildPatchActions2 = buildPatchActions(data), paymentPatch = _buildPatchActions2.paymentPatch, orderPatch = _buildPatchActions2.orderPatch;
                data.button_version = "4.0.47";
                if (!data.paymentID && !data.billingToken) {
                    var _data$orderID2;
                    data.paymentID = null == (_data$orderID2 = data.orderID) ? void 0 : _data$orderID2.replace(/EC-/, "");
                    data.paymentId = data.paymentID;
                }
                return window.xprops.onShippingChange(data, _extends({}, actions, {
                    order: {
                        patch: orderPatch
                    },
                    payment: {
                        patch: paymentPatch
                    }
                }));
            }
        }));
        return builtProps;
    }
    function renderCheckout(props) {
        var checkoutProps = buildCheckoutProps(props);
        UPDATE_CLIENT_CONFIGURATION && checkoutProps.payment().then((function(paymentToken) {
            updateClientConfig({
                paymentToken: paymentToken,
                fundingSource: checkoutProps.fundingSource,
                integrationArtifact: "JS_V4",
                userExperienceFlow: "INCONTEXT",
                productFlow: "SMART_PAYMENT_BUTTONS"
            });
        }));
        return window.paypal.Checkout.renderTo(window.top, checkoutProps);
    }
    var attachClickEvent_attachClickEventToElement = function(element, fn) {
        element.addEventListener("touchstart", (function() {}));
        element.addEventListener("click", fn);
        element.addEventListener("keypress", (function(event) {
            if (13 === event.keyCode) return fn(event);
        }));
    };
    var _excluded = [ "token" ];
    function renderGoToXoon(params) {
        var paymentToken = params.paymentToken, wasCardDeclined = params.wasCardDeclined;
        var zomboEl = document.getElementById("cardExp");
        if (!zomboEl) throw new Error("Inline Guest div not found");
        zomboEl.innerHTML = "";
        var buttonContent = '\n    <div id="go-to-xoon-error-message"\n        style="\n          font-family: HelveticaNeue-Light,Helvetica Neue Light,helvetica,arial,sans-serif;\n          line-height: 24px;\n          font-size: 18px;\n          color: #000;\n          margin: 10px 0 24px 0;\n          text-align: center;\n        "\n    >' + get_get(window, wasCardDeclined ? "localizationJSON.cardWasDeclined" : "localizationJSON.somethingWentWrong") + '</div>\n    <button id="go-to-xoon"\n      role="button"\n      style="\n          height: 48px;\n          line-height: 48px;\n          border-radius: 4px;\n          -moz-border-radius: 4px;\n          background-color: #0070BA;\n          border-color: #0070BA;\n          color: #fff;\n          font-size: 15px;\n          user-select: none;\n          text-align: center;\n          font-family: Helvetica Neue,HelveticaNeue,helvetica,arial,sans-serif;\n          cursor: pointer;\n          width: 100%;\n      "\n    >' + get_get(window, "localizationJSON.tryAgain", "Try Again") + "</button>\n    ";
        zomboEl.innerHTML = buttonContent;
        var buttons = document.querySelectorAll("#go-to-xoon");
        if (0 === buttons.length) throw new Error("Cannot find the go to guest checkout button");
        attachClickEvent_attachClickEventToElement(buttons[0], (function(event) {
            event.preventDefault();
            event.stopPropagation();
            renderCheckout(_extends({
                fundingSource: "card"
            }, paymentToken ? {
                payment: function() {
                    return window.paypal.Promise.resolve(paymentToken);
                }
            } : {}));
        }));
        return window.paypal.Promise.resolve();
    }
    var buttonsIframeHeight = window.innerHeight;
    var buttonsIframeWidth = window.innerWidth;
    var onEvent_dispatch = function(action) {
        action && window.xprops.dispatch && window.xprops.dispatch(action);
    };
    var onEvent_changeCardTypeTo = function(cardType) {
        if (state_getState().currentCardType !== cardType) {
            state_setState({
                currentCardType: cardType
            });
            Object.keys(CARD_CLASSES).map((function(k) {
                return CARD_CLASSES[k];
            })).forEach((function(type) {
                (cardEl = utils_getCardElementFromCardType(type)) && cardEl.style && (cardEl.style.opacity = "0.1");
                var cardEl;
            }));
            var selectedCardEl = utils_getCardElementFromCardType(cardType);
            enableCard(selectedCardEl);
        }
    };
    var onEvent_zomboResizeActions = function() {
        var parent = window.xchild;
        var BUTTON_HEIGHT = getButtonHeight_getButtonHeight();
        var collapse = function(_temp) {
            var width = (void 0 === _temp ? {
                width: buttonsIframeWidth
            } : _temp).width;
            state_setState({
                isExpanded: !1
            });
            parent.resize(width, buttonsIframeHeight);
        };
        var expand = function(_temp2) {
            var width = (void 0 === _temp2 ? {
                width: buttonsIframeWidth
            } : _temp2).width;
            var state = state_getState();
            state_setState({
                isExpanded: !0
            });
            parent.resize(width, state.contentHeight + (BUTTON_HEIGHT + 35 + 20));
        };
        return {
            collapse: collapse,
            expand: expand,
            toggle: function(dimenssions) {
                void 0 === dimenssions && (dimenssions = {
                    width: buttonsIframeWidth
                });
                var _getState2$isExpanded = state_getState().isExpanded;
                void 0 !== _getState2$isExpanded && _getState2$isExpanded ? collapse(dimenssions) : expand(dimenssions);
            }
        };
    };
    var onEvent_expand = function(dimenssions) {
        var resizeActions = onEvent_zomboResizeActions();
        var container = document.getElementById("paypal-animation-container");
        var BUTTON_HEIGHT = getButtonHeight_getButtonHeight();
        var content = document.getElementById("paypal-animation-content");
        if (content && container) {
            var transitionTop = BUTTON_HEIGHT * (container.querySelectorAll(".paypal-button").length - 1) - 35;
            resizeActions.expand(dimenssions);
            content.style.transform = "translateY(-" + transitionTop + "px)";
            removeClass(container, "paypal-animation-container-expanded");
            addClass(container, "paypal-animation-container-collapsed");
            querySelectorAll(".paypal-button").forEach((function(button) {
                "card" !== button.getAttribute("data-funding-source") && (button.style.opacity = 0);
            }));
        }
    };
    var onEvent_onEvent = function onEvent(event) {
        var _ref3 = event || {}, type = _ref3.type, _ref3$payload = _ref3.payload, payload = void 0 === _ref3$payload ? {} : _ref3$payload;
        if (type) {
            var _ref4 = state_getState() || {}, currentCardType = _ref4.currentCardType, zipCode = _ref4.zipCode;
            if ("ZIP_CODE_CHANGED" !== type) {
                if ("DISPLAY_GO_TO_XOON" === type) return renderGoToXoon({
                    paymentToken: get_get(payload, "paymentToken")
                });
                if ("@BILLING_PAGE/OPEN" === type) {
                    var newPayload = {};
                    null !== payload && "object" == typeof payload && !1 === Array.isArray(payload) && (newPayload = payload);
                    return function(props) {
                        void 0 === props && (props = {});
                        return window.paypal.BillingPage.renderTo(window.top, _extends({
                            locale: window.xprops.locale,
                            commit: window.xprops.commit,
                            on: function(action) {
                                window.xprops.on && window.xprops.on(action);
                            },
                            onError: window.xchild.error
                        }, props), "body").then(noop);
                    }(_extends({}, newPayload, {
                        env: window.paypal.Button.xprops.env,
                        onEvent: onEvent,
                        prefilledZipCode: zipCode || "",
                        cardType: currentCardType
                    }));
                }
                if ("@BILLING_PAGE/SUBMIT" === type) {
                    state_setState({
                        billingAddress: payload
                    });
                    return window.xprops.dispatch({
                        type: type,
                        payload: payload
                    });
                }
                if ("SET_CONTENT_HEIGHT" !== type) if ("CARD_TYPE_CHANGED" !== type) if ("CARD_FORM_COLLAPSE" !== type) if ("CARD_FORM_EXPAND" !== type) if ("CARD_FORM_CLEAR" !== type) if ("BUTTONS_RESET" !== type) {
                    if ("CARD_FORM_RESPONDED_SUCCESS" === type) {
                        onEvent({
                            type: "CARD_FORM_COLLAPSE"
                        });
                        onEvent({
                            type: "CARD_FORM_CLEAR"
                        });
                        onEvent({
                            type: "BUTTONS_RESET"
                        });
                    }
                } else {
                    Object.keys(CARD_CLASSES).map((function(k) {
                        return CARD_CLASSES[k];
                    })).forEach((function(type) {
                        var cardEl = utils_getCardElementFromCardType(type);
                        enableCard(cardEl);
                    }));
                    state_setState({
                        currentCardType: void 0
                    });
                } else setTimeout((function() {
                    onEvent_dispatch(clearFormAction);
                }), 1e3); else onEvent_expand(); else !function(dimenssions) {
                    var resizeActions = onEvent_zomboResizeActions();
                    var container = document.getElementById("paypal-animation-container");
                    var content = document.getElementById("paypal-animation-content");
                    resizeActions.collapse(void 0);
                    if (content) {
                        content.style.transform = "translateY(0px)";
                        addClass(container, "paypal-animation-container-expanded");
                        removeClass(container, "paypal-animation-container-collapsed");
                        querySelectorAll(".paypal-button").forEach((function(button) {
                            "card" !== button.getAttribute("data-funding-source") && (button.style.opacity = 1);
                        }));
                    }
                }(); else {
                    if ("string" != typeof payload && void 0 !== payload) return;
                    onEvent_changeCardTypeTo(payload);
                } else state_setState({
                    contentHeight: payload
                });
            } else state_setState({
                zipCode: payload
            });
        }
    };
    var isZomboCookieEnabled = function() {
        return document.cookie.indexOf("zombo=1") >= 0;
    };
    var inlineGuestEligibility_inlineGuestPXPEnabled = function() {
        var isEnable = !1;
        (get_get(window.pre, "inlineGuest.res.data.treatments") || []).forEach((function(t) {
            "xo_hermesnodeweb_inline_guest_treatment" === t.treatment_name && (isEnable = !0);
        }));
        return isEnable;
    };
    function _renderChildren(children, renderer) {
        var result = [];
        for (var _i2 = 0; _i2 < children.length; _i2++) {
            var renderedChild = children[_i2].render(renderer);
            if (renderedChild) if (Array.isArray(renderedChild)) for (var _i4 = 0; _i4 < renderedChild.length; _i4++) {
                var subchild = renderedChild[_i4];
                subchild && result.push(subchild);
            } else result.push(renderedChild);
        }
        return result;
    }
    var node_ElementNode = function() {
        function ElementNode(name, props, children) {
            this.type = "element";
            this.name = void 0;
            this.props = void 0;
            this.children = void 0;
            this.onRender = void 0;
            this.name = name;
            this.props = props || {};
            this.children = children;
            var onRender = this.props.onRender;
            if ("function" == typeof onRender) {
                this.onRender = onRender;
                delete props.onRender;
            }
        }
        var _proto = ElementNode.prototype;
        _proto.render = function(renderer) {
            var el = renderer(this);
            this.onRender && this.onRender(el);
            return el;
        };
        _proto.renderChildren = function(renderer) {
            return _renderChildren(this.children, renderer);
        };
        return ElementNode;
    }();
    var node_FragmentNode = function() {
        function FragmentNode(children) {
            this.type = "fragment";
            this.children = void 0;
            this.children = children;
        }
        FragmentNode.prototype.render = function(renderer) {
            return _renderChildren(this.children, renderer);
        };
        return FragmentNode;
    }();
    var node_TextNode = function() {
        function TextNode(text) {
            this.type = "text";
            this.text = void 0;
            this.text = text;
        }
        TextNode.prototype.render = function(renderer) {
            return renderer(this);
        };
        return TextNode;
    }();
    var node_ComponentNode = function() {
        function ComponentNode(component, props, children) {
            this.type = "component";
            this.component = void 0;
            this.props = void 0;
            this.children = void 0;
            this.component = component;
            this.props = props || {};
            this.children = children;
            this.props.children = children;
        }
        var _proto4 = ComponentNode.prototype;
        _proto4.renderComponent = function(renderer) {
            var child = function(child) {
                var children = normalizeChildren(Array.isArray(child) ? child : [ child ]);
                return 1 === children.length ? children[0] : children.length > 1 ? new node_FragmentNode(children) : void 0;
            }(this.component(this.props, this.children));
            if (child) return child.render(renderer);
        };
        _proto4.render = function(renderer) {
            return renderer(this);
        };
        _proto4.renderChildren = function(renderer) {
            return _renderChildren(this.children, renderer);
        };
        return ComponentNode;
    }();
    function normalizeChildren(children) {
        var result = [];
        for (var _i6 = 0; _i6 < children.length; _i6++) {
            var child = children[_i6];
            if (child) if ("string" == typeof child || "number" == typeof child) result.push(new node_TextNode(child.toString())); else {
                if ("boolean" == typeof child) continue;
                if (Array.isArray(child)) for (var _i8 = 0, _normalizeChildren2 = normalizeChildren(child); _i8 < _normalizeChildren2.length; _i8++) result.push(_normalizeChildren2[_i8]); else {
                    if (!child || "element" !== child.type && "text" !== child.type && "component" !== child.type) throw new TypeError("Unrecognized node type: " + typeof child);
                    result.push(child);
                }
            }
        }
        return result;
    }
    var _ELEMENT_DEFAULT_XML_, _ATTRIBUTE_DEFAULT_XM, _ADD_CHILDREN;
    var ELEMENT_DEFAULT_XML_NAMESPACE = ((_ELEMENT_DEFAULT_XML_ = {}).svg = "http://www.w3.org/2000/svg", 
    _ELEMENT_DEFAULT_XML_);
    var ATTRIBUTE_DEFAULT_XML_NAMESPACE = ((_ATTRIBUTE_DEFAULT_XM = {})["xlink:href"] = "http://www.w3.org/1999/xlink", 
    _ATTRIBUTE_DEFAULT_XM);
    function createTextElement(doc, node) {
        return doc.createTextNode(node.text);
    }
    function addProps(el, node) {
        var props = node.props;
        for (var _i4 = 0, _Object$keys2 = Object.keys(props); _i4 < _Object$keys2.length; _i4++) {
            var prop = _Object$keys2[_i4];
            var val = props[prop];
            if (null != val && "el" !== prop && "innerHTML" !== prop) if (prop.match(/^on[A-Z][a-z]/) && "function" == typeof val) el.addEventListener(prop.slice(2).toLowerCase(), val); else if ("string" == typeof val || "number" == typeof val) {
                var xmlNamespace = ATTRIBUTE_DEFAULT_XML_NAMESPACE[prop];
                xmlNamespace ? el.setAttributeNS(xmlNamespace, prop, val.toString()) : el.setAttribute(prop, val.toString());
            } else "boolean" == typeof val && !0 === val && el.setAttribute(prop, "");
        }
        "iframe" !== el.tagName.toLowerCase() || props.id || el.setAttribute("id", "jsx-iframe-" + "xxxxxxxxxx".replace(/./g, (function() {
            return "0123456789abcdef".charAt(Math.floor(Math.random() * "0123456789abcdef".length));
        })));
    }
    var ADD_CHILDREN = ((_ADD_CHILDREN = {}).iframe = function(el, node) {
        var firstChild = node.children[0];
        if (1 !== node.children.length || !firstChild || "element" !== firstChild.type || "html" !== firstChild.name) throw new Error("Expected only single html element node as child of iframe element");
        el.addEventListener("load", (function() {
            var win = el.contentWindow;
            if (!win) throw new Error("Expected frame to have contentWindow");
            var doc = win.document;
            var docElement = doc.documentElement;
            for (;docElement.children && docElement.children.length; ) docElement.removeChild(docElement.children[0]);
            var child = firstChild.render(dom({
                doc: doc
            }));
            for (;child.children.length; ) docElement.appendChild(child.children[0]);
        }));
    }, _ADD_CHILDREN.script = function(el, node) {
        var firstChild = node.children[0];
        if (1 !== node.children.length || !firstChild || "text" !== firstChild.type) throw new Error("Expected only single text node as child of script element");
        el.text = firstChild.text;
    }, _ADD_CHILDREN.default = function(el, node, renderer) {
        for (var _i6 = 0, _node$renderChildren2 = node.renderChildren(renderer); _i6 < _node$renderChildren2.length; _i6++) el.appendChild(_node$renderChildren2[_i6]);
    }, _ADD_CHILDREN);
    function addChildren(el, node, doc, renderer) {
        if (node.props.hasOwnProperty("innerHTML")) {
            if (node.children.length) throw new Error("Expected no children to be passed when innerHTML prop is set");
            var html = node.props.innerHTML;
            if ("string" != typeof html) throw new TypeError("innerHTML prop must be string");
            if ("script" === node.name) el.text = html; else {
                el.innerHTML = html;
                !function(el, doc) {
                    void 0 === doc && (doc = window.document);
                    for (var _i2 = 0, _el$querySelectorAll2 = el.querySelectorAll("script"); _i2 < _el$querySelectorAll2.length; _i2++) {
                        var script = _el$querySelectorAll2[_i2];
                        var parentNode = script.parentNode;
                        if (parentNode) {
                            var newScript = doc.createElement("script");
                            newScript.text = script.textContent;
                            parentNode.replaceChild(newScript, script);
                        }
                    }
                }(el, doc);
            }
        } else (ADD_CHILDREN[node.name] || ADD_CHILDREN.default)(el, node, renderer);
    }
    function dom(opts) {
        void 0 === opts && (opts = {});
        var _opts$doc = opts.doc, doc = void 0 === _opts$doc ? document : _opts$doc;
        return function domRenderer(node) {
            if ("component" === node.type) return node.renderComponent(domRenderer);
            if ("text" === node.type) return createTextElement(doc, node);
            if ("element" === node.type) {
                var xmlNamespace = ELEMENT_DEFAULT_XML_NAMESPACE[node.name.toLowerCase()];
                if (xmlNamespace) return function xmlNamespaceDomRenderer(node, xmlNamespace) {
                    if ("component" === node.type) return node.renderComponent((function(childNode) {
                        return xmlNamespaceDomRenderer(childNode, xmlNamespace);
                    }));
                    if ("text" === node.type) return createTextElement(doc, node);
                    if ("element" === node.type) {
                        var el = function(doc, node, xmlNamespace) {
                            return doc.createElementNS(xmlNamespace, node.name);
                        }(doc, node, xmlNamespace);
                        addProps(el, node);
                        addChildren(el, node, doc, (function(childNode) {
                            return xmlNamespaceDomRenderer(childNode, xmlNamespace);
                        }));
                        return el;
                    }
                    throw new TypeError("Unhandleable node");
                }(node, xmlNamespace);
                var el = function(doc, node) {
                    return node.props.el ? node.props.el : doc.createElement(node.name);
                }(doc, node);
                addProps(el, node);
                addChildren(el, node, doc, domRenderer);
                return el;
            }
            throw new TypeError("Unhandleable node");
        };
    }
    function node_renderChildren(children, renderer) {
        var result = [];
        for (var _i2 = 0; _i2 < children.length; _i2++) {
            var renderedChild = children[_i2].render(renderer);
            if (renderedChild) if (Array.isArray(renderedChild)) for (var _i4 = 0; _i4 < renderedChild.length; _i4++) {
                var subchild = renderedChild[_i4];
                subchild && result.push(subchild);
            } else result.push(renderedChild);
        }
        return result;
    }
    var src_node_ElementNode = function() {
        function ElementNode(name, props, children) {
            this.type = "element";
            this.name = void 0;
            this.props = void 0;
            this.children = void 0;
            this.onRender = void 0;
            this.name = name;
            this.props = props || {};
            this.children = children;
            var onRender = this.props.onRender;
            if ("function" == typeof onRender) {
                this.onRender = onRender;
                delete props.onRender;
            }
        }
        var _proto = ElementNode.prototype;
        _proto.render = function(renderer) {
            var el = renderer(this);
            this.onRender && this.onRender(el);
            return el;
        };
        _proto.renderChildren = function(renderer) {
            return node_renderChildren(this.children, renderer);
        };
        return ElementNode;
    }();
    var src_node_FragmentNode = function() {
        function FragmentNode(children) {
            this.type = "fragment";
            this.children = void 0;
            this.children = children;
        }
        FragmentNode.prototype.render = function(renderer) {
            return node_renderChildren(this.children, renderer);
        };
        return FragmentNode;
    }();
    var src_node_TextNode = function() {
        function TextNode(text) {
            this.type = "text";
            this.text = void 0;
            this.text = text;
        }
        TextNode.prototype.render = function(renderer) {
            return renderer(this);
        };
        return TextNode;
    }();
    var src_node_ComponentNode = function() {
        function ComponentNode(component, props, children) {
            this.type = "component";
            this.component = void 0;
            this.props = void 0;
            this.children = void 0;
            this.component = component;
            this.props = props || {};
            this.children = children;
            this.props.children = children;
        }
        var _proto4 = ComponentNode.prototype;
        _proto4.renderComponent = function(renderer) {
            var child = function(child) {
                var children = node_normalizeChildren(Array.isArray(child) ? child : [ child ]);
                return 1 === children.length ? children[0] : children.length > 1 ? new src_node_FragmentNode(children) : void 0;
            }(this.component(this.props, this.children));
            if (child) return child.render(renderer);
        };
        _proto4.render = function(renderer) {
            return renderer(this);
        };
        _proto4.renderChildren = function(renderer) {
            return node_renderChildren(this.children, renderer);
        };
        return ComponentNode;
    }();
    function node_normalizeChildren(children) {
        var result = [];
        for (var _i6 = 0; _i6 < children.length; _i6++) {
            var child = children[_i6];
            if (child) if ("string" == typeof child || "number" == typeof child) result.push(new src_node_TextNode(child.toString())); else {
                if ("boolean" == typeof child) continue;
                if (Array.isArray(child)) for (var _i8 = 0, _normalizeChildren2 = node_normalizeChildren(child); _i8 < _normalizeChildren2.length; _i8++) result.push(_normalizeChildren2[_i8]); else {
                    if (!child || "element" !== child.type && "text" !== child.type && "component" !== child.type) throw new TypeError("Unrecognized node type: " + typeof child);
                    result.push(child);
                }
            }
        }
        return result;
    }
    var src_node_node = function(element, props) {
        for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
        children = node_normalizeChildren(children);
        if ("string" == typeof element) return new src_node_ElementNode(element, props, children);
        if ("function" == typeof element) return new src_node_ComponentNode(element, props, children);
        throw new TypeError("Expected jsx element to be a string or a function");
    };
    var dom_ELEMENT_DEFAULT_XML_, dom_ATTRIBUTE_DEFAULT_XM, dom_ADD_CHILDREN;
    var dom_ELEMENT_DEFAULT_XML_NAMESPACE = ((dom_ELEMENT_DEFAULT_XML_ = {}).svg = "http://www.w3.org/2000/svg", 
    dom_ELEMENT_DEFAULT_XML_);
    var dom_ATTRIBUTE_DEFAULT_XML_NAMESPACE = ((dom_ATTRIBUTE_DEFAULT_XM = {})["xlink:href"] = "http://www.w3.org/1999/xlink", 
    dom_ATTRIBUTE_DEFAULT_XM);
    function dom_createTextElement(doc, node) {
        return doc.createTextNode(node.text);
    }
    function dom_addProps(el, node) {
        var props = node.props;
        for (var _i4 = 0, _Object$keys2 = Object.keys(props); _i4 < _Object$keys2.length; _i4++) {
            var prop = _Object$keys2[_i4];
            var val = props[prop];
            if (null != val && "el" !== prop && "innerHTML" !== prop) if (prop.match(/^on[A-Z][a-z]/) && "function" == typeof val) el.addEventListener(prop.slice(2).toLowerCase(), val); else if ("string" == typeof val || "number" == typeof val) {
                var xmlNamespace = dom_ATTRIBUTE_DEFAULT_XML_NAMESPACE[prop];
                xmlNamespace ? el.setAttributeNS(xmlNamespace, prop, val.toString()) : el.setAttribute(prop, val.toString());
            } else "boolean" == typeof val && !0 === val && el.setAttribute(prop, "");
        }
        "iframe" !== el.tagName.toLowerCase() || props.id || el.setAttribute("id", "jsx-iframe-" + "xxxxxxxxxx".replace(/./g, (function() {
            return "0123456789abcdef".charAt(Math.floor(Math.random() * "0123456789abcdef".length));
        })));
    }
    var renderers_dom_ADD_CHILDREN = ((dom_ADD_CHILDREN = {}).iframe = function(el, node) {
        var firstChild = node.children[0];
        if (1 !== node.children.length || !firstChild || "element" !== firstChild.type || "html" !== firstChild.name) throw new Error("Expected only single html element node as child of iframe element");
        el.addEventListener("load", (function() {
            var win = el.contentWindow;
            if (!win) throw new Error("Expected frame to have contentWindow");
            var doc = win.document;
            var docElement = doc.documentElement;
            for (;docElement.children && docElement.children.length; ) docElement.removeChild(docElement.children[0]);
            var child = firstChild.render(function(opts) {
                void 0 === opts && (opts = {});
                var _opts$doc = opts.doc, doc = void 0 === _opts$doc ? document : _opts$doc;
                return function domRenderer(node) {
                    if ("component" === node.type) return node.renderComponent(domRenderer);
                    if ("text" === node.type) return dom_createTextElement(doc, node);
                    if ("element" === node.type) {
                        var xmlNamespace = dom_ELEMENT_DEFAULT_XML_NAMESPACE[node.name.toLowerCase()];
                        if (xmlNamespace) return function xmlNamespaceDomRenderer(node, xmlNamespace) {
                            if ("component" === node.type) return node.renderComponent((function(childNode) {
                                return xmlNamespaceDomRenderer(childNode, xmlNamespace);
                            }));
                            if ("text" === node.type) return dom_createTextElement(doc, node);
                            if ("element" === node.type) {
                                var el = function(doc, node, xmlNamespace) {
                                    return doc.createElementNS(xmlNamespace, node.name);
                                }(doc, node, xmlNamespace);
                                dom_addProps(el, node);
                                dom_addChildren(el, node, doc, (function(childNode) {
                                    return xmlNamespaceDomRenderer(childNode, xmlNamespace);
                                }));
                                return el;
                            }
                            throw new TypeError("Unhandleable node");
                        }(node, xmlNamespace);
                        var el = function(doc, node) {
                            return node.props.el ? node.props.el : doc.createElement(node.name);
                        }(doc, node);
                        dom_addProps(el, node);
                        dom_addChildren(el, node, doc, domRenderer);
                        return el;
                    }
                    throw new TypeError("Unhandleable node");
                };
            }({
                doc: doc
            }));
            for (;child.children.length; ) docElement.appendChild(child.children[0]);
        }));
    }, dom_ADD_CHILDREN.script = function(el, node) {
        var firstChild = node.children[0];
        if (1 !== node.children.length || !firstChild || "text" !== firstChild.type) throw new Error("Expected only single text node as child of script element");
        el.text = firstChild.text;
    }, dom_ADD_CHILDREN.default = function(el, node, renderer) {
        for (var _i6 = 0, _node$renderChildren2 = node.renderChildren(renderer); _i6 < _node$renderChildren2.length; _i6++) el.appendChild(_node$renderChildren2[_i6]);
    }, dom_ADD_CHILDREN);
    function dom_addChildren(el, node, doc, renderer) {
        if (node.props.hasOwnProperty("innerHTML")) {
            if (node.children.length) throw new Error("Expected no children to be passed when innerHTML prop is set");
            var html = node.props.innerHTML;
            if ("string" != typeof html) throw new TypeError("innerHTML prop must be string");
            if ("script" === node.name) el.text = html; else {
                el.innerHTML = html;
                !function(el, doc) {
                    void 0 === doc && (doc = window.document);
                    for (var _i2 = 0, _el$querySelectorAll2 = el.querySelectorAll("script"); _i2 < _el$querySelectorAll2.length; _i2++) {
                        var script = _el$querySelectorAll2[_i2];
                        var parentNode = script.parentNode;
                        if (parentNode) {
                            var newScript = doc.createElement("script");
                            newScript.text = script.textContent;
                            parentNode.replaceChild(newScript, script);
                        }
                    }
                }(el, doc);
            }
        } else (renderers_dom_ADD_CHILDREN[node.name] || renderers_dom_ADD_CHILDREN.default)(el, node, renderer);
    }
    function Spinner(_ref) {
        return src_node_node("div", {
            class: "preloader spinner"
        }, src_node_node("style", {
            nonce: _ref.nonce,
            innerHTML: "\n\n    body {\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        margin: 0;\n    }\n\n    .spinner {\n        height: 100%;\n        width: 100%;\n        position: absolute;\n        z-index: 10\n    }\n\n    .spinner .spinWrap {\n        width: 200px;\n        height: 100px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-left: -100px;\n        margin-top: -50px\n    }\n\n    .spinner .loader,\n    .spinner .spinnerImage {\n        height: 100px;\n        width: 100px;\n        position: absolute;\n        top: 0;\n        left: 50%;\n        opacity: 1;\n        filter: alpha(opacity=100)\n    }\n\n    .spinner .spinnerImage {\n        margin: 28px 0 0 -25px;\n        background: url(https://www.paypalobjects.com/images/checkout/hermes/icon_ot_spin_lock_skinny.png) no-repeat\n    }\n\n    .spinner .loader {\n        margin: 0 0 0 -55px;\n        background-color: transparent;\n        animation: rotation .7s infinite linear;\n        border-left: 5px solid #cbcbca;\n        border-right: 5px solid #cbcbca;\n        border-bottom: 5px solid #cbcbca;\n        border-top: 5px solid #2380be;\n        border-radius: 100%\n    }\n\n    @keyframes rotation {\n        from {\n            transform: rotate(0deg)\n        }\n        to {\n            transform: rotate(359deg)\n        }\n    }\n"
        }), src_node_node("div", {
            class: "spinWrap"
        }, src_node_node("p", {
            class: "spinnerImage"
        }), src_node_node("p", {
            class: "loader"
        })));
    }
    function SpinnerPage(_ref2, children) {
        var nonce = _ref2.nonce;
        return src_node_node("html", null, src_node_node("head", null, src_node_node("title", null, "PayPal"), src_node_node("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
        })), src_node_node("body", null, src_node_node(Spinner, {
            nonce: nonce
        }), children));
    }
    var checkoutOpen = !1;
    var checkout_checkout_init = function initCheckout(_ref5) {
        var props = _ref5.props, components = _ref5.components, serviceData = _ref5.serviceData, payment = _ref5.payment, config = _ref5.config;
        if (checkoutOpen) throw new Error("Checkout already rendered");
        var Checkout = components.Checkout;
        var sessionID = props.sessionID, buttonSessionID = props.buttonSessionID, _createOrder = props.createOrder, _onApprove = props.onApprove, _onCancel = props.onCancel, onShippingChange = props.onShippingChange, locale = props.locale, commit = props.commit, onError = props.onError, vault = props.vault, clientAccessToken = props.clientAccessToken, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, onClick = props.onClick, amount = props.amount, clientID = props.clientID, connect = props.connect, cmid = props.clientMetadataID, _onAuth = props.onAuth, userIDToken = props.userIDToken, env = props.env, currency = props.currency, enableFunding = props.enableFunding, stickinessID = props.stickinessID, standaloneFundingSource = props.standaloneFundingSource, branded = props.branded;
        var button = payment.button, win = payment.win, fundingSource = payment.fundingSource, card = payment.card, _payment$buyerAccessT = payment.buyerAccessToken, buyerAccessToken = void 0 === _payment$buyerAccessT ? serviceData.buyerAccessToken : _payment$buyerAccessT, venmoPayloadID = payment.venmoPayloadID, buyerIntent = payment.buyerIntent;
        var buyerCountry = serviceData.buyerCountry, sdkMeta = serviceData.sdkMeta, merchantID = serviceData.merchantID;
        var cspNonce = config.cspNonce;
        var context = (_ref4 = {
            win: win,
            isClick: payment.isClick
        }).win || _ref4.isClick && supportsPopups() ? "popup" : "iframe";
        var _ref4;
        var connectEligible = function(_ref3) {
            var fundingSource = _ref3.fundingSource;
            return !(!_ref3.connect || _ref3.vault || "paypal" !== fundingSource && "credit" !== fundingSource || _ref3.createBillingAgreement || _ref3.createSubscription);
        }({
            connect: connect,
            createBillingAgreement: createBillingAgreement,
            createSubscription: createSubscription,
            vault: vault,
            fundingSource: fundingSource
        });
        var approved = !1;
        var doApproveOnClose = !1;
        var forceClosed = !1;
        var instance;
        var close = function() {
            checkoutOpen = !1;
            return promise_ZalgoPromise.try((function() {
                if (instance) {
                    forceClosed = !0;
                    return instance.close();
                }
            }));
        };
        var start = util_memoize((function() {
            return (instance = Checkout({
                window: win,
                sessionID: sessionID,
                buttonSessionID: buttonSessionID,
                stickinessID: stickinessID,
                clientAccessToken: clientAccessToken,
                venmoPayloadID: venmoPayloadID,
                createAuthCode: function() {
                    return promise_ZalgoPromise.try((function() {
                        var fundingSkipLogin = FUNDING_SKIP_LOGIN[fundingSource];
                        if (payment.createAccessToken) return payment.createAccessToken();
                        if (buyerAccessToken) return buyerAccessToken;
                        if (clientID && userIDToken && fundingSkipLogin) {
                            var clientMetadataID = cmid || sessionID;
                            return loadFraudnet({
                                env: env,
                                clientMetadataID: clientMetadataID,
                                cspNonce: cspNonce
                            }).catch(belter_src_util_noop).then((function() {
                                return getSmartWallet({
                                    clientID: clientID,
                                    merchantID: merchantID,
                                    currency: currency,
                                    amount: amount,
                                    clientMetadataID: clientMetadataID,
                                    userIDToken: userIDToken
                                });
                            })).then((function(wallet) {
                                var walletInstruments = wallet[fundingSkipLogin] && wallet[fundingSkipLogin].instruments;
                                if (walletInstruments) for (var _i2 = 0; _i2 < walletInstruments.length; _i2++) {
                                    var instrument = walletInstruments[_i2];
                                    if (instrument.accessToken) return instrument.accessToken;
                                }
                            }));
                        }
                    })).then((function(accessToken) {
                        if (accessToken && ("pay" === buyerIntent || "pay_with_different_funding_shipping" === buyerIntent)) return function(buyerAccessToken) {
                            return api_callGraphQL({
                                name: "ExchangeAuthCode",
                                query: "\n            query ExchangeAuthCode(\n                $buyerAccessToken: String!\n            ) {\n                auth(\n                    accessToken: $buyerAccessToken\n                ) {\n                    authCode\n                }\n            }\n        ",
                                variables: {
                                    buyerAccessToken: buyerAccessToken
                                }
                            }).then((function(_ref4) {
                                return _ref4.auth.authCode;
                            }));
                        }(accessToken);
                    })).catch((function(err) {
                        getLogger().warn("exchange_access_token_auth_code_error", {
                            err: stringifyError(err)
                        });
                    }));
                },
                getConnectURL: connect && connectEligible ? function(_ref6) {
                    var payerID = _ref6.payerID;
                    if (!clientID) throw new Error("Expected clientID");
                    return _createOrder().then((function(orderID) {
                        return function(_ref5) {
                            return api_callGraphQL({
                                name: "GetConnectURL",
                                query: "\n            query GetConnectURL(\n                $clientID: String!\n                $orderID: String!\n                $scopes: [String]!\n                $fundingSource: String\n                $payerID: String\n            ) {\n                auth(\n                    clientId: $clientID\n                ) {\n                    connectUrl(\n                        token: $orderID\n                        scopes: $scopes\n                        fundingSource: $fundingSource\n                        payerId: $payerID\n                    ) {\n                        href\n                    }\n                }\n            }\n        ",
                                variables: {
                                    clientID: _ref5.clientID,
                                    orderID: _ref5.orderID,
                                    payerID: _ref5.payerID,
                                    scopes: _ref5.connect.scopes,
                                    fundingSource: _ref5.fundingSource
                                }
                            }).then((function(_ref6) {
                                return _ref6.auth.connectUrl.href;
                            }));
                        }({
                            orderID: orderID,
                            payerID: payerID,
                            clientID: clientID,
                            fundingSource: fundingSource,
                            connect: connect
                        }).then((function(connectURL) {
                            var _getLogger$info$track;
                            getLogger().info("connect_redirect", {
                                connectURL: connectURL
                            }).track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "process_connect_redirect", 
                            _getLogger$info$track.context_type = "EC-Token", _getLogger$info$track.token = orderID, 
                            _getLogger$info$track.context_id = orderID, _getLogger$info$track)).flush();
                            return extendUrl(connectURL, {
                                query: {
                                    sdkMeta: sdkMeta
                                }
                            });
                        })).catch((function(err) {
                            getLogger().error("connect_redirect_error", {
                                err: stringifyError(err)
                            });
                            throw err;
                        }));
                    }));
                } : null,
                createOrder: function() {
                    return _createOrder().then((function(orderID) {
                        return orderID;
                    }));
                },
                onApprove: function(_ref7) {
                    var _ref7$approveOnClose = _ref7.approveOnClose, payerID = _ref7.payerID, paymentID = _ref7.paymentID, billingToken = _ref7.billingToken, subscriptionID = _ref7.subscriptionID, authCode = _ref7.authCode;
                    if (void 0 === _ref7$approveOnClose || !_ref7$approveOnClose) {
                        approved = !0;
                        getLogger().info("spb_onapprove_access_token_" + (buyerAccessToken ? "present" : "not_present")).flush();
                        return _onApprove({
                            payerID: payerID,
                            paymentID: paymentID,
                            billingToken: billingToken,
                            subscriptionID: subscriptionID,
                            buyerAccessToken: buyerAccessToken,
                            authCode: authCode
                        }, {
                            restart: restart
                        }).finally((function() {
                            return close().then(belter_src_util_noop);
                        })).catch(belter_src_util_noop);
                    }
                    doApproveOnClose = !0;
                },
                onAuth: function(_ref8) {
                    return _onAuth({
                        accessToken: _ref8.accessToken || buyerAccessToken
                    }).then((function(token) {
                        buyerAccessToken = token;
                    }));
                },
                onCancel: function() {
                    return close().then((function() {
                        return _onCancel();
                    }));
                },
                onShippingChange: onShippingChange ? function(data, actions) {
                    return onShippingChange(_extends({
                        buyerAccessToken: buyerAccessToken
                    }, data), actions);
                } : null,
                onClose: function() {
                    checkoutOpen = !1;
                    return doApproveOnClose ? _onApprove({
                        forceRestAPI: !0
                    }, {
                        restart: restart
                    }).catch(belter_src_util_noop) : forceClosed || approved ? void 0 : _onCancel();
                },
                onError: onError,
                fundingSource: fundingSource,
                card: card,
                buyerCountry: buyerCountry,
                locale: locale,
                commit: commit,
                cspNonce: cspNonce,
                clientMetadataID: cmid,
                enableFunding: enableFunding,
                standaloneFundingSource: standaloneFundingSource,
                branded: branded
            })).renderTo((function(win) {
                void 0 === win && (win = window);
                try {
                    if (win.top) return win.top;
                } catch (err) {}
                if (getParent(win) === win) return win;
                try {
                    if (isAncestorParent(window, win) && window.top) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window) && window.top) return window.top;
                } catch (err) {}
                for (var _i7 = 0, _getAllChildFrames4 = function getAllChildFrames(win) {
                    var result = [];
                    for (var _i3 = 0, _getFrames2 = function(win) {
                        var result = [];
                        var frames;
                        try {
                            frames = win.frames;
                        } catch (err) {
                            frames = win;
                        }
                        var len;
                        try {
                            len = frames.length;
                        } catch (err) {}
                        if (0 === len) return result;
                        if (len) {
                            for (var i = 0; i < len; i++) {
                                var frame = void 0;
                                try {
                                    frame = frames[i];
                                } catch (err) {
                                    continue;
                                }
                                result.push(frame);
                            }
                            return result;
                        }
                        for (var _i = 0; _i < 100; _i++) {
                            var _frame = void 0;
                            try {
                                _frame = frames[_i];
                            } catch (err) {
                                return result;
                            }
                            if (!_frame) return result;
                            result.push(_frame);
                        }
                        return result;
                    }(win); _i3 < _getFrames2.length; _i3++) {
                        var frame = _getFrames2[_i3];
                        result.push(frame);
                        for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) result.push(_getAllChildFrames2[_i5]);
                    }
                    return result;
                }(win); _i7 < _getAllChildFrames4.length; _i7++) {
                    var frame = _getAllChildFrames4[_i7];
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }(window), getParent() ? getParent() : window), "body", context).catch((function(err) {
                if (checkoutOpen) throw err;
            }));
        }));
        var restart = util_memoize((function() {
            return close().finally((function() {
                return initCheckout({
                    props: props,
                    components: components,
                    serviceData: serviceData,
                    config: config,
                    payment: {
                        button: button,
                        fundingSource: fundingSource,
                        card: card,
                        buyerIntent: buyerIntent,
                        isClick: !1
                    }
                }).start().finally(unresolvedPromise);
            }));
        }));
        return {
            click: function() {
                return promise_ZalgoPromise.try((function() {
                    if (!win && supportsPopups()) try {
                        win = function(_ref) {
                            var _ref$closeOnUnload = _ref.closeOnUnload;
                            var win = assertSameDomain(function(url, options) {
                                var _options$closeOnUnloa = (options = options || {}).closeOnUnload, closeOnUnload = void 0 === _options$closeOnUnloa ? 1 : _options$closeOnUnloa, _options$name = options.name, name = void 0 === _options$name ? "" : _options$name, width = options.width, height = options.height;
                                var top = 0;
                                var left = 0;
                                width && (window.outerWidth ? left = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (left = Math.round((window.screen.width - width) / 2)));
                                height && (window.outerHeight ? top = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (top = Math.round((window.screen.height - height) / 2)));
                                delete options.closeOnUnload;
                                delete options.name;
                                width && height && (options = _extends({
                                    top: top,
                                    left: left,
                                    width: width,
                                    height: height,
                                    status: 1,
                                    toolbar: 0,
                                    menubar: 0,
                                    resizable: 1,
                                    scrollbars: 1
                                }, options));
                                var params = Object.keys(options).map((function(key) {
                                    if (null != options[key]) return key + "=" + ("string" == typeof (item = options[key]) ? item : item && item.toString && "function" == typeof item.toString ? item.toString() : {}.toString.call(item));
                                    var item;
                                })).filter(Boolean).join(",");
                                var win;
                                try {
                                    win = window.open("", name, params);
                                } catch (err) {
                                    throw new dom_PopupOpenError("Can not open popup window - " + (err.stack || err.message));
                                }
                                if (isWindowClosed(win)) {
                                    var err;
                                    throw new dom_PopupOpenError("Can not open popup window - blocked");
                                }
                                closeOnUnload && window.addEventListener("unload", (function() {
                                    return win.close();
                                }));
                                return win;
                            }(0, {
                                width: _ref.width,
                                height: _ref.height,
                                closeOnUnload: void 0 === _ref$closeOnUnload ? 1 : _ref$closeOnUnload
                            }));
                            var doc = win.document;
                            !function(win, el) {
                                var tag = el.tagName.toLowerCase();
                                if ("html" !== tag) throw new Error("Expected element to be html, got " + tag);
                                var documentElement = win.document.documentElement;
                                for (var _i6 = 0, _arrayFrom2 = arrayFrom(documentElement.children); _i6 < _arrayFrom2.length; _i6++) documentElement.removeChild(_arrayFrom2[_i6]);
                                for (var _i8 = 0, _arrayFrom4 = arrayFrom(el.children); _i8 < _arrayFrom4.length; _i8++) documentElement.appendChild(_arrayFrom4[_i8]);
                            }(win, function(element, props) {
                                for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
                                children = normalizeChildren(children);
                                if ("string" == typeof element) return new node_ElementNode(element, props, children);
                                if ("function" == typeof element) return new node_ComponentNode(element, props, children);
                                throw new TypeError("Expected jsx element to be a string or a function");
                            }(SpinnerPage, {
                                nonce: getNonce()
                            }).render(dom({
                                doc: doc
                            })));
                            return win;
                        }({
                            width: 500,
                            height: 590
                        });
                    } catch (err) {
                        getLogger().warn("popup_open_error_iframe_fallback", {
                            err: stringifyError(err)
                        });
                        if (!(err instanceof dom_PopupOpenError)) throw err;
                        context = "iframe";
                    }
                    if (onClick) return promise_ZalgoPromise.try((function() {
                        return !onClick || onClick({
                            fundingSource: fundingSource
                        });
                    })).then((function(valid) {
                        win && !valid && win.close();
                    }));
                    start();
                }));
            },
            start: start,
            close: close
        };
    };
    var _NATIVE_DOMAIN, _HISTORY_NATIVE_POPUP, _MOBILE_NATIVE_POPUP_, _NATIVE_CHECKOUT_URI, _NATIVE_CHECKOUT_POPU, _NATIVE_CHECKOUT_FALL;
    var SUPPORTED_FUNDING = [ "paypal", "venmo" ];
    var NATIVE_DOMAIN = ((_NATIVE_DOMAIN = {}).test = "https://www.paypal.com", _NATIVE_DOMAIN.local = "https://www.paypal.com", 
    _NATIVE_DOMAIN.stage = "https://www.paypal.com", _NATIVE_DOMAIN.sandbox = "https://www.sandbox.paypal.com", 
    _NATIVE_DOMAIN.production = "https://www.paypal.com", _NATIVE_DOMAIN);
    var HISTORY_NATIVE_POPUP_DOMAIN = ((_HISTORY_NATIVE_POPUP = {}).test = "https://history.paypal.com", 
    _HISTORY_NATIVE_POPUP.local = getDomain(), _HISTORY_NATIVE_POPUP.stage = "https://history.paypal.com", 
    _HISTORY_NATIVE_POPUP.sandbox = "https://history.paypal.com", _HISTORY_NATIVE_POPUP.production = "https://history.paypal.com", 
    _HISTORY_NATIVE_POPUP);
    var MOBILE_NATIVE_POPUP_DOMAIN = ((_MOBILE_NATIVE_POPUP_ = {}).test = "https://mobile.paypal.com", 
    _MOBILE_NATIVE_POPUP_.local = getDomain(), _MOBILE_NATIVE_POPUP_.stage = "https://mobile.paypal.com", 
    _MOBILE_NATIVE_POPUP_.sandbox = "https://mobile.paypal.com", _MOBILE_NATIVE_POPUP_.production = "https://mobile.paypal.com", 
    _MOBILE_NATIVE_POPUP_);
    var NATIVE_CHECKOUT_URI = ((_NATIVE_CHECKOUT_URI = {}).paypal = "/smart/checkout/native", 
    _NATIVE_CHECKOUT_URI.venmo = "/smart/checkout/venmo", _NATIVE_CHECKOUT_URI);
    var NATIVE_CHECKOUT_POPUP_URI = ((_NATIVE_CHECKOUT_POPU = {}).paypal = "/smart/checkout/native/popup", 
    _NATIVE_CHECKOUT_POPU.venmo = "/smart/checkout/venmo/popup", _NATIVE_CHECKOUT_POPU);
    var NATIVE_CHECKOUT_FALLBACK_URI = ((_NATIVE_CHECKOUT_FALL = {}).paypal = "/smart/checkout/fallback", 
    _NATIVE_CHECKOUT_FALL.venmo = "/smart/checkout/fallback", _NATIVE_CHECKOUT_FALL);
    function isTestGroup(nativeEligibility, fundingSource) {
        var fundingEligibility = nativeEligibility[fundingSource];
        return !(!fundingEligibility || !fundingEligibility.eligibility);
    }
    function isControlGroup(nativeEligibility, fundingSource) {
        var fundingEligibility = nativeEligibility[fundingSource];
        return !(!fundingEligibility || fundingEligibility.eligibility || "experimentation_ineligibility" !== fundingEligibility.ineligibilityReason);
    }
    function isNativeOptedIn(_ref2) {
        if (_ref2.props.enableNativeCheckout) return !0;
        try {
            if (window.localStorage.getItem("__native_checkout__")) return !0;
        } catch (err) {}
        return !1;
    }
    var nativeEligibilityResults;
    function canUsePopupAppSwitch(_ref4) {
        var fundingSource = _ref4.fundingSource;
        return !(!isIOSSafari() && !isAndroidChrome() || fundingSource && "paypal" !== fundingSource && "venmo" !== fundingSource);
    }
    function canUseNativeQRCode(_ref5) {
        var fundingSource = _ref5.fundingSource;
        return !(isIos() || isAndroid() || fundingSource && "venmo" !== fundingSource);
    }
    var constants = __webpack_require__(1);
    function getNativeDomain(_ref) {
        var props = _ref.props;
        var env = props.env;
        return "sandbox" !== env || !isNativeOptedIn({
            props: props
        }) || window.xprops && window.xprops.useCorrectNativeSandboxDomain ? NATIVE_DOMAIN[env] : "https://www.paypal.com";
    }
    function getNativePopupDomain(_ref2) {
        var props = _ref2.props;
        var env = props.env;
        return "sandbox" !== env || !isNativeOptedIn({
            props: props
        }) || window.xprops && window.xprops.useCorrectNativeSandboxDomain ? ((name = "enable_mobile_native_popup_domain", 
        _ref = {
            sample: 0
        }, sample = _ref.sample, _ref$sticky = _ref.sticky, sticky = void 0 === _ref$sticky || _ref$sticky, 
        logger = getLogger(), function(_ref) {
            var name = _ref.name, _ref$sample = _ref.sample, sample = void 0 === _ref$sample ? 50 : _ref$sample, _ref$logTreatment = _ref.logTreatment, logTreatment = void 0 === _ref$logTreatment ? belter_src_util_noop : _ref$logTreatment, _ref$logCheckpoint = _ref.logCheckpoint, logCheckpoint = void 0 === _ref$logCheckpoint ? belter_src_util_noop : _ref$logCheckpoint, _ref$sticky = _ref.sticky;
            var throttle = void 0 === _ref$sticky || _ref$sticky ? function(name) {
                return getBelterExperimentStorage().getState((function(state) {
                    state.throttlePercentiles = state.throttlePercentiles || {};
                    state.throttlePercentiles[name] = state.throttlePercentiles[name] || getRandomInteger(100);
                    return state.throttlePercentiles[name];
                }));
            }(name) : getRandomInteger(100);
            var group;
            var treatment = name + "_" + (group = throttle < sample ? "test" : sample >= 50 || sample <= throttle && throttle < 2 * sample ? "control" : "throttle");
            var started = !1;
            var forced = !1;
            try {
                window.localStorage && window.localStorage.getItem(name) && (forced = !0);
            } catch (err) {}
            var exp = {
                isEnabled: function() {
                    return "test" === group || forced;
                },
                isDisabled: function() {
                    return "test" !== group && !forced;
                },
                getTreatment: function() {
                    return treatment;
                },
                log: function(checkpoint, payload) {
                    void 0 === payload && (payload = {});
                    if (!started) return exp;
                    isEventUnique(treatment + "_" + JSON.stringify(payload)) && logTreatment({
                        name: name,
                        treatment: treatment,
                        payload: payload,
                        throttle: throttle
                    });
                    isEventUnique(treatment + "_" + checkpoint + "_" + JSON.stringify(payload)) && logCheckpoint({
                        name: name,
                        treatment: treatment,
                        checkpoint: checkpoint,
                        payload: payload,
                        throttle: throttle
                    });
                    return exp;
                },
                logStart: function(payload) {
                    void 0 === payload && (payload = {});
                    started = !0;
                    return exp.log("start", payload);
                },
                logComplete: function(payload) {
                    void 0 === payload && (payload = {});
                    return exp.log("complete", payload);
                }
            };
            return exp;
        }({
            name: name,
            sample: sample,
            logTreatment: function(_ref2) {
                var _extends2;
                var treatment = _ref2.treatment, payload = _ref2.payload;
                var fullPayload = _extends(((_extends2 = {}).state_name = "PXP_CHECK", _extends2.transition_name = "process_pxp_check", 
                _extends2.pxp_exp_id = name, _extends2.pxp_trtmnt_id = treatment, _extends2), payload);
                logger.track(fullPayload);
                logger.flush();
            },
            logCheckpoint: function(_ref3) {
                logger.info(_ref3.treatment + "_" + _ref3.checkpoint, _extends({}, _ref3.payload, {
                    throttle: _ref3.throttle.toString()
                }));
                logger.flush();
            },
            sticky: sticky
        })).isEnabled() ? MOBILE_NATIVE_POPUP_DOMAIN : HISTORY_NATIVE_POPUP_DOMAIN)[env] : "https://www.sandbox.paypal.com";
        var name, _ref, sample, _ref$sticky, sticky, logger;
    }
    function getNativeUrlQueryParams(_ref4) {
        var props = _ref4.props, serviceData = _ref4.serviceData, config = _ref4.config, fundingSource = _ref4.fundingSource, sessionUID = _ref4.sessionUID, pageUrl = _ref4.pageUrl, orderID = _ref4.orderID, stickinessID = _ref4.stickinessID;
        var env = props.env, clientID = props.clientID, commit = props.commit, buttonSessionID = props.buttonSessionID, stageHost = props.stageHost, apiStageHost = props.apiStageHost, enableFunding = props.enableFunding, merchantDomain = props.merchantDomain;
        var facilitatorAccessToken = serviceData.facilitatorAccessToken, sdkMeta = serviceData.sdkMeta, buyerCountry = serviceData.buyerCountry;
        var sdkVersion = config.sdkVersion, firebase = config.firebase;
        var webCheckoutUrl = function(_ref3) {
            var orderID = _ref3.orderID, props = _ref3.props, fundingSource = _ref3.fundingSource, facilitatorAccessToken = _ref3.facilitatorAccessToken;
            var commit = props.commit;
            return extendUrl(getNativeDomain({
                props: props
            }) + "/checkoutnow", {
                query: {
                    fundingSource: fundingSource,
                    facilitatorAccessToken: facilitatorAccessToken,
                    token: orderID,
                    useraction: commit ? "commit" : "continue",
                    native_xo: "1"
                }
            });
        }({
            orderID: orderID,
            props: props,
            fundingSource: fundingSource,
            facilitatorAccessToken: facilitatorAccessToken
        });
        var forceEligible = isNativeOptedIn({
            props: props
        });
        var channel = isDevice() ? constants.CHANNEL.MOBILE : constants.CHANNEL.DESKTOP;
        if (!firebase) throw new Error("Can not find firebase config");
        var queryParams = {
            channel: channel,
            sdkMeta: sdkMeta,
            sessionUID: sessionUID,
            orderID: orderID,
            facilitatorAccessToken: facilitatorAccessToken,
            pageUrl: pageUrl,
            clientID: clientID,
            commit: String(commit),
            webCheckoutUrl: isIOSSafari() ? webCheckoutUrl : "",
            stickinessID: stickinessID,
            buttonSessionID: buttonSessionID,
            env: env,
            stageHost: stageHost || "",
            apiStageHost: apiStageHost || "",
            forceEligible: forceEligible,
            fundingSource: fundingSource,
            enableFunding: enableFunding.join(","),
            domain: merchantDomain,
            rtdbInstanceID: firebase.databaseURL,
            buyerCountry: buyerCountry,
            sdkVersion: sdkVersion
        };
        queryParams.channel === constants.CHANNEL.DESKTOP && delete queryParams.sdkMeta;
        return queryParams;
    }
    function getNativeUrl(_ref5) {
        var props = _ref5.props, fundingSource = _ref5.fundingSource;
        var queryParams = getNativeUrlQueryParams({
            props: props,
            serviceData: _ref5.serviceData,
            config: _ref5.config,
            fundingSource: fundingSource,
            sessionUID: _ref5.sessionUID,
            pageUrl: _ref5.pageUrl,
            orderID: _ref5.orderID,
            stickinessID: _ref5.stickinessID
        });
        return extendUrl("" + getNativeDomain({
            props: props
        }) + NATIVE_CHECKOUT_URI[fundingSource], {
            query: queryParams
        });
    }
    function getNativeFallbackUrl(_ref6) {
        var props = _ref6.props, fundingSource = _ref6.fundingSource;
        var queryParams = getNativeUrlQueryParams({
            props: props,
            serviceData: _ref6.serviceData,
            config: _ref6.config,
            fundingSource: fundingSource,
            sessionUID: _ref6.sessionUID,
            pageUrl: _ref6.pageUrl,
            orderID: _ref6.orderID,
            stickinessID: _ref6.stickinessID
        });
        return extendUrl("" + getNativeDomain({
            props: props
        }) + NATIVE_CHECKOUT_FALLBACK_URI[fundingSource], {
            query: queryParams
        });
    }
    var getNativeSocket = util_memoize((function(_ref) {
        var nativeSocket = (config = (_ref9 = {
            sessionUID: _ref.sessionUID,
            sourceApp: "paypal_smart_payment_buttons",
            sourceAppVersion: _ref.version,
            targetApp: "paypal_native_checkout",
            config: _ref.firebaseConfig
        }).config, function(_ref) {
            var sessionUID = _ref.sessionUID, driver = _ref.driver, sourceApp = _ref.sourceApp, sourceAppVersion = _ref.sourceAppVersion, targetApp = _ref.targetApp, _ref$retry = _ref.retry, retry = void 0 === _ref$retry || _ref$retry;
            var receivedMessages = {};
            var responseListeners = {};
            var activeRequests = [];
            var requestListeners = {};
            var errorListeners = [];
            var triggerError = function(err) {
                for (var _i2 = 0, _errorListeners2 = errorListeners; _i2 < _errorListeners2.length; _i2++) (0, 
                _errorListeners2[_i2])(err);
            };
            var sendMessage = function(socket, data) {
                var messageUID = uniqueID();
                receivedMessages[messageUID] = !0;
                var message = _extends({
                    session_uid: sessionUID,
                    message_uid: messageUID,
                    source_app: sourceApp,
                    source_app_version: sourceAppVersion,
                    target_app: targetApp
                }, data);
                socket.send(JSON.stringify(message));
            };
            var sendResponse = function(socket, _ref2) {
                var messageName = _ref2.messageName, responseStatus = _ref2.responseStatus, responseData = _ref2.responseData, requestUID = _ref2.requestUID;
                if (socket.isOpen()) return sendMessage(socket, {
                    request_uid: requestUID,
                    message_name: messageName,
                    message_status: responseStatus,
                    message_type: "response",
                    message_data: responseData
                });
            };
            var closed = !1;
            var retryDelay;
            var socketPromise;
            var retryPromise;
            var init = function init() {
                (socketPromise = promise_ZalgoPromise.try((function() {
                    if (retryDelay) return retryPromise = promise_ZalgoPromise.delay(retryDelay);
                })).then((function() {
                    retryPromise = null;
                    var instance = driver();
                    var connectionPromise = new promise_ZalgoPromise((function(resolve, reject) {
                        instance.onOpen((function() {
                            closed = !1;
                            retryDelay = 0;
                            resolve(instance);
                        }));
                        instance.onClose((function(err) {
                            closed = !0;
                            reject(err || new Error("socket closed"));
                            if (retry) {
                                retry && (retryDelay = retryDelay ? 2 * retryDelay : 1);
                                init();
                            }
                        }));
                        instance.onError((function(err) {
                            reject(err);
                            triggerError(err);
                        }));
                    }));
                    instance.onMessage((function(rawMessage) {
                        connectionPromise.then((function(socket) {
                            return function(socket, rawData) {
                                var parsedData;
                                try {
                                    parsedData = JSON.parse(rawData);
                                } catch (err) {
                                    throw new Error("Could not parse socket message: " + rawData);
                                }
                                if (!parsedData) throw new Error("No data passed from socket message");
                                var messageSessionUID = parsedData.session_uid, requestUID = parsedData.request_uid, messageUID = parsedData.message_uid, messageName = parsedData.message_name, messageType = parsedData.message_type, messageData = parsedData.message_data, responseStatus = parsedData.message_status;
                                requestUID = requestUID || parsedData.request_id;
                                if (!messageUID || !receivedMessages[messageUID]) {
                                    if (!(messageUID && requestUID && messageName && messageType && parsedData.target_app)) throw new Error("Incomplete message: " + rawData);
                                    receivedMessages[messageUID] = !0;
                                    if ("request" === messageType) return function(socket, _ref3) {
                                        var messageSessionUID = _ref3.messageSessionUID, requestUID = _ref3.requestUID, messageName = _ref3.messageName, messageData = _ref3.messageData;
                                        var activeRequest = new promise_ZalgoPromise;
                                        activeRequests.push(activeRequest);
                                        return promise_ZalgoPromise.try((function() {
                                            var requestListener = requestListeners[messageName];
                                            if (!requestListener) throw new Error("No listener found for name: " + messageName);
                                            var handler = requestListener.handler;
                                            if (requestListener.requireSessionUID && messageSessionUID !== sessionUID) throw new Error("Incorrect sessionUID: " + (messageSessionUID || "undefined"));
                                            return handler({
                                                data: messageData
                                            });
                                        })).then((function(res) {
                                            sendResponse(socket, {
                                                responseStatus: "success",
                                                responseData: res,
                                                messageName: messageName,
                                                requestUID: requestUID
                                            });
                                        }), (function(err) {
                                            sendResponse(socket, {
                                                responseStatus: "error",
                                                responseData: {
                                                    message: err && err.message ? err.message : "Unknown error"
                                                },
                                                messageName: messageName,
                                                messageSessionUID: messageSessionUID,
                                                requestUID: requestUID
                                            });
                                        })).finally((function() {
                                            activeRequest.resolve();
                                            activeRequests.splice(activeRequests.indexOf(activeRequest), 1);
                                        }));
                                    }(socket, {
                                        messageSessionUID: messageSessionUID,
                                        requestUID: requestUID,
                                        messageName: messageName,
                                        messageData: messageData
                                    });
                                    if ("response" === messageType) return function(_ref4) {
                                        var requestUID = _ref4.requestUID, messageSessionUID = _ref4.messageSessionUID, responseStatus = _ref4.responseStatus, messageData = _ref4.messageData;
                                        var _ref5 = responseListeners[requestUID] || {}, listenerPromise = _ref5.listenerPromise, requireSessionUID = _ref5.requireSessionUID;
                                        if (!listenerPromise) return triggerError(new Error("Could not find response listener for " + _ref4.messageName + " with id: " + requestUID));
                                        if (requireSessionUID && messageSessionUID !== sessionUID) return triggerError(new Error("Incorrect sessionUID: " + (messageSessionUID || "undefined")));
                                        delete responseListeners[requestUID];
                                        "success" === responseStatus ? listenerPromise.resolve({
                                            data: messageData
                                        }) : listenerPromise.reject("error" === responseStatus ? new Error(messageData.message) : new Error("Can not handle response status: " + (status || "undefined")));
                                    }({
                                        messageName: messageName,
                                        requestUID: requestUID,
                                        messageSessionUID: messageSessionUID,
                                        responseStatus: responseStatus,
                                        messageData: messageData
                                    });
                                    throw new Error("Unhandleable message type: " + messageType);
                                }
                            }(socket, rawMessage);
                        }));
                    }));
                    return connectionPromise;
                }))).catch(belter_src_util_noop);
            };
            init();
            return {
                on: function(name, handler, _temp) {
                    var _ref6$requireSessionU = (void 0 === _temp ? {} : _temp).requireSessionUID, requireSessionUID = void 0 === _ref6$requireSessionU || _ref6$requireSessionU;
                    if (requestListeners[name]) throw new Error("Listener already registered for name: " + name);
                    requestListeners[name] = {
                        handler: handler,
                        requireSessionUID: requireSessionUID
                    };
                    return {
                        cancel: function() {
                            delete requestListeners[name];
                        }
                    };
                },
                send: function(messageName, messageData, _temp2) {
                    var _ref7 = void 0 === _temp2 ? {} : _temp2, _ref7$requireSessionU = _ref7.requireSessionUID, requireSessionUID = void 0 === _ref7$requireSessionU || _ref7$requireSessionU, _ref7$timeout = _ref7.timeout, timeout = void 0 === _ref7$timeout ? 0 : _ref7$timeout;
                    return socketPromise.then((function(socket) {
                        var requestUID = uniqueID();
                        var listenerPromise = new promise_ZalgoPromise;
                        responseListeners[requestUID] = {
                            listenerPromise: listenerPromise,
                            requireSessionUID: requireSessionUID
                        };
                        sendMessage(socket, {
                            request_uid: requestUID,
                            message_name: messageName,
                            message_type: "request",
                            message_data: messageData
                        });
                        timeout && setTimeout((function() {
                            listenerPromise.reject(new Error("Timeoued out waiting for " + messageName + " response after " + timeout + "ms"));
                        }), timeout);
                        return listenerPromise;
                    }));
                },
                onError: function(handler) {
                    errorListeners.push(handler);
                },
                reconnect: function() {
                    return promise_ZalgoPromise.try((function() {
                        if (!closed) return socketPromise;
                        if (retryPromise) {
                            retryPromise.resolve();
                            return socketPromise;
                        }
                        retryDelay = 0;
                        return init();
                    })).then(belter_src_util_noop);
                },
                close: function() {
                    retry = !1;
                    requestListeners = {};
                    errorListeners = [];
                    for (var _i4 = 0, _Object$keys2 = Object.keys(responseListeners); _i4 < _Object$keys2.length; _i4++) responseListeners[_Object$keys2[_i4]].listenerPromise.asyncReject(new Error("Socket closed"));
                    promise_ZalgoPromise.all(activeRequests).then((function() {
                        return socketPromise.then((function(socket) {
                            return socket.close();
                        }), belter_src_util_noop);
                    }));
                }
            };
        }({
            sessionUID: sessionUID = _ref9.sessionUID,
            driver: function() {
                var open = !1;
                var onMessageHandlers = [];
                var onErrorHandlers = [];
                var onCloseHandlers = [];
                var onOpenHandlers = [];
                var error = function(err) {
                    for (var _i6 = 0; _i6 < onErrorHandlers.length; _i6++) (0, onErrorHandlers[_i6])(err);
                };
                var databasePromise = promise_ZalgoPromise.hash({
                    firebase: loadFirebaseSDK(config),
                    sessionToken: getFirebaseSessionToken(sessionUID)
                }).then((function(_ref10) {
                    var firebase = _ref10.firebase, sessionToken = _ref10.sessionToken;
                    var valueCallback = function(res) {
                        var messages = res.val() || {};
                        for (var _i8 = 0, _Object$keys4 = Object.keys(messages); _i8 < _Object$keys4.length; _i8++) {
                            var message = messages[_Object$keys4[_i8]];
                            for (var _i10 = 0; _i10 < onMessageHandlers.length; _i10++) (0, onMessageHandlers[_i10])(message);
                        }
                    };
                    return firebase.auth().signInWithCustomToken(sessionToken).then((function() {
                        var _getLogger$info$track;
                        var database = firebase.database();
                        firebase.database.INTERNAL.forceWebSockets();
                        open = !0;
                        getLogger().info("firebase_connection_opened").track((_getLogger$info$track = {}, 
                        _getLogger$info$track.state_name = "smart_button", _getLogger$info$track.transition_name = "firebase_connection_opened", 
                        _getLogger$info$track)).flush();
                        for (var _i12 = 0; _i12 < onOpenHandlers.length; _i12++) (0, onOpenHandlers[_i12])();
                        database.ref("users/" + sessionUID + "/messages").on("value", valueCallback, (function(err) {
                            error(err);
                        }));
                        database.goOnline();
                        return database;
                    }));
                }));
                databasePromise.catch((function(err) {
                    var _getLogger$warn$track;
                    getLogger().warn("firebase_connection_errored", {
                        err: stringifyError(err)
                    }).track((_getLogger$warn$track = {}, _getLogger$warn$track.state_name = "smart_button", 
                    _getLogger$warn$track.transition_name = "firebase_connection_errored", _getLogger$warn$track.int_error_desc = stringifyError(err), 
                    _getLogger$warn$track)).flush();
                }));
                return {
                    send: function(data) {
                        databasePromise.then((function(database) {
                            return database.ref("users/" + sessionUID + "/messages/" + uniqueID()).set(data);
                        })).catch(error);
                    },
                    close: function() {
                        databasePromise.then((function(database) {
                            database.goOffline();
                        }));
                    },
                    onMessage: function(handler) {
                        onMessageHandlers.push(handler);
                    },
                    onError: function(handler) {
                        onErrorHandlers.push(handler);
                    },
                    onOpen: function(handler) {
                        open ? handler() : onOpenHandlers.push(handler);
                    },
                    onClose: function(handler) {
                        onCloseHandlers.push(handler);
                    },
                    isOpen: function() {
                        return open;
                    }
                };
            },
            sourceApp: _ref9.sourceApp,
            sourceAppVersion: _ref9.sourceAppVersion,
            targetApp: _ref9.targetApp
        }));
        var _ref9, sessionUID, config;
        nativeSocket.onError((function(err) {
            var stringifiedError = stringifyError(err);
            if (stringifiedError && -1 === stringifiedError.toLowerCase().indexOf("permission_denied")) {
                var _getLogger$error$trac;
                getLogger().error("native_socket_error", {
                    err: stringifiedError
                }).track((_getLogger$error$trac = {}, _getLogger$error$trac.state_name = "smart_button", 
                _getLogger$error$trac.transition_name = "native_app_switch_ack", _getLogger$error$trac.int_error_desc = "[Native Socket Error] " + stringifiedError, 
                _getLogger$error$trac)).flush();
            }
        }));
        return nativeSocket;
    }));
    function connectNative(_ref2) {
        var config = _ref2.config, sessionUID = _ref2.sessionUID, callbacks = _ref2.callbacks;
        var onInit = callbacks.onInit, onApprove = callbacks.onApprove, onCancel = callbacks.onCancel, onShippingChange = callbacks.onShippingChange, onError = callbacks.onError, onFallback = callbacks.onFallback;
        var firebaseConfig = config.firebase, sdkVersion = config.sdkVersion;
        if (!firebaseConfig) throw new Error("Firebase config not found");
        var socket = getNativeSocket({
            sessionUID: sessionUID,
            firebaseConfig: firebaseConfig,
            version: sdkVersion
        });
        var onInitListener = socket.on("onInit", onInit);
        var onShippingChangeListener = socket.on("onShippingChange", onShippingChange);
        var onApproveListener = socket.on("onApprove", onApprove);
        var onCancelListener = socket.on("onCancel", onCancel);
        var onErrorListener = socket.on("onError", onError);
        var onFallbackListener = socket.on("onFallback", onFallback);
        return {
            cancel: function() {
                return promise_ZalgoPromise.all([ onInitListener.cancel(), onShippingChangeListener.cancel(), onApproveListener.cancel(), onCancelListener.cancel(), onErrorListener.cancel(), onFallbackListener.cancel() ]).then(belter_src_util_noop);
            }
        };
    }
    function getEligibility(_ref) {
        var fundingSource = _ref.fundingSource, props = _ref.props, serviceData = _ref.serviceData, validatePromise = _ref.validatePromise;
        var createOrder = props.createOrder, vault = props.vault, clientID = props.clientID, currency = props.currency, buttonSessionID = props.buttonSessionID, enableFunding = props.enableFunding, merchantDomain = props.merchantDomain;
        var buyerCountry = serviceData.buyerCountry, cookies = serviceData.cookies, merchantID = serviceData.merchantID;
        var shippingCallbackEnabled = Boolean(props.onShippingChange);
        return validatePromise.then((function(valid) {
            return !!valid && (!!isNativeOptedIn({
                props: props
            }) || createOrder().then((function(orderID) {
                return getNativeEligibility({
                    vault: vault,
                    platform: "mobile",
                    shippingCallbackEnabled: shippingCallbackEnabled,
                    clientID: clientID,
                    buyerCountry: buyerCountry,
                    currency: currency,
                    buttonSessionID: buttonSessionID,
                    cookies: cookies,
                    orderID: orderID,
                    enableFunding: enableFunding,
                    merchantID: merchantID[0],
                    domain: merchantDomain,
                    skipElmo: !0
                }).then((function(eligibility) {
                    var _eligibility$fundingS, _eligibility$fundingS2;
                    var eligibleReasons = [ "isUserAgentEligible", "isBrowserMobileAndroid" ];
                    var ineligibleReasons = eligibility && (null == (_eligibility$fundingS = eligibility[fundingSource]) || null == (_eligibility$fundingS2 = _eligibility$fundingS.ineligibilityReason) ? void 0 : _eligibility$fundingS2.split(","));
                    var eligible = null == ineligibleReasons ? void 0 : ineligibleReasons.every((function(reason) {
                        return !reason || -1 !== (null == eligibleReasons ? void 0 : eligibleReasons.indexOf(reason));
                    }));
                    if (ineligibleReasons && !eligible) {
                        var _getLogger$info$track;
                        getLogger().info("native_appswitch_ineligible", {
                            orderID: orderID
                        }).track((_getLogger$info$track = {}, _getLogger$info$track.state_name = "smart_button", 
                        _getLogger$info$track.transition_name = "app_switch_ineligible", _getLogger$info$track.info_msg = null == ineligibleReasons ? void 0 : ineligibleReasons.join(","), 
                        _getLogger$info$track)).flush();
                        return !1;
                    }
                    return !0;
                }));
            })));
        }));
    }
    function initNativeQRCode(_ref2) {
        var props = _ref2.props, serviceData = _ref2.serviceData, config = _ref2.config, components = _ref2.components, payment = _ref2.payment, clean = _ref2.clean, callbacks = _ref2.callbacks, sessionUID = _ref2.sessionUID;
        var createOrder = props.createOrder, onClick = props.onClick;
        var QRCode = components.QRCode;
        var fundingSource = payment.fundingSource;
        var onInit = callbacks.onInit, onApprove = callbacks.onApprove, onCancel = callbacks.onCancel, onError = callbacks.onError, onFallback = callbacks.onFallback, onClose = callbacks.onClose, onDestroy = callbacks.onDestroy, onShippingChange = callbacks.onShippingChange;
        var qrCodeRenderTarget = window.xprops.getParent();
        var pageUrl = window.xprops.getPageUrl();
        var stickinessID = getStorageID();
        return {
            click: belter_src_util_noop,
            start: function() {
                var _getLogger$info$track2, _getLogger$info$track3;
                getLogger().info("VenmoDesktopPay_qrcode").track((_getLogger$info$track2 = {}, _getLogger$info$track2.transition_name = "qr_shown", 
                _getLogger$info$track2)).flush();
                getLogger().info("VenmoDesktopPay_qrcode_prepare_escape").track((_getLogger$info$track3 = {}, 
                _getLogger$info$track3.transition_name = "qr_prepare_pay", _getLogger$info$track3)).flush();
                var onQRClose = function(event) {
                    void 0 === event && (event = "closeQRCode");
                    return promise_ZalgoPromise.try((function() {
                        var _getLogger$info$track4;
                        getLogger().info("VenmoDesktopPay_qrcode_closing_" + event).track((_getLogger$info$track4 = {}, 
                        _getLogger$info$track4.state_name = "smart_button", _getLogger$info$track4.transition_name = event ? "qr_closing_" + event : "qr_closing", 
                        _getLogger$info$track4)).flush();
                        onClose();
                    }));
                };
                var onEscapePath = function(win, selectedFundingSource) {
                    var _getLogger$info$track5;
                    getLogger().info("VenmoDesktopPay_process_pay_with_" + selectedFundingSource).track((_getLogger$info$track5 = {}, 
                    _getLogger$info$track5.state_name = "smart_button", _getLogger$info$track5.transition_name = "qr_process_pay_with_" + selectedFundingSource, 
                    _getLogger$info$track5)).flush();
                    return promise_ZalgoPromise.try((function() {
                        var paymentInfo = _extends({}, payment, {
                            win: win,
                            fundingSource: selectedFundingSource
                        });
                        return checkout_checkout_init({
                            props: props,
                            components: components,
                            payment: paymentInfo,
                            config: config,
                            serviceData: serviceData
                        }).start().then((function() {
                            return promise_ZalgoPromise.resolve();
                        }));
                    }));
                };
                var validatePromise = promise_ZalgoPromise.try((function() {
                    return !onClick || onClick({
                        fundingSource: fundingSource
                    });
                })).then((function(valid) {
                    if (!valid) {
                        var _getLogger$info$track6;
                        getLogger().info("native_onclick_invalid").track((_getLogger$info$track6 = {}, _getLogger$info$track6.state_name = "smart_button", 
                        _getLogger$info$track6.transition_name = "native_onclick_invalid", _getLogger$info$track6)).flush();
                    }
                    return valid;
                }));
                return promise_ZalgoPromise.hash({
                    valid: validatePromise,
                    eligible: getEligibility({
                        fundingSource: fundingSource,
                        props: props,
                        serviceData: serviceData,
                        validatePromise: validatePromise
                    })
                }).then((function(_ref3) {
                    if (_ref3.valid) return _ref3.eligible ? createOrder().then((function(orderID) {
                        var url = getNativeUrl({
                            props: props,
                            serviceData: serviceData,
                            config: config,
                            fundingSource: fundingSource,
                            sessionUID: sessionUID,
                            orderID: orderID,
                            stickinessID: stickinessID,
                            pageUrl: pageUrl
                        });
                        var qrCodeComponentInstance = QRCode({
                            cspNonce: config.cspNonce,
                            qrPath: url,
                            state: "qr_default",
                            onClose: onQRClose,
                            onEscapePath: onEscapePath
                        });
                        function updateQRCodeComponentState(newState) {
                            return qrCodeComponentInstance.updateProps(_extends({
                                cspNonce: config.cspNonce,
                                qrPath: url,
                                onClose: onQRClose,
                                onEscapePath: onEscapePath
                            }, newState));
                        }
                        var connection = connectNative({
                            config: config,
                            sessionUID: sessionUID,
                            callbacks: {
                                onInit: function() {
                                    return updateQRCodeComponentState({
                                        state: "qr_scanned"
                                    }).then((function() {
                                        return onInit();
                                    }));
                                },
                                onApprove: function(res) {
                                    return updateQRCodeComponentState({
                                        state: "qr_authorized"
                                    }).then((function() {
                                        return function(event) {
                                            onQRClose("onApprove");
                                            return promise_ZalgoPromise.delay(2e3).then((function() {
                                                return promise_ZalgoPromise.try((function() {
                                                    qrCodeComponentInstance.close();
                                                    return onDestroy();
                                                }));
                                            })).then(belter_src_util_noop);
                                        }().then((function() {
                                            return onApprove(res);
                                        }));
                                    }));
                                },
                                onCancel: function() {
                                    return updateQRCodeComponentState({
                                        state: "qr_error",
                                        errorText: "The authorization was canceled"
                                    }).then((function() {
                                        return onCancel();
                                    }));
                                },
                                onError: function(res) {
                                    return updateQRCodeComponentState({
                                        state: "qr_authorized",
                                        errorText: res.data.message
                                    }).then((function() {
                                        return onError(res);
                                    }));
                                },
                                onFallback: function(_ref4) {
                                    var data = _ref4.data;
                                    return updateQRCodeComponentState({
                                        state: "qr_error",
                                        errorText: "The authorization was canceled"
                                    }).then((function() {
                                        return onFallback({
                                            optOut: data
                                        });
                                    }));
                                },
                                onShippingChange: onShippingChange
                            }
                        });
                        clean.register(connection.cancel);
                        return qrCodeComponentInstance.renderTo(qrCodeRenderTarget, "body");
                    })) : onFallback().then(belter_src_util_noop);
                }));
            }
        };
    }
    function onPostMessage(win, domain, event, handler) {
        return paypal.postRobot.once(event, {
            window: win,
            domain: domain
        }, handler);
    }
    function popup_getEligibility(_ref) {
        var fundingSource = _ref.fundingSource, props = _ref.props, serviceData = _ref.serviceData, sfvc = _ref.sfvc, validatePromise = _ref.validatePromise, stickinessID = _ref.stickinessID, appDetect = _ref.appDetect;
        var createOrder = props.createOrder, vault = props.vault, platform = props.platform, clientID = props.clientID, currency = props.currency, buttonSessionID = props.buttonSessionID, enableFunding = props.enableFunding, merchantDomain = props.merchantDomain;
        var buyerCountry = serviceData.buyerCountry, cookies = serviceData.cookies, merchantID = serviceData.merchantID;
        var shippingCallbackEnabled = Boolean(props.onShippingChange);
        return validatePromise.then((function(valid) {
            return !!valid && !(appDetect && !appDetect.installed) && (!!isNativeOptedIn({
                props: props
            }) || !sfvc && createOrder().then((function(orderID) {
                return getNativeEligibility({
                    vault: vault,
                    platform: platform,
                    shippingCallbackEnabled: shippingCallbackEnabled,
                    clientID: clientID,
                    buyerCountry: buyerCountry,
                    currency: currency,
                    buttonSessionID: buttonSessionID,
                    cookies: cookies,
                    orderID: orderID,
                    enableFunding: enableFunding,
                    stickinessID: stickinessID,
                    merchantID: merchantID[0],
                    domain: merchantDomain
                }).then((function(eligibility) {
                    var _eligibility$fundingS;
                    var ineligibilityReason = eligibility && null != (_eligibility$fundingS = eligibility[fundingSource]) && _eligibility$fundingS.ineligibilityReason ? eligibility[fundingSource].ineligibilityReason : "";
                    if (!eligibility || !eligibility[fundingSource] || !eligibility[fundingSource].eligibility) {
                        var _getLogger$info$track2;
                        getLogger().info("native_appswitch_ineligible", {
                            orderID: orderID
                        }).track((_getLogger$info$track2 = {}, _getLogger$info$track2.state_name = "smart_button", 
                        _getLogger$info$track2.transition_name = "app_switch_ineligible", _getLogger$info$track2.info_msg = ineligibilityReason, 
                        _getLogger$info$track2)).flush();
                        return !1;
                    }
                    return !0;
                }));
            })));
        }));
    }
    function initNativePopup(_ref2) {
        var props = _ref2.props, serviceData = _ref2.serviceData, config = _ref2.config, sessionUID = _ref2.sessionUID, callbacks = _ref2.callbacks, clean = _ref2.clean;
        var onClick = props.onClick, createOrder = props.createOrder;
        var fundingSource = _ref2.payment.fundingSource;
        var _onInit = callbacks.onInit, _onApprove = callbacks.onApprove, _onCancel = callbacks.onCancel, _onError = callbacks.onError, _onFallback = callbacks.onFallback, onClose = callbacks.onClose, onDestroy = callbacks.onDestroy, _onShippingChange = callbacks.onShippingChange;
        if (!config.firebase) throw new Error("Can not load popup without firebase config");
        var nativePopupPromise;
        return {
            click: function() {
                nativePopupPromise = new promise_ZalgoPromise((function(resolve, reject) {
                    var _getLogger$info$track3;
                    var nativePopupWin = window.open(function(_ref8) {
                        var props = _ref8.props, fundingSource = _ref8.fundingSource;
                        var queryParams = function(_ref7) {
                            var props = _ref7.props, serviceData = _ref7.serviceData;
                            var buttonSessionID = props.buttonSessionID, env = props.env, clientID = props.clientID, sessionID = props.sessionID, sdkCorrelationID = props.sdkCorrelationID;
                            var sdkMeta = serviceData.sdkMeta, buyerCountry = serviceData.buyerCountry;
                            var parentDomain = getDomain();
                            return {
                                buttonSessionID: buttonSessionID,
                                buyerCountry: buyerCountry,
                                clientID: clientID,
                                channel: isDevice() ? constants.CHANNEL.MOBILE : constants.CHANNEL.DESKTOP,
                                env: env,
                                parentDomain: parentDomain,
                                sdkCorrelationID: sdkCorrelationID,
                                sdkMeta: sdkMeta,
                                sessionID: sessionID
                            };
                        }({
                            props: props,
                            serviceData: _ref8.serviceData,
                            fundingSource: fundingSource
                        });
                        return extendUrl("" + getNativePopupDomain({
                            props: props
                        }) + NATIVE_CHECKOUT_POPUP_URI[fundingSource], {
                            query: queryParams
                        }) + "#init";
                    }({
                        props: props,
                        serviceData: serviceData,
                        fundingSource: fundingSource
                    }));
                    if (!nativePopupWin) throw new Error("Expected native popup to have opened");
                    var nativePopupDomain = getNativePopupDomain({
                        props: props
                    });
                    getLogger().info("native_attempt_appswitch_popup_shown").track((_getLogger$info$track3 = {}, 
                    _getLogger$info$track3.state_name = "smart_button", _getLogger$info$track3.transition_name = "popup_shown", 
                    _getLogger$info$track3)).flush();
                    var redirectListenerTimeout = setTimeout((function() {
                        getLogger().info("native_popup_load_timeout").flush();
                    }), 5e3);
                    var validatePromise = promise_ZalgoPromise.try((function() {
                        return !onClick || onClick({
                            fundingSource: fundingSource
                        });
                    })).then((function(valid) {
                        if (!valid) {
                            var _getLogger$info$track4;
                            getLogger().info("native_onclick_invalid").track((_getLogger$info$track4 = {}, _getLogger$info$track4.state_name = "smart_button", 
                            _getLogger$info$track4.transition_name = "native_onclick_invalid", _getLogger$info$track4)).flush();
                        }
                        return valid;
                    }));
                    var orderPromise = validatePromise.then((function(valid) {
                        return valid ? createOrder() : unresolvedPromise();
                    }));
                    var detectAppSwitch = once((function() {
                        return promise_ZalgoPromise.try((function() {
                            var _getLogger$info$track5;
                            resolve();
                            onLsatUpgradeCalled();
                            getLogger().info("native_detect_app_switch").track((_getLogger$info$track5 = {}, 
                            _getLogger$info$track5.transition_name = "native_detect_app_switch", _getLogger$info$track5)).flush();
                            getStorageState((function(state) {
                                var _state$lastAppSwitchT = state.lastAppSwitchTime, lastAppSwitchTime = void 0 === _state$lastAppSwitchT ? 0 : _state$lastAppSwitchT, _state$lastWebSwitchT = state.lastWebSwitchTime, lastWebSwitchTime = void 0 === _state$lastWebSwitchT ? 0 : _state$lastWebSwitchT;
                                lastAppSwitchTime > lastWebSwitchTime && getLogger().info("app_switch_detect_with_previous_app_switch", {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                                lastWebSwitchTime > lastAppSwitchTime && getLogger().info("app_switch_detect_with_previous_web_switch", {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                                lastAppSwitchTime || lastWebSwitchTime || getLogger().info("app_switch_detect_with_no_previous_switch", {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                                state.lastAppSwitchTime = Date.now();
                            }));
                        }));
                    }));
                    var appSwitchError = once((function(err) {
                        reject(err);
                    }));
                    var detectPossibleAppSwitch = once((function() {
                        return promise_ZalgoPromise.try((function() {
                            var _getLogger$info$track6;
                            onLsatUpgradeCalled();
                            getLogger().info("native_detect_possible_app_switch").track((_getLogger$info$track6 = {}, 
                            _getLogger$info$track6.transition_name = "native_detect_possible_app_switch", _getLogger$info$track6)).flush();
                            var connection = connectNative({
                                config: config,
                                sessionUID: sessionUID,
                                callbacks: {
                                    onInit: function() {
                                        detectAppSwitch();
                                        return _onInit();
                                    },
                                    onApprove: function(_ref3) {
                                        var data = _ref3.data;
                                        detectAppSwitch();
                                        return _onApprove({
                                            data: data
                                        });
                                    },
                                    onCancel: function() {
                                        detectAppSwitch();
                                        return _onCancel();
                                    },
                                    onShippingChange: function(_ref4) {
                                        var data = _ref4.data;
                                        detectAppSwitch();
                                        return _onShippingChange({
                                            data: data
                                        });
                                    },
                                    onError: function(_ref5) {
                                        var data = _ref5.data;
                                        appSwitchError(new Error(data.message));
                                        return _onError({
                                            data: data
                                        });
                                    },
                                    onFallback: function(_ref6) {
                                        var data = _ref6.data;
                                        detectAppSwitch();
                                        return _onFallback({
                                            win: nativePopupWin,
                                            optOut: data
                                        });
                                    }
                                }
                            });
                            clean.register(connection.cancel);
                        })).catch(reject);
                    }));
                    var detectWebSwitch = once((function() {
                        return promise_ZalgoPromise.try((function() {
                            var _getLogger$info$track7;
                            getStorageState((function(state) {
                                var _state$lastAppSwitchT2 = state.lastAppSwitchTime, lastAppSwitchTime = void 0 === _state$lastAppSwitchT2 ? 0 : _state$lastAppSwitchT2, _state$lastWebSwitchT2 = state.lastWebSwitchTime, lastWebSwitchTime = void 0 === _state$lastWebSwitchT2 ? 0 : _state$lastWebSwitchT2;
                                lastAppSwitchTime > lastWebSwitchTime && getLogger().info("web_switch_detect_with_previous_app_switch", {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                                lastWebSwitchTime > lastAppSwitchTime && getLogger().info("web_switch_detect_with_previous_web_switch", {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                                lastAppSwitchTime || lastWebSwitchTime || getLogger().info("web_switch_detect_with_no_previous_switch", {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                                state.lastWebSwitchTime = Date.now();
                            }));
                            getLogger().info("native_detect_web_switch").track((_getLogger$info$track7 = {}, 
                            _getLogger$info$track7.transition_name = "native_detect_web_switch", _getLogger$info$track7)).flush();
                            return _onFallback({
                                win: nativePopupWin
                            }).then(belter_src_util_noop);
                        })).then(resolve, reject);
                    }));
                    var closeListener = onCloseWindow(nativePopupWin, (function() {
                        var _getLogger$info$track8;
                        getLogger().info("native_popup_closed").track((_getLogger$info$track8 = {}, _getLogger$info$track8.state_name = "smart_button", 
                        _getLogger$info$track8.transition_name = "popup_closed", _getLogger$info$track8)).flush();
                        appSwitchError(new Error("Native popup closed"));
                        onClose();
                    }), 500);
                    var closePopup = function(event) {
                        var _getLogger$info$track9;
                        getLogger().info("native_closing_popup_" + event).track((_getLogger$info$track9 = {}, 
                        _getLogger$info$track9.state_name = "smart_button", _getLogger$info$track9.transition_name = event ? "native_closing_popup_" + event : "native_closing_popup", 
                        _getLogger$info$track9)).flush();
                        closeListener.cancel();
                        nativePopupWin.close();
                    };
                    var awaitRedirectListener = onPostMessage(nativePopupWin, nativePopupDomain, "awaitRedirect", (function(_ref7) {
                        var _ref7$data = _ref7.data, appDetect = _ref7$data.app, pageUrl = _ref7$data.pageUrl, sfvc = _ref7$data.sfvc, stickinessID = _ref7$data.stickinessID;
                        clearTimeout(redirectListenerTimeout);
                        getLogger().info("native_post_message_await_redirect").flush();
                        (app = appDetect) && Object.keys(app).forEach((function(key) {
                            var _getLogger$info, _getLogger$info$track;
                            getLogger().info("native_app_" + (app.installed ? "installed" : "not_installed") + "_" + key, (_getLogger$info = {}, 
                            _getLogger$info[key] = app[key], _getLogger$info)).track((_getLogger$info$track = {}, 
                            _getLogger$info$track.state_name = "smart_button", _getLogger$info$track.transition_name = "native_app_installed", 
                            _getLogger$info$track.info_msg = "native_app_" + (app.installed ? "installed" : "not_installed") + "_" + key + ": " + app[key].toString(), 
                            _getLogger$info$track)).flush();
                        }));
                        var app;
                        getLogger().addTrackingBuilder((function() {
                            var _ref8;
                            return (_ref8 = {}).stickiness_id = stickinessID, _ref8;
                        }));
                        return promise_ZalgoPromise.hash({
                            valid: validatePromise,
                            eligible: popup_getEligibility({
                                fundingSource: fundingSource,
                                props: props,
                                serviceData: serviceData,
                                sfvc: sfvc,
                                validatePromise: validatePromise,
                                stickinessID: stickinessID,
                                appDetect: appDetect
                            })
                        }).then((function(_ref9) {
                            var eligible = _ref9.eligible;
                            if (!_ref9.valid) {
                                closeListener.cancel();
                                nativePopupWin.close();
                                return onDestroy().then((function() {
                                    return {
                                        appSwitch: !1,
                                        orderID: null,
                                        redirect: !1
                                    };
                                }));
                            }
                            return orderPromise.then(eligible ? function(orderID) {
                                var _getLogger$info$track10;
                                var nativeUrl = getNativeUrl({
                                    props: props,
                                    serviceData: serviceData,
                                    config: config,
                                    fundingSource: fundingSource,
                                    sessionUID: sessionUID,
                                    pageUrl: pageUrl,
                                    orderID: orderID,
                                    stickinessID: stickinessID
                                });
                                getLogger().info("native_attempt_appswitch_url_popup", {
                                    url: nativeUrl
                                }).track((_getLogger$info$track10 = {}, _getLogger$info$track10.state_name = "smart_button", 
                                _getLogger$info$track10.transition_name = "app_switch_attempted", _getLogger$info$track10.info_msg = nativeUrl, 
                                _getLogger$info$track10)).flush();
                                if (isAndroidChrome()) {
                                    closeListener.cancel();
                                    var appSwitchCloseListener = onCloseWindow(nativePopupWin, (function() {
                                        return detectPossibleAppSwitch();
                                    }), 50);
                                    setTimeout(appSwitchCloseListener.cancel, 1e3);
                                }
                                return {
                                    appSwitch: !0,
                                    orderID: orderID,
                                    redirect: !0,
                                    redirectUrl: nativeUrl
                                };
                            } : function(orderID) {
                                return {
                                    redirect: !0,
                                    appSwitch: !1,
                                    orderID: orderID,
                                    redirectUrl: getNativeFallbackUrl({
                                        props: props,
                                        serviceData: serviceData,
                                        config: config,
                                        fundingSource: fundingSource,
                                        sessionUID: sessionUID,
                                        pageUrl: pageUrl,
                                        orderID: orderID,
                                        stickinessID: stickinessID
                                    })
                                };
                            });
                        })).catch((function(err) {
                            var _getLogger$info$track11;
                            getLogger().info("native_attempt_appswitch_url_popup_errored").track((_getLogger$info$track11 = {}, 
                            _getLogger$info$track11.state_name = "smart_button", _getLogger$info$track11.transition_name = "app_switch_attempted_errored", 
                            _getLogger$info$track11.int_error_desc = stringifyError(err), _getLogger$info$track11)).flush();
                            return orderPromise.then((function(orderID) {
                                return {
                                    appSwitch: !1,
                                    orderID: orderID,
                                    redirect: !0,
                                    redirectUrl: getNativeFallbackUrl({
                                        props: props,
                                        serviceData: serviceData,
                                        config: config,
                                        fundingSource: fundingSource,
                                        sessionUID: sessionUID,
                                        pageUrl: pageUrl,
                                        orderID: orderID,
                                        stickinessID: stickinessID
                                    })
                                };
                            }));
                        })).catch((function(err) {
                            nativePopupWin.close();
                            appSwitchError(err);
                            return onDestroy().then((function() {
                                return _onError({
                                    data: {
                                        message: stringifyError(err)
                                    }
                                });
                            })).then((function() {
                                return {
                                    redirect: !1,
                                    appSwitch: !1
                                };
                            }));
                        }));
                    }));
                    var detectPossibleAppSwitchListener = onPostMessage(nativePopupWin, nativePopupDomain, "detectAppSwitch", (function() {
                        getLogger().info("native_post_message_detect_possible_app_switch").flush();
                        return detectPossibleAppSwitch();
                    }));
                    var detectWebSwitchListener = onPostMessage(nativePopupWin, getNativeDomain({
                        props: props
                    }), "detectWebSwitch", (function() {
                        getLogger().info("native_post_message_detect_web_switch").flush();
                        return detectWebSwitch({
                            win: nativePopupWin
                        });
                    }));
                    var onApproveListener = onPostMessage(nativePopupWin, nativePopupDomain, "onApprove", (function(data) {
                        detectAppSwitch();
                        _onApprove(data);
                        closePopup("onApprove");
                    }));
                    var onCancelListener = onPostMessage(nativePopupWin, nativePopupDomain, "onCancel", (function() {
                        detectAppSwitch();
                        _onCancel();
                        closePopup("onCancel");
                    }));
                    var onFallbackListener = onPostMessage(nativePopupWin, nativePopupDomain, "onFallback", (function(_ref10) {
                        var _getLogger$info$track12;
                        var data = _ref10.data;
                        getLogger().info("native_message_onfallback").track((_getLogger$info$track12 = {}, 
                        _getLogger$info$track12.transition_name = "native_onfallback", _getLogger$info$track12)).flush();
                        _onFallback({
                            win: nativePopupWin,
                            optOut: data
                        });
                    }));
                    var onCompleteListener = onPostMessage(nativePopupWin, nativePopupDomain, "onComplete", (function() {
                        var _getLogger$info$track13;
                        detectAppSwitch();
                        getLogger().info("native_post_message_on_complete").track((_getLogger$info$track13 = {}, 
                        _getLogger$info$track13.state_name = "smart_button", _getLogger$info$track13.transition_name = "native_oncomplete", 
                        _getLogger$info$track13)).flush();
                        closePopup("onComplete");
                    }));
                    var onErrorListener = onPostMessage(nativePopupWin, nativePopupDomain, "onError", (function(data) {
                        _onError(data);
                        closePopup("onError");
                        appSwitchError(new Error(data.message));
                    }));
                    window.addEventListener("pagehide", (function() {
                        return closePopup("pagehide");
                    }));
                    window.addEventListener("unload", (function() {
                        return closePopup("unload");
                    }));
                    clean.register((function() {
                        return promise_ZalgoPromise.all([ awaitRedirectListener.cancel, detectPossibleAppSwitchListener.cancel, onApproveListener.cancel, onCancelListener.cancel, onFallbackListener.cancel, onCompleteListener.cancel, onErrorListener.cancel, detectWebSwitchListener.cancel, closeListener.cancel ]).then(belter_src_util_noop);
                    }));
                }));
            },
            start: function() {
                if (!nativePopupPromise) throw new Error("Expected native popup promise to be set");
                return nativePopupPromise;
            }
        };
    }
    var native_clean;
    var native_native_isEligible = function(_ref6) {
        var props = _ref6.props;
        var clientID = props.clientID, fundingSource = props.fundingSource, onShippingChange = props.onShippingChange, createBillingAgreement = props.createBillingAgreement, createSubscription = props.createSubscription, env = props.env;
        var firebaseConfig = _ref6.config.firebase;
        var merchantID = _ref6.serviceData.merchantID;
        return !(!canUsePopupAppSwitch({
            fundingSource: fundingSource
        }) && !canUseNativeQRCode({
            fundingSource: fundingSource
        }) || onShippingChange && !isNativeOptedIn({
            props: props
        }) || createBillingAgreement || createSubscription || !supportsPopups() || !firebaseConfig || function() {
            var now = Date.now();
            var optOutLifetime = 0;
            getStorageState((function(state) {
                var nativeOptOutLifetime = state.nativeOptOutLifetime;
                nativeOptOutLifetime && "number" == typeof nativeOptOutLifetime && (optOutLifetime = nativeOptOutLifetime);
            }));
            return optOutLifetime > now;
        }() || !isNativeOptedIn({
            props: props
        }) && ("local" === env || "stage" === env || merchantID.length > 1 || -1 !== LSAT_UPGRADE_EXCLUDED_MERCHANTS.indexOf(clientID)));
    };
    function querySupplementalData(orderID) {
        return callGraphQL("\n            query SupplementalData(\n                $orderID: String!\n            ) {\n                checkoutSession(token: $orderID) {\n                    cart {\n                        intent\n                        paymentId\n                        billingToken\n                        cancelUrl {\n                            href\n                        },\n                        returnUrl {\n                            href\n                        }\n                    }\n                }\n            }\n        ", {
            orderID: orderID
        }).then((function(res) {
            var cart = res.data.checkoutSession.cart;
            var intent = cart.intent ? cart.intent.toLowerCase() : "";
            return {
                orderID: orderID,
                paymentID: cart.paymentId,
                intent: intent,
                billingToken: cart.billingToken,
                returnUrl: cart.returnUrl && cart.returnUrl.href,
                cancelUrl: cart.cancelUrl && cart.cancelUrl.href
            };
        }));
    }
    __webpack_require__(5);
    var hasClientID = function() {
        var clientID = window.xprops.client && window.xprops.client[window.xprops.env];
        return clientID && "string" == typeof clientID && clientID.length >= 20;
    };
    var buttonEnabled = !0;
    function clickButton(event, _ref) {
        var _ref$fundingSource = _ref.fundingSource, fundingSource = void 0 === _ref$fundingSource ? "paypal" : _ref$fundingSource, card = _ref.card;
        event.preventDefault();
        event.stopPropagation();
        window.xprops.onClick && window.xprops.onClick({
            fundingSource: fundingSource,
            card: card,
            flow: "checkout",
            button_version: "4.0.47"
        });
        if (buttonEnabled) {
            var buttonEl = event.currentTarget;
            var buttonSize = buttonEl.getAttribute("data-size");
            var buttonLayout = buttonEl.getAttribute("data-layout");
            if (!function(buttonEl, buttonsContainer) {
                var hasCallbackAPI = window.xprops && window.xprops.onShippingChange;
                if (!buttonEl || !buttonsContainer || !buttonEl || !buttonEl.getAttribute || hasCallbackAPI) return !1;
                var isSPBWideEnoughForInlineGuest = buttonsContainer && buttonsContainer.scrollWidth >= 250;
                var buttonLayout = buttonEl ? buttonEl.getAttribute("data-layout") : "";
                return !(!isSPBWideEnoughForInlineGuest || "vertical" !== buttonLayout || !inlineGuestEligibility_inlineGuestPXPEnabled() && !isZomboCookieEnabled());
            }(buttonEl, document.getElementById("paypal-animation-container"))) return renderCheckout({
                fundingSource: fundingSource
            });
            if (card || "card" === fundingSource) {
                if ("cup" === card) {
                    onEvent_onEvent({
                        type: "CARD_FORM_COLLAPSE"
                    });
                    onEvent_onEvent({
                        type: "CARD_FORM_CLEAR"
                    });
                    onEvent_onEvent({
                        type: "BUTTONS_RESET"
                    });
                    return renderCheckout({
                        fundingSource: fundingSource
                    });
                }
                var _getState = state_getState(), currentCardType = _getState.currentCardType, isZomboRendered = _getState.isZomboRendered;
                if (!card) return;
                if (function() {
                    if (window.xprops.zomboStore && window.xprops.zomboStore.getState) {
                        var store = window.xprops.zomboStore.getState();
                        return get_get(store, "app.isLoading", !1);
                    }
                    return !1;
                }()) return;
                if (currentCardType !== card) {
                    onEvent_changeCardTypeTo(card);
                    !currentCardType && onEvent_expand();
                    onEvent_dispatch(clearFormAction);
                }
                if (isZomboRendered) return;
                return window.xprops.payment({
                    button_version: "4.0.47"
                }).then((function(paymentToken) {
                    return function promiseRetry(promiseFactory, time) {
                        void 0 === time && (time = 3);
                        return promiseFactory().then((function(result) {
                            return result;
                        }), (function(error) {
                            if (0 === time) throw error;
                            return promiseRetry(promiseFactory, time - 1);
                        }));
                    }((function() {
                        return function(_ref) {
                            var graphqlEndpoint = window.__GRAPHQL_ENDPOINT__ || "https://www.paypal.com/graphql";
                            return fetch(graphqlEndpoint, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    operation: "GuestFlowCheck",
                                    query: 'query GuestFlowCheck { checkoutSession( token: "' + _ref.token + '" ) { flags { isHostedFieldsAllowed isGuestEligible }}}',
                                    variables: null
                                })
                            }).then((function(res) {
                                return res.json();
                            })).catch((function(err) {
                                throw err;
                            }));
                        }({
                            token: paymentToken
                        });
                    })).then((function(res) {
                        return get_get(res, "data.checkoutSession.flags", {});
                    })).then((function(_ref2) {
                        var isHostedFieldsAllowed = _ref2.isHostedFieldsAllowed;
                        logger_track({
                            state_name: "checkoutjs_inline_guest",
                            transition_name: "process_checking_inline_guest_eligibility",
                            inline_guest_enabled: isHostedFieldsAllowed ? 1 : 0
                        });
                        logger_info("inline_guest_eligibility", JSON.stringify({
                            inlineGuestEnable: isHostedFieldsAllowed,
                            isInlneGuestCookied: isZomboCookieEnabled,
                            spbLayout: buttonLayout,
                            spbSize: buttonSize,
                            inlineGuestPXP: inlineGuestEligibility_inlineGuestPXPEnabled()
                        }));
                        logger_flush();
                        var state = state_getState();
                        if (isHostedFieldsAllowed) {
                            if (!state.isZomboRendered) {
                                state_setState({
                                    isZomboRendered: !0
                                });
                                var treatments = get_get(window.pre, "inlineGuest.res.data.treatments") || [];
                                logger_track({
                                    state_name: "checkoutjs_inline_guest",
                                    transition_name: "process_pxp_checkoutjs_inline_guest",
                                    pxp_trtmnt_id: treatments.map((function(t) {
                                        return t.treatment_id;
                                    })).join(":"),
                                    pxp_exp_id: treatments.map((function(t) {
                                        return t.experiment_id;
                                    })).join(":")
                                });
                                logger_info("inline_guest_checkoutjs_render_inline_guest");
                                logger_flush();
                                return function(_temp) {
                                    var _ref = void 0 === _temp ? {} : _temp, token = _ref.token, otherProps = function(source, excluded) {
                                        if (null == source) return {};
                                        var target = {};
                                        var sourceKeys = Object.keys(source);
                                        var key, i;
                                        for (i = 0; i < sourceKeys.length; i++) excluded.indexOf(key = sourceKeys[i]) >= 0 || (target[key] = source[key]);
                                        return target;
                                    }(_ref, _excluded);
                                    var zomboEl = document.getElementById("cardExp");
                                    zomboEl.innerHTML = "";
                                    zomboEl.className = "cardExpOpened";
                                    UPDATE_CLIENT_CONFIGURATION && updateClientConfig({
                                        paymentToken: token,
                                        fundingSource: "card",
                                        integrationArtifact: "JS_V4",
                                        userExperienceFlow: "INLINE",
                                        productFlow: "SMART_PAYMENT_BUTTONS"
                                    });
                                    return window.paypal.Card.render(_extends({
                                        token: token,
                                        locale: window.xprops.locale,
                                        commit: window.xprops.commit,
                                        onAuthorize: function(data, actions) {
                                            var newActions = function(checkout, data, actions) {
                                                var handlePaymentExecuteError = function(err) {
                                                    var errorMessage = get_get(err, "message");
                                                    var wasCardDeclined = "CC_PROCESSOR_DECLINED" === errorMessage || "INSTRUMENT_DECLINED" === errorMessage;
                                                    onEvent_expand();
                                                    return renderGoToXoon({
                                                        paymentToken: data.paymentID,
                                                        wasCardDeclined: wasCardDeclined
                                                    });
                                                };
                                                var handleOrderExecuteError = function(err) {
                                                    var errorMessage = get_get(err, "message");
                                                    var wasCardDeclined = "CC_PROCESSOR_DECLINED" === errorMessage || "INSTRUMENT_DECLINED" === errorMessage;
                                                    onEvent_expand();
                                                    return renderGoToXoon({
                                                        paymentToken: data.paymentID,
                                                        wasCardDeclined: wasCardDeclined
                                                    });
                                                };
                                                var paymentGet = memoize((function() {
                                                    if (!data.paymentID) throw new Error("Client side payment get is only available for REST based transactions");
                                                    return getPayment(data.paymentID, data.orderID);
                                                }));
                                                var paymentExecute = memoize((function() {
                                                    if (!data.paymentID) throw new Error("Client side payment execute is only available for REST based transactions");
                                                    return executePayment(data.paymentID, data.payerID, data.orderID).catch(handlePaymentExecuteError).finally(paymentGet.reset);
                                                }));
                                                var orderGet = memoize((function() {
                                                    if (!data.orderID) throw new Error("Client side order get is only available for REST based transactions");
                                                    return getOrder(data.orderID);
                                                }));
                                                var orderCapture = memoize((function() {
                                                    if (!data.orderID) throw new Error("Client side order capture is only available for REST based transactions");
                                                    checkout.closeComponent();
                                                    return captureOrder(data.orderID).catch(handleOrderExecuteError).finally(orderGet.reset);
                                                }));
                                                return _extends({}, actions, {
                                                    payment: {
                                                        execute: paymentExecute,
                                                        get: paymentGet
                                                    },
                                                    order: {
                                                        capture: orderCapture,
                                                        get: orderGet
                                                    }
                                                });
                                            }(this, data, actions);
                                            return window.xprops.onAuthorize(data, newActions).catch((function(err) {
                                                return window.xchild.error(err);
                                            }));
                                        },
                                        onCancel: function(data) {
                                            return window.xprops.onCancel(data, {});
                                        },
                                        onAuth: function(_ref2) {
                                            return persistAccessToken(_ref2.accessToken);
                                        },
                                        onError: window.xchild.error
                                    }, otherProps), zomboEl);
                                }({
                                    token: paymentToken,
                                    card: card,
                                    onEvent: onEvent_onEvent,
                                    getState: state_getState
                                });
                            }
                        } else {
                            logger_info("inline_guest_checkoutjs_render_go_to_xoon_button");
                            renderGoToXoon({
                                paymentToken: paymentToken
                            });
                        }
                    }));
                })).catch((function(err) {
                    onEvent_onEvent({
                        type: "CARD_FORM_COLLAPSE"
                    });
                    onEvent_onEvent({
                        type: "CARD_FORM_CLEAR"
                    });
                    onEvent_onEvent({
                        type: "BUTTONS_RESET"
                    });
                    logger_error("inline_guest_buttonjs_init_error", {
                        err: err.stack ? err.stack : err.toString()
                    });
                    window.xprops.onError(err);
                }));
            }
            return renderCheckout({
                fundingSource: fundingSource
            });
        }
    }
    function setupButton(buttonOpts) {
        if (!window.name || 0 !== window.name.indexOf("__prerender")) {
            !function(isEnabled) {
                var _window$xprops = window.xprops, payment = _window$xprops.payment, onError = _window$xprops.onError, commit = _window$xprops.commit, onClick = _window$xprops.onClick, fundingSource = _window$xprops.fundingSource;
                var _window$xprops2 = window.xprops, onAuthorize = _window$xprops2.onAuthorize, _onCancel = _window$xprops2.onCancel, _onShippingChange = _window$xprops2.onShippingChange;
                var fundingSourcesList = document.querySelectorAll("[data-funding-source]");
                var fundingSources = [].slice.call(fundingSourcesList).map((function(el) {
                    return el.getAttribute("data-funding-source");
                })).filter(Boolean);
                var facilitatorAccessTokenPromise = (clientID = window.xprops.client && window.xprops.client[window.xprops.env]) ? createAccessToken(clientID) : window.paypal.Promise.resolve();
                var clientID;
                facilitatorAccessTokenPromise.then((function(facilitatorAccessToken) {
                    !function(facilitatorAccessToken) {
                        "string" == typeof facilitatorAccessToken && (lastFacilitatorAccessToken = facilitatorAccessToken);
                    }(facilitatorAccessToken);
                }));
                window.exports = {
                    name: "smart-payment-buttons",
                    commit: commit,
                    hasClientID: hasClientID,
                    isGuestEnabled: function(merchantID) {
                        return function(merchantID) {
                            try {
                                return callGraphQL("\n            query GetFundingEligibility(\n                $merchantID:[ String ]\n            ) {\n            fundingEligibility(\n                merchantId: $merchantID\n            ) {\n                card {\n                    guestEnabled\n                }\n            }\n          }\n        ", {
                                    merchantID: merchantID
                                }).then((function(gqlResult) {
                                    if (!gqlResult || !gqlResult.data || !gqlResult.data.fundingEligibility) throw new Error("GraphQL fundingEligibility returned no fundingEligibility object");
                                    return gqlResult && gqlResult.data && gqlResult.data.fundingEligibility && gqlResult.data.fundingEligibility.card && gqlResult.data.fundingEligibility.card.guestEnabled;
                                }));
                            } catch (err) {
                                var stringifiedError = stringifyError(err);
                                logger_error("buttonjs_exports_guest_query_error", {
                                    err: stringifiedError
                                });
                                return promise_ZalgoPromise.reject();
                            }
                        }(merchantID);
                    },
                    isShippingChangeEnabled: function() {
                        return "function" == typeof _onShippingChange;
                    },
                    paymentSession: function() {
                        return {
                            getAvailableFundingSources: function() {
                                return fundingSources;
                            },
                            createOrder: function() {
                                if (!buttonEnabled) throw new Error("Error occurred. Button not enabled.");
                                return promise_ZalgoPromise.hash({
                                    valid: !onClick || !fundingSource || onClick({
                                        fundingSource: fundingSource
                                    })
                                }).then((function(_ref) {
                                    if (_ref.valid) {
                                        var _buildCheckoutProps = buildCheckoutProps({
                                            fundingSource: fundingSource,
                                            facilitatorAccessTokenPromise: facilitatorAccessTokenPromise
                                        });
                                        onAuthorize = _buildCheckoutProps.onAuthorize;
                                        _onCancel = _buildCheckoutProps.onCancel;
                                        _onShippingChange = _buildCheckoutProps.onShippingChange;
                                        return payment().then(normalizeECToken);
                                    }
                                    throw new Error("Error occurred during async validation");
                                }));
                            },
                            onApprove: function(_ref2) {
                                var payerID = _ref2.payerID, billingToken = _ref2.billingToken, paymentToken = _ref2.orderID, forceRestAPI = _ref2.forceRestAPI;
                                if (!paymentToken) throw new Error("Missing orderID. Unable to retrieve payment data");
                                return querySupplementalData(paymentToken).then((function(_ref3) {
                                    var orderID = _ref3.orderID, paymentID = _ref3.paymentID, intent = _ref3.intent, returnUrl = _ref3.returnUrl;
                                    var urlParams = {};
                                    -1 === (returnUrl = returnUrl || "https://www.paypal.com/checkoutnow/error?token=" + orderID).indexOf("paymentId") && paymentID && (urlParams.paymentId = paymentID);
                                    -1 === returnUrl.indexOf("PayerID") && payerID && (urlParams.PayerID = payerID);
                                    -1 === returnUrl.indexOf("ba_token") && billingToken && (urlParams.ba_token = billingToken);
                                    var completeReturnUrl = $util.buildURL(returnUrl, urlParams);
                                    return onAuthorize({
                                        payerID: payerID,
                                        billingToken: billingToken,
                                        orderID: orderID,
                                        paymentID: paymentID,
                                        intent: intent,
                                        paymentToken: paymentToken,
                                        returnUrl: completeReturnUrl,
                                        forceRestAPI: forceRestAPI
                                    }, {
                                        close: function() {
                                            return window.paypal.Promise.try(belter_src_util_noop);
                                        }
                                    });
                                }));
                            },
                            onCancel: function(_ref4) {
                                var paymentToken = _ref4.orderID;
                                var actions = {
                                    close: function() {
                                        return window.paypal.Promise.try(belter_src_util_noop);
                                    }
                                };
                                return paymentToken ? querySupplementalData(paymentToken).then((function(_ref5) {
                                    var orderID = _ref5.orderID, cancelUrl = _ref5.cancelUrl;
                                    return _onCancel({
                                        orderID: orderID,
                                        billingToken: _ref5.billingToken,
                                        paymentID: _ref5.paymentID,
                                        intent: _ref5.intent,
                                        paymentToken: paymentToken,
                                        cancelUrl: cancelUrl = cancelUrl || "https://www.paypal.com/checkoutnow/error?token=" + orderID
                                    }, actions);
                                })) : _onCancel({
                                    paymentToken: paymentToken
                                }, actions);
                            },
                            onError: onError,
                            onShippingChange: function(data) {
                                if (_onShippingChange) return _onShippingChange(data, {
                                    resolve: function() {
                                        throw new Error("Action unimplemented");
                                    },
                                    reject: function() {
                                        throw new Error("Action unimplemented");
                                    }
                                });
                            },
                            getFacilitatorAccessToken: function() {
                                return facilitatorAccessTokenPromise;
                            }
                        };
                    }
                };
            }();
            $promise.use(window.paypal.Promise);
            !function() {
                var inlineGuestTreatment = (preloadData = window.pre, (get_get(preloadData, "inlineGuest.res.data.treatments") || []).reduce((function(value, treatment) {
                    return treatment && "xo_hermesnodeweb_inline_guest_treatment" === treatment.treatment_name ? treatment : value;
                }), void 0));
                var preloadData;
                if (inlineGuestTreatment) {
                    var trackingPayload = {
                        pxp_exp_id: get_get(inlineGuestTreatment, "experiment_id"),
                        pxp_trtmnt_id: get_get(inlineGuestTreatment, "treatment_id"),
                        state_name: "PXP_CHECK"
                    };
                    logger_track(trackingPayload);
                    logger_flush();
                }
            }();
            querySelectorAll("#paypal-other-options").forEach((function(button) {
                attachClickEvent_attachClickEventToElement(button, (function() {
                    onEvent_onEvent({
                        type: "CARD_FORM_COLLAPSE"
                    });
                    onEvent_onEvent({
                        type: "CARD_FORM_CLEAR"
                    });
                    onEvent_onEvent({
                        type: "BUTTONS_RESET"
                    });
                }));
            }));
            var _ref3 = buttonOpts || {}, _ref3$cookies = _ref3.cookies;
            var native = (correlationID = (_ref2 = {
                correlationID: _ref3.correlationID,
                firebaseConfig: _ref3.firebaseConfig,
                buyerCountry: _ref3.buyerCountry,
                cookies: void 0 === _ref3$cookies ? "" : _ref3$cookies,
                sdkMeta: _ref3.sdkMeta
            }).correlationID, firebaseConfig = _ref2.firebaseConfig, buyerCountry = _ref2.buyerCountry, 
            cookies = _ref2.cookies, sdkMeta = _ref2.sdkMeta, NotImplementedFunction = function() {
                return null;
            }, locale = window.xprops.locale || "en_US", env = window.xprops.env, clientID = function(env) {
                var clientID = window.xprops.client && window.xprops.client[env];
                if (!clientID || "string" != typeof clientID || clientID.length < 20) return null;
                try {
                    if (JSON.parse(atob(clientID))) return null;
                } catch (err) {}
                return clientID;
            }(env), storageID = window.xprops.storageID, stickinessID = storageID && isStorageStateFresh() ? storageID : getStorageID(), 
            props = {
                env: env,
                vault: !1,
                commit: window.xprops.commit,
                locale: {
                    country: locale.split("_")[1],
                    lang: locale.split("_")[0]
                },
                platform: isDevice() ? "mobile" : "desktop",
                sessionID: window.xprops.sessionID,
                buttonSessionID: window.xprops.buttonSessionID,
                clientID: clientID || null,
                partnerAttributionID: null,
                sdkCorrelationID: correlationID || "",
                clientAccessToken: null,
                getPopupBridge: NotImplementedFunction,
                getPrerenderDetails: NotImplementedFunction,
                getPageUrl: window.xprops.getPageUrl,
                enableThreeDomainSecure: !1,
                enableNativeCheckout: window.xprops.enableNativeCheckout,
                rememberFunding: NotImplementedFunction,
                onError: window.xprops.onError || NotImplementedFunction,
                stageHost: null,
                apiStageHost: null,
                style: window.xprops.style || {},
                getParent: function() {
                    return window.parent;
                },
                currency: null,
                merchantDomain: window.xchild.getParentDomain(),
                onClick: null,
                onInit: null,
                userExperienceFlow: null,
                createOrder: function() {
                    return window.xprops.payment({
                        button_version: "4.0.47"
                    }).then(normalizeECToken);
                },
                createBillingAgreement: null,
                createSubscription: null,
                onApprove: NotImplementedFunction,
                onCancel: window.xprops.onCancel,
                onShippingChange: window.xprops.onShippingChange,
                intent: null,
                amount: null,
                clientMetadataID: null,
                connect: null,
                disableFunding: window.xprops.funding && window.xprops.funding.disallowed ? window.xprops.funding.disallowed : [],
                disableCard: [],
                enableVaultInstallments: !1,
                fundingSource: null,
                getQueriedEligibleFunding: function() {
                    return window.paypal.Promise.resolve([]);
                },
                enableFunding: window.xprops.funding && window.xprops.funding.allowed ? window.xprops.funding.allowed : [],
                onAuth: function() {
                    return window.paypal.Promise.resolve();
                },
                standaloneFundingSource: null,
                uid: "unknown",
                userIDToken: null,
                stickinessID: stickinessID,
                branded: !0,
                paymentMethodToken: null,
                wallet: null,
                applePay: null
            }, config = {
                sdkVersion: window.paypal.version,
                cspNonce: "",
                firebase: firebaseConfig
            }, getFacilitatorAccessToken = memoize((function() {
                return props.clientID ? createAccessToken(props.clientID) : window.paypal.Promise.resolve("");
            })), getServiceData = memoize((function() {
                return window.paypal.Promise.hash({
                    facilitatorAccessToken: getFacilitatorAccessToken()
                }).then((function(_ref3) {
                    return {
                        fundingEligibility: null,
                        wallet: null,
                        merchantID: [],
                        buyerCountry: buyerCountry,
                        eligibility: {
                            cardForm: !1
                        },
                        facilitatorAccessToken: _ref3.facilitatorAccessToken,
                        sdkMeta: sdkMeta,
                        buyerAccessToken: null,
                        content: {},
                        cookies: cookies,
                        personalization: {}
                    };
                }));
            })), getComponents = function(_temp) {
                var createOrder = (void 0 === _temp ? {} : _temp).createOrder;
                var Checkout = function(_ref5) {
                    var win = _ref5.window, fundingSource = _ref5.fundingSource;
                    var checkoutInstance;
                    var actualWin = win && function(win) {
                        if (isWindow(win)) return win;
                        throw new Error("Object is not window");
                    }(win);
                    return {
                        renderTo: function() {
                            return renderCheckout({
                                fundingSource: fundingSource,
                                win: actualWin,
                                payment: createOrder
                            }).then((function(instance) {
                                checkoutInstance = instance;
                            }));
                        },
                        close: function() {
                            return window.paypal.Promise.try((function() {
                                if (checkoutInstance && checkoutInstance.close) return checkoutInstance.close();
                            }));
                        },
                        onError: function(err) {
                            throw err;
                        },
                        onClose: function() {
                            return window.paypal.Promise.resolve();
                        },
                        render: function() {
                            throw new Error("Render not implemented");
                        },
                        show: function() {
                            return window.paypal.Promise.resolve();
                        },
                        hide: function() {
                            return window.paypal.Promise.resolve();
                        },
                        updateProps: function() {
                            return window.paypal.Promise.resolve();
                        }
                    };
                };
                Checkout.canRenderTo = function() {
                    return window.paypal.Promise.resolve(!0);
                };
                return {
                    Checkout: Checkout,
                    CardForm: null,
                    ThreeDomainSecure: null,
                    Menu: null,
                    Installments: null,
                    QRCode: null
                };
            }, {
                setup: function() {
                    return getServiceData().then((function(serviceData) {
                        var components = getComponents();
                        if (native_native_isEligible({
                            props: props,
                            config: config,
                            serviceData: serviceData
                        })) {
                            !function(_ref) {
                                var env = _ref.env, sessionID = _ref.sessionID, buttonSessionID = _ref.buttonSessionID, clientID = _ref.clientID, partnerAttributionID = _ref.partnerAttributionID, commit = _ref.commit, sdkCorrelationID = _ref.sdkCorrelationID, buttonCorrelationID = _ref.buttonCorrelationID, locale = _ref.locale, merchantID = _ref.merchantID, merchantDomain = _ref.merchantDomain, sdkVersion = _ref.sdkVersion, style = _ref.style, fundingSource = _ref.fundingSource, getQueriedEligibleFunding = _ref.getQueriedEligibleFunding, stickinessID = _ref.stickinessID, buyerCountry = _ref.buyerCountry, onShippingChange = _ref.onShippingChange;
                                var logger = getLogger();
                                !function(_ref2) {
                                    var env = _ref2.env, sessionID = _ref2.sessionID, clientID = _ref2.clientID, sdkCorrelationID = _ref2.sdkCorrelationID, buyerCountry = _ref2.buyerCountry, locale = _ref2.locale, sdkVersion = _ref2.sdkVersion, fundingSource = _ref2.fundingSource;
                                    var logger = getLogger();
                                    logger.addPayloadBuilder((function() {
                                        return {
                                            referer: window.location.host,
                                            sdkCorrelationID: sdkCorrelationID,
                                            sessionID: sessionID,
                                            clientID: clientID,
                                            env: env
                                        };
                                    }));
                                    logger.addTrackingBuilder((function() {
                                        var _ref3;
                                        var lang = locale.lang, country = locale.country;
                                        return (_ref3 = {}).feed_name = "payments_sdk", _ref3.serverside_data_source = "checkout", 
                                        _ref3.client_id = clientID, _ref3.page_session_id = sessionID, _ref3.referer_url = window.location.host, 
                                        _ref3.buyer_cntry = buyerCountry, _ref3.locale = lang + "_" + country, _ref3.integration_identifier = clientID, 
                                        _ref3.sdk_environment = isIos() ? "iOS" : isAndroid() ? "android" : null, _ref3.sdk_name = "payments_sdk", 
                                        _ref3.sdk_version = sdkVersion, _ref3.user_agent = window.navigator && window.navigator.userAgent, 
                                        _ref3.context_correlation_id = sdkCorrelationID, _ref3.t = Date.now().toString(), 
                                        _ref3.selected_payment_method = fundingSource, _ref3;
                                    }));
                                    promise_ZalgoPromise.onPossiblyUnhandledException((function(err) {
                                        var _logger$track;
                                        logger.track(((_logger$track = {}).ext_error_code = "payments_sdk_error", _logger$track.ext_error_desc = stringifyErrorMessage(err), 
                                        _logger$track));
                                        logger.error("unhandled_error", {
                                            err: stringifyError(err)
                                        });
                                        logger.flush().catch(belter_src_util_noop);
                                    }));
                                }({
                                    env: env,
                                    sessionID: sessionID,
                                    clientID: clientID,
                                    sdkCorrelationID: sdkCorrelationID,
                                    locale: locale,
                                    sdkVersion: sdkVersion,
                                    buyerCountry: buyerCountry,
                                    fundingSource: fundingSource
                                });
                                logger.addPayloadBuilder((function() {
                                    var _ref2;
                                    return (_ref2 = {
                                        buttonSessionID: buttonSessionID,
                                        buttonCorrelationID: buttonCorrelationID
                                    }).user_id = buttonSessionID, _ref2;
                                }));
                                logger.addTrackingBuilder((function() {
                                    var _ref3;
                                    return (_ref3 = {}).state_name = "smart_button", _ref3.context_type = "button_session_id", 
                                    _ref3.context_id = buttonSessionID, _ref3.button_session_id = buttonSessionID, _ref3.button_version = "4.0.47", 
                                    _ref3.button_correlation_id = buttonCorrelationID, _ref3.stickiness_id = isAndroidChrome() ? stickinessID : null, 
                                    _ref3.bn_code = partnerAttributionID, _ref3.user_action = commit ? "commit" : "continue", 
                                    _ref3.seller_id = merchantID[0], _ref3.merchant_domain = merchantDomain, _ref3.t = Date.now().toString(), 
                                    _ref3.user_id = buttonSessionID, _ref3;
                                }));
                                (function() {
                                    if (window.document.documentMode) try {
                                        var status = window.status;
                                        window.status = "testIntranetMode";
                                        if ("testIntranetMode" === window.status) {
                                            window.status = status;
                                            return !0;
                                        }
                                        return !1;
                                    } catch (err) {
                                        return !1;
                                    }
                                    return !1;
                                })() && logger.warn("button_child_intranet_mode");
                                promise_ZalgoPromise.hash({
                                    pageRenderTime: waitForDocumentReady().then((function() {
                                        var performance = getPerformance();
                                        if (performance) {
                                            var timing = performance.timing;
                                            return timing.connectEnd && timing.domInteractive ? timing.domInteractive - timing.connectEnd : void 0;
                                        }
                                    })),
                                    queriedEligibleFunding: getQueriedEligibleFunding()
                                }).then((function(_ref4) {
                                    var _logger$track;
                                    var pageRenderTime = _ref4.pageRenderTime, queriedEligibleFunding = _ref4.queriedEligibleFunding;
                                    var fundingSources = dom_querySelectorAll("[data-funding-source]").map((function(el) {
                                        return el.getAttribute("data-funding-source");
                                    })).filter(Boolean);
                                    var walletInstruments = dom_querySelectorAll("[data-instrument-type]").map((function(el) {
                                        return el.getAttribute("data-instrument-type");
                                    })).filter(Boolean);
                                    var payNow = dom_querySelectorAll("[data-funding-source]").map((function(el) {
                                        return el.getAttribute("data-pay-now");
                                    })).some(Boolean);
                                    var layout = style.layout, color = style.color, shape = style.shape, label = style.label, _style$tagline = style.tagline, tagline = void 0 === _style$tagline || _style$tagline;
                                    var native_device = "non_native";
                                    isIOSSafari() ? native_device = "ios_safari" : isAndroidChrome() && (native_device = "android_chrome");
                                    logger.info("button_render");
                                    logger.info("button_render_template_version_" + (document.body && document.body.getAttribute("data-render-version") || "unknown").replace(/[^a-zA-Z0-9]+/g, "_"));
                                    logger.info("button_render_client_version_" + (document.body && document.body.getAttribute("data-client-version") || "unknown").replace(/[^a-zA-Z0-9]+/g, "_"));
                                    logger.info("button_render_color_" + color);
                                    logger.info("button_render_shape_" + shape);
                                    logger.info("button_render_label_" + label);
                                    logger.info("button_render_layout_" + layout);
                                    logger.info("button_render_tagline_" + tagline.toString());
                                    logger.info("button_render_funding_count_" + fundingSources.length);
                                    logger.info("button_render_wallet_instrument_count_" + walletInstruments.length);
                                    logger.info("button_render_" + native_device + "_storage_state_" + (isStorageStateFresh() ? "fresh" : "not_fresh"));
                                    for (var _i2 = 0; _i2 < walletInstruments.length; _i2++) logger.info("button_render_wallet_instrument_" + walletInstruments[_i2]);
                                    logger.track(((_logger$track = {}).transition_name = "process_button_load", _logger$track.eligible_payment_methods = fundingSources.join(":"), 
                                    _logger$track.fi_list = walletInstruments.join(":"), _logger$track.merchant_selected_funding_source = fundingSource, 
                                    _logger$track.eligible_payment_count = fundingSources.length.toString(), _logger$track.page_load_time = pageRenderTime ? pageRenderTime.toString() : "", 
                                    _logger$track.potential_payment_methods = queriedEligibleFunding.join(":"), _logger$track.pay_now = payNow.toString(), 
                                    _logger$track.button_layout = layout, _logger$track.button_color = color, _logger$track.button_size = "responsive", 
                                    _logger$track.button_shape = shape, _logger$track.button_label = label, _logger$track.button_width = window.innerWidth, 
                                    _logger$track.button_type = "iframe", _logger$track.button_tagline_enabled = tagline ? "1" : "0", 
                                    _logger$track.shipping_callback_passed = onShippingChange ? "1" : "0", _logger$track));
                                    logger.flush();
                                }));
                            }({
                                env: env,
                                sessionID: props.sessionID,
                                buttonSessionID: props.buttonSessionID,
                                clientID: clientID || "unknown",
                                partnerAttributionID: props.partnerAttributionID,
                                commit: props.commit,
                                style: props.style,
                                buttonCorrelationID: correlationID || "unknown",
                                locale: locale,
                                merchantID: [],
                                merchantDomain: props.merchantDomain,
                                sdkVersion: config.sdkVersion,
                                fundingSource: props.fundingSource,
                                getQueriedEligibleFunding: props.getQueriedEligibleFunding,
                                sdkCorrelationID: props.sdkCorrelationID,
                                stickinessID: stickinessID,
                                buyerCountry: buyerCountry,
                                onShippingChange: props.onShippingChange
                            });
                            return function(_ref) {
                                return (_ref3 = {
                                    props: _ref.props,
                                    serviceData: _ref.serviceData
                                }, props = _ref3.props, serviceData = _ref3.serviceData, clientID = props.clientID, 
                                currency = props.currency, env = props.env, buttonSessionID = props.buttonSessionID, 
                                enableFunding = props.enableFunding, merchantDomain = props.merchantDomain, merchantID = serviceData.merchantID, 
                                buyerCountry = serviceData.buyerCountry, cookies = serviceData.cookies, getNativeEligibility({
                                    vault: props.vault,
                                    platform: props.platform,
                                    shippingCallbackEnabled: Boolean(props.onShippingChange),
                                    clientID: clientID,
                                    buyerCountry: buyerCountry,
                                    currency: currency,
                                    buttonSessionID: buttonSessionID,
                                    cookies: cookies,
                                    enableFunding: enableFunding,
                                    stickinessID: null,
                                    skipElmo: !0,
                                    merchantID: merchantID[0],
                                    domain: merchantDomain
                                }).then((function(nativeEligibility) {
                                    nativeEligibilityResults = nativeEligibility;
                                    (function(_ref) {
                                        var nativeEligibility = _ref.nativeEligibility;
                                        for (var _i2 = 0; _i2 < SUPPORTED_FUNDING.length; _i2++) {
                                            var fundingSource = SUPPORTED_FUNDING[_i2];
                                            if (isTestGroup(nativeEligibility, fundingSource) || isControlGroup(nativeEligibility, fundingSource)) return !0;
                                        }
                                        return !1;
                                    })({
                                        nativeEligibility: nativeEligibility
                                    }) && function(_ref) {
                                        var env = _ref.env;
                                        getLogger().configure({
                                            amplitudeApiKey: AMPLITUDE_API_KEY[env]
                                        });
                                    }({
                                        env: env
                                    });
                                }))).then(belter_src_util_noop);
                                var _ref3, props, serviceData, clientID, currency, env, buttonSessionID, enableFunding, merchantDomain, merchantID, buyerCountry, cookies;
                            }({
                                components: components,
                                props: props,
                                config: config,
                                serviceData: serviceData
                            });
                        }
                    })).then(belter_src_util_noop);
                },
                isPaymentEligible: function(_ref6) {
                    var payment = {
                        button: _ref6.button,
                        fundingSource: _ref6.fundingSource,
                        card: void 0,
                        isClick: !0,
                        buyerIntent: "pay"
                    };
                    var serviceData;
                    getServiceData().then((function(result) {
                        serviceData = result;
                    }));
                    return !!serviceData && native_native_isEligible({
                        props: props,
                        config: config,
                        serviceData: serviceData
                    }) && function(_ref7) {
                        var payment = _ref7.payment;
                        var platform = _ref7.props.platform;
                        var fundingSource = payment.fundingSource;
                        if (payment.win) return !1;
                        if (!NATIVE_CHECKOUT_URI[fundingSource] || !NATIVE_CHECKOUT_POPUP_URI[fundingSource] || !NATIVE_CHECKOUT_FALLBACK_URI[fundingSource]) return !1;
                        if (!canUsePopupAppSwitch({
                            fundingSource: fundingSource
                        }) && !canUseNativeQRCode({
                            fundingSource: fundingSource
                        })) return !1;
                        if (platform && "desktop" === platform) {
                            var _nativeEligibilityRes, _nativeEligibilityRes2;
                            var eligibleReasons = [ "isUserAgentEligible", "isBrowserMobileAndroid" ];
                            var ineligibleReasons = nativeEligibilityResults && (null == (_nativeEligibilityRes = nativeEligibilityResults[fundingSource]) || null == (_nativeEligibilityRes2 = _nativeEligibilityRes.ineligibilityReason) ? void 0 : _nativeEligibilityRes2.split(","));
                            var eligible = null == ineligibleReasons ? void 0 : ineligibleReasons.every((function(reason) {
                                return !reason || -1 !== (null == eligibleReasons ? void 0 : eligibleReasons.indexOf(reason));
                            }));
                            if (ineligibleReasons && !eligible) return !1;
                        }
                        return !0;
                    }({
                        props: props,
                        config: config,
                        serviceData: serviceData,
                        payment: payment
                    });
                },
                start: function(_ref7) {
                    var button = _ref7.button, fundingSource = _ref7.fundingSource;
                    var createOrder = memoize(props.createOrder);
                    UPDATE_CLIENT_CONFIGURATION && createOrder().then((function(paymentToken) {
                        getLogger().addPayloadBuilder((function() {
                            return {
                                token: paymentToken
                            };
                        })).addTrackingBuilder((function() {
                            var _ref8;
                            return (_ref8 = {}).context_type = "EC-Token", _ref8.context_id = paymentToken, 
                            _ref8.token = paymentToken, _ref8;
                        })).flush();
                        updateClientConfig({
                            paymentToken: paymentToken,
                            fundingSource: fundingSource,
                            integrationArtifact: "JS_V4",
                            userExperienceFlow: "INCONTEXT",
                            productFlow: "SMART_PAYMENT_BUTTONS",
                            buttonSessionID: props.buttonSessionID
                        });
                    }));
                    return getServiceData().then((function(serviceData) {
                        var _getLogger$addPayload;
                        var payment = {
                            button: button,
                            fundingSource: fundingSource,
                            card: void 0,
                            isClick: !0,
                            buyerIntent: "pay"
                        };
                        var supplementalDataPromise = createOrder().then((function(orderID) {
                            return querySupplementalData(orderID);
                        }));
                        var _buildCheckoutProps = buildCheckoutProps({
                            fundingSource: fundingSource,
                            payment: createOrder,
                            facilitatorAccessTokenPromise: getFacilitatorAccessToken(),
                            isNative: !0,
                            partnerAttributionID: props.partnerAttributionID || props.sessionID
                        }), onAuthorize = _buildCheckoutProps.onAuthorize, legacyOnCancel = _buildCheckoutProps.onCancel;
                        var instanceProps = _extends({}, props, {
                            createOrder: createOrder,
                            onApprove: function(_ref9) {
                                var payerID = _ref9.payerID, billingToken = _ref9.billingToken;
                                return supplementalDataPromise.then((function(_ref10) {
                                    var orderID = _ref10.orderID, paymentID = _ref10.paymentID, intent = _ref10.intent, returnUrl = _ref10.returnUrl;
                                    var urlParams = {};
                                    -1 === (returnUrl = returnUrl || "https://www.paypal.com/checkoutnow/error?token=" + orderID).indexOf("paymentId") && paymentID && (urlParams.paymentId = paymentID);
                                    -1 === returnUrl.indexOf("PayerID") && payerID && (urlParams.PayerID = payerID);
                                    -1 === returnUrl.indexOf("ba_token") && billingToken && (urlParams.ba_token = billingToken);
                                    var completeReturnUrl = $util.buildURL(returnUrl, urlParams);
                                    return onAuthorize({
                                        orderID: orderID,
                                        paymentToken: orderID,
                                        payerID: payerID,
                                        billingToken: billingToken,
                                        paymentID: paymentID,
                                        intent: intent,
                                        returnUrl: completeReturnUrl
                                    }, {
                                        close: function() {
                                            return window.paypal.Promise.try(belter_src_util_noop);
                                        }
                                    });
                                }));
                            },
                            onCancel: function() {
                                return supplementalDataPromise.then((function(_ref11) {
                                    var orderID = _ref11.orderID, paymentID = _ref11.paymentID, intent = _ref11.intent;
                                    var completeCancelUrl = $util.buildURL(_ref11.cancelUrl, {
                                        paymentId: paymentID
                                    });
                                    return legacyOnCancel({
                                        orderID: orderID,
                                        paymentID: paymentID,
                                        paymentToken: orderID,
                                        intent: intent,
                                        cancelUrl: completeCancelUrl,
                                        button_version: "4.0.47"
                                    }, {
                                        close: function() {
                                            return window.paypal.Promise.try(belter_src_util_noop);
                                        }
                                    });
                                }));
                            }
                        });
                        var _native$init = function(_ref2) {
                            var props = _ref2.props, components = _ref2.components, config = _ref2.config, payment = _ref2.payment, serviceData = _ref2.serviceData;
                            var onApprove = props.onApprove, onCancel = props.onCancel, onError = props.onError, buttonSessionID = props.buttonSessionID, onShippingChange = props.onShippingChange;
                            var fundingSource = payment.fundingSource;
                            if (!config.firebase) throw new Error("Can not run native flow without firebase config");
                            native_clean && native_clean.all();
                            native_clean = (tasks = [], cleaned = !1, cleaner = {
                                set: function(name, item) {
                                    if (!cleaned) {
                                        (void 0)[name] = item;
                                        cleaner.register((function() {
                                            delete (void 0)[name];
                                        }));
                                    }
                                    return item;
                                },
                                register: function(method) {
                                    var task = once((function() {
                                        return method(cleanErr);
                                    }));
                                    cleaned ? method(cleanErr) : tasks.push(task);
                                    return {
                                        cancel: function() {
                                            var index = tasks.indexOf(task);
                                            -1 !== index && tasks.splice(index, 1);
                                        }
                                    };
                                },
                                all: function(err) {
                                    cleanErr = err;
                                    var results = [];
                                    cleaned = !0;
                                    for (;tasks.length; ) {
                                        var task = tasks.shift();
                                        results.push(task());
                                    }
                                    return promise_ZalgoPromise.all(results).then(belter_src_util_noop);
                                }
                            });
                            var tasks, cleaned, cleanErr, cleaner;
                            var approved = !1;
                            var cancelled = !1;
                            var didFallback = !1;
                            var destroy = util_memoize((function() {
                                return native_clean.all();
                            }));
                            var fallbackToWebCheckout = function(fallbackWin) {
                                didFallback = !0;
                                var checkoutPayment = _extends({}, payment, {
                                    win: fallbackWin,
                                    isClick: !1,
                                    isNativeFallback: !0
                                });
                                var instance = checkout_checkout_init({
                                    props: props,
                                    components: components,
                                    payment: checkoutPayment,
                                    config: config,
                                    serviceData: serviceData
                                });
                                native_clean.register((function() {
                                    return instance.close();
                                }));
                                return instance.start();
                            };
                            var sessionUID = uniqueID();
                            var initFlow;
                            if (canUsePopupAppSwitch({
                                fundingSource: fundingSource
                            })) initFlow = initNativePopup; else {
                                if (!canUseNativeQRCode({
                                    fundingSource: fundingSource
                                })) throw new Error("No valid native payment flow found");
                                initFlow = initNativeQRCode;
                            }
                            var flow = initFlow({
                                props: props,
                                serviceData: serviceData,
                                config: config,
                                components: components,
                                payment: payment,
                                clean: native_clean,
                                sessionUID: sessionUID,
                                callbacks: {
                                    onInit: function() {
                                        return promise_ZalgoPromise.try((function() {
                                            onLsatUpgradeCalled();
                                            return {
                                                buttonSessionID: buttonSessionID
                                            };
                                        }));
                                    },
                                    onApprove: function(_ref3) {
                                        var _getLogger$info$track;
                                        var _ref3$data = _ref3.data, payerID = _ref3$data.payerID, paymentID = _ref3$data.paymentID, billingToken = _ref3$data.billingToken;
                                        approved = !0;
                                        getLogger().info("native_message_onapprove", {
                                            payerID: payerID,
                                            paymentID: paymentID,
                                            billingToken: billingToken
                                        }).track((_getLogger$info$track = {}, _getLogger$info$track.transition_name = "native_onapprove", 
                                        _getLogger$info$track.info_msg = "payerID: " + payerID + ", paymentID: " + (paymentID || "undefined") + ", billingToken: " + (billingToken || "undefined"), 
                                        _getLogger$info$track)).flush();
                                        return promise_ZalgoPromise.all([ onApprove({
                                            payerID: payerID,
                                            paymentID: paymentID,
                                            billingToken: billingToken,
                                            forceRestAPI: !0
                                        }, {
                                            restart: function() {
                                                return fallbackToWebCheckout();
                                            }
                                        }).catch((function(err) {
                                            var _getLogger$info$track2;
                                            getLogger().info("native_message_onapprove_error", {
                                                payerID: payerID,
                                                paymentID: paymentID,
                                                billingToken: billingToken
                                            }).track((_getLogger$info$track2 = {}, _getLogger$info$track2.transition_name = "native_onapprove_error", 
                                            _getLogger$info$track2.info_msg = "Error: " + stringifyError(err), _getLogger$info$track2)).flush();
                                            onError(err);
                                        })), destroy() ]).then((function() {
                                            return {
                                                buttonSessionID: buttonSessionID
                                            };
                                        }));
                                    },
                                    onCancel: function() {
                                        var _getLogger$info$track3;
                                        cancelled = !0;
                                        getLogger().info("native_message_oncancel").track((_getLogger$info$track3 = {}, 
                                        _getLogger$info$track3.transition_name = "native_oncancel", _getLogger$info$track3)).flush();
                                        return promise_ZalgoPromise.all([ onCancel(), destroy() ]).then((function() {
                                            return {
                                                buttonSessionID: buttonSessionID
                                            };
                                        }));
                                    },
                                    onError: function(_ref4) {
                                        var _getLogger$info$track4;
                                        var message = _ref4.data.message;
                                        getLogger().info("native_message_onerror", {
                                            err: message
                                        }).track((_getLogger$info$track4 = {}, _getLogger$info$track4.transition_name = "native_onerror", 
                                        _getLogger$info$track4.info_msg = "Error message: " + message, _getLogger$info$track4)).flush();
                                        return promise_ZalgoPromise.all([ onError(new Error(message)), destroy() ]).then((function() {
                                            return {
                                                buttonSessionID: buttonSessionID
                                            };
                                        }));
                                    },
                                    onShippingChange: function(_ref5) {
                                        var data = _ref5.data;
                                        return promise_ZalgoPromise.try((function() {
                                            var _getLogger$info$track5;
                                            getLogger().info("native_message_onshippingchange").track((_getLogger$info$track5 = {}, 
                                            _getLogger$info$track5.transition_name = "native_onshippingchange", _getLogger$info$track5)).flush();
                                            if (onShippingChange) {
                                                var resolved = !0;
                                                var actions = {
                                                    resolve: function() {
                                                        return promise_ZalgoPromise.try((function() {
                                                            resolved = !0;
                                                        }));
                                                    },
                                                    reject: function() {
                                                        return promise_ZalgoPromise.try((function() {
                                                            resolved = !1;
                                                        }));
                                                    }
                                                };
                                                return onShippingChange(_extends({}, data, {
                                                    forceRestAPI: !0
                                                }), actions).then((function() {
                                                    return {
                                                        resolved: resolved
                                                    };
                                                }));
                                            }
                                            return {
                                                resolved: !0
                                            };
                                        }));
                                    },
                                    onFallback: function(opts) {
                                        var _ref6 = opts || {}, win = _ref6.win, _ref6$optOut = _ref6.optOut, optOut = void 0 === _ref6$optOut ? {} : _ref6$optOut;
                                        return promise_ZalgoPromise.try((function() {
                                            var _getLogger$info$track6;
                                            var result = function(optOut) {
                                                var type = optOut.type, skip_native_duration = optOut.skip_native_duration;
                                                if (type && "native_opt_out" === type) {
                                                    var OPT_OUT_TIME = 36288e5;
                                                    skip_native_duration && "number" == typeof skip_native_duration && (OPT_OUT_TIME = skip_native_duration);
                                                    var now = Date.now();
                                                    getStorageState((function(state) {
                                                        state.nativeOptOutLifetime = now + OPT_OUT_TIME;
                                                    }));
                                                    return !0;
                                                }
                                                return !1;
                                            }(optOut);
                                            var fallback_reason = optOut.fallback_reason;
                                            getLogger().info("native_message_onfallback").track((_getLogger$info$track6 = {}, 
                                            _getLogger$info$track6.transition_name = "native_onfallback", _getLogger$info$track6.transition_type = result ? "native_opt_out" : "native_fallback", 
                                            _getLogger$info$track6.transition_reason = fallback_reason || "", _getLogger$info$track6)).flush();
                                            fallbackToWebCheckout(win);
                                            return {
                                                buttonSessionID: buttonSessionID
                                            };
                                        }));
                                    },
                                    onClose: function() {
                                        return promise_ZalgoPromise.delay(1e3).then((function() {
                                            if (!(approved || cancelled || didFallback || isAndroidChrome())) return promise_ZalgoPromise.try((function() {
                                                return destroy();
                                            }));
                                        })).then(belter_src_util_noop);
                                    },
                                    onDestroy: destroy
                                }
                            });
                            return {
                                click: function() {
                                    return flow.click();
                                },
                                start: function() {
                                    return promise_ZalgoPromise.try((function() {
                                        return flow.start();
                                    })).catch((function(err) {
                                        return destroy().then((function() {
                                            var _getLogger$error$trac;
                                            getLogger().error("native_error", {
                                                err: stringifyError(err)
                                            }).track((_getLogger$error$trac = {}, _getLogger$error$trac.transition_name = "native_app_switch_ack", 
                                            _getLogger$error$trac.ext_error_code = "native_error", _getLogger$error$trac.ext_error_desc = stringifyErrorMessage(err), 
                                            _getLogger$error$trac)).flush();
                                            throw err;
                                        }));
                                    }));
                                },
                                close: destroy
                            };
                        }({
                            components: getComponents({
                                createOrder: createOrder
                            }),
                            props: instanceProps,
                            config: config,
                            serviceData: serviceData,
                            payment: payment
                        }), click = _native$init.click, start = _native$init.start;
                        if (!click) throw new Error("Expected click to be available for native driver");
                        getLogger().addPayloadBuilder((function() {
                            return {
                                token: null
                            };
                        })).info("button_click").info("button_click_pay_flow_native").info("button_click_fundingsource_" + fundingSource).addTrackingBuilder((function() {
                            var _ref12;
                            return (_ref12 = {}).selected_payment_method = fundingSource, _ref12.context_type = "button_session_id", 
                            _ref12.context_id = props.buttonSessionID, _ref12.token = null, _ref12;
                        })).track((_getLogger$addPayload = {}, _getLogger$addPayload.transition_name = "process_button_click", 
                        _getLogger$addPayload.payment_flow = "native", _getLogger$addPayload.info_msg = props.enableNativeCheckout ? "tester" : "", 
                        _getLogger$addPayload)).flush();
                        var clickPromise = window.paypal.Promise.try(click);
                        return window.paypal.Promise.try(start).then((function() {
                            return clickPromise;
                        })).then(belter_src_util_noop);
                    }));
                }
            });
            querySelectorAll(".paypal-button").forEach((function(button) {
                attachClickEvent_attachClickEventToElement(button, (function(event) {
                    var fundingSource = button.getAttribute("data-funding-source");
                    if (buttonOpts) {
                        var checkoutCustomization = buttonOpts.checkoutCustomization;
                        checkoutCustomization && checkoutCustomization.tagline && checkoutCustomization.tagline.tracking && checkoutCustomization.tagline.tracking.click && sendBeacon(checkoutCustomization.tagline.tracking.click);
                        checkoutCustomization && checkoutCustomization.buttonText && checkoutCustomization.buttonText.tracking && checkoutCustomization.buttonText.tracking.click && sendBeacon(checkoutCustomization.buttonText.tracking.click);
                    }
                    if (native.isPaymentEligible({
                        button: button,
                        fundingSource: fundingSource
                    })) {
                        window.xprops.onClick && window.xprops.onClick({
                            fundingSource: fundingSource,
                            flow: "native",
                            button_version: "4.0.47"
                        });
                        if (!buttonEnabled) return;
                        native.start({
                            button: button,
                            fundingSource: fundingSource
                        });
                    } else clickButton(event, {
                        fundingSource: fundingSource
                    });
                }));
            }));
            querySelectorAll(".paypal-button-card").forEach((function(button) {
                attachClickEvent_attachClickEventToElement(button, (function(event) {
                    clickButton(event, {
                        fundingSource: button.getAttribute("data-funding-source"),
                        card: button.getAttribute("data-card")
                    });
                }));
            }));
            buttonEnabled = !0;
            window.xprops.validate && window.xprops.validate({
                enable: function() {
                    buttonEnabled = !0;
                },
                disable: function() {
                    buttonEnabled = !1;
                }
            });
            return window.paypal.Promise.all([ window.paypal.Promise.try((function() {
                var userLocale = window.xprops.locale;
                if (userLocale) {
                    var _userLocale$split = userLocale.split("_"), lang = _userLocale$split[0], country = _userLocale$split[1];
                    if (!window.paypal.config.locales[country]) throw new Error("Invalid country: " + country + " for locale " + userLocale);
                    if (-1 === window.paypal.config.locales[country].indexOf(lang)) throw new Error("Invalid language: " + lang + " for locale " + userLocale);
                    return {
                        lang: lang,
                        country: country
                    };
                }
                return getLocale();
            })).then((function(locale) {
                window.paypal.config.locale.country = locale.country;
                window.paypal.config.locale.lang = locale.lang;
            })), getLocale().then((function(locale) {
                return $buttonFundingApi.retrieve({
                    params: {
                        country: locale.country,
                        lang: locale.lang,
                        domain: window && window.xprops && window.xprops.domain,
                        buttonSessionID: window && window.xprops && window.xprops.buttonSessionID,
                        remembered: window && window.xprops && window.xprops.funding && window.xprops.funding.remembered && window.xprops.funding.remembered.join(),
                        allowed: window && window.xprops && window.xprops.funding && window.xprops.funding.allowed && window.xprops.funding.allowed.join(),
                        disallowed: window && window.xprops && window.xprops.funding && window.xprops.funding.disallowed && window.xprops.funding.disallowed.join(),
                        buttonLabel: window && window.xprops && window.xprops.style && window.xprops.style.label,
                        installmentperiod: window && window.xprops && window.xprops.style && window.xprops.style.installmentperiod,
                        renderedButtons: window && window.xprops && window.xprops.renderedButtons
                    }
                }).then((function(res) {
                    return res.data;
                }));
            })).then((function(funding) {
                window.xprops.funding && window.xprops.funding.remember && funding.remembered && funding.remembered.length && window.xprops.funding.remember(funding.remembered);
            })), native.setup() ]).then((function() {}));
        }
        var _ref2, correlationID, firebaseConfig, buyerCountry, cookies, sdkMeta, NotImplementedFunction, locale, env, clientID, storageID, stickinessID, props, config, getFacilitatorAccessToken, getServiceData, getComponents;
        window.console && window.console.warn && window.console.warn("Button setup inside prerender");
    }
    function button_setup(buttonOpts) {
        if (window.paypal || window.name && -1 !== window.name.indexOf("xcomponent__ppbutton")) return window.paypal.Promise.try((function() {
            return setupButton(buttonOpts);
        })).catch((function(err) {
            window.paypal.logger.error("xo_buttonjs_bootstrap_err", {
                err: err.stack ? err.stack : err.toString()
            });
        }));
    }
} ]);