;(function() {
    // Initialize
	var bLazy = new Blazy();
})();

$(document).ready(function() {
	$('.js-menu').hide();
	$('.infobox').hide();
	$('.js-menu-toggle').click(function() {
		$('.js-menu').slideToggle();
		$('.js-menu-toggle').toggleClass('active');
	})
})