;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var $wrapper, $footer,
		$logo, $navOpen, $navClose;

	$doc.ready(function() {
		$wrapper  = $('.wrapper');
		$footer   = $('.footer');
		$logo 	  = $('.logo');
		$navOpen  = $('#nav-trigger');
		$navClose = $('#nav-close');

		$navOpen
			.on('click', function(event) {
				event.preventDefault();

				$wrapper.addClass('nav-open');
			});

		$navClose
			.on('click', function(event) {
				event.preventDefault();

				$wrapper.removeClass('nav-open');
			});

		padWrapper();
		logo();

		$win.on('load resize', padWrapper);
		$win.on('load resize', logo);

		//Jquery Slider

		var $priceMin = $('#price-min');
		var $priceMax = $('#price-max');

		$('.slider .slider-bar').slider({
			range: 'min',
			animate: true,
			value: 50,
			min: 0,
			max: 100,
			slide: function(event, ui) {
				$priceMin.text(8 + ui.value);
				$priceMax.text(1100 + ui.value);
			}
		});
	});

	function padWrapper() {
		$wrapper.css({
			paddingBottom: $footer.height()
		});
	}

	function logo() {
		if( $wrapper.width() < 1024 ) {
			$logo.removeClass('logo').addClass('logo-mobile');
		} else {
			$logo.removeClass('logo-mobile').addClass('logo');
		}
	}

})(jQuery, window, document);
