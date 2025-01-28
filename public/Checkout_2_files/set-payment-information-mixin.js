/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_CheckoutAgreements/js/model/agreements-assigner'
], function ($, wrapper, agreementsAssigner) {
    'use strict';

    return function (placeOrder) {
        /** Override place-order-mixin for set-payment-information action as they differs only by method signature */
        return wrapper.wrap(placeOrder, function (originalAction, paymentData, messageContainer) {
            agreementsAssigner(paymentData);

            return originalAction(paymentData, messageContainer);
        });
    };
});
