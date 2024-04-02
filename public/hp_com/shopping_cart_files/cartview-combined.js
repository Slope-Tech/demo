jQuery.cartUtils = (function ($) {
	//holds URLs
	var delectCartFlag=false;
	
    var ecpPopupShow = true;

	var _cartURLs = {};
	if (window.hpStoreUtils && typeof(hpStoreUtils.getCartUrls) == 'function') {
		_cartURLs = hpStoreUtils.getCartUrls();
	}
	//holds default parameters for AJAX call
	var _commonParams = {};
	if (window.hpStoreUtils && typeof(hpStoreUtils.getStoreConfig) == 'function') {
		_commonParams = hpStoreUtils.getStoreConfig();
	}

	var _isCCF = function () {
		if (_commonParams['ccf']) {
			return (_commonParams['ccf'] == 'true');
		}
		return false;
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
		
	var _showErrMsg = function (errMsg) {
		// add code here
		_disableCheckout();
		_hideProgress();
	};

	var _disableCheckout = function () {
		// add code here
	};
	
	var _stickyCart = function () {
		console.log('Ajax Refresh.');
		$('#rtRailD .rtPadding').remove();
		$(".rtPadding").appendTo("#rtRailD");
		//if($.cartUtils.isOptimizelyCart()){
		$(".detailed-order-summary").appendTo("#mobileOrderSummary");
		$('<div class="xocart_total" id="xocart_total"></div>').appendTo("#mobileOrderSummary");
		$(".voucher_layout").appendTo("#xocart_total");
		//}
		$('.rtContainer .rtPadding').remove();
		$(this).find('.xo_cart .rtContent .lblRcCartTotal, .xo_cart .rtContent .lblRcTotalVal, .xo_cart .rtContent .lblRcSaved, .xo_cart .saveforlater, .xo_cart .lcsubHeader, .xo_cart .rtContainer .rtPadding').css('display', 'none');
	};
	var _checkForInvalidCoupon = function () {
		// add code here
	};

	var _toggleError = function ($ele, setErr, errMsg) {
		var $parent = $ele.parents('.inputTextField');
		$parent.removeClass('errorHighlight');
		$parent.find('.errorClass').text(errMsg);
		if (setErr) {
			$parent.addClass('errorHighlight');
		}
	};
	
	var _toggleSecError = function ($ele, setErr, errMsg) {
		if (setErr) {
			$ele.find('.carterrormsg').text(errMsg).removeClass('hideComp');
		} else {
			$ele.find('.carterrormsg').text('').addClass('hideComp');
		}
	};
	
	var _isValidCoupon = function (s) {
		return (s.indexOf(',') == -1 && s.indexOf(';') == -1);
	};

	var _isValidEmail = function (s) {
		return s != null && s.match(/^[a-zA-Z0-9._+=-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/);
	};
	
	var _isValidPasswd = function (s) {
		return !_isEmptyString(s);
	};
	
	var _isValidZip = function (s) {
		return s != null && s.match(/^(?!00000)\d{5}$/) != null;
	};
	
	//APIs
	return {
		init: function (params) {
			_commonParams = {};
			$.extend(_commonParams, params);
		},

		addAjaxCommonParams: function (params) {
			$.extend(_commonParams, params);
		},
		getItemOmniData: function () {
	    	return $("[id^='qty_']").map(function() {
				if ($(this).data('omni')) {
					return $(this).data('omni');
				}
			}).get();
		},
		getItemsOmniData: function () {
	    	return $("[id^='cItem'] [id^='qty_']").map(function() {
				if ($(this).data('omni')) {
					return $(this).data('omni');
				}
			}).get();
		},
    	setPromoCode: function (promoCode) {
    		console.log('Set any default promo code');
    		if( promoCode && promoCode.trim().length > 0 ) {
    			$('#promoCode').val();
         		$('#nocoupon').hide();
    			$('#addcoupon').show();
    		}
    	},

    	setCartCookie: function () {
			var cartTotalQty = parseInt($('#CookieQty').val());
			if (cartTotalQty > 3) {
				cartTotalQty = '3+';
			}
			$.cookie.raw = true;
			$.cookie($('#CookieName').val(), cartTotalQty, { domain : $('#CookieDomain').val(), path : $('#CookiePath').val(), expires : 60 });
		},		

		refreshPage: function (params) {
			if (!params) {
				params = {};
			}
			params.ajax = 'true';
			hpStoreUtils.ajax(_cartURLs.refreshCartItemsUrl, 'GET', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					$('#xocartmain').html($(data).find('#xocartmain').html());
					if(matchMedia("screen and (max-width : 720px)").matches) {
					_stickyCart();			
                    $('.cartRt').html($(data).find('.cartRt').html());
					$('.cartLt').html($(data).find('.cartLt').html());
					$('.drawHeaderLt').html($(data).find('.drawHeaderLt').html());
					}
					_checkForInvalidCoupon();
					if(delectCartFlag)
					{
						delectCartFlag =false;
						var onlyArvato = document.getElementById('onlyArvato');
						if((onlyArvato!=null)&&(typeof onlyArvato !== "undefined"))
						{
							var onlyArvatoValue=onlyArvato.value;			
							if(onlyArvatoValue != null && onlyArvatoValue==='yes')
								$.cartUtils.updateShipMethod(12056);
						}
						var onlySubSKU = document.getElementById('onlySubSKU');
						if((onlySubSKU!=null)&&(typeof onlySubSKU !== "undefined"))
						{
							var onlySubSKUValue=onlySubSKU.value;	
							if(onlySubSKUValue != null && onlySubSKUValue==='yes')
								$.cartUtils.updateShipMethod(12056);
						}
					
					}
					if (sfEvent.CART_PAGE_REFRESHED) {
						$.publish(sfEvent.CART_PAGE_REFRESHED);
					}
					setTimeout(function () {
						$(document).trigger('readyAgain');
						$.hpsfData.refreshCartPriceInventoryStoreData();
						$.cartUtils.checkCTOonfig();
						
					}, 100);
				},
				function (jqXHR, status, err) {
					console.error('Unable to refresh cart page : ' + err);
					_showErrMsg(err);
					_hideProgress();
				}
			);
		},
		
		checkCTOonfig: function(){
			var params = {};
			params.orderID = $('#orderId').val().trim();
			/*params.isReOrderFlag = $('#isReorder').val();*/
			params.isReOrderFlag = true;
			console.log("before ajax call for CTO val call params.orderID : "+params.orderID);
			_showProgress();
			hpStoreUtils.ajax(_cartURLs.ctoValidationUrl, 'POST', $.extend(params, _commonParams),
			function(data, status, jqXHR) {
				var i=0;
				var inValidConfig = "This configuration is currently unavailable. Click Back to Cart to reconfigure ";
				var quoteOrderMsg = "Sorry, this configuration is no longer available, hence the quote is not valid anymore. Please create a new configuration and quote.";
				data = data.replace('/*','').replace('*/','').trim();
				var response = JSON.parse(data);
				console.log("CTOerrormsg: "+response.CTOerrormsg);
				console.log("ctoExcpMsg: "+response.ctoExcpMsg);
				if(response.CTOerrormsg!="NA" && response.CTOerrormsg !="" && response.CTOerrormsg!=null){
					var ctoRule = response.CTOerrormsg;
					var ctoExpRule=ctoRule.split("@@");
					for (i = 0; i < ctoExpRule.length; i++) { 
						var oiIdSku = ctoExpRule[i].split("_");
						if(oiIdSku.length>1){
							if(oiIdSku[2]!=null && oiIdSku[2]!="" && oiIdSku[2]=="y")
								$('#cItem'+oiIdSku[0]+' .carterrormsg.ctoErr').removeClass('hideComp').html(quoteOrderMsg);
							else
								$('#cItem'+oiIdSku[0]+' .carterrormsg.ctoErr').removeClass('hideComp').html(inValidConfig+oiIdSku[1]);
						}
					}
					$('#xo_btn,#xo_guestbtn').removeClass('bluebtn_login').addClass('btn_disabled');
					$('.checkoutwithpaypal').addClass('btnp_disabled');
					$('.checkoutwithpaypalcredit').addClass('btnp_disabled');
					$('#paypalCart').addClass('btnp_disabled');
					$('#paypalCreditCart').addClass('btnp_disabled');
				}
				if(response.ctoExcpMsg!="NA" && response.ctoExcpMsg !="" && response.ctoExcpMsg!=null){
					var ctoRuleExcp=response.ctoExcpMsg;
					var ctoExcepRule=ctoRuleExcp.split("@@");
					for (i = 0; i < ctoExcepRule.length; i++) { 
						var oiIdSku = ctoExcepRule[i].split("_");
						if(oiIdSku.length>0){
					
								$('#cItem'+oiIdSku[0]+' .carterrormsg.ctoRuleErr').removeClass('hideComp').html(oiIdSku[1]);
							
						}
					}
					
					$('#xo_btn,#xo_guestbtn').removeClass('bluebtn_login').addClass('btn_disabled');
					$('.checkoutwithpaypal').addClass('btnp_disabled');
					$('.checkoutwithpaypalcredit').addClass('btnp_disabled');
					$('#paypalCart').addClass('btnp_disabled');
					$('#paypalCreditCart').addClass('btnp_disabled');
				}
				_hideProgress();
			},
			function(jqXHR, status, err) {
				console.log("Validate Confguration command errored out : "+err);
				_hideProgress();
			},
			true
			);
		},

		/* Loyalty 1.0 (deprecated and no longer used) */
		removeInvalidCoupon: function (params) {
			if (!params) {
				params = {};
			}
			console.log('Remove InvalidCoupon called');
			hpStoreUtils.ajax(_cartURLs.loyaltyCouponEligibilityUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					data = data.replace('/*','').replace('*/','').trim();
					var response = JSON.parse(data);
					var removeLC = response.removeSA;
					var orderIde = response.orderId;
					var CouponValue = response.prCode;
					if (removeLC == true) {
						$.cartUtils.removeCouponCodeCheckBox(CouponValue, orderId);
					} else {
						$.cartUtils.refreshPage(params);
					}
				},
				function (jqXHR, status, err) {
					$.cartUtils.refreshPage(params);
					console.error('error while checking invalidity ' + err);
					_showErrMsg(err);
				},
				true
			);
		},
		
		updateCarePackECPDataExtn: function (params) {
			if (!params) {
				params = {};
			}
			console.log('updateCarePackECPDataExtn called');
			hpStoreUtils.ajax(_cartURLs.carePackUpdateECPDataExtnCmd, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					data = data.replace('/*','').replace('*/','').trim();
					console.log('updated carepack ecpdataextn ');
					$.cartUtils.refreshPage();
				},
				function (jqXHR, status, err) {
					console.error('error while updating carepack ecpdataextn ' + err);
					_showErrMsg(err);
				},
				true
			);
		},
		
		updateItemAnalytics: function (orderItemId, oldQty, newQty) {
			var diffQty = 1;
			if(newQty - oldQty > 0){
				diffQty = newQty - oldQty;
			}else {
				diffQty = oldQty - newQty;
			}
			var dataOmni = $('#qty_' +orderItemId).data("omni");
			var unitPrice = (parseFloat(dataOmni.totalPrice.replaceAll(",", ""))/dataOmni.qty).toFixed(2);
			var productArray = new Array();
			$.each(_tempOmni, function (i, data) {		
				if(dataOmni != undefined && data.partNumber == dataOmni.partNumber && productArray.length == 0){
					productArray.push({
						"name": data.pn,
						"id": data.partNumber,
						"price": unitPrice,
						"quantity": diffQty,
						"brand": data.productBrand,
						"category": data.productCategory,
						"variant": data.productVariant
					});
				}
			});
			if(newQty - oldQty > 0){
				dataLayer.push({
					event: 'e_addToCart',
					cartID: $.hpsfData.getCartData().id,
					ecommerce: {
						currencyCode: 'USD',
						add: {
							     newCart: false, //optional, only for first item in cart PENDING         
							     detail: {
							        actionField: {list: 'cart'}
							     },
							     products: productArray
						}			
					}
				});
			}else{
				dataLayer.push({
					event: 'e_removeFromCart',			
					ecommerce: {
						currencyCode: 'USD',
						remove: {					     
							 products: productArray
						}			
					}
				});
			}
			
		},
		
		updateItemQty: function (orderItemId, newQty) {
			$('#xoCartErr').html('').addClass('hideComp');
			console.log('Update cart item : ' + orderItemId + ', newQty: ' + newQty);
			var params = {};
			var cartData = $.hpsfData.getCartData();
			
			var isCCCarepackFlow = false;
			if($.cartUtils.isCCFlow()) {
				if (cartData.items) {
		        	$.each(cartData.items, function(idx, item) {
		        		if(typeof item.isStandAlooneCrPack !== 'undefined' && (item.id === orderItemId)) {
		        			isCCCarepackFlow = true;
		        		}
		        	});
		        }
			}
			
			var field2=cartData.ordItmFld2;
			var crPkOrdrItmId;
			var newCarPkQty;
			var ctoPrtNumNConfgID = $('#qty_'+orderItemId).data('omni').ctoPrtNumNConfgID;
			if(ctoPrtNumNConfgID != undefined){
			var partNum = ctoPrtNumNConfgID;	
			}else{
			var partNum = $('#qty_'+orderItemId).data('omni').partNumber;
			}
			
			params.orderId = $('#orderId').val().trim();
			
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';

			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0) {
				params.redeemPoints = loyalty.redeemedPoints;
			}

			params.inventoryValidation = 'true';
			if(field2[partNum] != undefined){
				var fld2Vals = field2[partNum];
				crPkOrdrItmId = Object.keys(fld2Vals)[0];
				params.orderItemId_1 = orderItemId;
				params.orderItemId_2 = crPkOrdrItmId;
				params.quantity_1 = newQty;
				params.quantity_2 = newQty;
				
				
			}else{
			params.orderItemId = orderItemId;
			params.quantity = newQty;
			}
			_showProgress();
			hpStoreUtils.ajax(_cartURLs.updateCartItemUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					console.log('Updated cart quantity');
					$('#qty_'+crPkOrdrItmId).val(newCarPkQty);
					$.subscribe(sfEvent.CART_PAGE_REFRESHED, function () {
						var priceList = new Array();
						var qtyList = new Array();
						var skuList = new Array();
						var itemOmniData = $.cartUtils.getItemOmniData();
						$.each(itemOmniData, function (i, data) {
							skuList.push(data.partNumber);
							priceList.push(data.totalPrice);
							qtyList.push(data.qty);
						});
						if (skuList && priceList && qtyList) {
							CartQuantityChange(skuList, priceList, qtyList);
						}
					});
					//$.cartUtils.removeInvalidCoupon(params);
					if(isCCCarepackFlow) {
						var eCarePackSN = $('#multi_cp_textarea').val();
						params.eCarepackSNs = eCarePackSN;
						$.cartUtils.updateCarePackECPDataExtn(params);
					} else {
						$.cartUtils.refreshPage();
					}
				},
				function (jqXHR, status, err) {
					console.error('Unable to update cart item qty : ' + err);
					if(status=='_ERR_DIDNT_LOGON')
					{
						$('#xoCartErr').html($('#sstoErrMsg').val()).removeClass('hideComp');
					}
					else{
					$('#xoCartErr').html(err).removeClass('hideComp');
					}
					var eQty = $('#qty_' + orderItemId);
					eQty.val(eQty.data('ui').qty);
					_hideProgress();
					$(window).scrollTop($('#xocartmain').offset().top);
				},
				true
			);
		},
		updateItemQtyforCarepack: function (orderItemId, newQty, field2) {
			$('#xoCartErr').html('').addClass('hideComp');
			console.log('Update cart item : ' + orderItemId + ', newQty: ' + newQty);
			var params = {};
			params.orderId = $('#orderId').val().trim();
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0) {
				params.redeemPoints = loyalty.redeemedPoints;
			}

			params.inventoryValidation = 'true';
			params.orderItemId = orderItemId;
			params.quantity = newQty;
			params.comment = field2;
			_showProgress();
			
			hpStoreUtils.ajax(_cartURLs.updateCartItemUrl, 'POST', $.extend(params, _commonParams),
					function (data, status, jqXHR) {
						console.log('Updated cart quantity');
						$.cartUtils.refreshPage();
//						_hideProgress();
					},
					function (jqXHR, status, err) {
						console.error('Unable to update cart item qty : ' + err);
						if(status=='_ERR_DIDNT_LOGON')
						{
							$('#xoCartErr').html($('#sstoErrMsg').val()).removeClass('hideComp');
						}
						else{
							$('#xoCartErr').html(err).removeClass('hideComp');
						}
						var eQty = $('#qty_' + orderItemId);
						eQty.val(eQty.data('ui').qty);
						_hideProgress();
						$(window).scrollTop($('#xocartmain').offset().top);
					},
					true
				);
		},
		showRemove: function (ui) {
			if (_isCCF()) {
				var multOrdItems = "";
				var ctoPrtNumNConfgID = $('#qty_' + ui.id).data('omni').ctoPrtNumNConfgID;
				if(ctoPrtNumNConfgID != undefined){
				var currentParNum = ctoPrtNumNConfgID;	
				}else{
					var currentParNum =  $('#qty_' + ui.id).data('omni').partNumber;
				}
				var cartData = $.hpsfData.getCartData();
				var crPackAssns=cartData.ordItmFld2;
				if(crPackAssns[currentParNum] != undefined && crPackAssns[currentParNum] != null)
				{
					var currentCarPacksAssoc = crPackAssns[currentParNum];
					if(currentCarPacksAssoc != undefined && currentCarPacksAssoc != null)
						{
							$.each(currentCarPacksAssoc, function(key, value) {
								multOrdItems = multOrdItems + '|' + key;
							});
							//we have to remove the hardware too
							multOrdItems = multOrdItems + '|' + ui.id;
							$.cartUtils.removeAssociatedCarePacks(multOrdItems);
						}
				}
				else
					{
						$.cartUtils.removeItem(ui.id);
					}
			} else {
				var $this = $('#imageGallery');
				$this.find('h3').html($this.find('h3').data('title') + ' "' + ui.pn + '"?');
				$this.find('.prodImage').attr('src', ui.img);
				$this.find('.prodImage').attr('alt', ui.pn);
				$this.find('.delete').attr('role','button');
				$this.find('.delete').attr('aria-label','Delete from cart for product '+ui.pn);
				$this.data('sku', ui.sku);
				$this.data('item', ui.id);
				$this.data('action', 'none');
				$this.foundation('reveal', 'open');
				$('.reveal-modal-bg').css('display','block');
				setTimeout(function(){
					$this.find('#dlpopup-close').focus();
				},2000);
			}
		},
		
		updateItemNotification: function (orderItemId, orderId) {
			var params = {};
			params.orderId = orderId;
			params.calculateOrder = '0';
			params.inventoryValidation = 'false';
			params.orderItemId = orderItemId;
			params.changePriceNotification='OFF';
			hpStoreUtils.ajaxAsync(_cartURLs.updateCartItemUrl, 'POST', params);
		},
		
		updateOrderPriceChangeNotification: function (orderId) {
			var params = {};
			params.orderId = orderId;
			params.calculateOrder = '0';
			params.inventoryValidation = 'false';
			params.changePriceNotificationOrder='OFF';
			hpStoreUtils.ajaxAsyncTrue(_cartURLs.updateCartItemUrl, 'POST', params);
		},

		removeItem: function (orderItemId) {
			_showProgress();
			console.log('Remove cart item : ' + orderItemId);
			var params = {};
			params.orderId = $('#orderId').val().trim();
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0) {
				params.redeemPoints = loyalty.redeemedPoints;
			}
			params.check = '*n';
			params.orderItemId = orderItemId;
			var dataOmni = $('#qty_' +orderItemId).data("omni");
			var productArray = new Array();
			$.each(_tempOmni, function (i, data) {		
				if(dataOmni != undefined && data.partNumber == dataOmni.partNumber && productArray.length == 0){
					productArray.push({
						"name": data.pn,
						"id": data.partNumber,
						"price": data.totalPrice,
						"quantity": data.qty,
						"brand": data.productBrand,
						"category": data.productCategory,
						"variant": data.productVariant
					});
				}
			});
			hpStoreUtils.ajax(_cartURLs.removeCartItemUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					console.log('Removed cart item');
					delectCartFlag=true;									
					//$.cartUtils.removeInvalidCoupon(params);
					if(cartCarePackOitems != undefined && cartCarePackOitems.length > 0){
						var index = cartCarePackOitems.indexOf(parseInt(orderItemId));
						if (index > -1) {
							cartCarePackOitems.splice(index, 1);
						}
					}
					$.cartUtils.refreshPage();
					if(dataOmni != undefined){
						sendRemoveEventToOmniture(productArray);
					}
				},
				function (jqXHR, status, err) {
					console.error('Unable to remove cart item : ' + err);
					_showErrMsg(err);
				},
				true
			);
		},		
		// Start : Ideas_20 :Remove Free Gift Item
		removeItemFreeGift: function (orderItemId) {
			_showProgress();
			console.log('Remove cart item : ' + orderItemId);
			var params = {};
			params.orderId = $('#orderId').val().trim();
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0) {
				params.redeemPoints = loyalty.redeemedPoints;
			}
			params.check = 'FreeGiftRemoval';
			params.orderItemId = orderItemId;
			var dataOmni = $('#qty_' +orderItemId).data("omni");
			var productArray = new Array();
			$.each(_tempOmni, function (i, data) {		
				if(dataOmni != undefined && data.partNumber == dataOmni.partNumber && productArray.length == 0){
					productArray.push({
						"name": data.pn,
						"id": data.partNumber,
						"price": data.totalPrice,
						"quantity": data.qty,
						"brand": data.productBrand,
						"category": data.productCategory,
						"variant": data.productVariant
					});
				}
			});
			hpStoreUtils.ajax(_cartURLs.removeCartItemUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					console.log('Removed cart item');
					delectCartFlag=true;									
					//$.cartUtils.removeInvalidCoupon(params);
					if(cartCarePackOitems != undefined && cartCarePackOitems.length > 0){
						var index = cartCarePackOitems.indexOf(parseInt(orderItemId));
						if (index > -1) {
							cartCarePackOitems.splice(index, 1);
						}
					}
					$.cartUtils.refreshPage();
					if(dataOmni != undefined){
						sendRemoveEventToOmniture(productArray);
					}
				},
				function (jqXHR, status, err) {
					console.error('Unable to remove cart item : ' + err);
					_showErrMsg(err);
				},
				true
			);
		},
		// END : Changes Ideas_20 :Remove Free Gift Item
		// ADD to CART ecarepack
		addToCartEC: function (ui) {
			$('#xoCartErr').html('').addClass('hideComp');
			var params = {};
			params.orderId = $('#orderId').val().trim();
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			params.inventoryValidation = 'true';
			params.quantity = ui.qty;
			params.isGC='N';
			params.updatePrices='1';
			params.elgblSku=ui.elgblSku;
			params.requesttype='ajax';
			params.catEntryId=ui.id;
			
			_showProgress();
			hpStoreUtils.ajax(_cartURLs.carePackAddToCart, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					console.log('Add to Cart ecarepack');
				$.cartUtils.refreshPage();
				},
				function (jqXHR, status, err) {
					console.error('Unable to ADD cart item  : ' + err);
					if(status=='_ERR_DIDNT_LOGON')
					{
						$('#xoCartErr').html($('#sstoErrMsg').val()).removeClass('hideComp');
					}
					else{
					$('#xoCartErr').html(err).removeClass('hideComp');
					}
					_hideProgress();
					$(window).scrollTop($('#xocartmain').offset().top);
				},
				true
			);
		},
		
		
		
		/*#DeleteAllCartItems*/
		cartclear: function () {
			_showProgress();
			
			var params = {};
			params.orderId = $('#orderId').val().trim();
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.check = '*n';
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0) {
				params.redeemPoints = loyalty.redeemedPoints;
			}
			
			var orderItemIds=$('#orderItemIds').val();
			
			
			var orderItms = orderItemIds.split('|');
			for (i = 0; i < orderItms.length; i++)
				{
				orderItmsKey = 'orderItemId_'+i;
				params[orderItmsKey] = orderItms[i];
				
			}	
			
			hpStoreUtils.ajax(_cartURLs.removeCartItemUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
				
					$('#xocart-removeItems-modal').foundation('reveal', 'close');
					$('.reveal-modal-bg').css('display','none');
					$.cartUtils.refreshPage();
					_hideProgress();
					
				},
				function (jqXHR, status, err) {
					console.error('Unable to remove cart item : ' + err);
					_showErrMsg(err);
				},
				true
			);
		},

		removeAssociatedCarePacks: function (orderItemId) {
			_showProgress();
			console.log('Remove cart items : ' + orderItemId);
			var params = {};
			var orderItms;
			var orderItmsKey = '';
			params.orderId = $('#orderId').val().trim();
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0) {
				params.redeemPoints = loyalty.redeemedPoints;
			}

			params.check = '*n';
			if(orderItemId.indexOf('|') != -1)
				{
				orderItms = orderItemId.split('|');
				for (i = 0; i < orderItms.length; i++) 
					{
					if(orderItms[i] != null && orderItms[i] != '')
						{
						orderItmsKey = 'orderItemId_'+i;
						params[orderItmsKey] = orderItms[i];
						}
					
					}
				}
			else
				{
				params.orderItemId = orderItemId;
				}
			
			var dataOmni = {};
			if(orderItms != null && orderItms != '')
			{
				for (i = 0; i < orderItms.length; i++) 
				{
					if(orderItms[i] != null && orderItms[i] != '')
						{
						dataOmni[i] = $('#qty_' +orderItms[i]).data("omni");
						}
				}
			}
			hpStoreUtils.ajax(_cartURLs.removeCartItemUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					console.log('Removed cart item');
					//$.cartUtils.removeInvalidCoupon(params);
					$.cartUtils.refreshPage();
					if(orderItms != null && orderItms != '')
						{
						for (i = 0; i < orderItms.length; i++) 
						{
							if(orderItms[i] != null && orderItms[i] != '')
								{
								sendRemoveEventToOmniture("new.page", dataOmni[i].partNumber, dataOmni[i].totalPrice, dataOmni[i].qty);
								}
						}
						}
					else
						{
						dataOmni = $('#qty_' +orderItemId).data("omni");
						sendRemoveEventToOmniture("new.page", dataOmni.partNumber, dataOmni.totalPrice, dataOmni.qty);
						}
					
				},
				function (jqXHR, status, err) {
					console.error('Unable to remove cart item : ' + err);
					_showErrMsg(err);
				},
				true
			);
		},
		
		updateShipMethod: function (shipModeId) {
			_showProgress();
			var params = {};
			params.orderId = $('#orderId').val().trim();
			params.shipModeId = shipModeId;
			hpStoreUtils.ajax(_cartURLs.updateShippingMethodUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					console.log('Updated ship method');
					$.cartUtils.refreshPage();
					
					//data = data.replace("/*", "");
					//data = data.replace("*/", "");
					//var jsonData = JSON.parse(data);
					//console.log("shipMethodShortDesc : "+jsonData.shipMethodShortDesc);*/
					//eddRangeAnalytics('cart - shipping selected', jsonData.shipMethodShortDesc);
				},
				function (jqXHR, status, err) {
					console.error('Unable to update ship method : ' + err);
					_showErrMsg(err);
				},
				true
			);
		},
		
		
		removeCouponCodeCheckBox: function (couponCode,orderId) {
			_showProgress();
			var params = {};
			params.orderId = $('#orderId').val().trim();
			//params.promoCode = $this.data('cpn').trim();
			params.promoCode = couponCode; 
			params.taskType = 'R';
			params.fromCheckbox="true";
			if (params.promoCode) {
				hpStoreUtils.ajax(_cartURLs.appyCouponCodeUrl, 'POST', $.extend(params, _commonParams),
					function(data, status, jqXHR) {
						data = data.replace('/*','').replace('*/','').trim();
						var response = JSON.parse(data);
						$.cartUtils.updateCartOnCoupon(response);
					},
					function(jqXHR, status, err) {
						console.error('Unable to remove coupon code : ' + err);
						_showErrMsg(err);
					},
					true
				);
			}
		},
		
		applyCouponCodeCheckBox: function (couponCode,orderId) {
			var cpnCode = $('#cpnCode');
			var cpnErrMsgDiv = $('#cpnErrMsg');
			
			if($(window).width() < 1000){
				cpnErrMsgDiv = $('#cpnErrMsgMobile');
			}else{
				cpnErrMsgDiv = $('#cpnErrMsg');
			}
			_showProgress();
			cpnCode.removeClass('errorstate');
			cpnErrMsgDiv.addClass('hideComp');
			var params = {};
			params.orderId = $('#orderId').val().trim();
			//params.promoCode = cpnCode.val().trim();
			params.promoCode = couponCode;
			params.taskType = 'A';
			params.finalView = 'AjaxOrderItemDisplayView';
			params.fromCheckbox="true";
			 
			hpStoreUtils.ajax(_cartURLs.appyCouponCodeUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					data = data.replace('/*','').replace('*/','').trim();
					var response = JSON.parse(data);
					$.cartUtils.updateCartOnCoupon(response);
				},
				function (jqXHR, status, err){
					console.log('Unable to apply coupon code : ' + err);
					cpnCode.addClass('errorstate');
					if (status=='_ERR_DIDNT_LOGON')
					{
						cpnErrMsgDiv.html($('#sstoErrMsg').val()).removeClass('hideComp');	
					}	
					else{
						cpnErrMsgDiv.text(err).removeClass('hideComp');
					}
					$this = $('.xocart_total .couponCode a.applyCoupon.apply');
					$this.parents('.couponCode').find('.applyCoupon.apply').addClass('hideComp');
					$this.parents('.couponCode').find('.applyCoupon.clear').removeClass('hideComp');
					_hideProgress();
				},
				true
			);
		},
		
		//HPEUS -3034 apply coupon begin
		applyCoupon: function ($this) {
			var cpnCode = $('#cpnCode');
			var loyaltyAmt = $('#loyaltyEligibleAmt');
			var isLoyaltyEligible = $('#isLoyaltyProd');
			var cpnErrMsgDiv= $('#cpnErrMsg');
			
			if($(window).width() < 1000){
				cpnErrMsgDiv =$('#cpnErrMsgMobile');
			}else{
				cpnErrMsgDiv =$('#cpnErrMsg');
			}
			
			if($('body').find('#applied-coupon-tag').length > 0){
				$('#oneCouponPerOrderNotification').removeClass('hideComp');
				/*$('.applyCoupon.applied').addClass('hideComp');	*/		
				$('#couponApplied').addClass('hideComp');
				return;
			}
			
			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0 && loyalty.redeemPromoCode === 'NO_REDEEM_PROMO_CODE') {
				$('#cpnErrMsg').text('Sorry, you can not combine HP Rewards with Ink & toner coupons.').removeClass('hideComp');
				$this.parents('.couponCode').find('.applyCoupon.apply').removeClass('hideComp');
				$this.parents('.couponCode').find('.applyCoupon.clear').addClass('hideComp');
				return;
			}

			if (!_isValidCoupon(cpnCode.val().trim())) {
				cpnCode.addClass('error_msg');				
				cpnErrMsgDiv.text(cpnCode.data('errinv')).removeClass('hideComp');
				
				$this.parents('.couponCode').find('.applyCoupon.apply').removeClass('hideComp');
				/*$this.parents('.couponCode').find('.applyCoupon.clear').addClass('hideComp');*/
				setCouponCodeTrackEvent(cpnCode.val().trim(), 'false');
				return;
			}
			_showProgress();
			cpnCode.removeClass('error_msg');
			cpnErrMsgDiv.addClass('hideComp');
			var params = {};
			params.orderId = $('#orderId').val().trim();
			params.promoCode = cpnCode.val().trim();
			params.taskType = 'A';
			params.token = $('#token').val();

			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0) {
				params.redeemPoints = loyalty.redeemedPoints;
			}

			params.finalView = 'AjaxOrderItemDisplayView';
			if (typeof loyaltyAmt != 'undefined') {
				if (null != loyaltyAmt.val()) {
					params.loyaltyAmt = loyaltyAmt.val().trim();
				}
			}
			if (typeof isLoyaltyEligible != 'undefined') {
				if (null != loyaltyAmt.val()) {
					params.isLoyaltyEligible = isLoyaltyEligible.val().trim();
					}
			}			
			params.loyaltyAmt = loyaltyAmt.val().trim();
			params.isLoyaltyEligible = isLoyaltyEligible.val().trim();
			
			hpStoreUtils.ajax(_cartURLs.appyCouponCodeUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					data = data.replace('/*','').replace('*/','').trim();
					var response = JSON.parse(data);
					$.cartUtils.updateCartOnCoupon(response);					
					$('#applyCouponLink').css({"-webkit-transition": "background-color .25s ease-out","-moz-transition": "background-color .1s ease-out","-o-transition": "background-color .25s ease-out","transition": "background-color .25s ease-out","background":"#007959","border-color": "#007959"});
					$('#applyCouponLink').addClass('apply_button_success');		
					setCouponCodeTrackEvent(cpnCode.val().trim(), 'true');					
				},
				function (jqXHR, status, err){
					console.log('Unable to apply coupon code : ' + err);
					setCouponCodeTrackEvent(cpnCode.val().trim(), 'false');
					cpnCode.addClass('error_msg');
					$("#applyCouponLink").addClass("disabled-link");
					if (status=='_ERR_DIDNT_LOGON')
					{
						cpnErrMsgDiv.html($('#sstoErrMsg').val()).removeClass('hideComp');						
					}
					else{
						cpnErrMsgDiv.text(err).removeClass('hideComp')
					}				      
					_hideProgress();
				},
				true
			);
			grecaptcha.reset(recaptcha);
		},
		//HPEUS -3034 apply coupon end
		
		updateCartOnCoupon: function(response) {
			var params = {};
			var cpnErrMsgDiv= $('#cpnErrMsg');
			
			if($(window).width() < 1000){
				cpnErrMsgDiv =$('#cpnErrMsgMobile');
			}else{
				cpnErrMsgDiv =$('#cpnErrMsg');
			}
			
			params.orderid = $('#orderId').val().trim();
			params.promoCode = response.promoCode;
			params.tasktype = response.taskType;
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			// Loyalty 2.0
			if (response.redeemPoints instanceof Array) {
				params.redeemPoints = response.redeemPoints[0];
			} else {
				params.redeemPoints = response.redeemPoints;
			}

			hpStoreUtils.ajax(_cartURLs.updateCartItemUrl, 'POST', $.extend(params, _commonParams),
				function(data, status, jqXHR) {
					$.cartUtils.refreshPage();
				},
				function(jqXHR, status, err) {
					console.error('Unable to update cart after coupon change : ' + err);
					cpnCode.addClass('errorstate');
					if (status=='_ERR_DIDNT_LOGON')
					{
						cpnErrMsgDiv.html($('#sstoErrMsg').val()).removeClass('hideComp');	
					}else{
						cpnErrMsgDiv.text(err).removeClass('hideComp');				
					}
					$this.parents('.couponCode').find('.applyCoupon.apply').addClass('hideComp');
					$this.parents('.couponCode').find('.applyCoupon.clear').removeClass('hideComp');
					_hideProgress();
				},
				true
			);
		},
		
		clearCoupon: function ($this) {
			var cpnErrMsgDiv= $('#cpnErrMsg');
			
			if($(window).width() < 1000){
				cpnErrMsgDiv =$('#cpnErrMsgMobile');
			}else{
				cpnErrMsgDiv =$('#cpnErrMsg');
			}
			$('#cpnCode').val('').removeClass('errorstate');
			cpnErrMsgDiv.text('').addClass('hideComp');
			$this.parents('.couponCode').find('.applyCoupon.clear').addClass('hideComp');
			$this.parents('.couponCode').find('.applyCoupon.apply').removeClass('hideComp');
		},
		
		removeCoupon: function ($this) {
			_showProgress();
			var params = {};
			params.orderId = $('#orderId').val().trim();
			params.promoCode = $this.data('cpn').trim();
			params.taskType = 'R';

			// Loyalty 2.0
			if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0) {
				params.redeemPoints = loyalty.redeemedPoints;
			}

			if (params.promoCode) {
				hpStoreUtils.ajax(_cartURLs.appyCouponCodeUrl, 'POST', $.extend(params, _commonParams),
					function(data, status, jqXHR) {
						data = data.replace('/*','').replace('*/','').trim();
						var response = JSON.parse(data);
						delectCartFlag=true;
						$.cartUtils.updateCartOnCoupon(response);
					},
					function(jqXHR, status, err) {
						console.error('Unable to remove coupon code : ' + err);
						_showErrMsg(err);
					},
					true
				);
			}
		},


		applyLoyalty: function ($this) {			
			var loyaltyPts = $('#pointstoredeem').val().trim();
			var params = {};
			params.orderId = $('#orderId').val().trim();
			params.usageId = -1;
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			params.redeemPoints = loyaltyPts;
			params.finalView = 'AjaxOrderItemDisplayView';
			_showProgress();
			
			hpStoreUtils.ajax(_cartURLs.updateCartItemUrl, 'POST', $.extend(params, _commonParams),
					function(data, status, jqXHR) {
						$.cartUtils.refreshPage();
					},
				function(jqXHR, status, err) {
					console.error('Unable to apply discounts : ' + err);
					//_toggleMainError(itemId, usageId, true, err);
					_hideProgress();
				},
				true
			);
		},
		
		updateCartOnLoyalty: function(response) {
			var params = {};
			params.orderid = $('#orderId').val().trim();
			params.promoCode = response.promoCode;
			params.tasktype = response.taskType;
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			var cpnErrMsgDiv = $('#cpnErrMsg');
			if($(window).width() < 1000){
				cpnErrMsgDiv = $('#cpnErrMsgMobile');
			}else{
				cpnErrMsgDiv = $('#cpnErrMsg');
			}
			
			hpStoreUtils.ajax(_cartURLs.updateCartItemUrl, 'POST', $.extend(params, _commonParams),
				function(data, status, jqXHR) {
					$.cartUtils.refreshPage();
				},
				function(jqXHR, status, err) {
					console.error('Unable to update cart after coupon change : ' + err);
					cpnCode.addClass('errorstate');
					if (status=='_ERR_DIDNT_LOGON')
					{
						cpnErrMsgDiv.html($('#sstoErrMsg').val()).removeClass('hideComp');	
					}else{
						cpnErrMsgDiv.text(err).removeClass('hideComp');
					}
					$this.parents('.couponCode').find('.applyCoupon.apply').addClass('hideComp');
					$this.parents('.couponCode').find('.applyCoupon.clear').removeClass('hideComp');
					_hideProgress();
				},
				true
			);
		},
		
		clearLoyalty: function ($this) {
			
			var cpnErrMsgDiv = $('#cpnErrMsg');
			
			if($(window).width() < 1000){
				cpnErrMsgDiv = $('#cpnErrMsgMobile');
			}else{
				cpnErrMsgDiv = $('#cpnErrMsg');
			}
			
			$('#cpnCode').val('').removeClass('errorstate');
			cpnErrMsgDiv.text('').addClass('hideComp');
			$this.parents('.couponCode').find('.applyCoupon.clear').addClass('hideComp');
			$this.parents('.couponCode').find('.applyCoupon.apply').removeClass('hideComp');
		},
		
		removeLoyalty: function ($this) {
			_showProgress();
			var params = {};
			params.orderId = $('#orderId').val().trim();
			params.promoCode = $this.data('cpn').trim();
			params.taskType = 'R';
			if (params.promoCode) {
				hpStoreUtils.ajax(_cartURLs.appyCouponCodeUrl, 'POST', $.extend(params, _commonParams),
					function(data, status, jqXHR) {
						data = data.replace('/*','').replace('*/','').trim();
						var response = JSON.parse(data);
						delectCartFlag=true;
						$.cartUtils.updateCartOnCoupon(response);
					},
					function(jqXHR, status, err) {
						console.error('Unable to remove coupon code : ' + err);
						_showErrMsg(err);
					},
					true
				);
			}
		},

		/**
		 * Applies loyalty rewards to current order.
		 * 
		 */
		applyPoints: function ($this) {
			var loyaltyPts = $('#pointstoredeem').val().trim();
			
			var errorCode = '';
			
			if(isNumeric(loyaltyPts)) {
				if (loyaltyPts < 0 ) {
					errorCode = 'negative-number';
				} else if (undefined != loyalty && loyaltyPts > loyalty.redemablePoints) {
					errorCode = 'exceeds-max';
				}
			} else {
				errorCode = 'non-numeric';
			}

			if (errorCode) {
				$this.parents('.pointsRedeem').find('.clearPoints.clear').removeClass('hideComp');
				$this.parents('.pointsRedeem').addClass('pointsError');
			} else {
				$this.parents('.pointsRedeem').removeClass('pointsError');

				var params = {};
				params.storeId = _commonParams.storeId;
				params.catalogId = _commonParams.catalogId;
				params.langId = _commonParams.langId;
				params.redeemPoints = loyaltyPts;
				
				console.log('Applying ' + params.redeemPoints  + ' loyalty reward points.');

				_showProgress();

				hpStoreUtils.ajax(_cartURLs.loyaltyRewardsApplyUrl, 'POST', params,
					function (data, status, jqXHR) {
						console.log('Applied loyalty reward points.');
						$.cartUtils.refreshPage();
					},
					function (jqXHR, status, err) {
						console.error('Error encountered while applying loyalty reward points: ' + err);
						_hideProgress();
						$(window).scrollTop($('#xocartmain').offset().top);
					},
					true
				);
			}
		},
		
		/**
		 * Resets loyalty rewards point input field value.
		 * 
		 */
		clearPoints: function ($this) {
			if (undefined != loyalty && undefined != loyalty.redemablePoints) {
				$('#pointstoredeem').val(loyalty.redemablePoints);
			} else {
				$('#pointstoredeem').val('');
			}
			$this.parents('.pointsRedeem').removeClass('pointsError');
			$this.parents('.pointsRedeem').find('.clearPoints.clear').addClass('hideComp');
			$this.parents('.pointsRedeem').find('.applyPoints.apply').removeClass('hideComp');
			$('#pointstoredeem').focus();
		},

		/**
		 * Removes applied loyalty rewards on current order.
		 * 
		 */
		resetPoints: function ($this) {
			var params = {};
			params.storeId = _commonParams.storeId;
			params.catalogId = _commonParams.catalogId;
			params.langId = _commonParams.langId;
			
			_showProgress();
			
			hpStoreUtils.ajax(_cartURLs.loyaltyRewardsRemoveUrl, 'POST', params,
				function (data, status, jqXHR) {
					console.log('Removed applied loyalty reward points.');
					$.cartUtils.refreshPage();
				},
				function (jqXHR, status, err) {
					console.error('Error encountered while removing loyalty reward points: ' + err);
					_hideProgress();
					$(window).scrollTop($('#xocartmain').offset().top);
				},
				true
			);
		},

		saveToWishList: function (skuId) {
			// Add code here
		},
		
		validInput: function ($ele, showErr) {
			var fValid = true;
			var errMsg = '';
			switch ($ele.data('vtype')) {
				case 'email':
					fValid = _isValidEmail($ele.val()); break;
				case 'password':
					fValid = _isValidPasswd($ele.val()); break;
				case 'coupons':
					fValid = _isValidCoupon($ele.val()); break;
				case 'zip':
					fValid = _isValidZip($ele.val()); break;
			}
			if (!fValid) {
				errMsg = $ele.data('errinv');
			}
			if (showErr) {
				_toggleError($ele, !fValid, errMsg);
			}
			return fValid;
		},
		
		inputFocus: function ($this) {
			$this.siblings('.labl').removeClass('noText');
			$this.removeClass('noText');
		},

		inputBlur: function ($this) {
			var fValid = $.cartUtils.validInput($this, true);
			if (_isEmptyString($this.val())) {
				$this.addClass('noText');
				$this.siblings('.labl').addClass('noText');
			} else if (fValid == true) {
				$.cartUtils.inputKeyup($this)
			}
		},
		
		inputKeyup: function ($this) {
			_toggleError($this, false, '');
			$.cartUtils.validInput($this, false);
		},
		
	checkoutSignin: function ($ele,token) {
			var params = {};
			params.logonId = $('#logonId').val();
			params.logonPassword = $('#logonPassword').val();
			params.rememberMe = 'true';
			//params.token=token;
			params.landingURL=encodeURIComponent($ele.data('url'));
			params.cartURL=encodeURIComponent(window.location.href);
			_showProgress();
			hpStoreUtils.ajax(_cartURLs.logonUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					var data = data.replace('/*','').replace('*/','').trim();
					var response = JSON.parse(data);
					if (response.path) {
						console.log('Successfully validated credentials');
						var hpIDLoginURL = $('#hpidLoginURL').val();
						
						var hpIDstateParam;
						if (!_isEmptyString($('#hasSubscriptionSKU').val()) && $('#hasSubscriptionSKU').val()) {
							hpIDstateParam='state=operation:cartLogin|'+encodeURIComponent($('#logonId').val()+"|subsOrder");
						}else{
							hpIDstateParam='state=operation:cartLogin|'+encodeURIComponent($('#logonId').val());
						}
						hpIDLoginURL=hpIDLoginURL.replace('state=operation:cartLogin',hpIDstateParam);
						console.log('hpIDNewParam-->'+hpIDLoginURL);
						window.location.href = hpIDLoginURL+encodeURIComponent($('#logonId').val());
						//window.location.href = $('#hpidLoginURL').val()+encodeURIComponent($('#logonId').val());
					} else {
						console.error('Unable to parse response');
						$('.xo_cart .xo_loginbox .loginerrormsg').html('Unable to validate email and password');
						$('.xo_cart .xo_loginbox .loginerrormsg').removeClass('hideComp');
						/*if($('#skipCaptchaFlag').val()=='false'){
							grecaptcha.reset();
						}*/
						_hideProgress();
					}
				},
				function (jqXHR, status, err) {
					$('.xo_cart .xo_loginbox .loginerrormsg').html(err);
					$('.xo_cart .xo_loginbox .loginerrormsg').removeClass('hideComp');
					console.error('Unable to validate credentials : ' + err);
					/*if($('#skipCaptchaFlag').val()=='false'){
						grecaptcha.reset();
					}*/
					_showErrMsg(err);
				},
				true
			);
		},
		
		SignInCheckout: function ($ele) {
			var params = {};
			params.landingURL = encodeURIComponent(window.location.href);
			params.cartURL = encodeURIComponent(window.location.href);
			var isFailed = false;
			_showProgress(); 
			hpStoreUtils.ajax(_cartURLs.logonUrl, 'POST', $.extend(params, _commonParams),
			  function (data, status, jqXHR) {
				var data = data.replace('/*','').replace('*/','').trim();
				var response = JSON.parse(data);
				if (response.path) {
				var hpIDLoginURL = $ele.attr("href");
				  var hpIDstateParam;
				  if (!_isEmptyString($('#hasSubscriptionSKU').val()) && $('#hasSubscriptionSKU').val()) {
					hpIDstateParam = "state=operation:cartLogin|subsOrder";
				  } else {
					hpIDstateParam = "state=operation:cartLogin";
				  }
				  hpIDLoginURL = hpIDLoginURL.replace("state=operation:login", hpIDstateParam);
				  window.location.href = hpIDLoginURL;
				} else {
				  console.error('Unable to parse response');
				  _hideProgress();
				  isFailed = true; 
				}
			  },
			  function (jqXHR, status, err) {
				_showErrMsg(err);
				isFailed = true; 
			  },
			  true
			);
			return isFailed;
		  },
		
		continueCheckout: function () {
			$('#contChkout').val('true');
			window.location.href = $('#xo_btn').data('href');
		},

		continueGuestCheckout: function () {
			$('#contGuestChkout').val('true');
			window.location.href = $('#xo_guestbtn').data('href');
		},
		
		continuePaypal: function(resolve, reject){
			
			if(!$('#paypalDiv').hasClass('btnp_disabled')){
				try{				
					var login_state = false;		
					var userType = "guest";
					if(userLogin == 'R'){
						login_state = true;
						userType = "general";
						if(custSeg == 'CG_epphp'){
							userType = "hpepp";
						}
						if(custSeg == 'CG_epp'){
							userType = "epp";
						}
					}
					if(!login_state){						
						userType = "guest";
					}else if (login_state && userType != "epp" && userType != "hpepp"){
						userType = "pri-"+custSeg.slice(3);
					}
					var itemOmniData = $.cartUtils.getItemOmniData();
    				var productArray = new Array();
					$.each(itemOmniData, function (i, data) {	
						if(data.pn != undefined){
							var unitPrice = (parseFloat(data.totalPrice.replaceAll(",", ""))/data.qty).toFixed(2);
							productArray.push({
								"name": data.pn,
								"id": data.partNumber,
								"price": unitPrice,
								"quantity": data.qty,
								"brand": data.productBrand,
								"category": data.productCategory,
								"variant": data.productVariant
							});
						}
					});
					dataLayer.push({
						event: 'e_pageView',
						pageNameL5: 'checkout',
						pageNameL6: '',
						pageNameL7: '',
						pageNameL8: 'checkout',
						loginStatus: login_state, // true or false
						userTypeSession: userType,
						customerSegment: customerSegment,
						orderSegment: 'consumer',
						callCenter: isccf, // true or false
						ecommerce: {
							currencyCode: currency,							
							checkout: {
								actionField: {step: '1', option: 'Paypal Start'},
								products: productArray					
							}
						}
					});
				}
				catch(err){
                	console.log(err);   
                }
				$.cartUtils.checkoutPaypal(resolve, reject);
			}else{
				return;
			}
		},
		continuePaypalCredit: function(resolve, reject){
			if(!$('#paypalCreditDiv').hasClass('btnp_disabled')){
				if (!(typeof trackMetrics == 'undefined')) {
					try{
					trackMetrics( 'new.page', { page: {events: [scevent, 'checkout.billing']}} );
					trackMetrics('new.link',{link:{name:'pay.paypalcredit.cart'}});
					}
					catch(err){
	                	console.log(err);   
	                }
					
				}
				$.cartUtils.checkoutPaypal(resolve, reject);
			}else{
				return;
			}
		},
		checkoutPaypal: function (resolve, reject) {
			$('#xoCartErr').html('').addClass('hideComp');
			_hideProgress();
			var params = {};
			params.shippingAddressMadatory = 'false';
			params.orderId = $('#orderId').val().trim();
			params.cancelURL = window.location.href;
			params.pageSourceType = $('#paypal-button-container').data('page');
			params.returnURL = $('#paypal-button-container').data('url');
			params.plAction = 'xo';
			_showProgress();
			hpStoreUtils.ajax(_cartURLs.paypalExpressURL, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					var data = data.replace('/*','').replace('*/','').trim();
					var response = JSON.parse(data);
					var paypalURL = response.paypalURL;
					var paymentMessage = response.paymentMessage;
					if (paypalURL.indexOf('cc_csr_paypal_flow=true') > -1) {
						paypalURL = paypalURL.replace(/&amp;/g, '&');
					}
					if (paymentMessage == 'NE') {
						_hideProgress();
						resolve(response.paypal_token);
					} else {
						console.error('Unable to perform paypal express checkout : ' + paymentMessage);
						_hideProgress();
						reject();
					}
				},
				function (jqXHR, status, err) {
					console.error('Unable to perform paypal express checkout : ' + err);
					reject();
					if (status == '_ERR_DIDNT_LOGON') {
						window.location.href = $('#logonUrl').val();
					} else {
						$('#xoCartErr').html($('#ppErrMsg').val()).removeClass('hideComp');
						$(window).scrollTop($('#xocartmain').offset().top);
					}
					_hideProgress();
				},
				true
			);
		},
		
		continuePaypalRedirect: function($ele){
			if(!$(this).hasClass('btnp_disabled')){
				return $.cartUtils.checkoutPaypalRedirect($ele);
			}else{
				return '';
			}
		},

		checkoutPaypalRedirect: function ($ele) {
			$('#xoCartErr').html('').addClass('hideComp');
			if (!(typeof trackMetrics == 'undefined')) {
				try{
						trackMetrics( 'new.page', { page: {events: [scevent, 'checkout.billing']}} );
						
						if(($ele).hasClass('paypalCreditCheckoutBtn'))
						{
							trackMetrics('pay.paypal.cart',{});
						}
						else
						{
							trackMetrics('new.link',{link:{name:'pay.paypalcredit.cart'}});
						}
				}
				catch(err){
                	console.log(err);   
                }
				
			}
			var params = {};
			params.shippingAddressMadatory = 'false';
			params.orderId = $('#orderId').val().trim();
			params.cancelURL = window.location.href;
			params.pageSourceType = $ele.data('page');
			params.returnURL = $ele.data('url');
			_showProgress();
			hpStoreUtils.ajax(_cartURLs.paypalExpressURL, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					var data = data.replace('/*','').replace('*/','').trim();
					var response = JSON.parse(data);
					var paypalURL = response.paypalURL;
					var paymentMessage = response.paymentMessage;
					
					if (paypalURL.indexOf('cc_csr_paypal_flow=true') > -1) {
						paypalURL = paypalURL.replace(/&amp;/g, '&');
					}
					if(($ele).hasClass('paypalCreditCheckoutBtn')){
						paypalURL= paypalURL+'&fundingSource=credit';
					}
					if (paymentMessage == 'NE') {
						console.log('Successfully initiated paypal express checkout');
						window.location.href = paypalURL;
					} else {
						console.error('Unable to perform paypal express checkout : ' + paymentMessage);
						_hideProgress();
					}
				},
				function (jqXHR, status, err) {
					console.error('Unable to perform paypal express checkout : ' + err);
					if (status == '_ERR_DIDNT_LOGON') {
						window.location.href = $('#logonUrl').val();
					} else {
						$('#xoCartErr').html($('#ppErrMsg').val()).removeClass('hideComp');
						$(window).scrollTop($('#xocartmain').offset().top);
					}
					_hideProgress();
				},
				true
			);
		},
		
		isCCFlow: function() {
			return _isCCF();
		},
		
		/*isOptimizelyCart: function() {
			if (!_isEmptyString($('#showEnhancedCart').val()) && $('#showEnhancedCart').val()) {
				return true;
			}
			return false;
		},*/
		
		isEcpPopupShow: function() {
			return ecpPopupShow;
		},
		
		resetEcpPopupShow: function() {
			ecpPopupShow=false;
		},
		
		setEcpPopupShow: function() {
			ecpPopupShow=true;
		},
		
		togglePwd: function (getId, getCId) {
			if ($('#' + getId).attr('type') == 'text') {
				$('#' + getId).attr('type', 'password');
				$('#' + getCId).text('Show');
			} else if($('#' + getId).attr('type') == 'password') {
				$('#' + getId).attr('type', 'text');
				$('#' + getCId).text('Hide');
			}
		},
		
		openSTUrl: function (url) {
			$('#shippingTermsModal').foundation('reveal', 'open');
			$('.reveal-modal-bg').css('display','block');
			$('#shippingTermsUrl').html('<object width="100%" height="100%" type="text/html" data="' + url + '"></object>');
		},
		
		openZipChange: function () {
			_toggleSecError($('#zipChange'), false, '');
			var $el = $('#newZip');
			$el.val($('.xo_cart .zipChangeWrap .selectedZip').text());
			$.cartUtils.inputFocus($el);
			$el.focus();
		},

		applyZipChange: function () {
			var $el = $('#newZip');
			var $err = $('#zipChange');
			_toggleSecError($err, false, '');
			if($.cartUtils.validInput($el, true)) {
				if (!(typeof trackMetrics == 'undefined')) {
					try{
					trackMetrics('new.link',{link:{name:'shipping estimator zip change'}});
					}
					catch(err){
	                	console.log(err);   
	                }
				}
				_showProgress();
				var params = {};
				params.orderId = $('#orderId').val().trim();
				params.zipCode = $el.val();
				params.authToken = $('#authToken').val();
				params.URL = '/';
				hpStoreUtils.ajax(_cartURLs.shipEstimateUrl, 'GET', $.extend(params, _commonParams),
					function (data, status, jqXHR) {
						$('#zipChange').foundation('reveal', 'close');
						$.cartUtils.refreshPage();
					},
					function (jqXHR, status, err) {
						_toggleSecError($err, true, $err.data('msg'));
						console.error('Unable to apply new zip : ' + err);
						_hideProgress();
					},
					true
				);
			}
		},
		
		optApplyZipChange: function () {
			var $el = $('#newZip');
			$('#zipErrMsg').addClass('hideComp');
			if($.cartUtils.validInput($el, false)) {
				if (!(typeof trackMetrics == 'undefined')) {
					try{
					trackMetrics('new.link',{link:{name:'shipping estimator zip change'}});
					}
					catch(err){
	                	console.log(err);   
	                }
				}
				_showProgress();
				var params = {};
				params.orderId = $('#orderId').val().trim();
				params.zipCode = $el.val();
				params.authToken = $('#authToken').val();
				params.URL = '/';
				hpStoreUtils.ajax(_cartURLs.shipEstimateUrl, 'GET', $.extend(params, _commonParams),
					function (data, status, jqXHR) {
						$.cartUtils.refreshPage();
					},
					function (jqXHR, status, err) {
						$('#zipErrMsg').removeClass('hideComp');
						console.error('Unable to apply new zip : ' + err);
						_hideProgress();
					},
					true
				);
			}else{
				$('#zipErrMsg').removeClass('hideComp');
			}
		},
		
		joinLoyalty: function () {
			var params = {};
			params.userId = $('#userid').val();
			params.LogonId = $('#LogonId').val();
			_showProgress();
			hpStoreUtils.ajax(_cartURLs.hpMyAccountLandingMPRUrl, 'POST', $.extend(params, _commonParams),
					function (data, status, jqXHR) {
						data = data.replace('/*','').replace('*/','').trim();
						var response = JSON.parse(data);
						$('#hpRewardsJoinModal').foundation('reveal', 'close');
						sendJoinLoyaltyAnalytics();
						$.cartUtils.refreshPage();
					},
					function (jqXHR, status, err) {
						console.error('error while checking invalidity ' + err);
						_hideProgress();
						location.href = $('#loyaltyOrderCalculate').val();
					},
					true
				);
		},

		setIframeAttributes: function (el, attrs) {
		 	  for(var key in attrs) {
				el.setAttribute(key, attrs[key]);
			  }
		 	return el;
		},

		shareYourCart: function ($ele) {			
		
			var localUrl=getAbsoluteURL();
			var params = {};
			params.orderId = $('#orderId').val().trim();
			params.localUrl = localUrl;
			
			hpStoreUtils.ajax(_cartURLs.shareCartUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					data = data.replace('/*','').replace('*/','').trim();
					var jsnResponse = jQuery.parseJSON(data);
					var sCartRes =	JSON.stringify(jsnResponse['sCartResJson']);
					sCartRes = sCartRes.replace(/&amp;/g, "&");
					console.log("Printing Shared cart JSON Response");
					console.log(sCartRes);
					console.log("Printed Shared cart JSON Response");
					var sCartitems = jQuery.parseJSON(sCartRes);
					
					/* Iframe Adjustment as per screen resolution. */
					
					 if($(window).width() > 680){			
						 	$('#share_cart_iframe').css('height','630px');														
						}else{
							$('#share_cart_iframe').css('height','710px');
						}
					 
					if (sCartitems.hasOwnProperty('Items') && sCartitems.hasOwnProperty('CartURL')){
					
   					   $('#shareCartModal').foundation('reveal', 'open');
					   $('.reveal-modal-bg').css('display','block');
						console.log("Opened Share Cart Modal popup");	
							
						window.setTimeout(function(){
							var frame = document.getElementById("share_cart_iframe");
							var message = JSON.stringify(sCartitems);
								if (frame.contentWindow.postMessage) {
										console.log("Share cart Post JSON Data!!");
										console.log(sCartRes);
										frame.contentWindow.postMessage(message, "*"); 
								}
								console.log("Opening Share Cart Modal popup-analytics");	
								dataLayer.push({event:'e_linkClick',linkPlacement:'customer:sharecart',linkID:'Share cart',udl:true});
								console.log("Executed DataLayer.push for sharecart link.");							
							
						}, 1000); 
						
				 }else{
					 console.log("Invalid sharecart Object!!");
				 }
						
				},
				function (jqXHR, status, err) {
					console.error('Unable to share cart item : ' + err);
					if(status=='_ERR_DIDNT_LOGON')
					{
						$('#xoCartErr').html($('#sstoErrMsg').val()).removeClass('hideComp');
					}
					_showErrMsg(err);
				},
				true
			);						
		
	
		
		},
		
		ccCarePackObligationService: function (params) {			
			if (!params) {
				params = {};
			}
				$('#generic-overlay').removeClass('hide');								
			hpStoreUtils.ajax(_cartURLs.carePackObligationServiceUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					data = data.replace('/*','').replace('*/','').trim();
					var jsnResponse = jQuery.parseJSON(data);
					if(!_isEmptyString(jsnResponse['obligationResJson'])) {
						statusCode = jsnResponse['obligationResJson']['statusCode'];
			 			if(statusCode == 200 || statusCode == 210){
			 				var invalidSNs = jsnResponse['obligationResJson']['invalidSNs'];
			 				if (_isEmptyString(invalidSNs)) {
								if(params.carepackservice != undefined) {
									var $this = $('#imageGallery1');
									$this.foundation('reveal', 'close'); 
//									$('.cp-btn').addClass('close-reveal-modal');
									$('#generic-overlay').addClass('hide');
					        		$.cartUtils.updateItemQtyforCarepack(params.ecOrderItemId,params.newQty, params.eCarePackSN);
								} else {
									$('#MultipleCP_punchout_Modal').foundation('reveal', 'close');	
									$('#generic-overlay').addClass('hide');
									$.cartUtils.updateItemQty(params.ecOrderItemId, params.newQty);
								}
			 				} else{
			 					if(params.carepackservice != undefined) {
			 						$('#invalidSNError').css('display','block');
				        			$('.cp-btn').css('top','8em');
				        			$('.cp-btn').removeClass('close-reveal-modal');
				        			$('#generic-overlay').addClass('hide');
			 					} else {
				 					var errorMsg1 = $('#cpErrorMsg1hid').val();
									$('#cpErrorMsg1').removeClass('hideComp');
									$.cartUtils.isValidateCarepackSerialNumbers(invalidSNs,false,false);
								//	$("#cpErrorMsg1").html(errorMsg1 +" ("+invalidSNs+")");
									$('.multi-cpk-btn').addClass('disable');
									$('#generic-overlay').addClass('hide');
			 					}
			 				}
			 			} else {
							// Todo : Display error message for Ajax exception scenarios and display in front end.
			 				$('#cpErrorMsg1').removeClass('hideComp');
							$("#cpErrorMsg1").html("Please try again...");
							$('#generic-overlay').addClass('hide');
			 			}
					}
				},
				function (jqXHR, status, err) {
					console.error('Unable to share cart item : ' + err);
					if(status=='_ERR_DIDNT_LOGON')
					{
						$('#xoCartErr').html($('#sstoErrMsg').val()).removeClass('hideComp');
					}
					_showErrMsg(err);
				},
				true
			);						
		},
		
		isValidateCarepackSerialNumbers : function(inValid_SNs,dupSNs,clientSNS){
			var invalidSN_Array = [];	
			var cpLimit = 0;
			var see_more_err = '';
			var see_more_serialnumbers = '';
			if(inValid_SNs.length > 0){
				if(inValid_SNs.length >= 4){
					cpLimit = 5;
				}else if(inValid_SNs.length < 4){
					cpLimit = inValid_SNs.length;
				}
				
				for (i = 0; i < cpLimit; i++) {
					var invalidSN = inValid_SNs[i];
					invalidSN_Array.push(invalidSN);		
				}

				if(inValid_SNs.length > 5){
					see_more_err = '<div class="error-msg-tooltip">See All<span class="error-msg-tooltip-text">'+inValid_SNs.join()+'</span></div>';
					var errorMsg1 = $('#cpErrorMsg1hid').val();
					if(dupSNs) {
						errorMsg1 = $('#cpErrorMsg3hid').val();
					} else if(clientSNS) {
						errorMsg1 = $('#cpErrorMsg4hid').val();
					}
					$("#cpErrorMsg1").html(errorMsg1+invalidSN_Array.join()+'. <br/>'+see_more_err+'');					
				}else{
					var errorMsg1 = $('#cpErrorMsg1hid').val();
					if(dupSNs) {
						errorMsg1 = $('#cpErrorMsg3hid').val();
					} else if(clientSNS) {
						errorMsg1 = $('#cpErrorMsg4hid').val();
					}
					$("#cpErrorMsg1").html(errorMsg1+invalidSN_Array.join());
				}
			}
		},
		
		showProgress: function (){
			_showProgress();
		},
		
		hideProgress: function (){
			_hideProgress();
		},

		refreshPageWithPrice: function () {
			var params = {};
			params.orderId = $('#orderId').val().trim();
			/*if($.cartUtils.isOptimizelyCart()){
				params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			}else{
				params.calculationUsage = '-1,-2,-5,-6,-7';
			}*/
			params.calculationUsage = '-1,-2,-3,-4,-5,-6,-7';
			params.updatePrices=1;
			params.inventoryValidation = 'true';
			
			_showProgress();
			hpStoreUtils.ajax(_cartURLs.updateCartItemUrl, 'POST', $.extend(params, _commonParams),
				function (data, status, jqXHR) {
					$.cartUtils.refreshPage();
				},
				function (jqXHR, status, err) {
					_hideProgress();
					$(window).scrollTop($('#xocartmain').offset().top);
				},
				true
			);
		}
	}
})(jQuery);

