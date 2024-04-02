/***************CommonContextsDeclarations.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This file provides the common render context variables and functions, 
 * and defines all the render contexts needed throughout the store.
 */

dojo.require("wc.render.common");

/** 
 * @class The CommonContextsJS class defines all the common variables and functions 
 * for the render contexts across all store pages.
 */
CommonContextsJS = {
	/**
	 * This variable stores the ID of the language that the store is currently using.
	 * @private
	 */
	langId: "-1",

	/**
	 * This variable stores the ID of the current store.
	 * @private
	 */	
	storeId: "",

	/**
	 * This variable stores the ID of the catalog that is used in the store.
	 * @private
	 */	
	catalogId: "",

	/** 
	 * Sets the common ids used in the store - language id, store id, and catalog id.
	 * 
	 * @param {string} langId The id of the store language.
	 * @param {string} storeId The id of the store.
	 * @param {string} langId The id of the catalog used in the store.
	 */
	setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
	},

	/** 
	 * Updates the specified context's property and assign it the desired value.
	 * 
	 * @param {string} contextId The id of the render context 
	 * @param {string} property The name of the context's property to update
	 * @param {string} value The value to update the specified property to
	 */
	setContextProperty:function(contextId,property,value){
		wc.render.getContextById(contextId).properties[property] = value;
	}

}

/**
 * Declares a new render context for Multiple Shipment Shipping & Billing display.
 */
wc.render.declareContext("multipleShipmentDetailsContext", {shipmentDetailsArea: "update"},""),

/**
 * Declares a new render context for Single Shipment Shipping Charge display.
 */
wc.render.declareContext("singleShipmentShipChargeContext", null,""),

/**
 * Declares a new render context for Multiple Shipment Shipping Charge display.
 */
wc.render.declareContext("multipleShipmentShipChargeContext", null,""),

/**
 * Declares a new render context for Single Shipment Shipping & Billing display.
 */
wc.render.declareContext("traditionalShipmentDetailsContext",{shipmentDetailsArea: "update"},""),

/**
 * Declares a new render context for the Current Order Totals display.
 */
wc.render.declareContext("currentOrder_Context",null,""),

/**
 * Declares a new render context for creating/editing the shipping address
 * and initializes it with the shipping address id and address type to the default placeholder values.
 */
wc.render.declareContext("editShippingAddressContext",{shippingAddress: "0",addressType: "ShippingAndBilling"},"","Main"),

/**
 * Declares a new render context for the select Billing Address dropdowns,
 * and initializes each Billing Address dropdown with address id and billing url placeholders.
 * Even though BillingURL1, 2, 3 point to same BillingAddressDropDisplay.jsp we cannot use only one URL to submit 3 requests.
 * There are 3 billing dropdown boxes in the Checkout page and all needs to be refreshed on address add/change.
 * But using the same URL and submitting 3 requests separately to refresh 3 dropdown boxes doesn't work, 
 * and invariably one of the request doesn't come back with response. Solution is to use 3 different URLs as a workaround.
 * BillingURL1,2,3 are set to correct <c:url values in .JSP page using setContextPRoperty method..
 */
wc.render.declareContext("billingAddressDropDownBoxContext",{billingAddress1: "0", billingAddress2: "0", billingAddress3: "0", billingURL1: "",billingURL2:"",billingURL3:"",areaNumber:'0',payment1: "", payment2: "", payment3: "", paymentTCId1: "", paymentTCId2: "", paymentTCId3: ""},""),

/**
 * Declares a new render context for showing/hiding the address form on the Checkout pages,
 * and initializes the show and hide area to a placeholder value.  
 */
wc.render.declareContext("contextForMainAndAddressDiv",{showArea: "0",hideArea: "0"},""),

/**
 * Declares a new render context for the select Shipping Address dropdown.
 */
wc.render.declareContext("shippingAddressDropDownBoxContext",null,""),

/**
 * Declares a new render context for the Category display with pagination.
 */
wc.render.declareContext("CategoryDisplay_Context",{pageView:"", beginIndex:""},""),

/**
 * Declares a new render context for the Sub-category display with pagination.
 */
wc.render.declareContext("SubCategoryDisplay_Context",null,""),

/**
 * Declares a new render context for Shopping Cart with pagination,
 * and initializes it with the beginning index value. 
 */
