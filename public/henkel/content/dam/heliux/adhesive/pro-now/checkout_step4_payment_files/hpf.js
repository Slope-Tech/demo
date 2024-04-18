// Version 1.39
// added preHandlerProcess()
// added cbOverride var for startProcess switch
// added logic to detect if cancel button exists before adjusting it's state
// added logic to doComplete function to only send one ajax request per tracerID/sessionId
/*-----------------------------------------------------------------------------------------------------------
|                                           G L O B A L S                                                   |
============================================================================================================*/
var tracerId = 0;
var callbackHTML = "";
var sessionCookie = '';
var loadingDiv;
var sendCheck = '';
var isUID = false;
var uidName = '';
var uidAllowedTypes = 'Visa|Mastercard';
var tdsApproved = '0';
var uIDTrans = '0';
var pmEnabled = false;
var messageLogEnabled = true;
var messageRouter;
var storeOnly;
var profileId;
var logData = {
  canceled: false,
  completed: false,
  errors: false,
  exceptions: false,
  logGroupId: 'init',
  sid: 'init',
  messages:[]
};
// These added 2024-02-22 because a 500 error on hpf index.php causes the js to retry every 100ms forever, which will slam our server if it ever happens in prod
var initFailures = 0;
var maxInitFailures = 20;

fullURL = window.location + '';
var currentLocation = fullURL.split( "?" )[ 0 ];

/*-----------------------------------------------------------------------------------------------------------
|                              C R E   S E C U R E   F U N C T I O N S                                     |
============================================================================================================*/

function doComplete(uIDTrans, tdsApproved) {
    hideErrorSpan('errorAboveName');
    hideErrorSpan('errorBelowName');
    hideErrorSpan('errorAboveCCType');
    hideErrorSpan('errorBelowCCType');
    hideErrorSpan('errorAboveNumber');
    hideErrorSpan('errorBelowNumber');
    hideErrorSpan('errorAboveCVV');
    hideErrorSpan('errorBelowCVV');
    hideErrorSpan('errorAboveExpiration');
    hideErrorSpan('errorBelowExpiration');
    hideErrorSpan('errorAboveAmount');
    hideErrorSpan('errorBelowAmount');
    hideErrorSpan('errorAboveAddress1');
    hideErrorSpan('errorBelowAddress1');
    hideErrorSpan('errorAboveCity');
    hideErrorSpan('errorBelowCity');
    hideErrorSpan('errorAboveState');
    hideErrorSpan('errorBelowState');
    hideErrorSpan('errorAboveZip');
    hideErrorSpan('errorBelowZip');
    hideErrorSpan('errorAboveCountry');
    hideErrorSpan('errorBelowCountry');

  var usingPaymentToken = (document.getElementById('paymentToken') != null) ? true : false;

  if (tdsApproved != '1' &&  usingPaymentToken === false) {
    var errorCode = validateFields();
    if ( errorCode != "" ) {
      showLoadingDiv();
      
      if (pmEnabled) {
        var errorData = {
          errorCode: errorCode.split(errorCodeDelimiter),
          delimiter: errorCodeDelimiter
        };
        
        messageRouter.send('handlePaymentErrors', errorData, function(handleErrorsResponse) {
          logData.errors = true;
          logData.messages.push({
            subject: 'handlePaymentErrors',
            timestamp: Date().toString(),
            response: handleErrorsResponse,
            error: errorCode
          });
          if (messageLogEnabled) {
            Ajax.send('/hpf/1_1/clientLog.php', {
              method: 'POST',
              contentType: 'application/json',
              data: Ajax.stringify(logData)
            });
          }
        });
        
        hideLoadingDiv(); //TODO: For some reason buttons get re-enabled in the callbackHTML flow but not the PM flow, so explicitly re-enabling here.
      } else {
        document.getElementById('callbackFrame').src = callbackHTML + "?errorCode=" + errorCode + "&rurl=" + currentLocation + "&profileId=" + profileId;
      }
      
      return;
    }
  }

  doProcessStart();

  var postRequest = new ajaxRequest( );
  postRequest.onreadystatechange = function ( ) {
    if (postRequest.readyState == 4) {

      var validResponse = true;
      try {
        responseObject = JSON.parse(postRequest.responseText);
      } catch (e) {
        validResponse = false;
      }

      if (validResponse && (postRequest.status == 200 || window.location.href.indexOf("http") == -1)) {
        var isFirst = true;
        var paramString = '';
        for (parm in responseObject) {
          if (parm == 'xStatus') continue;
          if (isFirst) {
            paramString = paramString + '?';
            isFirst = false;
          } else {
            paramString = paramString + '&';
          }

          if (parm == 'errorCode' && errorCodeDelimiter != '|') {
            responseObject[parm] = (responseObject[parm] + '').replace('|', errorCodeDelimiter);
          }

          paramString = paramString + parm + '=' + responseObject[parm];

          if (parm == 'errorCode') {
            // Prevent hangup when re-submitting a uid transaction after error
            if (sendCheck == Form2QueryString('theForm')) {
              sendCheck = '';
            }

            var errorCodes = (responseObject[parm] + '').split(errorCodeDelimiter);
            for (var idx = 0; idx < errorCodes.length; ++idx) {
              switch (errorCodes[idx]) {
                case '200':
                  showErrorSpan('errorAboveName');
                  showErrorSpan('errorBelowName');
                  break;
                case '320':
                  showErrorSpan('errorAboveCCType');
                  showErrorSpan('errorBelowCCType');
                  break;
                case '310':
                case '315':
                  showErrorSpan('errorAboveNumber');
                  showErrorSpan('errorBelowNumber');
                  break;
                case '355':
                case '357':
                  showErrorSpan('errorAboveCVV');
                  showErrorSpan('errorBelowCVV');
                  break;
                case '330':
                case '340':
                case '370':
                  showErrorSpan('errorAboveExpiration');
                  showErrorSpan('errorBelowExpiration');
                  break;
                case '300':
                  showErrorSpan('errorAboveAmount');
                  showErrorSpan('errorBelowAmount');
                  break;
                case '500':
                  showErrorSpan('errorAboveAddress1');
                  showErrorSpan('errorBelowAddress1');
                  break;
                case '510':
                  showErrorSpan('errorAboveCity');
                  showErrorSpan('errorBelowCity');
                  break;
                case '520':
                  showErrorSpan('errorAboveState');
                  showErrorSpan('errorBelowState');
                  break;
                case '530':
                case '540':
                  showErrorSpan('errorAboveZip');
                  showErrorSpan('errorBelowZip');
                  break;
                case '550':
                  showErrorSpan('errorAboveCountry');
                  showErrorSpan('errorBelowCountry');
                  break;
              }
            }
          }
        }

        if (responseObject.xStatus == "0") {
          errorCode = responseObject.errorCode;
          gatewayCode = responseObject.gatewayCode;
          gatewayMessage = responseObject.gatewayMessage;

          // Do not re-enable buttons if max retries exceeded (errorCode 365)
          if ((errorCode == "") || (errorCode == undefined) || (errorCode == "365")) {

            setCompleteStatus();
            hideLoadingDiv();

            if (tdsApproved != '1') {
              var tdsecure = responseObject.tdsecure;
              if (tdsecure == 'redirect') {
                var tdsurl = responseObject.tdsurl;
                window.location.href = tdsurl;
                return;
              }
            }

            //var uID = (querySt( 'uID' ));
            //if (uID != "" && uID != null) paramString = '?code=000&message=Success&uID=' + uID;

            //clearTimeout( tracerId );
          } else if (typeof mtcaptcha != 'undefined') {
            // Captcha cannot be verified more than once so refresh it on error
            mtcaptcha.resetUI();
          }
          
          if (pmEnabled) {
            if (errorCode) {

              var errorData = {
                errorCode: errorCodes,
                delimiter: errorCodeDelimiter,
                gatewayCode: gatewayCode,
                gatewayMessage: gatewayMessage
              };

              messageRouter.send('handlePaymentErrors', errorData, function (handleErrorsResponse) {
                logData.errors = true;
                logData.messages.push({
                  subject: 'handlePaymentErrors',
                  timestamp: Date().toString(),
                  response: handleErrorsResponse,
                  error: errorCode
                });
                if (messageLogEnabled) {
                  Ajax.send('/hpf/1_1/clientLog.php', {
                    method: 'POST',
                    contentType: 'application/json',
                    data: Ajax.stringify(logData)
                  });
                }
              });
              hideLoadingDiv(); //TODO: For some reason buttons get re-enabled in the callbackHTML flow but not the PM flow, so explicitly re-enabling here.

            } else {

              messageRouter.send('completePayment', responseObject, function (completeResponse) {
                logData.completed = true;
                logData.messages.push({
                  subject: 'completePayment',
                  timestamp: Date().toString(),
                  response: completeResponse
                });
                if (messageLogEnabled) {
                  Ajax.send('/hpf/1_1/clientLog.php', {
                    method: 'POST',
                    contentType: 'application/json',
                    data: Ajax.stringify(logData)
                  });
                }
              });

            }
          } else {
            document.getElementById('callbackFrame').src = callbackHTML + paramString + "&rurl=" + currentLocation + "&profileId=" + profileId;
          }
        } else {
          completeButton.disabled = false;
          if (cancelButton != undefined) cancelButton.disabled = false;
          alert("An error has occured processing this card");
        }
      } else {
        completeButton.disabled = false;
        if (cancelButton != undefined) cancelButton.disabled = false;
        alert("An error has occured making the request");
      }
    }
  }
  
  showLoadingDiv();
  if (sendCheck != Form2QueryString( 'theForm' )) {
    postRequest.open( "POST", "iframeprocessor.php", true );
    postRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
    postRequest.setRequestHeader( "Cache-Control", "no-cache" );
    sendCheck = Form2QueryString( 'theForm' );
    postRequest.send( sendCheck + "&action=process&" + sessionCookie );
  }
  
}

