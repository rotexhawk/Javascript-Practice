/**
*  Javascript TodoList
*  Author: Yasin Yaqoobi
*  Project Goal: Practice Dom Manipulation. Traversing the Dom and adding new Elements
*  Date: 07/07/16
*  Bugs: We are cloning the existent task so if you remove all task can't add anything back because there is *  nothing to clone. 
*  Feature to be added: Drag and Drop, use of promises. Date based organization. Changing tasks to objects.
**/


document.ready = function(){

	var container = document.getElementById('todo-container');
	var addButtons = document.getElementsByClassName('add-task');
	var removeButtons = document.getElementsByClassName('remove-task');
	var modal = createModal();
	var task,newTask; 

	Array.prototype.forEach.call(addButtons,addTask);
	Array.prototype.forEach.call(removeButtons,removeTask);


	closeModal(); 
	submitListener(); 

function addTask(elm){
	elm.addEventListener('click',function(event){

			modal.style.visibility = 'visible';

			task = node_after(elm.parentNode); // otherwise we would have to do elm.parentNode.nextSibling.nextSibling on gecko based browsers. i.e chrome.

			newTask = task.cloneNode(true); 

		});
}


function removeTask(elm){
	elm.addEventListener('click',function(event){

			var toRemove = elm.parentNode; 
		
			if (toRemove.parentNode && elm.parentNode.parentNode.id == 'todo-container'){ 
				container.removeChild(toRemove);
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

function submitListener(){
	var myTask; 
	document.querySelector('input[type="submit"]').addEventListener('click',function(event){
		event.preventDefault(); 
		myTask = document.querySelector('textarea').value; 
		modal.style.visibility = 'hidden';
		newTask.getElementsByClassName('description')[0].innerHTML = myTask;
		container.insertBefore(newTask,task);
		Array.prototype.forEach.call(removeButtons,removeTask);
	});
}


}();