$(document).on('readyAgain', function (e) {
	/** document.readyAgain custom event changes - start. */
	cartComponentUpdate();
	/** document.readyAgain custom event changes -end. */
	var itemOmniData = $.cartUtils.getItemsOmniData();
	var dySkuList = new Array();
	$.each(itemOmniData, function (i, data) {
		dySkuList.push(data.partNumber);
	});
	setDYContext('CART', [...new Set(dySkuList)]);
});

jQuery(window).on('load', function () {
	
	/*if(null!=$('#optinreq').val() && $('#optinreq').val() != "") {
		sendJoinLoyaltyAnalytics();
	}*/
	
	var _isValidQuantity = function (s) {
		var regex = RegExp("^[0-9]{1,3}$");
		return regex.test(s);
	};
	// carepack message code starts 
	var urlAppend="us-en/shop/";
	var localUrl=getAbsoluteURL();
	if(localUrl.indexOf(urlAppend) != -1){
		localUrl=localUrl+"cv/carepackfaq";
	}else{
		localUrl=localUrl+"us-en/shop/cv/carepackfaq";
	}
	$('#CarePackMsg a').attr('href', localUrl);
	// carepack message code ends
	
	var arrayLength = cartCarePackOitems.length;
	var i=0;
	var serialNoField="";
	var carepackId="";
	var regx = /^[A-Za-z0-9]+$/;
	$('.cpErrorMsg').css('display','none');
	$('.cp-btn').removeClass('close-reveal-modal');
	
//	for(i=0;i<arrayLength;i++){
	if(arrayLength > 0) {
		var $this = $('#imageGallery1');
		$this.find('h3').html($this.find('h3').data('title') );
		$this.data('action', 'none');
		$this.foundation('reveal', 'open'); 
		$('.reveal-modal-bg').css('display','block');
		$('.association_override_msg').css('display','none')
		qtyfield=$(".xocart_cont .mcprodqty #qty_"+cartCarePackOitems[i]).data('omni').qty;
		if(qtyfield > 1) {
			$("#ecptextarea").css('display', 'block');
			$(".cpSerialTextbox").css('display', 'none');
		}
		carepackId=cartCarePackOitems[i];
		$this.find('.close-reveal-modal').attr('itemId', carepackId);
		
		$this.find('#hardwareassc').css('display', 'none');
		$this.find('#headingPara, #prodsInsidePopUp').css('display', 'none');
		console.log('changes only for modal popup for webservice');
		$this.find('.cpBottomSection .cpTopArrow').css('display', 'none');
		$this.find('.cpBottomSection .newProductCTA').css('border-bottom', '1px solid #ccc');
		
		/** Validation for Adding serial number for eCarepack products. */
		$("body").on("keyup",".cpSerialTextbox", function(){
			if( $(this).val().length > 4){
				$('.cp-btn').removeClass('disable');
			}else{
				$('.cp-btn').addClass('disable');
			}
			serialNoField=this.value;
		});
		
        /** Method for Adding serial number for eCarepack products. */
		$("body").on("keyup","#ecptextarea", function(){
			$('#rcb').css('display','none');
			$('#invalidSNError').css('display','none');
			$('#qtySerialnums').css('display','none');
			if( $(this).val().length > 4){
				$('.cp-btn').removeClass('disable');
			}else{
				$('.cp-btn').addClass('disable');
			}
			serialNoField=this.value;
		});
		
		/** Ecarepack products association with Hardware SKU model changes. */
		$("body").on("click","#imageGallery1 .cp-btn", function(){
			if($(this).hasClass('disable')){
				return false;
			}
			
			var isValidECSN = true;
			var eCarePackSNs = serialNoField.split(',');
			if(eCarePackSNs.length == qtyfield) {
				for (i = 0; i < eCarePackSNs.length; i++) {
					if(eCarePackSNs[i] != null && eCarePackSNs[i] != '') {
						var ecSN = eCarePackSNs[i];
						var regx = /^[A-Za-z0-9]+$/;
						if( ecSN.length > 4 && ecSN.length <= 10){
							if (!regx.test(ecSN)){
								isValidECSN = false;
							}
						} else {
							isValidECSN = false;
						}
					} else {
						isValidECSN = false;
					}
				}
				if(isValidECSN) {
					var params = {};
					params.eCarePackSN = serialNoField;
					params.ecOrderItemId = carepackId;
					params.newQty = qtyfield;
					params.carepackservice = true;
					$.cartUtils.ccCarePackObligationService(params);			
				} else {
					$('#rcb').css('display','block');
        			$('.cp-btn').css('top','8em');
        			$('.cp-btn').removeClass('close-reveal-modal');
        			$this.removeClass('busy');
				}
			} else {
				if($( "#continueBtn" ).hasClass( "disable" )){
    				$('.cp-btn').removeClass('close-reveal-modal');
    				$('.cpErrorMsg').css('display','none');
    				$this.removeClass('busy');
    			}else{
    				$("#qtySerialnums").html("Enter " +qtyfield+" serial numbers with comma seperator.");
    				$('#qtySerialnums').css('display','block');
        			$('.cp-btn').css('top','8em');
        			$('.cp-btn').removeClass('close-reveal-modal');
        			$this.removeClass('busy');
    			}
        	}
			
		});	
	}
	
	/* HPEUS 2105 start */
	
	/*var exceededLimit = false;
		
	if($('body').find('.exceededCartLimitMsgWrap').length > 0){
			exceededLimit = true;										
			
			 $(window).scroll(function(){
				sticktothetop();		
			});

			function sticktothetop() {				
				if($("div").hasClass("exceededCartLimitMsgStick")){								
				  var window_top = $(window).scrollTop();
				  var top = $('.exceededCartLimitMsgStick').offset().top;
				  if (window_top > top) {
					$('.exceededCartLimitMsgWrap').addClass('stick');
					$('.exceededCartLimitMsgStick').height($('.exceededCartLimitMsgWrap').outerHeight());
				  } else {
					$('.exceededCartLimitMsgWrap').removeClass('stick');
					$('.exceededCartLimitMsgStick').height(0);
				  }
			  }			  
			}
		}*/
		
	/* HPEUS 2105 End */
	
	/** Ecarepack products association with Hardware SKU model close button changes. */
	$('body').on('click', '#imageGallery1 .closeBtn', function(){
		$.cartUtils.removeItem($(this).attr('itemId'));
	});
	
	$(document).foundation('forms');
	/** Punchout Quantity update . */
	$('body').on('change','.xocart_cont .productrow .mcprodqty .update', function (e) {
		var $this = $(this);
		var oldQty = parseInt($this.data('ui').qty);
		var newQty = parseInt($this.val());
		if (oldQty != newQty) {
			if (newQty > 0) {
				$.cartUtils.updateItemQty($this.data('ui').id, newQty);
				$.cartUtils.updateItemAnalytics($this.data('ui').id, oldQty, newQty);
			} else {
				$.cartUtils.showRemove($this.data('ui'));
			}
		}
	});
	
	/** carepack quantity update. */
	$('body').on('change','.cc-carepack-qty', function (e) {
		var $this = $(this);
		$this.removeClass('error');
		$this.siblings('.cpQtyErrMsg').addClass('hideComp');
		
		var cpQtyUpdateCount = parseInt($('#cpQtyUpdateCount').val());
		if ($this.val() > cpQtyUpdateCount) {
			$this.addClass('error');
			$this.siblings('.cpQtyErrMsg').removeClass('hideComp');
		}
	});
	
	//TODO : Updating Carepack Quantity.	
	/** Punchout Carepack Modal-popup Overlay. */
	$("body").on("click","#MultipleCP_punchout_Modal .multi-cpk-btn", function(){
		if($(this).hasClass('disable')){
			return false;
		}
		$('#generic-overlay').removeClass('hide');
		var eCarePackSN = $('#multi_cp_textarea').val();
		var newQty = ecNewQty;
		var oldQty = ecOldQty;
		var serialNums = cpkSerialNumber;
		var isValidECSN = true;
		var invalid_SerialNumber_Format = false;
		var isEmptyECSN = false;
		var carepacksArray = [];
		var dupCPSN = [];
		var invalidCPSN = [];
		var cpQtyUpdateCount = 200;
		if(null != $('#cpQtyUpdateCount').val() && $('#cpQtyUpdateCount').val() != "") {
			cpQtyUpdateCount = parseInt($('#cpQtyUpdateCount').val());
		}
		if(eCarePackSN !== '') {
			var eCarePackSNs = eCarePackSN.split(',');
			
			// Todo - change to store config.
			if(newQty > cpQtyUpdateCount) {
				// Item Quantity exceeds the max limit.
				var errorMsg6 = $('#cpErrorMsg6hid').val();
				$("#cpErrorMsg1").html(errorMsg6);
				$('#cpErrorMsg1').removeClass('hideComp');
				$('.multi-cpk-btn').addClass('disable');
				$('#generic-overlay').addClass('hide');
			}
			else if(eCarePackSNs.length == newQty) {
				for (i = 0; i < eCarePackSNs.length; i++) {
					if(eCarePackSNs[i] != null && eCarePackSNs[i] != '') {
						var ecSN = eCarePackSNs[i].toUpperCase();
						
						// validate serial numbers length.
						var regx = /^[A-Za-z0-9]+$/;
						if( ecSN.length > 4 && ecSN.length <= 10){
							if (!regx.test(ecSN)){
								isValidECSN = false;
							}
						} else {
							invalidCPSN.push(ecSN);
							isValidECSN = false;
						// To check serial number serial numbers length.
							invalid_SerialNumber_Format = true;	
						}
						
						// validate duplicate serial numbers.
						if (carepacksArray.includes(ecSN)) {
							if(!dupCPSN.includes(ecSN)) {
								dupCPSN.push(ecSN);
							}
						} else {
							carepacksArray.push(ecSN);
						}
						
					} else {
						// Validate Empty serial numbers.
						isEmptyECSN = true;
						isValidECSN = false;
					}
				}
				
				// Care Pack serial number validation based on flag check.				
				
				if(isEmptyECSN) {
					// Validation error message to display Empty Serial numbers.
					$('#cpErrorMsg1').removeClass('hideComp');
					var errorMsg5 = $('#cpErrorMsg5hid').val();
					$("#cpErrorMsg1").html(errorMsg5);
					$('.multi-cpk-btn').addClass('disable');
					$('#generic-overlay').addClass('hide');
				} else if(invalid_SerialNumber_Format) {
					// validation error message to display valdate serial numbers length.
					$('#cpErrorMsg1').removeClass('hideComp');
					$.cartUtils.isValidateCarepackSerialNumbers(invalidCPSN,false,true);
					$('.multi-cpk-btn').addClass('disable');
					$('#generic-overlay').addClass('hide');
				}
				else if(dupCPSN != '') {
					$('#cpErrorMsg1').removeClass('hideComp');
					$.cartUtils.isValidateCarepackSerialNumbers(dupCPSN,true,false);
					$('.multi-cpk-btn').addClass('disable');
					$('#generic-overlay').addClass('hide');
				} else if(isValidECSN) {
					var params = {};
					params.eCarePackSN = eCarePackSN;
					params.ecOrderItemId = ecOrderItemId;
					params.newQty = newQty;
					params.validSerialNums = serialNums;
					$.cartUtils.ccCarePackObligationService(params);			
				} else {
					$('#cpErrorMsg2').removeClass('hideComp');
					$('.multi-cpk-btn').addClass('disable');	
					$('#generic-overlay').addClass('hide');				
				}
			} else {
				// Serial Number count is not matching with carepack quantity.
				$('#cpErrorMsg2').removeClass('hideComp');
				$('.multi-cpk-btn').addClass('disable');	
				$('#generic-overlay').addClass('hide');				
			}
		} else {
			// Serial number text area shouldn't be empty.
			$('#cpErrorMsg2').removeClass('hideComp');
			$('.multi-cpk-btn').addClass('disable');
			$('#generic-overlay').addClass('hide');			
		}
	});
		
	// TODO : Add changes for Multi carepack serial numbers.
	var ecNewQty ='';
	var ecOldQty ='';
	var ecOrderItemId ='';
	var cpkSerialNumber ='';
	
	/** Carepack serial number validation. */
	$("body").on("change keyup paste","#multi_cp_textarea", function() {
		var csk = $('#multi_cp_textarea').val();
		if( $("#multi_cp_textarea").val().length > 4){
			$('.multi-cpk-btn').removeClass('disable');
		}else{
			$('.multi-cpk-btn').addClass('disable');
		}
		
//		$('.cpErrorMsg').css('display','none');
		$('#cpErrorMsg1').addClass('hideComp');
		$('#cpErrorMsg2').addClass('hideComp');
	});
	
	/**  Punchout product quantity update changes. */ 		
	$('body').on('click','.xocart_cont .productrow .mcprodqty a.apply', function (e) {
		
		var $this = $(this).siblings('.ccupdate');
		var oldQty = parseInt($this.data('ui').qty);
		var newQty = $this.val().trim();
		ecNewQty = newQty;
		ecOldQty = oldQty;
		ecOrderItemId = $this.data('ui').id;
		$.cartUtils.updateItemAnalytics($this.data('ui').id, oldQty, newQty);
		if($(this).hasClass('cc-carepack-qty-update')){
			console.log("Opened carepack Modal popup");	
			
			var cpQtyUpdateCount = 200;
			var isValidCount = false;
			if(null != $('#cpQtyUpdateCount').val() && $('#cpQtyUpdateCount').val() != "") {
				cpQtyUpdateCount = parseInt($('#cpQtyUpdateCount').val());
			}
			
		 	// TODO Update Quantity after validating carepack serial numbers and enable below code snippets.
			if( _isValidQuantity(newQty)){
				$this.removeClass('error');
				$this.siblings('.qtyErrMsg').addClass('hideComp');
				if(newQty > cpQtyUpdateCount) {
					$this.addClass('error');
					$this.siblings('.cpQtyErrMsg').removeClass('hideComp');
				} else {
					isValidCount = true;
				}
				$("textarea#multi_cp_textarea").val('');
				if(isValidCount) {
					if (oldQty != newQty) {
						if (newQty > 0) {
							$('#MultipleCP_punchout_Modal').foundation('reveal', 'open');
							$('.reveal-modal-bg').css('display','block');
							cpkSerialNumber = $(this).data('cpk-serialnumber');
							$("textarea#multi_cp_textarea").val(cpkSerialNumber);
							$('#cpErrorMsg1').addClass('hideComp');
							$('#cpErrorMsg2').addClass('hideComp');
							$('.multi-cpk-btn').removeClass('disable');
						} else {
							$.cartUtils.showRemove($this.data('ui'));
						}
					}
				}
			} else {
				$this.addClass('error');
				$this.siblings('.qtyErrMsg').removeClass('hideComp');
			}		
			
		 }else{		
			if( _isValidQuantity(newQty)){
				$this.removeClass('error');
				$this.siblings('.qtyErrMsg').addClass('hideComp');
				if (oldQty != newQty) {
					if (newQty > 0) {
						$.cartUtils.updateItemQty($this.data('ui').id, newQty);
					} else {
						$.cartUtils.showRemove($this.data('ui'));
					}
				}
			} else {
				$this.addClass('error');
				$this.siblings('.qtyErrMsg').removeClass('hideComp');
			}
		 }
	});
	
//	#KFL HPEUS-2955
	/** Zipcode section in order summary. */
	$('body').on('click','.control-with-addon a.apply', function (e) {
		$.cartUtils.optApplyZipChange();
	});
	
	/*$(".subsQty").on("keyup",function() {
		$(this).siblings(".subqtyupdate").removeClass("hideComp");
		var mq = window.matchMedia( "(max-width: 720px)" );
		var nq = window.matchMedia( "(max-width: 1024px)" );
		if (mq.matches) {
			$('.xo_cart .qtypriceCont.addRemoveLinkIcon').css({"margin":"5px 0px 75px 77px"});
			$('.xo_cart .qtypriceCont.addRemoveLinkIconOnly').css({"margin":"5px 0px 85px 77px"});
			$('.xo_cart .qtypriceCont.addRemoveLinkIconOnly.addRemoveLinkIconOnlyLR').css({"margin":"5px 0px 115px 77px"});
			$(".updateButtonClone").show();
			}
		else if(nq.matches){
			$(".xo_cart .productrow .mcprodqty a").css({"margin-left":"50px"})
			$(".xocart_cont .productrow .mcprodqty a.subqtyupdate").css({"display":"block"})
		}
		else{
			$(".xocart_cont .productrow .mcprodqty a.subqtyupdate").css({"display":"block"})
		}
	});*/
		
	$(window).on("orientationchange",function(){
		$(".updateButtonClone").hide();
		$(".xocart_cont .productrow .mcprodprice .subsQty").css({"display":"none"})
	});
	
	/** Punchout subscription product quantity update changes. */
	$("body").on('click','.xocart_cont .productrow .mcprodqty a.apply', function(e){
		$('.xocart_cont .productrow .mcprodprice .subsQty').trigger('click');
	})
	
	/** Punchout subscription product quantity update changes. */
	$('body').on('blur','.xocart_cont .productrow .mcprodprice .subsQty', function (e) {
		var $this = $(this);
		var $thisProductRow = $(this).parents('.productrow');
		var oldQty = parseInt($this.data('ui').qty);
		var newQty = $this.val().trim();
		var $subsMaxQtyLimit = parseInt($("#subsQtyLimit").val());        
		var $subsMaxQtyLimit1 = parseInt($("#subsQtyLimit1").val());
		if(_isValidQuantity(newQty)){
			$this.removeClass('error');
			$this.siblings('.qtyErrMsg').addClass('hideComp');
			var mq = window.matchMedia( "(max-width: 720px)" );
			if (mq.matches) {
				$(".updateButtonClone").hide();
			}
			$thisProductRow.find('.subsQtyErrMsg').hide();
			if (oldQty != newQty) {
				if (newQty > 0 && newQty <=$subsMaxQtyLimit) {
					$thisProductRow.find('.subsQtyErrMsg').hide();
					$.cartUtils.updateItemQty($this.data('ui').id, newQty);
				} else if (newQty >= $subsMaxQtyLimit1) {
					//$this.addClass('error');
					$thisProductRow.find('.subsQtyErrMsg').show();
				} else {
					$.cartUtils.showRemove($this.data('ui'));
				}
			}
		} else {
			$this.addClass('error');
			$this.siblings('.qtyErrMsg').removeClass('hideComp');
		}
	});

	/** Remove giftcard item from cart. */
	$('body').on('click','.xocart_cont .productrow .remove', function (e) {
		var $this = $(this);
		if ($this.hasClass('gift')) {
		//	$.cartUtils.showRemove($('#qty_' + $this.data('id')).data('ui'));
			$.cartUtils.showRemove($('#cItem' + $this.data('id')+ ' ' +'#qty_' + $this.data('id')).data('ui'));
			
		} else {
			$.cartUtils.removeItem($this.data('id'));
		}
	});

	/** Remove product from cart for Punchout scenario. */
	$('body').on('click','.ccremove' ,function (e) {
		
		var multOrdItems = "";
		var carpacItID = $(this).data('id');
		// Start : Code Changes for IDEAS 20
		var freeGiftRemoveFlag = /^\d+$/.test(carpacItID);
		if(!freeGiftRemoveFlag){
			var result_array = carpacItID.split('_');
			carpacItID = result_array[0];
			var freeGift = result_array[1];
			$.cartUtils.removeItemFreeGift(carpacItID);
			
		}else{
			var ctoPrtNumNConfgID = $('#qty_' + carpacItID).data('omni').ctoPrtNumNConfgID;
			if(ctoPrtNumNConfgID != undefined){
			var currentParNum = ctoPrtNumNConfgID;	
			}else{
				var currentParNum =  $('#qty_' + carpacItID).data('omni').partNumber;
			}
	var cartData = $.hpsfData.getCartData();
	var crPackAssns=cartData.ordItmFld2;
	if(crPackAssns != undefined && crPackAssns[currentParNum] != undefined && crPackAssns[currentParNum] != null)
		{
			var currentCarPacksAssoc = crPackAssns[currentParNum];
			if(currentCarPacksAssoc != undefined && currentCarPacksAssoc != null)
				{
					$.each(currentCarPacksAssoc, function(key, value) {
						multOrdItems = multOrdItems + '|' + key;
					});
					//we have to remove the hardware too
					multOrdItems = multOrdItems + '|' + carpacItID;
					$.cartUtils.removeAssociatedCarePacks(multOrdItems);
				}
		}
	else
		{
			$.cartUtils.removeItem(carpacItID);
		}
			
		}
	// END : Code Changes for IDEAS 20	
		$.cartUtils.setEcpPopupShow();
	
	});
	
	/** Resizing Sharecart iframe modal changes. */
	 $(window).on("resize",function(){
			if($(window).width() > 680){			
				$('#share_cart_iframe').css('height','630px');														
			}else{
				$('#share_cart_iframe').css('height','710px');
			}
	  });
	 
	/* Open Share Cart Iframe Modal Popup */
	
	/** Trigger ShareCart Modal changes. */
	$('body').on('click','#ShareCart_btn_tab, #ShareCart_btn_mob',  function (e) {
		$.cartUtils.shareYourCart(e);
	});
	
	/* Refreshing Sharecart Iframe contents after Triggering sharecart close button */

//	$(document).on('close.fndtn.reveal', '[data-reveal]', function () {
	 $('[data-reveal]').on('closed.zf.reveal', function () {
	    var modal = $(this);
		if(modal.attr('id') == "shareCartModal"){
			$("#ShareCart_Modal_Contents").empty();			
			var shareCart_iframe = document.createElement('iframe');
			var shareCartModalContents = document.getElementById("ShareCart_Modal_Contents");
			var shareCartConfigUrl = $("#ShareCart_Modal_Contents").attr("data-shareCartConfigUrl");	
				 
			if(shareCartConfigUrl!=""){

				if($(window).width() > 680){
				shareCart_iframe = $.cartUtils.setIframeAttributes(shareCart_iframe, { "id": "share_cart_iframe", "frameborder": "0", "allowtransparency": "true", "scrolling": "no", "style": "width: 100%;height:630px;", "src": shareCartConfigUrl});
			}else{
				shareCart_iframe = $.cartUtils.setIframeAttributes(shareCart_iframe, { "id": "share_cart_iframe", "frameborder": "0", "allowtransparency": "true", "scrolling": "no", "style": "width: 100%;height:710px;", "src": shareCartConfigUrl});
			}
					 				
			$("#ShareCart_Modal_Contents").html("<a  class='close-reveal-modal shareCartClose' href='#!'><span id='shareCart_Close_btn' class='shareCartClose' aria-label='Close Share Cart Popup'></span></a>");
			shareCartModalContents.appendChild(shareCart_iframe);			
			
			}else{
				console.log("SHARE_CART_IFRAME_URL Config entry is missing!!");
			} 

		}
	});

	/* Refreshing Sharecart Iframe contents after Triggering sharecart close button */
	

	/** To hide cartpage error message. */
	$('body').on('click','.carterrormsg .closethismsg', function (e) {
		var $this = $(this);
		var cartNotificationSwitch="";
		$this.parents('.carterrormsg').addClass('hideComp');
		// Commenting out below code since it will handle by updateOrderPriceChangeNotification on page load
		/*if($('#priceChngNotifiEnabled').val()){
			cartNotificationSwitch = $('#priceChngNotifiEnabled').val().trim();
		}*/
		/*if (cartNotificationSwitch == 'Y' && $this.data('ui') && $this.data('ui').id) {
			var orderItemId = parseInt($this.data('ui').id);
			var orderId = $('#orderId').val().trim();
			//var orderItemId = e.target.id.trim();
			$.cartUtils.updateItemNotification(orderItemId,orderId);
		}*/
	});
	
	
	
	/*$('a.help_window').off('click');
	$('a.help_window').on('click', function (e) {
		window.open($(this).data('href'), 'popupWindow', 'width=625,height=750,scrollbars=yes');
	});	*/

	var timer;
	var delay = 0;
	
	/** HPRewards tooltip changes. */
	$('body').on("mouseenter",".xo_cart .cartHelp", function (e) {
		var $this = $(this);
		clearTimeout(timer);
		$('.xo_cart .mcprodpromo').addClass('hideComp');
		if($('div.product-rewards-icons').find('.rewardsCouponpromo').length > 0){
				$('.rewardsCouponpromo').addClass('hideComp');
		    }
		var $promo = $this.parents('.mcprodprice').find('.mcprodpromo');
		$promo.removeClass('hideComp');
		if(!$promo.hasClass('optCart')){
			$promo.css('top', ($this.position().top + $this.width() + 7) + 'px');
			$promo.css('left', ($this.position().left - $promo.width() - $this.width()) + 'px');
		}else{
			$promo.css('position','unset');
			$promo.css('float', 'left');
		}
		
	}).on( "mouseleave",".xo_cart .cartHelp", function (e) {
		timer = setTimeout(function () {
			$('.xo_cart .mcprodpromo').addClass('hideComp');
			if($('div.product-rewards-icons').find('.rewardsCouponpromo').length > 0){
				$('.rewardsCouponpromo').addClass('hideComp');
		    }
		}, delay);
	});
	
	/** NonStackable coupon question-img changes */
	$('body').on('click','.question-img', function (event) {
		//if($(window).width() < 1024){
			event.stopPropagation();
			event.preventDefault();
			$('.question-modal').show();
		//}
	});
	
	/** NonStackable coupon tooltip close button changes */
	$('body').on('click','#couponTooltip .close', function (event) {
			event.stopPropagation();
			event.preventDefault();
			$('.question-modal').hide();		
	});

	/** Loyalty tooltip message changes. */
	$('body').on("mouseenter",'.rewardsCoupon', function (e) {
		var $this = $(this);
		clearTimeout(timer);
		$('.rewardsCouponpromo').addClass('hideComp');	
		if($('div.product-rewards-icons').find('.mcprodpromo').length > 0){
				$('.xo_cart .mcprodpromo').addClass('hideComp');
			}
		var $promo = $this.parents('.rewards-list-item').find('.rewardsCouponpromo');
		$promo.removeClass('hideComp');
		$promo.css('top', ($this.position().top + $this.width() + 7) + 'px');
		$promo.css('left', ($this.position().left - $promo.width() - $this.width()) + 'px');
	}).on( "mouseleave",'.rewardsCoupon', function (e) {
		timer = setTimeout(function () {
			$('.rewardsCouponpromo').addClass('hideComp');
			if($('div.product-rewards-icons').find('.mcprodpromo').length > 0){
				$('.xo_cart .mcprodpromo').addClass('hideComp');
			}
		}, delay);		
	});
	
	/** shippingOptions section changes. */
	$('body').on('change','.xocart_total .shippingOptions input[type="radio"]', function (e) {
		var $this = $(this);
		if ($this.is(':checked')) {
			$.cartUtils.updateShipMethod($this.val());
		}
	});
	
	//HPEUS-3034
	/** Coupon validation changes. */
	$('body').on('keyup','#cpnCode', function(e) {
		
		var cpnErrMsgDiv = $('#cpnErrMsg');
		if($(window).width() < 1000){
			cpnErrMsgDiv = $('#cpnErrMsgMobile');
		}else{
			cpnErrMsgDiv = $('#cpnErrMsg');
		}
		
		if (e.keyCode == 13) {
			if (!$('.xocart_total .couponCode a.applyCoupon.apply').hasClass('hideComp')) {
				//$('.xocart_total .couponCode a.applyCoupon.apply').trigger('click');
				$('.xocart_total #applyCouponLink').trigger('click');
			}
		} else {
			var $this = $(this);
			$this.removeClass('error_msg');
			cpnErrMsgDiv.text('').addClass('hideComp');
			//$this.parents('.couponCode').find('.applyCoupon.clear').addClass('hideComp');			
			//$this.parents('.couponCode').find('.applyCoupon.apply').removeClass('hideComp');
			$('#applyCouponLink').addClass('disabled-link');
			if($('#cpnCode').val()==''){				
				$('#oneCouponPerOrderNotification').addClass('hideComp');
			}
			
			
		}
	}).on("focus",'#cpnCode', function(){
		$(this).attr('placeholder','');
	}).on("blur","#cpnCode", function(){ /** Apply coupon code functionality. */
		$(this).attr('placeholder',$(this).data('placeholder'));
	});

    /** Apply coupon changes. */
	$('body').on('click','.xocart_total .couponCode a.applyCoupon', function (e) {
		var $this = $(this);
		if ($this.hasClass('apply')) {
			if($('#skipCaptchaFlag').val()=='false'){
			    var response = window.grecaptcha.execute();
			    console.log('Capcha response: '+response);
						}else{
				$.cartUtils.applyCoupon($this);				
						}
			
		} /*else if ($this.hasClass('clear')) {
			$.cartUtils.clearCoupon($this);
		}*/
	});
	
	 /** Apply loyalty changes. */
	$('body').on('click','.xocart_total .loyaltyReward a.applyLoyalty', function (e) {
		var $this = $(this);
		if ($this.hasClass('apply')) {
			$.cartUtils.applyLoyalty($this);
		} else if ($this.hasClass('clear')) {
			$.cartUtils.clearLoyalty($this);
		}
	});

	/* BEGIN Loyalty 2.0 */	
	/** Apply Loyalty points changes. */
	$('body').on('click','.xocart_total .pointsRedeem a.applyPoints', function (e) {
		var $this = $(this);
		if ($this.hasClass('apply')) {
			$.cartUtils.applyPoints($this);
		} else if ($this.hasClass('clear')) {
			$.cartUtils.clearPoints($this);
		}
	});

	/** Clear applied Loyalty reward points changes. */
	$('body').on('click','.xocart_total .pointsRedeem a.clearPoints', function (e) {
		var $this = $(this);
		if ($this.hasClass('apply')) {
			$.cartUtils.applyPoints($this);
		} else if ($this.hasClass('clear')) {
			$.cartUtils.clearPoints($this);
		}
	});

    /** Palletize this shipment - checkbox. */
	$('body').on('click','#LVOFlag', function (e) {
		if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0 && $(this).is(':checked')) {
			$.callCenterUtils.updateLVOStateNoCheckout();
			$.cartUtils.resetPoints();
		}
	});

	/* END Loyalty 2.0 */
	/** Remove coupon changes. */
	$('body').on('click','.xocart_total .couponCode a.removeCpn',  function (e) {
		$.cartUtils.removeCoupon($(this));
	});
	
	/** Close delete modal popup notification changes. */
	$('#imageGallery').off('closed.fndtn.reveal');
	$('#imageGallery').on('closed.fndtn.reveal', function (e) {
		var $this = $(this);
		var multOrdItems = "";
		if ($this.data('action') == 'delete') {
			var ctoPrtNumNConfgID = $('#qty_' + $this.data('item')).data('omni').ctoPrtNumNConfgID;
				if(ctoPrtNumNConfgID != undefined){
				var currentParNum = ctoPrtNumNConfgID;	
				}else{
					var currentParNum =  $('#qty_' + $this.data('item')).data('omni').partNumber;
				}
			var cartData = $.hpsfData.getCartData();
			var crPackAssns=cartData.ordItmFld2;
			if(crPackAssns[currentParNum] != undefined && crPackAssns[currentParNum] != null)
			{
				var currentCarPacksAssoc = crPackAssns[currentParNum];
				if(currentCarPacksAssoc != undefined && currentCarPacksAssoc != null)
					{
						$.each(currentCarPacksAssoc, function(key, value) {
							multOrdItems = multOrdItems + '|' + key;
						});
						//we have to remove the hardware too
						multOrdItems = multOrdItems + '|' + $this.data('item');
						$.cartUtils.removeAssociatedCarePacks(multOrdItems);
					}
			}
			else
				{
					$.cartUtils.removeItem($this.data('item'));
				}
			
			
		} else if ($this.data('action') == 'save') {
			$.cartUtils.saveToWishList($this.data('sku'));
		} else {
			var eQty = $('#cItem' + $this.data('item')+ ' ' +'#qty_' + $this.data('item'));						
			eQty.val(eQty.data('ui').qty);
		}
	});
	
	/** Punchout Carepack Modal-popup changes. */
	$('body').on('click','#imageGallery a.save',  function (e) {
		$('#imageGallery').data('action', 'save');
		$('#imageGallery').foundation('reveal', 'close');
	});
	
	/** Care pack close-nocarepack-modal. */
	$('body').on('click','#xocart-warn-noCPAdded-modal a.close-nocarepack-modal', function (e) {
		$('#xocart-warn-noCPAdded-modal').css('display','none');
		$('.reveal-modal-bg').css('display','none');
	});

    /** Remove all items from cart for punchout scenario. */
	$('body').on('click','#btn_removeAllItem', function(){
		$('#xocart-removeItems-modal').foundation('reveal', 'open');
	    $('.reveal-modal-bg').css('display','block');
	});
	
	/** Punchout Carepack Modal-popup - delete items from cart. */
	$('body').on('click','#imageGallery a.delete', function (e) {
		$('#imageGallery').data('action', 'delete');
		$('#imageGallery').foundation('reveal', 'close');
	});
	
	$('.xo_cart .prodSpecs').off('opened.fndtn.reveal');
	$('.xo_cart .prodSpecs').on('opened.fndtn.reveal', function() {
		$(this).scrollTop(0);
	});
	
	$('.xo_cart .xo_loginbox input[type="text"], .xo_cart .xo_loginbox input[type="password"]').off('blur focus keyup');
	$('.xo_cart .xo_loginbox input[type="text"], .xo_cart .xo_loginbox input[type="password"]').on({
		'blur': function (e) {
			$.cartUtils.inputBlur($(this));
		},
		'focus': function (e) {
			$.cartUtils.inputFocus($(this));
		},
		'keyup': function (e) {
			if (e.keyCode == 13) {
				$('.xo_cart .xo_loginbox .bluebtn_login').trigger('click');
			} else {
				$.cartUtils.inputKeyup($(this));
			}
		}
	});
	
	/** xo_loginbox changes. */
	$('body').on('click','.xo_cart .xo_loginbox .bluebtn_login', function (e) {
		$('.xo_cart .xo_loginbox .loginerrormsg').addClass('hideComp');
		var fValid = true;
		if (!$.cartUtils.validInput($('#logonId'), true)) {
			fValid = false;
		}
		if (!$.cartUtils.validInput($('#logonPassword'), true)) {
			fValid = false;
		}
		if (fValid == true) {
			/*if($('#skipCaptchaFlag').val()=='false'){
				validateCap();
				return;
			}	*/		
			$.cartUtils.checkoutSignin($(this),'NA');
		}
	});
		
	/** Cartpage checkout button changes. */
	$('body').on('click','#xo_btn', function (e) {
		if(!$(this).hasClass('btn_disabled')){
			if ($(this).hasClass('lvostate')) {
				if (typeof(Storage) !== "undefined") {
					if($('#isSubsidyApplied').val() == 'true'){
						localStorage.setItem("cartSubsidy", "true");
					}
					else{
						localStorage.setItem("cartSubsidy", "false");					
					}
				}				
				$.callCenterUtils.updateLVOState();

				// Loyalty 2.0
				if (typeof loyalty !== 'undefined' && loyalty.redeemedPoints > 0 && $(this).is(':checked')) {
					$.cartUtils.resetPoints();
				}

			} else {	
				var contChkout = $('#contChkout').val();
				console.log("contChkout:"+contChkout);
				if(!contChkout){
					console.log("inside if contChkout:"+contChkout);
					$.cartUtils.continueCheckout();
				}
			}
		}
	});
	
	/** Shipping method list mouseover  style changes. */
	$('body').on("mouseenter",".cart-shipping-method-list .shipping-method-list-item",function (e) {
				if (!$(this).hasClass('checked')) {
					$(this).addClass('hoveredItem');
				}
	}).on( "mouseleave",".cart-shipping-method-list .shipping-method-list-item", function (e) {		
			if (!$(this).hasClass('checked')) {
				$(this).removeClass('hoveredItem');
				}
	});
	
	/** xo_guestbtn changes. */
	$('body').on('click','#xo_guestbtn', function (e) {
		var contGuestChkout = $('#contGuestChkout').val();
		console.log("contGuestChkout:"+contGuestChkout);
		if(!contGuestChkout){
			console.log("inside if contGuestChkout:"+contGuestChkout);
			$.cartUtils.continueGuestCheckout();
		}
	});

	/** paypalCart changes. */
	$('body').on('click','#paypalCart', function (e) {
		if(!$(this).hasClass('btnp_disabled')){
		$.cartUtils.continuePaypalRedirect($(this));
		}
	});
	
	/** paypalCreditCart changes. */
	$('body').on('click','#paypalCreditCart', function (e) {
		if(!$(this).hasClass('btnp_disabled')){
		$.cartUtils.continuePaypalRedirect($(this));
		}
	});
	
	/** ShowHide Password changes. */
	$('body').on ('click','#pwdShow', function (e) {
		$.cartUtils.togglePwd('logonPassword', 'pwdShow');
	});
	
	/**shipTermsWrap changes. */
	$('body').on('click','.xo_cart .shipTermsWrap .stUrl', function (e) {
		$.cartUtils.openSTUrl($(this).data('url'));
	});

	$('#newZip').off('blur focus keyup');
	$('#newZip').on({
		'blur': function (e) {
			$.cartUtils.inputBlur($(this));
		},
		'focus': function (e) {
			$.cartUtils.inputFocus($(this));
		},
		'keyup': function (e) {
			if (e.keyCode == 13) {
				$('#zipChange .zipAction').trigger('click');
			} else if (e.keyCode == 27) {
				$('#zipChange').foundation('reveal', 'close');
			} else {
				$.cartUtils.inputKeyup($(this));
			}
		}
	});
	
	$('#zipChange').off('opened.fndtn.reveal');
	$('#zipChange').on('opened.fndtn.reveal', function() {
		$.cartUtils.openZipChange();
	});
	
	/** Trigger apply zipCode changes. */
	$('body').on('click','#zipChange .zipAction', function (e) {
		$.cartUtils.applyZipChange();
	});
	
	
	
	/*$('#secureCheckoutSidebar').hcSticky({ offResolutions: [-720] });
	if((!($.cartUtils.isCCFlow())) && $('#isInContext').val() == 'true'){
		if($('#paypalnewSDKEnabled').val()=='TRUE'){
			$('.paypaloldsdk').hide();
			$('.paypalnewsdk').show();
			var returnURL = $('#paypal-button-container').data('url'); */
			
			/*Rendering both paypalcheckout button*/
			/*var FUNDING_SOURCES_PAYPAL = [
				paypal.FUNDING.PAYPAL
			];
			FUNDING_SOURCES_PAYPAL.forEach(function(fundingSource) {				
				// Initialize the buttons				
				var checkoutbutton = paypal.Buttons({
					fundingSource: fundingSource,
					style: {
						label: 'checkout', 
						size:  'responsive',
						shape: 'rect',
						color: 'silver',
						tagline: 'false'
					},
	
					createOrder: function(data,actions) {
						return new Promise(function (resolve, reject) {
							$.cartUtils.continuePaypal(resolve, reject);
						});
					},
					
					onApprove: function(data,actions) {
						$.cartUtils.showProgress();
						var token = data.orderID;
						var payId=data.payerID;
						returnURL= returnURL+"&token="+token+"&PayerID="+payId;
						return actions.redirect(returnURL);  
					}
				});
	
				// Check if the button is eligible
				if (checkoutbutton.isEligible()) {
					checkoutbutton.render('#paypal-button-container');
				}
			});*/
			
			/*Rendering both paypal credit button*/
			/*var FUNDING_SOURCES_CREDIT = [
				paypal.FUNDING.PAYLATER
			];
			FUNDING_SOURCES_CREDIT.forEach(function(fundingSource) {
	
				// Initialize the buttons
				var creditbutton = paypal.Buttons({
					fundingSource: fundingSource,
					style: {
						size:  'responsive',
						shape: 'rect',
						tagline: 'false'
					},
	
					createOrder: function(data,actions) {
						return new Promise(function (resolve, reject) {
							$.cartUtils.continuePaypal(resolve, reject);
						});
					},
					
					onApprove: function(data,actions) {
						$.cartUtils.showProgress();
						var token = data.orderID;
						var payId=data.payerID;
						returnURL= returnURL+"&token="+token+"&PayerID="+payId;
						return actions.redirect(returnURL); 
					}
				});
	
				// Check if the button is eligible
				if (creditbutton.isEligible()) {
					creditbutton.render('#paypalCredit-button-container');
				}
			});
	} else {
		$('.paypalnewsdk').hide();
		$('.paypaloldsdk').show();
		if($('#paypalEnv').val() == 'production'){
			paypal.Button.render({
				env:'production',
				style: {
					label: 'checkout', 
					size:  'responsive',
					shape: 'rect',
					color: 'silver',
					tagline: true
			    },
				payment: function(data,actions) {
					return new paypal.Promise(function (resolve, reject) {
		                $.cartUtils.continuePaypal(resolve, reject);
					});
				},
				onAuthorize: function(data,actions) {
					 $.cartUtils.showProgress();
					return actions.redirect();
				}
				}, '#paypal-button-container');
		} else {
			paypal.Button.render({
				env:'sandbox',
				style: {
			        label: 'checkout', 
			        size:  'responsive',
			        shape: 'rect',
			        color: 'silver',
			        tagline: true
			    },
				payment: function(data,actions) {
					return new paypal.Promise(function (resolve, reject) {
		                $.cartUtils.continuePaypal(resolve, reject);
					});
				},
				onAuthorize: function(data,actions) {
					$.cartUtils.showProgress();
					return actions.redirect();
				}
				}, '#paypal-button-container');
		}*/
		
		/*added for paypalCC*/
		
		/*if($('#paypalEnv').val() == 'production'){
			paypal.Button.render({
				env:'production',
				style: {
			        label: 'credit', 
			        size:  'responsive',
			        shape: 'rect'
			    },
				payment: function(data,actions) {
					return new paypal.Promise(function (resolve, reject) {
		                $.cartUtils.continuePaypalCredit(resolve, reject);
					});
				},
				onAuthorize: function(data,actions) {
					return actions.redirect();
				}
				}, '#paypalCredit-button-container');
		} else {
			paypal.Button.render({
				env:'sandbox',
				style: {
			        label: 'credit', 
			        size:  'responsive',
			        shape: 'rect'
			    },
				payment: function(data,actions) {
					return new paypal.Promise(function (resolve, reject) {
		                $.cartUtils.continuePaypalCredit(resolve, reject);
					});
				},
				onAuthorize: function(data,actions) {
					return actions.redirect();
				}
				}, '#paypalCredit-button-container');
		}*/
		/*End paypalCC*/
	/*}
	
	}*/
	
	/*if($('#paypalnewSDKEnabled').val()=='TRUE'){
		//Rendering both paypal credit banner
		paypal.Messages({ }).render("#paypalcc_cart_banner");
	} */
	
	//$.cartUtils.setCartCookie(); 
	
	$('.xocartEmpty_cont').parents('.ltContainer').addClass('emptyCart');
	
	$('.qtypriceCont').removeClass('addRemoveLink,addRemoveLinkIcon,addRemoveLinkIconOnly,addRemoveLink,addRemoveLinkIconOnlyLR');
	$('.qtypriceCont').each(function(){
		if(($(this).find('.ccremove').is(':visible') && $(this).find('.mcprodpromo').hasClass('hideComp'))){
			$(this).addClass('addRemoveLinkIcon');
		}
		else if(($(this).find('.ccremove').not(':visible') && $(this).find('.mcprodpromo').hasClass('hideComp'))){
			$(this).addClass('addRemoveLinkIconOnly');
			if($(".rewards-icon-list").find('.nCartTooltip').is(':visible')){
					$(this).addClass('addRemoveLinkIconOnlyLR');
			}
		}
		else if($(this).find('.remove').hasClass('gift')){
			$(this).addClass('addRemoveLinkGift');
		}
		else if ($(this).find('.ccremove').is(':visible')){
			$(this).addClass('addRemoveLink');
		}
	});
	/** #DeleteAllCartItems */
	$('body').on('click','#cartclear', function (e) {
		$.cartUtils.cartclear();		
	});
	
//	hiding agent bluescript msg for normal users 
	/*if (!($.cartUtils.isCCFlow())) {
		$('.agentMsg').hide();
	} else {
		$('.agentMsg').show();
	} */
	
//	for the popup
	/*if(storeUserType == 'R'){
	  $(".regUser").show();
	  $(".guestUser").hide();
	}else{
	  $(".regUser").hide();
	  $(".guestUser").show();      
	}*/

	$("#chkLyJoin").change(function() {
		if($(this).prop('checked')) {
			$(".buttoncont").removeClass('disabled');
		} else {
			$(".buttoncont").addClass('disabled');
		}
	});
	
	/** Cart page HPRewards join now Modal changes. */
	$("body").on( "blur",".chekbox", function(){
	  $('#hpRewardsJoinModal .chktext a').focus();
	});
	
	/** Cart page HPRewards Modal checkbox changes. */
	$("body").on("keydown",".chekbox", function(){
		 var keycode = (window.event) ? window.event.keyCode : e.keyCode;
		 if (keycode == 13){
			if($("#chkLyJoin").prop('checked'))
			  $("#chkLyJoin").prop('checked',false);
			else
			  $("#chkLyJoin").prop('checked',true);
			$("#chkLyJoin").trigger('change');
		}
	});
	    
	   // if($.cartUtils.isEcpPopupShow() && $.cartUtils.isCCFlow() && $('#hasCPNotAddedForSomeHW').val()=='true' /*&& !$('#MultipleCP_punchout_Modal').foundation('reveal').hasClass('open')*/){
	    /*	$('#xocart-warn-noCPAdded-modal').foundation('reveal', 'open');
			$('.reveal-modal-bg').css('display','block');
	    	$.cartUtils.resetEcpPopupShow();
	    } */
	    
//HPEUS-3034 expandable voucher
	    var cpnCode = $('#cpnCode');
	    var cpnErrMsgDiv = $('#cpnErrMsg');
	    
	    if($(window).width() < 1000){
	    	cpnErrMsgDiv = $('#cpnErrMsgMobile');
	    }else{
	    	cpnErrMsgDiv = $('#cpnErrMsg');
	    }
		//$(".apply").addClass("disabled-link");
	   // $('#cpnCode').off('change');
	   /** Coupon code changes. */ 
		$("body").on('blur focus keyup','#cpnCode', function(){
			var inputvalue=$(this).val();
			if(inputvalue !== ""){
				$(".apply").removeClass("disabled-link");
					if($('#applied-coupon-tag').length > 0){
						if($('#couponTooltip').length > 0){
							$('#couponTooltip').addClass('hideComp');
						}
					$('#couponApplied').addClass('hideComp');
					}

			}else{
				$(".apply").addClass("disabled-link");			
				cpnCode.removeClass('error_msg');
				cpnErrMsgDiv.text(cpnCode.data('errinv')).addClass('hideComp');
					if($('#applied-coupon-tag').length > 0){
						if($('#couponTooltip').length > 0){
							$('#couponTooltip').removeClass('hideComp');
						}
					$('#couponApplied').removeClass('hideComp');
				}
			}
		});
				
		
//HPEUS-3034 expandable voucher		
	    
	/*if(document.getElementsByClassName('carterrormsgpricechange').length > 0 && document.getElementsByClassName('carterrormsgpricechange')[0].innerHTML){
			if($('#priceChngNotifiEnabled').val()){
				cartNotificationSwitch = $('#priceChngNotifiEnabled').val().trim();
			}
			if (cartNotificationSwitch == 'Y') {
				var orderId = $('#orderId').val().trim();
				$.cartUtils.updateOrderPriceChangeNotification(orderId);
			}
		} */
	
	/** carepack-attached-to-product changes. */
	$('body').on('click','.carepack-attached-to-product .Button-module_title__2xUVH', function (e) {
		var $this = $(this);
		$.cartUtils.addToCartEC($this.data('ui'));
	});

	/** This is a method for qty increment. */
	$("body").on("click", ".plus-button", function (event) {
		event.stopImmediatePropagation();
		var currentValue = $(this).prev('.value-holder').val();
			var orderItemId = $(this).data('ui').id;
			var qty = $(this).prev('.value-holder').val(parseInt(currentValue) + 1);
		if (currentValue >= 1) {
			$(this).parent().find('.minus-button').removeClass("disabled-action");
		}
		
		$.cartUtils.updateItemQty(orderItemId,qty.val());
	});

	/** This is a method for qty decrement.  */
	$("body").on("click", ".minus-button", function (event) {
		event.stopImmediatePropagation();
		var currentValue = $(this).next('.value-holder').val();
			var orderItemId = $(this).data('ui').id;
			var qty = $(this).next('.value-holder').val(parseInt(currentValue) - 1);
		$.cartUtils.updateItemQty(orderItemId,qty.val());
	});
	
	cartComponentUpdate();
	});
	
