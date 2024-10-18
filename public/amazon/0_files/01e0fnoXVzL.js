(function(c){var b=window.AmazonUIPageJS||window.P,f=b._namespace||b.attributeErrors,e=f?f("PerformanceResourceTimingAssets",""):b;e.guardFatal?e.guardFatal(c)(e,window):e.execute(function(){c(e,window)})})(function(c,b,f){"use strict";c.when("performance-resource-timing-utils").register("performance-resource-timing",function(e){function c(a){for(var h={},b=0;b<a.length;++b){var d=a[b],g=e.determineType(d.name),c=d.duration,m=d.responseEnd,k=d.transferSize||0;d=k/1024;k=0===k&&100>c;var l=h[g]||(h[g]=
{});g=function(a,b){l[a]=(l[a]||0)+(b!==f?b:1)};var n=function(a,b){l[a]=Math.max(l[a]||0,b)};g("requests");g("requests"+(k?"-cached":"-uncached"));g("total-duration",c);n("max-duration",c);g("total-transferred",d);n("max-transferred",d);n("long-pull",m)}p(h);return h}function p(a){for(var b in a)if(a.hasOwnProperty(b)){var c=a[b],d=100*(c["requests-cached"]||0)/c.requests;c["cache-hit-rate"]=d;c["cache-hit-rate-bucket"]=10*Math.ceil(d/10)}}function m(a,c){c=c!==f?c:1;b.ue&&b.ue.count&&b.ue.count(a,
c)}return{collectIfAvailable:function(){var a=b.performance&&b.performance.getEntriesByType&&b.performance.getEntriesByType("resource");if(a&&a.length){a=c(a);for(var e in a)if(a.hasOwnProperty(e)){var f=a[e],d;for(d in f)if(f.hasOwnProperty(d)){var g=f[d];m("resource-timing-"+e+"-"+d,g);"cache-hit-rate-bucket"===d&&b.ue&&b.ue.tag&&b.ue.tag("timing:"+e+":"+d+":"+g)}}}else m("resource-timing-unavailable")}}});c.when("performance-resource-timing","load").execute(function(b){b.collectIfAvailable()});
"use strict";c.register("performance-resource-timing-utils",function(){var b={jpg:"images",jpeg:"images",png:"images",webp:"images",gif:"images",css:"assets",js:"assets",woff2:"fonts"},c=/\.([^\/\.\?#]+)((\?|#).*)?$/,p=/\/images\/I\//;return{determineType:function(e){var a=c.exec(e);a=b[a&&1<a.length?a[1]:f]||"unknown";"images"===a&&p.test(e)&&(a="product-images");return a}}})});