var _commonParams = {};
if (window.hpStoreUtils && typeof (hpStoreUtils.getStoreConfig) == 'function') {
	_commonParams = hpStoreUtils.getStoreConfig();
}

var _checkoutURLs = {};
if (window.hpStoreUtils && typeof (hpStoreUtils.getCheckoutUrls) == 'function') {
	_checkoutURLs = hpStoreUtils.getCheckoutUrls();
}

var _isEmptyString = function (s) {
	return (!s || /^\s*$/.test(s));
};

var _showProgress = function() {
	if (document.getElementById('commonLoadingOverlay') != null) {
		document.getElementById('commonLoadingOverlay').style.display = "block";
	}
};

var _hideProgress = function() {
	if (document.getElementById('commonLoadingOverlay') != null) {
		document.getElementById('commonLoadingOverlay').style.display = "none";
	}
};

SubscriptionSavedCardJS = {

	submitCCIFrame : function() {
		var iframeWin = document.getElementById("pgsIframe").contentWindow;

		var msg = new Object();
		msg.ActionCode = 'PGSSubmit';
		iframeWin.postMessage(JSON.stringify(msg), '*');
		
		setTimeout(function () {
        	try {
        	if(document.getElementById("pgsIframe").contentWindow.location.href.length > 0)    	{	}
        	else {
				_hideProgress();
			}
        	}
        	catch(err)
        	{	_hideProgress(); }
		}, 5000);
	},
	getUrlParams : function (url) {   

	  // get query string from url 
	  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
	  var obj = {};

	  if (queryString) {

		queryString = queryString.split('#')[0];
		var arr = queryString.split('&');

		for (var i = 0; i < arr.length; i++) {
		  var a = arr[i].split('=');
		  var paramName = a[0];
		  var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

		  paramName = paramName.toLowerCase();
		  if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

		  if (paramName.match(/\[(\d+)?\]$/)) {

			var key = paramName.replace(/\[(\d+)?\]/, '');
			if (!obj[key]) obj[key] = [];

			if (paramName.match(/\[\d+\]$/)) {
			  var index = /\[(\d+)\]/.exec(paramName)[1];
			  obj[key][index] = paramValue;
			} else {
			  obj[key].push(paramValue);
			}
		  } else {
			if (!obj[paramName]) {
			  obj[paramName] = paramValue;
			} else if (obj[paramName] && typeof obj[paramName] === 'string'){
			  obj[paramName] = [obj[paramName]];
			  obj[paramName].push(paramValue);
			} else {
			  obj[paramName].push(paramValue);
			}
		  }
		}
	  }
	  return obj;
	},
	checkPGSResponse : function(tldVal, mySubId) {
		console.log('###checkPGSResponse: tldVal:' + tldVal + " mySubId:"+ mySubId);
		var params = {};
		params.tld = tldVal;
		params.mySubId = mySubId;
		params.addNewCardFlow=true;
		var ssoFlg = '${ssoEnabled}';
		console.log("ssoFlg: "+ssoFlg);
		var ssoFlag = $('#ssoEnabled').text();
		console.log("ssoFlag: "+ssoFlag);
		if(tldVal !=null){
		var sOrderId = tldVal.split('-')[0];
		}
		_showProgress();
		hpStoreUtils.ajax(_checkoutURLs.subsOrdPayUpdateUrl, 'POST', $.extend(
				params, _commonParams), function(data, status, jqXHR) {
			data = data.replace('/*', '').replace('*/', '').trim();
			var response = JSON.parse(data);
			if(ssoFlag !=null && (ssoFlag == 'TRUE'||ssoFlag =='true')){
				window.location.href = getAbsoluteURL()+"MyManageSubscriptionsView?catalogId=10051&storeId=10151&langId=-1&fromPGS=true&mySubId="+mySubId+"&sOrderId="+sOrderId;
			}else
				window.location.href = getAbsoluteURL()+"MyManageSubscriptionsView?catalogId=10051&storeId=10151&langId=-1&fromPGS=true&mySubId="+mySubId;
		}, function(jqXHR, status, err) {
			console.error('Unable to get PHC response : ' + err);
			console.error('###Unable to process your request:' + status + " Kindly try again...");
			$('#subsFailMsg').css('display', 'block');
			loadCCIFrame();
			// window.location.href = getAbsoluteURL()+"savedCCEditAddress?catalogId=10051&storeId=10151&langId=-1&isSubsCard=true&paymentId=11011&sOrderId=H3219901&mySubId=251";
		}, true);

	},
	openSubscriptionPaymentModal : function(pId, sOrderId, mySubId) {
		
			if(event.target.className != 'editCCBillingAddresslink' && event.target.className != 'makedefaultlink' && event.target.className != 'btnClose'){
				console.log("###updatePayCard:"+pId+","+sOrderId+","+mySubId);					
				$("#paymentId").val(pId);
				$("#sOrderID").val(sOrderId);
				$("#mySubId").val(mySubId);
				$('#changeSubscriptionPaymentModal').foundation('reveal', 'open');
		}
	},
	updatePayCard : function() {
			var params = {};
			params.paymentId = $("#paymentId").val();
			params.mySubId = $("#mySubId").val();
			params.sOrderId = $("#sOrderID").val();
			params.updateCardFlow=true;
			var mySubId= $("#mySubId").val();
			var sOrderId= $("#sOrderID").val();
			var ssoFlag = $('#ssoEnabled').text();
			console.log("ssoFlag: "+ssoFlag);
			$('#subsChgPayErrMsg').css('display', 'none');
			_showProgress();
			
			hpStoreUtils.ajax(_checkoutURLs.subsOrdPayUpdateUrl, 'POST', $.extend(
					params, _commonParams), function(data, status, jqXHR) {
				data = data.replace('/*', '').replace('*/', '').trim();
				var response = JSON.parse(data);
				_hideProgress();
				if(ssoFlag !=null && (ssoFlag == 'TRUE'||ssoFlag =='true')){
					window.location.href = getAbsoluteURL()+"MyManageSubscriptionsView?catalogId=10051&storeId=10151&langId=-1&fromPGS=true&mySubId="+mySubId+"&sOrderId="+sOrderId;
				}else
					window.location.href = getAbsoluteURL()+"MyManageSubscriptionsView?catalogId=10051&storeId=10151&langId=-1&fromPGS=true&mySubId="+mySubId;
			}, function(jqXHR, status, err) {
				_hideProgress();
				console.error('###Unable to process your request:' + status + " Kindly try again...");
				$('#changeSubscriptionPaymentModal').foundation('reveal', 'close');
				$('#subsChgPayErrMsg').css('display', 'block');
				
			}, true);			
	},
	
	updatePayAddress : function(pId, sOrderId, mySubId) {
		console.log("###updatePayAddress:"+pId+","+sOrderId+","+mySubId);

		var params = {};
		params.paymentId = pId;
		params.mySubId = mySubId;
		params.sOrderId = sOrderId;
		params.updateBillAddFlow=true;
		var ssoFlag = $('#ssoEnabled').text();
		console.log(ssoFlag);

		 _showProgress();
		hpStoreUtils.ajax(_checkoutURLs.subsOrdPayUpdateUrl, 'POST', $.extend(
				params, _commonParams), function(data, status, jqXHR) {
			data = data.replace('/*', '').replace('*/', '').trim();
			var response = JSON.parse(data);
			_hideProgress();
			if(ssoFlag !=null && (ssoFlag == 'TRUE'||ssoFlag =='true')){
				window.location.href = getAbsoluteURL()+"MyManageSubscriptionsView?catalogId=10051&storeId=10151&langId=-1&fromPGS=true&mySubId="+mySubId+"&sOrderId="+sOrderId;
			}else
				window.location.href = getAbsoluteURL()+"MyManageSubscriptionsView?catalogId=10051&storeId=10151&langId=-1&fromPGS=true&mySubId="+mySubId;
		}, function(jqXHR, status, err) {
			_hideProgress();
			console.error('Unable to get PHC response : ' + err);
			console.error('###Unable to process your request:' + status + " Kindly try again...");
			// window.location.href = getAbsoluteURL()+"savedCCEditAddress?catalogId=10051&storeId=10151&langId=-1&isSubsCard=true&paymentId=11011&sOrderId=H3219901&mySubId=251";
		}, true);	
	},

};

