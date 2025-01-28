/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'Magento_Checkout/js/action/select-payment-method',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/checkout-data'
], function (selectPaymentMethodAction, quote, checkoutData) {
    'use strict';

    var mixin = {
        /** Initialization */
        initialize: function () {
            this._super();

            if (quote.paymentMethod() == null && window.checkoutConfig.selectedPaymentMethod) {
                selectPaymentMethodAction({
                    'method': window.checkoutConfig.selectedPaymentMethod,
                    'po_number': null,
                    'additional_data': null
                });
                checkoutData.setSelectedPaymentMethod(window.checkoutConfig.selectedPaymentMethod);
            }
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
