jQuery(document).ready(function($){

	$('select').selectize({
    create: false,
    sortField: 'text'
	});


	// hide search on selected selectize input
	$('.js-selectize--hide-search').next().find('div.selectize-input > input').prop('disabled', 'disabled');
	$('.js-selectize--hide-search').next().find('div.selectize-input').addClass('cursor-normal');

});