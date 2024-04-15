// GNB footer js for mobile popup
var poptag=false;
function spopOpen(){
	spopSlide=function(){
		$("#spop-overlay.active").slideDown();
	}
	spopSlide();
	$("#spop-overlay .spop-close").click(function(){
		$("#spop-overlay.active").slideUp();
	});
}
function spopOpen2(){
	spopSlide=function(){
		if(window.scrollY>107){
		   $("#spop-overlay2.active").slideDown();
		   //tagOnce();
		}else{
			$("#spop-overlay2.active").slideUp();
		}
	}
	spopSlide();
	$("#spop-overlay2 .spop-close").click(function(){
		$("#spop-overlay2.active").slideUp();
	});
}
function sappOpen(){
	$("#sapp-overlay").addClass('load');
	$(".sapp-close-btn").click(function(){
		$("#sapp-overlay").removeClass('load');
	});
	window.sessionStorage.sappClose="true";
}
function tagOnce(){
	var tagCount=0;
	if(!poptag){
	var poptagger=setInterval(function(){
		tagCount++;
		if(typeof utag!="undefined"){
			utag.link({link_cat:'mobile shop app extender',link_id:'mobile_shop_app_extender_impression',link_meta:'link_name:extender impression',link_position:'mobile shop app'});
			poptag=true;
			clearInterval(poptagger);
		}else if(tagCount>=20){
			clearInterval(poptagger);
		}
	},500);
	}
}

var p=location.search,t='',ct=0;
if(p!=''){
	if(p.indexOf('?redir=')>-1){
		t=p.substr(p.indexOf('?redir=')+7);
	}else if(p.indexOf('&redir=')>-1){
		t=p.substr(p.indexOf('&redir=')+7);
	}
	if(t!=''){
		var checkRedir=setInterval(function(){
			if(typeof utag!="undefined"){
				utag.link({search_category:"internal search", search_term:t, search_location:"internal search", search_type:"redirect"});
				clearInterval(checkRedir);
			}else{
				if(ct>=20){
					clearInterval(checkRedir);
				}else{
					ct++;
				}
			}
		},500);
	}
}
$(function(){
	$(".irNotice").click(function(e){
		e.preventDefault();
		$("#ir_overlay").fadeIn();
	});
	$("#ir_overlay .cancel,#ir_overlay .cta-button.continue").click(function(){
		$("#ir_overlay").fadeOut();
	});
	$("#printer-exit .cancel,#printer-exit .cta-button.continue").click(function(){
		$("#printer-exit").fadeOut();
	});
});


// end for GNB footer js for mobile popup

/**
* Login check
*/
var saLogin = 0;
window.forceHAShow = "active";
$('body').append('<div id="configurator-s7-preSelect"></div>');
$(document).ready(function(){

	if(Cookies('xsdcxyn')) {
		for(var i = 0; i<$('li a[href$="/us/support/account/order/#/order-lookup"]').length; i++) {
			$('li a[href$="/us/support/account/order/#/order-lookup"]').attr('href', '/us/support/account/order/');
		}
	}
	$(document).on('GNBInitialized onLogInComplete  onSignUpComplete', function() {
		if(Cookies('xsdcxyn')) {
			for(var i = 0; i<$('li a[href$="/us/support/account/order/#/order-lookup"]').length; i++) {
				$('li a[href$="/us/support/account/order/#/order-lookup"]').attr('href', '/us/support/account/order/');
			}
		}
	});
	hostName();

	$(document).on("click", ".logoutSMG", function(e) {
		//dropCookiesHistory($(this).attr('href'));
		e.preventDefault();
		var ssoUrl=window.location.host.indexOf("www.samsung.com")>-1 ?"https://sso-us.samsung.com":"https://sso-stg.us.samsung.com";
		$.ajax({
			url: ssoUrl+"/sso/apiservices/logout",
			method:"GET",
			async: false,
			dataType: 'jsonp',
			crossDomain: true,
			jsonpCallback: 'logoutCallback'
		});
	});

	if (!window.location.pathname.match('/us/support/account$') && !window.location.pathname.match('/us/support/account/$')) {
		$(document).trigger('initLogin');
	}
	if(typeof getCookie("tppid")=="undefined"){
		$(".eppFaq").remove();
	}else{
		$(".eppFaq").show();
	}

// gnb login checkout page text
	var isCheckout = /^\/us\/checkout\//.test(window.location.pathname),
	checkoutBarImg = $('.gnb-login-container__group-image'),
	loginStep = $('.gnb-login-container .sign-in-phase'),
	signUpStep = $('.gnb-login-container .sign-up-phase');


	if (isCheckout) {
		$('.gnb-login-inner__left__title', loginStep).text('Please log into your Samsung account');

		$('.gnb-login-inner__left__subtitle', loginStep).text('');

		// After for reflect the deferred program
		 $('.gnb-login-inner__left__title--signup', signUpStep).text('Get the products you love now and pay over time.');
		 $('.gnb-login-inner__left__subtitle', signUpStep).text('Create a Samsung account to gain access to exclusive offers, world-class customer support and to apply for special financing to pay for your purchases over time.');

		$('.gnb-login-inner__left__link a', loginStep).text('Create your Samsung account now');
		checkoutBarImg.show();
	}
	var xsdcxyn = getCookie("xsdcxyn");
	if ((xsdcxyn == null) || (xsdcxyn == "")){
		deleteCookie('SSO_SESSIONID','/','.samsung.com');
		deleteCookie('SSO_TOKEN','/','.samsung.com');
	}

	//PRINTER REDIRECT TO HP
	$("nav a[href*='/us/computing/printers'],footer a[href*='/us/computing/printers'],footer a[href*='/us/computing/computing-accessories/printers']").on("click",function(e){
		e.preventDefault();
		$("#printer-exit").fadeIn();
	});
});

