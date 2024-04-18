// hpf.js uses $ to implement an element id selector
$.noConflict();

jQuery(function( $ ) {

    // Override the text on the complete button when lang=en_US
    if ($("#lang").val() == 'en_US') {
        completeText = 'Submit';
    }

    // Set Tab Order
    $('#name').attr('tabindex', 1);
    $('#ccType').attr('tabindex', 2);
    $('#ccNumber').attr('tabindex', 3);
    $('#expMonth').attr('tabindex', 4);
    $('#expYear').attr('tabindex', 5);
    $('#CVV2').attr('tabindex', 6);
    $('#address').attr('tabindex', 7);
    $('#address2').attr('tabindex', 8);
    $('#country').attr('tabindex', 9);
    $('#state').attr('tabindex', 10);
    $('#city').attr('tabindex', 11);
    $('#postal_code').attr('tabindex', 12);
    $('#cancelButton').attr('tabindex', 13);
    $('#completeButton').attr('tabindex', 14);

    // Check if browser supports the input event
    var tempEl           = document.createElement('input');
    var onInputSupported = ('oninput' in tempEl);
    if (!onInputSupported) {
        tempEl.setAttribute('oninput', 'return;');
        onInputSupported = typeof( tempEl['oninput'] ) == 'function';
    }
    tempEl = null;

    // The input event is preferred over keypress and necessary for some android
    // devices which have dropped support for the keypress event. Since it's
    // not supported by IE8 or earlier we need to make special accommodations.
    if (onInputSupported) {

        // Only allow alphanumeric and space keys in the name field
        $('#name').on('input', function() {
            var value = $(this).val();
            $(this).val( value.replace(/[^a-zA-Z0-9 ]/g, '') );
        });

    } else {

        // Only allow alphanumeric and space keys on IE8
        $('#name').on('keypress', function( e ) {

            if (e.which >= 32) {
                var input        = String.fromCharCode( e.which );
                var allowedChars = new RegExp("^[a-zA-Z0-9 ]+$");
                if (!allowedChars.test( input )) {
                    e.preventDefault();
                }
            }

        }).on('paste', function() {

            // Filter pasted content
            var self = $(this);
            setTimeout(function() {
                var cleanTxt = self.val().replace(/[^a-zA-Z0-9 ]/g, '');
                self.val( cleanTxt );
            }, 0);

        });
        
    }

    // Ensure that the selected card type matches the entered card number
    $('#ccType, #ccNumber').change(function() {
        var cardType, hasOption;
        var typeSelector = $('#ccType');
        var cardNumber   = $('#ccNumber').val();
        var selectedType = typeSelector.val();

        // Check if both fields are completed
        if (selectedType && cardNumber.length > 0) {

            cardType  = getCardType( cardNumber );

            // Check if card types match
            if ( selectedType != cardType ) {

                // Check if card type is accepted
                hasOption = (typeSelector.find('option[value="' + cardType + '"]').length > 0);

                // Change the type selection if available, otherwise display the card type error
                if (hasOption) {
                    typeSelector.val( cardType );
                    hideErrorSpan('errorAboveCCType');
                    hideErrorSpan('errorBelowCCType');
                } else {
                    showErrorSpan('errorAboveCCType');
                    showErrorSpan('errorBelowCCType');
                }

            }

        }

    });

    // Validate fields on change
    var required = $('required').val();

    $('#name').change(function() {
        var value = $(this).val();
        if ( required != 'minimum' && !value.match(/[a-zA-Z]/) ) {
            showErrorSpan('errorAboveName');
            showErrorSpan('errorBelowName');
        } else {
            hideErrorSpan('errorAboveName');
            hideErrorSpan('errorBelowName');
        }
    });

    $('#ccNumber').change(function() {
        var cardType = getCardType( $(this).val() );
        if (cardType === 'Unknown') {
            showErrorSpan('errorAboveNumber');
            showErrorSpan('errorBelowNumber');
        } else {
            hideErrorSpan('errorAboveNumber');
            hideErrorSpan('errorBelowNumber');
        }
    });

    $('#CVV2').change(function() {
        var value = $(this).val();
        if ( value.length > 0 && !checkCVV( value ) ) {
            showErrorSpan('errorAboveCVV');
            showErrorSpan('errorBelowCVV');
        } else {
            hideErrorSpan('errorAboveCVV');
            hideErrorSpan('errorBelowCVV');
        }
    });

    $('#expMonth, #expYear').change(function() {
        var month = $('#expMonth').val();
        var year  = $('#expYear').val();
        if (!validateDate(month, year)) {
            showErrorSpan('errorAboveExpiration');
            showErrorSpan('errorBelowExpiration');
        } else {
            hideErrorSpan('errorAboveExpiration');
            hideErrorSpan('errorBelowExpiration');
        }
    });

    // Delegated to allow replacement of the state element with country changes
    $('#theForm').delegate('#address, #city, #state, #zip', 'change', function() {
        var id        = this.id;
        var errorName = (id === 'address') ? 'Address1' : id.charAt(0).toUpperCase() + id.substr(1);
        if ( $(this).val().length === 0 ) {
            showErrorSpan('errorAbove' + errorName);
            showErrorSpan('errorBelow' + errorName);
        } else {
            hideErrorSpan('errorAbove' + errorName);
            hideErrorSpan('errorBelow' + errorName);
        }
    });

    $('#postal_code').change(function() {
        var value   = $(this).val();
        var country = $('#country').val();
        var needed  = 'US|CA|UK';
        if ( needed.match( country ) && value.length === 0 ) {
            showErrorSpan('errorAboveZip');
            showErrorSpan('errorBelowZip');
        } else {
            hideErrorSpan('errorAboveZip');
            hideErrorSpan('errorBelowZip');
        }
    });

});
