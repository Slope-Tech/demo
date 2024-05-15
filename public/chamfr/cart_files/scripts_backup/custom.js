// Add datatables to product tables
function parseQuery( queryString ) {
	var query = {};
	var pairs = ( queryString[0] === '?'
			? queryString.substr( 1 )
			: queryString
	).split( '&' );
	for ( var i = 0; i < pairs.length; i++ ) {
		var pair = pairs[i].split( '=' );
		query[decodeURIComponent( pair[0] )] = decodeURIComponent(
			pair[1] || ''
		);
	}
	return query;
}

jQuery( document ).ready( function ( $ ) {


	if ( 'undefined' !== typeof window.pum_popups ) {
		var pumRendered = new Array();
		$.each( window.pum_popups, function ( popupId, pumPopup ) {
			if ( 'undefined' !== typeof pumPopup.triggers ) {
				$.each(
					pumPopup.triggers,
					function ( triggerIndex, triggerArr ) {
						if ( 'click_open' === triggerArr.type ) {
							pumRendered[ pumPopup.id ] = false;
							$( document ).on(
								'click',
								triggerArr.settings.extra_selectors,
								function ( e ) {
									if ( true === pumRendered[ pumPopup.id ] ) {
										PUM.open( pumPopup.id );
										return;
									}
									e.preventDefault();
									pumRendered[ pumPopup.id ] = true;
									$.ajax( {
										method: 'POST',
										dataType: 'json',
										url: '/wp-admin/admin-ajax.php',
										data: {
											action: 'chamfr_load_popup_maker_content',
											popup_id: pumPopup.id,
										},
									} ).success( function ( response ) {
										$( 'footer.page-footer' ).after(
											response.data
										);

										PUM.open( pumPopup.id );

										if ( '.contact-seller-form-trigger' === triggerArr.settings.extra_selectors ) {
											vendorHiddenFields( $( triggerArr.settings.extra_selectors ) );
										}
										$( '#pum-' + pumPopup.id + ' .gform_wrapper form' ).attr('action', '');
									} );
								}
							);
						}
					}
				);
			}
		} );
	}

	var hash = document.URL.substr( document.URL.indexOf( '#' ) + 1 );

	if ( hash ) {
		var args = parseQuery( hash );
		if ( 'undefined' !== typeof args.seller ) {
			var $link = $(
				'[data-seller="' +
				args.seller +
				'"][data-product="' +
				args.product +
				'"]'
			);
			if ( $link.length ) {
				setTimeout( function () {
					$link.click();
				}, 1000 );
			}
		}
	}

	function vendorHiddenFields( btn ) {
		var form_id = window.chmfrCustomJs.contactSellerFormId || 9;
		var vendor_id = $( btn ).data( 'seller' );
		var product_id = $( btn ).data( 'product' );
		var order_id = $( btn ).data( 'order' );

		$( '#input_' + form_id + '_6' ).val( vendor_id );
		$( '#input_' + form_id + '_7' ).val( product_id );
		if ( order_id ) {
			$( '#input_' + form_id + '_10' ).val( order_id );
		}
	}

	if ( typeof jQuery.fn.DataTable !== 'undefined' ) {
		if ( !!document.documentMode ) {
			$( '#chamfr-product-table' ).DataTable( {
				paging: false,
				info: false,
				searching: false,
				order: [ [ $( 'th.defaultSort' ).index(), 'asc' ] ],
				dom: 'frtipB',
				responsive: true,
				buttons: [
					{
						extend: 'csv',
						text: 'CSV Download',
						//className: 'x-btn',
						exportOptions: { columns: 'th:not(:last-child)' },
					},
				],
				columnDefs: [
					{
						targets: 'table-add-to-cart',
						orderable: false,
					},
				],
			} );
		}
	}

	// Hide search button to make way for second pro theme search button
	// $(".e419-5.x-anchor-toggle").on('click', function() {
	//     $(".e419-5.x-anchor-toggle").hide();
	//     //$("#s-e419-5").click();
	// });

	// Updated Shipping $

	// $('.woocommerce-checkout input[value="wcv_pro_vendor_shipping"]').click();
	// $('#order_ups_account_number, #order_charge_my_account_shipping').on('change', function(){
	//     if( $('#order_charge_my_account_shipping').val() == 'UPS' && $('#order_ups_account_number').val() !== '' ) {
	//         $('input[value*="free_shipping"]').prop("checked", true);
	//         $(document.body).trigger("update_checkout");
	//         $('input[value*="free_shipping"], label[for*="free_shipping"]').attr('disabled', true);
	//     }
	// });
	// $('#order_charge_my_account_shipping, #order_charge_my_account_shipping').on('change', function(){
	//     if( $('#order_charge_my_account_shipping').val() == 'No' ){
	//         $('input[value*="wcv_pro_vendor_shipping"]').prop("checked", true);
	//         $(document.body).trigger("update_checkout");
	//         $('input[value*="free_shipping"], label[for*="free_shipping"]').attr('disabled', true);
	//     }
	// });

	// $(document.body).trigger("update_checkout");
	// // prevent selection of shipping radio buttons
	// $(document.body).on("click", function(){
	//     $('input[value*="free_shipping"], label[for*="free_shipping"]').attr('disabled', true);
	// });
	// $(document.body).on("updated_checkout", function() {
	//     $('input[value*="free_shipping"], label[for*="free_shipping"]').attr('disabled', true);
	// });

	// checkout placeholder text
	// setTimeout(function() {
	//     $('input[placeholder="House number and street name"]').attr('placeholder', 'Address 1');
	//     $('input[placeholder="Apartment, suite, unit etc. (optional)"]').attr('placeholder', 'Address 2 (optional)');
	// }, 600);

	//Slide Product Filters in an out on Mobile
	var $sidebar = $( '.tax-product_cat .x-sidebar' );
	var $btn = $( '.tax-product_cat .filters-slide' );
	var $main = $( '.tax-product_cat .x-main' );
	var $offset = $( '.tax-product_cat .offset' );
	var $table = $( '.tax-product_cat #chamfr-product-table' );

	if ( $( window ).width() > 1200 ) {
		$offset.addClass( 'show-filters' );
	}

	$btn.on( 'click', function () {
		$btn.toggleClass( 'alt' );
		$offset.toggleClass( 'show-filters' );
		$main.toggleClass( 'full' );
		$table.css( 'width', '100%' );
	} );
} );

