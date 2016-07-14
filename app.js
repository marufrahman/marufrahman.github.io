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

var prepare_album = function(row_num, active_country, curr_country, name, visited_places) {	
	var active_album_row = "#album-window-" + row_num[active_country];

	if (active_country === curr_country) {
		$(active_album_row).slideUp(500);
		return null;
	} else if (row_num[active_country] != row_num[curr_country]) {
		$(active_album_row).slideUp(500);
		set_album_info(row_num, active_country, curr_country, name, visited_places);
	} else {		
		$(active_album_row).slideUp(500, function() {
			set_album_info(row_num, active_country, curr_country, name, visited_places);
		});

	}
	return curr_country;
};

var set_album_info = function(row_num, active_country, curr_country, name, visited_places) {
	var curr_album_row = "#album-window-" + row_num[curr_country];

	$(curr_album_row + " #album-img-1").attr("src", "img/img-" + curr_country + ".jpg");
	$(curr_album_row + " #album-thumbnail-1").attr("src", "img/img-" + curr_country + ".jpg");
	
	for (var i = 2; i <= 5; i++) {
		$(curr_album_row + " #album-img-" + i).attr("src", "img/img-" + curr_country + "-" + i + ".jpg");
		$(curr_album_row + " #album-thumbnail-" + i).attr("src", "img/img-" + curr_country + "-" + i + ".jpg");	
	};

	$(curr_album_row + " .album-box-heading1").text(name);
	$(curr_album_row + " .album-box-p1").text(visited_places);

	set_first_img_active(curr_album_row);

	$(curr_album_row).slideDown(500, function() {
		$('html, body').animate({
			'scrollTop' : $(curr_album_row).position().top - 50
		});
	});
}

var set_first_img_active = function(curr_album_row) {
	var currentImg = $(curr_album_row + ' .active-album-img');
	var nextImg = $(curr_album_row + ' .album-img').first();
	currentImg.fadeOut(5).removeClass('active-album-img');
	nextImg.fadeIn(5).addClass('active-album-img');

	var currentThumbnail = $(curr_album_row + ' .active-album-thumbnail');
	currentThumbnail.removeClass('active-album-thumbnail');
	$(curr_album_row + ' #album-thumbnail-1').addClass('active-album-thumbnail');
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
	$('#slide-control #right-arrow').click(function() {
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

	$('#slide-control #left-arrow').click(function() {
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

	// individual album slider
	var row_num = {
		"au" : "row1",
		"bd" : "row1",
		"ca" : "row1",	
		"fr" : "row2",
		"dk" : "row2",
		"de" : "row2",
		"jp" : "row3",
		"ml" : "row3",
		"sg" : "row3",
		"se" : "row4",
		"ch" : "row4",
		"th" : "row4",
		"us" : "row5"
	};

	var active_country = null;

	/** Countries **/

	$('#au').click(function() {
		var visited_places = "Sydney Opera House, Sydney Tower, Harbor Bridge, Darling Harbor, La Perouse, "
					+ "Bondi Beach, Brighton Beach, Manly Beach, Coledale Beach, Little Bay Beach, Taronga Zoo, Luna Park, "
					+ "Watson's Bay, Sydney Aquarium, Auburn Japanese Garden, Kiama, Blue Mountain/ Three Sisters, Jenolan Cave";
		active_country = prepare_album(row_num, active_country, "au", "Australia", visited_places);
	});

	$('#bd').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "bd", "Bangladesh", visited_places);
	});

	$('#ca').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "ca", "Canada", visited_places);
	});

	$('#dk').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "dk", "Denmark", visited_places);
	});

	$('#fr').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "fr", "France", visited_places);
	});

	$('#de').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "de", "Germany", visited_places);
	});

	$('#jp').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "jp", "Japan", visited_places);
	});

	$('#ml').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "ml", "Malaysia", visited_places);
	});

	$('#sg').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "sg", "Singapore", visited_places);
	});

	$('#se').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "se", "Sweden", visited_places);
	});

	$('#ch').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "ch", "Switzerland", visited_places);
	});

	$('#th').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "th", "Thailand", visited_places);
	});

	$('#us').click(function() {
		var visited_places = "";
		active_country = prepare_album(row_num, active_country, "us", "United States", visited_places);
	});

	// $('#').click(function() {
	// 	var visited_places = "";
	// 	active_country = prepare_album(row_num, active_country, "", "", visited_places);
	// });

	// $('#').click(function() {
	// 	var visited_places = "";
	// 	active_country = prepare_album(row_num, active_country, "", "", visited_places);
	// });

	/* End Countries */

	// close-sign: only one album window open at a time
	$('.album-window-close').click(function() {
		$(".album-window").slideUp(500);
		active_country = null;
	});

	$('.album-window-control #right-arrow').click(function() {
		var active_album_row = "#album-window-" + row_num[active_country];

		var currentImg = $(active_album_row + ' .active-album-img');
		var nextImg = currentImg.next();

		var currentThumbnail = $(active_album_row + ' .active-album-thumbnail');
		var nextThumbnail = currentThumbnail.next();

		if (nextImg.length === 0) {
			nextImg = $(active_album_row + ' .album-img').first();
			nextThumbnail = $(active_album_row + ' .album-thumbnail').first();
		}

		currentImg.fadeOut(500).removeClass('active-album-img');
		nextImg.fadeIn(500).addClass('active-album-img');

		currentThumbnail.removeClass('active-album-thumbnail');
		nextThumbnail.addClass('active-album-thumbnail');
	});

	$('.album-window-control #left-arrow').click(function() {
		var active_album_row = "#album-window-" + row_num[active_country];

		var currentImg = $(active_album_row + ' .active-album-img');
		var prevImg = currentImg.prev();

		var currentThumbnail = $(active_album_row + ' .active-album-thumbnail');
		var prevThumbnail = currentThumbnail.prev();

		if (prevImg.length === 0) {
			prevImg = $(active_album_row + ' .album-img').last();
			prevThumbnail = $(active_album_row + ' .album-thumbnail').last();
		}

		currentImg.fadeOut(500).removeClass('active-album-img');
		prevImg.fadeIn(500).addClass('active-album-img');

		currentThumbnail.removeClass('active-album-thumbnail');
		prevThumbnail.addClass('active-album-thumbnail');
	});

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