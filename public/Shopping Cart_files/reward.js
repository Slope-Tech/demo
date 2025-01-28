/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define(['Magento_Reward/js/view/summary/reward',
    'Magento_Reward/js/action/remove-points-from-cart'
], function (Component, removeRewardPointsAction) {
    'use strict';

    return Component.extend({
        rewardPointsRemoveUrl: window.checkoutConfig.review.reward.removeUrl + '?_referer=cart',

        /**
         * @override
         */
        isAvailable: function () {
            return this.getPureValue() !== 0;
        },

        /**
         * @override
         */
        removeRewardPoints: function () {
            return removeRewardPointsAction(this.rewardPointsRemoveUrl);
        }
    });
});