window.Chamfr_Virtual_Cart = window.Chamfr_Virtual_Cart || {};

( function ( window, document, $, app, undefined ) {
	'use strict';

	var timeout;
	var removed_item;

	app.cache = function () {
	};

	/**
	 * Reloads GravityForm-ID (5) used in modal dialog
	 *
	 */
	app.reloadGFormsMakePopUp = function () {
		var _this = this;

		_this.spinnerUrl =
			window.location.protocol +
			'//' +
			window.location.hostname +
			'/wp-content/plugins/gravityforms/images/spinner.gif';
		_this.refreshTime = 5;
		_this.refreshTimeout = null;
		_this.formWrapper = $( '#gform_wrapper_5' );
		_this.containerEle = _this.formWrapper.parent();

		var clonedEle = $( '<div>' ).append( _this.formWrapper.clone() );

		_this.formHtml = clonedEle.html();

		$( document ).bind( 'gform_confirmation_loaded', function () {
			if (
				_this.refreshTime <= 0 ||
				_this.containerEle.find( '.form_saved_message' ).length > 0
			) {
				return;
			}

			_this.refreshTimeout = setTimeout( function () {
				_this.reloadForm();
			}, _this.refreshTime * 1000 );
		} );

		_this.reloadForm = function () {
			if ( _this.refreshTimeout ) {
				clearTimeout( _this.refreshTimeout );
			}

			_this.containerEle
				.find(
					'#gform_confirmation_wrapper_5, .gform_confirmation_message_5, #gform_wrapper_5'
				)
				.replaceWith( _this.formHtml );

			window['gf_submitting_5'] = false;
			gformInitSpinner( 5, _this.spinnerUrl );

			$( document ).trigger( 'gform_post_render', [ 5, 0 ] );

			if ( window['gformInitDatepicker'] ) {
				gformInitDatepicker();
			}
		};
	};

	/**
	 * Modifies mini-cart class for footer stickiness.
	 *
	 * Keeps the mini cart footer sticky at the bottom by adjusting the cart height with a class
	 * depending on whether there enough cart items to reach the footer or not.
	 *
	 * @since 0.1.0
	 *
	 * @returns {null}
	 */
	app.maybeAdjustCartClass = function () {
		var cartWrapper = $( '.chamfr-mini-cart-wrapper' );
		var cartHeight = $( '.woocommerce-mini-cart' ).height();
		var cartLength = $( '.woocommerce-mini-cart' ).length;
		var cartContainerHeight = $( '.widget_shopping_cart_content' ).height();

		if (
			cartHeight < cartContainerHeight ||
			cartLength < 1 ||
			!cartWrapper.length
		) {
			cartWrapper.addClass( 'add-height' );
		} else {
			cartWrapper.removeClass( 'add-height' );
		}
	};

	/**
	 * Updates cart item count and mini cart title with item quantity.
	 *
	 * @since 0.1.0
	 *
	 * @returns {Integer} Cart item count (total of quantity inputs in cart).
	 */
	app.cartItemCount = function ( base ) {
		var cartDisplay = $(
			'.e419-5.x-anchor-toggle span.x-anchor-text-primary'
		);
		var cartItems = $( 'li.mini_cart_item input.qty' );
		var sum = $.isNumeric( base ) ? parseInt( base ) : 0;

		cartDisplay.text( sum );

		cartItems.each( function () {
			sum += Number( $( this ).val() );
		} );

		cartDisplay.text( sum );

		$( '.x-mini-cart-title' ).text( sum + ' items in cart' );

		return sum;
	};

	/**
	 * Toggles mini-cart quantity link.
	 *
	 * When a changes is made to an input, the Update link shows, allowing customer
	 * to update their cart item information.
	 *
	 * @since 0.1.0
	 *
	 * @returns {null}
	 */
	app.toggleQuantityUpdate = function () {
		var update_link = $( this ).next( 'a' );

		if ( !update_link.is( ':visible' ) ) {
			update_link.show( 'fast' );
		}
	};

	/**
	 * Updates cart item quantity via AJAX.
	 *
	 * Upon clicking the Update link, we fire off a request to the server to update the cart item
	 * The WooCommerce notice is returned, along with the true/false success value
	 *
	 * @since 0.1.0
	 *
	 * @param {string} e Click Event
	 *
	 * @returns {bool} True if item addition was successful, false if not. Replaces cart item with notice either way.
	 */
	app.updateCartQuantity = function ( e ) {
		e.preventDefault();
		var update_link = $( this );
		var loader = update_link.next( 'div.loading' );
		var cart_item = update_link.parents( 'li' );
		var _cart_item = cart_item.clone();
		var quantity = update_link.prev( 'input' ).val();

		update_link.hide();
		loader.show( 'fast' );
		$.get(
			woocommerce_params.ajax_url,
			{
				action: 'chamfr_update_mini_cart_qty',
				cart_item_key: update_link
					.prev( 'input' )
					.data( 'cart_item_key' ),
				quantity: quantity,
			},
			function ( response ) {
				if ( response.success ) {
					cart_item.html( response.data.notice );

					app.cartItemCount( quantity );
					app.maybeAdjustCartClass();

					setTimeout( function () {
						$( '.subtotal .amount', _cart_item ).html(
							response.data.price
						);
						cart_item.fadeOut( '450', function () {
							if ( 0 == quantity ) {
								cart_item.fadeOut( '450', function () {
									$( this ).remove();
								} );
							} else {
								cart_item.html( _cart_item.html() );
								$( 'input', cart_item ).val(
									response.data.quantity
								);
								$( '.quantity a', cart_item ).hide();
								cart_item.fadeIn();
							}

							$(
								'.woocommerce-mini-cart__total span.amount'
							).replaceWith( response.data.subtotal );

							app.maybeAdjustCartClass();
						} );
					}, 4500 );
				}
			}
		);
	};

	/**
	 * Removes item from cart.
	 *
	 * @since 0.1.0
	 *
	 * @param {string} e Click Event
	 *
	 * @returns {bool} True if item removal was successful, false if not. Replaces cart item with notice either way.
	 */
	app.removeItem = function ( e ) {
		e.preventDefault();

		var link = $( this );
		var cart_item_key = link.data( 'cart_item_key' );
		var cart_item = link.parents( 'li' );
		removed_item = cart_item.clone();

		$.get(
			woocommerce_params.ajax_url,
			{
				action: 'chamfr_remove_item',
				remove_item: cart_item_key,
			},
			function ( response ) {
				if ( response.success ) {
					cart_item.html( response.data.notice );
					app.cartItemCount();

					$(
						'.woocommerce-mini-cart__total span.amount'
					).replaceWith( response.data.subtotal );
					app.maybeAdjustCartClass();

					timeout = setTimeout( function () {
						cart_item.fadeOut( '450', function () {
							$( this ).remove();
						} );
					}, 7500 );
				}
			}
		);
	};

	app.undoItem = function ( e ) {
		e.preventDefault();

		var link = $( this );
		var cart_item = link.parents( 'li' );
		var cart_item_key = cart_item.data( 'cart_item_key' );

		clearTimeout( timeout );

		$.get(
			woocommerce_params.ajax_url,
			{
				action: 'chamfr_undo_item',
				cart_item_key: cart_item_key,
			},
			function ( response ) {
				if ( response.success ) {
					cart_item.html( response.data.notice );
					app.cartItemCount();

					$(
						'.woocommerce-mini-cart__total span.amount'
					).replaceWith( response.data.subtotal );
					app.maybeAdjustCartClass();

					setTimeout( function () {
						cart_item.fadeOut( '450', function () {
							cart_item.html( removed_item.html() );
							$( '.quantity a', cart_item ).hide();
							cart_item.fadeIn();

							$(
								'.woocommerce-mini-cart__total span.amount'
							).replaceWith( response.data.subtotal );

							app.cartItemCount();
							app.maybeAdjustCartClass();
						} );
					}, 4000 );
				}
			}
		);
	};

	app.clearCart = function ( e ) {
		e.preventDefault();

		var link = $( this );

		if ( !confirm( 'Are you sure you want to empty your cart' ) ) {
			return;
		}

		link.replaceWith(
			$( '.widget_shopping_cart_content' )
				.find( 'div.loading' )
				.html()
		);

		$.get(
			woocommerce_params.ajax_url,
			{
				action: 'chamfr_clear_cart',
			},
			function ( response ) {
				if ( response.success ) {
					$( '.mini-cart-footer' ).remove();
					$( '.widget_shopping_cart_content' ).html(
						response.data.notice
					);
					app.cartItemCount();
				}
			}
		);
	};

	app.maybeCloseCart = function () {
		if ( $( 'div.hidden-vendors' ).hasClass( 'x-active' ) ) {
			$( '.x-off-canvas-close' ).click();
		}
	};

	app.maybeAddEdgeClass = function () {
		if ( window.navigator.userAgent.indexOf( 'Edge' ) !== -1 ) {
			$( 'body' ).addClass( 'edge' );
		}
	};

	app.maybeFinagleShippingUI = function () {
		$( '.woocommerce-checkout-review-order-table tr.shipping' ).each(
			function ( index ) {
				var shipping_row = $( this );
				var seller_id = shipping_row.data( 'seller' );

				// Custom checkout message for Cobalt Polymers
				if ( seller_id === 'cobalt-polymers' ) {
					$( 'th', shipping_row ).append(
						'<p style="font-weight: normal;font-size: .9em;">Note: An additional 24 hours of processing time is required for FedEx Ground shipments.</p>'
					);
				}

				// Custom checkout message for Medibrane
				if ( seller_id === 'medibrane' ) {
					$( 'th', shipping_row ).append(
						'<p style="font-weight: normal;font-size: .9em;">Note: Ships within 24 hours during Israel business hours (Sunday – Thursday)</p>'
					);
				}

				// Custom checkout message for Medical Component Specialists
				if ( seller_id === 'medical-component-specialists' ) {
					$( 'th', shipping_row ).append(
						'<p style="font-weight: normal;font-size: .9em;">Note: An additional 24 hours of processing time is required for FedEx Ground shipments.</p>'
					);
				}

				// Custom checkout message for Integer
				if (
					seller_id === 'integer-salem' ||
					seller_id === 'integer-quakertown'
				) {
					$( 'th', shipping_row ).append(
						'<p style="font-weight: normal;font-size: .9em;">Note: All products are shipped FCA origin incoterms 2010.</p>'
					);
				}

				var last_seller_item = $(
					'.woocommerce-checkout-review-order-table'
				)
					.find( '.cart_item[data-seller="' + seller_id + '"]' )
					.last();

				last_seller_item.after( shipping_row );

				last_seller_item.find( '.variation .variation-SoldBy' ).show();

				$( '.woocommerce-additional-fields' )
					.insertAfter( '.woocommerce-billing-fields' )
					.show();
			}
		);

		$( '.thwcfd-enhanced-select' ).on(
			'select2:select',
			app.maybeShowAccountNumbers
		);
	};

	app.maybeShowAccountNumbers = function ( e ) {
		//     var data = e.params.data;
		//     if ( 'FedEx' === data.text ) {
		//         $( '#order_fedex_account_number_field' ).show();
		//         $( '#order_ups_account_number_field' ).hide();
		//     }
		//     if ( 'UPS' === data.text ) {
		//         $( '#order_ups_account_number_field' ).show();
		//         $( '#order_fedex_account_number_field' ).hide();
		//     }
		//     if ( 'No' === data.text ) {
		//         $( '#order_ups_account_number_field, #order_fedex_account_number_field' ).hide();
		//         $( '#order_fedex_account_number, #order_ups_account_number' ).val('');
		//     }
	};

	app.preBlockMessaging = function ( e ) {
		var page = $( 'body' );
		var gateway = $( e.target )
			.find( 'input[name="payment_method"]:checked' )
			.val();
		var isNew = $( '#wc-' + gateway + '-payment-token-new' ).is(
			':checked'
		);

		var remoteGateways = [
			'chamfr_gateway_stripe_cc',
			'chamfr_gateway_stripe_ach',
		];

		var message =
			remoteGateways.includes( gateway ) && isNew
				? 'Hang on while being transferred to the payment gateway...'
				: 'Hang tight, your order is processing...';

		page.block( {
			message: message,
			overlayCSS: {
				background: '#fff',
				opacity: 0.6,
			},
			centerX: false,
			centerY: false,
			css: {
				padding: 0,
				margin: 0,
				width: '30%',
				textAlign: 'center',
				color: '#313131',
				border: '3px solid #e11d73',
				backgroundColor: '#fff',
				cursor: 'wait',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				position: 'fixed',
			},
		} );
	};

	app.preBlockMessagingRemove = function () {
		var page = $( 'body' );
		page.unblock();
	};

	app.redirectSellerDashboard = function () {
		if ( $( 'body' ).hasClass( 'role-vendor' ) ) {
			$( '#fixed-top-bar .e419-2 a, #menu-item-674 a' ).attr(
				'href',
				window.chmfrCustomJs.homeUrl
			);
		}
	};

	app.init = function () {
		// Adjust cart class in mini-cart to ensure the subtotal footer is stuck to the bottom.
		$( document.body ).on(
			'wc_fragments_refreshed',
			app.maybeAdjustCartClass
		);
		$( document ).ready( app.maybeAdjustCartClass );
		$( window ).on( 'resize', app.maybeAdjustCartClass );
		$( 'a.hidden-vendors' ).on( 'click', app.maybeAdjustCartClass );

		// Update cart item count
		$( document ).ready( app.cartItemCount );
		$( document.body ).on( 'wc_fragments_refreshed', app.cartItemCount );

		// Handle quantity updates in cart
		$( document.body ).on(
			'change',
			'.chamfr-wc-info .quantity input',
			app.toggleQuantityUpdate
		);
		$( document.body ).on(
			'click',
			'.chamfr-wc-info .quantity a',
			app.updateCartQuantity
		);

		// Handle item removal in cart.
		$( document.body ).on(
			'click',
			'.mini_cart_item a.remove_from_cart_button',
			app.removeItem
		);
		$( document.body ).on(
			'click',
			'.mini_cart_item a.restore-item',
			app.undoItem
		);
		$( document.body ).on(
			'click',
			'.mini-cart-footer a.clear-cart',
			app.clearCart
		);

		$( document ).on( 'qv_loader_stop', app.maybeCloseCart );

		// Adds MS Edge class to target oddities there.
		$( document ).ready( app.maybeAddEdgeClass );

		// Shipping UI updates
		$( document.body ).on( 'updated_checkout', app.maybeFinagleShippingUI );
		$( document ).ready( app.maybeFinagleShippingUI );

		// Seller updates
		$( document ).ready( app.redirectSellerDashboard );

		// Reload feedback form
		$( document ).ready( app.reloadGFormsMakePopUp );

		$( 'form.checkout' ).on(
			'checkout_place_order',
			app.preBlockMessaging
		);

		$( document.body ).on( 'checkout_error', app.preBlockMessagingRemove );
	};

	$( app.init );
} )( window, document, jQuery, window.Chamfr_Virtual_Cart );
