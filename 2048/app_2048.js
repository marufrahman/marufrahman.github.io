/**
 * 2048 Game - June, 2015
 * @author Maruf Rahman
 *
 * INSTRUCTIONS:
 * Play using the arrow keys.
 */

var ANIMATION_TIME = 300;

 var numberPiece = function(number) {
 	this.number = number;
 	this.merged = false;

 	this.getNumber = function() {
 		return this.number;
 	}

 	this.getImageName = function() {
 		return "img/" + this.number + ".png";
 	}

 	this.equals = function(piece) {
 		return this.number === piece.getNumber();
 	}

 	this.merge = function() {
 		this.merged = true;
 	}

 	this.hasMerged = function() {
 		return this.merged;
 	}

 	this.unmerge = function() {
 		this.merged = false;
 	}
 }


var board = function() {
	this.board_size = 4;
	this.num_blocks = this.board_size * this.board_size; 
	this.items = 2; 
	this.game_over = false; 
	this.boardPiece = [];

	for (var i = 0; i < this.num_blocks; i++) {
		this.boardPiece[i] = null; 
	}

	this.initializeBoard = function() {
		var pos1 = Math.floor(Math.random() * 16);
		var pos2;

		do {
			pos2 = Math.floor(Math.random() * 16);
		} while (pos2 == pos1);

		this.boardPiece[pos1] = new numberPiece("2");
		this.boardPiece[pos2] = new numberPiece("2"); 
	};

	this.drawBoard = function() {
		$(".block-2048-img").remove();
		for (var i = 0; i < this.num_blocks; i++) {

			if (this.boardPiece[i] != null) {
				var img = $('<img>');
				img.addClass('block-2048-img-' + i);
				img.addClass('block-2048-img');
				img.css('top', $('#block-2048-' + i).position().top + 9);
				img.css('left', $('#block-2048-' + i).position().left + 10);
				img.attr('src', this.boardPiece[i].getImageName());
				img.appendTo('.board-2048');

				if (this.boardPiece[i].getNumber() === "2048") {
					this.game_over = true;
					$('#verdict').text("You won!");
				}
			}
		}
	};

	this.playUp = function() {
		for (var i = this.board_size; i < this.num_blocks; i++) {
			if (this.boardPiece[i] != null) {
				var moved = false;
				var k = i - this.board_size;

				while (k >= 0 && this.boardPiece[k] === null) {
					this.boardPiece[k] = this.boardPiece[k + this.board_size];
					this.boardPiece[k + this.board_size] = null;
					k -= this.board_size;
					moved = true;
				}

				if (k >= 0 && this.boardPiece[k] != null
					&& this.boardPiece[k].equals(this.boardPiece[k + this.board_size]) 
					&& !this.boardPiece[k].hasMerged() && !this.boardPiece[k + this.board_size].hasMerged()) {

					var num = parseInt(this.boardPiece[k].getNumber()) * 2;
					this.boardPiece[k] = new numberPiece(num + '');
					this.boardPiece[k + this.board_size] = null;
					this.boardPiece[k].merge();
					this.items -= 1;
					moved = true;
					// it will be decremented later on- if merged we want to keep k same
					k -= this.board_size; 
				}

				if (moved) {
					k += this.board_size;

					var curr = $('.block-2048-img-' + i);
					curr.animate({
						top: ($('#block-2048-' + k).position().top + 9)
					}, ANIMATION_TIME);

					curr.removeClass('block-2048-img-' + i);
					curr.addClass('block-2048-img-' + k);
				}
			}
		}
		this.addTwo();
		this.unmergeAll();
	};

	this.playDown = function() {
		for (var i = this.num_blocks - this.board_size - 1; i >= 0 ; i--) {
			if (this.boardPiece[i] != null) {
				var moved = false;
				var k = i + this.board_size;

				while (k < this.num_blocks && this.boardPiece[k] === null) {
					this.boardPiece[k] = this.boardPiece[k - this.board_size];
					this.boardPiece[k - this.board_size] = null;
					k += this.board_size;
					moved = true;
				}

				if (k < this.num_blocks && this.boardPiece[k] != null
					&& this.boardPiece[k].equals(this.boardPiece[k - this.board_size]) 
					&& !this.boardPiece[k].hasMerged() && !this.boardPiece[k - this.board_size].hasMerged()) {

					var num = parseInt(this.boardPiece[k].getNumber()) * 2;
					this.boardPiece[k] = new numberPiece(num + '');
					this.boardPiece[k - this.board_size] = null;
					this.boardPiece[k].merge();
					this.items -= 1;
					moved = true;
					k += this.board_size; 
				}

				if (moved) {
					k -= this.board_size;
				
					var curr = $('.block-2048-img-' + i);
					curr.animate({
						top: ($('#block-2048-' + k).position().top + 9)
					}, ANIMATION_TIME);

					curr.removeClass('block-2048-img-' + i);
					curr.addClass('block-2048-img-' + k);
				}
			}
		}
		this.addTwo();
		this.unmergeAll();
	};

	this.playLeft = function() {
		for (var i = 1; i < this.num_blocks ; i++) {
			if (this.boardPiece[i] != null) {
				var moved = false;
				var k = i - 1;

				while (k >= 0 && Math.floor(i/this.board_size) === Math.floor(k/this.board_size) && this.boardPiece[k] === null) {
					this.boardPiece[k] = this.boardPiece[k + 1];
					this.boardPiece[k + 1] = null;
					k -= 1;
					moved = true;
				}

				if (k >= 0 && Math.floor(i/this.board_size) === Math.floor(k/this.board_size) && this.boardPiece[k] != null
					&& this.boardPiece[k].equals(this.boardPiece[k + 1]) 
					&& !this.boardPiece[k].hasMerged() && !this.boardPiece[k + 1].hasMerged()) {

					var num = parseInt(this.boardPiece[k].getNumber()) * 2;

					this.boardPiece[k] = new numberPiece(num + '');
					this.boardPiece[k + 1] = null;
					this.boardPiece[k].merge();
					this.items -= 1;
					moved = true;
					k -= 1;
				}

				if (moved) {
					k += 1;
				
					var curr = $('.block-2048-img-' + i);
					curr.animate({
						left: ($('#block-2048-' + k).position().left + 10)
					}, ANIMATION_TIME);

					curr.removeClass('block-2048-img-' + i);
					curr.addClass('block-2048-img-' + k);
				}
			}
		}
		this.addTwo();
		this.unmergeAll();
	};


	this.playRight = function() {
		for (var i = this.num_blocks - 1; i >= 0 ; i--) {
			if (this.boardPiece[i] != null) {
				var moved = false;
				var k = i + 1;

				while (k < this.num_blocks && Math.floor(i/this.board_size) === Math.floor(k/this.board_size) && this.boardPiece[k] === null) {
					this.boardPiece[k] = this.boardPiece[k - 1];
					this.boardPiece[k - 1] = null;
					k += 1;
					moved = true;
				}

				if (k < this.num_blocks && Math.floor(i/this.board_size) === Math.floor(k/this.board_size) && this.boardPiece[k] != null
					&& this.boardPiece[k].equals(this.boardPiece[k - 1]) 
					&& !this.boardPiece[k].hasMerged() && !this.boardPiece[k - 1].hasMerged()) {

					var num = parseInt(this.boardPiece[k].getNumber()) * 2;

					this.boardPiece[k] = new numberPiece(num + '');
					this.boardPiece[k - 1] = null;
					this.boardPiece[k].merge();
					this.items -= 1;
					moved = true;
					k += 1;
				}

				if (moved) {
					k -= 1;
				
					var curr = $('.block-2048-img-' + i);
					curr.animate({
						left: ($('#block-2048-' + k).position().left + 10)
					}, ANIMATION_TIME);

					curr.removeClass('block-2048-img-' + i);
					curr.addClass('block-2048-img-' + k);
				}
			}
		}
		this.addTwo();
		this.unmergeAll();
	};

	this.addTwo = function() {
		this.items += 1;
		if (this.items <= this.num_blocks) {
			var x = 0;

			do {
				x = Math.floor(Math.random() * 16);
			} while (this.boardPiece[x] != null);

			this.boardPiece[x] = new numberPiece("2");
		} else {
			this.game_over = true;
			$('#verdict').text("You lost!");
		}
	}

	this.unmergeAll = function() {
		for (var i = 0; i < this.num_blocks; i++) {
			if (this.boardPiece[i] != null) {
				this.boardPiece[i].unmerge();
			}
		}
	};

	this.isFinished = function() {
		return this.game_over;
	};

};

var main = function() {
	var b = new board();
	b.initializeBoard();
	b.drawBoard();

	$(document).keydown(function(event) {
		if (!b.isFinished()) {
			if (event.which === 38) {
				event.preventDefault();
				b.playUp();
			} else if (event.which === 37) {
				event.preventDefault();
				b.playLeft();
			} else if (event.which === 40) {
				event.preventDefault();
				b.playDown();
			} else if (event.which === 39) {
				event.preventDefault();
				b.playRight();
			}

			setTimeout(function() {
				b.drawBoard();
			}, ANIMATION_TIME);
		}
	});
}

$(document).ready(main);