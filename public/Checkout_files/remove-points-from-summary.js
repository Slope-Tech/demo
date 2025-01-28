/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 *
 */
define([
    'underscore',
    'mage/storage',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Ui/js/model/messageList',
    'mage/translate',
    'Magento_Checkout/js/model/full-screen-loader',
    'Magento_Checkout/js/action/get-payment-information',
    'Magento_Checkout/js/model/totals'
], function (
    _,
    storage,
    errorProcessor,
    messageList,
    $t,
    fullScreenLoader,
    getPaymentInformationAction,
    totals
) {
    'use strict';

    return function (url) {
        var responseMessage;

        messageList.clear();
        fullScreenLoader.startLoader();
        storage.post(
            url, {}
        ).done(function (response) {
            totals.isLoading(true);
            getPaymentInformationAction().done(function () {
                totals.isLoading(false);
            });

            if (_.isObject(response) && !_.isUndefined(response.message)) {
                responseMessage = {
                    'message': $t(response.message)
                };

                if (response.errors) {
                    messageList.addErrorMessage(responseMessage);
                } else {
                    messageList.addSuccessMessage(responseMessage);
                }
            }
        }).fail(function (response) {
            totals.isLoading(false);
            errorProcessor.process(response);
        }).always(function () {
            fullScreenLoader.stopLoader();
        });
    };
});
