;(function() {
    // Initialize
	var bLazy = new Blazy();
})();


/*
$(document).ready(function() {
	$('.js-menu').hide();
	$('.infobox').hide();
	$('.js-menu-toggle').click(function() {
		$('.js-menu').slideToggle();
		$('.js-menu-toggle').toggleClass('active');
	})
})
*/

 //--- OffCanvas Menu ---

 $(function() {
 	$('.js-toggle-offcanvas').click(function() {
 		toggleNav();
 	})
 })

function toggleNav(){
	$('.js-offcanvas').toggleClass('closed');
	$('.js-oncanvas').toggleClass('show-nav');
	$('.js-toggle-offcanvas').toggleClass('active');
	$('.js-menu-toggle').toggleClass('active');
} 