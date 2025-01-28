/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'mage/storage',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/url-builder',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Checkout/js/model/full-screen-loader'
], function (storage, quote, urlBuilder, errorProcessor, fullScreenLoader) {
    'use strict';

    return function (messageContainer, paymentData) {
        var serviceUrl, payload,
            url = '/negotiable-carts/:cartId/set-payment-information';

        serviceUrl = urlBuilder.createUrl(url, {
            cartId: quote.getQuoteId()
        });

        if (paymentData && paymentData.hasOwnProperty('__disableTmpl')) {
            delete paymentData.__disableTmpl;
        }
        payload = {
            cartId: quote.getQuoteId(),
            paymentMethod: paymentData,
            billingAddress: quote.billingAddress()
        };

        fullScreenLoader.startLoader();

        return storage.post(
            serviceUrl,
            JSON.stringify(payload)
        ).fail(function (response) {
            errorProcessor.process(response, messageContainer);
        }).always(fullScreenLoader.stopLoader);
    };
});
