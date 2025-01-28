/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'ko',
    'underscore',
    'mageUtils',
    'uiLayout',
    'Magento_Checkout/js/view/shipping-address/list',
    'Magento_Customer/js/model/address-list',
    './address-renderer/address'
], function (ko, _, utils, layout, ListView, addressList, AddressModel) {
    'use strict';

    var defaultRendererTemplate = {
        parent: '${ $.$data.parentName }',
        name: '${ $.$data.name }',
        component: 'Magento_NegotiableQuote/js/view/shipping-address/address-renderer/default',
        provider: 'checkoutProvider'
    };

    return ListView.extend({
        defaults: {
            template: 'Magento_NegotiableQuote/shipping-address/list'
        },

        /** @inheritdoc */
        initChildren: function () {
            var checkoutConfig = window.checkoutConfig;

            if (!checkoutConfig.isAddressInAddressBook && checkoutConfig.quoteShippingAddress) {
                addressList.push(new AddressModel(checkoutConfig.quoteShippingAddress));
                this.visible = true;
            }
            _.each(addressList(), this.createRendererComponent, this);

            return this;
        },

        /**
         * Create new component that will render given address in the address list.
         *
         * @param {Object} address
         * @param {*} index
         */
        createRendererComponent: function (address, index) {
            var rendererTemplate, templateData, rendererComponent;

            if (index in this.rendererComponents) {
                this.rendererComponents[index].address(address);
            } else {
                // rendererTemplates are provided via layout
                rendererTemplate = address.getType() !== undefined &&
                this.rendererTemplates[address.getType()] !== undefined ?
                    utils.extend({}, defaultRendererTemplate, this.rendererTemplates[address.getType()])
                    : defaultRendererTemplate;
                templateData = {
                    parentName: this.name,
                    name: index
                };
                rendererComponent = utils.template(rendererTemplate, templateData);
                utils.extend(rendererComponent, {
                    address: ko.observable(address)
                });
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
