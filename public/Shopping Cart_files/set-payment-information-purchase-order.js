/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'mage/storage',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/url-builder',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Checkout/js/model/full-screen-loader',
    'underscore'
], function (storage, quote, urlBuilder, errorProcessor, fullScreenLoader, _) {
    'use strict';

    /**
     * Filter template data.
     *
     * @param {Object|Array} data
     */
    var filterTemplateData = function (data) {
        return _.each(data, function (value, key, list) {
            if (_.isArray(value) || _.isObject(value)) {
                list[key] = filterTemplateData(value);
            }

            if (key === '__disableTmpl' || key === 'title' || key === 'is_deferred') {
                delete list[key];
            }
        });
    };

    return function (messageContainer, paymentData) {
        var serviceUrl,
            payload,
            url = '/purchase-order-carts/:cartId/set-payment-information';

        serviceUrl = urlBuilder.createUrl(url, {
            cartId: quote.getQuoteId()
        });
        paymentData = filterTemplateData(paymentData);
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
