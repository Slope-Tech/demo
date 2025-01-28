/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'moment',
    'mage/translate'
], function ($, moment) {
    'use strict';

    return function (target) {
        $.validator.addMethod(
            'validate-formatted-date',
            function (value, element, params) {
                var date;

                if ($.mage.isEmptyNoTrim(value)) {
                    return true;
                }

                date = moment(value, params.dateFormat);

                return date.isValid() && value === date.format(params.dateFormat);
            },
            function (params) {
                return $.mage.__('Enter a valid date.') + ' ' + params.dateFormat;
            }
        );

        $.validator.addMethod(
            'validate-formatted-date-range',
            function (value, element, params) {
                var classNameParts = /\bdate-range-(\w+)-(\w+)\b/.exec(element.className),
                    fromDate,
                    toDateElement,
                    toDate,
                    maxDate;

                // check that we are working with the 'from' element and that it's not empty
                if (!classNameParts || classNameParts[2] === 'to' || $.mage.isEmptyNoTrim(value)) {
                    return true;
                }

                toDateElement = $(element.form).find('.date-range-' + classNameParts[1] + '-to');

                // check that the 'to' element is present and that it's not empty
                if (toDateElement.length && $.mage.isEmptyNoTrim(toDateElement[0].value)) {
                    return true;
                }

                // compare the 'to' and 'from' dates
                fromDate = moment(value, params.dateFormat),
                toDate = moment(toDateElement[0].value, params.dateFormat),
                maxDate = moment.max(fromDate, toDate);

                return maxDate.isValid() && toDate.format(params.dateFormat) === maxDate.format(params.dateFormat);
            },
            $.mage.__('The \'From\' date must precede the \'To\' date.')
        );

        return target;
    };
});
