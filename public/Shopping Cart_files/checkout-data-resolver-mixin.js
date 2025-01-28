/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'mage/utils/wrapper',
    'Magento_Checkout/js/action/select-shipping-address',
    'Magento_Customer/js/model/address-list',
    'underscore'
], function (
    wrapper,
    selectShippingAddress,
    addressList,
    _
) {
    'use strict';

    return function (checkoutDataResolver) {
        checkoutDataResolver.resolveShippingAddress = wrapper.wrapSuper(
            checkoutDataResolver.resolveShippingAddress,
            function () {
                var shippingAddress,
                    checkoutConfig = window.checkoutConfig;

                if (checkoutConfig.selectedShippingKey &&
                    checkoutConfig.isAddressSelected &&
                    checkoutConfig.isNegotiableQuote
                ) {
                    shippingAddress = _.find(
                        addressList(),
                        function (address) {
                            return checkoutConfig.selectedShippingKey === address.getKey();
                        }
                    );
                    if (shippingAddress) {
                        selectShippingAddress(shippingAddress);
                    }
                }
                this._super();
            });

        return checkoutDataResolver;
    };
});