function deleteCookie(name, path, domain)
{

  domain = "samsung.com";
  if (getCookie(name)) {
    document.cookie = name + '=' +
      ((path) ? ';path=' + path : '') +
      ((domain) ? ';domain=' + domain : '' ) +
      ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
  }
}

function isLogin(){

	var xsdcxyn = getCookie("xsdcxyn");
	var optVal = getCookie("iPlanetDirectoryProOptVal");

	if ((xsdcxyn != null) && (xsdcxyn != "")){

		return true;
	}else if((optVal != null) && (optVal != "")){

		loginUser(optVal);

	} else{
		return false;
	}
}
function loginUser(val){
	saLogin++;
	var url= "//sso-us.samsung.com/sso/profile/saLoginUser?optVal="+val;
	if(saLogin==1){
		$.ajax({
	        type: "POST",
	        url: url,
	        dataType: "jsonp",
	        async: false,
	        cache: false,
	        jsonpCallback: "callbackSso",
			jsonp: "callback"
	    });
	}
}
function logoutCallback(data){
	if(data && data.result && data.result=="success"){
		dropCookiesHistory($('.logoutSMG').attr('href'));
		window.location.reload();
	}
	else{
		console.log(data);
	}
}
function callbackSso(data){
	if(data.login){
	var loginLink = $('.login');
	 var logoutLink = $('.logoutSMG');
	 loginLink.text('HI, ' + getUserName());
	  $('.login-trigger').hover(function(){
          loginLink.addClass('account-open');
          $(".myaccount-dropdown").css({opacity:1, display:'block'});
      }, function(){
          loginLink.removeClass('account-open');
          $(".myaccount-dropdown").css({opacity:0, display:'none'});
          open = false;
      });

	  hostName();
	  //gnbNavigation.init();
      logoutLink.click(function(){
         dropCookiesHistory(logoutLink.attr('href'));
      });
	}
}

 function hostName(){
    var hostName = location.hostname;
    var logout = $('.logoutSMG');
	if(hostName.indexOf('www') !== -1 || window.location.host.indexOf("origincl") > -1) {
		logout.attr("href" ,'//sso-us.samsung.com/sso/logout');
    }
    else {
        logout.attr("href" ,'//sso-stg.us.samsung.com/sso/logout');
    }
}

