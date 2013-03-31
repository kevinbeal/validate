***VALIDATE REGION w/ SUCCESS HANDLER

- callback only runs on success
- selector is the region to search for fields to validate

$('region').validate(function(){
	alert('validation passed');
}); 



***VALIDATE REGION w/OUT ARGUMENTS

- Returns true/false
- throws no errors

if($('region').validate()) {
	alert('validation passed');
}



***VALIDATE REGION w/ BOTH SUCCESS AND ERROR HANDLERS

- the error handler stops the normal error throwing behavior
- error handler is passed the failed field and the error message

$('region').validate(function(){
	// validation passed
}, function(input, message){
	// validation failed
	// do something with var input
	// do something with message
});



***ADD VALIDATION RULE

- returns true/false if succesful
- notice the empty selector: none needed
- the "valid" property passes the field currently being validated's value to be validated
- the "valid" property must return true if passing, otherwise false
- if you don't want the new rule you need to include "OR value is equal to ''" condition
- "scope" argument is the element that .validate() was called on

$().validate('set', {
	'zip' : {
		error : 'Not a valid zipcode',
		valid : function(val, scope, input) {
			return (! isNaN(val) && val.length == 5) || val == '';
		}
	},
	'example' : {
		error : 'doesn\'t say "peepee"',
		valid : function(val, scope, input) {
			return val == 'peepee';
		}
	}
});



***THROW ERROR AT WHIM

- second parameter is whatever string you want
- selector should be whatever you want error to show on, doesn't even have to be an input
	
$(input).validate('error', 'my custom error');



***REMOVE ALL ERRORS ON PAGE
	
$().validate('error', false);