function doPreHandlerProcess() {

  var preProcessRequest = new ajaxRequest( );

  preProcessRequest.onreadystatechange = function ( ) {
   if ( preProcessRequest.readyState == 4 ) {

    var validResponse = true;
    try {
      responseObject = JSON.parse(preProcessRequest.responseText);
    } catch(e) {
      validResponse = false;
    }

    if (validResponse && (preProcessRequest.status == 200 || window.location.href.indexOf( "http" ) == -1 )) {
      //responseObject = eval( "(" + preProcessRequest.responseText + ")" );
      if ( responseObject.xStatus == "0" ) {

       errorCode = responseObject.errorCode;
       gatewayCode = responseObject.gatewayCode;
       gatewayMessage = responseObject.gatewayMessage;
       preProcessResult = responseObject.action;

       var isFirst = true;
       var paramString = '';
       for (parm in responseObject) {
         if (parm == 'xStatus') continue;
         if (isFirst) {
           paramString = paramString + '?';
           isFirst = false;
         } else {
           paramString = paramString + '&';
         }
         paramString = paramString + parm + '=' + responseObject[parm];
       }



       //alert('result: ' + preProcessResult);

       if( ( errorCode == "" ) || ( errorCode == undefined ) ) {
         if ( ( preProcessResult != null ) && ( preProcessResult.length > 0 ) ) {
           if (preProcessResult == 'duplicate') {

             setCompleteStatus();
             hideLoadingDiv();
             if (pmEnabled) {
               messageRouter.send('prehandlerProcess', paramString + '&rurl=' + currentLocation, function(prehandlerResponse) {
                 //TODO: Log acknowledgement/response
               });
             } else {
               document.getElementById('callbackFrame').src = callbackHTML + paramString + "&rurl=" + currentLocation + "&profileId=" + profileId;
             }

               clearTimeout( tracerId );
           }
         } else {
           return true;
         }

       } else {
         buttons = responseObject.buttons;
         if (buttons == 'disable') {
           setCompleteStatus();
           hideLoadingDiv();
         }
         if (pmEnabled) {
           messageRouter.send('prehandlerError', paramString + '&rurl=' + currentLocation, function(prehandlerErrorResponse) {
             //TODO: Log acknowledgment/response
           });
         } else {
           document.getElementById('callbackFrame').src = callbackHTML + paramString + "&rurl=" + currentLocation + "&profileId=" + profileId;
         }
         clearTimeout( tracerId );
       }


      }
    }
   }
  };
  showLoadingDiv();
  preProcessRequest.open( "POST", "iframeprocessor.php", true );
  preProcessRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
  preProcessRequest.setRequestHeader( "Cache-Control", "no-cache" );
  preProcessRequest.send( "action=preHandlerProcess&" + sessionCookie );
}

function doCancel(type, errorData) {
 var postRequest = new ajaxRequest( );

 if (type == undefined) type = '1';
 if (type == '2') {
   alert(amountInvalidText);
 }

 showLoadingDiv();
 setCompleteStatus();
 if (pmEnabled) {
   messageRouter.send('cancelPayment', type, function(cancelResponse) {
     logData.canceled = true;
     logData.messages.push({
       subject: 'cancelPayment',
       timestamp: Date().toString(),
       response: cancelResponse
     });
   });

   if (messageLogEnabled) {
     Ajax.send('/hpf/1_1/clientLog.php', {
       method: 'POST',
       contentType: 'application/json',
       data: Ajax.stringify(logData)
     });
   }
   
 } else {
   document.getElementById('callbackFrame').src = callbackHTML + "?cancel=" + type + "&rurl=" + currentLocation + "&profileId=" + profileId;
 }
 clearTimeout( tracerId );

 postRequest.open( "POST", "iframeprocessor.php", true );
 postRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
 postRequest.send( "action=cancelCRE&" + sessionCookie );
}

