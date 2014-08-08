/**
 * Live Form Validation for Nette 2.2
 *
 * @author Radek Ježdík, MartyIX, David Grudl, pavelplzak, Robyer
 *
 * @changelog
 *   Robyer, 8.8.2014:
 *     - update with netteForms.js code from Nette 2.2
 *     - add showAllErrors, showMessageClassOnParent, errorMessagePrefix options
 *     - don't start validation when pressing one of special keys
 *     - set defaults to use with Bootstrap 3 and AdminLTE template
 *     - mark changes in netteForms.js code to simplify updating
 *     - fix showValid() function
 *   Robyer, 14.12.2013:
 *     - fix focus/blur circular repeating
 *     - fix adding handlers (so toggle() will work)
 *   Robyer, 13.12.2013:
 *     - based on fork of pavelplzak (add showErrorApart functionality)
 *     - update with netteForms.js code from Nette 2.1
 *     - add alert() to notify errors for elements with disabled live validation
 *     - add ability to disable on keyup/keydown validation
 *     - add missing ";", use tabs for indentation
 */

var LiveForm = {
	options: {
		showMessageClassOnParent: 'form-group',              // CSS class of control's parent where error/valid class should be added; or "false" to use control directly
		controlErrorClass: 'has-error',                      // CSS class for an invalid control
		errorMessageClass: 'error-message',                  // CSS class for an error message
		validMessageClass: 'has-success',                    // CSS class for a valid message
		noLiveValidation:  'no-live-validation',             // CSS class for a valid message
		showErrorApartClass: 'show-error-apart',             // control with this CSS class will display message in element with ID = errorApartDivPrefix+control's id
		showErrorApartElementPrefix: 'error-container_',     // prefix for id of div where to display error message
		dontShowWhenValidClass: 'dont-show-when-valid',      // control with this CSS class will not show valid message
		messageTag: 'span',                                  // tag that will hold the error/valid message
		messageIdPostfix: '_message',                        // message element id = control id + this postfix
		errorMessagePrefix: '<i class="fa fa-warning"></i> ',// show this html before error message itself 
		showAllErrors: true,                                 // show all errors when submitting form; or use "false" to show only first error
		showValid: false,                                    // show message when valid
		wait: false                                          // delay in ms before validating on keyup/keydown; or use "false" to disable it
	},

	forms: { }
};

LiveForm.isSpecialKey = function(k) {
	// http://stackoverflow.com/questions/7770561/jquery-javascript-reject-control-keys-on-keydown-event
	return (k == 20 /* Caps lock */
		|| k == 16 /* Shift */
		|| k == 9 /* Tab */
		|| k == 27 /* Escape Key */
		|| k == 17 /* Control Key */
		|| k == 91 /* Windows Command Key */
		|| k == 19 /* Pause Break */
		|| k == 18 /* Alt Key */
		|| k == 93 /* Right Click Point Key */
		|| (k >= 35 && k <= 40) /* Home, End, Arrow Keys */
		|| k == 45 /* Insert Key */
		|| (k >= 33 && k <= 34) /*Page Down, Page Up */
		|| (k >= 112 && k <= 123) /* F1 - F12 */
		|| (k >= 144 && k <= 145)); /* Num Lock, Scroll Lock */
}

/**
 * Handlers for all the events that trigger validation
 * YOU CAN CHANGE these handlers (ie. to use jQuery events instead)
 */
