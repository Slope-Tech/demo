/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'mage/utils/wrapper',
    'mage/storage',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/url-builder',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Checkout/js/model/payment/method-converter',
    'Magento_Checkout/js/model/payment-service'
], function ($, wrapper, storage, quote, urlBuilder, errorProcessor, methodConverter, paymentService) {
    'use strict';

    return function (getPaymentInformation) {
        return wrapper.wrap(getPaymentInformation, function (originalAction, deferred, messageContainer) {
            var serviceUrl;

            deferred = deferred || $.Deferred();

            if (window.checkoutConfig.isPurchaseOrder) {
                serviceUrl = urlBuilder.createUrl('/purchase-order-carts/:cartId/payment-information', {
                    cartId: quote.getQuoteId()
                });

                return storage.get(
                    serviceUrl, false
                ).done(function (response) {
                    quote.setTotals(response.totals);
                    paymentService.setPaymentMethods(methodConverter(response['payment_methods']));
                    deferred.resolve();
                }).fail(function (response) {
                    errorProcessor.process(response, messageContainer);
                    deferred.reject();
                });
            }

            return originalAction(deferred, messageContainer);
        });
    };
});