function lookupBankName() {
 routingNumber = document.getElementById( "routing_number" ).value;
 if( routingNumber.length == 8 || ABAMod10( routingNumber ) ) {
  var bankNameRequest = new ajaxRequest( );
  bankNameRequest.onreadystatechange = function ( ) {
   if ( bankNameRequest.readyState == 4 ) {
    if ( bankNameRequest.status == 200 || window.location.href.indexOf( "http" ) == -1 ) {
     responseObject = eval( "(" + bankNameRequest.responseText + ")" );
     bankName = responseObject.bank_name;
     if( ( bankName != null ) && ( bankName.length > 0 ) ) {
      document.getElementById( "bank_name" ).value = bankName;
     }
    }
   }
  }

  bankNameRequest.open( "POST", "../../securepayments/rc.php?action=getBankName&routing_number=" + routingNumber, true );
  bankNameRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
  bankNameRequest.send( "action=tracer&" + sessionCookie );
 }
}

function updateStateDropDown(htmlCode) {
    var elem = document.getElementById( "creProvinceState" );
    if (elem == null) {
        elem = document.getElementById( "hpsProvinceState" );
    }
    
    elem.innerHTML = htmlCode;
}

function getCountryZones() {
  var countryCode = document.getElementById('country').value;
  var countryZonesRequest = new ajaxRequest( );
  countryZonesRequest.onreadystatechange = function ( ) {
    if ( countryZonesRequest.readyState == 4 ) {
      if ( countryZonesRequest.status == 200 || window.location.href.indexOf( "http" ) == -1 ) {
        try {
          responseObject = JSON.parse(countryZonesRequest.responseText);
          if (responseObject.length > 0) {
            listItems = '';
            for (var i=0; i<responseObject.length; i++) {
              var selected = (responseObject[i][0] == sessState) ? 'selected="selected"' : '';
              listItems += "<option value=\'" + responseObject[i][0] + "\' " + selected + ">" + responseObject[i][1] + "</option>";
            }
            updateStateDropDown('<select id="state" name="state" class="creStateField">' + listItems + '</select>');
          } else {
            updateStateDropDown('<input id="state" name="state" class="creStateField" type="text">');
          }
        } catch (e) {
          updateStateDropDown('<input id="state" name="state" class="creStateField" type="text">');
        }
      }
    }
  };

  countryZonesRequest.open( "POST", "../../securepayments/rpc.php?val=" + countryCode, true );
  countryZonesRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
  countryZonesRequest.send( "action=tracer&" + sessionCookie );
}

function doProcessStart ( ) {
 //showLoadingDiv();
  var cbOverride = document.getElementById( 'cbOverride' ).value;
  if (pmEnabled) {
    messageRouter.send('startPayment', cbOverride, function(processStartResponse) {
      //TODO: Log acknowledgment/response
    });
  } else if (cbOverride == 1) {
    document.getElementById( 'callbackFrame' ).src = callbackHTML + "?processStart=1&rurl=" + currentLocation + "&profileId=" + profileId;
  }
}

function cvv2What ( ) {
  if (pmEnabled) {
    messageRouter.send('whatsThis', 'cvv', function(cvvWhatResponse) {
      //TODO: Log ack/response
    });
  } else {
    document.getElementById( 'callbackFrame' ).src = callbackHTML + "?whatCVV2=1&whatsThis=cvv&rurl=" + currentLocation + "&profileId=" + profileId;
  }
}

function routingWhat ( ) {
  if (pmEnabled) {
    messageRouter.send('whatsThis', 'routing', function(routingWhatResponse) {
      //TODO: Log ack/response
    });
  } else {
    document.getElementById( 'callbackFrame' ).src = callbackHTML + "?whatsThis=routing&rurl=" + currentLocation + "&profileId=" + profileId;
  }
}

function accountWhat ( ) {
  if (pmEnabled) {
    messageRouter.send('whatsThis', 'account', function(accountWhatResponse) {
      //TODO: Log ack/response
    });
  } else {
    document.getElementById( 'callbackFrame' ).src = callbackHTML + "?whatsThis=account&rurl=" + currentLocation + "&profileId=" + profileId;
  }
}

/*-----------------------------------------------------------------------------------------------------------
|                                       T R A C E R   F U N C T I O N S                                     |
============================================================================================================*/

function doTracer( )
{
 var tracerRequest = new ajaxRequest( );
 tracerRequest.onreadystatechange = function ( )
 {
  if ( tracerRequest.readyState == 4 )
  {
   if ( tracerRequest.status == 200 || window.location.href.indexOf( "http" ) == -1 )
   {
    tracerResponse = tracerRequest.responseText;
    if ( tracerResponse.length > 11 )
    {
     alert( 'The Tracer is the incorrect length.' );
    }
    document.getElementById( 'tracer' ).value = tracerResponse;
    tracerId = setTimeout( "doTracer()", 10000 );
   }
   else
   {
    // alert( "An error has occured finding the tracer." );
    tracerId = setTimeout( "doTracer()", 100 );
   }
  }
 };

 tracerRequest.open( "POST", "iframeprocessor.php", true );
 tracerRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
 tracerRequest.send( "action=tracer&" + sessionCookie );
}

function init()
{
  var initRequest = new ajaxRequest( );
  initRequest.onreadystatechange = function ( )
  {
    if ( initRequest.readyState == 4 )
    {
      if ( initRequest.status == 200 || window.location.href.indexOf( "http" ) == -1 )
      {
        responseObject = eval( "(" + initRequest.responseText + ")" );
        callbackHTML = responseObject.callbackHTML;
        profileId = responseObject.profileId;
        document.getElementById( 'tracer' ).value = responseObject.tracer;
        tracerId = setTimeout( "doTracer()", 10000 );

        uidName = responseObject.name;
        uidAllowedTypes = responseObject.allowed_types;

        hideLoadingDiv();
      }
      else
      {
        // alert( "An error has occured initalizing the service." );
        initFailures++;
        if (initFailures <= maxInitFailures) {
            tracerId = setTimeout( "init()", 100 );
        }
      }
    }
  };

  initRequest.open( "POST", "iframeprocessor.php", true );
  initRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
  initRequest.setRequestHeader( "Cache-Control", "no-cache" );
  initRequest.send( "action=init&" + sessionCookie );
  
  // Initialize Captcha
  if ( typeof mtcaptchaConfig != 'undefined' && document.getElementsByClassName('mtcaptcha').length > 0 ) {
    var mt_service = document.createElement('script');
    mt_service.async = true;
    mt_service.src = 'https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js';
    document.getElementsByTagName('body')[0].appendChild(mt_service);
    var mt_service2 = document.createElement('script');
    mt_service2.async = true;
    mt_service2.src = 'https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js';
    document.getElementsByTagName('body')[0].appendChild(mt_service2);
  }
 
  // Setup for PostMessage based implementations
  if ( typeof window.postMessage == 'function' ) {

    messageRouter = new MessageRouter({
      target: window.top,
      origin: '*'
    });

    // Init PostMessaging
    //TODO: Potential race condition with loading parent?
    messageRouter.send('init', '', function (parentStatus, msgEvent) {
    
      // Restrict messages to those originating from the parent page on init response
      var parentOrigin = msgEvent.origin;
      messageRouter.setOption('origin', msgEvent.origin);
      messageRouter.setOption('validator', function (msgEvent) {
        return msgEvent.origin == parentOrigin;
      });
    
      // Setup scroll listener to relay scroll events if the parent has a handler for it
      if (parentStatus.callbacks && parentStatus.callbacks.scrollRelay) {
        var scrollActive = false;
        var scrollHandler = function (scrollX, scrollY) {
        
          // Make sure scroll handler is not still busy with a previous event
          if (!scrollActive) {
          
            // Send scroll coordinates to the parent page
            messageRouter.send('scrollRelay', {scrollX: scrollX, scrollY: scrollY}, function () {
            
              // Mark scroll handler ready for a new event
              scrollActive = false;
            
            });
          
            // Mark scroll handler busy
            scrollActive = true;
          
          }
        
        };
      
        // Subscribe to scroll events
        window.addEventListener('scroll', function (evt) {
          scrollHandler(window.scrollX, window.scrollY);
        });
      }
    
      // Set to use PostMessage based implementation
      pmEnabled = true;
    
      // Log init response
      logData.messages.push({
        subject: 'init',
        timestamp: Date().toString(),
        response: parentStatus
      });

    
      Ajax.send('/hpf/1_1/clientLog.php', {
        method: 'POST',
        contentType: 'application/json',
        data: Ajax.stringify(logData),
        onSuccess: function (response) {
          // Store logGroupId for future log requests
          logData.logGroupId = response.logGroupId;
        
          // Logging Switch
          if (response.disableLogging) {
            messageLogEnabled = false;
          }
        }
      });
    
    });
  }
  
}

