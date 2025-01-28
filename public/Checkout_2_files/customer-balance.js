/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * Customer balance view model
 */
define([
    'ko',
    'uiComponent',
    'Magento_Checkout/js/model/quote',
    'Magento_Catalog/js/price-utils',
    'Magento_CustomerBalance/js/action/use-balance'
], function (ko, component, quote, priceUtils, useBalanceAction) {
    'use strict';

    var amountSubstracted = ko.observable(window.checkoutConfig.payment.customerBalance.amountSubstracted),
        isActive = ko.pureComputed(function () {
            var totals = quote.getTotals();

            return !amountSubstracted() && totals()['grand_total'] > 0;
        });

    return component.extend({
        defaults: {
            template: 'Magento_CustomerBalance/payment/customer-balance',
            isEnabled: true
        },
        isAvailable: window.checkoutConfig.payment.customerBalance.isAvailable,
        amountSubstracted: window.checkoutConfig.payment.customerBalance.amountSubstracted,
        usedAmount: window.checkoutConfig.payment.customerBalance.usedAmount,
        balance: window.checkoutConfig.payment.customerBalance.balance,

        /** @inheritdoc */
        initObservable: function () {
            this._super()
                .observe('isEnabled');

            return this;
        },

        /**
         * Get active status
         *
         * @return {Boolean}
         */
        isActive: function () {
            return isActive();
        },

        /**
         * Format customer balance
         *
         * @return {String}
         */
        formatBalance: function () {
            return priceUtils.formatPrice(this.balance, quote.getPriceFormat());
        },

        /**
         * Set amount substracted from checkout.
         *
         * @param {Boolean} isAmountSubstracted
         * @return {Object}
         */
        setAmountSubstracted: function (isAmountSubstracted) {
            amountSubstracted(isAmountSubstracted);

            return this;
        },

        /**
         * Send request to use balance
         */
        sendRequest: function () {
            amountSubstracted(true);
            useBalanceAction();
        }
    });
});
