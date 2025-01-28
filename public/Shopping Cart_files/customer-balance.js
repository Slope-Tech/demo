/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * Customer balance summary block info
 */
define([
    'Magento_CustomerBalance/js/view/summary/customer-balance'
], function (Component) {
    'use strict';

    var balanceRemoveUrl  = window.checkoutConfig.payment.customerBalance.balanceRemoveUrl;

    return Component.extend({
        /**
         * @return {String}
         */
        getRemoveUrl: function () {
            return balanceRemoveUrl;
        },

        /**
         * @return {Boolean}
         */
        isFullMode: function () {
            return true;
        }
    });
});
