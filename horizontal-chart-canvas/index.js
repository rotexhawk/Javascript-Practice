/**
*  Javascript Carousel
*  Author: Yasin Yaqoobi
*  Project Goal: Draw a horizontal chart on canvas. 
*  Date: 07/09/16
**/

var Charts = (function(){

var ctx; 
var canvas; // html canvas
var canvasData = {}; // 
var mousePositions = [];

function init(canvas, chart){
	initCanvas(canvas); 
	setupCanvas(chart);
	if (chart.type.localeCompare('HorizontalBar') != -1){ 
		drawFrame();
		drawXAxis(chart);
		drawYAxis(chart);
		drawChartTitle(chart); 
		drawHorizontalChart(chart);
	}
}

/**
*  Check to see if we can get the ctx. 
**/
function initCanvas(canv){
	canvas = canv;
	if (canvas.getContext){
		ctx = canvas.getContext('2d');
	}
}

/**
* Do some calculation based on chart data passed in, so we can call these values while drawing our chart. 
**/
function setupCanvas(chart){
	canvasData = {
		get maxValue(){
			return ratio = chart.data.datasets[0].data.reduce(function(prev,curr){
					if (prev > curr){
						return prev; 
					}
					return curr; 
				});
		}, 

		get scaleRatio(){
				return this.innerWidth / this.maxValue; 		
			},

		get legendsHeight(){return 50; }, 

		get yLabelsWidth(){return 100; }, 

		get outerHeight(){return $(canvas).outerHeight(); }, 

		get innerHeight(){return this.outerHeight - 2 * this.legendsHeight; },

		get outerWidth(){return $(canvas).outerWidth(); }, 

		get innerWidth(){
			return this.outerWidth - this.yLabelsWidth;
		},
		
		get marginBottom(){ 
				return this.innerHeight / chart.data.labels.length * 0.2; 	
		},
		get barHeight(){
			return (this.innerHeight / chart.data.labels.length) - this.marginBottom;
		},
		get beginX(){
			return this.yLabelsWidth; 
		},
		get endX(){
			return this.outerWidth; 
		},
		get beginY(){
			return this.legendsHeight; 
		},
		get endY(){
			return this.outerHeight - this.legendsHeight;
		}

	};
	
}


/**
* This method loops through the data that is passed in. It get's the horizontal bar value and starts from the left of the canvas and  
* incremently draws the bar until the bar value is reached. The purpose of setTimeout is to put our drawins in event loop otherwise, 
* javascript will run through the loops and draw all the charts right away. To increase the speed of our drawing change n+=0.2 to a higher value.
**/
function drawHorizontalChart(chart){
	
	var barValue; 
	var position = {x:canvasData.beginX+1, y: 0};

	for (var i = chart.data.labels.length-1; i >= 0; i--){
		
		for (var n = 0; n <= chart.data.datasets[0].data[i]; n+=0.2){

			setTimeout(function(index, count){
				if (index == 0){
					position.y += canvasData.marginBottom + canvasData.barHeight;
					barValue = chart.data.datasets[0].data[count];
					setTooltip(canvasData.beginX, barValue * canvasData.scaleRatio + canvasData.yLabelsWidth,position.y, position.y + canvasData.barHeight, chart.data.labels[count], count, barValue);
				}
				ctx.fillStyle = chart.data.datasets[0].backgroundColor[count]; 
				
				ctx.fillRect(position.x, position.y, index * canvasData.scaleRatio , canvasData.barHeight);

				

			}, 0, n, i); 


		}

	}

}

/**
* Draw Chart Titles
*/
function drawChartTitle(chart){
	ctx.font = "16px serif";
	ctx.fillText(chart.data.datasets[0].label, (canvasData.innerWidth)/2, canvasData.legendsHeight / 2);
	
}

/** Draw the chart frame **/
function drawFrame(){
	ctx.beginPath();
	ctx.moveTo(canvasData.beginX, canvasData.beginY);   // (30, 15)
	ctx.lineTo(canvasData.beginX, canvasData.endY); // (30,385)
	ctx.lineTo(canvasData.endX, canvasData.endY); // (1000,385)
	ctx.stroke();
}

/** Draw Y-axis **/
function drawYAxis(chart){
	ctx.fillStyle = 'black';
	ctx.font = "14px serif";
	var label; 
	var yPos = canvasData.beginY + canvasData.legendsHeight / 2 + 5; 

	for (var i = chart.data.labels.length-1; i >= 0; i--){

		label = chart.data.labels[i]; 

		ctx.fillText(label, 0, yPos); 
		yPos += canvasData.barHeight + canvasData.marginBottom; 
	}
}

/** Draw X-axis **/
function drawXAxis(chart){
	
	var textRatio = (canvasData.innerWidth - 20) / canvasData.maxValue;
	
	ctx.fillStyle = 'black';
	ctx.font = "12px serif";

	var xPos = canvasData.yLabelsWidth + canvasData.barHeight; 

	for (var i = 0; i <= canvasData.maxValue; i+= 50){
		xPos = canvasData.yLabelsWidth + (textRatio * i);
		ctx.fillText(i, xPos, canvasData.endY + canvasData.legendsHeight / 2); 
	
	}

}

/** Save the bar position and it's height, width, label and value so mouse move can get these values easily. **/
function setTooltip(beginX, endX, beginY, endY, label, index, barValue){

	mousePositions[index] = {
		label: label, 
		value: barValue,
		beginX: beginX, 
		endX:endX,
		beginY: beginY,
		endY: endY
	};
}


/** Show tooltip if the mouse is over a bar **/
$('#myChart').mousemove(function(event){
		
		for (var i = 0; i < mousePositions.length; i++){
			var posObj = mousePositions[i];
			if (!posObj){return false;}

		if (event.offsetX >= posObj.beginX && event.offsetX <= posObj.endX &&  // Check to see if the mouse is on a bar
			event.offsetY >= posObj.beginY && event.offsetY <= posObj.endY
			){

			if ($('#toolTip').length <= 0){ // If there is no tooltip already.
			
				var toolTip = $('<div id="toolTip">' + posObj.label + ': ' + posObj.value + '</div>');  // create a tooltip dom elm.
					toolTip.css({
						'position': 'absolute', 
						'display': 'block', 
						'color': 'white', 
						'background': 'black', 
						'padding': '2px 10px', 
						'border': '1px solid black', 
						'border-radius': '4px',
						'left': event.clientX,
						'top': event.pageY,
					}); 
				
					$('.charts-area').append(toolTip);  // add it to the end of .charts-area
				}
				return false;
		}
		else{

			$('#toolTip').remove();
			}	
	}
		
});


var publicApi = {
	init: init
}; 

return publicApi; 

})();


$(document).ready(function(){
	var canvas = document.getElementById("myChart");
	Charts.init(canvas, {
		type: 'HorizontalBar',
		data: {
			labels: ['Afghanistan', 'Russia', 'China', 'USA', 'India', 'Australia'], 
			datasets: [
				{
					label: 'Progress Chart',
					backgroundColor: [
						'rgb(255, 99, 132)',
		                'rgb(54, 162, 235)',
		                'rgb(152, 133, 255)',
		                'rgb(135, 199, 232)',
		                'rgb(54, 162, 235)',
		                'rgb(135, 199, 232)',
		               
	                ], 
	                 borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(152, 133, 255, 1)',
		                'rgba(135, 199, 232, 1)',
		                 'rgba(54, 162, 235, 1)',
		                'rgba(152, 133, 255, 1)',
		               
	                ], 
	                borderWidth: 1,
	                data: [100, 200, 300, 400,200,300]
	            }
			]
		}

	});





});