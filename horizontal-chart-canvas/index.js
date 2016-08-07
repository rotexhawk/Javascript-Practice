/**
*  Javascript Carousel
*  Author: Yasin Yaqoobi
*  Project Goal: Build a really simple slider using javascript timer and css transition. 
*  Date: 07/09/16
**/

var Charts = (function(){

var ctx; 
var canvas; 
var canvasData = {}; 
var mousePositions = [];

function init(canvas, chart){
	initCanvas(canvas); 
	setupCanvas(chart);
	if (chart.type.localeCompare('HorizontalBar') != -1){
		drawHorizontalChart(chart);
	}
}

function initCanvas(canv){
	canvas = canv;
	if (canvas.getContext){
		ctx = canvas.getContext('2d');
	}
}


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
	console.log(canvasData);
}



function drawHorizontalChart(chart){
	drawFrame();
	drawXAxis(chart);
	drawYAxis(chart);
	drawChartTitle(chart); 
	var barValue; 
	var position = {x:canvasData.beginX+1, y: 0};

	for (var i = chart.data.labels.length-1; i >= 0; i--){
		
		for (var n = 0; n <= chart.data.datasets[0].data[i]; n+=0.4){
			setTimeout(function(index, count){
				if (index == 0){
					position.y += canvasData.marginBottom + canvasData.barHeight;
					barValue = chart.data.datasets[0].data[count];
					setTooltip(canvasData.beginX, barValue * canvasData.scaleRatio + canvasData.yLabelsWidth,position.y, position.y + canvasData.barHeight, chart.data.labels[count], count, barValue);
				}
				ctx.fillStyle = chart.data.datasets[0].backgroundColor[count]; 
				console.log(index);
				ctx.fillRect(position.x, position.y, index * canvasData.scaleRatio , canvasData.barHeight);

				

			}, 1000, n, i); 


		}

	}

}

function drawChartTitle(chart){
	ctx.font = "16px serif";
	ctx.fillText(chart.data.datasets[0].label, (canvasData.innerWidth)/2, canvasData.legendsHeight / 2);
	
}

function drawFrame(){
	ctx.beginPath();
	ctx.moveTo(canvasData.beginX, canvasData.beginY);   // (30, 15)
	ctx.lineTo(canvasData.beginX, canvasData.endY); // (30,385)
	ctx.lineTo(canvasData.endX, canvasData.endY); // (1000,385)
	ctx.stroke();
}

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


$('#myChart').mousemove(function(event){
		
		for (var i = 0; i < mousePositions.length; i++){
			var posObj = mousePositions[i];
			if (!posObj){return false;}
		if (event.offsetX >= posObj.beginX && event.offsetX <= posObj.endX && 
			event.offsetY >= posObj.beginY && event.offsetY <= posObj.endY
			){

			if ($('#toolTip').length <= 0){
			
				var toolTip = $('<div id="toolTip">' + posObj.label + ': ' + posObj.value + '</div>'); 
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
				
					$('.charts-area').append(toolTip); 
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