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