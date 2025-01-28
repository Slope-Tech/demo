/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'uiComponent',
    'Magento_Checkout/js/model/quote',
    'mage/translate',
    'Magento_Reward/js/action/set-use-reward-points'
], function (Component, quote, $t, setUseRewardPointsAction) {
    'use strict';

    var rewardConfig = window.checkoutConfig.payment.reward;

    return Component.extend({
        defaults: {
            template: 'Magento_Reward/payment/reward'
        },
        label: rewardConfig.label,

        /**
         * @return {Boolean}
         */
        isAvailable: function () {
            var subtotal = parseFloat(quote.totals()['grand_total']),
                rewardUsedAmount = parseFloat(quote.totals()['extension_attributes']['base_reward_currency_amount']);

            return rewardConfig.isAvailable && subtotal > 0 && rewardUsedAmount <= 0;
        },

        /**
         * Use reward points.
         */
        useRewardPoints: function () {
            setUseRewardPointsAction();
        }
    });
});
