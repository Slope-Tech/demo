define([
    'jquery',
    'underscore'
], function ($, _) {
    'use strict';

    /**
     * Google analytics universal class
     *
     * @param {Object} config
     */
    function GoogleAnalyticsUniversal(config) {
        this.blockNames = config.blockNames;
        this.dlCurrencyCode = config.dlCurrencyCode;
        this.dataLayer = config.dataLayer;
        this.staticImpressions = config.staticImpressions;
        this.staticPromotions = config.staticPromotions;
        this.updatedImpressions = config.updatedImpressions;
        this.updatedPromotions = config.updatedPromotions;
    }

    GoogleAnalyticsUniversal.prototype = {

        /**
         * Active on category action
         *
         * @param {String} id
         * @param {String} name
         * @param {String} category
         * @param {Object} list
         * @param {String} position
         */
        activeOnCategory: function (id, name, category, list, position) {
            this.dataLayer.push({
                'event': 'productClick',
                'ecommerce': {
                    'click': {
                        'actionField': {
                            'list': list
                        },
                        'products': [{
                            'id': id,
                            'name': name,
                            'category': category,
                            'list': list,
                            'position': position
                        }]
                    }
                }
            });
        },

        /**
         * Active on products action
         *
         * @param {String} id
         * @param {String} name
         * @param {Object} list
         * @param {String} position
         * @param {String} category
         */
        activeOnProducts: function (id, name, list, position, category) {
            this.dataLayer.push({
                'event': 'productClick',
                'ecommerce': {
                    'click': {
                        'actionField': {
                            'list': list
                        },
                        'products': [{
                            'id': id,
                            'name': name,
                            'list': list,
                            'position': position,
                            'category': category
                        }]
                    }
                }
            });
        },

        /**
         * Add to cart action
         *
         * @param {String} id
         * @param {String} name
         * @param {String} price
         * @param {String} quantity
         */
        addToCart: function (id, name, price, quantity) {
            this.dataLayer.push({
                'event': 'addToCart',
                'ecommerce': {
                    'currencyCode': this.dlCurrencyCode,
                    'add': {
                        'products': [{
                            'id': id,
                            'name': name,
                            'price': price,
                            'quantity': quantity
                        }]
                    }
                }
            });
        },

        /**
         * Remove from cart action
         *
         * @param {String} id
         * @param {String} name
         * @param {String} price
         * @param {String} quantity
         */
        removeFromCart: function (id, name, price, quantity) {
            this.dataLayer.push({
                'event': 'removeFromCart',
                'ecommerce': {
                    'currencyCode': this.dlCurrencyCode,
                    'remove': {
                        'products': [{
                            'id': id,
                            'name': name,
                            'price': price,
                            'quantity': quantity
                        }]
                    }
                }
            });
        },

        /**
         * Click banner action
         *
         * @param {String} id
         * @param {String} name
         * @param {String} creative
         * @param {String} position
         */
        clickBanner: function (id, name, creative, position) {
            this.dataLayer.push({
                'event': 'promotionClick',
                'ecommerce': {
                    'promoClick': {
                        'promotions': [{
                            'id': id,
                            'name': name,
                            'creative': creative,
                            'position': position
                        }]
                    }
                }
            });
        },

        /**
         * Bind impression click
         *
         * @param {String} id
         * @param {String} type
         * @param {String} name
         * @param {String} category
         * @param {Object} list
         * @param {String} position
         * @param {String} blockType
         * @param {String} listPosition
         */
        bindImpressionClick: function (id, type, name, category, list, position, blockType, listPosition) {
            var productLink = [],
                eventBlock,
                self = this;

            switch (blockType) {
                case 'catalog.product.related':
                    eventBlock = '.products-related .products';
                    break;

                case 'product.info.upsell':
                    eventBlock = '.products-upsell .products';
                    break;

                case 'checkout.cart.crosssell':
                    eventBlock = '.products-crosssell .products';
                    break;

                case 'category.products.list':
                case 'search_result_list':
                    eventBlock = '.products .products';
                    break;

            }

            productLink = $$(eventBlock + ' .item:nth(' + listPosition + ') a');

            if (type === 'configurable' || type === 'bundle' || type === 'grouped') {
                productLink = $$(
                    eventBlock + ' .item:nth(' + listPosition + ') .tocart',
                    eventBlock + ' .item:nth(' + listPosition + ') a'
                );
            }

            productLink.each(function (element) {
                element.observe('click', function () {
                    // Product category cannot be detected properly if customer is not on category page
                    if (blockType !== 'category.products.list') {
                        category = '';
                    }

                    self.activeOnProducts(
                        id,
                        name,
                        list,
                        position,
                        category);
                });
            });
        },

        /**
         * Update impressions
         */
        updateImpressions: function () {
            var pageImpressions = this.mergeImpressions(),
                dlImpressions = {
                    'event': 'productImpression',
                    'ecommerce': {
                        'impressions': []
                    }
                },
                i = 0,
                impressionCounter = 0,
                impression,
                blockName;

            for (blockName in pageImpressions) {
                // jscs:disable disallowKeywords
                if (blockName === 'length' || !pageImpressions.hasOwnProperty(blockName)) {
                    continue;
                }

                // jscs:enable disallowKeywords

                for (i; i < pageImpressions[blockName].length; i++) {
                    impression = pageImpressions[blockName][i];
                    dlImpressions.ecommerce.impressions.push({
                        'id': impression.id,
                        'name': impression.name,
                        'category': impression.category,
                        'list': impression.list,
                        'position': impression.position
                    });
                    impressionCounter++;
                    this.bindImpressionClick(
                        impression.id,
                        impression.type,
                        impression.name,
                        impression.category,
                        impression.list,
                        impression.position,
                        blockName,
                        impression.listPosition
                    );
                }
            }

            if (impressionCounter > 0) {
                this.dataLayer.push(dlImpressions);
            }
        },

        /**
         * Merge impressions
         */
        mergeImpressions: function () {
            var pageImpressions = [];

            this.blockNames.forEach(function (blockName) {
                // check if there is a new block generated by FPC placeholder update
                if (blockName in this.updatedImpressions) {
                    pageImpressions[blockName] = this.updatedImpressions[blockName];
                } else if (blockName in this.staticImpressions) { // use the static data otherwise
                    pageImpressions[blockName] = this.staticImpressions[blockName];
                }
            }, this);

            return pageImpressions;
        },

        /**
         * Update promotions
         */
        updatePromotions: function () {
            var dlPromotions = {
                'event': 'promotionView',
                'ecommerce': {
                    'promoView': {
                        'promotions': []
                    }
                }
            },
                pagePromotions = [],
                promotionCounter = 0,
                bannerIds = [],
                i = 0,
                promotion,
                self = this;

            // check if there is a new block generated by FPC placeholder update
            if (this.updatedPromotions.length) {
                pagePromotions = this.updatedPromotions;
            }

            // use the static data otherwise
            if (!pagePromotions.length && this.staticPromotions.length) {
                pagePromotions = this.staticPromotions;
            }

            if ($('[data-banner-id]').length) {
                _.each($('[data-banner-id]'), function (banner) {
                    var $banner = $(banner),
                        ids = ($banner.data('ids') + '').split(',');

                    bannerIds = $.merge(bannerIds, ids);
                });
            }

            bannerIds = $.unique(bannerIds);

            for (i; i < pagePromotions.length; i++) {
                promotion = pagePromotions[i];

                // jscs:disable disallowKeywords
                /* eslint-disable eqeqeq */
                if ($.inArray(promotion.id, bannerIds) == -1 || promotion.activated == '0') {
                    continue;
                }

                // jscs:enable disallowKeywords
                /* eslint-enable eqeqeq */

                dlPromotions.ecommerce.promoView.promotions.push({
                    'id': promotion.id,
                    'name': promotion.name,
                    'creative': promotion.creative,
                    'position': promotion.position
                });
                promotionCounter++;
            }

            if (promotionCounter > 0) {
                this.dataLayer.push(dlPromotions);
            }

            $('[data-banner-id]').on('click', '[data-banner-id]', function () {
                var bannerId = $(this).attr('data-banner-id'),
                    promotions = _.filter(pagePromotions, function (item) {
                        return item.id === bannerId;
                    });

                _.each(promotions, function (promotionItem) {
                    self.clickBanner(
                        promotionItem.id,
                        promotionItem.name,
                        promotionItem.creative,
                        promotionItem.position
                    );
                });
            });
        }
    };

    return GoogleAnalyticsUniversal;
});
