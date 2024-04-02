/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ca(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Fa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ba.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Oa(a,b,c||(g?"border":"content"),d,f)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),
void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b)}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});
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
