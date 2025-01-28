/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([], function () {
    'use strict';

    var mixin = {
        isPurchaseOrder: window.checkoutConfig.isPurchaseOrder,

        /**
         * Override the template if it is purchase order checkout.
         *
         * @returns {mixin}
         */
        initialize: function () {
            this._super();

            if (this.isPurchaseOrder) {
                this.template = 'Magento_PurchaseOrder/checkout/shipping-information';
            }

            return this;
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