function isDecimal (s) {
  // Checks that an input string is a decimal number, with an optional +/- sign character.
  var isDecimal_re = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
  return String(s).search (isDecimal_re) != -1;
}


function formatAmount()
{
 // No need to format if amount is not displayed
 if (document.getElementById('amountDisplay') == null) {
   return;
 }

 if (document.getElementById('amountDisplay').value > '') {
   amount = document.getElementById('amountDisplay').value.replace(/[^0-9.]/g, '');
 } else {
   amount = document.getElementById('amount').value;
 }

 // Validate and format amount if not a storeOnly transaction
 if (!(isDecimal(amount))) {
   if (storeOnly) {
     amount = 0.00;
   } else {
     doCancel('2');
   }
 }

 currencyCode = querySt( 'currency_code' );
 if ( ! currencyCode) {
     currencyCode = document.getElementById( 'currency_code' ).value;
 }

 num = amount.toString().replace(/\$|\,/g,'');
 if( isNaN( num ) )
 {
  num = "0";
 }

 sign = ( num == ( num = Math.abs( num ) ) );
 num = Math.floor( num * 100+0.50000000001 );
 cents = num % 100;
 num = Math.floor( num / 100 ).toString();
 if(cents<10)
 {
  cents = "0" + cents;
 }
 for ( var i = 0; i < Math.floor(( num.length - ( 1 + i ) ) / 3 ); i++ )
 {
  num = num.substring( 0, num.length-(4*i+3))+ ',' + num.substring( num.length - ( 4 * i + 3 ) );
 }

 amountValue = (((sign)?'':'-') + num + '.' + cents);

  if (currencyCode == null || currencyCode == '') currencyCode = 'USD';

  switch (currencyCode) {
    case 'USD':
    case 'CAD':
    case 'NZD':
    case 'HKD':
    case 'MXN':
      amountValue = currencyCode + ' $' + amountValue;
      break;

    case 'EUR':
      amountValue = String.fromCharCode(0x20AC) + amountValue;
      break;

    case 'GBP':
      amountValue = String.fromCharCode(0xa3) + amountValue;
      break;

    case 'JPY':
    case 'CNY':
      amountValue = currencyCode + ' ' + String.fromCharCode(0xA5) + amountValue;
      break;

    case 'CHF':
      amountValue = 'CHF ' + amountValue;
      break;

    default:
      amountValue = currencyCode + ' ' + amountValue;
  }

 document.getElementById( 'amountDisplay' ).value = amountValue;
}

function getCardType(number) {
  var re = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
  if (number.match(re) != null)
      return "Visa";

  re = new RegExp("^(5[1-5]|2[2-7])[0-9]{14}$");
  if (number.match(re) != null)
      return "Mastercard";

  re = new RegExp("^3[47][0-9]{13}$");
  if (number.match(re) != null)
      return "American Express";

  re = new RegExp("^6(?:011|5[0-9]{2})[0-9]{12}$");
  if (number.match(re) != null)
      return "Discover";

  re = new RegExp(/^(?:2131|1800|35\d{3})\d{11}$/);
  if (number.match(re) != null)
      return "JCB";

  re = new RegExp("^3(?:0[0-5]|[68][0-9])[0-9]{11}$");
  if (number.match(re) != null)
      return "Diners Club";

  re = new RegExp("^[2014|2149]\d{11}$");
  if (number.match(re) != null)
      return "Enroute";

  re = new RegExp("^[2014|2149]\d{11}$");
  if (number.match(re) != null)
      return "Enroute";

  re = new RegExp("^(4903|4911|4936|5641|6333|6759|6334|6767)\d{12}$");
  if (number.match(re) != null)
      return "Switch";

  re = new RegExp("^6045901{9}$");
  if (number.match(re) != null)
      return "LCC";

  re = new RegExp("^6045903{9}$");
  if (number.match(re) != null)
      return "LBA";

  return "Unknown";
}

/*-----------------------------------------------------------------------------------------------------------
|                                      F I E L D   V A L I D A T I O N                                      |
============================================================================================================*/

function showErrorSpan(spanName) {
    var elem = document.getElementById( spanName );
    if (elem) {
        elem.className = elem.className.replace(/\bhideInlineError\b/, 'showInlineError');
    }
}
function hideErrorSpan(spanName) {
    var elem = document.getElementById( spanName );
    if (elem) {
        elem.className = elem.className.replace(/\bshowInlineError\b/, 'hideInlineError');
    }
}

