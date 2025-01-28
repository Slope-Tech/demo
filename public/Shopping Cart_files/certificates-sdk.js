define(['Avalara_AvaTax/js/action/get-sdk-token', 'Avalara_AvaTax/js/load-sdk'], function (sdkToken, loadSdk) {
    return function (container, params) {
        return sdkToken().then(function (sdkUrl, token, customerId) {
            return loadSdk(container, params, sdkUrl, token, customerId);
        });
    }
});
