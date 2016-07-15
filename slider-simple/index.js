/**
*  Javascript Carousel
*  Author: Yasin Yaqoobi
*  Project Goal: Build a really simple slider using javascript timer and css transition. 
*  Date: 07/09/16
**/


document.ready = function(){
	
	var slides = document.querySelectorAll('#slider li'); 
	
	slides[0].style.visibility = 'visible'; 
	slides[0].style.opacity = 1; 

	setupSlideButtons(); 

	

	var position = 0;
	var mySlides = setInterval(startSlider,4000); 
	
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

	function startSliderWithSlideEffect(){
		
		if (position == 3){
			slides[position].style.transition = '0s';
			slides[position].style.left = '1200px';	
			
			position = 0; 

			slides[position].style.transition = '2s';
			slides[position].style.left = 0; 

		}

		else{
			slides[position].style.transition = '0s';
			slides[position].style.left = '1200px';	
			
			position ++; 

			slides[position].style.transition = '2s';
			slides[position].style.left = 0;
		}

	}

	function removePreviousStyle(styleName, styleVal){
		console.log('removeStyle ' + styleName);
		var val = styleVal || 'inherit';
		Array.prototype.forEach.call(slides, function(elm){
			elm.style[styleName] = val;
		});
		
	}

	/*
	* we are using appendChild. We can do the same with innerHTML but it makes browser to redraw dom.
	* 
	**/
	function setupSlideButtons(){
		var buttons = document.createElement('ul');
		for (var i = 0; i < slides.length; i++){
			buttons.innerHTML += '<li id="button-' + i + '">';
		}
		document.getElementById('slider-buttons').appendChild(buttons);

		document.getElementById('slider-buttons').addEventListener('click', function(event){
			var event = event || window.event;
			var buttonId = event.target.id; 
			
			if (event.target.nodeName != 'LI'){ 
				return;
			}	

			buttonId = parseInt(buttonId.substring(buttonId.indexOf('-')+1));

			restartSlider(buttonId);
			
		});


		function restartSlider(buttonId){

			clearInterval(mySlides);  // we remove the interval i.e stop the slider 

			slides[position].style.opacity = 0;	
			slides[position].style.visibility = 'hidden';

			position = buttonId; 

			slides[position].style.visibility = 'visible'; 
			slides[position].style.opacity = 1;	
 
			setTimeout(function(){   // wait four seconds before starting the slider again so the transions are the same.
				mySlides = setInterval(startSlider,4000); 
			}(),4000);

		}

	}

	document.querySelector('#effects select').addEventListener('change',function(event){
		var effect = event.target.value; // same as event.target.selectedOptions[0].value
		changeEffect(effect);
	});


	function changeEffect(name){
		clearInterval(mySlides);  // we remove the interval i.e stop the slider 

		if (name === 'fade'){
			mySlides = setInterval(startSlider,4000); 
		}

		else if (name === 'slide'){
			removePreviousStyle('opacity');
			removePreviousStyle('visibility');
			removePreviousStyle('left','1200px');
			mySlides = setInterval(startSliderWithSlideEffect,4000); 
		}
	}


}();





