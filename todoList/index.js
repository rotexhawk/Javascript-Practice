/**
*  Javascript TodoList
*  Author: Yasin Yaqoobi
*  Project Goal: Practice Dom Manipulation. Traversing the Dom and adding new Elements
*  Date: 07/07/16
*  Feature to be added: Drag and Drop. Date based organization. Changing tasks to objects.
**/


document.ready = function(){

	var container = document.getElementById('todo-container');
	var addButtons = document.getElementsByClassName('add-task');
	
	var modal = createModal();
	
	Array.prototype.forEach.call(addButtons,addTask);
	
	taskButtonListeners();

	closeModal(); 


function addTask(elm){
	elm.addEventListener('click',function(event){
			
			var task,newTask; 
			
			modal.style.visibility = 'visible';

			task = node_after(elm.parentNode); // otherwise we would have to do elm.parentNode.nextSibling.nextSibling on gecko based browsers. i.e chrome.

			newTask = makeEmptyTask(); 



			var p1 = getFormValue(); 
			
			p1.then(function(output){
				newTask.getElementsByClassName('description')[0].innerHTML = '<span class="text">' + output + '</span>';  // get the value from the modal popup and add it to the new task. 
				
				container.insertBefore(newTask,task); // Insert it at the top.
			});

		});
}

function makeEmptyTask(){
	var elm = document.createElement('div'); 
	elm.className = 'task row';
	elm.setAttribute('data-completed','false');
	elm.innerHTML = '<button class="completed round-botton">&#10004;</button><p class="description col-11"></p><button class="status danger remove-task">X</button>';

	return elm;
}


function taskButtonListeners(){
	container.addEventListener('click',function(event){
		if (event.target.className.includes('remove-task')){ // remove button is clicked
			
			container.removeChild(event.target.parentNode);
		}
		else if (event.target.className.includes('completed')){ // complete button clicked
			var thisTask = event.target.parentNode; 
			if (thisTask.dataset.completed == 'false'){ 
			thisTask.dataset.completed = "true";
			}
			else{
				thisTask.dataset.completed = 'false';
			}
		}
	});
}


function createModal(){
	var modalDiv = document.createElement('div');
	modalDiv.id = 'modal'; 
	
	modalDiv.innerHTML = '<h3 class="underline">Add new reminder</h3><form id="task-form"><label for="description">Description:</label><textarea type="textarea" name="description"></textarea><label for="date">Date:</label><input type="date"><input type="submit" class="button primary"></form>';

	document.body.appendChild(modalDiv);

	return modalDiv;
}

function closeModal(){
	document.addEventListener('click',function(event){
		
		if (event.target.id != 'modal' && event.target.parentNode.id != 'task-form' && event.target.id != 'task-form' && !event.target.className.includes('add-task')){
			modal.style.visibility = 'hidden';
		}
		
	});
}

function submitListener(cb){
	
	document.querySelector('input[type="submit"]').addEventListener('click',function(event){
		event.preventDefault(); 
		modal.style.visibility = 'hidden';
		cb(document.querySelector('textarea').value);
	});
}


function getFormValue(){
	return new Promise(function executor(resolve,error){
		submitListener(resolve);
	});	
}

}();





