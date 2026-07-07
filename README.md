![](https://heatbadger.now.sh/github/readme/contributte/live-form-validation/)

<p align=center>
  <a href="https://github.com/contributte/live-form-validation/actions"><img src="https://badgen.net/github/checks/contributte/live-form-validation/master?cache=300"></a>
  <a href="https://www.npmjs.com/package/live-form-validation"><img src="https://badgen.net/npm/dm/live-form-validation"></a>
  <a href="https://www.npmjs.com/package/live-form-validation"><img src="https://badgen.net/npm/v/live-form-validation"></a>
</p>
<p align=center>
  <a href="https://www.npmjs.com/package/live-form-validation"><img src="https://badgen.net/npm/node/live-form-validation"></a>
  <a href="https://github.com/contributte/live-form-validation"><img src="https://badgen.net/github/license/contributte/live-form-validation"></a>
  <a href="https://bit.ly/ctteg"><img src="https://badgen.net/badge/support/gitter/cyan"></a>
  <a href="https://bit.ly/cttfo"><img src="https://badgen.net/badge/support/forum/yellow"></a>
  <a href="https://contributte.org/partners.html"><img src="https://badgen.net/badge/sponsor/donations/F96854"></a>
</p>

<p align=center>
Website 🚀 <a href="https://contributte.org">contributte.org</a> | Contact 👨🏻‍💻 <a href="https://f3l1x.io">f3l1x.io</a> | Twitter 🐦 <a href="https://twitter.com/contributte">@contributte</a>
</p>

Nice client-side live form validation for Nette Forms 3.0. Script by default works nicely with Twitter Bootstrap 4.

## Versions

| State       | Version       | Branch   |
|-------------|---------------|----------|
| dev         | `dev-master`  | `master` |
| stable      | `^1.10.0`     | `master` |

## Installation

### NPM

```bash
npm install --save live-form-validation
```

### Manually

All you need is to link the `live-form-validation.js` file in your HTML document. That's it!

The script already contains the `netteForms.js` file, so don't use it again and remove it from your HTML document.

### CDN

- Dev: `https://cdn.jsdelivr.net/gh/contributte/live-form-validation@master/live-form-validation.js`
- Stable: `https://cdn.jsdelivr.net/gh/contributte/live-form-validation@v1.10.1/live-form-validation.js`

**Nette**

- Nette 3.0: `https://cdn.jsdelivr.net/gh/contributte/live-form-validation@v1.10.1/live-form-validation.js`
- Nette 2.4: `https://cdn.jsdelivr.net/gh/contributte/live-form-validation@v1.9.0/live-form-validation.js`

## Usage

Script by default works nicely with Twitter Bootstrap 4, but you can customize the options to fit your exact needs.

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

### Special features

* **Form on load validation** - Adding class `validate-on-load` to form element will execute its validation immediately after page is loaded.

### Advanced

You can edit/replace methods `LiveForm.addError` (shows error message), `LiveForm.removeError` (hides error message), `LiveForm.showValid` (show message if input is correctly filled), `LiveForm.setupHandlers` (sets handlers up for inputs, like focus, blur, onkeyup). These methods can be altered to support some JS framework, ie. jQuery.

If you need to re-validate a form, e.g. after filling it from an AJAX request, write code like this:

```javascript
Nette.validateControl($('#exampleForm-foo'));
```

## Credits

This script is based on work of **Robert Pösel**, **zakrava**, **Radek Ježdík**, **MartyIX** and **David Grudl**. Thank you guys.

## Development

See [how to contribute](https://contributte.org/contributing.html) to this package.

This package is currently maintained by these authors.

<a href="https://github.com/f3l1x">
    <img width="80" height="80" src="https://avatars2.githubusercontent.com/u/538058?v=3&s=80">
</a>

-----

Consider to [support](https://contributte.org/partners.html) **contributte** development team.
Also thank you for using this package.
