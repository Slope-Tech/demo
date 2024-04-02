
var curPid="";

  function fnOpenMyModalScreen(getScreen){
    $(".myModalsOverlay .screens").css('display','none');
    $(".myModalsOverlay ." + getScreen).css('display','block');
    $(".myModalsOverlay .overlayTitle").focus();
  }
  
  function fnOverlay(getAction){
	  $('#defCardSetMsg').addClass('hidden');
	    if(getAction == "open"){
	    	$('.guxReskin-overlay-mask').css('display', 'flex');
	    	$('.guxReskin-overlay').toggle();
	    }else if(getAction == "close"){
	    	$('.guxReskin-overlay-mask').hide();
	    	$('.guxReskin-overlay').toggle();
	    }else if(getAction == 'setdefcc'){
	    	MyAccountDisplay.makeCCDefault(curPid);
	    	setTimeout(function() {
	    		$('#defCardSetMsg').removeClass('hidden');
				
			}, 1000);
	    	
	    	/*setTimeout(function() {
	    		$('#defCardSetMsg').addClass('hidden');
				
			}, 10000);*/
	    }
	  }
  
function fnMyDropdown(getAction){
    if(getAction == 'open'){
      if($('.sFilterOptions').is(":visible")){
        $(".sFilterOptions").hide();
        $(".sFilterSelectWrap").removeClass('active');
        $(".sFilterArrow img").attr('src','/wcsstore/HPStorefrontAssetStore/img/icon_chevron_down_dark.png');
        return;
      }
      $(".sFilterOptions").show();
//      $(".sFilterOptions div:first").focus();
      $(".sFilterSelectWrap").addClass('active').focus();
      $(".sFilterArrow img").attr('src','/wcsstore/HPStorefrontAssetStore/img/icon_chevron_up_dark.png');
    }else if(getAction == 'close'){
      $(".sFilterOptions").hide();
      $(".sFilterSelectWrap").removeClass('active').focus();
      $(".sFilterArrow img").attr('src','/wcsstore/HPStorefrontAssetStore/img/icon_chevron_down_dark.png');
    }
  }


  $(document).ready(function(){
   /* $(".lnkSetAsDefault").on('keydown click',function(ev){
      if(ev.type == "click" || (ev.type == "keydown" && ev.keyCode == 13)){
        fnOverlay('open');
        curPid=ev.target.parentElement.dataset.pid;
        fnOpenMyModalScreen('setAsDefault');
      }
    });*/

    /*$(".lnkDelete").on('keydown click',function(ev){
      if(ev.type == "click" || (ev.type == "keydown" && ev.keyCode == 13)){
        fnOverlay('open');
        $("#paymentId").val(ev.target.parentElement.dataset.pid);
        fnOpenMyModalScreen('confirmDelete');
      }
    });*/

    /*$(".lnkEdit").on('keydown click',function(ev){
      if(ev.type == "click" || (ev.type == "keydown" && ev.keyCode == 13)){
        fnOverlay('open');
        fnOpenMyModalScreen('confirmEdit');
      }
    });*/

	$('body').delegate(".mysaved-card.saved", {
		"keydown": function(ev) {
			if(!$(this).hasClass('subsOrdFlow')){
				$(".mysaved-card.saved").removeClass('active');
				$(this).addClass('active');
				}
		},	
		"click": function(ev) {
			if(!$(this).hasClass('subsOrdFlow')){
				$(".mysaved-card.saved").removeClass('active');
				$(this).addClass('active');
				}
		}
	});

    $(".lnkAddNewCard").on('keydown click',function(ev){
      if(ev.type == "click" || (ev.type == "keydown" && ev.keyCode == 13)){
        fnOverlay('open');
        fnOpenMyModalScreen('addNewCard');
      }
    });

    $(".sFilterSelectWrap").on('keydown click', function(ev){
      if(ev.type == "click" || (ev.type == "keydown" && ev.keyCode == 13)){
        fnMyDropdown('open');
      }
    });

    $(".sFilterOption").on('keydown click', function(ev){
      if(ev.type == "click" || (ev.type == "keydown" && ev.keyCode == 13)){
        $(".sFilterSelectedOption").text($(this).text());
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        $(".sFilterSelectWrap").focus();
        fnMyDropdown('close');
      }
    });
    
	$('#phone_mobile_input').keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        $text = $(this);
        if (key !== 8 && key !== 9) {
            if ($text.val().length === 3) {
                $text.val($text.val() + ' - ');
            }
            if ($text.val().length === 9) {
                $text.val($text.val() + ' - ');
            }
        }
        return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
    });

    $(".sFilterSelectWrap,.sFilterOption").on('keydown focus', function(ev){
      if(ev.type == "keydown" && ev.keyCode == 27){
        fnMyDropdown('close');
      }
    });
    
  });


  $(document).click(function(event) {
    $target = $(event.target);
    /*console.log($target);
    if(!$target.closest('.lnkSetAsDefault').length && !$target.closest('.lnkDelete').length && !$target.closest('.lnkEdit').length && !$target.closest('.lnkAddNewCard').length && !$target.closest('.overlayContent').length && $('.overlayContent').is(":visible")) {
      fnOverlay('close');
    }
    */
    
    
    if(!$target.closest('.sFilterSelectWrap').length && $('.sFilterOptions').is(":visible")) {
      $(".sFilterOptions").hide();
      $(".sFilterSelectWrap").removeClass('active');
      $(".sFilterArrow img").attr('src','commonFiles/images/icon_default_down.png');
    }    
  });
  


  $('body').delegate(".lnkSetAsDefault", {
	"keydown" : function(ev) {
		if (ev.keyCode == 13) {
			fnOverlay('open');
			curPid = ev.target.parentElement.dataset.pid;
			fnOpenMyModalScreen('setAsDefault');
		}
	},
	"click" : function(ev) {
		fnOverlay('open');
		curPid = ev.target.parentElement.dataset.pid;
		fnOpenMyModalScreen('setAsDefault');
	}
});

$('body').delegate(".lnkDelete", {
	"keydown" : function(ev) {
		if (ev.keyCode == 13) {
			fnOverlay('open');
			$("#paymentId").val(ev.target.parentElement.dataset.pid);
			fnOpenMyModalScreen('confirmDelete');
		}
	},
	"click" : function(ev) {
		fnOverlay('open');
		$("#paymentId").val(ev.target.parentElement.dataset.pid);
		fnOpenMyModalScreen('confirmDelete');
	}
});

$('body').delegate(".mysaved-card.saved.subsOrdFlow.valid", {
	"keydown": function(ev) {
		if(ev.target.parentElement.parentElement.className == 'mysaved-card__edits'){
			return;
		}
		ev.stopPropagation();
		$("#paymentId").val(ev.currentTarget.dataset.pid);
		if (ev.keyCode == 13) {
			fnOverlay('open');
	        fnOpenMyModalScreen('confirmEdit');
		}
	},	
	"click": function(ev) {
		if(ev.target.parentElement.parentElement.className == 'mysaved-card__edits'){
			return;
		}
		ev.stopPropagation();
		$("#paymentId").val(ev.currentTarget.dataset.pid);
		fnOverlay('open');
        fnOpenMyModalScreen('confirmEdit');
	}
});