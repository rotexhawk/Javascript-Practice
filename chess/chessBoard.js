
var chessBoard = (function(){

var labelPosition = {num: 8, alpha: 97}; // a = 97
var squarePosition = {num: 8, alpha:97}; 

var chess = Object.create(Chess.prototype); 

var defaultSettings = {
	selectors: ['#chessBoard'],
	colors:['#B58863', '#F0D9B5'],
	showlabels: true, 
	sideBars: true, 
	animate: true, 
	showPath: true
};

var pieces = {

	rook: {
		player2: {image:'bR.png', positions: ['a8','h8']},
		player1: {image:'wR.png', positions: ['a1','h1']},
	}, 
	knight: {
		player2: {image:'bN.png', positions: ['b8','g8']},
		player1: {image:'wN.png', positions: ['b1','g1']},
	}, 
	bishop: {
		player2: {image:'bB.png', positions: ['c8','f8']},
		player1: {image:'wB.png', positions: ['c1','f1']},
	},
	queen: {
		player2: {image:'bQ.png', positions: ['d8']},
		player1: {image:'wQ.png', positions: ['d1']},
	},
	king: {
		player2: {image:'bK.png', positions: ['e8']},
		player1: {image:'wK.png', positions: ['e1']}, 
	},
	pawn:{
		player2: {image:'bP.png', positions: ['a7','b7','c7','d7','e7','f7','g7','h7']},
		player1: {image:'wP.png', positions: ['a2','b2','c2','d2','e2','f2','g2','h2']}, 
	}
};


function init(settings){
	for (var conf in settings){
		defaultSettings[conf] = settings[conf];
	}
	initPieces(defaultSettings);
	drawBoard(); 
	initDragDrop();
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

function drawBoard(){
	for (var n = 0; n < defaultSettings.selectors.length; n++){
	
	var board = document.createElement('ul'); 
	var container = $(defaultSettings.selectors[n]); 
	console.log(container);
	// set them back to default because the position get's changed by setSquarePosition
	squarePosition = {num: 9, alpha:97};  
	labelPosition = {num: 8, alpha: 97};

	for (var i = 0; i < 64; i++){
		var dataSquare = getDataSquare(i);
		board.innerHTML += '<li class="square item-' + i + '" style="background-color:' + getBoxBackground(i) + '" data-square="' 
		+ dataSquare + '">' + setLabels(i) + getPiece(dataSquare) + '</li>'; 
		}

		$(board).appendTo(container);
	
	}
}



function getBoxBackground(index){
	if (index > 0 && index % 8 === 0){
		defaultSettings.colors.reverse();
	}
	return defaultSettings.colors[index % 2];
}


// set the data-square index ie a8, b7, etc so we know which item is on which square
function getDataSquare(index){
	if (index % 8 === 0){
		squarePosition.num--; 
		squarePosition.alpha = 97;
	}
	var str = String.fromCharCode(squarePosition.alpha) + squarePosition.num; 
	squarePosition.alpha++; 
	return str; 
}

// Given the index return the spans containing the numberic and char value. i.e <span>1</span> <span>a</span>
function setLabels(index){
	var label = '';
	if (!defaultSettings.showlabels){
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


// given i.e a8 return the right piece image <img src="pR.png">
function getPiece(position){
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

function initDragDrop(){
	defaultSettings.selectors.forEach(function(elm){
		setDragDrop($(elm));
	});
}


function setDragDrop(myBoard){

	var originalTarget; 

	$(myBoard).on('dragstart', 'li', function(event){

		if (!chess.isPlayersTurn($(this))){
			alert('Not your turn');
			return false; 
		}

		originalTarget = event.currentTarget;
		$(this).css('border', '2px solid yellow');
		if (defaultSettings.showPath){
			chess.highlightMove(originalTarget);
		}
	});


	$(myBoard).on('dragover', 'li', function(event){
		$(this).css('border', '2px solid yellow');
		event.originalEvent.dataTransfer.dropEffect = "move";
		event.preventDefault();

	});


	$(myBoard).on('dragleave', 'li', function(event){
		$(this).css('border', '0px');
		event.preventDefault();
	});


	$(myBoard).on('drop', 'li', function(event){
		event.preventDefault(); 
		var squareClass = originalTarget.className.split(' ')[1];

		$(this).css('border', '0px');
		$(originalTarget).css('border', '0px');


		if (chess.isValidMove(originalTarget, $(this))){

			if ($(this).has('img') && !$(this).attr('class').includes(squareClass)){
				$(this).children('img').remove();
			}

			$('.' + squareClass + ' img').appendTo($(this));
		}
	
	});
}




var publicApi = {
	init: init
};

return publicApi;

})();

$(document).ready(function(){
	chessBoard.init(
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
