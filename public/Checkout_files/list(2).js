/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'Magento_Checkout/js/action/select-shipping-address',
    'Magento_Checkout/js/checkout-data',
    'Magento_NegotiableQuote/js/view/shipping-address/list',
    'Magento_Customer/js/model/address-list',
    'mageUtils',
    'uiLayout'
], function (ko, selectShippingAddressAction, checkoutData, Component, addressList, utils, layout) {
    'use strict';

    var customSelectAddress = null,
        defaultRendererTemplate = {
            parent: '${ $.$data.parentName }',
            name: '${ $.$data.name }',
            component: 'Magento_PurchaseOrder/js/view/checkout/shipping-address/address-renderer/default',
            provider: 'checkoutProvider'
        };

    return Component.extend({
        isLoggedIn: ko.observable(window.isCustomerLoggedIn),
        isCompanyUser: window.customerData.isCompanyUser,
        isNegotiableQuote: window.checkoutConfig.isNegotiableQuote,

        /**
         * @return {Object} Chainable.
         */
        initialize: function () {
            this._super()
                .observe({
                    selectedAddress: customSelectAddress
                });

            this.selectAddress();

            return this;
        },

        /**
         * Set shipping address on quote
         */
        selectAddress: function () {
            var address = this.selectedAddress();

            if (address !== null) {
                selectShippingAddressAction(address);
                checkoutData.setSelectedShippingAddress(address.getKey());
            }
        },

        /**
         * Create new component that will render given address in the address list.
         *
         * @param {Object} address
         * @param {String} index
         */
        createRendererComponent: function (address, index) {
            var rendererTemplate, templateData, rendererComponent;

            if (index in this.rendererComponents) {
                this.rendererComponents[index].address(address);
            } else {
                // assign rendererTemplate by address type; rendererTemplates are provided via layout
                if (address.getType() !== undefined && this.rendererTemplates[address.getType()] !== undefined) {
                    rendererTemplate = utils.extend(
                        {},
                        defaultRendererTemplate,
                        this.rendererTemplates[address.getType()]
                    );
                } else {
                    rendererTemplate = defaultRendererTemplate;
                }

                templateData = {
                    parentName: this.name,
                    name: index
                };

                rendererComponent = utils.template(rendererTemplate, templateData);

                utils.extend(rendererComponent, {
                    address: ko.observable(address)
                });

                layout([rendererComponent]);

                this.rendererComponents[index] = rendererComponent;
            }
        }
    });
});