/** document.readyAgain custom event changes - start. */
function cartComponentUpdate(){
	
	if(null!=$('#optinreq').val() && $('#optinreq').val() != "") {
		sendJoinLoyaltyAnalytics();
    }

	/* HPEUS 2105 start */
	
	var exceededLimit = false;
		
	if($('body').find('.exceededCartLimitMsgWrap').length > 0){
			exceededLimit = true;										
			
			 $(window).scroll(function(){
				sticktothetop();		
			});

			function sticktothetop() {				
				if($("div").hasClass("exceededCartLimitMsgStick")){								
				  var window_top = $(window).scrollTop();
				  var top = $('.exceededCartLimitMsgStick').offset().top;
				  if (window_top > top) {
					$('.exceededCartLimitMsgWrap').addClass('stick');
					$('.exceededCartLimitMsgStick').height($('.exceededCartLimitMsgWrap').outerHeight());
				  } else {
					$('.exceededCartLimitMsgWrap').removeClass('stick');
					$('.exceededCartLimitMsgStick').height(0);
				  }
			  }			  
			}
		}
		
	/* HPEUS 2105 End */

	$('#secureCheckoutSidebar').hcSticky({ offResolutions: [-720] });
		if((!($.cartUtils.isCCFlow())) && $('#isInContext').val() == 'true'){
			if($('#paypalnewSDKEnabled').val()=='TRUE'){
				$('.paypaloldsdk').hide();
				$('.paypalnewsdk').show();
				var returnURL = $('#paypal-button-container').data('url');
				
				/*Rendering both paypalcheckout button*/
				var FUNDING_SOURCES_PAYPAL = [
					paypal.FUNDING.PAYPAL
				];
				FUNDING_SOURCES_PAYPAL.forEach(function(fundingSource) {				
					// Initialize the buttons				
					var checkoutbutton = paypal.Buttons({
						fundingSource: fundingSource,
						style: {
							label: 'checkout', 
							size:  'responsive',
							shape: 'rect',
							color: 'silver',
							tagline: 'false'
						},
		
						createOrder: function(data,actions) {
							return new Promise(function (resolve, reject) {
								$.cartUtils.continuePaypal(resolve, reject);
							});
						},
						
						onApprove: function(data,actions) {
							$.cartUtils.showProgress();
							var token = data.orderID;
							var payId=data.payerID;
							returnURL= returnURL+"&token="+token+"&PayerID="+payId;
							return actions.redirect(returnURL);  
						}
					});
		
					// Check if the button is eligible
					if (checkoutbutton.isEligible()) {
						checkoutbutton.render('#paypal-button-container');
					}
				});
				
				/*Rendering both paypal credit button*/
				var FUNDING_SOURCES_CREDIT = [
					paypal.FUNDING.PAYLATER
				];
				FUNDING_SOURCES_CREDIT.forEach(function(fundingSource) {
		
					// Initialize the buttons
					var creditbutton = paypal.Buttons({
						fundingSource: fundingSource,
						style: {
							size:  'responsive',
							shape: 'rect',
							tagline: 'false'
						},
		
						createOrder: function(data,actions) {
							return new Promise(function (resolve, reject) {
								$.cartUtils.continuePaypal(resolve, reject);
							});
						},
						
						onApprove: function(data,actions) {
							$.cartUtils.showProgress();
							var token = data.orderID;
							var payId=data.payerID;
							returnURL= returnURL+"&token="+token+"&PayerID="+payId;
							return actions.redirect(returnURL); 
						}
					});
		
					// Check if the button is eligible
					if (creditbutton.isEligible()) {
						creditbutton.render('#paypalCredit-button-container');
					}
				});
		} else {
			$('.paypalnewsdk').hide();
			$('.paypaloldsdk').show();
			if($('#paypalEnv').val() == 'production'){
				paypal.Button.render({
					env:'production',
					style: {
						label: 'checkout', 
						size:  'responsive',
						shape: 'rect',
						color: 'silver',
						tagline: true
					},
					payment: function(data,actions) {
						return new paypal.Promise(function (resolve, reject) {
							$.cartUtils.continuePaypal(resolve, reject);
						});
					},
					onAuthorize: function(data,actions) {
						 $.cartUtils.showProgress();
						return actions.redirect();
					}
					}, '#paypal-button-container');
			} else {
				paypal.Button.render({
					env:'sandbox',
					style: {
						label: 'checkout', 
						size:  'responsive',
						shape: 'rect',
						color: 'silver',
						tagline: true
					},
					payment: function(data,actions) {
						return new paypal.Promise(function (resolve, reject) {
							$.cartUtils.continuePaypal(resolve, reject);
						});
					},
					onAuthorize: function(data,actions) {
						$.cartUtils.showProgress();
						return actions.redirect();
					}
					}, '#paypal-button-container');
			}
			
			/*added for paypalCC*/
			
			if($('#paypalEnv').val() == 'production'){
				paypal.Button.render({
					env:'production',
					style: {
						label: 'credit', 
						size:  'responsive',
						shape: 'rect'
					},
					payment: function(data,actions) {
						return new paypal.Promise(function (resolve, reject) {
							$.cartUtils.continuePaypalCredit(resolve, reject);
						});
					},
					onAuthorize: function(data,actions) {
						return actions.redirect();
					}
					}, '#paypalCredit-button-container');
			} else {
				paypal.Button.render({
					env:'sandbox',
					style: {
						label: 'credit', 
						size:  'responsive',
						shape: 'rect'
					},
					payment: function(data,actions) {
						return new paypal.Promise(function (resolve, reject) {
							$.cartUtils.continuePaypalCredit(resolve, reject);
						});
					},
					onAuthorize: function(data,actions) {
						return actions.redirect();
					}
					}, '#paypalCredit-button-container');
			}
			/*End paypalCC*/
		}
			
		}
	
	if($('#paypalnewSDKEnabled').val()=='TRUE'){
		/*Rendering both paypal credit banner*/
		paypal.Messages({ }).render("#paypalcc_cart_banner");
	}
	
	$.cartUtils.setCartCookie();
	
	//	hiding agent bluescript msg for normal users 
	if (!($.cartUtils.isCCFlow())) {
		$('.agentMsg').hide();
	} else {
		$('.agentMsg').show();
	}
	
	//	for the popup
	if(storeUserType == 'R'){
	  $(".regUser").show();
	  $(".guestUser").hide();
	}else{
	  $(".regUser").hide();
	  $(".guestUser").show();      
	}
	
	if($.cartUtils.isEcpPopupShow() && $.cartUtils.isCCFlow() && $('#hasCPNotAddedForSomeHW').val()=='true' /*&& !$('#MultipleCP_punchout_Modal').foundation('reveal').hasClass('open')*/){
	    	$('#xocart-warn-noCPAdded-modal').foundation('reveal', 'open');
			$('.reveal-modal-bg').css('display','block');
	    	$.cartUtils.resetEcpPopupShow();
	}
		
	if(document.getElementsByClassName('carterrormsgpricechange').length > 0 && document.getElementsByClassName('carterrormsgpricechange')[0].innerHTML){
		if($('#priceChngNotifiEnabled').val()){
			cartNotificationSwitch = $('#priceChngNotifiEnabled').val().trim();
		}
		if (cartNotificationSwitch == 'Y') {
			var orderId = $('#orderId').val().trim();
			$.cartUtils.updateOrderPriceChangeNotification(orderId);
		}
	}
	/** Special Accessories carousel changes. */
	$('.splAccySlider').slick({
		dots : false,
		infinite : false,
		speed : 300,
		/*slidesToShow : 3,
		slidesToScroll : 1,*/
		prevArrow : $('.prevItem'),
		nextArrow : $('.nextItem'),
		/*responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false
			}
		}]*/
	});
	
}
/** document.readyAgain custom event changes - end. */

