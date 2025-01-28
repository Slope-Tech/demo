define([
    'jquery',
    'uiComponent',
    'ko',
    'mage/url'
], function ($, Component, ko, url) {
    'use strict';

    return Component.extend({
        initialize: function() {
            this._super();
            this.isChecked = ko.observable(false);
            let self = this;

            this.isChecked.subscribe(function() {
                self.saveNdaConsent();
            });

            this.hasNdaProduct();
        },

        saveNdaConsent: function() {
            localStorage.setItem('hasAcceptedNda', this.isChecked());
        },

        isPreviouslyAccepted: function() {
            let isNdaAccepted = localStorage.getItem('hasAcceptedNda');
            if (isNdaAccepted === 'true') {
                this.isChecked(isNdaAccepted)
            }
        },

        getUrl: function() {
            return url.build('nda');
        },

        hasNdaProduct: function() {
            const ndaProductsList = window.checkoutConfig.agreementProducts;
            const cartItems = window.checkoutConfig.quoteItemData;
            const cartItemSkus = [];

            cartItems.forEach(function(item, index) {
                cartItemSkus.push(item.sku);
            });

            const hasMatch = function(cartItemSkus, ndaProductsList) {
                let match = cartItemSkus.filter(function(item) {
                    return ndaProductsList.includes(item);
                });
                if (match == false) {
                    return false;
                }
                return true;
            };

            return hasMatch(cartItemSkus, ndaProductsList);
        }
    });
});
