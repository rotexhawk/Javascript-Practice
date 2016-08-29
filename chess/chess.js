function Chess(){
}

Chess.prototype.gameState = {
		currentPlayer: 'player1', 
		player1: {
			hasMadeFirstMove: false, 
			pieces:{
				pawn: ['a2','b2','c2','d2','e2','f2','g2','h2'], 
				rook: ['a1','h1'], 
				knight: ['b1','g1'], 
				bishop: ['c1','f1'], 
				queen: ['d1'],
				king: ['e1']
			}
		},	 
		player2: {
			hasMadeFirstMove: false, 
			pieces:{
				pawn: ['a7','b7','c7','d7','e7','f7','g7','h7'], 
				rook: ['a8','h8'], 
				knight: ['b8','g8'], 
				bishop: ['a6','f8'], 
				queen: ['d8'],
				king: ['e8']
			}
		}	 
};

Chess.prototype.willBeChecked = function(end){
	 var oppositePlayer = this.gameState.currentPlayer === 'player1' ? 'player2' : 'player1';
	 var pieces = this.gameState[oppositePlayer].pieces; 
	 var start; 

	 for (var pieceName in  pieces){

	 	for (var i = 0; i < pieces[pieceName].length; i++){
	 		
	 		start = $('[data-square="' + pieces[pieceName][i] + '"]'); 
	 	
	 		if (this.moveInRange(start,end,true)){
	 			return true;
	 		}
	 	}
	 }

	 return false;
}


Chess.prototype.switchPlayer = function(){
	this.gameState.currentPlayer = this.gameState.currentPlayer === 'player1' ? 'player2' : 'player1';
}

Chess.prototype.getCurrentPlayer = function(){
	return this.gameState.currentPlayer;
}

Chess.prototype.isPlayersTurn = function(startSquare){
	if (this.getPlayerAtSquare(startSquare) === this.getCurrentPlayer()){
		return true;
	}
	return false;
}



Chess.prototype.highlightMove = function(start){
	
}


Chess.prototype.movePiece = function(start,end){
	start = this.getSquareProperties(start); 
	end = this.getSquareProperties(end);
	var index = this.gameState[this.getCurrentPlayer()].pieces[start.pieceName].indexOf(start.dataSquare);
	this.gameState[this.getCurrentPlayer()].pieces[start.pieceName][index] = end.dataSquare;
}


Chess.prototype.getSquareProperties = function (square){
	if (!this.getSquarePosition(square)){
		return square; 
	}
	return {
		dataSquare: this.getSquarePosition(square), 
		player: this.getPlayerAtSquare(square), 
		numeric: parseInt(this.getSquarePosition(square).split('')[1]),	
		alpha: this.getSquarePosition(square).split('')[0], 
		ascii: parseInt((this.getSquarePosition(square).split('')[0]).charCodeAt()),
		pieceName: this.getPieceAtSquare(square)
	}
}

/** Returns the data-square position of element **/
Chess.prototype.getSquarePosition = function(square){
	return $(square).attr('data-square');
}


/** Returns a String player1 or Player2 given the square dom element **/ 
Chess.prototype.getPlayerAtSquare = function(square){
	if ($(square).has('img').length){
		return $(square).find('img').attr('class').split(' ')[0].trim(); 
	}
}
/** Check if a square has player **/
Chess.prototype.hasPlayer = function(ascii,numeric){
	var square = $('[data-square="' + String.fromCharCode(ascii) + numeric + '"]');
	if (this.getPlayerAtSquare(square) != undefined){
		return true; 
	}
	return false;
}


/** Returns the name of a piece given the square dom element **/
Chess.prototype.getPieceAtSquare = function(square) {
	if ($(square).has('img').length){
		return $(square).find('img').attr('class').split(' ')[1].trim(); 
	}
}


Chess.prototype.isValidMove = function(startSquare, endSquare){
	if (this.getPlayerAtSquare(startSquare) === this.getPlayerAtSquare(endSquare)){ // check to see if the pieces don't belong to the same player
		return false;
	}
	else if (!this.moveInRange(startSquare, endSquare)){
		return false;
	}
	this.movePiece(startSquare,endSquare);
	this.switchPlayer();
	return true; 
}


