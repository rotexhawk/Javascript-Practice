/**
*  Javascript Carousel
*  Author: Yasin Yaqoobi
*  Project Goal: Build a really simple slider using javascript timer and css transition. 
*  Date: 07/09/16
**/


document.ready = function(){
	
	var slides = document.querySelectorAll('#slider li'); 
	console.log(slides[0]);
	var position = 0;

	setInterval(startSlider,4000); 

	function startSlider(){
		if (position == 3){
			slides[position].style.opacity = 0;	
			slides[position].style.visibility = 'hidden';

			position = 0; 
			slides[position].style.visibility = 'visible'; 
			slides[position].style.opacity = 1;	
		}

		else{
			slides[position].style.opacity = 0;	
			slides[position].style.visibility = 'hidden';

			position ++; 

			slides[position].style.visibility = 'visible'; 
			slides[position].style.opacity = 1;	
		}


		}
	


}();





