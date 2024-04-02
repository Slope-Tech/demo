var _inside=_inside||[];var _insideLoaded=_insideLoaded||false;var _insideJQ=_insideJQ||null;window._insideViewUpdate=window._insideViewUpdate||function(){};(function(){if(_insideLoaded)
return;_insideLoaded=true;var accountKey="IN-1011008";var trackerURL="cdn8.us.inside.chat";var subsiteId="1";var _insideMaxLoop=200;var _insideCurLoop=0;var _insideFirstLoad=false;var _insideCurrency=null;var insideOrderTotal=insideOrderTotal||0;var _insideDataLayer=null;var tempcururl=window.location.href;var temppageview="other";var _insideHashJ=null;function log(){if(typeof(console)!="undefined"&&typeof(console.log)!="undefined"){}}
var hashJoaat=function(b){for(var a=0,c=b.length;c--;)a+=b.charCodeAt(c),a+=a<<10,a^=a>>6;a+=a<<3;a^=a>>11;return((a+(a<<15)&4294967295)>>>0).toString(16)};function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)func.apply(context,args);};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args);};};function deferWait(callback,test){if(test()){callback();return;}
var _interval=10;var _spin=function(){if(test()){callback();}
else{_interval=_interval>=1000?1000:_interval*2;setTimeout(_spin,_interval);}};setTimeout(_spin,_interval);}
function keepWait(callback,test){if(test()){callback();if(_insideCurLoop>=_insideMaxLoop){return;}}
var _interval=2000;var _spin=function(){if(test()){_insideCurLoop=_insideCurLoop+1;callback();if(_insideCurLoop>=_insideMaxLoop){return;}}
setTimeout(_spin,_interval);};setTimeout(_spin,_interval);}
var indexOf=[].indexOf||function(prop){for(var i=0;i<this.length;i++){if(this[i]===prop)
return i;}
return-1;};function myTrim(text){try{if(typeof(text)!="undefined"&&text!=null)
return typeof(text.trim)==="function"?text.trim():text.replace(/^\s+|\s+$/gm,'');}catch(trimex){}
return text;}
function isNumeric(n){try{return!isNaN(parseFloat(n))&&isFinite(n);}
catch(tempex){}
return false;}
function validateEmail(tempmail){try{if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(tempmail)){return(true);}}catch(tempex){}
return(false);}
function setCookie(cname,cvalue,exdays){var hostName=window.location.hostname;var siteNameFragments=hostName.split(".");var siteName=siteNameFragments[1];var domain=siteNameFragments.slice(1,siteNameFragments.length).join(".");var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toGMTString();document.cookie=cname+"="+cvalue+"; "+expires+";path=/"+";domain=."+domain;}
function getCookie(cname){var name=cname+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=myTrim(ca[i]);if(c.indexOf(name)==0)
return c.substring(name.length,c.length);}
return null;}
function deleteCookie(cname){document.cookie=cname+"="+0+"; "+"expires=01 Jan 1970 00:00:00 GMT"+";path=/";}
function roundToTwo(num){if(Math!="undefined"&&Math.round!="undefined")
return+(Math.round(num+"e+2")+"e-2");else
return num;}
function getSearchParameters(){var prmstr=window.location.search.substring(1);return prmstr!=null&&prmstr!=""?transformToAssocArray(prmstr):[];}
function transformToAssocArray(prmstr){var params=[];var prmarr=prmstr.split("&");for(var i=0;i<prmarr.length;i++){params[i]=prmarr[i];}
return params;}
function randomIntFromInterval(min,max){try{return Math.floor(Math.random()*(max-min+1)+min);}
catch(tempex){}
return min;}
function getDecimalSign(number){try{var tempnum=myTrim(number);if(tempnum.length>3){return tempnum.charAt(tempnum.length-3);}}
catch(signex){}
return ".";}
function processInside(tracker){var searchUrl="/sitesearch";var searchQueryString=null;var productCategoryUrl=null;var productCategoryQueryString=".vwaListContainer";var productUrl=null;var productQueryString=null;var checkoutUrl="AjaxOrderItemDisplayView|OrderShippingBillingView|checkout";var checkoutQueryString=null;var orderConfirmedUrl=null;var orderConfirmedQueryString=null;function getViewData(){try{var insidedata={};insidedata.action="trackView";insidedata.type="article";insidedata.url=window.location.href;insidedata.name="Unknown Page: "+window.location.href;var tempurl=window.location.href.toLowerCase();var temppath=window.location.pathname;var temp_loc=temppath.split("/");var page="";var add_tags=[];var params=getSearchParameters();var searchterm="Search";if(params!=null&&params.length>0){for(var i=0;i<params.length;i++){if(params[i].indexOf("keyword=")==0){searchterm=params[i].split("keyword=")[1];}}}
for(var i=1;i<temp_loc.length;i++){if(temp_loc[i]!=null&&temp_loc[i].length>0){if(temp_loc[i].indexOf("?")!=-1){var temploc=temp_loc[i].split("?")[0];if(temploc.length>0)
page=temp_loc[i];}
else{page=temp_loc[i];}}}
var curpage=page.split("?")[0];insidedata.name=curpage;var temppagetype="other";try{if(typeof(dataLayer)!="undefined"&&dataLayer!=null&&dataLayer.length>0){for(var i=dataLayer.length-1;i>=0;i--){var tempbool=false;if(typeof(dataLayer[i])!="undefined"&&dataLayer[i]&&dataLayer[i].market_segment&&dataLayer[i].pageNameL5&&dataLayer[i].event=="e_pageView"){_insideDataLayer=dataLayer[i];break;}}}
if(typeof(_insideDataLayer)!="undefined"&&_insideDataLayer!=null&&_insideDataLayer.pageNameL5&&_insideDataLayer.pageNameL5.length>0){temppagetype=_insideDataLayer.pageNameL5.toLowerCase();}}catch(tempex){}
if((temppath=="/"||curpage=="shop"||curpage=="home.html")&&temp_loc.length<4){insidedata.type="homepage";}
else if(temppagetype=="homepage"){insidedata.type="homepage";}
else if(temppagetype=="search"){insidedata.type="search";}
else if(temppagetype=="category"){insidedata.type="productcategory";}
else if(temppagetype=="pdp"){insidedata.type="product";}
else if(temppagetype=="orderconfirmed"){insidedata.type="orderconfirmed";}
else if(tempurl.indexOf("/login")!=-1||tempurl.indexOf("/register")!=-1){insidedata.type="login";}
if(productCategoryUrl!=null){if(tempurl.indexOf(productCategoryUrl.toLowerCase())>-1){insidedata.type="productcategory";}}
if(productCategoryQueryString!=null){var tempelem=_insideJQ(productCategoryQueryString);if(tempelem!=null&&tempelem.length>0){insidedata.type="productcategory";}}
if(searchUrl!=null){if(tempurl.indexOf(searchUrl.toLowerCase())>-1){insidedata.type="search";}}
if(searchQueryString!=null){var tempelem=_insideJQ(searchQueryString);if(tempelem!=null&&tempelem.length>0){insidedata.type="search";}}
if(productUrl!=null){if(tempurl.indexOf(productUrl.toLowerCase())>-1){insidedata.type="product";}}
if(productQueryString!=null){var tempelem=_insideJQ(productQueryString);if(tempelem!=null&&tempelem.length>0){insidedata.type="product";}}
if(checkoutUrl!=null){if(tempurl.search(checkoutUrl.toLowerCase())>0){insidedata.type="checkout";}}
if(checkoutQueryString!=null){var tempelem=_insideJQ(checkoutQueryString);if(tempelem!=null&&tempelem.length>0){insidedata.type="checkout";}}
if(orderConfirmedUrl!=null){if(tempurl.indexOf(orderConfirmedUrl.toLowerCase())>-1){insidedata.type="orderconfirmed";}}
if(orderConfirmedQueryString!=null){var tempelem=_insideJQ(orderConfirmedQueryString);if(tempelem!=null&&tempelem.length>0){insidedata.type="orderconfirmed";}}
try{try{if(typeof(_insideData)!="undefined"&&_insideData!=null&&_insideData.order&&_insideData.order.total&&_insideData.order.id){insidedata.type="orderconfirmed";}
else{var tempconfirmprocess=orderConfirmProcess();if(tempconfirmprocess){insidedata.type="orderconfirmed";}}}catch(tempex){}}catch(tempex){}
switch(insidedata.type){case "homepage":insidedata.name="Home";break;case "search":insidedata.name="Search Result Page";if(searchterm!=null&&searchterm.length>0){insidedata.name=decodeURIComponent(searchterm);if(insidedata.name.indexOf("+")!=-1){insidedata.name=insidedata.name.replace(/\+/g,' ');}}
break;case "productcategory":var tempcat=getCategory();if(tempcat!=null&&tempcat.length>0){if(tempcat.length>149)
tempcat=tempcat.substring(0,149);insidedata.category=tempcat;}
var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0)
insidedata.name=tempPageName;break;case "product":var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0)
insidedata.name=tempPageName;tempPageName=getProductName();if(tempPageName!=null&&tempPageName.length>0)
insidedata.name=tempPageName;var tempcat=getCategory();if(tempcat!=null&&tempcat.length>0){if(tempcat.length>149)
tempcat=tempcat.substring(0,149);insidedata.category=tempcat;}
var tempval=getProductImage();if(tempval!=null&&tempval.length>0){if(tempval.indexOf("?")!=-1)
tempval=tempval.split("?")[0];insidedata.img=tempval;}
else
insidedata.type="other";var tempsku=getProductSku();if(tempsku!=null&&tempsku.length>0){insidedata.sku=tempsku;insidedata.name=insidedata.name+" - "+tempsku;}
else{insidedata.type="other";}
var tempprice=getProductPrice();if(tempprice!=null&&tempprice>0)
insidedata.price=tempprice;break;case "orderconfirmed":insidedata.name="Order Confirmed";break;default:var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0)
insidedata.name=tempPageName;}
if(add_tags.length>0){insidedata.tags=add_tags.join(",");}
try{var tempnode=getNode(insidedata);if(tempnode){insidedata.node=tempnode;}}catch(nodex){}
return insidedata;}
catch(ex){log("getViewData error: ",ex);var insidedata={};insidedata.action="trackView";insidedata.type="other";insidedata.url=window.location.href;insidedata.name="Error: "+window.location.href;return insidedata;}}
function getNode(insidedata){try{var tempurl=window.location.href.toLowerCase();if(insidedata&&insidedata.type){if(insidedata.type=="search"){return 2;}
else if(insidedata.type=="checkout"){return 7;}
else if(insidedata.type=="product"){var tempcat=getCategory();tempcat=tempcat.toLowerCase();if(tempcat.search("laptop")>0){if(tempurl.indexOf("gaming")!=-1){return 11;}
else if(tempcat.indexOf("business")!=-1){return 15;}
return 9;}
else if(tempcat.search("workstation")>0){return 4;}
else if(tempcat.search("printer")>0){return 5;}
else if(tempcat.search("ink")>0){return 6;}
else if(tempcat.search("desktop")>0){return 8;}
else if(tempcat.search("monitor")>0){return 12;}
else if(tempcat.search("accessor")>0){return 10;}}}
if(tempurl.indexOf("/workstation")!=-1){return 4;}
else if(tempurl.indexOf("/bizcat=laptop")!=-1){return 15;}
else if(tempurl.indexOf("/business-solution")!=-1){return 1;}
else if(tempurl.indexOf("/business-club")!=-1){return 3;}
else if(tempurl.indexOf("/printers")!=-1){return 5;}
else if(tempurl.indexOf("/ink")!=-1){return 6;}
else if(tempurl.indexOf("/desktops")!=-1){return 8;}
else if(tempurl.indexOf("monitors")!=-1){return 12;}
else if(tempurl.indexOf("/accessories")!=-1){return 10;}
else if(tempurl.indexOf("/contact-hp/contact.html")!=-1){return 14;}}catch(tempex){}
return 0;}
function getPageName(){try{if(typeof(_insideData)!="undefined"&&_insideData.page&&_insideData.page.name){return _insideData.page.name;}}catch(pagenameex){}
try{var content=document.getElementsByTagName("title");if(typeof(content)!="undefined"&&content!=null&&content.length>0){var result=content[0].textContent||content[0].innerText;if(typeof(result)!="undefined"&&result!=null&&result.length>0){return myTrim(result);}}}catch(pagenameex){}
return null;}
function getProductName(){try{if(_insideDataLayer&&_insideDataLayer.ecommerce&&_insideDataLayer.ecommerce.detail&&_insideDataLayer.ecommerce.detail.products&&_insideDataLayer.ecommerce.detail.products[0]&&_insideDataLayer.ecommerce.detail.products[0].name)
return _insideDataLayer.ecommerce.detail.products[0].name;}
catch(tempex){}
return null;}
function getProductImage(){try{var ldjsons=_insideJQ('script[type="application/ld+json"]');for(var i=0;i<ldjsons.length;i++){var tempdata=JSON.parse(_insideJQ(ldjsons[i]).last().html().replace(/\n/g,""));if(typeof(tempdata)!="undefined"&&tempdata!=null&&_insideJQ.isArray(tempdata)){for(var l=0;l<tempdata.length;l++){var tempdetail=tempdata[l];if(typeof(tempdetail)!="undefined"&&tempdetail!=null&&typeof(tempdetail["@type"])!="undefined"&&tempdetail["@type"]!=null&&tempdetail["@type"]=="Product"&&typeof(tempdetail.image)!="undefined"&&tempdetail.image!=null&&tempdetail.image.length>0){if(_insideJQ.isArray(tempdetail.image)){return tempdetail.image[0];}
else
return tempdetail.image;}}}
else if(typeof(tempdata)!="undefined"&&tempdata!=null&&typeof(tempdata["@type"])!="undefined"&&tempdata["@type"]!=null&&tempdata["@type"]=="Product"&&typeof(tempdata.image)!="undefined"&&tempdata.image!=null&&tempdata.image.length>0){if(_insideJQ.isArray(tempdata.image)){return tempdata.image[0];}
else
return tempdata.image;}}}
catch(tempex){}
try{var metaTags=document.getElementsByTagName("meta");var fbAppIdContent="";for(var i=0;i<metaTags.length;i++){if(metaTags[i].getAttribute("property")=="og:image"){fbAppIdContent=metaTags[i].getAttribute("content");return fbAppIdContent;}}}
catch(tempex){}
return null;}
function getProductPrice(){try{if(_insideDataLayer&&_insideDataLayer.ecommerce&&_insideDataLayer.ecommerce.detail&&_insideDataLayer.ecommerce.detail.products&&_insideDataLayer.ecommerce.detail.products[0]&&_insideDataLayer.ecommerce.detail.products[0].price)
return _insideDataLayer.ecommerce.detail.products[0].price;}
catch(tempex){}
return null;}
function getProductSku(){try{if(_insideDataLayer&&_insideDataLayer.ecommerce&&_insideDataLayer.ecommerce.detail&&_insideDataLayer.ecommerce.detail.products&&_insideDataLayer.ecommerce.detail.products[0]&&_insideDataLayer.ecommerce.detail.products[0].id)
return _insideDataLayer.ecommerce.detail.products[0].id;}
catch(tempex){}
return null;}
function getCategory(){try{if(_insideDataLayer&&_insideDataLayer.ecommerce&&_insideDataLayer.ecommerce.detail&&_insideDataLayer.ecommerce.detail.products&&_insideDataLayer.ecommerce.detail.products[0]&&_insideDataLayer.ecommerce.detail.products[0].category)
return _insideDataLayer.ecommerce.detail.products[0].category;}
catch(tempex){}
return null;}
function getOrderData(){try{var data=[];var totalprice=0;var orderId="auto";if(_insideData&&_insideData.cart&&_insideData.cart.items&&_insideData.cart.items.length>0){_insideJQ.each(_insideData.cart.items,function(tempindex,tempitem){var insideitem={};insideitem.action="addItem";insideitem.orderId=orderId;insideitem.name=tempitem.name;insideitem.img=tempitem.img;insideitem.price=parseFloat(tempitem.price);insideitem.sku=tempitem.sku;insideitem.qty=parseFloat(tempitem.qty);totalprice=totalprice+(insideitem.price*insideitem.qty);try{if(tempitem.img){insideitem.img=tempitem.img;if(insideitem.img.indexOf("?")>0){insideitem.img=insideitem.img.substring(0,insideitem.img.indexOf("?"));}}
else if(tempitem.image){insideitem.img=tempitem.image;if(insideitem.img.indexOf("?")>0){insideitem.img=insideitem.img.substring(0,insideitem.img.indexOf("?"));}}
if(tempitem.category){insideitem.category=tempitem.category;if(insideitem.category!=null&&insideitem.category.length>0){if(insideitem.category.length>149)
insideitem.category=insideitem.category.substring(0,149);}}}catch(urlex){}
data.push(insideitem);});}
if(data.length>0){try{if(_insideData.cart.total&&isNumeric(_insideData.cart.total))
totalprice=_insideData.cart.total;}catch(totalex){}
data.push({"action":"trackOrder","orderId":orderId,"orderTotal":totalprice});return data;}}
catch(ex){log("getOrderData error. ",ex);}
try{var data=[];var totalprice=0;var orderId="auto";_insideJQ(".xocart_cont:first .productrow .mcprodqty select.update").each(function(index){var tempitem=_insideJQ(this);var tempuidata=JSON.parse(tempitem.attr("data-ui"));var tempomnidata=JSON.parse(tempitem.attr("data-omni"));var insideitem={};insideitem.action="addItem";insideitem.orderId=orderId;insideitem.name=tempuidata.pn;insideitem.img=tempuidata.img;insideitem.sku=tempomnidata.partNumber;insideitem.price=parseFloat(tempomnidata.totalPrice);insideitem.qty=parseFloat(tempomnidata.qty);totalprice=totalprice+insideitem.price;insideitem.price=insideitem.price/insideitem.qty;data.push(insideitem);});if(data.length==0){_insideJQ(".rcBoxContainer:first .rcBox select.update").each(function(index){var tempitem=_insideJQ(this);var tempuidata=JSON.parse(tempitem.attr("data-ui"));var tempomnidata=JSON.parse(tempitem.attr("data-omni"));var insideitem={};insideitem.action="addItem";insideitem.orderId=orderId;insideitem.name=tempuidata.pn;insideitem.img=tempuidata.img;insideitem.sku=tempomnidata.partNumber;insideitem.price=parseFloat(tempomnidata.totalPrice);insideitem.qty=parseFloat(tempomnidata.qty);totalprice=totalprice+insideitem.price;insideitem.price=insideitem.price/insideitem.qty;data.push(insideitem);});if(data.length==0){_insideJQ(".xocart_cont:first .productrow .mcprodprice button.plus-button").each(function(index){var tempitem=_insideJQ(this);var tempuidata=JSON.parse(tempitem.attr("data-ui"));var tempomnidata=JSON.parse(tempitem.attr("data-omni"));var insideitem={};insideitem.action="addItem";insideitem.orderId=orderId;insideitem.name=tempuidata.pn;insideitem.sku=tempomnidata.partNumber;insideitem.price=parseFloat(tempomnidata.totalPrice);insideitem.qty=parseFloat(tempomnidata.qty);totalprice=totalprice+insideitem.price;insideitem.price=insideitem.price/insideitem.qty;try{if(tempomnidata.productCategory){insideitem.category=tempomnidata.productCategory;if(insideitem.category.length>140){insideitem.category=insideitem.category.substring(0,140);}}
if(tempuidata.img)
insideitem.img=tempuidata.img;}catch(tempex){}
data.push(insideitem);});if(data.length==0){_insideJQ(".rcBoxContainer input[data-ui][data-omni]").each(function(index){var tempitem=_insideJQ(this);var tempuidata=JSON.parse(tempitem.attr("data-ui"));var tempomnidata=JSON.parse(tempitem.attr("data-omni"));var insideitem={};insideitem.action="addItem";insideitem.orderId=orderId;insideitem.name=tempomnidata.pn;insideitem.sku=tempomnidata.partNumber;insideitem.price=parseFloat(tempomnidata.totalPrice);insideitem.qty=parseFloat(tempomnidata.qty);totalprice=totalprice+insideitem.price;insideitem.price=insideitem.price/insideitem.qty;try{if(tempomnidata.productCategory){insideitem.category=tempomnidata.productCategory;if(insideitem.category.length>140){insideitem.category=insideitem.category.substring(0,140);}}
if(tempuidata.img)
insideitem.img=tempuidata.img;}catch(tempex){}
data.push(insideitem);});}}}
if(data.length>0){data.push({"action":"trackOrder","orderId":orderId,"orderTotal":totalprice});sessionStorage.setItem("insideordertotal",totalprice);return data;}}
catch(ex){log("getOrderData error. ",ex);}
return null;}
function orderConfirmProcess(){try{var data=[];var detail=null;if(typeof(_insideData)!="undefined"&&_insideData!=null&&_insideData.order)
detail=_insideData.order;if(detail!=null){var totalprice=detail.total;var orderID=detail.id;var temppurchasedata={};if(typeof(detail.shipping)!="undefined"&&detail.shipping!=null){temppurchasedata.shipping=detail.shipping;}
if(typeof(detail.tax)!="undefined"&&detail.tax!=null){temppurchasedata.tax=detail.tax;}
if(_insideCurrency!=null){temppurchasedata.currency=_insideCurrency;}
try{var temporderdata=getOrderData();if(temporderdata&&temporderdata.length>0)
data=temporderdata;}catch(orderex){}
if(typeof(orderID)!="undefined"&&orderID!=null&&orderID.length>0&&orderID!="auto"){try{var lastOrderID=sessionStorage.getItem("insidelastorderid");if(lastOrderID==orderID){return null;}}
catch(orderidex){}
data.push({"action":"trackOrder","orderId":"auto","newOrderId":orderID,"orderTotal":totalprice,"data":temppurchasedata,"update":true,"complete":true});}
return data;}}
catch(ex){log("orderConfirmProcess error. ",ex);}
return null;}
function getVisitorId(){try{if(typeof(_insideData)!="undefined"&&_insideData!=null&&_insideData.user&&_insideData.user.id&&_insideData.user.firstName&&_insideData.user.lastName){return _insideData.user.id;}}
catch(visitidex){}
return null;}
function getVisitorName(){try{if(typeof(_insideData)!="undefined"&&_insideData!=null&&_insideData.user&&_insideData.user.id&&_insideData.user.firstName&&_insideData.user.lastName){if(_insideData.user.firstName&&_insideData.user.lastName){return _insideData.user.firstName+" "+_insideData.user.lastName;}}}
catch(visitidex){}
return "";}
function getVisitorData(){try{var tempdata={}
if(typeof(_insideData)!="undefined"&&_insideData!=null&&_insideData.user&&_insideData.user.id&&_insideData.user.firstName&&_insideData.user.lastName&&typeof(_insideData.user.email)!="undefined"&&_insideData.user.email!=null&&validateEmail(_insideData.user.email)){tempdata.user_name=_insideData.user.name;tempdata.user_email=_insideData.user.email;}
if(typeof(_insideData)!="undefined"&&_insideData!=null&&typeof(_insideData.website)!="undefined"&&_insideData.website!=null){if(_insideData.website.country){tempdata.country=_insideData.website.country;}
if(_insideData.website.language){tempdata.language=_insideData.website.language;}
if(_insideData.website.currency){tempdata.currency=_insideData.website.currency;}}
try{var tempsplit=location.pathname.split("/");if(tempsplit.length>1&&tempsplit[1].indexOf("-")!=-1){tempdata.language=tempsplit[1].split("-")[1];}}catch(tempex){}
return tempdata;}
catch(visitidex){}
return null;}
function insertInsideTag(){try{_insideGraph.processQueue();}
catch(tempex){}}
function sendToInside(){try{tracker.url=window.location.href;var visitorId=getVisitorId();if(visitorId!=null&&visitorId.length>0){tracker.visitorId=visitorId;}
var visitorName=getVisitorName();if(visitorName!=null&&visitorName.length>0){tracker.visitorName=visitorName;}
var visitorData=getVisitorData();if(visitorData!=null){tracker.visitorData=visitorData;}
var view=getViewData();if(view!=null){if(view.type=="orderconfirmed"){var tempconfirm=orderConfirmProcess();if(tempconfirm!=null&&tempconfirm.length>0){for(var i=0;i<tempconfirm.length;i++){_inside.push(tempconfirm[i]);try{if(tempconfirm[i].action=="trackOrder")
if(typeof(tempconfirm[i].newOrderId)!="undefined"&&tempconfirm[i].newOrderId!=null)
sessionStorage.setItem("insidelastorderid",tempconfirm[i].newOrderId);}
catch(tempex){}}
sessionStorage.removeItem("insideordertotal");}
else{view.type="orderconfirmedother";}}
else{var orderData=getOrderData();if(orderData!=null&&orderData.length>0){for(var i=0;i<orderData.length;i++){_inside.push(orderData[i]);if(orderData[i].action=="trackOrder"){view.orderId=orderData[i].orderId;view.orderTotal=orderData[i].orderTotal;insideOrderTotal=orderData[i].orderTotal;}}}
else if(view.type=="checkout"){sessionStorage.removeItem("insideordertotal");}
else{try{var tempcount=_insideJQ(".header-cart .cart-badge-container .cart-badge").text();if(tempcount){tempcount=parseFloat(tempcount);if(isNumeric(tempcount)&&tempcount>0){var temptotal=sessionStorage.getItem("insideordertotal");if(temptotal&&temptotal>0){view.orderId="auto";view.orderTotal=temptotal;}}}}catch(tempex){}}}
try{if(_insideDataLayer&&_insideDataLayer.ecommerce&&_insideDataLayer.ecommerce.currencyCode&&_insideDataLayer.ecommerce.currencyCode.length==3){_insideCurrency=_insideDataLayer.ecommerce.currencyCode.toUpperCase();}
if(typeof(_insideData)!="undefined"&&_insideData.website&&_insideData.website.currency&&_insideData.website.currency.length==3){_insideCurrency=_insideData.website.currency;}
try{if(typeof(dataLayer)!="undefined"&&dataLayer!=null&&dataLayer.length>0){for(var i=dataLayer.length-1;i>=0;i--){if(dataLayer[i]&&dataLayer[i].ecommerce){if(typeof(dataLayer[i].ecommerce.currency)!="undefined"&&dataLayer[i].ecommerce.currency!=null&&dataLayer[i].ecommerce.currency.length>0){_insideCurrency=dataLayer[i].ecommerce.currency.toUpperCase();break;}
if(typeof(dataLayer[i].ecommerce.currencyCode)!="undefined"&&dataLayer[i].ecommerce.currencyCode!=null&&dataLayer[i].ecommerce.currencyCode.length>0){_insideCurrency=dataLayer[i].ecommerce.currencyCode.toUpperCase();break;}}}}}catch(tempex){}
if(_insideCurrency){if(_inside!=null&&_inside.length>0){for(var i=0;i<_inside.length;i++){if(_inside[i].action=="trackOrder"){if(typeof(_inside[i].data)=="undefined"||_inside[i].data==null){_inside[i].data={};}
if(typeof(_inside[i].data.currency)=="undefined"||_inside[i].data.currency==null){_inside[i].data.currency=_insideCurrency;}}}}
if(typeof(view.data)=="undefined"||view.data==null){view.data={};}
view.data.currency=_insideCurrency;if(typeof(tracker.visitorData)=="undefined"||tracker.visitorData==null){tracker.visitorData={};}
tracker.visitorData.currency=_insideCurrency;}}catch(currencyex){}
_inside.push(view);log("Inside Debug: ",_inside);}}
catch(sendex){_inside=[];_inside.push({"action":"trackView","type":"other","name":"Check: "+window.location.href});log(sendex);}
insertInsideTag();if(!_insideFirstLoad)
_insideFirstLoad=true;}
window._insideViewUpdate=debounce(function(){var triggerupdate=true;if(triggerupdate){sendToInside();}},1000);var tempview=getViewData();if(tempview!=null&&typeof(tempview.type)!="undefined"&&tempview.type!=null&&tempview.type=="orderconfirmed"){deferWait(sendToInside,function(){var tempconfirm=orderConfirmProcess();if(tempconfirm!=null&&tempconfirm.length>0){return true;}
return document.readyState!='loading'&&document.readyState!='interactive';});}
else{deferWait(sendToInside,function(){if(document.readyState!='loading'&&document.readyState!='interactive'){keepWait(window._insideViewUpdate,function(){if(!_insideFirstLoad){try{var tempview=getViewData();if(tempview&&tempview.type&&tempview.type!=temppageview){temppageview=tempview.type;}}catch(tempex){}
return false;}
if(typeof(_insideGraph)!="undefined"&&_insideGraph!=null){var boolupdatedata=false;var tempurl=window.location.href.split("#")[0];if(tempurl!=tempcururl){tempcururl=tempurl;var tempview=getViewData();temppageview=tempview.type;boolupdatedata=true;}
try{var tempview=getViewData();if(tempview&&tempview.type&&tempview.type!=temppageview){if(temppageview=="orderconfirmed"&&tempview.type=="checkout"){temppageview=tempview.type;}
else{temppageview=tempview.type;boolupdatedata=true;}}}catch(tempex){}
return boolupdatedata;}
return false;});return true;}
return false;});}}
if(typeof(_insideGraph)!="undefined"&&_insideGraph!=null&&typeof(_insideGraph.current)!="undefined"&&_insideGraph.current!=null){processInside(_insideGraph.current);}
else{var insideTracker={"action":"getTracker","crossDomain":false,"account":accountKey};if(typeof(subsiteId)!="undefined"&&subsiteId!=null)
insideTracker["subsiteId"]=subsiteId;_inside.push(insideTracker);_inside.push({"action":"bind","name":"onload","callback":function(tracker){if(_insideFirstLoad)
return;_insideJQ=_insideGraph.jQuery;processInside(tracker)}});(function(w,d,s,u){a=d.createElement(s),m=d.getElementsByTagName(s)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m);})(window,document,"script","//"+trackerURL+"/ig.js");}})();