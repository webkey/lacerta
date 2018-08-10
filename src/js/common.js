'use strict';
/**
 * !Smooth State
 * */

$(function () {
	var $page = $('#page'),
		$cover = $('.c-transition'),
		$heading = $('.heading-js'),
		$title = $('h1', $heading),
		options = {
			debug: true,
			prefetch: true,
			// cacheLength: 4, // The number of pages to cache
			onBefore: function($currentTarget, $container) {
				$cover.removeClass('is-leaving').removeClass('is-active');

				$heading.removeClass('is-leaving').removeClass('is-active');
				var title = $currentTarget.attr('data-heading') || '';
				console.log("title: ", title);
				$title.html(title);

				// console.log("$currentTarget: ", $container.attr());
				// heading.text($currentTarget[0].pathname.substr(1));
			},
			onStart: {
				duration: 1100, // Duration of our animation
				render: function ($container) {
					// Add your CSS animation reversing class
					$container.addClass('is-exiting');
					$cover.addClass('is-active');
					$heading.addClass('is-active');
					// Restart your animation
					smoothState.restartCSSAnimations();
				}
			},
			onReady: {
				duration: 0,
				render: function ($container, $newContent) {
					// Remove your CSS animation reversing class
					$container.removeClass('is-exiting');
					// Inject the new content
					$container.html($newContent);
					$cover.addClass('is-leaving');
					$heading.addClass('is-leaving');
				}
			}
		},
		smoothState = $page.smoothState(options).data('smoothState');
});

/**
 * !Resize only width
 * */
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth !== currentWidth;
	if (resizeByWidth) {
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;
	}
});

/**
 * !Detected touchscreen devices
 * */
var TOUCH = Modernizr.touchevents;
var DESKTOP = !TOUCH;

/**
 *  !Add placeholder for old browsers
 * */
function placeholderInit() {
	$('[placeholder]').placeholder();
}

/**
 * !Show print page by click on the button
 * */
function printShow() {
	$('.view-print').on('click', function (e) {
		e.preventDefault();
		window.print();
	})
}

/**
 * !Toggle class on a form elements on focus
 * */
function inputFocusClass() {
	var $inputs = $('.field-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classFocus = 'input--focus';

		$inputs.focus(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			$currentField.addClass(classFocus);
			$currentField.prev('label').addClass(classFocus);
			$currentField.closest($selectWrap).prev('label').addClass(classFocus);
			$currentFieldWrap.addClass(classFocus);
			$currentFieldWrap.find('label').addClass(classFocus);

		}).blur(function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			$currentField.removeClass(classFocus);
			$currentField.prev('label').removeClass(classFocus);
			$currentField.closest($selectWrap).prev('label').removeClass(classFocus);
			$currentFieldWrap.removeClass(classFocus);
			$currentFieldWrap.find('label').removeClass(classFocus);

		});
	}
}

/**
 * !Toggle class on a form elements if this one has a value
 * */
function inputHasValueClass() {
	var $inputs = $('.field-js');

	if ($inputs.length) {
		var $fieldWrap = $('.input-wrap');
		var $selectWrap = $('.select');
		var classHasValue = 'input--has-value';

		var switchHasValue = function () {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			//first element of the select must have a value empty ("")
			if ($currentField.val().length === 0) {
				$currentField.removeClass(classHasValue);
				$currentField.prev('label').removeClass(classHasValue);
				$currentField.closest($selectWrap).prev('label').removeClass(classHasValue);
				$currentFieldWrap.removeClass(classHasValue);
				$currentFieldWrap.find('label').removeClass(classHasValue);
			} else if (!$currentField.hasClass(classHasValue)) {
				$currentField.addClass(classHasValue);
				$currentField.prev('label').addClass(classHasValue);
				$currentField.closest($selectWrap).prev('label').addClass(classHasValue);
				$currentFieldWrap.addClass(classHasValue);
				$currentFieldWrap.find('label').addClass(classHasValue);
			}
		};

		$.each($inputs, function () {
			switchHasValue.call(this);
		});

		$inputs.on('keyup change', function () {
			switchHasValue.call(this);
		});
	}
}

/**
 * !Initial custom select for cross-browser styling
 * */
function customSelect() {
	$.each($('select.cselect'), function () {
		var $thisSelect = $(this),
			headClass,
			dropClass;

		headClass = $thisSelect.closest('.small-field').length ? 'cselect-head small-field' : 'cselect-head';
		dropClass = $thisSelect.closest('.small-field').length ? 'cselect-drop small-field' : 'cselect-drop';
		$thisSelect.select2({
			language: "ru",
			width: '100%',
			containerCssClass: headClass,
			dropdownCssClass: dropClass,
			minimumResultsForSearch: Infinity
		});

		$thisSelect.on("select2:open", function (e, prop) {
			console.log("e: ", e);
			console.log("prop: ", prop);
		});
	});
}

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
	//images carousel
	var $imagesCarousel = $('.images-slider-js');

	if($imagesCarousel.length){
		var slideCounterTpl = '' +
			'<div class="slider-counter">' +
			'<span class="slide-curr">0</span>/<span class="slide-total">0</span>' +
			'</div>';

		var titleListTpl = $('<div class="flashes"></div>');

		$imagesCarousel.each(function () {
			var $curSlider = $(this);
			var $imgList = $curSlider.find('.images-slider__list');
			var $imgListItem = $imgList.find('.images-slider__item');
			var dur = 200;

			// create titles
			$imgList.after(titleListTpl.clone());
			var $titleList = $curSlider.find('.flashes');
			$.each($imgListItem, function () {
				var $this = $(this);
				$titleList.append($('<div class="flashes__item">' + $this.find('.caption').html() + '</div>'));
			});

			// initialized slider of titles
			$titleList.slick({
				fade: true,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				asNavFor: $imgList,
				dots: false,
				arrows: false,

				swipe: false,
				touchMove: false,
				draggable: false
			});

			// initialized slider of images
			$imgList.on('init', function (event, slick) {
				$(slick.$slider).append($(slideCounterTpl).clone());

				$('.slide-total', $(slick.$slider)).text(slick.$slides.length);
				$('.slide-curr', $(slick.$slider)).text(slick.currentSlide + 1);
			}).slick({
				fade: false,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: $titleList,
				lazyLoad: 'ondemand',
				infinite: true,
				dots: true,
				arrows: true
			}).on('beforeChange', function (event, slick, currentSlide, nextSlider) {
				$('.slide-curr', $(slick.$slider)).text(nextSlider + 1);
			});

		});
	}
}

/**
 * =========== !ready document, load/resize window ===========
 */

$(document).ready(function () {
	placeholderInit();
	printShow();
	inputFocusClass();
	inputHasValueClass();
	customSelect();
	slidersInit();
	objectFitImages(); // object-fit-images initial
});
