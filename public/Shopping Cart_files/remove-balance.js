/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * Customer store credit(balance) application
 */
define([
    'jquery',
    'mage/url',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Checkout/js/model/quote',
    'mage/storage',
    'Magento_Ui/js/model/messageList',
    'mage/translate',
    'Magento_Checkout/js/model/full-screen-loader',
    'Magento_Checkout/js/action/get-payment-information',
    'Magento_Checkout/js/model/totals'
], function (
    $,
    urlBuilder,
    errorProcessor,
    quote,
    storage,
    messageList,
    $t,
    fullScreenLoader,
    getPaymentInformationAction,
    totals
) {
    'use strict';

    return function () {
        var message = $t('The store credit payment has been removed from shopping cart.');

        messageList.clear();
        fullScreenLoader.startLoader();

        $.ajax({
            url: urlBuilder.build('storecredit/cart/unapply/'),
            type: 'POST',
            dataType: 'json',
            data: {
                cartId: quote.getQuoteId()
            }
        }).done(function (response) {
            var deferred;

            if (response) {
                deferred = $.Deferred();
                totals.isLoading(true);
                getPaymentInformationAction(deferred);
                $.when(deferred).done(function () {
                    totals.isLoading(false);
                });
                messageList.addSuccessMessage({
                    'message': message
                });
            }
        }).fail(function (response) {
            totals.isLoading(false);
            errorProcessor.process(response);
        }).always(function () {
            fullScreenLoader.stopLoader();
        });
    };
});
