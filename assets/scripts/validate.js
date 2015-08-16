jQuery(document).ready(function($){

	jQuery.extend(jQuery.validator.messages, {
      required: "Dette felt er påkrævet.",
      remote: "Ret venligst dette felt.",
      email: "Angiv venligst en gyldig email adresse.",
      url: "Angiv venligst en gyldig URL.",
      date: "Angiv venligst en gyldig dato.",
      dateISO: "Angiv venligst en gyldig dato (ISO).",
      number: "Angiv venligst et gyldigt tal.",
      digits: "Kun tal er tilladt i dette felt.",
      equalTo: "Gentag venligst værdien fra tidligere.",
      accept: "Please enter a value with a valid extension.",
      maxlength: jQuery.validator.format("Dette felt må ikke indeholde mere end {0} tegn."),
      minlength: jQuery.validator.format("Dette felt skal minimum indeholde {0} tegn."),
      rangelength: jQuery.validator.format("Angiv venligst en værdi mellem {0} og {1} tegn."),
      range: jQuery.validator.format("Angiv venligst en værdi mellem {0} og {1}."),
      max: jQuery.validator.format("Angiv venligst en værdi der er mindre eller lig med {0}."),
      min: jQuery.validator.format("Angiv venligst en værdi der er større eller lig med  {0}.")
  });



	$(".js-validate").validate({
		debug: true,
		validClass: 'valid',
		success: "valid",
		ignore: ".ignore",

		errorPlacement: function(error, element) {
		if (element.attr("name") == "terms")
		    {
		        error.insertAfter(".js-terms-link");
		    }
		    else
		    {
		        error.insertAfter(element);
		    }
		},

	  rules: {
	    first_name: "required",

	    email: {
	      required: true,
	      email: true
	    },

	    phone: {
	    	required: true,
	    	digits: true,
	    	maxlength: 8,
	    	minlength: 8
	    },

	    zip: {
	    	required: true,
	    	digits: true,
	    	maxlength: 4,
	    	minlength: 4
	    },



	    // alternative info
	    phone__alternative: {
	    	required: true,
	      digits: true,
    		maxlength: 8,
    		minlength: 8
	    },
	    zip__alternative: {
	    	required: true,
	      digits: true,
    		maxlength: 4,
    		minlength: 4
	    }

	  } // end rules

	});


  $('.js-validate input').on('blur', function () {
    $(this).valid();
  });

});