$(document).ready(function () {
	$('#shopforoverlayarea').css("display","none");
	$('.acctsum_reveal-modal-bg').css("display","none");
	
	//carousal bar
	var sec2;
	var time_hero_slider = 100;
	var bannerRotate = $('#lp .sec2Mobile div').length > 1;
	if(($(window).width()) <= 542)
	{
       	sec2 = $('#lp .sec2Mobile, #lp .sec4Mobile').bxSlider({
				mode : 'horizontal',
				speed : 1000,
				pause : 5000,
				maxSlides : 1,
				moveSlides : 1,
				moveSlideQty : 1,
				pager : bannerRotate,
				auto : bannerRotate,
				infiniteLoop : bannerRotate,
				controls : bannerRotate
		});
	}
});

function enterTrigger(){
	$('#businessnameinput').keypress(function (e) {
  		if ((e.which == 13)||(e.keyCode == 13)) {
 			e.preventDefault();
  			$('#shopforoverlayarea .changebtnarea .btn').click();
		}
	});
}


function buttonClick(){
var iePopup= document.getElementById('iePopup').value;
		$('#shopforoverlayarea .contextarea .shopforpersonal').addClass("selected");
		$('#shopforoverlayarea .contextarea .shopforbusiness').removeClass("selected");
		$('#shopforoverlayarea .changebtnarea .btn').removeClass("disabled");
		$('#shopforoverlayarea .contextarea .shopforbusiness .companynameinputarea input').val("");
		$('#shopforoverlayarea').css("display","block");
		$('.acctsum_reveal-modal-bg').css("display","block");


	$('#shopforoverlayarea a.btnClose').on('click', function(){
		$('#shopforoverlayarea').css("display","none");
		$('.acctsum_reveal-modal-bg').css("display","none");
	});

	$('#shopforoverlayarea .contextarea .shopforpersonal').on('click', function(){
		$('#shopforoverlayarea .contextarea .shopforpersonal').addClass("selected");
		$('#shopforoverlayarea .contextarea .shopforbusiness').removeClass("selected");
		$('#shopforoverlayarea .changebtnarea .btn').removeClass("disabled");
	});


	$('#shopforoverlayarea .contextarea .shopforbusiness').on('click', function(){
		$('#shopforoverlayarea .contextarea .shopforpersonal').removeClass("selected");
		$('#shopforoverlayarea .contextarea .shopforbusiness').addClass("selected");
		$('#shopforoverlayarea .contextarea .shopforbusiness .companynameinputarea input').val("");
		$('#shopforoverlayarea .changebtnarea .btn').addClass("disabled");
	});
if(iePopup=="noie") {
	$('#shopforoverlayarea .contextarea .shopforbusiness .companynameinputarea input').on("input",function(e){
		if ($(this).val()=="")
		{
			$('#shopforoverlayarea .changebtnarea .btn').addClass("disabled");
		}
		else
		{
			$('#shopforoverlayarea .changebtnarea .btn').removeClass("disabled");
		}
	});
}
else {
$('#shopforoverlayarea .contextarea .shopforbusiness .companynameinputarea input').on("propertychange",function(e){
		if ($(this).val()=="")
		{
			$('#shopforoverlayarea .changebtnarea .btn').addClass("disabled");
		}
		else
		{
			$('#shopforoverlayarea .changebtnarea .btn').removeClass("disabled");
		}
	});

}
$('#shopforoverlayarea .changebtnarea .btn').focus();

}
function validateFields(companyName){
	if($('#shopforoverlayarea .contextarea .shopforbusiness').hasClass("selected"))
	{
		if(companyName == "" ||!companyName.match(/^[A-Za-z0-9\/_+<>?:'., ;~`\-!@#$%^&*()]+$/)){
			$("#businessName_label").text('Enter a valid Company name');
			$("#businessName_label").addClass('error');
			$('#businessnameinput').addClass('error');
			$("#businessnameinput").focus();
			return false;
		}else if(companyName.length>35){
			$("#businessName_label").text('Company name cannot exceed maximum characters');
			$('#businessnameinput').addClass('error');
			$("#businessName_label").addClass('error');
			$("#businessnameinput").focus();
			return false;
		}else{
			$("#businessName_label").text(' ');
			$("#businessnameinput").removeClass('error');
			$("#businessName_label").removeClass('error');
			$('#businessnameinput').removeClass('error');
			return true;
		}
	} else {
		return true;
	}

}
function switchFlag(){
	var emailID = document.getElementById('emailID').value;
	var companyName = document.getElementById('businessnameinput').value;
	var SMBoption = "Personal";
	flag = validateFields(companyName);
	if(flag) {
	
		var encCompanyName=encodeURIComponent(companyName);

		if ($('#shopforoverlayarea .contextarea .shopforbusiness').hasClass("selected"))
		{
			SMBoption="Business"; 
		}

		if (!$(this).hasClass("disabled"))
		{
			$('#shopforoverlayarea').css("display","none");
			$('.acctsum_reveal-modal-bg').css("display","none");
		}
		if(document.getElementById('commonLoadingOverlay') != null)
		{
		document.getElementById('commonLoadingOverlay').style.display = "block";
		}

		$.ajax({
			url : "/HPMyAccountLandingSMBCmd",
			type : "post",
			data : "&SMBoption="+SMBoption+"&companyName="+encCompanyName+"&emailID="+emailID,
			success : function(response) {

			wc.render.getRefreshControllerById('flagSwitchController');  
			wc.render.updateContext('flagSwitchContext');   
			if(document.getElementById('commonLoadingOverlay') != null){
				document.getElementById('commonLoadingOverlay').style.display = "none";
			}			

		},
		error : function(response) {
		if(document.getElementById('commonLoadingOverlay') != null){
		document.getElementById('commonLoadingOverlay').style.display = "none";
	}
			//Error Handling
		}
		});



	}
}
function switchProfile(){

	var companyName = document.getElementById('businessnameinput').value;
	var SMBoption = "C";
	flag = validateFields(companyName);
	if(flag) {
	
		var encCompanyName=encodeURIComponent(companyName);

		if ($('#shopforoverlayarea .contextarea .shopforbusiness').hasClass("selected"))
		{
			SMBoption="B"; 
		}

		if (!$(this).hasClass("disabled"))
		{
			$('#shopforoverlayarea').css("display","none");
			$('.acctsum_reveal-modal-bg').css("display","none");
		}
		if(document.getElementById('commonLoadingOverlay') != null)
		{
		document.getElementById('commonLoadingOverlay').style.display = "block";
		}

		$.ajax({
			url : "/webapp/wcs/stores/servlet/UpdateUserType",
			type : "post",
			data : "&userType="+SMBoption+"&smbCompanyName="+encCompanyName+"&storeId="+document.getElementById('storeId').value+"&authToken="+encodeURIComponent($("#authToken").val()),
			success : function(response) {

			wc.render.getRefreshControllerById('flagSwitchController');  
			wc.render.updateContext('flagSwitchContext');   
			if(document.getElementById('commonLoadingOverlay') != null){
				document.getElementById('commonLoadingOverlay').style.display = "none";
			}			

		},
		error : function(response) {
		if(document.getElementById('commonLoadingOverlay') != null){
		document.getElementById('commonLoadingOverlay').style.display = "none";
	}
			//Error Handling
		}
		});



	}
}
$(document).ready(function () {

var sliderLoaded = false;
var content_parsed = false;
	

if (runResponsive)	{
	var checkAndChangeHtml = function() {
	   if (!content_parsed)	{
	   if(matchMedia("screen and (max-width : 800px)").matches) {
	   
	   } else {
		   if (!sliderLoaded){
		   category_slider_global();
		   sliderLoaded = true;
		   }
		  content_parsed = true;
	   }
	   }
	   
};

window.addEventListener('resize', checkAndChangeHtml);
checkAndChangeHtml();

}else{
	//IE support: 1 Initialize scripts and then 2.parse the content of <script type="text/conditional-html" id="featured_products_source">
category_slider_global();

}
});

$(document).ready(function () {
	//continue to payment button function
	if ($('.myaccount.editaddress .addressbookbtn').length)
	{
		$('.myaccount.editaddress .addressbookbtn').click(function() {
			//if ($(this).hasClass("disabled")) {return false;} 
			var flag1 = true;
			var flag2 = true; 
			var testmap={};
			var errormap={};
			testmap["text"] = function (testvalue){
				if (testvalue == "")
					return false;
				return true;
			}
			testmap["password"] = function (testvalue){
				if ((testvalue == "") || (testvalue.length <= 2))
				{		
					return false;
				}
				return true;
			}
			errormap["text"] = "Empty text";
			errormap["password"] = "Empty password";
			var testid = ["firstnameinput","lastnameinput","address1input","cityinput","zipcodeinput","nicknameinput","phone_mobile_input"];
			checkInput('.myaccount.editaddress .userinfoinputarea', testmap, ".errorwarningarea", errormap);
				$(".myaccount.editaddress .userinfoinputarea input").each(function(index, element) {
					if ($(this).hasClass("require_field"))
					{
						if (testid.indexOf($(this).attr("id")) != -1)
						{
						
							if ($(this).hasClass("error"))
							{
								flag1 = false;
								$(this).parent().addClass("error");
							}
							else
							{
								$(this).parent().removeClass("error");
							}
						}
					}
					else
					{
						$(this).removeClass("error");
					}
				});
				if (($(".myaccount.editaddress .userinfoinputarea .statearea a.current").html() == "Select state"))
				{
					flag1 = false;
					$(".myaccount.editaddress .userinfoinputarea .statearea .smallwarningicon").css("display","inline-block");
					$(".myaccount.editaddress .userinfoinputarea .statearea a.current").css("border-color","rgb(255,0,0)");
					$(".myaccount.editaddress .userinfoinputarea .statearea").addClass("error");
				}
				else {
					$(".myaccount.editaddress .userinfoinputarea .statearea .smallwarningicon").css("display","none");		
					$(".myaccount.editaddress .userinfoinputarea .statearea a.current").css("border-color","rgb(204, 204, 204)");
					$(".myaccount.editaddress .userinfoinputarea .statearea").removeClass("error");
				}
				
				if (document.documentElement.clientWidth < 801)
				{
				}
				else
				{
					$(".myaccount.editaddress .userinfoinputarea .ph-section input").each(function(index, element) {
						if ((!$(this).hasClass("ph_text_mobile")) && ($(this).val()==""))
						{
							flag1 = false;
							flag2 = false;
							$(this).addClass("error");
							$(".myaccount.editaddress .userinfoinputarea .ph-section .smallwarningicon").css("display","inline-block");
							$(".myaccount.editaddress .userinfoinputarea .ph-section").addClass("error");
							$('.myaccount.editaddress .userinfoinputarea').addClass('error');
						}
						else 
						{
							$(this).removeClass("error");
						}
					});
				}
				if (flag2)
				{
					$(".myaccount.editaddress .userinfoinputarea .ph-section .smallwarningicon").css("display","none");
					$(".myaccount.editaddress .userinfoinputarea .ph-section").removeClass("error");
					if (flag1)
					{
						$('.myaccount.editaddress .userinfoinputarea').removeClass('error');
					}
				}
				if (!flag1)
				{
					$('.myaccount.editaddress .userinfoinputarea').addClass('error');
				}
				return (flag1 && flag2);
		});
		
		$('.myaccount.editaddress .userinfoinputarea input.require_field').on("input",function(e){
			flag=true;
			$('.myaccount.editaddress .userinfoinputarea input.require_field').each(function(e) {
				if (flag && ($(this).val()==""))
				{
					flag=false;
				}
			});
			if (flag)
			{
				$('.myaccount.editaddress .addressbookbtn').removeClass("disabled");
			}
			else
			{
				$('.myaccount.editaddress .addressbookbtn').addClass("disabled");
			}
		});
		
		$('.myaccount.editaddress .userinfoinputarea #phone1').autotab({target: '.myaccount.editaddress .userinfoinputarea #phone2'});
		$('.myaccount.editaddress .userinfoinputarea #phone2').autotab({target: '.myaccount.editaddress .userinfoinputarea #phone3', previous: '.myaccount.editaddress .userinfoinputarea #phone1'});
		$('.myaccount.editaddress .userinfoinputarea #phone3').autotab({previous: '.myaccount.editaddress .userinfoinputarea #phone2'});
	}
});


$(document).ready(function () {
	$('.order_details_module .order_details_contents.ctoproduct .ctoarea .ctodisplayoption').click(function() {
		if ($(this).parent('.ctoarea').hasClass("open"))
		{
			$(this).parent('.ctoarea').removeClass("open");
			$(this).html("Show details");
		}
		else
		{
			$(this).parent('.ctoarea').addClass("open");
			$(this).html("Hide details");
		}
	});
});

$(document).ready(function () {
	
	
	if($('input[name=userType]:checked','#OptionForm').val() == "B"){
		$('#content .myaccount.guestRegistration .companyinputarea').css("visibility","visible");
		$('#content .myaccount.guestRegistration .companyinputarea input').addClass("require");
	}else {
		$('#content .myaccount.guestRegistration .companyinputarea').css("visibility","hidden");
		$('#content .myaccount.guestRegistration .companyinputarea input').removeClass("require");
	}
	
	$('#content .myaccount.guestRegistration .personaloption .radio').on('click', function(){
		$('#content .myaccount.guestRegistration .companyinputarea').css("visibility","hidden");
		$('#content .myaccount.guestRegistration .companyinputarea input').removeClass("require");
	});
	
	$('#content .myaccount.guestRegistration .businessoption .radio').on('click', function(){
		$('#content .myaccount.guestRegistration .companyinputarea').css("visibility","visible");
		$('#content .myaccount.guestRegistration .companyinputarea input').addClass("require");
	});
	
	$('#content .myaccount.guestRegistration .registerbutton').on('click', function(){
		flag1=true;
		$('#content .myaccount.guestRegistration input.require').each( function(){
			if ($(this).val()=="")
			{
				$(this).addClass("required");
				$(this).parent().addClass("error");
				flag1=false;
			}
			else if (!$(this).hasClass("error"))
			{
				$(this).removeClass("required");
				$(this).parent().removeClass("error");
			}
		});
		
		if (!flag1)
		{
			$('#content .myaccount.guestRegistration .alertbox').css("display","block");
		}
		else
		{
			$('#content .myaccount.guestRegistration .alertbox').css("display","none");
		}
		
		return flag1;
	});
});

$(document).ready(function () {
	$('.acctsum .acctInfos .shopfor .btn').on('click', function(){
		$('#shopforoverlayarea .contextarea .shopforpersonal').addClass("selected");
		$('#shopforoverlayarea .contextarea .shopforbusiness').removeClass("selected");
		$('#shopforoverlayarea .changebtnarea .btn').removeClass("disabled");
		$('#shopforoverlayarea .contextarea .shopforbusiness .companynameinputarea input').val("");
		$('#shopforoverlayarea').css("display","block");
		$('.acctsum_reveal-modal-bg').css("display","block");
	});
	
	$('#shopforoverlayarea a.btnClose').on('click', function(){
		$('#shopforoverlayarea').css("display","none");
		$('.acctsum_reveal-modal-bg').css("display","none");
	});
	
	$('#shopforoverlayarea .contextarea .shopforpersonal').on('click', function(){
		$('#shopforoverlayarea .contextarea .shopforpersonal').addClass("selected");
		$('#shopforoverlayarea .contextarea .shopforbusiness').removeClass("selected");
		$('#shopforoverlayarea .changebtnarea .btn').removeClass("disabled");
	});
	
	$('#shopforoverlayarea .contextarea .shopforbusiness').on('click', function(){
		$('#shopforoverlayarea .contextarea .shopforpersonal').removeClass("selected");
		$('#shopforoverlayarea .contextarea .shopforbusiness').addClass("selected");
		$('#shopforoverlayarea .contextarea .shopforbusiness .companynameinputarea input').val("");
		$('#shopforoverlayarea .changebtnarea .btn').addClass("disabled");
	});
	
	$('#shopforoverlayarea .changebtnarea .btn').on('click', function(){
		if (!$(this).hasClass("disabled"))
		{
			if ($('#shopforoverlayarea .contextarea .shopforpersonal').hasClass("selected"))
			{
				$('.acctsum .acctInfos p.shopforinfo').html("Personal");
			}
			else if ($('#shopforoverlayarea .contextarea .shopforbusiness').hasClass("selected"))
			{
				companyname= $('#shopforoverlayarea .contextarea .shopforbusiness .companynameinputarea input').val();
				$('.acctsum .acctInfos p.shopforinfo').html('Business -&nbsp;<span class="shopforcompany">' + companyname + '</span>');
			}
			$('#shopforoverlayarea').css("display","none");
			$('.acctsum_reveal-modal-bg').css("display","none");
		}
	});
	
	$('#shopforoverlayarea .contextarea .shopforbusiness .companynameinputarea input').on("input",function(e){
		if ($(this).val()=="")
		{
			$('#shopforoverlayarea .changebtnarea .btn').addClass("disabled");
		}
		else
		{
			$('#shopforoverlayarea .changebtnarea .btn').removeClass("disabled");
		}
	});
	
});

$(document).ready(function(){
	if (document.documentElement.clientWidth < 801)
	{
		$(".myaccount.editaddress .userinfoinputarea #nicknameinput").attr("placeholder","*Nick name (eg. Home)");
		$(".myaccount.editaddress .userinfoinputarea #firstnameinput").attr("placeholder","*First name");
		$(".myaccount.editaddress .userinfoinputarea #lastnameinput").attr("placeholder","*Last name");
		if($("#smbFlag").val()=='B'){
		$(".myaccount.editaddress .userinfoinputarea #companyinput").attr("placeholder","*Company");
		}else{
		$(".myaccount.editaddress .userinfoinputarea #companyinput").attr("placeholder","Company");	
		}
		$(".myaccount.editaddress .userinfoinputarea #address1input").attr("placeholder","*Address");
		$(".myaccount.editaddress .userinfoinputarea #address2input").attr("placeholder","Apt #, suite, floor, etc.");
		$(".myaccount.editaddress .userinfoinputarea #cityinput").attr("placeholder","*City");
		$(".myaccount.editaddress .userinfoinputarea #zipcodeinput").attr("placeholder","*ZIP code");
		$(".myaccount.editaddress .userinfoinputarea #phone1").removeClass("require_field");
		$(".myaccount.editaddress .userinfoinputarea #phone2").removeClass("require_field");
		$(".myaccount.editaddress .userinfoinputarea #phone3").removeClass("require_field");
		$(".myaccount.editaddress .userinfoinputarea #phone_mobile_input").addClass("require_field");
		$(".myaccount.editaddress .userinfoinputarea #phone_mobile_input").attr("placeholder","*Phone number");
		$(".myaccount.editaddress .userinfoinputarea .extn-section input").attr("placeholder","Ext");
	}
	else
	{
		$(".myaccount.editaddress .userinfoinputarea #nicknameinput").attr("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea #firstnameinput").attr("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea #lastnameinput").attr("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea #companyinput").attr("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea #address1input").attr("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea #address2input").attr("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea #cityinput").attr("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea #zipcodeinput").attr("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea #phone1").addClass("require_field");
		$(".myaccount.editaddress .userinfoinputarea #phone2").addClass("require_field");
		$(".myaccount.editaddress .userinfoinputarea #phone3").addClass("require_field");
		$(".myaccount.editaddress .userinfoinputarea #phone_mobile_input").removeClass("require_field");
		$(".myaccount.editaddress .userinfoinputarea #phone_mobile_input").addClass("placeholder","");
		$(".myaccount.editaddress .userinfoinputarea .extn-section input").attr("placeholder","");
	}
	
	$(window).resize(function(){
		if (document.documentElement.clientWidth < 801)
		{
			$(".myaccount.editaddress .userinfoinputarea #nicknameinput").attr("placeholder","*Nick name (eg. Home)");
			$(".myaccount.editaddress .userinfoinputarea #firstnameinput").attr("placeholder","*First name");
			$(".myaccount.editaddress .userinfoinputarea #lastnameinput").attr("placeholder","*Last name");
			if($("#smbFlag").val()=='B'){
			$(".myaccount.editaddress .userinfoinputarea #companyinput").attr("placeholder","*Company");
			}else{
			$(".myaccount.editaddress .userinfoinputarea #companyinput").attr("placeholder","Company");	
			}
			$(".myaccount.editaddress .userinfoinputarea #address1input").attr("placeholder","*Address");
			$(".myaccount.editaddress .userinfoinputarea #address2input").attr("placeholder","Apt #, suite, floor, etc.");
			$(".myaccount.editaddress .userinfoinputarea #cityinput").attr("placeholder","*City");
			$(".myaccount.editaddress .userinfoinputarea #zipcodeinput").attr("placeholder","*ZIP code");
			$(".myaccount.editaddress .userinfoinputarea #phone1").removeClass("require_field");
			$(".myaccount.editaddress .userinfoinputarea #phone2").removeClass("require_field");
			$(".myaccount.editaddress .userinfoinputarea #phone3").removeClass("require_field");
			$(".myaccount.editaddress .userinfoinputarea #phone_mobile_input").addClass("require_field");
			$(".myaccount.editaddress .userinfoinputarea #phone_mobile_input").attr("placeholder","*Phone number");
			$(".myaccount.editaddress .userinfoinputarea .extn-section input").attr("placeholder","Ext");
		}
		else
		{
			$(".myaccount.editaddress .userinfoinputarea #nicknameinput").attr("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea #firstnameinput").attr("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea #lastnameinput").attr("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea #companyinput").attr("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea #address1input").attr("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea #address2input").attr("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea #cityinput").attr("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea #zipcodeinput").attr("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea #phone1").addClass("require_field");
			$(".myaccount.editaddress .userinfoinputarea #phone2").addClass("require_field");
			$(".myaccount.editaddress .userinfoinputarea #phone3").addClass("require_field");
			$(".myaccount.editaddress .userinfoinputarea #phone_mobile_input").removeClass("require_field");
			$(".myaccount.editaddress .userinfoinputarea #phone_mobile_input").addClass("placeholder","");
			$(".myaccount.editaddress .userinfoinputarea .extn-section input").attr("placeholder","");
		}
	});
});

$(document).ready(function(){
	if (document.documentElement.clientWidth < 801)
	{
		$('.managePrinters .addprinters .btnBlock .btn').addClass("disabled");
	}
	else
	{
		$('.managePrinters .addprinters .btnBlock .btn').removeClass("disabled");	
	}
	

	$('.managePrinters .addprinters .large-12.step1area select').change(function() {
		if (document.documentElement.clientWidth < 801)
		{
			var dropdownValue=($('.managePrinters .addprinters .large-12.step1area select option:selected').val()); 
			if(dropdownValue == 'select')
			{
				$('.managePrinters .addprinters .large-12.step2area').css("display","none");
				$('.managePrinters .addprinters .large-12.step3area').css("display","none");
				$('.managePrinters .addprinters .btnBlock .btn').addClass("disabled");
			}
			else 
			{
				$('.managePrinters .addprinters .large-12.step2area').css("display","block");
				var dropdown2Value=($('.managePrinters .addprinters .large-12.step2area select option:selected').val()); 
				if(dropdown2Value == 'select')
				{
					$('.managePrinters .addprinters .large-12.step3area').css("display","none");
					$('.managePrinters .addprinters .btnBlock .btn').addClass("disabled");
				}
				else 
				{
					$('.managePrinters .addprinters .large-12.step3area').css("display","block");
				}
			}
		}
	});
	
	$('.managePrinters .addprinters .large-12.step2area select').change(function() {
		if (document.documentElement.clientWidth < 801)
		{
			var dropdownValue=($('.managePrinters .addprinters .large-12.step2area select option:selected').val()); 
			if(dropdownValue == 'select')
			{
				$('.managePrinters .addprinters .large-12.step3area').css("display","none");
				$('.managePrinters .addprinters .btnBlock .btn').addClass("disabled");
			}
			else 
			{
				$('.managePrinters .addprinters .large-12.step3area').css("display","block");
			}
		}
	});
	
	$('.managePrinters .addprinters .large-12.step3area select').change(function() {
		if (document.documentElement.clientWidth < 801)
		{
			var dropdownValue=($('.managePrinters .addprinters .large-12.step3area select option:selected').val()); 
			if(dropdownValue == 'select')
			{
				$('.managePrinters .addprinters .btnBlock .btn').addClass("disabled");
			}
			else 
			{
				$('.managePrinters .addprinters .btnBlock .btn').removeClass("disabled");
			}
		}
	});
	
	$(window).resize(function(){
		if (document.documentElement.clientWidth < 801)
		{
			var dropdown1Value=($('.managePrinters .addprinters .large-12.step1area select option:selected').val()); 
			if(dropdown1Value == 'select')
			{
				$('.managePrinters .addprinters .large-12.step2area').css("display","none");
				$('.managePrinters .addprinters .large-12.step3area').css("display","none");
				$('.managePrinters .addprinters .btnBlock .btn').addClass("disabled");
			}
			else 
			{
				$('.managePrinters .addprinters .large-12.step2area').css("display","block");
				var dropdown2Value=($('.managePrinters .addprinters .large-12.step2area select option:selected').val()); 
				if(dropdown2Value == 'select')
				{
					$('.managePrinters .addprinters .large-12.step3area').css("display","none");
					$('.managePrinters .addprinters .btnBlock .btn').addClass("disabled");
				}
				else 
				{
					$('.managePrinters .addprinters .large-12.step3area').css("display","block");
				}
			}
			
			var dropdown2Value=($('.managePrinters .addprinters .large-12.step2area select option:selected').val()); 
			if(dropdown2Value == 'select')
			{
				$('.managePrinters .addprinters .large-12.step3area').css("display","none");
				$('.managePrinters .addprinters .btnBlock .btn').addClass("disabled");
			}
			else 
			{
				$('.managePrinters .addprinters .large-12.step3area').css("display","block");
			}
		}
		else
		{
			$('.managePrinters .addprinters .large-12.step1area').css("display","block");
			$('.managePrinters .addprinters .large-12.step2area').css("display","block");
			$('.managePrinters .addprinters .large-12.step3area').css("display","block");
			$('.managePrinters .addprinters .btnBlock .btn').removeClass("disabled");
		}
	});
});


$(document).ready(function(){
	if (document.documentElement.clientWidth < 801)
	{
		$(".myaccountRight.changepersonalInfo .newemail").attr("placeholder","*New email address");
		$(".myaccountRight.changepersonalInfo .confirmnewemail").attr("placeholder","*Confirm new email address");
		$(".myaccountRight.changepersonalInfo .password").attr("placeholder","*Password");
		$(".myaccountRight.changepersonalInfo .oldpassword").attr("placeholder","*Old password");
		$(".myaccountRight.changepersonalInfo .newpassword").attr("placeholder","*New password");
		$(".myaccountRight.changepersonalInfo .confirmnewpassword").attr("placeholder","*Confirm new password");
		$(".myaccountRight.changepersonalInfo .firstnameinput").attr("placeholder","*First name");
		$(".myaccountRight.changepersonalInfo .lastnameinput").attr("placeholder","*Last name");
		$(".myaccountRight.changepersonalInfo .address1input").attr("placeholder","*Address");
		if($("#smbFlag").val()=='B'){
		$(".myaccountRight.changepersonalInfo .companyinput").attr("placeholder","*Company");
		}else{
		$(".myaccountRight.changepersonalInfo .companyinput").attr("placeholder","Company");	
		}
		$(".myaccountRight.changepersonalInfo .address2input").attr("placeholder","Apt#, suite, floor, etc");
		$(".myaccountRight.changepersonalInfo .phoneinput").attr("placeholder","*Phone Number");
		$(".myaccountRight.changepersonalInfo .cityinput").attr("placeholder","*City");
		$(".myaccountRight.changepersonalInfo .zipinput").attr("placeholder","*Zip code");
	}
	else
	{
		$(".myaccountRight.changepersonalInfo .newemail").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .confirmnewemail").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .password").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .oldpassword").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .newpassword").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .confirmnewpassword").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .firstnameinput").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .lastnameinput").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .address1input").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .companyinput").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .address2input").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .phoneinput").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .cityinput").attr("placeholder","");
		$(".myaccountRight.changepersonalInfo .zipinput").attr("placeholder","");
	}
	
	$(window).resize(function(){
		if (document.documentElement.clientWidth < 801)
		{
			$(".myaccountRight.changepersonalInfo .newemail").attr("placeholder","*New email address");
			$(".myaccountRight.changepersonalInfo .confirmnewemail").attr("placeholder","*Confirm new email address");
			$(".myaccountRight.changepersonalInfo .password").attr("placeholder","*Password");
			$(".myaccountRight.changepersonalInfo .oldpassword").attr("placeholder","*Old password");
			$(".myaccountRight.changepersonalInfo .newpassword").attr("placeholder","*New password");
			$(".myaccountRight.changepersonalInfo .confirmnewpassword").attr("placeholder","*Confirm new password");
			$(".myaccountRight.changepersonalInfo .firstnameinput").attr("placeholder","*First name");
			$(".myaccountRight.changepersonalInfo .lastnameinput").attr("placeholder","*Last name");
			$(".myaccountRight.changepersonalInfo .address1input").attr("placeholder","*Address");
			if($("#smbFlag").val()=='B'){
			$(".myaccountRight.changepersonalInfo .companyinput").attr("placeholder","*Company");
			}else{
			$(".myaccountRight.changepersonalInfo .companyinput").attr("placeholder","Company");	
			}
			$(".myaccountRight.changepersonalInfo .address2input").attr("placeholder","Apt#, suite, floor, etc");
			$(".myaccountRight.changepersonalInfo .phoneinput").attr("placeholder","*Phone Number");
			$(".myaccountRight.changepersonalInfo .cityinput").attr("placeholder","*City");
			$(".myaccountRight.changepersonalInfo .zipinput").attr("placeholder","*Zip code");
		}
		else
		{
			$(".myaccountRight.changepersonalInfo .newemail").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .confirmnewemail").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .password").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .oldpassword").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .newpassword").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .confirmnewpassword").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .firstnameinput").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .lastnameinput").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .address1input").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .companyinput").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .address2input").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .phoneinput").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .cityinput").attr("placeholder","");
			$(".myaccountRight.changepersonalInfo .zipinput").attr("placeholder","");
		}
	});
});

$('#referEmailInput').keyup(function () {	
	if($('#referEmailInput').length != 0){
		$('.inputEmail label').text('');
	}
});
function myAccountDeviceClick(){
	 accountDeviceClick();
}

function mySubscriptionGekkoLeftNavClick(){
	mySubscriptionLeftNavClick();
}

function mySubscriptionGekkoTopNavClick(){
	mySubscriptionTopNavClick();
}
