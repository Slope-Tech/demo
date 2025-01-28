/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 *
 */
define([
    'jquery',
    'underscore',
    'mage/storage',
    'Magento_Checkout/js/model/error-processor',
    'mage/translate',
    'Magento_Checkout/js/action/get-payment-information',
    'Magento_Checkout/js/model/totals',
    'Magento_Customer/js/customer-data'
], function (
    $,
    _,
    storage,
    errorProcessor,
    $t,
    getPaymentInformationAction,
    totals,
    customerData
) {
    'use strict';

    return function (url) {
        //delete any existing messages
        customerData.set('messages', {});
        $(document.body).trigger('processStart');
        storage.post(
            url, {}
        ).done(function (response) {
            totals.isLoading(true);
            getPaymentInformationAction().done(function () {
                totals.isLoading(false);
            });

            if (_.isObject(response) && !_.isUndefined(response.message)) {
                customerData.set('messages', {
                    messages: [{
                        type: response.errors ? 'error' : 'success',
                        text: $t(response.message)
                    }]
                });
            }
        }).fail(function (response) {
            totals.isLoading(false);
            errorProcessor.process(response);
        }).always(function () {
            $(document.body).trigger('processStop');
        });
    };
});