function validateFields() {
  var validationLevel = 10; // default required is null
  var requireAllParameter = (querySt( 'required' )) ? querySt( 'required' ) : document.getElementById( 'required' ).value;
  var accidentalPAN = false;

  if( requireAllParameter == 'minimum' ) {
    validationLevel = 0;
  } else if(requireAllParameter == 'all') { // required=all
    validationLevel = 20;
  }

  var errors = "";
  if( document.getElementById( 'ccType' ) != null ) {
    // Check Name for blank or no alpha characters.
    if( ( ! /[a-zA-Z]+/.test(document.getElementById( 'name' ).value) ) && ( validationLevel > 0 ) ) {
        errors += "200" + errorCodeDelimiter;
        showErrorSpan('errorAboveName');
        showErrorSpan('errorBelowName');
    } else {
        // removing spaces from the field and validating for accidental PAN entry
        if( /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'name' ).value.replace(/\s/g, ""))) {
            accidentalPAN = true;
        }
    }

    // Check CC Number for blank. Optionally check for CVV2
    var typeSelected = document.getElementById( 'ccType' ).value;
    if (typeSelected != 'pinless') {
    var cvv2 = document.getElementById( 'CVV2' ).value;
    if(( cvv2 == "" ) && ( validationLevel > 10 ) ) {
      errors += "355" + errorCodeDelimiter;
      showErrorSpan('errorAboveCVV');
      showErrorSpan('errorBelowCVV');
    } else if ( (!(checkCVV(cvv2))) && ( validationLevel > 10  || cvv2 != "" ) ) {
      errors += "357" + errorCodeDelimiter;
      showErrorSpan('errorAboveCVV');
      showErrorSpan('errorBelowCVV');
    }
    }

    var ccNum = scrubCCNumber( document.getElementById( 'ccNumber' ).value );
    var allowedTypes = allowedTypes = 'Visa|Mastercard';
    if (isUID) {
      // Ensure that the default allowedTypes is not blanked out if they didn't pass something in
      if (typeof(uidAllowedTypes) == 'string' && uidAllowedTypes.length > 0) {
        allowedTypes = uidAllowedTypes;
      }
    } else {
      // Ensure that the default allowedTypes is not blanked out if they didn't pass something in
      var qtypes = querySt( 'allowed_types' );
      if (typeof(qtypes) == 'string' && qtypes.length > 0) {
        allowedTypes = qtypes;
      }
    }

    // Replace ccNumber with scrubbed version
    document.getElementById('ccNumber').value = ccNum;

    // fix for differences in spelling
    if (allowedTypes.indexOf('American+Express') != -1) allowedTypes = allowedTypes + '|American Express';
    if (allowedTypes.indexOf('AmericanExpress') != -1) allowedTypes = allowedTypes + '|American Express';
    if (allowedTypes.indexOf('Amex') != -1) allowedTypes = allowedTypes + '|American Express';
    if (allowedTypes.indexOf('AmEx') != -1) allowedTypes = allowedTypes + '|American Express';
    if (allowedTypes.indexOf('MasterCard') != -1) allowedTypes = allowedTypes + '|Mastercard';
    if (allowedTypes.indexOf('Master Card') != -1) allowedTypes = allowedTypes + '|Mastercard';
    if (allowedTypes.indexOf('Master card') != -1) allowedTypes = allowedTypes + '|Mastercard';
    if (allowedTypes.indexOf('Diners') != -1) allowedTypes = allowedTypes + '|Diners Club';
    if (allowedTypes.indexOf('Diners+Club') != -1) allowedTypes = allowedTypes + '|Diners Club';
    if ((allowedTypes.indexOf('GSA+SmartPay') != -1 || allowedTypes.indexOf('GSA SmartPay') != -1 || allowedTypes.indexOf('GSASmartPay') != -1) && allowedTypes.indexOf('Visa') == -1) allowedTypes = allowedTypes + '|Visa';

    var typeSelected = document.getElementById( 'ccType' ).value;
    var ccBrand = getCardType(ccNum);
    var paymentType = querySt('payment_type');
    if(paymentType === null)
      paymentType = 'PINLESS';

    if( document.getElementById( 'ccNumber' ).value == "" ) {
      errors += "310" + errorCodeDelimiter;
      showErrorSpan('errorAboveNumber');
      showErrorSpan('errorBelowNumber');
    } else if(paymentType != 'PINLESS' && paymentType != 'DEBITFIRST' && paymentType != 'DEBITCREDIT' && !mod10( ccNum ) ) {
      errors += "315" + errorCodeDelimiter;
      showErrorSpan('errorAboveNumber');
      showErrorSpan('errorBelowNumber');
    } else if (paymentType != 'PINLESS' && paymentType != 'DEBITFIRST' && paymentType != 'DEBITCREDIT' && allowedTypes.indexOf(ccBrand) == -1) {
      errors += "320" + errorCodeDelimiter;
      showErrorSpan('errorAboveCCType');
      showErrorSpan('errorBelowCCType');
    }

    // Check the expiration date and month are in the future
    var year = document.getElementById( 'expYear' ).value;
    var month = document.getElementById( 'expMonth' ).value;
    if( ! validateDate( month, year ) ) {
        errors += "370" + errorCodeDelimiter;
        showErrorSpan('errorAboveExpiration');
        showErrorSpan('errorBelowExpiration');
    }
  } else if ( document.getElementById( 'bank_name' ) != null ) {
    if( ! /[a-zA-Z]+/.test(document.getElementById( 'name' ).value) ) {
        errors += "200" + errorCodeDelimiter;
        showErrorSpan('errorAboveName');
        showErrorSpan('errorBelowName');
    }
    if(( document.getElementById( 'bank_name' ).value == "" ) && ( validationLevel > 10 ) ) errors += "600" + errorCodeDelimiter;
    if( document.getElementById( 'routing_number' ).value == "" ) errors += "610" + errorCodeDelimiter;

    var accountNumber = scrubCCNumber( document.getElementById( 'account_number' ).value );
    var routingNumber = scrubCCNumber( document.getElementById( 'routing_number' ).value );
    var accountType = document.getElementById( 'account_type' ).value;
    if( document.getElementById( 'account_number' ).value == "" ) {
      errors += "620" + errorCodeDelimiter;
    } else if( accountType == "1" ) {
    } else if( routingNumber.length == 9 && ! ABAMod10( routingNumber ) ) {
      errors += "640" + errorCodeDelimiter;
    }
  }
  // Nacha Authorization
  if( document.getElementById( 'nacha_authorization' ) != null && document.getElementById( 'nacha_authorization' ).checked !== true ) {
    errors += "650" + errorCodeDelimiter;
  }

  // If the form has address collection, insure that the fields are filled
  // zip is used for collectAddress=1 and collectAddress=3, postal_code for collectAddress=2
  if( document.getElementById( 'zip' ) != null ) {

    // Only validate if not collectAddress=3 (Zip only)
    if (document.getElementById('address') != null) {
      if( document.getElementById( 'address' ).value == "" ) {
        errors += "500" + errorCodeDelimiter;
        showErrorSpan('errorAboveAddress1');
        showErrorSpan('errorBelowAddress1');
      } else {
          if( /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'address' ).value.replace(/\s/g, ""))) {
              accidentalPAN = true;
          }
      }
      // Checking accidental PAN entry in address 2 field if it's not empty
      if( document.getElementById( 'address2' ).value > "" && /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'address2' ).value.replace(/\s/g, "")) ) {
          accidentalPAN = true;
      }
      if( document.getElementById( 'city' ).value == "" ) {
        errors += "510" + errorCodeDelimiter;
        showErrorSpan('errorAboveCity');
        showErrorSpan('errorBelowCity');
      } else {
          if( /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'city' ).value.replace(/\s/g, "")) ) {
              accidentalPAN = true;
          }
      }
      if( document.getElementById( 'state' ).value == "" ) {
        errors += "520" + errorCodeDelimiter;
        showErrorSpan('errorAboveState');
        showErrorSpan('errorBelowState');
      } else {
          if( /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'state' ).value.replace(/\s/g, "")) ) {
              accidentalPAN = true;
          }
      }
    }

    if( document.getElementById( 'zip' ).value == "" ) {
      errors += "530" + errorCodeDelimiter;
      showErrorSpan('errorAboveZip');
      showErrorSpan('errorBelowZip');
    } else {
        if( /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'zip' ).value.replace(/\s/g, "")) ) {
            accidentalPAN = true;
        }
    }

  } else if ( document.getElementById( 'postal_code' ) != null ) {

    if( document.getElementById( 'address' ).value == "" ) {
      errors += "500" + errorCodeDelimiter;
      showErrorSpan('errorAboveAddress1');
      showErrorSpan('errorBelowAddress1');
    } else {
        if( /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'address' ).value.replace(/\s/g, "")) ) {
            accidentalPAN = true;
        }
    }
    // Checking accidental PAN entry in address 2 field if it's not empty
    if( document.getElementById( 'address2' ).value > "" && /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'address2' ).value.replace(/\s/g, "")) ) {
        accidentalPAN = true;
    }
    if( document.getElementById( 'city' ).value == "" ) {
      errors += "510" + errorCodeDelimiter;
      showErrorSpan('errorAboveCity');
      showErrorSpan('errorBelowCity');
    } else {
        if( /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'city' ).value.replace(/\s/g, "")) ) {
            accidentalPAN = true;
        }
    }
    if (document.getElementById( 'country' ).value == 'US' ||
        document.getElementById( 'country' ).value == 'CA' ||
        document.getElementById( 'country' ).value == 'UK') {
      if( document.getElementById( 'postal_code' ).value == "" ) {
        errors += "530" + errorCodeDelimiter;
        showErrorSpan('errorAboveZip');
        showErrorSpan('errorBelowZip');
      }
    }
    if( document.getElementById( 'country' ).value == "" ) {
      errors += "550" + errorCodeDelimiter;
      showErrorSpan('errorAboveCountry');
      showErrorSpan('errorBelowCountry');
    }

    if( document.getElementById( 'state' ).value > "" && /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'state' ).value.replace(/\s/g, "")) ) {
        accidentalPAN = true;
    }

    if(document.getElementById( 'postal_code' ).value > "" && /(^|[^0-9])[0-9]{13,19}([^0-9]|$)/.test(document.getElementById( 'postal_code' ).value.replace(/\s/g, "")) ) {
        accidentalPAN = true;
    }

  }

  // checking if there's accidental PAN entry in any non CC field
  if(accidentalPAN === true) {
      errors += "250" + errorCodeDelimiter;
  }
  
  // Trigger captcha required message if captcha is used and not entered
  if ( typeof mtcaptcha != 'undefined' && mtcaptcha.getVerifiedToken() == "" ) {
    errors += '380' + errorCodeDelimiter;
    mtcaptcha.showMandatory();
  }

  return errors;
}

