(function(b){var d=window.AmazonUIPageJS||window.P,e=d._namespace||d.attributeErrors,a=e?e("AmazonAPIRichContentBuzzAssets",""):d;a.guardFatal?a.guardFatal(b)(a,window):a.execute(function(){b(a,window)})})(function(b,d,e){b.when("jQuery").register("count-down-controller",function(a){return{countDown:function(b){var c=a(b),d=new Date(Date.UTC(c.data("year"),c.data("month")-1,c.data("day"),c.data("hour"),c.data("minute"),c.data("second"),0)),e=null;e=setInterval(function(){var a=d-Date.now(),b=Math.floor(a/
1E3);if(0>b)c.text("00:00"),clearInterval(e);else{a=Math.floor(b/3600%24);var f=Math.floor(b%60);b=("0"+Math.floor(b/60%60)).slice(-2);f=("0"+f).slice(-2);a=0<a?[a,b,f].join(":"):[b,f].join(":");c.text(a)}},1E3)}}});b.when("A","count-down-controller","ready").execute(function(a,b){var c=document.querySelectorAll(".amazon-api-rc-count-down-timer");a.each(c,function(a){b.countDown(a)})})});