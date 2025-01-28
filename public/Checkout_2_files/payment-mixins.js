/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'Magento_Checkout/js/model/quote'
], function (ko, quote) {
    'use strict';

    var mixin = {
        isVisible: ko.observable(quote.isVirtual() || window.checkoutConfig.isPurchaseOrder)
    };

    return function (target) {
        return target.extend(mixin);
    };
});