function checkCVV(cvvCode) {
  var regExp = new RegExp("[0-9]{3,4}");
  return (regExp.test(cvvCode))
}

/*-----------------------------------------------------------------------------------------------------------
|                                     L I B R A R Y   F U N C T I O N S                                     |
============================================================================================================*/

function ajaxRequest ( ) {
 sessionCookie = 'sid=' + document.getElementById( 'sid' ).value;
 var activexmodes = [ "Msxml2.XMLHTTP.4.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP" ] // For ActiveX
 if ( window.ActiveXObject ) {
  // Test for support for ActiveXObject in IE first (as XMLHttpRequest in
  // IE7 is broken)
  for ( var i = 0; i < activexmodes.length; i++ ) {
   try {
    obj = new ActiveXObject( activexmodes [ i ] );
    if ( obj ) {
     return obj;
    }
   } catch ( e ) {
     //silent
   }
  }
 } else if ( window.XMLHttpRequest ) { // if Mozilla, Safari etc
  return new XMLHttpRequest( );
 } else {
  return false;
 }
}

function Form2QueryString ( formname ) {
  var theform = document.forms [ formname ];
  var PostText = "";
  var amp = "";
  for ( i = 0; i < theform.elements.length; i++ ) {
    fieldName = theform.elements [ i ].name;
    if ( fieldName == '' ) {
      fieldName = theform.elements [ i ].id;
    }
    if ( theform.elements [ i ].type == "text"
      || theform.elements [ i ].type == "tel"
      || theform.elements [ i ].type == "textarea"
      || theform.elements [ i ].type == "hidden" ) {
      PostText += amp + fieldName + "=" + urlEncodeLatin1( theform.elements [ i ].value );
    } else if ( theform.elements [ i ].type == "checkbox" ) {
      PostText += amp + fieldName + "=" + theform.elements [ i ].checked;
    } else if ( theform.elements [ i ].type == "select-one" ) {
      PostText += amp + fieldName + "=" + theform.elements [ i ].options [ theform.elements [ i ].selectedIndex ].value;
    }

    amp = "&";
  }

  return PostText;
}

function querySt ( ji ) {
  hu = window.location.search.substring( 1 );
  gy = hu.split( "&" );
  for ( i = 0; i < gy.length; i++ ) {
    ft = gy [ i ].split( "=" );
    if ( ft [ 0 ] == ji ) {
      fixed = fixedEncodeURIComponent(ft [ 1 ]);
      return decodeURIComponent( fixed );
    }
  }
  return null;
}

function fixedEncodeURIComponent (str) {
  return str.replace(/%C0/g, '%C3%80')
            .replace(/%C1/g, '%C3%81')
            .replace(/%C2/g, '%C3%82')
            .replace(/%E0/g, '%C3%A0')
            .replace(/%E1/g, '%C3%A0')
            .replace(/%E2/g, '%C3%A1')
            .replace(/%C8/g, '%C3%88')
            .replace(/%C9/g, '%C3%89')
            .replace(/%CA/g, '%C3%8A')
            .replace(/%E8/g, '%C3%A8')
            .replace(/%E9/g, '%C3%A9')
            .replace(/%EA/g, '%C3%AA')
            .replace(/%CC/g, '%C3%8C')
            .replace(/%CD/g, '%C3%8D')
            .replace(/%CE/g, '%C3%8E')
            .replace(/%EC/g, '%C3%AC')
            .replace(/%ED/g, '%C3%AD')
            .replace(/%EE/g, '%C3%AE')
            .replace(/%D2/g, '%C3%92')
            .replace(/%D3/g, '%C3%93')
            .replace(/%D4/g, '%C3%94')
            .replace(/%F2/g, '%C3%B2')
            .replace(/%F3/g, '%C3%B3')
            .replace(/%F4/g, '%C3%B4')
            .replace(/%D9/g, '%C3%99')
            .replace(/%DA/g, '%C3%9A')
            .replace(/%DB/g, '%C3%9B')
            .replace(/%F9/g, '%C3%B9')
            .replace(/%FA/g, '%C3%BA')
            .replace(/%FB/g, '%C3%BB');
}

