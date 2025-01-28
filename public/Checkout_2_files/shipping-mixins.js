/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/action/select-shipping-address',
    'Magento_Checkout/js/model/address-converter',
    'Magento_NegotiableQuote/js/view/shipping-address/address-renderer/address'

], function (ko, quote, selectShippingAddress, addressConverter, existingAddress) {
    'use strict';

    var mixin = {
        /**
         * Update the checkout quote to use the shipping address from the purchase order quote.
         *
         * @returns {mixin}
         */
        initialize: function () {
            var isPurchaseOrder = window.checkoutConfig.isPurchaseOrder,
                shippingAddressData = window.checkoutConfig.purchaseOrderShippingAddress,
                shippingAddress;

            this._super();

            if (isPurchaseOrder && shippingAddressData) {
                shippingAddress = shippingAddressData['customer_address_id'] ?
                    existingAddress(shippingAddressData) :
                    addressConverter.formAddressDataToQuoteAddress(shippingAddressData);

                selectShippingAddress(shippingAddress);
            }

            return this;
        },

        visible: ko.observable(!quote.isVirtual() && !window.checkoutConfig.isPurchaseOrder)
    };

    return function (target) {
        return target.extend(mixin);
    };
});
