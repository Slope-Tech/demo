//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2010 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/**
 * @fileOverview This javascript contains declarations of AJAX services used within
 * WebSphere Commerce.
 */

/* Import dojo classes */
dojo.require("wc.service.common");
dojo.require("wc.widget.RefreshArea");
dojo.require("wc.render.RefreshController");
dojo.require("wc.render.Context");
dojo.require("wc.render.common");
/**
 * @class This class stores common parameters needed to make the service call.
 */
MyAccountServicesDeclarationJS = {
	/* The common parameters used in service calls */
	langId: "-1",
	storeId: "",
	catalogId: "",
	/**
	 * This function initializes common parameters used in all service calls.
	 * @param {int} langId The language id to use.
	 * @param {int} storeId The store id to use.
	 * @param {int} catalogId The catalog id to use.
	 */

	setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
	}
}
	
	/**
	 *  Adds an item to the shopping cart from the customer wishlist in Ajax mode.
	 *  @constructor
	 */
	wc.service.declare({
		id: "AjaxAddOrderItem",
		actionId: "AjaxAddOrderItem",
		url: "AjaxOrderChangeServiceItemAdd",
		formId: ""
		
	/**
     * display a success message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDEDTOCART"]);
			cursor_clear();
		}

	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
			 	if(serviceResponse.errorMessageKey == "_ERR_NO_ELIGIBLE_TRADING"){
			 		MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_CONTRACT_EXPIRED_GOTO_ORDER"]);
			 	} else if (serviceResponse.errorMessageKey == "_ERR_RETRIEVE_PRICE") {
 					MessageHelper.displayErrorMessage(MessageHelper.messages["ERROR_RETRIEVE_PRICE"]);
 				} else {				
 					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
 				}
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}
	}),

	/**
	 *  Removes an item from the customer wishlist in Ajax mode.
	 *  @constructor
	 */
	wc.service.declare({
		id: "InterestItemDelete",
		actionId: "InterestItemDelete",
		url: "AjaxInterestItemDelete",
		formId: ""

	/**
     * display a success message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_REMOVEITEM"]);
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);
			}
			cursor_clear();
		}
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**


	 *  Adds an item to the customer wishlist in Ajax mode.
	 *  @constructor
	 */
	wc.service.declare({
		id: "AjaxInterestItemAdd",
		actionId: "AjaxInterestItemAdd",
		url: "AjaxInterestItemAdd",
		formId: ""
	/**
     * display a success message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
			MessageHelper.displayStatusMessage(MessageHelper.messages["WISHLIST_ADDED"]);
		}
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),	

	/**
	 *  This service enables the customer to email his/her wishlist. 
	 *  @constructor
	 */
	wc.service.declare({
		id: "InterestItemListMessage",
		actionId: "InterestItemListMessage",
		url: "AjaxInterestItemListMessage",
		formId: ""

	/**
     * hdes the progress bar and displays a success message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);			
			}
			cursor_clear();
		}
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * This service adds a billing address to the order(s).
	 * @constructor
	 */
	wc.service.declare({
		id: "AddBillingAddress",
		actionId: "AddBillingAddress",
		url: "AjaxPersonChangeServiceAddressAdd",
		formId: ""

	 /**
	  *	 calls the saveAddress function defined in the AddressHelper class.
	  *  @param (object) serviceResponse The service response object, which is the
	  *  JSON object returned by the service invocation. 
	  */
		,successHandler: function(serviceResponse) {
			requestSubmitted = false;
			javascript:AddressHelper.saveAddress('AddShippingAddress','shippingAddressCreateEditFormDiv_1');
		}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
						 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				  } else {
						 if (serviceResponse.errorMessageKey) {
								MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
				  }
		}

	}),
	
	/**
	 *  This service adds a shipping address to the order(s).
	 *  @constructor
	 */
	wc.service.declare({
		id: "AddShippingAddress",
		actionId: "AddShippingAddress",
		url: "AjaxPersonChangeServiceAddressAdd",
		formId: ""
	
	/**
	 *  redirects to the Shipping and Billing Method page.
	 * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
	 */
		,successHandler: function(serviceResponse) {
			document.location.href="OrderShippingBillingView?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId+"&shipmentType=single&orderPrepare=true";
		}

	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
						 MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				  } else {
						 if (serviceResponse.errorMessageKey) {
								MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
						 }
				  }
		}

	}),
	
  /**
   * This services adds or removes a coupon from the order(s).
   * @constructor
   */
	wc.service.declare({
		id: "AjaxCouponsAddRemove",
		actionId: "AjaxCouponsAddRemove",
		url: "AjaxCouponsAddRemove",
		formId: ""

   /**
     * Hides all the messages and the progress bar.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
		}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {

			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	
	/**
	 * This service adds or removes a wallet item.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxWalletItemProcessServiceDelete",
		actionId: "AjaxWalletItemProcessServiceDelete",
		url: "AjaxWalletItemProcessServiceDelete",
		formId: ""

	/**
	 * Hides all messages and the progress bar.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		cursor_clear();
	}
	
	/**
	 * Displays an error message in case of a failure.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
	,failureHandler: function(serviceResponse) {
		if (serviceResponse.errorMessage) {
			MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
		} else {
			if (serviceResponse.errorMessageKey) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			}
		}
		cursor_clear();
		}

	}),
		
	/**
	 * This service cancels a subscription.
	 * @constructor
	 */
	wc.service.declare({
		id: "AjaxCancelSubscription",
		actionId: "AjaxCancelSubscription",
		url: "AjaxSubscriptionChangeServiceSubscriptionCancel",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			MessageHelper.hideAndClearMessage();
			cursor_clear();
			if(serviceResponse.subscriptionType == "RecurringOrder"){
				if(serviceResponse.state == "PendingCancel"){
					MessageHelper.displayStatusMessage(MessageHelper.messages["SCHEDULE_ORDER_PENDING_CANCEL_MSG"]);
				}
				else{
					MessageHelper.displayStatusMessage(MessageHelper.messages["SCHEDULE_ORDER_CANCEL_MSG"]);
				}
			}
			else{
				if(serviceResponse.state == "PendingCancel"){
					MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_PENDING_CANCEL_MSG"]);
				}
				else{
					MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_CANCEL_MSG"]);
				}
			}			
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
	

	/**
	 *  This service enables customer to Reorder an already existing order.
	 *  @constructor
	 */
	wc.service.declare({
		id: "OrderCopy",
		actionId: "OrderCopy",
		url: "AjaxOrderCopy",
		formId: ""

	 /**
	  *  Copies all the items from the existing order to the shopping cart and redirects to the shopping cart page.
	  *  @param (object) serviceResponse The service response object, which is the
	  *  JSON object returned by the service invocation.
	  */
		,successHandler: function(serviceResponse) {
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);			
			}	
			setDeleteCartCookie();
			document.location.href="OrderProcessServiceOrderPrepare?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId+"&orderId="+serviceResponse.orderId+"&URL=AjaxCheckoutDisplayView?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId;
		}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == "_ERR_PROD_NOT_ORDERABLE") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["PRODUCT_NOT_BUYABLE"]);
			} else if (serviceResponse.errorMessageKey == "_ERR_INVALID_ADDR") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["INVALID_CONTRACT"]);
			}else {
				if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} 
				else {
					 if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					 }
				}
			}
			cursor_clear();
		}

	}),

	/**
	 *  This service enables customer to Reorder an already existing order in external system.
	 *  @constructor
	 */
	wc.service.declare({
		id: "SSFSOrderCopy",
		actionId: "SSFSOrderCopy",
		url: "AjaxSSFSOrderCopy",
		formId: ""

		 /**
		  *  Copies all the items from the existing order to the shopping cart and redirects to the shopping cart page.
		  *  @param (object) serviceResponse The service response object, which is the
		  *  JSON object returned by the service invocation.
		  */
		,successHandler: function(serviceResponse) {
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);			
			}	
		
			setDeleteCartCookie();
			document.location.href="AjaxCheckoutDisplayView?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId;
		}
		
		/**
		* display an error message.
		* @param (object) serviceResponse The service response object, which is the
		* JSON object returned by the service invocation.
		*/
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == "_ERR_PROD_NOT_ORDERABLE") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["PRODUCT_NOT_BUYABLE"]);
			} else if (serviceResponse.errorMessageKey == "_ERR_INVALID_ADDR") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["INVALID_CONTRACT"]);
			}else {
				if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} 
				else {
					 if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					 }
				}
			}
			cursor_clear();
		}

	}),


	/**
	 *  This service enables customer to Renew a subscription.
	 *  @constructor
	 */
	wc.service.declare({
		id: "SubscriptionRenew",
		actionId: "SubscriptionRenew",
		url: "AjaxOrderCopy",
		formId: ""

	 /**
	  *  Copies all the items from the existing subscription to the shopping cart and calls service to update requested shipping date.
	  *  @param (object) serviceResponse The service response object, which is the
	  *  JSON object returned by the service invocation.
	  */
		,successHandler: function(serviceResponse) {
			for (var prop in serviceResponse) {
				console.debug(prop + "=" + serviceResponse[prop]);			
			}	

			var params = [];
			
			params.storeId		= MyAccountServicesDeclarationJS.storeId;
			params.catalogId	= MyAccountServicesDeclarationJS.catalogId;
			params.langId		= MyAccountServicesDeclarationJS.langId;			
			params.orderId      = serviceResponse.orderId;
			params.calculationUsage  = "-1,-2,-3,-4,-5,-6,-7";
			params.requestedShipDate = MyAccountDisplay.getSubscriptionDate();

			MyAccountDisplay.subscriptionOrderId = serviceResponse.orderId;
			MyAccountDisplay.subscriptionOrderItemId = serviceResponse.orderItemId[0];

			wc.service.invoke("SetRequestedShippingDate",params);
		}
		
	/**
     * display an error message.
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation.
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == "_ERR_PROD_NOT_ORDERABLE") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["PRODUCT_NOT_BUYABLE"]);
			} else if (serviceResponse.errorMessageKey == "_ERR_INVALID_ADDR") {
				MessageHelper.displayErrorMessage(MessageHelper.messages["INVALID_CONTRACT"]);
			}else {
				if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} 
				else {
					 if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					 }
				}
			}
			cursor_clear();
		}

	}),

	
	/**
	 *  This service sets the requested shipping date for a subscription renewal.
	 *  @constructor
	 */
	wc.service.declare({
		id: "SetRequestedShippingDate",
		actionId: "SetRequestedShippingDate",
		url: "AjaxOrderChangeServiceShipInfoUpdate",
		formId: ""
    /**
     * hides all the messages and the progress bar
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,successHandler: function(serviceResponse) {
			cursor_clear();
			document.location.href="OrderProcessServiceOrderPrepare?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId+"&orderId="+serviceResponse.orderId+"&URL=AjaxCheckoutDisplayView?langId="+MyAccountServicesDeclarationJS.langId+"&storeId="+MyAccountServicesDeclarationJS.storeId+"&catalogId="+MyAccountServicesDeclarationJS.catalogId;		
		}

     /**
     * display an error message
     * @param (object) serviceResponse The service response object, which is the
     * JSON object returned by the service invocation
     */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessageKey == "_ERR_ORDER_ITEM_FUTURE_SHIP_DATE_OVER_MAXOFFSET") {
				var params = [];

				params.storeId		= MyAccountServicesDeclarationJS.storeId;
				params.catalogId	= MyAccountServicesDeclarationJS.catalogId;
				params.langId		= MyAccountServicesDeclarationJS.langId;			
				params.orderId      = MyAccountDisplay.subscriptionOrderId;
				params.orderItemId      = MyAccountDisplay.subscriptionOrderItemId;
				params.calculationUsage  = "-1,-2,-3,-4,-5,-6,-7";
				wc.service.invoke("RemoveSubscriptionItem",params);

				MessageHelper.displayStatusMessage(MessageHelper.messages["CANNOT_RENEW_NOW_MSG"]);
			}
			else{
				if (serviceResponse.errorMessage) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
				} 
				else { 
					if (serviceResponse.errorMessageKey) {
						MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
					 }
				}
				cursor_clear();
			}			
		}

	}),

	/**
	 * This service removes the subscription item from the shopping cart if renewal fails.
	 * @constructor
	 */
	wc.service.declare({
		id: "RemoveSubscriptionItem",
		actionId: "RemoveSubscriptionItem",
		url: "AjaxOrderChangeServiceItemDelete",
		formId: ""

		/**
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation.
		 */
		,successHandler: function(serviceResponse) {
				cursor_clear();
		}

		 /**
		 * display an error message
		 * @param (object) serviceResponse The service response object, which is the
		 * JSON object returned by the service invocation
		 */
		,failureHandler: function(serviceResponse) {
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} 
			else {
				 if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				 }
			}
			cursor_clear();
		}

	}),
	/**
	 * Adding printers to user profile
	 * from Manage Printers Page.
	 */
	wc.service.declare({
		id: "AjaxAddProfilePrinters",
		actionId: "AjaxAddProfilePrinters",
		url: "HPManagePrintersCmd",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			console.debug('success');
			wc.render.getRefreshControllerById('SavedPrintersDisplayController');  
			 wc.render.updateContext('SavedPrintersDisplayContext');			
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			console.debug('fail');
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Deleting cards user profile
	 * from Saved cards Page.
	 */
	wc.service.declare({
		id: "CardDelete",
		actionId: "CardDelete",
		url: "AjaxRemoveCard",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			console.debug('success');
			wc.render.getRefreshControllerById('savedCardsDetailsController');  
			wc.render.updateContext('savedCardsDetailsContext');			
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			console.debug('fail');
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
	
	/**
	 * Making cards default in user profile
	 * from Saved cards Page.
	 */
	wc.service.declare({
		id: "MakeCCDefault",
		actionId: "MakeCCDefault",
		url: "AjaxSetDefaultCard",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
			console.debug('success');
			wc.render.getRefreshControllerById('savedCardsDetailsController');  
			wc.render.updateContext('savedCardsDetailsContext');			
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			console.debug('fail');
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
		
	
	wc.service.declare({
		id: "MPRSignUp",
		actionId: "MPRSignUp",
		url: getAbsoluteURL() +"HPMyAccountLandingMPRCmd",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
		
		location.reload(true);
		
			
			///MessageHelper.hideAndClearMessage();
			//MessageHelper.displayStatusMessage(MessageHelper.messages["SUBSCRIPTION_UPDATED"]);
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
			} else {
				if (serviceResponse.errorMessageKey) {
					MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
				}
			}
			cursor_clear();
		}
	}),
	
wc.service.declare({
		id: "SignupMPR",
		actionId: "SignupMPR",
		url: "UpdateUserMPRAcct",
		formId: ""
		
		/**
		 * Clear messages on the page.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation
		 */
		,successHandler: function(serviceResponse) {
		
			location.reload(true);
	
		}
		
		/**
		 * Displays an error message on the page if the request failed.
		 * @param (object) serviceResponse The service response object, which is the JSON object returned by the service invocation.
		 */
		,failureHandler: function(serviceResponse) {
			
			if (serviceResponse.errorMessage) {
				
				$('#callCenterDialog p#message').html(serviceResponse.errorMessage);
				$('#callCenterDialog').foundation('reveal','open');
			} else {
				if (serviceResponse.errorMessageKey) {
					$('#callCenterDialog p#message').html(serviceResponse.errorMessageKey);
					$('#callCenterDialog').foundation('reveal','open');
				}
			}
			cursor_clear();
		}
	}),	

wc.service.declare
	({

		id: "AjaxHPMyAccountLandingCmd",
		actionId: "AjaxHPMyAccountLandingCmd",
		url: "HPMyAccountLandingCmd",

		formId: "",

		successHandler: function(serviceResponse) 
		{
		alert("success");	
		},

		failureHandler: function(serviceResponse) 
		{
			
			alert("error");
			
		} 
				
	}),


	
	
	
	
/**

 *  This service enables customer to cancel a scheduled order or an order waiting for approval.
 *  @constructor
 */
wc.service.declare({
	id: "AjaxScheduledOrderCancel",
	actionId: "AjaxScheduledOrderCancel",
	url: "AjaxOrderChangeServiceScheduledOrderCancel",
	formId: ""

	/**
	 * Displays a success message.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
	,successHandler: function(serviceResponse) {
		MessageHelper.hideAndClearMessage();
		cursor_clear();
		MessageHelper.displayStatusMessage(MessageHelper.messages["MO_ORDER_CANCELED_MSG"]);
	}
	
	/**
	 * Displays an error message.
	 * @param (object) serviceResponse The service response object, which is the
	 * JSON object returned by the service invocation.
	 */
	,failureHandler: function(serviceResponse) {

		if (serviceResponse.errorMessage) {
			MessageHelper.displayErrorMessage(serviceResponse.errorMessage);
		} 
		else {
			 if (serviceResponse.errorMessageKey) {
				MessageHelper.displayErrorMessage(serviceResponse.errorMessageKey);
			 }
		}
		cursor_clear();
	}
})
