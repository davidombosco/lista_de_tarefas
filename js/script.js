'use strict';

const removeIcon ='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeIcon ='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

const todos = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [] );
const completed = (localStorage.getItem('completed-list') ? JSON.parse(localStorage.getItem('completed-list')) : [] );

loadItens();

//this fucntion loads the array's items into the page
function loadItens() {
	for (let i=0; i< todos.length; i+=1){
		addItemToDOM(todos[i]);
	}

	for (let i=0; i< completed.length; i+=1){
		addItemToDOM(completed[i],true);
	}
}

const item = document.getElementById('item-text')

// this function adds a new task to the to-do list when enter key is presssed
item.addEventListener('keypress', function(e) {
    const itemText = item.value;
    if((e.which === 13 || e.keyCode === 13) && itemText) {
		todos.push(itemText);
		addItemToDOM(itemText);
		item.value = '';
		updateStorage();
    }
});

//this function adds a new task on the to-do list when + button is clicked
document.getElementById('add').onclick = function() {
	const itemText = item.value;
	if (itemText){
		todos.push(itemText); //adds to the array
		addItemToDOM(itemText);
		item.value = '';
		updateStorage();
	}
}

//this function receives a value and converts it into an element
function addItemToDOM(itemText,completed){
	const item = document.createElement('li');
	item.innerText = itemText;

	const buttons = document.createElement('div');
	buttons.classList.add('buttons'); //adds a class to the div element

	const removeButton = document.createElement('button');
	removeButton.classList.add('remove');
	removeButton.innerHTML = removeIcon;
	removeButton.onclick = removeItem;

	const completeButton = document.createElement('button');
	completeButton.classList.add('complete');
	completeButton.innerHTML = completeIcon;
	completeButton.onclick = completeItem

	buttons.append(removeButton);
	buttons.append(completeButton);

	item.append(buttons);

	const listId = (completed ? 'completed-list' : 'todo-list'); // ternary operator - first argument if 'completed', else, second argument.
	document.getElementById(listId).prepend(item);
}

//this function removes a specific task when called
function removeItem(){
	const item = this.parentNode.parentNode; //'this' contains the value of the element that called the function
	const currentListId = item.parentNode.id;
	const text = item.innerText;

	item.remove();

	if (currentListId === 'todo-list'){
		todos.splice(todos.indexOf(text),1); //splice takes 2 arguments: where to start deleting and how many items must me deleted
	} 
	else {
		completed.splice(completed.indexOf(text),1);
	}

	updateStorage();
}

//this functions puts a task into the completed list, or vice versa
function completeItem(){
	const item = this.parentNode.parentNode;
	const currentList = item.parentNode;
	const currentListId = currentList.id;
	const text = item.innerText;

	item.remove();

	if (currentListId === 'todo-list') {
		todos.splice(todos.indexOf(text),1);
		completed.push(text)
		document.getElementById('completed-list').prepend(item);
	}
	else {
		completed.splice(completed.indexOf(text),1);
		todos.push(text);
		document.getElementById('todo-list').prepend(item);
	}

	updateStorage();
}

//this function keeps the localStorage updated along the changes suffered on the lists
function updateStorage () {
	localStorage.setItem('todos',JSON.stringify(todos));
	localStorage.setItem('completed-list',JSON.stringify(completed));
}