function Chess(){
}

Chess.prototype.gameState = {
		currentPlayer: 'player1',
		previousMove: null,
		messages: [],
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
				bishop: ['c8','f8'], 
				queen: ['d8'],
				king: ['e8']
			}
		}	 
};

Chess.prototype.getMessage = function(){
	return this.gameState.messages.pop();
}

Chess.prototype.hasMessage = function(){
	return this.gameState.messages.length; 
}

Chess.prototype.addMessage = function(message){
	return this.gameState.messages.push(message);
}

/** Check if the player will be checked if he moves there **/ 
Chess.prototype.willBeChecked = function(end){
	 var oppositePlayer = this.getOppositePlayer();
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


/** Test if the player is check so we can stop the player from moving other pieces **/ 
Chess.prototype.isChecked = function(){
	var position = this.gameState[this.getCurrentPlayer()].pieces.king; 
	var end = $('[data-square="' + position + '"]');
	return this.willBeChecked(end);
}


/** Switch the player every time a move is successfull **/ 
Chess.prototype.switchPlayer = function(){
	this.gameState.currentPlayer = this.gameState.currentPlayer === 'player1' ? 'player2' : 'player1';
}

/** Get the Current Player **/
Chess.prototype.getCurrentPlayer = function(){
	return this.gameState.currentPlayer;
}

Chess.prototype.getOppositePlayer = function(){
	return this.gameState.currentPlayer === 'player1' ? 'player2' : 'player1';
}

/** Check to see if it is players turn **/ 
Chess.prototype.isPlayersTurn = function(startSquare){
	if (this.getPlayerAtSquare(startSquare) === this.getCurrentPlayer()){
		return true;
	}
	return false;
}



Chess.prototype.highlightMove = function(start){
	
}

/** Update the gamestate object with the new move position **/ 
Chess.prototype.movePiece = function(start,end){
	start = this.getSquareProperties(start); 
	end = this.getSquareProperties(end);
	
	var pieceName = start.pieceName;
	

	var index = this.gameState[this.getCurrentPlayer()].pieces[pieceName].indexOf(start.dataSquare);
	

	var currVal = this.gameState[this.getCurrentPlayer()].pieces[pieceName][index]; 

	this.setPreviousMove(pieceName,index,currVal);
	
	this.gameState[this.getCurrentPlayer()].pieces[pieceName][index] = end.dataSquare;
	
}

Chess.prototype.setPreviousMove = function(pieceName,index,value){
	this.gameState.previousMove = {pieceName,index,value};
	
}

Chess.prototype.getPreviousMove = function(){
	return this.gameState.previousMove; 
}

Chess.prototype.reverseMove = function(){
	var previousMove = this.getPreviousMove();
	this.gameState[this.getCurrentPlayer()].pieces[previousMove.pieceName][previousMove.index] = previousMove.value; 
}



/** Get the common square properties so we can easily call them in other functions **/ 
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

	var players = ['player1', 'player2'];
	
	for (var i = 0; i < players.length; i++){
		var player = players[i];
		for (var piece in this.gameState[player].pieces){
			console.log(piece, this.gameState[player].pieces[piece].indexOf(String.fromCharCode(ascii) + numeric), String.fromCharCode(ascii) + numeric);
			if (this.gameState[player].pieces[piece].indexOf(String.fromCharCode(ascii) + numeric) != -1){

				return true; 
			}
		}
	}

	return false;
}


/** Returns the name of a piece given the square dom element **/
Chess.prototype.getPieceAtSquare = function(square) {
	if ($(square).has('img').length){
		return $(square).find('img').attr('class').split(' ')[1].trim(); 
	}
}

// Check if a move is valid **/ 
Chess.prototype.isValidMove = function(startSquare, endSquare){
	if (!this.isPlayersTurn(startSquare)){
		this.addMessage('Not your turn!');
		return false; 
	}

	if (this.getCurrentPlayer() === this.getPlayerAtSquare(endSquare)){ // check to see if the pieces don't belong to the same player
		this.addMessage('Can\'t make a move against your own player');
		return false;
	}

	else if (!this.moveInRange(startSquare, endSquare)){
		return false;
	}

	this.movePiece(startSquare,endSquare);
	// if player is still checked after the move it means player didn't cover the king. Reverse the move, show the message and return false.
	if (this.isChecked()){ 
		this.reverseMove();
		this.addMessage("Checked!");
		return false; 
	}

	this.switchPlayer();
	return true; 

}

/** Check to see if the move is in range of the piece. Meaning the player is not dragging and dropping the elements everywhere **/ 
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

/** 
Move the pawn. If it's player1 move forward, If player two decrease the numeric index .ie reflection.
AllowedRange is two if player hasn't made first move otherwise it is +-1 depending on the player. 
 **/ 
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

		else if ( Math.abs(start.ascii - end.ascii) === 1 &&  end.player !== undefined){ // if something is in front move diagnollay to eat the opposing players piece.
			return true;
		}
			
	}
	
	return false;
}


/** Move the Rook horizontally or vertically **/ 
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

/** Move the king, +1 -1 in any direction and check to see if he will be checked there **/ 
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

/** Queen can move infinte in any direction except horse jump **/ 
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

/** Special rule for horse/knight jump. **/
Chess.prototype.moveKnight = function(start,end){
	var asciiDiff = Math.abs(start.ascii - end.ascii); 
	var numericDiff = Math.abs(start.numeric - end.numeric);
	if ( (asciiDiff === 1 && numericDiff === 2) || (asciiDiff === 2 && numericDiff === 1) ){
			return true;
	}
}

/** Given the start and end position it computes wether the piece can move there horizontally. **/
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

/** Given the start and end position it computes wether the piece can move there vertically. **/
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

/** Check if the vertical move is valid **/ 
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



