Validate Region w/ Success handler
----------------------------------
- callback only runs on success
- selector is the region to search for fields to validate

```javascript
$('region').validate(function(){
	alert('validation passed');
}); 
```


Validate region w/out arguments
-------------------------------
- Returns true/false
- throws no errors

```javascript
if($('region').validate()) {
	alert('validation passed');
}
```


Validate region w/ both success and error handlers
--------------------------------------------------
- the error handler stops the normal error throwing behavior
- error handler is passed the failed field and the error message

```javascript
$('region').validate(function(){
	// validation passed
}, function(input, message){
	// validation failed
	// do something with var input
	// do something with message
});
```


Add validation rule
-------------------
- returns true/false if succesful
- notice the empty selector: none needed
- the "valid" property passes the field currently being validated's value to be validated
- the "valid" property must return true if passing, otherwise false
- if you don't want the new rule to be required you need to include "OR value is equal to [empty string]" condition
- "scope" argument is the element that .validate() was called on

```javascript
$().validate('set', {
	'zip' : {
		error : 'Not a valid zipcode',
		valid : function(val, scope, input) {
			return (! isNaN(val) && val.length == 5) || val == '';
		}
	},
	'example' : {
		error : 'Not valid HEXIDECIMAL',
		valid : function(val, scope, input) {
			return val.match(/\b[0-9A-F]{6}\b/gi);
		}
	}
});
```

Available Rules
---------------
- available as part of plugin
- all rules start with the "f-" prefix
```javascript
// class="f-required"
"required" : {
	error : 'this field is required',
	valid : function(val) {
		return $.trim(val) != '';
	}
},
// class="f-email"
"email" : {
	error : 'must be valid email',
	valid : function(val) {
		return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val) || val == '';
	}
},
// class="f-date"
"date" : {
	error : 'must be valid date mm/dd/yyyy',
	valid : function(val) {
		var bits = val.split('/'), y = bits[2], m  = bits[0], d = bits[1], daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
		if (( ! (y%4) && y%100) || ! (y%400)) daysInMonth[1] = 29;
		return d <= daysInMonth[--m] || val == '';
	}
},
// class="f-number"
"number" : {
	error : 'must be a number',
	valid : function(val) {
		return ! isNaN(val) || val == '';
	}
},
// class="f-required-if-visible"
"required-if-visible" : {
	error : 'this field is required',
	valid : function(val, scope, input) {
		return ! input.is(':visible') || val != '';
	}
}
```

Throw error at whim
-------------------
- second parameter is whatever string you want
- selector should be whatever you want error to show on, doesn't even have to be an input

```javascript
$(input).validate('error', 'my custom error');
```



Remove all errors on page
-------------------------
```javascript
$().validate('error', false);
```