/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define(['uiComponent'], function (Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_Reward/authentication/tooltip'
        },
        isAvailable: window.checkoutConfig.authentication.reward.isAvailable,
        tooltipLearnMoreUrl: window.checkoutConfig.authentication.reward.tooltipLearnMoreUrl,
        tooltipMessage: window.checkoutConfig.authentication.reward.tooltipMessage
    });
});
