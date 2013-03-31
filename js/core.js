(function($){
	$.fn.validate = function(arg1, arg2, arg3) {
		if(arg1 == 'error' && (typeof(arg2) == 'string' || arg2 === false) && arg3 === undefined) {
			validate.throwError(this, arg2);
			return this;

		} else if(arg1 == 'set' && arg2 !== undefined) {
			validate.set(arg2);
			return this;

		} else if($.isFunction(arg1) || arg1 === undefined) {
			if(arg1 === undefined) {
				return validate.run(this);
			}
			return this.each(function(){
				validate.run($(this), arg1, arg2);
			});

		} else {
			throw new Error('$.validate() does not accept argument(s) provided');
			return this;

		}
	};
	var validate = {
		rules : {
			"required" : {
				error : 'this field is required',
				valid : function(val) {
					return $.trim(val) != '';
				}
			},

			"email" : {
				error : 'must be valid email',
				valid : function(val) {
					return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val) || val == '';
				}
			},

			"date" : {
				error : 'must be valid date mm/dd/yyyy',
				valid : function(val) {
					var bits = val.split('/'), y = bits[2], m  = bits[0], d = bits[1], daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
					if (( ! (y%4) && y%100) || ! (y%400)) daysInMonth[1] = 29;
					return d <= daysInMonth[--m] || val == '';
				}
			},

			"number" : {
				error : 'must be a number',
				valid : function(val) {
					return ! isNaN(val) || val == '';
				}
			},

			"required-if-visible" : {
				error : 'this field is required',
				valid : function(val, scope, input) {
					return ! input.is(':visible') || val != '';
				}
			}

		},
		run : function(range, successHandler, errorHandler) {
			if($('.f-error').length) {
				validate.removeErrors();
			}

			var passed = true;

			range.find(':input').each(function(){
				var classStr = this.className,
					input    = $(this);

				if(classStr.indexOf('f-') > -1) {
					var value   = input.val(),
						classes = classStr.split(' '),
						apply   = [];

					$.each(classes, function(i, v){
						if(v.indexOf('f-') > -1 && validate.rules[v.replace('f-','')] !== undefined) {
							apply.push(v.replace('f-', ''));
						}
					});

					if(apply.length) {
						$.each(apply, function(i, rule){
							if( ! validate.rules[rule].valid(value, range, input)) {
								passed = false;
								if($.isFunction(errorHandler)) {
									errorHandler(input, validate.rules[rule].error);
								} else if(successHandler !== undefined) {
									validate.throwError(input, validate.rules[rule].error);
								}
							}
						});
					}
				}
			});

			if(passed && $.isFunction(successHandler)) {
				successHandler();
			}

			return passed;
		},

		set : function(obj) {
			try {
				$.extend(this.rules, obj);

			} catch(thrown) {
				throw new Error('Could not apply new rule(s)');

			}
		},

		throwError : function(input, message) {
			if(message === false) {
				$('.f-error').remove();
				$('.f-border').removeClass('f-border');
				return false;
			}

			var offset = input.offset(),
				bWidth = input.css("border-left-width"), 
				error;

			if(input.is(':radio') || input.is(':checkbox')) {
				error = $('<div class="f-error" style="border-radius:4px"><div class="f-error-pad" style="margin:5px 15px 5px 7px">'+message+'<div class="f-error-arrow"></div></div><div class="f-error-x">&nbsp;</div></div>');
				error.css({
					top  : offset.top + input.outerHeight() + 8,
					left : offset.left - 5
				}).appendTo('body');
			} else {
				error = $('<div class="f-error"><div class="f-error-pad">'+message+'</div><div class="f-error-x">&nbsp;</div></div>');
				error.css({
					top       : offset.top,
					left      : offset.left,
					width     : input.outerWidth(),
					marginTop : input.outerHeight()-1
				}).appendTo('body');
			}

			if( ! $(document.activeElement).hasClass('f-border')) {
				input.focus()
			}

			input.css('border-width', bWidth).addClass('f-border');

			error.fadeIn('fast')[0].onclick = function() {
				error.remove();
				input.removeClass('f-border');
			};

		},

		removeErrors : function() {
			$('.f-border').removeClass('f-border');
			$('.f-error').remove();
		}
	}
})(jQuery);