function setParameters() {
  sessionId = querySt( 'sessionId' );
  userId = querySt( 'userId' );
  uID = querySt( 'uID' );

  var theform = document.forms [ 'theForm' ];
  var tdsApproved = false;
  var skip = false;
  var skippedFields = ["ccNumber", "country", "state", "amount"];
  for ( j = 0; j < theform.elements.length; j++ ) {
    fieldName = theform.elements [ j ].name;
    if ( fieldName == '' ) {
      fieldName = theform.elements [ j ].id;
    }
    if ( querySt( fieldName ) != null ) {
      skip = false;
      for (var i in skippedFields) {
        if (fieldName == skippedFields[i]) {
          skip = true
        }
      }
      if (!skip) {
        theform.elements [ j ].value = querySt( fieldName ).replace(/\+/g, ' ');
      }
    }

    // populate payform for 3D Secure return
    if ( fieldName == 'uIDTrans' ) uIDTrans = theform.elements [ j ].value;
    if ( fieldName == 'tdsApproved' && theform.elements [ j ].value == '1') tdsApproved = '1';
    if ( fieldName == 'tdsName' ) document.getElementById( 'name' ).value = theform.elements [ j ].value;
    if ( fieldName == 'tdsPAN' ) document.getElementById( 'ccNumber' ).value = theform.elements [ j ].value;
    if ( fieldName == 'tdsCVV2' ) document.getElementById( 'CVV2' ).value = theform.elements [ j ].value;
    if ( fieldName == 'tdsType' ) document.getElementById( 'ccType' ).value = theform.elements [ j ].value;
    if ( fieldName == 'tdsExpMonth' ) document.getElementById( 'expMonth' ).value = theform.elements [ j ].value;
    if ( fieldName == 'tdsExpYear' ) document.getElementById( 'expYear' ).value = theform.elements [ j ].value;

  }
  
  logData.sid = document.getElementById('sid').value;

  init();

  // Format display amount
  formatAmount();
  if (document.getElementById('amountDisplay') != null) {
    document.getElementById('amountDisplay').onchange = function () {
      formatAmount();
    };
  }

  if (tdsApproved == '1') {
    doComplete(uIDTrans, tdsApproved);
    return false;
  }

  if (uID == "" || uID == null) {
    isUID = false;
    setParametersProcess( );
  } else {
    isUID = true;
    setTimeout("setParametersProcess( )", 1000);
  }
}

function setParametersProcess( ) {
  if (document.getElementById( 'ccType' )) {
    if (document.getElementById( 'ccType' ).value != 'pinless') {
      setAllowedTypes();
    }
  }

  if (document.getElementById('name')) {
    if (( document.getElementById( 'name' ).value == null ) || ( document.getElementById( 'name' ).value == "" )) {
      document.getElementById( 'name' ).value = (!!uidName) ? uidName : '';
    }
  }

  if (document.getElementById('CCSubmitText')) {
    completeText = document.getElementById('CCSubmitText').value;
  }

  /* preHandlerProcess */
  doPreHandlerProcess();

  hideLoadingDiv();
}

function setAllowedTypes() {

  if (( document.getElementById('ccType') == null ) || ( document.getElementById('ccType') == 'undefined' )) {
    return;
  }

  if (isUID) {
    allowedTypes = uidAllowedTypes;
  } else {
    allowedTypes = querySt('allowed_types');
  }

  if (( allowedTypes ) && ( allowedTypes != "null" ) && ( allowedTypes != "" ) && ( allowedTypes != null )) {
    var allowedTypesField = document.getElementById('ccType');
    if (allowedTypesField && allowedTypesField.tagName === 'SELECT') {
      do
      {
        allowedTypesField.remove(0);
      } while (allowedTypesField.length > 0);

      if (allowedTypes.indexOf("Visa") != -1) {
        addOptionToCardTypes('Visa', 'Visa');
      }

      if (allowedTypes.indexOf("CUP") != -1) {
        addOptionToCardTypes('China UnionPay', 'CUP');
      }

      if (allowedTypes.indexOf("MasterCard") != -1 ||
          allowedTypes.indexOf("Mastercard") != -1 ||
          allowedTypes.indexOf("Master Card") != -1 ||
          allowedTypes.indexOf("Master card") != -1
      ) {
        addOptionToCardTypes('Mastercard', 'Mastercard');
      }

      if (allowedTypes.indexOf("American Express") != -1 ||
          allowedTypes.indexOf("American+Express") != -1 ||
          allowedTypes.indexOf("AmericanExpress") != -1 ||
          allowedTypes.indexOf("AmEx") != -1 ||
          allowedTypes.indexOf("Amex") != -1
      ) {
        addOptionToCardTypes('American Express', 'American Express');
      }

      if (allowedTypes.indexOf("Discover") != -1) {
        addOptionToCardTypes('Discover', 'Discover');
      }

      if (allowedTypes.indexOf("JCB") != -1) {
        addOptionToCardTypes('JCB', 'JCB');
      }

      if (allowedTypes.indexOf("Diners") != -1 ||
          allowedTypes.indexOf("Diners Club") != -1 ||
          allowedTypes.indexOf("Diners+Club") != -1
      ) {
        addOptionToCardTypes('Diners Club', 'Diners Club');
      }

      if (allowedTypes.indexOf("GSA SmartPay") != -1 ||
          allowedTypes.indexOf("GSA+SmartPay") != -1 ||
          allowedTypes.indexOf("GSASmartPay") != -1
      ) {
        addOptionToCardTypes('GSA SmartPay', 'GSA SmartPay');
      }

      if (allowedTypes.indexOf("LCC") != -1) {
        addOptionToCardTypes('Lowes Consumer Card', 'LCC');
      }

      if (allowedTypes.indexOf("LBA") != -1) {
        addOptionToCardTypes('Lowes Business Account', 'LBA');
      }
    }
  }
}

function addOptionToCardTypes( text, value )
{
 var allowedTypesField = document.getElementById( 'ccType' );
 var newOption = document.createElement( 'option' );
 newOption.text = text;
 newOption.value = value;

 try
 {
  allowedTypesField.add( newOption, null );
 }
 catch( ex )
 {
  allowedTypesField.add( newOption );
 }
}

function hideLoadingDiv() {

  completeStatusElement = $( 'completeStatus' );

  if( completeStatusElement != 'undefined' ) {
    completeStatus = ( completeStatusElement.value == '1' );
    completeButton = getObjectByClass( 'completeButton' )[ 0 ];
    cancelButton = getObjectByClass( 'cancelButton' )[ 0 ];
    if( completeStatus == false ) {
      loadingDiv = document.getElementById( 'loadingDiv' );
      loadingDiv.style.display='none';
      completeButton.disabled = false;
      if (cancelButton != undefined) cancelButton.disabled = false;
      changeButtonText( completeButton, completeText );
      completeButton.className = "completeButton";
      if (cancelButton != undefined)
          cancelButton.className = "cancelButton";
    } else {
        changeButtonText( completeButton, finishedText );
        completeButton.className = "completeButton finishedCompleteButton";
      if (cancelButton != undefined) cancelButton.className = "cancelButton disabled";
      completeButton.disabled = true;
      if (cancelButton != undefined) cancelButton.disabled = true;
    }

  }


}

