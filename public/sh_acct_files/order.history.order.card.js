$(document).ready(function(){$(".delivery-address-popover-anchor").popover({html:!0,trigger:"focus",placement:"bottom",content:function(){return $(this).next(".delivery-address-info").html()}}),$(".delivery-address-trigger").on("click blur",function(e){$(this).next(".delivery-address-popover-anchor").popover("toggle")}),$(".track-package-trigger").on("click",function(e){e.stopPropagation()}).popover({html:!0,placement:"bottom",trigger:"click",container:"body",content:function(){var e={location:"Order Card",pageType:"Account"};return e.pageUrl=window.location.href,e.text="Track Package",e.signedIn=String(signedIn),segmentAnalyticsTrack("Button Clicked",e),$(this).next(".track-package-info").html()}}),$(".order-card-body-item").find(".ship-group-info-trigger").each(function(e,t){$(t).on("click",function(e){e.preventDefault(),$(t).closest(".order-card-body-item").next(".delivery-item-container").collapse("toggle")})}),$(".cancel-order-button").click(function(){var e=$(this).data("orderId"),t=$("#cancel-order-form"),e=$("<input>",{type:"hidden",name:"orderId",value:e});t.append(e),$("#cancel-order-confirmation").modal()})});