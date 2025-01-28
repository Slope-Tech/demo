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
         * Making url for total estimation request.
         *
         * @param {Function} originFn - Original method.
         * @param {Object} quote - Quote model.
         * @returns {String} Result url.
         */
        getUrlForTotalsEstimationForNewAddress: function (originFn, quote) {
            var params, urls;

            if (window.checkoutConfig.isNegotiableQuote) {
                params = {
                    quoteId: quote.getQuoteId()
                };
                urls = {
                    'negotiable': '/carts/:quoteId/totals-information/?isNegotiableQuote=true'
                };

                return this.getUrl(urls, params);
            }

            return originFn(quote);
        },

        /**
         * Making url for estimation shipping methods request.
         *
         * @param {Function} originFn - Original method.
         * @param {Object} quote - Quote model.
         * @returns {String} Result url.
         */
        getUrlForEstimationShippingMethodsForNewAddress: function (originFn, quote) {
            var params, urls;

            if (window.checkoutConfig.isNegotiableQuote) {
                params = {
                    quoteId: quote.getQuoteId()
                };
                urls = {
                    'negotiable': '/negotiable-carts/:quoteId/estimate-shipping-methods/?isNegotiableQuote=true'
                };

                return this.getUrl(urls, params);
            }

            return originFn(quote);
        },

        /**
         * Making url for estimation shipping methods by address id request.
         *
         * @param {Function} originFn - Original method.
         * @param {Object} quote - Quote model.
         * @returns {String} Result url.
         */
        getUrlForEstimationShippingMethodsByAddressId: function (originFn, quote) {
            var params, urls,
                url = '/negotiable-carts/:quoteId/estimate-shipping-methods-by-address-id/?isNegotiableQuote=true';

            if (window.checkoutConfig.isNegotiableQuote) {
                params = {
                    quoteId: window.checkoutConfig.negotiableQuoteId
                };
                urls = {
                    'negotiable': url
                };

                return this.getUrl(urls, params);
            }

            return originFn(quote);
        },

        /**
         * Making url for getting apply coupon request.
         *
         * @param {Function} originFn - Original method.
         * @param {String} couponCode - Coupon code.
         * @param {String} quoteId - Quote ID.
         * @returns {String} Result url.
         */
        getApplyCouponUrl: function (originFn, couponCode, quoteId) {
            var params, urls;

            if (window.checkoutConfig.isNegotiableQuote) {
                params = {
                    quoteId: quoteId,
                    couponCode: couponCode
                };
                urls = {
                    'negotiable': '/negotiable-carts/:quoteId/coupons/:couponCode/?isNegotiableQuote=true'
                };

                return this.getUrl(urls, params);
            }

            return originFn(couponCode, quoteId);
        },

        /**
         * Making url for getting cancel coupon request.
         *
         * @param {Function} originFn - Original method.
         * @param {String} quoteId - Quote ID.
         * @returns {String} Result url.
         */
        getCancelCouponUrl: function (originFn, quoteId) {
            var params, urls;

            if (window.checkoutConfig.isNegotiableQuote) {
                params = {
                    quoteId: quoteId
                };
                urls = {
                    'negotiable': '/negotiable-carts/:quoteId/coupons/?isNegotiableQuote=true'
                };

                return this.getUrl(urls, params);
            }

            return originFn(quoteId);
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

            if (window.checkoutConfig.isNegotiableQuote) {
                params = {
                    quoteId: quote.getQuoteId()
                };
                urls = {
                    'negotiable': '/negotiable-carts/:quoteId/totals/?isNegotiableQuote=true'
                };

                return this.getUrl(urls, params);
            }

            return originFn(quote);
        },

        /**
         * Making url for setting shipping information request.
         *
         * @param {Function} originFn - Original method.
         * @param {Object} quote - Quote model.
         * @returns {String} Result url.
         */
        getUrlForSetShippingInformation: function (originFn, quote) {
            var params, urls;

            if (window.checkoutConfig.isNegotiableQuote) {
                params = {
                    quoteId: quote.getQuoteId()
                };
                urls = {
                    'negotiable': '/negotiable-carts/:quoteId/shipping-information/?isNegotiableQuote=true'
                };

                return this.getUrl(urls, params);
            }

            return originFn(quote);
        },

        /**
         * Get checkout method name.
         *
         * @param {Function} originFn - Original method.
         * @returns {String} Method name.
         */
        getCheckoutMethod: function (originFn) {
            if (window.checkoutConfig.isNegotiableQuote) {
                return 'negotiable';
            }

            return originFn();
        }
    };

    return function (target) {
        return wrapper.extend(target, extender);
    };
});