LiveForm.setUpHandlers = function(el) {
	if (this.hasClass(el, this.options.noLiveValidation)) return;

	var handler = function(event) {
		event = event || window.event;
		Nette.validateControl(event.target ? event.target : event.srcElement);
	};

	var self = this;

	Nette.addEvent(el, "change", handler);
	Nette.addEvent(el, "blur", handler);
	Nette.addEvent(el, "keydown", function (event) {
		if (!self.isSpecialKey(event.which) && (self.options.wait === false || self.options.wait >= 200)) {
			// Hide validation span tag.
			self.removeClass(self.getGroupElement(this), self.options.controlErrorClass);
			self.removeClass(self.getGroupElement(this), self.options.validMessageClass);
			
			var error = self.getMessageElement(this);
			error.innerHTML = '';
			error.className = '';
			
			// Cancel timeout to run validation handler
			if (self.timeout) {
				clearTimeout(self.timeout);
			}
		}
	});
	Nette.addEvent(el, "keyup", function(event) {
		if (self.options.wait !== false) {
			event = event || window.event;
			if (event.keyCode !== 9) {
				if (self.timeout) clearTimeout(self.timeout);
					self.timeout = setTimeout(function() {
					handler(event);
				}, self.options.wait);
			}
		}
	});
};

LiveForm.addError = function(el, message) {
	this.forms[el.form.id].hasError = true;
	this.addClass(this.getGroupElement(el), this.options.controlErrorClass);

	if (this.options.showValid && this.showValid(el)) {
		this.removeClass(this.getGroupElement(el), this.options.validMessageClass);
	}
	
	if (!message) {
		message = '&nbsp;';
	} else {
		message = this.options.errorMessagePrefix + message;
	}

	var error = this.getMessageElement(el);
	error.innerHTML = message;
};

LiveForm.removeError = function(el) {
	var groupEl = this.getGroupElement(el);

	this.removeClass(groupEl, this.options.controlErrorClass);
	var err_el = document.getElementById(el.id + this.options.messageIdPostfix);

	if (this.options.showValid && this.showValid(el)) {
		err_el = this.getMessageElement(el);
		this.addClass(groupEl, this.options.validMessageClass);
		return;
	}

	if (err_el) {
		err_el.parentNode.removeChild(err_el);
	}
};

LiveForm.showValid = function(el) {
	if(el.type) {
		var type = el.type.toLowerCase();
		if(type == 'checkbox' || type == 'radio') {
			return false;
		}
	}
	
	var rules = Nette.parseJSON(el.getAttribute('data-nette-rules'));
	if (rules.length == 0) {
		return false;
	}

	if (this.hasClass(el, this.options.dontShowWhenValidClass)) {
		return false;
	}

	return true;
};

LiveForm.getGroupElement = function(el) {
	if (this.options.showMessageClassOnParent === false)
		return el;
	
	var groupEl = el;
	
	while (!this.hasClass(groupEl, this.options.showMessageClassOnParent)) {
		groupEl = groupEl.parentNode;
		
		if (groupEl === null) {
			return el;
		}
	}

	return groupEl;
}

LiveForm.getMessageElement = function(el) {
	var id = el.id + this.options.messageIdPostfix;
	var error = document.getElementById(id);

	if (!error) {
		error = document.createElement(this.options.messageTag);
		error.id = id;
		if(!this.hasClass(el, this.options.showErrorApartClass)) {
			el.parentNode.appendChild(error);
		} else {
			var showApartElement = document.getElementById(this.options.showErrorApartElementPrefix+el.id);
			showApartElement.appendChild(error);
		}
	}

	if (el.style.display == 'none') {
		error.style.display = 'none';
	}

	error.className = this.options.errorMessageClass;
	error.innerHTML = '';
	
	return error;
};

LiveForm.addClass = function(el, className) {
	if (!el.className) {
		el.className = className;
	} else if (!this.hasClass(el, className)) {
		el.className += ' ' + className;
	}
};

LiveForm.hasClass = function(el, className) {
	if (el.className)
		return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	return false;
};

LiveForm.removeClass = function(el, className) {
	if (this.hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)'+ className + '(\\s|$)');
		var m = el.className.match(reg);
		el.className = el.className.replace(reg, (m[1] == ' ' && m[2] == ' ') ? ' ' : '');
	}
};

////////////////////////////   modified netteForms.js   ///////////////////////////////////

var Nette = Nette || {};

/**
 * Attaches a handler to an event for the element.
 */
Nette.addEvent = function(element, on, callback) {
	var original = element['on' + on];
	element['on' + on] = function() {
		if (typeof original === 'function' && original.apply(element, arguments) === false) {
			return false;
		}
		return callback.apply(element, arguments);
	};
};


