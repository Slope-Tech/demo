(function(e){var d=window.AmazonUIPageJS||window.P,f=d._namespace||d.attributeErrors,a=f?f("VasCheetahAssets",""):d;a.guardFatal?a.guardFatal(e)(a,window):a.execute(function(){e(a,window)})})(function(e,d,f){e.register("VasConfig",function(){return{EVENTS:{UDS_SLOT_CONFIRM_EVENT:"uds:unifiedcalendar:confirmslotevent",SERVICES_SLOT_CONFIRM_EVENT:"services:unifiedcalendar:confirmslotevent",CHECKOUT_SHIP_OPTION_EVENT:"checkout-select-delivery-slots",SERVICE_ADDONS_CALENDAR_EVENT:"service-addons-calendar",
SERVICE_ADDONS_CHECKBOX_EVENT:"service-addons-checkbox",SERVICE_ADDONS_ADD_TO_ORDER_EVENT:"service-addons-add-to-order",SELECT_SERVICE_ADDON_EVENT:"select-service-addon",SERVICE_SCOPE_OF_WORK_DETAILS_EVENT:"service-scope-of-work-details"}}});"use strict";e.when("A").register("vas-logger",function(a){return{logMetric:function(a,c){if("undefined"!==typeof d.ue&&"undefined"!==typeof a&&"undefined"!==typeof d.ue.count){var b=d.ue.count(a)||0;d.ue.count(a,b+(c||1))}},logException:function(a,c){"undefined"!==
typeof d.ueLogError&&d.ueLogError(a,c);d.console&&d.console.error&&d.console.error(a,c.attribution)}}});"use strict";e.when("A","jQuery","vas-logger").register("service-addons-helper",function(a,d,c){return{isValidEvent:function(b,a){return b===f?(c.logException("serviceAddOns Event validation",{name:"serviceAddOns-event-undefined",logLevel:"ERROR",attribution:"service-addons-error",message:"event undefined"}),c.logMetric("ServiceAddOns:EventUndefined:".concat(a),1),!1):b.data===f?(c.logException("serviceAddOns EventData validation",
{name:"serviceAddOns-event-data-undefined",logLevel:"ERROR",attribution:"service-addons-error",message:"event data undefined"}),c.logMetric("ServiceAddOns:EventDataUndefined:".concat(a),1),!1):!0},getVariant:function(b,a){b=b.data.variant;b===f&&(c.logException("serviceAddOnsEvent variant validation",{name:"serviceAddOnsEventData-variant-undefined",logLevel:"ERROR",attribution:"service-addons-error",message:"variant is undefined"}),c.logMetric("ServiceAddOns:VariantUndefined:".concat(a),1));return b},
getCalendarId:function(b,a){b=b.data.calendarId;b===f&&(c.logException("serviceAddOnsEvent calendarId validation",{name:"serviceAddOnsEventData-calendarId-undefined",logLevel:"ERROR",attribution:"service-addons-error",message:"calendarId is undefined"}),c.logMetric("ServiceAddOns:CalendarIdUndefined:".concat(a),1));return b},getSlotIdToSlotMap:function(b,a){b=b.data.slotIdToSlotMap;b===f&&(c.logException("serviceAddOnsEvent slotIdToSlotMap validation",{name:"serviceAddOnsEventData-slotIdToSlotMap-undefined",
logLevel:"ERROR",attribution:"service-addons-error",message:"slotIdToSlotMap is undefined"}),c.logMetric("ServiceAddOns:SlotIdToSlotMapUndefined:".concat(a),1));return b},getBottomSheetName:function(b,a){b=b.data.bottomSheetName;b===f&&(c.logException("serviceAddOnsEvent bottomSheetName validation",{name:"serviceAddOnsEventData-bottomSheetName-undefined",logLevel:"ERROR",attribution:"service-addons-error",message:"bottomSheetName is undefined"}),c.logMetric("ServiceAddOns:BottomSheetNameUndefined:".concat(a),
1));return b},getBaseBottomSheetName:function(b,a){b=b.data.baseBottomSheetName;b===f&&(c.logException("serviceAddOnsEvent baseBottomSheetName validation",{name:"serviceAddOnsEventData-baseBottomSheetName-undefined",logLevel:"ERROR",attribution:"service-addons-error",message:"baseBottomSheetName is undefined"}),c.logMetric("ServiceAddOns:BaseBottomSheetNameUndefined:".concat(a),1));return b},getSelectedSlotId:function(b,a){return b===f?(c.logException("serviceAddOnsEvent selectedSlotIds validation",
{name:"serviceAddOns-selectedSlotIds-undefined",logLevel:"ERROR",attribution:"service-addons-error",message:"selectedSlotIds are undefined"}),c.logMetric("ServiceAddOns:Calendar:SelectedSlotIdsUndefined:".concat(a),1),f):0===b.length?(c.logException("serviceAddOnsEvent selectedSlotIds validation",{name:"serviceAddOns-selectedSlotIds-empty",logLevel:"ERROR",attribution:"service-addons-error",message:"selectedSlotIds are empty"}),c.logMetric("ServiceAddOns:Calendar:SelectedSlotIdsEmpty:".concat(a),
1),f):b[0]}}});"use strict";e.when("A","VasConfig").execute("udsDeliveryInfoPersistenceEvent",function(a,f){a.on(f.EVENTS.UDS_SLOT_CONFIRM_EVENT,function(c){var b=a.state(c.calendarId+"-vas-uds-delivery-persistence-info");b.data.postdata.deliveryPersistenceInformation.UnifiedDeliveryAndServicePersistenceInfo.slotIds=c.selectedSlots;b.data.isselected=!1;a.trigger(f.EVENTS.CHECKOUT_SHIP_OPTION_EVENT,b.data)})});"use strict";e.when("A","VasConfig").execute("serviceDeliveryInfoPersistenceEvent",function(a,
f){a.on(f.EVENTS.SERVICES_SLOT_CONFIRM_EVENT,function(c){var b=a.state(c.calendarId+"-vas-services-delivery-persistence-info");b.data.postdata.deliveryPersistenceInformation.ServicePersistenceInfo.slotIds=c.selectedSlots;b.data.isselected=!1;a.trigger(f.EVENTS.CHECKOUT_SHIP_OPTION_EVENT,b.data)})});"use strict";e.when("A","jQuery","VasConfig","service-addons-helper","ready").execute("serviceAddOnsCheckbox",function(a,f,c,b){a.declarative(c.EVENTS.SERVICE_ADDONS_CHECKBOX_EVENT,"click",function(d){var g=
c.EVENTS.SERVICE_ADDONS_CHECKBOX_EVENT.concat(":Desktop");b.isValidEvent(d,g)&&(g=b.getVariant(d,g),d=g.concat("-service-addon-persistence-info"),g=f("#".concat(g)).is(":checked"),a.state.parse(),d=a.state(d),g&&a.trigger(c.EVENTS.SELECT_SERVICE_ADDON_EVENT,d))})});e.when("A","jQuery","unifiedCalendarInstanceManager","VasConfig","service-addons-helper","ready").execute("serviceAddOnsCalendar",function(a,d,c,b,e){a.declarative(b.EVENTS.SERVICE_ADDONS_CALENDAR_EVENT,"click",function(g){var h=b.EVENTS.SERVICE_ADDONS_CALENDAR_EVENT.concat(":Desktop");
if(e.isValidEvent(g,h)){g.$event.stopPropagation();var l=e.getVariant(g),p=l.concat("-service-addon-persistence-info"),k="#promise-".concat(l);c.showCalendar(g);var q=e.getCalendarId(g,h),m=e.getSlotIdToSlotMap(g,h),n;a.declarative("unifiedcalendar:confirmslotbutton","click",function(){var b=c.getSelectedSlotIds(q),g=e.getSelectedSlotId(b,h);m[g]!==f&&(n=m[g].longPromiseLabel);a.state(p,{selectedSlotIds:b});d(k).find(".break-word")[0].innerHTML=n})}})});"use strict";e.when("A","jQuery","page-spinner-controller",
"page-conductor","VasConfig","vas-logger","ready").execute("serviceAddOnsSetterController",function(a,d,c,b,e,g){a.on(e.EVENTS.SELECT_SERVICE_ADDON_EVENT,function(a){var e=a.lineItemId,h=a.serviceAddOnId,k=a.selectedSlotIds;k===f||0===k.length?(g.logException("serviceAddOnsEvent selectedSlotIds validation : SelectedSlotIds Empty",{name:"serviceAddOns-selectedSlotIds-empty",logLevel:"ERROR",attribution:"service-addons-error",message:"Failed to set service add-on. Selected slot ids are empty"}),g.logMetric("Checkout:ServiceAddOns:SelectedSlotIds:Empty",
1)):(a=a.actionUrl,e="".concat("lineItemId\x3d",e,"\x26serviceId\x3d",h,"\x26slotIds\x3d",k),c.show(),d.ajax({type:"POST",url:a,data:e,dataType:"text",async:!0,cache:!1,headers:{"x-amz-checkout-page":"spc","x-amz-checkout-transition":"ajax"},contentType:"application/x-www-form-urlencoded; charset\x3dUTF-8;",success:function(){c.hide();g.logMetric("Checkout:ServiceAddOns:SetServiceAddOns:Success",1)},error:function(a,c,d){b.ajaxRedirect(a,c,d);g.logMetric("Checkout:ServiceAddOns:SetServiceAddOns:Failure",
1)}}))})})});