Chess.prototype.moveInRange = function(startSquare, endSquare, skipCheckTest){
	
	var start = this.getSquareProperties(startSquare); 
	var end = this.getSquareProperties(endSquare);	

	if (start.pieceName === 'pawn'){
		return this.movePawn(start,end);
	}
	else if (start.pieceName === 'rook'){
		 return this.moveRook(start,end);
	}
	else if (start.pieceName === 'king'){
		return this.moveKing(start,end, skipCheckTest);
	}
	else if (start.pieceName === 'queen'){
		return this.moveQueen(start,end);
	}
	else if (start.pieceName === 'bishop'){
		return this.checkDiagonally(start,end);
	}
	else if (start.pieceName === 'knight'){
		return this.moveKnight(start,end);
	}
}	

Chess.prototype.movePawn = function(start,end){

	var range = start.player === 'player1' ? 1 : -1; 
	
	var allowedRange = start.numeric + range === end.numeric; 

	if (!this.gameState[start.player].hasMadeFirstMove){
			allowedRange = Math.abs(end.numeric - start.numeric) <= 2;
	}
	

	if (allowedRange){
		
		if (start.alpha === end.alpha && end.player === undefined){ // if nothing infront move forward one
			this.gameState[start.player].hasMadeFirstMove = true; 
			return true;
		}

		else if ( Math.abs(start.ascii - end.ascii) === 1 &&  end.player !== undefined){ // if something is front move diagnoally.
			return true;
		}
			
	}
	
	return false;
}


Chess.prototype.moveRook = function(start,end){
	if (start.numeric === end.numeric){
		if (this.checkHorizontally(start,end)){
			return true; 
		} 
	}
	else if (this.checkVertically(start,end)){
		return true; 
	}
}


Chess.prototype.moveKing = function(start,end, skipCheckTest){

	if (!skipCheckTest && this.willBeChecked(end)){
		return false;
	}

	if (start.alpha === end.alpha && Math.abs(end.numeric - start.numeric) === 1){ // move up/down by one allowed
			return true;
	}

	else if (start.numeric === end.numeric && Math.abs(end.ascii - start.ascii) === 1){ //move left/right by one allowed
			return true;
	}

	else if (Math.abs(start.numeric - end.numeric) === 1 && Math.abs(start.ascii - end.ascii) === 1) { // else allow diagnolly by one.
		if (this.checkDiagonally(start,end)){
			return true; 
		}
	}
}


Chess.prototype.moveQueen = function(start,end){

	if (start.ascii === end.ascii){
		if (this.checkVertically(start,end)){
			return true;
		}
		
	}
	
	else if (start.numeric === end.numeric){
		if (this.checkHorizontally(start,end)){
			return true;
		}
	}
	
	else {
		if (this.checkDiagonally(start,end)){
			return true;
		}
	}

}


Chess.prototype.moveKnight = function(start,end){
	var asciiDiff = Math.abs(start.ascii - end.ascii); 
	var numericDiff = Math.abs(start.numeric - end.numeric);
	if ( (asciiDiff === 1 && numericDiff === 2) || (asciiDiff === 2 && numericDiff === 1) ){
			return true;
	}
}


Chess.prototype.checkHorizontally = function(start,end){

	var max = Math.max(start.ascii, end.ascii); 
	var min = Math.min(start.ascii, end.ascii); 

	for (var i = min + 1; i < max; i++){
		if (this.hasPlayer(i,start.numeric)){
			return false; 
		}
	}

	return true; 

}


Chess.prototype.checkVertically = function(start,end){

	var max = Math.max(start.numeric, end.numeric); 
	var min = Math.min(start.numeric, end.numeric);

	for (var i = min + 1; i < max; i++){
		
		if (this.hasPlayer(start.ascii, i)){
			return false; 
		}
	}

	return true; 
}


Chess.prototype.checkDiagonally = function(start,end){
	
	var max = Math.max(start.ascii, end.ascii); 
	var min = Math.min(start.ascii, end.ascii);
	var count = start.ascii === min ? start.numeric : end.numeric;  	
	var maxNumeric = Math.max(start.numeric, end.numeric);
	var incStep = count === maxNumeric ? -1 : 1; 

	if (Math.abs(start.ascii - end.ascii) === Math.abs(start.numeric - end.numeric)) { // moved diagnally

			for (var i = min + 1; i < max; i++){
				count += incStep; 
				if (this.hasPlayer(i,count)){
					return false;
				}

			}
			return true;
	}
	return false;
}