var loadCCIFrame = function() {
	var pgsIFrameURL = $('#pgsIFrameURL').val();
	var tldKey = $('#sOrderId').val() + '-' + _getTime() + '-10151';

	$('#tldKey').val(tldKey);
	$('#iFramePayload').html(_getIFrameData(tldKey));

	$('textarea#txtphcRequest').val($('#iFramePayload').html());
	var data = {
		phcRequest : $('#txtphcRequest').val()
	};

	console.log('###Loading iframe using:' + data);
	postToIframe(data, pgsIFrameURL, 'pgsIframe');
};

var _getIFrameData = function(tlData) {	
	var phcJSON = JSON.parse($('#iFramePayload').html().replace(/\n/g, "").replace(/\t/g,""));			
	phcJSON.CustomField = tlData;
	phcJSON.CustomerID = tlData;

	// console.log('###current return key:'+phcJSON.ReturnKey_Continue);
	if (phcJSON.ReturnKey_Continue.indexOf('tld=') > -1) {
		var rk = phcJSON.ReturnKey_Continue;
		phcJSON.ReturnKey_Continue = rk.substring(0, rk.indexOf('&amp;tld'));
		// console.log('###after removing tld:'+ phcJSON.ReturnKey_Continue);
	}
	phcJSON.ReturnKey_Continue = phcJSON.ReturnKey_Continue + '&amp;tld='
			+ tlData;
	// console.log('###new return key:'+phcJSON.ReturnKey_Continue);

	return JSON.stringify(phcJSON);
};

