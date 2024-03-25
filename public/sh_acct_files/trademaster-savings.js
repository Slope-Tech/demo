var savingsData;google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback(drawChart),$.ajax({type:"get",url:"/sh/control/getTradeMasterSavings",data:"json",success:function(t){savingsData=t},error:function(t,a,e){console.log(a)},async:!1});var chart,cli,chartLeft,chartTop,chartHeight,chartWidth,months={"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September",10:"October",11:"November",12:"December"},tradeMasterSavingsStr=savingsData.tradeMasterSavings,shippingSavingsStr=savingsData.shippingSavings,bulkSavingsStr=savingsData.bulkSavings,promoSavingsStr=savingsData.promoSavings,tradeMasterSavings=Number(tradeMasterSavingsStr),shippingSavings=Number(shippingSavingsStr),bulkSavings=Number(bulkSavingsStr),promoSavings=Number(promoSavingsStr),totalSavings=savingsData.totalSavings,tradeMasterStartDate=savingsData.tradeMasterStartDate.split("-"),tradeMasterStartYear=tradeMasterStartDate[0],tradeMasterStartMonth=tradeMasterStartDate[1];$(".welcome-back-txt").append("Welcome back, "+savingsData.firstName+"!"),$(".tradeMaster-startDate-text").append('<span class="trademaster-highlight bold">TradeMaster</span> since '+months[tradeMasterStartMonth]+" "+tradeMasterStartYear),$(window).resize(function(){chart&&(chart.clearChart(),drawChart())});var colors={"TradeMaster Savings":"#0066a6","Shipping Savings":"#54c0e8","Bulk Savings":"#cccccc","Promo Savings":"#818181"},rows=[["TradeMaster Savings",tradeMasterSavings],["Shipping Savings",shippingSavings],["Bulk Savings",bulkSavings],["Promo Savings",promoSavings]],rowsStr=[["TradeMaster Savings",tradeMasterSavingsStr],["Shipping Savings",shippingSavingsStr],["Bulk Savings",bulkSavingsStr],["Promo Savings",promoSavingsStr]],noDataRows=[["TradeMaster Savings",0],["Shipping Savings",0],["Bulk Savings",1],["Promo Savings",0]];function drawChart(){var t=!0;0==totalSavings&&(rows=noDataRows,$(".doughnut-chart").addClass("trademaster-disabled-circle-overlay"),t=!1);var a=google.visualization.arrayToDataTable([["Savings Category","Savings"]].concat(rows)),t={click:"event",pieHole:.8,legend:"none",height:"100%",width:"100%",pieSliceText:"none",backgroundColor:"#f8f5f3",colors:["#0066a6","#54c0e8","#cccccc","#818181"],chartArea:{height:"85%",width:"85%"},tooltip:{trigger:"none"},enableInteractivity:t};(chart=new google.visualization.PieChart($(".doughnut-chart").filter(function(){return $(this).is(":visible")})[0])).draw(a,t),google.visualization.events.addListener(chart,"onmouseover",drawToolTip),google.visualization.events.addListener(chart,"onmouseout",removeToolTip),google.visualization.events.addListener(chart,"onmouseover",toolTipHandler),cli=chart.getChartLayoutInterface(),chartLeft=cli.getChartAreaBoundingBox().left,chartTop=cli.getChartAreaBoundingBox().top,chartHeight=cli.getChartAreaBoundingBox().height,chartWidth=cli.getChartAreaBoundingBox().width,drawInnerText()}function toolTipHandler(t){t=rows[t.row];$(".selection_line").css({stroke:colors[t[0]]}),$(".inner_line").css({stroke:colors[t[0]]})}function findPoint(t,a,e,r){r=r*Math.PI/180;return{x:Math.cos(r)*e+t,y:Math.sin(r)*e+a}}function drawToolTip(t){var s,a,e,r,n,i,o,c,g;0!=totalSavings&&(s=t.row,n=rows.reduce(function(t,a){return t+a[1]},0),g=360*rows.slice(0).reduce(function(t,a,e,r){return e===s&&r.splice(e),e===rows.length-1?t:t+a[1]},0)/n,o=d3.select("#trademaster-savings-circle svg"),i=findPoint(a=chartLeft+chartWidth/2,e=chartTop+chartHeight/2,c=chartHeight/2,g-90),r=findPoint(a,e,5+c,g-90),t=rows[s][0].split(" "),o.append("line").attr("transform","translate(0, 0)").attr("x1",i.x).attr("y1",i.y).attr("x2",r.x).attr("y2",r.y).attr("class","inner_line"),n=r.x<a?r.x-90:r.x+90,(g=Math.abs(r.x-a))<c&&r.x<a?n-=c-g:g<c&&r.x>=a&&(n+=c-g),o.append("line").attr("transform","translate(0, 0)").attr("x1",r.x).attr("y1",r.y).attr("x2",n).attr("y2",r.y).attr("class","selection_line"),i=o.append("text").attr("class","selection-text").attr("text-anchor","middle").text(t[0]),t=o.append("text").attr("class","selection-text").attr("text-anchor","middle").text(t[1]),o=o.append("text").attr("class","price-text").attr("text-anchor","middle").text("$"+rowsStr[s][1]),i.node().getBBox().width,t.node().getBBox().width,o.node().getBBox().width,c=Math.abs(Math.abs(n-r.x)-Math.abs(c-g))/2,g=r.y,r.y<e&&(g+=50),i.attr("x",c=n<a?n+c:n-c),i.attr("y",g-35),t.attr("x",c),t.attr("y",g-20),o.attr("x",c),o.attr("y",g-5))}function drawInnerText(){var t=d3.select("#trademaster-savings-circle svg"),a=chartLeft+chartWidth/2,e=t.append("text").attr("class","inner-text-year").text((new Date).getFullYear()+" Savings:"),r=t.append("text").attr("class","inner-text-savings").text("$"+totalSavings),s=e.node().getBBox().width,t=a-r.node().getBBox().width/2;e.attr("x",a-s/2),e.attr("y",chartTop+chartHeight/2),r.attr("x",t),r.attr("y",chartTop+chartHeight/2+20)}function removeToolTip(){d3.selectAll("#trademaster-savings-circle line.inner_line").remove(),d3.selectAll("#trademaster-savings-circle line.selection_line").remove(),d3.selectAll("#trademaster-savings-circle text.selection-text").remove(),d3.selectAll("#trademaster-savings-circle text.price-text").remove()}