	
	var userType = "${userType}";
	var pagelevel="Home Page";
	var HeirarchyList=new Array();
	var Heirarchy_Len;
	var skulist=new Array();
	var Pricelist=new Array();
	var XsellList=new Array();
	var quantitylist=new Array();
	var proInstant=new Array();
	var uservalue=get_visitorid();
	var orderId=getOrderId();
	var aoid=get_aoid();
	var static_jumpid=get_jumpId();
	var facetSelections = [];

	function get_visitorid()
	{
	    var cookies = get_cookies_array();
	    var user_cookie=set_visitorid(cookies);
	    var start=user_cookie.indexOf("|")+1; 
		var end=user_cookie.lastIndexOf("["); 
		user_cookie=user_cookie.substring(start,end);
		return user_cookie;
	}
	
	function get_jumpId()
	{
	    var cookies = get_cookies_array();
	    var user_cookie=set_jumpId(cookies);   
		return user_cookie;
	}
	
	function get_aoid()
	{
       var cookies = get_cookies_array();
       var user_cookie=set_aoid(cookies);
       var start=user_cookie.indexOf("!")+2; 
       user_cookie=user_cookie.substring(start);
	   return user_cookie;
	}
	
	function set_visitorid(cookies)
	{
		var user_cookie="";
		for(var cookieName in cookies){
			if (cookieName == "s_vi")
			{
				user_cookie=cookies[cookieName];
			}
		}
		return user_cookie;
	}
	
	function set_jumpId(cookies)
	{
		var user_cookie="";
		for(var cookieName in cookies){
			if (cookieName == "Static_jumpid")
			{
				user_cookie=cookies[cookieName];
			}
		}
		console.log('user_cookie'+user_cookie);
		return user_cookie;
	}
	
	function set_aoid(cookies)
	{
		var user_cookie="";
		for(var cookieName in cookies){
			if (cookieName == "hpshopping2")
			{
			 	user_cookie=cookies[cookieName];
			}
		}
		return user_cookie;
	}
	
	function configureTag(usertype,productName,section,subsection,userId,hp_profileId)
	{	
		pagelevel="Configure Page";
		hpmmd.page.page_function="cto";	
		hpmmd.page.events=['config.start'];
		hpmmd.page.name = productName ;
		hpmmd.page.subsection = subsection;
		hpmmd.page.section = section;
		hpmmd.product.hierarchy = ["",hpmmd.page.section,hpmmd.page.name];
		hpmmd.product.finding_method="browse:cto page";
		setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function MDPstdTag(productName,userId,sectionValue,usertype,pagefunction,hp_profileId)
	{
		hpmmd.page.name=productName;
		hpmmd.page.section=sectionValue;
		hpmmd.page.page_function=pagefunction;
		hpmmd.page.events=["pdp.view"];
		hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.name];
	    hpmmd.product.finding_method="browse:mdp page";
	    setCommonUserParams(userId, usertype, hp_profileId);		
	}
	
	function ErrorTag(countryname,websectionId)
	{
		 hpmmd.page.error404="true";
		 hpmmd.page.section="error";
		 hpmmd.page.page_function="error";
	}

	function EmailReturnTag(userId,usertype,countryname,websectionId,hp_profileId,CID)
	{
		 pagelevel="Email Return Page";
		 hpmmd.page.name="Email Return Page";
		 hpmmd.page.section="Customer";
		 setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function blankTemplateTag(userId,usertype,hp_profileId,countryname,websectionId)
	{	 
		 hpmmd.page.name="faq";
		 hpmmd.page.section="faq";
		 hpmmd.page.page_function="landing";
		 setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function plaintextTag(userId,usertype,hp_profileId,countryname,websectionId)
	{
	     pagelevel="Return And Exchange Page";
		 hpmmd.page.name="Return And Exchange Policy";
		 hpmmd.page.section="Return And Exchange Policy";
		 hpmmd.page.page_function="landing";
		 setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function contentTag(userId,usertype,hp_profileId,countryname,websectionId,pagename)
	{	 
		 hpmmd.page.name=pagename;
		 hpmmd.page.section="static";
		 hpmmd.page.page_function="landing";		 
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function homepageTag(userId,usertype, hp_profileId,aoid)
	{
		 pagelevel="Home Page";
		 hpmmd.page.name="home";
		 hpmmd.page.section="home";
		 hpmmd.page.page_function="landing";
		 hpmmd.browser.static_jumpid = static_jumpid;
		 hpmmd.browser.hpshopping2 = aoid;	
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function categoryTag(sectionname,userId,businessUnit,usertype,pageNamesection,countryname,websectionId,hp_profileId,hp_hashedEmailId,subsection,pagelevelvalue,CID,aoid)
	{
	    pagelevel="Category Page";
		hpmmd.page.page_function="category";
		hpmmd.page.name=pageNamesection;
		hpmmd.page.section=sectionname;
	    hpmmd.page.subsection=subsection;
	    
		if(hpmmd.page.section==null || hpmmd.page.section=='')
		{
			hpmmd.page.section='Laptops';
			hpmmd.page.name='Laptops';
		}
		if(hpmmd.page.section.indexOf('ink')!=-1)
		{
			hpmmd.page.section='ink,toner&paper';
		}
		if(hpmmd.page.name==null || hpmmd.page.name=='')
		{
			hpmmd.page.name="home";
			hpmmd.page.section="home";
			hpmmd.page.page_function="landing";
		}
	    if(pagelevelvalue=="clp")
	    {
	    	hpmmd.product.hierarchy=["",hpmmd.page.section];
	    }
	    else if(pagelevelvalue=="mlp")
	    {
			if(hpmmd.page.section==null || hpmmd.page.section=='' || hpmmd.page.section.toLowerCase()=='business')
			{
				hpmmd.page.section=hpmmd.page.subsection;
			}
	        hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection];
	    }
	    else
	    {
			if(hpmmd.page.section==null || hpmmd.page.section=='' || hpmmd.page.section.toLowerCase()=='business')
			{
				hpmmd.page.section=hpmmd.page.subsection;
			}
			hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection,hpmmd.page.name];
	     }
	       
		 hpmmd.browser.static_jumpid = static_jumpid;
		 hpmmd.browser.hpshopping2 = aoid;	
		 setCommonUserParams(userId, usertype,hp_profileId,hp_hashedEmailId);
	}
	
	function loginTag(userId,usertype,countryname,websectionId,prevurl,hp_profileId,aoid)
	{
		 hpmmd.page.name="sign in";
		 hpmmd.page.section="customer";
		 hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";
	     hpmmd.page.platform="wcs web";
		 hpmmd.page.discount_tier="gen";
		 hpmmd.page.store_type="hhos";

		if(prevurl.indexOf('GuestCheckoutView')!=-1)
		{
			hpmmd.page.events=['cart.signin'];
		}
		
		hpmmd.browser.static_jumpid = static_jumpid;
		hpmmd.browser.hpshopping2 = aoid;	
		setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function genericErrorTag(pageName,countryname,websectionId)
	{
		hpmmd.page.section="error";
		hpmmd.page.subsection ="error";
		hpmmd.page.page_function="error";	
		hpmmd.page.name='general error:'+pageName;	
	}
	
	function orderConfirmationTag(orderid,userId,paymenttype,usertype,countryname,websectionId,hp_profileId,CID,aoid)
	{
		hpmmd.page.name="confirmation";
		hpmmd.page.section="Checkout";
		hpmmd.page.subsection ="checkout";
		hpmmd.page.page_function="checkout";
		hpmmd.product.purchase_id=orderid;
		
		if(paymenttype == 'VISA' || paymenttype == 'MasterCard' || paymenttype =='AMEX' || paymenttype =='Discover')
		{
			hpmmd.product.payment_type="credit card" + ":" + paymenttype;
		}
		else
		{
			hpmmd.product.payment_type=paymenttype;
		}
		
		hpmmd.browser.static_jumpid = static_jumpid;
		hpmmd.browser.hpshopping2 = aoid;		
		setCommonUserParams(userId, usertype, hp_profileId);		
	}
	
	function accessoriesDisplayTag(partnumber,productName,pdpprice,userId,usertype,hp_profileId)
	{
		hpmmd.page.name="Accessories";
		hpmmd.page.section="Accessories";
		hpmmd.page.page_function="Xsell";
	    hpmmd.product.name= productName;	
		hpmmd.product.list.push({ 
			"sku" : partnumber,
			"units": 1,
			"price": pdpprice
		});
			
		hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.name,hpmmd.product.list[0].sku];
        hpmmd.product.finding_method="browse:accessories page";	
        hpmmd.browser.static_jumpid = static_jumpid;
	   	hpmmd.browser.hpshopping2 = aoid;	
		setCommonUserParams(userId, usertype, hp_profileId);	
	
	}
	
	function productListingTag(subsection,section,userId,usertype,hp_profileId,CID,aoid)
	{
	    pagelevel="PLP Page";
		hpmmd.page.page_function="plp";
		hpmmd.page.events=["series.view"];
		hpmmd.page.name="filter results";
		hpmmd.page.section=section;
		hpmmd.page.subsection=subsection;	                        
		hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection];
	    hpmmd.product.finding_method="browse:plp page";							        
		hpmmd.browser.static_jumpid = static_jumpid;
		hpmmd.browser.hpshopping2 = aoid;
		setCommonUserParams(userId, usertype,hp_profileId);	
	}
	
	function productDisplayTag(sectionname,pagefunction,partNumber,itemprice,pdpprice,pagename,subsection,businessUnit,userId,usertype,seriesPartNum,countryname,websectionId, hp_profileId)
	{
		hpmmd.page.name=pagename;
		hpmmd.page.section 	=sectionname ;	
		hpmmd.page.subsection = subsection;
		hpmmd.page.page_function=pagefunction;
	    hpmmd.product.name=pagename;	    
		hpmmd.product.list.push({ 
			"sku" : partNumber,
			"units": 1,
			"price": pdpprice
		});
					
       if(hpmmd.page.page_function == 'cto')
       {
          hpmmd.page.page_function = "cto";
       }
	 
		hpmmd.page.page_function = "pdp";
		hpmmd.page.events=["pdp.view"];
		hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection,hpmmd.page.name,hpmmd.product.list[0].sku];
	    hpmmd.product.finding_method="browse:pdp page";		        
	    setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function PDPstdTag(productName,userId,sku,pdpPrice,HeirarchyList,sectionValue,Analytic_usertype,pagefunction,countryname,hp_profileId,hp_hashedEmailId,aoid,EOLProducts,isSMB) 
	{
	    pagelevel="PDP Page";	    
		Heirarchy_Len=HeirarchyList.length;
		hpmmd.page.name=productName;
		hpmmd.page.section=HeirarchyList[Heirarchy_Len-1];
		hpmmd.page.isSMB ="";
		hpmmd.page.subsection = "";
		if($.hpsfData.getProfile().isccf){
			hpmmd.page.platform = "wcs call center";
		}else{
			hpmmd.page.platform = "wcs web";
		}
	    if(Heirarchy_Len > 4)
		{
	    	hpmmd.page.subsection = HeirarchyList[2];
		}
		else if(Heirarchy_Len > 1)
		{
			hpmmd.page.subsection = HeirarchyList[1];
		}
	  
		if(hpmmd.page.section==null || hpmmd.page.section=='')
		{
			hpmmd.page.section=sectionValue;
		}
		
		hpmmd.page.page_function=pagefunction;
		hpmmd.product.name=productName;		
		if(productLine != null){
			hpmmd.product.list.push({ 
				"sku" : sku,
				"units": 1,
				"price": pdpPrice,
				"productLine":productLine
			});
		} else {	
			hpmmd.product.list.push({ 
				"sku" : sku,
				"units": 1,
				"price": pdpPrice
			});
		}
	     
		//hpmmd.page.page_function = "pdp";	        
		hpmmd.page.events=["pdp.view"];
		hpmmd.product.name=HeirarchyList[0];
		
	    if(hpmmd.page.section==null || hpmmd.page.section=='' || hpmmd.page.section.toLowerCase()=='business')
		{
	    	hpmmd.page.section=hpmmd.page.subsection;
		}
	    if(hpmmd.page.section==null || hpmmd.page.section=='')
		{
	    	hpmmd.page.section=EOLProducts||'Missing page.section';
		}
			 
		if(hpmmd.page.section.indexOf('ink')!=-1)
		{
			hpmmd.page.section='ink,toner&paper';
		}
		
		if(hpmmd.page.name==null || hpmmd.page.name=='')
		{
			hpmmd.page.name="home";
			hpmmd.page.section="home";
			hpmmd.page.page_function="landing";
		}
		if(isSMB.toLowerCase()=='yes')
		{
			hpmmd.page.isSMB="true"; 
		}

		if(hpmmd.page.name.toLowerCase().indexOf('year')!=-1 || hpmmd.page.name.toLowerCase().indexOf('yr')!=-1)
		{
			hpmmd.page.section="care packs";
			hpmmd.page.subsection="laptop care packs";
		}
		
		hpmmd.product.hierarchy=["",hpmmd.page.section,hpmmd.page.subsection,hpmmd.product.name,hpmmd.page.name,hpmmd.product.list[0].sku];
	    hpmmd.product.finding_method="browse:pdp page";			 
	    hpmmd.browser.static_jumpid = static_jumpid;
	  	hpmmd.browser.hpshopping2 = aoid;	
	 	setCommonUserParams(userId, Analytic_usertype,hp_profileId,hp_hashedEmailId);	

	}
	
	function AttachPageTag(skulist,skulength,Pricelist,pageName,section,userId,usertype,countryname,websectionId,hp_profileId)
	{		
		hpmmd.page.name = pageName+":upsell";
		hpmmd.page.page_function="upsell";
 
	   	 for(var ctr=0;ctr<skulength;ctr++)
		 {
			hpmmd.product.list.push({ 
					"sku" : skulist[ctr],
					"units": 1,
					"price": Pricelist[ctr]
			});
		 }
	  	
	  	hpmmd.page.section=section;
	  	hpmmd.page.subsection=pageName;
	  	hpmmd.product.hierarchy=["PPS",hpmmd.page.section,hpmmd.page.subsection,pageName];
	    hpmmd.product.finding_method="upsell :upsell page";	
	    setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function cartDisplayTag(skulist,pricelist,quantitylist,userId,usertype,hp_profileId,aoid,prodLineList,cartId,userLogin, custSeg, currency, isccf, skuNameList, productBrand, productVariant, productCategory, customerSegment)	
	{ 
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
		var productArray = new Array();
		for(var ctr=0;ctr<skulist.length;ctr++)
		{
			productArray.push({
				"name": skuNameList[ctr],
				"id": skulist[ctr]+"",
				"price": pricelist[ctr]+"",
				"quantity": quantitylist[ctr]+"",
				"brand": productBrand[ctr],
				"category": productCategory[ctr],
				"variant": productVariant[ctr]
			});
		}
		dataLayer.push({
			event: 'e_pageView',
			pageNameL5: 'cart',
			pageNameL6: '',
			pageNameL7: '',
			pageNameL8: 'cart',
			loginStatus: login_state, // true or false
			userTypeSession: userType,
			customerSegment: customerSegment,
			callCenter: isccf, // true or false
			ecommerce: {
				currencyCode: currency,
				detail: {
					actionField: {list: 'view cart'},
					products: productArray					
				}
			}
		});
		//Adding hpmmd objects based on the defect raised by QA HPEDT-17576 . Not sure if these are relevant anymore with UDL changes. 
		hpmmd.product.cartID=cartId;
	    hpmmd.browser.static_jumpid = static_jumpid;
	    hpmmd.browser.hpshopping2 = aoid;
	    for(var cntr=0;cntr<skulist.length;cntr++)
		{
			if((prodLineList !=null || prodLineList !=undefined )&& prodLineList[cntr] != null) 
				{
					hpmmd.product.list.push({ 
							"sku" : skulist[cntr],
							"units":quantitylist[cntr]+"",
							"price": pricelist[cntr]+"",
							"productLine":prodLineList[cntr]+"",
							"xsell":false
							
					});
				}
			else
				{
					hpmmd.product.list.push({ 
						"sku" : skulist[cntr],
						"units":quantitylist[cntr]+"",
						"price": pricelist[cntr]+"",
						"xsell":false
					});
				}
		}
	    setCommonUserParams(userId, usertype,hp_profileId);
	}
	/*function cartDisplayTag(skulist,pricelist,quantitylist,userId,usertype,hp_profileId,aoid,prodLineList,cartId)
	{
	     pagelevel="Cart Page";
	     hpmmd.page.name="cart results";
		 hpmmd.page.section="cart";
		 hpmmd.page.subsection="cart";
		 hpmmd.page.page_function="cart";

		 for(var ctr=0;ctr<skulist.length;ctr++)
		{
			if((prodLineList !=null || prodLineList !=undefined )&& prodLineList[ctr] != null) 
				{
					hpmmd.product.list.push({ 
							"sku" : skulist[ctr],
							"units":quantitylist[ctr]+"",
							"price": pricelist[ctr]+"",
							"productLine":prodLineList[ctr]+"",
							"xsell":false
							
					});
				}
			else
				{
				hpmmd.product.list.push({ 
					"sku" : skulist[ctr],
					"units":quantitylist[ctr]+"",
					"price": pricelist[ctr]+"",
					"xsell":false
					
				});
				}
				
		}
		 
		hpmmd.page.events=["cart.view"];
	    hpmmd.product.finding_method="cart:cart page";
	    hpmmd.product.cartID=cartId;
	    hpmmd.browser.static_jumpid = static_jumpid;
	    hpmmd.browser.hpshopping2 = aoid;	
	    setCommonUserParams(userId, usertype,hp_profileId);
	}*/
	
	function checkoutTag(skuList,Quantityvalue,PriceList,userId,usertype,orderid,countryname,websectionId,hp_profileId,CID,payvalue,bmlvalue,hppvalue,ccvalue,aoid, loadReviewFlag)
	{
	    pagelevel="Checkout Page";
	    var eventsVar = [];
		if( bmlvalue == "true"|| hppvalue == "true" || loadReviewFlag  == "true")
		{
			hpmmd.page.name="review";
			eventsVar.push("checkout.review");
		}
		else
		{
			hpmmd.page.name="shipping";
			eventsVar.push("checkout.start"+":"+orderid);		
		}
	
		//	eventsVar.push("event82");
			
	
		hpmmd.page.events=eventsVar;
		hpmmd.page.section="checkout";
		hpmmd.page.subsection ="checkout";
		hpmmd.page.page_function="checkout";
		hpmmd.browser.static_jumpid = static_jumpid;
		hpmmd.browser.hpshopping2 = aoid;	 
		 
		for(var ctr=0;ctr<skuList.length;ctr++)
		{		 
			hpmmd.product.list.push({ 
					"sku" : skuList[ctr],
					"units": Quantityvalue[ctr],
					"price": PriceList[ctr]				
				});
		}
	
	 	setCommonUserParams(userId, usertype,hp_profileId);	 
	}
	
	function searchTag(userId,searchKeyword,noofResults,metaauto,usertype,hp_profileId,aoid)
	{
		pagelevel="SearchResults Page";
		hpmmd.page.name="product search";
	    hpmmd.page.section="search";
		hpmmd.page.page_function="search";		
	 	hpmmd.page.events=['search'];
		hpmmd.search.keywords=searchKeyword;	
		hpmmd.search.number_of_results=noofResults;
		
        if(metaauto == 'valid')
	    {
        	hpmmd.search.meta="auto";
	    }
	    else
	    {
	        hpmmd.search.meta="null";
	    }
        
        hpmmd.product.finding_method="search:search results page";
		hpmmd.browser.static_jumpid = static_jumpid;
		hpmmd.browser.hpshopping2 = aoid;
		setCommonUserParams(userId, usertype,hp_profileId);
	}
	
	function getposition(catEntryId)
	{
		var s= catEntryId;
		var skuPosition;
		
		if(hpmmd.product.list!= null)
		{
			for(var ctr=0;ctr<hpmmd.product.list.length;ctr++)
			{				
				if ( s == hpmmd.product.list[ctr].catEntry)
				{
					skuPosition = hpmmd.product.list[ctr].position;
					break;	
				}			
			}
		}
		
		return skuPosition;
	}
	
	function CartQuantityChange(skulist,Pricelist,quantitylist)
	{
	    /*hpmmd.product.list.length=0;
	    
	    for(var ctr=0;ctr<skulist.length;ctr++)
		{
			hpmmd.product.list.push({ 
				"sku" : skulist[ctr],
				"units":quantitylist[ctr]+"",
				"price": Pricelist[ctr]+"",
				"xsell":false
			});						
		}
	    
       if(!(typeof trackMetrics=='undefined'))
		{
		    trackMetrics( 'new.page', { page: {site:'hhos',name: 'cart', section:'cart',subsection:'cart',page_function:'cart',events: ['cart.view']},product: {list: hpmmd.product.list}});
		}*/
	}
	
	function UserRegister(userId,usertype,hp_profileId)
	{		 
		 hpmmd.page.name="Browse Sign In";
		 hpmmd.page.section="customer";
	     hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";
		 setCommonUserParams(userId, usertype,hp_profileId);
	}
		
	function orderStatusTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
		 hpmmd.page.name="My order status";
		 hpmmd.page.section="customer";
		 hpmmd.page.page_function="gateway";
	
	     for(var ctr=0;ctr<5;ctr++)
		 {
			hpmmd.product.list.push({ 
				"sku" : "aaa",
				"units":1,
				"price":"50"
				
			});						
		 }
	     
	     setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function UserRegisterUpdate(userId,usertype,countryname,websectionId,hp_profileId)	
	{		 
		 hpmmd.page.name="my account change personal info";
		 hpmmd.page.section="customer";
	     hpmmd.page.section="customer";
		 hpmmd.page.page_function="customer";
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function addressBookTag(userId,usertype,countryname,websectionId,hp_profileId)
	{		 
		 hpmmd.page.name="Address Book";
		 hpmmd.page.section="customer";
		 hpmmd.page.page_function="gateway";	
		 setCommonUserParams(userId, usertype,hp_profileId);		
	}
	
	function addAddressTag(userId,usertype,countryname,websectionId,hp_profileId)	
	{	 
		 hpmmd.page.name="my account add address";
		 hpmmd.page.section="customer";
	     hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";
		 setCommonUserParams(userId, usertype, hp_profileId);		
	}
	
	function editAddressTag(userId,usertype,countryname,websectionId,hp_profileId)	
	{	 
		 hpmmd.page.name="my account edit address";
		 hpmmd.page.section="customer";
	     hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";	
		 setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function myOrderTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
		 hpmmd.page.name="order status";
		 hpmmd.page.section="customer";
		 hpmmd.page.page_function="service";		
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function myOrderStatusTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
		 pagelevel="OrderStatus Page";
		 hpmmd.page.name="order status";
		 hpmmd.page.section="customer";
		 hpmmd.page.page_function="customer";
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function viewOrderTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
		 pagelevel="ViewOrders Page";
 		 hpmmd.page.name="view order details";
		 hpmmd.page.section="customer";
		 hpmmd.page.page_function="customer";		 
		 hpmmd.browser.static_jumpid = static_jumpid;
		 hpmmd.browser.hpshopping2 = aoid;	
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function forgotPasswordTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
		 pagelevel="Forgot Password Page";
	 	 hpmmd.page.name="password recovery";
		 hpmmd.page.section="customer";
	     hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="Info";		
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function CategoryAccessTag(userId,section,usertype,countryname,websectionId,hp_profileId)
	{
	     hpmmd.page.name=section;
		 hpmmd.page.section=section;
		 hpmmd.page.page_function="category";		
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function CategoryInkTag(userId,section,usertype,countryname,websectionId,hp_profileId)
	{
	     hpmmd.page.name=section;
		 hpmmd.page.section=section;
		 hpmmd.page.page_function="category";
		 setCommonUserParams(userId, usertype, hp_profileId);		
	}
	
	function CarePackTag(userId,section,usertype,countryname,websectionId,hp_profileId)
	{
	     hpmmd.page.name=section;
		 hpmmd.page.section=section;
		 hpmmd.page.page_function="category";	
		 setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function HPEPPRegisterTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
	     hpmmd.page.name="HP EPP registration";
		 hpmmd.page.section="customer";
	     hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";	
		 setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function orderHistoryTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
	     pagelevel="OrderHistory Page";
	     hpmmd.page.name="Order History";
		 hpmmd.page.section="customer";
	     hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";
		 hpmmd.page.events="order.status";
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function guestCheckoutTag(userId,usertype,skulist,Pricelist,quantitylist,hp_profileId,aoid)
	{
		 pagelevel="GuestCheckout Page";
		 
		 hpmmd.browser.static_jumpid = static_jumpid;
		 hpmmd.browser.hpshopping2 = aoid;
	      
		 for(var ctr=0;ctr<skulist.length;ctr++)
		 {
			 hpmmd.product.list.push({ 
					"sku" : skulist[ctr],
					"units":quantitylist[ctr],
					"total_price":Pricelist[ctr]					
			 });
		 }
	
		 setCommonUserParams(userId, usertype,hp_profileId);	
	}
	
	function SessionTimedOutTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
		 hpmmd.page.name="session timed out page"; 
		 hpmmd.page.section="customer";
		 hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";
	     hpmmd.page.platform="wcs web";
		 hpmmd.page.discount_tier="gen";
		 hpmmd.page.store_type="hhos";	
		 setCommonUserParams(userId, usertype, hp_profileId);
	}	 
	
	function manageSubscriptionTag(userId,usertype,hp_profileId)
	{
		 hpmmd.page.name="my account manage subscriptions";	 
		 hpmmd.page.section="customer";
		 hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";
	     hpmmd.page.platform="wcs web";
		 hpmmd.page.discount_tier="gen";
		 hpmmd.page.store_type="hhos";		
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function OrderDeclineTag(userId,usertype,countryname,websectionId,hp_profileId,CID)
	{
		 hpmmd.page.name="order decline page";		 
		 hpmmd.page.section="customer";
		 hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";
	     hpmmd.page.platform="wcs web";
		 hpmmd.page.discount_tier="gen";
		 hpmmd.page.store_type="hhos";	
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function orderDetailsTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
		 hpmmd.page.name="order details";		 
		 hpmmd.page.section="customer";
		 hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";
	     hpmmd.page.platform="wcs web";
		 hpmmd.page.discount_tier="gen";
		 hpmmd.page.store_type="hhos";	
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function resetPwdTag(userId,usertype,hp_profileId,countryname,websectionId)
	{	 
		 hpmmd.page.name="change password";
		 hpmmd.page.section="customer";
		 hpmmd.page.page_function="info";	 
		 setCommonUserParams(userId, usertype, resetPwdTag);	
	}
	
	function myAccountInfoTag(userId,usertype,countryname,websectionId,hp_profileId)	
	{	 
		 hpmmd.page.name="my account your info";
		 hpmmd.page.section="customer";
	     hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer"; 
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function SendUsEmail(userId,usertype,countryname,websectionId,hp_profileId)	
	{
		 pagelevel="Send Email Page";
		 hpmmd.page.name="Send Email Page";
		 hpmmd.page.section="customer";
	     hpmmd.page.subsection="customer";
		 hpmmd.page.page_function="customer";	 		 
		 setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function managePrintersTag(userId,usertype,countryname,websectionId,hp_profileId)
	{
		hpmmd.page.name="my account manage printers";
		hpmmd.page.section="customer";
		hpmmd.page.subsection="customer";
		hpmmd.page.page_function="customer";
	    hpmmd.page.platform="wcs web";	 
	    setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function searchFinderTag(userId,usertype,hp_profileId,countryname,websectionId,searchKeyword,resultcount,metaAutovalue)
	{
		hpmmd.page.name="ink,toner&paper";
	  	hpmmd.page.section="ink,toner&paper";
		hpmmd.page.page_function="supplies finder";
	 	hpmmd.page.events=['search'];
		hpmmd.search.keywords=searchKeyword;
		hpmmd.search.number_of_results=resultcount;
		hpmmd.search.keywords=searchKeyword;
		hpmmd.search.number_of_results=resultcount;
		
		if(metaAutovalue == 'valid')
	    {
	       hpmmd.search.meta="auto";
	    }
	    else
	    {
	       hpmmd.search.meta="null";
	    }
		
		setCommonUserParams(userId, usertype, hp_profileId);
	}
	
	function productFinderTag(userId,usertype,hp_profileId,countryname,websectionId,pagename)
	{
		hpmmd.page.name=pagename;
		hpmmd.page.section="Accessories";
		hpmmd.page.page_function="Category";			 	
		setCommonUserParams(userId, usertype, hp_profileId);	
	}
	
	function sitemapTag(userId,usertype,hp_profileId,countryname,websectionId)
	{
		hpmmd.page.name="sitemap";
		hpmmd.page.section="customer";
		hpmmd.page.page_function="Landing";		
		setCommonUserParams(userId, usertype, hp_profileId);	
	}

	
	function appendDate()
	{
		var appendDate=new Date();
		var serialNum = (appendDate.getUTCDate()+''+(appendDate.getMonth()+1)+''+appendDate.getFullYear());
		return serialNum;
	}

	function get_cookies_array() {		 
	    var cookies = { };
		 
	    if (document.cookie && document.cookie != '') {
	        var split = document.cookie.split(';');
	        for (var i = 0; i < split.length; i++) {	            
	        	var name_value = split[i].split("=");
	            name_value[0] = name_value[0].replace(/^ /, '');
	            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
	        }
	    }
		return cookies;
	}
	
	function setorderId(cookies)
	{
		var orderId;
		for(var cookieName in cookies) {
			 if (cookieName.substring(0,14) == 'WC_CartOrderId')
			  {
		 		orderId=cookies[cookieName];
			  }
		}
		return orderId;
	}
	
	function setCTOorderId(cookies)
	{
		var CTOorderId;
		for(var cookieName in cookies) {
			 if (cookieName == 'Temp')
			  {
				 CTOorderId=cookies[cookieName];
	 		  }
		}
		return CTOorderId;
	}
	
	function getCTOOrderId()
	{
		var cookies = get_cookies_array();
		var CTOorderNumber = setCTOorderId(cookies);
		return CTOorderNumber;
	}
	
	function getOrderId()
	{
		var cookies = get_cookies_array();
		var orderNumber = setorderId(cookies);
		return orderNumber;
	}

	function getEvents()
	{
		var itemcount; 
		var CTOorderId=getCTOOrderId();
	    console.log(CTOorderId);
	    var orderId=getOrderId();
	    if(orderId==''||orderId==null||orderId==undefined||orderId=="undefined")
	    {
	    	if(CTOorderId==''||CTOorderId==null||CTOorderId==undefined||orderId=="undefined")
	    	{
	    	  itemcount ='';
	          var Temporder=Math.floor(Math.random() * 900000) + 10000;
	          document.cookie="Temp="+Temporder+"; path=/;domain=.hp.com";
	          console.log(Temporder);
	        }
		}
		else
		{
	          itemcount =1; 
	    }
	   return itemcount;
	}
	
	function getcountry(language)
	{
		var target_country=document.querySelector("meta[name=target_country]");
		
		if(language=='en_US')
		{
			target_country.setAttribute('content', 'US'); 
		}
		else if(language=='en_AU')
		{
			target_country.setAttribute('content', 'AU'); 
		}
		else if(language=='en_MY')
		{
			target_country.setAttribute('content', 'MY');
		}
		else if	(language=='en_SG')
		{
			target_country.setAttribute('content', 'SG');
		}
		else 
		{
			target_country.setAttribute('content', 'KR');
		}
		return target_country;
	}	

	function getwebsectionId(language)
	{
		var web_section_id=document.querySelector("meta[name=web_section_id]");
		
		if(language=='en_US')
		{
			web_section_id.setAttribute('content', 'cs:r329'); 
		}
		else if(language=='en_AU' ||language=='en_MY'||language=='en_SG'||language=='ko_KR')
		{
			web_section_id.setAttribute('content', 'r10066'); 
		}
		else
		{
			web_section_id.setAttribute('content', 'r10066');
		}
		return web_section_id;
	}	

	function getAddEvent(productId, qty, orderId,free)
	{	
        var itemvalue=qty;
		console.log("qty1"+qty);
		 console.log("free"+free);
        //var CTOorderId=getCTOOrderId();
        if(itemvalue== undefined)
		{
			eventsList=['cart.new','cart.add'+':'+productId];
		}             
		else if(itemvalue== 1|| (itemvalue==2 && free==1))
		{
			eventsList=['cart.new','cart.add'+':'+productId];
		}
		else
		{
        	   eventsList=['cart.add'+':'+productId+orderId];
          
		}
			
		return eventsList;
					
	}
	
	function add2cartMethod(addToCartAttr)
    {
		 var addtocartmethod; 
		 
		 if(addToCartAttr)
	     {
	    	 addtocartmethod=addToCartAttr;	 
	     }
		 else if(hpmmd.page.page_function=='plp')
	     {
	    	 addtocartmethod='listing:'+hpmmd.page.name;
	     }else
	     {
	    	 addtocartmethod='listing:search results';
	     }
	    
	     
      return addtocartmethod;
      
    }
	/*function sendRemoveEventToOmniture(actionFrom, partNumber, totalPrice, qty){
		
		eventsList = ['cart.remove'];
		if(actionFrom == 'new.page'){
			eventsList = ['cart.remove','cart.view'];
		}
		if(!(typeof trackMetrics=='undefined')){
			trackMetrics( actionFrom, { 
				page: {
						name:'Cart Results',
						site:'hhos',
						section:'cart',
						subsection:'cart',
						page_function:'cart',
						platform:'wcs web',
						events: eventsList
				},
				product: {
						list: [{
							sku:partNumber,
							units:qty+"",
							total_price:totalPrice+"",
							xsell:false
							}]
					}
				});
		}
	}*/
	
	function sendRemoveEventToOmniture(productArray){
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

	function searchEventTrackMetrics(actionFrom, eventList, sortText, category, position){
		
		if(!(typeof trackMetrics=='undefined'))
		{
			trackMetrics( actionFrom, 
			{ 
				page: {
					site:'hhos',
					name:'facet interaction',
					section:'search',
					page_function:'search',
					events: eventList
				},
				search:{
					sort:sortText,
					facets:
						{
							'category':category
						},
					position:position
				}
			});
		}
	}
	
	function addEventTrackMetrics(site,subsection, eventList, sku, units, 
			totalPrice, xsellAttr, addToCartMethod, parentId, location, productline,cartId){
		
		if(!(typeof trackMetrics=='undefined')){
			trackMetrics( 'new.page', //'new.link' | 'new.page'
			{ 
				page: {
					site: site,
					name: hpmmd.page.name,
					section: hpmmd.page.section,
					subsection: subsection,
					page_function: 'cart',
					platform: 'wcs web',
					events: eventList
				},
				product: {				
					 list: [
						       {
						    	   sku:sku,
						    	   units:1,
						    	   total_price:totalPrice+"",
						    	   xsell:xsellAttr,
								   productLine:productline
						    	}
							],

					addtocart_method:addToCartMethod,
					cartID:cartId
				},
				promo:{
					parent_id:parentId+"",
					location:location
				}
			});

		}
		if(addToCartMethod == 'pdp' && (isUDL != undefined && isUDL == "true")){
			dataLayer.push({
				  event:'e_addToCart',
				  ecommerce: {
				    currencyCode:currency,
				    add: {                                
				      products: [{                        
				        name:productName,
				        id:sku,
				        price:totalPrice,
				        category:productline,
				        variant:variantVal,
				        quantity: units
				       }]
				    }
				  }
				});
		}
	}

	function navigationEventTrackMetrics(topNavCategory){
		
		if(!(typeof trackMetrics=='undefined'))
		{
			trackMetrics('new.link', 
			{
				page:{
					navigation:topNavCategory
				}
			});
		}
	}
	
	function tabEventTrackMetrics(name, tabName){
		
		if(!(typeof trackMetrics=="undefined")){
			trackMetrics( "new.page", {
			 	page: {
					 name:name,
					 tabname:tabName,
					  events:["product.view"]
				 }			  
			});
		}
	}
	
	function setCommonUserParams(userId, usertype,hp_profileId,hp_hashedEmailId){
		if(hp_profileId.split("__")[0] != null && hp_profileId.split("__")[1] != null)
		{
		userId=hp_profileId.split("__")[0];
		hp_profileId=hp_profileId.split("__")[1];
		}
		if(usertype == 'EPP_HP')
		{
	         hpmmd.user.login = "Y";
	         hpmmd.user.id = uservalue + ":" + "registered"+ ":" + hp_profileId;
	         hpmmd.page.discount_tier = "hpp";	 
		}
	    else if(usertype == 'EPP_00')
	    {
	       hpmmd.user.login = "Y";
	       hpmmd.user.id = uservalue + ":" + "registered" + ":" + hp_profileId;
	       hpmmd.page.discount_tier = "epp";	 
	     }
		 else if(usertype == 'GS')
		 {
	       hpmmd.user.login = "Y";
	       hpmmd.user.id = uservalue + ":" + "registered" + ":" + hp_profileId;
	       hpmmd.page.discount_tier = "gen";	 
	     }
		 else if(usertype != null && usertype !=""){
	       hpmmd.user.login = "Y";
	       hpmmd.user.id = uservalue + ":" + "registered" + ":" + hp_profileId;
	       hpmmd.page.discount_tier = "pri";	 
		 }
	     else if(userId == "-1002")
	     {
	       hpmmd.user.login = "N";
	       hpmmd.user.id = uservalue + ":" + "generic" + ":" + userId;
	       hpmmd.page.discount_tier = "gen";
		 }
	     else
	     {
	       hpmmd.user.login = "N";
		   hpmmd.user.id = uservalue+ ":" + "guest" + ":" + userId;
	       hpmmd.page.discount_tier = "gen";
		 }
		 
		//hashed email start(HPEUS-2287) if login different update
		if (typeof hp_hashedEmailId !== 'undefined'){
			var currentStoredHashEmailId = readAnalyticsCookie('hpmmd.user.hemid');
			if(currentStoredHashEmailId !== hp_hashedEmailId){	
				console.log('hpmmd new login');
				addUpdateAnalyticsCookie('hpmmd.user.hemid',hp_hashedEmailId , 365)
				hpmmd.user.hemid = hp_hashedEmailId;
			}else{
				hpmmd.user.hemid = hp_hashedEmailId;
			}
		}else{ //check if logged out and in cookie
			var currentStoredHashEmailId = readAnalyticsCookie('hpmmd.user.hemid');
			if(currentStoredHashEmailId !== null){
				hpmmd.user.hemid = currentStoredHashEmailId;
			}
		}
		//hashed email end-    
	}
	
	function readAnalyticsCookie(name) {
	    var cName = encodeURIComponent(name) + "=";
	    var cv = document.cookie.split(';');
	    for (var i = 0; i < cv.length; i++) {
	        var c = cv[i];
	        while (c.charAt(0) === ' ')
	            c = c.substring(1, c.length);
	        if (c.indexOf(cName) === 0)
	            return decodeURIComponent(c.substring(cName.length, c.length));
	    }
	    return null;
	}
	
	function addUpdateAnalyticsCookie(name, value, days) {
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        var expires = "; expires=" + date.toGMTString();
	    }
	    else {
	    	var expires = "";
	    }
	    var analyticsDomainName = window.location.hostname;
	    document.cookie = name + "=" + value + expires + "; path=/; domain=" + analyticsDomainName;
	    
	}
	
	function addMultipleItemsTrackEvent(productID, qtyCnt,count,A){
		
		  if (!(typeof trackMetrics == 'undefined')) {
	             trackMetrics('new.page', {
	                 page: {
	                     site: 'hhos',
	                     name: hpmmd.page.name,
	                     section: hpmmd.page.section,
	                     page_function: 'cart',
	                     events:  getAddEvent(productID, qtyCnt, A,count)
	                 },
	                 product: {
	                     list: hpmmd.product.list,
	                     addtocart_method: 'pdp'
	                 }
	             });
	         }
	}
	
	function getBusinessUnit(sectionname) { 
   		
        var business_unit = document.querySelector("meta[name=business_unit]");
        
         if( sectionname.match("Laptop") || sectionname.match("Desktops") || sectionname.match("Tablets"))
         { 
			business_unit.setAttribute('content', 'psg'); 
         }
         else if(sectionname.match("Printers"))
         {
			business_unit.setAttribute('content', 'IPG');
         }
         else 
         {
			business_unit.setAttribute('content', 'Shared');
         }

    	return business_unit;
	} 		

	function addReOrderItemsTrackEvent(qtyCnt){
		
		  if (!(typeof trackMetrics == 'undefined')) {
	             trackMetrics('new.page', {
	                 page: {
	                     site: 'hhos',
	                     name: hpmmd.page.name,
	                     section: hpmmd.page.section,
	                     page_function: 'cart',
	                     events:  getReorderEvent(qtyCnt)
	                     
	                 },
	                 product: {
	                     list: hpmmd.product.list,
	                     addtocart_method: "reorder",
                         addtocart_location: "reorder"
	                 }
	             });
	         }
	}
	
	function getReorderEvent(qty)
	{	
       
        if(qty== undefined)
		{
			eventsList=['cart.new','cart.add'];
		}             
		else if(qty== 1)
		{
			eventsList=['cart.new','cart.add'];
		}
		else
		{
        	   eventsList=['cart.add'];
          
		}
			
		return eventsList;
					
	}
	
	function writereview(){
	if (!(typeof trackMetrics == 'undefined'))
	{
		trackMetrics('new.link',{
			link:{
				name: 'write review',
				type:'custom'
			}
		});
	}
	}

	function sendFacetSelectionEvent (facetCategory, facetValue, facetId) {
		var omnitureFacets = facetCategory + ':' + facetValue;

		if( window.trackMetrics ){
			trackMetrics('new.facet', { page: { navigation : omnitureFacets, events: ['facet-search'] } }); 
		}
	}
	
	function setCouponCodeTrackEvent(code, isValid){
		
		/*if(!(typeof trackMetrics=='undefined'))
		{
			if(isValid == 'true'){
				trackMetrics('new.link',{
					  promo: {
					      coupon_valid_entry: code
					  }
					});
			}else{
				trackMetrics('new.link',{
					  promo: {
					      coupon_invalid_entry: code
					  }
					});
			}
		}*/
		//Changes for UDL
		if(isValid == 'true'){
			dataLayer.push({
			    event: 'e_couponApplied',
			    couponCode: code
			});
		}else{
			dataLayer.push({
			    event: 'e_couponError',
			    couponCode: code
			});
		}
	}
/**Added this section in OrderConfirmDetails.js **/	
	function setEvar24UserRegistration(){
		
		if(!(typeof trackMetrics=='undefined'))
		{
			trackMetrics('new.page',{
				  page: {
				    events: ['user.registration']
				  }
				});
		}
		
	}
	
	//store	Returns track analytics
	function analyticsReturnButtonClick(linkplace, editButtonName)
	{
		if(linkplace == undefined)
	    {
			linkplace ='returns:store';
	    }
		if(editButtonName == undefined)
	    {
			linkID ='returns:buttonClick';
	    }
	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:linkplace,linkID:editButtonName});
	    
	}
	
	//	Review page edit button track mertrics
	function reviewEditButtonClick(editButtonName)
	{
	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'checkout:review',linkID:editButtonName});
	}
	
	//	CreateAccount button from order confirmation page
	function sendCreateAccountOrderConf()
	{
		dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'checkout:confirmation',linkID:'order:registration'}); 
	}
	
	function addDeviceClick()
	{
	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'customer:manage my devices',linkID:'addDevice'});
	}
	
	//	CreateAccount button from order confirmation page
	function addDeviceSuccess()
	{
		dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'customer:manage my devices',linkID:'addDeviceSuccess'}); 
	}

	function myDevicesClick(userId)
	{
		dataLayer.push({udl:true,event:'e_userRegister', linkPlacement:'customer:manage my devices',linkID:'my devices',userID :userId});
	}
	
	function removeDeviceClick()
	{
	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'customer:manage my devices',linkID:'removeDevice'});
	}
	
	function removeDeviceSuccess()
	{ 
		dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'customer:manage my devices',linkID:'removeDeviceSuccess'}); 
	}

	function accountDeviceClick()
	{
	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'customer:my account your info',linkID:'my devices'});
	}
	
	function myDeviceTopNavClick()
	{
	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'customer:profile',linkID:'my devices'});
	}
	
	function mySubscriptionLeftNavClick()
	{
		dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'mysubscriptions',linkID:'left rail'});
	}
	
	function mySubscriptionTopNavClick()
	{
	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'mysubscriptions',linkID:'nav'});
	}
	
	function typeAheadSuggestionTag(hpmmdValue,linkID)
	{
		if(hpmmdValue !=undefined)
	    {
	    	var linkPlac;
    	    if(hpmmdValue.page !=undefined)
    	    {
    	    	if(hpmmdValue.page.page_function !=undefined && hpmmdValue.page.name !=undefined)
    	    	linkPlac =hpmmdValue.page.page_function+":"+hpmmdValue.page.name;	
    	    	else
    	    		linkPlac="checkout:shipping";
    	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:linkPlac,linkID:linkID});
    	    }
	    }
		else
			{
			dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'checkout:shipping',linkID:linkID});
			}
	 }
	
	function typeAheadSuggestionSelectTag(hpmmdValue,linkID,count)
	{
		if(hpmmdValue !=undefined)
	    {
	    	var linkPlac;
    	    if(hpmmdValue.page !=undefined)
    	    {
    	    	if(hpmmdValue.page.page_function !=undefined && hpmmdValue.page.name !=undefined)
    	    	linkPlac =hpmmdValue.page.page_function+":"+hpmmdValue.page.name;	
    	    	else
    	    		linkPlac="checkout:shipping";
    	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:linkPlac,linkID:linkID,m125:count});
    	    }
	    }
		else
			{
			dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:'checkout:shipping',linkID:linkID,m125:count});
			}
	 }
	
	function sendJoinLoyaltyAnalytics()
	{
		dataLayer.push({
			  udl: true,
			  event: 'e_linkClick',
			  linkPlacement: hpmmd.page.page_function+':'+hpmmd.page.name,
			  linkID: 'loyalty sign-up'
			});

	}
	
	//cancel order track analytics
	function sendCancelOrderAnalytics(linkplace, linkId)
	{
	    dataLayer.push({udl:true,event:'e_linkClick', linkPlacement:linkplace,linkID:linkId});
	}
	

	function eddRangeAnalytics(linkPlacement, linkId)
	{
		if(linkId != "" && linkId != null && typeof linkId !== 'undefined') {
			dataLayer.push({
				  udl: true,
				  event: 'e_linkClick',
				  linkPlacement: linkPlacement,
				  linkID: linkId
				});
		}
	}
	
	function checkoutPageTag(registerType,isccf,currency,skuList,QuantityList,PriceList,prodNameList, productBrandList, productVariantList, productCategoryList, discountList, stepNo, stepOption,isSMB)
	{
		var customerSegment = "consumer";
		var userType = "guest";
		var orderSeg = "consumer";
		var login_state = false;
		var isSmb = isSMB;
		var custSeg = $('#customerSegment').val();
		var pStore = $('#pStoreId').val();
		var isCallCenter = false;
		if(registerType == 'R'){
			login_state = true;
			userType = "general";
			if(pStore != undefined){
				if(pStore == 'epp'){
					userType = "epp";
				}else{
					if(pStore == 'hpepp'){
						userType = "hpepp";
					}else{
						if(pStore != '' && pStore != null){
							userType = "pri-"+pStore;
						}
					}
				}
			}
			if(custSeg == 'C'){
				customerSegment = "consumer";
			}else{
				if(custSeg == 'B'){
					customerSegment = "business";
				}
			}
			if(isSmb && (customerSegment == "consumer" || customerSegment == "business")){
				orderSeg = "smb";
			}
		}
		
		if(!login_state){
			customerSegment = "guest";
			userType = "guest";
			if(isSmb){
				orderSeg = "smb";
			}
		}
		if(isccf == "true"){
			isCallCenter = true;
		}
		
		var productArray = new Array();		
		for(var ctr=0;ctr<skuList.length;ctr++)
		{
			productArray.push({
				"name": prodNameList[ctr],
				"id": skuList[ctr],
				"price": PriceList[ctr],
				"brand": productBrandList[ctr],
				"category": productCategoryList[ctr],
				"variant": productVariantList[ctr],
				"quantity": QuantityList[ctr],
				"discountAmount": discountList[ctr]
			});
		}

		dataLayer.push({
		    event: 'e_pageView',
		    pageNameL5: 'checkout',
		    pageNameL6: '',
		    pageNameL7: '',
		    pageNameL8: 'checkout',
		    loginStatus: login_state, // true or false
		    userTypeSession: userType,
		    customerSegment: customerSegment, //only if user logged in
		    orderSegment: orderSeg,
		    callCenter: isCallCenter, // true or false
		    ecommerce: {
		        currencyCode: currency,
		        checkout: {
		        	actionField: {
			        	step: stepNo,
			        	option: stepOption
		        	},
		    products: productArray
		     }
		    }
		});
	}
	
	
	function checkoutConfirmationTag(registerType,isccf,currency,transactionId,transactionNetPrice,paymentMethod,taxCost,shippingCost,shippingType,orderCoupon,discount,totaDiscount,productNameList,productSkuList,priceList,productBrandList,categoryList,skuVariantList,quantityList,discountList,gmDollarValueList,proCouponList){
		var customerSegment = "consumer";
		var userType = "guest";
		var orderSeg = "consumer";
		var login_state = false;
		var custSeg = $('#customerSegment').val();
		var pStore = $('#pStoreId').val();
		var isCallCenter = false;
		if(registerType == 'R'){
			login_state = true;
			userType = "general";
			if(pStore != undefined){
				if(pStore == 'epp'){
					userType = "epp";
				}else{
					if(pStore == 'hpepp'){
						userType = "hpepp";
					}else{
						if(pStore != '' && pStore != null){
							userType = "pri-"+pStore;
						}
					}
				}
			}
			
			if(custSeg == 'C'){
				customerSegment = "consumer";
			}else{
				if(custSeg == 'B'){
					customerSegment = "business";
				}
			}
		}
		
		if(!login_state){
			customerSegment = "guest";
			userType = "guest";
		}
		if(isccf == "true"){
			isCallCenter = true;
		}
		
		var productArray = new Array();		
		for(var ctr=0;ctr<productSkuList.length;ctr++)
		{
			productArray.push({
				"name": productNameList[ctr],
				"id": productSkuList[ctr],
				"price": priceList[ctr],
				"brand": productBrandList[ctr],
				"category": categoryList[ctr],
				"variant": skuVariantList[ctr],
				"quantity": quantityList[ctr],
				"coupon": proCouponList[ctr], //product level discount (if exists)
				"discountAmount": discountList[ctr],
				"q": gmDollarValueList[ctr]
			});
		}
		dataLayer.push({
			event: 'e_pageView',
			pageNameL5: 'checkout',
			pageNameL6: '',
			pageNameL7: '',
			pageNameL8: 'purchase',
			loginStatus: login_state, // true or false
			userTypeSession: userType,
			customerSegment: customerSegment, //only if user logged in
			callCenter: isCallCenter, // true or false
			ecommerce: {
				currencyCode: currency,
				purchase: {
					actionField: {
						id: transactionId,
						affiliation: 'HP Online',
						revenue: transactionNetPrice, //Sum of product prices in transaction – after order level discount
						purchasePaymentMethod: paymentMethod,
						tax: taxCost,
						shipping: shippingCost,
						purchaseShippingMethod: shippingType, //example 'fedex'
						coupon: orderCoupon, //order level coupon (if exists)
						discountAmount: discount, //order level discount (if exists)
						totalDiscount: totaDiscount //Total discount amount applied
					},
					products: productArray
				}
			}
		});
	}