var _getTime = function() {
	return (new Date()).getTime();
};

var postToIframe = function(data, url, target) {
	$('<form>').attr('method', 'post').attr('id', 'postToIframe').attr(
			'action', url).attr('target', target).appendTo('body');
	$.each(data, function(n, v) {
		$('<input>').attr('type', 'hidden').attr('name', n).attr('value', v)
				.appendTo('#postToIframe');
	});
	$('#postToIframe').submit().remove();
	
	if (document.getElementById('commonLoadingOverlay') != null) {
		document.getElementById('commonLoadingOverlay').style.display = "none";
	}
};

var submitIFrame = function() {
	alert('###About to submit IFrame');
	var iframeWin = document.getElementById("pgsIframe").contentWindow;

	var msg = new Object();
	msg.ActionCode = 'PGSSubmit';
	iframeWin.postMessage(JSON.stringify(msg), '*');
};

  $('body').delegate("#updateSubPaymentMethod", {
				"keydown": function(event) {
					if(event.type == "keydown" && event.keyCode != 13)
						return;
					$target = $(event.target);
					event.stopPropagation();
					$('#changeSubscriptionPaymentModal').foundation('reveal', 'close');
					SubscriptionSavedCardJS.updatePayCard();
				},	
				"click": function(event) {
					 if(event.type == "keydown" && event.keyCode != 13)
						return;					
					$target = $(event.target);
					event.stopPropagation();
					$('#changeSubscriptionPaymentModal').foundation('reveal', 'close');
				SubscriptionSavedCardJS.updatePayCard();
				}
  });
	  
  $('body').delegate("#cancelSubPaymentMethod", {
				"keydown": function(event) {
					if(event.type == "keydown" && event.keyCode != 13)
						return;
					$target = $(event.target);
					event.stopPropagation();
					$('#changeSubscriptionPaymentModal').foundation('reveal', 'close');
			//	var mySubId=$("#mySubId").val();
			//	window.location.href = getAbsoluteURL()+"MyManageSubscriptionsView?catalogId=10051&storeId=10151&langId=-1&mySubId="+mySubId;
				},	
				"click": function(event) {
					 if(event.type == "keydown" && event.keyCode != 13)
						return;					
					$target = $(event.target);
					event.stopPropagation();
					$('#changeSubscriptionPaymentModal').foundation('reveal', 'close');
			//		var mySubId=$("#mySubId").val();
			//	window.location.href = getAbsoluteURL()+"MyManageSubscriptionsView?catalogId=10051&storeId=10151&langId=-1&mySubId="+mySubId;
				}
  });
  
  
$(document).ready(function() {
	
	var req = new XMLHttpRequest();
	req.open('GET', document.location, false);
	req.send(null);
	var headers = req.getAllResponseHeaders().toLowerCase();
	console.log("###Headers(SubscriptionSavedCard.js):"+headers);
	
	if(!_isEmptyString($('#iFramePayload').html())){
		loadCCIFrame();
	}
	
	if(!_isEmptyString($('#hasValidSOCard').val()) && $('#subsErrMsg').val() != undefined && $('#hasValidSOCard').val()=='false'){
		document.getElementById('subsErrMsg').style.display = "block";
	}
	
	if($('#lnkANC').val() != undefined && !_isEmptyString($('#curPayId').val())){
		var lnk=$('#lnkANC').attr('href');
		lnk=lnk+'&paymentId='+$('#curPayId').val();
		$('#lnkANC').attr('href',lnk);
	}
	
});
