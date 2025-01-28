/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'uiComponent',
    'underscore',
    'Magento_GiftWrapping/js/model/gift-wrapping-collection',
    'Magento_GiftWrapping/js/model/gift-wrapping',
    'Magento_Catalog/js/price-utils',
    'Magento_GiftMessage/js/model/gift-options'
], function (Component, _, giftWrappingCollection, GiftWrapping, priceUtils, giftOptions) {
    'use strict';

    return Component.extend({
        isVisibleInfoBlock: null,
        model: {},
        displayArea: 'additionalOptions',
        levelIdentifier: '',

        /** @inheritdoc */
        initialize: function () {
            this._super()
                .observe('isVisibleInfoBlock');
            this.levelIdentifier = this.itemId || 'orderLevel';

            this.model = new GiftWrapping(this.levelIdentifier);
            giftWrappingCollection.addOption(this.model);

            giftOptions.options.subscribe(
                function (changes) {
                    _.each(changes, function (change) {
                        if (change.status === 'added') {
                            this.extendGiftMessageModel();
                            this.applyWrapping();
                        }
                    }, this);
                }, this, 'arrayChange');
            this.extendGiftMessageModel();
            this.applyWrapping();
        },

        /**
         * Apply wrapping.
         */
        applyWrapping: function () {
            var wrappingId = this.getAppliedWrappingId(),
                messageModel = giftOptions.getOptionByItemId(this.levelIdentifier);

            if (wrappingId) {
                this.setActiveItem(wrappingId);
            }

            if (messageModel && (this.isExtraOptionsApplied() || wrappingId)) {
                messageModel.getObservable('additionalOptionsApplied')(true);
            }
        },

        /**
         * @return {*|Boolean}
         */
        isExtraOptionsApplied: function () {
            return this.model.isExtraOptionsApplied();
        },

        /**
         * @return {*}
         */
        getAppliedWrappingId: function () {
            return this.model.getAppliedWrappingId();
        },

        /**
         * Extend gift message model.
         */
        extendGiftMessageModel: function () {
            var giftMessage = giftOptions.getOptionByItemId(this.levelIdentifier);

            if (giftMessage) {
                giftMessage.additionalOptions.push(this.model);
            }
        },

        /**
         * @return {*|Array}
         */
        getWrappingItems: function () {
            return this.model.getWrappingItems();
        },

        /**
         * @return {*|Boolean}
         */
        isActive: function () {
            return this.model.isWrappingAvailable();
        },

        /**
         * @return {Boolean}
         */
        showAppliedBlock: function () {
            if (this.getAppliedWrappingId()) {
                return true;
            }

            if (this.levelIdentifier == 'orderLevel' && this.isExtraOptionsApplied()) { //eslint-disable-line eqeqeq
                return true;
            }
        },

        /**
         * @param {*} key
         * @return {*}
         */
        getObservable: function (key) {
            return this.model.getObservable('wrapping-' + this.levelIdentifier, key);
        },

        /**
         * @return {Boolean}
         */
        isAllowGiftReceipt: function () {
            return this.levelIdentifier == 'orderLevel' && this.model.getConfigValue('isAllowGiftReceipt') == true; //eslint-disable-line
        },

        /**
         * @return {Boolean}
         */
        isAllowPrintedCard: function () {
            return this.levelIdentifier == 'orderLevel' && this.model.getConfigValue('isAllowPrintedCard') == true; //eslint-disable-line
        },

        /**
         * @return {Boolean}
         */
        isDisplayWrappingBothPrices: function () {
            return this.model.getConfigValue('displayWrappingBothPrices') == true; //eslint-disable-line eqeqeq
        },

        /**
         * Get printed card price display settings from configuration.
         * @returns {Boolean}
         */
        isDisplayCardBothPrices: function () {
            return this.model.getConfigValue('displayCardBothPrices');
        },

        /**
         * @return {String|*}
         */
        getPrintedCardPrice: function () {
            return priceUtils.formatPrice(this.model.getPrintedCardPrice(), this.model.getPriceFormat());
        },

        /**
         * @return {String|*}
         */
        getPrintedCardPriceWithTax: function () {
            return priceUtils.formatPrice(
                this.model.getPrintedCardPriceWithTax(),
                this.model.getPriceFormat()
            );
        },

        /**
         * @return {String|*}
         */
        getPrintedCardPriceWithoutTax: function () {
            return priceUtils.formatPrice(
                this.model.getPrintedCardPriceWithoutTax(),
                this.model.getPriceFormat()
            );
        },

        /**
         * @param {*} id
         * @return {*}
         */
        isHighlight: function (id) {
            return this.model.isHighlight(this.levelIdentifier, id);
        },

        /**
         * @param {*} id
         */
        setActiveItem: function (id) {
            this.model.setActiveItem(id);
            this.updateInfoBlock();
        },

        /**
         * Uncheck wrapping.
         */
        uncheckWrapping: function () {
            this.isVisibleInfoBlock(false);
            this.getObservable('activeWrappingLabel')(null);
            this.getObservable('activeWrappingImageSrc')(null);
            this.getObservable('activeWrappingPrice')(null);
            this.getObservable('activeWrappingPriceWithoutTax')(null);
            this.getObservable('activeWrappingPriceWithTax')(null);
            this.model.uncheckWrapping();
        },

        /**
         * Update info block.
         */
        updateInfoBlock: function () {
            var wrappingInfo;

            this.isVisibleInfoBlock(true);
            wrappingInfo = this.model.getActiveWrappingInfo(this.levelIdentifier);

            if (wrappingInfo && wrappingInfo.id) {
                this.getObservable('activeWrappingLabel')(wrappingInfo.label);
                this.getObservable('activeWrappingImageSrc')(wrappingInfo.path);
                this.getObservable('activeWrappingPrice')(
                    priceUtils.formatPrice(wrappingInfo.price, this.model.getPriceFormat())
                );
                this.getObservable('activeWrappingPriceWithoutTax')(
                    priceUtils.formatPrice(wrappingInfo.priceExclTax, this.model.getPriceFormat())
                );
                this.getObservable('activeWrappingPriceWithTax')(
                    priceUtils.formatPrice(wrappingInfo.priceInclTax, this.model.getPriceFormat())
                );
            }
        }
    });
});
