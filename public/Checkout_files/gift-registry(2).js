/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/resource-url-manager',
    'mage/storage',
    'Magento_Checkout/js/model/payment-service',
    'Magento_Checkout/js/model/error-processor',
    'Magento_Checkout/js/model/payment/method-converter',
    'Magento_Checkout/js/model/full-screen-loader'
], function (quote, resourceUrlManager, storage, paymentService, errorProcessor, methodConverter, fullScreenLoader) {
    'use strict';

    return {
        /**
         * Save shipping information.
         */
        saveShippingInformation: function () {
            var shippingAddress = {},
                payload;

            shippingAddress['extension_attributes'] = {
                'gift_registry_id': quote.shippingAddress().giftRegistryId
            };

            payload = {
                addressInformation: {
                    'shipping_address': shippingAddress,
                    'shipping_method_code': quote.shippingMethod()['method_code'],
                    'shipping_carrier_code': quote.shippingMethod()['carrier_code']
                }
            };

            fullScreenLoader.startLoader();

            return storage.post(
                resourceUrlManager.getUrlForSetShippingInformation(quote),
                JSON.stringify(payload)
            ).done(function (response) {
                paymentService.setPaymentMethods(methodConverter(response['payment_methods']));
                quote.setTotals(response.totals);
                fullScreenLoader.stopLoader();
            }).fail(function (response) {
                errorProcessor.process(response);
                fullScreenLoader.stopLoader();
            });
        }
    };
});
