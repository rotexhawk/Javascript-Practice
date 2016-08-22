/**
*  Javascript Chess
*  Author: Yasin Yaqoobi
*  Project Goal: Learn how to create a flexible chessboard, which we will turn into a full chess game. 
*  Date: 07/09/16
**/


var chess = (function(){

var board; // our dom board object
var colors = ['white','#ccc5c5'];  // default colors for squares
var labelPosition = {num: 8, alpha: 97}; 
var squarePosition = {num: 9, alpha:96}; // starting position for labels which starts at 8 and character A
var settings; // Configurations that's passed to us.

// chess pieces default positions and images
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
		player2: {image:'bP.png', positions: ['c8','f8']},
		player1: {image:'wP.png', positions: ['c1','f1']}
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
		player2: {image:'bP.png', positions: ['a7','b7','c7','d7','e7','f7','g7','h7']},
		player1: {image:'wP.png', positions: ['a2','b2','c2','d2','e2','f2','g2','h2']}
	}
};

/** Initialize our game **/ 
function init(config){
	settings = config;
	var container = document.querySelector(settings.selector); 
	setColors(settings); 
	initPieces(settings); 
	drawBoard(container); 
	setDragDrop(board); 
	
}

// Set the Images for our chess pieces if the user has passed in different images. 
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

/** Draw the board **/
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

// Draw each piece given the position of square. i.e a8 return the right piece image
function drawPiece(position){
	var image = ''; 
	for (var prop in pieces){
		var elm = pieces[prop];
		for (var pos in elm){	
			if (elm[pos].positions.indexOf(position) != -1){
				return '<img class="' + pos + ' '  + prop  + '" src="images/' + elm[pos].image + '">'; 
			}
		}
	}
	return image; 
}

/** Set the labels if the user has set labels to true **/
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


/** Set the color of the board **/
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
		
		if ($(this).has('img') && !$(this).attr('class').includes(squareClass)){
		
			$(this).children('img').remove();
		}
		

		
		
		
		var elm = $('.' + squareClass + ' img').appendTo($(this));
		
	});

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
			showlabels: false,
			pieces: { 
				images:{
					rook: ['bR.png', 'wR.png']
				} 
			},
		}
	);
});
