/**
*  Javascript Carousel
*  Author: Yasin Yaqoobi
*  Project Goal: Build a tic-tac-toe game with javascript.
*  Date: 07/09/16
**/
var tictoe = (function(){
	
	var gameBoard; 

	var gameLogic = {
		currentPlayer: 'human',
		moves: {human:[], computer:[]}, 
		switchPlayer: function(){
			
			if (this.currentPlayer.localeCompare("human") === 0){
				this.currentPlayer = 'computer'; 
			}
			else{
				this.currentPlayer = "human";
			}
		}, 
		computerTurn: function(){
			if (this.currentPlayer.localeCompare("computer") === 0){
				return true; 
			}
			return false; 
		},
		makeMove: function(gameBoard){
			
			var gameBoard = gameBoard.children[0]; 
			var index = this.toBlockIndex(gameBoard); // get index to block


			if (this.computerTurn()){
				if (!gameBoard.children[4].hasChildNodes()){
					drawPlayerMarker(gameBoard.children[4]);  // first try to mark the middle
				}
				else if (index != -1 && !gameBoard.children[index].hasChildNodes()){ // If block index is not -1 it means there is an index we need to block.
					drawPlayerMarker(gameBoard.children[index]); // block that index
				}
				else{
					counter = 2;  // if there is nothing to block, try to mark the even child / corners
					while(counter){
						for (var i = 0; i < gameBoard.children.length; i+= counter){
							var elm = gameBoard.children[i]; 
							if (!elm.hasChildNodes()){
								drawPlayerMarker(elm); 
								return;
							}
						}
						counter--;
					}
				}
			}
		}, 
		toBlockIndex: function(board){
			
			if (this.moves.human.length < 2){ // if human hasn't made two moves don't worry about blocking. 
				return -1; 
			}
			
			for (var i = 0; i < 2; i++){
			
			var lastMove = this.moves.human[this.moves.human.length - (i + 1)]; 
			var secondLastMove = this.moves.human[this.moves.human.length - (i + 2)]; 
			
			var min = Math.min(lastMove,secondLastMove); 
			var max = Math.max(lastMove,secondLastMove);
			
			diff = Math.abs(lastMove-secondLastMove); 

			

			if (diff === 1){
				if (min - 1 >= 0){
					return min -1; 
				}
				
					return max + 1; 
				
			}
			else if (diff === 2){
				if (min != 4 && max != 4){
					return min + 1; 
				}
				else{
					if (max + 2 < board.children.length){
						return max + 2; 
					}
					else{
						return min + 2; 
					}
				}
			}
			else if (diff === 3 || diff === 6){	
				if (max + 3 < board.children.length){
					return max + 3; 
				}
				return min + 3; 
			}

			  else if (diff === 4 || diff === 8){
				return 4; 
			}
		}
			return -1;

		},

		maxMove: function(player){
			return this.moves[player].reduce(function(prev,curr){
				if (prev > curr){
					return prev; 
				}
				return curr; 
			}); 
		}

	};


	var players = {
		human: {ticker: 'fa-times'},
		computer: {ticker: 'fa-circle'}
	};


	function addClick(gameBoard){
		gameBoard.addEventListener('click', function(event){
			var targetElm = event.target; 

			if (targetElm.nodeName == 'LI'){
				if (!targetElm.hasChildNodes() && !gameLogic.computerTurn()){
					drawPlayerMarker(targetElm); 
					gameLogic.makeMove(gameBoard);
				}
			}
		});
	}


	function drawPlayerMarker(elm){
		var ticker = document.createElement('i'); 
		ticker.className = 'fa ' + players[gameLogic.currentPlayer].ticker;
		elm.appendChild(ticker);
		gameLogic.moves[gameLogic.currentPlayer].push(elm.dataset.index);
		gameLogic.switchPlayer(); 
	}


	function init(boardName){
		gameBoard = document.querySelector(boardName); 
		if (gameBoard){
			addClick(gameBoard);
		}
	}

	var publicApi = {
		init: init
	}; 

	return publicApi; 


})();


$(document).ready(function(){
		tictoe.init('#gameBoard');
});


