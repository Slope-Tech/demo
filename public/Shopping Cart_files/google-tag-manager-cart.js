/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'Magento_Customer/js/customer-data',
    'Magento_GoogleTagManager/js/google-analytics-universal',
    'Magento_GoogleTagManager/js/google-analytics-universal-cart',
    'underscore',
    'jquery-ui-modules/widget'
], function ($, customerData, GoogleAnalyticsUniversal, GoogleAnalyticsUniversalCart, _) {
    'use strict';

    $.widget('mage.gtmCart', {
        options: {
            dlCurrencyCode: window.dlCurrencyCode || '',
            dataLayer: window.dataLayer || [],
            staticImpressions: window.staticImpressions || [],
            staticPromotions: window.staticPromotions || [],
            updatedImpressions: window.updatedImpressions || [],
            updatedPromotions: window.updatedPromotions || [],
            cookieAddToCart: '',
            advancedAddToCart: '',
            cookieRemoveFromCart: window.cookieRemoveFromCart || '',
            temporaryEventStorage: [],
            blockNames: [],
            events: {
                AJAX_ADD_TO_CART: 'ajax:addToCart',
                AJAX_REMOVE_FROM_CART: 'ajax:removeFromCart'
            },
            actions: {}
        },

        /**
         * @inheritdoc
         *
         * @private
         */
        _create: function () {
            this.googleAnalyticsUniversalCart = new GoogleAnalyticsUniversalCart({
                dlCurrencyCode: this.options.dlCurrencyCode,
                dataLayer: this.options.dataLayer,
                cookieAddToCart: this.options.cookieAddToCart,
                advancedAddToCart: this.options.advancedAddToCart,
                cookieRemoveFromCart: this.options.cookieRemoveFromCart
            });
            this.googleAnalyticsUniversal = new GoogleAnalyticsUniversal({
                blockNames: this.options.blockNames,
                dlCurrencyCode: this.options.dlCurrencyCode,
                dataLayer: this.options.dataLayer,
                staticImpressions: this.options.staticImpressions,
                staticPromotions: this.options.staticPromotions,
                updatedImpressions: this.options.updatedImpressions,
                updatedPromotions: this.options.updatedPromotions
            });
            this.cartItemsCache = [];
            this._initActions();
            this._setListeners();
            this._setCartDataListener();
            this.googleAnalyticsUniversal.updatePromotions();
            this.googleAnalyticsUniversal.updateImpressions();
            this.googleAnalyticsUniversalCart.parseAddToCartCookies();
            this.googleAnalyticsUniversalCart.parseAddToCartAdvanced();
            this.googleAnalyticsUniversalCart.parseRemoveFromCartCookies();
            this.googleAnalyticsUniversalCart.subscribeProductsUpdateInCart();
            this.googleAnalyticsUniversalCart.listenMinicartReload();
        },

        /**
         * Initialize actions callback function.
         *
         * @private
         */
        _initActions: function () {
            var events = this.options.events;

            this.options.actions[events.AJAX_ADD_TO_CART] = function (product) {
                this.googleAnalyticsUniversal.addToCart(
                    product['product_sku'],
                    product['product_name'],
                    product['product_price_value'],
                    product.qty
                );
            }.bind(this);

            this.options.actions[events.AJAX_REMOVE_FROM_CART] = function (product) {
                this.googleAnalyticsUniversal.removeFromCart(
                    product['product_sku'],
                    product['product_name'],
                    product['product_price_value'],
                    product.qty
                );
            }.bind(this);
        },

        /**
         * Finds and returns product.
         *
         * @param {Object} productInfo - product info.
         * @return {Object} product data.
         */
        getProduct: function (productInfo) {
            var searchCriteria,
                productOptionValues = productInfo.optionValues || [],
                productFromCache,
                productFromCart;

            /**
             * Product search criteria.
             *
             * @param {Object} item
             * @return {Boolean}
             */
            searchCriteria = function (item) {
                var index = 0;

                if (item['product_id'] !== productInfo.id) {
                    return false;
                }

                if (productOptionValues.length === 0) {
                    return true;
                }

                while (index < item.options.length) {
                    if (productOptionValues.indexOf(item.options[index]['option_value']) === -1) {
                        return false;
                    }
                    index++;
                }

                return true;
            };

            productFromCache = _.find(this.cartItemsCache, searchCriteria);
            productFromCart = _.find(customerData.get('cart')().items, searchCriteria);

            if (!productFromCache && !productFromCart) {
                return _.extend({}, productFromCart, {
                    qty: 1
                });
            }

            if (productFromCache && productFromCart) {
                return _.extend({}, productFromCache, {
                    qty: productFromCart.qty - productFromCache.qty
                });
            }

            return productFromCache || productFromCart;
        },

        /**
         * Sets event to temporary storage.
         * When the cart data was updated this event will be executed.
         *
         * @param {String} type - Event type.
         * @param {Array} productInfo - product info.
         *
         * @private
         */
        _setToTemporaryEventStorage: function (type, productInfo) {
            this.options.temporaryEventStorage.push({
                type: type,
                productInfo: productInfo
            });
        },

        /**
         * Sets listener to the cart data.
         *
         * @private
         */
        _setCartDataListener: function () {
            customerData.get('cart').subscribe(function (data) {
                if (this.options.temporaryEventStorage.length) {
                    this._executeEvents();
                }

                this.cartItemsCache = data.items.slice();
            }.bind(this));
        },

        /**
         * Sets listener to the cart.
         *
         * @private
         */
        _executeEvents: function () {
            var product;

            this.options.temporaryEventStorage.forEach(function (item, index) {
                if (typeof item.productInfo === 'undefined') {
                    return;
                }

                item.productInfo.forEach(function (productInfoItem) {
                    product = this.getProduct(productInfoItem);

                    if (!_.isUndefined(product['product_sku']) && parseInt(product.qty, 10) > 0) {
                        this.options.actions[item.type](product);
                    }

                    this.options.temporaryEventStorage.splice(index, 1);
                }.bind(this));
            }.bind(this));
        },

        /**
         * Sets listener to cart events.
         *
         * @private
         */
        _setListeners: function () {
            /**
             * Wrapper function for handler.
             *
             * @param {Function} callback
             * @param {String} type - action type
             * @param {Object} event - jQuery event
             * @param {Object} eventData - event data
             * @param {Array} eventData.productInfo - product info
             */
            var handlerWrapper = function (callback, type, event, eventData) {
                    callback.call(this, type, eventData.productInfo);
                },
                opt = this.options;

            $(document)
                .on(
                    opt.events.AJAX_ADD_TO_CART,
                    handlerWrapper.bind(this, this._setToTemporaryEventStorage, opt.events.AJAX_ADD_TO_CART)
                )
                .on(
                    opt.events.AJAX_REMOVE_FROM_CART,
                    handlerWrapper.bind(this, this._setToTemporaryEventStorage, opt.events.AJAX_REMOVE_FROM_CART)
                );
        }
    });

    return $.mage.gtmCart;
});