$(document).mouseleave(function () {
	var once = false;
	var mouseX= 0;
	var mouseY= 0;
	var cartAbandonmentContentid = $('#cartAbandonmentContentid').val();
	document.addEventListener("mousemove", function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;				
	});
	if (cartAbandonmentContentid == 'true') {
		console.log('Inside Cart Aban');
		if (sessionStorage.getItem('firstPopUp') !== 'true') {		
			if(once || mouseY <100){
				once = true;
				$('#CartModal').foundation('reveal','open');			
				sessionStorage.setItem('firstPopUp','true');	
				dataLayer.push({event:'e_linkClick',linkPlacement:'[page cart:cart]',linkID:'[cartabandonpopup]',udl:true});
				}
			}
	}	
});	

function checkboxcheckedcoupon2($this, CouponValue, orderId, couponAmount) {
	if ($this.checked == true) {
		$.cartUtils.applyCouponCodeCheckBox(CouponValue, orderId);
	}else{
		$.cartUtils.removeCouponCodeCheckBox(CouponValue, orderId);
	}
};

function joinnowLoyalty() {
	$.cartUtils.joinLoyalty();
};

function preparePrint(){//showEnhancedCart) {
	$('body *').not('.xo_cart, #xocartmain.mainContainer, #xocartmain.mainContainer *, .splAccyCont, .splAccyCont *').addClass('hide-for-print');
	if(!window.matchMedia('(max-width: 720px)').matches){//showEnhancedCart === 'true' && 
		if($('.shippingOptions').length === 0){
			 $('.detailed-order-summary *').removeClass('hide-for-print');
			 $('.couponCode *').removeClass('hide-for-print');
			 $(".rtContentp").html('<div class="detailed-order-summary">' + $(".detailed-order-summary").html() + '</div><div class="couponCode">' + $(".couponCode").html() + '</div>');
		}else{
			$('.shippingOptions').html('<div class="rtContentp"><div class="detailed-order-summary">'+$('.detailed-order-summary').html()+'</div><div class="couponCode">'+$('.couponCode').html()+'</div></div><div class="zipChangeWrap">'+$('.zipChangeWrap').html()+'</div><ul class="cart-shipping-method-list">'+$('.cart-shipping-method-list').html()+'</ul><div class="shipTermsWrap">'+$('.shipTermsWrap').html()+'</div>');
			$('.rtContentp *').removeClass('hide-for-print');
		}
	}/*else{
		$('#cart_summary_printview').html('<div class="lblRcCartTotal">'+$('.lblRcCartTotal').html()+'</div><div class="lblRcTotalVal">  '+$('.lblRcTotalVal').html()+'</div>');
		$('#cart_summary_printview').removeClass('hideComp');
	}*/
	window.print();
};

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isNumeric(n) {
  return !isNaN(+n) && isFinite(n);
}

