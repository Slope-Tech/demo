/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([], function () {
    'use strict';

    /**
     * @param {Object} addressData
     * Returns new address object
     */
    return function (addressData) {
        return {
            customerAddressId: addressData['customer_address_id'],
            email: addressData.email,
            countryId: addressData['country_id'],
            customerId: addressData['customer_id'],
            street: addressData.street,
            company: addressData.company,
            telephone: addressData.telephone,
            fax: addressData.fax,
            postcode: addressData.postcode,
            city: addressData.city,
            firstname: addressData.firstname,
            lastname: addressData.lastname,
            middlename: addressData.middlename,
            prefix: addressData.prefix,
            suffix: addressData.suffix,
            vatId: addressData['vat_id'],
            sameAsBilling: addressData['same_as_billing'],
            region: addressData.region,
            regionId: addressData['region_id'],

            /**
             * @return {Object}
             */
            isDefaultShipping: function () {
                return addressData['default_shipping'];
            },

            /**
             * @return {Object}
             */
            isDefaultBilling: function () {
                return addressData['default_billing'];
            },

            /**
             * @return {Object}
             */
            getAddressInline: function () {
                return addressData.inline;
            },

            /**
             * @return {String}
             */
            getType: function () {
                return 'customer-address';
            },

            /**
             * @return {String}
             */
            getKey: function () {
                return this.getType() + this.customerAddressId;
            },

            /**
             * @return {String}
             */
            getCacheKey: function () {
                return this.getKey();
            },

            /**
             * @return {Boolean}
             */
            isEditable: function () {
                return false;
            },

            /**
             * @return {Boolean}
             */
            canUseForBilling: function () {
                return true;
            }
        };
    };
});