function dropCookiesHistory(href){
    var finalURL = href;
    $('.logoutSMG').attr("href", finalURL);
    setCookie( "targetUrl", window.location.href, 0, '/', "samsung.com", '' );
    deleteCookie("prof_country", "/", document.domain);
    deleteCookie("prof_prolist_saved", "/", "");
    deleteCookie("prof_id", "/", document.domain);
    deleteCookie("prof_lname", "/", document.domain);
    deleteCookie("prof_bpno_s", "/", document.domain);
    deleteCookie("prof_fname", "/", document.domain);
    deleteCookie("prof_login_success", "/", document.domain);
    deleteCookie("bvdisplaycode", "/", "");
    deleteCookie("bvproductid", "/", "");
    deleteCookie("bvpage", "/", "");
    deleteCookie("bvcontenttype", "/", "");
    deleteCookie("bvauthenticateuser", "/", "");
    deleteCookie("bzv_url", "/", "");
    deleteCookie("auth_flag", "/", "");
    deleteCookie("iPlanetDirectoryProOptVal", "/", document.domain);
    deleteCookie("iPlanetDirectoryPro", "/", document.domain);
    deleteCookie("tppid", "/", document.domain);
    deleteCookie("tmktid", "/", document.domain);
    deleteCookie("tmktname", "/", document.domain);
    deleteCookie("tlgimg", "/", document.domain);
    deleteCookie("taccessrtype", "/", document.domain);
    deleteCookie("dr_a_token", "/", document.domain);
    deleteCookie("dr_r_token", "/", document.domain);
    deleteCookie("work_email", "/", document.domain);
    deleteCookie("work_pin", "/", document.domain);
    deleteCookie("remoteId", "/", document.domain);
    deleteCookie("grp_id", "/", document.domain);
    deleteCookie("grp_nm", "/", document.domain);
    sessionStorage.removeItem('eppPlanId');
    sessionStorage.removeItem('eppMarketId');
    sessionStorage.removeItem('finderPrdIaCd');

    $.ajax({
        url: "http://shop.us.samsung.com/store?Action=Logout&Locale=en_US&SiteID=samsung&sout=json",
        dataType:'jsonp',
        data:'jsonp=callbackLogout'

    });
    // delete cookie for chatbot
	deleteCookie("ecom_vi", "/", document.domain);
    // deleteCookie("s_ecom_jwt", "/", document.domain);
    deleteCookie("s_ecom_session", "/", document.domain);
    return true;
}



/**
* Logout
*/


window.callbackLogout = function(data){

}
/**
* get UserName
*/
function getUserName() {
    var prof_fname = fortune("prof_fname");
    return prof_fname;
}

function getCookie(key) {
	return window.Cookies.get(key);
}

