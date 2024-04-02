//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2009 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/** 
 * @fileOverview This file provides the controller variables and functions for My Account pages, 
 * and links these controllers to listen to the defined render contexts in CommonContextsDeclarations.js.
 */
dojo.require("wc.service.common");
dojo.require("wc.widget.RefreshArea");
dojo.require("wc.render.RefreshController");
dojo.require("wc.render.Context");
dojo.require("wc.render.common");

/** 
 * @class The MyAccountControllersDeclarationJS class defines the common variables and functions that control 
 * the defined render contexts on the My Account store pages. Controller provides the JavaScript logic 
 * that listens to changes in the render context and the model. A defined render context is a set of 
 * client-side context information which keeps track of information about a page. The context information 
 * helps decide if changes to refresh areas are needed. 
 */
MyAccountControllersDeclarationJS = {
	/**
	 * Sets a URL of the specified controller. This URL is then called by the refresh controller to retrieve the refreshed content 
	 * for the refresh area widget. 
	 * 
	 * @param {string} controllerId The ID of the specified controller.
	 * @param {string} url The URL link for the specified controller.
	 */       
	setControllerURL:function(controllerId,url){
		wc.render.getRefreshControllerById(controllerId).url = url;
	}
}

wc.render.declareContext("SavedPrintersDisplayContext",null,"");
wc.render.declareContext("savedCardsDetailsContext",null,"");
wc.render.declareContext("unSubscribeTabContext", null, "");
wc.render.declareContext("yourOrdersContext", {"pageNumber":"0","pageSize":"0","beginIndex":"0","storeId":"","langId":""}, "");
wc.render.declareContext("flagSwitchContext", null, "");
/** 
 * Declares a new refresh controller for the scheduled orders status display.
 */
wc.render.declareRefreshController({
	id: "ScheduledOrdersStatusDisplayController",
	renderContext: wc.render.getContextById("ScheduledOrdersStatusDisplay_Context"),
	url: "",
	formId: ""
	
	/** 
	 * Refreshes the scheduled orders status display if a scheduled order is canceled.
	 * This function is called when a modelChanged event is detected. 
	 * 
	 * @param {String} message The model changed event message
	 * @param {Object} widget The registered refresh area
	 */
	,modelChangedHandler: function(message, widget) {
		if(message.actionId == 'AjaxScheduledOrderCancel'){
			widget.refresh(this.renderContext.properties);
		}
	}

	/** 
	 * Displays the previous/next page of order items in the order status page.
	 * This function is called when a render context changed event is detected. 
	 * 
	 * @param {string} message The render context changed event message
	 * @param {object} widget The registered refresh area
	 */
	,renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["beginIndex"])){
			widget.refresh(this.renderContext.properties);
		}
	}
	
	/** 
	 * Clears the progress bar
	 * 
	 * @param {object} widget The registered refresh area
	 */
	,postRefreshHandler: function(widget) {
		 cursor_clear();
	}
}),


/** 
 * Declares a new refresh controller for the processed orders status display.
 */
wc.render.declareRefreshController({
	id: "ProcessedOrdersStatusDisplayController",
	renderContext: wc.render.getContextById("ProcessedOrdersStatusDisplay_Context"),
	url: "",
	formId: ""

	/** 
	 * Displays the previous/next page of order items on the processed order status page.
	 * This function is called when a render context changed event is detected. 
	 * 
	 * @param {string} message The render context changed event message
	 * @param {object} widget The registered refresh area
	 */
	,renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["beginIndex"])){
			widget.refresh(this.renderContext.properties);
		}
	}
	
	/** 
	 * Clears the progress bar
	 * 
	 * @param {object} widget The registered refresh area
	 */
	,postRefreshHandler: function(widget) {
		 cursor_clear();
	}
}),



/** 
 * Declares a new refresh controller for the waiting-for-approval orders status display.
 */
