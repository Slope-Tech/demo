/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'mage/translate'
], function ($) {
    'use strict';

    return function (target) {
        $.validator.addMethod(
            'validate-purchase-order-number',
            function (value) {
                return !value || /^[a-zA-Z0-9-/]+$/.test(value);
            },
            $.mage.__('Please use only letters (a-z or A-Z), numbers (0-9), dash (-) or slash (/) in this field.')
        );

        return target;
    };
});
