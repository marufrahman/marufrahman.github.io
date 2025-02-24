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