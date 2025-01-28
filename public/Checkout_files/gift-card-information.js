/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
    [
        'ko',
        'uiComponent',
        'Magento_Checkout/js/model/totals',
        'Magento_Checkout/js/model/quote',
        'Magento_Catalog/js/price-utils'
    ],
    function (
        ko,
        Component,
        totals,
        quote,
        priceUtils
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Magento_GiftCardAccount/payment/gift-card-information'
            },
            isVisible: ko.observable(false),
            amountApplied: ko.observable(null),

            /**
             * Init component
             */
            initialize: function () {
                this._super();

                totals.totals.subscribe(function () {
                    var giftCardSegment = totals.getSegment('giftcardaccount');

                    this.isVisible(giftCardSegment !== null);

                    if (giftCardSegment) {
                        this.amountApplied(this.getFormattedPrice(giftCardSegment.value * -1));
                    }

                }, this);
            },

            /**
             * @param {Number} price
             * @return {String}
             */
            getFormattedPrice: function (price) {
                return priceUtils.formatPrice(price, quote.getPriceFormat());
            }
        });
    }
);
