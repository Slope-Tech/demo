/*
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'underscore',
    'mage/utils/wrapper'
], function (_, wrapper) {
    'use strict';

    return function (methodConverter) {
        return wrapper.wrap(methodConverter, function (originalAction, methods) {
            var checkoutConfigMethods = window.checkoutConfig.paymentMethods,
                checkoutConfigMethod;

            methods = originalAction(methods);

            if (window.checkoutConfig.isPurchaseOrderEnabled) {
                _.each(methods, function (method) {
                    if (!method.hasOwnProperty('is_deferred')) {
                        checkoutConfigMethod = _.findWhere(checkoutConfigMethods,
                            {
                                'method': method.method
                            }
                        );

                        if (checkoutConfigMethod && checkoutConfigMethod.hasOwnProperty('is_deferred')) {
                            method['is_deferred'] = checkoutConfigMethod['is_deferred'];
                        }
                    }
                });
            }

            return methods;
        });
    };
});
