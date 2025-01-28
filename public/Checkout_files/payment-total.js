/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'Magento_Tax/js/view/checkout/summary/grand-total',
    'Magento_Checkout/js/checkout-data'
], function (Component, checkoutData) {
    'use strict';

    return Component.extend({
        /** @inheritdoc */
        isPaymentGrandTotalDisplayNeeded: function () {
            return checkoutData.getSelectedPaymentMethod() === 'companycredit';
        }
    });
});
