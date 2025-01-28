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
    'Magento_Checkout/js/action/get-payment-information',
    'Magento_GiftCardAccount/js/model/payment/gift-card-messages'
], function (
    $,
    wrapper,
    storage,
    quote,
    urlBuilder,
    errorProcessor,
    fullScreenLoader,
    getPaymentInformationAction,
    messageList
) {
    'use strict';

    return function (removeGiftCardFromQuote) {
        return wrapper.wrap(removeGiftCardFromQuote, function (originalAction, giftCardCode) {
            var serviceUrl;

            if (window.checkoutConfig.isNegotiableQuote) {
                serviceUrl = urlBuilder.createUrl('/negotiable-carts/:cartId/giftCards/:giftCardCode', {
                    cartId: quote.getQuoteId(),
                    giftCardCode: giftCardCode
                });

                fullScreenLoader.startLoader();

                return storage.delete(
                    serviceUrl
                ).done(function (response) {
                    if (response) {
                        $.when(getPaymentInformationAction()).always(fullScreenLoader.stopLoader);
                    }
                }).fail(function (response) {
                    errorProcessor.process(response, messageList);
                    fullScreenLoader.stopLoader();
                });
            }

            return originalAction(giftCardCode);
        });
    };
});