function showLoadingDiv() {
  completeButton = getObjectByClass( 'completeButton' )[ 0 ];
  cancelButton = getObjectByClass( 'cancelButton' )[ 0 ];
  if (completeButton != undefined) {
    completeButton.disabled = true;
    if (cancelButton != undefined) cancelButton.disabled = true;
    changeButtonText(completeButton, processingText);
    completeButton.className = "completeButton processingCompleteButton";
    if (cancelButton != undefined) cancelButton.className = "cancelButton disabled";

  }

}

function setCompleteStatus() {
  completeStatusElement = $( 'completeStatus' );
  if( completeStatusElement != 'undefined' ) {
    completeStatusElement.value = "1";
  }
}

function getObjectByClass( className )
{
 if (document.getElementsByClassName == undefined)
 {
  var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
  var allElements = document.getElementsByTagName("*");
  var results = [];

  var element;
  for (var i = 0; (element = allElements[i]) != null; i++) {
   var elementClass = element.className;
   if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
    results.push(element);
  }

  return results;
 }
 else
 {
  return document.getElementsByClassName( className );
 }
}

function changeButtonText( theButton, text)
{
 if (theButton)
 {
  if (theButton.childNodes[0])
  {
   if (theButton.childNodes[0].nodeValue != null) {
     theButton.childNodes[0].nodeValue=text;
   } else {
     theButton.childNodes[0].innerHTML=text;
   }
  }
  else if (theButton.value)
  {
   theButton.value=theButton.value;
  }
  else //if (button.innerHTML)
  {
   theButton.innerHTML=text;
  }
 }
}

function $(e)
{
 return document.getElementById(e);
}

function validateDate( month, year )
{
 var thisMonth = new Date();
 thisMonth.setDate( 1 );
 thisMonth.setHours( 0 );
 thisMonth.setMinutes( 0 );
 thisMonth.setSeconds( 0 );

 var expDate = new Date();
 expDate.setDate( 1 );
 expDate.setMonth( month - 1 );
 expDate.setYear( year );
 expDate.setHours( 0 );
 expDate.setMinutes( 0 );
 expDate.setSeconds( 0 );

 var before = expDate < thisMonth;
 return !before;
}

function scrubCCNumber( input )
{
 var valid = "0123456789"  // Valid digits in a credit card number
 var len = input.length;
 var returnString = "";
 for (var j=0; j<len; j++)
 {
  temp = "" + input.substring(j, j+1);
  if ( valid.indexOf( temp ) != "-1")
  {
   returnString = returnString + temp;
  }
 }

 return returnString;
}

function mod10( ccNumb )
{
 var valid = "0123456789";  // Valid digits in a credit card number
 var len = ccNumb.length;  // The length of the submitted cc number
 var iCCN = parseInt(ccNumb);  // integer of ccNumb
 var sCCN = ccNumb.toString();  // string of ccNumb
 sCCN = sCCN.replace (/^s+|s+$/g,'');  // strip spaces
 var iTotal = 0;  // integer total set at zero
 var bNum = true;  // by default assume it is a number
 var bResult = false;  // by default assume it is NOT a valid cc
 var temp;  // temp variable for parsing string
 var calc;  // used for calculation of each digit

 if( len == 0 )
 {
  return false;
 }

 // Determine if the ccNumb is in fact all numbers
 for (var j=0; j<len; j++)
 {
  temp = "" + sCCN.substring(j, j+1);
  if ( valid.indexOf( temp ) == "-1")
  {
   return false;
  }
 }

 for( var i=len; i > 0; i-- )
 {
  // LOOP throught the digits of the card
  calc = parseInt( iCCN ) % 10;      // right most digit
  calc = parseInt( calc );       // assure it is an integer
  iTotal += calc;         // running total of the card number as we loop - Do Nothing to first digit
  i--;            // decrement the count - move to the next digit in the card
  iCCN = iCCN / 10;                          // subtracts right most digit from ccNumb
  calc = parseInt(iCCN) % 10 ;       // NEXT right most digit
  calc = calc *2;        // multiply the digit by two

  // Instead of some screwy method of converting 16 to a string and then parsing 1 and 6 and then adding them to make 7,
  // I use a simple switch statement to change the value of calc2 to 7 if 16 is the multiple.

  switch( calc )
  {
  case 10: calc = 1; break;       //5*2=10 & 1+0 = 1
  case 12: calc = 3; break;       //6*2=12 & 1+2 = 3
  case 14: calc = 5; break;       //7*2=14 & 1+4 = 5
  case 16: calc = 7; break;       //8*2=16 & 1+6 = 7
  case 18: calc = 9; break;       //9*2=18 & 1+8 = 9
  default: calc = calc;           //4*2= 8 &   8 = 8  -same for all lower numbers
  }

  iCCN = iCCN / 10;  // subtracts right most digit from ccNum
  iTotal += calc;  // running total of the card number as we loop
 }  // END OF LOOP

 return ( ( iTotal % 10 ) == 0 );
}

function ABAMod10( aba )
{
 var len = aba.length;

 if( len < 9 )
 {
  return false;
 }

 var sABA = aba.toString();
 var iTotal = 0;
 var bResult = false;
 for (var i=0; i<len; i += 3)
 {
  iTotal += parseInt(sABA.charAt(i), 10) * 3
   +  parseInt(sABA.charAt(i + 1), 10) * 7
   +  parseInt(sABA.charAt(i + 2), 10);
 }
 if (iTotal != 0 && iTotal % 10 == 0)
 {
  bResult = true;
 }
 else
 {
  bResult = false;
 }

 return bResult;
}

function urlEncodeLatin1(value) {
    return unescape(encodeURIComponent(escape(value)));
}

if ( window.addEventListener ) {

  // Allow submit/cancel from parent page
  window.addEventListener('hashchange', function() {
    var fragments = window.location.hash.split('#');
    if ( fragments.length >= 2 ) {
      switch ( fragments[1] ) {
        case 'submit':
          document.getElementById('completeButton').click();
          break;
        case 'cancel':
          document.getElementById('cancelButton').click();
          break;
        default:
          break;
      }
    }

  }, false);
  
  // Ensure log data is sent on unload
  window.addEventListener('beforeunload', function() {
    logData.messages.push({
      subject: 'unload',
      timestamp: Date().toString()
    });
    if (messageLogEnabled) {
      Ajax.send('/hpf/1_1/clientLog.php', {
        method: 'POST',
        contentType: 'application/json',
        data: Ajax.stringify(logData)
      });
    }
  });



}
