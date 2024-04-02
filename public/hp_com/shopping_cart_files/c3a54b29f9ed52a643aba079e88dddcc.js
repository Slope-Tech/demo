/*
 templayed.js
  Copyright (c) 2012 Paul Engel, released under the MIT license

  http://holder.nl - http://github.com/archan937 - http://codehero.es - http://gettopup.com - http://twitter.com/archan937 - paul.
  engel@holder.nl

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (
  the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, 
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
  furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
   CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;!function t(){var e=window,c=document,i=c.location;if(e._A&&_A.constructor==Object&&_A.isO(e._A.section))setTimeout(t,50);else!function(t,o,n,s,r){var a,l,p,f,u,m,g,h,d=i.protocol+"//",b="s_"+s,y=e[o],_=y&&y.constructor===Object&&"function"==typeof y[n],j=c.getElementsByTagName("script"),w=i.search.substring(1).split("\x26");if(a=function(t){t+="\x3d";for(var e=c.cookie.split(/;\s*/),
i=e.length-1;i>=0;i--)if(!e[i].indexOf(t))return e[i].replace(t,"")}(b))t=a;else for(f=0;f<w.length;f++)if(2==(m=w[f].split("\x3d")).length&&m[0]==s&&m[1]){t=m[1],g=b,h=t,c.cookie=g+"\x3d"+h;break}if(!_){for(p="https://"+t,l="http://"+t,f=0;!_&&"object"==typeof j&&f<j.length;f++)_=j[f].src==p||j[f].src==l;_||((u=c.createElement("script")).type="text/javascript",u.src=d+t,r&&(u.id=r),u.async=!0,c.getElementsByTagName("head")[0].appendChild(u))}}("www.hp.com/cma/ng/lib/exceptions/mu.js","_A","isO",
"muJS")}()},3926653,750827);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;(function(){try{var timeStamp=null;var sendLogglyBeacon=function(){if(!timeStamp)timeStamp=performance&&performance.now&&typeof performance.now==="function"?performance.now():null;document.removeEventListener("visibilitychange",sendLogglyBeacon);var endpoint="//logs-01.loggly.com/inputs/dd252c8a-a7ec-46f3-a0ed-84114a0ef03b/tag/http/";navigator.sendBeacon&&navigator.sendBeacon(endpoint,
["adobe\x3d"+!!window.adobeStCalled,"timestamp\x3d"+timeStamp,"url\x3d"+window.location.pathname].join("\x26"))};document.addEventListener("visibilitychange",sendLogglyBeacon);var interval=setInterval(function(){if(!!window.adobeStCalled){timeStamp=performance&&performance.now&&typeof performance.now==="function"?performance.now():null;clearInterval(interval);sendLogglyBeacon()}},300)}catch(e){}})()},3921465,750886);
Bootstrapper.bindDOMParsed(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;(function(){try{var loadImpactRadius=function(){(function(a,b,c,d,e,f,g){e["ire_o"]=c;e[c]=e[c]||function(){(e[c].a=e[c].a||[]).push(arguments)};f=d.createElement(b);g=d.getElementsByTagName(b)[0];f.async=1;f.src=a;g.parentNode.insertBefore(f,g);console.log("Impact Radius API injected")})("//d.impactradius-event.com/A353853-8e85-4786-9645-fac6b773cd071.js","script","ire",
document,window)};if(!window.dataLayer)dataLayer=[];dataLayer.push({event:"pb.onOptIn",callback:loadImpactRadius,type:3})}catch(err){console.log("Impact Radius API injection err:",err.message)}})()},3920903,750828);
Bootstrapper.bindDependencyImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;(function(hpUtil){var MAX_ATTEMPTS=200;var BACKOFF_THRESHOLD=100;var BACKOFF_RATE=1.1;var DEFAULT_INTERVAL=100;var trackConsoleErrors=false;var excludedParams={eSpotName:1,storeId:1,catalogId:1,langId:1,urlLangId:1,productId:1,urlRequestType:1};function quickFloat(t){var a=0;try{a=parseFloat(t)}catch(r){}return isNaN(a)?0:a}function quickInt(t){var a=0;try{a=parseInt(t)}catch(r){}return isNaN(a)?
0:a}var templayed;if(typeof templayed=="undefined"){templayed=function(c,e){var b=function(m,h){h=1;m=m.replace(/\.\.\//g,function(){h++;return""});var l=["vars[vars.length - ",h,"]"],k=m=="."?[]:m.split("."),g=0;for(g;g<k.length;g++)l.push("."+k[g]);return l.join("")},a=function(g){return g.replace(/\{\{(!|&|\{)?\s*(.*?)\s*}}+/g,function(j,h,l){if(h=="!")return"";var k=d++;return['"; var o',k," \x3d ",b(l),", s",k," \x3d (((typeof(o",k,') \x3d\x3d "function" ? o',k,".call(vars[vars.length - 1]) : o",
k,') || "") + ""); s +\x3d ',h?"s"+k:'(/[\x26"\x3e\x3c]/.test(s'+k+") ? s"+k+'.replace(/\x26/g,"\x26amp;").replace(/"/g,"\x26quot;").replace(/\x3e/g,"\x26gt;").replace(/\x3c/g,"\x26lt;") : s'+k+")",' + "'].join("")})},f=function(g){return a(g.replace(/\{\{(\^|#)(.*?)}}(.*?)\{\{\/\2}}/g,function(j,h,m,l){var k=d++;return['"; var o',k," \x3d ",b(m),"; ",(h=="^"?["if ((o",k," instanceof Array) ? !o",k,".length : !o",k,') { s +\x3d "',f(l),'"; } ']:["if (typeof(o",k,') \x3d\x3d "boolean" \x26\x26 o',
k,') { s +\x3d "',f(l),'"; } else if (o',k,") { for (var i",k," \x3d 0; i",k," \x3c o",k,".length; i",k,"++) { vars.push(o",k,"[i",k,']); s +\x3d "',f(l),'"; vars.pop(); }}']).join(""),'; s +\x3d "'].join("")}))},d=0;return new Function("vars",'vars \x3d [vars]; var s \x3d "'+f(c.replace(/"/g,'\\"').replace(/\n/g,"\\n"))+'"; return s;')};templayed.version="0.2.1"}hpUtil.templayed=templayed;hpUtil.q=Bootstrapper.when.defer;hpUtil.whenAvailable=hpUtil.when=function(condition,interval){interval=interval||
DEFAULT_INTERVAL;var attempts=0;var dfd=new hpUtil.q;(function(){if(attempts>MAX_ATTEMPTS){dfd.reject("Condition never met within time limit");return}else if(attempts>BACKOFF_THRESHOLD)interval=interval*BACKOFF_RATE;if(condition())dfd.resolve();else setTimeout(arguments.callee,interval);attempts++})();return dfd.promise};function whenDecorator(condition,f){return function(){var dfd=new hpUtil.q;var that=this;var args=arguments;hpUtil.when(condition).then(function(){dfd.resolve(f.apply(that,args))});
return dfd.promise}}hpUtil.addCss=function(css){var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style");style.type="text/css";if(style.styleSheet)style.styleSheet.cssText=css;else style.appendChild(document.createTextNode(css));head.appendChild(style)};hpUtil.getParamByName=function(name,url){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?\x26]"+name+"\x3d([^\x26#]*)"),results=regex.exec(url||location.search);return results===
null?"":decodeURIComponent(results[1].replace(/\+/g," "))};hpUtil.addParam=function(url,param,value){var urlParts=url.split("#");var hash=urlParts.length>1?"#"+urlParts[1]:"";var baseUrl=urlParts[0];var separator=baseUrl.indexOf("?")===-1?"?":"\x26",newParam=separator+param+"\x3d"+value;newUrl=baseUrl.replace(newParam,"");newUrl+=newParam;return newUrl+hash};var getAllParameters=function(search){var r=/\\u([\d\w]{4})/gi;try{if(search[0]==="?")search=search.substr(1);if(search[0]==="#")search=search.substr(1);
if(!search)return JSON.parse("{}");search=search.replace(/&$/,"").replace(r,function(match,grp){return String.fromCharCode(parseInt(grp,16))});search=unescape(search);return JSON.parse('{"'+decodeURI(search).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}')}catch(e){return search}};hpUtil.redirect=function(destBaseUrl,destHash){var params=getAllParameters(window.location.search);var destination;var fwdParams=[];var newaHash=destHash||window.location.hash||"";if(typeof params==="object"){for(var p in params)if(!excludedParams[p])fwdParams.push(p+
"\x3d"+params[p]);fwdParams=fwdParams.join("\x26")}else fwdParams=params;if(destBaseUrl.indexOf("?")>-1)destination=destBaseUrl+"\x26"+fwdParams;else destination=destBaseUrl+(fwdParams&&"?")+fwdParams;window.location.href=destination+newaHash};hpUtil.setCookie=function(cname,cvalue,exdays,cdomain,cpath){var c=[];var d=new Date;d.setTime(d.getTime()+exdays*24*60*60*1E3);c.push(cname+"\x3d"+cvalue);c.push("expires\x3d"+d.toUTCString());c.push("domain\x3d"+(cdomain||".hp.com"));c.push("path\x3d"+(cpath||
"/"));document.cookie=c.join(";")};hpUtil.deleteCookie=function(cname){this.setCookie(cname,"",-1)};hpUtil.getCookie=function(cname){var name=cname+"\x3d";var ca=document.cookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" ")c=c.substring(1);if(c.indexOf(name)==0)return c.substring(name.length,c.length)}return""};hpUtil.getTimeRemaining=function(endtime){var t=Date.parse(endtime)-Date.parse(new Date);var seconds=Math.floor(t/1E3%60);var minutes=Math.floor(t/1E3/60%60);
var hours=Math.floor(t/(1E3*60*60)%24);var days=Math.floor(t/(1E3*60*60*24));return{"total":t,"days":days,"hours":hours,"minutes":minutes,"seconds":seconds}};hpUtil.LocalCache=function(cName,exdays){var cname=cName;var that=this;var data;var exdate;var ex_key="_expiration";try{data=JSON.parse(localStorage[cname])}catch(e){data={}}if(exdays){exdate=new Date;exdate=exdate.setTime(exdate.getTime()+exdays*24*60*60*1E3);data[ex_key]=exdate}function save(){try{localStorage.setItem(cname,JSON.stringify(data))}catch(e){console.error("Error storing data in local storage",
e)}}this.get=function(k){if(data[ex_key]&&data[ex_key]<=Date.now()){this.delete();return null}return data[k]};this.set=function(k,v){data[k]=v;save()};this.remove=function(keys){for(var i=0;i<keys.length;i++){var k=keys[i];if(data[k])delete data[k]}save()};this.delete=function(){data={};delete localStorage[cname]};this.getAllKeys=function(){return Object.keys(data)}};hpUtil.addToCartWCS=function(product,quantity,refreshCart,success){var params=window.$.hpsfData.getOptions().params;var cartData={storeId:params.storeId,
catalogId:params.catalogId,langId:params.langId,orderId:".",calculationUsage:"-1,-2,-5,-6,-7",inventoryValidation:"true",URL:"",updatePrices:"1",isGC:"N",requesttype:"ajax"};if(product instanceof Array)for(var i=0;i<product.length;i++){var p=product[i];var index=i+1;if(p.itemId&&p.quantity){cartData["catEntryId_"+index]=p.itemId;cartData["quantity_"+index]=p.quantity}}else{cartData["catEntryId"]=product;cartData["quantity"]=quantity}$.ajax({type:"POST",url:"/webapp/wcs/stores/servlet/AddToCartAjax",
data:cartData,success:function(){refreshCart&&window.$.hpsfData.refreshCartData();success()}})};hpUtil.addToCart=function(args){if(args.itemId===undefined||args.productId===undefined||args.quantity===undefined){var message="You are missing a required parameter. Please provide itemId, productId, and quantity";console.error(message);throw new Error(message);}try{var container=$("\x3cdiv\x3e\x3c/div\x3e").attr({"class":"inventory_holder","data-a2c":JSON.stringify({itemId:args.itemId.toString(),prodId:args.productId.toString(),
qty:args.quantity.toString(),popup:false,targetUrl:""}),"data-omni":JSON.stringify({itemId:args.itemId.toString(),prodId:args.productId.toString(),site:"hhos",subSection:"cart",xsellAttr:args.xsellAttr||"",addToCartMethod:args.addToCartMethod&&args.addToCartMethod.toString()||"",parentId:"",location:""})});container.append("\x3ca class\x3d'add2cart-btn'\x3e\x3c/a\x3e");$.hpsfData.addToCart(container.find(".add2cart-btn"))}catch(e){console.debug("err",e)}};hpUtil.addToCart=whenDecorator(function(){return window.$&&
window.$.hpsfData&&$.hpsfData.addToCart},hpUtil.addToCart);hpUtil.getPrdSvcData=function(dataType,prodId){var data;var srvcData=$.hpsfData.getSvcData();prodId=prodId||window.productIdValue;srvcData[dataType]&&srvcData[dataType].forEach(function(prod,index,array){if(prod.productId===prodId.toString()){data=prod;return}});return data};hpUtil.getPrdSvcData=whenDecorator(function(){return window.$&&window.$.hpsfData&&window.$.hpsfData.getSvcData()},hpUtil.getPrdSvcData);hpUtil.getPrdCartData=function(prodId){var data;
var cartData=$.hpsfData.getCartData();$.each(cartData.orderItems,function(index,value){if(value&&value.catalogEntryIdentifier)if(value.catalogEntryIdentifier.uniqueID===prodId.toString())data=value});return data};hpUtil.getPrdCartData=whenDecorator(function(){return window.$&&window.$.hpsfData&&window.$.hpsfData.getCartData()},hpUtil.getPrdCartData);var analytics={};function getAddEvent(productId,qty,orderId,free){if(qty==undefined||qty==1||qty==2&&free==1)eventsList=["cart.new","cart.add"+":"+productId];
else eventsList=["cart.add"+":"+productId+orderId];return eventsList}function _trackMetrics(e){try{window.trackMetrics("new.link",{link:{name:e,type:"custom"}})}catch(i){console.error("Error tracking metrics ",e)}}analytics.trackAdd2Cart=function(products,addToCartMethod,productId){var cart=$.hpsfData.getCartData();var orderId=cart&&cart.orderIdentifier&&cart.orderIdentifier.uniqueID;var pId=productId||products[0].prodId;window.trackMetrics("new.page",{page:{site:"hhos",name:window.hpmmd.page.name,
section:window.hpmmd.page.section,page_function:"cart",events:window.getAddEvent(pId,products.length,orderId,0)},product:{list:products,addtocart_method:addToCartMethod}})};analytics.trackAdd2Cart=whenDecorator(function(){return window.$&&window.$.hpsfData&&window.trackMetrics},analytics.trackAdd2Cart);analytics.trackClicks=function(parentElm){var $=window.$;var selector=(parentElm?parentElm+" ":"")+"[data-metrics-prefix]";var container=$(selector);var metrixPrefix;if(container){metrixPrefix=container.data("metrics-prefix");
$(container).on("click","[data-track]",function(){var event=[metrixPrefix,$(this).data("track")].join(":");_trackMetrics(event)});container.find("[data-orbit-metric]").each(function(){var that=$(this);hpUtil.when(function(){return that.find(".orbit-prev").length>0||that.find(".orbit-next").length>0}).then(function(){var metrixPostfix=that.data("orbit-metric")+"_arrows";that.find(".orbit-prev").on("click",function(){var event=[metrixPrefix,metrixPostfix,"prev"].join(":");_trackMetrics(event)});that.find(".orbit-next").on("click",
function(){var event=[metrixPrefix,metrixPostfix,"next"].join(":");_trackMetrics(event)})})})}};analytics.trackClicks=whenDecorator(function(){return window.$},analytics.trackClicks);function getLineItemName(sku){var productName=sku;$(".productno").each(function(){var indexSku=$(this).html().replace("SKU:","").trim();if(indexSku===sku)productName=$(this).closest(".columndetail").find(".productname").html()});return productName}function getLineItemDetails(){var products={},smbMap=$("[var\x3d'isSMB']").map(function(){return $(this).val()}).get(),
categoryMap=$("[var\x3d'category']").map(function(){return $(this).val()}).get();$(".orderDetails .itemDetailsWrapper").each(function(index){var sku=($(this).find(".mcprodname .grey").html()||"").trim();products[sku]=products[sku]||{};products[sku].name=($(this).find(".aProdName").html()||"").trim();products[sku].isSMB=smbMap[index];products[sku].category=categoryMap[index]});return products}function getNameParts(name){var nP={first:"",last:""};if(name){name=name.trim().split(" ");nP.first=name[0];
nP.last=name.length>1?skipArray(name,"pop"):""}return nP}function parseCityStateZip(a2){if(!a2)return{};var a=a2.trim().split(" ");return{"zipcode":skipArray(a,"pop"),"state":skipArray(a,"pop"),"city":(a.join(" ")||"").replace(",","")}}function parseAddess(address){var addr=parseCityStateZip(skipArray(address,"pop"));var name=getNameParts(skipArray(address,"shift"));addr.firstName=name.first;addr.lastName=name.last;addr.phone="";if(address.length==1)addr.address1=address.shift().trim();if(address.length==
3){addr.company=skipArray(address,"shift");addr.address1=skipArray(address,"shift");addr.address2=skipArray(address,"shift")}return addr}function skipArray(arr,fn){if(!!!arr.length)return"";var a=arr[fn]();return a.trim()||skipArray(arr,fn)}function getMappedCat(plCode){var cat="other";var catMap={"accessories":["2a","2h","65","6a","8n","8w","9f","9g","9h","ff","gt","kn","mp","tx"],"carepack":["2d","64","7b","9r","cy","mn","r4","r6","uw"],"desktops":["1m","2c","5u","5x","6j","6v","7f","dg","ga"],
"monitor":["1u","2g","bo","tb","ut"],"notebooks":["2f","2t","6u","8j","an","g7","kv","ta","uv"],"printers":["2b","2n","2q","3y","4h","4l","4m","5m","7t","83","8a","9c","ak","c2","c5","dl","du","k5","ly","ma","mc","pq","sb","st","t2","t8"],"supplies":["1n","5t","au","gd","gj","gk","gm","gn","gp","k6","uk","ur"],"tablets":["4t","6x","7v","9t","ez","fd","fg"]};plCode=(plCode||"").toLowerCase();for(var c in catMap)if(catMap[c].indexOf(plCode)>-1){cat=c;break}return cat}function getMappedSubCat(plCode){var cat=
"other";var catMap={"3pp":["8w"],"camera":["kn"],"desktopaccy":["2h","9f","9h"],"desktopcommercial":["2c","5u","5x","7f","dg","ga"],"desktopconsumer":["1m","6j","6v"],"ink":["1n","gd","gm","k6","uk","ur"],"inkjetprinter":["2n","3y","4h","5m","7t","83","c2","dl","du","t8"],"ipgaccy":["2a","65","6a","gt","tx"],"ipgesp":["2d","64","7b","r4","r6","uw"],"laserjetprinter":["2b","2q","4l","4m","8a","9c","ak","c5","k5","ly","ma","mc","pq","sb","st","t2"],"media":["au"],"monitor":["1u","2g","bo","tb","ut"],
"notebookaccy":["8n","9g","ff","mp"],"notebookcommercial":["6u","8j","an","g7","ta","uv"],"notebookconsumer":["2f","2t","kv"],"psgesp":["9r","cy","mn"],"tabletcategory":["4t","6x","7v","9t","ez","fd","fg"],"toner":["5t","gj","gk","gn","gp"]};plCode=(plCode||"").toLowerCase();for(var c in catMap)if(catMap[c].indexOf(plCode)>-1){cat=c;break}return cat}var _order;function _getOrder(){if(_order)return _order;var $=window.$;var address={"shipping":".spLt .secContent","billing":".spRt .secContent"};var hpmmd=
window.hpmmd;var page=hpmmd.page;var metatags=hpmmd.metatags;var product=hpmmd.product;var promo=hpmmd.promo;var email=($("#emailId").val()||"").trim();var liDetails=getLineItemDetails();var subtotal=0;var totalProductDiscount=0;var order={"id":product.purchase_id,"email":email.trim(),"customerCountry":metatags.target_country,"customerLanguage":metatags.language,"currency":product.currency,"total":quickFloat($("#piAmount").val()),"shippingCost":quickFloat(promo&&promo.shipping_amt),"tax":quickFloat(product.tax),
"discount":quickFloat(promo&&promo.coupon_disc_amt),"coupon_code":promo&&promo.coupon_code,"userId":hpmmd.user&&hpmmd.user.id,"paymentMethod":product.payment_type,"callCenter":page&&page.platform};order.lineItems=product.list.map(function(p){var liD=liDetails[p.sku]||{};totalProductDiscount+=quickFloat(p.instant_disc_amt);subtotal+=quickFloat(p.total_price);return{"name":liD.name,"price":quickFloat(p.total_price),"unitPrice":quickFloat(p.total_price)/quickFloat(p.units),"qty":quickFloat(p.units),
"sku":p.sku,"isSMB":liD.isSMB&&"No"!==liD.isSMB||false,"category":p.category,"productLine":p.productLine,"mappedCategory":getMappedCat(p.productLine),"mappedSubCategory":getMappedSubCat(p.productLine)}});for(var a in address)try{var selector=address[a];var aParts=$(selector).html().replace(/\x3c!--(.*?)--\x3e/gi,"").split("\x3cbr\x3e");order[a]=parseAddess(aParts)}catch(e){console.log(e);hpUtil.log("error",{"id":"getOrder","message":"Error parsing address "+e.message})}order["totalProductDiscount"]=
totalProductDiscount;order["subtotal"]=subtotal;order["customerStatus"]=order.userId.toLowerCase().indexOf("registered")!==-1?"registered":"guest";_order=order;return order}analytics.getOrder=function(){var dfd=new hpUtil.q;var orderConfirmPath={"/us/en/ordershippingbillingconfirmationview":1,"/webapp/wcs/stores/servlet/ordershippingbillingconfirmationview":1,"/us-en/shop/ordershippingbillingconfirmationview":1};var isOrderConfirm=document.location.pathname.toLowerCase()in orderConfirmPath;if(!isOrderConfirm)setTimeout(dfd.reject,
20);else hpUtil.when(function(){return!!window.$&&window.hpmmd&&window.hpmmd.metatags&&window.hpmmd.metatags.language&&window.hpmmd.page&&window.hpmmd.product}).then(function(){dfd.resolve(_getOrder())},function(){dfd.reject()});return dfd.promise};hpUtil.analytics=analytics;hpUtil.analytics.trackClicks();Bootstrapper.loadScriptCallback("//cloudfront.loggly.com/js/loggly.tracker-2.1.min.js");if(document.pathname==="/us/en/OrderShippingBillingConfirmationView")trackConsoleErrors=true;window._LTracker=
window._LTracker||[];window._LTracker.push({"logglyKey":"dd252c8a-a7ec-46f3-a0ed-84114a0ef03b","sendConsoleErrors":trackConsoleErrors,"tag":"loggly-jslogger"});hpUtil.log=function(category,status,message,location){var curLocation=document.location.href;var payload={category:category,status:status,location:location||curLocation,timestamp:(new Date).toISOString(),"storeSession":hpUtil.getCookie("JSESSIONID"),"userAgent":window.navigator.userAgent};if(typeof message==="string")payload["data"]={"message":message};
else payload["data"]=message;_LTracker.push(payload)}})(window.hpUtil=window.hpUtil||{})},3921653,[3921465,3921542],750814,[750886,750907]);
Bootstrapper.bindDependencyImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;window.wd_hpservice=window.wd_hpservice||function(e,o){var t={},n=document.location.host in{"store.hp.com":1,"uat2.store.hp.com":1,"glbecomtran-edit-web.austin.hp.com":1,"g2t2647g.austin.hp.com":1}?"/":"//stage.hpstoreapp.com/",i=n+"api/web";var pgBatchQueue=[];var pgBatchTO;function pgBatchEnqueue(key,select,nc){var dfd=new hpUtil.q;pgBatchQueue.push({key:key,
select:select,promise:dfd,noCache:nc});return dfd.promise}function pgBatchExecute(){var map={};var keys=[];var select=[];var g;var e;var noCache;for(var i=0;i<pgBatchQueue.length;i++)try{e=pgBatchQueue[i];keys.push(e.key);select=union_arrays(select,e.select);map[e.key]=e.promise;noCache=noCache&&e.noCache}catch(e){}pgBatchQueue=[];t.productGroup.getAll(keys,select,noCache).then(function(resp){for(var pg=0;pg<resp.length;pg++){g=resp[pg];map[g.key].resolve(g);delete map[g.key]}for(var r in map){map[r].resolve();
delete map[r]}}).catch(function(){for(var e in map)map[e].reject()})}function union_arrays(x,y){var obj={};for(var i=x.length-1;i>=0;--i)obj[x[i]]=x[i];for(var i=y.length-1;i>=0;--i)obj[y[i]]=y[i];var res=[];for(var k in obj)if(obj.hasOwnProperty(k))res.push(obj[k]);return res}return t.product={apiPath:"/product/",get:function(e,t){var n=o.q(),r={select:(t||[]).join(",")||"itemId,prodId,name,imageUrl,sku,linkUrl"};return window.$.getJSON(i+this.apiPath+"/"+encodeURIComponent(e),r,n.resolve),n.promise},
search:function(e,t){var n=o.q(),r={select:(t||[]).join(",")||"itemId,prodId,name,imageUrl,sku,linkUrl"};for(var p in e)r[p]=encodeURIComponent(e[p].join(","));return window.$.getJSON(i+this.apiPath,r,n.resolve),n.promise}},t.productGroup={apiPath:"/product-group/",get:function(e,t,nc){pgBatchTO&&clearTimeout(pgBatchTO);var s=t||["itemId","prodId","name","imageUrl","sku","linkUrl"];pgBatchTO=setTimeout(pgBatchExecute,30);return pgBatchEnqueue(e,s,nc)},getAll:function(e,t,noCache){var n=o.q(),r={key:(e||
[]).join(","),select:(t||[]).join(",")||"itemId,prodId,name,imageUrl,sku,linkUrl"};if(noCache)r._nc=1;return window.$.getJSON(i+this.apiPath+"/getall",r,n.resolve),n.promise},search:function(e,t){var n=o.q(),r={select:(t||[]).join(",")||"itemId,prodId,name,imageUrl,sku,linkUrl"};for(var p in e)r[p]=encodeURIComponent(e[p].join(","));return window.$.getJSON(i+this.apiPath,r,n.resolve),n.promise}},t.template={apiPath:"/template/",get:function(e,t,n){var r=o.q(),p={pgKeys:t,sessionID:getCookie("JSESSIONID"),
nc:n?1:0};return window.$.get(i+this.apiPath+encodeURIComponent(e),p,r.resolve),r.promise}},t}(document,window.hpUtil)},3920897,[3921653],750825,[750814]);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;function getMeta(metaName){const metas=document.getElementsByTagName("meta");for(let i=0;i<metas.length;i++)if(metas[i].getAttribute("name")===metaName)return metas[i].getAttribute("content");return""}if(!hpmmd.metatags)hpmmd.metatags={"web_section_id":getMeta("web_section_id"),"viewport":getMeta("viewport"),"target_country":getMeta("target_country"),"segment":getMeta("segment"),
"page_content":getMeta("page_content"),"lifecycle":getMeta("lifecycle"),"language":getMeta("language"),"hp_inav_version":getMeta("hp_inav_version"),"hp_design_version":getMeta("hp_design_version"),"country":getMeta("country"),"business_unit":getMeta("business_unit"),"apple-mobile-web-app-capable":getMeta("apple-mobile-web-app-capable"),"CommerceSearch":getMeta("CommerceSearch")}},3921542,750907);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;(function(){var tagMsg="OptanonFix";try{var _checkHP_consent=function(fn){var hpeuck=_getHP_cookie("hpeuck_prefs");if(!!hpeuck){var val=hpeuck.split("\x3d").length>0?hpeuck.split("\x3d")[1]:"";fn=fn.toLowerCase().trim();if(fn=="analytics"&&val.length>1&&val.charAt(1)=="1")return true;else if(fn=="personalization"&&val.length>2&&val.charAt(2)=="1")return true;else if(fn==
"marketing"&&val.length>3&&val.charAt(3)=="1")return true}return false},_getHP_cookie=function(nm){var _cookies=document.cookie.split(";");if(!!_cookies)for(var ii=0;ii<_cookies.length;ii++)if(_cookies[ii].indexOf(nm)>=0)return _cookies[ii].trim()},_getHP_cookieSegment=function(groups,seg){for(var jj=0;jj<groups.length;jj++)if((_a=groups[jj].trim()).indexOf(seg)==0)return _a;return null},_setHPeuck_prefs=function(){_ocCookie=_getHP_cookie("OptanonConsent");if(!!_ocCookie){console.log("OC Cookie: "+
_ocCookie);var _groups=_ocCookie.split("\x26");if(!!_groups){var _group=_getHP_cookieSegment(_groups,"groups");var _ts=_getHP_cookieSegment(_groups,"datestamp");_group=!!_group?decodeURIComponent(_group):_group;_ts=!!_ts?decodeURIComponent(_ts):_ts;var _euckCookie=_getHP_cookie("hpeuck_prefs");if(!!_group){var _tsDate=null;var _tsx=_ts.split("\x3d");if(!!_tsx&&_tsx.length>1)_tsDate=new Date(_tsx[1].replace(/\+/g," "));var _date=new Date;if(!!!_euckCookie||(!!!_tsDate||_tsDate.getDate()==_date.getDate()&&
_tsDate.getHours()==_date.getHours())){console.log("OC Cookie: Consent Dates Have Changed");var _lr=_group.split("\x3d");if(_lr.length>1){_nv=_lr[1].split(",");console.log("OptanonConsent: "+_nv);var _ck=["1","1","1","1"];for(var kk=0;kk<_nv.length&&kk<4;kk++){var l=parseInt(_nv[kk].split(":")[0]);var r=_nv[kk].split(":")[1];if(l>0&&l<5)_ck[l-1]=r}_date.setTime(_date.getTime()+365*24*60*60*1E3);_euckCookie="hpeuck_prefs\x3d"+_ck.toString().replace(/,/g,"")+"; expires\x3d"+_date.toUTCString()+"; path\x3d/; domain\x3dhp.com";
document.cookie=_euckCookie;console.log("HP euck_prefs: "+_euckCookie)}}}}}};_setHPeuck_prefs()}catch(e){console.log(tagMsg," issue log:",e)}})()},3927123,751794);