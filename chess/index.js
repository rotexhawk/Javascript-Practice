
var chess = (function(){

var board; 
var colors = ['blue','black']; 
var labelPosition = {num: 8, alpha: 97}; // a = 97
var squarePosition = {num: 9, alpha:96}; 
var settings; 
var pieces = {

	rook: {
		player2: {image:'bR.png', positions: ['a8','h8']},
		player1: {image:'wR.png', positions: ['a1','h1']}
	}, 
	knight: {
		player2: {image:'bN.png', positions: ['b8','g8']},
		player1: {image:'wN.png', positions: ['b1','g1']}
	}, 
	bishop: {
		player2: {image:'bB.png', positions: ['c8','f8']},
		player1: {image:'wB.png', positions: ['c1','f1']}
	},
	queen: {
		player2: {image:'bQ.png', positions: ['d8']},
		player1: {image:'wQ.png', positions: ['d1']}
	},
	king: {
		player2: {image:'bK.png', positions: ['e8']},
		player1: {image:'wK.png', positions: ['e1']}
	},
	pawn:{
		player2: {image:'bP.png', positions: ['a7','b7','c7','d7','e7','f7','g7','h7'], range: '-1'},
		player1: {image:'wP.png', positions: ['a2','b2','c2','d2','e2','f2','g2','h2'], range: '+1'}, 
	}
};


function init(config){
	settings = config;
	var container = document.querySelector(settings.selector); 
	setColors(settings); 
	initPieces(settings); 
	drawBoard(container); 
	setDragDrop(board); 
}


function initPieces(settings){
	if (settings && settings.pieces && settings.pieces.images){
		for (var prop in pieces){
			var imageArray = settings.pieces.images[prop];
			if (imageArray && imageArray.length >= 2){
				pieces[prop].player2.image = imageArray[0]; 
				pieces[prop].player1.image = imageArray[1];
			}
		}
	}
}


function drawBoard(container){
	
	board = document.createElement('ul'); 
	for (var i = 0; i < 64; i++){
		var squarePosition = setSquarePosition(i);
		board.innerHTML += '<li class="square item-' + i + '" style="background-color:' + setBoxBackground(i) + '" data-square="' 
		+ squarePosition + '">' + setLabels(i) + drawPiece(squarePosition) + '</li>'; 
	}
	container.appendChild(board);
}

// set the data-square index ie a8, b7, etc so we know which item is on which square
function setSquarePosition(index){
	if (index % 8 === 0){
		squarePosition.num--; 
		squarePosition.alpha = 96;
	}
	squarePosition.alpha++; 
	return String.fromCharCode(squarePosition.alpha) +  squarePosition.num;
}

// given i.e a8 return the right piece image
function drawPiece(position){
	var image = ''; 
	
	for (var prop in pieces){
		var piece = pieces[prop];

		for (var pos in piece){	
			if (piece[pos].positions && piece[pos].positions.indexOf(position) != -1){
				return '<img class="' + pos + ' '  + prop  + '" src="images/' + piece[pos].image + '">'; 
			}
		}
	}
	return image; 
}


function setLabels(index){
	var label = '';
	if (!settings.showlabels){
		return label;
	}
	
	if (index % 8 === 0){
		label += '<span class="label type-num number-' + labelPosition.num + '">' + labelPosition.num + '</span>';
		labelPosition.num--;
	}
	if (index >=56){
		label += '<span class="label type-alpha alphabet-' + String.fromCharCode(labelPosition.alpha) + '">' + String.fromCharCode(labelPosition.alpha) + '</span>';
		labelPosition.alpha++;
	}
	return label; 
}



function setColors(settings){
	if (!settings.colors || settings.colors.length <= 0){  // if colors aren't specified or the array is empty do nothing. 
		return; 
	}

	if (settings.colors.length > 1){ // If two or more colors are passed get the first two and set our colors array. 

		colors = settings.colors.slice(0,2); 
		return;
	}

	if (settings.colors.length === 1){ // if only one color was passed 	
		var rgb = new RGBColor(settings.colors[0]); // convert the colors to rgb -> rgbcolor.js
		if (rgb.ok){                
			colors[0] = rgb.toRGB();     // save the rgb representation of the color 
			rgb = Object.assign({}, rgb); // clone the rgb element so the reference to array element[0] doesn't get changed
			rgb.r = 255 - rgb.r;  // invert it and save it as next element.  
			rgb.g = 255 - rgb.g; 
			rgb.b = 255 - rgb.b; 
			colors[1] = rgb.toRGB(); 
		}
	}

	console.log(colors);

}


function setBoxBackground(index){
	if (index > 0 && index % 8 === 0){
		colors.reverse();
	}
	return colors[index % 2];
}



function setDragDrop(myBoard){

	var originalTarget; 

	$(myBoard).on('dragstart', 'li', function(event){
		originalTarget = event.currentTarget;
		$(this).css('border', '2px solid yellow');
		event.originalEvent.dataTransfer.setData('text/plain', event.currentTarget.className.split(' ')[1]);
	});

	$(myBoard).on('dragover', 'li', function(event){
		$(this).css('border', '2px solid yellow');
		event.originalEvent.dataTransfer.dropEffect = "move";
		event.preventDefault();

	});

	$(myBoard).on('dragleave', 'li', function(event){
		if ($(this).attr('class').localeCompare(originalTarget.className) != 0){
			$(this).css('border', '0px');
	}
		event.preventDefault();
	});


	$(myBoard).on('drop', 'li', function(event){
		event.preventDefault(); 
		var squareClass = event.originalEvent.dataTransfer.getData("text");

		$(this).css('border', '0px');
		$(originalTarget).css('border', '0px');

		if (isValidMove(originalTarget, $(this))){

			if ($(this).has('img') && !$(this).attr('class').includes(squareClass)){
				$(this).children('img').remove();
			}

			$('.' + squareClass + ' img').appendTo($(this));
		}
	
	});
}





function isValidMove(startSquare, endSquare){
	if (getPlayerAtSquare(startSquare) === getPlayerAtSquare(endSquare)){ // check to see if the pieces don't belong to same player
		return false;
	}
	else if (!moveInRange(startSquare, endSquare)){
		return false;
	}
	return true; 
}

/** Returns a String player1 or Player2 given the square dom element **/
function getPlayerAtSquare(square){
	if ($(square).has('img').length){
		return $(square).find('img').attr('class').split(' ')[0].trim(); 
	}
}

/** Returns the name of a piece given the square dom element **/
function getPieceAtSquare(square) {
	if ($(square).has('img').length){
		return $(square).find('img').attr('class').split(' ')[1].trim(); 
	}
}

function getSquareProperties(square){
	return {
		dataSquare: getSquarePosition(square), 
		player: getPlayerAtSquare(square), 
		numeric: parseInt(getSquarePosition(square).split('')[1]),	 
		alpha: getSquarePosition(square).split('')[0], 
		ascii: parseInt((getSquarePosition(square).split('')[0]).charCodeAt()),
		pieceName: getPieceAtSquare(square),
		pieceProp: (function(){
				if (pieces[getPieceAtSquare(square)]){
					return pieces[getPieceAtSquare(square)][getPlayerAtSquare(square)];
				}  
			})(),
	}
}


function moveInRange(startSquare, endSquare){
	
	start = getSquareProperties(startSquare); 
	end = getSquareProperties(endSquare);	

	// console.log(start); 
	// console.log(end);

	var allowedRange = -1; 
	
	if (start.pieceName === 'pawn'){
		allowedRange = eval(start.numeric + start.pieceProp.range);
		if (start.alpha === end.alpha && allowedRange == end.numeric && end.player === undefined){ // if nothing infront move forward one
			return true;
		}
		else if ((start.ascii + 1 == end.ascii || start.ascii -1 == end.ascii) &&  allowedRange == end.numeric && end.player !== undefined){
			return true;
		}
	}


	else if (start.pieceName === 'rook'){
		if ((start.alpha === end.alpha || start.numeric === end.numeric) && nothingInPath(start,end, start.pieceName)){ // moving in straight path 
			return true;
		}
	}
	else if (start.pieceName === 'bishop'){
		return nothingInPath(start,end,start.pieceName);
	}
	return false;
}



function nothingInPath(start,end, pieceName){
	if (pieceName === 'rook'){
		if (start.numeric === end.numeric){
			return checkHorizontall(start,end, pieceName);
		}
		return checkVerticall(start,end, pieceName);
	}
	else if (pieceName === 'bishop'){
		return checkDiagonally(start,end);
	}
}

function checkHorizontall(start,end){

	if (start.ascii < end.ascii){
		for (var i = start.ascii+1; i < end.ascii; i++){	
			if (getPlayerAtSquare($('[data-square="' + String.fromCharCode(i) + start.numeric + '"]') ) != undefined){
				return false;
			}
		}
	}

	else {
		console.log('start' + start.ascii, 'end' + end.ascii);
		for (var i = end.ascii+1; i < start.ascii; i++){	
			console.log(getPlayerAtSquare($('[data-square="' + String.fromCharCode(i) + start.numeric + '"]')));
			if (getPlayerAtSquare($('[data-square="' + String.fromCharCode(i) + start.numeric + '"]') ) != undefined){
				return false;
			}
		}
	}
	return true; 
}

function checkVerticall(start,end){

		if (start.numeric < end.numeric){
		for (var i = start.numeric+1; i < end.numeric; i++){
			// console.log('[data-square="' + start.alpha +  i + '"]', start.alpha);
			if (getPlayerAtSquare($('[data-square="' + start.alpha +  i + '"]')) != undefined){
				return false;
			}
		}
	}
	else{
		for (var i = start.numeric-1; i > end.numeric; i--){
			// console.log('[data-square="' + start.alpha +  i + '"]', start.alpha);
			if (getPlayerAtSquare($('[data-square="' + start.alpha +  i + '"]')) != undefined){
				return false;
			}
		}
	}
	return true; 
}

function checkDiagonally(start,end){
	console.log('Start ascii ' + start.ascii, start.ascii + start.numeric); 
	console.log('End ascii ' + end.ascii, end.ascii + end.numeric);
	var count;
	if (start.ascii + start.numeric === end.ascii + end.numeric ){  //moving to the left from bottom and right from top. 
		if (start.ascii < end.ascii){
			count = start.numeric; 
			for (var i = start.ascii+1; i < end.ascii; i++){	
				count--;
				if (getPlayerAtSquare($('[data-square="' + String.fromCharCode(i) + count + '"]') ) != undefined){
					return false;
				}
			}
			return true;
		}
		else {
				count = end.numeric; 
				for (var i = end.ascii+1; i < start.ascii; i++){	
					count--; 
					if (getPlayerAtSquare($('[data-square="' + String.fromCharCode(i) + count + '"]') ) != undefined){
						return false;
				}
			}
			return true;
		}
	}

	else if (Math.abs(start.ascii - end.ascii) === Math.abs(start.numeric - end.numeric)) { // moved diagnally
		
		if (start.ascii < end.ascii){
			count = start.numeric;
			for (var i = start.ascii+1; i < end.ascii; i++){
				count++;
				console.log('[data-square="' + String.fromCharCode(i) + count + '"]');
				if (getPlayerAtSquare($('[data-square="' + String.fromCharCode(i) + count + '"]') ) != undefined){
						return false;
				}

			}
			return true;
		}

		else{
			count = end.numeric; 
				for (var i = end.ascii+1; i < start.ascii; i++){	
					count++ 
					if (getPlayerAtSquare($('[data-square="' + String.fromCharCode(i) + count + '"]') ) != undefined){
						return false;
				}
			}
			return true;
		}

	}
	return false;

}






/** Returns the data-square position of element **/
function getSquarePosition(square){
	return $(square).attr('data-square');
}


var publicApi = {
	init: init
};

return publicApi;

})();

$(document).ready(function(){
	chess.init(
		{
			selector: '#chessBoard', 
			colors:['#B58863', '#F0D9B5'],
			showlabels: true,
			pieces: { 
				images:{
					rook: ['bR.png', 'wR.png']
				} 
			},
		}
	);
});
