/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'uiElement',
    'underscore',
    'Magento_Checkout/js/model/cart/cache'
], function (uiElement, _, cartCache) {
    'use strict';

    var giftWrappingConfig = window.giftOptionsConfig ?
            window.giftOptionsConfig.giftWrapping :
            window.checkoutConfig.giftWrapping,
        provider = uiElement();

    return function (itemId) {
        var model =  {
            itemId: itemId,
            observables: {},

            /**
             * @param {String} node
             * @param {String} key
             */
            initObservable: function (node, key) {
                if (node && !this.observables.hasOwnProperty(node)) {
                    this.observables[node] = [];
                }

                if (key && this.observables[node].indexOf(key) === -1) {
                    this.observables[node].push(key);
                    provider.observe(this.getUniqueKey(node, key));
                }
            },

            /**
             * @param {String} node
             * @param {String} key
             * @return {String}
             */
            getUniqueKey: function (node, key) {
                return node + '-' + key;
            },

            /**
             * @param {String} node
             * @param {String} key
             * @return {*}
             */
            getObservable: function (node, key) {
                this.initObservable(node, key);

                return provider[this.getUniqueKey(node, key)];
            },

            /**
             * @param {String} node
             * @param {*} id
             * @return {Boolean}
             */
            unsetObservable: function (node, id) {
                var self = this;

                if (!(node || this.observables.hasOwnProperty(node))) {
                    return false;
                }

                if (id) {
                    provider[this.getUniqueKey(node, id)](false);

                    return true;
                }
                _.each(this.observables[node], function (key) {
                    provider[self.getUniqueKey(node, key)](false);
                });
            },

            /**
             * @param {*} id
             * @param {String} key
             * @return {*}
             */
            isHighlight: function (id, key) {
                return this.getObservable('isHighlight-' + id, key);
            },

            /**
             * @param {String} id
             */
            setActiveItem: function (id) {
                this.unsetObservable('isHighlight-' + this.itemId);
                this.getObservable('isHighlight-' + this.itemId, id)(true);
                this.getObservable('activeWrapping', this.itemId)(id);
            },

            /**
             * Uncheck wrapping.
             */
            uncheckWrapping: function () {
                var activeWrappingId = this.getObservable('activeWrapping', this.itemId)();

                this.getObservable('isHighlight-' + this.itemId, activeWrappingId)(false);
                this.getObservable('activeWrapping', this.itemId)(null);
            },

            /**
             * Retrieve gift wrapping items related to current scope
             *
             * @returns {Array}
             */
            getWrappingItems: function () {
                var cartItemId = this.itemId;

                return _.map(giftWrappingConfig.designsInfo, function (item, id) {
                    var cartItemsConfig = giftWrappingConfig.itemsInfo || {},
                        price = 0,
                        priceExclTax = 0,
                        priceInclTax = 0,
                        cartItemConfig = null;

                    if (cartItemId !== 'orderLevel' &&
                        cartItemsConfig[cartItemId] &&
                        (cartItemsConfig[cartItemId].hasOwnProperty('price') ||
                            cartItemsConfig[cartItemId].hasOwnProperty('price_excl_tax') ||
                            cartItemsConfig[cartItemId].hasOwnProperty('price_incl_tax'))
                    ) {
                        // use product level configuration if it is available
                        cartItemConfig = cartItemsConfig[cartItemId];
                        price = cartItemConfig.price;
                        priceExclTax = cartItemConfig.hasOwnProperty('price_excl_tax') ?
                            cartItemConfig['price_excl_tax'] :
                            null;
                        priceInclTax = cartItemConfig.hasOwnProperty('price_incl_tax') ?
                            cartItemConfig['price_incl_tax'] :
                            null;
                    } else {
                        price = item.price;
                        priceExclTax = item.hasOwnProperty('price_excl_tax') ? item['price_excl_tax'] : null;
                        priceInclTax = item.hasOwnProperty('price_incl_tax') ? item['price_incl_tax'] : null;
                    }

                    return {
                        'id': id,
                        'label': item.label,
                        'path': item.path,
                        'price': price,
                        'priceExclTax': priceExclTax,
                        'priceInclTax': priceInclTax
                    };
                });
            },

            /**
             * @return {*|Boolean}
             */
            isWrappingAvailable: function () {
                // itemId represent gift wrapping level: 'orderLevel' constant or cart item ID
                var isWrappingEnabled;

                if (this.itemId == 'orderLevel') { //eslint-disable-line eqeqeq
                    return this.getConfigValue('allowForOrder') &&
                        (
                            this.getWrappingItems().length > 0 ||
                            this.getConfigValue('isAllowGiftReceipt') ||
                            this.getConfigValue('isAllowPrintedCard')
                        );
                }

                // gift wrapping product configuration must override system configuration
                isWrappingEnabled = giftWrappingConfig.itemsInfo && giftWrappingConfig.itemsInfo[this.itemId] ?
                    giftWrappingConfig.itemsInfo[this.itemId]['is_available'] : this.getConfigValue('allowForItems');

                return isWrappingEnabled && this.getWrappingItems().length > 0;
            },

            /**
             * Get active wrapping info.
             */
            getActiveWrappingInfo: function () {
                var self = this;

                return _.find(this.getWrappingItems(), function (item) {
                    return item.id == self.getObservable('activeWrapping', self.itemId)(); //eslint-disable-line eqeqeq
                });
            },

            /**
             * @param {*} id
             */
            getWrappingById: function (id) {
                return _.find(this.getWrappingItems(), function (item) {
                    return item.id == id; //eslint-disable-line eqeqeq
                });
            },

            /**
             * @param {String} key
             * @return {*}
             */
            getConfigValue: function (key) {
                return giftWrappingConfig[key];
            },

            /**
             * Get price format
             */
            getPriceFormat: function () {
                return window.giftOptionsConfig.priceFormat;
            },

            /**
             * @return {*}
             */
            getPrintedCardPrice: function () {
                return giftWrappingConfig.cardInfo.hasOwnProperty('price') ?
                    giftWrappingConfig.cardInfo.price
                    : '';
            },

            /**
             * @return {Number}
             */
            getPrintedCardPriceWithTax: function () {
                return giftWrappingConfig.cardInfo.hasOwnProperty('price_incl_tax') ?
                    giftWrappingConfig.cardInfo['price_incl_tax'] : giftWrappingConfig.cardInfo.price;
            },

            /**
             * @return {Number}
             */
            getPrintedCardPriceWithoutTax: function () {
                return giftWrappingConfig.cardInfo.hasOwnProperty('price_excl_tax') ?
                    giftWrappingConfig.cardInfo['price_excl_tax']
                    : giftWrappingConfig.cardInfo.price;
            },

            /* eslint-disable eqeqeq*/
            /**
             * @param {*} remove
             * @return {Object}
             */
            getSubmitParams: function (remove) {
                return {
                    wrappingId: remove ? null : this.getObservable('activeWrapping', this.itemId)(),
                    wrappingAddPrintedCard: remove && this.itemId == 'orderLevel' ?
                        false : this.getObservable('wrapping-' + this.itemId, 'printedCard')(),
                    wrappingAllowGiftReceipt: remove && this.itemId == 'orderLevel' ?
                        false : this.getObservable('wrapping-' + this.itemId, 'giftReceipt')()
                };
            },

            /**
             * @return {*}
             */
            getAppliedWrappingId: function () {
                var levelType = this.itemId == 'orderLevel' ? 'orderLevel' : 'itemLevel',
                    appliedWrapping;

                if (!giftWrappingConfig.appliedWrapping.hasOwnProperty(levelType)) {
                    return null;
                }
                appliedWrapping = giftWrappingConfig.appliedWrapping[levelType];

                if (levelType == 'itemLevel') {
                    return appliedWrapping.hasOwnProperty(this.itemId) ? appliedWrapping[this.itemId] : null;
                }

                return appliedWrapping;
            },

            /**
             * @return {Boolean}
             */
            isExtraOptionsApplied: function () {
                var appliedPrintedCard = giftWrappingConfig.hasOwnProperty('appliedPrintedCard') ?
                        giftWrappingConfig.appliedPrintedCard : false,
                    appliedGiftReceipt = giftWrappingConfig.hasOwnProperty('appliedGiftReceipt') ?
                        giftWrappingConfig.appliedGiftReceipt : false;

                if (appliedGiftReceipt == true) {
                    this.getObservable('wrapping-' + this.itemId, 'giftReceipt')(true);
                }

                if (appliedPrintedCard == true) {
                    this.getObservable('wrapping-' + this.itemId, 'printedCard')(true);
                }

                return this.itemId == 'orderLevel' && (appliedGiftReceipt || appliedPrintedCard);
            },

            /* eslint-enable eqeqeq*/
            /**
             * Get gift wrapping price display mode.
             * @returns {Boolean}
             */
            displayWrappingBothPrices: function () {
                return !!giftWrappingConfig.displayWrappingBothPrices;
            },

            /**
             * Get printed card price display mode.
             * @returns {Boolean}
             */
            displayCardBothPrices: function () {
                return !!giftWrappingConfig.displayCardBothPrices;
            },

            /**
             * Get gift wrapping price display mode.
             * @returns {Boolean}
             */
            displayGiftWrappingInclTaxPrice: function () {
                return !!giftWrappingConfig.displayGiftWrappingInclTaxPrice;
            },

            /**
             * Get printed card price display mode.
             * @returns {Boolean}
             */
            displayCardInclTaxPrice: function () {
                return !!giftWrappingConfig.displayCardInclTaxPrice;
            },

            /**
             * After submit.
             */
            afterSubmit: function () {
                if (this.isWrappingAvailable()) {
                    cartCache.clear('totals');
                }
            }
        };

        _.bindAll(model, 'afterSubmit');

        return model;
    };
});
