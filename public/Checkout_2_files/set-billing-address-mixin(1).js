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
    'Magento_Checkout/js/model/full-screen-loader',
    'Magento_Checkout/js/action/get-totals',
    'Magento_Checkout/js/action/get-payment-information'
], function (
    $,
    wrapper,
    storage,
    quote,
    urlBuilder,
    errorProcessor,
    fullScreenLoader,
    getTotalsAction,
    getPaymentInformationAction
) {
    'use strict';

    return function (setBillingAddress) {
        return wrapper.wrap(setBillingAddress, function (originalAction, messageContainer) {
            var serviceUrl, payload;

            if (window.checkoutConfig.isPurchaseOrder) {
                serviceUrl = urlBuilder.createUrl('/purchase-order-carts/:cartId/billing-address', {
                    cartId: quote.getQuoteId()
                });
                payload = {
                    cartId: quote.getQuoteId(),
                    address: quote.billingAddress()
                };

                fullScreenLoader.startLoader();

                return storage.post(
                    serviceUrl, JSON.stringify(payload)
                ).done(function () {
                    if (!quote.isVirtual()) {
                        getTotalsAction([]);
                        fullScreenLoader.stopLoader();
                    } else {
                        $.when(getPaymentInformationAction()).done(fullScreenLoader.stopLoader);
                    }
                }).fail(function (response) {
                    errorProcessor.process(response, messageContainer);
                    fullScreenLoader.stopLoader();
                });
            }

            return originalAction(messageContainer);
        });
    };
});
