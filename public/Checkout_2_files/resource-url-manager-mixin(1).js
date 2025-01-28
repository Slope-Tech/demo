/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'mage/utils/wrapper'
], function (wrapper) {
    'use strict';

    var extender = {
        /**
         * Update the url used for shipping method estimates (obtained by address) for purchase orders.
         *
         * @param {Function} originFn - Original method.
         * @param {Object} quote - Quote model.
         * @returns {String} Result url.
         */
        getUrlForEstimationShippingMethodsForNewAddress: function (originFn, quote) {
            var params, urls,
                url = '/purchase-order-carts/:quoteId/estimate-shipping-methods';

            if (window.checkoutConfig.isPurchaseOrder) {
                params = {
                    quoteId: window.checkoutConfig.purchaseOrderQuoteId
                };
                urls = {
                    'default': url
                };

                return this.getUrl(urls, params);
            }

            return originFn(quote);
        },

        /**
         * Update the url used for shipping method estimates (obtained by address Id) for purchase orders.
         *
         * @param {Function} originFn - Original method.
         * @param {Object} quote - Quote model.
         * @returns {String} Result url.
         */
        getUrlForEstimationShippingMethodsByAddressId: function (originFn, quote) {
            var params, urls,
                url = '/purchase-order-carts/:quoteId/estimate-shipping-methods-by-address-id';

            if (window.checkoutConfig.isPurchaseOrder) {
                params = {
                    quoteId: window.checkoutConfig.purchaseOrderQuoteId
                };
                urls = {
                    'default': url
                };

                return this.getUrl(urls, params);
            }

            return originFn(quote);
        },

        /**
         * Making url for cart totals request.
         *
         * @param {Function} originFn - Original method.
         * @param {Object} quote - Quote model.
         * @returns {String} Result url.
         */
        getUrlForCartTotals: function (originFn, quote) {
            var params, urls;

            if (window.checkoutConfig.isPurchaseOrder) {
                params = {
                    quoteId: quote.getQuoteId()
                };
                urls = {
                    'default': '/purchase-order-carts/:quoteId/totals'
                };

                return this.getUrl(urls, params);
            }

            return originFn(quote);
        }
    };

    return function (target) {
        return wrapper.extend(target, extender);
    };
});