/**
 * Returns the value of form element.
 */
Nette.getValue = function(elem) {
	var i, len;
	if (!elem) {
		return null;

	} else if (!elem.nodeName) { // RadioNodeList, HTMLCollection, array
		var multi = elem[0] && !!elem[0].name.match(/\[\]$/),
			res = [];

		for (i = 0, len = elem.length; i < len; i++) {
			if (elem[i].type in {checkbox: 1, radio: 1} && !elem[i].checked) {
				continue;
			} else if (multi) {
				res.push(elem[i].value);
			} else {
				return elem[i].value;
			}
		}
		return multi ? res : null;

	} else if (!elem.form.elements[elem.name].nodeName) { // multi element
		return Nette.getValue(elem.form.elements[elem.name]);

	} else if (elem.nodeName.toLowerCase() === 'select') {
		var index = elem.selectedIndex, options = elem.options, values = [];

		if (elem.type === 'select-one') {
			return index < 0 ? null : options[index].value;
		}

		for (i = 0, len = options.length; i < len; i++) {
			if (options[i].selected) {
				values.push(options[i].value);
			}
		}
		return values;

		} else if (elem.type in {checkbox: 1, radio: 1}) {
		return elem.checked;

	} else if (elem.type === 'file') {
		return elem.files || elem.value;

	} else {
		return elem.value.replace("\r", '').replace(/^\s+|\s+$/g, '');
	}
};


/**
 * Returns the effective value of form element.
 */
Nette.getEffectiveValue = function(elem) {
	var val = Nette.getValue(elem);
	if (elem.getAttribute) {
		if (val === elem.getAttribute('data-nette-empty-value')) {
			val = '';
		}
	}
	return val;
};


/**
 * Validates form element against given rules.
 */
Nette.validateControl = function(elem, rules, onlyCheck) {
	if (!elem.nodeName) { // RadioNodeList
		elem = elem[0];
	}
	rules = rules || Nette.parseJSON(elem.getAttribute('data-nette-rules'));

	for (var id = 0, len = rules.length; id < len; id++) {
		var rule = rules[id], op = rule.op.match(/(~)?([^?]+)/);
		rule.neg = op[1];
		rule.op = op[2];
		rule.condition = !!rule.rules;
		var el = rule.control ? elem.form.elements[rule.control] : elem;
		if (!el.nodeName) { // RadioNodeList
			el = el[0];
		}

		var success = Nette.validateRule(el, rule.op, rule.arg);
		if (success === null) {
			continue;
		}
		if (rule.neg) {
			success = !success;
		}

		if (rule.condition && success) {
			if (!Nette.validateControl(elem, rule.rules, onlyCheck)) {
				return false;
			}
		} else if (!rule.condition && !success) {
			if (Nette.isDisabled(el)) {
				continue;
			}
			if (!onlyCheck) {
				var arr = Nette.isArray(rule.arg) ? rule.arg : [rule.arg];
				var message = rule.msg.replace(/%(value|\d+)/g, function(foo, m) {
					return Nette.getValue(m === 'value' ? el : elem.form.elements[arr[m].control]);
				});
				Nette.addError(el, message);
			}
			return false;
		}
	}

	// LiveForm: addition
	if (!onlyCheck) {
		LiveForm.removeError(elem);
	}

	return true;
};


/**
 * Validates whole form.
 */
