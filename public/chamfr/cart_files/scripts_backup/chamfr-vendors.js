( function( $ ) {
	var current_number = '';
	$('a.mark-order-shipped-confirm').on(
		'click',
		function (e) {
			current_number = $('#_wcv_tracking_number_' + $(this).data('ordernum')).val();
		}
	);

	$('a.tracking-change-show').on( 'click', function(e) {
		e.preventDefault();

		$('#tracking_order_details_' + $(this).data('ordernum') + ' .order_mark_shipped_wrapper').addClass('hide-all');
		$('#tracking_order_details_' + $(this).data('ordernum') + ' .order_changed_tracking_wrapper').removeClass('hide-all');

		return false;
	} );

	$('a.tracking-change-hide').on( 'click', function(e) {
		e.preventDefault();

		$('#tracking_order_details_' + $(this).data('ordernum') + ' .order_changed_tracking_wrapper').addClass('hide-all');
		$('#tracking_order_details_' + $(this).data('ordernum') + ' .order_mark_shipped_wrapper').removeClass('hide-all');

		return false;
	} );
	$('input.wcv_new_tracking_number').on('input',function(e){
		if ($(this).val() !== current_number) {
			$('#submit' + $(this).attr('id')).prop('disabled', false);
		} else {
			$('#submit' + $(this).attr('id')).prop('disabled', true);
		}
	});
} )( jQuery );