function fnOpenRewardsModal(){
    setTimeout(function(){
      $('#hpRewardsJoinModal #rewardsIcon').focus();
      console.log($(document.activeElement));
    },1000);
}

function fnCloseRewardsModal(){
    $('#hpRewardsJoinModal').foundation('reveal', 'close'); 
}

/* BEGIN - HPEUS-2822 */
(function ($) {
	$.fn.countdown = function (options, callback) {
		var settings = $.extend({
			date: null,
			offset: null,
			label: null,
			hideOnComplete: false
		}, options);

		// Throw error if date is not set
		if (!settings.date) {
			$.error('Date is not defined.');
		}

		// Throw error if date is set incorectly
		if (!Date.parse(settings.date)) {
			$.error('Incorrect date format, it should look like this, mm/dd/yyyy hh:mm:ss.');
		}

		// Save container
		var container = this;

		/**
		 * Change client's local date to match offset timezone
		 * @return {Object} Fixed Date object.
		 */
		var currentDate = function () {
			// get client's current date
			var date = new Date();

			// turn date to utc
			var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

			// set new Date object
			var new_date = new Date(utc + (3600000*settings.offset));

			return new_date;
		};

		/**
		 * Main countdown function that calculates everything
		 */
		function countdown() {
			var target_date = new Date(settings.date), // set target date
				current_date = currentDate(); // get fixed current date

			// difference of dates
			var difference = target_date - current_date;

			// if difference is negative than it's pass the target date
			if (difference < 0) {
				// stop timer
				clearInterval(interval);

				if (settings.hideOnComplete) {
					$(container).hide();
				}

				if (callback && typeof callback === 'function') {
					callback(container);
				}

				return;
			}

			// basic math variables
			var _second = 1000,
				_minute = _second * 60,
				_hour = _minute * 60,
				_day = _hour * 24;

			// calculate dates
			var days = Math.floor(difference / _day),
				hours = Math.floor((difference % _day) / _hour),
				minutes = Math.floor((difference % _hour) / _minute),
				seconds = Math.floor((difference % _minute) / _second);

			// fix dates so that it will show two digets
			var minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
				seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

			// set to DOM
			var label_text = settings.label ? settings.label : '';
			var timer_text = '';

			if(days > 0) {
				var	days = (String(days).length >= 2) ? days : '0' + days;
					hours = (String(hours).length >= 2) ? hours : '0' + hours;
				timer_text = days + ':' + hours + ':' + minutes + ':' + seconds;
			} else if(hours > 0) {
				var hours = (String(hours).length >= 2) ? hours : '0' + hours;
				timer_text = hours + ':' + minutes + ':' + seconds;
			} else {
				timer_text = minutes + ':' + seconds;
			}
			
			if(label_text) {
				container.text(label_text + ' ' + timer_text);
			} else {
				container.find('.timer').text(timer_text);
			}
		}

		// start
		var interval = setInterval(countdown, 1000);
	};
})(jQuery);


