/**
*  Javascript TodoList
*  Author: Yasin Yaqoobi
*  Project Goal: Practice Dom Manipulation. Traversing the Dom and adding new Elements
*  Date: 07/07/16
*  Feature to be added: Drag and Drop. Date based organization. Changing tasks to objects.
**/


document.ready = function(){

	var container = document.getElementById('todo-container');
	var tasks = document.getElementsByClassName('task');
	
    var elementMouseIsOver;
    var target; 

	var elmY, startY; 


	container.addEventListener('mousedown',function(event){
		target = event.target; 

		if (target.className.includes('description')){ // the description paragraph is on top of task so this will trigger the task selection.
			 target = target.parentNode; 

			 target.style.zIndex = 1000;	
			 
        	  startY = event.clientY;
        	  elmY = ExtractNumber(target.style.top);

			 document.onmousemove = OnMouseMove;
			 document.onmouseup = onMouseUp;
		}
	});

	function OnMouseMove(event){
		
		target.style.top = (elmY + event.clientY) - startY + 'px';
	}

	function onMouseUp(event){
		getElementUnderMouse();
		target.style.zIndex = 'initial';	
		document.onmousemove = null;

	}



	function getElementUnderMouse(){
		var x = event.clientX, y = event.clientY;
		elementMouseIsOver = document.elementFromPoint(x, y);
		console.log(elementMouseIsOver);
		document.onmouseup = null; 
	}



	function removeDraggable(elm){
		elm.setAttribute('draggable','false');
	}
	
	function ExtractNumber(value){
    	var n = parseInt(value);
		return n == null || isNaN(n) ? 0 : n;
	}


}();





