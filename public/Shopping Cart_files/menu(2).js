/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery'
], function ($) {
    'use strict';

    return function (target) {
        $.widget('mage.menu', target.menu, {
            /**
             * @private
             */
            _create: function () {
                $(this.element).data('uiMenu', this);
                this._super();
            }
        });
        target.menu = $.mage.menu;

        return target;
    };
});
