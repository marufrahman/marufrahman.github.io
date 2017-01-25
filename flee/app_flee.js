var board_draw;
var speed_up;
var timer;
var time = ['0', '0'];
var num_balls = 4;
var power_options = ['invincible', 'shrink'];
var power_on_board = null;
var power_adder;
var power_time;
var power_deactivate;
var invincible = false;

var ball = function(id, dx, dy, color) {
	this.ball_id = id;
	this.dx = dx;
	this.dy = dy;
	this.ball_color = color;

	this.getId = function() {
		return this.ball_id;
	}

	this.getDx = function() {
		return this.dx;
	}

	this.setDx = function(dx) {
		this.dx = dx;
	}


	this.getDy = function() {
		return this.dy;
	}

	this.setDy = function(dy) {
		this.dy = dy;
	}

	this.getColor = function() {
		return this.ball_color;
	}
}

var board = function() {
	this.balls = [];
	this.game_over = false;

	this.initializeBoard = function() {
		for (var i = 0; i < num_balls; i++) {
			this.addBall();
		}
	};

	this.addBall = function() {
		var x = (Math.floor(Math.random() * 90) + 2) * 10;
		var y = (Math.floor(Math.random() * 44) + 2) * 10;

		var id = "ball-" + this.balls.length;
		// initial speed 10 to 15 (0 is neg)
		var pos_neg_dx = ((Math.floor(Math.random()* 2)) == 0) ? -15 : 10;
		var pos_neg_dy = ((Math.floor(Math.random() * 2)) == 0) ? -15 : 10; 

		var dx = Math.floor(Math.random() * 5) + pos_neg_dx;
		var dy = Math.floor(Math.random() * 5) + pos_neg_dy;

		var color = 'rgb(' + (Math.floor(Math.random() * 255)) + ',' + (Math.floor(Math.random() * 255))
							+ ',' + (Math.floor(Math.random() * 255)) + ')';

		var new_ball = new ball(id, dx, dy, color);
		this.balls.push(new_ball);

		var b = $('<div id="' + id + '">');
		b.addClass('ball');
		b.css('top', y + 'px');
		b.css('left', x + 'px');
		b.css('background-color', color);
		b.appendTo('.box');
	};

	this.draw = function() {
		for (var i = 0; i < this.balls.length; i++) {
			var curr_ball = this.balls[i];

			var curr_ball_id = $('#' + curr_ball.getId());
			var dx = curr_ball.getDx();
			var dy = curr_ball.getDy();

			var ball_top = curr_ball_id.position().top;
			var ball_bottom = ball_top + parseInt(curr_ball_id.css('height'));
			var ball_left = curr_ball_id.position().left;
			var ball_right = ball_left + parseInt(curr_ball_id.css('width'));

			if (!invincible) {
				var player = $('#player');
				var player_top = player.position().top;
				var player_bottom = player_top + parseInt(player.css('height'));
				var player_left = player.position().left;
				var player_right = player_left + parseInt(player.css('width'));

				if (power_on_board != null) {
					var power_top = $('.power').position().top;
					var power_bottom = power_top + parseInt($('.power').css('height'));
					var power_left = $('.power').position().left;
					var power_right = power_left + parseInt($('.power').css('width'));

					if (power_top < player_bottom && power_bottom > player_top && power_left < player_right && power_right > player_left) {
						// $('<li>').text('power-collected').appendTo('.debug');
						this.activatePower(power_on_board);
						this.removePower();
					}
				}

				// collision bw ball and player
				if (ball_top < player_bottom - 10 && ball_bottom > player_top + 10 && ball_left < player_right - 10 && ball_right > player_left + 10) {
					clear_all_intervals();
					clearTimeout(power_time);
					clearTimeout(power_deactivate);
					$('.verdict').text('Game Over!');
					$('.play-again-msg').text('Press N to play again!');
					this.game_over = true;
					return;
				}	
			}

			if (ball_bottom >= parseInt($('.box').css('height')) || ball_top <= 0) {
				dy = -dy;
				curr_ball.setDy(dy);
			}
			if (ball_right >= parseInt($('.box').css('width')) || ball_left <= 0) {
				dx = -dx; 
				curr_ball.setDx(dx);
			}

			ball_top = ball_top + dy;
			ball_left = ball_left + dx;

			curr_ball_id.css('top', ball_top + 'px');
			curr_ball_id.css('left', ball_left + 'px');
		}
	};

	this.addTime = function() {
		var sec = parseInt(time[1]);
		var min = parseInt(time[0]);
		sec += 1;

		if (sec == 60) {
			sec = 0;
			min += 1;
			time[0] = min + '';
		}
		time[1] = sec + '';
	};

	this.setTime = function() {
		this.addTime();
		var min = time[0];
		var sec = time[1];
		
		if (min.length === 1) {
			min = '0' + min;
		}

		if (sec.length === 1) {
			sec = '0' + sec;
		}
		$('.time').text(min + ' : ' + sec);
	};

	this.isOver = function() {
		return this.game_over;
	}

	this.reset = function() {
		time = ['0', '0'];
		this.game_over = false;
		invincible = false;
		power_on_board = null;
		$('.ball').remove();
		$('.power').remove();
		this.balls.splice(0, this.balls.length);
		$('.time').text("00 : 00");
		$('.verdict').text('');
		$('.play-again-msg').text('');

		$('#player').css('width', '60px');
		$('#player').css('height', '60px');
		this.initializeBoard();
	};

	// adds speed by 2
	this.addSpeed = function() {
		for (var i = 0; i < num_balls; i++) {
			var curr_ball = this.balls[i];
			var dx = curr_ball.getDx();
			var dy = curr_ball.getDy();

			if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
				var ddx = (dx < 0) ? -1 : 1;
				var ddy = (dy < 0) ? -1 : 1;

				curr_ball.setDx(curr_ball.getDx() + ddx);
				curr_ball.setDy(curr_ball.getDy() + ddy);
			}
		}
	};

	this.addPower = function() {
		var power_idx = Math.floor(Math.random() * power_options.length);
		power_on_board = power_options[power_idx];

		var x = (Math.floor(Math.random() * 90) + 2) * 10;
		var y = (Math.floor(Math.random() * 44) + 2) * 10;

		var pow = $('<img>');
		pow.addClass('power');
		pow.attr('src', 'img/' + power_on_board + '.png');
		pow.css('top', y + 'px');
		pow.css('left', x + 'px');
		pow.appendTo('.box');

		power_time = setTimeout(this.removePower, 2000);
	};

	this.removePower = function() {
		power_on_board = null;
		$('.power').remove();
	};

	this.activatePower = function(pow) {
		switch (pow) {
			case 'invincible' : {
				invincible = true;
				$('#player').css('background-color', 'green');

				power_deactivate = setTimeout(function() {
					invincible = false;
					$('#player').css('background-color', 'rgb(150, 0, 0)');
				}, 5000);
			} break;

			case 'shrink' : {
				$('#player').css('width', '30px');
				$('#player').css('height', '30px');

				power_deactivate = setTimeout(function() {
					$('#player').css('width', '60px');
					$('#player').css('height', '60px');
				}, 8000);
			}
		}
	};
}

