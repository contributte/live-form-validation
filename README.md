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
- **errorMessageClass** - CSS class for an error message
- **validMessageClass** - CSS class for a valid message
- **noLiveValidation** - control with this CSS class will have disabled live validation
- **showErrorApartClass** - control with this CSS class will display message in element with ID = errorApartDivPrefix+control's id
- **showErrorApartElementPrefix** - prefix for id of div where to display error message
- **dontShowWhenValidClass** - control with this CSS class will not show valid message
- **messageTag** - tag that will hold the error/valid message
- **messageIdPostfix** - message element id = control id + this postfix
- **errorMessagePrefix** - show this html before error message itself 
- **showAllErrors** - show all errors when submitting form; or use "false" to show only first error
- **showValid** - show message when valid
- **wait** - delay in ms before validating on keyup/keydown; or use "false" to disable it

Furthermore, you can edit methods addError (shows error msg.), removeError (hides error msg.), showValid (show message if input is correctly filled), setupHandlers (sets handlers up for inputs, like focus, blur, onkeyup). These methods can be altered to support some JS framework, ie. jQuery.

Thanks to
---------
This script is based on previous work of **Radek Ježdík**, **MartyIX**, **David Grudl**, **pavelplzak**.

**Thank you all!**