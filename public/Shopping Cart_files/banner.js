/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'jquery',
    'underscore',
    'ko',
    'jquery/jquery-storageapi'
], function ($, _, ko) {
    'use strict';

    var options = {
            cacheTtl: 0,
            sectionLoadUrl: ''
        },
        selectors = {
            productIdSelector: '#product_addtocart_form [name="product"]'
        },
        storage = $.initNamespaceStorage('mage-banners-cache-storage').localStorage,
        productId = $(selectors.productIdSelector).val(),

        /**
         * Cache invalidation. Banner cache ttl is 30 sec by default.
         */
        invalidateCacheBySessionTimeOut = function () {
            var cacheEol = new Date($.localStorage.get('mage-banners-cache-timeout')),
                dateTo = new Date(Date.now() + options.cacheTtl),
                cartDataId = null,
                globalStoreId = $.cookieStorage.get('store') || 'default';

            if ($.localStorage.get('mage-banners-storeId') === null) {
                $.localStorage.set('mage-banners-storeId', globalStoreId);
            }

            if ($.localStorage.get('mage-cache-storage') !== null &&
                $.localStorage.get('mage-cache-storage').hasOwnProperty('cart')) {
                cartDataId = $.localStorage.get('mage-cache-storage').cart['data_id'];
            }

            if (cacheEol < new Date() ||
                $.localStorage.get('mage-banners-storeId') !== globalStoreId ||
                $.localStorage.get('mage-banners-cartDataId') !== cartDataId) {
                storage.removeAll();
                $.localStorage.set('mage-banners-cache-timeout', dateTo);
                $.localStorage.set('mage-banners-storeId', globalStoreId);

                if (cartDataId) {
                    $.localStorage.set('mage-banners-cartDataId', cartDataId);
                }
            }
        },
        dataProvider = {

            /**
             * Request data from storage
             *
             * @param {Array} sectionNames
             * @returns {Object}
             */
            getFromStorage: function (sectionNames) {
                var result = {};

                _.each(sectionNames, function (sectionName) {
                    result[sectionName] = storage.get(sectionName);
                });

                return result;
            },

            /**
             * Request data from server
             *
             * @param {Array} sectionNames
             * @returns {Object}
             */
            getFromServer: function (sectionNames) {
                var parameters = {
                    'requesting_page_url': window.location.href
                };

                if (productId) {
                    parameters.data = {
                        'product_id': productId
                    };
                }

                if (_.isArray(sectionNames)) {
                    parameters.sections = sectionNames.join(',');
                }

                return $.getJSON(options.sectionLoadUrl, parameters).fail(function (jqXHR) {
                    throw new Error(jqXHR);
                });
            }
        },
        buffer = {
            data: {},

            /**
             * Binding parameter
             *
             * @param {String} sectionName
             */
            bind: function (sectionName) {
                this.data[sectionName] = ko.observable({});
            },

            /**
             *
             * @param {String} sectionName
             * @returns {Object}
             */
            get: function (sectionName) {
                if (!this.data[sectionName]) {
                    this.bind(sectionName);
                }

                return this.data[sectionName];
            },

            /**
             * Get keys
             *
             * @returns {Array}
             */
            keys: function () {
                return _.keys(this.data);
            },

            /**
             * Notify storage
             *
             * @param {String} sectionName
             * @param {Object} sectionData
             */
            notify: function (sectionName, sectionData) {
                if (!this.data[sectionName]) {
                    this.bind(sectionName);
                }
                this.data[sectionName](sectionData);
            },

            /**
             * Update sections
             *
             * @param {Array} sections
             */
            update: function (sections) {
                _.each(sections, function (sectionData, sectionName) {
                    storage.set(sectionName, sectionData);
                    buffer.notify(sectionName, sectionData);
                });
            }
        },
        banner = {

            /**
             * Initialization
             */
            init: function () {
                var dataSectionName;

                dataSectionName = this.getSectionName('data');

                if (_.isEmpty(storage.keys()) || !storage.get(dataSectionName)) {
                    this.reload([]);
                } else {
                    _.each(dataProvider.getFromStorage(storage.keys()), function (sectionData, sectionName) {
                        buffer.notify(sectionName, sectionData);
                    });
                }
            },

            /**
             * Get data
             *
             * @param {String} sectionName
             * @returns {*|Object}
             */
            get: function (sectionName) {
                sectionName = this.getSectionName(sectionName);

                return buffer.get(sectionName);
            },

            /**
             * Set data
             *
             * @param {String} sectionName
             * @param {Object} sectionData
             */
            set: function (sectionName, sectionData) {
                var data = {};

                sectionName = this.getSectionName(sectionName);
                data[sectionName] = sectionData;
                buffer.update(data);
            },

            /**
             * Reloading from storage or server
             *
             * @param {Array} sectionNames
             * @returns {Object}
             */
            reload: function (sectionNames) {
                return dataProvider.getFromServer(sectionNames).done(function (sections) {
                    _.each(sections, function (sectionData, sectionName) {
                        this.set(sectionName, sectionData);
                    }.bind(this));
                }.bind(this));
            },

            /**
             * Get section name
             *
             * @returns {String}
             */
            getSectionName: function (sectionName) {
                var result;

                result = productId && sectionName === 'data' ? 'data_product_' + productId : sectionName;

                return result;
            },

            /**
             * Init helper
             *
             * @param {Array} settings
             */
            'Magento_Banner/js/model/banner': function (settings) {
                options = _.extend(options, settings);
                invalidateCacheBySessionTimeOut(settings);
                banner.init();
            }
        };

    //TODO: remove global change, in this case made for initNamespaceStorage
    $.cookieStorage.setConf({
        path: '/'
    });

    return banner;
});
