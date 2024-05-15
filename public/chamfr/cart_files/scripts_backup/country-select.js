jQuery(document).ready(function($) {

    // wcms_country_select_params is required to continue, ensure the object exists
    if (typeof wcms_country_select_params === "undefined")
        return false;

    // Select2 Enhancement if it exists
    if ( $().select2 ) {
        var wc_country_select_select2 = function() {
            $( 'select.country_select:visible, select.state_select:visible' ).each( function() {
                var select2_args = {
                    minimumResultsForSearch: 10,
                    placeholder: $( this ).attr( 'placeholder' ),
                    placeholderOption: 'first',
                    width: 'element'
                };

                $( this ).select2( select2_args );
            });
        };

        wc_country_select_select2();

        $( 'body' ).bind( 'country_to_state_changed', function() {
            wc_country_select_select2();
        });
    }

    /* State/Country select boxes */
    var states_json = wcms_country_select_params.countries.replace(/&quot;/g, '"');
    var states = $.parseJSON( states_json );

    $('select.country_to_state, input.country_to_state').change(function(){
        var country = $(this).val();

        var $statebox = $(this).parents('div.address-column').find('#billing_state, #shipping_state, #calc_shipping_state');
        var $parent = $statebox.parent();

        var input_name = $statebox.attr('name');
        var input_id = $statebox.attr('id');
        var value = $statebox.val();
        placeholder = $statebox.attr( 'placeholder' ) || $statebox.attr( 'data-placeholder' ) || '';

        if (states[country]) {
            if (states[country].length == 0) {

                $statebox.parent().hide().find( '.select2-container' ).remove();
                $statebox.replaceWith('<input type="hidden" class="hidden" name="' + input_name + '" id="' + input_id + '" value="" placeholder="' + placeholder + '" />');

                $('body').trigger('country_to_state_changed', [country, $(this).closest('div')]);

            } else {

                var options = '';
                var state = states[country];
                for(var index in state) {
                    options = options + '<option value="' + index + '">' + state[index] + '</option>';
                }
                $statebox.parent().show();
                if ($statebox.is('input')) {
                    // Change for select
                    $statebox.replaceWith('<select name="' + input_name + '" id="' + input_id + '" class="state_select" placeholder="' + placeholder + '"></select>');
                    $statebox = $(this).closest('div').find('#billing_state, #shipping_state, #calc_shipping_state');
                }
                $statebox.html( '<option value="">' + wcms_country_select_params.i18n_select_state_text + '</option>' + options);

                $statebox.val(value);

                $('body').trigger('country_to_state_changed', [country, $(this).closest('div')]);

            }
        } else {
            if ($statebox.is('select')) {
                $parent.show().find( '.select2-container' ).remove();
                $statebox.replaceWith('<input type="text" class="input-text" name="' + input_name + '" id="' + input_id + '" placeholder="' + placeholder + '" />');

                $('body').trigger('country_to_state_changed', [country, $(this).closest('div')]);

            } else if ($statebox.is('.hidden')) {

                $parent.show().find( '.select2-container' ).remove();
                $statebox.replaceWith('<input type="text" class="input-text" name="' + input_name + '" id="' + input_id + '" placeholder="' + placeholder + '" />');

                $('body').trigger('country_to_state_changed', [country, $(this).closest('div')]);

            }
        }

        $('body').trigger('country_to_state_changing', [country, $(this).closest('div')]);

    });

    $('select.country_select').change();

});
