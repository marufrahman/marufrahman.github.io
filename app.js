var slideshow = function() {
	var currentSlide = $('.active-slide');
	var nextSlide = currentSlide.next();

	var currentDiam = $('.active-diam');
	var nextDiam = currentDiam.next();

	if (nextSlide.length === 0) {
		nextSlide = $('.slider-image').first();
		nextDiam = $('.diams').first();
	}

	currentSlide.fadeOut(1000).removeClass('active-slide');
	nextSlide.fadeIn(1000).addClass('active-slide');

	currentDiam.removeClass('active-diam');
	nextDiam.addClass('active-diam');
}


var main = function() {
	// home page pic info
	$('#pic1').hover(function() {
		$('#pic1-detail').show();
	});
	$('#pic1-detail').hover(function() {
		$(this).show();
	});

	$('#pic2').hover(function() {
		$('#pic2-detail').show();
	});
	$('#pic2-detail').hover(function() {
		$(this).show();
	});

	$('#pic3').hover(function() {
		$('#pic3-detail').show();
	});
	$('#pic3-detail').hover(function() {
		$(this).show();
	});

	$('.pic').mouseleave(function() {
		$('.pic div').hide();
	});


	// travel slide
	$('#right-arrow').click(function() {
		var currentSlide = $('.active-slide');
		var nextSlide = currentSlide.next();

		var currentDiam = $('.active-diam');
		var nextDiam = currentDiam.next();

		if (nextSlide.length === 0) {
			nextSlide = $('.slider-image').first();
			nextDiam = $('.diams').first();
		}

		currentSlide.fadeOut(1000).removeClass('active-slide');
		nextSlide.fadeIn(1000).addClass('active-slide');

		currentDiam.removeClass('active-diam');
		nextDiam.addClass('active-diam');
	});

	$('#left-arrow').click(function() {
		var currentSlide = $('.active-slide');
		var prevSlide = currentSlide.prev();

		var currentDiam = $('.active-diam');
		var prevDiam = currentDiam.prev();

		if (prevSlide.length === 0) {
			prevSlide = $('.slider-image').last();
			prevDiam = $('.diams').last();
		}

		currentSlide.fadeOut(1000).removeClass('active-slide');
		prevSlide.fadeIn(1000).addClass('active-slide');

		currentDiam.removeClass('active-diam');
		prevDiam.addClass('active-diam');
	});

	$('#diams-1').click(function() {
		$('.active-slide').fadeOut(1000).removeClass('active-slide');
		$('#slider-img-1').fadeIn(1000).addClass('active-slide');

		$('.active-diam').removeClass('active-diam');
		$(this).addClass('active-diam');
	});

	$('#diams-2').click(function() {
		$('.active-slide').fadeOut(1000).removeClass('active-slide');
		$('#slider-img-2').fadeIn(1000).addClass('active-slide');

		$('.active-diam').removeClass('active-diam');
		$(this).addClass('active-diam');
	});

	$('#diams-3').click(function() {
		$('.active-slide').fadeOut(1000).removeClass('active-slide');
		$('#slider-img-3').fadeIn(1000).addClass('active-slide');

		$('.active-diam').removeClass('active-diam');
		$(this).addClass('active-diam');
	});

	$('#diams-4').click(function() {
		$('.active-slide').fadeOut(1000).removeClass('active-slide');
		$('#slider-img-4').fadeIn(1000).addClass('active-slide');

		$('.active-diam').removeClass('active-diam');
		$(this).addClass('active-diam');
	});

	// slideshow in travel page
	setInterval(slideshow, 7000);

	// code tab dropdown menu
	$('.code-text').hover(function() {
		$('.code-dropdown-menu').slideDown(300);
		$('.code-text').css("font-weight", "bold");
		// home navbar tabs are different from the others
		$('.home .code-text').css("background-color", "white");
		$('.home .code-text').css("color", "black");
		$('.home .code-text').css("border", "3px solid black");
	});

	$('.code-tab').mouseleave(function() {
		$('.code-dropdown-menu').slideUp(200);
		$('.code-text').css("font-weight", "normal");

		$('.home .code-text').css("background", "none");
		$('.home .code-text').css("color", "white");
		$('.home .code-text').css("border", "3px solid white");	
	});

};

$(document).ready(main);