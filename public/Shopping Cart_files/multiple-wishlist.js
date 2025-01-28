/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'underscore',
    'rjsResolver',
    'jquery'
], function (Component, customerData, _, resolver, $) {
    'use strict';

    /**
     * @param {Object} options
     * @return {Promise}
     */
    function initWidget(options) {
        // eslint-disable-next-line no-undef
        return $.Deferred(function (deferred) {
            if (options.canCreate || options.wishlists && options.wishlists.length > 0) {
                require([
                    'mage/mage',
                    'mage/dropdowns'
                ], function () {
                    $('body').mage('multipleWishlist', options);
                    $('.products.list [data-toggle=dropdown]')
                        .add('.cart.items.data [data-toggle=dropdown]')
                        .add('.product-addto-links [data-toggle=dropdown]')
                        .add('.secondary-addto-links.actions-secondary [data-toggle=dropdown]')
                        .dropdown({
                            events: [{
                                'name': 'mouseleave',
                                'selector': '.item.product',

                                /**
                                 * Action.
                                 */
                                'action': function () {
                                    var triggerElem = $('[data-toggle=dropdown]', this);

                                    triggerElem.hasClass('active') && triggerElem.trigger('click.hideDropdown');
                                }
                            }]
                        });
                });
            }
            deferred.resolve();
        }).promise();
    }

    return Component.extend({
        /** @inheritdoc */
        initialize: function () {
            this._super();

            resolver(function () {
                var widget;

                this.multiplewishlist = customerData.get('multiplewishlist');
                widget = initWidget(_.extend(this.multipleWishlistOptions, {
                    'canCreate': this.multiplewishlist()['can_create'],
                    'wishlists': this.multiplewishlist()['short_list']
                }));

                this.multiplewishlist.subscribe(function (options) {
                    widget.then(
                        function () {
                            var wishlistWidget;

                            wishlistWidget = $('body').data('mageMultipleWishlist');

                            if (wishlistWidget !== undefined) {
                                wishlistWidget.destroy();
                            }
                            initWidget(_.extend(this.multipleWishlistOptions, {
                                'canCreate': options['can_create'],
                                'wishlists': options['short_list']
                            }));
                        }.bind(this));
                }, this);
            }, this);
        }
    });
});
