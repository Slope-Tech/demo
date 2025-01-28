/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/* eslint-disable max-nested-callbacks */

define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_ReCaptchaWebapiUi/js/webapiReCaptchaRegistry'
], function ($, wrapper, recaptchaRegistry) {
    'use strict';

    return function (placeOrder) {
        return wrapper.wrap(placeOrder, function (originalAction, serviceUrl, payload, messageContainer) {
            var recaptchaDeferred;

            if (recaptchaRegistry.triggers.hasOwnProperty('recaptcha-checkout-braintree')) {
                //ReCaptcha is present for checkout
                recaptchaDeferred = $.Deferred();
                recaptchaRegistry.addListener('recaptcha-checkout-braintree', function (token) {
                    //Add reCaptcha value to place-order request and resolve deferred with the API call results
                    payload.xReCaptchaValue = token;
                    originalAction(serviceUrl, payload, messageContainer).done(function () {
                        recaptchaDeferred.resolve.apply(recaptchaDeferred, arguments);
                    }).fail(function () {
                        recaptchaDeferred.reject.apply(recaptchaDeferred, arguments);
                    });
                });
                //Trigger ReCaptcha validation
                recaptchaRegistry.triggers['recaptcha-checkout-braintree']();
                //remove listener so that place order action is only triggered by the 'Place Order' button
                recaptchaRegistry.removeListener('recaptcha-checkout-braintree');
                return recaptchaDeferred;
            }

            //No ReCaptcha, just sending the request
            return originalAction(serviceUrl, payload, messageContainer);
        });
    };
});
