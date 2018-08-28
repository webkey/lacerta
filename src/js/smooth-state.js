'use strict';
/**
 * !Smooth State
 * */
$(function () {
	var $page = $('#page'),
		$cover = $('.c-transition'),
		$heading = $('.heading-js'),
		$title = $('h1', $heading),
		timeout,
		options = {
			debug: true,
			prefetch: true,
			cacheLength: 10, // The number of pages to cache
			onBefore: function($currentTarget, $container) {
				$cover.removeClass('is-leaving').removeClass('is-active');

				$heading.removeClass('is-leaving').removeClass('is-active');
				var title = $currentTarget.attr('data-heading') || '';
				$title.html(title);
				// Align heading
				var dataHeadingAlign = $currentTarget.attr('data-heading-align') || '';
				$heading.attr('data-heading-align', dataHeadingAlign);
				// Add logotype
				$heading.toggleClass('has-logo', $currentTarget.attr('data-has-logo') !== undefined);
			},
			onStart: {
				duration: 1100, // Duration of our animation
				render: function ($container) {
					// Add your CSS animation reversing class
					$container.addClass('is-exiting');
					$cover.addClass('is-active');
					$heading.addClass('is-active');
					// Close navigation if it is opened
					$('.nav-opener-js').tClass('remove');
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

					clearTimeout(timeout);

					timeout = setTimeout(function () {
						$cover.removeClass('is-leaving is-active');
						$heading.removeClass('is-leaving is-active');
					}, 1100);

					customSelect();
					formMaskInit();
					formValidInit();
					slidersInit();
					equalHeight();
					toggleNav();
					togglePop();
					accordionInit();
					offersAccordionInit();
					singleDrop();
					locationsMap();
					contactsMap();
				}
			}
		},
		smoothState = $page.smoothState(options).data('smoothState');
});