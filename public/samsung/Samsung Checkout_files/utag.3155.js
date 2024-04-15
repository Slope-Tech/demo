//tealium universal tag - utag.3155 ut4.0.202404111533, Copyright 2024 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={"id":id},md5;utag.o[loader].sender[id]=u;utag.globals=utag.globals||{};if(utag.ut===undefined){utag.ut={};}
var match=/ut\d\.(\d*)\..*/.exec(utag.cfg.v);if(utag.ut.loader===undefined||!match||parseInt(match[1])<41){u.loader=function(o,a,b,c,l,m){utag.DB(o);a=document;if(o.type=="iframe"){m=a.getElementById(o.id);if(m&&m.tagName=="IFRAME"){b=m;}else{b=a.createElement("iframe");}o.attrs=o.attrs||{};utag.ut.merge(o.attrs,{"height":"1","width":"1","style":"display:none"},0);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";}if(o.id){b.id=o.id;}for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l]);}b.setAttribute("src",o.src);if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){this.onreadystatechange=null;o.cb();}};}}if(o.type!="img"&&!m){l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}}};}else{u.loader=utag.ut.loader;}
if(utag.ut.typeOf===undefined){u.typeOf=function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};}else{u.typeOf=utag.ut.typeOf;}
if(utag.ut.merge===undefined){u.merge=function(a,b,c,d){if(c){for(d in utag.loader.GV(b)){a[d]=b[d];}}else{for(d in utag.loader.GV(b)){if(typeof a[d]=="undefined"){a[d]=b[d];}}}};}else{u.merge=utag.ut.merge;}
if(utag.ut.md5===undefined){md5=function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,g)).finalize(a)}}});var k=m.algo={};return m}(Math);(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=md5,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);}else{md5=utag.ut.md5;}
u.ev={"view":1,"link":1};u.initialized=false;u.scriptrequested=false;u.queue=[];u.event_lookup={"AddPaymentInfo":{obj:"payment","map":["value","currency","content_category","content_ids"]},"AddToCart":{obj:"cart","map":["value","currency","content_name","content_ids"]},"AddToWishlist":{obj:"wish","map":["value","currency","content_name","content_ids"]},"CompleteRegistration":{obj:"reg","map":["value","currency","content_name"]},"Contact":{obj:"contact","map":[]},"CustomizeProduct":{obj:"customizeproduct","map":[]},"Donate":{obj:"donate","map":[]},"FindLocation":{obj:"findlocation","map":[]},"InitiateCheckout":{obj:"cout","map":["value","currency","content_name","content_ids","num_items"]},"Lead":{obj:"lead","map":["value","currency","content_name","content_category"]},"PageView":{obj:"page","map":[]},"Purchase":{obj:"purch","map":["value","currency","content_name","content_ids","num_items"]},"Schedule":{obj:"schedule","map":[]},"Search":{obj:"search","map":["value","currency","content_category","content_ids"]},"StartTrial":{obj:"starttrial","map":["value","currency"]},"SubmitApplication":{obj:"submitapplication","map":[]},"Subscribe":{obj:"subscribe","map":["value","currency"]},"ViewContent":{obj:"vc","map":["value","currency","content_name","content_ids","content_category"]},"Custom":{obj:"cust","map":[]},"Conversion":{obj:"cnv","map":["value","currency"]}};u.std_params={"value":function(g,event){if(g.value===undefined||g.value===""){if(event==="ViewContent"||event==="AddToCart"){g.value=u.data.ecom.product_unit_price;}else{g.value=u.data.ecom.order_subtotal;}}
g.value=u.val(g.value);},"currency":function(g){if(!g.currency){g.currency=u.data.ecom.order_currency;}},"content_name":function(g){if(!g.content_name){g.content_name=u.data.ecom.product_name;}
if(u.typeOf(g.content_name)!=="array"){g.content_name=g.content_name.split(/\s*,\s*/);}},"content_ids":function(g){if(!g.content_ids){g.content_ids=u.data.ecom.product_id;}
if(u.typeOf(g.content_ids)!=="array"){g.content_ids=g.content_ids.split(/\s*,\s*/);}},"content_category":function(g){if(!g.content_category){g.content_category=u.data.ecom.product_category;}
g.content_category=u.val(g.content_category);},"num_items":function(g){if(!g.num_items&&u.data.calc_items==="true"){g.num_items=u.calc_items(u.data.ecom.product_quantity);}}};u.map_func=function(arr,obj,item){var i=arr.shift();obj[i]=obj[i]||{};if(arr.length>0){u.map_func(arr,obj[i],item);}else{obj[i]=item;}};u.val=function(value){return u.typeOf(value)==="array"?value[0]:value;};u.remove_empty=function(a){var b,t;for(b in utag.loader.GV(a)){t=u.typeOf(a[b]);if(t==="object"){u.remove_empty(a[b]);if(u.isEmptyObject(a[b])){try{delete a[b];}catch(e){a[b]=undefined;}}}else if(!((a[b]===0||a[b]===false)?!0:(t==="array"&&a[b].length===0)?!1:!!a[b])){try{delete a[b];}catch(e){a[b]=undefined;}}}
return a;};u.calc_items=function(quan){var q,i=0;for(q=0;q<quan.length;q++){i+=parseInt(quan[q]);}
return i;};u.hasOwn=function(o,a){return o!=null&&Object.prototype.hasOwnProperty.call(o,a);};u.isEmptyObject=function(o,a){for(a in o){if(u.hasOwn(o,a)){return false;}}return true;};u.process_AM_data=function(_data){var am_data={},item,val;for(item in utag.loader.GV(_data)){val=_data[item];if(item==="ph"||item==="ge"||item==="db"||item==="zp"){val=val.replace(/\s/g,"").toLowerCase();}
if(item==="ph"){val=val.replace(/[^\d]/g,"");}else if(item==="ge"){if(val!=="m"&&val!=="f"){utag.DB("["+u.id+"] ge in wrong format. Removed from init call");continue;}}else if(item==="db"){if(val.length!==8){utag.DB("["+u.id+"] db is not the correct length. Please check format. Removed from init call");continue;}}else if(item==="zp"){val=val.replace(/[^\d]/g,"");if(val.length>5){utag.DB("["+u.id+"] zp is too long. Removed from init call");continue;}}
am_data[item]=val;}
return u.isEmptyObject(am_data)?undefined:am_data;};u.generateEventID=function(event,data,lookup_id){var hash_input=(data["tealium_timestamp_epoch"]||(function(){var d=new Date();return Math.floor(d.getTime()/1000);})())+"-"+lookup_id+"-"+event,event_id=md5.MD5(hash_input).toString();return event_id;};u.map={"order_id":"fb_order_id","fb_event:add_to_cart":"AddToCart","fb_event:view_content":"ViewContent","fb_event:purchase":"Purchase","order_total":"purch.value","product_price":"cart.value,vc.value,vc.product_price,cart.product_price,purch.product_price","order_currency":"purch.currency","_sm_3155_6":"cart.content_type,purch.content_type,vc.content_type","product_category":"cart.product_family,purch.product_family,vc.product_family","order_ID":"order_id","_sm_3155_9":"cart.currency,vc.currency","_sm_3155_10":"track_single"};u.extend=[function(a,b){try{b['_sm_3155_10']="true";}catch(e){utag.DB(e);}
try{b['_sm_3155_6']="product";}catch(e){utag.DB(e);}
try{b['_sm_3155_9']=b.currency=b.currency?b.currency:"USD";;}catch(e){utag.DB(e);}},function(a,b){try{if((typeof b['dr_page_name']!='undefined'&&b['dr_page_name'].toString().toLowerCase()=='new ecom step1|view cart'.toLowerCase()&&typeof b['dr_page_name']!='undefined'&&typeof b['aa_event_dr_page_name']!='undefined'&&typeof b['product_id']!='undefined')||(typeof b['dr_page_name']!='undefined'&&b['dr_page_name'].toString().toLowerCase()=='new ecom step2|checkout'.toLowerCase()&&typeof b['dr_page_name']!='undefined'&&typeof b['dr_page_name']!='undefined'&&typeof b['product_id']!='undefined')||(typeof b['_pathname4']!='undefined'&&b['_pathname4'].toString().toLowerCase()=='cart'.toLowerCase()&&typeof b['product_id']!='undefined')){b['fb_event']='add_to_cart';b['pinterest_event']='add_to_cart'}}catch(e){utag.DB(e);}},function(a,b){try{if((typeof b['order_id']!='undefined'&&b['order_id']!=''&&typeof b['order_id']!='undefined'&&typeof b['pinterest_event']=='undefined')||(typeof b['order_ID']!='undefined'&&b['order_ID']!=''&&typeof b['order_ID']!='undefined'&&typeof b['pinterest_event']=='undefined')){b['fb_event']='purchase';b['pinterest_event']='checkout';b['bing_event']='purchase'}}catch(e){utag.DB(e);}},function(a,b){try{if((typeof b['pagename_v2']!='undefined'&&b['pagename_v2'].toString().toLowerCase().indexOf('pdp:'.toLowerCase())>-1&&b['ut.event']=='view')||(typeof b['page_type']!='undefined'&&typeof b['site_section1']!='undefined'&&b['site_section1'].toString().indexOf('mobile')>-1&&b['page_type'].toString().indexOf('product explore')>-1&&b['ut.event']=='view')||(typeof b['page_type']!='undefined'&&b['page_type'].toString().toLowerCase()=='product explore'.toLowerCase()&&b['ut.event']=='view')||(b['dom.pathname'].toString().toLowerCase().indexOf('buy'.toLowerCase())>-1&&b['ut.event']=='view'&&typeof b['es_trigger']!='undefined')||(typeof b['page_type']!='undefined'&&b['page_type'].toString().toLowerCase().indexOf('product finder'.toLowerCase())>-1&&b['ut.event']=='view')){b['fb_event']='view_content';b['pinterest_event']='page_visit'}}catch(e){utag.DB(e);}},function(a,b){try{if(1){if((typeof b['pagename_v2']!='undefined'&&b['pagename_v2'].toString().toLowerCase().indexOf('pdp:'.toLowerCase())>-1)||(typeof b['page_type']!='undefined'&&typeof b['site_section1']!='undefined'&&b['site_section1'].toString().indexOf('mobile')>-1&&b['page_type'].toString().indexOf('product explore')>-1)||(typeof b['page_type']!='undefined'&&b['page_type'].toString().toLowerCase()=='product explore'.toLowerCase())||b['dom.pathname'].toString().toLowerCase().indexOf('buy'.toLowerCase())>-1){if(typeof b.product_id=="undefined"||b.product_id==null||b.product_id.length=="0"){b.product_id=[];var arr=decodeURI(b['dom.url']).toString().toLowerCase().split('sm-');if(arr.length>0){var productStr=arr[1];if(productStr.indexOf('/')>-1){productStr=productStr.split('/')[0]}
productStr=productStr.replace(/[^a-zA-Z0-9 ]/g,"");;productStr='SM-'+productStr.toString().toUpperCase();}
b.product_id.push(productStr);b._cprod=b.product_id;}}}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){utag.DB("send:3155");utag.DB(b);var c,d,e,f,g,h,i,amObj,event_id,lookup_id,evt=[];u.data={"qsp_delim":"&","kvp_delim":"=","base_url":"https://connect.facebook.net/en_US/fbevents.js","cust_pixel":"255663235586551","conv_pixel":"","page_view":"true","calc_items":"true","default_event":"None","adv_match":"false","track_single":"true","disablePushState":"","custom_data":{},"custom_event":"","product_id":[],"product_name":[],"product_category":[],"product_unit_price":[],"product_quantity":[],"evt_list":[],"ecom":{},"generate_event_id":"false"};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};utag.DB("send:3155:EXTENSIONS");utag.DB(b);c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.map_func(e[f].split("."),u.data,b[d]);}}else{h=d.split(":");if(h.length===2&&b[h[0]]===h[1]){if(u.map[d]){evt=evt.concat(u.map[d].split(","));}}}}
lookup_id=b.tealium_random||Math.random().toFixed(16).substring(2);utag.globals[lookup_id]=window.utag.globals[lookup_id]||{};if(u.data.evt_list&&u.typeOf(u.data.evt_list)!=="array"){u.data.evt_list=u.data.evt_list.split(/\s*,\s*/);}
if(u.data.default_event!=="None"&&u.data.default_event!==""){u.data.evt_list.push(u.data.default_event);}
u.data.evt_list=u.data.evt_list.concat(evt);g=u.data.ecom;g.order_id=u.data.order_id||b._corder||"";g.order_subtotal=u.data.order_subtotal||b._csubtotal||"";g.order_currency=u.data.order_currency||b._ccurrency||"";if(u.data.product_name.length===0&&b._cprodname!==undefined){g.product_name=b._cprodname.slice(0);}else{g.product_name=u.data.product_name;}
if(u.data.product_id.length===0&&b._cprod!==undefined){g.product_id=b._cprod.slice(0);}else{g.product_id=u.data.product_id;}
if(u.data.product_category.length===0&&b._ccat!==undefined){g.product_category=b._ccat.slice(0);}else{g.product_category=u.data.product_category;}
if(u.data.product_unit_price.length===0&&b._cprice!==undefined){g.product_unit_price=b._cprice.slice(0);}else{g.product_unit_price=u.data.product_unit_price;}
if(u.data.product_quantity.length===0&&b._cquan!==undefined){g.product_quantity=b._cquan.slice(0);}else{g.product_quantity=u.data.product_quantity;}
u.loader_cb=function(){utag.DB("send:3155:CALLBACK");var g={},i,j,k,_event,_event_id,tracking_type,_track="track",p,cb_amObj;if(u.typeOf(u.data.cust_pixel)!=="array"){u.data.cust_pixel=u.data.cust_pixel.split(/\s*,\s*/);}
if(a==="view"&&(u.data.adv_match===true||u.data.adv_match==="true")){cb_amObj=u.process_AM_data(u.remove_empty(u.data.am));for(k=0;k<u.data.cust_pixel.length;k++){fbq("init",u.data.cust_pixel[k],cb_amObj);}}
if(u.data.track_single===true||u.data.track_single==="true"){_track+="Single";}
if(u.data.evt_list.toString().indexOf("Purchase")===-1&&u.data.ecom.order_id){u.data.evt_list.push("Purchase");}
if(u.data.ecom.order_id){for(i=0;i<u.data.evt_list.length;i++){if(u.data.evt_list[i]==="Purchase"){p=true;}}
if(!p){u.data.evt_list.push("Purchase");}}
for(i=0;i<u.data.evt_list.length;i++){_event=u.data.evt_list[i];tracking_type=_track;f=u.event_lookup[_event];c=f?f.map:[];f=f?f.obj:_event;g=u.data[f]=u.data[f]||{};for(j=0;j<c.length;j++){u.std_params[c[j]](g,_event);}
if(_event==="Search"){if(!g.content_category){g.content_category="Product Search";}}else if(_event==="Conversion"&&u.data.conv_pixel){_event=u.data.conv_pixel;}else if(_event&&!u.event_lookup[_event]){tracking_type+="Custom";g=u.data[_event];}
if(g.value!==undefined){if(u.typeOf(g.value)==="array"){for(j=0;j<g.value.length;j++){g.value[j]=parseFloat(g.value[j])||0.00;}}else{g.value=parseFloat(g.value)||0.00;}}
if(_event){if(u.data.track_single===true||u.data.track_single==="true"){for(k=0;k<u.data.cust_pixel.length;k++){if(u.data.generate_event_id==="true"||u.data.generate_event_id===true){_event_id=u.generateEventID(_event,b,lookup_id);window.utag.globals[lookup_id]["fb_event_id_"+_event]=_event_id;fbq(tracking_type,u.data.cust_pixel[k],_event,u.remove_empty(g),{eventID:_event_id});}else{fbq(tracking_type,u.data.cust_pixel[k],_event,u.remove_empty(g));}}}else{if(u.data.generate_event_id==="true"||u.data.generate_event_id===true){_event_id=u.generateEventID(_event,b,lookup_id);window.utag.globals[lookup_id]["fb_event_id_"+_event]=_event_id;fbq(tracking_type,_event,u.remove_empty(g),{eventID:_event_id});}else{fbq(tracking_type,_event,u.remove_empty(g));}}}}
utag.DB("send:3155:CALLBACK:COMPLETE");};u.callBack=function(){var data={};u.initialized=true;while(data=u.queue.shift()){u.data=data.data;u.loader_cb();}};if(u.initialized){u.loader_cb();}else if(!u.initialized&&window.fbq){u.initialized=true;if(u.data.cust_pixel){u.data.cust_pixel=u.data.cust_pixel.split(/\s*,\s*/);for(i=0;i<u.data.cust_pixel.length;i++){u.data.cust_pixel[i]=u.data.cust_pixel[i].replace(/^\s*/,"").replace(/\s*$/,"");if(u.data.adv_match===true||u.data.adv_match==="true"){amObj=u.process_AM_data(u.remove_empty(u.data.am));}
if(u.data.disablePushState===true||u.data.disablePushState==="true"){fbq.disablePushState=true;}
fbq("init",u.data.cust_pixel[i],amObj);}
if(u.data.page_view==="true"){if(u.data.generate_event_id==="true"||u.data.generate_event_id===true){event_id=u.generateEventID("PageView",b,lookup_id);window.utag.globals[lookup_id]["fb_event_id_PageView"]=event_id;fbq("track","PageView",u.data.page,{eventID:event_id});}else{fbq("track","PageView",u.data.page);}}}
u.loader_cb();}else{u.queue.push({"data":u.data});if(!u.scriptrequested){u.scriptrequested=true;u.loader_config={"type":"script","src":u.data.base_url,"cb":u.callBack,"loc":"script","id":"utag_3155"};!function(f,b,self,config,e){if(f.fbq)return;self.loader(config);e=f.fbq=function(){e.callMethod?e.callMethod.apply(e,arguments):e.queue.push(arguments);};if(!f._fbq)f._fbq=e;e.push=e;e.loaded=!0;e.version="2.0";e.queue=[];e.agent="tmtealium";}(window,document,this,u.loader_config);if(u.data.disablePushState===true||u.data.disablePushState==="true"){fbq.disablePushState=true;}
if(u.data.cust_pixel){u.data.cust_pixel=u.data.cust_pixel.split(/\s*,\s*/);for(i=0;i<u.data.cust_pixel.length;i++){u.data.cust_pixel[i]=u.data.cust_pixel[i].replace(/^\s*/,"").replace(/\s*$/,"");if(u.data.adv_match===true||u.data.adv_match==="true"){amObj=u.process_AM_data(u.remove_empty(u.data.am));}
fbq("init",u.data.cust_pixel[i],amObj);}
if(u.data.page_view==="true"){if(u.data.generate_event_id==="true"||u.data.generate_event_id===true){event_id=u.generateEventID("PageView",b,lookup_id);window.utag.globals[lookup_id]["fb_event_id_PageView"]=event_id;fbq("track","PageView",u.data.page,{eventID:event_id});}else{fbq("track","PageView",u.data.page);}}}}}
utag.DB("send:3155:COMPLETE");}};utag.o[loader].loader.LOAD(id);}("3155","samsung.main"));}catch(error){utag.DB(error);}
