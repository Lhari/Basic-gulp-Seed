jQuery(document).ready(function($){
	var breadcrumb = $('.js-breadcrumb');


	function toggleBreadcrumbs(action) {
		console.log('toggleBreadcrumbs()');
		console.log('action: ' + action);

		if(action=== 'show') {
			$('.js-breadcrumb').removeClass('is-hidden');
		}
		else if(action==='hide') {
			$('.js-breadcrumb').addClass('is-hidden');
		}
		else {
			$('.js-breadcrumb').toggleClass('is-hidden');
		}
		
	}

	// open the category content
	$('.js-open-category').on('click', function() {
		var category 				= $(this).data('category');
		var categoryName 		= $(this).data('category-name');
		var current 				= $('.js-current');
		var currentCat 			= current.data('category');

		consoleLog('category: ' + category);
		consoleLog('currentCategory: ' + currentCat);


		// add highlight to selected
		// and remove from previous
		$('.js-open-category').removeClass('selected');
	 	$(this).addClass('selected');


		// Hide the current content
		if(currentCat !== 'overview') {
			consoleLog('is not overview. Hide current');
			current.addClass('is-hidden');
		}
		else {
			$('.js-welcome').addClass('is-hidden');
		}
		
		current.removeClass('js-current');

		// Show the new content
		$('.js-content[data-category="' + category + '"]').removeClass('is-hidden');
		$('.js-content[data-category="' + category + '"]').addClass('js-current');

		// Show breadcrumbs if not
		if(category !== 'overview') {
			// change current breadcrumb
			$('.js-current-crumb').html(categoryName);

			toggleBreadcrumbs('show');
		}
		else {
			toggleBreadcrumbs('hide');
		}

	});

	// go back to overview  <------------ Refactor - can be put in function with above
	$('.js-breadcrumb-back').on('click', function(){
		var category = $(this).data('category');
		var current = $('.js-current');

		console.log('category: '+ category);

		// Hide the current content
		current.addClass('is-hidden');
		current.removeClass('js-current');

		// Show the new content
		$('.js-content[data-category="' + category + '"]').removeClass('is-hidden');
		$('.js-content[data-category="' + category + '"]').addClass('js-current');

		// Show breadcrumbs if not
		if(category !== 'overview') {
			toggleBreadcrumbs('show');
		}
		else {
			toggleBreadcrumbs('hide');
		}

	});


	// open color info
	$('.js-open-info').on('click', function() {
		var colorCategory 		= $(this).data('color-info');
		var current 					= $('.js-category-info.is-open');
		var currentColor 			= current.data('color-info');

		consoleLog('colorCategory: ' + colorCategory);

		// hide current color info if the same color is selected again
		if(currentColor == colorCategory) {
			// hide current color
			current.removeClass('is-open');
		}
		else {
			// hide current color
			current.removeClass('is-open');

			// show color for selection
			$('.js-category-info[data-color-info="' + colorCategory + '"]').addClass('is-open');
		}
	});


	function clearError() {
		$('.js-configurator-error').html('');
	}

	// Select item
	$('.js-select').on('click', function() {
		consoleLog('selection click event');

		var typeSelected = false;

		// check if type is selected
		if(typeof $(this).data('type') !== 'undefined' && $(this).data('type').length > 0) {
			consoleLog('select has data-type');
			consoleLog('data-type: ' + $(this).data('type'));
			$('.js-details').removeClass('is-hidden');

			typeSelected = true;
		}
		else if($('.js-type').hasClass('selected')) {
			typeSelected = true;
		}

		if(typeSelected) {
			// remove selection from other items
			$(this).parents('.js-content').find('.js-select').removeClass('selected');

			// add selection to current item
			$(this).addClass('selected');

			// clear error
			clearError();
		}
		else {
			consoleLog('no type selected!');
			$('.js-configurator-error').html('<div class="error">Du skal vælge en type før du kan vælge en farve</div>');
		}


	});


});