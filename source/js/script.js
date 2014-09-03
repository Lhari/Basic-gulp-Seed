;(function() {
// Initialize
	var bLazy = new Blazy();
})();

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

function GetQueryStringParams(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
};