function setCookie( name, value, expires, path, domain, secure )
{
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name + "=" +( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function fortune(cookie) {
    return String(window.Cookies.get(cookie))
    .replace(/<script>/g,'')
    .replace(/<\/script>/g,'')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

if (window.location.href.indexOf('all-deals') > -1) {
    if (window.Cookies.get("xsdcxyn")) {
        $.removeCookie("teppaccess", {
            domain: '.samsung.com'
        })
    }
}

$(function(){
	if(window.location.href.indexOf("/us/support/account") > -1 && !window.Cookies.get("xsdcxyn") && window.Cookies.get("taccessrtype") && window.Cookies.get("taccessrtype") == "EmailDomain" ){
		setCookie( "targetUrl", document.location.protocol+'//'+document.domain+'/us/shop/all-deals/', 0, '/', "samsung.com", '' );

	} else if(window.Cookies.get("fromPage")=='prc'){
		var tarUrl = window.location.href.split('/us')[0];
		setCookie( "targetUrl", tarUrl+'/us/support/account', 0, '/', "samsung.com", '' );
	} else if(window.location.href.indexOf("marsLinkCategory") > -1){
		setCookie( "targetUrl", window.location.href, 0, '/', "samsung.com", '' );
	} else {
		var referrer = document.referrer;
		if(!!referrer && endsWith(referrer, "/us/mobile/phones/upgrade/") && window.Cookies.get("sUPurl") != null) {
			setCookie( "targetUrl", window.location.origin + window.Cookies.get("sUPurl"), 0, '/', "samsung.com", '' );
			if(!!$('#support_iframe').attr('src')){
				var addressDomain = $('#support_iframe').attr('src').split('/sso/secure/urlAction?targetUrl=')[0];
				if(!!addressDomain){
					$('#support_iframe').attr('src',addressDomain+'/sso/secure/urlAction');
				}
			}
		} else {
			if(!referrer||referrer.indexOf('/us/support/account')>-1||referrer=='http://sso-us.samsung.com/sso/logout?url=http://www.samsung.com/us/support/account/'){
				setCookie( "targetUrl", document.location.protocol+'//'+document.domain+'/us/support/account', 0, '/', "samsung.com", '' );
			}else{
				if(referrer.slice(-1)=='/'){
					referrer = referrer.slice(0,-1);
				}
				if(referrer.indexOf('//www')>-1 && referrer.indexOf('https')==-1){
					referrer = referrer.replace('http','https');
				}
				setCookie( "targetUrl", referrer, 0, '/', "samsung.com", '' );
			}
			if(!!$('#support_iframe').attr('src')){
				var addressDomain = $('#support_iframe').attr('src').split('/sso/secure/urlAction?targetUrl=')[0];
				var addressTarget = $('#support_iframe').attr('src').split('/sso/secure/urlAction?targetUrl=http://')[1];
				if(!!addressDomain && !!addressTarget){
					$('#support_iframe').attr('src',addressDomain+'/sso/secure/urlAction?targetUrl=https://'+addressTarget);
				}
			}
		}
	}

	if(window.Cookies.get('STA_USER_TYPE')=='DEALER'){
		$(".account .dropdown>ul>li>a").attr('href','http://support-us.samsung.com/stacyber/b2b/review_20/sta_b2b_index.jsp');
	}

	//FOOTER MOBILE ACCORDION
	function footerAccordions(){
		$(".span12 .column>h6").click(function(){
			footerCloseAll();
			if($(this).next('ul').css('display')=='none'){
				$(this).next('ul').slideToggle();
				if(!$("i",this).hasClass("inverted")){
					$("i",this).addClass("inverted");
				}
			}

		});
		$(".footer-store>h6").click(function(){
			footerCloseAll();
			if($(this).next('div').css('display')=='none'){
				$(this).next('div').slideToggle();
				if(!$("i",this).hasClass("inverted")){
					$("i",this).addClass("inverted");
				}
			}

		});
		$(".footer-store .span6>h6").click(function(){
			shopCloseAll();
			if($(this).next('ul').css('display')=='none'){
				$(this).next('ul').slideToggle();
				if(!$("i",this).hasClass("inverted")){
					$("i",this).addClass("inverted");
				}
			}
		});
		footerCloseAll();
	}

	function footerCloseAll(){
		shopCloseAll();
		$(".span12 .column>h6>i, .footer-store>h6>i").removeClass("inverted");
		$(".span12 .column>ul, .footer-store-body").not($(">ul",this)).slideUp();
	}
	function shopCloseAll(){
		$(".footer-store .span6>h6>i").removeClass("inverted");
		$(".footer-store .span6>ul").not($(">ul",this)).slideUp();
	}
	function desktopInit(){
		$(".footer-store-body, .footer-store-body ul, .right-column .span12 .column ul").show();
	}
	$(window).on('load resize', function(){
		$(".span12 .column>h6,.footer-store>h6,.footer-store .span6>h6").unbind('click');
		if(window.matchMedia("(min-width: 768px)").matches){
			desktopInit();
		}else{
			footerAccordions();

		}
	});

	//PROMO CLOSE SESSION
	if(window.Cookies.get("spromoClose")!=undefined){
		$(".gnb-b2c-promo-wrapper").removeClass("gnb-active-promo-").hide();
	}else{
		$(".gnb-b2c-promo-wrapper").addClass("gnb-active-promo-")
	}
	$(".gnb-promo-close").click(function(){
		$('.gnb-b2c-promo-wrapper').removeClass('gnb-active-promo-').slideUp();
		window.Cookies.get("spromoClose","closed",{domain:".samsung.com",path:"/"});
	});
});

/*---*/
var hideSamsungAppOverlay = function() {
     if(window.location.href.indexOf('/us/checkout') >= 0) {
        if($('#spop-overlay').length > 0 ) {
            $('#spop-overlay').hide();
        }
    if($('#spop-overlay2').length > 0 ) {
			$('#spop-overlay2').hide();
        }
    }
};

function logoutCallbackForWindowClose(data) {
    if(data && data.result && data.result=="success"){
        deleteCookie('prof_id','/','.samsung.com');
	window.GNB.init();
    }
    else{
        console.log(data);
    }
}

var checkIfUserClosedTag = function() {

    if(!getCookie('xsdcxyn') && getCookie('prof_id')) {
		var ssoUrl= "https://sso-us.samsung.com";
        $.ajax({
            url: ssoUrl+"/sso/apiservices/logout",
            method:"GET",
            async: false,
            dataType: 'jsonp',
            crossDomain: true,
            jsonpCallback: 'logoutCallbackForWindowClose'
        });

    } ;
}


hideSamsungAppOverlay();

$(window).load(function() {
	if(getCookie('fromPage') == 'prc' && location.href.indexOf('/us/support/account') > -1){
        deleteCookie('fromPage','/','.samsung.com');
	}
	checkIfUserClosedTag();
});