wc.render.declareContext("ShopCartPaginationDisplay_Context",{},""),
/**
* Declares a new render context for Pending order details page with pagination,
* and initializes it with the beginning index value. 
*/
wc.render.declareContext("PendingOrderPaginationDisplay_Context",{},""),
/**
* Declares a new render context for the pending order details page with pagination,
* and initializes it with the beginning index value. 
*/
wc.render.declareContext("PendingOrderDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for Single Shipment Order Summmary/Confirmation with pagination,
 * and initializes it with the beginning index value. 
 */
wc.render.declareContext("OrderItemPaginationDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for the Order Status Details with pagination,
 * and initializes it with the beginning index value. 
 */
wc.render.declareContext("OrderDetailPaginationDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for Multiple Shipment Order Summary/Confirmation with pagination,
 * and initializes it with the beginning index value.
 */
wc.render.declareContext("MSOrderItemPaginationDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for the Coupon Wallet display.
 */
wc.render.declareContext("CouponDisplay_Context",null,""),
/**
 * Declares a new render context for the Promotion Choice of free gifts pop-up display.
 */
wc.render.declareContext("PromotionFreeGifts_Context",null,""),

/**
 *  Declares a new render context for the saved orders list.
 */
wc.render.declareContext("ListOrdersDisplay_Context",{startNumber: "0"},""),

/**
 * Declares a new render context for the scheduled orders status display.
 */
wc.render.declareContext("ScheduledOrdersStatusDisplay_Context",{beginIndex: "0", selectedTab: "Scheduled"},""),

/**
 * Declares a new render context for the processed orders status display.
 */
wc.render.declareContext("ProcessedOrdersStatusDisplay_Context",{beginIndex: "0", selectedTab: "PreviouslyProcessed"},""),

/**
 * Declares a new render context for the waiting-for-approval orders status display.
 */
wc.render.declareContext("WaitingForApprovalOrdersStatusDisplay_Context",{beginIndex: "0", selectedTab: "WaitingForApproval"},""),

/**
 * Declares a new render context for the Browsing History Espot.
 */
wc.render.declareContext("BrowsingHistoryContext",{status:"init"},""),

/**
 * Declares a new render context for the Browsing History Display in My Account.
 */
wc.render.declareContext("BrowsingHistoryDisplay_Context",{currentPage: "0", pageView: ""},""),

/**
 * Declares a new render context for the subscription display area on category pages.
 */
wc.render.declareContext("CategorySubscriptionContext",null,""),

/**
 * Declares a new render context for the recurring order display.
 */
wc.render.declareContext("RecurringOrderDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for the subscription display.
 */
wc.render.declareContext("SubscriptionDisplay_Context",{beginIndex: "0"},""),

/**
 * Declares a new render context for the recent recurring order display.
 */
wc.render.declareContext("RecentRecurringOrderDisplay_Context",{beginIndex: "0",isMyAccountMainPage:"true"},""),

/**
 * Declares a new render context for the recent subscription display.
 */
wc.render.declareContext("RecentSubscriptionDisplay_Context",{beginIndex: "0",isMyAccountMainPage:"true"},""),

/**
 * Declares a new render context for the recurring order child orders display.
 */
wc.render.declareContext("RecurringOrderChildOrdersDisplay_Context",{beginIndex: "0",orderId: ""},""),

/**
 * Declares a new render context for the subscription child orders display.
 */
wc.render.declareContext("SubscriptionChildOrdersDisplay_Context",{beginIndex: "0",orderItemId: "",subscriptionName: ""},""),

/**
 * Declares a new render context for the QuickInfo.
 */
wc.render.declareContext("QuickInfoContext",null,""),

/**
 * Declares a new render context for the Discounts.
 */
wc.render.declareContext("DiscountDetailsContext",null,""),

/**
 * Declares a new render context for the Discounts in quick info.
 */
wc.render.declareContext("QuickInfoDiscountDetailsContext",null,""),

/**
 * Declares a new render context for double content area espot.
 */
wc.render.declareContext("DoubleContentAreaESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for scrollable espot.
 */
wc.render.declareContext("ScrollableESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for top categories espot.
 */
wc.render.declareContext("TopCategoriesESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for featured products in category espot.
 */
wc.render.declareContext("CategoryFeaturedProductsESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for home hero espot.
 */
wc.render.declareContext("HomeHeroESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for home left espot.
 */
wc.render.declareContext("HomeLeftESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for home right top espot.
 */
wc.render.declareContext("HomeRightTopESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for home right bottom espot.
 */
wc.render.declareContext("HomeRightBottomESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for tall double espot.
 */
wc.render.declareContext("TallDoubleContentAreaESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for top category hero espot.
 */
wc.render.declareContext("TopCategoryHeroESpot_Context",{emsName: ""},""),

/**
 * Declares a new render context for top category tall double espot.
 */
wc.render.declareContext("TopCategoryTallDoubleESpot_Context",{emsName: ""},""),


wc.render.declareContext("AttachmentPagination_Context",{beginIndex: "0"},"")

/***************CommonContextsDeclarations.js ends*****************/

/***************CommonControllersDeclaration.js starts*****************/
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2008, 2013 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This file provides the common controller variables and functions, 
 * and links these controllers to listen to the defined render contexts in CommonContextsDeclarations.js.
 */

dojo.require("wc.render.common");

/** 
 * @class The CommonControllersDeclarationJS class defines all the common variables and functions 
 * for the controllers of the defined render contexts across all store pages.
 */
CommonControllersDeclarationJS = {
       /**
        * This variable stores the ID of the language that the store is currently using.
        * @private
        */
       langId: "-1",
       
       /**
        * This variable stores the ID of the current store.
        * @private
        */       
       storeId: "",
       
       /**
        * This variable stores the ID of the catalog that is used in the store.
        * @private
        */           
       catalogId: "",
       
       /**
        * This variable indicates whether the Ajax CheckoutOut flex flow is enabled or not.
        * @private
        */           
       ajaxCheckOut: true,
       
       /**
        * Sets the common ids used in the store - language id, store id, and catalog id.
        * 
        * @param {string} langId The id of the store language.
        * @param {string} storeId The id of the store.
        * @param {string} langId The id of the catalog used in the store.
        */
       setCommonParameters:function(langId,storeId,catalogId){
              this.langId = langId;
              this.storeId = storeId;
              this.catalogId = catalogId;
       },
       
       /**
        * Sets the URL of the specified controller.
        * 
        * @param {string} controllerId The id of the target controller.
        * @param {string} url The link to specify for the controller.
        */       
       setControllerURL:function(controllerId,url){
              wc.render.getRefreshControllerById(controllerId).url = url;
       }

}

function InventoryAjaxCall()
{
if(document.getElementById("catentryIdList")!=null)
{
var catentids = document.getElementById("catentryIdList").value;

var InventoryURL = getAbsoluteURL()+"CLPStdView?langId="+WCParamJS.langId+"&storeId="+WCParamJS.storeId+"&catalogId="+WCParamJS.catalogId+"&catentryIdList="+catentids;

			$.ajax({
      url: InventoryURL,
      success: function(data) {
	 data = $.parseJSON(data);
	var status;
	var availQty;
	var oos;
	var addtocartId;
	var belowThreshold;
	var lowInfo;
   	 $.each(data.skus, function(i, item) {
       	status = item.status;
	       availQty = parseInt(item.availableQuantity);
		   console.debug("AvailableQty"+availQty);
		oos = item.id;
		lowInfo = "lowinventoryinfo_"  + oos;
		lowQty = "lowinventoryqty_" + oos;
            	addtocartId = "InventoryStatusAddToCart_" + oos;
		belowThreshold = item.belowThreshold;
            	oos = 'OutOfStock_' + oos; 
        	if( (status.localeCompare("Available") != 0) || (availQty < 1))    {	           
	              $("#" + oos).show();
       	       $("#" + addtocartId).empty();

        	}
		else	{
			if(belowThreshold.localeCompare("true") ==0)	{
		              $("#" + lowQty).html(availQty);					
		              $("#" + lowInfo).show();					
			}
	      	       $("#" + addtocartId).show();
				    $("." + oos).empty();
		}
    	});
      }
    });	

}
}

function renderPrice(){
				if(document.getElementById("catentryIdList")!=null)
				{
					var catentids = document.getElementById("catentryIdList").value;
					var catentids = catentids.split(',');
					var x="";
					var i="";
					var j="";
					
					for (i=0;i<catentids.length;i++)
					{
						if(document.getElementById(catentids[i]+"|price")!=null)
						{
							var priceamt=document.getElementById(catentids[i]+"|price").value;
							var priceamt = priceamt.split('|');
							
							if(priceamt!="")
							{
								if(priceamt.length==1)
								{
									if(priceamt!="Price as configured")
									{
										x=document.getElementsByName(catentids[i]+"wholeprice");
										for (j=0;j<x.length;j++)
										{ 
											x[j].innerHTML=priceamt[0];
										}
									}
									else
									{
										x=document.getElementsByName(catentids[i]+"configPriceHolder");
										for (j=0;j<x.length;j++)
										{ 
											x[j].style.display='none';
										}
										x=document.getElementsByName(catentids[i]+"wholepriceConfig");
										for (j=0;j<x.length;j++)
										{ 
											x[j].innerHTML=priceamt[0];
										}
									}
								}
								else if(priceamt.length==2)
								{
									x=document.getElementsByName(catentids[i]+"wholeprice");
									for (j=0;j<x.length;j++)
									{ 
										x[j].innerHTML=priceamt[0];
									}
									x=document.getElementsByName(catentids[i]+"decimalprice");
									for (j=0;j<x.length;j++)
									{ 
										x[j].innerHTML=priceamt[1];
									}
								}
								else if(priceamt.length==3)
								{
									x=document.getElementsByName(catentids[i]+"startingat");
									for (j=0;j<x.length;j++)
									{ 
										x[j].innerHTML=priceamt[0];
									}
									x=document.getElementsByName(catentids[i]+"wholeprice");
									for (j=0;j<x.length;j++)
									{ 
										x[j].innerHTML=priceamt[1];
									}
									x=document.getElementsByName(catentids[i]+"decimalprice");
									for (j=0;j<x.length;j++)
									{ 
										x[j].innerHTML=priceamt[2];
									}
								
								}
								else if(priceamt.length==4)
								{
									
									
									if(typeof document.getElementsByName(catentids[i]+"wholeprice") !== 'undefined' && document.getElementsByName(catentids[i]+"wholeprice") !== null) 
									{
										x=document.getElementsByName(catentids[i]+"startingat");
										for (j=0;j<x.length;j++)
										{ 
											x[j].innerHTML=priceamt[0];
										}
										x=document.getElementsByName(catentids[i]+"wholeprice");
										for (j=0;j<x.length;j++)
										{ 
											x[j].innerHTML=priceamt[2];
										}
										x=document.getElementsByName(catentids[i]+"decimalprice");
										for (j=0;j<x.length;j++)
										{ 
											x[j].innerHTML=priceamt[3];
										}
										
									}


								}
							}
							else
							{
								x=document.getElementsByName(catentids[i]+"priceDiv");
										for (j=0;j<x.length;j++)
										{ 
											x[j].style.display='none';
										}

							}
						}
						else
						{

							x=document.getElementsByName(catentids[i]+"priceDiv");

										for (j=0;j<x.length;j++)
										{ 
											x[j].style.display='none';
										}
							
						}
					 }
				}
			}				

/***************PST STRIKE THROUGH price*******************/


function callPSTPrice(){


var sampleCatent;
var params = {};  
	if(document.getElementById("PSTCatentries") != null)
	{
		sampleCatent = document.getElementById("PSTCatentries").value;
	}
	else if(catentIdPST != "" & catentIdPST != undefined){

		var newCatentIdPST= catentIdPST.substring(1, catentIdPST.length); 
		
		
			if(newCatentIdPST != null)
			{
				sampleCatent = newCatentIdPST;
			}

	}
	else {
		sampleCatent="";
	}

if(sampleCatent !="" && sampleCatent != null){
$.ajax({
      url: '/webapp/wcs/stores/servlet/PriceStrikeThroughDisplayCmd',
      data : {catentryId: sampleCatent},
      success: function(serviceResponse_json) {

	var serviceResponse = JSON.parse(serviceResponse_json);
      //alert(document.getElementById('PSTModelString').value);
      //alert(document.getElementById('PSTCatentries').value);
	var a = "";
	var b = "";
	var c = "";
	var d = "";
	var i = "";
	var j = "";
	var u = "";
	var v = "";
	var k = "";
	var w = "";
	var x = "";
	var y = "";
	var oob ="";
	
      var MLP = serviceResponse.modelListing;
      var MDP = serviceResponse.modelDetails;
      var mbrgrpId = serviceResponse.mbrgrpId;
      var incFlag = true;
      var counter = 1;
	var idFlag = false;
	var allCatentIds=null;
      var failedCatents=null;
	var eachEntry = false;
	if( document.getElementById('PSTModelString') !=undefined && document.getElementById('PSTModelString')!= null ) {
		var model= document.getElementById('PSTModelString').value.split('|');
		for (i=0;i<model.length;i++){
		    var modelEntries = new Array();
			var modelId= model[i].split(':')[0];
			var catentryIdList= model[i].split(':')[1]
//FOR CTO PRODUCT GOES TO FAIL OVER
			if(modelId != null && catentryIdList == ""){
			var priceValCur = "priceValCur_"+modelId;
			var priceValCurBase = "priceValCurBase_"+modelId;
			var basePoint = "basePoint_"+modelId;
			var promoPoint = "promoPoint_"+modelId;
			a=document.getElementsByName(priceValCur);
			b=document.getElementsByName(priceValCurBase);
			c=document.getElementsByName(basePoint);
			d=document.getElementsByName(promoPoint);
			for (j=0;j<a.length;j++)
				{ 
					a[j].style.display = 'none';
				}
			for (j=0;j<b.length;j++)
				{ 
					b[j].style.display = 'none';
				}
			for (j=0;j<c.length;j++)
				{ 
					c[j].style.display = 'none';
				}
			for (j=0;j<d.length;j++)
				{ 
					d[j].style.display = 'none';
				}



			}

//END ..... FOR CTO PRODUCT GOES TO FAIL OVER

			
			var modelCatents= model[i].split(':')[1].split(',');
			for (j=0;j<modelCatents.length;j++){
				//alert(modelCatents[j]);
			       
			       var promo = "promo_"+modelCatents[j];
			       //var promoDecimal = "promoDecimal_"+catentryId;
			       //var baseDecimal =  "baseDecimal_"+catentryId;
    				
      				var promoprice = serviceResponse[promo];
				
    				//var promoDecimal = serviceResponse[base];
      				//var baseDecimal = serviceResponse[promo];
				//alert(parseFloat(promoprice));
				if(promoprice != undefined || promoprice != null){
				var baseCatStr = modelCatents[j]+"="+promoprice;

				modelEntries.push(baseCatStr);
				}
				if(promoprice == undefined || promoprice == null){
				eachEntry = true;

				}

				
			}
			var minTemp=null,swapTemp=null;
			var minID,tempID,tempMinID1,tempMinID2,tempMinID;
			var oldPriceFlow = "oldPriceFlow_"+modelId;
			if(!eachEntry){
			if(modelEntries.length > 1){
				for(k=0; k<modelEntries.length; k++){
					for(w=k+1; w<modelEntries.length; w++){
							tempMinID1 = modelEntries[k].split("=");
							tempMinID2 = modelEntries[w].split("=");
						if(parseFloat(tempMinID1[1]) < parseFloat(tempMinID2[1])){
								if(swapTemp == null){
										swapTemp = tempMinID1[1];
										tempID = tempMinID1[0];
								}
								else{
									if(parseFloat(tempMinID1[1]) < parseFloat(swapTemp)){
                                         swapTemp = tempMinID1[1];
                                         tempID = tempMinID1[0];
									}
								}
						}
						else{
							if(swapTemp == null){
								swapTemp = tempMinID2[1];
								tempID = tempMinID2[0];
							}
							else{
									if(parseFloat(tempMinID2[1]) < parseFloat(swapTemp)){
										swapTemp = tempMinID2[1];
										tempID = tempMinID2[0];
									}
								}			
						}
					}

				}
			minTemp=swapTemp;
			swapTemp=null;
			minID=tempID;
			var base = "base_"+minID;
			var baseprice = serviceResponse[base];
			 
			var modelprice = minTemp;
			var resModel = modelprice.split(".");
			var resModelBase = baseprice.split(".");

			var priceValCur = "priceValCur_"+modelId;
			var priceValCurBase = "priceValCurBase_"+modelId;
			
			var basePoint = "basePoint_"+modelId;
			var promoPoint = "promoPoint_"+modelId;
			var modelpatternPromo = "promo_"+modelId; 
      			var modeldecipatternPromo = "promoDecimal_"+modelId;
			var modelpatternBase = "base_"+modelId; 
      			var modeldecipatternBase = "baseDecimal_"+modelId;
			 var PST = "PST_"+modelId;
			}
			else{
				if(modelEntries!=null){
					tempMinID=modelEntries[0].split("=");
					minID=tempMinID[0];
					minTemp=tempMinID[1];
					var base = "base_"+minID;
					var baseprice = serviceResponse[base];
					var modelprice = minTemp;
					var resModel = modelprice.split(".");
					var resModelBase = baseprice.split(".");

					var priceValCur = "priceValCur_"+modelId;
					var priceValCurBase = "priceValCurBase_"+modelId;
			
					var basePoint = "basePoint_"+modelId;
					var promoPoint = "promoPoint_"+modelId;

					var modelpatternPromo = "promo_"+modelId; 
      					var modeldecipatternPromo = "promoDecimal_"+modelId;
					var modelpatternBase = "base_"+modelId; 
      					var modeldecipatternBase = "baseDecimal_"+modelId;
					var PST = "PST_"+modelId;

				}
			}
			
			
			var oob = [];
			var oob1 = [];
			a=document.getElementsByName(priceValCur);
			b=document.getElementsByName(priceValCurBase);
			c=document.getElementsByName(basePoint);
			d=document.getElementsByName(promoPoint);
			
			x=document.getElementsByName(modelpatternPromo);
			y=document.getElementsByName(modelpatternBase);
			w=document.getElementsByName(modeldecipatternPromo);
			v=document.getElementsByName(modeldecipatternBase);
			oobName = document.getElementsByName(oldPriceFlow);
			
		var pstName = document.getElementsByName(PST);

pst1 = [];


var inputs = document.getElementsByTagName( 'div' );
for(var i=0;i<inputs.length;i++){
  					if(inputs.item(i).getAttribute( 'name' ) == PST){
   						 pst1.push( inputs.item(i) );
 					 }
				}


for (j=0;j<pstName.length;j++)
				{ 
					pstName[j].style.display = 'block';
				}



for (j=0;j<pst1.length;j++)
				{ 
					pst1[j].style.display = 'block';
				}
			
			

			if(resModel != null){
				var inputs = document.getElementsByTagName( 'div' );
				for(var i=0;i<inputs.length;i++){
				 if(inputs.item(i).getAttribute( 'name' ) == oldPriceFlow){
				    oob.push( inputs.item(i) );
					  }
				}
				
				for (j=0;j<oobName.length;j++)
				{ 
					oobName[j].style.display = 'none';
				}
 
				for (j=0;j<oob.length;j++)
				{ 
					oob[j].style.display = 'none';
				}

				for (j=0;j<x.length;j++)
				{ 
					x[j].innerHTML = resModel[0];
				}
			if(resModel[1] != null){
				for (j=0;j<w.length;j++)
				{ 
					w[j].innerHTML = resModel[1];
				}
			}
			else{
				for (j=0;j<w.length;j++)
				{ 
				w[j].innerHTML = '00';
				}
			}
				for (j=0;j<d.length;j++)
				{ 
					d[j].innerHTML = '.';
				}
							
							
			}
						if(baseprice == modelprice ){
							
							for (j=0;j<b.length;j++)
							{ 
								b[j].style.display = 'none';
							}
							for (j=0;j<c.length;j++)
							{ 
								c[j].style.display = 'none';
							}
						}
						if(modelprice == null){
							for (j=0;j<a.length;j++)
							{ 
								a[j].style.display = 'none';
							}
							for (j=0;j<d.length;j++)
							{ 
								d[j].style.display = 'none';
							}
							for (j=0;j<b.length;j++)
							{ 
								b[j].style.display = 'none';
							}
							for (j=0;j<c.length;j++)
							{ 
								c[j].style.display = 'none';
							}

						}
			if(baseprice != modelprice){
				for (j=0;j<y.length;j++)
				{ 
					y[j].innerHTML = resModelBase[0];
				}
				if(resModelBase[1] != null){
					for (j=0;j<v.length;j++)
					{ 
					v[j].innerHTML = resModelBase[1];
					}
				}
				else{
					for (j=0;j<v.length;j++)
					{ 
					v[j].innerHTML =  '00';	
					}
				}
				for (j=0;j<c.length;j++)
				{ 
					c[j].innerHTML = '.';
				}
				
			}


			
			eachEntry = false;
			}
			else{
				eachEntry = false;
				var priceValCur = "priceValCur_"+modelId;
			var priceValCurBase = "priceValCurBase_"+modelId;
			var basePoint = "basePoint_"+modelId;
			var promoPoint = "promoPoint_"+modelId;
			a=document.getElementsByName(priceValCur);
			b=document.getElementsByName(priceValCurBase);
			c=document.getElementsByName(basePoint);
			d=document.getElementsByName(promoPoint);
			oobName=document.getElementsByName(oldPriceFlow);
			
				var inputs = document.getElementsByTagName( 'div' );
				oob1 = [];
				
				for(var i=0;i<inputs.length;i++){
  					if(inputs.item(i).getAttribute( 'name' ) == oldPriceFlow){
   						 oob1.push( inputs.item(i) );
 					 }
				}
				
				
				for (j=0;j<oobName.length;j++)
				{ 
					oobName[j].style.display = 'block';
				}
				
	
				for (j=0;j<oob1.length;j++)
				{ 
					oob1[j].style.display = 'block';
				}
				for (j=0;j<a.length;j++)
				{ 
					a[j].style.display = 'none';
				}
				for (j=0;j<b.length;j++)
				{ 
					b[j].style.display = 'none';
				}
				for (j=0;j<c.length;j++)
				{ 
					c[j].style.display = 'none';
				}
				for (j=0;j<d.length;j++)
				{ 
					d[j].style.display = 'none';
				}

			}
			}
	}
	else{
		
	    }
	if(MLP == null){
	if(document.getElementById("PSTCatentries") != null)
	{
		idFlag = true;
	}
	if(idFlag){	
      allCatentIds = document.getElementById("PSTCatentries").value;
	}
	if(allCatentIds == null)
	{
		var newCatentIdPST="";
		if(catentIdPST != "" & catentIdPST != undefined){
			newCatentIdPST= catentIdPST.substring(1, catentIdPST.length);
		} else if(document.getElementById("cartpagePSTids") != null){
			newCatentIdPST = document.getElementById("cartpagePSTids").value;
		} 
		
		allCatentIds = newCatentIdPST;
	}
	else{
		allCatentIds = "";
	}	
	

      var eachEntryId = allCatentIds.split(",");
	}
      var existEntry=[];
      
      while(incFlag)
    	  {
	var failFlag = false;
	var existFlag = false;
    	  var catent = "catent_"+counter;
    	  var model = "model_"+counter;
      var catentryId = serviceResponse[catent];
	if(catentryId ==null || catentryId ==undefined) {

			if(failedCatents==null){
				if(eachEntryId[counter-1] != null )
				{
				failFlag = true;
				failedCatents=eachEntryId[counter-1];
				}	
			}
		else {
				if(eachEntryId[counter-1] != null )
				{

				failFlag = true;
			failedCatents=failedCatents+","+eachEntryId[counter-1];
				}
			}
			catentryId=eachEntryId[counter-1];
		}
      var modelId = serviceResponse[model];
	if(MLP == null){

	for (var i = 0; i < eachEntryId.length; i++) {
        if (eachEntryId[i] === catentryId) {
		existFlag = true;
		existEntry[i]=eachEntryId[i];
		
        }
	}
	}
	if(!failFlag)
	{
      if((modelId == null && catentryId == null && MDP != null) || (catentryId == null && MLP == null && MDP == null) || (MLP != null && catentryId == null && modelId == null))
    	  {
    	  incFlag = false;
		break;
    	  }
	}
      var base = "base_"+catentryId;
      var promo = "promo_"+catentryId;
      var oldPriceFlow = "oldPriceFlow_"+catentryId;
      var priceValCur = "priceValCur_"+catentryId;
      var priceValCurBase = "priceValCurBase_"+catentryId;


      var promoDecimal = "promoDecimal_"+catentryId;
      var baseDecimal =  "baseDecimal_"+catentryId;

      var modelpattern= "promo_"+modelId; 
      var modeldecipattern = "decipromo_"+modelId;
      var baseprice = serviceResponse[base];
      var promoPoint = "promoPoint_"+catentryId;
      var basePoint = "basePoint_"+catentryId;
      var PST = "PST_"+catentryId;
	
      var promoprice = serviceResponse[promo];
      var modelprice = serviceResponse[modelpattern];
    
      if(MLP == null || MDP != null)
	  {	 
	  //document.getElementById(catentryId).innerHTML=catentryId;
      //document.getElementById(base).innerHTML=baseprice;
	if(promoprice != null){ 
		
	//document.getElementById(oldPriceFlow).style.display = 'none';
var oobName = document.getElementsByName(oldPriceFlow);
var inputs = document.getElementsByTagName( 'div' );
var x1 = [];
for(var i=0;i<inputs.length;i++){
  if(inputs.item(i).getAttribute( 'name' ) == oldPriceFlow){
    x1.push( inputs.item(i) );
  }
}

	for (j=0;j<oobName.length;j++)
	{ 
		oobName[j].style.display = 'none';
	}

	for (j=0;j<x1.length;j++)
	{ 
		x1[j].style.display = 'none';
	}
	//alert("before split"+promoprice);
	var resBase = baseprice.split(".");
	var res = promoprice.split(".");
	//alert("promotion price"+res);
	if(promo != null && base !=null){
	x=document.getElementsByName(promo);
	y=document.getElementsByName(base);
	w=document.getElementsByName(promoPoint);
	v=document.getElementsByName(basePoint);
	var PSTName = document.getElementsByName(PST); 

var PST1= [];
var inputs = document.getElementsByTagName( 'div' );
for(var i=0;i<inputs.length;i++){
  if(inputs.item(i).getAttribute( 'name' ) == PST){
    PST1.push( inputs.item(i) );
  }
}

	for (j=0;j<PSTName.length;j++)
	{ 
		
		PSTName[j].style.display = 'block';

		
	}

	for (j=0;j<PST1.length;j++)
	{ 
		
		PST1[j].style.display = 'block';

		
	}

	for (j=0;j<w.length;j++)
	{ 
		w[j].innerHTML = '.';
	}

	


	for (j=0;j<x.length;j++)
	{ 
	var aaa=res[0];
		x[j].innerHTML=res[0];
	}
if(baseprice != promoprice)
{
	for (j=0;j<y.length;j++)
	{ 
		y[j].innerHTML=resBase[0];
	}
	for (j=0;j<v.length;j++)
	{ 
		v[j].innerHTML = '.';
	}
}
else
{
u=document.getElementsByName(priceValCurBase);
			v=document.getElementsByName(basePoint);
			for (j=0;j<u.length;j++)
			{ 
				u[j].style.display = 'none';
			}
			for (j=0;j<v.length;j++)
			{ 
				v[j].style.display = 'none';
			}
}
	//document.getElementById(promo).innerHTML=res[0];
		if(res[1] == '00' || res[1] == null || resBase[1] == '00' || resBase[1] == null)
		{
					x=document.getElementsByName(promoDecimal);
					y=document.getElementsByName(baseDecimal);
					for (j=0;j<x.length;j++)
					{ 
					 x[j].innerHTML='00';
					}
				if(baseprice != promoprice)
				{
					for (j=0;j<y.length;j++)
					{ 
					 y[j].innerHTML='00';
					}
				}
		}
		else{
					x=document.getElementsByName(promoDecimal);
					y=document.getElementsByName(baseDecimal);
					for (j=0;j<x.length;j++)
					{ 
					 x[j].innerHTML=res[1];
					}
				if(baseprice != promoprice)
				{
					for (j=0;j<y.length;j++)
					{ 
					 y[j].innerHTML=resBase[1];
					}
				}


		}

	}

	}
	
	else{
	
		//alert("catentry_id no entry"+priceValCur);
		x=document.getElementsByName(priceValCur);
		y=document.getElementsByName(promoPoint);
		
		u=document.getElementsByName(priceValCurBase);
		v=document.getElementsByName(basePoint);
		
		for (j=0;j<x.length;j++)
	{ 
		x[j].style.display = 'none';
	}
	for (j=0;j<y.length;j++)
	{ 
		y[j].style.display = 'none';
	}

	for (j=0;j<u.length;j++)
	{ 
		u[j].style.display = 'none';
	}
	for (j=0;j<v.length;j++)
	{ 
		v[j].style.display = 'none';
	}


		
		//document.getElementById(promo).style.display = 'none';
		//document.getElementById(promoDecimal).style.display = 'none';
	}
	

	  }
      if(modelId != null )
      {
		var res = modelprice.split(".");

		//alert("modelprice after splitting"+res);
      		document.getElementById(modelpattern).innerHTML=res[0];

	if(res[1] == '0' || res[1] == null)
	{
		document.getElementById(modeldecipattern).innerHTML='00';
	}
	else{
		document.getElementById(modeldecipattern).innerHTML=res[1];
	}
	
      }
     
      counter++;
    	  }
if(MLP == null || MDP != null)
	  {

	var allCatent = allCatentIds.split(",");
	//alert("allCatent  of size"+allCatent.length);
	for (var i = 0; i < allCatent.length; i++) {
		var entryFlag=false;
		for (var j = 0; j < existEntry.length; j++){
			
			if(allCatent[i] === existEntry[j]){
	
				entryFlag=true;
				break;
			}
		}
		var base = "base_"+allCatent[i];
      var promo = "promo_"+allCatent[i];
	 var baseprice = serviceResponse[base];
	 var promoprice = serviceResponse[promo];
	 
		if(baseprice == promoprice)
		{
		 var priceValCurBase = "priceValCurBase_"+allCatent[i];
		 var basePoint = "basePoint_"+allCatent[i];
		 u=document.getElementsByName(priceValCurBase);
		 v=document.getElementsByName(basePoint);
			for (j=0;j<u.length;j++)
			{ 
				u[j].style.display = 'none';
			}
			for (j=0;j<v.length;j++)
			{ 
				v[j].style.display = 'none';
			}
		}

		if(!entryFlag){
			 
			 //alert(allCatent[i]);
			 var priceValCur = "priceValCur_"+allCatent[i];
			 var promoPoint = "promoPoint_"+allCatent[i];
			 var priceValCurBase = "priceValCurBase_"+allCatent[i];
			 var basePoint = "basePoint_"+allCatent[i]; 

			 //alert("priceValCur"+priceValCur);
			x=document.getElementsByName(priceValCur);
			y=document.getElementsByName(promoPoint);
			u=document.getElementsByName(priceValCurBase);
			v=document.getElementsByName(basePoint);


			for (j=0;j<x.length;j++)
			{ 
				x[j].style.display = 'none';
			}
			for (j=0;j<y.length;j++)
			{ 
				y[j].style.display = 'none';
			}

			for (j=0;j<u.length;j++)
			{ 
				u[j].style.display = 'none';
			}
			for (j=0;j<v.length;j++)
			{ 
				v[j].style.display = 'none';
			}


			 //document.getElementById(priceValCur).style.display = 'none';
			 //document.getElementById(promoPoint).style.display = 'none';


		}
		
		
	}
	}
      /* var catentryMap =  serviceResponse.catentId;
     var basePrice =  serviceResponse.basePrice; 
     var promoPrice =  serviceResponse.promoPrice;
     var finalMap = serviceResponse.finalMap;
     document.getElementById("catentId").innerHTML=promoPrice;*/
     

    }
 });
}






}


/** 
 * Declares a new refresh controller for the Category display with pagination.
 */
wc.render.declareRefreshController({
       id: "CategoryDisplay_Controller",
       renderContext: wc.render.getContextById("CategoryDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of category listings.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              categoryDisplayJS.contextChanged = true;
              widget.refresh(renderContext.properties);
              
       }

       /** 
        * This function handles paging and browser back/forward functionalities upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (categoryDisplayJS.contextChanged && (!categoryDisplayJS.isHistory)){

                       var identifier = "&identifier=" + (new Date()).getTime();
                       
                       
                      var historyObject = new categoryDisplayJS.HistoryTracker('CategoryDisplay_Widget', controller.url + identifier);
                       dojo.back.addToHistory(historyObject);       
                       categoryDisplayJS.contextChanged = false;
                       categoryDisplayJS.isHistory = false;  
              }
              cursor_clear();
              
              try {
			  	if(typeof(ceadojo) != "undefined") {
            	  ceadojo.publish("/wc/collaboration/CategoryDisplayRefreshed",[]);
			  	}
              }catch(err) {
            	  
              }

              
       }

}),

/** 
 * Declares a new refresh controller for the Sub-category display with pagination.
 */
wc.render.declareRefreshController({
       id: "SubCategoryDisplay_Controller",
       renderContext: wc.render.getContextById("SubCategoryDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of sub-category listings.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              categoryDisplayJS.contextChanged = true;
              widget.refresh(renderContext.properties);
              
       }

       /** 
        * This function handles paging and browser back/forward functionalities upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (categoryDisplayJS.contextChanged && (!categoryDisplayJS.isHistory)){

                       var identifier = "&identifier=" + (new Date()).getTime();
                       
                       
                      var historyObject = new categoryDisplayJS.HistoryTracker('SubCategoryDisplay_Widget', controller.url + identifier);
                       dojo.back.addToHistory(historyObject);       
                       categoryDisplayJS.contextChanged = false;
                       categoryDisplayJS.isHistory = false;  
              }
              cursor_clear();

       }

}),

/** 
 * Declares a new refresh controller for the Shopping Cart display.
 */
wc.render.declareRefreshController({
       id: "ShopCartDisplayController",
       renderContext: wc.render.getContextById("ShopCartPaginationDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Refreshs the shopping cart area when an update to the order is made, 
        * such as add/remove items or update quantity/promotions etc.
        * This function is called when a modelChanged event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,modelChangedHandler: function(message, widget) {
              var controller = this;
              
              var renderContext = this.renderContext;
              if(message.actionId in order_updated){
	               widget.refresh(renderContext.properties);
				   submitRequest(); //Till shop cart is refreshed, do not allow any other requests..
				   cursor_wait();
              }
       }

       /** 
        * Displays the discounts and promotions area upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
			resetRequest(); //Shop cart is refreshed, give the control to shopper...
			 		 var controller = this;
           var renderContext = this.renderContext;
            var couponUsed="";
			var PromotionsCount="";
			var orderLevelCouponApplied = "";
	         if (typeof(savedOrdersJS) != null && typeof(savedOrdersJS) != 'undefined')
	         {
	        	 savedOrdersJS.isCurrentOrderPage(true);
	         }


		if( displaycpntooltip && $('#tooltip_cpn').length)
					{$('#tooltip_cpn').show();}


              var controller = this;
              // Order level discount tooltip section - if the tooltip is defined, show the section after area is refreshed
              if(document.getElementById("discountDetailsSection")!=null )  {
                     document.getElementById("discountDetailsSection").style.display = "block";
              }
			  
			 if(document.getElementById("codeUsed")!=null)
					 couponUsed=document.getElementById("codeUsed").value;
					   // Promotion code tooltip section - if the tooltip is defined, show the section after area is refreshed
					  if(couponUsed=="true") {
					  $('.coupondetail').hide();
							 document.getElementById("appliedPromotionCodes").style.display = "block";
					  } 
					if(document.getElementById("PromotionsCount")!=null)
						PromotionsCount=document.getElementById("PromotionsCount").value;
						console.debug("PromotionsCount"+PromotionsCount);
					  	if(couponUsed=="false" && PromotionsCount!=0){
						  document.getElementById("appliedPromotionCodes").style.display = "none";
						 // $('.coupondetailCart').show();
						  $("#promotionMessage").text("The coupon code you have entered is not applicable with products in the cart");
							$("#promoCode").addClass("error");
							$("#promotionMessage").addClass("error");
						}
						var orderLevelcpn=ServicesDeclarationJS.getOrderLevelcouponApplied();
						console.debug("orderLevelcpn"+orderLevelcpn);
						if(couponUsed=="false" && orderLevelcpn=='true'){
						 $("#promotionMessage").text("The coupon code you have entered is not applicable with products in the cart");
							$("#promoCode").addClass("error");
							$("#promotionMessage").addClass("error");
						}
				
					
			
			  
              
              if(!CheckoutHelperJS.isAjaxCheckOut()){
	              CheckoutHelperJS.setFieldDirtyFlag(false);
	              CheckoutHelperJS.initDojoEventListenerShoppingCartPage();
              }

	      CheckoutHelperJS.ShowEstimateButton();
              
              //select the proper shipmode that is saved in the cookie
              var orderId = renderContext.properties["orderId"];
              if(document.getElementById("currentOrderId")) {
              	orderId = document.getElementById("currentOrderId").value;
              }
              ShipmodeSelectionExtJS.displaySavedShipmentTypeForOrder(orderId);
			  if(document.getElementById("OrderFirstItemId"))
			  {
				ShipmodeSelectionExtJS.orderItemId = document.getElementById("OrderFirstItemId").value;
			  }
		// evaluate scripts in shopping list
		dojo.query('div[id^="shoppingListScript_"]').forEach(function(node, index, nodelist){
			dojo.eval(node.innerHTML);
		  });
		 
		  CheckoutPayments.checkoutofstockincartpage();
 var NoDiscountCheck=document.getElementById("NoDiscountCheck").value; 
  if(NoDiscountCheck == '0')
                   {
                    document.getElementById("TotSav").style.display="none";
                    }
 cursor_clear(); 
     
 
 if(document.getElementById("gift1")!=null && document.getElementById("csto")!= null ){
 if(document.getElementById("gift1").value >= '1' && document.getElementById("csto").value=='0') {
console.debug("test shipping");
shippingAjax();
}
}			
			  
			//code for price > 6000$  
			var PriceLimit=document.getElementById("priceLimit").value;
			var subTotalChk=parseFloat(PriceLimit);
			var priceThreshold=parseFloat("6000.00");
    		if(document.getElementById("priceThreshold")!=null)
			{
				var priceThreshold=document.getElementById("priceThreshold").value;
				priceThreshold=priceThreshold.trim();
				priceThreshold=parseFloat(priceThreshold);
			}
			 	if(subTotalChk > priceThreshold && $.hpsfUI.isCallCenterFlow() == false)
                  {
                     //alert("Please complete this order through our sales center. Call 1-866-288-7366");
					$('html, body').animate({ scrollTop:0}, $(window).scrollTop() / 3);
					dojo.byId("alertforprice").style.display="block";
					dojo.connect(dojo.byId("alertforprice"), "onclick", function(evt){
                        dojo.query('.alertbox.warningforprice').style("display","none");

                       });
					dojo.addClass("shopcartCheckout", "disabled");
					
				  }
			   
           var NoDiscountCheck=document.getElementById("NoDiscountCheck").value; 
           if(NoDiscountCheck == '0')
                   {
                    document.getElementById("TotSav").style.display="none";
                    }
$(document).foundation();
	$('.accessoriesSlider.specialty ul.pdpSlider').bxSlider({
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 225,
        slideMargin: 25,
        nextSelector: '#nextSpecialty',
        prevSelector: '#prevSpecialty',
        nextText: '',
        prevText: '',
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        useCSS:false,
        onSlideNext: function(){
      },
        onSlidePrev: function(){
        }
    });	
InventoryAjaxCall();
renderPrice();
//callPSTPrice();
PromPriceDisplayJS.strikePricePost();


		}
 


}),

/** 
 * Declares a new refresh controller for the Shopping Cart pagination display.
 */
wc.render.declareRefreshController({
       id: "ShopCartPaginationDisplayController",
       renderContext: wc.render.getContextById("ShopCartPaginationDisplay_Context"),
       url: "",
       formId: ""
       
       /** 
        * Displays the previous/next page of order items in the shopping cart.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
              if(!CheckoutHelperJS.isAjaxCheckOut()){
	              CheckoutHelperJS.setFieldDirtyFlag(false);
	              CheckoutHelperJS.initDojoEventListenerShoppingCartPage();
              }
              
              //select the proper shipmode that is saved in the cookie
              var orderId = renderContext.properties["orderId"];
              if(document.getElementById("currentOrderId")) {
              	orderId = document.getElementById("currentOrderId").value;
              }
              ShipmodeSelectionExtJS.displaySavedShipmentTypeForOrder(orderId);
       }
}),

/** 
* Declares a new refresh controller for the Pending orders details page pagination display.
*/
wc.render.declareRefreshController({
      id: "PendingOrderPaginationDisplayController",
      renderContext: wc.render.getContextById("PendingOrderPaginationDisplay_Context"),
      url: "",
      formId: ""
      
      /** 
       * Displays the previous/next page of order items in the shopping cart.
       * This function is called when a render context changed event is detected. 
       * 
       * @param {string} message The render context changed event message
       * @param {object} widget The registered refresh area
       */
      ,renderContextChangedHandler: function(message, widget) {
             var controller = this;
             var renderContext = this.renderContext;
             
             if(controller.testForChangedRC(["beginIndex"])){
            	 widget.refresh(renderContext.properties);
             }
      }

      /** 
       * Hide the progress bar upon a successful refresh.
       * 
       * @param {object} widget The registered refresh area
       */
      ,postRefreshHandler: function(widget) {
    	  
             var controller = this;
             var renderContext = this.renderContext;
             cursor_clear();
      }
}),

/** 
 * Declares a new refresh controller for Single Shipment Order Item display with pagination
 * on the Order Summary and Confirmation pages. 
 */
wc.render.declareRefreshController({
       id: "OrderItemPaginationDisplayController",
       renderContext: wc.render.getContextById("OrderItemPaginationDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of order items for Single Shipment Order Summary/Confirmation display.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Single Shipment Order Item display with pagination
 * on the Order Summary pages when inegrating with Sterling. 
 */
wc.render.declareRefreshController({
    id: "SSFSOrderItemPaginationDisplayController",
    renderContext: wc.render.getContextById("OrderItemPaginationDisplay_Context"),
    url: "",
    formId: ""

    /** 
     * Displays the previous/next page of order items for Single Shipment Order Summary/Confirmation display.
     * This function is called when a render context changed event is detected. 
     * 
     * @param {string} message The render context changed event message
     * @param {object} widget The registered refresh area
     */
    ,renderContextChangedHandler: function(message, widget) {
           var controller = this;
           var renderContext = this.renderContext;
           if(controller.testForChangedRC(["beginIndex"])){
                  widget.refresh(renderContext.properties);
           }
    }

    /** 
     * Hide the progress bar upon a successful refresh.
     * 
     * @param {object} widget The registered refresh area
     */
    ,postRefreshHandler: function(widget) {
           var controller = this;
           var renderContext = this.renderContext;
                        
           var orderStr = document.getElementById("jsonOrderStr").innerHTML;
           var beginIndex = this.renderContext.properties['beginIndex'];
           var pageSize = this.renderContext.properties['pageSize'];             
           sterlingIntegrationJS.populateOrderLineInfoForSingleShipment(orderStr, beginIndex, pageSize);         	
           cursor_clear();
    }
}),

/** 
 * Declares a new refresh controller for Multiple Shipment Order Item display with pagination
 * on the Order Summary and Confirmation pages.
 */
wc.render.declareRefreshController({
       id: "MSOrderItemPaginationDisplayController",
       renderContext: wc.render.getContextById("MSOrderItemPaginationDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of order items for Multiple Shipment Order Summary/Confirmation display.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Multiple Shipment Order Item display with pagination
 * on the Order Summary when integrating with Sterling.
 */
wc.render.declareRefreshController({
    id: "SSFSMSOrderItemPaginationDisplayController",
    renderContext: wc.render.getContextById("MSOrderItemPaginationDisplay_Context"),
    url: "",
    formId: ""

    /** 
     * Displays the previous/next page of order items for Multiple Shipment Order Summary/Confirmation display.
     * This function is called when a render context changed event is detected. 
     * 
     * @param {string} message The render context changed event message
     * @param {object} widget The registered refresh area
     */
    ,renderContextChangedHandler: function(message, widget) {
           var controller = this;
           var renderContext = this.renderContext;
           if(controller.testForChangedRC(["beginIndex"])){
                  widget.refresh(renderContext.properties);
           }
    }

    /** 
     * Hide the progress bar upon a successful refresh.
     * 
     * @param {object} widget The registered refresh area
     */
    ,postRefreshHandler: function(widget) {
           var controller = this;
           var renderContext = this.renderContext;
           
           var orderStr = document.getElementById("jsonOrderStr").innerHTML;
           var beginIndex = this.renderContext.properties['beginIndex'];
           var pageSize = this.renderContext.properties['pageSize'];              
           sterlingIntegrationJS.populateOrderLineInfoForMultipleShipment(orderStr, beginIndex, pageSize);              
           cursor_clear();
    }
}),

/** 
 * Declares a new refresh controller for Coupon Wallet display.
 */
wc.render.declareRefreshController({
	id: "CouponDisplay_Controller",
	renderContext: wc.render.getContextById("CouponDisplay_Context"),
	url: "",
	formId: ""
	
	/** 
	 * Refreshs the coupon wallet display if a coupon is added or removed via an Ajax call.
	 * This function is called when a modelChanged event is detected. 
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	,modelChangedHandler: function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		if(message.actionId == 'AjaxCouponsAddRemove' || message.actionId == 'AjaxWalletItemProcessServiceDelete'){
			widget.refresh(renderContext.properties);
		}
	}
}),

/** 
 * Refresh controller for displaying a pop-up of a list of free gifts to choose from .
 */
wc.render.declareRefreshController({
    id: "PromotionFreeGifts_Controller",
    renderContext: wc.render.getContextById("PromotionFreeGifts_Context"),
    url: "",
    formId: ""

    ,modelChangedHandler: function(message, widget) {
           var controller = this;
           var renderContext = this.renderContext;
    }

    ,renderContextChangedHandler: function(message, widget) {
           var controller = this;
           var renderContext = this.renderContext;   
           widget.refresh(renderContext.properties);
    }
    
    ,postRefreshHandler: function(widget) {
	    var controller = this;
	    var renderContext = this.renderContext;	   
	    cursor_clear();
	    PromotionChoiceOfFreeGiftsJS.showFreeGiftsDialog();
   }
}),

/** 
 * Declares a new refresh controller for the saved orders list with pagination.
 */
wc.render.declareRefreshController({
       id: "ListOrdersDisplay_Controller",
       renderContext: wc.render.getContextById("ListOrdersDisplay_Context"),
       url: "",
       formId: ""

    	   ,modelChangedHandler: function(message, widget) {
           var controller = this;
           var renderContext = this.renderContext;
           if(message.actionId in listorders_changed){
        	   		
        		    //After an order create, or order copy service, return to the first page.
	       	   	 	if ((message.actionId == 'AjaxOrderCreate' || message.actionId == 'AjaxSingleOrderCalculate') && this.renderContext.properties["startNumber"] != 0) 
	       	   	 	{
	       	   	 		
	       	   	 		wc.render.updateContext("ListOrdersDisplay_Context", {'startNumber' : 0});	
	       	   	 	}
	       	   	 	else
	       	   	 	{
	       	   	 		widget.refresh(renderContext.properties);
	       	   	 	}
           }
    }

       /** 
        * Refreshes the saved orders table.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
            
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["startNumber"])){
            	
            	  widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Update the toolbar icons after a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
        	
              var controller = this;
              var renderContext = this.renderContext;
              if (savedOrdersJS.updateCurrentOrder)
              {
            	  savedOrdersJS.initializeCurrentOrder();
            	  savedOrdersJS.updateCurrentOrder = false;
              }
              savedOrdersJS.updateToolbar();
              savedOrdersJS.checkAllIfNeeded();
       }
}),

/** 
* Declares a new refresh controller for the Shopping Cart display.
*/
wc.render.declareRefreshController({
      id: "PendingOrderDisplayController",
      renderContext: wc.render.getContextById("PendingOrderPaginationDisplay_Context"),
      url: "",
      formId: ""

      /** 
       * Refreshs the shopping cart area when an update to the order is made, 
       * such as add/remove items or update quantity/promotions etc.
       * This function is called when a modelChanged event is detected. 
       * 
       * @param {string} message The model changed event message
       * @param {object} widget The registered refresh area
       */
      ,modelChangedHandler: function(message, widget) {
             var controller = this;
          
             var renderContext = this.renderContext;
             if(message.actionId in order_updated){
            	 
            	 	this.currentDesc = document.getElementById('OrderDescription_input').value;
            	 	
                    widget.refresh(renderContext.properties);
             }
      }

      /** 
       * Displays the discounts and promotions area upon a successful refresh.
       * 
       * @param {object} widget The registered refresh area
       */
      ,postRefreshHandler: function(widget) {
             var controller = this;
           
             cursor_clear();
             
             if (this.currentDesc != document.getElementById('OldOrderDescription').value)
             {
            	var inputElement = document.getElementById('OrderDescription_input');
            	if (inputElement != null && inputElement != 'undefined')
            	{
            		inputElement.value = this.currentDesc;
            		dojo.removeClass(inputElement, 'savedOrderDetailsInputBorder'); 
            		dojo.addClass(inputElement, 'savedOrderDetailsInputBorderWarning');
            	}
             }
          
      }

}),

/** 
 * Declares a new refresh controller for the Browsing History ESpot.
 */
wc.render.declareRefreshController({
       id: "BrowsingHistoryController",
       renderContext: wc.render.getContextById("BrowsingHistoryContext"),
       url: "",
       formId: ""
       
       /** 
        * Refreshes the Browsing History Espot area.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
		    var controller = this;
		    var renderContext = this.renderContext;

		    if(controller.testForChangedRC(["status"])){
		    	widget.refresh(renderContext.properties);
		    }	
       }
       
       /** 
        * Post handling for the Browsing History display.
        * This function is called after a successful refresh. 
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
        	if(!document.getElementById('WC_ScrollingProductsESpot_EmptyImgContainer_BrowsingHistory')){
        			document.getElementById('WC_LeftSidebarDisplay_div_5').style.display = 'block';
        	}
       }       
       
}),

/** 
* Declares a new refresh controller for the My Account Browsing History Display.
*/
wc.render.declareRefreshController({
      id: "BrowsingHistoryDisplay_Controller",
      renderContext: wc.render.getContextById("BrowsingHistoryDisplay_Context"),
      url: "",
      formId: ""
     
       /** 
        * Refreshes the Browsing History display.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The model changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
		    var controller = this;
		    var renderContext = this.renderContext;

		    if(controller.testForChangedRC(["currentPage"]) || controller.testForChangedRC(["pageView"])){
		    	widget.refresh(renderContext.properties);
		    }	
       }

       /** 
        * Post handling for the Browsing History display.
        * This function is called after a successful refresh. 
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
        	cursor_clear();
       }

}),

/** 
 * Declares a new refresh controller for the Category Subscription e-marketing spot.
 */
wc.render.declareRefreshController({
	id: "CategorySubscriptionController",
	renderContext: wc.render.getContextById("CategorySubscriptionContext"),
	url: "",
	formId: ""
	
	/** 
	 * Refreshes the category subscription area when a status update is made, such as subscribe or unsubscribe. 
	 * This function is called when a modelChanged event is detected. 
	 * 
	 * @param {Object} message The model changed event message.
	 * @param {Object} widget The registered refresh area.
	 */
	,modelChangedHandler: function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		if(message.actionId == "AjaxCategorySubscribe"){
			widget.refresh(renderContext.properties);
		}
	}

	/** 
	 * This function is called after a successful area refresh, and it clears the progress bar. 
	 * 
	 * @param {object} widget The registered refresh area
	 */
	,postRefreshHandler: function(widget) {
		cursor_clear();
		if(dojo.byId("CategorySubscriptionImage") == null){
			dojo.animateProperty({
				node: dojo.byId("CategorySubscriptionLink"),
				duration: 1500,
				properties: {
					backgroundColor: {
						start: "yellow",
						end: dojo.style("CategorySubscriptionLink", "backgroundColor")
					}
				}
			}).play();
		}
	}
}),

/** 
 * Declares a new refresh controller for Recurring Order display with pagination
 * in My Recurring Order page. 
 */
wc.render.declareRefreshController({
       id: "RecurringOrderDisplayController",
       renderContext: wc.render.getContextById("RecurringOrderDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of recurring orders.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */

		,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "AjaxCancelSubscription") {
                     controller.url = wc.render.getRefreshControllerById("RecurringOrderDisplayController").url;
                     widget.refresh(renderContext.properties);
              }
       }

       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Subscription display with pagination
 * in My Subscription page. 
 */
wc.render.declareRefreshController({
       id: "SubscriptionDisplayController",
       renderContext: wc.render.getContextById("SubscriptionDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of subscriptions.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */

		,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "AjaxCancelSubscription") {
                     controller.url = wc.render.getRefreshControllerById("SubscriptionDisplayController").url;
                     widget.refresh(renderContext.properties);
              }
       }

       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Recent Recurring Orders 
 * in My Account landing page. 
 */
wc.render.declareRefreshController({
       id: "RecentRecurringOrderDisplayController",
       renderContext: wc.render.getContextById("RecentRecurringOrderDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of recurring orders.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */

		,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "AjaxCancelSubscription") {
                     controller.url = wc.render.getRefreshControllerById("RecurringOrderDisplayController").url;
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for recent Subscription display
 * in My Account landing page. 
 */
wc.render.declareRefreshController({
       id: "RecentSubscriptionDisplayController",
       renderContext: wc.render.getContextById("RecentSubscriptionDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of subscriptions.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */

		,modelChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if (message.actionId == "AjaxCancelSubscription") {
                     controller.url = wc.render.getRefreshControllerById("SubscriptionDisplayController").url;
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Recurring Order child orders display with pagination
 * in Recurring Order Details History page. 
 */
wc.render.declareRefreshController({
       id: "RecurringOrderChildOrdersDisplayController",
       renderContext: wc.render.getContextById("RecurringOrderChildOrdersDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of recurring orders.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Declares a new refresh controller for Subscription child orders display with pagination
 * in Subscription Details History page. 
 */
wc.render.declareRefreshController({
       id: "SubscriptionChildOrdersDisplayController",
       renderContext: wc.render.getContextById("SubscriptionChildOrdersDisplay_Context"),
       url: "",
       formId: ""

       /** 
        * Displays the previous/next page of subscriptions.
        * This function is called when a render context changed event is detected. 
        * 
        * @param {string} message The render context changed event message
        * @param {object} widget The registered refresh area
        */
       ,renderContextChangedHandler: function(message, widget) {
              var controller = this;
              var renderContext = this.renderContext;
              if(controller.testForChangedRC(["beginIndex"])){
                     widget.refresh(renderContext.properties);
              }
       }

       /** 
        * Hide the progress bar upon a successful refresh.
        * 
        * @param {object} widget The registered refresh area
        */
       ,postRefreshHandler: function(widget) {
              var controller = this;
              var renderContext = this.renderContext;
              cursor_clear();
       }
}),

/** 
 * Refresh controller for quickinfo popup. 
 */
wc.render.declareRefreshController({
	id: "QuickInfoDetailsController",
	renderContext: wc.render.getContextById("QuickInfoContext"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the wishlist drop down in the quick info popup.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		widget.refresh(this.renderContext.properties);			
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		if(dojo.byId("QuickInfostoreParams")){
			var storeParams = dojo.byId("QuickInfostoreParams").value;
			if(dojo.byId("catEntryParamsForJS")){
				var catEntryParams = dojo.byId("catEntryParamsForJS").value;
			}
			var shoppingListNames = dojo.byId("QuickInfoshoppingListNames").value;
			
			shoppingListJSQuickInfo = new ShoppingListJS(dojo.fromJson(storeParams), dojo.fromJson(catEntryParams), dojo.fromJson(shoppingListNames),"shoppingListJSQuickInfo");
			
			var catEntryId = dojo.fromJson(catEntryParams).id;
			if(null != catEntryId && '' != catEntryId){
				wc.render.updateContext('QuickInfoDiscountDetailsContext', {productId:dojo.fromJson(catEntryParams).id});
			}
		}
		if(dojo.byId("catEntryParamsForJS")){
			QuickInfoJS.catEntryParams = dojo.fromJson(dojo.byId('catEntryParamsForJS').value);
		}
		//the quick info dialog is hidden by default. We have to display it after the area is refreshed.
		var quickInfoPopup = dijit.byId("quickInfoPopup");
		if (quickInfoPopup !=null) {			
			quickInfoPopup.closeButtonNode.style.display='none';//hide the close button inherited from dijit.dialog		
			closeAllDialogs(); //close other dialogs(quickinfo dialog, etc) before opening this.
			// if itemId is present, then quickInfo popup is from change attribute link in shopping cart page, which will explicitly set the quantity
			if(QuickInfoJS.itemId == ''){
				QuickInfoJS.setCatEntryQuantity(1);
				QuickInfoJS.selectDefaultSwatch();
			} else {
				QuickInfoJS.selectCurrentAttributes();
			}
			quickInfoPopup.show();
			// disable dialog re-position for ios and android right after the dialog is opened, this is to avoid virtual keyboard conflict
			if (ios || android) {
				quickInfoPopup._relativePosition = new Object();
			}
			if(typeof TealeafWCJS != "undefined"){
				TealeafWCJS.rebind("quickInfoPopup"); 
			}
		}else {
			console.debug("quickInfoPopup does not exist");
		}
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for fetching discount details. 
 */
wc.render.declareRefreshController({
	id: "DiscountDetailsController",
	renderContext: wc.render.getContextById("DiscountDetailsContext"),
	url: "DiscountDetailsView",
	formId: "",
	
    /** 
     * Refreshs the discount section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		widget.refresh(this.renderContext.properties);			
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for fetching discount details for quick info. 
 */
wc.render.declareRefreshController({
	id: "QuickInfoDiscountDetailsController",
	renderContext: wc.render.getContextById("QuickInfoDiscountDetailsContext"),
	url: "DiscountDetailsView",
	formId: "",
	
    /** 
     * Refreshs the discount section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		widget.refresh(this.renderContext.properties);			
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for double content area espot. 
 */
wc.render.declareRefreshController({
	id: "DoubleContentAreaESpot_Controller",
	renderContext: wc.render.getContextById("DoubleContentAreaESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);	
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for scrollable espot. 
 */
wc.render.declareRefreshController({
	id: "ScrollableESpot_Controller",
	renderContext: wc.render.getContextById("ScrollableESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for top categories espot. 
 */
wc.render.declareRefreshController({
	id: "TopCategoriesESpot_Controller",
	renderContext: wc.render.getContextById("TopCategoriesESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for top categories espot. 
 */
wc.render.declareRefreshController({
	id: "CategoryFeaturedProductsESpot_Controller",
	renderContext: wc.render.getContextById("CategoryFeaturedProductsESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for home hero espot. 
 */
wc.render.declareRefreshController({
	id: "HomeHeroESpot_Controller",
	renderContext: wc.render.getContextById("HomeHeroESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for home left espot. 
 */
wc.render.declareRefreshController({
	id: "HomeLeftESpot_Controller",
	renderContext: wc.render.getContextById("HomeLeftESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for home right top espot. 
 */
wc.render.declareRefreshController({
	id: "HomeRightTopESpot_Controller",
	renderContext: wc.render.getContextById("HomeRightTopESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for home right bottom espot. 
 */
wc.render.declareRefreshController({
	id: "HomeRightBottomESpot_Controller",
	renderContext: wc.render.getContextById("HomeRightBottomESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for tall double espot. 
 */
wc.render.declareRefreshController({
	id: "TallDoubleContentAreaESpot_Controller",
	renderContext: wc.render.getContextById("TallDoubleContentAreaESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for top category hero espot. 
 */
wc.render.declareRefreshController({
	id: "TopCategoryHeroESpot_Controller",
	renderContext: wc.render.getContextById("TopCategoryHeroESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for top category tall double espot. 
 */
wc.render.declareRefreshController({
	id: "TopCategoryTallDoubleESpot_Controller",
	renderContext: wc.render.getContextById("TopCategoryTallDoubleESpot_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["emsName"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		cursor_clear();
	} 
}),

/** 
 * Refresh controller for attachment list in product page. 
 */
wc.render.declareRefreshController({
	id: "AttachmentPagination_Controller",
	renderContext: wc.render.getContextById("AttachmentPagination_Context"),
	url: "",
	formId: "",
	
    /** 
     * Refreshs the section.
	 * 
	 * @param {string} message The model changed event message
	 * @param {object} widget The registered refresh area
	 */
	renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["beginIndex"])){
			widget.refresh(this.renderContext.properties);
		}
	},
	       
	/** 
	 * Hide the progress bar upon a successful refresh.
	 * 
	 * @param {object} widget The registered refresh area
	 */
	postRefreshHandler: function(widget) {
		var pagesList = document.getElementById("pages_list_id");
		if (pagesList != null && !isAndroid() && !isIOS()) {
			dojo.addClass(pagesList, "desktop");
		}
		cursor_clear();
	} 
})
/***************CommonControllersDeclaration.js ends*****************/