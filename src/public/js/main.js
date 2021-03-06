
$(document).ready(function() {

	// Back to top button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function(){
	$('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
		return false;
	});

	// Initiate superfish on nav menu
	$('.nav-menu').superfish({
		animation: {
			opacity: 'show'
		},
		speed: 200
	});

	// Mobile Navigation
	if ($('#nav-menu-container').length) {
		var $mobile_nav = $('#nav-menu-container').clone().prop({
			id: 'mobile-nav'
		});
		$mobile_nav.find('> ul').attr({
			'class': '',
			'id': ''
		});
			$('#header').append($mobile_nav);
			$('#header > .container-fluid').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
			$('#header').append('<div id="mobile-body-overly"></div>');
		$('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

		$(document).on('click', '.menu-has-children i', function(e) {
			$(this).next().toggleClass('menu-item-active');
			$(this).nextAll('ul').eq(0).slideToggle();
			$(this).toggleClass("fa-chevron-up fa-chevron-down");
		});

		$(document).on('click', '#mobile-nav-toggle', function(e) {
			$('body').toggleClass('mobile-nav-active');
			$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
			$('#mobile-body-overly').toggle();
	});

	$(document).click(function(e) {
		var container = $("#mobile-nav, #mobile-nav-toggle");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
		if ($('body').hasClass('mobile-nav-active')) {
			$('body').removeClass('mobile-nav-active');
			$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
			$('#mobile-body-overly').fadeOut();
		}
		}
	});
	} else if ($("#mobile-nav, #mobile-nav-toggle").length) {
		$("#mobile-nav, #mobile-nav-toggle").hide();
	}

	// Smooth scroll for the menu and links with .scrollto classes
	$('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			if (target.length) {
			var top_space = 0;

			if ($('#header').length) {
				top_space = $('#header').outerHeight();

				if( ! $('#header').hasClass('header-fixed') ) {
				top_space = top_space - 20;
				}
			}

			$('html, body').animate({
				scrollTop: target.offset().top - top_space
			}, 1500, 'easeInOutExpo');

			if ($(this).parents('.nav-menu').length) {
				$('.nav-menu .menu-active').removeClass('menu-active');
				$(this).closest('li').addClass('menu-active');
			}

			if ($('body').hasClass('mobile-nav-active')) {
				$('body').removeClass('mobile-nav-active');
				$('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
				$('#mobile-body-overly').fadeOut();
			}
			return false;
		}
	}
	});

	// Header scroll class
	$(window).scroll(function() {
		if ($(this).scrollTop() > 20) {
			$('#header').addClass('header-scrolled');
		} else {
			$('#header').removeClass('header-scrolled');
		}
	});

	// Intro carousel
	var introCarousel = $(".carousel");
	var introCarouselIndicators = $(".carousel-indicators");
		introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
		(index === 0) ?
		introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
		introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

		$(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') +"')");
		$(this).children('.carousel-background').remove();
	});

	$(".carousel").swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');
		},
		allowPageScroll:"vertical"
	});

	// minimum setup
	$('.selectpicker').selectpicker({
		size: '6',
		liveSearch: true,
		container: "body"
	});
	$('.selectpickernone').selectpicker({
		size: '6',
		container: "body"
	});

});

//format number
function formatNumber(text) {
	return text.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
}

/* toastr success*/
function toastr_success(mes, ttl) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "300",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr.success(mes, ttl);
}

/* toastr error*/
function toastr_error(mes, ttl) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "300",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr.error(mes, ttl);
}
/* toastr error*/
function toastr_danger(mes, ttl) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "300",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr.error(mes, ttl);
}
/* toastr warning*/
function toastr_warning(mes, ttl) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "300",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr.warning(mes, ttl);
}

/* toastr info*/
function toastr_info(ttl, mes) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "300",
        "timeOut": "10000",
        "extendedTimeOut": "10000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr.info(mes, ttl);
}

function copyCode(elem) {
	var $this = $(elem); //< -- wrap the element in a jQuery wrapper
	var copyText = $this.parent().siblings('input[type=text]');
	copyText.select();

	/* Copy the text inside the text field */
	document.execCommand("copy");
	toastr_success('Sao chép thành công', "");
}