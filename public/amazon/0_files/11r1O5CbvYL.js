(function(g){var k=window.AmazonUIPageJS||window.P,l=k._namespace||k.attributeErrors,c=l?l("SmxCartAssets",""):k;c.guardFatal?c.guardFatal(g)(c,window):c.execute(function(){g(c,window)})})(function(g,k,l){g.when("A","a-secondary-view","Cart","ready").execute(function(c,b,a){var f=c.$;c.on("a:popover:beforeShow:item-max-savings",function(e){c.loadImageManually(c.$(".smx-option-image"));e=b.get("item-max-savings");var d="#a-popover-"+e.data;e.update(f(d).clone().html());f(d).find(".smx-combo-div").length?
a.logUECounter("item-max-savings-nep-click"):a.logUECounter("item-max-savings-primary-click")});c.declarative("max-savings-secondary-view","click",function(e){var d=e&&e.data||{},h=b.get("item-max-savings");h&&("ajax"===d.dataStrategy?c.ajax(d.url,{method:"GET",success:function(a){f("#a-popover-"+d.name).html(a);h.update(f("#a-popover-"+d.name).clone().html());a=h.$container.find("#a-popover-preLoad");a.length&&(a[0].style.display="block")}}):"preload"===d.dataStrategy?h.update(f("#a-popover-"+d.name).clone().html()):
"redirect"===d.dataStrategy&&d.url&&(k.location=d.url),a.logUECounter("item-max-savings-secondary-click"))});c.on("a:expander:smx-cart-secondary-view-heres-how:toggle:expand",function(a){a=a.expander.$expander[0];var b=c.$(a).attr("data-params").match(/url=(.*)\}/)[1],h=c.$(a).children(".a-expander-content");c.ajax(b,{method:"GET",success:function(a){h.html(a)}})})});"use strict";g.when("a-switch","A","ready").execute(function(c,b){var a=b.$,f=!1;b.on("a:switch:creditToggleSwitch:on",function(b){a(".inemi-credit-nce-not-available").css("display",
"none");a(".inemi-standard-plans-credit").css("display","none");a(".inemi-credit-standard-plans-table-title").css("display","none");a(".inemi-nce-not-available-note-credit-emi")&&a(".inemi-nce-not-available-note-credit-emi").css("display","inherit");f||(f=!0)});b.on("a:switch:creditToggleSwitch:off",function(b){a(".inemi-credit-nce-not-available").css("display","block");a(".inemi-standard-plans-credit").css("display","table");a(".inemi-credit-standard-plans-table-title").css("display","inherit");
a(".inemi-nce-not-available-note-credit-emi")&&a(".inemi-nce-not-available-note-credit-emi").css("display","none")});var e=!1;b.on("a:switch:debitToggleSwitch:on",function(b){a(".inemi-debit-nce-not-available").css("display","none");a(".inemi-standard-plans-debit").css("display","none");a(".inemi-debit-standard-plans-table-title").css("display","none");a(".inemi-nce-not-available-note-debit-emi")&&a(".inemi-nce-not-available-note-debit-emi").css("display","inherit");e||(e=!0)});b.on("a:switch:debitToggleSwitch:off",
function(b){a(".inemi-debit-nce-not-available").css("display","block");a(".inemi-standard-plans-debit").css("display","table");a(".inemi-debit-standard-plans-table-title").css("display","inherit");a(".inemi-nce-not-available-note-debit-emi")&&a(".inemi-nce-not-available-note-debit-emi").css("display","none")});var d=!1;b.on("a:switch:otherToggleSwitch:on",function(b){a(".inemi-other-nce-not-available").css("display","none");a(".inemi-standard-plans-other").css("display","none");a(".inemi-other-standard-plans-table-title").css("display",
"none");a(".inemi-nce-not-available-note-other-emi")&&a(".inemi-nce-not-available-note-other-emi").css("display","inherit");d||(d=!0)});b.on("a:switch:otherToggleSwitch:off",function(b){a(".inemi-other-nce-not-available").css("display","block");a(".inemi-standard-plans-other").css("display","table");a(".inemi-other-standard-plans-table-title").css("display","inherit");a(".inemi-nce-not-available-note-other-emi")&&a(".inemi-nce-not-available-note-other-emi").css("display","none")})});"use strict";
g.when("A","ready").register("smxBankGroupExpander",function(c){c.on("a:expander:smx-bank-group-expander:toggle:expand",function(b){b=b.expander.$expander;null!==b&&b!==l&&b.find(".smx-bank-group-header-hidable-price").hide()});c.on("a:expander:smx-bank-group-expander:toggle:collapse",function(b){b=b.expander.$expander;null!==b&&b!==l&&b.find(".smx-bank-group-header-hidable-price").css("display","block")})})});