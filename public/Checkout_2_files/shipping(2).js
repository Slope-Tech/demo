/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'Magento_Checkout/js/view/shipping',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/shipping-rates-validator'
], function (ShippingView, quote, shippingRatesValidator) {
    'use strict';

    return ShippingView.extend({
        defaults: {
            template: 'Magento_NegotiableQuote/shipping',
            isPermission: false,
            isQuoteAddressLocked: false,
            isQuoteAddressDeleted: false,
            hasQuoteShippingAddress: false
        },

        /** @inheritdoc */
        initialize: function () {
            var checkoutConfig = window.checkoutConfig,
                method;

            this._super();
            this.backQuoteUrl = checkoutConfig.backQuoteUrl;

            if (checkoutConfig.isNegotiableQuote) {
                this.isQuoteAddressDeleted = checkoutConfig.isAddressSelected &&
                    !checkoutConfig.isAddressInAddressBook;

                if (this.isQuoteAddressDeleted) {
                    this.isFormInline = false;
                }

                this.isQuoteAddressLocked = !!checkoutConfig.isQuoteAddressLocked;
                this.hasQuoteShippingAddress = !!checkoutConfig.quoteShippingAddress;
            }

            if (!quote.shippingMethod() && checkoutConfig.selectedShipping) {
                method = checkoutConfig.selectedShipping.split('_');
                quote.shippingMethod({
                    'carrier_code': method[0],
                    'method_code': method[1]
                });
            }

            return this;
        },

        /** @inheritdoc */
        initObservable: function () {
            this._super().observe('isPermission');

            return this;
        },

        /**
         * @param {Object} element
         */
        initElement: function (element) {
            if (element.index === 'shipping-address-fieldset') {
                shippingRatesValidator.bindChangeHandlers(element.elems(), false);
            }
        }
    });
});