Nette.validateForm = function(sender) {
	var form = sender.form || sender, scope = false;
	
	// LiveForm: addition
	LiveForm.forms[form.id].hasError = false;

	if (form['nette-submittedBy'] && form['nette-submittedBy'].getAttribute('formnovalidate') !== null) {
		var scopeArr = Nette.parseJSON(form['nette-submittedBy'].getAttribute('data-nette-validation-scope'));
		if (scopeArr.length) {
			scope = new RegExp('^(' + scopeArr.join('-|') + '-)');
		} else {
			return true;
		}
	}

	// LiveForm: addition
	var success = true;

	var radios = {}, i, elem;

	for (i = 0; i < form.elements.length; i++) {
		elem = form.elements[i];

		if (elem.type === 'radio') {
			if (radios[elem.name]) {
				continue;
			}
			radios[elem.name] = true;
		}

		if ((scope && !elem.name.replace(/]\[|\[|]|$/g, '-').match(scope)) || Nette.isDisabled(elem)) {
			continue;
		}

		if (!Nette.validateControl(elem)) {
			// LiveForm: change
			success = false;
			
			// LiveForm: addition
			if (!LiveForm.options.showAllErrors)
				break;
		}
	}

	// LiveForm: change
	return success;
};


/**
 * Check if input is disabled.
 */
Nette.isDisabled = function(elem) {
	if (elem.type === 'radio') {
		elem = elem.form.elements[elem.name].nodeName ? [elem] : elem.form.elements[elem.name];
		for (var i = 0; i < elem.length; i++) {
			if (!elem[i].disabled) {
				return false;
			}
		}
		return true;
	}
	return elem.disabled;
};


/**
 * Display error message.
 */
Nette.addError = function(elem, message) {
	// LiveForm: addition
	if (elem.focus && !LiveForm.forms[elem.form.id].hasError) {
		if (!LiveForm.focusing) {
			LiveForm.focusing = true;
			elem.focus();
			setTimeout(function() { LiveForm.focusing = false; }, 10);
		}
	}
	if (LiveForm.hasClass(elem, LiveForm.options.noLiveValidation)) {
		// notify errors for elements with disabled live validation
		if (message && !LiveForm.forms[elem.form.id].hasError) {
			alert(message);
		}
	} else {
		LiveForm.addError(elem, message);
	}
	
	// LiveForm: original netteForms.js code
	/*
	if (elem.focus) {
		elem.focus();
	}
	if (message) {
		alert(message);
	}
	*/
};


/**
 * Expand rule argument.
 */
Nette.expandRuleArgument = function(elem, arg) {
	if (arg && arg.control) {
		arg = Nette.getEffectiveValue(elem.form.elements[arg.control]);
	}
	return arg;
};


/**
 * Validates single rule.
 */
Nette.validateRule = function(elem, op, arg) {
	var val = Nette.getEffectiveValue(elem);

	if (op.charAt(0) === ':') {
		op = op.substr(1);
	}
	op = op.replace('::', '_');
	op = op.replace(/\\/g, '');

	var arr = Nette.isArray(arg) ? arg.slice(0) : [arg];
	for (var i = 0, len = arr.length; i < len; i++) {
		arr[i] = Nette.expandRuleArgument(elem, arr[i]);
	}
	return Nette.validators[op] ? Nette.validators[op](elem, Nette.isArray(arg) ? arr : arr[0], val) : null;
};


