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
				// console.log("title: ", title);
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

					customSelect();
					formValidInit();
					toggleNav();
					togglePop();
					accordionInit();
					offersAccordionInit();
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

		// $thisSelect.on("select2:open", function (e, prop) {
		// 	console.log("e: ", e);
		// 	console.log("prop: ", prop);
		// });
	});
}

/**
 * !Equal height of blocks by maximum height of them
 */
function equalHeight() {
	// equal height
	var $equalHeight = $('.equal-height-js');

	if($equalHeight.length) {
		$equalHeight.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}
}

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
	/**Offers slider*/
	var $offersSlider = $('.offers-slider-js');

	if($offersSlider.length){
		$offersSlider.each(function () {
			var $curSlider = $(this);
			var dur = 200;

			$curSlider.slick({
				speed: dur,
				slidesToShow: 2,
				slidesToScroll: 2,
				lazyLoad: 'ondemand',
				infinite: false,
				dots: true,
				arrows: false,
				// remove touch events
				accessibility: false,
				draggable: false,
				swipe: false,
				touchMove: false,
				responsive:[
					{
						breakpoint: 640,
						settings: {
							// add touch events
							accessibility: true,
							draggable: true,
							swipe: true,
							touchMove: true
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							// add touch events
							accessibility: true,
							draggable: true,
							swipe: true,
							touchMove: true
						}
					}
				]
			});

		});
	}

	/**Extended Offers slider*/
	var $xOffersSlider = $('.x-offers-slider-js');

	if($xOffersSlider.length){
		$xOffersSlider.each(function () {
			var $curSlider = $(this);
			var dur = 200;

			$curSlider.slick({
				speed: dur,
				slidesToShow: 2,
				slidesToScroll: 2,
				lazyLoad: 'ondemand',
				infinite: false,
				dots: true,
				arrows: false,
				// remove touch events
				accessibility: false,
				draggable: false,
				swipe: false,
				touchMove: false,
				responsive:[
					{
						breakpoint: 992,
						settings: {
							// add touch events
							accessibility: true,
							draggable: true,
							swipe: true,
							touchMove: true
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							// add touch events
							accessibility: true,
							draggable: true,
							swipe: true,
							touchMove: true
						}
					}
				]
			});
		});
	}
}

/**
 * !Toggle classes plugin
 * */
