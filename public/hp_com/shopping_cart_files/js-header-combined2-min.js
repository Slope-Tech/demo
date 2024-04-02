/*! @license DOMPurify 3.0.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.6/LICENSE */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).DOMPurify=t()}(this,(function(){"use strict";const{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:o,getOwnPropertyDescriptor:r}=Object;let{freeze:i,seal:a,create:l}=Object,{apply:c,construct:s}="undefined"!=typeof Reflect&&Reflect;i||(i=function(e){return e}),a||(a=function(e){return e}),c||(c=function(e,t,n){return e.apply(t,n)}),s||(s=function(e,t){return new e(...t)});const u=b(Array.prototype.forEach),m=b(Array.prototype.pop),f=b(Array.prototype.push),p=b(String.prototype.toLowerCase),d=b(String.prototype.toString),h=b(String.prototype.match),g=b(String.prototype.replace),T=b(String.prototype.indexOf),y=b(String.prototype.trim),E=b(RegExp.prototype.test),A=(_=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return s(_,t)});var _;function b(e){return function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return c(e,t,o)}}function N(e,o){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:p;t&&t(e,null);let i=o.length;for(;i--;){let t=o[i];if("string"==typeof t){const e=r(t);e!==t&&(n(o)||(o[i]=e),t=e)}e[t]=!0}return e}function S(e){for(let t=0;t<e.length;t++)void 0===r(e,t)&&(e[t]=null);return e}function R(t){const n=l(null);for(const[o,i]of e(t))void 0!==r(t,o)&&(Array.isArray(i)?n[o]=S(i):"object"==typeof i&&i.constructor===Object?n[o]=R(i):n[o]=i);return n}function w(e,t){for(;null!==e;){const n=r(e,t);if(n){if(n.get)return b(n.get);if("function"==typeof n.value)return b(n.value)}e=o(e)}return function(e){return console.warn("fallback value for",e),null}}const D=i(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),L=i(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),v=i(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),x=i(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),k=i(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),C=i(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),O=i(["#text"]),I=i(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),M=i(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),U=i(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),P=i(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),F=a(/\{\{[\w\W]*|[\w\W]*\}\}/gm),H=a(/<%[\w\W]*|[\w\W]*%>/gm),z=a(/\${[\w\W]*}/gm),B=a(/^data-[\-\w.\u00B7-\uFFFF]/),W=a(/^aria-[\-\w]+$/),G=a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Y=a(/^(?:\w+script|data):/i),j=a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),q=a(/^html$/i);var X=Object.freeze({__proto__:null,MUSTACHE_EXPR:F,ERB_EXPR:H,TMPLIT_EXPR:z,DATA_ATTR:B,ARIA_ATTR:W,IS_ALLOWED_URI:G,IS_SCRIPT_OR_DATA:Y,ATTR_WHITESPACE:j,DOCTYPE_NAME:q});const K=function(){return"undefined"==typeof window?null:window},V=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(n=t.getAttribute(o));const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}};var $=function t(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K();const o=e=>t(e);if(o.version="3.0.6",o.removed=[],!n||!n.document||9!==n.document.nodeType)return o.isSupported=!1,o;let{document:r}=n;const a=r,c=a.currentScript,{DocumentFragment:s,HTMLTemplateElement:_,Node:b,Element:S,NodeFilter:F,NamedNodeMap:H=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:z,DOMParser:B,trustedTypes:W}=n,Y=S.prototype,j=w(Y,"cloneNode"),$=w(Y,"nextSibling"),Z=w(Y,"childNodes"),J=w(Y,"parentNode");if("function"==typeof _){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let Q,ee="";const{implementation:te,createNodeIterator:ne,createDocumentFragment:oe,getElementsByTagName:re}=r,{importNode:ie}=a;let ae={};o.isSupported="function"==typeof e&&"function"==typeof J&&te&&void 0!==te.createHTMLDocument;const{MUSTACHE_EXPR:le,ERB_EXPR:ce,TMPLIT_EXPR:se,DATA_ATTR:ue,ARIA_ATTR:me,IS_SCRIPT_OR_DATA:fe,ATTR_WHITESPACE:pe}=X;let{IS_ALLOWED_URI:de}=X,he=null;const ge=N({},[...D,...L,...v,...k,...O]);let Te=null;const ye=N({},[...I,...M,...U,...P]);let Ee=Object.seal(l(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ae=null,_e=null,be=!0,Ne=!0,Se=!1,Re=!0,we=!1,De=!1,Le=!1,ve=!1,xe=!1,ke=!1,Ce=!1,Oe=!0,Ie=!1;const Me="user-content-";let Ue=!0,Pe=!1,Fe={},He=null;const ze=N({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Be=null;const We=N({},["audio","video","img","source","image","track"]);let Ge=null;const Ye=N({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),je="http://www.w3.org/1998/Math/MathML",qe="http://www.w3.org/2000/svg",Xe="http://www.w3.org/1999/xhtml";let Ke=Xe,Ve=!1,$e=null;const Ze=N({},[je,qe,Xe],d);let Je=null;const Qe=["application/xhtml+xml","text/html"],et="text/html";let tt=null,nt=null;const ot=r.createElement("form"),rt=function(e){return e instanceof RegExp||e instanceof Function},it=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!nt||nt!==e){if(e&&"object"==typeof e||(e={}),e=R(e),Je=-1===Qe.indexOf(e.PARSER_MEDIA_TYPE)?et:e.PARSER_MEDIA_TYPE,tt="application/xhtml+xml"===Je?d:p,he="ALLOWED_TAGS"in e?N({},e.ALLOWED_TAGS,tt):ge,Te="ALLOWED_ATTR"in e?N({},e.ALLOWED_ATTR,tt):ye,$e="ALLOWED_NAMESPACES"in e?N({},e.ALLOWED_NAMESPACES,d):Ze,Ge="ADD_URI_SAFE_ATTR"in e?N(R(Ye),e.ADD_URI_SAFE_ATTR,tt):Ye,Be="ADD_DATA_URI_TAGS"in e?N(R(We),e.ADD_DATA_URI_TAGS,tt):We,He="FORBID_CONTENTS"in e?N({},e.FORBID_CONTENTS,tt):ze,Ae="FORBID_TAGS"in e?N({},e.FORBID_TAGS,tt):{},_e="FORBID_ATTR"in e?N({},e.FORBID_ATTR,tt):{},Fe="USE_PROFILES"in e&&e.USE_PROFILES,be=!1!==e.ALLOW_ARIA_ATTR,Ne=!1!==e.ALLOW_DATA_ATTR,Se=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Re=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,we=e.SAFE_FOR_TEMPLATES||!1,De=e.WHOLE_DOCUMENT||!1,xe=e.RETURN_DOM||!1,ke=e.RETURN_DOM_FRAGMENT||!1,Ce=e.RETURN_TRUSTED_TYPE||!1,ve=e.FORCE_BODY||!1,Oe=!1!==e.SANITIZE_DOM,Ie=e.SANITIZE_NAMED_PROPS||!1,Ue=!1!==e.KEEP_CONTENT,Pe=e.IN_PLACE||!1,de=e.ALLOWED_URI_REGEXP||G,Ke=e.NAMESPACE||Xe,Ee=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&rt(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Ee.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&rt(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Ee.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Ee.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),we&&(Ne=!1),ke&&(xe=!0),Fe&&(he=N({},O),Te=[],!0===Fe.html&&(N(he,D),N(Te,I)),!0===Fe.svg&&(N(he,L),N(Te,M),N(Te,P)),!0===Fe.svgFilters&&(N(he,v),N(Te,M),N(Te,P)),!0===Fe.mathMl&&(N(he,k),N(Te,U),N(Te,P))),e.ADD_TAGS&&(he===ge&&(he=R(he)),N(he,e.ADD_TAGS,tt)),e.ADD_ATTR&&(Te===ye&&(Te=R(Te)),N(Te,e.ADD_ATTR,tt)),e.ADD_URI_SAFE_ATTR&&N(Ge,e.ADD_URI_SAFE_ATTR,tt),e.FORBID_CONTENTS&&(He===ze&&(He=R(He)),N(He,e.FORBID_CONTENTS,tt)),Ue&&(he["#text"]=!0),De&&N(he,["html","head","body"]),he.table&&(N(he,["tbody"]),delete Ae.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw A('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw A('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');Q=e.TRUSTED_TYPES_POLICY,ee=Q.createHTML("")}else void 0===Q&&(Q=V(W,c)),null!==Q&&"string"==typeof ee&&(ee=Q.createHTML(""));i&&i(e),nt=e}},at=N({},["mi","mo","mn","ms","mtext"]),lt=N({},["foreignobject","desc","title","annotation-xml"]),ct=N({},["title","style","font","a","script"]),st=N({},[...L,...v,...x]),ut=N({},[...k,...C]),mt=function(e){let t=J(e);t&&t.tagName||(t={namespaceURI:Ke,tagName:"template"});const n=p(e.tagName),o=p(t.tagName);return!!$e[e.namespaceURI]&&(e.namespaceURI===qe?t.namespaceURI===Xe?"svg"===n:t.namespaceURI===je?"svg"===n&&("annotation-xml"===o||at[o]):Boolean(st[n]):e.namespaceURI===je?t.namespaceURI===Xe?"math"===n:t.namespaceURI===qe?"math"===n&&lt[o]:Boolean(ut[n]):e.namespaceURI===Xe?!(t.namespaceURI===qe&&!lt[o])&&(!(t.namespaceURI===je&&!at[o])&&(!ut[n]&&(ct[n]||!st[n]))):!("application/xhtml+xml"!==Je||!$e[e.namespaceURI]))},ft=function(e){f(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}},pt=function(e,t){try{f(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){f(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!Te[e])if(xe||ke)try{ft(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},dt=function(e){let t=null,n=null;if(ve)e="<remove></remove>"+e;else{const t=h(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===Je&&Ke===Xe&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const o=Q?Q.createHTML(e):e;if(Ke===Xe)try{t=(new B).parseFromString(o,Je)}catch(e){}if(!t||!t.documentElement){t=te.createDocument(Ke,"template",null);try{t.documentElement.innerHTML=Ve?ee:o}catch(e){}}const i=t.body||t.documentElement;return e&&n&&i.insertBefore(r.createTextNode(n),i.childNodes[0]||null),Ke===Xe?re.call(t,De?"html":"body")[0]:De?t.documentElement:i},ht=function(e){return ne.call(e.ownerDocument||e,e,F.SHOW_ELEMENT|F.SHOW_COMMENT|F.SHOW_TEXT,null)},gt=function(e){return e instanceof z&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof H)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},Tt=function(e){return"function"==typeof b&&e instanceof b},yt=function(e,t,n){ae[e]&&u(ae[e],(e=>{e.call(o,t,n,nt)}))},Et=function(e){let t=null;if(yt("beforeSanitizeElements",e,null),gt(e))return ft(e),!0;const n=tt(e.nodeName);if(yt("uponSanitizeElement",e,{tagName:n,allowedTags:he}),e.hasChildNodes()&&!Tt(e.firstElementChild)&&E(/<[/\w]/g,e.innerHTML)&&E(/<[/\w]/g,e.textContent))return ft(e),!0;if(!he[n]||Ae[n]){if(!Ae[n]&&_t(n)){if(Ee.tagNameCheck instanceof RegExp&&E(Ee.tagNameCheck,n))return!1;if(Ee.tagNameCheck instanceof Function&&Ee.tagNameCheck(n))return!1}if(Ue&&!He[n]){const t=J(e)||e.parentNode,n=Z(e)||e.childNodes;if(n&&t){for(let o=n.length-1;o>=0;--o)t.insertBefore(j(n[o],!0),$(e))}}return ft(e),!0}return e instanceof S&&!mt(e)?(ft(e),!0):"noscript"!==n&&"noembed"!==n&&"noframes"!==n||!E(/<\/no(script|embed|frames)/i,e.innerHTML)?(we&&3===e.nodeType&&(t=e.textContent,u([le,ce,se],(e=>{t=g(t,e," ")})),e.textContent!==t&&(f(o.removed,{element:e.cloneNode()}),e.textContent=t)),yt("afterSanitizeElements",e,null),!1):(ft(e),!0)},At=function(e,t,n){if(Oe&&("id"===t||"name"===t)&&(n in r||n in ot))return!1;if(Ne&&!_e[t]&&E(ue,t));else if(be&&E(me,t));else if(!Te[t]||_e[t]){if(!(_t(e)&&(Ee.tagNameCheck instanceof RegExp&&E(Ee.tagNameCheck,e)||Ee.tagNameCheck instanceof Function&&Ee.tagNameCheck(e))&&(Ee.attributeNameCheck instanceof RegExp&&E(Ee.attributeNameCheck,t)||Ee.attributeNameCheck instanceof Function&&Ee.attributeNameCheck(t))||"is"===t&&Ee.allowCustomizedBuiltInElements&&(Ee.tagNameCheck instanceof RegExp&&E(Ee.tagNameCheck,n)||Ee.tagNameCheck instanceof Function&&Ee.tagNameCheck(n))))return!1}else if(Ge[t]);else if(E(de,g(n,pe,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==T(n,"data:")||!Be[e]){if(Se&&!E(fe,g(n,pe,"")));else if(n)return!1}else;return!0},_t=function(e){return e.indexOf("-")>0},bt=function(e){yt("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Te};let r=t.length;for(;r--;){const i=t[r],{name:a,namespaceURI:l,value:c}=i,s=tt(a);let f="value"===a?c:y(c);if(n.attrName=s,n.attrValue=f,n.keepAttr=!0,n.forceKeepAttr=void 0,yt("uponSanitizeAttribute",e,n),f=n.attrValue,n.forceKeepAttr)continue;if(pt(a,e),!n.keepAttr)continue;if(!Re&&E(/\/>/i,f)){pt(a,e);continue}we&&u([le,ce,se],(e=>{f=g(f,e," ")}));const p=tt(e.nodeName);if(At(p,s,f)){if(!Ie||"id"!==s&&"name"!==s||(pt(a,e),f=Me+f),Q&&"object"==typeof W&&"function"==typeof W.getAttributeType)if(l);else switch(W.getAttributeType(p,s)){case"TrustedHTML":f=Q.createHTML(f);break;case"TrustedScriptURL":f=Q.createScriptURL(f)}try{l?e.setAttributeNS(l,a,f):e.setAttribute(a,f),m(o.removed)}catch(e){}}}yt("afterSanitizeAttributes",e,null)},Nt=function e(t){let n=null;const o=ht(t);for(yt("beforeSanitizeShadowDOM",t,null);n=o.nextNode();)yt("uponSanitizeShadowNode",n,null),Et(n)||(n.content instanceof s&&e(n.content),bt(n));yt("afterSanitizeShadowDOM",t,null)};return o.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null,r=null,i=null,l=null;if(Ve=!e,Ve&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Tt(e)){if("function"!=typeof e.toString)throw A("toString is not a function");if("string"!=typeof(e=e.toString()))throw A("dirty is not a string, aborting")}if(!o.isSupported)return e;if(Le||it(t),o.removed=[],"string"==typeof e&&(Pe=!1),Pe){if(e.nodeName){const t=tt(e.nodeName);if(!he[t]||Ae[t])throw A("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof b)n=dt("\x3c!----\x3e"),r=n.ownerDocument.importNode(e,!0),1===r.nodeType&&"BODY"===r.nodeName||"HTML"===r.nodeName?n=r:n.appendChild(r);else{if(!xe&&!we&&!De&&-1===e.indexOf("<"))return Q&&Ce?Q.createHTML(e):e;if(n=dt(e),!n)return xe?null:Ce?ee:""}n&&ve&&ft(n.firstChild);const c=ht(Pe?e:n);for(;i=c.nextNode();)Et(i)||(i.content instanceof s&&Nt(i.content),bt(i));if(Pe)return e;if(xe){if(ke)for(l=oe.call(n.ownerDocument);n.firstChild;)l.appendChild(n.firstChild);else l=n;return(Te.shadowroot||Te.shadowrootmode)&&(l=ie.call(a,l,!0)),l}let m=De?n.outerHTML:n.innerHTML;return De&&he["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&E(q,n.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+m),we&&u([le,ce,se],(e=>{m=g(m,e," ")})),Q&&Ce?Q.createHTML(m):m},o.setConfig=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};it(e),Le=!0},o.clearConfig=function(){nt=null,Le=!1},o.isValidAttribute=function(e,t,n){nt||it({});const o=tt(e),r=tt(t);return At(o,r,n)},o.addHook=function(e,t){"function"==typeof t&&(ae[e]=ae[e]||[],f(ae[e],t))},o.removeHook=function(e){if(ae[e])return m(ae[e])},o.removeHooks=function(e){ae[e]&&(ae[e]=[])},o.removeAllHooks=function(){ae={}},o}();return $}));
//# sourceMappingURL=purify.min.js.map
// JavaScript Document

/*! Picturefill - v2.2.0-beta - 2014-11-19
* http://scottjehl.github.io/picturefill
* Copyright (c) 2014 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),function(a,b,c){"use strict";function d(a){var b,c,d,e,g,h=a||{};b=h.elements||f.getAllElements();for(var i=0,j=b.length;j>i;i++)if(c=b[i],d=c.parentNode,e=void 0,g=void 0,"IMG"===c.nodeName.toUpperCase()&&(c[f.ns]||(c[f.ns]={}),h.reevaluate||!c[f.ns].evaluated)){if("PICTURE"===d.nodeName.toUpperCase()){if(f.removeVideoShim(d),e=f.getMatch(c,d),e===!1)continue}else e=void 0;("PICTURE"===d.nodeName.toUpperCase()||c.srcset&&!f.srcsetSupported||!f.sizesSupported&&c.srcset&&c.srcset.indexOf("w")>-1)&&f.dodgeSrcset(c),e?(g=f.processSourceSet(e),f.applyBestCandidate(g,c)):(g=f.processSourceSet(c),(void 0===c.srcset||c[f.ns].srcset)&&f.applyBestCandidate(g,c)),c[f.ns].evaluated=!0}}function e(){function c(){var b;a._picturefillWorking||(a._picturefillWorking=!0,a.clearTimeout(b),b=a.setTimeout(function(){d({reevaluate:!0}),a._picturefillWorking=!1},60))}d();var e=setInterval(function(){return d(),/^loaded|^i|^c/.test(b.readyState)?void clearInterval(e):void 0},250);a.addEventListener?a.addEventListener("resize",c,!1):a.attachEvent&&a.attachEvent("onresize",c)}if(a.HTMLPictureElement)return void(a.picturefill=function(){});b.createElement("picture");var f={};f.ns="picturefill",function(){f.srcsetSupported="srcset"in c,f.sizesSupported="sizes"in c}(),f.trim=function(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")},f.endsWith=function(a,b){return a.endsWith?a.endsWith(b):-1!==a.indexOf(b,a.length-b.length)},f.restrictsMixedContent=function(){return"https:"===a.location.protocol},f.matchesMedia=function(b){return a.matchMedia&&a.matchMedia(b).matches},f.getDpr=function(){return a.devicePixelRatio||1},f.getWidthFromLength=function(a){a=a&&a.indexOf("%")>-1==!1&&(parseFloat(a)>0||a.indexOf("calc(")>-1)?a:"100vw",a=a.replace("vw","%"),f.lengthEl||(f.lengthEl=b.createElement("div"),f.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden"),f.lengthEl.style.width=a,b.body.appendChild(f.lengthEl),f.lengthEl.className="helper-from-picturefill-js",f.lengthEl.offsetWidth<=0&&(f.lengthEl.style.width=b.documentElement.offsetWidth+"px");var c=f.lengthEl.offsetWidth;return b.body.removeChild(f.lengthEl),c},f.types={},f.types["image/jpeg"]=!0,f.types["image/gif"]=!0,f.types["image/png"]=!0,f.types["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),f.types["image/webp"]=function(){var a="image/webp";c.onerror=function(){f.types[a]=!1,d()},c.onload=function(){f.types[a]=1===c.width,d()},c.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="},f.verifyTypeSupport=function(a){var b=a.getAttribute("type");return null===b||""===b?!0:"function"==typeof f.types[b]?(f.types[b](),"pending"):f.types[b]},f.parseSize=function(a){var b=/(\([^)]+\))?\s*(.+)/g.exec(a);return{media:b&&b[1],length:b&&b[2]}},f.findWidthFromSourceSize=function(a){for(var b,c=f.trim(a).split(/\s*,\s*/),d=0,e=c.length;e>d;d++){var g=c[d],h=f.parseSize(g),i=h.length,j=h.media;if(i&&(!j||f.matchesMedia(j))){b=i;break}}return f.getWidthFromLength(b)},f.parseSrcset=function(a){for(var b=[];""!==a;){a=a.replace(/^\s+/g,"");var c,d=a.search(/\s/g),e=null;if(-1!==d){c=a.slice(0,d);var f=c.slice(-1);if((","===f||""===c)&&(c=c.replace(/,+$/,""),e=""),a=a.slice(d+1),null===e){var g=a.indexOf(",");-1!==g?(e=a.slice(0,g),a=a.slice(g+1)):(e=a,a="")}}else c=a,a="";(c||e)&&b.push({url:c,descriptor:e})}return b},f.parseDescriptor=function(a,b){var c,d=b||"100vw",e=a&&a.replace(/(^\s+|\s+$)/g,""),g=f.findWidthFromSourceSize(d);if(e)for(var h=e.split(" "),i=h.length-1;i>=0;i--){var j=h[i],k=j&&j.slice(j.length-1);if("h"!==k&&"w"!==k||f.sizesSupported){if("x"===k){var l=j&&parseFloat(j,10);c=l&&!isNaN(l)?l:1}}else c=parseFloat(parseInt(j,10)/g)}return c||1},f.getCandidatesFromSourceSet=function(a,b){for(var c=f.parseSrcset(a),d=[],e=0,g=c.length;g>e;e++){var h=c[e];d.push({url:h.url,resolution:f.parseDescriptor(h.descriptor,b)})}return d},f.dodgeSrcset=function(a){a.srcset&&(a[f.ns].srcset=a.srcset,a.removeAttribute("srcset"))},f.processSourceSet=function(a){var b=a.getAttribute("srcset"),c=a.getAttribute("sizes"),d=[];return"IMG"===a.nodeName.toUpperCase()&&a[f.ns]&&a[f.ns].srcset&&(b=a[f.ns].srcset),b&&(d=f.getCandidatesFromSourceSet(b,c)),d},f.applyBestCandidate=function(a,b){var c,d,e;a.sort(f.ascendingSort),d=a.length,e=a[d-1];for(var g=0;d>g;g++)if(c=a[g],c.resolution>=f.getDpr()){e=c;break}if(e&&!f.endsWith(b.src,e.url))if(f.restrictsMixedContent()&&"http:"===e.url.substr(0,"http:".length).toLowerCase())void 0!==typeof console&&console.warn("Blocked mixed content image "+e.url);else{b.src=e.url,b.currentSrc=b.src;var h=b.style||{},i="webkitBackfaceVisibility"in h,j=h.zoom;i&&(h.zoom=".999",i=b.offsetWidth,h.zoom=j)}},f.ascendingSort=function(a,b){return a.resolution-b.resolution},f.removeVideoShim=function(a){var b=a.getElementsByTagName("video");if(b.length){for(var c=b[0],d=c.getElementsByTagName("source");d.length;)a.insertBefore(d[0],c);c.parentNode.removeChild(c)}},f.getAllElements=function(){for(var a=[],c=b.getElementsByTagName("img"),d=0,e=c.length;e>d;d++){var g=c[d];("PICTURE"===g.parentNode.nodeName.toUpperCase()||null!==g.getAttribute("srcset")||g[f.ns]&&null!==g[f.ns].srcset)&&a.push(g)}return a},f.getMatch=function(a,b){for(var c,d=b.childNodes,e=0,g=d.length;g>e;e++){var h=d[e];if(1===h.nodeType){if(h===a)return c;if("SOURCE"===h.nodeName.toUpperCase()){null!==h.getAttribute("src")&&void 0!==typeof console&&console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");var i=h.getAttribute("media");if(h.getAttribute("srcset")&&(!i||f.matchesMedia(i))){var j=f.verifyTypeSupport(h);if(j===!0){c=h;break}if("pending"===j)return!1}}}}return c},e(),d._=f,"object"==typeof module&&"object"==typeof module.exports?module.exports=d:"function"==typeof define&&define.amd?define(function(){return d}):"object"==typeof a&&(a.picturefill=d)}(this,this.document,new this.Image);jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");    
    this.css("z-index","10000");
    this.css("display","block");
    return this;
}

function getDefaultStoreParams (){
	return {
		storeId : '10151',
		langId : '-1',
		catalogId : '10051',
		ccf : 'false'
	}
}

function getFormParams (formId, filterCallBack) {
	var formSelector = 'form#' + formId;
	if ($(formSelector).length <= 0) {
		formSelector = 'form[name=' + formId + ']';
	}
	
	if( $(formSelector).length > 0 ) {
		var inputArrays = $(formSelector).serializeArray();
		
		var formParamsMap = {};
		$.each(inputArrays,function(index, param){
			
			if( filterCallBack ) {
				if( filterCallBack(param) ) {
					formParamsMap[param.name] = param.value;
				}
			} else {
				formParamsMap[param.name] = param.value;
			}
		});
		
		return formParamsMap;
	} else {
		return {};
	}
}

function invokeAJAX (targetUrl, method, data, successCallback, errorCallback, checkCommandException){
  var request = $.ajax({
    url: targetUrl,
    method: method,
    data: data
  });

  if(!checkCommandException){
	  request.done(successCallback);	  
  } else {
	  request.done(function(data, textStatus, jqXHR){
			var responseStr = data.replace('/*','').replace('*/','').trim();
			var commandResponse = JSON.parse(responseStr); 	
			
			// console.log("check for command Exception : ",JSON.stringify(arguments));
			if( commandResponse && (commandResponse.errorMessage || commandResponse.errorMessageKey) ) {
				errorCallback.call(this, arguments[2], commandResponse.errorMessageKey, commandResponse.errorMessage);
			} else {
				successCallback.apply(this, arguments); 
			}	
	  });
  }
  request.fail(errorCallback);
}

function invokeAJAXAsync(targetUrl, method, data){
			  var response = $.ajax({
				url: targetUrl,
				method: method,
				data: data,
				async:false
			  }).responseText;
			  return response;
}

function invokeAJAXAsyncTrue(targetUrl, method, data){
	  var response = $.ajax({
		url: targetUrl,
		method: method,
		data: data,
		async:true
	  }).responseText;
	  return response;
}

function getCartCommandURLs (){
  if( typeof(getAbsoluteURL) == 'function') {
    return {
      refreshCartItemsUrl : getAbsoluteURL() + 'RefreshCart',
      orderSummaryUrl : getAbsoluteURL() + 'CartSummaryView',
      updateCartItemUrl : getAbsoluteURL() + 'AjaxOrderChangeServiceItemUpdate',
      removeCartItemUrl : getAbsoluteURL() + 'AjaxOrderChangeServiceItemDelete',
      updateFreeGiftSelectionsUrl : getAbsoluteURL() + 'AjaxOrderChangeServiceRewardOptionUpdate',
      updateGiftCardTableUrl : getAbsoluteURL() + 'GiftCardUpdateCmd',
      appyCouponCodeUrl : getAbsoluteURL() + 'AjaxPromotionCodeManage',
      couponCodeMessageUrl : getAbsoluteURL() + 'PromotionMessageCmd',
      ctoValidationUrl : getAbsoluteURL() + 'ValidateConfigurationCmd',
      updatePromotionDistributionUrl : getAbsoluteURL() + 'FDPromotionCmd',
      paypalRedirectUrl : getAbsoluteURL() + 'AjaxSetExpressCheckout',
      availableShippingMethodsUrl : getAbsoluteURL() + 'AjaxOrderShipMethods',
      updateShippingMethodUrl : getAbsoluteURL() + 'AjaxOrderShipMethodUpdate',
      updateRewardUrl : getAbsoluteURL() + 'AjaxOrderChangeServiceRewardOptionUpdate',
      checkoutPageUrl : getAbsoluteURL() + 'OrderShippingBillingView',
      paypalExpressURL : getAbsoluteURL()+ 'PayPalSetExpressCheckout',
      refreshCartItemsOldUrl : getAbsoluteURL() + 'RefreshOldCart',
      updateUnavailabilityStatusUrl : getAbsoluteURL() +"AjaxCatentryUnavailability",
      orderSummaryUrl : getAbsoluteURL() + 'OrderSummaryCmd',
      logonUrl: getAbsoluteURL() + 'CheckHPIDRedirection',
      loyaltyCouponEligibilityUrl : getAbsoluteURL() + 'HPLoyaltyCouponEligibilityCheckCmd',
      hpMyAccountLandingMPRUrl : getAbsoluteURL() + 'HPMyAccountLandingMPRCmd',
      shipEstimateUrl: getAbsoluteURL() + 'AjaxOrderShipEstimate',
      orderCalculateUrl: getAbsoluteURL() + 'OrderCalculate', 
      loyaltyRewardsApplyUrl: getAbsoluteURL() + 'AjaxLoyaltyRewardsApply',
      loyaltyRewardsRemoveUrl: getAbsoluteURL() + 'AjaxLoyaltyRewardsRemove',
	  shareCartUrl: getAbsoluteURL() + 'StoreShareCartDataCmd',
	  carePackObligationServiceUrl: getAbsoluteURL() + 'CarePackObligationServiceCmd',
	  carePackUpdateECPDataExtnCmd: getAbsoluteURL() + 'CarePackUpdateECPDataExtnCmd',
	  carePackAddToCart: getAbsoluteURL() + 'AddToCartAjax'
    }
  } else {
    return {};
  }
}

function getCheckoutCommandURLs (){
	  if( typeof(getAbsoluteURL) == 'function') {
	    return {    		
    		AddressDoctorUrl : getAbsoluteURL() + 'AddressDoctorValidateCmd',
    		refreshCartItemsUrl : getAbsoluteURL() + 'RefreshCheckoutCart',
    		//udstart
	        reCalculateSubsidyUrl : getAbsoluteURL() + 'saveSubsidy',
	        //udend
    		updateCartItemUrl : getAbsoluteURL() + 'AjaxOrderChangeServiceItemUpdate',
    		removeCartItemUrl : getAbsoluteURL() + 'AjaxOrderChangeServiceItemDelete',
    		updateShippingMethodUrl : getAbsoluteURL() + 'AjaxOrderShipMethodUpdate',
    		appyCouponCodeUrl : getAbsoluteURL() + 'AjaxPromotionCodeManage',
    		OrderShipInfoUpdateURL : getAbsoluteURL() + 'AjaxOrderShipInfoUpdate',
    		LeaseOrderTaxUpdateURL : getAbsoluteURL() + 'AjaxCalculateLeaseOrderTax',
    		GetSelectedShippingAddressURL : getAbsoluteURL() +  'GetSelectedShippingAddress',    		
    		refreshCheckoutItemsUrl : getAbsoluteURL() + 'CartSummaryView',
    		shippingPaypalRedirectURL : getAbsoluteURL() + 'AjaxPaypalInvoke',
    		submitOrderCommentURL : getAbsoluteURL() + 'ccAjaxSubmitOrderComments',
    		billingInfoUpdateUrl : getAbsoluteURL() + 'AjaxOrderBillInfoUpdate',
    		getBMLPromotionsUrl : getAbsoluteURL() + 'getBMLPromotions',
    		creditCardPaymentUpdateUrl : getAbsoluteURL() + 'AjaxCCPaymentAdd',
    		addGiftCardPaymentUrl : getAbsoluteURL() + 'AjaxGCPaymentAdd',
    		removeGiftCardPaymentUrl : getAbsoluteURL() + 'AjaxGCPaymentRemove',
    		bmlHPPPrefferedSubmitUrl : getAbsoluteURL() + 'AjaxBMLInvoke',
       		paypalSubmitUrl : getAbsoluteURL() + 'AjaxPaypalInvoke',       	 
    		createQuoteUrl : getAbsoluteURL() + 'AjaxQuoteCreate',
    		sendQuoteToTibcoUrl : getAbsoluteURL() + 'SendQuoteToTibco',
    		addPurchaseOrderPaymentUrl : getAbsoluteURL() + 'AjaxPOPaymentAdd',
    		callCenterPaypalOrderSubmitUrl : getAbsoluteURL() + 'CCPaypalOrderConfirm',
    		/* old commmands */
    		orderSummaryUrl : getAbsoluteURL() + 'OrderSummaryCmd',
    		applyGiftCardUrl : getAbsoluteURL() + 'GCApplyCmd',
    		removeGiftCardUrl : getAbsoluteURL() + 'GCRemoveCmd',
    		submitCreditCardBilling : getAbsoluteURL() + 'HPAddressAdd',
    		submitPaypalURL : getAbsoluteURL()+ 'PayPalSetExpressCheckout',
    		submitbmlHPPPrefferedURL : getAbsoluteURL() + 'BMLHpprefSetCall',
    		creditCardPaymentProcessingUrl : getAbsoluteURL() + 'PHCPollerCmd',
    		subsOrdPayUpdateUrl : getAbsoluteURL() + 'SubsOrderPayUpdateCmd',
    		orderSubmitUrl : getAbsoluteURL() + 'OrderSubmitServiceCmd',
    		newsletterSubscriptionUrl : getAbsoluteURL() + 'HPManageSubscriptionCmd',
    		saveOrderCommentsUrl : getAbsoluteURL() + 'ccAjaxSubmitOrderComments',
    		checkGiftCardBalanceUrl : getAbsoluteURL() + 'GCBalanceCmd',
            carePackValidationUrl : getAbsoluteURL() + 'AjaxCarePackvalidation',
	        deleteCarePackUrl : getAbsoluteURL() + 'AjaxDeleteCarePack',
	        makeDefaultSavedCardURL : getAbsoluteURL() + 'AjaxSetDefaultCard',
	        deleteSavedCardURL : getAbsoluteURL() + 'AjaxRemoveCard',
	        userRegFromCheckout : getAbsoluteURL() + 'CustomUserRegistrationAdd',
	        logonUrl: getAbsoluteURL() + 'ProcessLogon',
			ctoValidationUrl : getAbsoluteURL() + 'ValidateConfigurationCmd',
			loyaltyCouponEligibilityUrl : getAbsoluteURL() + 'HPLoyaltyCouponEligibilityCheckCmd',
			preOrderRemoveUrl: getAbsoluteURL() + 'AjaxPreOrderRemove',
			hpidLogonUrl: getAbsoluteURL() + 'CheckHPIDRedirection'
	    }
	  } else {
	    return {};
	  }
	}

function getCallCenterUrls() {
	if (getAbsoluteURL && typeof (getAbsoluteURL) == 'function') {
		return {
			orderLockHelperURL: getAbsoluteURL() + 'ccAjaxOrderLockHelper',
			manageLVOFlagURL: getAbsoluteURL() + 'ccAjaxManageLVOFlag',
			emailQuoteURL: getAbsoluteURL() + 'emailQuote',
			csrDiscountUrl : getAbsoluteURL() + 'AjaxCSRDiscountCmd',
			csrDiscApporveUrl : getAbsoluteURL() + 'AjaxCSRDiscApproveCmd',
			manageOrderLockURL : getAbsoluteURL() + 'ccAjaxManageOrderLock'
		}
	} else {
		return {};
	}
}

function toggleConfig(ID,display)
{ 
	if(display=='show') { 
		$("#configShow_"+ID).hide(); 
		$("#configMainDIV_"+ID).show(); 
	} else {
		$("#configMainDIV_"+ID).hide(); 
		$("#configShow_"+ID).show();
	}
}

function onMouseToolTip(OrderItemId, display) {
	if(display=='show'){
		$("#tooltipshover" + OrderItemId).show(); 
	}else{
		$("#tooltipshover" + OrderItemId).hide(); 
	}
}

function moveToNext(current, nextFieldID) {
	if (current.value.length >= current.maxLength) {
		$('#'+nextFieldID).focus();
	}
}

function focusNext(currentFieldID, nextFieldID) {
	if (currentFieldID.value != '') {
		$('#'+ nextFieldID).focus();
	}
}

function initFormRules(){
	
	if( jQuery && jQuery.validator && jQuery.validator.addMethod ) {		
		jQuery.validator.addMethod("formName", function(value, element) {
			return this.optional(element) || /^[A-Za-z-.'_, -]+$/i.test(value);
		},"Please enter valid name");
	
		jQuery.validator.addMethod("nickName", function(value, element) {
			return this.optional(element) || /^[A-Za-z0-9.-_']+$/i.test(value);
		},"Please enter valid name");
	
		jQuery.validator.addMethod("companyName", function(value, element) {
			if( $("#businesspurchasecheckbox:checked").length <= 0 ){
				return true;
			}
			return this.optional(element) || value.trim().length > 0 || /^[A-Za-z0-9\/\-_+<>?:' .,;~`!@#$%^&*()]+$/i.test(value) ;
		},"Please enter valid company name");
	
		jQuery.validator.addMethod("poAddress", function(value, element) {
				if (value.match(/pobox/gi) || 
						value.match(/p-o-b-o-x/gi) || 
						value.match(/po box/gi) || 
						value.match(/p o box/gi) || 
						value.match(/p\.o/gi) || value.match(/p,o/gi) || 
						value.match(/p o(?=\.|\,|\d|\s\d|\-)/gi) || 
						value.match(/po(?=\.|\,|\d|\s\d|\-)/gi) || 
						value.match(/box(?=\.|\,|\d|\s\d|\-)/gi) || 
						value.match(/pob(?=\.|\,|\d|\s\d|\-)/gi) || 
						value.match(/p\.0/gi) || 
						value.match(/p,0/gi) || 
						value.match(/p0(?=\.|\,|\d|\s\d|\-)/gi) || 
						value.match(/p 0(?=\.|\,|\d|\s\d|\-)/gi) )
					return false;	
			return this.optional(element) || /^[A-Za-z0-9-\()\-\,\.\\ ]+$/i.test(value);
		},"We currently don't ship to P.O. Box addresses. Please use a residential or business address.");
		
		jQuery.validator.addMethod("formAddress", function(value, element) {
			return this.optional(element) || /^[A-Za-z0-9-\()\-\,\.\\ ]+$/i.test(value);
		},"Please enter valid address.");
	
		jQuery.validator.addMethod("formCity", function(value, element) {
			return this.optional(element) || /^[a-zA-Z ]+$/i.test(value);
		},"Please enter valid city");
	
		jQuery.validator.addMethod("alphanumeric", function(value, element) {
			return this.optional(element) || /^[A-Z0-9]+$/i.test(value);
		},"Please enter valid alphanumeric");
	
		jQuery.validator.addMethod("partnerName", function(value, element) {
			return this.optional(element) || /^[A-Z0-9-.'_, ]+$/i.test(value);
		},"Please enter valid alphanumeric");
	
		jQuery.validator.addMethod("lettersonly", function(value, element) {
			return this.optional(element) || /^[A-Z]+$/i.test(value);
		},"Please enter valid alphanumeric");
		
		window.isFormRulesInitialized = true;
	}
}

function initValidateForm( formId, formRules, highlightCallBack,
		unhighlightCallBack, errorPlacementCallBack, formMessages, formGroups,onKeyUpFlag) {
	
	if( formId && formRules ) 
	{	
		if( !window.isFormRulesInitialized ) {
			initFormRules();
		}
		
		var validationConfig = {	
		  rules: formRules,
		  highlight : function (element){ 	  
			$(element).addClass("error");
			if(highlightCallBack){
				highlightCallBack.apply(this, arguments);	
			}
		  },
		  errorPlacement: function(error, element) { 
			  
		  },
		  unhighlight : function (element) {			  
			$(element).removeClass("error");	
			if(unhighlightCallBack){
				unhighlightCallBack.apply(this, arguments);		
			}
		  },
		  groups :{},
		};
		
		if( formMessages ){
			validationConfig.messages = formMessages;
		}
		
		if( onKeyUpFlag == 'false' ){
			validationConfig.onkeyup = false;
		}
		
		if( errorPlacementCallBack ){
			validationConfig.errorPlacement = errorPlacementCallBack;
		}
		
		if(formGroups) {
			validationConfig.groups = formGroups ;
		}
		
		if( $("form#" + formId).length > 0 )
			$("form#" + formId).validate(validationConfig);
		else
			$("form[name=" + formId + "]").validate(validationConfig);
	}
}

function getCookie(c) {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var index = cookies[i].indexOf("=");
		var name = cookies[i].substr(0,index);
		name = name.replace(/^\s+|\s+$/g,"");
		if (name == c) {
			return unescape(cookies[i].substr(index + 1));
		}
	}
}

function coupon() {
	$('#addcoupon').show();$('#nocoupon').hide();
}

/* when ECMASCRIPT6 is supported by all browsers. below method can be exported as modules. 
 * it currently uses global variable to hold all utility functions */
window.hpStoreUtils = {
  ajax : invokeAJAX,
  ajaxAsync : invokeAJAXAsync,
  ajaxAsyncTrue:invokeAJAXAsyncTrue,
  getStoreConfig : getDefaultStoreParams,
  getCartUrls : getCartCommandURLs,
  toggleConfig : toggleConfig,
  onMouseToolTip : onMouseToolTip,
  initValidateForm : initValidateForm,
  getCheckoutUrls : getCheckoutCommandURLs,
  getParams : getFormParams,
  next : moveToNext,
  getCookie : getCookie,
  getCallCenterUrls : getCallCenterUrls,
  focusNext : focusNext
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.onload=(function(){
	
	var aoid = getParameterByName('aoid');
	
	if(aoid !== null && aoid !== '') {
 	$.ajax({
            url: '/webapp/wcs/stores/servlet/AoidCookieView',
            data: {
		aoid:aoid,
             },			 
            success: function(data) {
           	
          $('div#aoiddiv').html(data);				
				
            }
        });
	}

 });

var pageName = "";

$(document).ready(function() {
	var cart_count = $("#minicart-itemcount").html();
	console.log("On document ready : cart_count --> "+cart_count);
	if(cart_count!=undefined && cart_count > 0){
		$(".cart-itmcount").html(cart_count);	
		$("#counterMobile").html(cart_count);	
	}
	
	if($("#Page_Name")!=undefined){
		pageName = $("#Page_Name").val();
	}
});

var winScrollSart = true;
var lastScrollTop = 0;
$( window ).on( "load", function() {
	$(window).on("resize scroll", function() {
		stickyCartScroll();
	});
});

function stickyCartScroll(){
	if($(window).width() <= 496){
		var cart_count = $("#minicart-itemcount").html();		
		if(winScrollSart && $(window).scrollTop() + $(window).height() !== $(document).height()){
			winScrollSart = false;		
			if(cart_count!=undefined && (cart_count > 0||cart_count == "3+") && pageName!="Cart_https"){
				$(".cart-itmcount").html(cart_count);		
				var st = $(window).scrollTop();
				if((st < lastScrollTop) && (st > 225)) {
					$('.stickyCart').show();
				}
				else {
					$('.stickyCart').hide();
				}				
			}		
		}
		winScrollSart = true;
		lastScrollTop = st;
	}
}
jQuery.callCenterUtils = (function($) {
	  //holds URLs
    var _ccAjaxURLs = {};
    if( window.hpStoreUtils && typeof(hpStoreUtils.getCallCenterUrls) == 'function' ) {
    	_ccAjaxURLs = hpStoreUtils.getCallCenterUrls();
    }
    
    //holds default parameters for AJAX call
    var _ccSharedParams = {};
    if( window.hpStoreUtils && typeof(hpStoreUtils.getStoreConfig) == 'function' ){
    	_ccSharedParams = hpStoreUtils.getStoreConfig();
    }
    
	var _isEmptyString = function (s) {
		return (!s || /^\s*$/.test(s));
	};
	
	var _showProgress = function () {
		$('#loadingOverlay').removeClass('hide');
	};
	
	var _hideProgress = function () {
		$('#loadingOverlay').addClass('hide');
	};
		
	var _toggleError = function ($ele, setErr, errMsg) {
		if (setErr) {
			$ele.siblings('.csrErrMsg').text(errMsg).removeClass('hideComp');
			$ele.addClass('errorstate');
		} else {
			$ele.siblings('.csrErrMsg').text('').addClass('hideComp');
			$ele.removeClass('errorstate');
		}
	};
	
	var _toggleMainError = function (itemId, usage, setErr, errMsg) {
		if (setErr) {
			$('#csrErr' + (itemId ? itemId : '') + usage).text(errMsg).removeClass('hideComp');
		} else {
			$('#csrErr' + (itemId ? itemId : '') + usage).text('').addClass('hideComp');
		}
	};
	
    var _resetSendEmailQuote = function() {
        $('#emailTo').removeClass('error');
        $('#emailQuoteMessage').text("");
    };

	var _csrSetBDText = function (newTxt) {
		$('#csrDiscReason').data('bdcode', newTxt);
		var $option = $('#csrDiscReason option[value="BigDeals"]');
		var txt = $option.text();
		txt = txt.substring(0, txt.indexOf(' - '));
		txt = txt + ' - ' + newTxt;
		$option.text(txt);
	};
	
	var _getCSRDisc = function ($this) {
		var discPerc = $this.val().trim();
		if (isNaN(discPerc)) {
			_toggleError($this, true, 'Enter a valid discount');
			$this.focus();
			return null;
		}
		return Math.abs(parseFloat(discPerc));
	};
	
	var _getCSRReason = function($ele, order) {
		var $this = $('#csrDiscReason');
		var reasonCode = $this.val();
		if (!reasonCode) {
			_toggleError($ele, true, 'Select a reason for giving this discount');
			reasonCode = null;
		}
		var bdCode = $this.data('bdcode');
		if (order && reasonCode == 'BigDeals') {
			_toggleError($ele, true, 'Big Deals: Discounts only at Item level');
			reasonCode = null;
		} else if (reasonCode == 'BigDeals' && !bdCode) {
			_toggleError($ele, true, 'Invalid big deal code');
			reasonCode = null;
		}
		if (!reasonCode && order) {
			$this.addClass('errorstate');
			$this.focus();
		}
		return reasonCode; 
	};
	
	var _isCSRDiscValid = function (discLimit, discPerc, usage, itemId) {
		var $this = $('#csrLoginBox');
		$this.data('disc', discPerc);
		$this.data('item', itemId);
		$this.data('usage', usage);
		var reasonCode = $('#csrDiscReason').val().trim();
		var nDiscLimit = (discLimit == null || discLimit == '' || isNaN(discLimit)) ? 0 : parseFloat(discLimit);
		if ((discPerc > nDiscLimit && (_isEmptyString($this.find('#csrLogonId').val()) || _isEmptyString($this.find('#csrPassword').val()))) || (reasonCode != null && reasonCode == 'BigDeals')) {
			$this.data('limit', discPerc);
			$this.data('reason', reasonCode);
			if (reasonCode != null && reasonCode == 'BigDeals') {
				$this.find('.headingarea').text($this.data('bdhead'));
			} else {
				var txtLimit = (usage == '-7') ? WCParamJS.CurrencySymbolToFormat + discLimit : discLimit + '%';
				$this.find('.headingarea').text($this.data('header').replace('DISC_LIMIT', txtLimit));
			}
			setTimeout(function () {
				$this.foundation('reveal', 'open');
			}, 200);
			return false;
		}
		return true;
	};
	
	var _getDiscLimit =function ($this) {
		var subtotal = $('#priceLimit').val();
		subtotal = (_isEmptyString(subtotal) || isNaN(subtotal)) ? 0 : parseFloat(subtotal);
		return (subtotal > 1000) ? $this.data('limit2') : $this.data('limit1');
	};

	var _csrReason = function (itemId) {
		$('#csrReasonBox').data('item', itemId);
		$('#csrItemReason').html($('#csrDiscReason').html());
		$('#csrItemReason').val('');
		$('#csrReasonBox').foundation('reveal', 'open');
	};
	
	var _csrAuthenticate = function ($this, $user, $pwd) {
		_toggleMainError('Login', '', false, '');
		var params = {};
		params.logonId = $user.val().trim();
		params.password = $pwd.val().trim();
		params.usageId = $this.data('usage');
		params.discPerc = $this.data('disc');
		params.orderId = $('#orderId').val();
		params.reasonCode = $this.data('reason');
		_showProgress();
		hpStoreUtils.ajax(_ccAjaxURLs.csrDiscApporveUrl, 'POST', $.extend(params, _ccSharedParams),
			function(data, status, jqXHR) {
				data = data.replace('/*', '').replace('*/', '').trim();
				var response = JSON.parse(data);
				if (response.errorCode) {
					_toggleMainError('Login', '', true, response.errorMessage);
					_hideProgress();
				} else {
					$this.foundation('reveal', 'close');			
					_csrDiscSubmit($this.data('disc'), $this.data('item'), $this.data('usage'), response);
				}
			},
			function(jqXHR, status, err) {
				console.error('Unable to authenticate approver : ' + err);
				$pwd.val('');
				_toggleMainError('Login', '', true, err);
				_hideProgress();
			},
			true
		);
	};

	var _csrDiscSubmit = function (discPerc, itemId, usageId, responseData) {
		_toggleMainError(itemId, usageId, false, '');
		var params = {};
		if(responseData){
			params.CSR_DISC_APPROVED_AGENT = responseData.CSR_DISC_APPROVED_AGENT;
			params.CSR_DISC_APPROVE_ORDER = responseData.CSR_DISC_APPROVE_ORDER;
			params.CSR_MAX_APPROVEL_PERC_LIMIT = responseData.CSR_MAX_APPROVEL_PERC_LIMIT;
			params.CSR_DISC_APPROVED_PERCENT = responseData.CSR_DISC_APPROVED_PERCENT;
		}
		params.orderId = $('#orderId').val();
		if (itemId) {
			params.orderItemId = itemId;
			params.discField = $('#csrType_' + itemId).val();
			params.discAmtItem = $('#csrDiscItemAmt_' + itemId).val();
		}
		params.discPerc = discPerc;
		params.reasonCode = $('#csrDiscReason').val();
		params.bdCode = $('#csrDiscReason').data('bdcode');
		params.usageId = usageId;
		params.finalView = 'AjaxOrderItemDisplayView';
		_showProgress();
		hpStoreUtils.ajax(_ccAjaxURLs.csrDiscountUrl, 'POST', $.extend(params, _ccSharedParams),
			function(data, status, jqXHR) {
				data = data.replace('/*', '').replace('*/', '').trim();
				var response = JSON.parse(data);
				if (response.errorCode) {
					_toggleMainError(itemId, usageId, true, response.errorMessage);
					_hideProgress();
				} else {
					$.cartUtils.refreshPage();
				}
			},
			function(jqXHR, status, err) {
				console.error('Unable to apply discounts : ' + err);
				_toggleMainError(itemId, usageId, true, err);
				_hideProgress();
			},
			true
		);
	};
    
	//APIs
	return {
		sendEmailQuote: function(formName) {
			_resetSendEmailQuote();
			
			var form = document.forms[formName];
			var params = {};
			var emailTo = "";
			var quoteNo = "";
			var useAgentContactFlag = "No";
			
			if (form.emailTo.value) {
				emailTo = $.trim(form.emailTo.value);
			}
			if (form.quoteNo.value) {
				quoteNo = $.trim(form.quoteNo.value);
			}
			if (emailTo === "") {
				document.getElementById('emailQuoteMessage').focus();
				$('#emailTo').addClass('error');
				$("#emailQuoteMessage").text("Please enter email address.");
				return;
			}
			if (!(emailTo.indexOf("@") > 0)) {
				$('#emailTo').addClass('error');
				$("#emailQuoteMessage").text("Please enter valid email address.");
				return;
			}
			if ($('#agentcontactcustomchkbox').hasClass('checked')) {
				useAgentContactFlag = "Yes";
			}
			
			params.emailTo = emailTo;
			params.quoteNo = quoteNo;
			params.useAgentContactFlag = useAgentContactFlag;
			
			hpStoreUtils.ajax(_ccAjaxURLs.emailQuoteURL, "POST", params,
				function(data, textStatus, jqXHR) {
					var responseStr = data.replace('/*', '').replace('*/', '').trim();
					var serviceResponse = JSON.parse(responseStr);
					
					if (serviceResponse && !serviceResponse.errorMessage) {
						_resetSendEmailQuote();
						$("#emailTo").val("");
						$('#callCenterDialog p#message').html("Quote has been sent successfully");
						$('#callCenterDialog').foundation('reveal', 'open');
					} else {
						_resetSendEmailQuote();
						$('#emailTo').addClass('error');
						$("#emailQuoteMessage").text(serviceResponse.errorMessage);
					}
				},
				function(jqXHR, textStatus, errorThrown) {
					console.error("Unable to call sendEmailQuote : " + errorThrown);
				}
			);
		},
		
		resetSendEmailQuote: function() {
			_resetSendEmailQuote();
		},
		
		findCSRDiscType: function ($this) {
    		var lPrice = $this.siblings('.lPrice').val();
    		if ($this.hasClass('csrItemAmt')) {
    			$this.siblings('.csrType').val('AMT');
    			$this.siblings('.csrItem').val(Math.round((($this.val() / lPrice) * 100) * 100) / 100);
    		} else if ($this.hasClass('csrItem')) {
    			$this.siblings('.csrType').val('PCT');
    			$this.siblings('.csrItemAmt').val(Math.round((($this.val() / 100) * lPrice) * 100) / 100);
    		}
    	},

		applyCSROrder: function($this) {
			_toggleError($this, false, '');
			if ($this.data('csritem') != '0.00') {
				_toggleError($this, true, 'Item(s) discounts already applied');
				$this.focus();
				return;
			}
			var discPerc = _getCSRDisc($this);
			if (discPerc == null) {
				return;
			}
			var reasonCode = _getCSRReason($this, true);
			if (!reasonCode) {
				return;
			}
			if (!_isCSRDiscValid(_getDiscLimit($this), discPerc, '-1', '')) {
				return;
			}
			_csrDiscSubmit(discPerc, null, '-1');
		},

		applyCSRShip: function($this) {
			_toggleError($this, false, '');
			var shipAmt = $this.data('charge');
			shipAmt = isNaN(shipAmt) ? 0 : parseFloat(shipAmt);
			if (shipAmt <= 0.0) {
				_toggleError($this, true, 'Cannot discount FREE shipping');
				$this.focus();
				return;
			}
			var discPerc = _getCSRDisc($this);
			if (discPerc == null) {
				return;
			}
			if (discPerc > shipAmt) {
				_toggleError($this, true, 'Discount cannot exceed shipping amount');
				$this.focus();
				return;
			}
			var reasonCode = _getCSRReason($this, true);
			if (!reasonCode) {
				return;
			}
			if (!_isCSRDiscValid(_getDiscLimit($this), discPerc, '-7', '')) {
				return;
			}
			_csrDiscSubmit(discPerc, null, '-7');
		},

		applyCSRItem: function($this) {
			_toggleError($this, false, '');
			if ($this.data('csrord') != '0.00') {
				_toggleError($this, true, 'Order discounts already applied');
				$this.focus();
				return;
			}
			var discPerc = _getCSRDisc($this);
			if (discPerc == null) {
				return;
			}
			var reasonCode = _getCSRReason($this, false);
			if (!reasonCode) {
				_csrReason($this.data('id'));
				return;
			}
			if (!_isCSRDiscValid(_getDiscLimit($this), discPerc, '-1', $this.data('id'))) {
				return;
			}
			_csrDiscSubmit(discPerc, $this.data('id'), '-1');
		},
		
		csrLoginClear: function() {
			var $this = $('#csrLoginBox');
			var $user = $this.find('#csrLogonId');
			var $pwd = $this.find('#csrPassword');
			_toggleError($user, false, '');
			_toggleError($pwd, false, '');
			_toggleMainError('Login', '', false, '');
			$user.val('');
			$pwd.val('');
		},

		csrLoginSubmit: function () {
			var $this = $('#csrLoginBox');
			var $user = $this.find('#csrLogonId');
			var $pwd = $this.find('#csrPassword');
			_toggleError($user, false, '');
			_toggleError($pwd, false, '');
			var fValid = true;
			if (_isEmptyString($user.val())) {
				_toggleError($user, true, 'Enter a valid username');
				fValid = null;
			}
			if (_isEmptyString($pwd.val())) {
				_toggleError($pwd, true, 'Enter a valid password');
				fValid = null;
			}
			if (!fValid) {
				return;
			}
			_csrAuthenticate($this, $user, $pwd);
		},

		csrReasonClear: function () {
			$('#csrItemReason').val('');
			_toggleError($('#csrDiscItem_' + $('#csrReasonBox').data('item')), false, '');
			_toggleError($('#csrDiscReason'), false, '');
		},
		
		csrReasonSubmit: function () {
			var $this = $('#csrItemReason');
			var $ele = $('#csrDiscReason');
			_toggleError($this, false, '');
			_toggleError($ele, false, '');
			if (_isEmptyString($this.val())) {
				_toggleError($this, true, 'Select a reason for giving this discount');
				return;
			} else if ($this.val() == 'BigDeals') {
				$ele.val($this.val());
				$('#csrReasonBox').foundation('reveal', 'close');
				setTimeout(function () {
					$.callCenterUtils.csrBigDeal(true);
				}, 200);
				return;
			} else {
				_csrSetBDText('');
			}
			$ele.val($this.val().trim());
			this.applyCSRItem($('#csrDiscItem_' + $('#csrReasonBox').data('item')));
			$('#csrReasonBox').foundation('reveal', 'close');
		},
		
		csrItemReasonChange: function ($this) {
			_toggleError($this, false, '');
			if (_isEmptyString($this.val())) {
				_toggleError($this, true, 'Select a reason for giving this discount');
			}
		},

		csrReasonChange: function ($this) {
			if ($this.val().trim() == 'BigDeals') {
				this.csrBigDeal(false);
			} else {
				_csrSetBDText('');
			}
		},

		csrBigDeal: function (submit) {
			this.csrBDClear();
			$('#csrBDCode').data('submit', submit);
			$('#csrBDBox').foundation('reveal', 'open');
		},

		csrBDClear: function () {
			$('#csrBDCode').val('');
			_toggleError($('#csrBDCode'), false, '');
		},

		csrBDSubmit: function () {
			var $this = $('#csrBDCode');
			_toggleError($this, false, '');
			if (_isEmptyString($this.val())) {
				_toggleError($this, true, 'Enter a valid big deal code');
				return false;
			}
			_csrSetBDText($this.val().trim());
			$('#csrBDBox').foundation('reveal', 'close');
			if ($this.data('submit')) {
				this.applyCSRItem($('#csrDiscItem_' + $('#csrReasonBox').data('item')));
			}
		},
		
		manageOrderLock: function(ccAction, storeId) {
			var params = {};
			params.storeId = storeId;
			params.ccAction = ccAction;
			hpStoreUtils.ajax(_ccAjaxURLs.manageOrderLockURL, 'POST', params,
				function(data, status, jqXHR) {
					data = data.replace('/*', '').replace('*/', '').trim();
					var response = JSON.parse(data);
					if (response.lockAction == 'R') {
						$('#callCenterDialog p#message').html('Cart is now unlocked');
					} else if (response.errorMessage) {
						$('#callCenterDialog p#message').html(response.errorMessage);
					} else if (response.errorMessageKey) {
						$('#callCenterDialog p#message').html(response.errorMessageKey);
					} else {
						$('#callCenterDialog p#message').html('Cart is now locked');
					}
					$('#callCenterDialog').foundation('reveal', 'open');
				},
				function(jqXHR, status, err) {
					console.error('Unable to manage OrderLock : ' + err);
				}
			);
		},
		
		updateLVOState: function() {
			_toggleMainError('csrErrLVO', '', false, '');
			if ($('input#LVOFlag').length > 0) {
				var params = {};
				params.storeId = $('#storeId').val();
				params.langId = $('#langId').val();
				params.catalogId = $('#catalogId').val();
				params.orderId = $('#orderId').val();
				params.lvoFlag = $('input#LVOFlag').is(':checked') ? 1 : 0;
				_showProgress();
				hpStoreUtils.ajax(_ccAjaxURLs.manageLVOFlagURL, 'POST', params,
					function(data, status, jqXHR) {
						data = data.replace('/*', '').replace('*/', '').trim();
						var response = JSON.parse(data);
						if (response && !response.errorMessage) {
							console.log('Successfully updated LVOState');
							$.cartUtils.continueCheckout();
						} else if (response.errorMessage) {
							console.error('Unable to update LVOState : msg = ' + response.errorMessage);
							_toggleMainError('csrErrLVO', '', true, response.errorMessage);
							_hideProgress();
						} else if (response.errorMessageKey) {
							console.error('Unable to update LVOState : key = ' + response.errorMessageKey);
							_toggleMainError('csrErrLVO', '', true, response.errorMessageKey);
							_hideProgress();
						}
					},
					function(jqXHR, status, err) {
						console.error('Unable to update LVOState : ' + err);
						_toggleMainError('csrErrLVO', '', true, 'Unable to update LVO State');
						_hideProgress();
					}
				);
			}
		},

		updateLVOStateNoCheckout: function() {
			_toggleMainError('csrErrLVO', '', false, '');
			if ($('input#LVOFlag').length > 0) {
				var params = {};
				params.storeId = $('#storeId').val();
				params.langId = $('#langId').val();
				params.catalogId = $('#catalogId').val();
				params.orderId = $('#orderId').val();
				params.lvoFlag = $('input#LVOFlag').is(':checked') ? 1 : 0;
				_showProgress();
				hpStoreUtils.ajax(_ccAjaxURLs.manageLVOFlagURL, 'POST', params,
						function(data, status, jqXHR) {
					data = data.replace('/*', '').replace('*/', '').trim();
					var response = JSON.parse(data);
					if (response && !response.errorMessage) {
						console.log('Successfully updated LVOState');
						// No checkout unlike other function.
					} else if (response.errorMessage) {
						console.error('Unable to update LVOState : msg = ' + response.errorMessage);
						_toggleMainError('csrErrLVO', '', true, response.errorMessage);
						_hideProgress();
					} else if (response.errorMessageKey) {
						console.error('Unable to update LVOState : key = ' + response.errorMessageKey);
						_toggleMainError('csrErrLVO', '', true, response.errorMessageKey);
						_hideProgress();
					}
				},
				function(jqXHR, status, err) {
					console.error('Unable to update LVOState : ' + err);
					_toggleMainError('csrErrLVO', '', true, 'Unable to update LVO State');
					_hideProgress();
				}
				);
			}
		}
	}
})(jQuery);

/** Subsidy csrReasonBox */
$(function() {
	$('#csrReasonBox').on('opened.fndtn.reveal', function (e) {
		$('#csrItemReason').focus();
	});

	$('#csrReasonBox').on('closed.fndtn.reveal', function (e) {
		$.callCenterUtils.csrReasonClear();
	});
	
	$('#csrReasonBox .csrOK').on('click', function (e) {
		$.callCenterUtils.csrReasonSubmit();
	});

	$('#csrBDBox').on('opened.fndtn.reveal', function (e) {
		$('#csrBDCode').focus();
	});
	
	$('#csrBDBox').on('closed.fndtn.reveal', function (e) {
		$.callCenterUtils.csrBDClear();
	});

	$('#csrBDBox .csrOK').on('click', function (e) {
		$.callCenterUtils.csrBDSubmit();
	});
	
	$('#csrLoginBox').on('opened.fndtn.reveal', function (e) {
		$('#csrLoginBox #csrLogonId').focus();
	});

	$('#csrLoginBox').on('closed.fndtn.reveal', function (e) {
		$.callCenterUtils.csrLoginClear();
	});
	
	$('#csrLoginBox .csrOK').on('click', function (e) {
		$.callCenterUtils.csrLoginSubmit();
	});
	
	$('#csrItemReason').on('change', function (e) {
		$.callCenterUtils.csrItemReasonChange($(this));
	});

	$('.xo_cart .csrloginbox .inpt').on('keypress', function (e) {
		var $this = $(this);
		if (e.keyCode == 13) {
			switch ($this.parents('csrloginbox').attr('id')) {
			case 'csrLoginBox':
				$.callCenterUtils.csrLoginSubmit(); break;
			case 'csrReasonBox':
				$.callCenterUtils.csrReasonSubmit(); break;
			case 'csrBDBox':
				$.callCenterUtils.csrBDSubmit(); break;
			}
		}
	});
	
	$('.xo_cart .csrloginbox .contentarea').on('keyup', function (e) {
		if (e.keyCode == 27) {
			$(this).parents('.csrloginbox').foundation('reveal', 'close');  
		}
	});
});

$(document).on('ready readyAgain', function (e) {
	$('#csrDiscReason').off('change');
	$('#csrDiscReason').on('change', function(e) {
		$.callCenterUtils.csrReasonChange($(this));
	});
	
	$('.xo_cart .productrow .csrDisc').off('keyup');
	$('.xo_cart .productrow .csrDisc').on('keyup', function (e) {
		$.callCenterUtils.findCSRDiscType($(this));
	});
	
	$('.xo_cart .csritemapply').off('click');
	$('.xo_cart .csritemapply').on('click', function (e) {
		$.callCenterUtils.applyCSRItem($(this).siblings('.csrItem'));
	});

	$('.xo_cart .csrordrapply').off('click');
	$('.xo_cart .csrordrapply').on('click', function (e) {
		$.callCenterUtils.applyCSROrder($(this).siblings('.csrOrd'));
	});

	$('.xo_cart .csrshipapply').off('click');
	$('.xo_cart .csrshipapply').on('click', function (e) {
		$.callCenterUtils.applyCSRShip($(this).siblings('.csrShip'));
	});
});
