jQuery(document).ready(function($){
	$('.js-up').on('click', function() {
		var input = $(this).siblings('.updown__input');
		var current	= parseInt(input.val());

		var add = current + 1;

		input.val(add);
	});

	$('.js-down').on('click', function() {
		var input = $(this).siblings('.updown__input');
		var current	= parseInt(input.val());

		var subtract = current - 1;

		input.val(subtract);
	});



	$('.js-extra-toggle').on('change', function() {
		// Check if option is checked
		if($(this).prop( "checked" )) {
			$('.js-extra').removeClass('is-open');
			$('.js-extra input').addClass('ignore');
		}
		else {
			$('.js-extra').addClass('is-open');
			$('.js-extra input').removeClass('ignore');
		}
	});


	$('.js-toggle-overview').on('click', function() {
		$('.js-toggle-hidden').toggleClass('is-closed');
	});

});