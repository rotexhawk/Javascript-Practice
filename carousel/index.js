/**
*  Javascript Carousel
*  Author: Yasin Yaqoobi
*  Project Goal: Learn how to create a simple carousel. Learn how to remove replace dom elements. Implement *  array methods on dom objects. 
*  Date: 07/09/16
**/


document.ready = function(){
	
	var carousel = document.getElementById('carousel');

	calculateElementPosition();  // calculate the position for carousel elements. 

	setInterval(startCarousel,4000); // slide every 4 second. 

// getting elements childnodes is not consistent. Will also list child [space] so we have to manuall check. If we use document.querSelectorAll() like the next function we don't need to check. 

function calculateElementPosition(){
	var left = 0; 
	Array.prototype.forEach.call(carousel.childNodes, function(elm){
		if (elm.nodeName === 'LI'){         
			elm.style.left = left + 'px'; 
			left += 142; 
		}
	});
	
}


function startCarousel(){
	carousel.style.transition = '1s';   // Add css transition delay of 1s so when position is calculated it will slide instead of jittery disappearance. 
	carousel.style.left = '-142px';
	var nodeList = Array.prototype.slice.call(document.querySelectorAll('#carousel li')); // Convert nodeElements to array. 
	var firstElement = nodeList.shift();  // take the first element
	nodeList.push(firstElement);	// add it to the end of array. 

	setTimeout(function(){	 // replace the carousel elements from the array but wait one second for the slide transition to complete. The slide effect happens because we declared css obove. 
	
	carousel.innerHTML = ''; // Empty the #Carousel and add the nodeList again which removes the first element and adds it to the end.
	nodeList.forEach(function(elm){
		carousel.innerHTML += elm.outerHTML; 
	}); 

	calculateElementPosition();
	carousel.style.transition = '0s';  // Remove the transition otherwise it will slideback when carousel style changes. 
	carousel.style.left = '0px';
	},1000);
	

}


}();