Nette.validators = {
	filled: function(elem, arg, val) {
		return val !== '' && val !== false && val !== null
			&& (!Nette.isArray(val) || val.length)
			&& (!window.FileList || !(val instanceof FileList) || val.length);
	},

	blank: function(elem, arg, val) {
		return !Nette.validators.filled(elem, arg, val);
	},

	valid: function(elem, arg, val) {
		return Nette.validateControl(elem, null, true);
	},

	equal: function(elem, arg, val) {
		if (arg === undefined) {
			return null;
		}
		val = Nette.isArray(val) ? val : [val];
		arg = Nette.isArray(arg) ? arg : [arg];
		loop:
		for (var i1 = 0, len1 = val.length; i1 < len1; i1++) {
			for (var i2 = 0, len2 = arg.length; i2 < len2; i2++) {
				if (val[i1] == arg[i2]) {
					continue loop;
				}
			}
			return false;
		}
		return true;
	},

	notEqual: function(elem, arg, val) {
		return arg === undefined ? null : !Nette.validators.equal(elem, arg, val);
	},

	minLength: function(elem, arg, val) {
		return val.length >= arg;
	},

	maxLength: function(elem, arg, val) {
		return val.length <= arg;
	},

	length: function(elem, arg, val) {
		arg = Nette.isArray(arg) ? arg : [arg, arg];
		return (arg[0] === null || val.length >= arg[0]) && (arg[1] === null || val.length <= arg[1]);
	},

	email: function(elem, arg, val) {
		return (/^("([ !\x23-\x5B\x5D-\x7E]*|\\[ -~])+"|[-a-z0-9!#$%&'*+\/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+\/=?^_`{|}~]+)*)@([0-9a-z\u00C0-\u02FF\u0370-\u1EFF]([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)+[a-z\u00C0-\u02FF\u0370-\u1EFF][-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF]$/i).test(val);
	},

	url: function(elem, arg, val) {
		return (/^(https?:\/\/|(?=.*\.))([0-9a-z\u00C0-\u02FF\u0370-\u1EFF](([-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,61}[0-9a-z\u00C0-\u02FF\u0370-\u1EFF])?\.)*[a-z\u00C0-\u02FF\u0370-\u1EFF][-0-9a-z\u00C0-\u02FF\u0370-\u1EFF]{0,17}[a-z\u00C0-\u02FF\u0370-\u1EFF]|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[[0-9a-f:]{3,39}\])(:\d{1,5})?(\/\S*)?$/i).test(val);
	},

	regexp: function(elem, arg, val) {
		var parts = typeof arg === 'string' ? arg.match(/^\/(.*)\/([imu]*)$/) : false;
		if (parts) { try {
			return (new RegExp(parts[1], parts[2].replace('u', ''))).test(val);
		} catch (e) {} }
	},

	pattern: function(elem, arg, val) {
		try {
			return typeof arg === 'string' ? (new RegExp('^(' + arg + ')$')).test(val) : null;
		} catch (e) {}
	},

	integer: function(elem, arg, val) {
		return (/^-?[0-9]+$/).test(val);
	},

	'float': function(elem, arg, val) {
		return (/^-?[0-9]*[.,]?[0-9]+$/).test(val);
	},

	min: function(elem, arg, val) {
		return Nette.validators.range(elem, [arg, null], val);
	},

	max: function(elem, arg, val) {
		return Nette.validators.range(elem, [null, arg], val);
	},

	range: function(elem, arg, val) {
		return Nette.isArray(arg) ?
			((arg[0] === null || parseFloat(val) >= arg[0]) && (arg[1] === null || parseFloat(val) <= arg[1])) : null;
	},

	submitted: function(elem, arg, val) {
		return elem.form['nette-submittedBy'] === elem;
	},

	fileSize: function(elem, arg, val) {
		if (window.FileList) {
			for (var i = 0; i < val.length; i++) {
				if (val[i].size > arg) {
					return false;
				}
			}
		}
		return true;
	},
	image: function (elem, arg, val) {
		if (window.FileList && val instanceof FileList) {
			for (var i = 0; i < val.length; i++) {
				var type = val[i].type;
				if (type && type !== 'image/gif' && type !== 'image/png' && type !== 'image/jpeg') {
					return false;
				}
			}
		}
		return true;
	}
};


/**
 * Process all toggles in form.
 */
Nette.toggleForm = function(form, elem) {
	var i;
	Nette.toggles = {};
	for (i = 0; i < form.elements.length; i++) {
		if (form.elements[i].nodeName.toLowerCase() in {input: 1, select: 1, textarea: 1, button: 1}) {
			Nette.toggleControl(form.elements[i], null, null, !elem);
		}
	}

	for (i in Nette.toggles) {
		Nette.toggle(i, Nette.toggles[i], elem);
	}
};


/**
 * Process toggles on form element.
 */
Nette.toggleControl = function(elem, rules, topSuccess, firsttime) {
	rules = rules || Nette.parseJSON(elem.getAttribute('data-nette-rules'));
	var has = false, __hasProp = Object.prototype.hasOwnProperty, handler = function() {
		Nette.toggleForm(elem.form, elem);
	}, handled = [];

	for (var id = 0, len = rules.length; id < len; id++) {
		var rule = rules[id], op = rule.op.match(/(~)?([^?]+)/);
		rule.neg = op[1];
		rule.op = op[2];
		rule.condition = !!rule.rules;
		if (!rule.condition) {
			continue;
		}

		var el = rule.control ? elem.form.elements[rule.control] : elem;
		var success = topSuccess;
		if (success !== false) {
			success = Nette.validateRule(el, rule.op, rule.arg);
			if (success === null) {
				continue;
			}
			if (rule.neg) {
				success = !success;
			}
		}

		if (Nette.toggleControl(elem, rule.rules, success, firsttime) || rule.toggle) {
			has = true;
			if (firsttime) {
				var oldIE = !document.addEventListener, // IE < 9
					els = el.nodeName ? [el] : el; // is radiolist?

				for (var i = 0; i < els.length; i++) {
					if (!Nette.inArray(handled, els[i])) {
						Nette.addEvent(els[i], oldIE && el.type in {checkbox: 1, radio: 1} ? 'click' : 'change', handler);
						handled.push(els[i]);
					}
				}
			}
			for (var id2 in rule.toggle || []) {
				if (__hasProp.call(rule.toggle, id2)) {
					Nette.toggles[id2] = Nette.toggles[id2] || (success ^ !rule.toggle[id2]);
				}
			}
		}
	}
	return has;
};


Nette.parseJSON = function(s) {
	s = s || '[]';
	if (s.substr(0, 3) === '{op') {
		return eval('[' + s + ']'); // backward compatibility
	}
	return window.JSON && window.JSON.parse ? JSON.parse(s) : eval(s);
};


/**
 * Displays or hides HTML element.
 */
Nette.toggle = function(id, visible, srcElement) {
	var elem = document.getElementById(id);
	if (elem) {
		elem.style.display = visible ? '' : 'none';
	}
};


/**
 * Setup handlers.
 */
Nette.initForm = function(form) {
	form.noValidate = 'novalidate';

	// LiveForm: addition
	LiveForm.forms[form.id] = {
		hasError: false
	};

	Nette.addEvent(form, 'submit', function(e) {
		if (!Nette.validateForm(form)) {
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else if (window.event) {
				event.cancelBubble = true;
			}
			return false;
		}
	});

	Nette.addEvent(form, 'click', function(e) {
		e = e || event;
		var target = e.target || e.srcElement;
		form['nette-submittedBy'] = (target.type in {submit: 1, image: 1}) ? target : null;
	});

	Nette.toggleForm(form);

	// LiveForm: addition
	for (var i = 0; i < form.elements.length; i++) {
		LiveForm.setUpHandlers(form.elements[i]);
	}
};


/**
 * Determines whether the argument is an array.
 */
Nette.isArray = function(arg) {
	return Object.prototype.toString.call(arg) === '[object Array]';
};


/**
 * Search for a specified value within an array.
 */
Nette.inArray = function(arr, val) {
	if (Array.prototype.indexOf) {
		return arr.indexOf(val) > -1;
	} else {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === val) {
				return true;
			}
		}
		return false;
	}
};


Nette.addEvent(window, 'load', function() {
	for (var i = 0; i < document.forms.length; i++) {
		Nette.initForm(document.forms[i]);
	}
});


/**
 * Converts string to web safe characters [a-z0-9-] text.
 */
Nette.webalize = function(s) {
	s = s.toLowerCase();
	var res = '', i, ch;
	for (i = 0; i < s.length; i++) {
		ch = Nette.webalizeTable[s.charAt(i)];
		res += ch ? ch : s.charAt(i);
	}
	return res.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

Nette.webalizeTable = {\u00e1: 'a', \u010d: 'c', \u010f: 'd', \u00e9: 'e', \u011b: 'e', \u00ed: 'i', \u0148: 'n', \u00f3: 'o', \u0159: 'r', \u0161: 's', \u0165: 't', \u00fa: 'u', \u016f: 'u', \u00fd: 'y', \u017e: 'z'};
