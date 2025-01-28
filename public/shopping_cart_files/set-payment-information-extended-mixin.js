/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'mage/utils/wrapper',
    'Magento_NegotiableQuote/js/action/set-payment-information-negotiable-quote'
], function (wrapper, setPaymentInformationNegotiableQuote) {
    'use strict';

    return function (setPaymentInformationExtended) {
        return wrapper.wrap(
            setPaymentInformationExtended,
            function (originalAction, messageContainer, paymentData, skipBilling) {
                if (window.checkoutConfig.isNegotiableQuote) {
                    return setPaymentInformationNegotiableQuote(messageContainer, paymentData);
                }

                return originalAction(messageContainer, paymentData, skipBilling);
            }
        );
    };
});
