Live Form Validation (for Nette Forms 2.4)
==========================================
Nice client-side live form validation for Nette Forms 2.4.

Script by default works nicely with Twitter Bootstrap 3, but you can customize the options to fit your exact needs.

Installation
------------
All you need is to link `live-form-validation.js` file from to your HTML document. That's it!

The script already contains the `netteForms.js` file, so don't use it again and remove it from your HTML document.

Options
-------
You can change default options by calling `LiveForm.setOptions({ ... });` **after** including the script. Give only options that you want to change. For example:

```js
<script src="/js/live-form-validation.js"></script> 
<script>
	LiveForm.setOptions({
		messageErrorPrefix: 'Error: ',
		wait: 500
	});
</script> 
```

Alternatively, if you want to set options **before** the script is loaded, create `LiveFormOptions = { ... };` with options that you want to change. For example:

```js
<script>
	LiveFormOptions = {
		messageErrorPrefix: 'Error: ',
		wait: 500
	};
</script> 
<script src="/js/live-form-validation.js"></script> 
```

### Available options

Option | Description
------ | -----------
**showMessageClassOnParent** | CSS class of control's parent where error/valid class should be added; or "false" to use control directly
**messageParentClass** | CSS class of control's parent where error/valid message should be added (fallback to direct parent if not found); or "false" to use control's direct parent
**controlErrorClass** | CSS class for an invalid control
**controlValidClass** | CSS class for a valid control
**messageErrorClass** | CSS class for an error message
**enableHiddenMessageClass** | control with this CSS class will show error/valid message even when control itself is hidden (useful for controls which are hidden and wrapped into special component)
**disableLiveValidationClass** | control with this CSS class will have disabled live validation
**disableShowValidClass** | control with this CSS class will not show valid message
**messageTag** | tag that will hold the error/valid message
**messageIdPostfix** | message element id = control id + this postfix
**messageErrorPrefix** | show this html before error message itself
**showAllErrors** | show all errors when submitting form; or use "false" to show only first error
**showValid** | show message when valid
**wait** | delay in ms before validating on keyup/keydown; or use "false" to disable it

#### Special features
* **Form on load validation** - Adding class `validate-on-load` to form element will execute its validation immediately after page is loaded.

### Advanced
You can edit/replace methods `LiveForm.addError` (shows error message), `LiveForm.removeError` (hides error message), `LiveForm.showValid` (show message if input is correctly filled), `LiveForm.setupHandlers` (sets handlers up for inputs, like focus, blur, onkeyup). These methods can be altered to support some JS framework, ie. jQuery.

Thanks to
---------
This script is based on work of **Robert Pösel**, **zakrava**, **Radek Ježdík**, **MartyIX** and **David Grudl**.

**Thank you all!**
