var trim;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3010:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.KatalMetricsDriverSushi = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(2475));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _KatalMetricsDriver2 = _interopRequireDefault(__webpack_require__(652));

var _KatalMetricType = _interopRequireDefault(__webpack_require__(858));

var _katalSushiClient = _interopRequireDefault(__webpack_require__(6700));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var KAT_STANDALONE_NEXUS_PRODUCER_ID = 'katal';
var KAT_STANDALONE_DEFAULT_SOURCE_GROUPS = {
  test: 'com.amazon.eel.katal.metrics.core.nexus.gamma',
  prod: 'com.amazon.eel.katal.metrics.core.nexus'
};

var KatalMetricsDriverSushiBuilder = /*#__PURE__*/function () {
  function KatalMetricsDriverSushiBuilder() {
    (0, _classCallCheck2.default)(this, KatalMetricsDriverSushiBuilder);
    (0, _defineProperty2.default)(this, "context", {});
  }

  (0, _createClass2.default)(KatalMetricsDriverSushiBuilder, [{
    key: "withSushiClient",
    value: function withSushiClient(sushiClient) {
      console.log('withSushi client...');
      this.context.sushiClient = sushiClient;
      return this;
    }
  }, {
    key: "withDomainRealm",
    value: function withDomainRealm(domain, realm) {
      this.context.domain = domain;
      this.context.realm = realm;
      return this;
    }
  }, {
    key: "withCustomProducer",
    value: function withCustomProducer(sushiProducerId) {
      this.context.sushiProducer = sushiProducerId;
      return this;
    }
  }, {
    key: "withCustomSourceGroup",
    value: function withCustomSourceGroup(sourceGroupId) {
      this.context.sourceGroupId = sourceGroupId;
      return this;
    }
  }, {
    key: "withErrorHandler",
    value: function withErrorHandler(errorHandler) {
      this.context.errorHandler = errorHandler;
      return this;
    }
  }, {
    key: "withSushiClientOptions",
    value: function withSushiClientOptions(sushiClientOptions) {
      this.context.sushiClientOptions = sushiClientOptions;
      return this;
    }
  }, {
    key: "withSushiClientTransportOverride",
    value: function withSushiClientTransportOverride(sushiClientTransportOverride) {
      this.context.sushiClientTransportOverride = sushiClientTransportOverride;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return new KatalMetricsDriverSushi(this.context);
    }
  }]);
  return KatalMetricsDriverSushiBuilder;
}();

var KatalMetricsDriverSushi = /*#__PURE__*/function (_KatalMetricsDriver) {
  (0, _inherits2.default)(KatalMetricsDriverSushi, _KatalMetricsDriver);

  var _super = _createSuper(KatalMetricsDriverSushi);

  function KatalMetricsDriverSushi(options) {
    var _this;

    (0, _classCallCheck2.default)(this, KatalMetricsDriverSushi);
    _this = _super.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "sushi", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "producerId", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "sourceGroupId", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "errorHandler", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "combinedErrorHandler", function (err) {
      if (_this.errorHandler) {
        try {
          _this.errorHandler(err); // Return to avoid falling through to default error handler


          return;
        } catch (nextErr) {
          console.error("Error handling error publishing metrics:");
          console.error(nextErr); // Fall through
        }
      }

      _this.defaultErrorHandler(err);
    });
    var domain = options.domain,
        realm = options.realm,
        errorHandler = options.errorHandler,
        sushiClient = options.sushiClient,
        _options$sushiProduce = options.sushiProducer,
        producerId = _options$sushiProduce === void 0 ? KAT_STANDALONE_NEXUS_PRODUCER_ID : _options$sushiProduce,
        sushiClientOptions = options.sushiClientOptions,
        sushiClientTransportOverride = options.sushiClientTransportOverride; // custom source group always overrides defaults

    var sourceGroupId = options.sourceGroupId || KAT_STANDALONE_DEFAULT_SOURCE_GROUPS[domain] || KAT_STANDALONE_DEFAULT_SOURCE_GROUPS['test'];
    _this.sushi = sushiClient || _this.buildSushiClient(domain, realm, sourceGroupId, sushiClientOptions, sushiClientTransportOverride);
    _this.errorHandler = errorHandler;
    _this.producerId = producerId;
    _this.sourceGroupId = sourceGroupId;
    return _this;
  }

  (0, _createClass2.default)(KatalMetricsDriverSushi, [{
    key: "beforeUnload",
    value:
    /**
     * Register a callback to be called right before the page unloads. This
     * allows for any final metrics, such as page visit duration, to be sent
     * before the user navigates away from the page or closes the tab.
     * NOTE: This is an experimental API and may change in the future.
     * @param cb The callback to call.
     */
    function beforeUnload(cb) {
      this.sushi.onSushiUnload(cb);
    }
    /**
     * Default error handler if the user-supplied error handler fails or is unset.  Should never be called unless
     * user-provided error handler misbehaves.
     *
     * @param err Unhandled error object
     */

  }, {
    key: "defaultErrorHandler",
    value: function defaultErrorHandler(err) {
      console.error("Error publishing metrics:");
      console.error(err);
    }
    /**
     * Call the error-handler supplied by the user when this object was constructed; if that is unset or itself throws
     * an exception, calls the default error handler as a fallback, which will just log the error to the console.
     *
     * @param err Error object to handle
     */

  }, {
    key: "withErrorHandling",
    value:
    /**
     * Helper method to wrap a function in the error handler.
     *
     * @param doTheThing Function to run under the wrapper
     * @return Return value from called function
     */
    function withErrorHandling(doTheThing) {
      try {
        return doTheThing();
      } catch (err) {
        this.combinedErrorHandler(err);
      }
    }
  }, {
    key: "buildSushiClient",
    value: function buildSushiClient(domain, realm, sourceGroupId, sushiClientOptions, sushiClientTransportOverride) {
      if (!domain || !realm) {
        throw new Error('KatalMetricsDriverSushi requires a domain and realm to build a sushi client.');
      }

      return new _katalSushiClient.default(KatalMetricsDriverSushi.getRealmName(realm), sourceGroupId, this.combinedErrorHandler, sushiClientOptions, sushiClientTransportOverride);
    }
  }, {
    key: "publish",
    value: // TODO: errorHandler in this method is deprecated and is not referenced.
    // Tech debt: https://issues.amazon.com/issues/KAT-875
    function publish(metricObject, errorHandler, context) {
      var _this2 = this;

      // Support for new 2-argument form of publish, which does not pass the unused errorHandler object (KAT-875)
      var metricsContext = arguments.length < 3 ? arguments[1] : arguments[2];
      this.withErrorHandling(function () {
        // TODO: This logic is now moved into KatalMetricsPublisher, once everybody has that update we can remove this.
        // Tech debt: https://issues.amazon.com/issues/KAT-876
        if (_KatalMetricType.default.List === metricObject.type) {
          metricObject.metricList.forEach(function (metric) {
            _this2.publish(metric, metricsContext);
          });
          return;
        }

        var nexusSchema = _this2.mapObjectTypeToNexusSchema(metricObject.type);

        var fields = _objectSpread(_objectSpread({}, metricsContext.context), {}, {
          metricKey: metricObject.name,
          value: metricObject.value
        });

        if (metricObject.isMonitor) {
          fields.isMonitor = true;
        } // Deleting cloudWatchDimensions field if exists as it applies only for KatalMonitoringAWSDriver.


        if (fields.cloudWatchDimensions) {
          delete fields.cloudWatchDimensions;
        } // Reset the event count back to 0, otherwise Sushi will stop publishing after 1K items (https://issues.amazon.com/issues/KAT-1534)


        _this2.sushi.reset();

        _this2.sushi.event(fields, _this2.producerId, nexusSchema, {
          "ssd": 1
        });
      });
    }
  }, {
    key: "mapObjectTypeToNexusSchema",
    value: function mapObjectTypeToNexusSchema(objectType) {
      switch (objectType) {
        case _KatalMetricType.default.String:
          return 'katal.client.metrics.String.2';

        case _KatalMetricType.default.Counter:
          return 'katal.client.metrics.Counter.3';

        case _KatalMetricType.default.Timer:
          return 'katal.client.metrics.Timer.2';

        default:
          throw new Error("Unknown type ".concat(objectType, " when publishing metric object."));
      }
    }
  }], [{
    key: "getRealmName",
    value: function getRealmName(realm) {
      switch (realm) {
        case 'NAAmazon':
        case 'USAmazon':
          return _katalSushiClient.default.REGIONS.NA;

        case 'EUAmazon':
          return _katalSushiClient.default.REGIONS.EU;

        case 'FEAmazon':
        case 'JPAmazon':
          return _katalSushiClient.default.REGIONS.FE;

        case 'CNAmazon':
          return _katalSushiClient.default.REGIONS.CN;

        default:
          // Let the SushiClient decide if this is bogus or not.
          return realm;
      }
    }
  }]);
  return KatalMetricsDriverSushi;
}(_KatalMetricsDriver2.default);

exports.KatalMetricsDriverSushi = KatalMetricsDriverSushi;
(0, _defineProperty2.default)(KatalMetricsDriverSushi, "Builder", KatalMetricsDriverSushiBuilder);

/***/ }),

/***/ 9532:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.A = void 0;

__webpack_require__(1236);

var _KatalMetricsDriverSushi = __webpack_require__(3010);

/* istanbul ignore file */
var _default = _KatalMetricsDriverSushi.KatalMetricsDriverSushi;
exports.A = _default;

/***/ }),

/***/ 3382:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _ValidateSimpleString = _interopRequireDefault(__webpack_require__(595));

var _validateCloudWatchDimensions = _interopRequireDefault(__webpack_require__(9253));

var _FirstMap = _interopRequireDefault(__webpack_require__(3222));

var _mergeLists = __webpack_require__(7211);

var _embedRequestId = __webpack_require__(5361);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var REQUIRED_FIELDS = ['site', 'serviceName', 'methodName']; // Not required, but general usage (such as complex querying) may be limited without these fields.

var DESIRED_FIELDS = ['actionId'];

var KatalMetricsContext = /*#__PURE__*/function () {
  /**
   * Create a new metrics context with the given fields.
   *
   * @param contextFields Context fields value (default empty)
   */
  function KatalMetricsContext() {
    var contextFields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, KatalMetricsContext);
    // Copy fields so this is immutable
    this.context = _objectSpread({}, contextFields);
  }
  /**
   * Return a new KatalMetricsContext which is a copy of this context, with values added or overridden from
   * the given context.
   *
   * If the given context is null or empty, this method may return the original object as an optimization.
   *
   * @param thatContext Context to merge values from
   * @return New context with default values from this context, and values overridden or added by the given context.
   */


  (0, _createClass2.default)(KatalMetricsContext, [{
    key: "merge",
    value: function merge(thatContext) {
      if (!thatContext) return this; // Check for a common error

      if (thatContext instanceof KatalMetricsContext.Builder) {
        throw new Error("KatalMetricsContext.Builder object passed instead of KatalMetricsContext.  Try calling .build() method.");
      }

      var context = thatContext instanceof KatalMetricsContext ? thatContext.context : thatContext;

      var newContext = _objectSpread(_objectSpread(_objectSpread({}, this.context), context), {}, {
        relatedMetrics: (0, _mergeLists.mergeLists)(this.context.relatedMetrics, context.relatedMetrics),
        relatedMetricsSingleAction: (0, _mergeLists.mergeLists)(this.context.relatedMetricsSingleAction, context.relatedMetricsSingleAction),
        // Combines the dimensions from base publisher with any child publisher.
        cloudWatchDimensions: (0, _mergeLists.mergeLists)(this.context.cloudWatchDimensions, context.cloudWatchDimensions)
      });

      return new KatalMetricsContext(newContext);
    }
    /**
     * Return a new context which is a copy of this context with relatedMetricsSingleAction removed.
     *
     * This is intended to be called when creating a new child publisher.
     *
     * @return Copy of this context, with relatedMetricsSingleAction removed
     */

  }, {
    key: "withoutRelatedMetricsSingleAction",
    value: function withoutRelatedMetricsSingleAction() {
      return new KatalMetricsContext(_objectSpread(_objectSpread({}, this.context), {}, {
        relatedMetricsSingleAction: undefined
      }));
    }
    /**
     * Get a context suitable for publication to the driver.
     *
     * This method strips out any private fields, and leaves only fields from the schema that the driver should publish.
     *
     * @return Context suitable for driver publication
     */

  }, {
    key: "driverContext",
    value: function driverContext() {
      // Don't publish relatedMetrics to the driver
      var newContextFields = _objectSpread({}, this.context);

      delete newContextFields["relatedMetrics"];
      delete newContextFields["relatedMetricsSingleAction"];
      delete newContextFields["requestId"];

      if (this.context.requestId) {
        newContextFields.actionId = (0, _embedRequestId.embedRequestId)(newContextFields.actionId, this.context.requestId);
      }

      return new KatalMetricsContext(newContextFields);
    }
    /**
     * Get a simple JavaScript object with a copy of the fields for this context.
     *
     * @return Simple Javascript object with a copy of the fields for this context
     */

  }, {
    key: "getFields",
    value: function getFields() {
      // Copy fields so this remains immutable
      return _objectSpread({}, this.context);
    }
    /**
     * Check for a validation error on this context.
     *
     * Returns the first validation error encountered if one is found, otherwise undefined.
     *
     * @returns Errors found with this context
     */

  }, {
    key: "validationError",
    value: function validationError() {
      var _this = this;

      var err; // Fields “site”, “serviceName”, “methodName”, and “metricKey” are required.

      err = (0, _FirstMap.default)(REQUIRED_FIELDS, function (field) {
        if (_this.context[field] == undefined) {
          return new Error("Field ".concat(field, " is required, but it is ").concat(_this.context[field]));
        }
      });
      if (err) return err; // https://sim.amazon.com/issues/KAT-9769

      DESIRED_FIELDS.forEach(function (field) {
        if (!_this.context[field]) {
          var _window;

          var noDesiredFieldEvent = new CustomEvent("katal.metrics.missing-".concat(field), {
            detail: {
              context: _this.context
            }
          });
          (_window = window) === null || _window === void 0 ? void 0 : _window.dispatchEvent(noDesiredFieldEvent);
          console.warn("No ".concat(field, " present in context."));
        }
      });
      return (0, _FirstMap.default)(Object.keys(this.context), function (field) {
        return _this.validateField(field);
      });
    }
    /**
     * Validate an individual context field.
     *
     * @param field Name of field to validate
     * @returns Error found with this field, or undefined
     */

  }, {
    key: "validateField",
    value: function validateField(field) {
      var val = this.context[field];
      var nameForError = "field ".concat(field);

      switch (field) {
        // Strings which could be used as partition keys ("site" and "serviceName") cannot contain slashes, in
        // addition to the other restictions below.
        case 'site':
        case 'serviceName':
          if (val.indexOf('/') > -1) return new Error("Expected ".concat(nameForError, " to contain only valid characters, but it was ").concat(val, ".  It cannot contain a slash."));
        // Else fall through
        // Strings for fields “site”, “serviceName”, “methodName”, “metricKey” must match be valid PMET field names:
        // maximum length of 256, only letters, numbers, and the dot, colon, at-sign, underscore, forward-slash,
        // and slash characters (in short the regex ^[A-Za-z0-9.:@_/-]+$).

        case 'methodName':
        case 'actionId':
          return (0, _ValidateSimpleString.default)(val, nameForError);

        case 'cloudWatchDimensions':
          return (0, _validateCloudWatchDimensions.default)(val || []);
      } // No error found, implicitly return undefined

    }
    /**
     * Builder class for KatalMetricsContext
     */

  }]);
  return KatalMetricsContext;
}();

exports["default"] = KatalMetricsContext;
(0, _defineProperty2.default)(KatalMetricsContext, "Builder", /*#__PURE__*/function () {
  function _class2() {
    (0, _classCallCheck2.default)(this, _class2);
    (0, _defineProperty2.default)(this, "context", {});
  }

  (0, _createClass2.default)(_class2, [{
    key: "withSite",
    value: function withSite(site) {
      this.context.site = site;
      return this;
    }
  }, {
    key: "withServiceName",
    value: function withServiceName(serviceName) {
      this.context.serviceName = serviceName;
      return this;
    }
  }, {
    key: "withMethodName",
    value: function withMethodName(methodName) {
      this.context.methodName = methodName;
      return this;
    }
  }, {
    key: "withActionId",
    value: function withActionId(actionId) {
      this.context.actionId = actionId;
      return this;
    }
  }, {
    key: "withRequestId",
    value: function withRequestId(requestId) {
      this.context.requestId = requestId;
      return this;
    }
  }, {
    key: "withCloudWatchDimensions",
    value: function withCloudWatchDimensions(dimensions) {
      this.context.cloudWatchDimensions = dimensions;
      return this;
    }
    /**
     * Replace any related metrics with the given list (see addRelatedMetrics to add instead of replace).
     *
     * Related metrics are metrics that are published whenever a new action is started.  They are used to relate the
     * action back to the context where it is happening, for example a request ID or a user identity.
     *
     * @param relatedMetrics Related metrics to publish when a new action is started for this context
     * @returns This builder object to continue building
     */

  }, {
    key: "withRelatedMetrics",
    value: function withRelatedMetrics() {
      for (var _len = arguments.length, relatedMetrics = new Array(_len), _key = 0; _key < _len; _key++) {
        relatedMetrics[_key] = arguments[_key];
      }

      this.context.relatedMetrics = relatedMetrics;
      return this;
    }
    /**
     * Add additional related metrics to this builder.  See withRelatedMetrics for more information.
     *
     * @param relatedMetrics Additional related metrics to publish when a new action is started for this context
     * @returns This builder object to continue building
     */

  }, {
    key: "addRelatedMetrics",
    value: function addRelatedMetrics() {
      for (var _len2 = arguments.length, relatedMetrics = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        relatedMetrics[_key2] = arguments[_key2];
      }

      this.context.relatedMetrics = (0, _mergeLists.mergeLists)(this.context.relatedMetrics, relatedMetrics);
      return this;
    }
    /**
     * Replace single-action related metrics with the given list (see addRelatedMetricsSingleAction to add instead of replace,
     * and withRelatedMetrics for more information about related metrics).
     *
     * Single-action related metrics are published when a new child metric publisher is created, but not included as
     * related metrics for the new child metric publisher, so are not published again if the child metric publisher
     * creates grandchild published metrics.
     *
     * @param metrics Related metrics
     * @returns This builder object to continue building
     */

  }, {
    key: "withRelatedMetricsSingleAction",
    value: function withRelatedMetricsSingleAction() {
      for (var _len3 = arguments.length, metrics = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        metrics[_key3] = arguments[_key3];
      }

      this.context.relatedMetricsSingleAction = metrics;
      return this;
    }
    /**
     * Add additional single-action related metrics to this builder.  See addRelatedMetricsSingleAction for more information.
     *
     * @param metrics Related metrics
     * @returns This builder object to continue building
     */

  }, {
    key: "addRelatedMetricsSingleAction",
    value: function addRelatedMetricsSingleAction() {
      for (var _len4 = arguments.length, metrics = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        metrics[_key4] = arguments[_key4];
      }

      this.context.relatedMetricsSingleAction = (0, _mergeLists.mergeLists)(this.context.relatedMetricsSingleAction, metrics);
      return this;
    }
    /**
     * Take the fields set in this builder and use them to create a new KatalMetricsContext.
     *
     * @return KatalMetricsContext object built with the parameters given to this builder
     */

  }, {
    key: "build",
    value: function build() {
      return new KatalMetricsContext(this.context);
    }
  }]);
  return _class2;
}());

/***/ }),

/***/ 8461:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _v = _interopRequireDefault(__webpack_require__(2550));

var _KatalMetricsContext = _interopRequireDefault(__webpack_require__(3382));

var _metricObject = __webpack_require__(1871);

var _mergeLists = __webpack_require__(7211);

var _metricsExtension = __webpack_require__(6532);

var _embedRequestId = __webpack_require__(5361);

var INITIALIZATION_METHOD_NAME = 'Initialization';

/**
 * Default error handler if the user-supplied error handler fails or is unset.
 * Should never be called unless user-provided error handler misbehaves.
 */
var DEFAULT_ERROR_HANDLER = function DEFAULT_ERROR_HANDLER(err) {
  console.error("Error publishing metrics:");
  console.error(err);
};

var PARENT_ACTION_ID_NAME = 'parentActionId';

var getContextFields = function getContextFields(context) {
  if (context.context) {
    return context.context;
  } else {
    return context;
  }
};
/**
 * Class used for publishing metrics to Katal.  Contains a driver and a context.
 *
 * This class knows how to publish metrics, and how to create new publishers with a modified context.
 */


var KatalMetricsPublisher = /*#__PURE__*/function () {
  /**
   * Create a new metrics publisher with the given driver and context
   *
   * @param driver Subclass of KatalMetricsDriver used to publish the metrics
   * @param errorHandler Handler for errors that occur while using this publisher
   * @param context Context for this metrics publisher; contains data to be included with every
   *     metric published using this publisher object.  Default is an empty context.
   */
  function KatalMetricsPublisher(driver) {
    var _this = this;

    var errorHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ERROR_HANDLER;
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _KatalMetricsContext.default();
    (0, _classCallCheck2.default)(this, KatalMetricsPublisher);
    (0, _defineProperty2.default)(this, "combinedErrorHandler", function (err) {
      try {
        _this.errorHandler(err);
      } catch (nextErr) {
        console.error("Error handling error publishing metrics:");
        console.error(nextErr);
        DEFAULT_ERROR_HANDLER(err);
      }
    });

    // Check for a common error
    if (context instanceof _KatalMetricsContext.default.Builder) {
      throw new Error("KatalMetricsContext.Builder object passed instead of KatalMetricsContext.  Try calling .build() method.");
    }

    this.driver = driver;
    this.errorHandler = errorHandler;
    this.context = !(context instanceof _KatalMetricsContext.default) ? new _KatalMetricsContext.default(context) : context;
  }
  /**
   * Call the error-handler supplied by the user when this object was constructed; if that is unset or itself throws
   * an exception, calls the default error handler as a fallback, which will just log the error to the console.
   *
   * @param err Error object to handle
   */


  (0, _createClass2.default)(KatalMetricsPublisher, [{
    key: "withErrorHandling",
    value:
    /**
     * Helper method to wrap a function in the error handler.
     *
     * @param doTheThing Function to run under the wrapper
     * @return Return value from called function
     */
    function withErrorHandling(doTheThing) {
      try {
        return doTheThing();
      } catch (err) {
        this.combinedErrorHandler(err);
      }
    }
    /**
     * Helper method to return all the related metrics of base publisher and additionalContext.
     *
     * @param additionalContext Additional context to be included in the new publisher
     * @return Return all related metrics from base publisher and additionalContext.
     */

  }, {
    key: "getAdditionalRelatedMetrics",
    value: function getAdditionalRelatedMetrics(additionalContext) {
      var newContext = additionalContext instanceof _KatalMetricsContext.default ? additionalContext.context : additionalContext;
      var baseRelatedMetrics = this.getBaseRelatedMetrics();
      return (0, _mergeLists.mergeLists)(baseRelatedMetrics, newContext.relatedMetrics);
    }
    /**
     * Helper method to return all the related metrics of base publisher.
     *
     * @return Return all related metrics from the base publisher.
     */

  }, {
    key: "getBaseRelatedMetrics",
    value: function getBaseRelatedMetrics() {
      return (0, _mergeLists.mergeLists)(this.context.context.relatedMetrics, this.context.context.relatedMetricsSingleAction);
    }
    /**
     * Publish the given metric object.
     *
     * This method is guaranteed never to throw an exception.  If the metric object or context are invalid,
     * or any other exception is thrown while publishing, the publisher's error handler is called.  If the
     * publisher's error handler is unset or fails, the default error handler is called (see defaultErrorHandler).
     *
     * @param katalMetricObject Metric object to publish
     */

  }, {
    key: "publish",
    value: function publish(katalMetricObject) {
      var _this2 = this;

      this.withErrorHandling(function () {
        if (!katalMetricObject) {
          throw new Error("Cannot publish undefined/null metric object");
        }

        if (_metricObject.Object.Types.List === katalMetricObject.type) {
          katalMetricObject.metricList.forEach(function (metric) {
            _this2.publish(metric);
          });
        } else {
          var driverContext = _this2.context.driverContext();

          var contextError = driverContext.validationError();
          if (contextError) throw contextError;
          var objectError = katalMetricObject.validationError();
          if (objectError) throw objectError;
          (0, _metricsExtension.dispatchMetricEvent)(katalMetricObject, driverContext);

          _this2.driver.publish(katalMetricObject, driverContext);
        }
      });
    }
    /**
     * Create a new publisher which is identical to this publisher, but with the given context fields merged into
     * the new publisher's context.
     *
     * @param additionalContext Additional context to be included in the new publisher
     * @returns New publisher identical to this one, but with an updated context
     */

  }, {
    key: "newChildPublisher",
    value: function newChildPublisher(additionalContext) {
      return new KatalMetricsPublisher(this.driver, this.errorHandler, this.context.merge(additionalContext));
    }
    /**
     * Begin a new action, and return a new publisher for metrics related to that action.
     *
     * Beginning a new action involves the following steps:
     *   1. Generate a new actionId for the action, randomly in the browser
     *   2. If there are any related metrics in the context, publish them
     *   3. Create and return a new publisher with this object's context, merged with any additional context given,
     *      merged with the actionId generated above.
     *
     * @param additionalContext Additional context to be included in the new publisher
     * @returns New publisher identical to this one, but with an updated context
     */

  }, {
    key: "newChildActionPublisher",
    value: function newChildActionPublisher(additionalContext) {
      var actionId = this._generateActionid(additionalContext);

      var newContext = this.context.withoutRelatedMetricsSingleAction().merge({
        actionId: actionId
      }).merge(additionalContext);
      var newPublisher = new KatalMetricsPublisher(this.driver, this.errorHandler, newContext);
      var allRelatedMetrics = additionalContext && !(additionalContext instanceof _KatalMetricsContext.default.Builder) ? this.getAdditionalRelatedMetrics(additionalContext) : this.getBaseRelatedMetrics();

      if (allRelatedMetrics) {
        allRelatedMetrics.forEach(function (metric) {
          newPublisher.publish(metric);
        });
      }

      return newPublisher;
    }
    /**
     * Begin a new chained child action, and return a new publisher for metrics related to that action.
     *
     * A chained action is handled the same way as in newChildActionPublisher, but additionally,
     * the returned publisher has a relatedMetricNoInherit named "parentActionId", with the newly
     * generated actionId as its value.
     *
     * The effect of this is that any further chained child actions can be connected back to this
     * action through the parentActionId, and so on recursively.
     *
     * @param additionalContext Additional context to be included in the new publisher
     * @returns New publisher identical to this one, but with an updated context
     */

  }, {
    key: "newChildActionPublisherChained",
    value: function newChildActionPublisherChained(additionalContext) {
      var actionId = this._generateActionid(additionalContext);

      var parentActionId = (0, _embedRequestId.embedRequestId)(actionId, this.context.context.requestId);
      var relatedMetricsSingleAction = [new _metricObject.String(PARENT_ACTION_ID_NAME, parentActionId)];
      var newContext = new _KatalMetricsContext.default({
        actionId: actionId,
        relatedMetricsSingleAction: relatedMetricsSingleAction
      }).merge(additionalContext);
      return this.newChildActionPublisher(newContext);
    }
    /**
     * Helper method to create a new chained child action publisher with the given value for methodName.
     *
     * Apart from setting the methodName in the child context, this method is identical to newChildActionPublisherChained.
     *
     * @param methodName Method name for new publisher context
     * @param additionalContext Additional context to supply (optional)
     * @returns New publisher identical to this one, but with an updated context
     */

  }, {
    key: "newChildActionPublisherChainedForMethod",
    value: function newChildActionPublisherChainedForMethod(methodName, additionalContext) {
      return this.newChildActionPublisherChained(new _KatalMetricsContext.default({
        methodName: methodName
      }).merge(additionalContext));
    }
    /**
     * Helper method to create a new action publisher with the given value for methodName.
     *
     * Apart from setting the methodName in the child context, this method is identical to newChildActionPublisherForMethod.
     * @param methodName Method name for new publisher context
     * @param additionalContext Additional context to supply (optional)
     * @returns New publisher identical to this one, but with an updated context
     */

  }, {
    key: "newChildActionPublisherForMethod",
    value: function newChildActionPublisherForMethod(methodName, additionalContext) {
      return this.newChildActionPublisher(new _KatalMetricsContext.default({
        methodName: methodName
      }).merge(additionalContext));
    }
    /**
     * Helper method to create a new action for application initialization.  It will always have a methodName
     * of "Initialization"; otherwise this method is identical to newChildActionPublisherForMethod.
     *
     * @param additionalContext Additional context to be included in the new publisher
     * @returns New publisher identical to this one, but with an updated context
     */

  }, {
    key: "newChildActionPublisherForInitialization",
    value: function newChildActionPublisherForInitialization(additionalContext) {
      return this.newChildActionPublisherForMethod(INITIALIZATION_METHOD_NAME, additionalContext);
    }
    /**
     * Helper method to publish a string with the given name and value.
     *
     * @param name Metric name
     * @param value String value
     */

  }, {
    key: "publishString",
    value: function publishString(name, value) {
      this.publish(new _metricObject.String(name, value));
    }
    /**
     * Helper method to publish a string with the given name and value, truncated to the maximum size allowed by the
     * schema.
     *
     * @param name Metric name
     * @param value String value
     */

  }, {
    key: "publishStringTruncate",
    value: function publishStringTruncate(name, value) {
      var object = new _metricObject.String(name, value);
      object.truncate = true;
      this.publish(object);
    }
    /**
     * Helper method to publish a counter with the given name and value.
     *
     * @param name Metric name
     * @param value Counter value
     */

  }, {
    key: "publishCounter",
    value: function publishCounter(name, value) {
      this.publish(new _metricObject.Counter(name, value));
    }
    /**
     * Helper method to publish a timer with the given name and value.
     *
     * @param name Metric name
     * @param value Timer value
     */

  }, {
    key: "publishTimer",
    value: function publishTimer(name, value) {
      this.publish(new _metricObject.Timer(name, value));
    }
    /**
     * Helper method to publish a counter with the isMonitor flag set, and the given name and value.
     *
     * @param name Metric name
     * @param value Counter value
     */

  }, {
    key: "publishCounterMonitor",
    value: function publishCounterMonitor(name, value) {
      this.publish(new _metricObject.Counter(name, value).withMonitor());
    }
    /**
     * Helper method to publish a timer with the isMonitor flag set, and the given name and value.
     *
     * @param name Metric name
     * @param value Timer value
     */

  }, {
    key: "publishTimerMonitor",
    value: function publishTimerMonitor(name, value) {
      this.publish(new _metricObject.Timer(name, value).withMonitor());
    }
    /**
     * Private helper method to extract an actionId from a context if one is provided, and otherwise generate a new one.
     *
     * @returns Action ID string
     */

  }, {
    key: "_generateActionid",
    value: function _generateActionid(context) {
      if (context) {
        var fields = getContextFields(context);

        if (fields.actionId) {
          return fields.actionId;
        }
      }

      return (0, _v.default)();
    }
  }]);
  return KatalMetricsPublisher;
}();

exports["default"] = KatalMetricsPublisher;

/***/ }),

/***/ 870:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DEFAULT_ERROR_HANDLER = void 0;

var DEFAULT_ERROR_HANDLER = function DEFAULT_ERROR_HANDLER(err) {
  throw err;
};

exports.DEFAULT_ERROR_HANDLER = DEFAULT_ERROR_HANDLER;

/***/ }),

/***/ 652:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

/**
 * Abstract base class for a Katal metrics driver.
 */
var KatalMetricsDriver = /*#__PURE__*/function () {
  function KatalMetricsDriver() {
    (0, _classCallCheck2.default)(this, KatalMetricsDriver);
  }

  (0, _createClass2.default)(KatalMetricsDriver, [{
    key: "publish",
    value:
    /**
     * Publish the given metric object with the given error handler and context.
     *
     * @param metricObject Metric object to publish.  Contains metricKey, isMonitor, type, and value.
     * @param context Context for publishing this metric.  Contains all other fields to be published.
     */
    function publish(metricObject, context) {
      throw new Error('KatalMetricsDriver is an abstract class, please choose a driver and use that instead');
    }
  }]);
  return KatalMetricsDriver;
}();

exports["default"] = KatalMetricsDriver;

/***/ }),

/***/ 5039:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(4994);

__webpack_unused_export__ = ({
  value: true
});
exports.A = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(4634));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _KatalMetricsDriver2 = _interopRequireDefault(__webpack_require__(652));

var _ErrorHandler = __webpack_require__(870);

var _KatalMetricObject = _interopRequireDefault(__webpack_require__(3801));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Logs metrics to the console.
 *
 * Mainly useful for development and experimentation.
 */
var KatalMetricsDriverConsoleLogJson = /*#__PURE__*/function (_KatalMetricsDriver) {
  (0, _inherits2.default)(KatalMetricsDriverConsoleLogJson, _KatalMetricsDriver);

  var _super = _createSuper(KatalMetricsDriverConsoleLogJson);

  /**
   * Create a new console metrics logger.
   *
   * @param logConsole Console (or console-like object) to log metrics to
   * @param errorHandler Callback in case of error
   */
  function KatalMetricsDriverConsoleLogJson() {
    var _this;

    var logConsole = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : console;
    var errorHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ErrorHandler.DEFAULT_ERROR_HANDLER;
    (0, _classCallCheck2.default)(this, KatalMetricsDriverConsoleLogJson);
    _this = _super.call(this);
    _this._errorHandler = errorHandler;
    _this._console = logConsole;
    return _this;
  }

  (0, _createClass2.default)(KatalMetricsDriverConsoleLogJson, [{
    key: "errorHandler",
    get: function get() {
      return this._errorHandler;
    }
  }, {
    key: "publish",
    value: function publish(metricObject, context) {
      var fields = _objectSpread({}, context.getFields());

      switch (metricObject.type) {
        case _KatalMetricObject.default.Types.String:
        case _KatalMetricObject.default.Types.Counter:
        case _KatalMetricObject.default.Types.Timer:
          (0, _extends2.default)(fields, {
            type: metricObject.type,
            metricKey: metricObject.name,
            value: metricObject.value
          });

          if (metricObject.isMonitor) {
            fields.isMonitor = true;
          }

          break;

        default:
          var err = new Error("Unknown type ".concat(metricObject.type, " when publishing metric object."));
          this.errorHandler(err);
          return;
      }

      this._console.log(fields);
    }
  }]);
  return KatalMetricsDriverConsoleLogJson;
}(_KatalMetricsDriver2.default);

exports.A = KatalMetricsDriverConsoleLogJson;

/***/ }),

/***/ 3222:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = firstMap;

/**
 * Returns the first non-undefined value that results from running each value
 * in the given array through the mapper function.
 * @param array An array of values.
 * @param mapper A mapper function that should return a value or undefined.
 * @returns The first non-undefined value from the mapper function.
 */
function firstMap(array, mapper) {
  var toReturn = undefined;
  array.some(function (val) {
    toReturn = mapper(val);
    return toReturn != null;
  });
  return toReturn;
}

;

/***/ }),

/***/ 3242:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var objectValues = Object.values ? Object.values : function (object) {
  return Object.keys(object).map(function (key) {
    return object[key];
  });
};
var _default = objectValues;
exports["default"] = _default;

/***/ }),

/***/ 149:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = validateSimpleInt;

var _typeof2 = _interopRequireDefault(__webpack_require__(3738));

/**
 * Number.isInteger is not in IE11, and letting Babel polyfill it added too much weight.
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 */
var isInteger = function isInteger(val) {
  return isFinite(val) && Math.floor(val) === val;
};
/**
 * Check if the given value is valid to be published to KatalMetrics as an integer (Counter or Timer),
 * and return either undefined (no error), or an Error object describing the problem.
 *
 * @param val Value to check
 * @param nameForError Name to use when constructing the error message, if necessary
 * @returns Error, or undefined if no error
 */


function validateSimpleInt(val, nameForError) {
  if (typeof val !== 'number') {
    return new Error("Expected ".concat(nameForError, " to have type 'number', but it was type '").concat((0, _typeof2.default)(val), "'"));
  }

  if (val < 0) {
    return new Error("Expected ".concat(nameForError, " to be positive, but it was ").concat(val));
  } // This will also catch NaN and Infinity


  if (!isInteger(val)) {
    return new Error("Expected ".concat(nameForError, " to be an integer, but it was ").concat(val));
  } // Couldn't find anything wrong, implicitly return undefined

}

;

/***/ }),

/***/ 595:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = validateSimpleString;

var _typeof2 = _interopRequireDefault(__webpack_require__(3738));

var SIMPLE_STRING_PAT = /^[A-Za-z0-9.:@_/-]+$/;
var SIMPLE_STRING_MAX_LEN = 127;
/**
 * Check if the given value is valid to be published to KatalMetrics as a field value,
 * such as site, serviceName, methodName, or actionId (note this is not used to check values for string metrics).
 * It returns either undefined (no error), or an Error object describing the problem.
 *
 * To be published, it must be a non-empty string, less than 256 characters, containing only ASCII
 * letters, numbers, or these characters: .:@_/- (those are the PMET field value requirements).
 *
 * @param val String value to check
 * @param nameForError Name to use in the error message, if one is generated
 * @returns Error, or undefined if no error
 */

function validateSimpleString(val, nameForError) {
  if (typeof val !== "string") {
    return new Error("Expected ".concat(nameForError, " to be a string, but it was a ").concat((0, _typeof2.default)(val)));
  }

  if (val.length > SIMPLE_STRING_MAX_LEN) {
    return new Error("Expected ".concat(nameForError, " to be less than ").concat(SIMPLE_STRING_MAX_LEN, " characters, but it was ").concat(val.length, " characters"));
  }

  if (val.length < 1) {
    return new Error("Expected ".concat(nameForError, " to be non-blank"));
  }

  if (!SIMPLE_STRING_PAT.test(val)) {
    return new Error("Expected ".concat(nameForError, " to contain only valid characters, but it was ").concat(val, ".  It can only contain letters, numbers, and these symbols: .:@_/-"));
  } // Couldn't find anything wrong, implicitly return undefined

}

/***/ }),

/***/ 5361:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.embedRequestId = embedRequestId;

// until we can add a requestId field to the andes schema we will embed it in the actionId
function embedRequestId(actionId, requestId) {
  if (requestId) {
    return [requestId, actionId].join("::");
  }

  return actionId;
}

/***/ }),

/***/ 7211:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.mergeLists = mergeLists;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(1132));

// Helper method to merge two lists which could be undefined
// Returns merged lists if either is defined, otherwise returns undefined
function mergeLists(list1, list2) {
  if (list1 || list2) {
    return [].concat((0, _toConsumableArray2.default)(list1 || []), (0, _toConsumableArray2.default)(list2 || []));
  } else {
    return undefined;
  }
}

;

/***/ }),

/***/ 6532:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.dispatchMetricEvent = dispatchMetricEvent;

/**
 * Publish to external parties that are 
 * listening for katal.metrics.publish Custom Events
 */
function dispatchMetricEvent(metric, context) {
  if (typeof window === 'undefined') {
    return;
  }

  dispatchCustomEvent(metric, context); // for legacy purposes, also publish to __KATAL_METRICS_EXTENSION__

  publishToMetricsExtension(metric, context);
}

function dispatchCustomEvent(metric, context) {
  if (typeof CustomEvent !== "function") {
    return;
  }

  var event = new CustomEvent('katal.metrics.publish', {
    detail: {
      metric: metric,
      context: context.getFields()
    }
  });
  window.dispatchEvent(event);
}
/**
 * @Deprecated
 * Publish to https://code.amazon.com/packages/KatalMetricsExtension
 * The extension injects a global __KATAL_METRICS_EXTENSION__ object with a
 * `publish` method.
 */


function publishToMetricsExtension(metric, context) {
  var extension = window.__KATAL_METRICS_EXTENSION__;

  if (extension) {
    extension.publish(metric, context.getFields());
  }
}

/***/ }),

/***/ 9253:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = validateCloudWatchDimensions;

var _FirstMap = _interopRequireDefault(__webpack_require__(3222));

var PRINTABLE_ASCII_PATTERN = /^[\x20-\x7E]+$/;
var AT_LEAST_ONE_NON_WHITESPACE_PATTERN = /^.*\S+.*$/;
var DIMENSION_NAME_STRING_MAX_LEN = 255;
var DIMENSION_VALUE_STRING_MAX_LEN = 1024;
/**
 * Check if the given dimensions are valid to be published to KatalMonitoring back-end.
 * It returns either undefined (no error), or an Error object describing the problem.
 *
 * To be published, name and value of string metrics must follow restrictions as described by
 * CloudWatch Dimension API Documentation:
 * https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Dimension.html
 *
 * @param dimensions Array of string metrics to check
 * @returns Error, or undefined if no error
 */

function validateCloudWatchDimensions(dimensions) {
  return (0, _FirstMap.default)(dimensions, function (dimension) {
    var name = dimension.name,
        value = dimension.value;
    return validateCloudWatchDimension(name, value);
  });
}
/**
 * Check if the given dimension is valid as described by CloudWatch documentation.
 * https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Dimension.html
 *
 * @param name CloudWatch Dimension Name String to check
 * @param value CloudWatch Dimension Value String to check
 * @returns Error, or undefined if no error
 */


function validateCloudWatchDimension(name, value) {
  if (name.length > DIMENSION_NAME_STRING_MAX_LEN) {
    return new Error("Expected Dimension name for value ".concat(value, " to be ").concat(DIMENSION_NAME_STRING_MAX_LEN, " characters or less, but it was ").concat(name.length, " characters"));
  }

  if (name.length < 1) {
    return new Error("Expected Dimension name for value ".concat(value, " to be non-blank"));
  }

  if (!PRINTABLE_ASCII_PATTERN.test(name)) {
    return new Error("Expected Dimension name for value ".concat(value, " to contain only ASCII characters, but it was ").concat(name));
  }

  if (!AT_LEAST_ONE_NON_WHITESPACE_PATTERN.test(name)) {
    return new Error("Expected Dimension name for value ".concat(value, " to contain at least one non whitespace character, but it was ").concat(name));
  }

  if (name.startsWith(":")) {
    return new Error("Expected Dimension name for value ".concat(value, " to not start with a colon (\":\"), but it was ").concat(name));
  }

  if (value.length > DIMENSION_VALUE_STRING_MAX_LEN) {
    return new Error("Expected Dimension value for name ".concat(name, " to be ").concat(DIMENSION_VALUE_STRING_MAX_LEN, " characters or less, but it was ").concat(value.length, " characters"));
  }

  if (value.length < 1) {
    return new Error("Expected Dimension value for name ".concat(name, " to be non-blank"));
  }

  if (!PRINTABLE_ASCII_PATTERN.test(value)) {
    return new Error("Expected Dimension value for name ".concat(name, " to contain only ASCII characters, but it was ").concat(value));
  }

  if (!AT_LEAST_ONE_NON_WHITESPACE_PATTERN.test(value)) {
    return new Error("Expected Dimension value for name ".concat(name, " to contain at least one non whitespace character, but it was ").concat(value, "}"));
  } // Couldn't find anything wrong, implicitly return undefined

}

/***/ }),

/***/ 6339:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(4994);

var _typeof = __webpack_require__(3738);

__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CloudWatchDimensions.CloudWatchDimensions;
  }
});
Object.defineProperty(exports, "ob", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricsContext.default;
  }
}));
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ErrorHandler.ErrorHandler;
  }
});
__webpack_unused_export__ = void 0;
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _KatalMetricsDriver.default;
  }
});
Object.defineProperty(exports, "vC", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricsPublisher.default;
  }
}));

var Metric = _interopRequireWildcard(__webpack_require__(1871));

__webpack_unused_export__ = Metric;

var _KatalMetricsPublisher = _interopRequireDefault(__webpack_require__(8461));

var _KatalMetricsContext = _interopRequireDefault(__webpack_require__(3382));

var _KatalMetricsDriver = _interopRequireDefault(__webpack_require__(652));

var _ErrorHandler = __webpack_require__(870);

var _CloudWatchDimensions = __webpack_require__(1044);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/***/ }),

/***/ 3620:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _get2 = _interopRequireDefault(__webpack_require__(2395));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _KatalMetricObject2 = _interopRequireDefault(__webpack_require__(3801));

var _ValidateSimpleInt = _interopRequireDefault(__webpack_require__(149));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Counter type.
 *
 * Can be used to count the number of times an event happened on a page, or as a simple 1/0 counter to track
 * success and failure.
 */
var KatalMetricCounter = /*#__PURE__*/function (_KatalMetricObject) {
  (0, _inherits2.default)(KatalMetricCounter, _KatalMetricObject);

  var _super = _createSuper(KatalMetricCounter);

  /**
   * Create a new counter with the given name and value.
   *
   * @param name Counter name
   * @param value Counter value
   */
  function KatalMetricCounter(name) {
    var _this;

    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    (0, _classCallCheck2.default)(this, KatalMetricCounter);
    _this = _super.call(this, name);
    _this.value = value;
    return _this;
  }
  /**
   * Get the value for this counter
   *
   * @return Counter value
   */


  (0, _createClass2.default)(KatalMetricCounter, [{
    key: "value",
    get: function get() {
      return this._value;
    }
    /**
     * Set a new value for this counter
     *
     * @param value New value for this counter
     */
    ,
    set: function set(value) {
      // Math.round will also coerce from a string if necessary, and return NaN if invalid
      this._value = Math.round(value);
    }
    /**
     * Gets the type for this counter.
     *
     * @return Always returns "Counter".
     */

  }, {
    key: "type",
    get: function get() {
      return _KatalMetricObject2.default.Types.Counter;
    }
    /**
     * Add a number to this counter.
     *
     * Can also be negative to subtract.
     *
     * @param addValue Amount to add to this counter
     */

  }, {
    key: "add",
    value: function add(addValue) {
      this.value += addValue;
    }
  }, {
    key: "canMonitor",
    get: function get() {
      return true;
    }
  }, {
    key: "validationError",
    value: function validationError() {
      var superError = (0, _get2.default)((0, _getPrototypeOf2.default)(KatalMetricCounter.prototype), "validationError", this).call(this);
      if (superError) return superError;
      return (0, _ValidateSimpleInt.default)(this.value, "field value in Counter metrics object '".concat(this.name, "'"));
    }
  }]);
  return KatalMetricCounter;
}(_KatalMetricObject2.default);

exports["default"] = KatalMetricCounter;

/***/ }),

/***/ 3681:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _KatalMetricTimedAttempt = _interopRequireDefault(__webpack_require__(1118));

var _KatalMetricString = _interopRequireDefault(__webpack_require__(5683));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Standardized metric for instrumenting HTTP requests.
 *
 * Under the hood it is a KatalMetricTimedAttempt with the name you provide prefixed with "HTTPRequest.".
 * That object will contain a metric suffixed with ".Latency" for the latency of this request, and a metric suffixed
 * with ".Failure" to record the failure or success of this request.
 *
 * By default the request will be tracked as a failure; to mark it as a success call the "setSuccess()" method.
 *
 * It has additional properties which will be emitted if set; see url, statusCode, and statusText.
 *
 * For example, if you gave the name "Search", these metrics will be created:
 *   HTTPRequest.Search.Latency - Latency for this request
 *   HTTPRequest.Search.Failure - Failure for this request (1 for failure, 0 for success)
 */
var KatalMetricHttpRequest = /*#__PURE__*/function (_KatalMetricTimedAtte) {
  (0, _inherits2.default)(KatalMetricHttpRequest, _KatalMetricTimedAtte);

  var _super = _createSuper(KatalMetricHttpRequest);

  /** The prefix for this metric. */

  /** The suffix for URL metrics of this class. */

  /** The suffix for HTTP response code metrics of this class. */

  /** The suffix for HTTP response text metrics of this class. */

  /**
   * Create a new HTTP Request timed attempt metric incorporating the given name.
   *
   * The name you give will be used to create a KatalMetricTimedAttempt with the provided name prefixed with "HTTPRequest.".
   *
   * @param name Name of this metric; resulting metrics will prefix this name with "HTTPRequest."
   */
  function KatalMetricHttpRequest(name) {
    (0, _classCallCheck2.default)(this, KatalMetricHttpRequest);
    return _super.call(this, "".concat(KatalMetricHttpRequest.HTTP_REQUEST_PREFIX, ".").concat(name));
  }
  /**
   * Set the url for this metric.
   *
   * A string metric will be added to the list of objects that will be published for this metric.  Its name will
   * be this metrics name suffixed with '.URL', and its value will be the URL value given here.
   *
   * @param value URL for this metric
   */


  (0, _createClass2.default)(KatalMetricHttpRequest, [{
    key: "url",
    get:
    /**
     * Get the URL for this metric, if defined.
     *
     * @return The URL for this metric, or undefined
     */
    function get() {
      return this.getNamedMetricValue(KatalMetricHttpRequest.URL_SUFFIX);
    }
    /**
     * Get the URL metric object associated with this metric, if defined.
     *
     * @return Associated URL metric object, or undefined
     */
    ,
    set: function set(value) {
      this.setOrDeleteNamedMetricValue(KatalMetricHttpRequest.URL_SUFFIX, _KatalMetricString.default, value);
    }
  }, {
    key: "urlMetric",
    get: function get() {
      return this.getNamedMetric(KatalMetricHttpRequest.URL_SUFFIX);
    }
    /**
     * Set the HTTP response status code for this metric.
     *
     * A string metric will be added to the list of objects that will be published for this metric.  Its name will
     * be this metrics name suffixed with '.StatusCode', and its value will be the status code value given here.
     *
     * @param value HTTP response status code for this metric
     */

  }, {
    key: "statusCode",
    get:
    /**
     * Get the HTTP response status code for this metric, if defined.
     *
     * @return Associated HTTP response status code metric object, or undefined
     */
    function get() {
      return this.getNamedMetricValue(KatalMetricHttpRequest.STATUS_CODE_SUFFIX);
    }
    /**
     * Get the HTTP response status code metric object associated with this metric, if defined.
     *
     * @return HTTP response status code metric object, or undefined
     */
    ,
    set: function set(value) {
      this.setOrDeleteNamedMetricValue(KatalMetricHttpRequest.STATUS_CODE_SUFFIX, _KatalMetricString.default, value);
    }
  }, {
    key: "statusCodeMetric",
    get: function get() {
      return this.getNamedMetric(KatalMetricHttpRequest.STATUS_CODE_SUFFIX);
    }
    /**
     * Set the HTTP response status text for this metric.
     *
     * A string metric will be added to the list of objects that will be published for this metric.  Its name will
     * be this metrics name suffixed with '.StatusText', and its value will be the status text value given here.
     *
     * @param statusText HTTP response status text for this metric, or undefined to remove
     */

  }, {
    key: "statusText",
    get:
    /**
     * Get the HTTP response status text for this metric, if defined.
     *
     * @return Associated HTTP response status text metric object, or undefined
     */
    function get() {
      return this.getNamedMetricValue(KatalMetricHttpRequest.STATUS_TEXT_SUFFIX);
    }
    /**
     * Get the HTTP response status text for this metric, if defined.
     *
     * @return Associated HTTP response status text metric object, or undefined
     */
    ,
    set: function set(value) {
      this.setOrDeleteNamedMetricValue(KatalMetricHttpRequest.STATUS_TEXT_SUFFIX, _KatalMetricString.default, value);
    }
  }, {
    key: "statusTextMetric",
    get: function get() {
      return this.getNamedMetric(KatalMetricHttpRequest.STATUS_TEXT_SUFFIX);
    }
  }]);
  return KatalMetricHttpRequest;
}(_KatalMetricTimedAttempt.default);

exports["default"] = KatalMetricHttpRequest;
(0, _defineProperty2.default)(KatalMetricHttpRequest, "HTTP_REQUEST_PREFIX", 'HTTPRequest');
(0, _defineProperty2.default)(KatalMetricHttpRequest, "URL_SUFFIX", 'URL');
(0, _defineProperty2.default)(KatalMetricHttpRequest, "STATUS_CODE_SUFFIX", 'StatusCode');
(0, _defineProperty2.default)(KatalMetricHttpRequest, "STATUS_TEXT_SUFFIX", 'StatusText');

/***/ }),

/***/ 2910:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _KatalMetricTimedAttempt = _interopRequireDefault(__webpack_require__(1118));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Standardized metric for instrumenting application initialization.
 *
 * Under the hood it is a KatalMetricTimedAttempt with the name "Initialization".
 * That object will contain a metric suffixed with ".Latency" for the latency of this request, and a metric suffixed
 * with ".Failure" to record the failure or success of this request.
 *
 * By default the request will be tracked as a failure; to mark it as a success call the "setSuccess()" method.
 *
 * By default, these metrics will be created:
 *   Initialization.Latency - Latency for application initialization
 *   Initialization.Failure - Failure for this application initialization (1 for failure, 0 for success)
 */
var KatalMetricInitialization = /*#__PURE__*/function (_KatalMetricTimedAtte) {
  (0, _inherits2.default)(KatalMetricInitialization, _KatalMetricTimedAtte);

  var _super = _createSuper(KatalMetricInitialization);

  /** The name for this metric. */

  /**
   * Create a new timed attempt metric named "Initialization", for recording latency and failure information about
   * your application's initialization.
   */
  function KatalMetricInitialization() {
    (0, _classCallCheck2.default)(this, KatalMetricInitialization);
    return _super.call(this, KatalMetricInitialization.INITIALIZE_METRIC_NAME);
  }

  return KatalMetricInitialization;
}(_KatalMetricTimedAttempt.default);

exports["default"] = KatalMetricInitialization;
(0, _defineProperty2.default)(KatalMetricInitialization, "INITIALIZE_METRIC_NAME", 'Initialization');

/***/ }),

/***/ 6662:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _KatalMetricObjectList = _interopRequireDefault(__webpack_require__(6813));

var _ObjectValuesPonyfill = _interopRequireDefault(__webpack_require__(3242));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Metric object list that tracks metrics by name, and generates metrics prefixed with the name of this object.
 */
var KatalMetricNamedObjectList = /*#__PURE__*/function (_KatalMetricObjectLis) {
  (0, _inherits2.default)(KatalMetricNamedObjectList, _KatalMetricObjectLis);

  var _super = _createSuper(KatalMetricNamedObjectList);

  /**
   * Create a new named object list.
   *
   * The name given here will be used to prefix all metrics.
   *
   * @param name Name of this metric
   */
  function KatalMetricNamedObjectList(name) {
    var _this;

    (0, _classCallCheck2.default)(this, KatalMetricNamedObjectList);
    _this = _super.call(this, name);
    _this.namedMetrics = {};
    return _this;
  }

  (0, _createClass2.default)(KatalMetricNamedObjectList, [{
    key: "metricList",
    get: function get() {
      return (0, _ObjectValuesPonyfill.default)(this.namedMetrics);
    }
    /**
     * Replace the metric with the given name with a new metric generated by the given function.
     *
     * If the newly created metric supports monitoring, its isMonitor flag will be set to the value of the
     * isMonitor flag for this containing object.
     *
     * @param subName Name of this sub-metric
     * @param metricCreator Function which takes the full name for this metric
     *        and returns a newly constructed KatalMetricObject with this name and an appropriate value
     */

  }, {
    key: "setNamedMetric",
    value: function setNamedMetric(subName, metricCreator) {
      var fullName = this.getNameForSubMetric(subName);
      var metric = metricCreator(fullName);

      if (metric.canMonitor) {
        metric.isMonitor = this.isMonitor;
      }

      this.namedMetrics[subName] = metric;
    }
    /**
     * If the given value is undefined or null, delete the metric with the give name; otherwise if the given named
     * metric already exists update its value; otherwise create a new metric of the given type and set its value.
     *
     * This specialized helper method is designed to deal with the common case of a value setter in a more complex
     * metric.  Outside of subclasses, other methods will probably prove more useful.
     *
     * If the value is null the metric will also be deleted.
     *
     * @param subName Name of metric to create or delete
     * @param newValueClass Class of new metric to create
     * @param newValue New value for this metric (or undefined to delete the metric)
     */

  }, {
    key: "setOrDeleteNamedMetricValue",
    value: function setOrDeleteNamedMetricValue(subName, newValueClass, newValue) {
      if (newValue == undefined) {
        this.deleteNamedMetric(subName);
      } else {
        var metric = this.getOrCreateNamedMetric(subName, function (name) {
          return new newValueClass(name, newValue);
        });
        metric.value = newValue;
      }
    }
    /**
     * Get the sub-metric with the given name if it exists, otherwise use the given function to create a new metric and
     * store and return that.
     *
     * @param subName Name of this sub-metric
     * @param metricCreator Function which takes the full name for this metric
     *        and returns a newly constructed KatalMetricObject with this name and an appropriate value
     * @return Metric object which was retrieved or created
     */

  }, {
    key: "getOrCreateNamedMetric",
    value: function getOrCreateNamedMetric(subName, metricCreator) {
      if (!this.namedMetrics[subName]) {
        this.setNamedMetric(subName, metricCreator);
      }

      return this.namedMetrics[subName];
    }
    /**
     * Return the given named sub-metric, if it exists.
     *
     * @param {string} subName Name of this sub-metric
     * @return {KatalMetricObject | undefined} Metric object with this name if it exists, otherwise undefined
     */

  }, {
    key: "getNamedMetric",
    value: function getNamedMetric(subName) {
      return this.namedMetrics[subName];
    }
    /**
     * Delete the given named sub-metric.
     *
     * @param subName Name of this sub-metric
     */

  }, {
    key: "deleteNamedMetric",
    value: function deleteNamedMetric(subName) {
      delete this.namedMetrics[subName];
    }
    /**
     * Get the value for the given metric, or undefined if the metric does not exist.
     *
     * @param subName Name of this sub-metric
     * @return Value for the given metric, or undefined if the metric does not exist
     */

  }, {
    key: "getNamedMetricValue",
    value: function getNamedMetricValue(subName) {
      var metric = this.getNamedMetric(subName);
      if (!metric) return undefined;
      return metric.value;
    }
    /**
     * Generate a name for the given sub-metric.
     *
     * @param subName Name of this sub-metric
     * @return Full name for this sub-metric
     */

  }, {
    key: "getNameForSubMetric",
    value: function getNameForSubMetric(subName) {
      return "".concat(this.name, ".").concat(subName);
    }
  }]);
  return KatalMetricNamedObjectList;
}(_KatalMetricObjectList.default);

exports["default"] = KatalMetricNamedObjectList;

/***/ }),

/***/ 3801:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__(3738));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _ValidateSimpleString = _interopRequireDefault(__webpack_require__(595));

var _KatalMetricType = _interopRequireDefault(__webpack_require__(858));

/**
 * Abstract base class for a single metric in Katal.
 *
 * A single metric contains the name (metricKey), value, type, and the isMonitor flag; everything else is in the
 * KatalMetricsContext it is published to.
 */
var KatalMetricObject = /*#__PURE__*/function () {
  /**
   * Metric types.
   */

  /**
   * Create a new KatalMetricObject with the given name.
   *
   * @param name Name for this metric; published as metricKey field
   */
  function KatalMetricObject(name) {
    (0, _classCallCheck2.default)(this, KatalMetricObject);
    this._name = name;
    this._isMonitor = false;
  }
  /**
   * Get the name for this metric.
   *
   * Note that the name is immutable, and this cannot be set.
   *
   * @returns Name for this metric
   */


  (0, _createClass2.default)(KatalMetricObject, [{
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * Alias for name.
     *
     * @returns Name for this metric
     */

  }, {
    key: "metricKey",
    get: function get() {
      return this._name;
    }
    /**
     * Set the isMonitor flag for this metric, and returns this object for continued use.
     *
     * This flag determines if the metric can be used for dashboards and alarms (i.e. if it will be published to PMET)
     * @param isMonitor New value for the isMonitor flag; defaults to true
     * @returns This object
     */

  }, {
    key: "withMonitor",
    value: function withMonitor() {
      var isMonitor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.isMonitor = isMonitor;
      return this;
    }
    /**
     * Set the isMonitor flag for this metric.
     *
     * The value is forced to a boolean based on its truthiness.
     *
     * @param isMonitor New value for the isMonitor flag
     */

  }, {
    key: "isMonitor",
    get:
    /**
     * Get the isMonitor flag for this metric.
     *
     * @returns isMonitor flag for this metric.
     */
    function get() {
      return this._isMonitor;
    }
    /**
     * Check if this metric can be meaningfully monitored.
     *
     * Subclasses must override this.
     *
     * @return Whether this metric can be meaningfully monitored
     */
    ,
    set: function set(isMonitor) {
      this._isMonitor = !!isMonitor;
    }
  }, {
    key: "canMonitor",
    get: function get() {
      throw new Error('Subclass of KatalMetricObject must implement canMonitor');
    }
    /**
     * Get the type of this metric.
     *
     * @return Type of this metric (one of: String, Counter, Timer, List)
     */

  }, {
    key: "type",
    get: function get() {
      throw new Error('Subclass of KatalMetricObject must implement type getter');
    }
    /**
     * Check for a validation error on this object.
     *
     * Returns the first validation error encountered if one is found, otherwise undefined.
     *
     * @returns {Error | undefined} Error found with this object, or undefined if no error is found
     */

  }, {
    key: "validationError",
    value: function validationError() {
      if (this.isMonitor !== undefined && typeof this.isMonitor !== 'boolean') {
        return new Error("Field isMonitor should be a boolean, but it was a ".concat((0, _typeof2.default)(this.isMonitor)));
      }

      return (0, _ValidateSimpleString.default)(this.name, 'field name');
    }
  }]);
  return KatalMetricObject;
}();

exports["default"] = KatalMetricObject;
(0, _defineProperty2.default)(KatalMetricObject, "Types", _KatalMetricType.default);

/***/ }),

/***/ 6813:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _get2 = _interopRequireDefault(__webpack_require__(2395));

var _set2 = _interopRequireDefault(__webpack_require__(703));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _KatalMetricObject2 = _interopRequireDefault(__webpack_require__(3801));

var _FirstMap = _interopRequireDefault(__webpack_require__(3222));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Abstract metric that contains a list of other metrics; when it is published, the list of metrics is retrieved, and all
 * are published.
 */
var KatalMetricObjectList = /*#__PURE__*/function (_KatalMetricObject) {
  (0, _inherits2.default)(KatalMetricObjectList, _KatalMetricObject);

  var _super = _createSuper(KatalMetricObjectList);

  /**
   * Create a new KatalMetricObjectList.
   *
   * @param name Name for this metric.  Not really used, but present for consistency with other metrics.
   */
  function KatalMetricObjectList(name) {
    (0, _classCallCheck2.default)(this, KatalMetricObjectList);
    return _super.call(this, name);
  }
  /**
   * Get the list of for this object
   *
   * @returns Array of metrics for this object
   */


  (0, _createClass2.default)(KatalMetricObjectList, [{
    key: "metricList",
    get: function get() {
      throw new Error('Subclass of KatalMetricObjectList must implement metricList getter');
    }
  }, {
    key: "isMonitor",
    get: // This just delegates to the superclass, but if we override the setter without overriding the getter
    // getting the property will always return undefined.
    function get() {
      return (0, _get2.default)((0, _getPrototypeOf2.default)(KatalMetricObjectList.prototype), "isMonitor", this);
    },
    set: function set(isMonitor) {
      (0, _set2.default)((0, _getPrototypeOf2.default)(KatalMetricObjectList.prototype), "isMonitor", isMonitor, this, true);
      this.metricList.forEach(function (metric) {
        if (metric.canMonitor) {
          metric.isMonitor = isMonitor;
        }
      });
    }
  }, {
    key: "canMonitor",
    get: function get() {
      return true;
    }
  }, {
    key: "type",
    get: function get() {
      return _KatalMetricObject2.default.Types.List;
    }
    /**
     * If any of the contained metrics are invalid, return the first validation error encountered; otherwise return
     * undefined.
     *
     * Note that this isn't called by the publisher; it validates each sub-metric on its own.
     *
     * @returns Error found with submetric, if any; else undefined
     */

  }, {
    key: "validationError",
    value: function validationError() {
      // Doesn't make sense to check superclass error here, since it is the contained metrics that matter.
      return (0, _FirstMap.default)(this.metricList, function (metric) {
        return metric.validationError();
      });
    }
  }]);
  return KatalMetricObjectList;
}(_KatalMetricObject2.default);

exports["default"] = KatalMetricObjectList;

/***/ }),

/***/ 5683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__(3738));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(2475));

var _get2 = _interopRequireDefault(__webpack_require__(2395));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _KatalMetricObject2 = _interopRequireDefault(__webpack_require__(3801));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * String type.
 *
 * Can be used to store arbitrary strings of data.
 */
var KatalMetricString = /*#__PURE__*/function (_KatalMetricObject) {
  (0, _inherits2.default)(KatalMetricString, _KatalMetricObject);

  var _super = _createSuper(KatalMetricString);

  /**
   * Create a string with the given name and value.
   *
   * @param name String name
   * @param value String value
   */
  function KatalMetricString(name, value) {
    var _this;

    (0, _classCallCheck2.default)(this, KatalMetricString);
    _this = _super.call(this, name);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "truncate", false);
    _this.value = value;
    return _this;
  }
  /**
   * Get the value for this string metric.
   *
   * @return Value for this metric
   */


  (0, _createClass2.default)(KatalMetricString, [{
    key: "value",
    get: function get() {
      return this._value;
    }
    /**
     * Set the value for this string metric.
     *
     * The new value should be a string, but number and boolean types will be automatically converted to strings.
     * For other types, including undefined and null, the value will be accepted, but will fail validation when publishing.
     *
     * @param value New value for this metric
     */
    ,
    set: function set(value) {
      if (typeof value === "number" || typeof value === "boolean") {
        value = value.toString();
      }

      this._value = value;
    }
    /**
     * Truncation flag for this string metric.
     *
     * If set, the value here will be automatically truncated to the maximum size allowed by the current schema.
     * Otherwise, sending a value larger than allowed will result in a failure.
     *
     * @param value True to automatically truncate metrics, otherwise false
     */

  }, {
    key: "type",
    get:
    /**
     * Gets the type for this metric.
     *
     * @return Always returns "String".
     */
    function get() {
      return _KatalMetricObject2.default.Types.String;
    }
  }, {
    key: "canMonitor",
    get: function get() {
      return false;
    }
  }, {
    key: "validationError",
    value: function validationError() {
      var superError = (0, _get2.default)((0, _getPrototypeOf2.default)(KatalMetricString.prototype), "validationError", this).call(this);
      if (superError) return superError;

      if (typeof this.value !== 'string') {
        return new Error("Expected field value in String metrics object '".concat(this.name, "' to be type string, but it was ").concat((0, _typeof2.default)(this.value)));
      }

      if (this.value.length > KatalMetricString.MAX_SIZE) {
        if (this.truncate) {
          this.value = this.value.substring(0, KatalMetricString.MAX_SIZE);
        } else {
          return new Error("Expected field value in String metrics object '".concat(this.name, "' to be ").concat(KatalMetricString.MAX_SIZE, " characters or less, but it was ").concat(this.value.length, " characters."));
        }
      } // Didn't find anything wrong, implicitly return undefined

    }
  }]);
  return KatalMetricString;
}(_KatalMetricObject2.default);

exports["default"] = KatalMetricString;
(0, _defineProperty2.default)(KatalMetricString, "MAX_SIZE", 256);

/***/ }),

/***/ 1118:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _KatalMetricNamedObjectList = _interopRequireDefault(__webpack_require__(6662));

var _KatalMetricTimerStopwatch = _interopRequireDefault(__webpack_require__(8198));

var _KatalMetricCounter = _interopRequireDefault(__webpack_require__(3620));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Metric that pairs a timer and a failure counter to record the time and status of an attempt to do something.
 */
var KatalMetricTimedAttempt = /*#__PURE__*/function (_KatalMetricNamedObje) {
  (0, _inherits2.default)(KatalMetricTimedAttempt, _KatalMetricNamedObje);

  var _super = _createSuper(KatalMetricTimedAttempt);

  /** The sub-metric name for latency. */

  /** The sub-metric name for failure count. */

  /**
   * Create a new timed attempt with the given name
   *
   * This will create two inner metrics, a KatalMetricCounter that has the given name with ".Failure" appended,
   * and a KatalMetricTimerStopwatch that has the given name with ".Latency" appended.
   *
   * @param name Name of this attempt
   */
  function KatalMetricTimedAttempt(name) {
    var _this;

    (0, _classCallCheck2.default)(this, KatalMetricTimedAttempt);
    _this = _super.call(this, name);

    _this.setNamedMetric(KatalMetricTimedAttempt.LATENCY_SUFFIX, function (name) {
      return new _KatalMetricTimerStopwatch.default(name);
    });

    _this.setNamedMetric(KatalMetricTimedAttempt.FAILURE_SUFFIX, function (name) {
      return new _KatalMetricCounter.default(name, 1);
    });

    return _this;
  }
  /**
   * Set the failure counter metric based on the given failure status.
   *
   * If failure is true the counter will have a value of 1; if it is false the counter will have a value of 0.
   *
   * @param failure Whether this is a failure or not; default true
   */


  (0, _createClass2.default)(KatalMetricTimedAttempt, [{
    key: "setFailure",
    value: function setFailure() {
      var failure = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var failureCount = failure ? 1 : 0;
      var metric = this.failureMetric;
      metric.value = failureCount;
    }
    /**
     * Set the failure status to false.
     */

  }, {
    key: "setSuccess",
    value: function setSuccess() {
      this.setFailure(false);
    }
    /**
     * Set the latency metric to the given value, in milliseconds.
     *
     * Note you don't normally have to set this, the underlying metric is a KatalMetricTimerStopwatch that will start
     * and stop automatically.
     *
     * @param latencyMs Latency in milliseconds
     */

  }, {
    key: "setLatency",
    value: function setLatency(latencyMs) {
      var metric = this.latencyMetric;
      metric.value = latencyMs;
    }
    /**
     * Get the timer stopwatch metric for this attempt.
     *
     * @return Timer stopwatch metric for this attempt
     */

  }, {
    key: "latencyMetric",
    get: function get() {
      return this.getNamedMetric(KatalMetricTimedAttempt.LATENCY_SUFFIX);
    }
    /**
     * Get the failure counter metric for this attempt.
     *
     * @return Failure counter metric for this event
     */

  }, {
    key: "failureMetric",
    get: function get() {
      return this.getNamedMetric(KatalMetricTimedAttempt.FAILURE_SUFFIX);
    }
  }]);
  return KatalMetricTimedAttempt;
}(_KatalMetricNamedObjectList.default);

exports["default"] = KatalMetricTimedAttempt;
(0, _defineProperty2.default)(KatalMetricTimedAttempt, "LATENCY_SUFFIX", 'Latency');
(0, _defineProperty2.default)(KatalMetricTimedAttempt, "FAILURE_SUFFIX", 'Failure');

/***/ }),

/***/ 4177:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _get2 = _interopRequireDefault(__webpack_require__(2395));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _KatalMetricObject2 = _interopRequireDefault(__webpack_require__(3801));

var _ValidateSimpleInt = _interopRequireDefault(__webpack_require__(149));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Timer type.
 *
 * Can be used to record a time.  This class requires explicit value; see KatalMetricTimerStopwatch for automatic
 * timing.
 */
var KatalMetricTimer = /*#__PURE__*/function (_KatalMetricObject) {
  (0, _inherits2.default)(KatalMetricTimer, _KatalMetricObject);

  var _super = _createSuper(KatalMetricTimer);

  /**
   * Create a new timer metric.
   *
   * @param name Name for the metric
   * @param value Timer value in milliseconds
   */
  function KatalMetricTimer(name, value) {
    var _this;

    (0, _classCallCheck2.default)(this, KatalMetricTimer);
    _this = _super.call(this, name);
    _this.value = value;
    return _this;
  }
  /**
   * Get the value for this timer
   *
   * @return Timer value in milliseconds
   */


  (0, _createClass2.default)(KatalMetricTimer, [{
    key: "value",
    get: function get() {
      return this._value;
    }
    /**
     * Set the value for this timer
     *
     * @param value New timer value in milliseconds
     */
    ,
    set: function set(value) {
      if (value == undefined) {
        this._value = value;
        return;
      } // Math.round will also coerce from a string if necessary, and return NaN if invalid


      this._value = Math.round(value);
    }
    /**
     * Get the type for this timer.
     *
     * @return Always returns "Timer".
     */

  }, {
    key: "type",
    get: function get() {
      return _KatalMetricObject2.default.Types.Timer;
    }
  }, {
    key: "canMonitor",
    get: function get() {
      return true;
    }
  }, {
    key: "validationError",
    value: function validationError() {
      var superError = (0, _get2.default)((0, _getPrototypeOf2.default)(KatalMetricTimer.prototype), "validationError", this).call(this);
      if (superError) return superError;
      return (0, _ValidateSimpleInt.default)(this.value, "field value in Timer metrics object '".concat(this.name, "'"));
    }
  }]);
  return KatalMetricTimer;
}(_KatalMetricObject2.default);

exports["default"] = KatalMetricTimer;

/***/ }),

/***/ 8198:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

var _set2 = _interopRequireDefault(__webpack_require__(703));

var _get2 = _interopRequireDefault(__webpack_require__(2395));

var _inherits2 = _interopRequireDefault(__webpack_require__(9511));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(8452));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(3072));

var _KatalMetricTimer2 = _interopRequireDefault(__webpack_require__(4177));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Subclass of KatalMetricTimer that can be started and stopped, and will record the elapsed time between starting and
 * stopping.  By default it will start when the object is created, and stopped when the value is retrieved with
 * the getter "value".
 */
var KatalMetricTimerStopwatch = /*#__PURE__*/function (_KatalMetricTimer) {
  (0, _inherits2.default)(KatalMetricTimerStopwatch, _KatalMetricTimer);

  var _super = _createSuper(KatalMetricTimerStopwatch);

  /**
   * Create a new timer with the given name and starting time.  If no starting time is given, the current time is used.
   *
   * @param name Name for this timer
   * @param startTime Millisecond epoch time for the start time; defaults to now
   */
  function KatalMetricTimerStopwatch(name, startTime) {
    var _this;

    (0, _classCallCheck2.default)(this, KatalMetricTimerStopwatch);
    _this = _super.call(this, name, undefined);

    _this.start(startTime);

    _this._value = undefined;
    return _this;
  }
  /**
   * Re-start timer with the given start time, or the current time if none is given.
   *
   * @param startTime When the timer was started, in epoch milliseconds; defaults to now
   */


  (0, _createClass2.default)(KatalMetricTimerStopwatch, [{
    key: "start",
    value: function start(startTime) {
      this._startTime = startTime || this.now();
    }
    /**
     * Stop the timer and record the elapsed time.
     *
     * @param stopTime When the timer was stopped, in epoch milliseconds; defaults to now
     */

  }, {
    key: "stop",
    value: function stop(stopTime) {
      return this._stopTime = stopTime || this.now();
    }
    /**
     * Check if the timer has been stopped.
     *
     * @returns Whether the timer has been stopped yet
     */

  }, {
    key: "isStopped",
    get: function get() {
      return this._stopTime !== undefined;
    }
    /**
     * Get the elapsed time between when the timer was started and stopped; if the timer has not yet been stopped,
     * stop it first.
     *
     * @returns Elapsed time between when timer was started and stopped
     */

  }, {
    key: "value",
    get: function get() {
      if ((0, _get2.default)((0, _getPrototypeOf2.default)(KatalMetricTimerStopwatch.prototype), "value", this) === undefined) {
        if (!this.isStopped) {
          this.stop();
        } // Rely on super.value setter to round


        (0, _set2.default)((0, _getPrototypeOf2.default)(KatalMetricTimerStopwatch.prototype), "value", this.stopTime - this.startTime, this, true);
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(KatalMetricTimerStopwatch.prototype), "value", this);
    }
    /**
     * Get when this timer was started.
     *
     * @return Start time, in epoch milliseconds
     */
    ,
    set:
    /**
     * Set the value for this metric.  Note this will override the stopwatch behavior and just use the given value.
     *
     * @param value Value for this metric
     */
    function set(value) {
      (0, _set2.default)((0, _getPrototypeOf2.default)(KatalMetricTimerStopwatch.prototype), "value", value, this, true);
    }
  }, {
    key: "startTime",
    get: function get() {
      return this._startTime;
    }
    /**
     * Get when this timer was stopped (or undefined if it is still running)
     *
     * @return Stop time, in epoch millseconds, or undefined if the stopwatch is still running
     */

  }, {
    key: "stopTime",
    get: function get() {
      return this._stopTime;
    }
  }, {
    key: "now",
    value: function now() {
      return performance.now();
    }
  }]);
  return KatalMetricTimerStopwatch;
}(_KatalMetricTimer2.default);

exports["default"] = KatalMetricTimerStopwatch;

/***/ }),

/***/ 858:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/**
 * Metric types.
 */
var KatalMetricType;

(function (KatalMetricType) {
  KatalMetricType["String"] = "String";
  KatalMetricType["Counter"] = "Counter";
  KatalMetricType["Timer"] = "Timer";
  KatalMetricType["List"] = "List";
})(KatalMetricType || (KatalMetricType = {}));

;
var _default = KatalMetricType;
exports["default"] = _default;

/***/ }),

/***/ 1871:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "Counter", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricCounter.default;
  }
}));
Object.defineProperty(exports, "HttpRequest", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricHttpRequest.default;
  }
}));
Object.defineProperty(exports, "Initialization", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricInitialization.default;
  }
}));
Object.defineProperty(exports, "Object", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricObject.default;
  }
}));
Object.defineProperty(exports, "String", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricString.default;
  }
}));
Object.defineProperty(exports, "TimedAttempt", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricTimedAttempt.default;
  }
}));
Object.defineProperty(exports, "Timer", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricTimer.default;
  }
}));
Object.defineProperty(exports, "TimerStopwatch", ({
  enumerable: true,
  get: function get() {
    return _KatalMetricTimerStopwatch.default;
  }
}));

var _KatalMetricObject = _interopRequireDefault(__webpack_require__(3801));

var _KatalMetricString = _interopRequireDefault(__webpack_require__(5683));

var _KatalMetricCounter = _interopRequireDefault(__webpack_require__(3620));

var _KatalMetricTimer = _interopRequireDefault(__webpack_require__(4177));

var _KatalMetricTimerStopwatch = _interopRequireDefault(__webpack_require__(8198));

var _KatalMetricTimedAttempt = _interopRequireDefault(__webpack_require__(1118));

var _KatalMetricInitialization = _interopRequireDefault(__webpack_require__(2910));

var _KatalMetricHttpRequest = _interopRequireDefault(__webpack_require__(3681));

/***/ }),

/***/ 1044:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 6700:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(4994);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3693));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7383));

var _createClass2 = _interopRequireDefault(__webpack_require__(4579));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * This class encapsulates two IIFEs that the Sushi library contains. A fake CSM and Window object are created and provided
 * to the functions so that they actually execute in a controlled environment away from any CSM code that might be executing
 * at the platform level within the page.
 *
 * The basic run order is the following:
 * 1. Build the mock CSM object, then build a mock Window object that references the CSM object as ue_csm
 * 2. Run the transportation-clients.js Script from SushiJavascriptClient providing the mocks. It will modify globals on the mock objects.
 * 3. Run the sushi-client.js script from SushiJavaScriptClient providing the mocks. It will create an instance of the sushi client and inject it into the CSM globals in the mocks.
 * 4. whenever event() is called, refer to the encapsulated csm object to add the event to the queue.
 */
var SushiClient =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(SushiClient, null, [{
    key: "createSushiUrl",
    value: function createSushiUrl(region, sourceGroup) {
      if (!sourceGroup) {
        throw new Error("Sushi Driver was not provided with a source group.");
      }

      var domain;

      switch (region) {
        case SushiClient.REGIONS.NA:
          domain = "unagi-na";
          break;

        case SushiClient.REGIONS.EU:
          domain = "unagi-eu";
          break;

        case SushiClient.REGIONS.FE:
          domain = "unagi-fe";
          break;

        case SushiClient.REGIONS.CN:
          domain = "unagi-cn";
          break;

        default:
          throw new Error("Unrecognized region '".concat(region, "' provided to SushiClient."));
      }

      return "https://".concat(domain, ".amazon.com/1/events/").concat(sourceGroup);
    }
  }, {
    key: "createCsmUserContext",
    value: function createCsmUserContext(sushiUrl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _objectSpread({
        hiPriFlushInterval: 1000,
        lowPriFlushInterval: 10000,
        requestId: "1",
        errorChannel: "jserr",
        sessionStorageWrapper: undefined,
        errorHandlerFunction: console.log,
        sushiUrl: sushiUrl
      }, options);
    }
    /**
     * Create a Sushi Client for a region and source group
     *
     * @param region Region in SushiClient.REGIONS
     * @param sourceGroup Sushi Eel source group
     * @param errorHandler Error handler function
     * @param options Additional CSM context overrides
     * @param clientOverride An optional transportation client for overriding the default clients (navigator.sendBeacon and XDomainRequest or XMLHttpRequest)
     */

  }, {
    key: "REGIONS",
    get: function get() {
      return {
        NA: "NA",
        EU: "EU",
        FE: "FE",
        CN: "CN"
      };
    }
  }]);

  function SushiClient() {
    var region = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SushiClient.REGIONS.NA;
    var sourceGroup = arguments.length > 1 ? arguments[1] : undefined;
    var errorHandler = arguments.length > 2 ? arguments[2] : undefined;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var clientOverride = arguments.length > 4 ? arguments[4] : undefined;
    (0, _classCallCheck2.default)(this, SushiClient);
    var sushiUrl = SushiClient.createSushiUrl(region, sourceGroup);
    var csmUserContext = SushiClient.createCsmUserContext(sushiUrl, options);
    this.ue_csm = this.setupMockCSMObject(csmUserContext);
    this.encapsulatedWindow = this.setupMockWindow(this.ue_csm);
    this.transportationClientCode(this.ue_csm, window);

    if (clientOverride) {
      this.ue_csm.ue._sBcn = {
        isSupported: true,
        send: function send(endpoint, payload) {
          clientOverride(endpoint, payload);
          return true;
        }
      };
    }

    this.clientCode(this.ue_csm, this.encapsulatedWindow);
    this.errorHandler = errorHandler;
  }

  (0, _createClass2.default)(SushiClient, [{
    key: "event",
    value: function event(data, producerId, schemaId, options) {
      var debug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (debug) {
        console.log("SushiClient wrapper publishing the following:", {
          data: data,
          producerId: producerId,
          schemaId: schemaId,
          options: options
        });
      }

      return this.ue_csm.ue.event(data, producerId, schemaId, options);
    }
    /**
     * If you plan to emit 1000 or more events per instantiated client,
     * call reset after calling event to allow the CSM client to continue sending events.
     */

  }, {
    key: "reset",
    value: function reset() {
      this.ue_csm.ue.event.reset();
    }
    /**
     * Register a callback that will be called just before each time metrics are
     * flushed to the network.
     * @param callback A function that sushi will call before flushes.
     */

  }, {
    key: "onSushiFlush",
    value: function onSushiFlush(callback) {
      this.ue_csm.ue.onSushiFlush(callback);
    }
    /**
     * Register a callback that will be called just before the page unloads.
     * This can be used to send any final metrics to sushi, such as page visit
     * duration or batched counters.
     * @param callback A function that sushi will call before unload.
     */

  }, {
    key: "onSushiUnload",
    value: function onSushiUnload(callback) {
      this.ue_csm.ue.onSushiUnload(callback);
    }
  }, {
    key: "setupMockCSMObject",
    value: function setupMockCSMObject(csmUserContext) {
      var _this = this;

      var execStub = function execStub(callback, attribution) {
        return callback;
      };

      var eventStub = function eventStub(log, producer, eventType) {
        console.warn("SushiClient CSM stub called in unsupported manner: event()");
      };

      var errorHandler = function errorHandler(logEvent, channel) {
        if (_this.errorHandler) {
          _this.errorHandler(logEvent);
        } else {
          console.log("An error has occurred in SushiClient channel " + channel, logEvent);
        }
      };

      var attachHandler = function attachHandler(evt, handler, container) {
        //TODO might be able to just use window.ue.attach?
        container = container || window; //ok to use real window global here.

        if (window.EventTarget && window.EventTarget.prototype && window.EventTarget.prototype.addEventListener) {
          window.EventTarget.prototype.addEventListener.call(container, evt, handler, !!window.ue_clf);
        } else if (container.addEventListener) {
          container.addEventListener(evt, handler, !!window.ue_clf);
        } else if (container.attachEvent) {
          container.attachEvent("on" + evt, handler);
        }
      };

      return {
        ue_hpsi: csmUserContext.hiPriFlushInterval,
        ue_lpsi: csmUserContext.lowPriFlushInterval,
        ue: {
          ssw: csmUserContext.sessionStorageWrapper,
          log: errorHandler,
          exec: execStub,
          event: eventStub,
          attach: attachHandler
        },
        ueLogError: csmUserContext.errorHandlerFunction,
        ue_surl: csmUserContext.sushiUrl,
        ue_id: csmUserContext.requestId,
        ue_err_chan: csmUserContext.errorChannel
      };
    }
  }, {
    key: "setupMockWindow",
    value: function setupMockWindow(ue_csm) {
      //apparently cannot ref the setTimeout function directly in some browsers so we have to wrap it.
      var timeoutWrapper = function timeoutWrapper(fn, timeout) {
        return window.setTimeout(fn, timeout);
      };

      return {
        ue_csm: ue_csm,
        ueLogError: ue_csm.ueLogError,
        ue: ue_csm.ue,
        setTimeout: timeoutWrapper
      };
    }
    /**
     * Code within function pulled directly from
     * https://code.amazon.com/packages/SushiJavaScriptClient/blobs/mainline/--/javascript/sushi-client.js
     */

  }, {
    key: "clientCode",
    value: function clientCode(ue_csm, window) {
      ue_csm.ue.exec(function (b, k) {
        function A() {
          for (var a = 0; a < arguments.length; a++) {
            var c = arguments[a];

            try {
              var h;

              if (c.isSupported) {
                var b = t.buildPayload(l, e);
                h = c.send(J, b);
              } else throw dummyException;

              return h;
            } catch (d) {}
          }

          B({
            m: "All supported clients failed",
            attribution: "CSMSushiClient_TRANSPORTATION_FAIL",
            f: "sushi-client.js",
            logLevel: "ERROR"
          }, k.ue_err_chan || "jserr");
        }

        function m() {
          if (e.length) {
            for (var a = 0; a < n.length; a++) {
              n[a]();
            }

            A(d._sBcn || {}, d._ajx || {});
            e = [];
            f = {};
            l = {};
            u = v = q = w = 0;
          }
        }

        function K() {
          var a = new Date(),
              c = function c(a) {
            return 10 > a ? "0" + a : a;
          };

          return Date.prototype.toISOString ? a.toISOString() : a.getUTCFullYear() + "-" + c(a.getUTCMonth() + 1) + "-" + c(a.getUTCDate()) + "T" + c(a.getUTCHours()) + ":" + c(a.getUTCMinutes()) + ":" + c(a.getUTCSeconds()) + "." + String((a.getUTCMilliseconds() / 1E3).toFixed(3)).slice(2, 5) + "Z";
        }

        function x(a) {
          try {
            return JSON.stringify(a);
          } catch (c) {}

          return null;
        }

        function C(a, c, h, g) {
          var p = !1;
          g = g || {};
          r++;
          r == D && B({
            m: "Max number of Sushi Logs exceeded",
            f: "sushi-client.js",
            logLevel: "ERROR",
            attribution: "CSMSushiClient_MAX_CALLS"
          }, k.ue_err_chan || "jserr");
          var f;
          if (f = !(r >= D)) (f = a && -1 < a.constructor.toString().indexOf("Object") && c && -1 < c.constructor.toString().indexOf("String") && h && -1 < h.constructor.toString().indexOf("String")) || L++;
          f && (d.count && d.count("Event:" + h, 1), a.producerId = a.producerId || c, a.schemaId = a.schemaId || h, a.timestamp = K(), c = Date.now ? Date.now() : +new Date(), h = Math.random().toString().substring(2, 12), a.messageId = b.ue_id + "-" + c + "-" + h, g && !g.ssd && (a.sessionId = a.sessionId || b.ue_sid, a.requestId = a.requestId || b.ue_id, a.obfuscatedMarketplaceId = a.obfuscatedMarketplaceId || b.ue_mid), (c = x(a)) ? (c = c.length, (e.length == M || q + c > N) && m(), q += c, a = {
            data: t.compressEvent(a)
          }, e.push(a), (g || {}).n ? 0 === E ? m() : u || (u = k.setTimeout(m, E)) : v || (v = k.setTimeout(m, O)), p = !0) : p = !1);
          !p && b.ue_int && console.error("Invalid JS Nexus API call");
          return p;
        }

        function F() {
          if (!G) {
            for (var a = 0; a < y.length; a++) {
              y[a]();
            }

            for (a = 0; a < n.length; a++) {
              n[a]();
            }

            e.length && (b.ue_sbuimp && b.ue && b.ue.ssw && (a = x({
              dct: l,
              evt: e
            }), b.ue.ssw("eeldata", a), b.ue.ssw("eelsts", "unk")), A(d._sBcn || {}));
            G = !0;
          }
        }

        function H(a) {
          y.push(a);
        }

        function I(a) {
          n.push(a);
        }

        var D = 1E3,
            M = 499,
            N = 524288,
            s = function s() {},
            d = b.ue || {},
            B = d.log || s,
            P = b.uex || s;

        (b.uet || s)("bb", "ue_sushi_v1", {
          wb: 1
        });

        var J = b.ue_surl || "https://unagi-na.amazon.com/1/events/com.amazon.csm.nexusclient.gamma",
            Q = ["messageId", "timestamp"],
            z = "#",
            e = [],
            f = {},
            l = {},
            q = 0,
            w = 0,
            L = 0,
            r = 0,
            y = [],
            n = [],
            G = !1,
            u,
            v,
            E = void 0 === b.ue_hpsi ? 1E3 : b.ue_hpsi,
            O = void 0 === b.ue_lpsi ? 1E4 : b.ue_lpsi,
            t = function () {
          function a(a) {
            f[a] = z + w++;
            l[f[a]] = a;
            return f[a];
          }

          function c(b) {
            if (!(b instanceof Function)) {
              if (b instanceof Array) {
                for (var g = [], d = b.length, e = 0; e < d; e++) {
                  g[e] = c(b[e]);
                }

                return g;
              }

              if (b instanceof Object) {
                g = {};

                for (d in b) {
                  b.hasOwnProperty(d) && (g[f[d] ? f[d] : a(d)] = -1 === Q.indexOf(d) ? c(b[d]) : b[d]);
                }

                return g;
              }

              return "string" === typeof b && (b.length > (z + w).length || b.charAt(0) === z) ? f[b] ? f[b] : a(b) : b;
            }
          }

          return {
            compressEvent: c,
            buildPayload: function buildPayload() {
              return x({
                cs: {
                  dct: l
                },
                events: e
              });
            }
          };
        }();

        (function () {
          if (d.event && d.event.isStub) {
            if (b.ue_sbuimp && b.ue && b.ue.ssw) {
              var a = b.ue.ssw("eelsts").val;

              if (a && "unk" === a && (a = b.ue.ssw("eeldata").val)) {
                var c;

                a: {
                  try {
                    c = JSON.parse(a);
                    break a;
                  } catch (f) {}

                  c = null;
                }

                c && c.evt instanceof Array && c.dct instanceof Object && (e = c.evt, l = c.dct, e && l && (m(), b.ue.ssw("eeldata", "{}"), b.ue.ssw("eelsts", "scs")));
              }
            }

            d.event.replay(function (a) {
              a[3] = a[3] || {};
              a[3].n = 1;
              C.apply(this, a);
            });
            d.onSushiUnload.replay(function (a) {
              H(a[0]);
            });
            d.onSushiFlush.replay(function (a) {
              I(a[0]);
            });
          }
        })();

        d.attach("beforeunload", F);
        d.attach("pagehide", F);
        d._cmps = t;
        d.event = C;

        d.event.reset = function () {
          r = 0;
        };

        d.onSushiUnload = H;
        d.onSushiFlush = I;

        try {
          k.P && k.P.register && k.P.register("sushi-client", s);
        } catch (R) {
          b.ueLogError(R, {
            logLevel: "WARN"
          });
        }

        P("ld", "ue_sushi_v1", {
          wb: 1
        });
      }, "Nxs-JS-Client")(ue_csm, window);
    }
    /**
     * The code in this function is pulled directly from:
     * https://code.amazon.com/packages/SushiJavaScriptClient/blobs/mainline/--/javascript/transportation-clients.js
     */

  }, {
    key: "transportationClientCode",
    value: function transportationClientCode(ue_csm, window) {
      ue_csm.ue.exec(function (b, c) {
        var e = function e() {},
            f = function () {
          return {
            send: function send(b, d) {
              if (d && b) {
                var a;
                if (c.XDomainRequest) a = new XDomainRequest(), a.onerror = e, a.ontimeout = e, a.onprogress = e, a.onload = e, a.timeout = 0;else if (c.XMLHttpRequest) {
                  if (a = new XMLHttpRequest(), !("withCredentials" in a)) throw "";
                } else a = void 0;
                if (!a) throw "";
                a.open("POST", b, !0);
                a.setRequestHeader && a.setRequestHeader("Content-type", "text/plain");
                a.send(d);
              }
            },
            isSupported: !0
          };
        }(),
            g = function () {
          return {
            send: function send(c, d) {
              if (c && d) if (navigator.sendBeacon(c, d)) b.ue_sbuimp && b.ue && b.ue.ssw && b.ue.ssw("eelsts", "scs");else throw "";
            },
            isSupported: !!navigator.sendBeacon && !(c.cordova && c.cordova.platformId && "ios" == c.cordova.platformId)
          };
        }();

        b.ue._ajx = f;
        b.ue._sBcn = g;
      }, "Transportation-clients")(ue_csm, window);
    }
  }]);
  return SushiClient;
}();

exports["default"] = SushiClient;

/***/ }),

/***/ 76:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(3738)["default"]);
var _slicedToArray = (__webpack_require__(5715)["default"]);
// This converts the translation file from the PUFF-J format which Panther emits to the one which vue-i18n expects.
function convertPuffJToVueI18n(translations) {
  var fixed = {};
  for (var _i = 0, _Object$entries = Object.entries(translations); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      k = _Object$entries$_i[0],
      v = _Object$entries$_i[1];
    if (_typeof(v) === 'object') {
      if ('value' in v) {
        fixed[k] = v['value'];
      }
    } else if (typeof v === 'string') {
      fixed[k] = v;
    }
  }
  return fixed;
}
module.exports = convertPuffJToVueI18n;

/***/ }),

/***/ 471:
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ 5814:
/***/ ((module) => {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ 2550:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(5814);
var bytesToUuid = __webpack_require__(471);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 6262:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.A = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ 1236:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 79:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2987:
/***/ ((module) => {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5901:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(79);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2475:
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7383:
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4579:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(7736);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 3693:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(7736);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4634:
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2395:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var superPropBase = __webpack_require__(9552);
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _get.apply(this, arguments);
}
module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 3072:
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9511:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(5636);
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4994:
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9291:
/***/ ((module) => {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1156:
/***/ ((module) => {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7752:
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1869:
/***/ ((module) => {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 8452:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(3738)["default"]);
var assertThisInitialized = __webpack_require__(2475);
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var superPropBase = __webpack_require__(9552);
var defineProperty = __webpack_require__(3693);
function set(target, property, value, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set(target, property, value, receiver) {
      var base = superPropBase(target, property);
      var desc;
      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc.writable) {
          return false;
        }
      }
      desc = Object.getOwnPropertyDescriptor(receiver, property);
      if (desc) {
        if (!desc.writable) {
          return false;
        }
        desc.value = value;
        Object.defineProperty(receiver, property, desc);
      } else {
        defineProperty(receiver, property, value);
      }
      return true;
    };
  }
  return set(target, property, value, receiver);
}
function _set(target, property, value, receiver, isStrict) {
  var s = set(target, property, value, receiver || target);
  if (!s && isStrict) {
    throw new TypeError('failed to set property');
  }
  return value;
}
module.exports = _set, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5636:
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5715:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(2987);
var iterableToArrayLimit = __webpack_require__(1156);
var unsupportedIterableToArray = __webpack_require__(7122);
var nonIterableRest = __webpack_require__(7752);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9552:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getPrototypeOf = __webpack_require__(3072);
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1132:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithoutHoles = __webpack_require__(5901);
var iterableToArray = __webpack_require__(9291);
var unsupportedIterableToArray = __webpack_require__(7122);
var nonIterableSpread = __webpack_require__(1869);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9045:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(3738)["default"]);
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7736:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(3738)["default"]);
var toPrimitive = __webpack_require__(9045);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 3738:
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7122:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(79);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
;// CONCATENATED MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function shared_esm_bundler_makeMap(str, expectsLowerCase) {
  const set = new Set(str.split(","));
  return expectsLowerCase ? (val) => set.has(val.toLowerCase()) : (val) => set.has(val);
}

const shared_esm_bundler_EMPTY_OBJ =  false ? 0 : {};
const EMPTY_ARR =  false ? 0 : [];
const shared_esm_bundler_NOOP = () => {
};
const NO = () => false;
const shared_esm_bundler_isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const shared_esm_bundler_extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const shared_esm_bundler_hasOwnProperty = Object.prototype.hasOwnProperty;
const shared_esm_bundler_hasOwn = (val, key) => shared_esm_bundler_hasOwnProperty.call(val, key);
const shared_esm_bundler_isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const shared_esm_bundler_isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const shared_esm_bundler_isFunction = (val) => typeof val === "function";
const shared_esm_bundler_isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const shared_esm_bundler_isObject = (val) => val !== null && typeof val === "object";
const shared_esm_bundler_isPromise = (val) => {
  return (shared_esm_bundler_isObject(val) || shared_esm_bundler_isFunction(val)) && shared_esm_bundler_isFunction(val.then) && shared_esm_bundler_isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const shared_esm_bundler_toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => shared_esm_bundler_isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const shared_esm_bundler_isReservedProp = /* @__PURE__ */ shared_esm_bundler_makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const shared_esm_bundler_isBuiltInDirective = /* @__PURE__ */ (/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
)));
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const shared_esm_bundler_camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const shared_esm_bundler_hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const shared_esm_bundler_capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const shared_esm_bundler_toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${shared_esm_bundler_capitalize(str)}` : ``;
  return s;
});
const shared_esm_bundler_hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = shared_esm_bundler_isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : {});
};
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}

const PatchFlags = {
  "TEXT": 1,
  "1": "TEXT",
  "CLASS": 2,
  "2": "CLASS",
  "STYLE": 4,
  "4": "STYLE",
  "PROPS": 8,
  "8": "PROPS",
  "FULL_PROPS": 16,
  "16": "FULL_PROPS",
  "NEED_HYDRATION": 32,
  "32": "NEED_HYDRATION",
  "STABLE_FRAGMENT": 64,
  "64": "STABLE_FRAGMENT",
  "KEYED_FRAGMENT": 128,
  "128": "KEYED_FRAGMENT",
  "UNKEYED_FRAGMENT": 256,
  "256": "UNKEYED_FRAGMENT",
  "NEED_PATCH": 512,
  "512": "NEED_PATCH",
  "DYNAMIC_SLOTS": 1024,
  "1024": "DYNAMIC_SLOTS",
  "DEV_ROOT_FRAGMENT": 2048,
  "2048": "DEV_ROOT_FRAGMENT",
  "HOISTED": -1,
  "-1": "HOISTED",
  "BAIL": -2,
  "-2": "BAIL"
};
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `NEED_HYDRATION`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};

const ShapeFlags = {
  "ELEMENT": 1,
  "1": "ELEMENT",
  "FUNCTIONAL_COMPONENT": 2,
  "2": "FUNCTIONAL_COMPONENT",
  "STATEFUL_COMPONENT": 4,
  "4": "STATEFUL_COMPONENT",
  "TEXT_CHILDREN": 8,
  "8": "TEXT_CHILDREN",
  "ARRAY_CHILDREN": 16,
  "16": "ARRAY_CHILDREN",
  "SLOTS_CHILDREN": 32,
  "32": "SLOTS_CHILDREN",
  "TELEPORT": 64,
  "64": "TELEPORT",
  "SUSPENSE": 128,
  "128": "SUSPENSE",
  "COMPONENT_SHOULD_KEEP_ALIVE": 256,
  "256": "COMPONENT_SHOULD_KEEP_ALIVE",
  "COMPONENT_KEPT_ALIVE": 512,
  "512": "COMPONENT_KEPT_ALIVE",
  "COMPONENT": 6,
  "6": "COMPONENT"
};

const SlotFlags = {
  "STABLE": 1,
  "1": "STABLE",
  "DYNAMIC": 2,
  "2": "DYNAMIC",
  "FORWARDED": 3,
  "3": "FORWARDED"
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};

const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error";
const isGloballyAllowed = /* @__PURE__ */ shared_esm_bundler_makeMap(GLOBALS_ALLOWED);
const isGloballyWhitelisted = (/* unused pure expression or super */ null && (isGloballyAllowed));

const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(
          `${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`
        );
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(
            1,
            end > count ? lineLength - pad : end - start
          );
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}

function shared_esm_bundler_normalizeStyle(value) {
  if (shared_esm_bundler_isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = shared_esm_bundler_isString(item) ? parseStringStyle(item) : shared_esm_bundler_normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (shared_esm_bundler_isString(value) || shared_esm_bundler_isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function shared_esm_bundler_stringifyStyle(styles) {
  let ret = "";
  if (!styles || shared_esm_bundler_isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : shared_esm_bundler_hyphenate(key);
    if (shared_esm_bundler_isString(value) || typeof value === "number") {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function shared_esm_bundler_normalizeClass(value) {
  let res = "";
  if (shared_esm_bundler_isString(value)) {
    res = value;
  } else if (shared_esm_bundler_isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = shared_esm_bundler_normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (shared_esm_bundler_isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !shared_esm_bundler_isString(klass)) {
    props.class = shared_esm_bundler_normalizeClass(klass);
  }
  if (style) {
    props.style = shared_esm_bundler_normalizeStyle(style);
  }
  return props;
}

const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const shared_esm_bundler_isHTMLTag = /* @__PURE__ */ (/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(HTML_TAGS)));
const shared_esm_bundler_isSVGTag = /* @__PURE__ */ (/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(SVG_TAGS)));
const shared_esm_bundler_isMathMLTag = /* @__PURE__ */ (/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(MATH_TAGS)));
const isVoidTag = /* @__PURE__ */ (/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(VOID_TAGS)));

const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ shared_esm_bundler_makeMap(specialBooleanAttrs);
const shared_esm_bundler_isBooleanAttr = /* @__PURE__ */ shared_esm_bundler_makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
function shared_esm_bundler_includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const shared_esm_bundler_isKnownHtmlAttr = /* @__PURE__ */ (/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(
  `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
)));
const shared_esm_bundler_isKnownSvgAttr = /* @__PURE__ */ (/* unused pure expression or super */ null && (shared_esm_bundler_makeMap(
  `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
)));
function shared_esm_bundler_isRenderableAttrValue(value) {
  if (value == null) {
    return false;
  }
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}

const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}

function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = shared_esm_bundler_looseEqual(a[i], b[i]);
  }
  return equal;
}
function shared_esm_bundler_looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = shared_esm_bundler_isArray(a);
  bValidType = shared_esm_bundler_isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = shared_esm_bundler_isObject(a);
  bValidType = shared_esm_bundler_isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !shared_esm_bundler_looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function shared_esm_bundler_looseIndexOf(arr, val) {
  return arr.findIndex((item) => shared_esm_bundler_looseEqual(item, val));
}

const toDisplayString = (val) => {
  return shared_esm_bundler_isString(val) ? val : val == null ? "" : shared_esm_bundler_isArray(val) || shared_esm_bundler_isObject(val) && (val.toString === objectToString || !shared_esm_bundler_isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (shared_esm_bundler_isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (shared_esm_bundler_isObject(val) && !shared_esm_bundler_isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};



;// CONCATENATED MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/


function reactivity_esm_bundler_warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}

let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    /**
     * @internal
     */
    this._active = true;
    /**
     * @internal
     */
    this.effects = [];
    /**
     * @internal
     */
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (false) {}
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (false) {}
}

let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    /**
     * @internal
     */
    this._dirtyLevel = 4;
    /**
     * @internal
     */
    this._trackId = 0;
    /**
     * @internal
     */
    this._runnings = 0;
    /**
     * @internal
     */
    this._shouldSchedule = false;
    /**
     * @internal
     */
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0; i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed) {
  return computed.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
function effect(fn, options) {
  if (fn.effect instanceof ReactiveEffect) {
    fn = fn.effect.fn;
  }
  const _effect = new ReactiveEffect(fn, NOOP, () => {
    if (_effect.dirty) {
      _effect.run();
    }
  });
  if (options) {
    extend(_effect, options);
    if (options.scope)
      recordEffectScope(_effect, options.scope);
  }
  if (!options || !options.lazy) {
    _effect.run();
  }
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
function stop(runner) {
  runner.effect.stop();
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    if (false) {}
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      if (false) {}
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}

const createDep = (cleanup, computed) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed;
  return dep;
};

const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol( false ? 0 : "");
const MAP_KEY_ITERATE_KEY = Symbol( false ? 0 : "");
function reactivity_esm_bundler_track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
       false ? 0 : void 0
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && shared_esm_bundler_isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!shared_esm_bundler_isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!shared_esm_bundler_isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
         false ? 0 : void 0
      );
    }
  }
  resetScheduling();
}
function getDepFromReactive(object, key) {
  var _a;
  return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key);
}

const isNonTrackableKeys = /* @__PURE__ */ shared_esm_bundler_makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = reactivity_esm_bundler_toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        reactivity_esm_bundler_track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(reactivity_esm_bundler_toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = reactivity_esm_bundler_toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function reactivity_esm_bundler_hasOwnProperty(key) {
  const obj = reactivity_esm_bundler_toRaw(this);
  reactivity_esm_bundler_track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = shared_esm_bundler_isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && shared_esm_bundler_hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return reactivity_esm_bundler_hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      reactivity_esm_bundler_track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (reactivity_esm_bundler_isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (shared_esm_bundler_isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = reactivity_esm_bundler_isReadonly(oldValue);
      if (!reactivity_esm_bundler_isShallow(value) && !reactivity_esm_bundler_isReadonly(value)) {
        oldValue = reactivity_esm_bundler_toRaw(oldValue);
        value = reactivity_esm_bundler_toRaw(value);
      }
      if (!shared_esm_bundler_isArray(target) && reactivity_esm_bundler_isRef(oldValue) && !reactivity_esm_bundler_isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = shared_esm_bundler_isArray(target) && isIntegerKey(key) ? Number(key) < target.length : shared_esm_bundler_hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === reactivity_esm_bundler_toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (shared_esm_bundler_hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = shared_esm_bundler_hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      reactivity_esm_bundler_track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    reactivity_esm_bundler_track(
      target,
      "iterate",
      shared_esm_bundler_isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    if (false) {}
    return true;
  }
  deleteProperty(target, key) {
    if (false) {}
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);

const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = reactivity_esm_bundler_toRaw(target);
  const rawKey = reactivity_esm_bundler_toRaw(key);
  if (!isReadonly) {
    if (shared_esm_bundler_hasChanged(key, rawKey)) {
      reactivity_esm_bundler_track(rawTarget, "get", key);
    }
    reactivity_esm_bundler_track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly = false) {
  const target = this["__v_raw"];
  const rawTarget = reactivity_esm_bundler_toRaw(target);
  const rawKey = reactivity_esm_bundler_toRaw(key);
  if (!isReadonly) {
    if (shared_esm_bundler_hasChanged(key, rawKey)) {
      reactivity_esm_bundler_track(rawTarget, "has", key);
    }
    reactivity_esm_bundler_track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
  target = target["__v_raw"];
  !isReadonly && reactivity_esm_bundler_track(reactivity_esm_bundler_toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = reactivity_esm_bundler_toRaw(value);
  const target = reactivity_esm_bundler_toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function reactivity_esm_bundler_set(key, value) {
  value = reactivity_esm_bundler_toRaw(value);
  const target = reactivity_esm_bundler_toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = reactivity_esm_bundler_toRaw(key);
    hadKey = has2.call(target, key);
  } else if (false) {}
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (shared_esm_bundler_hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = reactivity_esm_bundler_toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = reactivity_esm_bundler_toRaw(key);
    hadKey = has2.call(target, key);
  } else if (false) {}
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = reactivity_esm_bundler_toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget =  false ? 0 : void 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = reactivity_esm_bundler_toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && reactivity_esm_bundler_track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = reactivity_esm_bundler_toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && reactivity_esm_bundler_track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (false) {}
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: reactivity_esm_bundler_set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: reactivity_esm_bundler_set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      shared_esm_bundler_hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = reactivity_esm_bundler_toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    reactivity_esm_bundler_warn(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}

const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1 /* COMMON */;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2 /* COLLECTION */;
    default:
      return 0 /* INVALID */;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(shared_esm_bundler_toRawType(value));
}
function reactive(target) {
  if (reactivity_esm_bundler_isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!shared_esm_bundler_isObject(target)) {
    if (false) {}
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0 /* INVALID */) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function reactivity_esm_bundler_isReactive(value) {
  if (reactivity_esm_bundler_isReadonly(value)) {
    return reactivity_esm_bundler_isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function reactivity_esm_bundler_isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function reactivity_esm_bundler_isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return reactivity_esm_bundler_isReactive(value) || reactivity_esm_bundler_isReadonly(value);
}
function reactivity_esm_bundler_toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? reactivity_esm_bundler_toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => shared_esm_bundler_isObject(value) ? reactive(value) : value;
const toReadonly = (value) => shared_esm_bundler_isObject(value) ? readonly(value) : value;

const COMPUTED_SIDE_EFFECT_WARN = (/* unused pure expression or super */ null && (`Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`));
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly;
  }
  get value() {
    const self = reactivity_esm_bundler_toRaw(this);
    if ((!self._cacheable || self.effect.dirty) && shared_esm_bundler_hasChanged(self._value, self._value = self.effect.run())) {
      triggerRefValue(self, 4);
    }
    trackRefValue(self);
    if (self.effect._dirtyLevel >= 2) {
      if (false) {}
      triggerRefValue(self, 2);
    }
    return self._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
  // #endregion
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = shared_esm_bundler_isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter =  false ? 0 : shared_esm_bundler_NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (false) {}
  return cRef;
}

function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = reactivity_esm_bundler_toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
       false ? 0 : void 0
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = reactivity_esm_bundler_toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
       false ? 0 : void 0
    );
  }
}
function reactivity_esm_bundler_isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function reactivity_esm_bundler_ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (reactivity_esm_bundler_isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : reactivity_esm_bundler_toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || reactivity_esm_bundler_isShallow(newVal) || reactivity_esm_bundler_isReadonly(newVal);
    newVal = useDirectValue ? newVal : reactivity_esm_bundler_toRaw(newVal);
    if (shared_esm_bundler_hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function triggerRef(ref2) {
  triggerRefValue(ref2, 4,  false ? 0 : void 0);
}
function unref(ref2) {
  return reactivity_esm_bundler_isRef(ref2) ? ref2.value : ref2;
}
function toValue(source) {
  return isFunction(source) ? source() : unref(source);
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (reactivity_esm_bundler_isRef(oldValue) && !reactivity_esm_bundler_isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return reactivity_esm_bundler_isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this.dep = void 0;
    this.__v_isRef = true;
    const { get, set } = factory(
      () => trackRefValue(this),
      () => triggerRefValue(this)
    );
    this._get = get;
    this._set = set;
  }
  get value() {
    return this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function reactivity_esm_bundler_customRef(factory) {
  return new CustomRefImpl(factory);
}
function reactivity_esm_bundler_toRefs(object) {
  if (false) {}
  const ret = shared_esm_bundler_isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(reactivity_esm_bundler_toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this.__v_isRef = true;
    this.__v_isReadonly = true;
  }
  get value() {
    return this._getter();
  }
}
function reactivity_esm_bundler_toRef(source, key, defaultValue) {
  if (reactivity_esm_bundler_isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return reactivity_esm_bundler_ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return reactivity_esm_bundler_isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}

const deferredComputed = (/* unused pure expression or super */ null && (computed));

const TrackOpTypes = {
  "GET": "get",
  "HAS": "has",
  "ITERATE": "iterate"
};
const TriggerOpTypes = {
  "SET": "set",
  "ADD": "add",
  "DELETE": "delete",
  "CLEAR": "clear"
};
const ReactiveFlags = {
  "SKIP": "__v_skip",
  "IS_REACTIVE": "__v_isReactive",
  "IS_READONLY": "__v_isReadonly",
  "IS_SHALLOW": "__v_isShallow",
  "RAW": "__v_raw"
};



;// CONCATENATED MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/





const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (shared_esm_bundler_isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (reactivity_esm_bundler_isRef(value)) {
    value = formatProp(key, reactivity_esm_bundler_toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (shared_esm_bundler_isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = reactivity_esm_bundler_toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function assertNumber(val, type) {
  if (true)
    return;
  if (val === void 0) {
    return;
  } else if (typeof val !== "number") {
    warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$1(`${type} is NaN - the duration expression might be incorrect.`);
  }
}

const ErrorCodes = {
  "SETUP_FUNCTION": 0,
  "0": "SETUP_FUNCTION",
  "RENDER_FUNCTION": 1,
  "1": "RENDER_FUNCTION",
  "WATCH_GETTER": 2,
  "2": "WATCH_GETTER",
  "WATCH_CALLBACK": 3,
  "3": "WATCH_CALLBACK",
  "WATCH_CLEANUP": 4,
  "4": "WATCH_CLEANUP",
  "NATIVE_EVENT_HANDLER": 5,
  "5": "NATIVE_EVENT_HANDLER",
  "COMPONENT_EVENT_HANDLER": 6,
  "6": "COMPONENT_EVENT_HANDLER",
  "VNODE_HOOK": 7,
  "7": "VNODE_HOOK",
  "DIRECTIVE_HOOK": 8,
  "8": "DIRECTIVE_HOOK",
  "TRANSITION_HOOK": 9,
  "9": "TRANSITION_HOOK",
  "APP_ERROR_HANDLER": 10,
  "10": "APP_ERROR_HANDLER",
  "APP_WARN_HANDLER": 11,
  "11": "APP_WARN_HANDLER",
  "FUNCTION_REF": 12,
  "12": "FUNCTION_REF",
  "ASYNC_COMPONENT_LOADER": 13,
  "13": "ASYNC_COMPONENT_LOADER",
  "SCHEDULER": 14,
  "14": "SCHEDULER"
};
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (shared_esm_bundler_isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && shared_esm_bundler_isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo =  false ? 0 : `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  if (false) {} else {
    console.error(err);
  }
}

let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!shared_esm_bundler_isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
  if (false) {}
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (false) {}
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (false) {}
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (false) {}
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  if (false) {}
  queue.sort(comparator);
  const check =  false ? 0 : shared_esm_bundler_NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false) {}
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}

let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
if (false) {}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.effect.dirty = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}

let devtools$1;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook$1(hook, target) {
  var _a, _b;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook$1(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version) {
  emit$1("app:init" /* APP_INIT */, app, version, {
    Fragment: runtime_core_esm_bundler_Fragment,
    Text,
    Comment,
    Static: runtime_core_esm_bundler_Static
  });
}
function devtoolsUnmountApp(app) {
  emit$1("app:unmount" /* APP_UNMOUNT */, app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added" /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed" /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : void 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ (/* unused pure expression or super */ null && (createDevtoolsPerformanceHook(
  "perf:start" /* PERFORMANCE_START */
)));
const devtoolsPerfEnd = /* @__PURE__ */ (/* unused pure expression or super */ null && (createDevtoolsPerformanceHook(
  "perf:end" /* PERFORMANCE_END */
)));
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit" /* COMPONENT_EMIT */,
    component.appContext.app,
    component,
    event,
    params
  );
}

function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || shared_esm_bundler_EMPTY_OBJ;
  if (false) {}
  let args = rawArgs;
  const isModelListener = event.startsWith("update:");
  const modelArg = isModelListener && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || shared_esm_bundler_EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => shared_esm_bundler_isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  if ( false || __VUE_PROD_DEVTOOLS__) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (false) {}
  let handlerName;
  let handler = props[handlerName = shared_esm_bundler_toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = shared_esm_bundler_toHandlerKey(shared_esm_bundler_camelize(event))];
  if (!handler && isModelListener) {
    handler = props[handlerName = shared_esm_bundler_toHandlerKey(shared_esm_bundler_hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (__VUE_OPTIONS_API__ && !shared_esm_bundler_isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        shared_esm_bundler_extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (shared_esm_bundler_isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (shared_esm_bundler_isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    shared_esm_bundler_extend(normalized, raw);
  }
  if (shared_esm_bundler_isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !shared_esm_bundler_isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return shared_esm_bundler_hasOwn(options, key[0].toLowerCase() + key.slice(1)) || shared_esm_bundler_hasOwn(options, shared_esm_bundler_hyphenate(key)) || shared_esm_bundler_hasOwn(options, key);
}

let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
const withScopeId = (_id) => withCtx;
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if ( false || __VUE_PROD_DEVTOOLS__) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}

let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  if (false) {}
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy =  false ? 0 : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) {}
      result = normalizeVNode(
        render2.length > 1 ? render2(
          props,
           false ? 0 : { attrs, slots, emit }
        ) : render2(
          props,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (false) {}
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (false) {}
    }
  }
  if (vnode.dirs) {
    if (false) {}
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (false) {}
    root.transition = vnode.transition;
  }
  if (false) {} else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren, false);
  if (!childRoot) {
    return [vnode, void 0];
  } else if (false) {}
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children, recurse = true) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
          if (false) {}
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || shared_esm_bundler_isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (false) {}
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}

const COMPONENTS = "components";
const DIRECTIVES = "directives";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (shared_esm_bundler_isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === shared_esm_bundler_camelize(name) || selfName === shared_esm_bundler_capitalize(shared_esm_bundler_camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (false) {}
    return res;
  } else if (false) {}
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[shared_esm_bundler_camelize(name)] || registry[shared_esm_bundler_capitalize(shared_esm_bundler_camelize(name))]);
}

const isSuspense = (type) => type.__isSuspense;
let suspenseId = 0;
const SuspenseImpl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
    if (n1 == null) {
      mountSuspense(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    } else {
      if (parentSuspense && parentSuspense.deps > 0 && !n1.suspense.isInFallback) {
        n2.suspense = n1.suspense;
        n2.suspense.vnode = n2;
        n2.el = n1.el;
        return;
      }
      patchSuspense(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        namespace,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    }
  },
  hydrate: hydrateSuspense,
  create: createSuspenseBoundary,
  normalize: normalizeSuspenseChildren
};
const Suspense = (/* unused pure expression or super */ null && (SuspenseImpl)) ;
function triggerEvent(vnode, name) {
  const eventListener = vnode.props && vnode.props[name];
  if (shared_esm_bundler_isFunction(eventListener)) {
    eventListener();
  }
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
  const {
    p: patch,
    o: { createElement }
  } = rendererInternals;
  const hiddenContainer = createElement("div");
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    container,
    hiddenContainer,
    anchor,
    namespace,
    slotScopeIds,
    optimized,
    rendererInternals
  );
  patch(
    null,
    suspense.pendingBranch = vnode.ssContent,
    hiddenContainer,
    null,
    parentComponent,
    suspense,
    namespace,
    slotScopeIds
  );
  if (suspense.deps > 0) {
    triggerEvent(vnode, "onPending");
    triggerEvent(vnode, "onFallback");
    patch(
      null,
      vnode.ssFallback,
      container,
      anchor,
      parentComponent,
      null,
      // fallback tree will not have suspense context
      namespace,
      slotScopeIds
    );
    setActiveBranch(suspense, vnode.ssFallback);
  } else {
    suspense.resolve(false, true);
  }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
  const suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  n2.el = n1.el;
  const newBranch = n2.ssContent;
  const newFallback = n2.ssFallback;
  const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
  if (pendingBranch) {
    suspense.pendingBranch = newBranch;
    if (isSameVNodeType(newBranch, pendingBranch)) {
      patch(
        pendingBranch,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else if (isInFallback) {
        if (!isHydrating) {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            namespace,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      }
    } else {
      suspense.pendingId = suspenseId++;
      if (isHydrating) {
        suspense.isHydrating = false;
        suspense.activeBranch = pendingBranch;
      } else {
        unmount(pendingBranch, parentComponent, suspense);
      }
      suspense.deps = 0;
      suspense.effects.length = 0;
      suspense.hiddenContainer = createElement("div");
      if (isInFallback) {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        } else {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            namespace,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
        patch(
          activeBranch,
          newBranch,
          container,
          anchor,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        suspense.resolve(true);
      } else {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          namespace,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        }
      }
    }
  } else {
    if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
      patch(
        activeBranch,
        newBranch,
        container,
        anchor,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      setActiveBranch(suspense, newBranch);
    } else {
      triggerEvent(n2, "onPending");
      suspense.pendingBranch = newBranch;
      if (newBranch.shapeFlag & 512) {
        suspense.pendingId = newBranch.component.suspenseId;
      } else {
        suspense.pendingId = suspenseId++;
      }
      patch(
        null,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        namespace,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else {
        const { timeout, pendingId } = suspense;
        if (timeout > 0) {
          setTimeout(() => {
            if (suspense.pendingId === pendingId) {
              suspense.fallback(newFallback);
            }
          }, timeout);
        } else if (timeout === 0) {
          suspense.fallback(newFallback);
        }
      }
    }
  }
}
let hasWarned = false;
function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
  if (false) {}
  const {
    p: patch,
    m: move,
    um: unmount,
    n: next,
    o: { parentNode, remove }
  } = rendererInternals;
  let parentSuspenseId;
  const isSuspensible = isVNodeSuspensible(vnode);
  if (isSuspensible) {
    if (parentSuspense == null ? void 0 : parentSuspense.pendingBranch) {
      parentSuspenseId = parentSuspense.pendingId;
      parentSuspense.deps++;
    }
  }
  const timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
  if (false) {}
  const initialAnchor = anchor;
  const suspense = {
    vnode,
    parent: parentSuspense,
    parentComponent,
    namespace,
    container,
    hiddenContainer,
    deps: 0,
    pendingId: suspenseId++,
    timeout: typeof timeout === "number" ? timeout : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !isHydrating,
    isHydrating,
    isUnmounted: false,
    effects: [],
    resolve(resume = false, sync = false) {
      if (false) {}
      const {
        vnode: vnode2,
        activeBranch,
        pendingBranch,
        pendingId,
        effects,
        parentComponent: parentComponent2,
        container: container2
      } = suspense;
      let delayEnter = false;
      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else if (!resume) {
        delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
        if (delayEnter) {
          activeBranch.transition.afterLeave = () => {
            if (pendingId === suspense.pendingId) {
              move(
                pendingBranch,
                container2,
                anchor === initialAnchor ? next(activeBranch) : anchor,
                0
              );
              queuePostFlushCb(effects);
            }
          };
        }
        if (activeBranch) {
          if (parentNode(activeBranch.el) !== suspense.hiddenContainer) {
            anchor = next(activeBranch);
          }
          unmount(activeBranch, parentComponent2, suspense, true);
        }
        if (!delayEnter) {
          move(pendingBranch, container2, anchor, 0);
        }
      }
      setActiveBranch(suspense, pendingBranch);
      suspense.pendingBranch = null;
      suspense.isInFallback = false;
      let parent = suspense.parent;
      let hasUnresolvedAncestor = false;
      while (parent) {
        if (parent.pendingBranch) {
          parent.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }
        parent = parent.parent;
      }
      if (!hasUnresolvedAncestor && !delayEnter) {
        queuePostFlushCb(effects);
      }
      suspense.effects = [];
      if (isSuspensible) {
        if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0 && !sync) {
            parentSuspense.resolve();
          }
        }
      }
      triggerEvent(vnode2, "onResolve");
    },
    fallback(fallbackVNode) {
      if (!suspense.pendingBranch) {
        return;
      }
      const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, namespace: namespace2 } = suspense;
      triggerEvent(vnode2, "onFallback");
      const anchor2 = next(activeBranch);
      const mountFallback = () => {
        if (!suspense.isInFallback) {
          return;
        }
        patch(
          null,
          fallbackVNode,
          container2,
          anchor2,
          parentComponent2,
          null,
          // fallback tree will not have suspense context
          namespace2,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, fallbackVNode);
      };
      const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
      if (delayEnter) {
        activeBranch.transition.afterLeave = mountFallback;
      }
      suspense.isInFallback = true;
      unmount(
        activeBranch,
        parentComponent2,
        null,
        // no suspense so unmount hooks fire now
        true
        // shouldRemove
      );
      if (!delayEnter) {
        mountFallback();
      }
    },
    move(container2, anchor2, type) {
      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
      suspense.container = container2;
    },
    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },
    registerDep(instance, setupRenderEffect) {
      const isInPendingSuspense = !!suspense.pendingBranch;
      if (isInPendingSuspense) {
        suspense.deps++;
      }
      const hydratedEl = instance.vnode.el;
      instance.asyncDep.catch((err) => {
        handleError(err, instance, 0);
      }).then((asyncSetupResult) => {
        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
          return;
        }
        instance.asyncResolved = true;
        const { vnode: vnode2 } = instance;
        if (false) {}
        handleSetupResult(instance, asyncSetupResult, false);
        if (hydratedEl) {
          vnode2.el = hydratedEl;
        }
        const placeholder = !hydratedEl && instance.subTree.el;
        setupRenderEffect(
          instance,
          vnode2,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          parentNode(hydratedEl || instance.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          hydratedEl ? null : next(instance.subTree),
          suspense,
          namespace,
          optimized
        );
        if (placeholder) {
          remove(placeholder);
        }
        updateHOCHostEl(instance, vnode2.el);
        if (false) {}
        if (isInPendingSuspense && --suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount(parentSuspense2, doRemove) {
      suspense.isUnmounted = true;
      if (suspense.activeBranch) {
        unmount(
          suspense.activeBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
      if (suspense.pendingBranch) {
        unmount(
          suspense.pendingBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
    }
  };
  return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    node.parentNode,
    // eslint-disable-next-line no-restricted-globals
    document.createElement("div"),
    null,
    namespace,
    slotScopeIds,
    optimized,
    rendererInternals,
    true
  );
  const result = hydrateNode(
    node,
    suspense.pendingBranch = vnode.ssContent,
    parentComponent,
    suspense,
    slotScopeIds,
    optimized
  );
  if (suspense.deps === 0) {
    suspense.resolve(false, true);
  }
  return result;
}
function normalizeSuspenseChildren(vnode) {
  const { shapeFlag, children } = vnode;
  const isSlotChildren = shapeFlag & 32;
  vnode.ssContent = normalizeSuspenseSlot(
    isSlotChildren ? children.default : children
  );
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
}
function normalizeSuspenseSlot(s) {
  let block;
  if (shared_esm_bundler_isFunction(s)) {
    const trackBlock = isBlockTreeEnabled && s._c;
    if (trackBlock) {
      s._d = false;
      openBlock();
    }
    s = s();
    if (trackBlock) {
      s._d = true;
      block = currentBlock;
      closeBlock();
    }
  }
  if (shared_esm_bundler_isArray(s)) {
    const singleChild = filterSingleRoot(s);
    if (false) {}
    s = singleChild;
  }
  s = normalizeVNode(s);
  if (block && !s.dynamicChildren) {
    s.dynamicChildren = block.filter((c) => c !== s);
  }
  return s;
}
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (shared_esm_bundler_isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function setActiveBranch(suspense, branch) {
  suspense.activeBranch = branch;
  const { vnode, parentComponent } = suspense;
  let el = branch.el;
  while (!el && branch.component) {
    branch = branch.component.subTree;
    el = branch.el;
  }
  vnode.el = el;
  if (parentComponent && parentComponent.subTree === vnode) {
    parentComponent.vnode.el = el;
    updateHOCHostEl(parentComponent, el);
  }
}
function isVNodeSuspensible(vnode) {
  var _a;
  return ((_a = vnode.props) == null ? void 0 : _a.suspensible) != null && vnode.props.suspensible !== false;
}

const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = runtime_core_esm_bundler_inject(ssrContextKey);
    if (!ctx) {
       false && 0;
    }
    return ctx;
  }
};

function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
function runtime_core_esm_bundler_watchPostEffect(effect, options) {
  return doWatch(
    effect,
    null,
     false ? 0 : { flush: "post" }
  );
}
function watchSyncEffect(effect, options) {
  return doWatch(
    effect,
    null,
     false ? 0 : { flush: "sync" }
  );
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (false) {}
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once,
  onTrack,
  onTrigger
} = shared_esm_bundler_EMPTY_OBJ) {
  if (cb && once) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (false) {}
  if (false) {}
  const warnInvalidSource = (s) => {
    warn$1(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (reactivity_esm_bundler_isRef(source)) {
    getter = () => source.value;
    forceTrigger = reactivity_esm_bundler_isShallow(source);
  } else if (reactivity_esm_bundler_isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (shared_esm_bundler_isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => reactivity_esm_bundler_isReactive(s) || reactivity_esm_bundler_isShallow(s));
    getter = () => source.map((s) => {
      if (reactivity_esm_bundler_isRef(s)) {
        return s.value;
      } else if (reactivity_esm_bundler_isReactive(s)) {
        return reactiveGetter(s);
      } else if (shared_esm_bundler_isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
         false && 0;
      }
    });
  } else if (shared_esm_bundler_isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = shared_esm_bundler_NOOP;
     false && 0;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect.onStop = void 0;
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = shared_esm_bundler_NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return shared_esm_bundler_NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active || !effect.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => shared_esm_bundler_hasChanged(v, oldValue[i])) : shared_esm_bundler_hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, shared_esm_bundler_NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect.stop();
    if (scope) {
      remove(scope.effects, effect);
    }
  };
  if (false) {}
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = shared_esm_bundler_isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (shared_esm_bundler_isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!shared_esm_bundler_isObject(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (reactivity_esm_bundler_isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (shared_esm_bundler_isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen);
    }
  } else if (shared_esm_bundler_isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}

function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
     false && 0;
    return vnode;
  }
  const instance = getExposeProxy(currentRenderingInstance) || currentRenderingInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}

const leaveCbKey = Symbol("_leaveCb");
const enterCbKey = Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  runtime_core_esm_bundler_onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = runtime_core_esm_bundler_getCurrentInstance();
    const state = useTransitionState();
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment) {
            if (false) {}
            child = c;
            hasFound = true;
            if (true)
              break;
          }
        }
      }
      const rawProps = reactivity_esm_bundler_toRaw(props);
      const { mode } = rawProps;
      if (false) {}
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.effect.dirty = true;
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook(hook, args);
    if (shared_esm_bundler_isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el[enterCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey] = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove) {
      const key2 = String(vnode.key);
      if (el[enterCbKey]) {
        el[enterCbKey](
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove();
      }
      callHook(onBeforeLeave, [el]);
      let called = false;
      const done = el[leaveCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        remove();
        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
     false ? 0 : vnode.children ? vnode.children[0] : void 0
  ) : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === runtime_core_esm_bundler_Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function runtime_core_esm_bundler_defineComponent(options, extraOptions) {
  return shared_esm_bundler_isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => shared_esm_bundler_extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}

const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve, reject) => {
          const userRetry = () => resolve(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (false) {}
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if (false) {}
      resolvedComp = comp;
      return comp;
    }));
  };
  return runtime_core_esm_bundler_defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(
          err,
          instance,
          13,
          !errorComponent
        );
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(
              `Async component timed out after ${timeout}ms.`
            );
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          instance.parent.effect.dirty = true;
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  const { ref: ref2, props, children, ce } = parent.vnode;
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}

const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props, { slots }) {
    const instance = runtime_core_esm_bundler_getCurrentInstance();
    const sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    const cache = /* @__PURE__ */ new Map();
    const keys = /* @__PURE__ */ new Set();
    let current = null;
    if ( false || __VUE_PROD_DEVTOOLS__) {
      instance.__v_cache = cache;
    }
    const parentSuspense = instance.suspense;
    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement }
      }
    } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
      const instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(
        instance2.vnode,
        vnode,
        container,
        anchor,
        instance2,
        parentSuspense,
        namespace,
        vnode.slotScopeIds,
        optimized
      );
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          invokeArrayFns(instance2.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
      if ( false || __VUE_PROD_DEVTOOLS__) {
        devtoolsComponentAdded(instance2);
      }
    };
    sharedContext.deactivate = (vnode) => {
      const instance2 = vnode.component;
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          invokeArrayFns(instance2.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
      if ( false || __VUE_PROD_DEVTOOLS__) {
        devtoolsComponentAdded(instance2);
      }
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);
        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (!current || !isSameVNodeType(cached, current)) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch(
      () => [props.include, props.exclude],
      ([include, exclude]) => {
        include && pruneCache((name) => matches(include, name));
        exclude && pruneCache((name) => !matches(exclude, name));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: true }
    );
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    runtime_core_esm_bundler_onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached) => {
        const { subTree, suspense } = instance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type && cached.key === vnode.key) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        if (false) {}
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type;
      const name = getComponentName(
        isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp
      );
      const { include, exclude, max } = props;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
const KeepAlive = (/* unused pure expression or super */ null && (KeepAliveImpl));
function matches(pattern, name) {
  if (shared_esm_bundler_isArray(pattern)) {
    return pattern.some((p) => matches(p, name));
  } else if (shared_esm_bundler_isString(pattern)) {
    return pattern.split(",").includes(name);
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  runtime_core_esm_bundler_onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= ~256;
  vnode.shapeFlag &= ~512;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (false) {}
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const runtime_core_esm_bundler_onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const runtime_core_esm_bundler_onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}

function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (shared_esm_bundler_isArray(source) || shared_esm_bundler_isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    if (false) {}
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (shared_esm_bundler_isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}

function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i];
    if (isArray(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      slots[slot.name] = slot.key ? (...args) => {
        const res = slot.fn(...args);
        if (res)
          res.key = slot.key;
        return res;
      } : slot.fn;
    }
  }
  return slots;
}

function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (false) {}
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    runtime_core_esm_bundler_Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === runtime_core_esm_bundler_Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}

function toHandlers(obj, preserveCaseIfNecessary) {
  const ret = {};
  if (false) {}
  for (const key in obj) {
    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
  }
  return ret;
}

const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ shared_esm_bundler_extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) =>  false ? 0 : i.props,
    $attrs: (i) =>  false ? 0 : i.attrs,
    $slots: (i) =>  false ? 0 : i.slots,
    $refs: (i) =>  false ? 0 : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
    $forceUpdate: (i) => i.f || (i.f = () => {
      i.effect.dirty = true;
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : shared_esm_bundler_NOOP
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== shared_esm_bundler_EMPTY_OBJ && !state.__isScriptSetup && shared_esm_bundler_hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (false) {}
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1 /* SETUP */:
            return setupState[key];
          case 2 /* DATA */:
            return data[key];
          case 4 /* CONTEXT */:
            return ctx[key];
          case 3 /* PROPS */:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1 /* SETUP */;
        return setupState[key];
      } else if (data !== shared_esm_bundler_EMPTY_OBJ && shared_esm_bundler_hasOwn(data, key)) {
        accessCache[key] = 2 /* DATA */;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && shared_esm_bundler_hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3 /* PROPS */;
        return props[key];
      } else if (ctx !== shared_esm_bundler_EMPTY_OBJ && shared_esm_bundler_hasOwn(ctx, key)) {
        accessCache[key] = 4 /* CONTEXT */;
        return ctx[key];
      } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
        accessCache[key] = 0 /* OTHER */;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        reactivity_esm_bundler_track(instance, "get", key);
         false && 0;
      } else if (false) {}
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== shared_esm_bundler_EMPTY_OBJ && shared_esm_bundler_hasOwn(ctx, key)) {
      accessCache[key] = 4 /* CONTEXT */;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, shared_esm_bundler_hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (false) {}
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (false) {} else if (data !== shared_esm_bundler_EMPTY_OBJ && shared_esm_bundler_hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (shared_esm_bundler_hasOwn(instance.props, key)) {
       false && 0;
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
       false && 0;
      return false;
    } else {
      if (false) {} else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== shared_esm_bundler_EMPTY_OBJ && shared_esm_bundler_hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && shared_esm_bundler_hasOwn(normalizedProps, key) || shared_esm_bundler_hasOwn(ctx, key) || shared_esm_bundler_hasOwn(publicPropertiesMap, key) || shared_esm_bundler_hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (shared_esm_bundler_hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (false) {}
const RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ shared_esm_bundler_extend(
  {},
  PublicInstanceProxyHandlers,
  {
    get(target, key) {
      if (key === Symbol.unscopables) {
        return;
      }
      return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has(_, key) {
      const has = key[0] !== "_" && !isGloballyAllowed(key);
      if (false) {}
      return has;
    }
  }
);
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}

const warnRuntimeUsage = (method) => warn$1(
  `${method}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`
);
function defineProps() {
  if (false) {}
  return null;
}
function defineEmits() {
  if (false) {}
  return null;
}
function defineExpose(exposed) {
  if (false) {}
}
function defineOptions(options) {
  if (false) {}
}
function defineSlots() {
  if (false) {}
  return null;
}
function defineModel() {
  if (false) {}
}
function withDefaults(props, defaults) {
  if (false) {}
  return null;
}
function useSlots() {
  return getContext().slots;
}
function useAttrs() {
  return getContext().attrs;
}
function getContext() {
  const i = runtime_core_esm_bundler_getCurrentInstance();
  if (false) {}
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
  return shared_esm_bundler_isArray(props) ? props.reduce(
    (normalized, p) => (normalized[p] = null, normalized),
    {}
  ) : props;
}
function mergeDefaults(raw, defaults) {
  const props = normalizePropsOrEmits(raw);
  for (const key in defaults) {
    if (key.startsWith("__skip"))
      continue;
    let opt = props[key];
    if (opt) {
      if (isArray(opt) || isFunction(opt)) {
        opt = props[key] = { type: opt, default: defaults[key] };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      opt = props[key] = { default: defaults[key] };
    } else if (false) {}
    if (opt && defaults[`__skip_${key}`]) {
      opt.skipFactory = true;
    }
  }
  return props;
}
function mergeModels(a, b) {
  if (!a || !b)
    return a || b;
  if (isArray(a) && isArray(b))
    return a.concat(b);
  return extend({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
}
function createPropsRestProxy(props, excludedKeys) {
  const ret = {};
  for (const key in props) {
    if (!excludedKeys.includes(key)) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        get: () => props[key]
      });
    }
  }
  return ret;
}
function withAsyncContext(getAwaitable) {
  const ctx = runtime_core_esm_bundler_getCurrentInstance();
  if (false) {}
  let awaitable = getAwaitable();
  unsetCurrentInstance();
  if (isPromise(awaitable)) {
    awaitable = awaitable.catch((e) => {
      setCurrentInstance(ctx);
      throw e;
    });
  }
  return [awaitable, () => setCurrentInstance(ctx)];
}

function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties =  false ? 0 : null;
  if (false) {}
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (shared_esm_bundler_isFunction(methodHandler)) {
        if (false) {} else {
          ctx[key] = methodHandler.bind(publicThis);
        }
        if (false) {}
      } else if (false) {}
    }
  }
  if (dataOptions) {
    if (false) {}
    const data = dataOptions.call(publicThis, publicThis);
    if (false) {}
    if (!shared_esm_bundler_isObject(data)) {
       false && 0;
    } else {
      instance.data = reactive(data);
      if (false) {}
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = shared_esm_bundler_isFunction(opt) ? opt.bind(publicThis, publicThis) : shared_esm_bundler_isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : shared_esm_bundler_NOOP;
      if (false) {}
      const set = !shared_esm_bundler_isFunction(opt) && shared_esm_bundler_isFunction(opt.set) ? opt.set.bind(publicThis) :  false ? 0 : shared_esm_bundler_NOOP;
      const c = runtime_core_esm_bundler_computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (false) {}
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = shared_esm_bundler_isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (shared_esm_bundler_isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(runtime_core_esm_bundler_onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(runtime_core_esm_bundler_onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (shared_esm_bundler_isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === shared_esm_bundler_NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = shared_esm_bundler_NOOP) {
  if (shared_esm_bundler_isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (shared_esm_bundler_isObject(opt)) {
      if ("default" in opt) {
        injected = runtime_core_esm_bundler_inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = runtime_core_esm_bundler_inject(opt.from || key);
      }
    } else {
      injected = runtime_core_esm_bundler_inject(opt);
    }
    if (reactivity_esm_bundler_isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (false) {}
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    shared_esm_bundler_isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (shared_esm_bundler_isString(raw)) {
    const handler = ctx[raw];
    if (shared_esm_bundler_isFunction(handler)) {
      watch(getter, handler);
    } else if (false) {}
  } else if (shared_esm_bundler_isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (shared_esm_bundler_isObject(raw)) {
    if (shared_esm_bundler_isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = shared_esm_bundler_isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (shared_esm_bundler_isFunction(handler)) {
        watch(getter, handler, raw);
      } else if (false) {}
    }
  } else if (false) {}
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (shared_esm_bundler_isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
       false && 0;
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return (shared_esm_bundler_extend)(
      shared_esm_bundler_isFunction(to) ? to.call(this, this) : to,
      shared_esm_bundler_isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (shared_esm_bundler_isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? shared_esm_bundler_extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (shared_esm_bundler_isArray(to) && shared_esm_bundler_isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return shared_esm_bundler_extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = shared_esm_bundler_extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}

function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!shared_esm_bundler_isFunction(rootComponent)) {
      rootComponent = shared_esm_bundler_extend({}, rootComponent);
    }
    if (rootProps != null && !shared_esm_bundler_isObject(rootProps)) {
       false && 0;
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (false) {}
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
           false && 0;
        } else if (plugin && shared_esm_bundler_isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (shared_esm_bundler_isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (false) {}
        return app;
      },
      mixin(mixin) {
        if (__VUE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (false) {}
        } else if (false) {}
        return app;
      },
      component(name, component) {
        if (false) {}
        if (!component) {
          return context.components[name];
        }
        if (false) {}
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (false) {}
        if (!directive) {
          return context.directives[name];
        }
        if (false) {}
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          if (false) {}
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          if (false) {}
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          if ( false || __VUE_PROD_DEVTOOLS__) {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else if (false) {}
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          if ( false || __VUE_PROD_DEVTOOLS__) {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else if (false) {}
      },
      provide(key, value) {
        if (false) {}
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;

function provide(key, value) {
  if (!currentInstance) {
    if (false) {}
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function runtime_core_esm_bundler_inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && shared_esm_bundler_isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (false) {}
  } else if (false) {}
}
function runtime_core_esm_bundler_hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}

function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (false) {}
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = reactivity_esm_bundler_toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
     true && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (shared_esm_bundler_hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = shared_esm_bundler_camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !shared_esm_bundler_hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = shared_esm_bundler_hyphenate(key)) === key || !shared_esm_bundler_hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !shared_esm_bundler_hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  if (false) {}
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (shared_esm_bundler_isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && shared_esm_bundler_hasOwn(options, camelKey = shared_esm_bundler_camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = reactivity_esm_bundler_toRaw(props);
    const castValues = rawCastValues || shared_esm_bundler_EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !shared_esm_bundler_hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = shared_esm_bundler_hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && shared_esm_bundler_isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0 /* shouldCast */]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1 /* shouldCastTrue */] && (value === "" || value === shared_esm_bundler_hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (__VUE_OPTIONS_API__ && !shared_esm_bundler_isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      shared_esm_bundler_extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (shared_esm_bundler_isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (shared_esm_bundler_isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (false) {}
      const normalizedKey = shared_esm_bundler_camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = shared_esm_bundler_EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (false) {}
    for (const key in raw) {
      const normalizedKey = shared_esm_bundler_camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = shared_esm_bundler_isArray(opt) || shared_esm_bundler_isFunction(opt) ? { type: opt } : shared_esm_bundler_extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0 /* shouldCast */] = booleanIndex > -1;
          prop[1 /* shouldCastTrue */] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || shared_esm_bundler_hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (shared_esm_bundler_isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !shared_esm_bundler_isReservedProp(key)) {
    return true;
  } else if (false) {}
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (shared_esm_bundler_isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (shared_esm_bundler_isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
       false ? 0 : resolvedValues,
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ (/* unused pure expression or super */ null && (makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
)));
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}

const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => shared_esm_bundler_isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) {}
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (shared_esm_bundler_isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (false) {}
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (false) {}
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = reactivity_esm_bundler_toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = shared_esm_bundler_EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (false) {} else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        shared_esm_bundler_extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};

function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (shared_esm_bundler_isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (shared_esm_bundler_isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref } = rawRef;
  if (false) {}
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === shared_esm_bundler_EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref) {
    if (shared_esm_bundler_isString(oldRef)) {
      refs[oldRef] = null;
      if (shared_esm_bundler_hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (reactivity_esm_bundler_isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (shared_esm_bundler_isFunction(ref)) {
    callWithErrorHandling(ref, owner, 12, [value, refs]);
  } else {
    const _isString = shared_esm_bundler_isString(ref);
    const _isRef = reactivity_esm_bundler_isRef(ref);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? shared_esm_bundler_hasOwn(setupState, ref) ? setupState[ref] : refs[ref] : ref.value;
          if (isUnmount) {
            shared_esm_bundler_isArray(existing) && remove(existing, refValue);
          } else {
            if (!shared_esm_bundler_isArray(existing)) {
              if (_isString) {
                refs[ref] = [refValue];
                if (shared_esm_bundler_hasOwn(setupState, ref)) {
                  setupState[ref] = refs[ref];
                }
              } else {
                ref.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref] = value;
          if (shared_esm_bundler_hasOwn(setupState, ref)) {
            setupState[ref] = value;
          }
        } else if (_isRef) {
          ref.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else if (false) {}
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (false) {}
  }
}

let hasMismatch = false;
const isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
const isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
const getContainerType = (container) => {
  if (isSVGContainer(container))
    return "svg";
  if (isMathMLContainer(container))
    return "mathml";
  return void 0;
};
const isComment = (node) => node.nodeType === 8 /* COMMENT */;
function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp,
      createText,
      nextSibling,
      parentNode,
      remove,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      ( false || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(
        `Attempting to hydrate existing markup but container is empty. Performing full mount instead.`
      );
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(
      node,
      vnode,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      isFragmentStart
    );
    const { type, ref, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if ( false || __VUE_PROD_DEVTOOLS__) {
      if (!("__vnode" in node)) {
        Object.defineProperty(node, "__vnode", {
          value: vnode,
          enumerable: false
        });
      }
      if (!("__vueParentComponent" in node)) {
        Object.defineProperty(node, "__vueParentComponent", {
          value: parentComponent,
          enumerable: false
        });
      }
    }
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3 /* TEXT */) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            ( false || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(
              `Hydration text mismatch in`,
              node.parentNode,
              `
  - rendered on server: ${JSON.stringify(
                node.data
              )}
  - expected on client: ${JSON.stringify(vnode.children)}`
            );
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(
            vnode.el = node.content.firstChild,
            node,
            parentComponent
          );
        } else if (domType !== 8 /* COMMENT */ || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case runtime_core_esm_bundler_Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 /* ELEMENT */ || domType === 3 /* TEXT */) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 /* ELEMENT */ ? nextNode.outerHTML : nextNode.data;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case runtime_core_esm_bundler_Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
        break;
      default:
        if (shapeFlag & 1) {
          if ((domType !== 1 /* ELEMENT */ || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          if (isFragmentStart) {
            nextNode = locateClosingAnchor(node);
          } else if (isComment(node) && node.data === "teleport start") {
            nextNode = locateClosingAnchor(node, node.data, "teleport end");
          } else {
            nextNode = nextSibling(node);
          }
          mountComponent(
            vnode,
            container,
            null,
            parentComponent,
            parentSuspense,
            getContainerType(container),
            optimized
          );
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(runtime_core_esm_bundler_Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8 /* COMMENT */) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateChildren
            );
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            getContainerType(parentNode(node)),
            slotScopeIds,
            optimized,
            rendererInternals,
            hydrateNode
          );
        } else if ( false || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) {
          warn$1("Invalid HostVNode type:", type, `(${typeof type})`);
        }
    }
    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
    const forcePatch = type === "input" || type === "option";
    if ( false || forcePatch || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      let needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(parentSuspense, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        const content = el.content.firstChild;
        if (needCallTransitionHooks) {
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(
          el.firstChild,
          vnode,
          el,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        let hasWarned = false;
        while (next) {
          hasMismatch = true;
          if (( false || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && !hasWarned) {
            warn$1(
              `Hydration children mismatch on`,
              el,
              `
Server rendered element contains more child nodes than client vdom.`
            );
            hasWarned = true;
          }
          const cur = next;
          next = next.nextSibling;
          remove(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          ( false || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(
            `Hydration text content mismatch on`,
            el,
            `
  - rendered on server: ${el.textContent}
  - expected on client: ${vnode.children}`
          );
          el.textContent = vnode.children;
        }
      }
      if (props) {
        if ( false || forcePatch || !optimized || patchFlag & (16 | 32)) {
          for (const key in props) {
            if (false) {}
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || // force hydrate v-bind with .prop modifiers
            key[0] === ".") {
              patchProp(
                el,
                key,
                null,
                props[key],
                void 0,
                void 0,
                parentComponent
              );
            }
          }
        } else if (props.onClick) {
          patchProp(
            el,
            "onClick",
            null,
            props.onClick,
            void 0,
            void 0,
            parentComponent
          );
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    let hasWarned = false;
    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      if (node) {
        node = hydrateNode(
          node,
          vnode,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        if (( false || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && !hasWarned) {
          warn$1(
            `Hydration children mismatch on`,
            container,
            `
Server rendered element contains fewer child nodes than client vdom.`
          );
          hasWarned = true;
        }
        patch(
          null,
          vnode,
          container,
          null,
          parentComponent,
          parentSuspense,
          getContainerType(container),
          slotScopeIds
        );
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(
      nextSibling(node),
      vnode,
      container,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    ( false || __VUE_PROD_HYDRATION_MISMATCH_DETAILS__) && warn$1(
      `Hydration node mismatch:
- rendered on server:`,
      node,
      node.nodeType === 3 /* TEXT */ ? `(text)` : isComment(node) && node.data === "[" ? `(start of fragment)` : ``,
      `
- expected on client:`,
      vnode.type
    );
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove(node);
    patch(
      null,
      vnode,
      container,
      next,
      parentComponent,
      parentSuspense,
      getContainerType(container),
      slotScopeIds
    );
    return next;
  };
  const locateClosingAnchor = (node, open = "[", close = "]") => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === open)
          match++;
        if (node.data === close) {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  const replaceNode = (newNode, oldNode, parentComponent) => {
    const parentNode2 = oldNode.parentNode;
    if (parentNode2) {
      parentNode2.replaceChild(newNode, oldNode);
    }
    let parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) {
        parent.vnode.el = parent.subTree.el = newNode;
      }
      parent = parent.parent;
    }
  };
  const isTemplateNode = (node) => {
    return node.nodeType === 1 /* ELEMENT */ && node.tagName.toLowerCase() === "template";
  };
  return [hydrate, hydrateNode];
}
function propHasMismatch(el, key, clientValue, vnode, instance) {
  var _a;
  let mismatchType;
  let mismatchKey;
  let actual;
  let expected;
  if (key === "class") {
    actual = el.getAttribute("class");
    expected = normalizeClass(clientValue);
    if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
      mismatchType = mismatchKey = `class`;
    }
  } else if (key === "style") {
    actual = el.getAttribute("style");
    expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
    const actualMap = toStyleMap(actual);
    const expectedMap = toStyleMap(expected);
    if (vnode.dirs) {
      for (const { dir, value } of vnode.dirs) {
        if (dir.name === "show" && !value) {
          expectedMap.set("display", "none");
        }
      }
    }
    const root = instance == null ? void 0 : instance.subTree;
    if (vnode === root || (root == null ? void 0 : root.type) === runtime_core_esm_bundler_Fragment && root.children.includes(vnode)) {
      const cssVars = (_a = instance == null ? void 0 : instance.getCssVars) == null ? void 0 : _a.call(instance);
      for (const key2 in cssVars) {
        expectedMap.set(`--${key2}`, String(cssVars[key2]));
      }
    }
    if (!isMapEqual(actualMap, expectedMap)) {
      mismatchType = mismatchKey = "style";
    }
  } else if (el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key))) {
    if (isBooleanAttr(key)) {
      actual = el.hasAttribute(key);
      expected = includeBooleanAttr(clientValue);
    } else if (clientValue == null) {
      actual = el.hasAttribute(key);
      expected = false;
    } else {
      if (el.hasAttribute(key)) {
        actual = el.getAttribute(key);
      } else if (key === "value" && el.tagName === "TEXTAREA") {
        actual = el.value;
      } else {
        actual = false;
      }
      expected = isRenderableAttrValue(clientValue) ? String(clientValue) : false;
    }
    if (actual !== expected) {
      mismatchType = `attribute`;
      mismatchKey = key;
    }
  }
  if (mismatchType) {
    const format = (v) => v === false ? `(not rendered)` : `${mismatchKey}="${v}"`;
    const preSegment = `Hydration ${mismatchType} mismatch on`;
    const postSegment = `
  - rendered on server: ${format(actual)}
  - expected on client: ${format(expected)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
    {
      warn$1(preSegment, el, postSegment);
    }
    return true;
  }
  return false;
}
function toClassSet(str) {
  return new Set(str.trim().split(/\s+/));
}
function isSetEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (const s of a) {
    if (!b.has(s)) {
      return false;
    }
  }
  return true;
}
function toStyleMap(str) {
  const styleMap = /* @__PURE__ */ new Map();
  for (const item of str.split(";")) {
    let [key, value] = item.split(":");
    key = key == null ? void 0 : key.trim();
    value = value == null ? void 0 : value.trim();
    if (key && value) {
      styleMap.set(key, value);
    }
  }
  return styleMap;
}
function isMapEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  for (const [key, value] of a) {
    if (value !== b.get(key)) {
      return false;
    }
  }
  return true;
}

let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  if ( false || __VUE_PROD_DEVTOOLS__) {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  if ( false || __VUE_PROD_DEVTOOLS__) {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}

function initFeatureFlags() {
  const needWarn = [];
  if (typeof __VUE_OPTIONS_API__ !== "boolean") {
     false && 0;
    getGlobalThis().__VUE_OPTIONS_API__ = true;
  }
  if (typeof __VUE_PROD_DEVTOOLS__ !== "boolean") {
     false && 0;
    getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
  }
  if (typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ !== "boolean") {
     false && 0;
    getGlobalThis().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
  }
  if (false) {}
}

const queuePostRenderEffect = queueEffectWithSuspense ;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function runtime_core_esm_bundler_createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  if ( false || __VUE_PROD_DEVTOOLS__) {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = shared_esm_bundler_NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized =  false ? 0 : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case runtime_core_esm_bundler_Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        } else if (false) {}
        break;
      case runtime_core_esm_bundler_Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (false) {}
    }
    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, namespace) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !shared_esm_bundler_isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if ( false || __VUE_PROD_DEVTOOLS__) {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (false) {}
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || shared_esm_bundler_EMPTY_OBJ;
    const newProps = n2.props || shared_esm_bundler_EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (false) {}
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
      if (false) {}
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          namespace
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                namespace,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        namespace
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === runtime_core_esm_bundler_Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== shared_esm_bundler_EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!shared_esm_bundler_isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (shared_esm_bundler_isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (false) {}
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (false) {} else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    ));
    if (false) {}
    if (false) {}
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (false) {}
      setupComponent(instance);
      if (false) {}
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
    if (false) {}
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (false) {}
        updateComponentPreRender(instance, n2, optimized);
        if (false) {}
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.effect.dirty = true;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (false) {}
            instance.subTree = renderComponentRoot(instance);
            if (false) {}
            if (false) {}
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            if (false) {}
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (false) {}
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (false) {}
          if (false) {}
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          if (false) {}
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if ( false || __VUE_PROD_DEVTOOLS__) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        if (false) {}
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (false) {}
        const nextTree = renderComponentRoot(instance);
        if (false) {}
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (false) {}
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        if (false) {}
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        if ( false || __VUE_PROD_DEVTOOLS__) {
          devtoolsComponentUpdated(instance);
        }
        if (false) {}
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      shared_esm_bundler_NOOP,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => {
      if (effect.dirty) {
        effect.run();
      }
    };
    update.id = instance.uid;
    toggleRecurse(instance, true);
    if (false) {}
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (false) {}
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === runtime_core_esm_bundler_Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === runtime_core_esm_bundler_Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove2 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove2();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove2, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== runtime_core_esm_bundler_Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === runtime_core_esm_bundler_Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === runtime_core_esm_bundler_Fragment) {
      if (false) {} else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === runtime_core_esm_bundler_Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (false) {}
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    if ( false || __VUE_PROD_DEVTOOLS__) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (shared_esm_bundler_isArray(ch1) && shared_esm_bundler_isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (false) {}
    }
  }
}
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}

const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (shared_esm_bundler_isString(targetSelector)) {
    if (!select) {
       false && 0;
      return null;
    } else {
      const target = select(targetSelector);
      if (!target) {
         false && 0;
      }
      return target;
    }
  } else {
    if (false) {}
    return targetSelector;
  }
};
const TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (false) {}
    if (n1 == null) {
      const placeholder = n2.el =  false ? 0 : createText("");
      const mainAnchor = n2.anchor =  false ? 0 : createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        if (namespace === "svg" || isTargetSVG(target)) {
          namespace = "svg";
        } else if (namespace === "mathml" || isTargetMathML(target)) {
          namespace = "mathml";
        }
      } else if (false) {}
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      if (namespace === "svg" || isTargetSVG(target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          } else if (false) {}
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
    }
    updateCssVars(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      const shouldRemove = doRemove || !isTeleportDisabled(props);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(
          child,
          parentComponent,
          parentSuspense,
          shouldRemove,
          !!child.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector }
}, hydrateChildren) {
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(
          nextSibling(node),
          vnode,
          parentNode(node),
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(
          targetNode,
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = (/* unused pure expression or super */ null && (TeleportImpl));
function updateCssVars(vnode) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node = vnode.children[0].el;
    while (node && node !== vnode.targetAnchor) {
      if (node.nodeType === 1)
        node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}

const runtime_core_esm_bundler_Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const runtime_core_esm_bundler_Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (false) {}
  return n1.type === n2.type && n1.key === n2.key;
}
let vnodeArgsTransformer;
function transformVNodeArgs(transformer) {
  vnodeArgsTransformer = transformer;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args
  );
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref,
  ref_key,
  ref_for
}) => {
  if (typeof ref === "number") {
    ref = "" + ref;
  }
  return ref != null ? shared_esm_bundler_isString(ref) || reactivity_esm_bundler_isRef(ref) || shared_esm_bundler_isFunction(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === runtime_core_esm_bundler_Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= shared_esm_bundler_isString(children) ? 8 : 16;
  }
  if (false) {}
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode =  false ? 0 : _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (false) {}
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !shared_esm_bundler_isString(klass)) {
      props.class = shared_esm_bundler_normalizeClass(klass);
    }
    if (shared_esm_bundler_isObject(style)) {
      if (isProxy(style) && !shared_esm_bundler_isArray(style)) {
        style = shared_esm_bundler_extend({}, style);
      }
      props.style = shared_esm_bundler_normalizeStyle(style);
    }
  }
  const shapeFlag = shared_esm_bundler_isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : shared_esm_bundler_isObject(type) ? 4 : shared_esm_bundler_isFunction(type) ? 2 : 0;
  if (false) {}
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? shared_esm_bundler_extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref ? shared_esm_bundler_isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children:  false ? 0 : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== runtime_core_esm_bundler_Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(runtime_core_esm_bundler_Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (shared_esm_bundler_isArray(child)) {
    return createVNode(
      runtime_core_esm_bundler_Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (shared_esm_bundler_isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (shared_esm_bundler_isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = shared_esm_bundler_normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = shared_esm_bundler_normalizeStyle([ret.style, toMerge.style]);
      } else if (shared_esm_bundler_isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(shared_esm_bundler_isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}

const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: shared_esm_bundler_EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: shared_esm_bundler_EMPTY_OBJ,
    data: shared_esm_bundler_EMPTY_OBJ,
    props: shared_esm_bundler_EMPTY_OBJ,
    attrs: shared_esm_bundler_EMPTY_OBJ,
    slots: shared_esm_bundler_EMPTY_OBJ,
    refs: shared_esm_bundler_EMPTY_OBJ,
    setupState: shared_esm_bundler_EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (false) {} else {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const runtime_core_esm_bundler_getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key]))
      setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1)
        setters.forEach((set) => set(v));
      else
        setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ (/* unused pure expression or super */ null && (makeMap("slot,component")));
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a;
  const Component = instance.type;
  if (false) {}
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  if (false) {}
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
         false ? 0 : instance.props,
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (shared_esm_bundler_isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (false) {}
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (shared_esm_bundler_isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (shared_esm_bundler_isObject(setupResult)) {
    if (false) {}
    if ( false || __VUE_PROD_DEVTOOLS__) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (false) {}
  } else if (false) {}
  finishComponentSetup(instance, isSSR);
}
let compile;
let installWithProxy;
function registerRuntimeCompiler(_compile) {
  compile = _compile;
  installWithProxy = (i) => {
    if (i.render._rc) {
      i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  };
}
const runtime_core_esm_bundler_isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (false) {}
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = shared_esm_bundler_extend(
          shared_esm_bundler_extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
        if (false) {}
      }
    }
    instance.render = Component.render || shared_esm_bundler_NOOP;
    if (installWithProxy) {
      installWithProxy(instance);
    }
  }
  if (__VUE_OPTIONS_API__ && true) {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (false) {}
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
     false ? 0 : {
      get(target, key) {
        reactivity_esm_bundler_track(instance, "get", "$attrs");
        return target[key];
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (false) {}
    instance.exposed = exposed || {};
  };
  if (false) {} else {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return shared_esm_bundler_isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return shared_esm_bundler_isFunction(value) && "__vccOpts" in value;
}

const runtime_core_esm_bundler_computed = (getterOrOptions, debugOptions) => {
  const c = computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
  if (false) {}
  return c;
};

function useModel(props, name, options = EMPTY_OBJ) {
  const i = runtime_core_esm_bundler_getCurrentInstance();
  if (false) {}
  if (false) {}
  const camelizedName = camelize(name);
  const hyphenatedName = hyphenate(name);
  const res = customRef((track, trigger) => {
    let localValue;
    watchSyncEffect(() => {
      const propValue = props[name];
      if (hasChanged(localValue, propValue)) {
        localValue = propValue;
        trigger();
      }
    });
    return {
      get() {
        track();
        return options.get ? options.get(localValue) : localValue;
      },
      set(value) {
        const rawProps = i.vnode.props;
        if (!(rawProps && // check if parent has passed v-model
        (name in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) && (`onUpdate:${name}` in rawProps || `onUpdate:${camelizedName}` in rawProps || `onUpdate:${hyphenatedName}` in rawProps)) && hasChanged(value, localValue)) {
          localValue = value;
          trigger();
        }
        i.emit(`update:${name}`, options.set ? options.set(value) : value);
      }
    };
  });
  const modifierKey = name === "modelValue" ? "modelModifiers" : `${name}Modifiers`;
  res[Symbol.iterator] = () => {
    let i2 = 0;
    return {
      next() {
        if (i2 < 2) {
          return { value: i2++ ? props[modifierKey] || {} : res, done: false };
        } else {
          return { done: true };
        }
      }
    };
  };
  return res;
}

function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (shared_esm_bundler_isObject(propsOrChildren) && !shared_esm_bundler_isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}

function initCustomFormatter() {
  if (true) {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#1677ff" };
  const stringStyle = { style: "color:#f5222d" };
  const keywordStyle = { style: "color:#eb2f96" };
  const formatter = {
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed = extractKeys(instance, "computed");
    if (computed) {
      blocks.push(createInstanceBlock("computed", computed));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}

function withMemo(memo, render, cache, index) {
  const cached = cache[index];
  if (cached && isMemoSame(cached, memo)) {
    return cached;
  }
  const ret = render();
  ret.memo = memo.slice();
  return cache[index] = ret;
}
function isMemoSame(cached, memo) {
  const prev = cached.memo;
  if (prev.length != memo.length) {
    return false;
  }
  for (let i = 0; i < prev.length; i++) {
    if (hasChanged(prev[i], memo[i])) {
      return false;
    }
  }
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(cached);
  }
  return true;
}

const version = "3.4.21";
const runtime_core_esm_bundler_warn = (/* unused pure expression or super */ null && ( false ? 0 : NOOP));
const ErrorTypeStrings = (/* unused pure expression or super */ null && (ErrorTypeStrings$1)) ;
const devtools =  true ? devtools$1 : 0;
const setDevtoolsHook = (/* unused pure expression or super */ null && ( true ? setDevtoolsHook$1 : 0));
const _ssrUtils = {
  createComponentInstance,
  setupComponent,
  renderComponentRoot,
  setCurrentRenderingInstance,
  isVNode: isVNode,
  normalizeVNode
};
const ssrUtils = (/* unused pure expression or super */ null && (_ssrUtils)) ;
const resolveFilter = null;
const compatUtils = null;
const DeprecationTypes = null;



;// CONCATENATED MODULE: ./node_modules/pinia/node_modules/vue-demi/lib/index.mjs


var lib_isVue2 = false
var isVue3 = true
var Vue2 = (/* unused pure expression or super */ null && (undefined))

function install() {}

function lib_set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}




;// CONCATENATED MODULE: ./node_modules/@vue/devtools-api/lib/esm/env.js
function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
    // @ts-expect-error navigator and windows are not available in all environments
    return (typeof navigator !== 'undefined' && typeof window !== 'undefined')
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : {};
}
const isProxyAvailable = typeof Proxy === 'function';

;// CONCATENATED MODULE: ./node_modules/@vue/devtools-api/lib/esm/const.js
const HOOK_SETUP = 'devtools-plugin:setup';
const HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set';

;// CONCATENATED MODULE: ./node_modules/@vue/devtools-api/lib/esm/time.js
let time_supported;
let time_perf;
function isPerformanceSupported() {
    var _a;
    if (time_supported !== undefined) {
        return time_supported;
    }
    if (typeof window !== 'undefined' && window.performance) {
        time_supported = true;
        time_perf = window.performance;
    }
    else if (typeof globalThis !== 'undefined' && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
        time_supported = true;
        time_perf = globalThis.perf_hooks.performance;
    }
    else {
        time_supported = false;
    }
    return time_supported;
}
function now() {
    return isPerformanceSupported() ? time_perf.now() : Date.now();
}

;// CONCATENATED MODULE: ./node_modules/@vue/devtools-api/lib/esm/proxy.js


class ApiProxy {
    constructor(plugin, hook) {
        this.target = null;
        this.targetQueue = [];
        this.onQueue = [];
        this.plugin = plugin;
        this.hook = hook;
        const defaultSettings = {};
        if (plugin.settings) {
            for (const id in plugin.settings) {
                const item = plugin.settings[id];
                defaultSettings[id] = item.defaultValue;
            }
        }
        const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
        let currentSettings = Object.assign({}, defaultSettings);
        try {
            const raw = localStorage.getItem(localSettingsSaveId);
            const data = JSON.parse(raw);
            Object.assign(currentSettings, data);
        }
        catch (e) {
            // noop
        }
        this.fallbacks = {
            getSettings() {
                return currentSettings;
            },
            setSettings(value) {
                try {
                    localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
                }
                catch (e) {
                    // noop
                }
                currentSettings = value;
            },
            now() {
                return now();
            },
        };
        if (hook) {
            hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
                if (pluginId === this.plugin.id) {
                    this.fallbacks.setSettings(value);
                }
            });
        }
        this.proxiedOn = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target.on[prop];
                }
                else {
                    return (...args) => {
                        this.onQueue.push({
                            method: prop,
                            args,
                        });
                    };
                }
            },
        });
        this.proxiedTarget = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target[prop];
                }
                else if (prop === 'on') {
                    return this.proxiedOn;
                }
                else if (Object.keys(this.fallbacks).includes(prop)) {
                    return (...args) => {
                        this.targetQueue.push({
                            method: prop,
                            args,
                            resolve: () => { },
                        });
                        return this.fallbacks[prop](...args);
                    };
                }
                else {
                    return (...args) => {
                        return new Promise((resolve) => {
                            this.targetQueue.push({
                                method: prop,
                                args,
                                resolve,
                            });
                        });
                    };
                }
            },
        });
    }
    async setRealTarget(target) {
        this.target = target;
        for (const item of this.onQueue) {
            this.target.on[item.method](...item.args);
        }
        for (const item of this.targetQueue) {
            item.resolve(await this.target[item.method](...item.args));
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/@vue/devtools-api/lib/esm/index.js






function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
        hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    }
    else {
        const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor: descriptor,
            setupFn,
            proxy,
        });
        if (proxy) {
            setupFn(proxy.proxiedTarget);
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/pinia/dist/pinia.mjs
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */



/**
 * setActivePinia must be called to handle SSR at the top of functions like
 * `fetch`, `setup`, `serverPrefetch` and others
 */
let activePinia;
/**
 * Sets or unsets the active pinia. Used in SSR and internally when calling
 * actions and getters
 *
 * @param pinia - Pinia instance
 */
// @ts-expect-error: cannot constrain the type of the return
const setActivePinia = (pinia) => (activePinia = pinia);
/**
 * Get the currently active pinia if there is any.
 */
const getActivePinia = () => (hasInjectionContext() && inject(piniaSymbol)) || activePinia;
const piniaSymbol = (( false) ? 0 : /* istanbul ignore next */ Symbol());

function pinia_isPlainObject(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
o) {
    return (o &&
        typeof o === 'object' &&
        Object.prototype.toString.call(o) === '[object Object]' &&
        typeof o.toJSON !== 'function');
}
// type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
// TODO: can we change these to numbers?
/**
 * Possible types for SubscriptionCallback
 */
var MutationType;
(function (MutationType) {
    /**
     * Direct mutation of the state:
     *
     * - `store.name = 'new name'`
     * - `store.$state.name = 'new name'`
     * - `store.list.push('new item')`
     */
    MutationType["direct"] = "direct";
    /**
     * Mutated the state with `$patch` and an object
     *
     * - `store.$patch({ name: 'newName' })`
     */
    MutationType["patchObject"] = "patch object";
    /**
     * Mutated the state with `$patch` and a function
     *
     * - `store.$patch(state => state.name = 'newName')`
     */
    MutationType["patchFunction"] = "patch function";
    // maybe reset? for $state = {} and $reset
})(MutationType || (MutationType = {}));

const IS_CLIENT = typeof window !== 'undefined';
/**
 * Should we add the devtools plugins.
 * - only if dev mode or forced through the prod devtools flag
 * - not in test
 * - only if window exists (could change in the future)
 */
const USE_DEVTOOLS = (( false) || (typeof __VUE_PROD_DEVTOOLS__ !== 'undefined' && __VUE_PROD_DEVTOOLS__)) && !("production" === 'test') && IS_CLIENT;

/*
 * FileSaver.js A saveAs() FileSaver implementation.
 *
 * Originally by Eli Grey, adapted as an ESM module by Eduardo San Martin
 * Morote.
 *
 * License : MIT
 */
// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
const _global = /*#__PURE__*/ (() => typeof window === 'object' && window.window === window
    ? window
    : typeof self === 'object' && self.self === self
        ? self
        : typeof __webpack_require__.g === 'object' && __webpack_require__.g.global === __webpack_require__.g
            ? __webpack_require__.g
            : typeof globalThis === 'object'
                ? globalThis
                : { HTMLElement: null })();
function bom(blob, { autoBom = false } = {}) {
    // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
    if (autoBom &&
        /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
    }
    return blob;
}
function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function () {
        console.error('could not download file');
    };
    xhr.send();
}
function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    // use sync to avoid popup blocker
    xhr.open('HEAD', url, false);
    try {
        xhr.send();
    }
    catch (e) { }
    return xhr.status >= 200 && xhr.status <= 299;
}
// `a.click()` doesn't work for all browsers (#465)
function click(node) {
    try {
        node.dispatchEvent(new MouseEvent('click'));
    }
    catch (e) {
        const evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
    }
}
const _navigator = 
 typeof navigator === 'object' ? navigator : { userAgent: '' };
// Detect WebView inside a native macOS app by ruling out all browsers
// We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
// https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
const isMacOSWebView = /*#__PURE__*/ (() => /Macintosh/.test(_navigator.userAgent) &&
    /AppleWebKit/.test(_navigator.userAgent) &&
    !/Safari/.test(_navigator.userAgent))();
const saveAs = !IS_CLIENT
    ? () => { } // noop
    : // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
        typeof HTMLAnchorElement !== 'undefined' &&
            'download' in HTMLAnchorElement.prototype &&
            !isMacOSWebView
            ? downloadSaveAs
            : // Use msSaveOrOpenBlob as a second approach
                'msSaveOrOpenBlob' in _navigator
                    ? msSaveAs
                    : // Fallback to using FileReader and a popup
                        fileSaverSaveAs;
function downloadSaveAs(blob, name = 'download', opts) {
    const a = document.createElement('a');
    a.download = name;
    a.rel = 'noopener'; // tabnabbing
    // TODO: detect chrome extensions & packaged apps
    // a.target = '_blank'
    if (typeof blob === 'string') {
        // Support regular links
        a.href = blob;
        if (a.origin !== location.origin) {
            if (corsEnabled(a.href)) {
                download(blob, name, opts);
            }
            else {
                a.target = '_blank';
                click(a);
            }
        }
        else {
            click(a);
        }
    }
    else {
        // Support blobs
        a.href = URL.createObjectURL(blob);
        setTimeout(function () {
            URL.revokeObjectURL(a.href);
        }, 4e4); // 40s
        setTimeout(function () {
            click(a);
        }, 0);
    }
}
function msSaveAs(blob, name = 'download', opts) {
    if (typeof blob === 'string') {
        if (corsEnabled(blob)) {
            download(blob, name, opts);
        }
        else {
            const a = document.createElement('a');
            a.href = blob;
            a.target = '_blank';
            setTimeout(function () {
                click(a);
            });
        }
    }
    else {
        // @ts-ignore: works on windows
        navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
}
function fileSaverSaveAs(blob, name, opts, popup) {
    // Open a popup immediately do go around popup blocker
    // Mostly only available on user interaction and the fileReader is async so...
    popup = popup || open('', '_blank');
    if (popup) {
        popup.document.title = popup.document.body.innerText = 'downloading...';
    }
    if (typeof blob === 'string')
        return download(blob, name, opts);
    const force = blob.type === 'application/octet-stream';
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || 'safari' in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || (force && isSafari) || isMacOSWebView) &&
        typeof FileReader !== 'undefined') {
        // Safari doesn't allow downloading of blob URLs
        const reader = new FileReader();
        reader.onloadend = function () {
            let url = reader.result;
            if (typeof url !== 'string') {
                popup = null;
                throw new Error('Wrong reader.result type');
            }
            url = isChromeIOS
                ? url
                : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
            if (popup) {
                popup.location.href = url;
            }
            else {
                location.assign(url);
            }
            popup = null; // reverse-tabnabbing #460
        };
        reader.readAsDataURL(blob);
    }
    else {
        const url = URL.createObjectURL(blob);
        if (popup)
            popup.location.assign(url);
        else
            location.href = url;
        popup = null; // reverse-tabnabbing #460
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 4e4); // 40s
    }
}

/**
 * Shows a toast or console.log
 *
 * @param message - message to log
 * @param type - different color of the tooltip
 */
function toastMessage(message, type) {
    const piniaMessage = '🍍 ' + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === 'function') {
        // No longer available :(
        __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    }
    else if (type === 'error') {
        console.error(piniaMessage);
    }
    else if (type === 'warn') {
        console.warn(piniaMessage);
    }
    else {
        console.log(piniaMessage);
    }
}
function isPinia(o) {
    return '_a' in o && 'install' in o;
}

/**
 * This file contain devtools actions, they are not Pinia actions.
 */
// ---
function checkClipboardAccess() {
    if (!('clipboard' in navigator)) {
        toastMessage(`Your browser doesn't support the Clipboard API`, 'error');
        return true;
    }
}
function checkNotFocusedError(error) {
    if (error instanceof Error &&
        error.message.toLowerCase().includes('document is not focused')) {
        toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', 'warn');
        return true;
    }
    return false;
}
async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
        return;
    try {
        await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
        toastMessage('Global state copied to clipboard.');
    }
    catch (error) {
        if (checkNotFocusedError(error))
            return;
        toastMessage(`Failed to serialize the state. Check the console for more details.`, 'error');
        console.error(error);
    }
}
async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
        return;
    try {
        loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
        toastMessage('Global state pasted from clipboard.');
    }
    catch (error) {
        if (checkNotFocusedError(error))
            return;
        toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, 'error');
        console.error(error);
    }
}
async function actionGlobalSaveState(pinia) {
    try {
        saveAs(new Blob([JSON.stringify(pinia.state.value)], {
            type: 'text/plain;charset=utf-8',
        }), 'pinia-state.json');
    }
    catch (error) {
        toastMessage(`Failed to export the state as JSON. Check the console for more details.`, 'error');
        console.error(error);
    }
}
let fileInput;
function getFileOpener() {
    if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
    }
    function openFile() {
        return new Promise((resolve, reject) => {
            fileInput.onchange = async () => {
                const files = fileInput.files;
                if (!files)
                    return resolve(null);
                const file = files.item(0);
                if (!file)
                    return resolve(null);
                return resolve({ text: await file.text(), file });
            };
            // @ts-ignore: TODO: changed from 4.3 to 4.4
            fileInput.oncancel = () => resolve(null);
            fileInput.onerror = reject;
            fileInput.click();
        });
    }
    return openFile;
}
async function actionGlobalOpenStateFile(pinia) {
    try {
        const open = getFileOpener();
        const result = await open();
        if (!result)
            return;
        const { text, file } = result;
        loadStoresState(pinia, JSON.parse(text));
        toastMessage(`Global state imported from "${file.name}".`);
    }
    catch (error) {
        toastMessage(`Failed to import the state from JSON. Check the console for more details.`, 'error');
        console.error(error);
    }
}
function loadStoresState(pinia, state) {
    for (const key in state) {
        const storeState = pinia.state.value[key];
        // store is already instantiated, patch it
        if (storeState) {
            Object.assign(storeState, state[key]);
        }
        else {
            // store is not instantiated, set the initial state
            pinia.state.value[key] = state[key];
        }
    }
}

function formatDisplay(display) {
    return {
        _custom: {
            display,
        },
    };
}
const PINIA_ROOT_LABEL = '🍍 Pinia (root)';
const PINIA_ROOT_ID = '_root';
function formatStoreForInspectorTree(store) {
    return isPinia(store)
        ? {
            id: PINIA_ROOT_ID,
            label: PINIA_ROOT_LABEL,
        }
        : {
            id: store.$id,
            label: store.$id,
        };
}
function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
        const storeNames = Array.from(store._s.keys());
        const storeMap = store._s;
        const state = {
            state: storeNames.map((storeId) => ({
                editable: true,
                key: storeId,
                value: store.state.value[storeId],
            })),
            getters: storeNames
                .filter((id) => storeMap.get(id)._getters)
                .map((id) => {
                const store = storeMap.get(id);
                return {
                    editable: false,
                    key: id,
                    value: store._getters.reduce((getters, key) => {
                        getters[key] = store[key];
                        return getters;
                    }, {}),
                };
            }),
        };
        return state;
    }
    const state = {
        state: Object.keys(store.$state).map((key) => ({
            editable: true,
            key,
            value: store.$state[key],
        })),
    };
    // avoid adding empty getters
    if (store._getters && store._getters.length) {
        state.getters = store._getters.map((getterName) => ({
            editable: false,
            key: getterName,
            value: store[getterName],
        }));
    }
    if (store._customProperties.size) {
        state.customProperties = Array.from(store._customProperties).map((key) => ({
            editable: true,
            key,
            value: store[key],
        }));
    }
    return state;
}
function formatEventData(events) {
    if (!events)
        return {};
    if (Array.isArray(events)) {
        // TODO: handle add and delete for arrays and objects
        return events.reduce((data, event) => {
            data.keys.push(event.key);
            data.operations.push(event.type);
            data.oldValue[event.key] = event.oldValue;
            data.newValue[event.key] = event.newValue;
            return data;
        }, {
            oldValue: {},
            keys: [],
            operations: [],
            newValue: {},
        });
    }
    else {
        return {
            operation: formatDisplay(events.type),
            key: formatDisplay(events.key),
            oldValue: events.oldValue,
            newValue: events.newValue,
        };
    }
}
function formatMutationType(type) {
    switch (type) {
        case MutationType.direct:
            return 'mutation';
        case MutationType.patchFunction:
            return '$patch';
        case MutationType.patchObject:
            return '$patch';
        default:
            return 'unknown';
    }
}

// timeline can be paused when directly changing the state
let isTimelineActive = true;
const componentStateTypes = [];
const MUTATIONS_LAYER_ID = 'pinia:mutations';
const INSPECTOR_ID = 'pinia';
const { assign: assign$1 } = Object;
/**
 * Gets the displayed name of a store in devtools
 *
 * @param id - id of the store
 * @returns a formatted string
 */
const getStoreType = (id) => '🍍 ' + id;
/**
 * Add the pinia plugin without any store. Allows displaying a Pinia plugin tab
 * as soon as it is added to the application.
 *
 * @param app - Vue application
 * @param pinia - pinia instance
 */
function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
        id: 'dev.esm.pinia',
        label: 'Pinia 🍍',
        logo: 'https://pinia.vuejs.org/logo.svg',
        packageName: 'pinia',
        homepage: 'https://pinia.vuejs.org',
        componentStateTypes,
        app,
    }, (api) => {
        if (typeof api.now !== 'function') {
            toastMessage('You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.');
        }
        api.addTimelineLayer({
            id: MUTATIONS_LAYER_ID,
            label: `Pinia 🍍`,
            color: 0xe5df88,
        });
        api.addInspector({
            id: INSPECTOR_ID,
            label: 'Pinia 🍍',
            icon: 'storage',
            treeFilterPlaceholder: 'Search stores',
            actions: [
                {
                    icon: 'content_copy',
                    action: () => {
                        actionGlobalCopyState(pinia);
                    },
                    tooltip: 'Serialize and copy the state',
                },
                {
                    icon: 'content_paste',
                    action: async () => {
                        await actionGlobalPasteState(pinia);
                        api.sendInspectorTree(INSPECTOR_ID);
                        api.sendInspectorState(INSPECTOR_ID);
                    },
                    tooltip: 'Replace the state with the content of your clipboard',
                },
                {
                    icon: 'save',
                    action: () => {
                        actionGlobalSaveState(pinia);
                    },
                    tooltip: 'Save the state as a JSON file',
                },
                {
                    icon: 'folder_open',
                    action: async () => {
                        await actionGlobalOpenStateFile(pinia);
                        api.sendInspectorTree(INSPECTOR_ID);
                        api.sendInspectorState(INSPECTOR_ID);
                    },
                    tooltip: 'Import the state from a JSON file',
                },
            ],
            nodeActions: [
                {
                    icon: 'restore',
                    tooltip: 'Reset the state (with "$reset")',
                    action: (nodeId) => {
                        const store = pinia._s.get(nodeId);
                        if (!store) {
                            toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, 'warn');
                        }
                        else if (typeof store.$reset !== 'function') {
                            toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, 'warn');
                        }
                        else {
                            store.$reset();
                            toastMessage(`Store "${nodeId}" reset.`);
                        }
                    },
                },
            ],
        });
        api.on.inspectComponent((payload, ctx) => {
            const proxy = (payload.componentInstance &&
                payload.componentInstance.proxy);
            if (proxy && proxy._pStores) {
                const piniaStores = payload.componentInstance.proxy._pStores;
                Object.values(piniaStores).forEach((store) => {
                    payload.instanceData.state.push({
                        type: getStoreType(store.$id),
                        key: 'state',
                        editable: true,
                        value: store._isOptionsAPI
                            ? {
                                _custom: {
                                    value: reactivity_esm_bundler_toRaw(store.$state),
                                    actions: [
                                        {
                                            icon: 'restore',
                                            tooltip: 'Reset the state of this store',
                                            action: () => store.$reset(),
                                        },
                                    ],
                                },
                            }
                            : // NOTE: workaround to unwrap transferred refs
                                Object.keys(store.$state).reduce((state, key) => {
                                    state[key] = store.$state[key];
                                    return state;
                                }, {}),
                    });
                    if (store._getters && store._getters.length) {
                        payload.instanceData.state.push({
                            type: getStoreType(store.$id),
                            key: 'getters',
                            editable: false,
                            value: store._getters.reduce((getters, key) => {
                                try {
                                    getters[key] = store[key];
                                }
                                catch (error) {
                                    // @ts-expect-error: we just want to show it in devtools
                                    getters[key] = error;
                                }
                                return getters;
                            }, {}),
                        });
                    }
                });
            }
        });
        api.on.getInspectorTree((payload) => {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                let stores = [pinia];
                stores = stores.concat(Array.from(pinia._s.values()));
                payload.rootNodes = (payload.filter
                    ? stores.filter((store) => '$id' in store
                        ? store.$id
                            .toLowerCase()
                            .includes(payload.filter.toLowerCase())
                        : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase()))
                    : stores).map(formatStoreForInspectorTree);
            }
        });
        api.on.getInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                const inspectedStore = payload.nodeId === PINIA_ROOT_ID
                    ? pinia
                    : pinia._s.get(payload.nodeId);
                if (!inspectedStore) {
                    // this could be the selected store restored for a different project
                    // so it's better not to say anything here
                    return;
                }
                if (inspectedStore) {
                    payload.state = formatStoreForInspectorState(inspectedStore);
                }
            }
        });
        api.on.editInspectorState((payload, ctx) => {
            if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
                const inspectedStore = payload.nodeId === PINIA_ROOT_ID
                    ? pinia
                    : pinia._s.get(payload.nodeId);
                if (!inspectedStore) {
                    return toastMessage(`store "${payload.nodeId}" not found`, 'error');
                }
                const { path } = payload;
                if (!isPinia(inspectedStore)) {
                    // access only the state
                    if (path.length !== 1 ||
                        !inspectedStore._customProperties.has(path[0]) ||
                        path[0] in inspectedStore.$state) {
                        path.unshift('$state');
                    }
                }
                else {
                    // Root access, we can omit the `.value` because the devtools API does it for us
                    path.unshift('state');
                }
                isTimelineActive = false;
                payload.set(inspectedStore, path, payload.state.value);
                isTimelineActive = true;
            }
        });
        api.on.editComponentState((payload) => {
            if (payload.type.startsWith('🍍')) {
                const storeId = payload.type.replace(/^🍍\s*/, '');
                const store = pinia._s.get(storeId);
                if (!store) {
                    return toastMessage(`store "${storeId}" not found`, 'error');
                }
                const { path } = payload;
                if (path[0] !== 'state') {
                    return toastMessage(`Invalid path for store "${storeId}":\n${path}\nOnly state can be modified.`);
                }
                // rewrite the first entry to be able to directly set the state as
                // well as any other path
                path[0] = '$state';
                isTimelineActive = false;
                payload.set(store, path, payload.state.value);
                isTimelineActive = true;
            }
        });
    });
}
function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
        componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
        id: 'dev.esm.pinia',
        label: 'Pinia 🍍',
        logo: 'https://pinia.vuejs.org/logo.svg',
        packageName: 'pinia',
        homepage: 'https://pinia.vuejs.org',
        componentStateTypes,
        app,
        settings: {
            logStoreChanges: {
                label: 'Notify about new/deleted stores',
                type: 'boolean',
                defaultValue: true,
            },
            // useEmojis: {
            //   label: 'Use emojis in messages ⚡️',
            //   type: 'boolean',
            //   defaultValue: true,
            // },
        },
    }, (api) => {
        // gracefully handle errors
        const now = typeof api.now === 'function' ? api.now.bind(api) : Date.now;
        store.$onAction(({ after, onError, name, args }) => {
            const groupId = runningActionId++;
            api.addTimelineEvent({
                layerId: MUTATIONS_LAYER_ID,
                event: {
                    time: now(),
                    title: '🛫 ' + name,
                    subtitle: 'start',
                    data: {
                        store: formatDisplay(store.$id),
                        action: formatDisplay(name),
                        args,
                    },
                    groupId,
                },
            });
            after((result) => {
                activeAction = undefined;
                api.addTimelineEvent({
                    layerId: MUTATIONS_LAYER_ID,
                    event: {
                        time: now(),
                        title: '🛬 ' + name,
                        subtitle: 'end',
                        data: {
                            store: formatDisplay(store.$id),
                            action: formatDisplay(name),
                            args,
                            result,
                        },
                        groupId,
                    },
                });
            });
            onError((error) => {
                activeAction = undefined;
                api.addTimelineEvent({
                    layerId: MUTATIONS_LAYER_ID,
                    event: {
                        time: now(),
                        logType: 'error',
                        title: '💥 ' + name,
                        subtitle: 'end',
                        data: {
                            store: formatDisplay(store.$id),
                            action: formatDisplay(name),
                            args,
                            error,
                        },
                        groupId,
                    },
                });
            });
        }, true);
        store._customProperties.forEach((name) => {
            watch(() => unref(store[name]), (newValue, oldValue) => {
                api.notifyComponentUpdate();
                api.sendInspectorState(INSPECTOR_ID);
                if (isTimelineActive) {
                    api.addTimelineEvent({
                        layerId: MUTATIONS_LAYER_ID,
                        event: {
                            time: now(),
                            title: 'Change',
                            subtitle: name,
                            data: {
                                newValue,
                                oldValue,
                            },
                            groupId: activeAction,
                        },
                    });
                }
            }, { deep: true });
        });
        store.$subscribe(({ events, type }, state) => {
            api.notifyComponentUpdate();
            api.sendInspectorState(INSPECTOR_ID);
            if (!isTimelineActive)
                return;
            // rootStore.state[store.id] = state
            const eventData = {
                time: now(),
                title: formatMutationType(type),
                data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
                groupId: activeAction,
            };
            if (type === MutationType.patchFunction) {
                eventData.subtitle = '⤵️';
            }
            else if (type === MutationType.patchObject) {
                eventData.subtitle = '🧩';
            }
            else if (events && !Array.isArray(events)) {
                eventData.subtitle = events.type;
            }
            if (events) {
                eventData.data['rawEvent(s)'] = {
                    _custom: {
                        display: 'DebuggerEvent',
                        type: 'object',
                        tooltip: 'raw DebuggerEvent[]',
                        value: events,
                    },
                };
            }
            api.addTimelineEvent({
                layerId: MUTATIONS_LAYER_ID,
                event: eventData,
            });
        }, { detached: true, flush: 'sync' });
        const hotUpdate = store._hotUpdate;
        store._hotUpdate = markRaw((newStore) => {
            hotUpdate(newStore);
            api.addTimelineEvent({
                layerId: MUTATIONS_LAYER_ID,
                event: {
                    time: now(),
                    title: '🔥 ' + store.$id,
                    subtitle: 'HMR update',
                    data: {
                        store: formatDisplay(store.$id),
                        info: formatDisplay(`HMR update`),
                    },
                },
            });
            // update the devtools too
            api.notifyComponentUpdate();
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
        });
        const { $dispose } = store;
        store.$dispose = () => {
            $dispose();
            api.notifyComponentUpdate();
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
            api.getSettings().logStoreChanges &&
                toastMessage(`Disposed "${store.$id}" store 🗑`);
        };
        // trigger an update so it can display new registered stores
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges &&
            toastMessage(`"${store.$id}" store installed 🆕`);
    });
}
let runningActionId = 0;
let activeAction;
/**
 * Patches a store to enable action grouping in devtools by wrapping the store with a Proxy that is passed as the
 * context of all actions, allowing us to set `runningAction` on each access and effectively associating any state
 * mutation to the action.
 *
 * @param store - store to patch
 * @param actionNames - list of actionst to patch
 */
function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    // original actions of the store as they are given by pinia. We are going to override them
    const actions = actionNames.reduce((storeActions, actionName) => {
        // use toRaw to avoid tracking #541
        storeActions[actionName] = reactivity_esm_bundler_toRaw(store)[actionName];
        return storeActions;
    }, {});
    for (const actionName in actions) {
        store[actionName] = function () {
            // the running action id is incremented in a before action hook
            const _actionId = runningActionId;
            const trackedStore = wrapWithProxy
                ? new Proxy(store, {
                    get(...args) {
                        activeAction = _actionId;
                        return Reflect.get(...args);
                    },
                    set(...args) {
                        activeAction = _actionId;
                        return Reflect.set(...args);
                    },
                })
                : store;
            // For Setup Stores we need https://github.com/tc39/proposal-async-context
            activeAction = _actionId;
            const retValue = actions[actionName].apply(trackedStore, arguments);
            // this is safer as async actions in Setup Stores would associate mutations done outside of the action
            activeAction = undefined;
            return retValue;
        };
    }
}
/**
 * pinia.use(devtoolsPlugin)
 */
function devtoolsPlugin({ app, store, options }) {
    // HMR module
    if (store.$id.startsWith('__hot:')) {
        return;
    }
    // detect option api vs setup api
    store._isOptionsAPI = !!options.state;
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    // Upgrade the HMR to also update the new actions
    const originalHotUpdate = store._hotUpdate;
    reactivity_esm_bundler_toRaw(store)._hotUpdate = function (newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
    addStoreToDevtools(app, 
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store);
}

/**
 * Creates a Pinia instance to be used by the application
 */
function createPinia() {
    const scope = effectScope(true);
    // NOTE: here we could check the window object for a state and directly set it
    // if there is anything like it with Vue 3 SSR
    const state = scope.run(() => reactivity_esm_bundler_ref({}));
    let _p = [];
    // plugins added before calling app.use(pinia)
    let toBeInstalled = [];
    const pinia = markRaw({
        install(app) {
            // this allows calling useStore() outside of a component setup after
            // installing pinia's plugin
            setActivePinia(pinia);
            if (!lib_isVue2) {
                pinia._a = app;
                app.provide(piniaSymbol, pinia);
                app.config.globalProperties.$pinia = pinia;
                /* istanbul ignore else */
                if (USE_DEVTOOLS) {
                    registerPiniaDevtools(app, pinia);
                }
                toBeInstalled.forEach((plugin) => _p.push(plugin));
                toBeInstalled = [];
            }
        },
        use(plugin) {
            if (!this._a && !lib_isVue2) {
                toBeInstalled.push(plugin);
            }
            else {
                _p.push(plugin);
            }
            return this;
        },
        _p,
        // it's actually undefined here
        // @ts-expect-error
        _a: null,
        _e: scope,
        _s: new Map(),
        state,
    });
    // pinia devtools rely on dev only features so they cannot be forced unless
    // the dev build of Vue is used. Avoid old browsers like IE11.
    if (USE_DEVTOOLS && typeof Proxy !== 'undefined') {
        pinia.use(devtoolsPlugin);
    }
    return pinia;
}

/**
 * Checks if a function is a `StoreDefinition`.
 *
 * @param fn - object to test
 * @returns true if `fn` is a StoreDefinition
 */
const isUseStore = (fn) => {
    return typeof fn === 'function' && typeof fn.$id === 'string';
};
/**
 * Mutates in place `newState` with `oldState` to _hot update_ it. It will
 * remove any key not existing in `newState` and recursively merge plain
 * objects.
 *
 * @param newState - new state object to be patched
 * @param oldState - old state that should be used to patch newState
 * @returns - newState
 */
function patchObject(newState, oldState) {
    // no need to go through symbols because they cannot be serialized anyway
    for (const key in oldState) {
        const subPatch = oldState[key];
        // skip the whole sub tree
        if (!(key in newState)) {
            continue;
        }
        const targetValue = newState[key];
        if (pinia_isPlainObject(targetValue) &&
            pinia_isPlainObject(subPatch) &&
            !isRef(subPatch) &&
            !isReactive(subPatch)) {
            newState[key] = patchObject(targetValue, subPatch);
        }
        else {
            // objects are either a bit more complex (e.g. refs) or primitives, so we
            // just set the whole thing
            if (isVue2) {
                set(newState, key, subPatch);
            }
            else {
                newState[key] = subPatch;
            }
        }
    }
    return newState;
}
/**
 * Creates an _accept_ function to pass to `import.meta.hot` in Vite applications.
 *
 * @example
 * ```js
 * const useUser = defineStore(...)
 * if (import.meta.hot) {
 *   import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
 * }
 * ```
 *
 * @param initialUseStore - return of the defineStore to hot update
 * @param hot - `import.meta.hot`
 */
function acceptHMRUpdate(initialUseStore, hot) {
    // strip as much as possible from iife.prod
    if (true) {
        return () => { };
    }
    return (newModule) => {
        const pinia = hot.data.pinia || initialUseStore._pinia;
        if (!pinia) {
            // this store is still not used
            return;
        }
        // preserve the pinia instance across loads
        hot.data.pinia = pinia;
        // console.log('got data', newStore)
        for (const exportName in newModule) {
            const useStore = newModule[exportName];
            // console.log('checking for', exportName)
            if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
                // console.log('Accepting update for', useStore.$id)
                const id = useStore.$id;
                if (id !== initialUseStore.$id) {
                    console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
                    // return import.meta.hot.invalidate()
                    return hot.invalidate();
                }
                const existingStore = pinia._s.get(id);
                if (!existingStore) {
                    console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
                    return;
                }
                useStore(pinia, existingStore);
            }
        }
    };
}

const noop = () => { };
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
        const idx = subscriptions.indexOf(callback);
        if (idx > -1) {
            subscriptions.splice(idx, 1);
            onCleanup();
        }
    };
    if (!detached && getCurrentScope()) {
        onScopeDispose(removeSubscription);
    }
    return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
        callback(...args);
    });
}

const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
    // Handle Map instances
    if (target instanceof Map && patchToApply instanceof Map) {
        patchToApply.forEach((value, key) => target.set(key, value));
    }
    // Handle Set instances
    if (target instanceof Set && patchToApply instanceof Set) {
        patchToApply.forEach(target.add, target);
    }
    // no need to go through symbols because they cannot be serialized anyway
    for (const key in patchToApply) {
        if (!patchToApply.hasOwnProperty(key))
            continue;
        const subPatch = patchToApply[key];
        const targetValue = target[key];
        if (pinia_isPlainObject(targetValue) &&
            pinia_isPlainObject(subPatch) &&
            target.hasOwnProperty(key) &&
            !reactivity_esm_bundler_isRef(subPatch) &&
            !reactivity_esm_bundler_isReactive(subPatch)) {
            // NOTE: here I wanted to warn about inconsistent types but it's not possible because in setup stores one might
            // start the value of a property as a certain type e.g. a Map, and then for some reason, during SSR, change that
            // to `undefined`. When trying to hydrate, we want to override the Map with `undefined`.
            target[key] = mergeReactiveObjects(targetValue, subPatch);
        }
        else {
            // @ts-expect-error: subPatch is a valid value
            target[key] = subPatch;
        }
    }
    return target;
}
const skipHydrateSymbol = ( false)
    ? 0
    : /* istanbul ignore next */ Symbol();
const skipHydrateMap = /*#__PURE__*/ new WeakMap();
/**
 * Tells Pinia to skip the hydration process of a given object. This is useful in setup stores (only) when you return a
 * stateful object in the store but it isn't really state. e.g. returning a router instance in a setup store.
 *
 * @param obj - target object
 * @returns obj
 */
function skipHydrate(obj) {
    return isVue2
        ? // in @vue/composition-api, the refs are sealed so defineProperty doesn't work...
            /* istanbul ignore next */ skipHydrateMap.set(obj, 1) && obj
        : Object.defineProperty(obj, skipHydrateSymbol, {});
}
/**
 * Returns whether a value should be hydrated
 *
 * @param obj - target variable
 * @returns true if `obj` should be hydrated
 */
function shouldHydrate(obj) {
    return lib_isVue2
        ? /* istanbul ignore next */ !skipHydrateMap.has(obj)
        : !pinia_isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: pinia_assign } = Object;
function isComputed(o) {
    return !!(reactivity_esm_bundler_isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
        if (!initialState && ( true || 0)) {
            /* istanbul ignore if */
            if (lib_isVue2) {
                lib_set(pinia.state.value, id, state ? state() : {});
            }
            else {
                pinia.state.value[id] = state ? state() : {};
            }
        }
        // avoid creating a state in pinia.state.value
        const localState =  false
            ? // use ref() to unwrap refs inside state TODO: check if this is still necessary
                0
            : reactivity_esm_bundler_toRefs(pinia.state.value[id]);
        return pinia_assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
            if (false) {}
            computedGetters[name] = markRaw(runtime_core_esm_bundler_computed(() => {
                setActivePinia(pinia);
                // it was created just before
                const store = pinia._s.get(id);
                // allow cross using stores
                /* istanbul ignore next */
                if (lib_isVue2 && !store._r)
                    return;
                // @ts-expect-error
                // return getters![name].call(context, context)
                // TODO: avoid reading the getter while assigning with a global variable
                return getters[name].call(store, store);
            }));
            return computedGetters;
        }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = pinia_assign({ actions: {} }, options);
    /* istanbul ignore if */
    if (false) {}
    // watcher options for $subscribe
    const $subscribeOptions = {
        deep: true,
        // flush: 'post',
    };
    /* istanbul ignore else */
    if (false) {}
    // internal state
    let isListening; // set to true at the end
    let isSyncListening; // set to true at the end
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    // avoid setting the state for option stores if it is set
    // by the setup
    if (!isOptionsStore && !initialState && ( true || 0)) {
        /* istanbul ignore if */
        if (lib_isVue2) {
            lib_set(pinia.state.value, $id, {});
        }
        else {
            pinia.state.value[$id] = {};
        }
    }
    const hotState = reactivity_esm_bundler_ref({});
    // avoid triggering too many listeners
    // https://github.com/vuejs/pinia/issues/1129
    let activeListener;
    function $patch(partialStateOrMutator) {
        let subscriptionMutation;
        isListening = isSyncListening = false;
        // reset the debugger events since patches are sync
        /* istanbul ignore else */
        if ((false)) {}
        if (typeof partialStateOrMutator === 'function') {
            partialStateOrMutator(pinia.state.value[$id]);
            subscriptionMutation = {
                type: MutationType.patchFunction,
                storeId: $id,
                events: debuggerEvents,
            };
        }
        else {
            mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
            subscriptionMutation = {
                type: MutationType.patchObject,
                payload: partialStateOrMutator,
                storeId: $id,
                events: debuggerEvents,
            };
        }
        const myListenerId = (activeListener = Symbol());
        nextTick().then(() => {
            if (activeListener === myListenerId) {
                isListening = true;
            }
        });
        isSyncListening = true;
        // because we paused the watcher, we need to manually call the subscriptions
        triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore
        ? function $reset() {
            const { state } = options;
            const newState = state ? state() : {};
            // we use a patch to group all changes into one single subscription
            this.$patch(($state) => {
                pinia_assign($state, newState);
            });
        }
        : /* istanbul ignore next */
            ( false)
                ? 0
                : noop;
    function $dispose() {
        scope.stop();
        subscriptions = [];
        actionSubscriptions = [];
        pinia._s.delete($id);
    }
    /**
     * Wraps an action to handle subscriptions.
     *
     * @param name - name of the action
     * @param action - action to wrap
     * @returns a wrapped action to handle subscriptions
     */
    function wrapAction(name, action) {
        return function () {
            setActivePinia(pinia);
            const args = Array.from(arguments);
            const afterCallbackList = [];
            const onErrorCallbackList = [];
            function after(callback) {
                afterCallbackList.push(callback);
            }
            function onError(callback) {
                onErrorCallbackList.push(callback);
            }
            // @ts-expect-error
            triggerSubscriptions(actionSubscriptions, {
                args,
                name,
                store,
                after,
                onError,
            });
            let ret;
            try {
                ret = action.apply(this && this.$id === $id ? this : store, args);
                // handle sync errors
            }
            catch (error) {
                triggerSubscriptions(onErrorCallbackList, error);
                throw error;
            }
            if (ret instanceof Promise) {
                return ret
                    .then((value) => {
                    triggerSubscriptions(afterCallbackList, value);
                    return value;
                })
                    .catch((error) => {
                    triggerSubscriptions(onErrorCallbackList, error);
                    return Promise.reject(error);
                });
            }
            // trigger after callbacks
            triggerSubscriptions(afterCallbackList, ret);
            return ret;
        };
    }
    const _hmrPayload = /*#__PURE__*/ markRaw({
        actions: {},
        getters: {},
        state: [],
        hotState,
    });
    const partialStore = {
        _p: pinia,
        // _s: scope,
        $id,
        $onAction: addSubscription.bind(null, actionSubscriptions),
        $patch,
        $reset,
        $subscribe(callback, options = {}) {
            const removeSubscription = addSubscription(subscriptions, callback, options.detached, () => stopWatcher());
            const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
                if (options.flush === 'sync' ? isSyncListening : isListening) {
                    callback({
                        storeId: $id,
                        type: MutationType.direct,
                        events: debuggerEvents,
                    }, state);
                }
            }, pinia_assign({}, $subscribeOptions, options)));
            return removeSubscription;
        },
        $dispose,
    };
    /* istanbul ignore if */
    if (lib_isVue2) {
        // start as non ready
        partialStore._r = false;
    }
    const store = reactive(( false) || USE_DEVTOOLS
        ? pinia_assign({
            _hmrPayload,
            _customProperties: markRaw(new Set()), // devtools custom properties
        }, partialStore
        // must be added later
        // setupStore
        )
        : partialStore);
    // store the partial store now so the setup of stores can instantiate each other before they are finished without
    // creating infinite loops.
    pinia._s.set($id, store);
    const runWithContext = (pinia._a && pinia._a.runWithContext) || fallbackRunWithContext;
    // TODO: idea create skipSerialize that marks properties as non serializable and they are skipped
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(setup)));
    // overwrite existing actions to support $onAction
    for (const key in setupStore) {
        const prop = setupStore[key];
        if ((reactivity_esm_bundler_isRef(prop) && !isComputed(prop)) || reactivity_esm_bundler_isReactive(prop)) {
            // mark it as a piece of state to be serialized
            if (false) {}
            else if (!isOptionsStore) {
                // in setup stores we must hydrate the state and sync pinia state tree with the refs the user just created
                if (initialState && shouldHydrate(prop)) {
                    if (reactivity_esm_bundler_isRef(prop)) {
                        prop.value = initialState[key];
                    }
                    else {
                        // probably a reactive object, lets recursively assign
                        // @ts-expect-error: prop is unknown
                        mergeReactiveObjects(prop, initialState[key]);
                    }
                }
                // transfer the ref to the pinia state to keep everything in sync
                /* istanbul ignore if */
                if (lib_isVue2) {
                    lib_set(pinia.state.value[$id], key, prop);
                }
                else {
                    pinia.state.value[$id][key] = prop;
                }
            }
            /* istanbul ignore else */
            if ((false)) {}
            // action
        }
        else if (typeof prop === 'function') {
            // @ts-expect-error: we are overriding the function we avoid wrapping if
            const actionValue =  false ? 0 : wrapAction(key, prop);
            // this a hot module replacement store because the hotUpdate method needs
            // to do it with the right context
            /* istanbul ignore if */
            if (lib_isVue2) {
                lib_set(setupStore, key, actionValue);
            }
            else {
                // @ts-expect-error
                setupStore[key] = actionValue;
            }
            /* istanbul ignore else */
            if ((false)) {}
            // list actions so they can be used in plugins
            // @ts-expect-error
            optionsForPlugin.actions[key] = prop;
        }
        else if ((false)) {}
    }
    // add the state, getters, and action properties
    /* istanbul ignore if */
    if (lib_isVue2) {
        Object.keys(setupStore).forEach((key) => {
            lib_set(store, key, setupStore[key]);
        });
    }
    else {
        pinia_assign(store, setupStore);
        // allows retrieving reactive objects with `storeToRefs()`. Must be called after assigning to the reactive object.
        // Make `storeToRefs()` work with `reactive()` #799
        pinia_assign(reactivity_esm_bundler_toRaw(store), setupStore);
    }
    // use this instead of a computed with setter to be able to create it anywhere
    // without linking the computed lifespan to wherever the store is first
    // created.
    Object.defineProperty(store, '$state', {
        get: () => ( false ? 0 : pinia.state.value[$id]),
        set: (state) => {
            /* istanbul ignore if */
            if (false) {}
            $patch(($state) => {
                pinia_assign($state, state);
            });
        },
    });
    // add the hotUpdate before plugins to allow them to override it
    /* istanbul ignore else */
    if ((false)) {}
    if (USE_DEVTOOLS) {
        const nonEnumerable = {
            writable: true,
            configurable: true,
            // avoid warning on devtools trying to display this property
            enumerable: false,
        };
        ['_p', '_hmrPayload', '_getters', '_customProperties'].forEach((p) => {
            Object.defineProperty(store, p, pinia_assign({ value: store[p] }, nonEnumerable));
        });
    }
    /* istanbul ignore if */
    if (lib_isVue2) {
        // mark the store as ready before plugins
        store._r = true;
    }
    // apply all plugins
    pinia._p.forEach((extender) => {
        /* istanbul ignore else */
        if (USE_DEVTOOLS) {
            const extensions = scope.run(() => extender({
                store,
                app: pinia._a,
                pinia,
                options: optionsForPlugin,
            }));
            Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
            pinia_assign(store, extensions);
        }
        else {
            pinia_assign(store, scope.run(() => extender({
                store,
                app: pinia._a,
                pinia,
                options: optionsForPlugin,
            })));
        }
    });
    if (false) {}
    // only apply hydrate to option stores with an initial state in pinia
    if (initialState &&
        isOptionsStore &&
        options.hydrate) {
        options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
}
function defineStore(
// TODO: add proper types from above
idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === 'function';
    if (typeof idOrOptions === 'string') {
        id = idOrOptions;
        // the option store setup will contain the actual options in this case
        options = isSetupStore ? setupOptions : setup;
    }
    else {
        options = idOrOptions;
        id = idOrOptions.id;
        if (false) {}
    }
    function useStore(pinia, hot) {
        const hasContext = runtime_core_esm_bundler_hasInjectionContext();
        pinia =
            // in test mode, ignore the argument provided as we can always retrieve a
            // pinia instance with getActivePinia()
            ( false ? 0 : pinia) ||
                (hasContext ? runtime_core_esm_bundler_inject(piniaSymbol, null) : null);
        if (pinia)
            setActivePinia(pinia);
        if (false) {}
        pinia = activePinia;
        if (!pinia._s.has(id)) {
            // creating the store registers it in `pinia._s`
            if (isSetupStore) {
                createSetupStore(id, setup, options, pinia);
            }
            else {
                createOptionsStore(id, options, pinia);
            }
            /* istanbul ignore else */
            if ((false)) {}
        }
        const store = pinia._s.get(id);
        if (false) {}
        if (false) {}
        // StoreGeneric cannot be casted towards Store
        return store;
    }
    useStore.$id = id;
    return useStore;
}

let mapStoreSuffix = 'Store';
/**
 * Changes the suffix added by `mapStores()`. Can be set to an empty string.
 * Defaults to `"Store"`. Make sure to extend the MapStoresCustomization
 * interface if you are using TypeScript.
 *
 * @param suffix - new suffix
 */
function setMapStoreSuffix(suffix // could be 'Store' but that would be annoying for JS
) {
    mapStoreSuffix = suffix;
}
/**
 * Allows using stores without the composition API (`setup()`) by generating an
 * object to be spread in the `computed` field of a component. It accepts a list
 * of store definitions.
 *
 * @example
 * ```js
 * export default {
 *   computed: {
 *     // other computed properties
 *     ...mapStores(useUserStore, useCartStore)
 *   },
 *
 *   created() {
 *     this.userStore // store with id "user"
 *     this.cartStore // store with id "cart"
 *   }
 * }
 * ```
 *
 * @param stores - list of stores to map to an object
 */
function mapStores(...stores) {
    if (false) {}
    return stores.reduce((reduced, useStore) => {
        // @ts-expect-error: $id is added by defineStore
        reduced[useStore.$id + mapStoreSuffix] = function () {
            return useStore(this.$pinia);
        };
        return reduced;
    }, {});
}
/**
 * Allows using state and getters from one store without using the composition
 * API (`setup()`) by generating an object to be spread in the `computed` field
 * of a component.
 *
 * @param useStore - store to map from
 * @param keysOrMapper - array or object
 */
function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper)
        ? keysOrMapper.reduce((reduced, key) => {
            reduced[key] = function () {
                return useStore(this.$pinia)[key];
            };
            return reduced;
        }, {})
        : Object.keys(keysOrMapper).reduce((reduced, key) => {
            // @ts-expect-error
            reduced[key] = function () {
                const store = useStore(this.$pinia);
                const storeKey = keysOrMapper[key];
                // for some reason TS is unable to infer the type of storeKey to be a
                // function
                return typeof storeKey === 'function'
                    ? storeKey.call(this, store)
                    : store[storeKey];
            };
            return reduced;
        }, {});
}
/**
 * Alias for `mapState()`. You should use `mapState()` instead.
 * @deprecated use `mapState()` instead.
 */
const mapGetters = (/* unused pure expression or super */ null && (mapState));
/**
 * Allows directly using actions from your store without using the composition
 * API (`setup()`) by generating an object to be spread in the `methods` field
 * of a component.
 *
 * @param useStore - store to map from
 * @param keysOrMapper - array or object
 */
function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper)
        ? keysOrMapper.reduce((reduced, key) => {
            // @ts-expect-error
            reduced[key] = function (...args) {
                return useStore(this.$pinia)[key](...args);
            };
            return reduced;
        }, {})
        : Object.keys(keysOrMapper).reduce((reduced, key) => {
            // @ts-expect-error
            reduced[key] = function (...args) {
                return useStore(this.$pinia)[keysOrMapper[key]](...args);
            };
            return reduced;
        }, {});
}
/**
 * Allows using state and getters from one store without using the composition
 * API (`setup()`) by generating an object to be spread in the `computed` field
 * of a component.
 *
 * @param useStore - store to map from
 * @param keysOrMapper - array or object
 */
function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper)
        ? keysOrMapper.reduce((reduced, key) => {
            // @ts-ignore
            reduced[key] = {
                get() {
                    return useStore(this.$pinia)[key];
                },
                set(value) {
                    // it's easier to type it here as any
                    return (useStore(this.$pinia)[key] = value);
                },
            };
            return reduced;
        }, {})
        : Object.keys(keysOrMapper).reduce((reduced, key) => {
            // @ts-ignore
            reduced[key] = {
                get() {
                    return useStore(this.$pinia)[keysOrMapper[key]];
                },
                set(value) {
                    // it's easier to type it here as any
                    return (useStore(this.$pinia)[keysOrMapper[key]] = value);
                },
            };
            return reduced;
        }, {});
}

/**
 * Creates an object of references with all the state, getters, and plugin-added
 * state properties of the store. Similar to `toRefs()` but specifically
 * designed for Pinia stores so methods and non reactive properties are
 * completely ignored.
 *
 * @param store - store to extract the refs from
 */
function storeToRefs(store) {
    // See https://github.com/vuejs/pinia/issues/852
    // It's easier to just use toRefs() even if it includes more stuff
    if (isVue2) {
        // @ts-expect-error: toRefs include methods and others
        return toRefs(store);
    }
    else {
        store = toRaw(store);
        const refs = {};
        for (const key in store) {
            const value = store[key];
            if (isRef(value) || isReactive(value)) {
                // @ts-expect-error: the key is state or getter
                refs[key] =
                    // ---
                    toRef(store, key);
            }
        }
        return refs;
    }
}

/**
 * Vue 2 Plugin that must be installed for pinia to work. Note **you don't need
 * this plugin if you are using Nuxt.js**. Use the `buildModule` instead:
 * https://pinia.vuejs.org/ssr/nuxt.html.
 *
 * @example
 * ```js
 * import Vue from 'vue'
 * import { PiniaVuePlugin, createPinia } from 'pinia'
 *
 * Vue.use(PiniaVuePlugin)
 * const pinia = createPinia()
 *
 * new Vue({
 *   el: '#app',
 *   // ...
 *   pinia,
 * })
 * ```
 *
 * @param _Vue - `Vue` imported from 'vue'.
 */
const PiniaVuePlugin = function (_Vue) {
    // Equivalent of
    // app.config.globalProperties.$pinia = pinia
    _Vue.mixin({
        beforeCreate() {
            const options = this.$options;
            if (options.pinia) {
                const pinia = options.pinia;
                // HACK: taken from provide(): https://github.com/vuejs/composition-api/blob/main/src/apis/inject.ts#L31
                /* istanbul ignore else */
                if (!this._provided) {
                    const provideCache = {};
                    Object.defineProperty(this, '_provided', {
                        get: () => provideCache,
                        set: (v) => Object.assign(provideCache, v),
                    });
                }
                this._provided[piniaSymbol] = pinia;
                // propagate the pinia instance in an SSR friendly way
                // avoid adding it to nuxt twice
                /* istanbul ignore else */
                if (!this.$pinia) {
                    this.$pinia = pinia;
                }
                pinia._a = this;
                if (IS_CLIENT) {
                    // this allows calling useStore() outside of a component setup after
                    // installing pinia's plugin
                    setActivePinia(pinia);
                }
                if (USE_DEVTOOLS) {
                    registerPiniaDevtools(pinia._a, pinia);
                }
            }
            else if (!this.$pinia && options.parent && options.parent.$pinia) {
                this.$pinia = options.parent.$pinia;
            }
        },
        destroyed() {
            delete this._pStores;
        },
    });
};



;// CONCATENATED MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/




const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};

const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = Symbol("_vtc");
const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /* @__PURE__ */ shared_esm_bundler_extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const runtime_dom_esm_bundler_callHook = (hook, args = []) => {
  if (shared_esm_bundler_isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? shared_esm_bundler_isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(el, isAppear, done);
      runtime_dom_esm_bundler_callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
      });
    };
  };
  return shared_esm_bundler_extend(baseProps, {
    onBeforeEnter(el) {
      runtime_dom_esm_bundler_callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      runtime_dom_esm_bundler_callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
      });
      runtime_dom_esm_bundler_callHook(onLeave, [el, resolve]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      runtime_dom_esm_bundler_callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      runtime_dom_esm_bundler_callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      runtime_dom_esm_bundler_callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (shared_esm_bundler_isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  if (false) {}
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto")
    return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}

function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}

const vShowOriginalDisplay = Symbol("_vod");
const vShowHidden = Symbol("_vsh");
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
if (false) {}
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
function initVShowForSSR() {
  vShow.getSSRProps = ({ value }) => {
    if (!value) {
      return { style: { display: "none" } };
    }
  };
}

const CSS_VAR_TEXT = Symbol( false ? 0 : "");
function useCssVars(getter) {
  const instance = getCurrentInstance();
  if (!instance) {
     false && 0;
    return;
  }
  const updateTeleports = instance.ut = (vars = getter(instance.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)
    ).forEach((node) => setVarsOnNode(node, vars));
  };
  if (false) {}
  const setVars = () => {
    const vars = getter(instance.proxy);
    setVarsOnVNode(instance.subTree, vars);
    updateTeleports(vars);
  };
  watchPostEffect(setVars);
  onMounted(() => {
    const ob = new MutationObserver(setVars);
    ob.observe(instance.subTree.el.parentNode, { childList: true });
    onUnmounted(() => ob.disconnect());
  });
}
function setVarsOnVNode(vnode, vars) {
  if (vnode.shapeFlag & 128) {
    const suspense = vnode.suspense;
    vnode = suspense.activeBranch;
    if (suspense.pendingBranch && !suspense.isHydrating) {
      suspense.effects.push(() => {
        setVarsOnVNode(suspense.activeBranch, vars);
      });
    }
  }
  while (vnode.component) {
    vnode = vnode.component.subTree;
  }
  if (vnode.shapeFlag & 1 && vnode.el) {
    setVarsOnNode(vnode.el, vars);
  } else if (vnode.type === Fragment) {
    vnode.children.forEach((c) => setVarsOnVNode(c, vars));
  } else if (vnode.type === Static) {
    let { el, anchor } = vnode;
    while (el) {
      setVarsOnNode(el, vars);
      if (el === anchor)
        break;
      el = el.nextSibling;
    }
  }
}
function setVarsOnNode(el, vars) {
  if (el.nodeType === 1) {
    const style = el.style;
    let cssText = "";
    for (const key in vars) {
      style.setProperty(`--${key}`, vars[key]);
      cssText += `--${key}: ${vars[key]};`;
    }
    style[CSS_VAR_TEXT] = cssText;
  }
}

const displayRE = /(^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = shared_esm_bundler_isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!shared_esm_bundler_isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (shared_esm_bundler_isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (false) {}
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          shared_esm_bundler_hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = shared_esm_bundler_camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = shared_esm_bundler_capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}

const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !shared_esm_bundler_includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}

function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = shared_esm_bundler_includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (false) {}
  }
  needRemove && el.removeAttribute(key);
}

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : shared_esm_bundler_hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (shared_esm_bundler_isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}

const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (shared_esm_bundler_isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && shared_esm_bundler_isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && shared_esm_bundler_isString(value)) {
    return false;
  }
  return key in el;
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineCustomElement(options, hydrate2) {
  const Comp = defineComponent(options);
  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, hydrate2);
    }
  }
  VueCustomElement.def = Comp;
  return VueCustomElement;
}
/*! #__NO_SIDE_EFFECTS__ */
const defineSSRCustomElement = /* @__NO_SIDE_EFFECTS__ */ (options) => {
  return /* @__PURE__ */ defineCustomElement(options, hydrate);
};
const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
class VueElement extends BaseClass {
  constructor(_def, _props = {}, hydrate2) {
    super();
    this._def = _def;
    this._props = _props;
    /**
     * @internal
     */
    this._instance = null;
    this._connected = false;
    this._resolved = false;
    this._numberProps = null;
    this._ob = null;
    if (this.shadowRoot && hydrate2) {
      hydrate2(this._createVNode(), this.shadowRoot);
    } else {
      if (false) {}
      this.attachShadow({ mode: "open" });
      if (!this._def.__asyncLoader) {
        this._resolveProps(this._def);
      }
    }
  }
  connectedCallback() {
    this._connected = true;
    if (!this._instance) {
      if (this._resolved) {
        this._update();
      } else {
        this._resolveDef();
      }
    }
  }
  disconnectedCallback() {
    this._connected = false;
    if (this._ob) {
      this._ob.disconnect();
      this._ob = null;
    }
    nextTick(() => {
      if (!this._connected) {
        render(null, this.shadowRoot);
        this._instance = null;
      }
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = true;
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    }
    this._ob = new MutationObserver((mutations) => {
      for (const m of mutations) {
        this._setAttr(m.attributeName);
      }
    });
    this._ob.observe(this, { attributes: true });
    const resolve = (def, isAsync = false) => {
      const { props, styles } = def;
      let numberProps;
      if (props && !shared_esm_bundler_isArray(props)) {
        for (const key in props) {
          const opt = props[key];
          if (opt === Number || opt && opt.type === Number) {
            if (key in this._props) {
              this._props[key] = toNumber(this._props[key]);
            }
            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[shared_esm_bundler_camelize(key)] = true;
          }
        }
      }
      this._numberProps = numberProps;
      if (isAsync) {
        this._resolveProps(def);
      }
      this._applyStyles(styles);
      this._update();
    };
    const asyncDef = this._def.__asyncLoader;
    if (asyncDef) {
      asyncDef().then((def) => resolve(def, true));
    } else {
      resolve(this._def);
    }
  }
  _resolveProps(def) {
    const { props } = def;
    const declaredPropKeys = shared_esm_bundler_isArray(props) ? props : Object.keys(props || {});
    for (const key of Object.keys(this)) {
      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key], true, false);
      }
    }
    for (const key of declaredPropKeys.map(shared_esm_bundler_camelize)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key);
        },
        set(val) {
          this._setProp(key, val);
        }
      });
    }
  }
  _setAttr(key) {
    let value = this.getAttribute(key);
    const camelKey = shared_esm_bundler_camelize(key);
    if (this._numberProps && this._numberProps[camelKey]) {
      value = toNumber(value);
    }
    this._setProp(camelKey, value, false);
  }
  /**
   * @internal
   */
  _getProp(key) {
    return this._props[key];
  }
  /**
   * @internal
   */
  _setProp(key, val, shouldReflect = true, shouldUpdate = true) {
    if (val !== this._props[key]) {
      this._props[key] = val;
      if (shouldUpdate && this._instance) {
        this._update();
      }
      if (shouldReflect) {
        if (val === true) {
          this.setAttribute(shared_esm_bundler_hyphenate(key), "");
        } else if (typeof val === "string" || typeof val === "number") {
          this.setAttribute(shared_esm_bundler_hyphenate(key), val + "");
        } else if (!val) {
          this.removeAttribute(shared_esm_bundler_hyphenate(key));
        }
      }
    }
  }
  _update() {
    render(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const vnode = createVNode(this._def, shared_esm_bundler_extend({}, this._props));
    if (!this._instance) {
      vnode.ce = (instance) => {
        this._instance = instance;
        instance.isCE = true;
        if (false) {}
        const dispatch = (event, args) => {
          this.dispatchEvent(
            new CustomEvent(event, {
              detail: args
            })
          );
        };
        instance.emit = (event, ...args) => {
          dispatch(event, args);
          if (shared_esm_bundler_hyphenate(event) !== event) {
            dispatch(shared_esm_bundler_hyphenate(event), args);
          }
        };
        let parent = this;
        while (parent = parent && (parent.parentNode || parent.host)) {
          if (parent instanceof VueElement) {
            instance.parent = parent._instance;
            instance.provides = parent._instance.provides;
            break;
          }
        }
      };
    }
    return vnode;
  }
  _applyStyles(styles) {
    if (styles) {
      styles.forEach((css) => {
        const s = document.createElement("style");
        s.textContent = css;
        this.shadowRoot.appendChild(s);
        if (false) {}
      });
    }
  }
}

function useCssModule(name = "$style") {
  {
    const instance = getCurrentInstance();
    if (!instance) {
       false && 0;
      return EMPTY_OBJ;
    }
    const modules = instance.type.__cssModules;
    if (!modules) {
       false && 0;
      return EMPTY_OBJ;
    }
    const mod = modules[name];
    if (!mod) {
       false && 0;
      return EMPTY_OBJ;
    }
    return mod;
  }
}

const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const moveCbKey = Symbol("_moveCb");
const runtime_dom_esm_bundler_enterCbKey = Symbol("_enterCb");
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ shared_esm_bundler_extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = runtime_core_esm_bundler_getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(
        prevChildren[0].el,
        instance.vnode.el,
        moveClass
      )) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el[moveCbKey] = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el[moveCbKey] = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = reactivity_esm_bundler_toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || runtime_core_esm_bundler_Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
        } else if (false) {}
      }
      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
const removeMode = (props) => delete props.mode;
/* @__PURE__ */ removeMode(TransitionGroupImpl.props);
const TransitionGroup = (/* unused pure expression or super */ null && (TransitionGroupImpl));
function callPendingCbs(c) {
  const el = c.el;
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[runtime_dom_esm_bundler_enterCbKey]) {
    el[runtime_dom_esm_bundler_enterCbKey]();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}

const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return shared_esm_bundler_isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = Symbol("_assign");
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue);
      }
      el[assignKey](domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing)
      return;
    const elValue = number || el.type === "number" ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== "range") {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,
  created(el, _, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign = el[assignKey];
      if (shared_esm_bundler_isArray(modelValue)) {
        const index = shared_esm_bundler_looseIndexOf(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign(filtered);
        }
      } else if (shared_esm_bundler_isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign(cloned);
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  if (shared_esm_bundler_isArray(value)) {
    el.checked = shared_esm_bundler_looseIndexOf(value, vnode.props.value) > -1;
  } else if (shared_esm_bundler_isSet(value)) {
    el.checked = value.has(vnode.props.value);
  } else if (value !== oldValue) {
    el.checked = shared_esm_bundler_looseEqual(value, getCheckboxValue(el, true));
  }
}
const vModelRadio = {
  created(el, { value }, vnode) {
    el.checked = shared_esm_bundler_looseEqual(value, vnode.props.value);
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      el[assignKey](getValue(el));
    });
  },
  beforeUpdate(el, { value, oldValue }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (value !== oldValue) {
      el.checked = shared_esm_bundler_looseEqual(value, vnode.props.value);
    }
  }
};
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    const isSetModel = shared_esm_bundler_isSet(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
        (o) => number ? looseToNumber(getValue(o)) : getValue(o)
      );
      el[assignKey](
        el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
      );
      el._assigning = true;
      nextTick(() => {
        el._assigning = false;
      });
    });
    el[assignKey] = getModelAssigner(vnode);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, { value, modifiers: { number } }) {
    setSelected(el, value, number);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value, modifiers: { number } }) {
    if (!el._assigning) {
      setSelected(el, value, number);
    }
  }
};
function setSelected(el, value, number) {
  const isMultiple = el.multiple;
  const isArrayValue = shared_esm_bundler_isArray(value);
  if (isMultiple && !isArrayValue && !shared_esm_bundler_isSet(value)) {
     false && 0;
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArrayValue) {
        const optionType = typeof optionValue;
        if (optionType === "string" || optionType === "number") {
          option.selected = value.includes(
            number ? looseToNumber(optionValue) : optionValue
          );
        } else {
          option.selected = shared_esm_bundler_looseIndexOf(value, optionValue) > -1;
        }
      } else {
        option.selected = value.has(optionValue);
      }
    } else if (shared_esm_bundler_looseEqual(getValue(option), value)) {
      if (el.selectedIndex !== i)
        el.selectedIndex = i;
      return;
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
const vModelDynamic = {
  created(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "created");
  },
  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "mounted");
  },
  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
  },
  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "updated");
  }
};
function resolveDynamicModel(tagName, type) {
  switch (tagName) {
    case "SELECT":
      return vModelSelect;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (type) {
        case "checkbox":
          return vModelCheckbox;
        case "radio":
          return vModelRadio;
        default:
          return vModelText;
      }
  }
}
function callModelHook(el, binding, vnode, prevVNode, hook) {
  const modelToUse = resolveDynamicModel(
    el.tagName,
    vnode.props && vnode.props.type
  );
  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}
function initVModelForSSR() {
  vModelText.getSSRProps = ({ value }) => ({ value });
  vModelRadio.getSSRProps = ({ value }, vnode) => {
    if (vnode.props && looseEqual(vnode.props.value, value)) {
      return { checked: true };
    }
  };
  vModelCheckbox.getSSRProps = ({ value }, vnode) => {
    if (isArray(value)) {
      if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) {
        return { checked: true };
      }
    } else if (isSet(value)) {
      if (vnode.props && value.has(vnode.props.value)) {
        return { checked: true };
      }
    } else if (value) {
      return { checked: true };
    }
  };
  vModelDynamic.getSSRProps = (binding, vnode) => {
    if (typeof vnode.type !== "string") {
      return;
    }
    const modelToUse = resolveDynamicModel(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      vnode.type.toUpperCase(),
      vnode.props && vnode.props.type
    );
    if (modelToUse.getSSRProps) {
      return modelToUse.getSSRProps(binding, vnode);
    }
  };
}

const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  });
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = shared_esm_bundler_hyphenate(event.key);
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  });
};

const rendererOptions = /* @__PURE__ */ shared_esm_bundler_extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const render = (...args) => {
  ensureRenderer().render(...args);
};
const hydrate = (...args) => {
  ensureHydrationRenderer().hydrate(...args);
};
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  if (false) {}
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!shared_esm_bundler_isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  if (false) {}
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, resolveRootNamespace(container));
    }
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  if (isRuntimeOnly()) {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn(
          `The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`
        );
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn(msg);
        return compilerOptions;
      },
      set() {
        warn(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (shared_esm_bundler_isString(container)) {
    const res = document.querySelector(container);
    if (false) {}
    return res;
  }
  if (false) {}
  return container;
}
let ssrDirectiveInitialized = false;
const initDirectivesForSSR = () => {
  if (!ssrDirectiveInitialized) {
    ssrDirectiveInitialized = true;
    initVModelForSSR();
    initVShowForSSR();
  }
} ;



;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/DropdownAccountSwitcher.vue?vue&type=template&id=4ce25adb&scoped=true

var _withScopeId = function _withScopeId(n) {
  return _pushScopeId("data-v-4ce25adb"), n = n(), _popScopeId(), n;
};
var _hoisted_1 = {
  "class": "dropdown-account-switcher-header-label"
};
var _hoisted_2 = {
  key: 0,
  "class": "dropdown-account-switcher-header-label-global"
};
var _hoisted_3 = {
  key: 1,
  "class": "dropdown-account-switcher-header-label-divider"
};
function DropdownAccountSwitchervue_type_template_id_4ce25adb_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_KatLink = resolveComponent("KatLink");
  var _component_DropdownAccountSwitcherList = resolveComponent("DropdownAccountSwitcherList");
  var _component_KatProgressCircular = resolveComponent("KatProgressCircular");
  return openBlock(), createElementBlock("div", {
    "class": "dropdown-account-switcher account-switcher-root",
    ref: "root",
    onFocusout: _cache[2] || (_cache[2] = function () {
      return $options.onLeaveRoot && $options.onLeaveRoot.apply($options, arguments);
    }),
    onMouseout: _cache[3] || (_cache[3] = function () {
      return $options.onLeaveRoot && $options.onLeaveRoot.apply($options, arguments);
    })
  }, [$options.loadingState === $options.LoadingStates.error ? (openBlock(), createBlock(_component_KatLink, {
    key: 0,
    href: $options.fullPageAccountSwitcherLink,
    onClick: $options.onClickFallbackLink
  }, {
    "default": withCtx(function () {
      return [createTextVNode(toDisplayString(_ctx.$t('dropdownAccountSwitcher_link_switchAccount')), 1 /* TEXT */)];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["href", "onClick"])) : $options.loadingState === $options.LoadingStates.loaded ? (openBlock(), createElementBlock(runtime_core_esm_bundler_Fragment, {
    key: 1
  }, [createBaseVNode("div", {
    "class": shared_esm_bundler_normalizeClass({
      'dropdown-account-switcher-header': true,
      'dropdown-account-switcher-header-expanded': $data.isExpanded
    }),
    tabindex: "0",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onClickHeader && $options.onClickHeader.apply($options, arguments);
    }),
    onKeyup: _cache[1] || (_cache[1] = withKeys(function () {
      return $options.onClickHeader && $options.onClickHeader.apply($options, arguments);
    }, ["enter"]))
  }, [createBaseVNode("div", _hoisted_1, [_ctx.globalAccount ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(_ctx.globalAccount.label), 1 /* TEXT */)) : createCommentVNode("v-if", true), _ctx.globalAccount && $options.regionalAccount ? (openBlock(), createElementBlock("span", _hoisted_3)) : createCommentVNode("v-if", true), $options.regionalAccount ? (openBlock(), createElementBlock("span", {
    key: 2,
    "class": shared_esm_bundler_normalizeClass({
      'dropdown-account-switcher-header-label-regional': true,
      'dropdown-account-switcher-header-label-regional-child': !!_ctx.globalAccount
    })
  }, toDisplayString($options.regionalAccount.label), 3 /* TEXT, CLASS */)) : createCommentVNode("v-if", true)])], 34 /* CLASS, NEED_HYDRATION */), $data.isExpanded ? (openBlock(), createBlock(_component_DropdownAccountSwitcherList, {
    key: 0,
    "delegation-context": $options.delegationContext,
    mode: $props.mode,
    nature: $props.nature,
    "parent-global-account": _ctx.parentGlobalAccount
  }, null, 8 /* PROPS */, ["delegation-context", "mode", "nature", "parent-global-account"])) : createCommentVNode("v-if", true)], 64 /* STABLE_FRAGMENT */)) : (openBlock(), createBlock(_component_KatProgressCircular, {
    key: 2,
    size: "small"
  }))], 544 /* NEED_HYDRATION, NEED_PATCH */);
}
;// CONCATENATED MODULE: ./src/js/components/DropdownAccountSwitcher.vue?vue&type=template&id=4ce25adb&scoped=true

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
;// CONCATENATED MODULE: ./src/js/constants/AccountSwitcherModes.ts
/**
 * The different modes of the account switcher affect which types of accounts are loaded: either global accounts (PAs)
 * or regional accounts (EEs). The mode is relevant to both the dropdown and full page account switchers.
 */
var AccountSwitcherModes = /*#__PURE__*/function (AccountSwitcherModes) {
  AccountSwitcherModes["Default"] = "default";
  AccountSwitcherModes["GlobalOnly"] = "globalOnly";
  AccountSwitcherModes["RegionalOnly"] = "regionalOnly";
  return AccountSwitcherModes;
}(AccountSwitcherModes || {}); // This mode only supports regional accounts
/* harmony default export */ const constants_AccountSwitcherModes = (AccountSwitcherModes);
;// CONCATENATED MODULE: ./src/js/constants/LoadingStates.js
var LoadingStates = Object.freeze({
  notLoaded: 'NOT_LOADED',
  loading: 'LOADING',
  loadingMore: 'LOADING_MORE',
  loaded: 'LOADED',
  error: 'ERROR'
});
/* harmony default export */ const constants_LoadingStates = (LoadingStates);
function reduce() {
  for (var _len = arguments.length, loadingStates = new Array(_len), _key = 0; _key < _len; _key++) {
    loadingStates[_key] = arguments[_key];
  }
  if (loadingStates.includes(LoadingStates.error)) {
    return LoadingStates.error;
  } else if (loadingStates.includes(LoadingStates.notLoaded)) {
    return LoadingStates.notLoaded;
  } else if (loadingStates.includes(LoadingStates.loading)) {
    return LoadingStates.loading;
  } else if (loadingStates.includes(LoadingStates.loadingMore)) {
    return LoadingStates.loadingMore;
  }
  return LoadingStates.loaded;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js

function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
;// CONCATENATED MODULE: ./src/js/constants/AccountTypes.js
var AccountTypes = Object.freeze({
  global: 'GLOBAL',
  regional: 'REGIONAL'
});
/* harmony default export */ const constants_AccountTypes = (AccountTypes);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/@amzn/katal-metrics/lib/metricObject/KatalMetricHttpRequest.js
var KatalMetricHttpRequest = __webpack_require__(3681);
// EXTERNAL MODULE: ./node_modules/@amzn/katal-metrics/lib/index.js
var lib = __webpack_require__(6339);
// EXTERNAL MODULE: ./node_modules/@amzn/katal-metrics-driver-sushi/dist/index.js
var dist = __webpack_require__(9532);
// EXTERNAL MODULE: ./node_modules/@amzn/katal-metrics/lib/driver/KatalMetricsDriverConsoleLogJson.js
var KatalMetricsDriverConsoleLogJson = __webpack_require__(5039);
// EXTERNAL MODULE: ./node_modules/@amzn/katal-metrics/lib/KatalMetricsContext.js
var KatalMetricsContext = __webpack_require__(3382);
// EXTERNAL MODULE: ./node_modules/@amzn/katal-metrics/lib/KatalMetricsPublisher.js
var KatalMetricsPublisher = __webpack_require__(8461);
;// CONCATENATED MODULE: ./src/js/util/katalMetricsPublisher.js





var SERVICE_NAME = 'GlobalAccountPickerService';
function createConsoleLogMetricsPublisher() {
  return new lib/* Publisher */.vC(new KatalMetricsDriverConsoleLogJson/* default */.A({
    log: console.table // Using console.table to preserve data across page navigations
  }), console.error, new lib/* Context */.ob.Builder().withSite(getSiteName()).withServiceName(SERVICE_NAME).build());
}
function getSiteName() {
  var metaEl = document.querySelector('meta[name="a2z:mons_site_name"]');
  if (metaEl instanceof HTMLMetaElement && metaEl.content) {
    return metaEl.content.charAt(0).toUpperCase() + metaEl.content.slice(1);
  }
  console.error('Missing site information from a2z:mons_site_name; falling back to UnknownSite');
  return 'UnknownSite';
}
function getMetricDomain(stage) {
  switch (stage) {
    case 'alpha':
    case 'beta':
    case 'gamma':
      return 'test';
    case 'prod':
      return 'prod';
    default:
      throw new Error("Unknown stage \"".concat(stage, "\""));
  }
}
function getMetricRealm(realm) {
  switch (realm) {
    case 'USAmazon':
    case 'EUAmazon':
    case 'FEAmazon':
      return realm;
    default:
      throw new Error("Unknown realm \"".concat(realm, "\""));
  }
}
function createDefaultMetricsPublisher(stage, realm) {
  try {
    var errorHandler = console.error;
    return new KatalMetricsPublisher["default"](new dist/* default */.A.Builder().withDomainRealm(getMetricDomain(stage), getMetricRealm(realm)).withErrorHandler(errorHandler).build(), errorHandler, new KatalMetricsContext["default"].Builder().withSite(getSiteName()).withServiceName(SERVICE_NAME).withRequestId(window.ue_id).build());
  } catch (error) {
    console.error('Could not initialize default metrics publisher. Falling back to console log.', error);
    return createConsoleLogMetricsPublisher();
  }
}
var metricsPublisher; // We want a single metric publisher to be shared across all Vue apps

function initializeMetricsPublisher(stage, realm) {
  if (metricsPublisher) {
    return;
  }
  var metaEl = document.querySelector('meta[name="a2z:log_to_console"]');
  var logToConsole = metaEl instanceof HTMLMetaElement && metaEl.content === 'true';
  metricsPublisher = logToConsole ? createConsoleLogMetricsPublisher() : createDefaultMetricsPublisher(stage, realm);
}
function getMetricsPublisher() {
  if (!metricsPublisher) {
    throw new Error('Please call initializeMetricsPublisher before getMetricsPublisher.');
  }
  return metricsPublisher;
}
function resetMetricsPublisherOnlyForTesting() {
  metricsPublisher = undefined;
}
;// CONCATENATED MODULE: ./src/js/util/fetchWithMetrics.js






/**
 * Creates a metric name that corresponds to an AJAX call.
 *
 * @param path A relative path for the AJAX call, e.g. "/trim/json/nav"
 * @return {string} e.g. "trim.json.nav"
 */
function getPathMetricName(path) {
  return (path || '').replace(/^\//, '').replace(/\//g, '.');
}

/**
 * Fetches data from an AJAX endpoint and logs metrics data.
 *
 * @param path A relative path for the AJAX call
 * @param searchParams A map of URL search parameters
 * @param validatePayload A function that validates the payload in the AJAX response
 * @return {Promise<Object>}
 */
function fetchWithMetrics(_x, _x2, _x3) {
  return _fetchWithMetrics.apply(this, arguments);
}
function _fetchWithMetrics() {
  _fetchWithMetrics = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(path, searchParams, validatePayload) {
    var publisher, httpMetrics, response, payload, errorMessage;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          publisher = getMetricsPublisher().newChildActionPublisherForMethod('AjaxRequests');
          httpMetrics = new KatalMetricHttpRequest["default"](getPathMetricName(path)).withMonitor(true);
          _context.prev = 2;
          _context.next = 5;
          return fetch(getURL(path, searchParams));
        case 5:
          response = _context.sent;
          _context.next = 8;
          return response.json();
        case 8:
          payload = _context.sent;
          if (response.ok) {
            _context.next = 12;
            break;
          }
          errorMessage = payload && payload.message || response.statusText;
          throw new Error(errorMessage);
        case 12:
          if (validatePayload(payload)) {
            _context.next = 14;
            break;
          }
          throw new Error("Payload failed validation: ".concat(JSON.stringify(payload)));
        case 14:
          httpMetrics.setSuccess();
          return _context.abrupt("return", payload);
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](2);
          httpMetrics.setFailure();
          console.error("Failed to fetch '".concat(path, "': "), _context.t0);
          throw _context.t0;
        case 23:
          _context.prev = 23;
          publisher.publish(httpMetrics);
          return _context.finish(23);
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 18, 23, 26]]);
  }));
  return _fetchWithMetrics.apply(this, arguments);
}
function getURL(path, searchParams) {
  if (!searchParams) {
    return path;
  }
  var fixedSearchParams = [];
  for (var _i = 0, _Object$entries = Object.entries(searchParams); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      k = _Object$entries$_i[0],
      v = _Object$entries$_i[1];
    if (!!v) {
      // Prevent "null" and "undefined" from showing up in the URL
      fixedSearchParams.push([k, v]);
    }
  }
  return "".concat(path, "?").concat(new URLSearchParams(fixedSearchParams));
}
;// CONCATENATED MODULE: ./src/js/stores/globalAccountStore.js







function validateGlobalAccountPayload(payload) {
  if (payload.globalAccount) {
    var _payload$globalAccoun = payload.globalAccount,
      id = _payload$globalAccoun.id,
      label = _payload$globalAccoun.label;
    if (!id || !label) {
      return false;
    }
  }
  if (payload.parentGlobalAccount) {
    var _id = payload.parentGlobalAccount.id;
    if (!_id) {
      return false;
    }
  }
  return true;
}
var useGlobalAccountStore = defineStore('globalAccount', {
  state: function state() {
    return {
      loadingState: constants_LoadingStates.notLoaded,
      globalAccount: null,
      parentGlobalAccount: null
    };
  },
  actions: {
    loadGlobalAccount: function loadGlobalAccount() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var payload;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.loadingState !== constants_LoadingStates.notLoaded)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              _this.loadingState = constants_LoadingStates.loading;
              _context.prev = 3;
              _context.next = 6;
              return fetchWithMetrics('/account-switcher/global-account', {}, validateGlobalAccountPayload);
            case 6:
              payload = _context.sent;
              _this.loadingState = constants_LoadingStates.loaded;
              _this.globalAccount = _objectSpread2(_objectSpread2({}, payload.globalAccount), {}, {
                type: constants_AccountTypes.global
              });
              _this.parentGlobalAccount = _objectSpread2(_objectSpread2({}, payload.parentGlobalAccount), {}, {
                type: constants_AccountTypes.global
              });
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              _this.loadingState = constants_LoadingStates.error;
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[3, 12]]);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./src/js/stores/regionalAccountStore.js








function getCacheKey(nature) {
  return nature || 'NO_NATURE';
}
function validateRegionalAccountPayload(payload) {
  if (!payload.regionalAccount) {
    return false;
  }
  var _payload$regionalAcco = payload.regionalAccount,
    ids = _payload$regionalAcco.ids,
    label = _payload$regionalAcco.label;
  return ids && label;
}
var useRegionalAccountStore = defineStore('regionalAccount', {
  state: function state() {
    return {
      loadingData: {}
    };
  },
  getters: {
    getRegionalAccount: function getRegionalAccount(state) {
      return function (nature) {
        var cacheKey = getCacheKey(nature);
        if (!state.loadingData[cacheKey]) {
          return null;
        }
        return state.loadingData[cacheKey].regionalAccount;
      };
    },
    getRegionalAccountLoadingState: function getRegionalAccountLoadingState(state) {
      return function (nature) {
        var cacheKey = getCacheKey(nature);
        if (!state.loadingData[cacheKey]) {
          return constants_LoadingStates.notLoaded;
        }
        return state.loadingData[cacheKey].loadingState;
      };
    }
  },
  actions: {
    loadRegionalAccount: function loadRegionalAccount(nature) {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var cacheKey, payload;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (nature) {
                _context.next = 2;
                break;
              }
              throw new Error('A Mons page nature is required for regional account APIs.');
            case 2:
              cacheKey = getCacheKey(nature);
              if (!(_this.loadingData[cacheKey] && _this.loadingData[cacheKey].loadingState !== constants_LoadingStates.notLoaded)) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return");
            case 5:
              _this.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loading,
                regionalAccount: null
              };
              _context.prev = 6;
              _context.next = 9;
              return fetchWithMetrics("/account-switcher/regional-account/".concat(nature), {}, validateRegionalAccountPayload);
            case 9:
              payload = _context.sent;
              _this.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loaded,
                regionalAccount: _objectSpread2(_objectSpread2({}, payload.regionalAccount), {}, {
                  type: constants_AccountTypes.regional
                })
              };
              _context.next = 16;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](6);
              _this.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.error,
                regionalAccount: null
              };
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[6, 13]]);
      }))();
    },
    loadGlobalAndRegionalAccount: function loadGlobalAndRegionalAccount(nature) {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var globalAccountStore, cacheKey, payload;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              globalAccountStore = useGlobalAccountStore();
              if (nature) {
                _context2.next = 3;
                break;
              }
              throw new Error('A Mons page nature is required for regional account APIs.');
            case 3:
              cacheKey = getCacheKey(nature);
              if (!(_this2.loadingData[cacheKey] && _this2.loadingData[cacheKey].loadingState !== constants_LoadingStates.notLoaded)) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return");
            case 6:
              _this2.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loading,
                regionalAccount: null
              };
              globalAccountStore.loadingState = constants_LoadingStates.loading;
              _context2.prev = 8;
              _context2.next = 11;
              return fetchWithMetrics("/account-switcher/global-and-regional-account/".concat(nature), {}, function (payload) {
                return validateRegionalAccountPayload(payload) && validateGlobalAccountPayload(payload);
              });
            case 11:
              payload = _context2.sent;
              _this2.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loaded,
                regionalAccount: _objectSpread2(_objectSpread2({}, payload.regionalAccount), {}, {
                  type: constants_AccountTypes.regional
                })
              };
              globalAccountStore.loadingState = constants_LoadingStates.loaded;
              globalAccountStore.globalAccount = _objectSpread2(_objectSpread2({}, payload.globalAccount), {}, {
                type: constants_AccountTypes.global
              });
              globalAccountStore.parentGlobalAccount = _objectSpread2(_objectSpread2({}, payload.parentGlobalAccount), {}, {
                type: constants_AccountTypes.global
              });
              _context2.next = 22;
              break;
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](8);
              _this2.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.error,
                regionalAccount: null
              };
              globalAccountStore.loadingState = constants_LoadingStates.error;
            case 22:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[8, 18]]);
      }))();
    },
    // TODO(https://app.asana.com/0/1207142706897991/1208249775915548/f) Remove allowing the trim to preload the regional account data
    setExternallyLoadedRegionalAccount: function setExternallyLoadedRegionalAccount(nature, loadingState, regionalAccount) {
      if (!nature) {
        throw new Error('A Mons page nature is required for regional account APIs.');
      }
      var cacheKey = getCacheKey(nature);
      if (loadingState === constants_LoadingStates.loaded) {
        this.loadingData[cacheKey] = {
          loadingState: constants_LoadingStates.loaded,
          regionalAccount: _objectSpread2(_objectSpread2({}, regionalAccount), {}, {
            type: constants_AccountTypes.regional
          })
        };
      } else {
        this.loadingData[cacheKey] = {
          loadingState: loadingState,
          regionalAccount: null
        };
      }
    }
  }
});
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/DropdownAccountSwitcherList.vue?vue&type=template&id=a9ae7d02&scoped=true

var DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_withScopeId = function _withScopeId(n) {
  return pushScopeId("data-v-a9ae7d02"), n = n(), popScopeId(), n;
};
var DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_hoisted_1 = {
  "class": "dropdown-account-switcher-list-pointer-area"
};
var DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_hoisted_2 = /*#__PURE__*/DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_withScopeId(function () {
  return /*#__PURE__*/createBaseVNode("div", {
    "class": "dropdown-account-switcher-list-arrow"
  }, null, -1 /* HOISTED */);
});
var DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_hoisted_3 = {
  "class": "dropdown-account-switcher-list"
};
var _hoisted_4 = {
  "class": "dropdown-account-switcher-list-content-wrapper"
};
var _hoisted_5 = ["title", "onClick", "onKeyup"];
var _hoisted_6 = ["title", "onClick", "onKeyup"];
var _hoisted_7 = {
  "class": "dropdown-account-switcher-list-item-label"
};
var _hoisted_8 = {
  key: 1,
  "class": "dropdown-account-switcher-list-error"
};
var _hoisted_9 = {
  key: 2,
  "class": "dropdown-account-switcher-list-loading"
};
var _hoisted_10 = ["title", "onClick", "onKeyup"];
var _hoisted_11 = {
  "class": "dropdown-account-switcher-list-item-label"
};
var _hoisted_12 = {
  key: 1,
  "class": "dropdown-account-switcher-list-error"
};
var _hoisted_13 = {
  key: 2,
  "class": "dropdown-account-switcher-list-loading"
};
var _hoisted_14 = ["href"];
function DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_KatIcon = resolveComponent("KatIcon");
  var _component_KatProgressCircular = resolveComponent("KatProgressCircular");
  return openBlock(), createElementBlock("div", DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_hoisted_1, [DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_hoisted_2, createBaseVNode("div", DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_hoisted_3, [createBaseVNode("div", _hoisted_4, [createBaseVNode("div", {
    "class": "dropdown-account-switcher-list-scrollable",
    ref: "scrollable",
    style: shared_esm_bundler_normalizeStyle($options.scrollableStyle)
  }, [$options.loadingState === $options.LoadingStates.loaded ? (openBlock(), createElementBlock(runtime_core_esm_bundler_Fragment, {
    key: 0
  }, [(openBlock(true), createElementBlock(runtime_core_esm_bundler_Fragment, null, renderList($options.globalAccounts, function (globalAccount) {
    return openBlock(), createElementBlock(runtime_core_esm_bundler_Fragment, {
      key: globalAccount.id
    }, [createBaseVNode("div", {
      "class": "dropdown-account-switcher-list-item",
      tabindex: "0",
      title: globalAccount.label,
      onClick: function onClick($event) {
        return $options.onClickGlobalAccount(globalAccount);
      },
      onKeyup: withKeys(function ($event) {
        return $options.onClickGlobalAccount(globalAccount);
      }, ["enter"])
    }, [$props.mode === $options.AccountSwitcherModes.Default ? (openBlock(), createBlock(_component_KatIcon, {
      key: 0,
      "class": shared_esm_bundler_normalizeClass({
        'dropdown-account-switcher-list-item-icon': true,
        'dropdown-account-switcher-list-item-icon-expanded': $options.isExpanded(globalAccount)
      }),
      name: "arrow_drop_down"
    }, null, 8 /* PROPS */, ["class"])) : createCommentVNode("v-if", true), createBaseVNode("div", {
      "class": shared_esm_bundler_normalizeClass({
        'dropdown-account-switcher-list-item-label': true,
        'dropdown-account-switcher-list-item-label-expanded': $options.isExpanded(globalAccount)
      })
    }, toDisplayString(globalAccount.label), 3 /* TEXT, CLASS */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_5), $options.isExpanded(globalAccount) ? (openBlock(), createElementBlock(runtime_core_esm_bundler_Fragment, {
      key: 0
    }, [_ctx.getRegionalAccountsLoadingState(globalAccount.id, globalAccount.delegationContext, $props.nature) === $options.LoadingStates.loaded ? (openBlock(true), createElementBlock(runtime_core_esm_bundler_Fragment, {
      key: 0
    }, renderList(_ctx.getRegionalAccounts(globalAccount.id, globalAccount.delegationContext, $props.nature), function (regionalAccount) {
      return openBlock(), createElementBlock("div", {
        "class": "dropdown-account-switcher-list-item dropdown-account-switcher-list-item-indented",
        key: "".concat(globalAccount.id, "-").concat(JSON.stringify(regionalAccount.ids)),
        tabindex: "0",
        title: regionalAccount.label,
        onClick: function onClick($event) {
          return $options.onClickRegionalAccount(regionalAccount, globalAccount);
        },
        onKeyup: withKeys(function ($event) {
          return $options.onClickRegionalAccount(regionalAccount, globalAccount);
        }, ["enter"])
      }, [createBaseVNode("div", _hoisted_7, toDisplayString(regionalAccount.label), 1 /* TEXT */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_6);
    }), 128 /* KEYED_FRAGMENT */)) : _ctx.getRegionalAccountsLoadingState(globalAccount.id, globalAccount.delegationContext, $props.nature) === $options.LoadingStates.error ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString(_ctx.$t('fullPageAccountSwitcher_errorMessage')), 1 /* TEXT */)) : (openBlock(), createElementBlock("div", _hoisted_9, [createVNode(_component_KatProgressCircular, {
      size: "small"
    })]))], 64 /* STABLE_FRAGMENT */)) : createCommentVNode("v-if", true)], 64 /* STABLE_FRAGMENT */);
  }), 128 /* KEYED_FRAGMENT */)), (openBlock(true), createElementBlock(runtime_core_esm_bundler_Fragment, null, renderList($options.regionalAccounts, function (regionalAccount) {
    return openBlock(), createElementBlock("div", {
      "class": "dropdown-account-switcher-list-item",
      key: JSON.stringify(regionalAccount.ids),
      title: regionalAccount.label,
      tabindex: "0",
      onClick: function onClick($event) {
        return $options.onClickRegionalAccount(regionalAccount, $props.parentGlobalAccount);
      },
      onKeyup: withKeys(function ($event) {
        return $options.onClickRegionalAccount(regionalAccount, $props.parentGlobalAccount);
      }, ["enter"])
    }, [createBaseVNode("div", _hoisted_11, toDisplayString(regionalAccount.label), 1 /* TEXT */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_10);
  }), 128 /* KEYED_FRAGMENT */))], 64 /* STABLE_FRAGMENT */)) : $options.loadingState === $options.LoadingStates.error ? (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString(_ctx.$t('fullPageAccountSwitcher_errorMessage')), 1 /* TEXT */)) : (openBlock(), createElementBlock("div", _hoisted_13, [createVNode(_component_KatProgressCircular, {
    size: "small"
  })]))], 4 /* STYLE */), createBaseVNode("a", {
    "class": "dropdown-account-switcher-list-item dropdown-account-switcher-list-see-all",
    href: $options.fullPageAccountSwitcherLink,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onClickSeeAllLink && $options.onClickSeeAllLink.apply($options, arguments);
    })
  }, toDisplayString(_ctx.$t('dropdownAccountSwitcher_link_seeAll')), 9 /* TEXT, PROPS */, _hoisted_14)])])]);
}
;// CONCATENATED MODULE: ./src/js/components/DropdownAccountSwitcherList.vue?vue&type=template&id=a9ae7d02&scoped=true

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
;// CONCATENATED MODULE: ./src/js/stores/globalAccountsStore.js










function processGlobalAccounts(globalAccounts) {
  return globalAccounts.map(function (globalAccount) {
    return _objectSpread2(_objectSpread2({}, globalAccount), {}, {
      type: constants_AccountTypes.global
    });
  }).sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });
}
function globalAccountsStore_getCacheKey(delegationContext) {
  return delegationContext || 'NO_DC';
}
function undoCacheKey(cacheKey) {
  return cacheKey === 'NO_DC' ? null : cacheKey;
}
var useGlobalAccountsStore = defineStore('globalAccounts', {
  state: function state() {
    return {
      loadingData: {}
    };
  },
  getters: {
    getLoadingState: function getLoadingState(state) {
      return function (delegationContext) {
        var cacheKey = globalAccountsStore_getCacheKey(delegationContext);
        if (!state.loadingData[cacheKey]) {
          return constants_LoadingStates.notLoaded;
        }
        return state.loadingData[cacheKey].loadingState;
      };
    },
    getGlobalAccounts: function getGlobalAccounts(state) {
      return function (delegationContext) {
        var cacheKey = globalAccountsStore_getCacheKey(delegationContext);
        if (!state.loadingData[cacheKey]) {
          return [];
        }
        return state.loadingData[cacheKey].globalAccounts;
      };
    },
    getPaginationToken: function getPaginationToken(state) {
      return function (delegationContext) {
        var cacheKey = globalAccountsStore_getCacheKey(delegationContext);
        if (!state.loadingData[cacheKey]) {
          return null;
        }
        return state.loadingData[cacheKey].paginationToken;
      };
    },
    canLoadMore: function canLoadMore(state) {
      return state._keysWithPaginationTokens.length > 0;
    },
    _keysWithPaginationTokens: function _keysWithPaginationTokens(state) {
      var cacheKeys = [];
      for (var _i = 0, _Object$entries = Object.entries(state.loadingData); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          cacheKey = _Object$entries$_i[0],
          loadingData = _Object$entries$_i[1];
        if (loadingData.loadingState === constants_LoadingStates.loaded && loadingData.paginationToken) {
          cacheKeys.push(cacheKey);
        }
      }
      return cacheKeys;
    },
    totalGlobalAccounts: function totalGlobalAccounts(state) {
      var totalLoaded = 0;
      for (var key in state.loadingData) {
        totalLoaded += state.loadingData[key].globalAccounts.length;
      }
      return totalLoaded;
    },
    totalGlobalAccountsLoadTime: function totalGlobalAccountsLoadTime(state) {
      var totalGloablAccountLoadTime = 0;
      for (var key in state.loadingData) {
        totalGloablAccountLoadTime += state.loadingData[key].pageLoadTime;
      }
      return totalGloablAccountLoadTime;
    }
  },
  actions: {
    /**
     * Loads the first page of global accounts accessible through the delegation context.
     *
     * @param delegationContext
     * @return {Promise<void>}
     */
    loadFirstPage: function loadFirstPage(delegationContext) {
      var _arguments = arguments,
        _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var firstLoad, startPageLoad, cacheKey, payload, globalAccounts, paginationToken, endPageLoad;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              firstLoad = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : false;
              startPageLoad = firstLoad ? _this.$pickerInitialization : Date.now();
              cacheKey = globalAccountsStore_getCacheKey(delegationContext);
              if (!(_this.loadingData[cacheKey] && ![constants_LoadingStates.notLoaded, constants_LoadingStates.error].includes(_this.loadingData[cacheKey].loadingState))) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return");
            case 5:
              _this.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loading,
                globalAccounts: [],
                paginationToken: null
              };
              _context.prev = 6;
              _context.next = 9;
              return fetchWithMetrics('/account-switcher/global-accounts', {
                delegationContext: delegationContext,
                mons_app: _this.$monsApp,
                mons_config: _this.$monsConfig
              }, function (payload) {
                return Array.isArray(payload.globalAccounts);
              });
            case 9:
              payload = _context.sent;
              globalAccounts = payload.globalAccounts, paginationToken = payload.paginationToken;
              endPageLoad = Date.now();
              _this.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loaded,
                globalAccounts: processGlobalAccounts(globalAccounts),
                paginationToken: paginationToken,
                pageLoadTime: endPageLoad - startPageLoad
              };
              _this._emitPageLoadMetrics(endPageLoad, startPageLoad, firstLoad);
              _context.next = 19;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](6);
              _this.loadingData[cacheKey].loadingState = constants_LoadingStates.error;
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[6, 16]]);
      }))();
    },
    /**
     * Loads the next page of global accounts accessible through the delegation context.
     *
     * @param delegationContext
     * @return {Promise<void>}
     */
    loadNextPage: function loadNextPage(delegationContext) {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var startPageLoad, cacheKey, payload, globalAccounts, paginationToken, endPageLoad;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              startPageLoad = Date.now();
              cacheKey = globalAccountsStore_getCacheKey(delegationContext);
              if (!(!_this2.loadingData[cacheKey] || _this2.loadingData[cacheKey].loadingState !== constants_LoadingStates.loaded || !_this2.loadingData[cacheKey].paginationToken)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return");
            case 4:
              _this2.loadingData[cacheKey].loadingState = constants_LoadingStates.loadingMore;
              _context2.prev = 5;
              _context2.next = 8;
              return fetchWithMetrics('/account-switcher/global-accounts', {
                delegationContext: delegationContext,
                paginationToken: _this2.loadingData[cacheKey].paginationToken,
                mons_app: _this2.$monsApp,
                mons_config: _this2.$monsConfig
              }, function (payload) {
                return Array.isArray(payload.globalAccounts);
              });
            case 8:
              payload = _context2.sent;
              globalAccounts = payload.globalAccounts, paginationToken = payload.paginationToken;
              endPageLoad = Date.now();
              _this2.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loaded,
                globalAccounts: processGlobalAccounts([].concat(_toConsumableArray(_this2.loadingData[cacheKey].globalAccounts), _toConsumableArray(globalAccounts))),
                paginationToken: paginationToken,
                pageLoadTime: endPageLoad - startPageLoad
              };
              _context2.next = 17;
              break;
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](5);
              _this2.loadingData[cacheKey].loadingState = constants_LoadingStates.error;
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[5, 14]]);
      }))();
    },
    loadAllNextPages: function loadAllNextPages() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var promises, _iterator, _step, cacheKey, delegationContext;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              promises = [];
              _iterator = _createForOfIteratorHelper(_this3._keysWithPaginationTokens);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  cacheKey = _step.value;
                  delegationContext = undoCacheKey(cacheKey);
                  promises.push(_this3.loadNextPage(delegationContext));
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              _context3.next = 5;
              return Promise.all(promises);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    _emitPageLoadMetrics: function _emitPageLoadMetrics(endTimestamp, startTimestmap, firstLoad) {
      if (firstLoad) {
        this.$metrics.newChildActionPublisherForMethod("".concat(this.$pickerType, "Performance")).publishTimerMonitor('timeToFirstGlobalPageLoad', endTimestamp - this.$pickerInitialization);
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/js/stores/regionalAccountsStore.js










function processRegionalAccounts(regionalAccounts, delegationContext) {
  return regionalAccounts.map(function (regionalAccount) {
    return _objectSpread2(_objectSpread2({}, regionalAccount), {}, {
      type: constants_AccountTypes.regional,
      delegationContext: delegationContext || ''
    });
  }).sort(function (a, b) {
    return a.label.localeCompare(b.label);
  });
}
function regionalAccountsStore_getCacheKey(globalAccountId, delegationContext, nature) {
  return "".concat(globalAccountId || 'NO_ID', "#").concat(delegationContext || 'NO_DC', "#").concat(nature || 'NO_NATURE');
}
function regionalAccountsStore_undoCacheKey(cacheKey) {
  var _cacheKey$split = cacheKey.split('#'),
    _cacheKey$split2 = _slicedToArray(_cacheKey$split, 3),
    globalAccountId = _cacheKey$split2[0],
    delegationContext = _cacheKey$split2[1],
    nature = _cacheKey$split2[2];
  return {
    globalAccountId: globalAccountId === 'NO_ID' ? null : globalAccountId,
    delegationContext: delegationContext === 'NO_DC' ? null : delegationContext,
    nature: nature === 'NO_NATURE' ? null : nature
  };
}
var useRegionalAccountsStore = defineStore('regionalAccounts', {
  state: function state() {
    return {
      loadingData: {},
      pageLoadMetrics: []
    };
  },
  getters: {
    getLoadingState: function getLoadingState(state) {
      return function (globalAccountId, delegationContext, nature) {
        var cacheKey = regionalAccountsStore_getCacheKey(globalAccountId, delegationContext, nature);
        if (!state.loadingData[cacheKey]) {
          return constants_LoadingStates.notLoaded;
        }
        return state.loadingData[cacheKey].loadingState;
      };
    },
    getRegionalAccounts: function getRegionalAccounts(state) {
      return function (globalAccountId, delegationContext, nature) {
        var cacheKey = regionalAccountsStore_getCacheKey(globalAccountId, delegationContext, nature);
        if (!state.loadingData[cacheKey]) {
          return [];
        }
        return state.loadingData[cacheKey].regionalAccounts;
      };
    },
    getPaginationToken: function getPaginationToken(state) {
      return function (globalAccountId, delegationContext, nature) {
        var cacheKey = regionalAccountsStore_getCacheKey(globalAccountId, delegationContext, nature);
        if (!state.loadingData[cacheKey]) {
          return null;
        }
        return state.loadingData[cacheKey].paginationToken;
      };
    },
    getSwitcherOptions: function getSwitcherOptions(state) {
      return function (globalAccountId, delegationContext, nature) {
        var cacheKey = regionalAccountsStore_getCacheKey(globalAccountId, delegationContext, nature);
        if (!state.loadingData[cacheKey]) {
          return null;
        }
        return state.loadingData[cacheKey].switcherOptions;
      };
    },
    canLoadMore: function canLoadMore(state) {
      return state._keysWithPaginationTokens.length > 0;
    },
    _keysWithPaginationTokens: function _keysWithPaginationTokens(state) {
      var cacheKeys = [];
      for (var _i = 0, _Object$entries = Object.entries(state.loadingData); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          cacheKey = _Object$entries$_i[0],
          loadingData = _Object$entries$_i[1];
        if (loadingData.loadingState === constants_LoadingStates.loaded && loadingData.paginationToken) {
          cacheKeys.push(cacheKey);
        }
      }
      return cacheKeys;
    },
    totalRegionalAccounts: function totalRegionalAccounts(state) {
      var totalLoaded = 0;
      for (var key in state.loadingData) {
        totalLoaded += state.loadingData[key].regionalAccounts.length;
      }
      return totalLoaded;
    },
    totalRegionalAccountsLoadTime: function totalRegionalAccountsLoadTime(state) {
      var totalRegionalAccountsLoadTime = 0;
      for (var key in state.loadingData) {
        totalRegionalAccountsLoadTime += state.loadingData[key].pageLoadTime;
      }
      return totalRegionalAccountsLoadTime;
    }
  },
  actions: {
    /**
     * Loads the first page of regional accounts accessible through the global account and delegation context. If
     * global account is not provided, then loads the regional accounts the customer has direct authorization to.
     *
     * @param globalAccountId
     * @param delegationContext
     * @param nature
     * @return {Promise<void>}
     */
    loadFirstPage: function loadFirstPage(globalAccountId, delegationContext, nature) {
      var _arguments = arguments,
        _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var firstLoad, startPageLoad, cacheKey, payload, regionalAccounts, paginationToken, switcherOptions, endPageLoad;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              firstLoad = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : false;
              startPageLoad = firstLoad ? _this.$pickerInitialization : Date.now();
              if (nature) {
                _context.next = 4;
                break;
              }
              throw new Error('A Mons page nature is required for regional account APIs.');
            case 4:
              cacheKey = regionalAccountsStore_getCacheKey(globalAccountId, delegationContext, nature);
              if (!(_this.loadingData[cacheKey] && ![constants_LoadingStates.notLoaded, constants_LoadingStates.error].includes(_this.loadingData[cacheKey].loadingState))) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return");
            case 7:
              _this.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loading,
                regionalAccounts: [],
                paginationToken: null
              };
              _context.prev = 8;
              _context.next = 11;
              return fetchWithMetrics("/account-switcher/regional-accounts/".concat(nature), {
                globalAccountId: globalAccountId,
                delegationContext: delegationContext,
                mons_app: _this.$monsApp,
                mons_config: _this.$monsConfig
              }, function (payload) {
                return Array.isArray(payload.regionalAccounts);
              });
            case 11:
              payload = _context.sent;
              regionalAccounts = payload.regionalAccounts, paginationToken = payload.paginationToken, switcherOptions = payload.switcherOptions;
              endPageLoad = Date.now();
              _this.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loaded,
                regionalAccounts: processRegionalAccounts(regionalAccounts, delegationContext),
                paginationToken: paginationToken,
                switcherOptions: switcherOptions,
                pageLoadTime: endPageLoad - startPageLoad
              };
              _this._emitPageLoadMetrics(endPageLoad, startPageLoad, firstLoad);
              _context.next = 21;
              break;
            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](8);
              _this.loadingData[cacheKey].loadingState = constants_LoadingStates.error;
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[8, 18]]);
      }))();
    },
    /**
     * Loads the next page of regional accounts accessible through the global account and delegation context. If
     * global account is not provided, then loads the regional accounts the customer has direct authorization to.
     *
     * @param globalAccountId
     * @param delegationContext
     * @param nature
     * @return {Promise<void>}
     */
    loadNextPage: function loadNextPage(globalAccountId, delegationContext, nature) {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var startPageLoad, cacheKey, payload, regionalAccounts, paginationToken, switcherOptions, endPageLoad;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              startPageLoad = Date.now();
              if (nature) {
                _context2.next = 3;
                break;
              }
              throw new Error('A Mons page nature is required for regional account APIs.');
            case 3:
              cacheKey = regionalAccountsStore_getCacheKey(globalAccountId, delegationContext, nature);
              if (!(!_this2.loadingData[cacheKey] || _this2.loadingData[cacheKey].loadingState !== constants_LoadingStates.loaded || !_this2.loadingData[cacheKey].paginationToken)) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return");
            case 6:
              _this2.loadingData[cacheKey].loadingState = constants_LoadingStates.loadingMore;
              _context2.prev = 7;
              _context2.next = 10;
              return fetchWithMetrics("/account-switcher/regional-accounts/".concat(nature), {
                globalAccountId: globalAccountId || '',
                delegationContext: delegationContext || '',
                paginationToken: _this2.loadingData[cacheKey].paginationToken,
                mons_app: _this2.$monsApp,
                mons_config: _this2.$monsConfig
              }, function (payload) {
                return Array.isArray(payload.regionalAccounts);
              });
            case 10:
              payload = _context2.sent;
              regionalAccounts = payload.regionalAccounts, paginationToken = payload.paginationToken, switcherOptions = payload.switcherOptions;
              endPageLoad = Date.now();
              _this2.loadingData[cacheKey] = {
                loadingState: constants_LoadingStates.loaded,
                regionalAccounts: processRegionalAccounts([].concat(_toConsumableArray(_this2.loadingData[cacheKey].regionalAccounts), _toConsumableArray(regionalAccounts)), delegationContext),
                paginationToken: paginationToken,
                switcherOptions: switcherOptions,
                pageLoadTime: endPageLoad - startPageLoad
              };
              _context2.next = 20;
              break;
            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](7);
              console.error(_context2.t0);
              _this2.loadingData[cacheKey].loadingState = constants_LoadingStates.error;
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[7, 16]]);
      }))();
    },
    loadAllNextPages: function loadAllNextPages() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var promises, _iterator, _step, cacheKey, _undoCacheKey, globalAccountId, delegationContext, nature;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              promises = [];
              _iterator = _createForOfIteratorHelper(_this3._keysWithPaginationTokens);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  cacheKey = _step.value;
                  _undoCacheKey = regionalAccountsStore_undoCacheKey(cacheKey), globalAccountId = _undoCacheKey.globalAccountId, delegationContext = _undoCacheKey.delegationContext, nature = _undoCacheKey.nature;
                  promises.push(_this3.loadNextPage(globalAccountId, delegationContext, nature));
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              _context3.next = 5;
              return Promise.all(promises);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    _emitPageLoadMetrics: function _emitPageLoadMetrics(endTimestamp, startTimestmap, firstLoad) {
      if (firstLoad) {
        this.$metrics.newChildActionPublisherForMethod("".concat(this.$pickerType, "Performance")).publishTimerMonitor('timeToFirstRegionalPageLoad', endTimestamp - startTimestmap);
      }
    }
  }
});
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/KatIcon.vue?vue&type=template&id=ea80ed44&scoped=true

function KatIconvue_type_template_id_ea80ed44_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent($options.iconComponent), {
    role: "img",
    "class": shared_esm_bundler_normalizeClass("kat-icon-".concat($props.size)),
    "aria-hidden": "true",
    focusable: "false"
  }, null, 8 /* PROPS */, ["class"]);
}
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/icons/arrow_drop_down.vue?vue&type=template&id=61a825ae

var arrow_drop_downvue_type_template_id_61a825ae_hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
var arrow_drop_downvue_type_template_id_61a825ae_hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  d: "M256 320L149 213h214z"
}, null, -1 /* HOISTED */);
var arrow_drop_downvue_type_template_id_61a825ae_hoisted_3 = [arrow_drop_downvue_type_template_id_61a825ae_hoisted_2];
function arrow_drop_downvue_type_template_id_61a825ae_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", arrow_drop_downvue_type_template_id_61a825ae_hoisted_1, arrow_drop_downvue_type_template_id_61a825ae_hoisted_3);
}
;// CONCATENATED MODULE: ./src/js/components/katal/icons/arrow_drop_down.vue?vue&type=template&id=61a825ae

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(6262);
;// CONCATENATED MODULE: ./src/js/components/katal/icons/arrow_drop_down.vue

const script = {}

;
const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.A)(script, [['render',arrow_drop_downvue_type_template_id_61a825ae_render]])

/* harmony default export */ const arrow_drop_down = (__exports__);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/icons/check.vue?vue&type=template&id=940e2296

var checkvue_type_template_id_940e2296_hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
var checkvue_type_template_id_940e2296_hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  d: "M103 256l89 89 226-226 30 30-256 256L73 286z"
}, null, -1 /* HOISTED */);
var checkvue_type_template_id_940e2296_hoisted_3 = [checkvue_type_template_id_940e2296_hoisted_2];
function checkvue_type_template_id_940e2296_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", checkvue_type_template_id_940e2296_hoisted_1, checkvue_type_template_id_940e2296_hoisted_3);
}
;// CONCATENATED MODULE: ./src/js/components/katal/icons/check.vue?vue&type=template&id=940e2296

;// CONCATENATED MODULE: ./src/js/components/katal/icons/check.vue

const check_script = {}

;
const check_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(check_script, [['render',checkvue_type_template_id_940e2296_render]])

/* harmony default export */ const check = (check_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/icons/chevron-down.vue?vue&type=template&id=1a77d501

var chevron_downvue_type_template_id_1a77d501_hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
var chevron_downvue_type_template_id_1a77d501_hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  d: "M256 281l98-98 30 30-128 128-128-128 30-30z"
}, null, -1 /* HOISTED */);
var chevron_downvue_type_template_id_1a77d501_hoisted_3 = [chevron_downvue_type_template_id_1a77d501_hoisted_2];
function chevron_downvue_type_template_id_1a77d501_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", chevron_downvue_type_template_id_1a77d501_hoisted_1, chevron_downvue_type_template_id_1a77d501_hoisted_3);
}
;// CONCATENATED MODULE: ./src/js/components/katal/icons/chevron-down.vue?vue&type=template&id=1a77d501

;// CONCATENATED MODULE: ./src/js/components/katal/icons/chevron-down.vue

const chevron_down_script = {}

;
const chevron_down_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(chevron_down_script, [['render',chevron_downvue_type_template_id_1a77d501_render]])

/* harmony default export */ const chevron_down = (chevron_down_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/icons/chevron-right.vue?vue&type=template&id=1f596e6d

var chevron_rightvue_type_template_id_1f596e6d_hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
var chevron_rightvue_type_template_id_1f596e6d_hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  d: "M183 158l30-30 128 128-128 128-30-30 98-98z"
}, null, -1 /* HOISTED */);
var chevron_rightvue_type_template_id_1f596e6d_hoisted_3 = [chevron_rightvue_type_template_id_1f596e6d_hoisted_2];
function chevron_rightvue_type_template_id_1f596e6d_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", chevron_rightvue_type_template_id_1f596e6d_hoisted_1, chevron_rightvue_type_template_id_1f596e6d_hoisted_3);
}
;// CONCATENATED MODULE: ./src/js/components/katal/icons/chevron-right.vue?vue&type=template&id=1f596e6d

;// CONCATENATED MODULE: ./src/js/components/katal/icons/chevron-right.vue

const chevron_right_script = {}

;
const chevron_right_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(chevron_right_script, [['render',chevron_rightvue_type_template_id_1f596e6d_render]])

/* harmony default export */ const chevron_right = (chevron_right_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/icons/chevron-up.vue?vue&type=template&id=2f744a12

var chevron_upvue_type_template_id_2f744a12_hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
var chevron_upvue_type_template_id_2f744a12_hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  d: "M128 299l128-128 128 128-30 30-98-98-98 98z"
}, null, -1 /* HOISTED */);
var chevron_upvue_type_template_id_2f744a12_hoisted_3 = [chevron_upvue_type_template_id_2f744a12_hoisted_2];
function chevron_upvue_type_template_id_2f744a12_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", chevron_upvue_type_template_id_2f744a12_hoisted_1, chevron_upvue_type_template_id_2f744a12_hoisted_3);
}
;// CONCATENATED MODULE: ./src/js/components/katal/icons/chevron-up.vue?vue&type=template&id=2f744a12

;// CONCATENATED MODULE: ./src/js/components/katal/icons/chevron-up.vue

const chevron_up_script = {}

;
const chevron_up_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(chevron_up_script, [['render',chevron_upvue_type_template_id_2f744a12_render]])

/* harmony default export */ const chevron_up = (chevron_up_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/icons/danger.vue?vue&type=template&id=3fd6e688

var dangervue_type_template_id_3fd6e688_hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
var dangervue_type_template_id_3fd6e688_hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  d: "M106 105q62-62 150-62 87 0 151 62 62 64 62 151 0 88-62 150-63 63-151 63t-150-63q-63-62-63-150t63-151zm129 172h42V149h-42v128zm0 86h42v-43h-42v43z"
}, null, -1 /* HOISTED */);
var dangervue_type_template_id_3fd6e688_hoisted_3 = [dangervue_type_template_id_3fd6e688_hoisted_2];
function dangervue_type_template_id_3fd6e688_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", dangervue_type_template_id_3fd6e688_hoisted_1, dangervue_type_template_id_3fd6e688_hoisted_3);
}
;// CONCATENATED MODULE: ./src/js/components/katal/icons/danger.vue?vue&type=template&id=3fd6e688

;// CONCATENATED MODULE: ./src/js/components/katal/icons/danger.vue

const danger_script = {}

;
const danger_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(danger_script, [['render',dangervue_type_template_id_3fd6e688_render]])

/* harmony default export */ const danger = (danger_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/icons/store.vue?vue&type=template&id=4b1a7dcc

var storevue_type_template_id_4b1a7dcc_hoisted_1 = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
var storevue_type_template_id_4b1a7dcc_hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  d: "M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z",
  fill: "#232F3E"
}, null, -1 /* HOISTED */);
var storevue_type_template_id_4b1a7dcc_hoisted_3 = [storevue_type_template_id_4b1a7dcc_hoisted_2];
function storevue_type_template_id_4b1a7dcc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", storevue_type_template_id_4b1a7dcc_hoisted_1, storevue_type_template_id_4b1a7dcc_hoisted_3);
}
;// CONCATENATED MODULE: ./src/js/components/katal/icons/store.vue?vue&type=template&id=4b1a7dcc

;// CONCATENATED MODULE: ./src/js/components/katal/icons/store.vue

const store_script = {}

;
const store_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(store_script, [['render',storevue_type_template_id_4b1a7dcc_render]])

/* harmony default export */ const store = (store_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/icons/arrow_back.vue?vue&type=template&id=3ffe55be

var arrow_backvue_type_template_id_3ffe55be_hoisted_1 = {
  "class": "icon-color",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
};
var arrow_backvue_type_template_id_3ffe55be_hoisted_2 = /*#__PURE__*/createBaseVNode("path", {
  d: "M167 235h260v42H167l119 120-30 30L85 256 256 85l30 30z"
}, null, -1 /* HOISTED */);
var arrow_backvue_type_template_id_3ffe55be_hoisted_3 = [arrow_backvue_type_template_id_3ffe55be_hoisted_2];
function arrow_backvue_type_template_id_3ffe55be_render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", arrow_backvue_type_template_id_3ffe55be_hoisted_1, arrow_backvue_type_template_id_3ffe55be_hoisted_3);
}
;// CONCATENATED MODULE: ./src/js/components/katal/icons/arrow_back.vue?vue&type=template&id=3ffe55be

;// CONCATENATED MODULE: ./src/js/components/katal/icons/arrow_back.vue

const arrow_back_script = {}

;


const arrow_back_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(arrow_back_script, [['render',arrow_backvue_type_template_id_3ffe55be_render]])

/* harmony default export */ const arrow_back = (arrow_back_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/KatIcon.vue?vue&type=script&lang=js









/**
 * Naming convention maps to the same API as KatalIcon
 * See: https://katal.corp.amazon.com/#/component/developer/KatalIcon
 * The icon files are available here: https://code.amazon.com/packages/KatalComponents/trees/mainline/--/public/icons
 */
var icons = {
  arrow_drop_down: arrow_drop_down,
  check: check,
  'chevron-down': chevron_down,
  'chevron-right': chevron_right,
  'chevron-up': chevron_up,
  danger: danger,
  store: store,
  arrowBack: arrow_back
};
/* harmony default export */ const KatIconvue_type_script_lang_js = ({
  name: 'KatIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      "default": 'small'
    }
  },
  computed: {
    iconComponent: function iconComponent() {
      return icons[this.name] || console.error('invalid icon name', this.name);
    }
  }
});
;// CONCATENATED MODULE: ./src/js/components/katal/KatIcon.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/js/components/katal/KatIcon.vue




;


const KatIcon_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(KatIconvue_type_script_lang_js, [['render',KatIconvue_type_template_id_ea80ed44_scoped_true_render],['__scopeId',"data-v-ea80ed44"]])

/* harmony default export */ const KatIcon = (KatIcon_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/KatProgressCircular.vue?vue&type=template&id=50ef5622&scoped=true

var KatProgressCircularvue_type_template_id_50ef5622_scoped_true_withScopeId = function _withScopeId(n) {
  return pushScopeId("data-v-50ef5622"), n = n(), popScopeId(), n;
};
var KatProgressCircularvue_type_template_id_50ef5622_scoped_true_hoisted_1 = /*#__PURE__*/KatProgressCircularvue_type_template_id_50ef5622_scoped_true_withScopeId(function () {
  return /*#__PURE__*/createBaseVNode("svg", {
    viewBox: "0 0 20 20"
  }, [/*#__PURE__*/createBaseVNode("path", {
    "stroke-linecap": "round",
    d: "M9 1 A9 9 0 1 1 1 9"
  })], -1 /* HOISTED */);
});
var KatProgressCircularvue_type_template_id_50ef5622_scoped_true_hoisted_2 = [KatProgressCircularvue_type_template_id_50ef5622_scoped_true_hoisted_1];
function KatProgressCircularvue_type_template_id_50ef5622_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "class": shared_esm_bundler_normalizeClass("kat-progress-circular kat-progress-circular-".concat($props.size))
  }, KatProgressCircularvue_type_template_id_50ef5622_scoped_true_hoisted_2, 2 /* CLASS */);
}
;// CONCATENATED MODULE: ./src/js/components/katal/KatProgressCircular.vue?vue&type=template&id=50ef5622&scoped=true

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/KatProgressCircular.vue?vue&type=script&lang=js
/* harmony default export */ const KatProgressCircularvue_type_script_lang_js = ({
  name: 'KatProgressCircular',
  props: {
    size: {
      type: String,
      "default": 'medium',
      validator: function validator(size) {
        return ['small', 'medium', 'large'].includes(size);
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/js/components/katal/KatProgressCircular.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/js/components/katal/KatProgressCircular.vue




;


const KatProgressCircular_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(KatProgressCircularvue_type_script_lang_js, [['render',KatProgressCircularvue_type_template_id_50ef5622_scoped_true_render],['__scopeId',"data-v-50ef5622"]])

/* harmony default export */ const KatProgressCircular = (KatProgressCircular_exports_);
;// CONCATENATED MODULE: ./src/js/util/returnToHandler.js


var SEARCH_PARAMS_TO_REMOVE = [new RegExp('^mons_redirect$'), new RegExp('^openi.assoc_handled$'), new RegExp('^openid'), new RegExp('^returnTo$')];

/**
 * This returns the URL to return to after account selection.
 *
 * @param {URL} currentUrl the current's page's URL
 * @param {String} returnTo the returnTo search param
 * @param {String} [defaultReturnTo] an optional fallback value to use when returnTo is invalid
 * @returns {URL}
 */
function handleReturnTo(currentUrl, returnTo, defaultReturnTo) {
  var returnToUrl;
  try {
    if (returnTo) {
      returnToUrl = new URL(decodeURIComponent(returnTo), currentUrl);
    } else {
      returnToUrl = new URL(defaultReturnTo || '/', currentUrl);
    }
  } catch (e) {
    console.error('The returnTo search param was invalid.');
    returnToUrl = new URL(defaultReturnTo || '/', currentUrl);
  }
  var searchParams = new URLSearchParams([].concat(_toConsumableArray(currentUrl.searchParams), _toConsumableArray(returnToUrl.searchParams)));
  var _iterator = _createForOfIteratorHelper(SEARCH_PARAMS_TO_REMOVE),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var searchParamToRemove = _step.value;
      var _iterator2 = _createForOfIteratorHelper(searchParams.keys()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var searchParam = _step2.value;
          if (searchParamToRemove.test(searchParam)) {
            searchParams["delete"](searchParam);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var newUrl = new URL(currentUrl);
  newUrl.pathname = returnToUrl.pathname;
  newUrl.search = searchParams.toString();
  return newUrl;
}
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/DropdownAccountSwitcherList.vue?vue&type=script&lang=js










/* harmony default export */ const DropdownAccountSwitcherListvue_type_script_lang_js = ({
  name: 'DropdownAccountSwitcherList',
  components: {
    KatIcon: KatIcon,
    KatProgressCircular: KatProgressCircular
  },
  props: {
    delegationContext: {
      type: String
    },
    mode: {
      type: String,
      validator: function validator(mode) {
        return Object.values(constants_AccountSwitcherModes).includes(mode);
      }
    },
    nature: {
      type: String,
      "default": null
    },
    parentGlobalAccount: {
      type: Object,
      "default": null
    }
  },
  data: function data() {
    return {
      expandedGlobalAccounts: new Set(),
      isMounted: false
    };
  },
  computed: _objectSpread2(_objectSpread2(_objectSpread2({}, mapState(useGlobalAccountsStore, {
    getGlobalAccountsLoadingState: 'getLoadingState',
    getGlobalAccounts: 'getGlobalAccounts'
  })), mapState(useRegionalAccountsStore, {
    getRegionalAccountsLoadingState: 'getLoadingState',
    getRegionalAccounts: 'getRegionalAccounts',
    getSwitcherOptions: 'getSwitcherOptions'
  })), {}, {
    loadingState: function loadingState() {
      var _this$parentGlobalAcc3, _this$parentGlobalAcc4;
      if (this.mode === constants_AccountSwitcherModes.GlobalOnly) {
        return this.getGlobalAccountsLoadingState(this.delegationContext);
      } else if (this.mode === constants_AccountSwitcherModes.RegionalOnly) {
        var _this$parentGlobalAcc, _this$parentGlobalAcc2;
        return this.getRegionalAccountsLoadingState((_this$parentGlobalAcc = this.parentGlobalAccount) === null || _this$parentGlobalAcc === void 0 ? void 0 : _this$parentGlobalAcc.id, (_this$parentGlobalAcc2 = this.parentGlobalAccount) === null || _this$parentGlobalAcc2 === void 0 ? void 0 : _this$parentGlobalAcc2.delegationContext, this.nature);
      }
      return reduce(this.getGlobalAccountsLoadingState(this.delegationContext), this.getRegionalAccountsLoadingState((_this$parentGlobalAcc3 = this.parentGlobalAccount) === null || _this$parentGlobalAcc3 === void 0 ? void 0 : _this$parentGlobalAcc3.id, (_this$parentGlobalAcc4 = this.parentGlobalAccount) === null || _this$parentGlobalAcc4 === void 0 ? void 0 : _this$parentGlobalAcc4.delegationContext, this.nature));
    },
    globalAccounts: function globalAccounts() {
      return this.getGlobalAccounts(this.delegationContext);
    },
    regionalAccounts: function regionalAccounts() {
      var _this$parentGlobalAcc5, _this$parentGlobalAcc6;
      return this.getRegionalAccounts((_this$parentGlobalAcc5 = this.parentGlobalAccount) === null || _this$parentGlobalAcc5 === void 0 ? void 0 : _this$parentGlobalAcc5.id, (_this$parentGlobalAcc6 = this.parentGlobalAccount) === null || _this$parentGlobalAcc6 === void 0 ? void 0 : _this$parentGlobalAcc6.delegationContext, this.nature);
    },
    fullPageAccountSwitcherLink: function fullPageAccountSwitcherLink() {
      if (this.mode === constants_AccountSwitcherModes.GlobalOnly) {
        return '/account-switcher/global';
      } else if (this.mode === constants_AccountSwitcherModes.RegionalOnly) {
        return "/account-switcher/regional/".concat(this.nature);
      } else {
        return "/account-switcher/default/".concat(this.nature);
      }
    },
    AccountSwitcherModes: function AccountSwitcherModes() {
      return constants_AccountSwitcherModes;
    },
    LoadingStates: function LoadingStates() {
      return constants_LoadingStates;
    },
    scrollableStyle: function scrollableStyle() {
      if (!this.isMounted) {
        return {};
      }
      // Ensure that the dropdown does not extend outside the viewport
      var scrollableTop = this.$refs.scrollable.getBoundingClientRect().top;
      var seeAllButtonHeight = 32;
      var bottomMargin = 12;
      return {
        maxHeight: "min(480px, 100vh - ".concat(scrollableTop, "px - ").concat(seeAllButtonHeight, "px - ").concat(bottomMargin, "px)")
      };
    }
  }),
  methods: {
    isExpanded: function isExpanded(globalAccount) {
      return this.expandedGlobalAccounts.has(globalAccount.id);
    },
    onClickGlobalAccount: function onClickGlobalAccount(globalAccount) {
      if (this.mode === constants_AccountSwitcherModes.GlobalOnly) {
        var _this$getSwitcherOpti;
        var url = new URL(window.location);
        var returnTo = url.searchParams.get('returnTo');
        url.search = ''; // Clear the existing search parameters because they're not relevant to the returnTo page
        url.searchParams.set('mons_sel_dir_paid', globalAccount.id);
        if (globalAccount.delegationContext) {
          url.searchParams.set('mons_sel_dc', globalAccount.delegationContext);
        }
        var defaultReturnTo = (_this$getSwitcherOpti = this.getSwitcherOptions(globalAccount.id, globalAccount.delegationContext, this.nature)) === null || _this$getSwitcherOpti === void 0 ? void 0 : _this$getSwitcherOpti.defaultReturnTo;
        url = handleReturnTo(url, returnTo, defaultReturnTo);
        this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcherList').publishCounterMonitor('global-account.click', 1);
        window.location = url;
      } else if (this.expandedGlobalAccounts.has(globalAccount.id)) {
        this.expandedGlobalAccounts["delete"](globalAccount.id);
        this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcherList').publishCounterMonitor('global-account.closed', 1);
      } else {
        this.expandedGlobalAccounts.add(globalAccount.id);
        useRegionalAccountsStore().loadFirstPage(globalAccount.id, globalAccount.delegationContext, this.nature);
        this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcherList').publishCounterMonitor('global-account.opened', 1);
      }
    },
    onClickRegionalAccount: function onClickRegionalAccount(regionalAccount, globalAccount) {
      var url = new URL(window.location);
      var returnTo = url.searchParams.get('returnTo');
      url.search = ''; // Clear the existing search parameters because they're not relevant to the returnTo page
      for (var _i = 0, _Object$entries = Object.entries(regionalAccount.ids); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];
        url.searchParams.set(k, v);
      }
      if (globalAccount !== null && globalAccount !== void 0 && globalAccount.id) {
        url.searchParams.set('mons_sel_dir_paid', globalAccount.id);
      }
      if (globalAccount !== null && globalAccount !== void 0 && globalAccount.delegationContext) {
        url.searchParams.set('mons_sel_dc', globalAccount.delegationContext);
      }
      if (regionalAccount.domain) {
        url.hostname = regionalAccount.domain;
      }
      var switcherOptions = this.getSwitcherOptions(globalAccount === null || globalAccount === void 0 ? void 0 : globalAccount.id, globalAccount === null || globalAccount === void 0 ? void 0 : globalAccount.delegationContext, this.nature);
      if (switcherOptions !== null && switcherOptions !== void 0 && switcherOptions.additionalSearchParameters) {
        for (var _i2 = 0, _Object$entries2 = Object.entries(switcherOptions === null || switcherOptions === void 0 ? void 0 : switcherOptions.additionalSearchParameters); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            _k = _Object$entries2$_i[0],
            _v = _Object$entries2$_i[1];
          url.searchParams.set(_k, _v);
        }
      }
      url = handleReturnTo(url, returnTo, switcherOptions === null || switcherOptions === void 0 ? void 0 : switcherOptions.defaultReturnTo);
      this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcherList').publishCounterMonitor('regional-account.click', 1);
      window.location = url;
    },
    onClickSeeAllLink: function onClickSeeAllLink() {
      this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcherList').publishCounterMonitor('seeall-link.click', 1);
    }
  },
  mounted: function mounted() {
    this.isMounted = true;
    if (this.mode !== constants_AccountSwitcherModes.RegionalOnly) {
      useGlobalAccountsStore().loadFirstPage(this.delegationContext);
    }
    if (this.mode !== constants_AccountSwitcherModes.GlobalOnly) {
      var _this$parentGlobalAcc7, _this$parentGlobalAcc8;
      useRegionalAccountsStore().loadFirstPage((_this$parentGlobalAcc7 = this.parentGlobalAccount) === null || _this$parentGlobalAcc7 === void 0 ? void 0 : _this$parentGlobalAcc7.id, (_this$parentGlobalAcc8 = this.parentGlobalAccount) === null || _this$parentGlobalAcc8 === void 0 ? void 0 : _this$parentGlobalAcc8.delegationContext, this.nature);
    }
  }
});
;// CONCATENATED MODULE: ./src/js/components/DropdownAccountSwitcherList.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/js/components/DropdownAccountSwitcherList.vue




;


const DropdownAccountSwitcherList_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(DropdownAccountSwitcherListvue_type_script_lang_js, [['render',DropdownAccountSwitcherListvue_type_template_id_a9ae7d02_scoped_true_render],['__scopeId',"data-v-a9ae7d02"]])

/* harmony default export */ const DropdownAccountSwitcherList = (DropdownAccountSwitcherList_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/KatLink.vue?vue&type=template&id=490fda9e&scoped=true

function KatLinkvue_type_template_id_490fda9e_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("a", null, [renderSlot(_ctx.$slots, "default", {}, undefined, true)]);
}
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/katal/KatLink.vue?vue&type=script&lang=js
/* harmony default export */ const KatLinkvue_type_script_lang_js = ({
  name: 'KatLink'
});
;// CONCATENATED MODULE: ./src/js/components/katal/KatLink.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/js/components/katal/KatLink.vue




;


const KatLink_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(KatLinkvue_type_script_lang_js, [['render',KatLinkvue_type_template_id_490fda9e_scoped_true_render],['__scopeId',"data-v-490fda9e"]])

/* harmony default export */ const KatLink = (KatLink_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-3!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/js/components/DropdownAccountSwitcher.vue?vue&type=script&lang=js









/* harmony default export */ const DropdownAccountSwitchervue_type_script_lang_js = ({
  name: 'DropdownAccountSwitcher',
  components: {
    KatLink: KatLink,
    KatProgressCircular: KatProgressCircular,
    DropdownAccountSwitcherList: DropdownAccountSwitcherList
  },
  props: {
    mode: {
      type: String,
      validator: function validator(mode) {
        return Object.values(constants_AccountSwitcherModes).includes(mode);
      }
    },
    nature: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      isExpanded: false
    };
  },
  computed: _objectSpread2(_objectSpread2(_objectSpread2({}, mapState(useGlobalAccountStore, {
    globalAccountLoadingState: 'loadingState',
    globalAccount: 'globalAccount',
    parentGlobalAccount: 'parentGlobalAccount'
  })), mapState(useRegionalAccountStore, ['getRegionalAccount', 'getRegionalAccountLoadingState'])), {}, {
    regionalAccount: function regionalAccount() {
      return this.getRegionalAccount(this.nature);
    },
    regionalAccountLoadingState: function regionalAccountLoadingState() {
      return this.getRegionalAccountLoadingState(this.nature);
    },
    delegationContext: function delegationContext() {
      return (this.globalAccount || {}).delegationContext;
    },
    loadingState: function loadingState() {
      if (this.mode === constants_AccountSwitcherModes.GlobalOnly) {
        return this.globalAccountLoadingState;
      }
      if (this.mode === constants_AccountSwitcherModes.RegionalOnly) {
        return this.regionalAccountLoadingState;
      }
      return reduce(this.globalAccountLoadingState, this.regionalAccountLoadingState);
    },
    fullPageAccountSwitcherLink: function fullPageAccountSwitcherLink() {
      if (this.mode === constants_AccountSwitcherModes.GlobalOnly) {
        return '/account-switcher/global';
      } else if (this.mode === constants_AccountSwitcherModes.RegionalOnly) {
        return "/account-switcher/regional/".concat(this.nature);
      } else {
        return "/account-switcher/default/".concat(this.nature);
      }
    },
    AccountSwitcherModes: function AccountSwitcherModes() {
      return constants_AccountSwitcherModes;
    },
    LoadingStates: function LoadingStates() {
      return constants_LoadingStates;
    }
  }),
  methods: {
    onLeaveRoot: function onLeaveRoot(event) {
      var _this$$refs$root;
      if (!((_this$$refs$root = this.$refs.root) !== null && _this$$refs$root !== void 0 && _this$$refs$root.contains(event.relatedTarget)) && this.isExpanded) {
        this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcher').publishCounterMonitor('header-closed', 1);
        this.isExpanded = false;
      }
    },
    onClickHeader: function onClickHeader(_event) {
      this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcher').publishCounterMonitor("header-".concat(this.isExpanded ? 'closed' : 'opened'), 1);
      this.isExpanded = !this.isExpanded;
    },
    onClickFallbackLink: function onClickFallbackLink() {
      this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcher').publishCounterMonitor('fallback-link.click', 1);
    }
  },
  mounted: function mounted() {
    var metricPublisher = this.$metrics.newChildActionPublisherForMethod('DropdownAccountSwitcher');
    metricPublisher.publishCounterMonitor("mounted.mode-".concat(this.mode), 1);
    metricPublisher.publishCounterMonitor("mounted.nature-".concat(this.nature || 'NONE'), 1);
    switch (this.mode) {
      case constants_AccountSwitcherModes.GlobalOnly:
        useGlobalAccountStore().loadGlobalAccount();
        break;
      case constants_AccountSwitcherModes.RegionalOnly:
        useRegionalAccountStore().loadRegionalAccount(this.nature);
        break;
      case constants_AccountSwitcherModes.Default:
        useRegionalAccountStore().loadGlobalAndRegionalAccount(this.nature);
        break;
    }
  }
});
;// CONCATENATED MODULE: ./src/js/components/DropdownAccountSwitcher.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/js/components/DropdownAccountSwitcher.vue




;


const DropdownAccountSwitcher_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(DropdownAccountSwitchervue_type_script_lang_js, [['render',DropdownAccountSwitchervue_type_template_id_4ce25adb_scoped_true_render],['__scopeId',"data-v-4ce25adb"]])

/* harmony default export */ const DropdownAccountSwitcher = (DropdownAccountSwitcher_exports_);
;// CONCATENATED MODULE: ./src/js/plugins/monsAppConfigPlugin.js
/**
 * This Vue plugin sets the Mons app and config global properties.
 */
/* harmony default export */ const monsAppConfigPlugin = ({
  install: function install(app, _ref) {
    var monsApp = _ref.monsApp,
      monsConfig = _ref.monsConfig;
    if (monsApp == null && monsConfig != null || monsApp != null && monsConfig == null) {
      throw new Error('data-mons-app and data-mons-config must be specified together!');
    }
    app.config.globalProperties.$monsApp = monsApp;
    app.config.globalProperties.$monsConfig = monsConfig;
  }
});
;// CONCATENATED MODULE: ./src/js/plugins/errorHandlerPlugin.js


/* istanbul ignore file */

function globalErrorHandler(error) {
  var publisher = getMetricsPublisher().newChildActionPublisherForMethod('GlobalErrorHandler');
  publisher.publishCounterMonitor('error', 1);
  publisher.publishStringTruncate('errorMessage', error.toString());
}
/* harmony default export */ const errorHandlerPlugin = ({
  install: function install(app) {
    app.config.errorHandler = globalErrorHandler;
  }
});
;// CONCATENATED MODULE: ./src/js/plugins/katalMetricsPlugin.js


/* istanbul ignore file */

/* harmony default export */ const katalMetricsPlugin = ({
  install: function install(app) {
    app.config.globalProperties.$metrics = getMetricsPublisher();
  }
});
;// CONCATENATED MODULE: ./src/js/plugins/sharedMetricsPlugin.js
/**
 * This Vue plugin sets timestamps for shared metrics values
 */
/* harmony default export */ const sharedMetricsPlugin = ({
  install: function install(app, _ref) {
    var initializationTimestamp = _ref.initializationTimestamp,
      pickerType = _ref.pickerType;
    app.config.globalProperties.$pickerInitialization = initializationTimestamp;
    app.config.globalProperties.$pickerType = pickerType;
  }
});
;// CONCATENATED MODULE: ./node_modules/@intlify/shared/dist/shared.mjs
/*!
  * shared v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
/**
 * Original Utilities
 * written by kazuya kawaguchi
 */
const inBrowser = typeof window !== 'undefined';
let mark;
let measure;
if ((false)) {}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
/* eslint-disable */
function shared_format(message, ...args) {
    if (args.length === 1 && shared_isObject(args[0])) {
        args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
        args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
        return args.hasOwnProperty(identifier) ? args[identifier] : '';
    });
}
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/\u0027/g, '\\u0027');
const isNumber = (val) => typeof val === 'number' && isFinite(val);
const shared_isDate = (val) => shared_toTypeString(val) === '[object Date]';
const shared_isRegExp = (val) => shared_toTypeString(val) === '[object RegExp]';
const isEmptyObject = (val) => shared_isPlainObject(val) && Object.keys(val).length === 0;
const shared_assign = Object.assign;
let shared_globalThis;
const shared_getGlobalThis = () => {
    // prettier-ignore
    return (shared_globalThis ||
        (shared_globalThis =
            typeof globalThis !== 'undefined'
                ? globalThis
                : typeof self !== 'undefined'
                    ? self
                    : typeof window !== 'undefined'
                        ? window
                        : typeof __webpack_require__.g !== 'undefined'
                            ? __webpack_require__.g
                            : {}));
};
function shared_escapeHtml(rawText) {
    return rawText
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
const shared_hasOwnProperty = Object.prototype.hasOwnProperty;
function shared_hasOwn(obj, key) {
    return shared_hasOwnProperty.call(obj, key);
}
/* eslint-enable */
/**
 * Useful Utilities By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */
const shared_isArray = Array.isArray;
const shared_isFunction = (val) => typeof val === 'function';
const shared_isString = (val) => typeof val === 'string';
const shared_isBoolean = (val) => typeof val === 'boolean';
const shared_isSymbol = (val) => typeof val === 'symbol';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shared_isObject = (val) => val !== null && typeof val === 'object';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shared_isPromise = (val) => {
    return shared_isObject(val) && shared_isFunction(val.then) && shared_isFunction(val.catch);
};
const shared_objectToString = Object.prototype.toString;
const shared_toTypeString = (value) => shared_objectToString.call(value);
const shared_isPlainObject = (val) => {
    if (!shared_isObject(val))
        return false;
    const proto = Object.getPrototypeOf(val);
    return proto === null || proto.constructor === Object;
};
// for converting list and named values to displayed strings.
const shared_toDisplayString = (val) => {
    return val == null
        ? ''
        : shared_isArray(val) || (shared_isPlainObject(val) && val.toString === shared_objectToString)
            ? JSON.stringify(val, null, 2)
            : String(val);
};
function join(items, separator = '') {
    return items.reduce((str, item, index) => (index === 0 ? str + item : str + separator + item), '');
}
const RANGE = 2;
function shared_generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(3 - String(line).length)}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                }
                else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}
function incrementer(code) {
    let current = code;
    return () => ++current;
}

function shared_warn(msg, err) {
    if (typeof console !== 'undefined') {
        console.warn(`[intlify] ` + msg);
        /* istanbul ignore if */
        if (err) {
            console.warn(err.stack);
        }
    }
}
const shared_hasWarned = {};
function warnOnce(msg) {
    if (!shared_hasWarned[msg]) {
        shared_hasWarned[msg] = true;
        shared_warn(msg);
    }
}

/**
 * Event emitter, forked from the below:
 * - original repository url: https://github.com/developit/mitt
 * - code url: https://github.com/developit/mitt/blob/master/src/index.ts
 * - author: Jason Miller (https://github.com/developit)
 * - license: MIT
 */
/**
 * Create a event emitter
 *
 * @returns An event emitter
 */
function createEmitter() {
    const events = new Map();
    const emitter = {
        events,
        on(event, handler) {
            const handlers = events.get(event);
            const added = handlers && handlers.push(handler);
            if (!added) {
                events.set(event, [handler]);
            }
        },
        off(event, handler) {
            const handlers = events.get(event);
            if (handlers) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            }
        },
        emit(event, payload) {
            (events.get(event) || [])
                .slice()
                .map(handler => handler(payload));
            (events.get('*') || [])
                .slice()
                .map(handler => handler(event, payload));
        }
    };
    return emitter;
}

const isNotObjectOrIsArray = (val) => !shared_isObject(val) || shared_isArray(val);
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function deepCopy(src, des) {
    // src and des should both be objects, and none of them can be a array
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
        throw new Error('Invalid value');
    }
    const stack = [{ src, des }];
    while (stack.length) {
        const { src, des } = stack.pop();
        Object.keys(src).forEach(key => {
            if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
                // replace with src[key] when:
                // src[key] or des[key] is not an object, or
                // src[key] or des[key] is an array
                des[key] = src[key];
            }
            else {
                // src[key] and des[key] are both objects, merge them
                stack.push({ src: src[key], des: des[key] });
            }
        });
    }
}



;// CONCATENATED MODULE: ./node_modules/@intlify/message-compiler/dist/message-compiler.esm-browser.js
/*!
  * message-compiler v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const LOCATION_STUB = {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 1, offset: 0 }
};
function createPosition(line, column, offset) {
    return { line, column, offset };
}
function createLocation(start, end, source) {
    const loc = { start, end };
    if (source != null) {
        loc.source = source;
    }
    return loc;
}

/**
 * Original Utilities
 * written by kazuya kawaguchi
 */
const message_compiler_esm_browser_RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
/* eslint-disable */
function message_compiler_esm_browser_format(message, ...args) {
    if (args.length === 1 && message_compiler_esm_browser_isObject(args[0])) {
        args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
        args = {};
    }
    return message.replace(message_compiler_esm_browser_RE_ARGS, (match, identifier) => {
        return args.hasOwnProperty(identifier) ? args[identifier] : '';
    });
}
const message_compiler_esm_browser_assign = Object.assign;
const message_compiler_esm_browser_isString = (val) => typeof val === 'string';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const message_compiler_esm_browser_isObject = (val) => val !== null && typeof val === 'object';
function message_compiler_esm_browser_join(items, separator = '') {
    return items.reduce((str, item, index) => (index === 0 ? str + item : str + separator + item), '');
}

const CompileErrorCodes = {
    // tokenizer error codes
    EXPECTED_TOKEN: 1,
    INVALID_TOKEN_IN_PLACEHOLDER: 2,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
    UNKNOWN_ESCAPE_SEQUENCE: 4,
    INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
    UNBALANCED_CLOSING_BRACE: 6,
    UNTERMINATED_CLOSING_BRACE: 7,
    EMPTY_PLACEHOLDER: 8,
    NOT_ALLOW_NEST_PLACEHOLDER: 9,
    INVALID_LINKED_FORMAT: 10,
    // parser error codes
    MUST_HAVE_MESSAGES_IN_PLURAL: 11,
    UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
    UNEXPECTED_EMPTY_LINKED_KEY: 13,
    UNEXPECTED_LEXICAL_ANALYSIS: 14,
    // generator error codes
    UNHANDLED_CODEGEN_NODE_TYPE: 15,
    // minifier error codes
    UNHANDLED_MINIFIER_NODE_TYPE: 16,
    // Special value for higher-order compilers to pick up the last code
    // to avoid collision of error codes. This should always be kept as the last
    // item.
    __EXTEND_POINT__: 17
};
/** @internal */
const errorMessages = {
    // tokenizer error messages
    [CompileErrorCodes.EXPECTED_TOKEN]: `Expected token: '{0}'`,
    [CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER]: `Invalid token in placeholder: '{0}'`,
    [CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: `Unterminated single quote in placeholder`,
    [CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE]: `Unknown escape sequence: \\{0}`,
    [CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE]: `Invalid unicode escape sequence: {0}`,
    [CompileErrorCodes.UNBALANCED_CLOSING_BRACE]: `Unbalanced closing brace`,
    [CompileErrorCodes.UNTERMINATED_CLOSING_BRACE]: `Unterminated closing brace`,
    [CompileErrorCodes.EMPTY_PLACEHOLDER]: `Empty placeholder`,
    [CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER]: `Not allowed nest placeholder`,
    [CompileErrorCodes.INVALID_LINKED_FORMAT]: `Invalid linked format`,
    // parser error messages
    [CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL]: `Plural must have messages`,
    [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER]: `Unexpected empty linked modifier`,
    [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY]: `Unexpected empty linked key`,
    [CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS]: `Unexpected lexical analysis in token: '{0}'`,
    // generator error messages
    [CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE]: `unhandled codegen node type: '{0}'`,
    // minimizer error messages
    [CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE]: `unhandled mimifier node type: '{0}'`
};
function createCompileError(code, loc, options = {}) {
    const { domain, messages, args } = options;
    const msg = message_compiler_esm_browser_format((messages || errorMessages)[code] || '', ...(args || []))
        ;
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) {
        error.location = loc;
    }
    error.domain = domain;
    return error;
}
/** @internal */
function defaultOnError(error) {
    throw error;
}

// eslint-disable-next-line no-useless-escape
const RE_HTML_TAG = /<\/?[\w\s="/.':;#-\/]+>/;
const message_compiler_esm_browser_detectHtmlTag = (source) => RE_HTML_TAG.test(source);

const CHAR_SP = ' ';
const CHAR_CR = '\r';
const CHAR_LF = '\n';
const CHAR_LS = String.fromCharCode(0x2028);
const CHAR_PS = String.fromCharCode(0x2029);
function createScanner(str) {
    const _buf = str;
    let _index = 0;
    let _line = 1;
    let _column = 1;
    let _peekOffset = 0;
    const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
    const isLF = (index) => _buf[index] === CHAR_LF;
    const isPS = (index) => _buf[index] === CHAR_PS;
    const isLS = (index) => _buf[index] === CHAR_LS;
    const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
    const index = () => _index;
    const line = () => _line;
    const column = () => _column;
    const peekOffset = () => _peekOffset;
    const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
    const currentChar = () => charAt(_index);
    const currentPeek = () => charAt(_index + _peekOffset);
    function next() {
        _peekOffset = 0;
        if (isLineEnd(_index)) {
            _line++;
            _column = 0;
        }
        if (isCRLF(_index)) {
            _index++;
        }
        _index++;
        _column++;
        return _buf[_index];
    }
    function peek() {
        if (isCRLF(_index + _peekOffset)) {
            _peekOffset++;
        }
        _peekOffset++;
        return _buf[_index + _peekOffset];
    }
    function reset() {
        _index = 0;
        _line = 1;
        _column = 1;
        _peekOffset = 0;
    }
    function resetPeek(offset = 0) {
        _peekOffset = offset;
    }
    function skipToPeek() {
        const target = _index + _peekOffset;
        // eslint-disable-next-line no-unmodified-loop-condition
        while (target !== _index) {
            next();
        }
        _peekOffset = 0;
    }
    return {
        index,
        line,
        column,
        peekOffset,
        charAt,
        currentChar,
        currentPeek,
        next,
        peek,
        reset,
        resetPeek,
        skipToPeek
    };
}

const EOF = undefined;
const DOT = '.';
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = 'tokenizer';
function createTokenizer(source, options = {}) {
    const location = options.location !== false;
    const _scnr = createScanner(source);
    const currentOffset = () => _scnr.index();
    const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
    const _initLoc = currentPosition();
    const _initOffset = currentOffset();
    const _context = {
        currentType: 14 /* TokenTypes.EOF */,
        offset: _initOffset,
        startLoc: _initLoc,
        endLoc: _initLoc,
        lastType: 14 /* TokenTypes.EOF */,
        lastOffset: _initOffset,
        lastStartLoc: _initLoc,
        lastEndLoc: _initLoc,
        braceNest: 0,
        inLinked: false,
        text: ''
    };
    const context = () => _context;
    const { onError } = options;
    function emitError(code, pos, offset, ...args) {
        const ctx = context();
        pos.column += offset;
        pos.offset += offset;
        if (onError) {
            const loc = location ? createLocation(ctx.startLoc, pos) : null;
            const err = createCompileError(code, loc, {
                domain: ERROR_DOMAIN$3,
                args
            });
            onError(err);
        }
    }
    function getToken(context, type, value) {
        context.endLoc = currentPosition();
        context.currentType = type;
        const token = { type };
        if (location) {
            token.loc = createLocation(context.startLoc, context.endLoc);
        }
        if (value != null) {
            token.value = value;
        }
        return token;
    }
    const getEndToken = (context) => getToken(context, 14 /* TokenTypes.EOF */);
    function eat(scnr, ch) {
        if (scnr.currentChar() === ch) {
            scnr.next();
            return ch;
        }
        else {
            emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
            return '';
        }
    }
    function peekSpaces(scnr) {
        let buf = '';
        while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
            buf += scnr.currentPeek();
            scnr.peek();
        }
        return buf;
    }
    function skipSpaces(scnr) {
        const buf = peekSpaces(scnr);
        scnr.skipToPeek();
        return buf;
    }
    function isIdentifierStart(ch) {
        if (ch === EOF) {
            return false;
        }
        const cc = ch.charCodeAt(0);
        return ((cc >= 97 && cc <= 122) || // a-z
            (cc >= 65 && cc <= 90) || // A-Z
            cc === 95 // _
        );
    }
    function isNumberStart(ch) {
        if (ch === EOF) {
            return false;
        }
        const cc = ch.charCodeAt(0);
        return cc >= 48 && cc <= 57; // 0-9
    }
    function isNamedIdentifierStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 2 /* TokenTypes.BraceLeft */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = isIdentifierStart(scnr.currentPeek());
        scnr.resetPeek();
        return ret;
    }
    function isListIdentifierStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 2 /* TokenTypes.BraceLeft */) {
            return false;
        }
        peekSpaces(scnr);
        const ch = scnr.currentPeek() === '-' ? scnr.peek() : scnr.currentPeek();
        const ret = isNumberStart(ch);
        scnr.resetPeek();
        return ret;
    }
    function isLiteralStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 2 /* TokenTypes.BraceLeft */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === LITERAL_DELIMITER;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedDotStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 8 /* TokenTypes.LinkedAlias */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === "." /* TokenChars.LinkedDot */;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedModifierStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 9 /* TokenTypes.LinkedDot */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = isIdentifierStart(scnr.currentPeek());
        scnr.resetPeek();
        return ret;
    }
    function isLinkedDelimiterStart(scnr, context) {
        const { currentType } = context;
        if (!(currentType === 8 /* TokenTypes.LinkedAlias */ ||
            currentType === 12 /* TokenTypes.LinkedModifier */)) {
            return false;
        }
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === ":" /* TokenChars.LinkedDelimiter */;
        scnr.resetPeek();
        return ret;
    }
    function isLinkedReferStart(scnr, context) {
        const { currentType } = context;
        if (currentType !== 10 /* TokenTypes.LinkedDelimiter */) {
            return false;
        }
        const fn = () => {
            const ch = scnr.currentPeek();
            if (ch === "{" /* TokenChars.BraceLeft */) {
                return isIdentifierStart(scnr.peek());
            }
            else if (ch === "@" /* TokenChars.LinkedAlias */ ||
                ch === "%" /* TokenChars.Modulo */ ||
                ch === "|" /* TokenChars.Pipe */ ||
                ch === ":" /* TokenChars.LinkedDelimiter */ ||
                ch === "." /* TokenChars.LinkedDot */ ||
                ch === CHAR_SP ||
                !ch) {
                return false;
            }
            else if (ch === CHAR_LF) {
                scnr.peek();
                return fn();
            }
            else {
                // other characters
                return isIdentifierStart(ch);
            }
        };
        const ret = fn();
        scnr.resetPeek();
        return ret;
    }
    function isPluralStart(scnr) {
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === "|" /* TokenChars.Pipe */;
        scnr.resetPeek();
        return ret;
    }
    function detectModuloStart(scnr) {
        const spaces = peekSpaces(scnr);
        const ret = scnr.currentPeek() === "%" /* TokenChars.Modulo */ &&
            scnr.peek() === "{" /* TokenChars.BraceLeft */;
        scnr.resetPeek();
        return {
            isModulo: ret,
            hasSpace: spaces.length > 0
        };
    }
    function isTextStart(scnr, reset = true) {
        const fn = (hasSpace = false, prev = '', detectModulo = false) => {
            const ch = scnr.currentPeek();
            if (ch === "{" /* TokenChars.BraceLeft */) {
                return prev === "%" /* TokenChars.Modulo */ ? false : hasSpace;
            }
            else if (ch === "@" /* TokenChars.LinkedAlias */ || !ch) {
                return prev === "%" /* TokenChars.Modulo */ ? true : hasSpace;
            }
            else if (ch === "%" /* TokenChars.Modulo */) {
                scnr.peek();
                return fn(hasSpace, "%" /* TokenChars.Modulo */, true);
            }
            else if (ch === "|" /* TokenChars.Pipe */) {
                return prev === "%" /* TokenChars.Modulo */ || detectModulo
                    ? true
                    : !(prev === CHAR_SP || prev === CHAR_LF);
            }
            else if (ch === CHAR_SP) {
                scnr.peek();
                return fn(true, CHAR_SP, detectModulo);
            }
            else if (ch === CHAR_LF) {
                scnr.peek();
                return fn(true, CHAR_LF, detectModulo);
            }
            else {
                return true;
            }
        };
        const ret = fn();
        reset && scnr.resetPeek();
        return ret;
    }
    function takeChar(scnr, fn) {
        const ch = scnr.currentChar();
        if (ch === EOF) {
            return EOF;
        }
        if (fn(ch)) {
            scnr.next();
            return ch;
        }
        return null;
    }
    function takeIdentifierChar(scnr) {
        const closure = (ch) => {
            const cc = ch.charCodeAt(0);
            return ((cc >= 97 && cc <= 122) || // a-z
                (cc >= 65 && cc <= 90) || // A-Z
                (cc >= 48 && cc <= 57) || // 0-9
                cc === 95 || // _
                cc === 36 // $
            );
        };
        return takeChar(scnr, closure);
    }
    function takeDigit(scnr) {
        const closure = (ch) => {
            const cc = ch.charCodeAt(0);
            return cc >= 48 && cc <= 57; // 0-9
        };
        return takeChar(scnr, closure);
    }
    function takeHexDigit(scnr) {
        const closure = (ch) => {
            const cc = ch.charCodeAt(0);
            return ((cc >= 48 && cc <= 57) || // 0-9
                (cc >= 65 && cc <= 70) || // A-F
                (cc >= 97 && cc <= 102)); // a-f
        };
        return takeChar(scnr, closure);
    }
    function getDigits(scnr) {
        let ch = '';
        let num = '';
        while ((ch = takeDigit(scnr))) {
            num += ch;
        }
        return num;
    }
    function readModulo(scnr) {
        skipSpaces(scnr);
        const ch = scnr.currentChar();
        if (ch !== "%" /* TokenChars.Modulo */) {
            emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
        }
        scnr.next();
        return "%" /* TokenChars.Modulo */;
    }
    function readText(scnr) {
        let buf = '';
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const ch = scnr.currentChar();
            if (ch === "{" /* TokenChars.BraceLeft */ ||
                ch === "}" /* TokenChars.BraceRight */ ||
                ch === "@" /* TokenChars.LinkedAlias */ ||
                ch === "|" /* TokenChars.Pipe */ ||
                !ch) {
                break;
            }
            else if (ch === "%" /* TokenChars.Modulo */) {
                if (isTextStart(scnr)) {
                    buf += ch;
                    scnr.next();
                }
                else {
                    break;
                }
            }
            else if (ch === CHAR_SP || ch === CHAR_LF) {
                if (isTextStart(scnr)) {
                    buf += ch;
                    scnr.next();
                }
                else if (isPluralStart(scnr)) {
                    break;
                }
                else {
                    buf += ch;
                    scnr.next();
                }
            }
            else {
                buf += ch;
                scnr.next();
            }
        }
        return buf;
    }
    function readNamedIdentifier(scnr) {
        skipSpaces(scnr);
        let ch = '';
        let name = '';
        while ((ch = takeIdentifierChar(scnr))) {
            name += ch;
        }
        if (scnr.currentChar() === EOF) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        return name;
    }
    function readListIdentifier(scnr) {
        skipSpaces(scnr);
        let value = '';
        if (scnr.currentChar() === '-') {
            scnr.next();
            value += `-${getDigits(scnr)}`;
        }
        else {
            value += getDigits(scnr);
        }
        if (scnr.currentChar() === EOF) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        return value;
    }
    function readLiteral(scnr) {
        skipSpaces(scnr);
        // eslint-disable-next-line no-useless-escape
        eat(scnr, `\'`);
        let ch = '';
        let literal = '';
        const fn = (x) => x !== LITERAL_DELIMITER && x !== CHAR_LF;
        while ((ch = takeChar(scnr, fn))) {
            if (ch === '\\') {
                literal += readEscapeSequence(scnr);
            }
            else {
                literal += ch;
            }
        }
        const current = scnr.currentChar();
        if (current === CHAR_LF || current === EOF) {
            emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
            // TODO: Is it correct really?
            if (current === CHAR_LF) {
                scnr.next();
                // eslint-disable-next-line no-useless-escape
                eat(scnr, `\'`);
            }
            return literal;
        }
        // eslint-disable-next-line no-useless-escape
        eat(scnr, `\'`);
        return literal;
    }
    function readEscapeSequence(scnr) {
        const ch = scnr.currentChar();
        switch (ch) {
            case '\\':
            case `\'`: // eslint-disable-line no-useless-escape
                scnr.next();
                return `\\${ch}`;
            case 'u':
                return readUnicodeEscapeSequence(scnr, ch, 4);
            case 'U':
                return readUnicodeEscapeSequence(scnr, ch, 6);
            default:
                emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
                return '';
        }
    }
    function readUnicodeEscapeSequence(scnr, unicode, digits) {
        eat(scnr, unicode);
        let sequence = '';
        for (let i = 0; i < digits; i++) {
            const ch = takeHexDigit(scnr);
            if (!ch) {
                emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
                break;
            }
            sequence += ch;
        }
        return `\\${unicode}${sequence}`;
    }
    function readInvalidIdentifier(scnr) {
        skipSpaces(scnr);
        let ch = '';
        let identifiers = '';
        const closure = (ch) => ch !== "{" /* TokenChars.BraceLeft */ &&
            ch !== "}" /* TokenChars.BraceRight */ &&
            ch !== CHAR_SP &&
            ch !== CHAR_LF;
        while ((ch = takeChar(scnr, closure))) {
            identifiers += ch;
        }
        return identifiers;
    }
    function readLinkedModifier(scnr) {
        let ch = '';
        let name = '';
        while ((ch = takeIdentifierChar(scnr))) {
            name += ch;
        }
        return name;
    }
    function readLinkedRefer(scnr) {
        const fn = (detect = false, buf) => {
            const ch = scnr.currentChar();
            if (ch === "{" /* TokenChars.BraceLeft */ ||
                ch === "%" /* TokenChars.Modulo */ ||
                ch === "@" /* TokenChars.LinkedAlias */ ||
                ch === "|" /* TokenChars.Pipe */ ||
                ch === "(" /* TokenChars.ParenLeft */ ||
                ch === ")" /* TokenChars.ParenRight */ ||
                !ch) {
                return buf;
            }
            else if (ch === CHAR_SP) {
                return buf;
            }
            else if (ch === CHAR_LF || ch === DOT) {
                buf += ch;
                scnr.next();
                return fn(detect, buf);
            }
            else {
                buf += ch;
                scnr.next();
                return fn(true, buf);
            }
        };
        return fn(false, '');
    }
    function readPlural(scnr) {
        skipSpaces(scnr);
        const plural = eat(scnr, "|" /* TokenChars.Pipe */);
        skipSpaces(scnr);
        return plural;
    }
    // TODO: We need refactoring of token parsing ...
    function readTokenInPlaceholder(scnr, context) {
        let token = null;
        const ch = scnr.currentChar();
        switch (ch) {
            case "{" /* TokenChars.BraceLeft */:
                if (context.braceNest >= 1) {
                    emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
                }
                scnr.next();
                token = getToken(context, 2 /* TokenTypes.BraceLeft */, "{" /* TokenChars.BraceLeft */);
                skipSpaces(scnr);
                context.braceNest++;
                return token;
            case "}" /* TokenChars.BraceRight */:
                if (context.braceNest > 0 &&
                    context.currentType === 2 /* TokenTypes.BraceLeft */) {
                    emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
                }
                scnr.next();
                token = getToken(context, 3 /* TokenTypes.BraceRight */, "}" /* TokenChars.BraceRight */);
                context.braceNest--;
                context.braceNest > 0 && skipSpaces(scnr);
                if (context.inLinked && context.braceNest === 0) {
                    context.inLinked = false;
                }
                return token;
            case "@" /* TokenChars.LinkedAlias */:
                if (context.braceNest > 0) {
                    emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
                }
                token = readTokenInLinked(scnr, context) || getEndToken(context);
                context.braceNest = 0;
                return token;
            default: {
                let validNamedIdentifier = true;
                let validListIdentifier = true;
                let validLiteral = true;
                if (isPluralStart(scnr)) {
                    if (context.braceNest > 0) {
                        emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
                    }
                    token = getToken(context, 1 /* TokenTypes.Pipe */, readPlural(scnr));
                    // reset
                    context.braceNest = 0;
                    context.inLinked = false;
                    return token;
                }
                if (context.braceNest > 0 &&
                    (context.currentType === 5 /* TokenTypes.Named */ ||
                        context.currentType === 6 /* TokenTypes.List */ ||
                        context.currentType === 7 /* TokenTypes.Literal */)) {
                    emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
                    context.braceNest = 0;
                    return readToken(scnr, context);
                }
                if ((validNamedIdentifier = isNamedIdentifierStart(scnr, context))) {
                    token = getToken(context, 5 /* TokenTypes.Named */, readNamedIdentifier(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if ((validListIdentifier = isListIdentifierStart(scnr, context))) {
                    token = getToken(context, 6 /* TokenTypes.List */, readListIdentifier(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if ((validLiteral = isLiteralStart(scnr, context))) {
                    token = getToken(context, 7 /* TokenTypes.Literal */, readLiteral(scnr));
                    skipSpaces(scnr);
                    return token;
                }
                if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
                    // TODO: we should be re-designed invalid cases, when we will extend message syntax near the future ...
                    token = getToken(context, 13 /* TokenTypes.InvalidPlace */, readInvalidIdentifier(scnr));
                    emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
                    skipSpaces(scnr);
                    return token;
                }
                break;
            }
        }
        return token;
    }
    // TODO: We need refactoring of token parsing ...
    function readTokenInLinked(scnr, context) {
        const { currentType } = context;
        let token = null;
        const ch = scnr.currentChar();
        if ((currentType === 8 /* TokenTypes.LinkedAlias */ ||
            currentType === 9 /* TokenTypes.LinkedDot */ ||
            currentType === 12 /* TokenTypes.LinkedModifier */ ||
            currentType === 10 /* TokenTypes.LinkedDelimiter */) &&
            (ch === CHAR_LF || ch === CHAR_SP)) {
            emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        switch (ch) {
            case "@" /* TokenChars.LinkedAlias */:
                scnr.next();
                token = getToken(context, 8 /* TokenTypes.LinkedAlias */, "@" /* TokenChars.LinkedAlias */);
                context.inLinked = true;
                return token;
            case "." /* TokenChars.LinkedDot */:
                skipSpaces(scnr);
                scnr.next();
                return getToken(context, 9 /* TokenTypes.LinkedDot */, "." /* TokenChars.LinkedDot */);
            case ":" /* TokenChars.LinkedDelimiter */:
                skipSpaces(scnr);
                scnr.next();
                return getToken(context, 10 /* TokenTypes.LinkedDelimiter */, ":" /* TokenChars.LinkedDelimiter */);
            default:
                if (isPluralStart(scnr)) {
                    token = getToken(context, 1 /* TokenTypes.Pipe */, readPlural(scnr));
                    // reset
                    context.braceNest = 0;
                    context.inLinked = false;
                    return token;
                }
                if (isLinkedDotStart(scnr, context) ||
                    isLinkedDelimiterStart(scnr, context)) {
                    skipSpaces(scnr);
                    return readTokenInLinked(scnr, context);
                }
                if (isLinkedModifierStart(scnr, context)) {
                    skipSpaces(scnr);
                    return getToken(context, 12 /* TokenTypes.LinkedModifier */, readLinkedModifier(scnr));
                }
                if (isLinkedReferStart(scnr, context)) {
                    skipSpaces(scnr);
                    if (ch === "{" /* TokenChars.BraceLeft */) {
                        // scan the placeholder
                        return readTokenInPlaceholder(scnr, context) || token;
                    }
                    else {
                        return getToken(context, 11 /* TokenTypes.LinkedKey */, readLinkedRefer(scnr));
                    }
                }
                if (currentType === 8 /* TokenTypes.LinkedAlias */) {
                    emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
                }
                context.braceNest = 0;
                context.inLinked = false;
                return readToken(scnr, context);
        }
    }
    // TODO: We need refactoring of token parsing ...
    function readToken(scnr, context) {
        let token = { type: 14 /* TokenTypes.EOF */ };
        if (context.braceNest > 0) {
            return readTokenInPlaceholder(scnr, context) || getEndToken(context);
        }
        if (context.inLinked) {
            return readTokenInLinked(scnr, context) || getEndToken(context);
        }
        const ch = scnr.currentChar();
        switch (ch) {
            case "{" /* TokenChars.BraceLeft */:
                return readTokenInPlaceholder(scnr, context) || getEndToken(context);
            case "}" /* TokenChars.BraceRight */:
                emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
                scnr.next();
                return getToken(context, 3 /* TokenTypes.BraceRight */, "}" /* TokenChars.BraceRight */);
            case "@" /* TokenChars.LinkedAlias */:
                return readTokenInLinked(scnr, context) || getEndToken(context);
            default: {
                if (isPluralStart(scnr)) {
                    token = getToken(context, 1 /* TokenTypes.Pipe */, readPlural(scnr));
                    // reset
                    context.braceNest = 0;
                    context.inLinked = false;
                    return token;
                }
                const { isModulo, hasSpace } = detectModuloStart(scnr);
                if (isModulo) {
                    return hasSpace
                        ? getToken(context, 0 /* TokenTypes.Text */, readText(scnr))
                        : getToken(context, 4 /* TokenTypes.Modulo */, readModulo(scnr));
                }
                if (isTextStart(scnr)) {
                    return getToken(context, 0 /* TokenTypes.Text */, readText(scnr));
                }
                break;
            }
        }
        return token;
    }
    function nextToken() {
        const { currentType, offset, startLoc, endLoc } = _context;
        _context.lastType = currentType;
        _context.lastOffset = offset;
        _context.lastStartLoc = startLoc;
        _context.lastEndLoc = endLoc;
        _context.offset = currentOffset();
        _context.startLoc = currentPosition();
        if (_scnr.currentChar() === EOF) {
            return getToken(_context, 14 /* TokenTypes.EOF */);
        }
        return readToken(_scnr, _context);
    }
    return {
        nextToken,
        currentOffset,
        currentPosition,
        context
    };
}

const ERROR_DOMAIN$2 = 'parser';
// Backslash backslash, backslash quote, uHHHH, UHHHHHH.
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
    switch (match) {
        case `\\\\`:
            return `\\`;
        // eslint-disable-next-line no-useless-escape
        case `\\\'`:
            // eslint-disable-next-line no-useless-escape
            return `\'`;
        default: {
            const codePoint = parseInt(codePoint4 || codePoint6, 16);
            if (codePoint <= 0xd7ff || codePoint >= 0xe000) {
                return String.fromCodePoint(codePoint);
            }
            // invalid ...
            // Replace them with U+FFFD REPLACEMENT CHARACTER.
            return '�';
        }
    }
}
function createParser(options = {}) {
    const location = options.location !== false;
    const { onError } = options;
    function emitError(tokenzer, code, start, offset, ...args) {
        const end = tokenzer.currentPosition();
        end.offset += offset;
        end.column += offset;
        if (onError) {
            const loc = location ? createLocation(start, end) : null;
            const err = createCompileError(code, loc, {
                domain: ERROR_DOMAIN$2,
                args
            });
            onError(err);
        }
    }
    function startNode(type, offset, loc) {
        const node = { type };
        if (location) {
            node.start = offset;
            node.end = offset;
            node.loc = { start: loc, end: loc };
        }
        return node;
    }
    function endNode(node, offset, pos, type) {
        if (type) {
            node.type = type;
        }
        if (location) {
            node.end = offset;
            if (node.loc) {
                node.loc.end = pos;
            }
        }
    }
    function parseText(tokenizer, value) {
        const context = tokenizer.context();
        const node = startNode(3 /* NodeTypes.Text */, context.offset, context.startLoc);
        node.value = value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseList(tokenizer, index) {
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
        const node = startNode(5 /* NodeTypes.List */, offset, loc);
        node.index = parseInt(index, 10);
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseNamed(tokenizer, key) {
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
        const node = startNode(4 /* NodeTypes.Named */, offset, loc);
        node.key = key;
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLiteral(tokenizer, value) {
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
        const node = startNode(9 /* NodeTypes.Literal */, offset, loc);
        node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLinkedModifier(tokenizer) {
        const token = tokenizer.nextToken();
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get linked dot loc
        const node = startNode(8 /* NodeTypes.LinkedModifier */, offset, loc);
        if (token.type !== 12 /* TokenTypes.LinkedModifier */) {
            // empty modifier
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
            node.value = '';
            endNode(node, offset, loc);
            return {
                nextConsumeToken: token,
                node
            };
        }
        // check token
        if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        node.value = token.value || '';
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return {
            node
        };
    }
    function parseLinkedKey(tokenizer, value) {
        const context = tokenizer.context();
        const node = startNode(7 /* NodeTypes.LinkedKey */, context.offset, context.startLoc);
        node.value = value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseLinked(tokenizer) {
        const context = tokenizer.context();
        const linkedNode = startNode(6 /* NodeTypes.Linked */, context.offset, context.startLoc);
        let token = tokenizer.nextToken();
        if (token.type === 9 /* TokenTypes.LinkedDot */) {
            const parsed = parseLinkedModifier(tokenizer);
            linkedNode.modifier = parsed.node;
            token = parsed.nextConsumeToken || tokenizer.nextToken();
        }
        // asset check token
        if (token.type !== 10 /* TokenTypes.LinkedDelimiter */) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        token = tokenizer.nextToken();
        // skip brace left
        if (token.type === 2 /* TokenTypes.BraceLeft */) {
            token = tokenizer.nextToken();
        }
        switch (token.type) {
            case 11 /* TokenTypes.LinkedKey */:
                if (token.value == null) {
                    emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                }
                linkedNode.key = parseLinkedKey(tokenizer, token.value || '');
                break;
            case 5 /* TokenTypes.Named */:
                if (token.value == null) {
                    emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                }
                linkedNode.key = parseNamed(tokenizer, token.value || '');
                break;
            case 6 /* TokenTypes.List */:
                if (token.value == null) {
                    emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                }
                linkedNode.key = parseList(tokenizer, token.value || '');
                break;
            case 7 /* TokenTypes.Literal */:
                if (token.value == null) {
                    emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                }
                linkedNode.key = parseLiteral(tokenizer, token.value || '');
                break;
            default: {
                // empty key
                emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
                const nextContext = tokenizer.context();
                const emptyLinkedKeyNode = startNode(7 /* NodeTypes.LinkedKey */, nextContext.offset, nextContext.startLoc);
                emptyLinkedKeyNode.value = '';
                endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
                linkedNode.key = emptyLinkedKeyNode;
                endNode(linkedNode, nextContext.offset, nextContext.startLoc);
                return {
                    nextConsumeToken: token,
                    node: linkedNode
                };
            }
        }
        endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
        return {
            node: linkedNode
        };
    }
    function parseMessage(tokenizer) {
        const context = tokenizer.context();
        const startOffset = context.currentType === 1 /* TokenTypes.Pipe */
            ? tokenizer.currentOffset()
            : context.offset;
        const startLoc = context.currentType === 1 /* TokenTypes.Pipe */
            ? context.endLoc
            : context.startLoc;
        const node = startNode(2 /* NodeTypes.Message */, startOffset, startLoc);
        node.items = [];
        let nextToken = null;
        do {
            const token = nextToken || tokenizer.nextToken();
            nextToken = null;
            switch (token.type) {
                case 0 /* TokenTypes.Text */:
                    if (token.value == null) {
                        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                    }
                    node.items.push(parseText(tokenizer, token.value || ''));
                    break;
                case 6 /* TokenTypes.List */:
                    if (token.value == null) {
                        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                    }
                    node.items.push(parseList(tokenizer, token.value || ''));
                    break;
                case 5 /* TokenTypes.Named */:
                    if (token.value == null) {
                        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                    }
                    node.items.push(parseNamed(tokenizer, token.value || ''));
                    break;
                case 7 /* TokenTypes.Literal */:
                    if (token.value == null) {
                        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                    }
                    node.items.push(parseLiteral(tokenizer, token.value || ''));
                    break;
                case 8 /* TokenTypes.LinkedAlias */: {
                    const parsed = parseLinked(tokenizer);
                    node.items.push(parsed.node);
                    nextToken = parsed.nextConsumeToken || null;
                    break;
                }
            }
        } while (context.currentType !== 14 /* TokenTypes.EOF */ &&
            context.currentType !== 1 /* TokenTypes.Pipe */);
        // adjust message node loc
        const endOffset = context.currentType === 1 /* TokenTypes.Pipe */
            ? context.lastOffset
            : tokenizer.currentOffset();
        const endLoc = context.currentType === 1 /* TokenTypes.Pipe */
            ? context.lastEndLoc
            : tokenizer.currentPosition();
        endNode(node, endOffset, endLoc);
        return node;
    }
    function parsePlural(tokenizer, offset, loc, msgNode) {
        const context = tokenizer.context();
        let hasEmptyMessage = msgNode.items.length === 0;
        const node = startNode(1 /* NodeTypes.Plural */, offset, loc);
        node.cases = [];
        node.cases.push(msgNode);
        do {
            const msg = parseMessage(tokenizer);
            if (!hasEmptyMessage) {
                hasEmptyMessage = msg.items.length === 0;
            }
            node.cases.push(msg);
        } while (context.currentType !== 14 /* TokenTypes.EOF */);
        if (hasEmptyMessage) {
            emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
        }
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    function parseResource(tokenizer) {
        const context = tokenizer.context();
        const { offset, startLoc } = context;
        const msgNode = parseMessage(tokenizer);
        if (context.currentType === 14 /* TokenTypes.EOF */) {
            return msgNode;
        }
        else {
            return parsePlural(tokenizer, offset, startLoc, msgNode);
        }
    }
    function parse(source) {
        const tokenizer = createTokenizer(source, message_compiler_esm_browser_assign({}, options));
        const context = tokenizer.context();
        const node = startNode(0 /* NodeTypes.Resource */, context.offset, context.startLoc);
        if (location && node.loc) {
            node.loc.source = source;
        }
        node.body = parseResource(tokenizer);
        if (options.onCacheKey) {
            node.cacheKey = options.onCacheKey(source);
        }
        // assert whether achieved to EOF
        if (context.currentType !== 14 /* TokenTypes.EOF */) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || '');
        }
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    return { parse };
}
function getTokenCaption(token) {
    if (token.type === 14 /* TokenTypes.EOF */) {
        return 'EOF';
    }
    const name = (token.value || '').replace(/\r?\n/gu, '\\n');
    return name.length > 10 ? name.slice(0, 9) + '…' : name;
}

function createTransformer(ast, options = {} // eslint-disable-line
) {
    const _context = {
        ast,
        helpers: new Set()
    };
    const context = () => _context;
    const helper = (name) => {
        _context.helpers.add(name);
        return name;
    };
    return { context, helper };
}
function traverseNodes(nodes, transformer) {
    for (let i = 0; i < nodes.length; i++) {
        traverseNode(nodes[i], transformer);
    }
}
function traverseNode(node, transformer) {
    // TODO: if we need pre-hook of transform, should be implemented to here
    switch (node.type) {
        case 1 /* NodeTypes.Plural */:
            traverseNodes(node.cases, transformer);
            transformer.helper("plural" /* HelperNameMap.PLURAL */);
            break;
        case 2 /* NodeTypes.Message */:
            traverseNodes(node.items, transformer);
            break;
        case 6 /* NodeTypes.Linked */: {
            const linked = node;
            traverseNode(linked.key, transformer);
            transformer.helper("linked" /* HelperNameMap.LINKED */);
            transformer.helper("type" /* HelperNameMap.TYPE */);
            break;
        }
        case 5 /* NodeTypes.List */:
            transformer.helper("interpolate" /* HelperNameMap.INTERPOLATE */);
            transformer.helper("list" /* HelperNameMap.LIST */);
            break;
        case 4 /* NodeTypes.Named */:
            transformer.helper("interpolate" /* HelperNameMap.INTERPOLATE */);
            transformer.helper("named" /* HelperNameMap.NAMED */);
            break;
    }
    // TODO: if we need post-hook of transform, should be implemented to here
}
// transform AST
function transform(ast, options = {} // eslint-disable-line
) {
    const transformer = createTransformer(ast);
    transformer.helper("normalize" /* HelperNameMap.NORMALIZE */);
    // traverse
    ast.body && traverseNode(ast.body, transformer);
    // set meta information
    const context = transformer.context();
    ast.helpers = Array.from(context.helpers);
}

function optimize(ast) {
    const body = ast.body;
    if (body.type === 2 /* NodeTypes.Message */) {
        optimizeMessageNode(body);
    }
    else {
        body.cases.forEach(c => optimizeMessageNode(c));
    }
    return ast;
}
function optimizeMessageNode(message) {
    if (message.items.length === 1) {
        const item = message.items[0];
        if (item.type === 3 /* NodeTypes.Text */ || item.type === 9 /* NodeTypes.Literal */) {
            message.static = item.value;
            delete item.value; // optimization for size
        }
    }
    else {
        const values = [];
        for (let i = 0; i < message.items.length; i++) {
            const item = message.items[i];
            if (!(item.type === 3 /* NodeTypes.Text */ || item.type === 9 /* NodeTypes.Literal */)) {
                break;
            }
            if (item.value == null) {
                break;
            }
            values.push(item.value);
        }
        if (values.length === message.items.length) {
            message.static = message_compiler_esm_browser_join(values);
            for (let i = 0; i < message.items.length; i++) {
                const item = message.items[i];
                if (item.type === 3 /* NodeTypes.Text */ || item.type === 9 /* NodeTypes.Literal */) {
                    delete item.value; // optimization for size
                }
            }
        }
    }
}

const ERROR_DOMAIN$1 = 'minifier';
/* eslint-disable @typescript-eslint/no-explicit-any */
function minify(node) {
    node.t = node.type;
    switch (node.type) {
        case 0 /* NodeTypes.Resource */: {
            const resource = node;
            minify(resource.body);
            resource.b = resource.body;
            delete resource.body;
            break;
        }
        case 1 /* NodeTypes.Plural */: {
            const plural = node;
            const cases = plural.cases;
            for (let i = 0; i < cases.length; i++) {
                minify(cases[i]);
            }
            plural.c = cases;
            delete plural.cases;
            break;
        }
        case 2 /* NodeTypes.Message */: {
            const message = node;
            const items = message.items;
            for (let i = 0; i < items.length; i++) {
                minify(items[i]);
            }
            message.i = items;
            delete message.items;
            if (message.static) {
                message.s = message.static;
                delete message.static;
            }
            break;
        }
        case 3 /* NodeTypes.Text */:
        case 9 /* NodeTypes.Literal */:
        case 8 /* NodeTypes.LinkedModifier */:
        case 7 /* NodeTypes.LinkedKey */: {
            const valueNode = node;
            if (valueNode.value) {
                valueNode.v = valueNode.value;
                delete valueNode.value;
            }
            break;
        }
        case 6 /* NodeTypes.Linked */: {
            const linked = node;
            minify(linked.key);
            linked.k = linked.key;
            delete linked.key;
            if (linked.modifier) {
                minify(linked.modifier);
                linked.m = linked.modifier;
                delete linked.modifier;
            }
            break;
        }
        case 5 /* NodeTypes.List */: {
            const list = node;
            list.i = list.index;
            delete list.index;
            break;
        }
        case 4 /* NodeTypes.Named */: {
            const named = node;
            named.k = named.key;
            delete named.key;
            break;
        }
        default:
            {
                throw createCompileError(CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE, null, {
                    domain: ERROR_DOMAIN$1,
                    args: [node.type]
                });
            }
    }
    delete node.type;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="source-map-js" />
const ERROR_DOMAIN = 'parser';
function createCodeGenerator(ast, options) {
    const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
    const location = options.location !== false;
    const _context = {
        filename,
        code: '',
        column: 1,
        line: 1,
        offset: 0,
        map: undefined,
        breakLineCode,
        needIndent: _needIndent,
        indentLevel: 0
    };
    if (location && ast.loc) {
        _context.source = ast.loc.source;
    }
    const context = () => _context;
    function push(code, node) {
        _context.code += code;
    }
    function _newline(n, withBreakLine = true) {
        const _breakLineCode = withBreakLine ? breakLineCode : '';
        push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
    }
    function indent(withNewLine = true) {
        const level = ++_context.indentLevel;
        withNewLine && _newline(level);
    }
    function deindent(withNewLine = true) {
        const level = --_context.indentLevel;
        withNewLine && _newline(level);
    }
    function newline() {
        _newline(_context.indentLevel);
    }
    const helper = (key) => `_${key}`;
    const needIndent = () => _context.needIndent;
    return {
        context,
        push,
        indent,
        deindent,
        newline,
        helper,
        needIndent
    };
}
function generateLinkedNode(generator, node) {
    const { helper } = generator;
    generator.push(`${helper("linked" /* HelperNameMap.LINKED */)}(`);
    generateNode(generator, node.key);
    if (node.modifier) {
        generator.push(`, `);
        generateNode(generator, node.modifier);
        generator.push(`, _type`);
    }
    else {
        generator.push(`, undefined, _type`);
    }
    generator.push(`)`);
}
function generateMessageNode(generator, node) {
    const { helper, needIndent } = generator;
    generator.push(`${helper("normalize" /* HelperNameMap.NORMALIZE */)}([`);
    generator.indent(needIndent());
    const length = node.items.length;
    for (let i = 0; i < length; i++) {
        generateNode(generator, node.items[i]);
        if (i === length - 1) {
            break;
        }
        generator.push(', ');
    }
    generator.deindent(needIndent());
    generator.push('])');
}
function generatePluralNode(generator, node) {
    const { helper, needIndent } = generator;
    if (node.cases.length > 1) {
        generator.push(`${helper("plural" /* HelperNameMap.PLURAL */)}([`);
        generator.indent(needIndent());
        const length = node.cases.length;
        for (let i = 0; i < length; i++) {
            generateNode(generator, node.cases[i]);
            if (i === length - 1) {
                break;
            }
            generator.push(', ');
        }
        generator.deindent(needIndent());
        generator.push(`])`);
    }
}
function generateResource(generator, node) {
    if (node.body) {
        generateNode(generator, node.body);
    }
    else {
        generator.push('null');
    }
}
function generateNode(generator, node) {
    const { helper } = generator;
    switch (node.type) {
        case 0 /* NodeTypes.Resource */:
            generateResource(generator, node);
            break;
        case 1 /* NodeTypes.Plural */:
            generatePluralNode(generator, node);
            break;
        case 2 /* NodeTypes.Message */:
            generateMessageNode(generator, node);
            break;
        case 6 /* NodeTypes.Linked */:
            generateLinkedNode(generator, node);
            break;
        case 8 /* NodeTypes.LinkedModifier */:
            generator.push(JSON.stringify(node.value), node);
            break;
        case 7 /* NodeTypes.LinkedKey */:
            generator.push(JSON.stringify(node.value), node);
            break;
        case 5 /* NodeTypes.List */:
            generator.push(`${helper("interpolate" /* HelperNameMap.INTERPOLATE */)}(${helper("list" /* HelperNameMap.LIST */)}(${node.index}))`, node);
            break;
        case 4 /* NodeTypes.Named */:
            generator.push(`${helper("interpolate" /* HelperNameMap.INTERPOLATE */)}(${helper("named" /* HelperNameMap.NAMED */)}(${JSON.stringify(node.key)}))`, node);
            break;
        case 9 /* NodeTypes.Literal */:
            generator.push(JSON.stringify(node.value), node);
            break;
        case 3 /* NodeTypes.Text */:
            generator.push(JSON.stringify(node.value), node);
            break;
        default:
            {
                throw createCompileError(CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, null, {
                    domain: ERROR_DOMAIN,
                    args: [node.type]
                });
            }
    }
}
// generate code from AST
const generate = (ast, options = {} // eslint-disable-line
) => {
    const mode = message_compiler_esm_browser_isString(options.mode) ? options.mode : 'normal';
    const filename = message_compiler_esm_browser_isString(options.filename)
        ? options.filename
        : 'message.intl';
    const sourceMap = !!options.sourceMap;
    // prettier-ignore
    const breakLineCode = options.breakLineCode != null
        ? options.breakLineCode
        : mode === 'arrow'
            ? ';'
            : '\n';
    const needIndent = options.needIndent ? options.needIndent : mode !== 'arrow';
    const helpers = ast.helpers || [];
    const generator = createCodeGenerator(ast, {
        mode,
        filename,
        sourceMap,
        breakLineCode,
        needIndent
    });
    generator.push(mode === 'normal' ? `function __msg__ (ctx) {` : `(ctx) => {`);
    generator.indent(needIndent);
    if (helpers.length > 0) {
        generator.push(`const { ${message_compiler_esm_browser_join(helpers.map(s => `${s}: _${s}`), ', ')} } = ctx`);
        generator.newline();
    }
    generator.push(`return `);
    generateNode(generator, ast);
    generator.deindent(needIndent);
    generator.push(`}`);
    delete ast.helpers;
    const { code, map } = generator.context();
    return {
        ast,
        code,
        map: map ? map.toJSON() : undefined // eslint-disable-line @typescript-eslint/no-explicit-any
    };
};

function baseCompile(source, options = {}) {
    const assignedOptions = message_compiler_esm_browser_assign({}, options);
    const jit = !!assignedOptions.jit;
    const enalbeMinify = !!assignedOptions.minify;
    const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
    // parse source codes
    const parser = createParser(assignedOptions);
    const ast = parser.parse(source);
    if (!jit) {
        // transform ASTs
        transform(ast, assignedOptions);
        // generate javascript codes
        return generate(ast, assignedOptions);
    }
    else {
        // optimize ASTs
        enambeOptimize && optimize(ast);
        // minimize ASTs
        enalbeMinify && minify(ast);
        // In JIT mode, no ast transform, no code generation.
        return { ast, code: '' };
    }
}



;// CONCATENATED MODULE: ./node_modules/@intlify/core-base/dist/core-base.mjs
/*!
  * core-base v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */




/**
 * This is only called in esm-bundler builds.
 * istanbul-ignore-next
 */
function core_base_initFeatureFlags() {
    if (typeof __INTLIFY_PROD_DEVTOOLS__ !== 'boolean') {
        shared_getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
    }
    if (typeof __INTLIFY_JIT_COMPILATION__ !== 'boolean') {
        shared_getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false;
    }
    if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== 'boolean') {
        shared_getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
    }
}

const pathStateMachine =  [];
pathStateMachine[0 /* States.BEFORE_PATH */] = {
    ["w" /* PathCharTypes.WORKSPACE */]: [0 /* States.BEFORE_PATH */],
    ["i" /* PathCharTypes.IDENT */]: [3 /* States.IN_IDENT */, 0 /* Actions.APPEND */],
    ["[" /* PathCharTypes.LEFT_BRACKET */]: [4 /* States.IN_SUB_PATH */],
    ["o" /* PathCharTypes.END_OF_FAIL */]: [7 /* States.AFTER_PATH */]
};
pathStateMachine[1 /* States.IN_PATH */] = {
    ["w" /* PathCharTypes.WORKSPACE */]: [1 /* States.IN_PATH */],
    ["." /* PathCharTypes.DOT */]: [2 /* States.BEFORE_IDENT */],
    ["[" /* PathCharTypes.LEFT_BRACKET */]: [4 /* States.IN_SUB_PATH */],
    ["o" /* PathCharTypes.END_OF_FAIL */]: [7 /* States.AFTER_PATH */]
};
pathStateMachine[2 /* States.BEFORE_IDENT */] = {
    ["w" /* PathCharTypes.WORKSPACE */]: [2 /* States.BEFORE_IDENT */],
    ["i" /* PathCharTypes.IDENT */]: [3 /* States.IN_IDENT */, 0 /* Actions.APPEND */],
    ["0" /* PathCharTypes.ZERO */]: [3 /* States.IN_IDENT */, 0 /* Actions.APPEND */]
};
pathStateMachine[3 /* States.IN_IDENT */] = {
    ["i" /* PathCharTypes.IDENT */]: [3 /* States.IN_IDENT */, 0 /* Actions.APPEND */],
    ["0" /* PathCharTypes.ZERO */]: [3 /* States.IN_IDENT */, 0 /* Actions.APPEND */],
    ["w" /* PathCharTypes.WORKSPACE */]: [1 /* States.IN_PATH */, 1 /* Actions.PUSH */],
    ["." /* PathCharTypes.DOT */]: [2 /* States.BEFORE_IDENT */, 1 /* Actions.PUSH */],
    ["[" /* PathCharTypes.LEFT_BRACKET */]: [4 /* States.IN_SUB_PATH */, 1 /* Actions.PUSH */],
    ["o" /* PathCharTypes.END_OF_FAIL */]: [7 /* States.AFTER_PATH */, 1 /* Actions.PUSH */]
};
pathStateMachine[4 /* States.IN_SUB_PATH */] = {
    ["'" /* PathCharTypes.SINGLE_QUOTE */]: [5 /* States.IN_SINGLE_QUOTE */, 0 /* Actions.APPEND */],
    ["\"" /* PathCharTypes.DOUBLE_QUOTE */]: [6 /* States.IN_DOUBLE_QUOTE */, 0 /* Actions.APPEND */],
    ["[" /* PathCharTypes.LEFT_BRACKET */]: [
        4 /* States.IN_SUB_PATH */,
        2 /* Actions.INC_SUB_PATH_DEPTH */
    ],
    ["]" /* PathCharTypes.RIGHT_BRACKET */]: [1 /* States.IN_PATH */, 3 /* Actions.PUSH_SUB_PATH */],
    ["o" /* PathCharTypes.END_OF_FAIL */]: 8 /* States.ERROR */,
    ["l" /* PathCharTypes.ELSE */]: [4 /* States.IN_SUB_PATH */, 0 /* Actions.APPEND */]
};
pathStateMachine[5 /* States.IN_SINGLE_QUOTE */] = {
    ["'" /* PathCharTypes.SINGLE_QUOTE */]: [4 /* States.IN_SUB_PATH */, 0 /* Actions.APPEND */],
    ["o" /* PathCharTypes.END_OF_FAIL */]: 8 /* States.ERROR */,
    ["l" /* PathCharTypes.ELSE */]: [5 /* States.IN_SINGLE_QUOTE */, 0 /* Actions.APPEND */]
};
pathStateMachine[6 /* States.IN_DOUBLE_QUOTE */] = {
    ["\"" /* PathCharTypes.DOUBLE_QUOTE */]: [4 /* States.IN_SUB_PATH */, 0 /* Actions.APPEND */],
    ["o" /* PathCharTypes.END_OF_FAIL */]: 8 /* States.ERROR */,
    ["l" /* PathCharTypes.ELSE */]: [6 /* States.IN_DOUBLE_QUOTE */, 0 /* Actions.APPEND */]
};
/**
 * Check if an expression is a literal value.
 */
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
    return literalValueRE.test(exp);
}
/**
 * Strip quotes from a string
 */
function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}
/**
 * Determine the type of a character in a keypath.
 */
function getPathCharType(ch) {
    if (ch === undefined || ch === null) {
        return "o" /* PathCharTypes.END_OF_FAIL */;
    }
    const code = ch.charCodeAt(0);
    switch (code) {
        case 0x5b: // [
        case 0x5d: // ]
        case 0x2e: // .
        case 0x22: // "
        case 0x27: // '
            return ch;
        case 0x5f: // _
        case 0x24: // $
        case 0x2d: // -
            return "i" /* PathCharTypes.IDENT */;
        case 0x09: // Tab (HT)
        case 0x0a: // Newline (LF)
        case 0x0d: // Return (CR)
        case 0xa0: // No-break space (NBSP)
        case 0xfeff: // Byte Order Mark (BOM)
        case 0x2028: // Line Separator (LS)
        case 0x2029: // Paragraph Separator (PS)
            return "w" /* PathCharTypes.WORKSPACE */;
    }
    return "i" /* PathCharTypes.IDENT */;
}
/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */
function formatSubPath(path) {
    const trimmed = path.trim();
    // invalid leading 0
    if (path.charAt(0) === '0' && isNaN(parseInt(path))) {
        return false;
    }
    return isLiteral(trimmed)
        ? stripQuotes(trimmed)
        : "*" /* PathCharTypes.ASTARISK */ + trimmed;
}
/**
 * Parse a string path into an array of segments
 */
function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0 /* States.BEFORE_PATH */;
    let subPathDepth = 0;
    let c;
    let key; // eslint-disable-line
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[0 /* Actions.APPEND */] = () => {
        if (key === undefined) {
            key = newChar;
        }
        else {
            key += newChar;
        }
    };
    actions[1 /* Actions.PUSH */] = () => {
        if (key !== undefined) {
            keys.push(key);
            key = undefined;
        }
    };
    actions[2 /* Actions.INC_SUB_PATH_DEPTH */] = () => {
        actions[0 /* Actions.APPEND */]();
        subPathDepth++;
    };
    actions[3 /* Actions.PUSH_SUB_PATH */] = () => {
        if (subPathDepth > 0) {
            subPathDepth--;
            mode = 4 /* States.IN_SUB_PATH */;
            actions[0 /* Actions.APPEND */]();
        }
        else {
            subPathDepth = 0;
            if (key === undefined) {
                return false;
            }
            key = formatSubPath(key);
            if (key === false) {
                return false;
            }
            else {
                actions[1 /* Actions.PUSH */]();
            }
        }
    };
    function maybeUnescapeQuote() {
        const nextChar = path[index + 1];
        if ((mode === 5 /* States.IN_SINGLE_QUOTE */ &&
            nextChar === "'" /* PathCharTypes.SINGLE_QUOTE */) ||
            (mode === 6 /* States.IN_DOUBLE_QUOTE */ &&
                nextChar === "\"" /* PathCharTypes.DOUBLE_QUOTE */)) {
            index++;
            newChar = '\\' + nextChar;
            actions[0 /* Actions.APPEND */]();
            return true;
        }
    }
    while (mode !== null) {
        index++;
        c = path[index];
        if (c === '\\' && maybeUnescapeQuote()) {
            continue;
        }
        type = getPathCharType(c);
        typeMap = pathStateMachine[mode];
        transition = typeMap[type] || typeMap["l" /* PathCharTypes.ELSE */] || 8 /* States.ERROR */;
        // check parse error
        if (transition === 8 /* States.ERROR */) {
            return;
        }
        mode = transition[0];
        if (transition[1] !== undefined) {
            action = actions[transition[1]];
            if (action) {
                newChar = c;
                if (action() === false) {
                    return;
                }
            }
        }
        // check parse finish
        if (mode === 7 /* States.AFTER_PATH */) {
            return keys;
        }
    }
}
// path token cache
const cache = new Map();
/**
 * key-value message resolver
 *
 * @remarks
 * Resolves messages with the key-value structure. Note that messages with a hierarchical structure such as objects cannot be resolved
 *
 * @param obj - A target object to be resolved with path
 * @param path - A {@link Path | path} to resolve the value of message
 *
 * @returns A resolved {@link PathValue | path value}
 *
 * @VueI18nGeneral
 */
function resolveWithKeyValue(obj, path) {
    return shared_isObject(obj) ? obj[path] : null;
}
/**
 * message resolver
 *
 * @remarks
 * Resolves messages. messages with a hierarchical structure such as objects can be resolved. This resolver is used in VueI18n as default.
 *
 * @param obj - A target object to be resolved with path
 * @param path - A {@link Path | path} to resolve the value of message
 *
 * @returns A resolved {@link PathValue | path value}
 *
 * @VueI18nGeneral
 */
function resolveValue(obj, path) {
    // check object
    if (!shared_isObject(obj)) {
        return null;
    }
    // parse path
    let hit = cache.get(path);
    if (!hit) {
        hit = parse(path);
        if (hit) {
            cache.set(path, hit);
        }
    }
    // check hit
    if (!hit) {
        return null;
    }
    // resolve path value
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
        const val = last[hit[i]];
        if (val === undefined) {
            return null;
        }
        if (shared_isFunction(last)) {
            return null;
        }
        last = val;
        i++;
    }
    return last;
}

const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => ''; // eslint-disable-line
const DEFAULT_MESSAGE_DATA_TYPE = 'text';
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? '' : join(values);
const DEFAULT_INTERPOLATE = shared_toDisplayString;
function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
        // prettier-ignore
        return choice
            ? choice > 1
                ? 1
                : 0
            : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
    // prettier-ignore
    const index = isNumber(options.pluralIndex)
        ? options.pluralIndex
        : -1;
    // prettier-ignore
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n))
        ? isNumber(options.named.count)
            ? options.named.count
            : isNumber(options.named.n)
                ? options.named.n
                : index
        : index;
}
function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
        props.count = pluralIndex;
    }
    if (!props.n) {
        props.n = pluralIndex;
    }
}
function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = shared_isObject(options.pluralRules) &&
        shared_isString(locale) &&
        shared_isFunction(options.pluralRules[locale])
        ? options.pluralRules[locale]
        : pluralDefault;
    const orgPluralRule = shared_isObject(options.pluralRules) &&
        shared_isString(locale) &&
        shared_isFunction(options.pluralRules[locale])
        ? pluralDefault
        : undefined;
    const plural = (messages) => {
        return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    };
    const _list = options.list || [];
    const list = (index) => _list[index];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key) {
        // prettier-ignore
        const msg = shared_isFunction(options.messages)
            ? options.messages(key)
            : shared_isObject(options.messages)
                ? options.messages[key]
                : false;
        return !msg
            ? options.parent
                ? options.parent.message(key) // resolve from parent messages
                : DEFAULT_MESSAGE
            : msg;
    }
    const _modifier = (name) => options.modifiers
        ? options.modifiers[name]
        : DEFAULT_MODIFIER;
    const normalize = shared_isPlainObject(options.processor) && shared_isFunction(options.processor.normalize)
        ? options.processor.normalize
        : DEFAULT_NORMALIZE;
    const interpolate = shared_isPlainObject(options.processor) &&
        shared_isFunction(options.processor.interpolate)
        ? options.processor.interpolate
        : DEFAULT_INTERPOLATE;
    const type = shared_isPlainObject(options.processor) && shared_isString(options.processor.type)
        ? options.processor.type
        : DEFAULT_MESSAGE_DATA_TYPE;
    const linked = (key, ...args) => {
        const [arg1, arg2] = args;
        let type = 'text';
        let modifier = '';
        if (args.length === 1) {
            if (shared_isObject(arg1)) {
                modifier = arg1.modifier || modifier;
                type = arg1.type || type;
            }
            else if (shared_isString(arg1)) {
                modifier = arg1 || modifier;
            }
        }
        else if (args.length === 2) {
            if (shared_isString(arg1)) {
                modifier = arg1 || modifier;
            }
            if (shared_isString(arg2)) {
                type = arg2 || type;
            }
        }
        const ret = message(key)(ctx);
        const msg = 
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        type === 'vnode' && shared_isArray(ret) && modifier
            ? ret[0]
            : ret;
        return modifier ? _modifier(modifier)(msg, type) : msg;
    };
    const ctx = {
        ["list" /* HelperNameMap.LIST */]: list,
        ["named" /* HelperNameMap.NAMED */]: named,
        ["plural" /* HelperNameMap.PLURAL */]: plural,
        ["linked" /* HelperNameMap.LINKED */]: linked,
        ["message" /* HelperNameMap.MESSAGE */]: message,
        ["type" /* HelperNameMap.TYPE */]: type,
        ["interpolate" /* HelperNameMap.INTERPOLATE */]: interpolate,
        ["normalize" /* HelperNameMap.NORMALIZE */]: normalize,
        ["values" /* HelperNameMap.VALUES */]: shared_assign({}, _list, _named)
    };
    return ctx;
}

let core_base_devtools = null;
function setDevToolsHook(hook) {
    core_base_devtools = hook;
}
function getDevToolsHook() {
    return core_base_devtools;
}
function initI18nDevTools(i18n, version, meta) {
    // TODO: queue if devtools is undefined
    core_base_devtools &&
        core_base_devtools.emit("i18n:init" /* IntlifyDevToolsHooks.I18nInit */, {
            timestamp: Date.now(),
            i18n,
            version,
            meta
        });
}
const translateDevTools = /* #__PURE__*/ createDevToolsHook("function:translate" /* IntlifyDevToolsHooks.FunctionTranslate */);
function createDevToolsHook(hook) {
    return (payloads) => core_base_devtools && core_base_devtools.emit(hook, payloads);
}

const CoreWarnCodes = {
    NOT_FOUND_KEY: 1,
    FALLBACK_TO_TRANSLATE: 2,
    CANNOT_FORMAT_NUMBER: 3,
    FALLBACK_TO_NUMBER_FORMAT: 4,
    CANNOT_FORMAT_DATE: 5,
    FALLBACK_TO_DATE_FORMAT: 6,
    EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
    __EXTEND_POINT__: 8
};
/** @internal */
const warnMessages = {
    [CoreWarnCodes.NOT_FOUND_KEY]: `Not found '{key}' key in '{locale}' locale messages.`,
    [CoreWarnCodes.FALLBACK_TO_TRANSLATE]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [CoreWarnCodes.CANNOT_FORMAT_NUMBER]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [CoreWarnCodes.FALLBACK_TO_NUMBER_FORMAT]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [CoreWarnCodes.CANNOT_FORMAT_DATE]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [CoreWarnCodes.FALLBACK_TO_DATE_FORMAT]: `Fall back to datetime format '{key}' key with '{target}' locale.`,
    [CoreWarnCodes.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: `This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future.`
};
function getWarnMessage(code, ...args) {
    return format$1(warnMessages[code], ...args);
}

const code = CompileErrorCodes.__EXTEND_POINT__;
const inc = incrementer(code);
const CoreErrorCodes = {
    INVALID_ARGUMENT: code, // 18
    INVALID_DATE_ARGUMENT: inc(), // 19
    INVALID_ISO_DATE_ARGUMENT: inc(), // 20
    NOT_SUPPORT_NON_STRING_MESSAGE: inc(), // 21
    NOT_SUPPORT_LOCALE_PROMISE_VALUE: inc(), // 22
    NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: inc(), // 23
    NOT_SUPPORT_LOCALE_TYPE: inc(), // 24
    __EXTEND_POINT__: inc() // 25
};
function createCoreError(code) {
    return createCompileError(code, null, ( false) ? 0 : undefined);
}
/** @internal */
const core_base_errorMessages = {
    [CoreErrorCodes.INVALID_ARGUMENT]: 'Invalid arguments',
    [CoreErrorCodes.INVALID_DATE_ARGUMENT]: 'The date provided is an invalid Date object.' +
        'Make sure your Date represents a valid date.',
    [CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT]: 'The argument provided is not a valid ISO date string',
    [CoreErrorCodes.NOT_SUPPORT_NON_STRING_MESSAGE]: 'Not support non-string message',
    [CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: 'cannot support promise value',
    [CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: 'cannot support async function',
    [CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE]: 'cannot support locale type'
};

/** @internal */
function getLocale(context, options) {
    return options.locale != null
        ? resolveLocale(options.locale)
        : resolveLocale(context.locale);
}
let _resolveLocale;
/** @internal */
function resolveLocale(locale) {
    if (shared_isString(locale)) {
        return locale;
    }
    else {
        if (shared_isFunction(locale)) {
            if (locale.resolvedOnce && _resolveLocale != null) {
                return _resolveLocale;
            }
            else if (locale.constructor.name === 'Function') {
                const resolve = locale();
                if (shared_isPromise(resolve)) {
                    throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
                }
                return (_resolveLocale = resolve);
            }
            else {
                throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
            }
        }
        else {
            throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
        }
    }
}
/**
 * Fallback with simple implemenation
 *
 * @remarks
 * A fallback locale function implemented with a simple fallback algorithm.
 *
 * Basically, it returns the value as specified in the `fallbackLocale` props, and is processed with the fallback inside intlify.
 *
 * @param ctx - A {@link CoreContext | context}
 * @param fallback - A {@link FallbackLocale | fallback locale}
 * @param start - A starting {@link Locale | locale}
 *
 * @returns Fallback locales
 *
 * @VueI18nGeneral
 */
function fallbackWithSimple(ctx, fallback, start // eslint-disable-line @typescript-eslint/no-unused-vars
) {
    // prettier-ignore
    return [...new Set([
            start,
            ...(shared_isArray(fallback)
                ? fallback
                : shared_isObject(fallback)
                    ? Object.keys(fallback)
                    : shared_isString(fallback)
                        ? [fallback]
                        : [start])
        ])];
}
/**
 * Fallback with locale chain
 *
 * @remarks
 * A fallback locale function implemented with a fallback chain algorithm. It's used in VueI18n as default.
 *
 * @param ctx - A {@link CoreContext | context}
 * @param fallback - A {@link FallbackLocale | fallback locale}
 * @param start - A starting {@link Locale | locale}
 *
 * @returns Fallback locales
 *
 * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
 *
 * @VueI18nGeneral
 */
function fallbackWithLocaleChain(ctx, fallback, start) {
    const startLocale = shared_isString(start) ? start : DEFAULT_LOCALE;
    const context = ctx;
    if (!context.__localeChainCache) {
        context.__localeChainCache = new Map();
    }
    let chain = context.__localeChainCache.get(startLocale);
    if (!chain) {
        chain = [];
        // first block defined by start
        let block = [start];
        // while any intervening block found
        while (shared_isArray(block)) {
            block = appendBlockToChain(chain, block, fallback);
        }
        // prettier-ignore
        // last block defined by default
        const defaults = shared_isArray(fallback) || !shared_isPlainObject(fallback)
            ? fallback
            : fallback['default']
                ? fallback['default']
                : null;
        // convert defaults to array
        block = shared_isString(defaults) ? [defaults] : defaults;
        if (shared_isArray(block)) {
            appendBlockToChain(chain, block, false);
        }
        context.__localeChainCache.set(startLocale, chain);
    }
    return chain;
}
function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && shared_isBoolean(follow); i++) {
        const locale = block[i];
        if (shared_isString(locale)) {
            follow = appendLocaleToChain(chain, block[i], blocks);
        }
    }
    return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split('-');
    do {
        const target = tokens.join('-');
        follow = appendItemToChain(chain, target, blocks);
        tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
}
function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
        follow = true;
        if (target) {
            follow = target[target.length - 1] !== '!';
            const locale = target.replace(/!/g, '');
            chain.push(locale);
            if ((shared_isArray(blocks) || shared_isPlainObject(blocks)) &&
                blocks[locale] // eslint-disable-line @typescript-eslint/no-explicit-any
            ) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                follow = blocks[locale];
            }
        }
    }
    return follow;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Intlify core-base version
 * @internal
 */
const VERSION = '9.10.2';
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = 'en-US';
const MISSING_RESOLVE_VALUE = '';
const core_base_capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
    return {
        upper: (val, type) => {
            // prettier-ignore
            return type === 'text' && shared_isString(val)
                ? val.toUpperCase()
                : type === 'vnode' && shared_isObject(val) && '__v_isVNode' in val
                    ? val.children.toUpperCase()
                    : val;
        },
        lower: (val, type) => {
            // prettier-ignore
            return type === 'text' && shared_isString(val)
                ? val.toLowerCase()
                : type === 'vnode' && shared_isObject(val) && '__v_isVNode' in val
                    ? val.children.toLowerCase()
                    : val;
        },
        capitalize: (val, type) => {
            // prettier-ignore
            return (type === 'text' && shared_isString(val)
                ? core_base_capitalize(val)
                : type === 'vnode' && shared_isObject(val) && '__v_isVNode' in val
                    ? core_base_capitalize(val.children)
                    : val);
        }
    };
}
let _compiler;
function registerMessageCompiler(compiler) {
    _compiler = compiler;
}
let _resolver;
/**
 * Register the message resolver
 *
 * @param resolver - A {@link MessageResolver} function
 *
 * @VueI18nGeneral
 */
function registerMessageResolver(resolver) {
    _resolver = resolver;
}
let _fallbacker;
/**
 * Register the locale fallbacker
 *
 * @param fallbacker - A {@link LocaleFallbacker} function
 *
 * @VueI18nGeneral
 */
function registerLocaleFallbacker(fallbacker) {
    _fallbacker = fallbacker;
}
// Additional Meta for Intlify DevTools
let _additionalMeta =  null;
/* #__NO_SIDE_EFFECTS__ */
const setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
};
/* #__NO_SIDE_EFFECTS__ */
const getAdditionalMeta = () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
    _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
// ID for CoreContext
let _cid = 0;
function createCoreContext(options = {}) {
    // setup options
    const onWarn = shared_isFunction(options.onWarn) ? options.onWarn : shared_warn;
    const version = shared_isString(options.version) ? options.version : VERSION;
    const locale = shared_isString(options.locale) || shared_isFunction(options.locale)
        ? options.locale
        : DEFAULT_LOCALE;
    const _locale = shared_isFunction(locale) ? DEFAULT_LOCALE : locale;
    const fallbackLocale = shared_isArray(options.fallbackLocale) ||
        shared_isPlainObject(options.fallbackLocale) ||
        shared_isString(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : _locale;
    const messages = shared_isPlainObject(options.messages)
        ? options.messages
        : { [_locale]: {} };
    const datetimeFormats = shared_isPlainObject(options.datetimeFormats)
            ? options.datetimeFormats
            : { [_locale]: {} }
        ;
    const numberFormats = shared_isPlainObject(options.numberFormats)
            ? options.numberFormats
            : { [_locale]: {} }
        ;
    const modifiers = shared_assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = shared_isFunction(options.missing) ? options.missing : null;
    const missingWarn = shared_isBoolean(options.missingWarn) || shared_isRegExp(options.missingWarn)
        ? options.missingWarn
        : true;
    const fallbackWarn = shared_isBoolean(options.fallbackWarn) || shared_isRegExp(options.fallbackWarn)
        ? options.fallbackWarn
        : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = shared_isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    const processor = shared_isPlainObject(options.processor) ? options.processor : null;
    const warnHtmlMessage = shared_isBoolean(options.warnHtmlMessage)
        ? options.warnHtmlMessage
        : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = shared_isFunction(options.messageCompiler)
        ? options.messageCompiler
        : _compiler;
    if (false) {}
    const messageResolver = shared_isFunction(options.messageResolver)
        ? options.messageResolver
        : _resolver || resolveWithKeyValue;
    const localeFallbacker = shared_isFunction(options.localeFallbacker)
        ? options.localeFallbacker
        : _fallbacker || fallbackWithSimple;
    const fallbackContext = shared_isObject(options.fallbackContext)
        ? options.fallbackContext
        : undefined;
    // setup internal options
    const internalOptions = options;
    const __datetimeFormatters = shared_isObject(internalOptions.__datetimeFormatters)
            ? internalOptions.__datetimeFormatters
            : new Map()
        ;
    const __numberFormatters = shared_isObject(internalOptions.__numberFormatters)
            ? internalOptions.__numberFormatters
            : new Map()
        ;
    const __meta = shared_isObject(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
        version,
        cid: _cid,
        locale,
        fallbackLocale,
        messages,
        modifiers,
        pluralRules,
        missing,
        missingWarn,
        fallbackWarn,
        fallbackFormat,
        unresolving,
        postTranslation,
        processor,
        warnHtmlMessage,
        escapeParameter,
        messageCompiler,
        messageResolver,
        localeFallbacker,
        fallbackContext,
        onWarn,
        __meta
    };
    {
        context.datetimeFormats = datetimeFormats;
        context.numberFormats = numberFormats;
        context.__datetimeFormatters = __datetimeFormatters;
        context.__numberFormatters = __numberFormatters;
    }
    // for vue-devtools timeline event
    if ((false)) {}
    // NOTE: experimental !!
    if (( false) || __INTLIFY_PROD_DEVTOOLS__) {
        initI18nDevTools(context, version, __meta);
    }
    return context;
}
/** @internal */
function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
/** @internal */
function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
}
/** @internal */
function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    // for vue-devtools timeline event
    if ((false)) {}
    if (missing !== null) {
        const ret = missing(context, locale, key, type);
        return shared_isString(ret) ? ret : key;
    }
    else {
        if (false) {}
        return key;
    }
}
/** @internal */
function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = new Map();
    ctx.localeFallbacker(ctx, fallback, locale);
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function core_base_format(ast) {
    const msg = (ctx) => formatParts(ctx, ast);
    return msg;
}
function formatParts(ctx, ast) {
    const body = ast.b || ast.body;
    if ((body.t || body.type) === 1 /* NodeTypes.Plural */) {
        const plural = body;
        const cases = plural.c || plural.cases;
        return ctx.plural(cases.reduce((messages, c) => [
            ...messages,
            formatMessageParts(ctx, c)
        ], []));
    }
    else {
        return formatMessageParts(ctx, body);
    }
}
function formatMessageParts(ctx, node) {
    const _static = node.s || node.static;
    if (_static) {
        return ctx.type === 'text'
            ? _static
            : ctx.normalize([_static]);
    }
    else {
        const messages = (node.i || node.items).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
        return ctx.normalize(messages);
    }
}
function formatMessagePart(ctx, node) {
    const type = node.t || node.type;
    switch (type) {
        case 3 /* NodeTypes.Text */: {
            const text = node;
            return (text.v || text.value);
        }
        case 9 /* NodeTypes.Literal */: {
            const literal = node;
            return (literal.v || literal.value);
        }
        case 4 /* NodeTypes.Named */: {
            const named = node;
            return ctx.interpolate(ctx.named(named.k || named.key));
        }
        case 5 /* NodeTypes.List */: {
            const list = node;
            return ctx.interpolate(ctx.list(list.i != null ? list.i : list.index));
        }
        case 6 /* NodeTypes.Linked */: {
            const linked = node;
            const modifier = linked.m || linked.modifier;
            return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : undefined, ctx.type);
        }
        case 7 /* NodeTypes.LinkedKey */: {
            const linkedKey = node;
            return (linkedKey.v || linkedKey.value);
        }
        case 8 /* NodeTypes.LinkedModifier */: {
            const linkedModifier = node;
            return (linkedModifier.v || linkedModifier.value);
        }
        default:
            throw new Error(`unhandled node type on format message part: ${type}`);
    }
}

const WARN_MESSAGE = (/* unused pure expression or super */ null && (`Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.`));
function checkHtmlMessage(source, warnHtmlMessage) {
    if (warnHtmlMessage && detectHtmlTag(source)) {
        warn(format$1(WARN_MESSAGE, { source }));
    }
}
const defaultOnCacheKey = (message) => message;
let compileCache = Object.create(null);
function clearCompileCache() {
    compileCache = Object.create(null);
}
const isMessageAST = (val) => shared_isObject(val) &&
    (val.t === 0 || val.type === 0) &&
    ('b' in val || 'body' in val);
function core_base_baseCompile(message, options = {}) {
    // error detecting on compile
    let detectError = false;
    const onError = options.onError || defaultOnError;
    options.onError = (err) => {
        detectError = true;
        onError(err);
    };
    // compile with mesasge-compiler
    return { ...baseCompile(message, options), detectError };
}
/* #__NO_SIDE_EFFECTS__ */
const compileToFunction = (message, context) => {
    if (!shared_isString(message)) {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_NON_STRING_MESSAGE);
    }
    {
        // check HTML message
        const warnHtmlMessage = shared_isBoolean(context.warnHtmlMessage)
            ? context.warnHtmlMessage
            : true;
        ( false) && 0;
        // check caches
        const onCacheKey = context.onCacheKey || defaultOnCacheKey;
        const cacheKey = onCacheKey(message);
        const cached = compileCache[cacheKey];
        if (cached) {
            return cached;
        }
        // compile
        const { code, detectError } = core_base_baseCompile(message, context);
        // evaluate function
        const msg = new Function(`return ${code}`)();
        // if occurred compile error, don't cache
        return !detectError
            ? (compileCache[cacheKey] = msg)
            : msg;
    }
};
function core_base_compile(message, context) {
    if (((__INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__)) &&
        shared_isString(message)) {
        // check HTML message
        const warnHtmlMessage = shared_isBoolean(context.warnHtmlMessage)
            ? context.warnHtmlMessage
            : true;
        ( false) && 0;
        // check caches
        const onCacheKey = context.onCacheKey || defaultOnCacheKey;
        const cacheKey = onCacheKey(message);
        const cached = compileCache[cacheKey];
        if (cached) {
            return cached;
        }
        // compile with JIT mode
        const { ast, detectError } = core_base_baseCompile(message, {
            ...context,
            location: ("production" !== 'production'),
            jit: true
        });
        // compose message function from AST
        const msg = core_base_format(ast);
        // if occurred compile error, don't cache
        return !detectError
            ? (compileCache[cacheKey] = msg)
            : msg;
    }
    else {
        if (false) {}
        // AST case (passed from bundler)
        const cacheKey = message.cacheKey;
        if (cacheKey) {
            const cached = compileCache[cacheKey];
            if (cached) {
                return cached;
            }
            // compose message function from message (AST)
            return (compileCache[cacheKey] =
                core_base_format(message));
        }
        else {
            return core_base_format(message);
        }
    }
}

const NOOP_MESSAGE_FUNCTION = () => '';
const isMessageFunction = (val) => shared_isFunction(val);
// implementation of `translate` function
function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = shared_isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = shared_isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const escapeParameter = shared_isBoolean(options.escapeParameter)
        ? options.escapeParameter
        : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    // prettier-ignore
    const defaultMsgOrKey = shared_isString(options.default) || shared_isBoolean(options.default) // default by function option
        ? !shared_isBoolean(options.default)
            ? options.default
            : (!messageCompiler ? () => key : key)
        : fallbackFormat // default by `fallbackFormat` option
            ? (!messageCompiler ? () => key : key)
            : '';
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== '';
    const locale = getLocale(context, options);
    // escape params
    escapeParameter && escapeParams(options);
    // resolve message format
    // eslint-disable-next-line prefer-const
    let [formatScope, targetLocale, message] = !resolvedMessage
        ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn)
        : [
            key,
            locale,
            messages[locale] || {}
        ];
    // NOTE:
    //  Fix to work around `ssrTransfrom` bug in Vite.
    //  https://github.com/vitejs/vite/issues/4306
    //  To get around this, use temporary variables.
    //  https://github.com/nuxt/framework/issues/1461#issuecomment-954606243
    let format = formatScope;
    // if you use default message, set it as message format!
    let cacheBaseKey = key;
    if (!resolvedMessage &&
        !(shared_isString(format) ||
            isMessageAST(format) ||
            isMessageFunction(format))) {
        if (enableDefaultMsg) {
            format = defaultMsgOrKey;
            cacheBaseKey = format;
        }
    }
    // checking message format and target locale
    if (!resolvedMessage &&
        (!(shared_isString(format) ||
            isMessageAST(format) ||
            isMessageFunction(format)) ||
            !shared_isString(targetLocale))) {
        return unresolving ? NOT_REOSLVED : key;
    }
    // TODO: refactor
    if (false) {}
    // setup compile error detecting
    let occurred = false;
    const onError = () => {
        occurred = true;
    };
    // compile message format
    const msg = !isMessageFunction(format)
        ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, onError)
        : format;
    // if occurred compile error, return the message format
    if (occurred) {
        return format;
    }
    // evaluate message with context
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    // if use post translation option, proceed it with handler
    const ret = postTranslation
        ? postTranslation(messaged, key)
        : messaged;
    // NOTE: experimental !!
    if (( false) || __INTLIFY_PROD_DEVTOOLS__) {
        // prettier-ignore
        const payloads = {
            timestamp: Date.now(),
            key: shared_isString(key)
                ? key
                : isMessageFunction(format)
                    ? format.key
                    : '',
            locale: targetLocale || (isMessageFunction(format)
                ? format.locale
                : ''),
            format: shared_isString(format)
                ? format
                : isMessageFunction(format)
                    ? format.source
                    : '',
            message: ret
        };
        payloads.meta = shared_assign({}, context.__meta, getAdditionalMeta() || {});
        translateDevTools(payloads);
    }
    return ret;
}
function escapeParams(options) {
    if (shared_isArray(options.list)) {
        options.list = options.list.map(item => shared_isString(item) ? shared_escapeHtml(item) : item);
    }
    else if (shared_isObject(options.named)) {
        Object.keys(options.named).forEach(key => {
            if (shared_isString(options.named[key])) {
                options.named[key] = shared_escapeHtml(options.named[key]);
            }
        });
    }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn, messageResolver: resolveValue, localeFallbacker } = context;
    const locales = localeFallbacker(context, fallbackLocale, locale); // eslint-disable-line @typescript-eslint/no-explicit-any
    let message = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'translate';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (false) {}
        // for vue-devtools timeline event
        if (false) {}
        message =
            messages[targetLocale] || {};
        // for vue-devtools timeline event
        let start = null;
        let startTag;
        let endTag;
        if (false) {}
        if ((format = resolveValue(message, key)) === null) {
            // if null, resolve with object key path
            format = message[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        // for vue-devtools timeline event
        if (false) {}
        if (shared_isString(format) || isMessageAST(format) || isMessageFunction(format)) {
            break;
        }
        const missingRet = handleMissing(context, // eslint-disable-line @typescript-eslint/no-explicit-any
        key, targetLocale, missingWarn, type);
        if (missingRet !== key) {
            format = missingRet;
        }
        from = to;
    }
    return [format, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, onError) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format)) {
        const msg = format;
        msg.locale = msg.locale || targetLocale;
        msg.key = msg.key || key;
        return msg;
    }
    if (messageCompiler == null) {
        const msg = (() => format);
        msg.locale = targetLocale;
        msg.key = key;
        return msg;
    }
    // for vue-devtools timeline event
    let start = null;
    let startTag;
    let endTag;
    if (false) {}
    const msg = messageCompiler(format, getCompileContext(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, onError));
    // for vue-devtools timeline event
    if (false) {}
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format;
    return msg;
}
function evaluateMessage(context, msg, msgCtx) {
    // for vue-devtools timeline event
    let start = null;
    let startTag;
    let endTag;
    if (false) {}
    const messaged = msg(msgCtx);
    // for vue-devtools timeline event
    if (false) {}
    return messaged;
}
/** @internal */
function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!shared_isString(arg1) &&
        !isNumber(arg1) &&
        !isMessageFunction(arg1) &&
        !isMessageAST(arg1)) {
        throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    }
    // prettier-ignore
    const key = isNumber(arg1)
        ? String(arg1)
        : isMessageFunction(arg1)
            ? arg1
            : arg1;
    if (isNumber(arg2)) {
        options.plural = arg2;
    }
    else if (shared_isString(arg2)) {
        options.default = arg2;
    }
    else if (shared_isPlainObject(arg2) && !isEmptyObject(arg2)) {
        options.named = arg2;
    }
    else if (shared_isArray(arg2)) {
        options.list = arg2;
    }
    if (isNumber(arg3)) {
        options.plural = arg3;
    }
    else if (shared_isString(arg3)) {
        options.default = arg3;
    }
    else if (shared_isPlainObject(arg3)) {
        shared_assign(options, arg3);
    }
    return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
    return {
        locale,
        key,
        warnHtmlMessage,
        onError: (err) => {
            onError && onError(err);
            if ((false)) {}
            else {
                throw err;
            }
        },
        onCacheKey: (source) => generateFormatCacheKey(locale, key, source)
    };
}
function getSourceForCodeFrame(source) {
    if (isString(source)) {
        return source;
    }
    else {
        if (source.loc && source.loc.source) {
            return source.loc.source;
        }
    }
}
function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules, messageResolver: resolveValue, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
    const resolveMessage = (key) => {
        let val = resolveValue(message, key);
        // fallback to root context
        if (val == null && fallbackContext) {
            const [, , message] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
            val = resolveValue(message, key);
        }
        if (shared_isString(val) || isMessageAST(val)) {
            let occurred = false;
            const onError = () => {
                occurred = true;
            };
            const msg = compileMessageFormat(context, key, locale, val, key, onError);
            return !occurred
                ? msg
                : NOOP_MESSAGE_FUNCTION;
        }
        else if (isMessageFunction(val)) {
            return val;
        }
        else {
            // TODO: should be implemented warning message
            return NOOP_MESSAGE_FUNCTION;
        }
    };
    const ctxOptions = {
        locale,
        modifiers,
        pluralRules,
        messages: resolveMessage
    };
    if (context.processor) {
        ctxOptions.processor = context.processor;
    }
    if (options.list) {
        ctxOptions.list = options.list;
    }
    if (options.named) {
        ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
        ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
}

const intlDefined = typeof Intl !== 'undefined';
const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
    numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
};

// implementation of `datetime` function
function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
    const { __datetimeFormatters } = context;
    if (false) {}
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = shared_isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = shared_isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const part = !!options.part;
    const locale = getLocale(context, options);
    const locales = localeFallbacker(context, // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale, locale);
    if (!shared_isString(key) || key === '') {
        return new Intl.DateTimeFormat(locale, overrides).format(value);
    }
    // resolve format
    let datetimeFormat = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'datetime format';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (false) {}
        // for vue-devtools timeline event
        if (false) {}
        datetimeFormat =
            datetimeFormats[targetLocale] || {};
        format = datetimeFormat[key];
        if (shared_isPlainObject(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, type); // eslint-disable-line @typescript-eslint/no-explicit-any
        from = to;
    }
    // checking format and target locale
    if (!shared_isPlainObject(format) || !shared_isString(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
        id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat(targetLocale, shared_assign({}, format, overrides));
        __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
const DATETIME_FORMAT_OPTIONS_KEYS = [
    'localeMatcher',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName',
    'formatMatcher',
    'hour12',
    'timeZone',
    'dateStyle',
    'timeStyle',
    'calendar',
    'dayPeriod',
    'numberingSystem',
    'hourCycle',
    'fractionalSecondDigits'
];
/** @internal */
function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    const options = {};
    let overrides = {};
    let value;
    if (shared_isString(arg1)) {
        // Only allow ISO strings - other date formats are often supported,
        // but may cause different results in different browsers.
        const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
        if (!matches) {
            throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
        }
        // Some browsers can not parse the iso datetime separated by space,
        // this is a compromise solution by replace the 'T'/' ' with 'T'
        const dateTime = matches[3]
            ? matches[3].trim().startsWith('T')
                ? `${matches[1].trim()}${matches[3].trim()}`
                : `${matches[1].trim()}T${matches[3].trim()}`
            : matches[1].trim();
        value = new Date(dateTime);
        try {
            // This will fail if the date is not valid
            value.toISOString();
        }
        catch (e) {
            throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
        }
    }
    else if (shared_isDate(arg1)) {
        if (isNaN(arg1.getTime())) {
            throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
        }
        value = arg1;
    }
    else if (isNumber(arg1)) {
        value = arg1;
    }
    else {
        throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    }
    if (shared_isString(arg2)) {
        options.key = arg2;
    }
    else if (shared_isPlainObject(arg2)) {
        Object.keys(arg2).forEach(key => {
            if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
                overrides[key] = arg2[key];
            }
            else {
                options[key] = arg2[key];
            }
        });
    }
    if (shared_isString(arg3)) {
        options.locale = arg3;
    }
    else if (shared_isPlainObject(arg3)) {
        overrides = arg3;
    }
    if (shared_isPlainObject(arg4)) {
        overrides = arg4;
    }
    return [options.key || '', value, options, overrides];
}
/** @internal */
function clearDateTimeFormat(ctx, locale, format) {
    const context = ctx;
    for (const key in format) {
        const id = `${locale}__${key}`;
        if (!context.__datetimeFormatters.has(id)) {
            continue;
        }
        context.__datetimeFormatters.delete(id);
    }
}

// implementation of `number` function
function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
    const { __numberFormatters } = context;
    if (false) {}
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = shared_isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = shared_isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const part = !!options.part;
    const locale = getLocale(context, options);
    const locales = localeFallbacker(context, // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale, locale);
    if (!shared_isString(key) || key === '') {
        return new Intl.NumberFormat(locale, overrides).format(value);
    }
    // resolve format
    let numberFormat = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'number format';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (false) {}
        // for vue-devtools timeline event
        if (false) {}
        numberFormat =
            numberFormats[targetLocale] || {};
        format = numberFormat[key];
        if (shared_isPlainObject(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, type); // eslint-disable-line @typescript-eslint/no-explicit-any
        from = to;
    }
    // checking format and target locale
    if (!shared_isPlainObject(format) || !shared_isString(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
        id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.NumberFormat(targetLocale, shared_assign({}, format, overrides));
        __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
const NUMBER_FORMAT_OPTIONS_KEYS = [
    'localeMatcher',
    'style',
    'currency',
    'currencyDisplay',
    'currencySign',
    'useGrouping',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    'compactDisplay',
    'notation',
    'signDisplay',
    'unit',
    'unitDisplay',
    'roundingMode',
    'roundingPriority',
    'roundingIncrement',
    'trailingZeroDisplay'
];
/** @internal */
function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    const options = {};
    let overrides = {};
    if (!isNumber(arg1)) {
        throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    }
    const value = arg1;
    if (shared_isString(arg2)) {
        options.key = arg2;
    }
    else if (shared_isPlainObject(arg2)) {
        Object.keys(arg2).forEach(key => {
            if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
                overrides[key] = arg2[key];
            }
            else {
                options[key] = arg2[key];
            }
        });
    }
    if (shared_isString(arg3)) {
        options.locale = arg3;
    }
    else if (shared_isPlainObject(arg3)) {
        overrides = arg3;
    }
    if (shared_isPlainObject(arg4)) {
        overrides = arg4;
    }
    return [options.key || '', value, options, overrides];
}
/** @internal */
function clearNumberFormat(ctx, locale, format) {
    const context = ctx;
    for (const key in format) {
        const id = `${locale}__${key}`;
        if (!context.__numberFormatters.has(id)) {
            continue;
        }
        context.__numberFormatters.delete(id);
    }
}

{
    core_base_initFeatureFlags();
}



;// CONCATENATED MODULE: ./node_modules/vue-i18n/dist/vue-i18n.mjs
/*!
  * vue-i18n v9.10.2
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */





/**
 * Vue I18n Version
 *
 * @remarks
 * Semver format. Same format as the package.json `version` field.
 *
 * @VueI18nGeneral
 */
const vue_i18n_VERSION = '9.10.2';
/**
 * This is only called in esm-bundler builds.
 * istanbul-ignore-next
 */
function vue_i18n_initFeatureFlags() {
    if (typeof __VUE_I18N_FULL_INSTALL__ !== 'boolean') {
        shared_getGlobalThis().__VUE_I18N_FULL_INSTALL__ = true;
    }
    if (typeof __VUE_I18N_LEGACY_API__ !== 'boolean') {
        shared_getGlobalThis().__VUE_I18N_LEGACY_API__ = true;
    }
    if (typeof __INTLIFY_JIT_COMPILATION__ !== 'boolean') {
        shared_getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false;
    }
    if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== 'boolean') {
        shared_getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
    }
    if (typeof __INTLIFY_PROD_DEVTOOLS__ !== 'boolean') {
        shared_getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
    }
}

const code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = incrementer(code$1);
const I18nWarnCodes = {
    FALLBACK_TO_ROOT: code$1, // 9
    NOT_SUPPORTED_PRESERVE: inc$1(), // 10
    NOT_SUPPORTED_FORMATTER: inc$1(), // 11
    NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(), // 12
    NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(), // 13
    COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(), // 14
    NOT_FOUND_PARENT_SCOPE: inc$1(), // 15
    IGNORE_OBJ_FLATTEN: inc$1(), // 16
    NOTICE_DROP_ALLOW_COMPOSITION: inc$1(), // 17
    NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: inc$1() // 18
};
const vue_i18n_warnMessages = {
    [I18nWarnCodes.FALLBACK_TO_ROOT]: `Fall back to {type} '{key}' with root locale.`,
    [I18nWarnCodes.NOT_SUPPORTED_PRESERVE]: `Not supported 'preserve'.`,
    [I18nWarnCodes.NOT_SUPPORTED_FORMATTER]: `Not supported 'formatter'.`,
    [I18nWarnCodes.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: `Not supported 'preserveDirectiveContent'.`,
    [I18nWarnCodes.NOT_SUPPORTED_GET_CHOICE_INDEX]: `Not supported 'getChoiceIndex'.`,
    [I18nWarnCodes.COMPONENT_NAME_LEGACY_COMPATIBLE]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [I18nWarnCodes.NOT_FOUND_PARENT_SCOPE]: `Not found parent scope. use the global scope.`,
    [I18nWarnCodes.IGNORE_OBJ_FLATTEN]: `Ignore object flatten: '{key}' key has an string value`,
    [I18nWarnCodes.NOTICE_DROP_ALLOW_COMPOSITION]: `'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze`,
    [I18nWarnCodes.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG]: `'translateExistCompatible' option will be dropped in the next major version.`
};
function vue_i18n_getWarnMessage(code, ...args) {
    return format(vue_i18n_warnMessages[code], ...args);
}

const vue_i18n_code = CoreErrorCodes.__EXTEND_POINT__;
const vue_i18n_inc = incrementer(vue_i18n_code);
const I18nErrorCodes = {
    // composer module errors
    UNEXPECTED_RETURN_TYPE: vue_i18n_code, // 26
    // legacy module errors
    INVALID_ARGUMENT: vue_i18n_inc(), // 27
    // i18n module errors
    MUST_BE_CALL_SETUP_TOP: vue_i18n_inc(), // 28
    NOT_INSTALLED: vue_i18n_inc(), // 29
    NOT_AVAILABLE_IN_LEGACY_MODE: vue_i18n_inc(), // 30
    // directive module errors
    REQUIRED_VALUE: vue_i18n_inc(), // 31
    INVALID_VALUE: vue_i18n_inc(), // 32
    // vue-devtools errors
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: vue_i18n_inc(), // 33
    NOT_INSTALLED_WITH_PROVIDE: vue_i18n_inc(), // 34
    // unexpected error
    UNEXPECTED_ERROR: vue_i18n_inc(), // 35
    // not compatible legacy vue-i18n constructor
    NOT_COMPATIBLE_LEGACY_VUE_I18N: vue_i18n_inc(), // 36
    // bridge support vue 2.x only
    BRIDGE_SUPPORT_VUE_2_ONLY: vue_i18n_inc(), // 37
    // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: vue_i18n_inc(), // 38
    // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: vue_i18n_inc(), // 39
    // for enhancement
    __EXTEND_POINT__: vue_i18n_inc() // 40
};
function createI18nError(code, ...args) {
    return createCompileError(code, null, ( false) ? 0 : undefined);
}
const vue_i18n_errorMessages = {
    [I18nErrorCodes.UNEXPECTED_RETURN_TYPE]: 'Unexpected return type in composer',
    [I18nErrorCodes.INVALID_ARGUMENT]: 'Invalid argument',
    [I18nErrorCodes.MUST_BE_CALL_SETUP_TOP]: 'Must be called at the top of a `setup` function',
    [I18nErrorCodes.NOT_INSTALLED]: 'Need to install with `app.use` function',
    [I18nErrorCodes.UNEXPECTED_ERROR]: 'Unexpected error',
    [I18nErrorCodes.NOT_AVAILABLE_IN_LEGACY_MODE]: 'Not available in legacy mode',
    [I18nErrorCodes.REQUIRED_VALUE]: `Required in value: {0}`,
    [I18nErrorCodes.INVALID_VALUE]: `Invalid value`,
    [I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: `Cannot setup vue-devtools plugin`,
    [I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE]: 'Need to install with `provide` function',
    [I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N]: 'Not compatible legacy VueI18n.',
    [I18nErrorCodes.BRIDGE_SUPPORT_VUE_2_ONLY]: 'vue-i18n-bridge support Vue 2.x only',
    [I18nErrorCodes.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]: 'Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode',
    [I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: 'Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly'
};

const TranslateVNodeSymbol = 
/* #__PURE__*/ makeSymbol('__translateVNode');
const DatetimePartsSymbol = /* #__PURE__*/ makeSymbol('__datetimeParts');
const NumberPartsSymbol = /* #__PURE__*/ makeSymbol('__numberParts');
const EnableEmitter = /* #__PURE__*/ makeSymbol('__enableEmitter');
const DisableEmitter = /* #__PURE__*/ makeSymbol('__disableEmitter');
const SetPluralRulesSymbol = makeSymbol('__setPluralRules');
makeSymbol('__intlifyMeta');
const InejctWithOptionSymbol = 
/* #__PURE__*/ makeSymbol('__injectWithOption');
const DisposeSymbol = /* #__PURE__*/ makeSymbol('__dispose');
const __VUE_I18N_BRIDGE__ =  '__VUE_I18N_BRIDGE__';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Transform flat json in obj to normal json in obj
 */
function handleFlatJson(obj) {
    // check obj
    if (!shared_isObject(obj)) {
        return obj;
    }
    for (const key in obj) {
        // check key
        if (!shared_hasOwn(obj, key)) {
            continue;
        }
        // handle for normal json
        if (!key.includes('.')) {
            // recursive process value if value is also a object
            if (shared_isObject(obj[key])) {
                handleFlatJson(obj[key]);
            }
        }
        // handle for flat json, transform to normal json
        else {
            // go to the last object
            const subKeys = key.split('.');
            const lastIndex = subKeys.length - 1;
            let currentObj = obj;
            let hasStringValue = false;
            for (let i = 0; i < lastIndex; i++) {
                if (!(subKeys[i] in currentObj)) {
                    currentObj[subKeys[i]] = {};
                }
                if (!shared_isObject(currentObj[subKeys[i]])) {
                    ( false) &&
                        0;
                    hasStringValue = true;
                    break;
                }
                currentObj = currentObj[subKeys[i]];
            }
            // update last object value, delete old property
            if (!hasStringValue) {
                currentObj[subKeys[lastIndex]] = obj[key];
                delete obj[key];
            }
            // recursive process value if value is also a object
            if (shared_isObject(currentObj[subKeys[lastIndex]])) {
                handleFlatJson(currentObj[subKeys[lastIndex]]);
            }
        }
    }
    return obj;
}
function getLocaleMessages(locale, options) {
    const { messages, __i18n, messageResolver, flatJson } = options;
    // prettier-ignore
    const ret = (shared_isPlainObject(messages)
        ? messages
        : shared_isArray(__i18n)
            ? {}
            : { [locale]: {} });
    // merge locale messages of i18n custom block
    if (shared_isArray(__i18n)) {
        __i18n.forEach(custom => {
            if ('locale' in custom && 'resource' in custom) {
                const { locale, resource } = custom;
                if (locale) {
                    ret[locale] = ret[locale] || {};
                    deepCopy(resource, ret[locale]);
                }
                else {
                    deepCopy(resource, ret);
                }
            }
            else {
                shared_isString(custom) && deepCopy(JSON.parse(custom), ret);
            }
        });
    }
    // handle messages for flat json
    if (messageResolver == null && flatJson) {
        for (const key in ret) {
            if (shared_hasOwn(ret, key)) {
                handleFlatJson(ret[key]);
            }
        }
    }
    return ret;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComponentOptions(instance) {
    return instance.type ;
}
function adjustI18nResources(gl, options, componentOptions // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    let messages = shared_isObject(options.messages) ? options.messages : {};
    if ('__i18nGlobal' in componentOptions) {
        messages = getLocaleMessages(gl.locale.value, {
            messages,
            __i18n: componentOptions.__i18nGlobal
        });
    }
    // merge locale messages
    const locales = Object.keys(messages);
    if (locales.length) {
        locales.forEach(locale => {
            gl.mergeLocaleMessage(locale, messages[locale]);
        });
    }
    {
        // merge datetime formats
        if (shared_isObject(options.datetimeFormats)) {
            const locales = Object.keys(options.datetimeFormats);
            if (locales.length) {
                locales.forEach(locale => {
                    gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
                });
            }
        }
        // merge number formats
        if (shared_isObject(options.numberFormats)) {
            const locales = Object.keys(options.numberFormats);
            if (locales.length) {
                locales.forEach(locale => {
                    gl.mergeNumberFormat(locale, options.numberFormats[locale]);
                });
            }
        }
    }
}
function createTextNode(key) {
    return createVNode(Text, null, key, 0)
        ;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
// extend VNode interface
const DEVTOOLS_META = '__INTLIFY_META__';
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
    return ((ctx, locale, key, type) => {
        return missing(locale, key, runtime_core_esm_bundler_getCurrentInstance() || undefined, type);
    });
}
// for Intlify DevTools
/* #__NO_SIDE_EFFECTS__ */
const getMetaInfo = () => {
    const instance = runtime_core_esm_bundler_getCurrentInstance();
    let meta = null; // eslint-disable-line @typescript-eslint/no-explicit-any
    return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META])
        ? { [DEVTOOLS_META]: meta } // eslint-disable-line @typescript-eslint/no-explicit-any
        : null;
};
/**
 * Create composer interface factory
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createComposer(options = {}, VueI18nLegacy) {
    const { __root, __injectWithOption } = options;
    const _isGlobal = __root === undefined;
    const flatJson = options.flatJson;
    const _ref = inBrowser ? reactivity_esm_bundler_ref : shallowRef;
    const translateExistCompatible = !!options.translateExistCompatible;
    if ((false)) {}
    let _inheritLocale = shared_isBoolean(options.inheritLocale)
        ? options.inheritLocale
        : true;
    const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale
        ? __root.locale.value
        : shared_isString(options.locale)
            ? options.locale
            : DEFAULT_LOCALE);
    const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale
        ? __root.fallbackLocale.value
        : shared_isString(options.fallbackLocale) ||
            shared_isArray(options.fallbackLocale) ||
            shared_isPlainObject(options.fallbackLocale) ||
            options.fallbackLocale === false
            ? options.fallbackLocale
            : _locale.value);
    const _messages = _ref(getLocaleMessages(_locale.value, options));
    // prettier-ignore
    const _datetimeFormats = _ref(shared_isPlainObject(options.datetimeFormats)
            ? options.datetimeFormats
            : { [_locale.value]: {} })
        ;
    // prettier-ignore
    const _numberFormats = _ref(shared_isPlainObject(options.numberFormats)
            ? options.numberFormats
            : { [_locale.value]: {} })
        ;
    // warning suppress options
    // prettier-ignore
    let _missingWarn = __root
        ? __root.missingWarn
        : shared_isBoolean(options.missingWarn) || shared_isRegExp(options.missingWarn)
            ? options.missingWarn
            : true;
    // prettier-ignore
    let _fallbackWarn = __root
        ? __root.fallbackWarn
        : shared_isBoolean(options.fallbackWarn) || shared_isRegExp(options.fallbackWarn)
            ? options.fallbackWarn
            : true;
    // prettier-ignore
    let _fallbackRoot = __root
        ? __root.fallbackRoot
        : shared_isBoolean(options.fallbackRoot)
            ? options.fallbackRoot
            : true;
    // configure fall back to root
    let _fallbackFormat = !!options.fallbackFormat;
    // runtime missing
    let _missing = shared_isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = shared_isFunction(options.missing)
        ? defineCoreMissingHandler(options.missing)
        : null;
    // postTranslation handler
    let _postTranslation = shared_isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    // prettier-ignore
    let _warnHtmlMessage = __root
        ? __root.warnHtmlMessage
        : shared_isBoolean(options.warnHtmlMessage)
            ? options.warnHtmlMessage
            : true;
    let _escapeParameter = !!options.escapeParameter;
    // custom linked modifiers
    // prettier-ignore
    const _modifiers = __root
        ? __root.modifiers
        : shared_isPlainObject(options.modifiers)
            ? options.modifiers
            : {};
    // pluralRules
    let _pluralRules = options.pluralRules || (__root && __root.pluralRules);
    // runtime context
    // eslint-disable-next-line prefer-const
    let _context;
    const getCoreContext = () => {
        _isGlobal && setFallbackContext(null);
        const ctxOptions = {
            version: vue_i18n_VERSION,
            locale: _locale.value,
            fallbackLocale: _fallbackLocale.value,
            messages: _messages.value,
            modifiers: _modifiers,
            pluralRules: _pluralRules,
            missing: _runtimeMissing === null ? undefined : _runtimeMissing,
            missingWarn: _missingWarn,
            fallbackWarn: _fallbackWarn,
            fallbackFormat: _fallbackFormat,
            unresolving: true,
            postTranslation: _postTranslation === null ? undefined : _postTranslation,
            warnHtmlMessage: _warnHtmlMessage,
            escapeParameter: _escapeParameter,
            messageResolver: options.messageResolver,
            messageCompiler: options.messageCompiler,
            __meta: { framework: 'vue' }
        };
        {
            ctxOptions.datetimeFormats = _datetimeFormats.value;
            ctxOptions.numberFormats = _numberFormats.value;
            ctxOptions.__datetimeFormatters = shared_isPlainObject(_context)
                ? _context.__datetimeFormatters
                : undefined;
            ctxOptions.__numberFormatters = shared_isPlainObject(_context)
                ? _context.__numberFormatters
                : undefined;
        }
        if ((false)) {}
        const ctx = createCoreContext(ctxOptions);
        _isGlobal && setFallbackContext(ctx);
        return ctx;
    };
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    // track reactivity
    function trackReactivityValues() {
        return [
                _locale.value,
                _fallbackLocale.value,
                _messages.value,
                _datetimeFormats.value,
                _numberFormats.value
            ]
            ;
    }
    // locale
    const locale = runtime_core_esm_bundler_computed({
        get: () => _locale.value,
        set: val => {
            _locale.value = val;
            _context.locale = _locale.value;
        }
    });
    // fallbackLocale
    const fallbackLocale = runtime_core_esm_bundler_computed({
        get: () => _fallbackLocale.value,
        set: val => {
            _fallbackLocale.value = val;
            _context.fallbackLocale = _fallbackLocale.value;
            updateFallbackLocale(_context, _locale.value, val);
        }
    });
    // messages
    const messages = runtime_core_esm_bundler_computed(() => _messages.value);
    // datetimeFormats
    const datetimeFormats = /* #__PURE__*/ runtime_core_esm_bundler_computed(() => _datetimeFormats.value);
    // numberFormats
    const numberFormats = /* #__PURE__*/ runtime_core_esm_bundler_computed(() => _numberFormats.value);
    // getPostTranslationHandler
    function getPostTranslationHandler() {
        return shared_isFunction(_postTranslation) ? _postTranslation : null;
    }
    // setPostTranslationHandler
    function setPostTranslationHandler(handler) {
        _postTranslation = handler;
        _context.postTranslation = handler;
    }
    // getMissingHandler
    function getMissingHandler() {
        return _missing;
    }
    // setMissingHandler
    function setMissingHandler(handler) {
        if (handler !== null) {
            _runtimeMissing = defineCoreMissingHandler(handler);
        }
        _missing = handler;
        _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type, arg // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        return type !== 'translate' || !arg.resolvedMessage;
    }
    const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
        trackReactivityValues(); // track reactive dependency
        // NOTE: experimental !!
        let ret;
        try {
            if (( false) || __INTLIFY_PROD_DEVTOOLS__) {
                setAdditionalMeta(getMetaInfo());
            }
            if (!_isGlobal) {
                _context.fallbackContext = __root
                    ? getFallbackContext()
                    : undefined;
            }
            ret = fn(_context);
        }
        finally {
            if (( false) || __INTLIFY_PROD_DEVTOOLS__) {
                setAdditionalMeta(null);
            }
            if (!_isGlobal) {
                _context.fallbackContext = undefined;
            }
        }
        if ((warnType !== 'translate exists' && // for not `te` (e.g `t`)
            isNumber(ret) &&
            ret === NOT_REOSLVED) ||
            (warnType === 'translate exists' && !ret) // for `te`
        ) {
            const [key, arg2] = argumentParser();
            if (false) {}
            return __root && _fallbackRoot
                ? fallbackSuccess(__root)
                : fallbackFail(key);
        }
        else if (successCondition(ret)) {
            return ret;
        }
        else {
            /* istanbul ignore next */
            throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
        }
    };
    // t
    function t(...args) {
        return wrapWithDeps(context => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), 'translate', root => Reflect.apply(root.t, root, [...args]), key => key, val => shared_isString(val));
    }
    // rt
    function rt(...args) {
        const [arg1, arg2, arg3] = args;
        if (arg3 && !shared_isObject(arg3)) {
            throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
        }
        return t(...[arg1, arg2, shared_assign({ resolvedMessage: true }, arg3 || {})]);
    }
    // d
    function d(...args) {
        return wrapWithDeps(context => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), 'datetime format', root => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, val => shared_isString(val));
    }
    // n
    function n(...args) {
        return wrapWithDeps(context => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), 'number format', root => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, val => shared_isString(val));
    }
    // for custom processor
    function normalize(values) {
        return values.map(val => shared_isString(val) || isNumber(val) || shared_isBoolean(val)
            ? createTextNode(String(val))
            : val);
    }
    const interpolate = (val) => val;
    const processor = {
        normalize,
        interpolate,
        type: 'vnode'
    };
    // translateVNode, using for `i18n-t` component
    function translateVNode(...args) {
        return wrapWithDeps(context => {
            let ret;
            const _context = context;
            try {
                _context.processor = processor;
                ret = Reflect.apply(translate, null, [_context, ...args]);
            }
            finally {
                _context.processor = null;
            }
            return ret;
        }, () => parseTranslateArgs(...args), 'translate', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[TranslateVNodeSymbol](...args), key => [createTextNode(key)], val => shared_isArray(val));
    }
    // numberParts, using for `i18n-n` component
    function numberParts(...args) {
        return wrapWithDeps(context => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), 'number format', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, val => shared_isString(val) || shared_isArray(val));
    }
    // datetimeParts, using for `i18n-d` component
    function datetimeParts(...args) {
        return wrapWithDeps(context => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), 'datetime format', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, val => shared_isString(val) || shared_isArray(val));
    }
    function setPluralRules(rules) {
        _pluralRules = rules;
        _context.pluralRules = _pluralRules;
    }
    // te
    function te(key, locale) {
        return wrapWithDeps(() => {
            if (!key) {
                return false;
            }
            const targetLocale = shared_isString(locale) ? locale : _locale.value;
            const message = getLocaleMessage(targetLocale);
            const resolved = _context.messageResolver(message, key);
            return !translateExistCompatible
                ? isMessageAST(resolved) ||
                    isMessageFunction(resolved) ||
                    shared_isString(resolved)
                : resolved != null;
        }, () => [key], 'translate exists', root => {
            return Reflect.apply(root.te, root, [key, locale]);
        }, NOOP_RETURN_FALSE, val => shared_isBoolean(val));
    }
    function resolveMessages(key) {
        let messages = null;
        const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
        for (let i = 0; i < locales.length; i++) {
            const targetLocaleMessages = _messages.value[locales[i]] || {};
            const messageValue = _context.messageResolver(targetLocaleMessages, key);
            if (messageValue != null) {
                messages = messageValue;
                break;
            }
        }
        return messages;
    }
    // tm
    function tm(key) {
        const messages = resolveMessages(key);
        // prettier-ignore
        return messages != null
            ? messages
            : __root
                ? __root.tm(key) || {}
                : {};
    }
    // getLocaleMessage
    function getLocaleMessage(locale) {
        return (_messages.value[locale] || {});
    }
    // setLocaleMessage
    function setLocaleMessage(locale, message) {
        if (flatJson) {
            const _message = { [locale]: message };
            for (const key in _message) {
                if (shared_hasOwn(_message, key)) {
                    handleFlatJson(_message[key]);
                }
            }
            message = _message[locale];
        }
        _messages.value[locale] = message;
        _context.messages = _messages.value;
    }
    // mergeLocaleMessage
    function mergeLocaleMessage(locale, message) {
        _messages.value[locale] = _messages.value[locale] || {};
        const _message = { [locale]: message };
        if (flatJson) {
            for (const key in _message) {
                if (shared_hasOwn(_message, key)) {
                    handleFlatJson(_message[key]);
                }
            }
        }
        message = _message[locale];
        deepCopy(message, _messages.value[locale]);
        _context.messages = _messages.value;
    }
    // getDateTimeFormat
    function getDateTimeFormat(locale) {
        return _datetimeFormats.value[locale] || {};
    }
    // setDateTimeFormat
    function setDateTimeFormat(locale, format) {
        _datetimeFormats.value[locale] = format;
        _context.datetimeFormats = _datetimeFormats.value;
        clearDateTimeFormat(_context, locale, format);
    }
    // mergeDateTimeFormat
    function mergeDateTimeFormat(locale, format) {
        _datetimeFormats.value[locale] = shared_assign(_datetimeFormats.value[locale] || {}, format);
        _context.datetimeFormats = _datetimeFormats.value;
        clearDateTimeFormat(_context, locale, format);
    }
    // getNumberFormat
    function getNumberFormat(locale) {
        return _numberFormats.value[locale] || {};
    }
    // setNumberFormat
    function setNumberFormat(locale, format) {
        _numberFormats.value[locale] = format;
        _context.numberFormats = _numberFormats.value;
        clearNumberFormat(_context, locale, format);
    }
    // mergeNumberFormat
    function mergeNumberFormat(locale, format) {
        _numberFormats.value[locale] = shared_assign(_numberFormats.value[locale] || {}, format);
        _context.numberFormats = _numberFormats.value;
        clearNumberFormat(_context, locale, format);
    }
    // for debug
    composerID++;
    // watch root locale & fallbackLocale
    if (__root && inBrowser) {
        watch(__root.locale, (val) => {
            if (_inheritLocale) {
                _locale.value = val;
                _context.locale = val;
                updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        });
        watch(__root.fallbackLocale, (val) => {
            if (_inheritLocale) {
                _fallbackLocale.value = val;
                _context.fallbackLocale = val;
                updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        });
    }
    // define basic composition API!
    const composer = {
        id: composerID,
        locale,
        fallbackLocale,
        get inheritLocale() {
            return _inheritLocale;
        },
        set inheritLocale(val) {
            _inheritLocale = val;
            if (val && __root) {
                _locale.value = __root.locale.value;
                _fallbackLocale.value = __root.fallbackLocale.value;
                updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        },
        get availableLocales() {
            return Object.keys(_messages.value).sort();
        },
        messages,
        get modifiers() {
            return _modifiers;
        },
        get pluralRules() {
            return _pluralRules || {};
        },
        get isGlobal() {
            return _isGlobal;
        },
        get missingWarn() {
            return _missingWarn;
        },
        set missingWarn(val) {
            _missingWarn = val;
            _context.missingWarn = _missingWarn;
        },
        get fallbackWarn() {
            return _fallbackWarn;
        },
        set fallbackWarn(val) {
            _fallbackWarn = val;
            _context.fallbackWarn = _fallbackWarn;
        },
        get fallbackRoot() {
            return _fallbackRoot;
        },
        set fallbackRoot(val) {
            _fallbackRoot = val;
        },
        get fallbackFormat() {
            return _fallbackFormat;
        },
        set fallbackFormat(val) {
            _fallbackFormat = val;
            _context.fallbackFormat = _fallbackFormat;
        },
        get warnHtmlMessage() {
            return _warnHtmlMessage;
        },
        set warnHtmlMessage(val) {
            _warnHtmlMessage = val;
            _context.warnHtmlMessage = val;
        },
        get escapeParameter() {
            return _escapeParameter;
        },
        set escapeParameter(val) {
            _escapeParameter = val;
            _context.escapeParameter = val;
        },
        t,
        getLocaleMessage,
        setLocaleMessage,
        mergeLocaleMessage,
        getPostTranslationHandler,
        setPostTranslationHandler,
        getMissingHandler,
        setMissingHandler,
        [SetPluralRulesSymbol]: setPluralRules
    };
    {
        composer.datetimeFormats = datetimeFormats;
        composer.numberFormats = numberFormats;
        composer.rt = rt;
        composer.te = te;
        composer.tm = tm;
        composer.d = d;
        composer.n = n;
        composer.getDateTimeFormat = getDateTimeFormat;
        composer.setDateTimeFormat = setDateTimeFormat;
        composer.mergeDateTimeFormat = mergeDateTimeFormat;
        composer.getNumberFormat = getNumberFormat;
        composer.setNumberFormat = setNumberFormat;
        composer.mergeNumberFormat = mergeNumberFormat;
        composer[InejctWithOptionSymbol] = __injectWithOption;
        composer[TranslateVNodeSymbol] = translateVNode;
        composer[DatetimePartsSymbol] = datetimeParts;
        composer[NumberPartsSymbol] = numberParts;
    }
    // for vue-devtools timeline event
    if ((false)) {}
    return composer;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Convert to I18n Composer Options from VueI18n Options
 *
 * @internal
 */
function convertComposerOptions(options) {
    const locale = shared_isString(options.locale) ? options.locale : DEFAULT_LOCALE;
    const fallbackLocale = shared_isString(options.fallbackLocale) ||
        shared_isArray(options.fallbackLocale) ||
        shared_isPlainObject(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : locale;
    const missing = shared_isFunction(options.missing) ? options.missing : undefined;
    const missingWarn = shared_isBoolean(options.silentTranslationWarn) ||
        shared_isRegExp(options.silentTranslationWarn)
        ? !options.silentTranslationWarn
        : true;
    const fallbackWarn = shared_isBoolean(options.silentFallbackWarn) ||
        shared_isRegExp(options.silentFallbackWarn)
        ? !options.silentFallbackWarn
        : true;
    const fallbackRoot = shared_isBoolean(options.fallbackRoot)
        ? options.fallbackRoot
        : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = shared_isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = shared_isFunction(options.postTranslation)
        ? options.postTranslation
        : undefined;
    const warnHtmlMessage = shared_isString(options.warnHtmlInMessage)
        ? options.warnHtmlInMessage !== 'off'
        : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = shared_isBoolean(options.sync) ? options.sync : true;
    if (false) {}
    if (false) {}
    let messages = options.messages;
    if (shared_isPlainObject(options.sharedMessages)) {
        const sharedMessages = options.sharedMessages;
        const locales = Object.keys(sharedMessages);
        messages = locales.reduce((messages, locale) => {
            const message = messages[locale] || (messages[locale] = {});
            shared_assign(message, sharedMessages[locale]);
            return messages;
        }, (messages || {}));
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    const translateExistCompatible = options
        .translateExistCompatible;
    return {
        locale,
        fallbackLocale,
        messages,
        flatJson,
        datetimeFormats,
        numberFormats,
        missing,
        missingWarn,
        fallbackWarn,
        fallbackRoot,
        fallbackFormat,
        modifiers,
        pluralRules: pluralizationRules,
        postTranslation,
        warnHtmlMessage,
        escapeParameter,
        messageResolver: options.messageResolver,
        inheritLocale,
        translateExistCompatible,
        __i18n,
        __root,
        __injectWithOption
    };
}
/**
 * create VueI18n interface factory
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createVueI18n(options = {}, VueI18nLegacy) {
    {
        const composer = createComposer(convertComposerOptions(options));
        const { __extender } = options;
        // defines VueI18n
        const vueI18n = {
            // id
            id: composer.id,
            // locale
            get locale() {
                return composer.locale.value;
            },
            set locale(val) {
                composer.locale.value = val;
            },
            // fallbackLocale
            get fallbackLocale() {
                return composer.fallbackLocale.value;
            },
            set fallbackLocale(val) {
                composer.fallbackLocale.value = val;
            },
            // messages
            get messages() {
                return composer.messages.value;
            },
            // datetimeFormats
            get datetimeFormats() {
                return composer.datetimeFormats.value;
            },
            // numberFormats
            get numberFormats() {
                return composer.numberFormats.value;
            },
            // availableLocales
            get availableLocales() {
                return composer.availableLocales;
            },
            // formatter
            get formatter() {
                ( false) && 0;
                // dummy
                return {
                    interpolate() {
                        return [];
                    }
                };
            },
            set formatter(val) {
                ( false) && 0;
            },
            // missing
            get missing() {
                return composer.getMissingHandler();
            },
            set missing(handler) {
                composer.setMissingHandler(handler);
            },
            // silentTranslationWarn
            get silentTranslationWarn() {
                return shared_isBoolean(composer.missingWarn)
                    ? !composer.missingWarn
                    : composer.missingWarn;
            },
            set silentTranslationWarn(val) {
                composer.missingWarn = shared_isBoolean(val) ? !val : val;
            },
            // silentFallbackWarn
            get silentFallbackWarn() {
                return shared_isBoolean(composer.fallbackWarn)
                    ? !composer.fallbackWarn
                    : composer.fallbackWarn;
            },
            set silentFallbackWarn(val) {
                composer.fallbackWarn = shared_isBoolean(val) ? !val : val;
            },
            // modifiers
            get modifiers() {
                return composer.modifiers;
            },
            // formatFallbackMessages
            get formatFallbackMessages() {
                return composer.fallbackFormat;
            },
            set formatFallbackMessages(val) {
                composer.fallbackFormat = val;
            },
            // postTranslation
            get postTranslation() {
                return composer.getPostTranslationHandler();
            },
            set postTranslation(handler) {
                composer.setPostTranslationHandler(handler);
            },
            // sync
            get sync() {
                return composer.inheritLocale;
            },
            set sync(val) {
                composer.inheritLocale = val;
            },
            // warnInHtmlMessage
            get warnHtmlInMessage() {
                return composer.warnHtmlMessage ? 'warn' : 'off';
            },
            set warnHtmlInMessage(val) {
                composer.warnHtmlMessage = val !== 'off';
            },
            // escapeParameterHtml
            get escapeParameterHtml() {
                return composer.escapeParameter;
            },
            set escapeParameterHtml(val) {
                composer.escapeParameter = val;
            },
            // preserveDirectiveContent
            get preserveDirectiveContent() {
                ( false) &&
                    0;
                return true;
            },
            set preserveDirectiveContent(val) {
                ( false) &&
                    0;
            },
            // pluralizationRules
            get pluralizationRules() {
                return composer.pluralRules || {};
            },
            // for internal
            __composer: composer,
            // t
            t(...args) {
                const [arg1, arg2, arg3] = args;
                const options = {};
                let list = null;
                let named = null;
                if (!shared_isString(arg1)) {
                    throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
                }
                const key = arg1;
                if (shared_isString(arg2)) {
                    options.locale = arg2;
                }
                else if (shared_isArray(arg2)) {
                    list = arg2;
                }
                else if (shared_isPlainObject(arg2)) {
                    named = arg2;
                }
                if (shared_isArray(arg3)) {
                    list = arg3;
                }
                else if (shared_isPlainObject(arg3)) {
                    named = arg3;
                }
                // return composer.t(key, (list || named || {}) as any, options)
                return Reflect.apply(composer.t, composer, [
                    key,
                    (list || named || {}),
                    options
                ]);
            },
            rt(...args) {
                return Reflect.apply(composer.rt, composer, [...args]);
            },
            // tc
            tc(...args) {
                const [arg1, arg2, arg3] = args;
                const options = { plural: 1 };
                let list = null;
                let named = null;
                if (!shared_isString(arg1)) {
                    throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
                }
                const key = arg1;
                if (shared_isString(arg2)) {
                    options.locale = arg2;
                }
                else if (isNumber(arg2)) {
                    options.plural = arg2;
                }
                else if (shared_isArray(arg2)) {
                    list = arg2;
                }
                else if (shared_isPlainObject(arg2)) {
                    named = arg2;
                }
                if (shared_isString(arg3)) {
                    options.locale = arg3;
                }
                else if (shared_isArray(arg3)) {
                    list = arg3;
                }
                else if (shared_isPlainObject(arg3)) {
                    named = arg3;
                }
                // return composer.t(key, (list || named || {}) as any, options)
                return Reflect.apply(composer.t, composer, [
                    key,
                    (list || named || {}),
                    options
                ]);
            },
            // te
            te(key, locale) {
                return composer.te(key, locale);
            },
            // tm
            tm(key) {
                return composer.tm(key);
            },
            // getLocaleMessage
            getLocaleMessage(locale) {
                return composer.getLocaleMessage(locale);
            },
            // setLocaleMessage
            setLocaleMessage(locale, message) {
                composer.setLocaleMessage(locale, message);
            },
            // mergeLocaleMessage
            mergeLocaleMessage(locale, message) {
                composer.mergeLocaleMessage(locale, message);
            },
            // d
            d(...args) {
                return Reflect.apply(composer.d, composer, [...args]);
            },
            // getDateTimeFormat
            getDateTimeFormat(locale) {
                return composer.getDateTimeFormat(locale);
            },
            // setDateTimeFormat
            setDateTimeFormat(locale, format) {
                composer.setDateTimeFormat(locale, format);
            },
            // mergeDateTimeFormat
            mergeDateTimeFormat(locale, format) {
                composer.mergeDateTimeFormat(locale, format);
            },
            // n
            n(...args) {
                return Reflect.apply(composer.n, composer, [...args]);
            },
            // getNumberFormat
            getNumberFormat(locale) {
                return composer.getNumberFormat(locale);
            },
            // setNumberFormat
            setNumberFormat(locale, format) {
                composer.setNumberFormat(locale, format);
            },
            // mergeNumberFormat
            mergeNumberFormat(locale, format) {
                composer.mergeNumberFormat(locale, format);
            },
            // getChoiceIndex
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getChoiceIndex(choice, choicesLength) {
                ( false) &&
                    0;
                return -1;
            }
        };
        vueI18n.__extender = __extender;
        // for vue-devtools timeline event
        if ((false)) {}
        return vueI18n;
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const baseFormatProps = {
    tag: {
        type: [String, Object]
    },
    locale: {
        type: String
    },
    scope: {
        type: String,
        // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
        validator: (val /* ComponentI18nScope */) => val === 'parent' || val === 'global',
        default: 'parent' /* ComponentI18nScope */
    },
    i18n: {
        type: Object
    }
};

function getInterpolateArg(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
{ slots }, // SetupContext,
keys) {
    if (keys.length === 1 && keys[0] === 'default') {
        // default slot with list
        const ret = slots.default ? slots.default() : [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return ret.reduce((slot, current) => {
            return [
                ...slot,
                // prettier-ignore
                ...(current.type === runtime_core_esm_bundler_Fragment ? current.children : [current]
                    )
            ];
        }, []);
    }
    else {
        // named slots
        return keys.reduce((arg, key) => {
            const slot = slots[key];
            if (slot) {
                arg[key] = slot();
            }
            return arg;
        }, {});
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFragmentableTag(tag) {
    return runtime_core_esm_bundler_Fragment ;
}

const TranslationImpl = /*#__PURE__*/ runtime_core_esm_bundler_defineComponent({
    /* eslint-disable */
    name: 'i18n-t',
    props: shared_assign({
        keypath: {
            type: String,
            required: true
        },
        plural: {
            type: [Number, String],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validator: (val) => isNumber(val) || !isNaN(val)
        }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
        const { slots, attrs } = context;
        // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
        const i18n = props.i18n ||
            useI18n({
                useScope: props.scope,
                __useComponent: true
            });
        return () => {
            const keys = Object.keys(slots).filter(key => key !== '_');
            const options = {};
            if (props.locale) {
                options.locale = props.locale;
            }
            if (props.plural !== undefined) {
                options.plural = shared_isString(props.plural) ? +props.plural : props.plural;
            }
            const arg = getInterpolateArg(context, keys);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
            const assignedAttrs = shared_assign({}, attrs);
            const tag = shared_isString(props.tag) || shared_isObject(props.tag)
                ? props.tag
                : getFragmentableTag();
            return h(tag, assignedAttrs, children);
        };
    }
});
/**
 * export the public type for h/tsx inference
 * also to avoid inline import() in generated d.ts files
 */
/**
 * Translation Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [TranslationProps](component#translationprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Component Interpolation](../guide/advanced/component)
 *
 * @example
 * ```html
 * <div id="app">
 *   <!-- ... -->
 *   <i18n keypath="term" tag="label" for="tos">
 *     <a :href="url" target="_blank">{{ $t('tos') }}</a>
 *   </i18n>
 *   <!-- ... -->
 * </div>
 * ```
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * const messages = {
 *   en: {
 *     tos: 'Term of Service',
 *     term: 'I accept xxx {0}.'
 *   },
 *   ja: {
 *     tos: '利用規約',
 *     term: '私は xxx の{0}に同意します。'
 *   }
 * }
 *
 * const i18n = createI18n({
 *   locale: 'en',
 *   messages
 * })
 *
 * const app = createApp({
 *   data: {
 *     url: '/term'
 *   }
 * }).use(i18n).mount('#app')
 * ```
 *
 * @VueI18nComponent
 */
const Translation = TranslationImpl;
const I18nT = (/* unused pure expression or super */ null && (Translation));

function vue_i18n_isVNode(target) {
    return shared_isArray(target) && !shared_isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
        const options = { part: true };
        let overrides = {};
        if (props.locale) {
            options.locale = props.locale;
        }
        if (shared_isString(props.format)) {
            options.key = props.format;
        }
        else if (shared_isObject(props.format)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (shared_isString(props.format.key)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                options.key = props.format.key;
            }
            // Filter out number format options only
            overrides = Object.keys(props.format).reduce((options, prop) => {
                return slotKeys.includes(prop)
                    ? shared_assign({}, options, { [prop]: props.format[prop] }) // eslint-disable-line @typescript-eslint/no-explicit-any
                    : options;
            }, {});
        }
        const parts = partFormatter(...[props.value, options, overrides]);
        let children = [options.key];
        if (shared_isArray(parts)) {
            children = parts.map((part, index) => {
                const slot = slots[part.type];
                const node = slot
                    ? slot({ [part.type]: part.value, index, parts })
                    : [part.value];
                if (vue_i18n_isVNode(node)) {
                    node[0].key = `${part.type}-${index}`;
                }
                return node;
            });
        }
        else if (shared_isString(parts)) {
            children = [parts];
        }
        const assignedAttrs = shared_assign({}, attrs);
        const tag = shared_isString(props.tag) || shared_isObject(props.tag)
            ? props.tag
            : getFragmentableTag();
        return h(tag, assignedAttrs, children);
    };
}

const NumberFormatImpl = /*#__PURE__*/ runtime_core_esm_bundler_defineComponent({
    /* eslint-disable */
    name: 'i18n-n',
    props: shared_assign({
        value: {
            type: Number,
            required: true
        },
        format: {
            type: [String, Object]
        }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
        const i18n = props.i18n ||
            useI18n({
                useScope: 'parent',
                __useComponent: true
            });
        return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[NumberPartsSymbol](...args));
    }
});
/**
 * export the public type for h/tsx inference
 * also to avoid inline import() in generated d.ts files
 */
/**
 * Number Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
 *
 * @VueI18nComponent
 */
const NumberFormat = NumberFormatImpl;
const I18nN = (/* unused pure expression or super */ null && (NumberFormat));

const DatetimeFormatImpl = /* #__PURE__*/ runtime_core_esm_bundler_defineComponent({
    /* eslint-disable */
    name: 'i18n-d',
    props: shared_assign({
        value: {
            type: [Number, Date],
            required: true
        },
        format: {
            type: [String, Object]
        }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
        const i18n = props.i18n ||
            useI18n({
                useScope: 'parent',
                __useComponent: true
            });
        return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[DatetimePartsSymbol](...args));
    }
});
/**
 * Datetime Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
 *
 * @VueI18nComponent
 */
const DatetimeFormat = DatetimeFormatImpl;
const I18nD = (/* unused pure expression or super */ null && (DatetimeFormat));

function getComposer$2(i18n, instance) {
    const i18nInternal = i18n;
    if (i18n.mode === 'composition') {
        return (i18nInternal.__getInstance(instance) || i18n.global);
    }
    else {
        const vueI18n = i18nInternal.__getInstance(instance);
        return vueI18n != null
            ? vueI18n.__composer
            : i18n.global.__composer;
    }
}
function vTDirective(i18n) {
    const _process = (binding) => {
        const { instance, modifiers, value } = binding;
        /* istanbul ignore if */
        if (!instance || !instance.$) {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        }
        const composer = getComposer$2(i18n, instance.$);
        if (false) {}
        const parsedValue = parseValue(value);
        return [
            Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
            composer
        ];
    };
    const register = (el, binding) => {
        const [textContent, composer] = _process(binding);
        if (inBrowser && i18n.global === composer) {
            // global scope only
            el.__i18nWatcher = watch(composer.locale, () => {
                binding.instance && binding.instance.$forceUpdate();
            });
        }
        el.__composer = composer;
        el.textContent = textContent;
    };
    const unregister = (el) => {
        if (inBrowser && el.__i18nWatcher) {
            el.__i18nWatcher();
            el.__i18nWatcher = undefined;
            delete el.__i18nWatcher;
        }
        if (el.__composer) {
            el.__composer = undefined;
            delete el.__composer;
        }
    };
    const update = (el, { value }) => {
        if (el.__composer) {
            const composer = el.__composer;
            const parsedValue = parseValue(value);
            el.textContent = Reflect.apply(composer.t, composer, [
                ...makeParams(parsedValue)
            ]);
        }
    };
    const getSSRProps = (binding) => {
        const [textContent] = _process(binding);
        return { textContent };
    };
    return {
        created: register,
        unmounted: unregister,
        beforeUpdate: update,
        getSSRProps
    };
}
function parseValue(value) {
    if (shared_isString(value)) {
        return { path: value };
    }
    else if (shared_isPlainObject(value)) {
        if (!('path' in value)) {
            throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, 'path');
        }
        return value;
    }
    else {
        throw createI18nError(I18nErrorCodes.INVALID_VALUE);
    }
}
function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (shared_isString(locale)) {
        options.locale = locale;
    }
    if (isNumber(choice)) {
        options.plural = choice;
    }
    if (isNumber(plural)) {
        options.plural = plural;
    }
    return [path, named, options];
}

function apply(app, i18n, ...options) {
    const pluginOptions = shared_isPlainObject(options[0])
        ? options[0]
        : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = shared_isBoolean(pluginOptions.globalInstall)
        ? pluginOptions.globalInstall
        : true;
    if (false) {}
    if (globalInstall) {
        [!useI18nComponentName ? Translation.name : 'i18n', 'I18nT'].forEach(name => app.component(name, Translation));
        [NumberFormat.name, 'I18nN'].forEach(name => app.component(name, NumberFormat));
        [DatetimeFormat.name, 'I18nD'].forEach(name => app.component(name, DatetimeFormat));
    }
    // install directive
    {
        app.directive('t', vTDirective(i18n));
    }
}

const VueDevToolsLabels = {
    ["vue-devtools-plugin-vue-i18n" /* VueDevToolsIDs.PLUGIN */]: 'Vue I18n devtools',
    ["vue-i18n-resource-inspector" /* VueDevToolsIDs.CUSTOM_INSPECTOR */]: 'I18n Resources',
    ["vue-i18n-timeline" /* VueDevToolsIDs.TIMELINE */]: 'Vue I18n'
};
const VueDevToolsPlaceholders = {
    ["vue-i18n-resource-inspector" /* VueDevToolsIDs.CUSTOM_INSPECTOR */]: 'Search for scopes ...'
};
const VueDevToolsTimelineColors = {
    ["vue-i18n-timeline" /* VueDevToolsIDs.TIMELINE */]: 0xffcd19
};

const VUE_I18N_COMPONENT_TYPES = 'vue-i18n: composer properties';
let devtoolsApi;
async function enableDevTools(app, i18n) {
    return new Promise((resolve, reject) => {
        try {
            setupDevtoolsPlugin({
                id: "vue-devtools-plugin-vue-i18n" /* VueDevToolsIDs.PLUGIN */,
                label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n" /* VueDevToolsIDs.PLUGIN */],
                packageName: 'vue-i18n',
                homepage: 'https://vue-i18n.intlify.dev',
                logo: 'https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png',
                componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
                app: app // eslint-disable-line @typescript-eslint/no-explicit-any
            }, api => {
                devtoolsApi = api;
                api.on.visitComponentTree(({ componentInstance, treeNode }) => {
                    updateComponentTreeTags(componentInstance, treeNode, i18n);
                });
                api.on.inspectComponent(({ componentInstance, instanceData }) => {
                    if (componentInstance.vnode.el &&
                        componentInstance.vnode.el.__VUE_I18N__ &&
                        instanceData) {
                        if (i18n.mode === 'legacy') {
                            // ignore global scope on legacy mode
                            if (componentInstance.vnode.el.__VUE_I18N__ !==
                                i18n.global.__composer) {
                                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                            }
                        }
                        else {
                            inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                        }
                    }
                });
                api.addInspector({
                    id: "vue-i18n-resource-inspector" /* VueDevToolsIDs.CUSTOM_INSPECTOR */,
                    label: VueDevToolsLabels["vue-i18n-resource-inspector" /* VueDevToolsIDs.CUSTOM_INSPECTOR */],
                    icon: 'language',
                    treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector" /* VueDevToolsIDs.CUSTOM_INSPECTOR */]
                });
                api.on.getInspectorTree(payload => {
                    if (payload.app === app &&
                        payload.inspectorId === "vue-i18n-resource-inspector" /* VueDevToolsIDs.CUSTOM_INSPECTOR */) {
                        registerScope(payload, i18n);
                    }
                });
                const roots = new Map();
                api.on.getInspectorState(async (payload) => {
                    if (payload.app === app &&
                        payload.inspectorId === "vue-i18n-resource-inspector" /* VueDevToolsIDs.CUSTOM_INSPECTOR */) {
                        api.unhighlightElement();
                        inspectScope(payload, i18n);
                        if (payload.nodeId === 'global') {
                            if (!roots.has(payload.app)) {
                                const [root] = await api.getComponentInstances(payload.app);
                                roots.set(payload.app, root);
                            }
                            api.highlightElement(roots.get(payload.app));
                        }
                        else {
                            const instance = getComponentInstance(payload.nodeId, i18n);
                            instance && api.highlightElement(instance);
                        }
                    }
                });
                api.on.editInspectorState(payload => {
                    if (payload.app === app &&
                        payload.inspectorId === "vue-i18n-resource-inspector" /* VueDevToolsIDs.CUSTOM_INSPECTOR */) {
                        editScope(payload, i18n);
                    }
                });
                api.addTimelineLayer({
                    id: "vue-i18n-timeline" /* VueDevToolsIDs.TIMELINE */,
                    label: VueDevToolsLabels["vue-i18n-timeline" /* VueDevToolsIDs.TIMELINE */],
                    color: VueDevToolsTimelineColors["vue-i18n-timeline" /* VueDevToolsIDs.TIMELINE */]
                });
                resolve(true);
            });
        }
        catch (e) {
            console.error(e);
            reject(false);
        }
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getI18nScopeLable(instance) {
    return (instance.type.name ||
        instance.type.displayName ||
        instance.type.__file ||
        'Anonymous');
}
function updateComponentTreeTags(instance, // eslint-disable-line @typescript-eslint/no-explicit-any
treeNode, i18n) {
    // prettier-ignore
    const global = i18n.mode === 'composition'
        ? i18n.global
        : i18n.global.__composer;
    if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
        // add custom tags local scope only
        if (instance.vnode.el.__VUE_I18N__ !== global) {
            const tag = {
                label: `i18n (${getI18nScopeLable(instance)} Scope)`,
                textColor: 0x000000,
                backgroundColor: 0xffcd19
            };
            treeNode.tags.push(tag);
        }
    }
}
function inspectComposer(instanceData, composer) {
    const type = VUE_I18N_COMPONENT_TYPES;
    instanceData.state.push({
        type,
        key: 'locale',
        editable: true,
        value: composer.locale.value
    });
    instanceData.state.push({
        type,
        key: 'availableLocales',
        editable: false,
        value: composer.availableLocales
    });
    instanceData.state.push({
        type,
        key: 'fallbackLocale',
        editable: true,
        value: composer.fallbackLocale.value
    });
    instanceData.state.push({
        type,
        key: 'inheritLocale',
        editable: true,
        value: composer.inheritLocale
    });
    instanceData.state.push({
        type,
        key: 'messages',
        editable: false,
        value: getLocaleMessageValue(composer.messages.value)
    });
    {
        instanceData.state.push({
            type,
            key: 'datetimeFormats',
            editable: false,
            value: composer.datetimeFormats.value
        });
        instanceData.state.push({
            type,
            key: 'numberFormats',
            editable: false,
            value: composer.numberFormats.value
        });
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLocaleMessageValue(messages) {
    const value = {};
    Object.keys(messages).forEach((key) => {
        const v = messages[key];
        if (shared_isFunction(v) && 'source' in v) {
            value[key] = getMessageFunctionDetails(v);
        }
        else if (isMessageAST(v) && v.loc && v.loc.source) {
            value[key] = v.loc.source;
        }
        else if (shared_isObject(v)) {
            value[key] = getLocaleMessageValue(v);
        }
        else {
            value[key] = v;
        }
    });
    return value;
}
const ESC = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '&': '&amp;'
};
function vue_i18n_escape(s) {
    return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
    return ESC[a] || a;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMessageFunctionDetails(func) {
    const argString = func.source ? `("${vue_i18n_escape(func.source)}")` : `(?)`;
    return {
        _custom: {
            type: 'function',
            display: `<span>ƒ</span> ${argString}`
        }
    };
}
function registerScope(payload, i18n) {
    payload.rootNodes.push({
        id: 'global',
        label: 'Global Scope'
    });
    // prettier-ignore
    const global = i18n.mode === 'composition'
        ? i18n.global
        : i18n.global.__composer;
    for (const [keyInstance, instance] of i18n.__instances) {
        // prettier-ignore
        const composer = i18n.mode === 'composition'
            ? instance
            : instance.__composer;
        if (global === composer) {
            continue;
        }
        payload.rootNodes.push({
            id: composer.id.toString(),
            label: `${getI18nScopeLable(keyInstance)} Scope`
        });
    }
}
function getComponentInstance(nodeId, i18n) {
    let instance = null;
    if (nodeId !== 'global') {
        for (const [component, composer] of i18n.__instances.entries()) {
            if (composer.id.toString() === nodeId) {
                instance = component;
                break;
            }
        }
    }
    return instance;
}
function getComposer$1(nodeId, i18n) {
    if (nodeId === 'global') {
        return i18n.mode === 'composition'
            ? i18n.global
            : i18n.global.__composer;
    }
    else {
        const instance = Array.from(i18n.__instances.values()).find(item => item.id.toString() === nodeId);
        if (instance) {
            return i18n.mode === 'composition'
                ? instance
                : instance.__composer;
        }
        else {
            return null;
        }
    }
}
function inspectScope(payload, i18n
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    const composer = getComposer$1(payload.nodeId, i18n);
    if (composer) {
        // TODO:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        payload.state = makeScopeInspectState(composer);
    }
    return null;
}
function makeScopeInspectState(composer) {
    const state = {};
    const localeType = 'Locale related info';
    const localeStates = [
        {
            type: localeType,
            key: 'locale',
            editable: true,
            value: composer.locale.value
        },
        {
            type: localeType,
            key: 'fallbackLocale',
            editable: true,
            value: composer.fallbackLocale.value
        },
        {
            type: localeType,
            key: 'availableLocales',
            editable: false,
            value: composer.availableLocales
        },
        {
            type: localeType,
            key: 'inheritLocale',
            editable: true,
            value: composer.inheritLocale
        }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = 'Locale messages info';
    const localeMessagesStates = [
        {
            type: localeMessagesType,
            key: 'messages',
            editable: false,
            value: getLocaleMessageValue(composer.messages.value)
        }
    ];
    state[localeMessagesType] = localeMessagesStates;
    {
        const datetimeFormatsType = 'Datetime formats info';
        const datetimeFormatsStates = [
            {
                type: datetimeFormatsType,
                key: 'datetimeFormats',
                editable: false,
                value: composer.datetimeFormats.value
            }
        ];
        state[datetimeFormatsType] = datetimeFormatsStates;
        const numberFormatsType = 'Datetime formats info';
        const numberFormatsStates = [
            {
                type: numberFormatsType,
                key: 'numberFormats',
                editable: false,
                value: composer.numberFormats.value
            }
        ];
        state[numberFormatsType] = numberFormatsStates;
    }
    return state;
}
function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
        let groupId;
        if (payload && 'groupId' in payload) {
            groupId = payload.groupId;
            delete payload.groupId;
        }
        devtoolsApi.addTimelineEvent({
            layerId: "vue-i18n-timeline" /* VueDevToolsIDs.TIMELINE */,
            event: {
                title: event,
                groupId,
                time: Date.now(),
                meta: {},
                data: payload || {},
                logType: event === "compile-error" /* VueDevToolsTimelineEvents.COMPILE_ERROR */
                    ? 'error'
                    : event === "fallback" /* VueDevToolsTimelineEvents.FALBACK */ ||
                        event === "missing" /* VueDevToolsTimelineEvents.MISSING */
                        ? 'warning'
                        : 'default'
            }
        });
    }
}
function editScope(payload, i18n) {
    const composer = getComposer$1(payload.nodeId, i18n);
    if (composer) {
        const [field] = payload.path;
        if (field === 'locale' && shared_isString(payload.state.value)) {
            composer.locale.value = payload.state.value;
        }
        else if (field === 'fallbackLocale' &&
            (shared_isString(payload.state.value) ||
                shared_isArray(payload.state.value) ||
                shared_isObject(payload.state.value))) {
            composer.fallbackLocale.value = payload.state.value;
        }
        else if (field === 'inheritLocale' && shared_isBoolean(payload.state.value)) {
            composer.inheritLocale = payload.state.value;
        }
    }
}

/**
 * Supports compatibility for legacy vue-i18n APIs
 * This mixin is used when we use vue-i18n@v9.x or later
 */
function defineMixin(vuei18n, composer, i18n) {
    return {
        beforeCreate() {
            const instance = runtime_core_esm_bundler_getCurrentInstance();
            /* istanbul ignore if */
            if (!instance) {
                throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
            }
            const options = this.$options;
            if (options.i18n) {
                const optionsI18n = options.i18n;
                if (options.__i18n) {
                    optionsI18n.__i18n = options.__i18n;
                }
                optionsI18n.__root = composer;
                if (this === this.$root) {
                    // merge option and gttach global
                    this.$i18n = mergeToGlobal(vuei18n, optionsI18n);
                }
                else {
                    optionsI18n.__injectWithOption = true;
                    optionsI18n.__extender = i18n.__vueI18nExtend;
                    // atttach local VueI18n instance
                    this.$i18n = createVueI18n(optionsI18n);
                    // extend VueI18n instance
                    const _vueI18n = this.$i18n;
                    if (_vueI18n.__extender) {
                        _vueI18n.__disposer = _vueI18n.__extender(this.$i18n);
                    }
                }
            }
            else if (options.__i18n) {
                if (this === this.$root) {
                    // merge option and gttach global
                    this.$i18n = mergeToGlobal(vuei18n, options);
                }
                else {
                    // atttach local VueI18n instance
                    this.$i18n = createVueI18n({
                        __i18n: options.__i18n,
                        __injectWithOption: true,
                        __extender: i18n.__vueI18nExtend,
                        __root: composer
                    });
                    // extend VueI18n instance
                    const _vueI18n = this.$i18n;
                    if (_vueI18n.__extender) {
                        _vueI18n.__disposer = _vueI18n.__extender(this.$i18n);
                    }
                }
            }
            else {
                // attach global VueI18n instance
                this.$i18n = vuei18n;
            }
            if (options.__i18nGlobal) {
                adjustI18nResources(composer, options, options);
            }
            // defines vue-i18n legacy APIs
            this.$t = (...args) => this.$i18n.t(...args);
            this.$rt = (...args) => this.$i18n.rt(...args);
            this.$tc = (...args) => this.$i18n.tc(...args);
            this.$te = (key, locale) => this.$i18n.te(key, locale);
            this.$d = (...args) => this.$i18n.d(...args);
            this.$n = (...args) => this.$i18n.n(...args);
            this.$tm = (key) => this.$i18n.tm(key);
            i18n.__setInstance(instance, this.$i18n);
        },
        mounted() {
            /* istanbul ignore if */
            if ((( false) || __VUE_PROD_DEVTOOLS__) &&
                !false &&
                this.$el &&
                this.$i18n) {
                const _vueI18n = this.$i18n;
                this.$el.__VUE_I18N__ = _vueI18n.__composer;
                const emitter = (this.__v_emitter =
                    createEmitter());
                _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
                emitter.on('*', addTimelineEvent);
            }
        },
        unmounted() {
            const instance = runtime_core_esm_bundler_getCurrentInstance();
            /* istanbul ignore if */
            if (!instance) {
                throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
            }
            const _vueI18n = this.$i18n;
            /* istanbul ignore if */
            if ((( false) || __VUE_PROD_DEVTOOLS__) &&
                !false &&
                this.$el &&
                this.$el.__VUE_I18N__) {
                if (this.__v_emitter) {
                    this.__v_emitter.off('*', addTimelineEvent);
                    delete this.__v_emitter;
                }
                if (this.$i18n) {
                    _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
                    delete this.$el.__VUE_I18N__;
                }
            }
            delete this.$t;
            delete this.$rt;
            delete this.$tc;
            delete this.$te;
            delete this.$d;
            delete this.$n;
            delete this.$tm;
            if (_vueI18n.__disposer) {
                _vueI18n.__disposer();
                delete _vueI18n.__disposer;
                delete _vueI18n.__extender;
            }
            i18n.__deleteInstance(instance);
            delete this.$i18n;
        }
    };
}
function mergeToGlobal(g, options) {
    g.locale = options.locale || g.locale;
    g.fallbackLocale = options.fallbackLocale || g.fallbackLocale;
    g.missing = options.missing || g.missing;
    g.silentTranslationWarn =
        options.silentTranslationWarn || g.silentFallbackWarn;
    g.silentFallbackWarn = options.silentFallbackWarn || g.silentFallbackWarn;
    g.formatFallbackMessages =
        options.formatFallbackMessages || g.formatFallbackMessages;
    g.postTranslation = options.postTranslation || g.postTranslation;
    g.warnHtmlInMessage = options.warnHtmlInMessage || g.warnHtmlInMessage;
    g.escapeParameterHtml = options.escapeParameterHtml || g.escapeParameterHtml;
    g.sync = options.sync || g.sync;
    g.__composer[SetPluralRulesSymbol](options.pluralizationRules || g.pluralizationRules);
    const messages = getLocaleMessages(g.locale, {
        messages: options.messages,
        __i18n: options.__i18n
    });
    Object.keys(messages).forEach(locale => g.mergeLocaleMessage(locale, messages[locale]));
    if (options.datetimeFormats) {
        Object.keys(options.datetimeFormats).forEach(locale => g.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
        Object.keys(options.numberFormats).forEach(locale => g.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
    return g;
}

/**
 * Injection key for {@link useI18n}
 *
 * @remarks
 * The global injection key for I18n instances with `useI18n`. this injection key is used in Web Components.
 * Specify the i18n instance created by {@link createI18n} together with `provide` function.
 *
 * @VueI18nGeneral
 */
const I18nInjectionKey = 
/* #__PURE__*/ makeSymbol('global-vue-i18n');
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function createI18n(options = {}, VueI18nLegacy) {
    // prettier-ignore
    const __legacyMode = __VUE_I18N_LEGACY_API__ && shared_isBoolean(options.legacy)
            ? options.legacy
            : __VUE_I18N_LEGACY_API__;
    // prettier-ignore
    const __globalInjection = shared_isBoolean(options.globalInjection)
        ? options.globalInjection
        : true;
    // prettier-ignore
    const __allowComposition = __VUE_I18N_LEGACY_API__ && __legacyMode
            ? !!options.allowComposition
            : true;
    const __instances = new Map();
    const [globalScope, __global] = createGlobal(options, __legacyMode);
    const symbol = /* #__PURE__*/ makeSymbol(( false) ? 0 : '');
    if ((false)) {}
    function __getInstance(component) {
        return __instances.get(component) || null;
    }
    function __setInstance(component, instance) {
        __instances.set(component, instance);
    }
    function __deleteInstance(component) {
        __instances.delete(component);
    }
    {
        const i18n = {
            // mode
            get mode() {
                return __VUE_I18N_LEGACY_API__ && __legacyMode
                    ? 'legacy'
                    : 'composition';
            },
            // allowComposition
            get allowComposition() {
                return __allowComposition;
            },
            // install plugin
            async install(app, ...options) {
                if ((( false) || __VUE_PROD_DEVTOOLS__) &&
                    !false) {
                    app.__VUE_I18N__ = i18n;
                }
                // setup global provider
                app.__VUE_I18N_SYMBOL__ = symbol;
                app.provide(app.__VUE_I18N_SYMBOL__, i18n);
                // set composer & vuei18n extend hook options from plugin options
                if (shared_isPlainObject(options[0])) {
                    const opts = options[0];
                    i18n.__composerExtend =
                        opts.__composerExtend;
                    i18n.__vueI18nExtend =
                        opts.__vueI18nExtend;
                }
                // global method and properties injection for Composition API
                let globalReleaseHandler = null;
                if (!__legacyMode && __globalInjection) {
                    globalReleaseHandler = injectGlobalFields(app, i18n.global);
                }
                // install built-in components and directive
                if (__VUE_I18N_FULL_INSTALL__) {
                    apply(app, i18n, ...options);
                }
                // setup mixin for Legacy API
                if (__VUE_I18N_LEGACY_API__ && __legacyMode) {
                    app.mixin(defineMixin(__global, __global.__composer, i18n));
                }
                // release global scope
                const unmountApp = app.unmount;
                app.unmount = () => {
                    globalReleaseHandler && globalReleaseHandler();
                    i18n.dispose();
                    unmountApp();
                };
                // setup vue-devtools plugin
                if ((( false) || __VUE_PROD_DEVTOOLS__) && !false) {
                    const ret = await enableDevTools(app, i18n);
                    if (!ret) {
                        throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
                    }
                    const emitter = createEmitter();
                    if (__legacyMode) {
                        const _vueI18n = __global;
                        _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const _composer = __global;
                        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
                    }
                    emitter.on('*', addTimelineEvent);
                }
            },
            // global accessor
            get global() {
                return __global;
            },
            dispose() {
                globalScope.stop();
            },
            // @internal
            __instances,
            // @internal
            __getInstance,
            // @internal
            __setInstance,
            // @internal
            __deleteInstance
        };
        return i18n;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useI18n(options = {}) {
    const instance = runtime_core_esm_bundler_getCurrentInstance();
    if (instance == null) {
        throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
    }
    if (!instance.isCE &&
        instance.appContext.app != null &&
        !instance.appContext.app.__VUE_I18N_SYMBOL__) {
        throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
    }
    const i18n = getI18nInstance(instance);
    const gl = getGlobalComposer(i18n);
    const componentOptions = getComponentOptions(instance);
    const scope = getScope(options, componentOptions);
    if (__VUE_I18N_LEGACY_API__) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (i18n.mode === 'legacy' && !options.__useComponent) {
            if (!i18n.allowComposition) {
                throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_IN_LEGACY_MODE);
            }
            return useI18nForLegacy(instance, scope, gl, options);
        }
    }
    if (scope === 'global') {
        adjustI18nResources(gl, options, componentOptions);
        return gl;
    }
    if (scope === 'parent') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let composer = getComposer(i18n, instance, options.__useComponent);
        if (composer == null) {
            if ((false)) {}
            composer = gl;
        }
        return composer;
    }
    const i18nInternal = i18n;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
        const composerOptions = shared_assign({}, options);
        if ('__i18n' in componentOptions) {
            composerOptions.__i18n = componentOptions.__i18n;
        }
        if (gl) {
            composerOptions.__root = gl;
        }
        composer = createComposer(composerOptions);
        if (i18nInternal.__composerExtend) {
            composer[DisposeSymbol] =
                i18nInternal.__composerExtend(composer);
        }
        setupLifeCycle(i18nInternal, instance, composer);
        i18nInternal.__setInstance(instance, composer);
    }
    return composer;
}
/**
 * Cast to VueI18n legacy compatible type
 *
 * @remarks
 * This API is provided only with [vue-i18n-bridge](https://vue-i18n.intlify.dev/guide/migration/ways.html#what-is-vue-i18n-bridge).
 *
 * The purpose of this function is to convert an {@link I18n} instance created with {@link createI18n | createI18n(legacy: true)} into a `vue-i18n@v8.x` compatible instance of `new VueI18n` in a TypeScript environment.
 *
 * @param i18n - An instance of {@link I18n}
 * @returns A i18n instance which is casted to {@link VueI18n} type
 *
 * @VueI18nTip
 * :new: provided by **vue-i18n-bridge only**
 *
 * @VueI18nGeneral
 */
/* #__NO_SIDE_EFFECTS__ */
const castToVueI18n = (i18n
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    if (!(__VUE_I18N_BRIDGE__ in i18n)) {
        throw createI18nError(I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N);
    }
    return i18n;
};
function createGlobal(options, legacyMode, VueI18nLegacy // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    const scope = effectScope();
    {
        const obj = __VUE_I18N_LEGACY_API__ && legacyMode
            ? scope.run(() => createVueI18n(options))
            : scope.run(() => createComposer(options));
        if (obj == null) {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        }
        return [scope, obj];
    }
}
function getI18nInstance(instance) {
    {
        const i18n = runtime_core_esm_bundler_inject(!instance.isCE
            ? instance.appContext.app.__VUE_I18N_SYMBOL__
            : I18nInjectionKey);
        /* istanbul ignore if */
        if (!i18n) {
            throw createI18nError(!instance.isCE
                ? I18nErrorCodes.UNEXPECTED_ERROR
                : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
        }
        return i18n;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getScope(options, componentOptions) {
    // prettier-ignore
    return isEmptyObject(options)
        ? ('__i18n' in componentOptions)
            ? 'local'
            : 'global'
        : !options.useScope
            ? 'local'
            : options.useScope;
}
function getGlobalComposer(i18n) {
    // prettier-ignore
    return i18n.mode === 'composition'
            ? i18n.global
            : i18n.global.__composer
        ;
}
function getComposer(i18n, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = getParentComponentInstance(target, useComponent);
    while (current != null) {
        const i18nInternal = i18n;
        if (i18n.mode === 'composition') {
            composer = i18nInternal.__getInstance(current);
        }
        else {
            if (__VUE_I18N_LEGACY_API__) {
                const vueI18n = i18nInternal.__getInstance(current);
                if (vueI18n != null) {
                    composer = vueI18n
                        .__composer;
                    if (useComponent &&
                        composer &&
                        !composer[InejctWithOptionSymbol] // eslint-disable-line @typescript-eslint/no-explicit-any
                    ) {
                        composer = null;
                    }
                }
            }
        }
        if (composer != null) {
            break;
        }
        if (root === current) {
            break;
        }
        current = current.parent;
    }
    return composer;
}
function getParentComponentInstance(target, useComponent = false) {
    if (target == null) {
        return null;
    }
    {
        // if `useComponent: true` will be specified, we get lexical scope owner instance for use-case slots
        return !useComponent
            ? target.parent
            : target.vnode.ctx || target.parent; // eslint-disable-line @typescript-eslint/no-explicit-any
    }
}
function setupLifeCycle(i18n, target, composer) {
    let emitter = null;
    {
        runtime_core_esm_bundler_onMounted(() => {
            // inject composer instance to DOM for intlify-devtools
            if ((( false) || __VUE_PROD_DEVTOOLS__) &&
                !false &&
                target.vnode.el) {
                target.vnode.el.__VUE_I18N__ = composer;
                emitter = createEmitter();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const _composer = composer;
                _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
                emitter.on('*', addTimelineEvent);
            }
        }, target);
        runtime_core_esm_bundler_onUnmounted(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const _composer = composer;
            // remove composer instance from DOM for intlify-devtools
            if ((( false) || __VUE_PROD_DEVTOOLS__) &&
                !false &&
                target.vnode.el &&
                target.vnode.el.__VUE_I18N__) {
                emitter && emitter.off('*', addTimelineEvent);
                _composer[DisableEmitter] && _composer[DisableEmitter]();
                delete target.vnode.el.__VUE_I18N__;
            }
            i18n.__deleteInstance(target);
            // dispose extended resources
            const dispose = _composer[DisposeSymbol];
            if (dispose) {
                dispose();
                delete _composer[DisposeSymbol];
            }
        }, target);
    }
}
function useI18nForLegacy(instance, scope, root, options = {} // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    const isLocalScope = scope === 'local';
    const _composer = shallowRef(null);
    if (isLocalScope &&
        instance.proxy &&
        !(instance.proxy.$options.i18n || instance.proxy.$options.__i18n)) {
        throw createI18nError(I18nErrorCodes.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);
    }
    const _inheritLocale = shared_isBoolean(options.inheritLocale)
        ? options.inheritLocale
        : !shared_isString(options.locale);
    const _locale = reactivity_esm_bundler_ref(
    // prettier-ignore
    !isLocalScope || _inheritLocale
        ? root.locale.value
        : shared_isString(options.locale)
            ? options.locale
            : DEFAULT_LOCALE);
    const _fallbackLocale = reactivity_esm_bundler_ref(
    // prettier-ignore
    !isLocalScope || _inheritLocale
        ? root.fallbackLocale.value
        : shared_isString(options.fallbackLocale) ||
            shared_isArray(options.fallbackLocale) ||
            shared_isPlainObject(options.fallbackLocale) ||
            options.fallbackLocale === false
            ? options.fallbackLocale
            : _locale.value);
    const _messages = reactivity_esm_bundler_ref(getLocaleMessages(_locale.value, options));
    // prettier-ignore
    const _datetimeFormats = reactivity_esm_bundler_ref(shared_isPlainObject(options.datetimeFormats)
        ? options.datetimeFormats
        : { [_locale.value]: {} });
    // prettier-ignore
    const _numberFormats = reactivity_esm_bundler_ref(shared_isPlainObject(options.numberFormats)
        ? options.numberFormats
        : { [_locale.value]: {} });
    // prettier-ignore
    const _missingWarn = isLocalScope
        ? root.missingWarn
        : shared_isBoolean(options.missingWarn) || shared_isRegExp(options.missingWarn)
            ? options.missingWarn
            : true;
    // prettier-ignore
    const _fallbackWarn = isLocalScope
        ? root.fallbackWarn
        : shared_isBoolean(options.fallbackWarn) || shared_isRegExp(options.fallbackWarn)
            ? options.fallbackWarn
            : true;
    // prettier-ignore
    const _fallbackRoot = isLocalScope
        ? root.fallbackRoot
        : shared_isBoolean(options.fallbackRoot)
            ? options.fallbackRoot
            : true;
    // configure fall back to root
    const _fallbackFormat = !!options.fallbackFormat;
    // runtime missing
    const _missing = shared_isFunction(options.missing) ? options.missing : null;
    // postTranslation handler
    const _postTranslation = shared_isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    // prettier-ignore
    const _warnHtmlMessage = isLocalScope
        ? root.warnHtmlMessage
        : shared_isBoolean(options.warnHtmlMessage)
            ? options.warnHtmlMessage
            : true;
    const _escapeParameter = !!options.escapeParameter;
    // prettier-ignore
    const _modifiers = isLocalScope
        ? root.modifiers
        : shared_isPlainObject(options.modifiers)
            ? options.modifiers
            : {};
    // pluralRules
    const _pluralRules = options.pluralRules || (isLocalScope && root.pluralRules);
    // track reactivity
    function trackReactivityValues() {
        return [
            _locale.value,
            _fallbackLocale.value,
            _messages.value,
            _datetimeFormats.value,
            _numberFormats.value
        ];
    }
    // locale
    const locale = runtime_core_esm_bundler_computed({
        get: () => {
            return _composer.value ? _composer.value.locale.value : _locale.value;
        },
        set: val => {
            if (_composer.value) {
                _composer.value.locale.value = val;
            }
            _locale.value = val;
        }
    });
    // fallbackLocale
    const fallbackLocale = runtime_core_esm_bundler_computed({
        get: () => {
            return _composer.value
                ? _composer.value.fallbackLocale.value
                : _fallbackLocale.value;
        },
        set: val => {
            if (_composer.value) {
                _composer.value.fallbackLocale.value = val;
            }
            _fallbackLocale.value = val;
        }
    });
    // messages
    const messages = runtime_core_esm_bundler_computed(() => {
        if (_composer.value) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return _composer.value.messages.value;
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return _messages.value;
        }
    });
    const datetimeFormats = runtime_core_esm_bundler_computed(() => _datetimeFormats.value);
    const numberFormats = runtime_core_esm_bundler_computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
        return _composer.value
            ? _composer.value.getPostTranslationHandler()
            : _postTranslation;
    }
    function setPostTranslationHandler(handler) {
        if (_composer.value) {
            _composer.value.setPostTranslationHandler(handler);
        }
    }
    function getMissingHandler() {
        return _composer.value ? _composer.value.getMissingHandler() : _missing;
    }
    function setMissingHandler(handler) {
        if (_composer.value) {
            _composer.value.setMissingHandler(handler);
        }
    }
    function warpWithDeps(fn) {
        trackReactivityValues();
        return fn();
    }
    function t(...args) {
        return _composer.value
            ? warpWithDeps(() => Reflect.apply(_composer.value.t, null, [...args]))
            : warpWithDeps(() => '');
    }
    function rt(...args) {
        return _composer.value
            ? Reflect.apply(_composer.value.rt, null, [...args])
            : '';
    }
    function d(...args) {
        return _composer.value
            ? warpWithDeps(() => Reflect.apply(_composer.value.d, null, [...args]))
            : warpWithDeps(() => '');
    }
    function n(...args) {
        return _composer.value
            ? warpWithDeps(() => Reflect.apply(_composer.value.n, null, [...args]))
            : warpWithDeps(() => '');
    }
    function tm(key) {
        return _composer.value ? _composer.value.tm(key) : {};
    }
    function te(key, locale) {
        return _composer.value ? _composer.value.te(key, locale) : false;
    }
    function getLocaleMessage(locale) {
        return _composer.value ? _composer.value.getLocaleMessage(locale) : {};
    }
    function setLocaleMessage(locale, message) {
        if (_composer.value) {
            _composer.value.setLocaleMessage(locale, message);
            _messages.value[locale] = message;
        }
    }
    function mergeLocaleMessage(locale, message) {
        if (_composer.value) {
            _composer.value.mergeLocaleMessage(locale, message);
        }
    }
    function getDateTimeFormat(locale) {
        return _composer.value ? _composer.value.getDateTimeFormat(locale) : {};
    }
    function setDateTimeFormat(locale, format) {
        if (_composer.value) {
            _composer.value.setDateTimeFormat(locale, format);
            _datetimeFormats.value[locale] = format;
        }
    }
    function mergeDateTimeFormat(locale, format) {
        if (_composer.value) {
            _composer.value.mergeDateTimeFormat(locale, format);
        }
    }
    function getNumberFormat(locale) {
        return _composer.value ? _composer.value.getNumberFormat(locale) : {};
    }
    function setNumberFormat(locale, format) {
        if (_composer.value) {
            _composer.value.setNumberFormat(locale, format);
            _numberFormats.value[locale] = format;
        }
    }
    function mergeNumberFormat(locale, format) {
        if (_composer.value) {
            _composer.value.mergeNumberFormat(locale, format);
        }
    }
    const wrapper = {
        get id() {
            return _composer.value ? _composer.value.id : -1;
        },
        locale,
        fallbackLocale,
        messages,
        datetimeFormats,
        numberFormats,
        get inheritLocale() {
            return _composer.value ? _composer.value.inheritLocale : _inheritLocale;
        },
        set inheritLocale(val) {
            if (_composer.value) {
                _composer.value.inheritLocale = val;
            }
        },
        get availableLocales() {
            return _composer.value
                ? _composer.value.availableLocales
                : Object.keys(_messages.value);
        },
        get modifiers() {
            return (_composer.value ? _composer.value.modifiers : _modifiers);
        },
        get pluralRules() {
            return (_composer.value ? _composer.value.pluralRules : _pluralRules);
        },
        get isGlobal() {
            return _composer.value ? _composer.value.isGlobal : false;
        },
        get missingWarn() {
            return _composer.value ? _composer.value.missingWarn : _missingWarn;
        },
        set missingWarn(val) {
            if (_composer.value) {
                _composer.value.missingWarn = val;
            }
        },
        get fallbackWarn() {
            return _composer.value ? _composer.value.fallbackWarn : _fallbackWarn;
        },
        set fallbackWarn(val) {
            if (_composer.value) {
                _composer.value.missingWarn = val;
            }
        },
        get fallbackRoot() {
            return _composer.value ? _composer.value.fallbackRoot : _fallbackRoot;
        },
        set fallbackRoot(val) {
            if (_composer.value) {
                _composer.value.fallbackRoot = val;
            }
        },
        get fallbackFormat() {
            return _composer.value ? _composer.value.fallbackFormat : _fallbackFormat;
        },
        set fallbackFormat(val) {
            if (_composer.value) {
                _composer.value.fallbackFormat = val;
            }
        },
        get warnHtmlMessage() {
            return _composer.value
                ? _composer.value.warnHtmlMessage
                : _warnHtmlMessage;
        },
        set warnHtmlMessage(val) {
            if (_composer.value) {
                _composer.value.warnHtmlMessage = val;
            }
        },
        get escapeParameter() {
            return _composer.value
                ? _composer.value.escapeParameter
                : _escapeParameter;
        },
        set escapeParameter(val) {
            if (_composer.value) {
                _composer.value.escapeParameter = val;
            }
        },
        t,
        getPostTranslationHandler,
        setPostTranslationHandler,
        getMissingHandler,
        setMissingHandler,
        rt,
        d,
        n,
        tm,
        te,
        getLocaleMessage,
        setLocaleMessage,
        mergeLocaleMessage,
        getDateTimeFormat,
        setDateTimeFormat,
        mergeDateTimeFormat,
        getNumberFormat,
        setNumberFormat,
        mergeNumberFormat
    };
    function sync(composer) {
        composer.locale.value = _locale.value;
        composer.fallbackLocale.value = _fallbackLocale.value;
        Object.keys(_messages.value).forEach(locale => {
            composer.mergeLocaleMessage(locale, _messages.value[locale]);
        });
        Object.keys(_datetimeFormats.value).forEach(locale => {
            composer.mergeDateTimeFormat(locale, _datetimeFormats.value[locale]);
        });
        Object.keys(_numberFormats.value).forEach(locale => {
            composer.mergeNumberFormat(locale, _numberFormats.value[locale]);
        });
        composer.escapeParameter = _escapeParameter;
        composer.fallbackFormat = _fallbackFormat;
        composer.fallbackRoot = _fallbackRoot;
        composer.fallbackWarn = _fallbackWarn;
        composer.missingWarn = _missingWarn;
        composer.warnHtmlMessage = _warnHtmlMessage;
    }
    onBeforeMount(() => {
        if (instance.proxy == null || instance.proxy.$i18n == null) {
            throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const composer = (_composer.value = instance.proxy.$i18n
            .__composer);
        if (scope === 'global') {
            _locale.value = composer.locale.value;
            _fallbackLocale.value = composer.fallbackLocale.value;
            _messages.value = composer.messages.value;
            _datetimeFormats.value = composer.datetimeFormats.value;
            _numberFormats.value = composer.numberFormats.value;
        }
        else if (isLocalScope) {
            sync(composer);
        }
    });
    return wrapper;
}
const globalExportProps = [
    'locale',
    'fallbackLocale',
    'availableLocales'
];
const globalExportMethods = ['t', 'rt', 'd', 'n', 'tm', 'te']
    ;
function injectGlobalFields(app, composer) {
    const i18n = Object.create(null);
    globalExportProps.forEach(prop => {
        const desc = Object.getOwnPropertyDescriptor(composer, prop);
        if (!desc) {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        }
        const wrap = reactivity_esm_bundler_isRef(desc.value) // check computed props
            ? {
                get() {
                    return desc.value.value;
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                set(val) {
                    desc.value.value = val;
                }
            }
            : {
                get() {
                    return desc.get && desc.get();
                }
            };
        Object.defineProperty(i18n, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n;
    globalExportMethods.forEach(method => {
        const desc = Object.getOwnPropertyDescriptor(composer, method);
        if (!desc || !desc.value) {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        }
        Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
    const dispose = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete app.config.globalProperties.$i18n;
        globalExportMethods.forEach(method => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete app.config.globalProperties[`$${method}`];
        });
    };
    return dispose;
}

{
    vue_i18n_initFeatureFlags();
}
// register message compiler at vue-i18n
if (__INTLIFY_JIT_COMPILATION__) {
    registerMessageCompiler(core_base_compile);
}
else {
    registerMessageCompiler(compileToFunction);
}
// register message resolver at vue-i18n
registerMessageResolver(resolveValue);
// register fallback locale at vue-i18n
registerLocaleFallbacker(fallbackWithLocaleChain);
// NOTE: experimental !!
if (( false) || __INTLIFY_PROD_DEVTOOLS__) {
    const target = shared_getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
if ((false)) {}



;// CONCATENATED MODULE: ./translations/common-en-US.puff.json
const common_en_US_puff_namespaceObject = /*#__PURE__*/JSON.parse('{"E":{"dropdownAccountSwitcher_link_switchAccount":{"value":"Switch accounts","note":"A link to the full page account switcher when the dropdown account switcher fails to load."},"dropdownAccountSwitcher_link_seeAll":{"value":"See all","note":"A link on the dropdown account switcher that links to the full page account switcher. The dropdown account switcher only shows a small selection of accounts, while the full page account switcher shows all the customer\'s accessible accounts."},"fullPageAccountSwitcher_title_selectAccount":{"value":"Select an account","note":"Title shown on the full page account switcher."},"fullPageAccountSwitcher_selectAvailableAccount_or_changeAccountLater":{"value":"Switch between your available accounts. You can change this selection at any time through the header.","note":"Text shown on the full page account switcher that instructs users how to change their account now or later."},"fullPageAccountSwitcher_katalAlert_filteredRights_header":{"value":"This list is filtered based on the page you are trying to access.","note":"Katal alert header for notifying user that the accounts displayed to them are filtered by rights"},"fullPageAccountSwitcher_katalAlert_filteredRights_body":{"value":"We\'ve filtered this list of your available accounts based on the page you are trying to access. You can pick a different page or account at any time using the header.","note":"Katal alert body for notifying user that the accounts displayed to them are filtered by rights"},"fullPageAccountSwitcher_button_loadMoreAccounts":{"value":"Load more accounts","note":"Text for the button in the column of accounts that allows the user to load more accounts."},"fullPageAccountSwitcher_button_selectAccount":{"value":"Select account","note":"Text for the button that confirms the user\'s selected account and redirects them back to the site."},"fullPageAccountSwitcher_emptyList":{"value":"There\'s nothing to show here.","note":"The text displayed when a list of items is empty."},"fullPageAccountSwitcher_errorMessage":{"value":"Your accounts didn\'t load. Please try again.","note":"Error message displayed to users who encounter an error while loading their account data in the account switcher."},"fullPageAccountSwitcher_loadingAccounts":{"value":"Loading accounts...","note":"The text displayed when the accounts in the account switcher are being loaded."},"fullPageAccountSwitcher_current":{"value":"current","note":"The word current used to indicate the currently selected account."},"fullPageAccountSwitcher_notAuthorizedGeneric":{"value":"You are not currently authorized to access any accounts.","note":"The text displayed when a user is not authorized to any accounts."},"fullPageAccountSwitcher_button_returnToSignIn":{"value":"Return to sign in","note":"The button text used for logging the user out when"}}}');
// EXTERNAL MODULE: ./src/js/util/convertPuffJToVueI18n.js
var convertPuffJToVueI18n = __webpack_require__(76);
var convertPuffJToVueI18n_default = /*#__PURE__*/__webpack_require__.n(convertPuffJToVueI18n);
;// CONCATENATED MODULE: ./src/js/util/i18n.js





/* istanbul ignore file */

var LOCALE_PATTERN = /^[a-z]{2}-[A-Z]{2}$/;
function listenForTranslations(locale, i18n) {
  if (window.accountSwitcherAssetsTranslations && window.accountSwitcherAssetsTranslations[locale]) {
    i18n.global.setLocaleMessage(locale, window.accountSwitcherAssetsTranslations[locale]);
  } else {
    document.addEventListener('accountSwitcherAssetsTranslationsLoaded', function (event) {
      if (event.locale === locale) {
        i18n.global.setLocaleMessage(locale, window.accountSwitcherAssetsTranslations[locale]);
      }
    });
  }
}
function initVueI18n() {
  var locale = i18n_getLocale();
  var i18n = createI18n({
    locale: locale,
    fallbackLocale: 'en-US',
    messages: {
      // Only en-US is included in the main bundle, all others are loaded dynamically when needed to reduce the payload's size
      'en-US': convertPuffJToVueI18n_default()(common_en_US_puff_namespaceObject.E)
    },
    // This callback is called when no translation could be found for either the current locale or en-US. This
    // results in the key itself being displayed to the user, which is very bad! This would only happen if either
    // the key isn't present in common.puff.json or "panther translate" wasn't run after adding it.
    missing: function missing(locale, key) {
      var publisher = getMetricsPublisher().newChildActionPublisherForMethod('VueI18n');
      publisher.publishCounterMonitor('invalidTranslationKey', 1);
      publisher.publishCounterMonitor("invalidTranslationKey-".concat(key), 1);
    }
  });
  if (locale !== 'en-US') {
    listenForTranslations(locale, i18n);
  }
  return i18n;
}
function i18n_getLocale() {
  var lang = document.documentElement.lang;
  return LOCALE_PATTERN.test(lang) ? lang : 'en-US';
}
/* harmony default export */ const util_i18n = (initVueI18n);
;// CONCATENATED MODULE: ./src/js/plugins/localePlugin.js

/* harmony default export */ const localePlugin = ({
  install: function install(app) {
    app.config.globalProperties.$locale = i18n_getLocale();
  }
});
;// CONCATENATED MODULE: ./src/js/plugins/piniaGlobalPropertiesPlugin.js

/**
 * This Pinia plugin (not a Vue plugin!) grants all Pinia stores the ability to access the global properties of the Vue
 * app. These global properties are reactive, so they will be kept in sync between the Pinia stores and Vue app.
 *
 * @param app
 * @param store
 */
function piniaGlobalPropertiesPlugin(_ref) {
  var app = _ref.app;
  return _objectSpread2({}, app.config.globalProperties);
}
;// CONCATENATED MODULE: ./src/js/dropdownAccountSwitcher.js

















/* istanbul ignore file */
var mountPointId = 'dropdown-account-switcher-container';
var mountPointSelector = "#".concat(mountPointId);
function mountVue() {
  var initializationTimestamp = Date.now();
  var container = document.getElementById(mountPointId);
  var _window$dropdownAccou = window.dropdownAccountSwitcherConfiguration,
    stage = _window$dropdownAccou.stage,
    realm = _window$dropdownAccou.realm;
  initializeMetricsPublisher(stage, realm);
  var mode = container.getAttribute('data-mode') || constants_AccountSwitcherModes.Default;
  var nature = container.getAttribute('data-nature');
  if (mode !== constants_AccountSwitcherModes.GlobalOnly && !nature) {
    throw new Error('data-nature attribute is required for modes that support regional accounts!');
  }
  var accountSwitcher = createApp(DropdownAccountSwitcher, {
    mode: mode,
    nature: nature
  });
  var pinia = createPinia();
  pinia.use(piniaGlobalPropertiesPlugin);
  var i18n = util_i18n();
  for (var _i = 0, _arr = [errorHandlerPlugin, pinia, katalMetricsPlugin, i18n, localePlugin]; _i < _arr.length; _i++) {
    var plugin = _arr[_i];
    accountSwitcher.use(plugin);
  }
  var monsApp = container.getAttribute('data-mons-app');
  var monsConfig = container.getAttribute('data-mons-config');
  accountSwitcher.use(monsAppConfigPlugin, {
    monsApp: monsApp,
    monsConfig: monsConfig
  });
  accountSwitcher.use(sharedMetricsPlugin, {
    initializationTimestamp: initializationTimestamp,
    pickerType: 'DropdownAccountSwitcher'
  });
  if (mode !== constants_AccountSwitcherModes.GlobalOnly) {
    setupContainerObserver(container, nature);
  }
  accountSwitcher.mount(mountPointSelector);
}

// TODO(https://app.asana.com/0/1207142706897991/1208249775915548/f) Remove allowing the trim to preload the regional account data
function setupContainerObserver(container, nature) {
  var initializationTimestamp = Date.now();
  var config = {
    attributes: true,
    attributeFilter: ['data-regional-account-loading-state', 'data-regional-account'],
    attributeOldValue: true
  };
  var callback = function callback(mutationList, observer) {
    var regionalAccountStore = useRegionalAccountStore();
    var _iterator = _createForOfIteratorHelper(mutationList),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _mutation$target, _mutation$target2;
        var mutation = _step.value;
        var _loadingState = mutation === null || mutation === void 0 || (_mutation$target = mutation.target) === null || _mutation$target === void 0 || (_mutation$target = _mutation$target.dataset) === null || _mutation$target === void 0 ? void 0 : _mutation$target.regionalAccountLoadingState;
        var regionalAccount = JSON.parse((mutation === null || mutation === void 0 || (_mutation$target2 = mutation.target) === null || _mutation$target2 === void 0 || (_mutation$target2 = _mutation$target2.dataset) === null || _mutation$target2 === void 0 ? void 0 : _mutation$target2.regionalAccount) || null);
        regionalAccountStore.setExternallyLoadedRegionalAccount(nature, _loadingState, regionalAccount);
        getMetricsPublisher().newChildActionPublisherForMethod('DropdownAccountSwitcher').publishCounterMonitor("regional-account-observer.".concat(_loadingState), 1);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var regionalAccountStore = useRegionalAccountStore();
  var loadingState = container.getAttribute('data-regional-account-loading-state');
  if (loadingState === constants_LoadingStates.loading) {
    regionalAccountStore.setExternallyLoadedRegionalAccount(nature, loadingState, null);
    var observer = new MutationObserver(callback);
    observer.observe(container, config);
    getMetricsPublisher().newChildActionPublisherForMethod('DropdownAccountSwitcher').publishCounterMonitor('regional-account-observer.created', 1);
  } else if (loadingState) {
    var regionalAccount = JSON.parse(container.getAttribute('data-regional-account'));
    regionalAccountStore.setExternallyLoadedRegionalAccount(nature, loadingState, regionalAccount);
  }
}
if (document.getElementById(mountPointId) !== null) {
  mountVue();
} else {
  // Reference: https://stackoverflow.com/questions/31659567/performance-of-mutationobserver-to-detect-nodes-in-entire-dom/39332340#39332340
  new MutationObserver(function (mutations, observer) {
    var el = document.getElementById(mountPointId);
    if (el) {
      observer.disconnect();
      mountVue();
    }
  }).observe(document.getElementById('sc-navbar-container'), {
    childList: true,
    subtree: true
  });
}
})();

trim = __webpack_exports__;
/******/ })()
;