/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define(['jquery'], function ($) {
    'use strict';

    return function (target) {

        /**
         * @param {*} value
         * @param {HTMLElement} element
         * @return {*|jQuery}
         */
        var asyncValidate = function (value, element) {
            return $(element).data('async-is-valid');
        };

        $.validator.addMethod(
            'validate-async-company-email',
            asyncValidate,
            $.mage.__('Company with this email address already exists in the system. Enter a different email address to continue.') //eslint-disable-line max-len
        );

        $.validator.addMethod(
            'validate-async-company-role-name',
            asyncValidate,
            $.mage.__('User role with this name already exists. Enter a different name to save this role.')
        );

        $.validator.addMethod(
            'validate-async-customer-email',
            asyncValidate,
            $.mage.__('User with this email already exists in the system. Enter a different email address to continue. If you want to use your current account as an administrator account, please contact the seller.') //eslint-disable-line max-len
        );

        return target;
    };
});
