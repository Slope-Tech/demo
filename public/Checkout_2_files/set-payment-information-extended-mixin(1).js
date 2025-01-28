/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'mage/utils/wrapper',
    'Magento_PurchaseOrder/js/action/set-payment-information-purchase-order'
], function (wrapper, setPaymentInformationPurchaseOrder) {
    'use strict';

    return function (setPaymentInformationExtended) {
        return wrapper.wrap(
            setPaymentInformationExtended,
            function (originalAction, messageContainer, paymentData, skipBilling) {
                if (window.checkoutConfig.isPurchaseOrder) {
                    return setPaymentInformationPurchaseOrder(messageContainer, paymentData);
                }

                return originalAction(messageContainer, paymentData, skipBilling);
            }
        );
    };
});
