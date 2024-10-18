(function(m){var r=window.AmazonUIPageJS||window.P,w=r._namespace||r.attributeErrors,q=w?w("QuantitySliderAssets",""):r;q.guardFatal?q.guardFatal(m)(q,window):q.execute(function(){m(q,window)})})(function(m,r,w){function q(t,n){try{m.register(t,n)}catch(f){if(-1===f.message.indexOf("reregistered by QuantitySliderAssets"))throw f;}}function y(){var t=arguments;return{register:function(n,f){try{m.when.apply(m,t).register(n,f)}catch(l){if(-1===l.message.indexOf("reregistered by QuantitySliderAssets"))throw l;
}}}}m.when("QuantitySliderAssetDuplicationGuard").execute(function(t){t.when("A","quantity-slider-utils","qs-cart-update-utils").register("qs-cart-update-handler",function(n,f,l){function h(a){p||(p="quantity-slider-widget-"+a);return p}function e(a,b){if(!b.atcFormSubmitDisabled){if((a=a.$target&&a.$target.closest(".qs-atc-form"))&&0!==a.length)return a;m.log("Missing $form object","ERROR",h(b.clientName))}}function b(b,x,k){n.trigger(f.ACTIONS.ADD_TO_CART_SUBMIT_START,{asin:b,cartType:x.cartType,
clientName:x.clientName,isQSAction:k,request:x});a(b,x,!0,k)}function a(a,b,k,e){var p=b.cartType,c=JSON.stringify(e?l.getQSRequestObject(b,k,p):l.getATCRequestObject(b,p)),d=l.getAjaxUrl(b,k,p);d&&g.ajax({url:d,type:l.getHttpMethodType(k,p),data:c,headers:l.getHeadersForRequest(b,k,p),xhrFields:{withCredentials:!0},success:function(d,c,g){d.jqXHR=g;delete u[a];(d=l.adaptResponseObject(d,b,k,b.cartType))?(f.setUpdatedQSParamsForAsinOffer(a,b.additionalParams&&b.additionalParams.storeId,{quantityInCart:d.quantity,
cartItemId:d.itemId}),n.trigger(k?f.ACTIONS.ADD_TO_CART_SUBMIT_SUCCESS:f.ACTIONS.REMOVE_FROM_CART_SUBMIT_SUCCESS,{asin:a,cartType:b.cartType,request:b,response:d,clientName:b.clientName,attribution:h(b.clientName),isQSAction:e,isDecreaseQuantityAction:!k}),f.logUrl(b.loggingUrl)):m.log("Invalid Response from the server","ERROR",h(b.clientName))},error:function(d){delete u[a];d=d||{};m.log("Ajax request failed with type: "+(k?"addItems":"modifyItems")+", status code: "+d.status+", error: "+d.responseText,
"ERROR",h(b.clientName));n.trigger(f.ACTIONS.QS_CART_SUBMIT_ERROR,{asin:a,cartType:p,clientName:b.clientName,isQSAction:e,isDecreaseQuantityAction:!k,isMaxOrderQuantityReached:b.quantityInCart>=b.maxOrderQuantity,response:d,request:b});k&&b.$form&&b.$form.submit()}})}var g=n.$,p="",u={};n.declarative("qs-add-to-cart-trigger","click",function(a){var g=a.data&&a.data.asin,k=f.getQsParamsFromTargetAsinOffer(a,g);a.$event&&a.$event.preventDefault();u[g]||(u[g]=!0,k.isMultipleAsinsSubmitting=1<Object.keys(u).length,
k.$form=e(a,k),k.triggeringEvent=a,b(g,k,!1))});n.declarative("qs-slider-widget-trigger","click",function(g){var l=g.data&&g.data.asin,k=f.getQsParamsFromTargetAsinOffer(g,l),h=g.$target[0]&&g.$target[0].className||"",p=n.contains(h,"qs-increase-quantity")||n.contains(h,"qs-decrease-quantity");h=n.contains(h,"qs-decrease-quantity");g.$event&&g.$event.preventDefault();p&&!u[l]&&(u[l]=!0,k.isMultipleAsinsSubmitting=1<Object.keys(u).length,k.triggeringEvent=g,h?(n.trigger(f.ACTIONS.REMOVE_FROM_CART_SUBMIT_START,
{asin:l,cartType:k.cartType,clientName:k.clientName,isQSAction:!0,isDecreaseQuantityAction:!0,request:k}),a(l,k,!1,!0)):(k.$form=e(g,k),b(l,k,!0)))});return{setAttribution:function(a){p=a}}})});"use strict";m.when("QuantitySliderAssetDuplicationGuard").execute(function(m){m.when("A","qs-fresh-cart-update-utils").register("qs-cart-update-utils",function(n,f){function l(d){var c=d.quantityInCart||0;return{items:[{asin:d.asinId,offerListingId:d.offerListingId,quantity:c<d.minOrderQuantity?d.minOrderQuantity-
c:1}]}}function h(d,c,a){return(e.isFunction(c[a])?c[a]:c.DEFAULT)(d)}var e=n.$,b={DEFAULT:l,UFG:f.getUfgCartRequestObject},a={DEFAULT:l,UFG:f.getUfgCartRequestObject},g={DEFAULT:function(d){var c=d.quantityInCart||0;var a=d.cartItemId;a=!a||"C"!==a[0]&&"S"!==a[0]?a:a.substring(1);return{items:[{id:a,quantity:c<=d.minOrderQuantity?0:c-1}]}},UFG:f.getUfgCartRequestObject},p={DEFAULT:function(d){return d.ajaxCartUrl},UFG:function(d){return d.addToCartUrl}},u={DEFAULT:function(d){return d.ajaxCartUrl}},
m={DEFAULT:function(d){return(d=d.entity&&d.entity.items&&d.entity.items[0])?{itemId:d.id,quantity:d.quantity,isTotal:!0}:null},UFG:f.ufgCartResponseAdapter},t={DEFAULT:function(d,c){d=(c.quantityInCart||0)-1;return 0>d?null:{itemId:d?c.cartItemId:"",quantity:d,isTotal:!0}},UFG:f.ufgCartResponseAdapter},k={DEFAULT:"POST",UFG:"POST"},q={DEFAULT:"PUT",UFG:"POST"},r={DEFAULT:function(d){return{"x-api-csrf-token":d.csrfToken,Accept:'application/vnd.com.amazon.api+json; type\x3d"cart.add-items/v1"',"Content-Type":'application/vnd.com.amazon.api+json; type\x3d"cart.add-items.request/v1"'}},
UFG:function(d){return{"Content-Type":"application/json"}}},c={DEFAULT:function(d){return{"x-api-csrf-token":d.csrfToken,Accept:'application/vnd.com.amazon.api+json; type\x3d"cart.modify-items/v1"',"Content-Type":'application/vnd.com.amazon.api+json; type\x3d"cart.modify-items.request/v1"'}},UFG:function(d){return{"Content-Type":"application/json"}}};return{getATCRequestObject:function(d,c){return h(d,b,c)},getQSRequestObject:function(d,c,b){return h(d,c?a:g,b)},adaptResponseObject:function(d,c,a,
b){a=a?m:t;return(e.isFunction(a[b])?a[b]:a.DEFAULT)(d,c)},getHttpMethodType:function(c,a){c=c?k:q;return c[a]?c[a]:c.DEFAULT},getHeadersForRequest:function(d,a,b){a=a?r:c;return(e.isFunction(a[b])?a[b]:a.DEFAULT)(d)},getAjaxUrl:function(c,a,b){return h(c,a?p:u,b)}}})});"use strict";m.when("QuantitySliderAssetDuplicationGuard").execute(function(m){m.when("A").register("qs-fresh-cart-update-utils",function(n){function f(f,h){return h&&h.items?h.items.find(function(h){return h.ASIN===f}):null}return{getUfgCartRequestObject:function(f){return f.additionalInput},
ufgCartResponseAdapter:function(l,h){return(h=f(h.asinId,l.clientResponseModel))?{itemId:h.itemId,quantity:h.quantity,isTotal:!0,rawResponse:l}:{itemId:"invalidItemId",quantity:0,isTotal:!0,rawResponse:l}}}})});"use strict";m.when("QuantitySliderAssetDuplicationGuard").execute(function(m){m.when("A","quantity-slider-utils").register("quantity-slider-metrics-handler",function(n,f){function l(a,b){return"QuantitySliderWidget::"+a+"::"+(b?b+"::":"")}function h(a){var b=r.ue;"undefined"!==typeof b&&b.count(a,
1)}function e(a,g){f.assert(a&&g.clientName,"Missing required properties while logging metrics");if(g.isQSAction)if(g.isDecreaseQuantityAction){var e=b.QS_DECREASE;a=l(g.clientName,g.cartType)+a+"::"+e;h(a)}else e=b.QS_INCREASE,a=l(g.clientName,g.cartType)+a+"::"+e,h(a);else e=b.ATC,a=l(g.clientName,g.cartType)+a+"::"+e,h(a)}var b={ATC:"ATC",QS_INCREASE:"QSIncrease",QS_DECREASE:"QSDecrease"};return{logRequestStartMetrics:function(a){e("CountStart",a)},logRequestSuccessMetrics:function(a){e("CountSuccess",
a)},logRequestErrorMetrics:function(a){e("CountError",a)},logMaxQuantityReachedMetric:function(a){a=l(a.clientName,a.cartType)+"MaxQuantityReached";h(a)},logMultipleAsinsSubmittingMetric:function(a){a=l(a.clientName,a.cartType)+"MultipleAsinsSubmitting";h(a)}}})});"use strict";m.when("QuantitySliderAssetDuplicationGuard").execute(function(m){m.when("A","quantity-slider-utils","qs-cart-update-handler","quantity-slider-metrics-handler").register("quantity-slider-widget",function(n,f,l,h){function e(c,
a,b,g){c=k(c,a,g);b?f.disableButton(c):f.enableButton(c)}function b(c,a,b){e("."+c+"-qs-slider-button .qs-decrease-quantity",c,a,b)}function a(c,a,b){e("."+c+"-qs-slider-button .qs-increase-quantity",c,a,b)}function g(c,a,b){e("."+c+"-qs-add-to-cart-button .qs-slider-atc-button",c,a,b)}function p(c){if(c.isQSAction){var a=c.asin,b=m(c);c.isDecreaseQuantityAction?f.deselectButton(k("."+a+"-qs-slider-button .qs-decrease-quantity",a,b)):f.deselectButton(k("."+a+"-qs-slider-button .qs-increase-quantity",
a,b))}}function m(a){return(a=(a=a.request)&&a.additionalInput)&&a.storeId}function q(c){var d=c.asin,e=m(c),l=k("."+d+"-qs-slider-spinner",d,e);f.toggleDomNodeVisibility(l,!1);c.isQSAction?(b(d,!1,e),a(d,!1,e)):g(d,!1,e);p(c);d=c.asin;f.assert(d&&c.request&&c.response&&c.response.quantity!==w,"Required properties missing in payload object for UpdateQSWidget");e=m(c);t(d,c.response.quantity,c.request.maxOrderQuantity,e);c.request.enableQuantityLimitMessage&&(d=k("."+d+"-qs-quantity-limit-message",
d,e),f.toggleDomNodeVisibility(d,c.response.quantity>=c.request.maxOrderQuantity));f.updateTotalCartCountOnUI(c,c.cartType);h.logRequestSuccessMetrics(c)}function r(c){var d=c.asin,e=m(c),l=k("."+d+"-qs-slider-spinner",d,e);f.toggleDomNodeVisibility(l,!0);c.isQSAction?(b(d,!0,e),a(d,!0,e)):g(d,!0,e);h.logRequestStartMetrics(c);c.request&&c.request.isMultipleAsinsSubmitting&&h.logMultipleAsinsSubmittingMetric(c)}function k(a,b,e){if(!e)return v(a);b="."+b+"-qs-slider-data";a=document.querySelectorAll(a);
for(var c=[],d=0;d<a.length;d++){var f=a[d],g=f&&v(f).closest(".qs-widget-container");(g=(g=g&&v(g).children(b))&&v(g).data("qs-model"))&&g.additionalInput&&g.additionalInput.storeId===e&&c.push(f)}return v(c)}function t(c,b,e,g){var d=k("."+c+"-qs-add-to-cart-button",c,g),h=k("."+c+"-qs-slider-button",c,g);0<b?(f.changeATCtoQS(d,h),d=Math.min(b,e),h=k("."+c+"-qs-qty-present-in-cart",c,g),Number.isInteger(d)&&h.html(d),a(c,b>=e,g)):(f.changeQStoATC(d,h),a(c,!1,g))}var v=n.$;Number.isInteger||(Number.isInteger=
function(a){return"number"===typeof a&&isFinite(a)&&-9007199254740992<a&&9007199254740992>a&&Math.floor(a)===a});n.on(f.ACTIONS.ADD_TO_CART_SUBMIT_START,function(a){r(a)});n.on(f.ACTIONS.ADD_TO_CART_SUBMIT_SUCCESS,function(a){q(a);a.response.quantity===a.request.maxOrderQuantity&&h.logMaxQuantityReachedMetric(a)});n.on(f.ACTIONS.REMOVE_FROM_CART_SUBMIT_START,function(a){r(a)});n.on(f.ACTIONS.REMOVE_FROM_CART_SUBMIT_SUCCESS,function(a){q(a)});n.on(f.ACTIONS.QS_CART_SUBMIT_ERROR,function(c){var d=c.asin,
e=m(c),l=k("."+d+"-qs-slider-spinner",d,e);f.toggleDomNodeVisibility(l,!1);c.isQSAction&&c.isMaxOrderQuantityReached?b(d,!1,e):c.isQSAction?(b(d,!1,e),a(d,!1,e)):g(d,!1,e);p(c);h.logRequestErrorMetrics(c)});return{ACTIONS:f.ACTIONS,setAttribution:l.setAttribution,updateQuantitySliderWidget:t}})});"use strict";m.when("QuantitySliderAssetDuplicationGuard").execute(function(q){q.when("A","a-button").register("quantity-slider-utils",function(n,f){function l(b){return e("."+b+"-qs-slider-data").first().data("qs-model")}
function h(b,a){var g=l(b);e("."+b+"-qs-slider-data").data(n.extend(g,a))}var e=n.$;return{ACTIONS:{ADD_TO_CART_SUBMIT_START:"quantity-slider:add-to-cart-start",ADD_TO_CART_SUBMIT_SUCCESS:"quantity-slider:add-to-cart-success",REMOVE_FROM_CART_SUBMIT_START:"quantity-slider:remove-from-cart-start",REMOVE_FROM_CART_SUBMIT_SUCCESS:"quantity-slider:remove-from-cart-success",QS_CART_SUBMIT_ERROR:"quantity-slider:cart-submit-error"},assert:function(b,a){if(!b)throw Error(a);},changeATCtoQS:function(b,a){e(b).hasClass("aok-hidden")||
(e(b).addClass("aok-hidden"),e(a).removeClass("aok-hidden"))},changeQStoATC:function(b,a){e(a).hasClass("aok-hidden")||(e(a).addClass("aok-hidden"),e(b).removeClass("aok-hidden"))},disableButton:function(b){f(e(b)).disable()},deselectButton:function(b){b=f(e(b));b.isEnabled()&&b.setStatus("normal")},enableButton:function(b){f(e(b)).enable()},getQSParamsForAsin:l,getQsParamsFromTargetAsinOffer:function(b,a){var g="."+a+"-qs-slider-data";return(g=(b=b.$event&&e(b.$event.target).closest(".qs-widget-container"))&&
b.children(g).data("qs-model"))?g:l(a)},setUpdatedQSParamsForAsin:h,setUpdatedQSParamsForAsinOffer:function(b,a,g){a?e("."+b+"-qs-slider-data").map(function(b,f){b=e(f);(f=b.data("qs-model"))&&f.storeId===a&&b.data(n.extend(f,g))}):h(b,g)},toggleDomNodeVisibility:function(b,a){a?e(b).removeClass("aok-hidden"):e(b).addClass("aok-hidden")},updateTotalCartCountOnUI:function(b,a){n.extend({},b).onSuccess=function(a){r.$Nav&&r.$Nav.when("api.setCartCount").run(function(b){b(a)});m.when("mash").execute("quantity-slider-mash-update",
function(b){b.cart&&e.isFunction(b.cart.didUpdate)&&b.cart.didUpdate({newCartQuantity:a})})}},logUrl:function(b){b&&n.post(b)}}})});"use strict";q("QuantitySliderAssetDuplicationGuard",function(){return{register:q,when:y}})});