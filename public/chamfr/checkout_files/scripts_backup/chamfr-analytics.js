(function ($) {
	function renderNumbers( numbers ) {
		$.each(numbers, function (key, value) {
			$('.chamfr-analytics-section_wrapper_numbers #' + key).html(value);
		});
	}

	function renderTables( tables, class_name, hide ) {
		$('.chamfr-analytics-section_wrapper' + class_name + '_tables_item').remove();
		$.each(tables, function (key, table_data) {
			var div = $("<div>").addClass("chamfr-analytics-section_wrapper" + class_name + "_tables_item loading");
			var table = $('<table>');
			table.addClass('wcvendors-table');
			table.addClass('wcv-table');
			var header = $("<tr>");
			$.each(table_data.fields, function(field_key, field_text) {
				header.append($("<th>").text(field_text));
			});
			table.append($("<thead>").append(header));

			var tbody = $("<tbody>");
			if (table_data.rows.length > 0) {
				$.each(table_data.rows, function(i, row) {
					if ( hide === 1 && i > 9 ) {
						var tableRow = $("<tr class='hidden'>");
					} else {
						var tableRow = $("<tr>");
					}

					$.each(row, function(j, cellData) {
						tableRow.append($("<td>").text(cellData));
					});

					tbody.append(tableRow);
				});
			} else {
				var tableRow = $("<tr>");
				tableRow.append($("<td align='center' colspan='" + Object.keys(table_data.fields).length + "'>").text('No data available for selected dates'));
				tbody.append(tableRow);
			}
			table.append(tbody);
			div.append(table);

			if ( hide === 1 && table_data.rows.length > 10 ) {
				div.append($("<a class='show-more'>").text('Show More'));
			}
			$('.chamfr-analytics-section_wrapper' + class_name + '_tables').append(div);
		});

		$('.show-more').on('click', function (e) {
			e.preventDefault();
			$(this).parent().find('tr.hidden').removeClass('hidden');
			$(this).remove();
			return false;
		});
	}

	function loadNumberStat() {
		$.ajax({
			url: chamfr_analytics.ajax_url,
			type: "GET",
			dataType: "json",
			data: {
				action: 'chamfr_analytics_numbers',
				security: chamfr_analytics.ajax_nonce
			},
			beforeSend: function (xhr) {
				$('.chamfr-analytics-section_wrapper_numbers_item').not('.loading').addClass('loading');
			},
			success: function (response) {
				if ('undefined' !== typeof response.numbers) {
					renderNumbers( response.numbers );
				}
			},
			complete: function () {
				$('.chamfr-analytics-section_wrapper_numbers_item').removeClass('loading');
			}
		});
	}

	function loadTableStat() {
		$.ajax({
			url: chamfr_analytics.ajax_url,
			type: "GET",
			dataType: "json",
			data: {
				date_start: $('#_wcv_dashboard_start_date_input').val(),
				date_end: $('#_wcv_dashboard_end_date_input').val(),
				action: 'chamfr_analytics_table',
				security: chamfr_analytics.ajax_nonce
			},
			beforeSend: function (xhr) {
				$('.chamfr-analytics-section_wrapper_tables_item').not('.loading').addClass('loading');
			},
			success: function (response) {
				if ('undefined' !== typeof response.tables) {
					renderTables( response.tables, '', 0 );
				}
			},
			complete: function () {
				$('.chamfr-analytics-section_wrapper_tables_item.skeleton').remove();
				$('.chamfr-analytics-section_wrapper_tables_item').removeClass('loading');
			}
		});
	}

	function loadOosStat() {
		$.ajax({
			url: chamfr_analytics.ajax_url,
			type: "GET",
			dataType: "json",
			data: {
				action: 'chamfr_analytics_oos',
				security: chamfr_analytics.ajax_nonce
			},
			beforeSend: function (xhr) {
				$('.chamfr-analytics-section_wrapper_oos_tables_item').not('.loading').addClass('loading');
			},
			success: function (response) {
				if ('undefined' !== typeof response.tables) {
					renderTables( response.tables, '_oos', 1 );
				}
			},
			complete: function () {
				$('.chamfr-analytics-section_wrapper_oos_tables_item.skeleton').remove();
				$('.chamfr-analytics-section_wrapper_oos_tables_item').removeClass('loading');
			}
		});
	}

	$('#chamfr-vendors-dashboard-analytics #update_button').click(function (e) {
		e.preventDefault();
		loadTableStat();
		return false;
	});
	if ($('#chamfr-vendors-dashboard-analytics').length) {
		$(window).on('load', function () {
			loadNumberStat();
			if ( $('body.wcvendors-dashboard-analytics-page').length ) {
				loadOosStat();
				loadTableStat();
			}
		});
	}
	$('.chamfr-vendor-product #chamfr-vendors-dashboard-analytics .chamfr-analytics-section_wrapper_numbers_item').click(function (e) {
		window.location.href = chamfr_analytics.products_url + '?filter_status=' + $(this).data('type');
	});
})(jQuery);
