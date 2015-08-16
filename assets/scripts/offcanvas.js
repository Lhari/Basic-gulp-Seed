jQuery(document).ready(function($){
	$('.js-offcanvas-toggle').on('click', function(e) {
		e.preventDefault();
		$('.js-oncanvas').toggleClass('is-offcanvas');
	});

	$('.js-close-offcanvas').on('click', function(e){
		e.preventDefault();
		$('.js-oncanvas').removeClass('is-offcanvas');
	});
});