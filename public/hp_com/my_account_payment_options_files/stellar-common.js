 function fnOverlay(getAction){
    if(getAction == "open"){		
      $(".guxReskin-overlay-mask").show();
      $(".guxReskin-overlay").show();
      $("body").addClass('modal-is-open');
	   if(!isMobile() && !isTab()) {
		/*	var	$html = $(document.documentElement);
			$html.css('overflow', 'hidden');
		*/
		   if($('#gux_reskin_addressbook_modal').length > 0)
			   {
			   $(window).scrollTop($('#gux_reskin_addressbook_modal').offset().top - 150);
			   }
		}
	  
    }else if(getAction == "close"){
      $(".guxReskin-overlay-mask").hide();
      $(".guxReskin-overlay").hide();
      $("body").removeClass('modal-is-open');
	 /* var	$html = $(document.documentElement);
			$html.css('overflow', '');
	 */
    }else if(getAction == 'setdefcc'){
    	MyAccountDisplay.makeCCDefault(curPid);
    	setTimeout(function() {
			$('#defCardSetMsg').removeClass('hidden');
		}, 1000);
    }
  }
  
  function isMobile() {
		var isMobileDevice = window.matchMedia("only screen and (max-width: 760px)");
		return isMobileDevice.matches;
	}

	function  isTab() {
		var isTabDevice = window.matchMedia("only screen and (max-width: 1024px)");
		return isTabDevice.matches;
	}
 
  $(document).ready(function(){
    $(".sTextInputWrapper").on('mouseover',function(){
        $(this).find("input").focus();
    });

    $(".sTextInputWrapper input[type=text], .sTextInputWrapper input[type=tel]").on('focus',function(){
        $(this).siblings("label").addClass("hover");
    });
    
    $(".sTextInputWrapper").on('mouseout',function(){
        $(this).find("input").trigger('blur');
    });

    $(".sTextInputWrapper input[type=text], .sTextInputWrapper input[type=tel]").on('blur',function(){
      if($(this).val() == ""){
        $(this).siblings("label").removeClass("hover");
      }
    });

    $(".sTextInputWrapper.readOnly").on('mouseover focusIn mouseout focusOut',function(){
      $(this).find("label").addClass("hover");
      $(this).find("input").show().attr('readonly','readonly');
    });

    $(".sTextInputWrapper.disabled").on('mouseover focusIn mouseout focusOut',function(){
      $(this).find("label").addClass("hover");
      $(this).find("input").hide();
    });

    $(".sRadioButtonWrapper label").on('keypress',function(evt){
      if(evt.keyCode == 13){
        $(this).trigger("click");
      }
    });

  });
  
  