;(function($){
	'use strict';

	var $doc = $(document),
		$html = $('html'),
		countFixedScroll = 0;

	var TClass = function(element, config){
		var self,
			$element = $(element),
			dataStopRemove = '[data-tc-stop]',
			classIsAdded = false;

		var callbacks = function() {
				/** track events */
				$.each(config, function (key, value) {
					if(typeof value === 'function') {
						$element.on('tClass.' + key, function (e, param) {
							return value(e, $element, param);
						});
					}
				});
			},
			add = function () {
				if (classIsAdded) return;

				// callback before added class
				$element.trigger('tClass.beforeAdded');

				var arr = [
					$element,
					$(config.switchBtn),
					config.toggleClassTo
				];

				$.each(arr, function () {
					var curElem = this;
					// если массив, то устанавливаем класс на каждый из элемент этого массива
					if ($.isArray(curElem)) {
						$.each(curElem, function () {
							var $curElem = $(this);
							if ($curElem.length) {
								$curElem.addClass(config.modifiers.currentClass);

								$element.trigger('tClass.afterEachAdded', $curElem);
							} else {
								// В консоль вывести предупреждение,
								// если указанного элемента не существует.
								console.warn('Element "' + this + '" does not exist!')
							}
						});
					} else {
						$(this).addClass(config.modifiers.currentClass);

						$element.trigger('tClass.afterEachAdded', $(this));
					}
				});

				if (config.cssScrollFixed) {
					countFixedScroll = ++countFixedScroll;
				}

				classIsAdded = true;

				toggleScroll();

				// callback after added class
				$element.trigger('tClass.afterAdded');
			},
			remove = function () {

				if (!classIsAdded) return;

				// callback beforeRemoved
				$element.trigger('tClass.beforeRemoved');

				var arr = [
					$element,
					$(config.switchBtn),
					config.toggleClassTo
				];

				$.each(arr, function () {
					var curElem = this;
					// если массив, то удаляем класс с каждого элемент этого массива
					if ($.isArray(curElem)) {
						$.each(curElem, function () {
							var $curElem = $(this);
							if ($curElem.length) {
								$curElem.removeClass(config.modifiers.currentClass);

								$element.trigger('tClass.afterEachRemoved', $curElem);
							} else {
								// В консоль вывести предуприждение,
								// если указанного элемента не существует.
								console.warn('Element "' + this + '" does not exist!')
							}
						});
					} else {
						$(this).removeClass(config.modifiers.currentClass);

						$element.trigger('tClass.afterEachRemoved', $(this));
					}
				});

				classIsAdded = false;

				if (config.cssScrollFixed) {
					countFixedScroll = --countFixedScroll;
				}
				toggleScroll();

				// callback afterRemoved
				$element.trigger('tClass.afterRemoved');
			},
			events = function () {
				$element.on('click', function (event) {
					var $this = $(this);

					if ($this.attr('data-tc-only-remove') !== undefined) {
						remove();

						return false;
					}

					if ($this.attr('data-tc-only-add') !== undefined) {
						add();

						return false;
					}

					if (classIsAdded) {
						remove();

						event.preventDefault();
						return false;
					}

					add();

					event.preventDefault();
					event.stopPropagation();
				});

				if (config.switchBtn) {
					$html.on('click', config.switchBtn, function (event) {
						var $this = $(this);

						event.preventDefault();

						if ($this.attr('data-tc-only-add') !== undefined) {
							add();

							return false;
						}

						if ($this.attr('data-tc-only-remove') !== undefined) {
							remove();

							return false;
						}

						if (classIsAdded) {
							remove();

							return false;
						}

						add();

						event.stopPropagation();
					})
				}
			},
			toggleScroll = function () {
				if (config.cssScrollFixed) {
					var mod = (config.cssScrollFixed === true) ? 'css-scroll-fixed' : config.cssScrollFixed;
					if (!countFixedScroll) {
						// Удаляем с тега html
						// класс блокирования прокрутки
						$html.removeClass(mod);
					} else {
						// Добавляем на тег html
						// класс блокирования прокрутки.
						$html.addClass(mod);
					}
				}
			},
			closeByClickOutside = function () {
				$doc.on('click', function(event){
					if(classIsAdded && config.removeOutsideClick && !$(event.target).closest(dataStopRemove).length) {
						remove();
						// event.stopPropagation();
					}
				});
			},
			closeByClickEsc = function () {
				$doc.keyup(function(event) {
					if (classIsAdded && event.keyCode === 27) {
						remove();
					}
				});
			},
			init = function () {
				$element.addClass(config.modifiers.init);
				$element.trigger('tClass.afterInit');
			};

		self = {
			callbacks: callbacks,
			remove: remove,
			events: events,
			closeByClickOutside: closeByClickOutside,
			closeByClickEsc: closeByClickEsc,
			init: init
		};

		return self;
	};

	// $.fn.tClass = function (options, params) {
	$.fn.tClass = function () {
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++) {
			if (typeof opt === 'object' || typeof opt === 'undefined') {
				_[i].tClass = new TClass(_[i], $.extend(true, {}, $.fn.tClass.defaultOptions, opt));
				_[i].tClass.callbacks();
				_[i].tClass.events();
				_[i].tClass.closeByClickOutside();
				_[i].tClass.closeByClickEsc();
				_[i].tClass.init();
			}
			else {
				ret = _[i].tClass[opt].apply(_[i].tClass, args);
			}
			if (typeof ret !== 'undefined') {
				return ret;
			}
		}
		return _;
	};

	$.fn.tClass.defaultOptions = {
		switchBtn: null,
		toggleClassTo: null,
		removeOutsideClick: true,
		cssScrollFixed: false,
		modifiers: {
			init: 'tc--initialized',
			currentClass: 'tc--active'
		}
	};

})(jQuery);

/**
 * !Toggle Navigation
 * */
function toggleNav() {
	var $nav = $('.nav-opener-js');

	if ($nav.length) {
		$nav.tClass({
			toggleClassTo: ['html', '.nav-overlay-js', '.shutter--nav-js']
			, modifiers: {
				currentClass: 'nav-is-open open-only-mob'
				// open-only-mob - используется для адаптива
			}
			, cssScrollFixed: false
			, removeOutsideClick: true
		});
	}
}

