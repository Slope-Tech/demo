/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([], function () {
    'use strict';

    return {
        options: [],

        /**
         * @param {Object} option
         */
        addOption: function (option) {
            if (!this.options.hasOwnProperty(option.itemId)) {
                this.options[option.itemId] = option;
            }
        },

        /**
         * @param {*} itemId
         * @return {null}
         */
        getOptionByItemId: function (itemId) {
            return this.options.hasOwnProperty(itemId) ? this.options[itemId] : null;
        }
    };
});
