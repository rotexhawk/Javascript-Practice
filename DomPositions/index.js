
function getElementPosition(elm){

var position = {left: 0, top: 0}; 

	while(elm){

console.log(elm);
console.log('OffsetLeft: ' + elm.offsetLeft);
console.log("OffsetTop: " + elm.offsetTop);
console.log("ScrollLeft: " + elm.scrollLeft); 
console.log("ScrollTop: " + elm.scrollTop); 
console.log("ClientLeft: " + elm.clientLeft); 
console.log("ClientTop: " + elm.clientTop);


		if (elm.tagName != 'BODY'){
			var xScroll = elm.scrollLeft || document.documentElement.scrollLeft; 
			var yScroll = elm.scrollTop || document.documentElement.scrollTop; 

		position.left += elm.offsetLeft - xScroll + elm.clientLeft; 
		position.top += elm.offsetTop - yScroll + elm.clientTop;
		
	}
	else{
		position.left += elm.offsetLeft - elm.scrollLeft + elm.clientLeft; 
		position.top += elm.offsetTop - elm.scrollTop + elm.clientTop;
	}

		elm = elm.offsetParent;
	}
	console.log(position);
}


$(document).ready(function(){
	var elm = document.querySelector('#secondChild img:nth-of-type(3)');
	var jqueryPos = $(elm).position(); 
	
	var jscriptPos = getElementPosition(elm);

	$('#jQuery-position #left').html('Left: ' + jqueryPos.left); 
	$('#jQuery-position #top').html(' Top: ' + jqueryPos.top); 

	// $('#javascript-position #left').html('Left: ' + jscriptPos.left); 
	// $('#javascript-position #top').html(' Top: ' + jscriptPos.top); 

});