/* END: HPEUS-2822 */
$(function() {
	$('#crsl_prev').empty();
	$('#crsl_next').empty();
	var productslider; //variable stores the bxslider for reference later
	var initSlider = true;
	var refreshSlider = false;
	
	if (initSlider) {
		initSlider = false;
		createSlider();
	}
	
	var resizeTimer;
	/** Height Adjustment */
	$(window).on('resize', function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout (function() {
			$('#cartAccessories li .standard_price .price_info').css('height', 'auto');
			var maxHeight = getMaxHeight($('#cartAccessories li .standard_price .price_info'));
			$('#cartAccessories li .standard_price .price_info').css('height', maxHeight);
			if (initSlider) {
				initSlider = false;
				createSlider();
			} else if ($(window).width() < 497 && productslider && productslider.destroySlider) { //Mobile
				productslider.destroySlider();
				productslider = null;
				initSlider = true;
				refreshSlider = false;
				$("._crsl ._product_title a").dotdotdot({ height : 50 });
			} else if ($(window).width() < 801) { //Tablet
				reloadbxslider(productslider, 2, 2, 249, 30, true, '#crsl_next', '#crsl_prev');
				$("._crsl ._product_title a").dotdotdot({ height : 65 });
			} else { //Desktop
				reloadbxslider(productslider, 3, 3, 249, 30, true, '#crsl_next', '#crsl_prev');
				$("._crsl ._product_title a").dotdotdot({ height : 65 });
			}
		}, 100);
	});
	
	function createSlider() {
		setTimeout(function () {
			var maxHeight = getMaxHeight($('#cartAccessories li .standard_price .price_info'));
			$('#cartAccessories li .standard_price .price_info').css('height', maxHeight);
			if ($(window).width() < 497) { //Mobile
				initSlider = true;
				$("._crsl ._product_title a").dotdotdot({ height : 50 });
			} else if ($(window).width() < 801) { //Tablet
				productslider = createbxslider('#cartAccessories', 2, 2, 249, 30, true, '#crsl_next', '#crsl_prev');
				$("._crsl ._product_title a").dotdotdot({ height : 65 });
			} else { //Desktop
				productslider = createbxslider('#cartAccessories', 3, 3, 249, 30, true, '#crsl_next', '#crsl_prev');
				$("._crsl ._product_title a").dotdotdot({ height : 65 });
			}
		}, 100);
	}

	function createbxslider(sliderelement, slideno, maxslides, slidewidth, slidemargin, controls, nextelement, prevelement) {
		var slider = $(sliderelement).bxSlider({
			minSlides : slideno,
			maxSlides : maxslides,
			slideWidth : slidewidth,
			slideMargin : slidemargin,
			controls : controls,
			nextSelector : nextelement,
			prevSelector : prevelement,
			nextText : '',
			prevText : '',
			hideControlOnEnd : true,
			infiniteLoop : false,
			pager : false,
			preventDefaultSwipeX : true,
			responsive : false,
			onSliderLoad : function () {
				refreshSlider = true;
			}
		});
		return slider;
	}
	
	function reloadbxslider(slidervariable, slideno, maxslides, slidewidth, slidemargin, controls, nextelement, prevelement) {
		if (slidervariable && slidervariable.reloadSlider && refreshSlider) {
			slidervariable.reloadSlider({
				minSlides : slideno,
				maxSlides : maxslides,
				slideWidth : slidewidth,
				slideMargin : slidemargin,
				controls : controls,
				nextSelector : nextelement,
				prevSelector : prevelement,
				nextText : '',
				prevText : '',
				hideControlOnEnd : true,
				infiniteLoop : false,
				pager : false,
				preventDefaultSwipeX : true,
				responsive : false
			});
		}
	}

	function getMaxHeight(aElements) {
		var maxHeight = 0;
		if (aElements != null && aElements.length) {
			for(var idx=0; idx<aElements.length;idx++) {
				var height = $(aElements[idx]).height();
				maxHeight = (height > maxHeight) ? height : maxHeight;
			}
		}
		return maxHeight
	}
});// jQuery HC-Sticky
// =============
// Version: 1.2.43
// Copyright: Some Web Media
// Author: Some Web Guy
// Author URL: http://twitter.com/some_web_guy
// Website: http://someweblog.com/
// Plugin URL: https://github.com/somewebmedia/hc-sticky
// License: Released under the MIT License www.opensource.org/licenses/mit-license.php
// Description: Cross-browser jQuery plugin that makes any element attached to the page and always visible while you scroll.

