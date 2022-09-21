# Contributte / Live Form Validation

## Content

- [Install](#install)
	- [NPM](#npm)
	- [Manually](#manually)
	- [CDN](#cdn)
- [Usage](#usage)
	- [Options](#options)
	- [Available options](#available-options)
	- [Special features](#special-features)
	- [Advanced](#advanced)

## Install

### NPM

```bash
npm install --save live-form-validation
```

### Manually

All you need is to link `live-form-validation.js` file from to your HTML document. That's it!

The script already contains the `netteForms.js` file, so don't use it again and remove it from your HTML document.

### CDN

- Dev: `https://cdn.jsdelivr.net/gh/contributte/live-form-validation@master/live-form-validation.js`
- Stable: `https://cdn.jsdelivr.net/gh/contributte/live-form-validation@v1.9.0/live-form-validation.js`

**Nette**

- Nette 3.0: `https://cdn.jsdelivr.net/gh/contributte/live-form-validation@master/live-form-validation.js`
- Nette 2.4: `https://cdn.jsdelivr.net/gh/contributte/live-form-validation@v1.9.0/live-form-validation.js`

## Usage

Script by default works nicely with Twitter Bootstrap 3, but you can customize the options to fit your exact needs.

### Options

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
**focusScreenOffsetY** | vertical screen offset in px to scroll after focusing element with error (useful when using fixed navbar menu which may otherwise obscure the element in focus); or use "false" for default behavior

#### Special features

* **Form on load validation** - Adding class `validate-on-load` to form element will execute its validation immediately after page is loaded.

### Advanced

You can edit/replace methods `LiveForm.addError` (shows error message), `LiveForm.removeError` (hides error message), `LiveForm.showValid` (show message if input is correctly filled), `LiveForm.setupHandlers` (sets handlers up for inputs, like focus, blur, onkeyup). These methods can be altered to support some JS framework, ie. jQuery.

If you need re-validate form e.g. fiiling form from AJAX request write code sometibng like that:

```javascript
Nette.validateControl($('#exampleForm-foo'));
```

### Authors 

This script is based on work of **Robert Pösel**, **zakrava**, **Radek Ježdík**, **MartyIX** and **David Grudl**. Thank you guys.