/**
 * !Toggle Popup
 * */
function togglePop() {
	var $pop = $('.pop-js');

	if ($pop.length) {
		var $cont = $('.pop-content-js'),
			$open = $('.pop-open-js'),
			$close = $('.pop-close-js'),
			openClass = 'pop-is-open';

		$open.on('click', function (e) {
			e.preventDefault();

			var $cur = $(this), $curPop = $cur.closest($pop);
			if ($curPop.hasClass(openClass)) {
				$curPop.removeClass(openClass);
			} else {
				$pop.removeClass(openClass);
				$curPop.addClass(openClass);
			}

			event.stopPropagation();
		});

		$close.on('click', function (e) {
			e.preventDefault();

			$(this).closest($pop).removeClass(openClass);

			event.stopPropagation();
		});

		$(document).on('click', function(e){
			if( $(e.target).closest($cont).length )
				return;
			$pop.removeClass(openClass);
			e.stopPropagation();
		});
	}
}

/**
 * !Rolls Up plugin
 * */
(function($){
	'use strict';

	var MsRolls = function(element, config){
		var self,
			$element = $(element),
			$panel = $(config.panel, $element),
			isAnimated = false,
			// activeId,
			pref = 'ms-rolls__',
			initClasses = {
				element: pref + 'container',
				item: pref + 'item',
				header: pref + 'header',
				hand: pref + 'hand',
				panelWrap: pref + 'panel-wrap',
				panel: pref + 'panel'
			};

		var dataClpsd = $element.attr('data-rolls-collapsed');
		var collapsed = (dataClpsd === "true" || dataClpsd === "false") ? dataClpsd === "true" : config.collapsed;

		var callbacks = function () {
			/** track events */
			$.each(config, function (key, value) {
				if (typeof value === 'function') {
					$element.on('msRolls.' + key, function (e, param) {
						return value(e, $element, param);
					});
				}
			});
		}, open = function (_panel) {

			// console.log('open');
			var callback = arguments[1],
				// $activePanelWrap = _panel.parent(),
				// $activeHeader = $activePanelWrap.prev(config.header),

				$activeHeader = _panel.parentsUntil(element).prev(config.header),
				$activePanelWrap = $activeHeader.next(),
				$activePanel = $activePanelWrap.children(config.panel);

			var panelLength = 0;
			$.each($activePanel, function (index, panel) {
				if (!$(panel).data('opened')) {
					++panelLength;
				}
			});

			// Открыть панель
			$.each($activePanel, function (index, panel) {

				var $eachPanel = $(panel);

				// Выборка только закрытых панелей на момент открытия
				var opened = 'opened';
				if (!$eachPanel.data(opened)) {
					var $eachPanelWrap = $eachPanel.parent(),
						$eachHeader = $eachPanelWrap.prev(),
						$eachItem = $eachPanel.closest(config.item);

					// Добавить класс на активные элементы
					toggleClass([$eachItem, $eachHeader, $(config.hand, $eachHeader), $eachPanel], true);

					if (index === panelLength - 1) {
						// Закрыть соседние панели,
						// если открыты
						if (collapsed) {
							$.each($(config.panel, $eachItem.siblings()), function (index, panel) {
								$(panel).data('opened') && closePanel($(panel));
							});
						}

						// Открываем, анимируя высоту, только ТЕКУЩУЮ
						// или первую, если текущая открывается внутри закрытых панелей
						// (например, при открытии по хештегу или через метод)
						// Т.е., если родительская панель закрыта, то анимируется только она,
						// А внутренние панели открываются без анимации (в т.ч. текущая)
						changeHeight($eachPanelWrap, $eachPanel.outerHeight(), function () {
							$eachPanel.css({
								position: 'relative',
								left: 'auto',
								top: 'auto'
							});

							// Указать в data-атрибуте, что панель открыта
							$eachPanel.data('opened', true);

							// Вызов события после открытия каждой панели панели
							$element.trigger('msRolls.afterEachOpen');

							// Вызов события после открытия текущей панели
							$element.trigger('msRolls.afterOpen');

							// Вызов callback функции после открытия панели
							if (typeof callback === "function") {
								callback();
							}
						});
					} else {
						$eachPanel.css({
							position: 'relative',
							left: 'auto',
							top: 'auto'
						});

						// Указать в data-атрибуте, что панель открыта
						$eachPanel.data(opened, true);

						// Вызов события после открытия каждой панели панели
						$element.trigger('msRolls.afterEachOpen');
					}
				}

			});

		}, close = function (_panel) {
			var callback = arguments[1];

			// Закрыть панели внутры текущей,
			// если открыты
			var $childrenPanel = $(config.panel, _panel);
			$.each($childrenPanel, function () {
				var $eachPanel = $(this);
				$eachPanel.data('opened') && closePanel($eachPanel);
			});

			// Закрыть текущую панель
			closePanel(_panel, function () {
				// Вызов callback функции после закрытия панели
				if (typeof callback === "function") {
					callback();
				}
			});

		}, closePanel = function (_panel) {
			// console.log('close');
			if (_panel.data('opened')) {
				var callback = arguments[1],

					$currentPanelWrap = _panel.parent(),
					$currentHeader = $currentPanelWrap.prev(config.header);

				// Удалить активный класс со всех элементов
				toggleClass([_panel.closest(config.item), $currentHeader, $(config.hand, $currentHeader), _panel], false);

				// Закрыть панель
				changeHeight($currentPanelWrap, 0, function () {
					// Вызов события после закрытия каждой панели
					$element.trigger('msRolls.afterEachClose');

					_panel
						.css({
							position: 'absolute',
							left: 0,
							top: 0
						})
						.data('opened', false);// Указать в data-атрибуте, что панель закрыта

					// Вызов callback функции после закрытия панели
					if (typeof callback === "function") {
						callback();
					}
				});
			}
		}, changeHeight = function (_element, _val) {
			var callback = arguments[2];

			_element.animate({
				'height': _val
			}, config.animationSpeed, function () {

				_element.css({
					'height': ''
				});

				if (typeof callback === "function") {
					callback();
				}

				isAnimated = false;
			});
		}, toggleClass = function (arr) {
			var remove = arguments[1] === false;
			$.each(arr, function () {
				var iElem = this;
				// если массив, то устанавливаем класс на каждый из элемент этого массива
				if ($.isArray(iElem)) {
					$.each(iElem, function () {
						var $curElem = $(this);
						if ($curElem.length) {
							// Если второй аргумент false, то удаляем класс
							if (remove) {
								$curElem.removeClass(config.modifiers.activeClass);
							} else {
								// Если второй аргумент не false, то добавляем класс
								$curElem.addClass(config.modifiers.activeClass);
							}
						} else {
							// В консоль вывести предупреждение,
							// если указанного элемента не существует.
							console.warn('Element "' + this + '" does not exist!')
						}
					});
				} else {
					// Если второй аргумент false, то удаляем класс
					if (remove) {
						$(iElem).removeClass(config.modifiers.activeClass);
					} else {
						// Если второй аргумент не false, то добавляем класс
						$(iElem).addClass(config.modifiers.activeClass);
					}
				}
			});
		}, events = function () {
			$element.on(config.event + ' focus', config.hand, function (event) {
				// console.log("isAnimated: ", isAnimated);

				// console.log("event: ", event);
				// console.log(1);

				// Если панель во время клика находится в процессе анимации,
				// то выполнение функции прекратится
				if (isAnimated) {
					event.preventDefault();
					return false;
				}

				var $currentHand = $(this);

				// Если текущий пункт не содержит панелей,
				// то выполнение функции прекратится
				if (!$currentHand.closest(config.item).has(config.panel).length) {
					return false;
				}

				event.preventDefault();

				// Начало анимирования панели
				// Включить флаг анимации
				isAnimated = true;

				// console.log("Текущая панель открыта?: ", $currentPanel.data('opened'));

				var $currentPanel = $currentHand.closest(config.header).next().children(config.panel);

				if (!$currentPanel.data('opened')) {
					// Открыть текущую панель
					open($currentPanel);
				} else {
					// Закрыть текущую панель
					close($currentPanel, function () {
						// callback after current panel close
						$element.trigger('msRolls.afterClose');
					});
				}
			});
		}, onfocus = function () {
			$element.on('focus', config.hand, function (event) {
				// Если во время получения фокуса панель находится в процессе анимации,
				// то выполнение функции прекратится
				if (isAnimated) {
					event.preventDefault();
					return false;
				}

				var $currentHand = $(this);

				// Если текущий пункт не содержит панелей,
				// то выполнение функции прекратится
				if (!$currentHand.closest(config.item).has(config.panel).length) {
					return false;
				}

				event.preventDefault();

				// Открыть текущую панель
				var $currentPanel = $currentHand.closest(config.header).next().children(config.panel);

				if (!$currentPanel.data('opened')) {
					// Начало анимирования панели
					// Включить флаг анимации
					isAnimated = true;

					open($currentPanel);
				}
			})
		}, init = function () {
			// $element.addClass(initClasses.element);
			// $(config.item, $element).addClass(initClasses.item);
			// $(config.header, $element).addClass(initClasses.header);
			// $(config.panel, $element).addClass(initClasses.panel);
			$(config.hand, $element)
			// .addClass(initClasses.hand)
				.attr('tabindex', 0);

			var $panelWrap = $('<div/>', {
				class: initClasses.panelWrap,
				css: {
					display: 'block',
					position: 'relative',
					overflow: 'hidden'
				}
			});

			$panel.wrap($panelWrap);

			$.each($panel, function (index, panel) {
				$(panel).css({
					display: 'block',
					width: '100%'
				});

				if($(panel).hasClass(config.modifiers.activeClass)) {

					var $activeHeader = $(panel).parentsUntil(element).prev(config.header),
						$activePanel = $activeHeader.next().children(config.panel);

					// Добавить класс на активные элементы
					toggleClass([$(panel).parents(config.item), $activePanel, $activeHeader, $(config.hand, $activeHeader)], true);

					$activePanel.css({
						position: 'relative',
						left: 'auto',
						top: 'auto'
					});

					// Указать в data-атрибуте, что панель(и) открыта(ы)
					$activePanel.data('opened', true);
				} else {
					$(panel).css({
						position: 'absolute',
						left: 0,
						top: 0
					})
				}
			});

			$element.addClass(config.modifiers.init);

			$element.trigger('msRolls.afterInit');
		};

		self = {
			callbacks: callbacks,
			open: open,
			close: close,
			toggleClass: toggleClass,
			events: events,
			// onfocus: onfocus,
			init: init
		};

		return self;
	};

	$.fn.msRolls = function () {
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++) {
			if (typeof opt === 'object' || typeof opt === 'undefined') {
				_[i].msRolls = new MsRolls(_[i], $.extend(true, {}, $.fn.msRolls.defaultOptions, opt));
				_[i].msRolls.init();
				_[i].msRolls.callbacks();
				_[i].msRolls.events();
				// _[i].msRolls.onfocus();
			}
			else {
				ret = _[i].msRolls[opt].apply(_[i].msRolls, args);
			}
			if (typeof ret !== 'undefined') {
				return ret;
			}
		}
		return _;
	};

	$.fn.msRolls.defaultOptions = {
		item: '.rolls__item-js',
		header: '.rolls__header-js',
		hand: '.rolls__hand-js',
		panel: '.rolls__panel-js',
		event: 'click',
		animationSpeed: 300,
		collapsed: true,
		modifiers: {
			init: 'rolls--initialized',
			activeClass: 'rolls--active',
			currentClass: 'current'
		}
	};

})(jQuery);

/**
 * !Accordion Initial
 * */

function accordionInit() {
	var $accordion = $('.rolls-js');

	if ($accordion.length) {
		$accordion.msRolls({
			animationSpeed: 330
			, modifiers: {
				activeClass: 'is-open'
			}
		});
	}
}

/**
 * !Offers Accordion Initial
 * */

function offersAccordionInit() {
	var $offersAccord = $('.offers-rolls-js');

	if ($offersAccord.length) {
		$offersAccord.msRolls({
			item: '.offers-rolls__item-js'
			, header: '.offers-rolls__header-js'
			, hand: '.offers-rolls__hand-js'
			, panel: '.offers-rolls__panel-js'
			, animationSpeed: 330
			, collapsed: false
			, modifiers: {
				activeClass: 'is-open'
			}
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
	equalHeight();
	slidersInit();
	toggleNav();
	togglePop();
	accordionInit();
	offersAccordionInit();
	objectFitImages(); // object-fit-images initial
});