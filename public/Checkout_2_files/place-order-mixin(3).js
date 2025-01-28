/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'mage/utils/wrapper',
    'Magento_PurchaseOrder/js/action/place-order-purchase-quote'
], function (wrapper, placeOrderPurchaseQuote) {
    'use strict';

    return function (placeOrder) {
        return wrapper.wrap(placeOrder, function (originalAction, paymentData, messageContainer) {
            if (window.checkoutConfig.isPurchaseOrder) {
                return placeOrderPurchaseQuote(paymentData, messageContainer);
            }

            return originalAction(paymentData, messageContainer);
        });
    };
});
