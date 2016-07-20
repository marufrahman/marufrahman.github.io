/**
 * Tic-Tac-Toe Game - July, 2016
 * @author Maruf Rahman
 */

symbol = function(t) {
 	this.s_type = t;

 	this.getImageName = function() {
 		if (this.s_type === "cross") {
 			return "img/cross.png";
 		}
 		return "img/circle.png";
 	};

 	this.getType = function() {
 		return this.s_type;
 	};

 	this.equals = function(s) {
 		if (s === null) {
			return false;
		}
		if (this.s_type === "cross" && s.getType() != "cross") {
			return false;
		}
		if (s.getType() === "cross" && this.s_type != "cross") {
			return false;
		}
		return true;
 	};
 };

board = function() {
	this.board_size = 3;
	this.num_blocks = this.board_size * this.board_size;
	this.items = 0;
	this.first_turn = true;
	this.board_symbol = [];

	for (var i = 0; i < this.num_blocks; i++) {
		this.board_symbol[i] = null;
	}

	this.squareToCase = { 
							0 : ["top-line", "left-line", "backward-slash-diagonal"],
						 	1 : ["top-line", "middle-vertical-line"],
						  	2 : ["top-line", "right-line", "forward-slash-diagonal"],
						  	3 : ["middle-horizontal-line", "left-line"],	
						  	4 : ["middle-horizontal-line", "middle-vertical-line", "forward-slash-diagonal", "backward-slash-diagonal"],
						  	5 : ["middle-horizontal-line", "right-line"],
						  	6 : ["bottom-line", "left-line", "forward-slash-diagonal"],
						  	7 : ["bottom-line", "middle-vertical-line"],
						  	8 : ["bottom-line", "right-line", "backward-slash-diagonal"]
						};

	this.canPlay = function(box_id) {
		var pos = parseInt(box_id.charAt(box_id.length - 1));
		return this.board_symbol[pos] === null;
	};			

	this.play = function(box_id) {
		var pos = parseInt(box_id.charAt(box_id.length - 1));
		this.board_symbol[pos] = new symbol("cross");
		this.items += 1;

		var sym = $('<img>');
		sym.addClass('block-ttt-img');
		sym.attr('src', this.board_symbol[pos].getImageName());
		sym.appendTo('#' + box_id);
	};

	this.isFinished = function() {
		// tie
		if (this.items >= 9) {
			return true; 
		}
		if (this.board_symbol[4] != null) {
			// middle horizontal line
			if (this.board_symbol[3] != null && this.board_symbol[4].equals(this.board_symbol[3]) 
				&& this.board_symbol[5] != null && this.board_symbol[4].equals(this.board_symbol[5]) ) {
				return true;
			}
			// middle vertical
			if (this.board_symbol[1] != null && this.board_symbol[4].equals(this.board_symbol[1]) 
				&& this.board_symbol[7] != null && this.board_symbol[4].equals(this.board_symbol[7]) ) {
				return true;
			}
			// forward slash diagonal
			if (this.board_symbol[2] != null && this.board_symbol[4].equals(this.board_symbol[2]) 
				&& this.board_symbol[6] != null && this.board_symbol[4].equals(this.board_symbol[6]) ) {
				return true;
			}
			// back slash diagonal
			if (this.board_symbol[0] != null && this.board_symbol[4].equals(this.board_symbol[0]) 
				&& this.board_symbol[8] != null && this.board_symbol[4].equals(this.board_symbol[8]) ) {
				return true;
			}			
		}
		if (this.board_symbol[0] != null) {
			// top line
			if (this.board_symbol[1] != null && this.board_symbol[0].equals(this.board_symbol[1]) 
				&& this.board_symbol[2] != null && this.board_symbol[0].equals(this.board_symbol[2]) ) {
				return true;
			}
			// left line
			if (this.board_symbol[3] != null && this.board_symbol[0].equals(this.board_symbol[3]) 
				&& this.board_symbol[6] != null && this.board_symbol[0].equals(this.board_symbol[6]) ) {
				return true;
			}
		}
		if (this.board_symbol[8] != null) {
			// bottom line
			if (this.board_symbol[6] != null && this.board_symbol[8].equals(this.board_symbol[6]) 
				&& this.board_symbol[7] != null && this.board_symbol[8].equals(this.board_symbol[7]) ) {
				return true;
			}
			// right line
			if (this.board_symbol[5] != null && this.board_symbol[8].equals(this.board_symbol[5]) 
				&& this.board_symbol[2] != null && this.board_symbol[8].equals(this.board_symbol[2]) ) {
				return true;
			}
		}
		return false;
	};

	this.reset = function() {
		this.first_turn = true;
		this.items = 0;

		for (var i = 0; i < this.num_blocks; i++) {
			this.board_symbol[i] = null;
		}

		$('.block-ttt-img').remove();
		$('#verdict').text("");

	}


	this.ai_play = function() {
		var box_num = 0;
		// capture the center
		if (this.board_symbol[4] === null) {
			box_num = 4;
			this.board_symbol[4] = new symbol("circle-plus");
			this.first_turn = false;
		} else if (this.first_turn) {
			var num = [0, 2, 6, 8];
			box_num = num[Math.floor(Math.random() * 4)];
			this.board_symbol[box_num] = new symbol("circle");
			this.first_turn = false;
		} else {
			var utilities = [];

			for (var i = 0; i < this.num_blocks; i += 1) {
				if (this.board_symbol[i] === null) {
					var middle = (Math.floor(i / this.board_size) === 1) || (i % this.board_size === 1);
					if (middle) {
						this.board_symbol[i] = new symbol("circle-plus");
					} else {
						this.board_symbol[i] = new symbol("circle");
					}
					utilities[i] = this.getMaxUtility(i);
					this.board_symbol[i] = null;
				} else {
					utilities[i] = 0.0;
				}
			}

			for (var i = 0; i < this.num_blocks; i++) {
				if (utilities[i] > utilities[box_num]) {
					box_num = i;
				}
			}

			var middle = (Math.floor(box_num / this.board_size) === 1) || (box_num % this.board_size === 1);
			var new_type = middle ? "circle-plus" : "circle";
			this.board_symbol[box_num] = new symbol(new_type);
		}

		var sym = $('<img>');
		sym.addClass('block-ttt-img');
		sym.attr('src', this.board_symbol[box_num].getImageName());
		sym.appendTo('#block-ttt-' + box_num);
		this.items += 1;
	};

	this.getMaxUtility = function(x) {
		var utilities = [];

		var cases = this.squareToCase[x];

		for (var i = 0; i < cases.length; i++) {
			utilities.push(this.getUtilityofCase(cases[i]));
		}

		// $('<li>').text(x + ' : ' + utilities).appendTo('.debugger');
		var max = 0.0;

		for (var i = 0; i < utilities.length; i++) {
			if (utilities[i] > max) {
				max = utilities[i];
			}
		}

		if (max === 10.0) {
			max += 1.0;
		}
		return max;
	};

	this.getUtilityofCase = function(case_num) {
		var utility = 0.0;
		switch (case_num) {
			case "bottom-line" : 
			{
				utility = this.getValue(6) + this.getValue(7) + this.getValue(8);
				break;
			}
			case "middle-horizontal-line" :
			{
				utility = this.getValue(3) + this.getValue(4) + this.getValue(5);
				break;
			}
			case "top-line" : 
			{
				utility = this.getValue(0) + this.getValue(1) + this.getValue(2);
				break;
			}
			case "left-line" : 
			{
				utility = this.getValue(0) + this.getValue(3) + this.getValue(6);
				break;
			}
			case "middle-vertical-line" : 
			{
				utility = this.getValue(1) + this.getValue(4) + this.getValue(7);
				break;
			}
			case "right-line" : 
			{
				utility = this.getValue(2) + this.getValue(5) + this.getValue(8);
				break;
			}
			case "forward-slash-diagonal" : 
			{
				utility = this.getValue(2) + this.getValue(4) + this.getValue(6);
				break;
			}
			case "backward-slash-diagonal" : 
			{
				utility = this.getValue(0) + this.getValue(4) + this.getValue(8);
				break;
			}
			default : break;
		}
		return Math.abs(utility);
	};

	this.getValue = function(x) {
		if (this.board_symbol[x] === null) {
			return 0.0;
		}
		if (this.board_symbol[x].getType() === "circle-plus") {
			return 5.5;
		}
		if (this.board_symbol[x].getType() === "circle") {
			return 5.0;
		}
		// cross
		return -10.0;
	};

};

main = function() {
	var b = new board();
	var game_over = false;

	$('.block-ttt').click(function() {
		if (!game_over) {
			var id = $(this).attr('id');

			if (b.canPlay(id)) {
				b.play(id);
				if (b.isFinished()) {
					$('#verdict').text("Game Over!");
					game_over = true;
				}

				if (!game_over) {
					b.ai_play();
					if (b.isFinished()) {
						$('#verdict').text("Game Over!");
						game_over = true;
					}
				}
			}
		}
	});

	$(document).keydown(function(event) {
		if (event.which === 32) {
			event.preventDefault();
			b.reset();
			game_over = false;
		}
	});
};

$(document).ready(main);
