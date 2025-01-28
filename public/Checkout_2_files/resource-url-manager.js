/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'Magento_Checkout/js/model/resource-url-manager'
], function ($, resourceUrlManager) {
    'use strict';

    return $.extend(resourceUrlManager, {
        /**
         * @param {Object} quote
         * @return {*|String}
         */
        getUrlForEstimationShippingMethodsForGiftRegistry: function (quote) {
            var params = this.getCheckoutMethod() ===  'guest' ? {
                    quoteId: quote.getQuoteId()
                } : {},
                urls = {
                    'guest': '/guest-giftregistry/:quoteId/estimate-shipping-methods',
                    'customer': '/giftregistry/mine/estimate-shipping-methods'
                };

            return this.getUrl(urls, params);
        }
    });
});
