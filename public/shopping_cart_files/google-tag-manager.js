/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
/* jscs:disable */
/* eslint-disable */
define([
    'jquery',
    'mage/cookies'
], function ($) {
    'use strict';

    function init(config) {
        var allowServices = false,
            allowedCookies,
            allowedWebsites,
            f,
            j,
            dl;

        if (config.isCookieRestrictionModeEnabled) {
            allowedCookies = $.mage.cookies.get(config.cookieName);

            if (allowedCookies !== null) {
                allowedWebsites = JSON.parse(allowedCookies);

                if (allowedWebsites[config.currentWebsite] === 1) {
                    allowServices = true;
                }
            }
        } else {
            allowServices = true;
        }

        if (allowServices) {
            window.dataLayer = window.dataLayer || [];
            window.dlCurrencyCode = config.storeCurrencyCode;

            // Collect and send data about order and items
            if (config.ordersData.length > 0) {
                $.each(config.ordersData, function (index, value) {
                    dataLayer.push(value);
                });
            }

            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                });
                f = d.getElementsByTagName(s)[0];
                j = d.createElement(s);
                dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', config.gtmAccountId);

            $(document).trigger('ga:inited');
        }
    }

    /**
     * @param {Object} config
     */
    return function (config) {
        init(config);
        $(document).on('user:allowed:save:cookie', function () {
            init(config);
        });
    }
});
