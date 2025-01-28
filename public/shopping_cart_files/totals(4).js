/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
    [
        'Magento_Checkout/js/view/summary/abstract-total',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/totals',
        'Magento_GiftWrapping/js/model/gift-wrapping'
    ],
    function (Component, quote, totals, GiftWrapping) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Magento_GiftWrapping/summary/totals'
            },
            totals: quote.getTotals(),
            model: {},
            excludingTaxMessage: '(Excluding Tax)',
            includingTaxMessage: '(Including Tax)',

            /**
             * @override
             */
            initialize: function (options) {
                this.model = new GiftWrapping(this.level);

                return this._super(options);
            },

            /**
             * Get gift wrapping price based on options.
             * @returns {int}
             */
            getValue: function () {
                var price = 0,
                    wrappingSegment;

                if (
                    this.totals() &&
                    totals.getSegment('giftwrapping') &&
                    totals.getSegment('giftwrapping').hasOwnProperty('extension_attributes')
                ) {
                    wrappingSegment = totals.getSegment('giftwrapping')['extension_attributes'];

                    switch (this.level) {
                        case 'order':
                            price = wrappingSegment.hasOwnProperty('gw_price') ?
                                wrappingSegment['gw_price'] :
                                0;
                            break;

                        case 'item':
                            price = wrappingSegment.hasOwnProperty('gw_items_price') ?
                                wrappingSegment['gw_items_price'] :
                                0;
                            break;

                        case 'printed-card':
                            price = wrappingSegment.hasOwnProperty('gw_card_price') ?
                                wrappingSegment['gw_card_price'] :
                                0;
                            break;
                    }
                }

                return this.getFormattedPrice(price);
            },

            /**
             * Get gift wrapping price (including tax) based on options.
             * @returns {int}
             */
            getIncludingTaxValue: function () {
                var price = 0,
                    wrappingSegment;

                if (
                    this.totals() &&
                    totals.getSegment('giftwrapping') &&
                    totals.getSegment('giftwrapping').hasOwnProperty('extension_attributes')
                ) {
                    wrappingSegment = totals.getSegment('giftwrapping')['extension_attributes'];

                    switch (this.level) {
                        case 'order':
                            price = wrappingSegment.hasOwnProperty('gw_price_incl_tax') ?
                                wrappingSegment['gw_price_incl_tax'] :
                                0;
                            break;

                        case 'item':
                            price = wrappingSegment.hasOwnProperty('gw_items_price_incl_tax') ?
                                wrappingSegment['gw_items_price_incl_tax'] :
                                0;
                            break;

                        case 'printed-card':
                            price = wrappingSegment.hasOwnProperty('gw_card_price_incl_tax') ?
                                wrappingSegment['gw_card_price_incl_tax'] :
                                0;
                            break;
                    }
                }

                return this.getFormattedPrice(price);
            },

            /**
             * Check gift wrapping option availability.
             * @returns {Boolean}
             */
            isAvailable: function () {
                var isAvailable = false,
                    wrappingSegment;

                if (!this.isFullMode()) {
                    return false;
                }

                if (
                    this.totals() &&
                    totals.getSegment('giftwrapping') &&
                    totals.getSegment('giftwrapping').hasOwnProperty('extension_attributes')
                ) {
                    wrappingSegment = totals.getSegment('giftwrapping')['extension_attributes'];

                    switch (this.level) {
                        case 'order':
                            isAvailable = wrappingSegment.hasOwnProperty('gw_order_id') ?
                                wrappingSegment['gw_order_id'] > 0 :
                                false;
                            break;

                        case 'item':
                            isAvailable = wrappingSegment.hasOwnProperty('gw_item_ids') ?
                                wrappingSegment['gw_item_ids'].length > 0 :
                                false;
                            break;

                        case 'printed-card':
                            isAvailable = !!parseFloat(wrappingSegment['gw_add_card']);
                            break;
                    }
                }

                return isAvailable;
            },

            /**
             * Check if both gift wrapping prices should be displayed.
             * @returns {Boolean}
             */
            displayBothPrices: function () {
                var displayBothPrices = false;

                switch (this.level) {
                    case 'order':
                        displayBothPrices = this.model.displayWrappingBothPrices();
                        break;

                    case 'item':
                        displayBothPrices = this.model.displayWrappingBothPrices();
                        break;

                    case 'printed-card':
                        displayBothPrices = this.model.displayCardBothPrices();
                        break;
                }

                return displayBothPrices;
            },

            /**
             * Check if gift wrapping prices should be displayed including tax.
             * @returns {Boolean}
             */
            displayPriceInclTax: function () {
                var displayPriceInclTax = false;

                switch (this.level) {
                    case 'order':
                        displayPriceInclTax = this.model.displayGiftWrappingInclTaxPrice();
                        break;

                    case 'item':
                        displayPriceInclTax = this.model.displayGiftWrappingInclTaxPrice();
                        break;

                    case 'printed-card':
                        displayPriceInclTax = this.model.displayCardInclTaxPrice();
                        break;
                }

                return displayPriceInclTax && !this.displayBothPrices();
            },

            /**
             * Check if gift wrapping prices should be displayed excluding tax.
             * @returns {Boolean}
             */
            displayPriceExclTax: function () {
                return !this.displayPriceInclTax() && !this.displayBothPrices();
            }
        });
    }
);
