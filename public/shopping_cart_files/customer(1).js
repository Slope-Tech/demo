define([
    'uiComponent', 
    'Magento_Customer/js/customer-data'
], function(Component, customerData) {
 
    return Component.extend({
        initialize: function () {
            this._super();
        },

        isCustomerLoggedIn: function () {
            var customer = customerData.get('customer');
            if (customer().firstname) {
                return true;
            } else {
                return false;
            }
        }
    });
});