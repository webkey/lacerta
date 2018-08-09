/**
 * !Form validation
 * */
$(function () {
	// !Код для тестирования успешной отправки формы
	// После успешной отправки формы нужно добавить на тег form класс "form-success"
	$.validator.setDefaults({
		submitHandler: function(form) {
			$(form).addClass('form-success')
		}
	});

	var $validationForm = $('.validation-form-js');

	if($validationForm.length) {
		$validationForm.validate({
			errorClass: 'error',
			validClass: 'success',
			errorElement: false,
			errorPlacement: function(error,element) {
				return true;
			},
			highlight: function(element, errorClass, successClass) {
				$(element)
					.removeClass(successClass)
					.addClass(errorClass);
				$(element)
					.closest('form').find('label[for="' + $(element).attr('id') + '"]')
					.removeClass(successClass)
					.addClass(errorClass);
				$(element)
					.closest('.input-holder')
					.removeClass(successClass)
					.addClass(errorClass);
			},
			unhighlight: function(element, errorClass, successClass) {
				$(element)
					.removeClass(errorClass)
					.addClass(successClass);
				$(element)
					.closest('form').find('label[for="' + $(element).attr('id') + '"]')
					.removeClass(errorClass)
					.addClass(successClass);
				$(element)
					.closest('.input-holder')
					.removeClass(errorClass)
					.addClass(successClass);
			}
		});
	}
});