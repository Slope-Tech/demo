/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'ko',
    'mage/translate'
], function ($, ko, $t) {
    'use strict';

    return function (target) {
        var steps = target.steps;

        /**
         * New checkout step registration. If it's PO checkout page - shipping step shouldn't registered.
         *
         * @param {String} code
         * @param {*} alias
         * @param {*} title
         * @param {Function} isVisible
         * @param {*} navigate
         * @param {*} sortOrder
         */
        target.registerStep = function (code, alias, title, isVisible, navigate, sortOrder) {
            var hash;

            if (window.checkoutConfig.isPurchaseOrderEnabled &&
                window.checkoutConfig.isPurchaseOrder &&
                code === 'shipping'
            ) {
                return;
            }

            if (window.checkoutConfig.isPurchaseOrderEnabled === true && code === 'payment') {
                if (window.checkoutConfig.isPurchaseOrder) {
                    title = $t('Review & Payments');
                } else {
                    title = $t('Review Purchase Order');
                }
            }

            if ($.inArray(code, this.validCodes) !== -1) {
                throw new DOMException('Step code [' + code + '] already registered in step navigator');
            }

            if (alias != null) {
                if ($.inArray(alias, this.validCodes) !== -1) {
                    throw new DOMException('Step code [' + alias + '] already registered in step navigator');
                }

                this.validCodes.push(alias);
            }

            this.validCodes.push(code);

            steps.push({
                code: code,
                alias: alias != null ? alias : code,
                title: title,
                isVisible: isVisible,
                navigate: navigate,
                sortOrder: sortOrder
            });

            this.stepCodes.push(code);

            hash = window.location.hash.replace('#', '');

            if (hash.length && hash !== code) {
                // Hide inactive step
                isVisible(false);
            }
        };

        /**
         * Step Navigation based on hash parameter in url. If it's PO checkout page:
         * #shipping hash should redirect to payment step
         *
         * @return {Boolean}
         */
        target.handleHash = function () {
            var hashString = window.location.hash.replace('#', ''),
                isRequestedStepVisible;

            if (hashString === '') {
                return false;
            }

            if ($.inArray(hashString, this.validCodes) === -1) {
                if (window.checkoutConfig.isPurchaseOrder &&
                    window.checkoutConfig.purchaseOrderPaymentUrl
                ) {
                    window.location.href = window.checkoutConfig.purchaseOrderPaymentUrl;
                } else {
                    window.location.href = window.checkoutConfig.pageNotFoundUrl;
                }

                return false;
            }

            isRequestedStepVisible = steps.sort(this.sortItems).some(function (element) {
                return (element.code == hashString || element.alias == hashString) && element.isVisible(); //eslint-disable-line
            });

            //if requested step is visible, then we don't need to load step data from server
            if (isRequestedStepVisible) {
                return false;
            }

            steps().sort(this.sortItems).forEach(function (element) {
                if (element.code == hashString || element.alias == hashString) { //eslint-disable-line eqeqeq
                    element.navigate(element);
                } else {
                    element.isVisible(false);
                }

            });

            return false;
        };

        return target;
    };
});
