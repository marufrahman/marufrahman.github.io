var next = 1;
var next_side = "left";
var utc;
var dst = 0;

var getTime = function(offset) {
	var hr = (utc[0] + offset[0]) % 24;
	hr = (hr < 0) ? (24 + hr) : hr;

	var min = utc[1] + offset[1];
	min = (min < 0) ? (60 + min) : min;
	min = (min < 10) ? ('0' + min) : min;

	var time = "AM";

	if (min >= 60) {
		hr = (hr + 1) % 24;
		min = min % 60; 
	}

	if (hr >= 12) {
		time = "PM";
	}
	hr = (hr === 12 || hr === 0) ? 12 : (hr % 12);

	return hr + ' : ' + min + ' ' + time;
}

var addCity = function(city, row, col, time_offset) {

	var city_temp = city.replace(" ", "").replace(",", "%2C");

	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20" + 
		"(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + city_temp +
			"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(weather_data) {
		
		var temp = weather_data.query.results.channel.item.condition.temp;
		var w = weather_data.query.results.channel.item.condition.text;

		$('.other-cities-' + row + ' .other-cities-' + col).html( 
			'<div class="city">' + city + '</div><div style="height:50px"></div><div class="weather">' + w + '</div>'
			+ '<div class="time">' + getTime(time_offset) + '</div><div class="temperature" style="display:inline;float:right">' + temp + '&deg; F</div></div>'
			);
	});

	if (next_side === "left") {
		next_side = "right";
	} else {
		next_side = "left";
		next += 1;
	}
};


var main = function() {
	var u = new Date();
	utc = [u.getUTCHours(), u.getUTCMinutes()];

	for (var i = 1; i <= 13; i++) {
		$('.other-cities-container').append('<div class="other-cities other-cities-' + i + '"><div class="other-cities-left">' + 
			'</div><div class="other-cities-right"></div></div><div class="space-50px"></div>');
	}

	// get location from ip
	$.getJSON('http://ipinfo.io', function(data) {
		city = data["city"];			
		
		if (city === "") {
			$('.current-loc .city').text("Location Not Found!");
			return;
		}

		if (data["country"] === "US") {
			city += ", " + data["region"];
		} else {
			city += ", " + data["country"];
		}
		$('.current-loc .city').text(city);

		// get the local time from the device
		var d = new Date();
		var time = "AM";
		var hr = d.getHours();
		var min = d.getMinutes() + '';

		if (min.length === 1) {
			min = "0" + min;
		}

		if (hr >= 12) {
			time = "PM";
		}

		hr = (hr === 12 || hr === 0) ? 12 : (hr % 12);
		time = hr + " : " + min + " " + time;
		$('.current-loc .time').html(time).css('font-size', '28px');
		$('.current-loc .day').html(d.toDateString()).css('font-size', '16px');

		// get weather info from yahoo
		var city_temp = city.replace(" ", "").replace(",", "%2C");

		$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20" + 
			"(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + city_temp +
				"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(weather_data) {

			var temp = weather_data.query.results.channel.item.condition.temp;
			var w = weather_data.query.results.channel.item.condition.text;

			$('.current-loc .temperature').html(temp + "&deg; F").css('font-size', '50px');
			$('.current-loc .weather').html(w).css('font-size', '22px');

		}).fail(function() {
			$('.current-loc .weather').text("Weather Info Not Found!");
		});

	}).fail(function() {
		$('.current-loc .city').text("Location Not Found!");
	});

	// have to pass next and next_side because of time sync issue
	addCity("Berkeley, California", next, next_side, [-8 + dst, 0]);
	addCity("Los Angeles, California", next, next_side, [-8 + dst, 0]);
	addCity("Dhaka, Bangladesh", next, next_side, [6, 0])
	addCity("San Francisco, California", next, next_side, [-8 + dst, 0]);
	addCity("San Diego, California", next, next_side, [-8 + dst, 0]);
	addCity("Lancaster, California", next, next_side, [-8 + dst, 0]);
	addCity("Santa Monica, California", next, next_side, [-8 + dst, 0]);
	addCity("New York City, New York", next, next_side, [-5 + dst, 0]);
	addCity("Chicago, Illinois", next, next_side, [-6 + dst, 0]);
	addCity("Dallas, Texas", next, next_side, [-6 + dst, 0]);
	addCity("Miami, Florida", next, next_side, [-5 + dst, 0]);
	addCity("Phoenix, Arizona", next, next_side, [-7 + dst, 0]);
	addCity("Palm Springs, California", next, next_side, [-8 + dst, 0]);
	addCity("Las Vegas, Nevada", next, next_side, [-8 + dst, 0]);
	addCity("Seattle, Washington", next, next_side, [-8 + dst, 0]);
	addCity("Denver, Colorado", next, next_side, [-7 + dst, 0]);
	addCity("New Orleans, Louisiana", next, next_side, [-6 + dst, 0]);
	addCity("Toronto, Canada", next, next_side, [-5 + dst, 0]);
	addCity("Tokyo, Japan", next, next_side, [9, 0]);
	addCity("Sydney, Australia", next, next_side, [10, 0]);
	addCity("Berlin, Germany", next, next_side, [1 + dst, 0]);
	addCity("Paris, France", next, next_side, [1 + dst, 0]);
	addCity("Geneva, Switzerland", next, next_side, [1 + dst, 0]);
	addCity("Stockholm, Sweden", next, next_side, [1 + dst, 0]);
	addCity("Kuala Lumpur, Malaysia", next, next_side, [8, 0]);
	addCity("Phuket, Thailand", next, next_side, [7, 0]);
};

$(document).ready(main);