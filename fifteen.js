<<<<<<< HEAD
window.onload = function  () {
	"use strict";

	var $puzzle = $('puzzlearea'),
	$shuffle = $('shufflebutton'),
	$squares = $$('#puzzlearea div'),
	game = {
		blank : [], 
		complete: false,
		inProgress : false,
		init : function(){

			var	top = 0;

			for(var i = 0; i<$squares.length; i++){
				var left = (i % 4) * 100,
				xOffset = 400 - left,
				yOffset = 400 - top,
				position = [left, top];
				$squares[i].addClassName('puzzlepiece');
				this.setPiece($squares[i], position);
				$squares[i].setStyle({
					backgroundPosition: xOffset + 'px ' + yOffset + 'px'
				}); 
				$squares[i].writeAttribute('data-correct', [left, top]);
				
				top += ((i + 1) % 4 == 0) ? 100 : 0;
=======
"use strict";
var div;
var blink;
var timer;
var whiteSpaceY;
var whiteSpaceX;

window.onload = function ()
{
	var puzzlearea = document.getElementById('puzzlearea');
	
	div = puzzlearea.getElementsByTagName('div');

	for (var i=0; i<div.length; i++)
	{
		div[i].className = 'puzzlepiece';
		div[i].style.left = (i%4*100)+'px';
		div[i].style.top = (parseInt(i/4)*100) + 'px';
		div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
		div[i].onmouseover = function()
		{
			if (move(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid #7CFC00";
				this.style.color = "#006600";
>>>>>>> origin/gh-pages
			}
			this.blank = [300, 300];
			this.square_style();
		},
		checkSolved : function(){
			if (!this.complete && this.inProgress){
				var solved = true;
				for (var i = 0; i < $squares.length; i++) {
					var positionData = this.getPositionDataFromPiece($squares[i]);
					solved = solved && positionData.current.toString() === positionData.correct.toString();
				}

				if (solved){
					$puzzle.fire('puzzle:solved');
				}
			}
		},
		setPiece : function(piece, position){
			piece.writeAttribute('data-position', position);
			piece.setStyle({
				left: position[0] + 'px',
				top: position[1] + 'px'
			});
		},
		getPositionDataFromPiece : function(piece){
			var currentPositionAsString = piece.readAttribute('data-position').split(','),
			correctPositionAsString = piece.readAttribute('data-correct').split(',');

			return {
				current: [parseInt(currentPositionAsString[0]), parseInt(currentPositionAsString[1])],
				correct: [parseInt(correctPositionAsString[0]), parseInt(correctPositionAsString[1])]
			}; 
		},
		shuffle_squares : function(){
			if (!this.complete){
				for (var i = 0; i < 250; i++) {
					var movablesquares = this.getMovablesquares(),
					indexToMove = Math.floor(Math.random() * movablesquares.length),
					piece = movablesquares[indexToMove];
					this.move(piece);	
				}
				this.inProgress = true;

			}
		},
		square_style : function(){
			$squares.each(function(piece){
				if (piece.hasClassName('movablepiece')){
					piece.removeClassName('movablepiece');
				}
			});
			var movablesquares = this.getMovablesquares();
			movablesquares.each(function(piece){
				piece.addClassName('movablepiece');
			});			
		},
		getMovablesquares : function(){
			var positions = [],
			movablesquares = [];

			if (this.isValidPosition([this.blank[0] + 100, this.blank[1]])) { positions.push([this.blank[0] + 100, this.blank[1]]); }
			if (this.isValidPosition([this.blank[0] - 100, this.blank[1]])) { positions.push([this.blank[0] - 100, this.blank[1]]); }
			if (this.isValidPosition([this.blank[0], this.blank[1] + 100])) { positions.push([this.blank[0], this.blank[1] + 100]); }
			if (this.isValidPosition([this.blank[0], this.blank[1] - 100])) { positions.push([this.blank[0], this.blank[1] - 100]); }

			for (var i = 0; i < positions.length; i++) {
				movablesquares.push(this.findPieceByPosition(positions[i]));
			}

			return movablesquares;
		},
		isValidPosition : function(position){
			return position[0] <= 300 && position[0] >= 0 && position[1] <= 300 && position[1] >= 0;
		},
		findPieceByPosition : function(position){
			if (this.isValidPosition(position)){
				return $$('div[data-position=' + position + ']' )[0];
			}
		},
		isMovablePiece : function (piece){
			var movablesquares = this.getMovablesquares(),
			movable = false;

			for (var i = 0; i < movablesquares.length; i++) {
				movable = movable || piece === movablesquares[i];
			}
			
			return movable;
		},
		move : function(piece){
			if (this.isMovablePiece(piece)){
				var position = this.getPositionDataFromPiece(piece).current,
				newPosition = game.blank;
				this.blank = position;
				this.setPiece(piece, newPosition);
				this.square_style();
				this.checkSolved();
			}
		}
	};

	$shuffle.observe('click', shuffle_squares);

	function shuffle_squares(){
		game.shuffle_squares();
	}

	$squares.each(function(item){
		item.observe('click', move);
	});

	function move(){
		game.move(this);
	}

	$puzzle.observe('puzzle:solved', function(event){
		$puzzle.innerHTML = "<h2>Congrats, you won!</h2>";
		game.complete = true;
	});

	game.init();
};
