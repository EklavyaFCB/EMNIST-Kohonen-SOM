$(document).ready(function() {

	$('.main').slick({
	dots: true,
	infinite: true,
		slidesToShow: 2,
		adaptiveHeight: true,
		autoplay: true
	});

	$('.slide2').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  adaptiveHeight: true
	})

});