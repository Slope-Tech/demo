/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'Magento_Customer/js/customer-data',
    'underscore'
], function ($, customerData, _) {
    'use strict';

    /*globals Minicart */

    /**
     * Getter for cookie
     *
     * @param {String} name
     */
    function getCookie(name) {
        var cookie = ' ' + document.cookie,
            search = ' ' + name + '=',
            setStr = null,
            offset = 0,
            end = 0;

        /* eslint-disable eqeqeq */
        /* eslint-disable max-depth */

        if (cookie.length > 0) {
            offset = cookie.indexOf(search);

            if (offset != -1) {
                offset += search.length;
                end = cookie.indexOf(';', offset);

                if (end == -1) {
                    end = cookie.length;
                }
                setStr = decodeURI(cookie.substring(offset, end));
            }
        }

        /* eslint-enable eqeqeq */
        /* eslint-enable max-depth */

        return setStr;
    }

    /**
     * Delete cookie
     *
     * @param {String} name
     */
    function delCookie(name) {
        var date = new Date(0);

        document.cookie = name + '=' + '; path=/; expires=' + date.toUTCString();
    }

    /**
     * Google analytics universal cart class
     *
     * @param {Object} config
     */
    function GoogleAnalyticsUniversalCart(config) {
        this.dlCurrencyCode = config.dlCurrencyCode;
        this.dataLayer = config.dataLayer;
        this.cookieAddToCart = config.cookieAddToCart;
        this.advancedAddToCart = config.advancedAddToCart;
        this.cookieRemoveFromCart = config.cookieRemoveFromCart;
        this.productQtys = [];
        this.origProducts = {};
        this.productWithChanges = [];
        this.addedProducts = [];
        this.removedProducts = [];
        this.googleAnalyticsUniversalData = {};
    }

    GoogleAnalyticsUniversalCart.prototype = {
        // ------------------- shopping cart ------------------------

        /**
         * Listen mini cart reload
         */
        listenMinicartReload: function () {
            var context = this;

            if (!_.isUndefined(window.Minicart) && typeof Minicart.prototype.initAfterEvents) {
                Minicart.prototype.initAfterEvents['GoogleAnalyticsUniversalCart:subscribeProductsUpdateInCart'] =

                    /**
                     * Wrapper function
                     */
                    function () {
                        context.subscribeProductsUpdateInCart();
                        context.parseAddToCartCookies();
                        context.parseAddToCartAdvanced();
                        context.parseRemoveFromCartCookies();
                    };
                // if we are removing last item init don't calling
                Minicart.prototype.removeItemAfterEvents[
                    'GoogleAnalyticsUniversalCart:subscribeProductsRemoveFromCart'
                    ] =

                    /**
                     * Wrapper function
                     */
                    function () {
                        context.parseRemoveFromCartCookies();
                    };
            }
        },

        /**
         * Subscribe products update in cart
         */
        subscribeProductsUpdateInCart: function () {
            var context = this;

            $(document)
                .on('mousedown', '[data-cart-item-update]', function () {
                    context.collectCustomerProducts();
                })
                .on('mousedown', '.update-cart-item', function () {
                    context.collectCustomerProducts();
                })
                .on('mousedown', '[data-multiship-item-update]', function () {
                    context.collectOriginalProducts();
                    context.collectMultiCartQtys();
                })
                .on('mousedown', '[data-multiship-item-remove]', function () {
                    context.collectOriginalProducts();
                    context.collectMultiCartQtys();
                    context.updateMulticartCartObserver();
                })
                .on('mousedown', '[data-cart-empty]', function () {
                    context.emptyCartObserver();
                })
                .on('ajax:updateCartItemQty', function () {
                    context.updateCartObserver();
                })
                .on('ajax:updateMulticartItemQty', function () {
                    context.updateMulticartCartObserver();
                });
        },

        /**
         * Empty cart observer
         */
        emptyCartObserver: function () {
            var product,
                i;

            this.collectOriginalProducts();

            /* eslint-disable eqeqeq */
            for (i in this.origProducts) {
                if (i != 'length' && this.origProducts.hasOwnProperty(i)) {
                    product = $.extend({}, this.origProducts[i]);
                    this.removedProducts.push(product);
                }
            }

            /* eslint-enable eqeqeq */

            this.cartItemRemoved();
        },

        /**
         * Update multi cart observer
         */
        updateMulticartCartObserver: function () {
            this.collectMultiProductsWithChanges();
            this.collectProductsForMessages();
            this.cartItemAdded();
            this.cartItemRemoved();
        },

        /**
         * Update cart observer
         */
        updateCartObserver: function () {
            this.collectProductsWithChanges();
            this.collectProductsForMessages();
            this.cartItemAdded();
            this.cartItemRemoved();
        },

        /**
         * Collect multi products with changes
         */
        collectMultiProductsWithChanges: function () {
            var groupedProducts = {},
                cartProduct,
                i = 0,
                j,
                product;

            this.productWithChanges = [];

            for (i; i < this.productQtys.length; i++) {
                cartProduct = this.productQtys[i];

                if (_.isUndefined(groupedProducts[cartProduct.id])) {
                    groupedProducts[cartProduct.id] = parseInt(cartProduct.qty, 10);
                } else {
                    groupedProducts[cartProduct.id] += parseInt(cartProduct.qty, 10);
                }
            }

            /* eslint-disable max-depth */
            /* eslint-disable eqeqeq */
            for (j in groupedProducts) {

                if (groupedProducts.hasOwnProperty(j)) {

                    if (!_.isUndefined(this.origProducts[j]) && groupedProducts[j] != this.origProducts[j].qty) {
                        product = $.extend({}, this.origProducts[j]);
                        product.qty = groupedProducts[j];
                        this.productWithChanges.push(product);
                    }
                }
            }

            /* eslint-enable max-depth */
            /* eslint-enable eqeqeq */
        },

        /**
         * Collect products with changes
         */
        collectProductsWithChanges: function () {
            var i = 0,
                cartProduct,
                product;

            this.productWithChanges = [];

            /* eslint-disable eqeqeq */
            /* eslint-disable max-depth */
            for (i; i < this.productQtys.length; i++) {
                cartProduct = this.productQtys[i];

                if (
                    !_.isUndefined(this.origProducts[cartProduct.id]) &&
                    cartProduct.qty != this.origProducts[cartProduct.id].qty
                ) {
                    product = $.extend({}, this.origProducts[cartProduct.id]);

                    if (parseInt(cartProduct.qty, 10) > 0) {
                        product.qty = cartProduct.qty;
                        this.productWithChanges.push(product);
                    }
                }
            }

            /* eslint-enable max-depth */
            /* eslint-enable eqeqeq */
        },

        /**
         * Retrieves data about added products.
         */
        collectCustomerProducts: function () {
            this.collectOriginalProducts();
            this.collectCartQtys();
            this.collectMiniCartQtys();
        },

        /**
         * Collect original products
         */
        collectOriginalProducts: function () {
            var products = {},
                items = customerData.get('cart')().items;

            if (!_.isUndefined(items)) {
                items.forEach(function (item) {
                    products[item['product_sku']] = {
                        'id': item['product_sku'],
                        'name': item['product_name'],
                        'price': item['product_price_value'],
                        'qty': parseInt(item.qty, 10)
                    };
                });
            }

            this.googleAnalyticsUniversalData.shoppingCartContent = products;
            this.origProducts = this.googleAnalyticsUniversalData.shoppingCartContent;
        },

        /**
         * Collect multi cart qtys
         */
        collectMultiCartQtys: function () {
            var productQtys = [];

            $('[data-multiship-item-id]').each(function (index, elem) {
                productQtys.push({
                    'id': $(elem).data('multiship-item-id'),
                    'qty': $(elem).val()
                });
            });

            this.productQtys = productQtys;
        },

        /**
         * Collect cart qtys
         */
        collectCartQtys: function () {
            var productQtys = [];

            $('[data-cart-item-id]').each(function (index, elem) {
                productQtys.push({
                    'id': $(elem).data('cart-item-id'),
                    'qty': $(elem).val()
                });
            });

            this.productQtys = productQtys;
        },

        /**
         * Collect mini cart qtys
         */
        collectMiniCartQtys: function () {
            var productQtys = [];

            $('input[data-cart-item-id]').each(function (index, elem) {
                productQtys.push({
                    'id': $(elem).data('cart-item-id'),
                    'qty': $(elem).val()
                });
            });

            this.productQtys = productQtys;
        },

        /**
         * Collect products for messages
         */
        collectProductsForMessages: function () {
            var i = 0,
                product;

            this.addedProducts = [];
            this.removedProducts = [];

            /* eslint-disable max-depth */
            for (i; i < this.productWithChanges.length; i++) {
                product = this.productWithChanges[i];

                if (!_.isUndefined(this.origProducts[product.id])) {

                    if (product.qty > this.origProducts[product.id].qty) {
                        product.qty = Math.abs(product.qty - this.origProducts[product.id].qty);
                        this.addedProducts.push(product);
                    } else if (product.qty < this.origProducts[product.id].qty) {
                        product.qty = Math.abs(this.origProducts[product.id].qty - product.qty);
                        this.removedProducts.push(product);
                    }
                }
            }

            /* eslint-enable max-depth */
        },

        /**
         * Format products array
         *
         * @param {Object} productsIn
         */
        formatProductsArray: function (productsIn) {
            var productsOut = [],
                itemId,
                i;

            /* eslint-disable max-depth */
            /* eslint-disable eqeqeq */
            for (i in productsIn) {

                if (i != 'length' && productsIn.hasOwnProperty(i)) {

                    if (!_.isUndefined(productsIn[i].sku)) {
                        itemId = productsIn[i].sku;
                    } else {
                        itemId = productsIn[i].id;
                    }

                    productsOut.push({
                        'id': itemId,
                        'name': productsIn[i].name,
                        'price': productsIn[i].price,
                        'quantity': parseInt(productsIn[i].qty, 10)
                    });
                }
            }

            /* eslint-enable max-depth */
            /* eslint-enable eqeqeq */

            return productsOut;
        },

        /**
         * Cart item add action
         */
        cartItemAdded: function () {
            if (!this.addedProducts.length) {
                return;
            }

            this.dataLayer.push({
                'event': 'addToCart',
                'ecommerce': {
                    'currencyCode': this.dlCurrencyCode,
                    'add': {
                        'products': this.formatProductsArray(this.addedProducts)
                    }
                }
            });

            this.addedProducts = [];
        },

        /**
         * Cart item remove action
         */
        cartItemRemoved: function () {
            if (!this.removedProducts.length) {
                return;
            }

            this.dataLayer.push({
                'event': 'removeFromCart',
                'ecommerce': {
                    'currencyCode': this.dlCurrencyCode,
                    'remove': {
                        'products': this.formatProductsArray(this.removedProducts)
                    }
                }
            });

            this.removedProducts = [];
        },

        /**
         * Parse add from cart cookies.
         */
        parseAddToCartCookies: function () {
            var addProductsList;

            if (getCookie(this.cookieAddToCart)) {
                this.addedProducts = [];
                addProductsList = decodeURIComponent(getCookie(this.cookieAddToCart));
                this.addedProducts = JSON.parse(addProductsList);
                delCookie(this.cookieAddToCart);
                this.cartItemAdded();
            }
        },

        /**
         * Parse remove from cart cookies.
         */
        parseRemoveFromCartCookies: function () {
            var removeProductsList;

            if (getCookie(this.cookieRemoveFromCart)) {
                this.removedProducts = [];
                removeProductsList = decodeURIComponent(getCookie(this.cookieRemoveFromCart));
                this.removedProducts = JSON.parse(removeProductsList);
                delCookie(this.cookieRemoveFromCart);
                this.cartItemRemoved();
            }
        },

        /**
         *Parse add products from advanced add
         */
        parseAddToCartAdvanced: function () {
            var addedProductList = [];

            if (getCookie(this.advancedAddToCart)) {
                $.ajax({
                    url: '/gtm/index/get',
                    type: 'POST',
                    data: JSON.stringify({
                        'add_to_cart_advanced': true
                    }),
                    global: false,
                    async: false,
                    contentType: 'application/json'
                }).done(
                    function (response) {
                        addedProductList = JSON.parse(decodeURIComponent(response));
                    }
                );
                this.addedProducts = addedProductList;
                delCookie(this.advancedAddToCart);
                this.cartItemAdded();
            }
        }
    };

    return GoogleAnalyticsUniversalCart;
});
