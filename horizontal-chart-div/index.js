/**
*  Javascript Carousel
*  Author: Yasin Yaqoobi
*  Project Goal: Build a simple horizontal chart with divs.  
*  Date: 07/09/16
**/

var Charts = (function(){

	var elements; 

	function displayCharts(){
	
		elements.each(function(){
			$(this).css('width', $(this).attr('data-progress')); 
		});
	}

	function drawLegends(){

		elements.each(function(){
			var barname = $('<span class="barname">' + $(this).attr('data-name') + '</span>');
			barname.css({
				'height': $(this).outerHeight(),
				'padding-top': '10px',
				'display': 'block'
			});
			$('#yAxis').append(barname);
		});
		$('.charts-container').css('margin-left', $('#yAxis').outerWidth() + 10);
		$('#yAxis').css('top', $('.charts-container').position().top);
		$('#xAxis').css({
			'width': $('.charts-container').width(),
			'left': $('.charts-container').css('margin-left')
		});
		var xPoints = '<ul>'; 
		for (var i = 0; i <= 100; i+=10){
			xPoints += '<li>' + i + '%</li>'; 
		}
		xPoints += '</ul>';

		$('#xAxis').html(xPoints);
	}

	function init(elms){
		elements = elms; 
		drawLegends(); 
		displayCharts();
	}


	var publicApi = {
		init: init
	}; 


	return publicApi; 
	
})();

$(document).ready(function(){
	Charts.init($('.charts-container .chart'));
});