(function(e,t,n){"use strict";var r=function(e){console.log(e)};var i=e(t),s=t.document,o=e(s);var u=function(){var e,t=3,n=s.createElement("div"),r=n.getElementsByTagName("i");while(n.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",r[0]){}return t>4?t:e}();var a=function(){var e=t.pageXOffset!==n?t.pageXOffset:s.compatMode=="CSS1Compat"?t.document.documentElement.scrollLeft:t.document.body.scrollLeft,r=t.pageYOffset!==n?t.pageYOffset:s.compatMode=="CSS1Compat"?t.document.documentElement.scrollTop:t.document.body.scrollTop;if(typeof a.x=="undefined"){a.x=e;a.y=r}if(typeof a.distanceX=="undefined"){a.distanceX=e;a.distanceY=r}else{a.distanceX=e-a.x;a.distanceY=r-a.y}var i=a.x-e,o=a.y-r;a.direction=i<0?"right":i>0?"left":o<=0?"down":o>0?"up":"first";a.x=e;a.y=r};i.on("scroll",a);e.fn.style=function(n){if(!n)return null;var r=e(this),i;var o=r.clone().css("display","none");o.find("input:radio").attr("name","copy-"+Math.floor(Math.random()*100+1));r.after(o);var u=function(e,n){var i;if(e.currentStyle){i=e.currentStyle[n.replace(/-\w/g,function(e){return e.toUpperCase().replace("-","")})]}else if(t.getComputedStyle){i=s.defaultView.getComputedStyle(e,null).getPropertyValue(n)}i=/margin/g.test(n)?parseInt(i)===r[0].offsetLeft?i:"auto":i;return i};if(typeof n=="string"){i=u(o[0],n)}else{i={};e.each(n,function(e,t){i[t]=u(o[0],t)})}o.remove();return i||null};e.fn.extend({hcSticky:function(r){if(this.length==0)return this;this.pluginOptions("hcSticky",{top:0,bottom:0,bottomEnd:0,innerTop:0,innerSticker:null,className:"sticky",wrapperClassName:"wrapper-sticky",stickTo:null,responsive:true,followScroll:true,offResolutions:null,onStart:e.noop,onStop:e.noop,on:true,fn:null},r||{},{reinit:function(){e(this).hcSticky()},stop:function(){e(this).pluginOptions("hcSticky",{on:false}).each(function(){var t=e(this),n=t.pluginOptions("hcSticky"),r=t.parent("."+n.wrapperClassName);var i=t.offset().top-r.offset().top;t.css({position:"absolute",top:i,bottom:"auto",left:"auto",right:"auto"}).removeClass(n.className)})},off:function(){e(this).pluginOptions("hcSticky",{on:false}).each(function(){var t=e(this),n=t.pluginOptions("hcSticky"),r=t.parent("."+n.wrapperClassName);t.css({position:"relative",top:"auto",bottom:"auto",left:"auto",right:"auto"}).removeClass(n.className);r.css("height","auto")})},on:function(){e(this).each(function(){e(this).pluginOptions("hcSticky",{on:true,remember:{offsetTop:i.scrollTop()}}).hcSticky()})},destroy:function(){var t=e(this),n=t.pluginOptions("hcSticky"),r=t.parent("."+n.wrapperClassName);t.removeData("hcStickyInit").css({position:r.css("position"),top:r.css("top"),bottom:r.css("bottom"),left:r.css("left"),right:r.css("right")}).removeClass(n.className);i.off("resize",n.fn.resize).off("scroll",n.fn.scroll);t.unwrap()}});if(r&&typeof r.on!="undefined"){if(r.on){this.hcSticky("on")}else{this.hcSticky("off")}}if(typeof r=="string")return this;return this.each(function(){var r=e(this),s=r.pluginOptions("hcSticky");var f=function(){var e=r.parent("."+s.wrapperClassName);if(e.length>0){e.css({height:r.outerHeight(true),width:function(){var t=e.style("width");if(t.indexOf("%")>=0||t=="auto"){if(r.css("box-sizing")=="border-box"||r.css("-moz-box-sizing")=="border-box"){r.css("width",e.width())}else{r.css("width",e.width()-parseInt(r.css("padding-left")-parseInt(r.css("padding-right"))))}return t}else{return r.outerWidth(true)}}()});return e}else{return false}}()||function(){var t=r.style(["width","margin-left","left","right","top","bottom","float","display"]);var n=r.css("display");var i=e("<div>",{"class":s.wrapperClassName}).css({display:n,height:r.outerHeight(true),width:function(){if(t["width"].indexOf("%")>=0||t["width"]=="auto"&&n!="inline-block"&&n!="inline"){r.css("width",parseFloat(r.css("width")));return t["width"]}else if(t["width"]=="auto"&&(n=="inline-block"||n=="inline")){return r.width()}else{return t["margin-left"]=="auto"?r.outerWidth():r.outerWidth(true)}}(),margin:t["margin-left"]?"auto":null,position:function(){var e=r.css("position");return e=="static"?"relative":e}(),"float":t["float"]||null,left:t["left"],right:t["right"],top:t["top"],bottom:t["bottom"],"vertical-align":"top"});r.wrap(i);if(u===7){if(e("head").find("style#hcsticky-iefix").length===0){e('<style id="hcsticky-iefix">.'+s.wrapperClassName+" {zoom: 1;}</style>").appendTo("head")}}return r.parent()}();if(r.data("hcStickyInit"))return;r.data("hcStickyInit",true);var l=s.stickTo&&(s.stickTo=="document"||s.stickTo.nodeType&&s.stickTo.nodeType==9||typeof s.stickTo=="object"&&s.stickTo instanceof(typeof HTMLDocument!="undefined"?HTMLDocument:Document))?true:false;var c=s.stickTo?l?o:typeof s.stickTo=="string"?e(s.stickTo):s.stickTo:f.parent();r.css({top:"auto",bottom:"auto",left:"auto",right:"auto"});i.load(function(){if(r.outerHeight(true)>c.height()){f.css("height",r.outerHeight(true));r.hcSticky("reinit")}});var h=function(e){if(r.hasClass(s.className))return;e=e||{};r.css({position:"fixed",top:e.top||0,left:e.left||f.offset().left}).addClass(s.className);s.onStart.apply(r[0]);f.addClass("sticky-active")},p=function(e){e=e||{};e.position=e.position||"absolute";e.top=e.top||0;e.left=e.left||0;if(r.css("position")!="fixed"&&parseInt(r.css("top"))==e.top)return;r.css({position:e.position,top:e.top,left:e.left}).removeClass(s.className);s.onStop.apply(r[0]);f.removeClass("sticky-active")};var d=function(t){if(!s.on||!r.is(":visible"))return;if(r.outerHeight(true)>=c.height()){p();return}var n=s.innerSticker?e(s.innerSticker).position().top:s.innerTop?s.innerTop:0,o=f.offset().top,u=c.height()-s.bottomEnd+(l?0:o),d=f.offset().top-s.top+n,v=r.outerHeight(true)+s.bottom,m=i.height(),g=i.scrollTop(),y=r.offset().top,b=y-g,w;if(typeof s.remember!="undefined"&&s.remember){var E=y-s.top-n;if(v-n>m&&s.followScroll){if(E<g&&g+m<=E+r.height()){s.remember=false}}else{if(s.remember.offsetTop>E){if(g<=E){h({top:s.top-n});s.remember=false}}else{if(g>=E){h({top:s.top-n});s.remember=false}}}return}if(g>d){if(u+s.bottom-(s.followScroll&&m<v?0:s.top)<=g+v-n-(v-n>m-(d-n)&&s.followScroll?(w=v-m-n)>0?w:0:0)){p({top:u-v+s.bottom-o})}else if(v-n>m&&s.followScroll){if(b+v<=m){if(a.direction=="down"){h({top:m-v})}else{if(b<0&&r.css("position")=="fixed"){p({top:y-(d+s.top-n)-a.distanceY})}}}else{if(a.direction=="up"&&y>=g+s.top-n){h({top:s.top-n})}else if(a.direction=="down"&&y+v>m&&r.css("position")=="fixed"){p({top:y-(d+s.top-n)-a.distanceY})}}}else{h({top:s.top-n})}}else{p()}};var v=false,m=false;var g=function(){b();y();if(!s.on)return;var e=function(){if(r.css("position")=="fixed"){r.css("left",f.offset().left)}else{r.css("left",0)}};if(s.responsive){if(!m){m=r.clone().attr("style","").css({visibility:"hidden",height:0,overflow:"hidden",paddingTop:0,paddingBottom:0,marginTop:0,marginBottom:0});f.after(m)}var t=f.style("width");var n=m.style("width");if(n=="auto"&&t!="auto"){n=parseInt(r.css("width"))}if(n!=t){f.width(n)}if(v){clearTimeout(v)}v=setTimeout(function(){v=false;m.remove();m=false},250)}e();if(r.outerWidth(true)!=f.width()){var i=r.css("box-sizing")=="border-box"||r.css("-moz-box-sizing")=="border-box"?f.width():f.width()-parseInt(r.css("padding-left"))-parseInt(r.css("padding-right"));i=i-parseInt(r.css("margin-left"))-parseInt(r.css("margin-right"));r.css("width",i)}};r.pluginOptions("hcSticky",{fn:{scroll:d,resize:g}});var y=function(){if(s.offResolutions){if(!e.isArray(s.offResolutions)){s.offResolutions=[s.offResolutions]}var t=true;e.each(s.offResolutions,function(e,n){if(n<0){if(i.width()<n*-1){t=false;r.hcSticky("off")}}else{if(i.width()>n){t=false;r.hcSticky("off")}}});if(t&&!s.on){r.hcSticky("on")}}};y();i.on("resize",g);var b=function(){var r=false;if(e._data(t,"events").scroll!=n){e.each(e._data(t,"events").scroll,function(e,t){if(t.handler==s.fn.scroll){r=true}})}if(!r){s.fn.scroll(true);i.on("scroll",s.fn.scroll)}};b()})}})})(jQuery,this);(function(e,t){"use strict";e.fn.extend({pluginOptions:function(n,r,i,s){if(!this.data(n))this.data(n,{});if(n&&typeof r=="undefined")return this.data(n).options;i=i||r||{};if(typeof i=="object"||i===t){return this.each(function(){var t=e(this);if(!t.data(n).options){t.data(n,{options:e.extend(r,i||{})});if(s){t.data(n).commands=s}}else{t.data(n,e.extend(t.data(n),{options:e.extend(t.data(n).options,i||{})}))}})}else if(typeof i=="string"){return this.each(function(){e(this).data(n).commands[i].call(this)})}else{return this}}})})(jQuery);/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function(d){var c=window.Slick||{};c=function(){function e(i,h){var b,g=this;g.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:d(i),appendDots:d(i),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3000,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(f,j){return d('<button type="button" data-role="none" role="button" tabindex="0" />').text(j+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:0.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1000},g.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},d.extend(g,g.initials),g.activeBreakpoint=null,g.animType=null,g.animProp=null,g.breakpoints=[],g.breakpointSettings=[],g.cssTransitions=!1,g.focussed=!1,g.interrupted=!1,g.hidden="hidden",g.paused=!0,g.positionProp=null,g.respondTo=null,g.rowCount=1,g.shouldClick=!0,g.$slider=d(i),g.$slidesCache=null,g.transformType=null,g.transitionType=null,g.visibilityChange="visibilitychange",g.windowWidth=0,g.windowTimer=null,b=d(i).data("slick")||{},g.options=d.extend({},g.defaults,h,b),g.currentSlide=g.options.initialSlide,g.originalSettings=g.options,"undefined"!=typeof document.mozHidden?(g.hidden="mozHidden",g.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(g.hidden="webkitHidden",g.visibilityChange="webkitvisibilitychange"),g.autoPlay=d.proxy(g.autoPlay,g),g.autoPlayClear=d.proxy(g.autoPlayClear,g),g.autoPlayIterator=d.proxy(g.autoPlayIterator,g),g.changeSlide=d.proxy(g.changeSlide,g),g.clickHandler=d.proxy(g.clickHandler,g),g.selectHandler=d.proxy(g.selectHandler,g),g.setPosition=d.proxy(g.setPosition,g),g.swipeHandler=d.proxy(g.swipeHandler,g),g.dragHandler=d.proxy(g.dragHandler,g),g.keyHandler=d.proxy(g.keyHandler,g),g.instanceUid=a++,g.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,g.registerBreakpoints(),g.init(!0)}var a=0;return e}(),c.prototype.activateADA=function(){var b=this;b.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},c.prototype.addSlide=c.prototype.slickAdd=function(a,h,g){var f=this;if("boolean"==typeof h){g=h,h=null}else{if(0>h||h>=f.slideCount){return !1}}f.unload(),"number"==typeof h?0===h&&0===f.$slides.length?d(a).appendTo(f.$slideTrack):g?d(a).insertBefore(f.$slides.eq(h)):d(a).insertAfter(f.$slides.eq(h)):g===!0?d(a).prependTo(f.$slideTrack):d(a).appendTo(f.$slideTrack),f.$slides=f.$slideTrack.children(this.options.slide),f.$slideTrack.children(this.options.slide).detach(),f.$slideTrack.append(f.$slides),f.$slides.each(function(e,i){d(i).attr("data-slick-index",e)}),f.$slidesCache=f.$slides,f.reinit()},c.prototype.animateHeight=function(){var f=this;if(1===f.options.slidesToShow&&f.options.adaptiveHeight===!0&&f.options.vertical===!1){var e=f.$slides.eq(f.currentSlide).outerHeight(!0);f.$list.animate({height:e},f.options.speed)}},c.prototype.animateSlide=function(a,h){var g={},f=this;f.animateHeight(),f.options.rtl===!0&&f.options.vertical===!1&&(a=-a),f.transformsEnabled===!1?f.options.vertical===!1?f.$slideTrack.animate({left:a},f.options.speed,f.options.easing,h):f.$slideTrack.animate({top:a},f.options.speed,f.options.easing,h):f.cssTransitions===!1?(f.options.rtl===!0&&(f.currentLeft=-f.currentLeft),d({animStart:f.currentLeft}).animate({animStart:a},{duration:f.options.speed,easing:f.options.easing,step:function(b){b=Math.ceil(b),f.options.vertical===!1?(g[f.animType]="translate("+b+"px, 0px)",f.$slideTrack.css(g)):(g[f.animType]="translate(0px,"+b+"px)",f.$slideTrack.css(g))},complete:function(){h&&h.call()}})):(f.applyTransition(),a=Math.ceil(a),f.options.vertical===!1?g[f.animType]="translate3d("+a+"px, 0px, 0px)":g[f.animType]="translate3d(0px,"+a+"px, 0px)",f.$slideTrack.css(g),h&&setTimeout(function(){f.disableTransition(),h.call()},f.options.speed))},c.prototype.getNavTarget=function(){var a=this,e=a.options.asNavFor;return e&&null!==e&&(e=d(e).not(a.$slider)),e},c.prototype.asNavFor=function(a){var f=this,e=f.getNavTarget();null!==e&&"object"==typeof e&&e.each(function(){var b=d(this).slick("getSlick");b.unslicked||b.slideHandler(a,!0)})},c.prototype.applyTransition=function(f){var e=this,g={};e.options.fade===!1?g[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:g[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,e.options.fade===!1?e.$slideTrack.css(g):e.$slides.eq(f).css(g)},c.prototype.autoPlay=function(){var b=this;b.autoPlayClear(),b.slideCount>b.options.slidesToShow&&(b.autoPlayTimer=setInterval(b.autoPlayIterator,b.options.autoplaySpeed))},c.prototype.autoPlayClear=function(){var b=this;b.autoPlayTimer&&clearInterval(b.autoPlayTimer)},c.prototype.autoPlayIterator=function(){var f=this,e=f.currentSlide+f.options.slidesToScroll;f.paused||f.interrupted||f.focussed||(f.options.infinite===!1&&(1===f.direction&&f.currentSlide+1===f.slideCount-1?f.direction=0:0===f.direction&&(e=f.currentSlide-f.options.slidesToScroll,f.currentSlide-1===0&&(f.direction=1))),f.slideHandler(e))},c.prototype.buildArrows=function(){var a=this;a.options.arrows===!0&&(a.$prevArrow=d(a.options.prevArrow).addClass("slick-arrow"),a.$nextArrow=d(a.options.nextArrow).addClass("slick-arrow"),a.slideCount>a.options.slidesToShow?(a.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),a.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),a.htmlExpr.test(a.options.prevArrow)&&a.$prevArrow.prependTo(a.options.appendArrows),a.htmlExpr.test(a.options.nextArrow)&&a.$nextArrow.appendTo(a.options.appendArrows),a.options.infinite!==!0&&a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):a.$prevArrow.add(a.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},c.prototype.buildDots=function(){var f,e,a=this;if(a.options.dots===!0&&a.slideCount>a.options.slidesToShow){for(a.$slider.addClass("slick-dotted"),e=d("<ul />").addClass(a.options.dotsClass),f=0;f<=a.getDotCount();f+=1){e.append(d("<li />").append(a.options.customPaging.call(this,a,f)))}a.$dots=e.appendTo(a.options.appendDots),a.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},c.prototype.buildOut=function(){var a=this;a.$slides=a.$slider.children(a.options.slide+":not(.slick-cloned)").addClass("slick-slide"),a.slideCount=a.$slides.length,a.$slides.each(function(e,f){d(f).attr("data-slick-index",e).data("originalStyling",d(f).attr("style")||"")}),a.$slider.addClass("slick-slider"),a.$slideTrack=0===a.slideCount?d('<div class="slick-track"/>').appendTo(a.$slider):a.$slides.wrapAll('<div class="slick-track"/>').parent(),a.$list=a.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),a.$slideTrack.css("opacity",0),(a.options.centerMode===!0||a.options.swipeToSlide===!0)&&(a.options.slidesToScroll=1),d("img[data-lazy]",a.$slider).not("[src]").addClass("slick-loading"),a.setupInfinite(),a.buildArrows(),a.buildDots(),a.updateDots(),a.setSlideClasses("number"==typeof a.currentSlide?a.currentSlide:0),a.options.draggable===!0&&a.$list.addClass("draggable")},c.prototype.buildRows=function(){var u,t,s,r,q,p,o,v=this;if(r=document.createDocumentFragment(),p=v.$slider.children(),v.options.rows>1){for(o=v.options.slidesPerRow*v.options.rows,q=Math.ceil(p.length/o),u=0;q>u;u++){var n=document.createElement("div");for(t=0;t<v.options.rows;t++){var m=document.createElement("div");for(s=0;s<v.options.slidesPerRow;s++){var l=u*o+(t*v.options.slidesPerRow+s);p.get(l)&&m.appendChild(p.get(l))}n.appendChild(m)}r.appendChild(n)}v.$slider.empty().append(r),v.$slider.children().children().children().css({width:100/v.options.slidesPerRow+"%",display:"inline-block"})}},c.prototype.checkResponsive=function(r,q){var o,n,m,p=this,l=!1,k=p.$slider.width(),a=window.innerWidth||d(window).width();if("window"===p.respondTo?m=a:"slider"===p.respondTo?m=k:"min"===p.respondTo&&(m=Math.min(a,k)),p.options.responsive&&p.options.responsive.length&&null!==p.options.responsive){n=null;for(o in p.breakpoints){p.breakpoints.hasOwnProperty(o)&&(p.originalSettings.mobileFirst===!1?m<p.breakpoints[o]&&(n=p.breakpoints[o]):m>p.breakpoints[o]&&(n=p.breakpoints[o]))}null!==n?null!==p.activeBreakpoint?(n!==p.activeBreakpoint||q)&&(p.activeBreakpoint=n,"unslick"===p.breakpointSettings[n]?p.unslick(n):(p.options=d.extend({},p.originalSettings,p.breakpointSettings[n]),r===!0&&(p.currentSlide=p.options.initialSlide),p.refresh(r)),l=n):(p.activeBreakpoint=n,"unslick"===p.breakpointSettings[n]?p.unslick(n):(p.options=d.extend({},p.originalSettings,p.breakpointSettings[n]),r===!0&&(p.currentSlide=p.options.initialSlide),p.refresh(r)),l=n):null!==p.activeBreakpoint&&(p.activeBreakpoint=null,p.options=p.originalSettings,r===!0&&(p.currentSlide=p.options.initialSlide),p.refresh(r),l=n),r||l===!1||p.$slider.trigger("breakpoint",[p,l])}},c.prototype.changeSlide=function(a,p){var m,l,k,o=this,n=d(a.currentTarget);switch(n.is("a")&&a.preventDefault(),n.is("li")||(n=n.closest("li")),k=o.slideCount%o.options.slidesToScroll!==0,m=k?0:(o.slideCount-o.currentSlide)%o.options.slidesToScroll,a.data.message){case"previous":l=0===m?o.options.slidesToScroll:o.options.slidesToShow-m,o.slideCount>o.options.slidesToShow&&o.slideHandler(o.currentSlide-l,!1,p);break;case"next":l=0===m?o.options.slidesToScroll:m,o.slideCount>o.options.slidesToShow&&o.slideHandler(o.currentSlide+l,!1,p);break;case"index":var j=0===a.data.index?0:a.data.index||n.index()*o.options.slidesToScroll;o.slideHandler(o.checkNavigable(j),!1,p),n.children().trigger("focus");break;default:return}},c.prototype.checkNavigable=function(g){var j,i,f=this;if(j=f.getNavigableIndexes(),i=0,g>j[j.length-1]){g=j[j.length-1]}else{for(var h in j){if(g<j[h]){g=i;break}i=j[h]}}return g},c.prototype.cleanUpEvents=function(){var a=this;a.options.dots&&null!==a.$dots&&d("li",a.$dots).off("click.slick",a.changeSlide).off("mouseenter.slick",d.proxy(a.interrupt,a,!0)).off("mouseleave.slick",d.proxy(a.interrupt,a,!1)),a.$slider.off("focus.slick blur.slick"),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow&&a.$prevArrow.off("click.slick",a.changeSlide),a.$nextArrow&&a.$nextArrow.off("click.slick",a.changeSlide)),a.$list.off("touchstart.slick mousedown.slick",a.swipeHandler),a.$list.off("touchmove.slick mousemove.slick",a.swipeHandler),a.$list.off("touchend.slick mouseup.slick",a.swipeHandler),a.$list.off("touchcancel.slick mouseleave.slick",a.swipeHandler),a.$list.off("click.slick",a.clickHandler),d(document).off(a.visibilityChange,a.visibility),a.cleanUpSlideEvents(),a.options.accessibility===!0&&a.$list.off("keydown.slick",a.keyHandler),a.options.focusOnSelect===!0&&d(a.$slideTrack).children().off("click.slick",a.selectHandler),d(window).off("orientationchange.slick.slick-"+a.instanceUid,a.orientationChange),d(window).off("resize.slick.slick-"+a.instanceUid,a.resize),d("[draggable!=true]",a.$slideTrack).off("dragstart",a.preventDefault),d(window).off("load.slick.slick-"+a.instanceUid,a.setPosition),d(document).off("ready.slick.slick-"+a.instanceUid,a.setPosition)},c.prototype.cleanUpSlideEvents=function(){var a=this;a.$list.off("mouseenter.slick",d.proxy(a.interrupt,a,!0)),a.$list.off("mouseleave.slick",d.proxy(a.interrupt,a,!1))},c.prototype.cleanUpRows=function(){var e,f=this;f.options.rows>1&&(e=f.$slides.children().children(),e.removeAttr("style"),f.$slider.empty().append(e))},c.prototype.clickHandler=function(f){var e=this;e.shouldClick===!1&&(f.stopImmediatePropagation(),f.stopPropagation(),f.preventDefault())},c.prototype.destroy=function(a){var e=this;e.autoPlayClear(),e.touchObject={},e.cleanUpEvents(),d(".slick-cloned",e.$slider).detach(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.$prevArrow.length&&(e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove()),e.$nextArrow&&e.$nextArrow.length&&(e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove()),e.$slides&&(e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){d(this).attr("style",d(this).data("originalStyling"))}),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.detach(),e.$list.detach(),e.$slider.append(e.$slides)),e.cleanUpRows(),e.$slider.removeClass("slick-slider"),e.$slider.removeClass("slick-initialized"),e.$slider.removeClass("slick-dotted"),e.unslicked=!0,a||e.$slider.trigger("destroy",[e])},c.prototype.disableTransition=function(f){var e=this,g={};g[e.transitionType]="",e.options.fade===!1?e.$slideTrack.css(g):e.$slides.eq(f).css(g)},c.prototype.fadeSlide=function(f,e){var g=this;g.cssTransitions===!1?(g.$slides.eq(f).css({zIndex:g.options.zIndex}),g.$slides.eq(f).animate({opacity:1},g.options.speed,g.options.easing,e)):(g.applyTransition(f),g.$slides.eq(f).css({opacity:1,zIndex:g.options.zIndex}),e&&setTimeout(function(){g.disableTransition(f),e.call()},g.options.speed))},c.prototype.fadeSlideOut=function(f){var e=this;e.cssTransitions===!1?e.$slides.eq(f).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(f),e.$slides.eq(f).css({opacity:0,zIndex:e.options.zIndex-2}))},c.prototype.filterSlides=c.prototype.slickFilter=function(f){var e=this;null!==f&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(f).appendTo(e.$slideTrack),e.reinit())},c.prototype.focusHandler=function(){var a=this;a.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(e){e.stopImmediatePropagation();var b=d(this);setTimeout(function(){a.options.pauseOnFocus&&(a.focussed=b.is(":focus"),a.autoPlay())},0)})},c.prototype.getCurrent=c.prototype.slickCurrentSlide=function(){var b=this;return b.currentSlide},c.prototype.getDotCount=function(){var f=this,e=0,h=0,g=0;if(f.options.infinite===!0){for(;e<f.slideCount;){++g,e=h+f.options.slidesToScroll,h+=f.options.slidesToScroll<=f.options.slidesToShow?f.options.slidesToScroll:f.options.slidesToShow}}else{if(f.options.centerMode===!0){g=f.slideCount}else{if(f.options.asNavFor){for(;e<f.slideCount;){++g,e=h+f.options.slidesToScroll,h+=f.options.slidesToScroll<=f.options.slidesToShow?f.options.slidesToScroll:f.options.slidesToShow}}else{g=1+Math.ceil((f.slideCount-f.options.slidesToShow)/f.options.slidesToScroll)}}}return g-1},c.prototype.getLeft=function(h){var l,k,i,g=this,j=0;return g.slideOffset=0,k=g.$slides.first().outerHeight(!0),g.options.infinite===!0?(g.slideCount>g.options.slidesToShow&&(g.slideOffset=g.slideWidth*g.options.slidesToShow*-1,j=k*g.options.slidesToShow*-1),g.slideCount%g.options.slidesToScroll!==0&&h+g.options.slidesToScroll>g.slideCount&&g.slideCount>g.options.slidesToShow&&(h>g.slideCount?(g.slideOffset=(g.options.slidesToShow-(h-g.slideCount))*g.slideWidth*-1,j=(g.options.slidesToShow-(h-g.slideCount))*k*-1):(g.slideOffset=g.slideCount%g.options.slidesToScroll*g.slideWidth*-1,j=g.slideCount%g.options.slidesToScroll*k*-1))):h+g.options.slidesToShow>g.slideCount&&(g.slideOffset=(h+g.options.slidesToShow-g.slideCount)*g.slideWidth,j=(h+g.options.slidesToShow-g.slideCount)*k),g.slideCount<=g.options.slidesToShow&&(g.slideOffset=0,j=0),g.options.centerMode===!0&&g.options.infinite===!0?g.slideOffset+=g.slideWidth*Math.floor(g.options.slidesToShow/2)-g.slideWidth:g.options.centerMode===!0&&(g.slideOffset=0,g.slideOffset+=g.slideWidth*Math.floor(g.options.slidesToShow/2)),l=g.options.vertical===!1?h*g.slideWidth*-1+g.slideOffset:h*k*-1+j,g.options.variableWidth===!0&&(i=g.slideCount<=g.options.slidesToShow||g.options.infinite===!1?g.$slideTrack.children(".slick-slide").eq(h):g.$slideTrack.children(".slick-slide").eq(h+g.options.slidesToShow),l=g.options.rtl===!0?i[0]?-1*(g.$slideTrack.width()-i[0].offsetLeft-i.width()):0:i[0]?-1*i[0].offsetLeft:0,g.options.centerMode===!0&&(i=g.slideCount<=g.options.slidesToShow||g.options.infinite===!1?g.$slideTrack.children(".slick-slide").eq(h):g.$slideTrack.children(".slick-slide").eq(h+g.options.slidesToShow+1),l=g.options.rtl===!0?i[0]?-1*(g.$slideTrack.width()-i[0].offsetLeft-i.width()):0:i[0]?-1*i[0].offsetLeft:0,l+=(g.$list.width()-i.outerWidth())/2)),l},c.prototype.getOption=c.prototype.slickGetOption=function(f){var e=this;return e.options[f]},c.prototype.getNavigableIndexes=function(){var h,g=this,f=0,j=0,i=[];for(g.options.infinite===!1?h=g.slideCount:(f=-1*g.options.slidesToScroll,j=-1*g.options.slidesToScroll,h=2*g.slideCount);h>f;){i.push(f),f=j+g.options.slidesToScroll,j+=g.options.slidesToScroll<=g.options.slidesToShow?g.options.slidesToScroll:g.options.slidesToShow}return i},c.prototype.getSlick=function(){return this},c.prototype.getSlideCount=function(){var h,g,f,a=this;return f=a.options.centerMode===!0?a.slideWidth*Math.floor(a.options.slidesToShow/2):0,a.options.swipeToSlide===!0?(a.$slideTrack.find(".slick-slide").each(function(e,b){return b.offsetLeft-f+d(b).outerWidth()/2>-1*a.swipeLeft?(g=b,!1):void 0}),h=Math.abs(d(g).attr("data-slick-index")-a.currentSlide)||1):a.options.slidesToScroll},c.prototype.goTo=c.prototype.slickGoTo=function(f,e){var g=this;g.changeSlide({data:{message:"index",index:parseInt(f)}},e)},c.prototype.init=function(a){var e=this;d(e.$slider).hasClass("slick-initialized")||(d(e.$slider).addClass("slick-initialized"),e.buildRows(),e.buildOut(),e.setProps(),e.startLoad(),e.loadSlider(),e.initializeEvents(),e.updateArrows(),e.updateDots(),e.checkResponsive(!0),e.focusHandler()),a&&e.$slider.trigger("init",[e]),e.options.accessibility===!0&&e.initADA(),e.options.autoplay&&(e.paused=!1,e.autoPlay())},c.prototype.initADA=function(){var a=this;a.$slides.add(a.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),/*a.$slideTrack.attr("role","listbox"),*/a.$slides.not(a.$slideTrack.find(".slick-cloned")).each(function(b){d(this).attr({role:"option","aria-describedby":"slick-slide"+a.instanceUid+b})}),null!==a.$dots&&a.$dots.attr("role","tablist").find("li").each(function(b){d(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+a.instanceUid+b,id:"slick-slide"+a.instanceUid+b})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),a.activateADA()},c.prototype.initArrowEvents=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},b.changeSlide),b.$nextArrow.off("click.slick").on("click.slick",{message:"next"},b.changeSlide))},c.prototype.initDotEvents=function(){var a=this;a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&d("li",a.$dots).on("click.slick",{message:"index"},a.changeSlide),a.options.dots===!0&&a.options.pauseOnDotsHover===!0&&d("li",a.$dots).on("mouseenter.slick",d.proxy(a.interrupt,a,!0)).on("mouseleave.slick",d.proxy(a.interrupt,a,!1))},c.prototype.initSlideEvents=function(){var a=this;a.options.pauseOnHover&&(a.$list.on("mouseenter.slick",d.proxy(a.interrupt,a,!0)),a.$list.on("mouseleave.slick",d.proxy(a.interrupt,a,!1)))},c.prototype.initializeEvents=function(){var a=this;a.initArrowEvents(),a.initDotEvents(),a.initSlideEvents(),a.$list.on("touchstart.slick mousedown.slick",{action:"start"},a.swipeHandler),a.$list.on("touchmove.slick mousemove.slick",{action:"move"},a.swipeHandler),a.$list.on("touchend.slick mouseup.slick",{action:"end"},a.swipeHandler),a.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},a.swipeHandler),a.$list.on("click.slick",a.clickHandler),d(document).on(a.visibilityChange,d.proxy(a.visibility,a)),a.options.accessibility===!0&&a.$list.on("keydown.slick",a.keyHandler),a.options.focusOnSelect===!0&&d(a.$slideTrack).children().on("click.slick",a.selectHandler),d(window).on("orientationchange.slick.slick-"+a.instanceUid,d.proxy(a.orientationChange,a)),d(window).on("resize.slick.slick-"+a.instanceUid,d.proxy(a.resize,a)),d("[draggable!=true]",a.$slideTrack).on("dragstart",a.preventDefault),d(window).on("load.slick.slick-"+a.instanceUid,a.setPosition),d(document).on("ready.slick.slick-"+a.instanceUid,a.setPosition)},c.prototype.initUI=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow.show(),b.$nextArrow.show()),b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&b.$dots.show()},c.prototype.keyHandler=function(f){var e=this;f.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===f.keyCode&&e.options.accessibility===!0?e.changeSlide({data:{message:e.options.rtl===!0?"next":"previous"}}):39===f.keyCode&&e.options.accessibility===!0&&e.changeSlide({data:{message:e.options.rtl===!0?"previous":"next"}}))},c.prototype.lazyLoad=function(){function h(b){d("img[data-lazy]",b).each(function(){var m=d(this),g=d(this).attr("data-lazy"),f=document.createElement("img");f.onload=function(){m.animate({opacity:0},100,function(){m.attr("src",g).animate({opacity:1},200,function(){m.removeAttr("data-lazy").removeClass("slick-loading")}),a.$slider.trigger("lazyLoaded",[a,m,g])})},f.onerror=function(){m.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),a.$slider.trigger("lazyLoadError",[a,m,g])},f.src=g})}var l,k,j,i,a=this;a.options.centerMode===!0?a.options.infinite===!0?(j=a.currentSlide+(a.options.slidesToShow/2+1),i=j+a.options.slidesToShow+2):(j=Math.max(0,a.currentSlide-(a.options.slidesToShow/2+1)),i=2+(a.options.slidesToShow/2+1)+a.currentSlide):(j=a.options.infinite?a.options.slidesToShow+a.currentSlide:a.currentSlide,i=Math.ceil(j+a.options.slidesToShow),a.options.fade===!0&&(j>0&&j--,i<=a.slideCount&&i++)),l=a.$slider.find(".slick-slide").slice(j,i),h(l),a.slideCount<=a.options.slidesToShow?(k=a.$slider.find(".slick-slide"),h(k)):a.currentSlide>=a.slideCount-a.options.slidesToShow?(k=a.$slider.find(".slick-cloned").slice(0,a.options.slidesToShow),h(k)):0===a.currentSlide&&(k=a.$slider.find(".slick-cloned").slice(-1*a.options.slidesToShow),h(k))},c.prototype.loadSlider=function(){var b=this;b.setPosition(),b.$slideTrack.css({opacity:1}),b.$slider.removeClass("slick-loading"),b.initUI(),"progressive"===b.options.lazyLoad&&b.progressiveLazyLoad()},c.prototype.next=c.prototype.slickNext=function(){var b=this;b.changeSlide({data:{message:"next"}})},c.prototype.orientationChange=function(){var b=this;b.checkResponsive(),b.setPosition()},c.prototype.pause=c.prototype.slickPause=function(){var b=this;b.autoPlayClear(),b.paused=!0},c.prototype.play=c.prototype.slickPlay=function(){var b=this;b.autoPlay(),b.options.autoplay=!0,b.paused=!1,b.focussed=!1,b.interrupted=!1},c.prototype.postSlide=function(f){var e=this;e.unslicked||(e.$slider.trigger("afterChange",[e,f]),e.animating=!1,e.setPosition(),e.swipeLeft=null,e.options.autoplay&&e.autoPlay(),e.options.accessibility===!0&&e.initADA())},c.prototype.prev=c.prototype.slickPrev=function(){var b=this;b.changeSlide({data:{message:"previous"}})},c.prototype.preventDefault=function(b){b.preventDefault()},c.prototype.progressiveLazyLoad=function(a){a=a||1;var j,i,h,l=this,k=d("img[data-lazy]",l.$slider);k.length?(j=k.first(),i=j.attr("data-lazy"),h=document.createElement("img"),h.onload=function(){j.attr("src",i).removeAttr("data-lazy").removeClass("slick-loading"),l.options.adaptiveHeight===!0&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,j,i]),l.progressiveLazyLoad()},h.onerror=function(){3>a?setTimeout(function(){l.progressiveLazyLoad(a+1)},500):(j.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,j,i]),l.progressiveLazyLoad())},h.src=i):l.$slider.trigger("allImagesLoaded",[l])},c.prototype.refresh=function(a){var g,f,h=this;f=h.slideCount-h.options.slidesToShow,!h.options.infinite&&h.currentSlide>f&&(h.currentSlide=f),h.slideCount<=h.options.slidesToShow&&(h.currentSlide=0),g=h.currentSlide,h.destroy(!0),d.extend(h,h.initials,{currentSlide:g}),h.init(),a||h.changeSlide({data:{message:"index",index:g}},!1)},c.prototype.registerBreakpoints=function(){var j,i,h,a=this,g=a.options.responsive||null;if("array"===d.type(g)&&g.length){a.respondTo=a.options.respondTo||"window";for(j in g){if(h=a.breakpoints.length-1,i=g[j].breakpoint,g.hasOwnProperty(j)){for(;h>=0;){a.breakpoints[h]&&a.breakpoints[h]===i&&a.breakpoints.splice(h,1),h--}a.breakpoints.push(i),a.breakpointSettings[i]=g[j].settings}}a.breakpoints.sort(function(b,e){return a.options.mobileFirst?b-e:e-b})}},c.prototype.reinit=function(){var a=this;a.$slides=a.$slideTrack.children(a.options.slide).addClass("slick-slide"),a.slideCount=a.$slides.length,a.currentSlide>=a.slideCount&&0!==a.currentSlide&&(a.currentSlide=a.currentSlide-a.options.slidesToScroll),a.slideCount<=a.options.slidesToShow&&(a.currentSlide=0),a.registerBreakpoints(),a.setProps(),a.setupInfinite(),a.buildArrows(),a.updateArrows(),a.initArrowEvents(),a.buildDots(),a.updateDots(),a.initDotEvents(),a.cleanUpSlideEvents(),a.initSlideEvents(),a.checkResponsive(!1,!0),a.options.focusOnSelect===!0&&d(a.$slideTrack).children().on("click.slick",a.selectHandler),a.setSlideClasses("number"==typeof a.currentSlide?a.currentSlide:0),a.setPosition(),a.focusHandler(),a.paused=!a.options.autoplay,a.autoPlay(),a.$slider.trigger("reInit",[a])},c.prototype.resize=function(){var a=this;d(window).width()!==a.windowWidth&&(clearTimeout(a.windowDelay),a.windowDelay=window.setTimeout(function(){a.windowWidth=d(window).width(),a.checkResponsive(),a.unslicked||a.setPosition()},50))},c.prototype.removeSlide=c.prototype.slickRemove=function(f,e,h){var g=this;return"boolean"==typeof f?(e=f,f=e===!0?0:g.slideCount-1):f=e===!0?--f:f,g.slideCount<1||0>f||f>g.slideCount-1?!1:(g.unload(),h===!0?g.$slideTrack.children().remove():g.$slideTrack.children(this.options.slide).eq(f).remove(),g.$slides=g.$slideTrack.children(this.options.slide),g.$slideTrack.children(this.options.slide).detach(),g.$slideTrack.append(g.$slides),g.$slidesCache=g.$slides,void g.reinit())},c.prototype.setCSS=function(g){var i,h,f=this,j={};f.options.rtl===!0&&(g=-g),i="left"==f.positionProp?Math.ceil(g)+"px":"0px",h="top"==f.positionProp?Math.ceil(g)+"px":"0px",j[f.positionProp]=g,f.transformsEnabled===!1?f.$slideTrack.css(j):(j={},f.cssTransitions===!1?(j[f.animType]="translate("+i+", "+h+")",f.$slideTrack.css(j)):(j[f.animType]="translate3d("+i+", "+h+", 0px)",f.$slideTrack.css(j)))},c.prototype.setDimensions=function(){var f=this;f.options.vertical===!1?f.options.centerMode===!0&&f.$list.css({padding:"0px "+f.options.centerPadding}):(f.$list.height(f.$slides.first().outerHeight(!0)*f.options.slidesToShow),f.options.centerMode===!0&&f.$list.css({padding:f.options.centerPadding+" 0px"})),f.listWidth=f.$list.width(),f.listHeight=f.$list.height(),f.options.vertical===!1&&f.options.variableWidth===!1?(f.slideWidth=Math.ceil(f.listWidth/f.options.slidesToShow),f.$slideTrack.width(Math.ceil(f.slideWidth*f.$slideTrack.children(".slick-slide").length))):f.options.variableWidth===!0?f.$slideTrack.width(5000*f.slideCount):(f.slideWidth=Math.ceil(f.listWidth),f.$slideTrack.height(Math.ceil(f.$slides.first().outerHeight(!0)*f.$slideTrack.children(".slick-slide").length)));var e=f.$slides.first().outerWidth(!0)-f.$slides.first().width();f.options.variableWidth===!1&&f.$slideTrack.children(".slick-slide").width(f.slideWidth-e)},c.prototype.setFade=function(){var e,a=this;a.$slides.each(function(f,b){e=a.slideWidth*f*-1,a.options.rtl===!0?d(b).css({position:"relative",right:e,top:0,zIndex:a.options.zIndex-2,opacity:0}):d(b).css({position:"relative",left:e,top:0,zIndex:a.options.zIndex-2,opacity:0})}),a.$slides.eq(a.currentSlide).css({zIndex:a.options.zIndex-1,opacity:1})},c.prototype.setHeight=function(){var f=this;if(1===f.options.slidesToShow&&f.options.adaptiveHeight===!0&&f.options.vertical===!1){var e=f.$slides.eq(f.currentSlide).outerHeight(!0);f.$list.css("height",e)}},c.prototype.setOption=c.prototype.slickSetOption=function(){var n,m,l,k,i,a=this,j=!1;if("object"===d.type(arguments[0])?(l=arguments[0],j=arguments[1],i="multiple"):"string"===d.type(arguments[0])&&(l=arguments[0],k=arguments[1],j=arguments[2],"responsive"===arguments[0]&&"array"===d.type(arguments[1])?i="responsive":"undefined"!=typeof arguments[1]&&(i="single")),"single"===i){a.options[l]=k}else{if("multiple"===i){d.each(l,function(b,e){a.options[b]=e})}else{if("responsive"===i){for(m in k){if("array"!==d.type(a.options.responsive)){a.options.responsive=[k[m]]}else{for(n=a.options.responsive.length-1;n>=0;){a.options.responsive[n].breakpoint===k[m].breakpoint&&a.options.responsive.splice(n,1),n--}a.options.responsive.push(k[m])}}}}}j&&(a.unload(),a.reinit())},c.prototype.setPosition=function(){var b=this;b.setDimensions(),b.setHeight(),b.options.fade===!1?b.setCSS(b.getLeft(b.currentSlide)):b.setFade(),b.$slider.trigger("setPosition",[b])},c.prototype.setProps=function(){var f=this,e=document.body.style;f.positionProp=f.options.vertical===!0?"top":"left","top"===f.positionProp?f.$slider.addClass("slick-vertical"):f.$slider.removeClass("slick-vertical"),(void 0!==e.WebkitTransition||void 0!==e.MozTransition||void 0!==e.msTransition)&&f.options.useCSS===!0&&(f.cssTransitions=!0),f.options.fade&&("number"==typeof f.options.zIndex?f.options.zIndex<3&&(f.options.zIndex=3):f.options.zIndex=f.defaults.zIndex),void 0!==e.OTransform&&(f.animType="OTransform",f.transformType="-o-transform",f.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(f.animType=!1)),void 0!==e.MozTransform&&(f.animType="MozTransform",f.transformType="-moz-transform",f.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(f.animType=!1)),void 0!==e.webkitTransform&&(f.animType="webkitTransform",f.transformType="-webkit-transform",f.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(f.animType=!1)),void 0!==e.msTransform&&(f.animType="msTransform",f.transformType="-ms-transform",f.transitionType="msTransition",void 0===e.msTransform&&(f.animType=!1)),void 0!==e.transform&&f.animType!==!1&&(f.animType="transform",f.transformType="transform",f.transitionType="transition"),f.transformsEnabled=f.options.useTransform&&null!==f.animType&&f.animType!==!1},c.prototype.setSlideClasses=function(h){var l,k,j,i,g=this;k=g.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),g.$slides.eq(h).addClass("slick-current"),g.options.centerMode===!0?(l=Math.floor(g.options.slidesToShow/2),g.options.infinite===!0&&(h>=l&&h<=g.slideCount-1-l?g.$slides.slice(h-l,h+l+1).addClass("slick-active").attr("aria-hidden","false"):(j=g.options.slidesToShow+h,k.slice(j-l+1,j+l+2).addClass("slick-active").attr("aria-hidden","false")),0===h?k.eq(k.length-1-g.options.slidesToShow).addClass("slick-center"):h===g.slideCount-1&&k.eq(g.options.slidesToShow).addClass("slick-center")),g.$slides.eq(h).addClass("slick-center")):h>=0&&h<=g.slideCount-g.options.slidesToShow?g.$slides.slice(h,h+g.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):k.length<=g.options.slidesToShow?k.addClass("slick-active").attr("aria-hidden","false"):(i=g.slideCount%g.options.slidesToShow,j=g.options.infinite===!0?g.options.slidesToShow+h:h,g.options.slidesToShow==g.options.slidesToScroll&&g.slideCount-h<g.options.slidesToShow?k.slice(j-(g.options.slidesToShow-i),j+i).addClass("slick-active").attr("aria-hidden","false"):k.slice(j,j+g.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===g.options.lazyLoad&&g.lazyLoad()},c.prototype.setupInfinite=function(){var h,g,f,a=this;if(a.options.fade===!0&&(a.options.centerMode=!1),a.options.infinite===!0&&a.options.fade===!1&&(g=null,a.slideCount>a.options.slidesToShow)){for(f=a.options.centerMode===!0?a.options.slidesToShow+1:a.options.slidesToShow,h=a.slideCount;h>a.slideCount-f;h-=1){g=h-1,d(a.$slides[g]).clone(!0).attr("id","").attr("data-slick-index",g-a.slideCount).prependTo(a.$slideTrack).addClass("slick-cloned")}for(h=0;f>h;h+=1){g=h,d(a.$slides[g]).clone(!0).attr("id","").attr("data-slick-index",g+a.slideCount).appendTo(a.$slideTrack).addClass("slick-cloned")}a.$slideTrack.find(".slick-cloned").find("[id]").each(function(){d(this).attr("id","")})}},c.prototype.interrupt=function(f){var e=this;f||e.autoPlay(),e.interrupted=f},c.prototype.selectHandler=function(a){var h=this,g=d(a.target).is(".slick-slide")?d(a.target):d(a.target).parents(".slick-slide"),f=parseInt(g.attr("data-slick-index"));return f||(f=0),h.slideCount<=h.options.slidesToShow?(h.setSlideClasses(f),void h.asNavFor(f)):void h.slideHandler(f)},c.prototype.slideHandler=function(t,s,r){var q,p,o,n,k,m=null,l=this;return s=s||!1,l.animating===!0&&l.options.waitForAnimate===!0||l.options.fade===!0&&l.currentSlide===t||l.slideCount<=l.options.slidesToShow?void 0:(s===!1&&l.asNavFor(t),q=t,m=l.getLeft(q),n=l.getLeft(l.currentSlide),l.currentLeft=null===l.swipeLeft?n:l.swipeLeft,l.options.infinite===!1&&l.options.centerMode===!1&&(0>t||t>l.getDotCount()*l.options.slidesToScroll)?void (l.options.fade===!1&&(q=l.currentSlide,r!==!0?l.animateSlide(n,function(){l.postSlide(q)}):l.postSlide(q))):l.options.infinite===!1&&l.options.centerMode===!0&&(0>t||t>l.slideCount-l.options.slidesToScroll)?void (l.options.fade===!1&&(q=l.currentSlide,r!==!0?l.animateSlide(n,function(){l.postSlide(q)}):l.postSlide(q))):(l.options.autoplay&&clearInterval(l.autoPlayTimer),p=0>q?l.slideCount%l.options.slidesToScroll!==0?l.slideCount-l.slideCount%l.options.slidesToScroll:l.slideCount+q:q>=l.slideCount?l.slideCount%l.options.slidesToScroll!==0?0:q-l.slideCount:q,l.animating=!0,l.$slider.trigger("beforeChange",[l,l.currentSlide,p]),o=l.currentSlide,l.currentSlide=p,l.setSlideClasses(l.currentSlide),l.options.asNavFor&&(k=l.getNavTarget(),k=k.slick("getSlick"),k.slideCount<=k.options.slidesToShow&&k.setSlideClasses(l.currentSlide)),l.updateDots(),l.updateArrows(),l.options.fade===!0?(r!==!0?(l.fadeSlideOut(o),l.fadeSlide(p,function(){l.postSlide(p)})):l.postSlide(p),void l.animateHeight()):void (r!==!0?l.animateSlide(m,function(){l.postSlide(p)}):l.postSlide(p))))},c.prototype.startLoad=function(){var b=this;b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow.hide(),b.$nextArrow.hide()),b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&b.$dots.hide(),b.$slider.addClass("slick-loading")},c.prototype.swipeDirection=function(){var g,f,j,i,h=this;return g=h.touchObject.startX-h.touchObject.curX,f=h.touchObject.startY-h.touchObject.curY,j=Math.atan2(f,g),i=Math.round(180*j/Math.PI),0>i&&(i=360-Math.abs(i)),45>=i&&i>=0?h.options.rtl===!1?"left":"right":360>=i&&i>=315?h.options.rtl===!1?"left":"right":i>=135&&225>=i?h.options.rtl===!1?"right":"left":h.options.verticalSwiping===!0?i>=35&&135>=i?"down":"up":"vertical"},c.prototype.swipeEnd=function(f){var h,g,e=this;if(e.dragging=!1,e.interrupted=!1,e.shouldClick=e.touchObject.swipeLength>10?!1:!0,void 0===e.touchObject.curX){return !1}if(e.touchObject.edgeHit===!0&&e.$slider.trigger("edge",[e,e.swipeDirection()]),e.touchObject.swipeLength>=e.touchObject.minSwipe){switch(g=e.swipeDirection()){case"left":case"down":h=e.options.swipeToSlide?e.checkNavigable(e.currentSlide+e.getSlideCount()):e.currentSlide+e.getSlideCount(),e.currentDirection=0;break;case"right":case"up":h=e.options.swipeToSlide?e.checkNavigable(e.currentSlide-e.getSlideCount()):e.currentSlide-e.getSlideCount(),e.currentDirection=1}"vertical"!=g&&(e.slideHandler(h),e.touchObject={},e.$slider.trigger("swipe",[e,g]))}else{e.touchObject.startX!==e.touchObject.curX&&(e.slideHandler(e.currentSlide),e.touchObject={})}},c.prototype.swipeHandler=function(f){var e=this;if(!(e.options.swipe===!1||"ontouchend" in document&&e.options.swipe===!1||e.options.draggable===!1&&-1!==f.type.indexOf("mouse"))){switch(e.touchObject.fingerCount=f.originalEvent&&void 0!==f.originalEvent.touches?f.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,e.options.verticalSwiping===!0&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),f.data.action){case"start":e.swipeStart(f);break;case"move":e.swipeMove(f);break;case"end":e.swipeEnd(f)}}},c.prototype.swipeMove=function(j){var o,n,m,l,k,i=this;return k=void 0!==j.originalEvent?j.originalEvent.touches:null,!i.dragging||k&&1!==k.length?!1:(o=i.getLeft(i.currentSlide),i.touchObject.curX=void 0!==k?k[0].pageX:j.clientX,i.touchObject.curY=void 0!==k?k[0].pageY:j.clientY,i.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(i.touchObject.curX-i.touchObject.startX,2))),i.options.verticalSwiping===!0&&(i.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(i.touchObject.curY-i.touchObject.startY,2)))),n=i.swipeDirection(),"vertical"!==n?(void 0!==j.originalEvent&&i.touchObject.swipeLength>4&&j.preventDefault(),l=(i.options.rtl===!1?1:-1)*(i.touchObject.curX>i.touchObject.startX?1:-1),i.options.verticalSwiping===!0&&(l=i.touchObject.curY>i.touchObject.startY?1:-1),m=i.touchObject.swipeLength,i.touchObject.edgeHit=!1,i.options.infinite===!1&&(0===i.currentSlide&&"right"===n||i.currentSlide>=i.getDotCount()&&"left"===n)&&(m=i.touchObject.swipeLength*i.options.edgeFriction,i.touchObject.edgeHit=!0),i.options.vertical===!1?i.swipeLeft=o+m*l:i.swipeLeft=o+m*(i.$list.height()/i.listWidth)*l,i.options.verticalSwiping===!0&&(i.swipeLeft=o+m*l),i.options.fade===!0||i.options.touchMove===!1?!1:i.animating===!0?(i.swipeLeft=null,!1):void i.setCSS(i.swipeLeft)):void 0)},c.prototype.swipeStart=function(f){var g,e=this;return e.interrupted=!0,1!==e.touchObject.fingerCount||e.slideCount<=e.options.slidesToShow?(e.touchObject={},!1):(void 0!==f.originalEvent&&void 0!==f.originalEvent.touches&&(g=f.originalEvent.touches[0]),e.touchObject.startX=e.touchObject.curX=void 0!==g?g.pageX:f.clientX,e.touchObject.startY=e.touchObject.curY=void 0!==g?g.pageY:f.clientY,void (e.dragging=!0))},c.prototype.unfilterSlides=c.prototype.slickUnfilter=function(){var b=this;null!==b.$slidesCache&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.appendTo(b.$slideTrack),b.reinit())},c.prototype.unload=function(){var a=this;d(".slick-cloned",a.$slider).remove(),a.$dots&&a.$dots.remove(),a.$prevArrow&&a.htmlExpr.test(a.options.prevArrow)&&a.$prevArrow.remove(),a.$nextArrow&&a.htmlExpr.test(a.options.nextArrow)&&a.$nextArrow.remove(),a.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},c.prototype.unslick=function(f){var e=this;e.$slider.trigger("unslick",[e,f]),e.destroy()},c.prototype.updateArrows=function(){var e,f=this;e=Math.floor(f.options.slidesToShow/2),f.options.arrows===!0&&f.slideCount>f.options.slidesToShow&&!f.options.infinite&&(f.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),f.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===f.currentSlide?(f.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),f.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):f.currentSlide>=f.slideCount-f.options.slidesToShow&&f.options.centerMode===!1?(f.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),f.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):f.currentSlide>=f.slideCount-1&&f.options.centerMode===!0&&(f.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),f.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},c.prototype.updateDots=function(){var b=this;null!==b.$dots&&(b.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),b.$dots.find("li").eq(Math.floor(b.currentSlide/b.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},c.prototype.visibility=function(){var b=this;b.options.autoplay&&(document[b.hidden]?b.interrupted=!0:b.interrupted=!1)},d.fn.slick=function(){var i,h,b=this,l=arguments[0],k=Array.prototype.slice.call(arguments,1),j=b.length;for(i=0;j>i;i++){if("object"==typeof l||"undefined"==typeof l?b[i].slick=new c(b[i],l):h=b[i].slick[l].apply(b[i].slick,k),"undefined"!=typeof h){return h}}return b}})(jQuery,this);