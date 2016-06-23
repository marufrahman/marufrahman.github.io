var main = function() {
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
};

$(document).ready(main);