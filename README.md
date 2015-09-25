Live Form Validation (for Nette Forms 2.3)
==========================================
Nice client-side live form validation for Nette Forms 2.3.

Script by default works nicely with Twitter Bootstrap 3, but you can customize the options to fit your exact needs.

Installation
------------
All you need is to link `live-form-validation.js` file from to your HTML document. That's it!

The script already contains the `netteForms.js` file, so don't use it again and remove it from your HTML document.

Options
-------
- **showMessageClassOnParent** - CSS class of control's parent where error/valid class should be added; or "false" to use control directly
- **controlErrorClass** - CSS class for an invalid control
- **controlValidClass** - CSS class for a valid control
- **messageErrorClass** - CSS class for an error message
- **enableHiddenMessageClass** - control with this CSS class will show error/valid message even when control itself is hidden (useful for controls which are hidden and wrapped into special component)
- **disableLiveValidationClass** - control with this CSS class will have disabled live validation
- **disableShowValidClass** - control with this CSS class will not show valid message
- **messageTag** - tag that will hold the error/valid message
- **messageIdPostfix** - message element id = control id + this postfix
- **messageErrorPrefix** - show this html before error message itself 
- **showAllErrors** - show all errors when submitting form; or use "false" to show only first error
- **showValid** - show message when valid
- **wait** - delay in ms before validating on keyup/keydown; or use "false" to disable it

Furthermore, you can edit methods addError (shows error msg.), removeError (hides error msg.), showValid (show message if input is correctly filled), setupHandlers (sets handlers up for inputs, like focus, blur, onkeyup). These methods can be altered to support some JS framework, ie. jQuery.

Form on load validation
-----------------------
Adding class **validate-on-load** to form element will execute its validation immediately after page is loaded.

Thanks to
---------
This script is based on work of **Robert Pösel**, **Radek Ježdík**, **MartyIX** and **David Grudl**.

**Thank you all!**
