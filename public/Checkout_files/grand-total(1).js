/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'Magento_Checkout/js/checkout-data'
], function (checkoutData) {
    'use strict';

    return function (target) {
        return target.extend({
            /** @inheritdoc */
            isBaseGrandTotalDisplayNeeded: function () {
                return this._super() && checkoutData.getSelectedPaymentMethod() !== 'companycredit';
            }
        });
    };
});
