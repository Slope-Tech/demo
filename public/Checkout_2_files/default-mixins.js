/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'Magento_PurchaseOrder/js/action/place-po-order',
    'Magento_Checkout/js/model/full-screen-loader',
    'mage/url',
    'Magento_Checkout/js/model/payment/additional-validators',
    'jquery'
], function (poPlaceOrderAction, fullScreenLoader, url, additionalValidators, $) {
    'use strict';

    var mixin = {
        isOrder: !window.checkoutConfig.isPurchaseOrderEnabled || window.checkoutConfig.isPurchaseOrder,
        isPoNew: window.checkoutConfig.isPurchaseOrderEnabled && !window.checkoutConfig.isPurchaseOrder,
        redirectPoSuccessUrl: window.checkoutConfig.poSuccessPageUrl,

        /**
         * Override the template if the payment method is online.
         *
         * @returns {mixin}
         */
        initialize: function () {
            this._super();

            if (this.isPoNew && this.item['is_deferred'] === true) {
                this.template = 'Magento_PurchaseOrder/payment/online';
                this.redirectAfterPlaceOrder = true;
            }

            return this;
        },

        /**
         * Save Purchase Order
         *
         * @return {Boolean}
         */
        savePurchaseOrder: function (data, event) {
            var self = this,
                isValid;

            if (event) {
                event.preventDefault();
            }

            // Online payment methods are always valid since no payment details are initially required
            isValid = this.item['is_deferred'] === true || this.validate() && additionalValidators.validate();

            if (isValid) {
                this.isPlaceOrderActionAllowed(false);

                this.getPlacePoOrderDeferredObject()
                    .fail(
                        function () {
                            self.isPlaceOrderActionAllowed(true);
                        }
                    ).done(
                    function () {
                        if (self.redirectAfterPlaceOrder) {
                            self.redirectOnPoSuccessAction();
                        }
                    }
                );
            }

            return isValid;
        },

        /**
         * Get payment method code for quote.
         *
         * @returns {String|null}
         */
        getQuotePaymentMethod: function () {
            return this.isChecked();
        },

        /**
         * @returns {String}
         */
        getInstructionsUnsanitizedHtml: function () {
            return this.getInstructions();
        },

        /**
         * @returns {String}
         */
        getMailingAddressUnsanitizedHtml: function () {
            return this.getMailingAddress();
        },

        /**
         * @returns {Promise}
         */
        getPlacePoOrderDeferredObject: function () {
            return $.when(
                poPlaceOrderAction(this.getData(), this.messageContainer)
            );
        },

        /**
         * @returns void
         */
        redirectOnPoSuccessAction: function () {
            fullScreenLoader.startLoader();
            window.location.replace(url.build(this.redirectPoSuccessUrl));
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
