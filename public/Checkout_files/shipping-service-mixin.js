/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'mage/utils/wrapper'
], function (wrapper) {
    'use strict';

    var extender = {
        /**
         * Set shipping rates.
         *
         * @param {Function} originFn - Original method.
         * @param {Array.<Object>} ratesData - Rates.
         */
        setShippingRates: function (originFn, ratesData) {
            var checkoutConfig = window.checkoutConfig,
                i;

            for (i in ratesData) {
                if (
                    checkoutConfig.isNegotiableQuote &&
                    checkoutConfig.selectedShippingMethod &&
                    checkoutConfig.isNegotiableShippingPriceSet &&
                    ratesData[i]['carrier_code'] === checkoutConfig.selectedShippingMethod['carrier_code'] &&
                    ratesData[i]['method_code'] === checkoutConfig.selectedShippingMethod['method_code']
                ) {
                    ratesData = [ratesData[i]];
                    break;
                }
            }

            originFn(ratesData);
        }
    };

    return function (target) {
        return wrapper.extend(target, extender);
    };
});
