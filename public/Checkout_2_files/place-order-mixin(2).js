/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'mage/utils/wrapper',
    'Magento_NegotiableQuote/js/action/place-order-negotiable-quote'
], function (wrapper, placeOrderNegotiableQuote) {
    'use strict';

    return function (placeOrder) {
        return wrapper.wrap(placeOrder, function (originalAction, paymentData, messageContainer) {
            if (window.checkoutConfig.isNegotiableQuote) {
                return placeOrderNegotiableQuote(paymentData, messageContainer);
            }

            return originalAction(paymentData, messageContainer);
        });
    };
});
