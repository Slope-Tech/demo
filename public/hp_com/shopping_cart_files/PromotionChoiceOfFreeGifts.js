//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2009, 2013 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This javascript provides the variables and methods used on the PromotionChoiceOfFreeGiftsPopup.jspf
 * to allow the user to select a free gift of their choice when this promotion applies to the order.
 * @version 1.5
 */



PromotionChoiceOfFreeGiftsJS={

	/* Global variable declarations */		
	
	/** 
	 * This variable is used to keep track of the enable or disable status of the Apply button in the pop-up.
	 * @private
	 */			
	disableApplyButton:false,
	
	freeGiftPopup:function()
	{
		$('#lb-content').foundation('reveal','open');
	},
	
	freeGift:function(giftchoiceid,giftSpecQty)
	{
		var giftchoiceid=giftchoiceid.toString();
		giftchoiceid=giftchoiceid.substring(1,giftchoiceid.length-1);
		var giftchoice= giftchoiceid.split(",");	

		for(var i = 0; i < giftSpecQty; i++) {    	
			var catEntryId = document.getElementById("CatalogEntryID_" + (i+1)).value;		
			for (var j = 0;j < giftchoice.length; j++) {
				giftchoice[j]=giftchoice[j].trim();
				if(catEntryId == giftchoice[j])
				{
					var freeGiftCheckboxId = "input#SelectFreeGift_"+(i+1);
					$(freeGiftCheckboxId).attr('checked',true);
					$(freeGiftCheckboxId).next().addClass("checked");
					$(freeGiftCheckboxId).parent("label").addClass("active");
				}
			}
		}

		$('#lb-content').foundation('reveal','open');

	},
	
	freeGiftClose:function()
	{
		$('#lb-content').foundation('reveal','close');
	},
	removeFreeGift:function(formName, rewardOptionId,giftSetIDs,removeGiftID){
			
			if(this.disableApplyButton){
				return false;
			}
		
			if(CheckoutHelperJS.isAjaxCheckOut()){
				var params = [];
				var catEntryId = [];
				var quantity = [];	
				var j = 0;
				
				params.orderId = ".";		
				params["rewardOptionId"] = rewardOptionId;	
				if(CheckoutHelperJS.shoppingCartPage){	
					params["calculationUsage"] = "-1,-2,-5,-6,-7";
				}else{
					params["calculationUsage"] = "-1,-2,-3,-4,-5,-6,-7";
				}
				params["allocate"] = "***";
				params["backorder"] = "***";			
			var giftSetIDs =giftSetIDs.toString();;	
		 var giftSpecs = giftSetIDs.split(",");
	for (var i = 0;i < giftSpecs.length; i++) 
	{
	
	if(removeGiftID != giftSpecs[i])
	{
	catEntryId[j]=giftSpecs[i];
	quantity[j] = 1;
	j++;
	}
	
	
	}	
	
	params["catEntryId"] = catEntryId;
	params["quantity"] = quantity;
		
	
				//For handling multiple clicks
				if(!submitRequest()){
					return;
				}              
				cursor_wait();			  
				wc.service.invoke("AjaxUpdateRewardOption", params);
		
	    	}
	
	
	},	
	  /**
	   * This function is used to update the free gift choices for a promotion, made by the user, during order check-out.
	   * If the 'AjaxCheckout' feature is enabled, then the <code>AjaxUpdateRewardOption</code> service is invoked. For the case 
	   * where the 'AjaxCheckout' feature is disabled, the form identified by the <code>formName</code> parameter is submitted.
	   * 
	   * @param {String} formName: The name of the reward choices form.
	   * @param {Integer} maximumNumberOfItems: The maximum number of gift selections that the user can make. 
	   * @param {Integer} rewardOptionId: The ID of the RewardOption object used to add the reward choices data to. 
	   */	  
	updateRewardChoices:function(formName, maximumNumberOfItems, rewardOptionId,noOfFreeGifts){
			
		if(this.disableApplyButton){
			return false;
		}
		
		if(CheckoutHelperJS.isAjaxCheckOut()){
			var params = [];
			var catEntryId = [];
			var quantity = [];	
			var j = 0;
			
			params.orderId = ".";		
			params["rewardOptionId"] = rewardOptionId;	
			if(CheckoutHelperJS.shoppingCartPage){	
				params["calculationUsage"] = "-1,-2,-5,-6,-7";
			}else{
				params["calculationUsage"] = "-1,-2,-3,-4,-5,-6,-7";
			}
			params["allocate"] = "***";
			params["backorder"] = "***";			
		
			//add the catalog entry ID and quantity of each gift item selection. 
			for(var i = 0; i < maximumNumberOfItems; i++){			
					if($("#SelectFreeGift_" + (i+1)).attr("checked")) {
						catEntryId[j] = document.getElementById("CatalogEntryID_" + (i+1)).value;
						quantity[j] = document.getElementById("GiftItemQuantity_" + (i+1)).value;
							j++;
					}		
			}		
		
			if(j<=noOfFreeGifts) {
				params["catEntryId"] = catEntryId;
				params["quantity"] = quantity;
	
				//For handling multiple clicks
				if(!submitRequest()){
					return;
				}              
				
				cursor_wait();			  
				wc.service.invoke("AjaxUpdateRewardOption", params);
				//hide the pop-up after the service has been invoked after some delay.
				setTimeout(PromotionChoiceOfFreeGiftsJS.freeGiftClose,200);
				setTimeout(function() {location.reload(true);}, 3000);
					
			} else {
				$('#button').addClass('disabled');
			}
		}
		else
		{
			//Invoke Web 1.0 server call by submitting the reward choices form. 
			var form = document.getElementById(formName);    	       
	        for(var i = 0; i < maximumNumberOfItems; i++){
	        	if(!document.getElementById("no_gifts").checked){
					if(document.getElementById("SelectFreeGift_" + (i+1)).checked){
						//create an input element for each catalog entry ID and its quantity.
						var input1 = document.createElement("input");
						input1.setAttribute("id", formName + "_catEntryId_" + i);
						input1.setAttribute("type", "hidden");
						input1.setAttribute("name", "catEntryId");
						input1.setAttribute("value", document.getElementById("CatalogEntryID_" + (i+1)).value);					
						form.appendChild(input1);
						var input2 = document.createElement("input");
						input2.setAttribute("id", formName + "_quantity_" + i);
						input2.setAttribute("type", "hidden");
						input2.setAttribute("name", "quantity");
						input2.setAttribute("value", document.getElementById("GiftItemQuantity_" + (i+1)).value);					
						form.appendChild(input2);
					}
	        	}        	
	       	}
	        //submit the form
	        submitSpecifiedForm(form);     		
		}
	}, 	
		
	/**
	 * This function is used to display a message of the total number of gift
	 * item selections made by the shopper. It also displays an error message
	 * when the user selects more gift items than the maximum number of gift
	 * items that are allowed for the promotion.
	 * 
	 * @param {Integer}
	 *            maximumNumberOfItems The maximum number of gift items that are
	 *            allowed as part of the promotion.
	 */
	checkNumberOfAllowedItems:function(maximumNumberOfItems, index) {
		if($("#SelectFreeGift_"+ index).attr("checked")) {
			$("#SelectFreeGift_"+ index).removeAttr( 'checked' );
			$("#SelectFreeGift_"+ index).parent('label').removeClass('active');
		} else {
			$("#SelectFreeGift_"+ index).attr( 'checked', true );
			$("#SelectFreeGift_"+ index).parent('label').addClass('active');
		}
	
			var i = 1;
			var numberOfSelectionsMade = 0;
			this.disableConfirmButton = false;
			
			while(document.getElementById("SelectFreeGift_" + i)){
	
				if($("#SelectFreeGift_" + i).attr("checked")){
					numberOfSelectionsMade++;
				}
				i++;
			}	
			 
			if(numberOfSelectionsMade>0) {
				$('#button').removeClass('disabled');
				
				if(numberOfSelectionsMade > maximumNumberOfItems){
					//display an error message warning the shopper about exceeding the maximum number of gift item selections
					$('.parsley-custom-error-message').css('display','block');	
					$('#button').addClass('disabled');
				} else {
					$('.parsley-custom-error-message').css('display','none');			
				}
			} else {
				//$('#button').addClass('disabled');
			}
	},	
	/**
	 * If the user has selected the option to not receive any free gifts as part
	 * of the promotion, then the gift item choices are cleared and disabled for
	 * selection.
	 */
	rewardChoicesEnabledStatus:function(){
		var i = 1; 
		
		if(document.getElementById("no_gifts").checked){
			this.disableApplyButton = false;
			if(document.getElementById('message')!= null){
				document.getElementById('message').innerHTML = "&nbsp;";
			}	
			while(document.getElementById("SelectFreeGift_" + i)){
				document.getElementById("SelectFreeGift_" + i).checked = false;
				document.getElementById("SelectFreeGift_" + i).disabled = true;
				i++;
			}
		} else {
			while(document.getElementById("SelectFreeGift_" + i)){
				document.getElementById("SelectFreeGift_" + i).disabled = false;
				i++;				
			}
			this.checkNumberOfAllowedItems();
			this.checkFreeGiftsAvailability();
		}		
	},
	
	/**
	 * This function is used to make the free gift choices pop-up visible to the user. 
	 */
	showFreeGiftsDialog: function(){	
		this.checkNumberOfAllowedItems();
		dijit.byId('free_gifts_popup').closeButtonNode.style.display='none';
		dijit.byId('free_gifts_popup').show();		
		
		this.checkFreeGiftsAvailability();
	},
	
	/**
	 * This function is used to disable any free gifts that are not available.
	 */	
	checkFreeGiftsAvailability: function(){
		var i = 1;
		var numberOfAvailableGifts = 0;
		
		while(document.getElementById("OnlineAvailability_" + i)){
			if(document.getElementById("OnlineAvailability_" + i).value != "Available" && document.getElementById("OnlineAvailability_" + i).value != "Backorderable"){
				document.getElementById("SelectFreeGift_" + i).checked = false;
				document.getElementById("SelectFreeGift_" + i).disabled = true;
			} else {
				numberOfAvailableGifts++;
			}
			i++;
		}
		
		if(numberOfAvailableGifts == 0){
			this.disableApplyButton = true;
		}
			
	},
	
	/**
	 * Hide the pop-up identified by the passed id parameter. 
	 * 
	 * @param {String} id: The id of the pop-up to hide.
	 * @param {Object} event: The event object.
	 */
	hideFreeGiftsPopup:function(id,event){
		if(event!=null && event.type=="keypress" && event.keyCode!="27"){
			return;
		} else {		
			freeGiftClose();
		}
	}

}	