wc.render.declareRefreshController({
	id: "WaitingForApprovalOrdersStatusDisplayController",
	renderContext: wc.render.getContextById("WaitingForApprovalOrdersStatusDisplay_Context"),
	url: "",
	formId: ""
	
	/** 
	 * Displays the previous/next page of order items in the order status page.
	 * This function is called when a render context changed event is detected. 
	 * 
	 * @param {string} message The render context changed event message
	 * @param {object} widget The registered refresh area
	 */
	,renderContextChangedHandler: function(message, widget) {
		if(this.testForChangedRC(["beginIndex"])){
			widget.refresh(this.renderContext.properties);
		}
	}
	
	/** 
	 * Clears the progress bar
	 * 
	 * @param {object} widget The registered refresh area
	 */
	,postRefreshHandler: function(widget) {
		 cursor_clear();
	}
}),

/** 
 * Refresh controller& context for displaying saved printer of MPR user .
 */

wc.render.declareRefreshController({
    id: "SavedPrintersDisplayController",
    renderContext: wc.render.getContextById("SavedPrintersDisplayContext"),
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
	    cursor_clear();	   
   }
}),

/** 
 * Refresh controller & context for displaying saved cards
 */

wc.render.declareRefreshController({
    id: "savedCardsDetailsController",
    renderContext: wc.render.getContextById("savedCardsDetailsContext"),
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
	    cursor_clear();	   
   }
}),

wc.render.declareRefreshController( {
	id : "unSubscribeTabController",
	renderContext : wc.render.getContextById("unSubscribeTabContext"),
	url : "RefreshManageSubscriptionView",
	formId : ""

	,
	modelChangedHandler : function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		widget.refresh(renderContext.properties);
	},
	renderContextChangedHandler : function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		widget.refresh(renderContext.properties);
	},
	postRefreshHandler : function(widget) {
		var controller = this;
		var renderContext = this.renderContext;
	   
		cursor_clear();
	}
}),

wc.render.declareRefreshController( {
	id : "yourOrdersController",
	renderContext : wc.render.getContextById("yourOrdersContext"),
	url : "MyOrderDetailsView",
	formId : ""

	,
	modelChangedHandler : function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		widget.refresh(renderContext.properties);

	},
	renderContextChangedHandler : function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		widget.refresh(renderContext.properties);

	},
	postRefreshHandler : function(widget) {
		var controller = this;
		var renderContext = this.renderContext;
		
	   if(document.getElementById('commonLoadingOverlay') != null){
						 var	$html = $(document.documentElement);
						 $html.css('overflow', '');
		            	 document.getElementById('commonLoadingOverlay').style.display = "none";
		              }
	  
	  
	   updatedResults();
		$("#searchMyOrdersInp").keyup(function() {
			$('#searchkey').val('');
		
			$('#beginIndex').val("1");
			$('#pageSize').val("5");
			$('#pageNumber').val("1");
			fnClearSearch($(this).val());
		
     	});
     
     	$("#searchMyOrdersInp").focus(function() {
     		$('#searchkey').val('');
     		
     		$('#beginIndex').val("1");
			$('#pageSize').val("5");
			$('#pageNumber').val("1");
     		fnClearSearch($(this).val());
     		
     	});
     
     	$("#searchMyOrdersInp").blur(function() {
     		$('#searchkey').val('');
     		
     		$('#beginIndex').val("1");
			$('#pageSize').val("5");
			$('#pageNumber').val("1");
     		fnClearSearch($(this).val());
     		
     	});
     	$('#clearSearch').click(function(){
     		$('#searchkey').val('');
     		$('#beginIndex').val("1");
			$('#pageSize').val("5");
			$('#pageNumber').val("1");
				fnClearSearch('');
	}); 

		cursor_clear();
	}

}),

wc.render.declareRefreshController( {
	id : "flagSwitchController",
	renderContext : wc.render.getContextById("flagSwitchContext"),
	url : "MyAccountFlagView",
	formId : ""

	,
	modelChangedHandler : function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		widget.refresh(renderContext.properties);
	},
	renderContextChangedHandler : function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		widget.refresh(renderContext.properties);
	},
	postRefreshHandler : function(widget) {
		var controller = this;
		var renderContext = this.renderContext;
	   
		cursor_clear();
	}
})
