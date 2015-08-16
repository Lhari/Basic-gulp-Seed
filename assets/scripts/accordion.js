jQuery(document).ready(function($){
	$('.js-accordion').on('click', function() {
		$(this).parents('.accordion').toggleClass('is-open');
	});
});