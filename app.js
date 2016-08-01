// code for the sliding-album-window: avoids code redundancy
var album_html = '<div style="height:65px"><div class="album-window-close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div></div>'
 + '<div class="album-window-box"><div class="album-window-box-left"><div style="height:80%;margin-bottom:30px;position:relative;">'
 + '<img class="album-img active-album-img" id="album-img-1" /><img class="album-img" id="album-img-2" />'
 + '<img class="album-img" id="album-img-3" /><img class="album-img" id="album-img-4" /><img class="album-img" id="album-img-5" /></div>'
 + '<div class="album-window-control"><span class="glyphicon glyphicon-chevron-left" id="left-arrow" aria-hidden="true" style="margin:8px 5px 0 0;"></span>'
 + '<img class="album-thumbnail active-album-thumbnail" id="album-thumbnail-1"/>'
 + '<img class="album-thumbnail" id="album-thumbnail-2"/><img class="album-thumbnail" id="album-thumbnail-3"/>' 
 + '<img class="album-thumbnail" id="album-thumbnail-4"/><img class="album-thumbnail" id="album-thumbnail-5"/>'
 + '<span class="glyphicon glyphicon-chevron-right" id="right-arrow" aria-hidden="true" style="margin-top:8px;"></span></div></div>'
 + '<div class="album-window-box-detail"><h1 class="album-box-heading1"></h1><div class="space-50px"></div>'
 + '<h3 class="album-box-heading2">Places I have visited: </h3><p class="album-box-p1"></p><p class="album-box-p2"></p></div></div>';

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
	// travel page sliding down window
	for (var i = 1; i <= 5; i++) {
		$('#album-window-row' + i).html(album_html);
	}
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
		var visited_places = "Dhaka, Narayanganj, Munshiganj, Gazipur, Madaripur, Shariatpur, Tangail, Mymensingh, Jamalpur, Noakhali, "
					+ "Lakshmipur, Chandpur, Comilla, Feni, Chittagong, Cox's Bazar, St. Martin's Island, Rajshahi, Natore, Pabna, "
					+ "Sirajganj, Sylhet, Hobiganj, Moulvibazar, Patuakhali";
		active_country = prepare_album(row_num, active_country, "bd", "Bangladesh", visited_places);
	});

	$('#ca').click(function() {
		var visited_places = "Toronto, Ottawa, Kingston, Montreal, Mont. Tremblant, Calgary, Banff National Park, Niagara Falls";
		active_country = prepare_album(row_num, active_country, "ca", "Canada", visited_places);
	});

	$('#dk').click(function() {
		var visited_places = "Nyhavn, Copenhagen Opera House, The Little Mermaid, Tivoli Gardens, Amalienborg, "
					+ "Christiania, Frederik's Church, Borsen, Stroget";
		active_country = prepare_album(row_num, active_country, "dk", "Denmark", visited_places);
	});

	$('#fr').click(function() {
		var visited_places = "Eiffel Tower, Musee du Louvre, Chatelet, Paris Gare De Lyon";
		active_country = prepare_album(row_num, active_country, "fr", "France", visited_places);
	});

	$('#de').click(function() {
		var visited_places = "Berlin Wall, Brandenburg Gate, Reichstag Building (German Parliament), Potsdamer Platz, "
					+ "Alexanderplatz, Charlottenburg Palace, Hauptbahnof, Gesundbrunnen";
		active_country = prepare_album(row_num, active_country, "de", "Germany", visited_places);
	});

	$('#jp').click(function() {
		var visited_places = "Tokyo Skytree, Tokyo Tower, Asa Kusa Temple, Kings Palace, Tokyo Station, Mt. Fuji, " 
					+ "Umi Hotaro, Shibuya, Ueno, Akihabara, Shinjuku, Odaiba, Nikko, Kamata, Shijuoka, Okitsu";
		active_country = prepare_album(row_num, active_country, "jp", "Japan", visited_places);
	});

	$('#ml').click(function() {
		var visited_places = "The Kuala Lumpur/Petronus Tower, The Pavilion, Putrajaya Mosque, Genting Highland, "
					+ "Langkawi";
		active_country = prepare_album(row_num, active_country, "ml", "Malaysia", visited_places);
	});

	$('#sg').click(function() {
		var visited_places = "Marina Bay, Marina Bay Sands, Downtown, Little India";
		active_country = prepare_album(row_num, active_country, "sg", "Singapore", visited_places);
	});

	$('#se').click(function() {
		var visited_places = "Stockholm City Center, Gamla Stan, Slussen, Vaxholm";
		active_country = prepare_album(row_num, active_country, "se", "Sweden", visited_places);
	});

	$('#ch').click(function() {
		var visited_places = "Geneva, Interlaken, Lungern, Lauterbrunnen, Grindelwald, Wengen, Lausanne, Bern, "
		   			+ " Lucerne, Zurich, Zug, Altdorf";
		active_country = prepare_album(row_num, active_country, "ch", "Switzerland", visited_places);
	});

	$('#th').click(function() {
		var visited_places = "Phi Phi Islands, Maya Bay, James Bond Island, Phuket, Bangla Road, Patong Beach";
		active_country = prepare_album(row_num, active_country, "th", "Thailand", visited_places);
	});

	$('#us').click(function() {
		var visited_places = "California, Oregon, Washington, Arizona, Nevada, Utah, Idaho, Wyoming, Montana, New York,"
					+ "New Jersey, Pennsylvania, Massachusetts, Florida";
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

	$('.album-window-control #album-thumbnail-1').click(function() {
		var active_album_row = "#album-window-" + row_num[active_country];

		$(active_album_row + ' .active-album-img').fadeOut(500).removeClass('active-album-img');
		$(active_album_row + ' #album-img-1').fadeIn(500).addClass('active-album-img');

		$(active_album_row + ' .active-album-thumbnail').removeClass('active-album-thumbnail');
		$(active_album_row + ' #album-thumbnail-1').addClass('active-album-thumbnail');
	});

	$('.album-window-control #album-thumbnail-2').click(function() {
		var active_album_row = "#album-window-" + row_num[active_country];

		$(active_album_row + ' .active-album-img').fadeOut(500).removeClass('active-album-img');
		$(active_album_row + ' #album-img-2').fadeIn(500).addClass('active-album-img');

		$(active_album_row + ' .active-album-thumbnail').removeClass('active-album-thumbnail');
		$(active_album_row + ' #album-thumbnail-2').addClass('active-album-thumbnail');
	});

	$('.album-window-control #album-thumbnail-3').click(function() {
		var active_album_row = "#album-window-" + row_num[active_country];

		$(active_album_row + ' .active-album-img').fadeOut(500).removeClass('active-album-img');
		$(active_album_row + ' #album-img-3').fadeIn(500).addClass('active-album-img');

		$(active_album_row + ' .active-album-thumbnail').removeClass('active-album-thumbnail');
		$(active_album_row + ' #album-thumbnail-3').addClass('active-album-thumbnail');
	});

	$('.album-window-control #album-thumbnail-4').click(function() {
		var active_album_row = "#album-window-" + row_num[active_country];

		$(active_album_row + ' .active-album-img').fadeOut(500).removeClass('active-album-img');
		$(active_album_row + ' #album-img-4').fadeIn(500).addClass('active-album-img');

		$(active_album_row + ' .active-album-thumbnail').removeClass('active-album-thumbnail');
		$(active_album_row + ' #album-thumbnail-4').addClass('active-album-thumbnail');
	});

	$('.album-window-control #album-thumbnail-5').click(function() {
		var active_album_row = "#album-window-" + row_num[active_country];

		$(active_album_row + ' .active-album-img').fadeOut(500).removeClass('active-album-img');
		$(active_album_row + ' #album-img-5').fadeIn(500).addClass('active-album-img');

		$(active_album_row + ' .active-album-thumbnail').removeClass('active-album-thumbnail');
		$(active_album_row + ' #album-thumbnail-5').addClass('active-album-thumbnail');
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