var clear_all_intervals = function() {
	clearInterval(power_adder);
	clearInterval(speed_up);
	clearInterval(timer);
	clearInterval(board_draw);
}

$(document).ready(function() {
	var run = false;
	var starting = true;

	var b = new board();
	b.initializeBoard();

	// start/stop
	$(document).keydown(function(e) {
		if (e.which === 32) {
			e.preventDefault();

			if (starting) {
				starting = false;
			}
			if (run) {
				clear_all_intervals();
				run = false;
			} else {

				timer = setInterval(function() {
					b.setTime();
				}, 1000);

				board_draw = setInterval(function() {
					b.draw();
				}, 25);

				speed_up = setInterval(function() {
					b.addSpeed();
				}, 5000);

				power_adder = setInterval(function() {
					b.addPower();
				}, 10000);

				run = true;
			}
		}

		// new game
		if (e.which === 78) {
			b.reset();
			run = false;
			starting = true;
		}
	});

	// change the player on mouse movement
	$(document).mousemove(function(event) {
		if (starting || (run && !b.isOver())) {
			// offset gives the position of the object relative to the document
			// where as position() gives the position relative to its parent
			var gamebox_pos = $('.box').offset();
			var gamebox_top = gamebox_pos.top;
			var gamebox_left = gamebox_pos.left;

			// event.pageXY: returns the position of the mouse pointer
			var x = event.pageX - parseInt(gamebox_left);
			var y = event.pageY - parseInt(gamebox_top);

			var gamebox_height = $('.box').height();
			var gamebox_width = $('.box').width();	
			var player_dim = $('#player').height();		

			if (y < 0) {
				y = 0;
			} else if (y > gamebox_height - player_dim) {
				y = gamebox_height - player_dim;
			}

			if (x < 0) {
				x = 0;
			} else if (x > gamebox_width - player_dim) {
				x = gamebox_width - player_dim;
			}

			$('#player').css('left', x + 'px');
			$('#player').css('top', y + 'px');
		}
	});

	// no cursor inside the play box
	$('.box').mouseenter(function(event) {
		$(this).css('cursor', 'none');
	});
	
});
