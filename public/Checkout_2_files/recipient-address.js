/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([], function () {
    'use strict';

    /**
     * @param {Number} registryId
     * @return {Object} new address object
     */
    return function (registryId) {
        return {
            giftRegistryId: registryId,

            /**
             * @return {Boolean}
             */
            isDefaultShipping: function () {
                return false;
            },

            /**
             * @return {Boolean}
             */
            isDefaultBilling: function () {
                return false;
            },

            /**
             * @return {String}
             */
            getType: function () {
                return 'gift-registry';
            },

            /**
             * @return {String}
             */
            getKey: function () {
                return this.getType() + this.giftRegistryId;
            },

            /**
             * @return {String}
             */
            getCacheKey: function () {
                return this.getKey();
            },

            /**
             * @return {Boolean}
             */
            isEditable: function () {
                return false;
            },

            /**
             * @return {Boolean}
             */
            canUseForBilling: function () {
                return false;
            }
        };
    };
});
