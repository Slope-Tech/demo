/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/mage',
    'mage/translate'
], function ($) {
    'use strict';

    $('.form-create-purchase-order-rule').mage('validation', {
        messages: {
            'conditions[0][value]': {
                'validate-digits': $.mage.__('Please enter a whole number.')
            }
        }
    });
});
