Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;(function(){var splitter=/\?|&|=/g;window.Bootstrapper=window.Bootstrapper;window.Bootstrapper.getCompareURL=function(src,cache){var _src="";var srcArray=src.split(splitter);var cacheIndex=srcArray.indexOf(cache);srcArray.splice(cacheIndex,++cacheIndex);srcArray.forEach(function(v,i){if(i===0)_src+=v;else if(i===1)_src+="?"+v;else if(i%2===0)_src+="\x3d"+v;else _src+="\x26"+
v});return _src};window.Bootstrapper.insertImage=function(src,cache){var _src=this.getCompareURL(src,cache);var imgTags=document.getElementsByTagName("img");for(var i=0;i<imgTags.length;i++){var $img=imgTags[i];var imgSrc=this.getCompareURL($img.src,cache);if(_src.toLowerCase()===imgSrc.toLowerCase())return}(new Image).src=src};window.Bootstrapper.insertIFrame=function(src,cache){var _src=this.getCompareURL(src,cache);var iFrameTags=document.getElementsByTagName("iframe");for(var i=0;i<iFrameTags.length;i++){var $iframe=
iFrameTags[i];var iframeSrc=this.getCompareURL($iframe.src,cache);if(_src.toLowerCase()===iframeSrc.toLowerCase())return}var iframe=document.createElement("iframe");iframe.src=src;iframe.style.display="none";document.body.appendChild(iframe)}})()},2474334,543157);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.on("click",".home-banner-full-width .slick-active img",function(){Bootstrapper.ensEvent.trigger("Home Page Banner Image Click Event",this)},true)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){if(OneConfigEmbed.config.configId!==undefined||OneConfigEmbed.config.configId!==""){window.dataLayer=window.dataLayer||[];window.dataLayer.push({"event":"Oneconfig"})}else setTimeout(waitForElement,1E3)},transform:function(val){return val?val.toLowerCase():val},load:"page",trigger:Bootstrapper.data.bottomOfBodyTrigger,
dataDefName:"OneConfig_id",collection:"hpmmd object",source:"Manage",priv:"false"},{id:"67402"})},67402)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;(function(){try{function getParamByName(name,url){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]").toLowerCase();var regex=new RegExp("[\\?\x26]"+name+"\x3d([^\x26#]*)"),results=regex.exec(url||location.search.toLowerCase());return results===null?"":decodeURIComponent(results[1].replace(/\+/g," "))}function setCookie(cname,cvalue,exdays,cdomain,cpath){var c=[];var d=
new Date;d.setTime(d.getTime()+exdays*24*60*60*1E3);c.push(cname+"\x3d"+"aff_aoid-!-"+cvalue);c.push("expires\x3d"+d.toUTCString());c.push("domain\x3d"+(cdomain||".hp.com"));c.push("path\x3d"+(cpath||"/"));document.cookie=c.join(";")}var aoid=getParamByName("aoid");if(aoid)setCookie("hpshopping2",aoid,30)}catch(e){}})()},3176149,531050);
Bootstrapper.bindDOMParsed(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;(function(){var _pV=function(){var pv=1;if(sessionStorage.pv){pv=pv+1;sessionStorage.setItem("pv",pv)}else if(!sessionStorage.pv)sessionStorage.setItem("pv",pv);return parseInt(window.sessionStorage.pv)};var sessionStoragePV=_pV();if(sessionStoragePV<2)try{var loadImpactRadius=function(){(function(a,b,c,d,e,f,g){e["ire_o"]=c;e[c]=e[c]||function(){(e[c].a=e[c].a||[]).push(arguments)};
f=d.createElement(b);g=d.getElementsByTagName(b)[0];f.async=1;f.src=a;g.parentNode.insertBefore(f,g);console.log("Impact Radius API injected")})("//d.impactradius-event.com/A353853-8e85-4786-9645-fac6b773cd071.js","script","ire",document,window)};if(!window.dataLayer)dataLayer=[];dataLayer.push({event:"pb.onOptIn",callback:loadImpactRadius,type:3})}catch(err){console.log("Impact Radius API injection err:",err.message)}})()},3835766,529048);