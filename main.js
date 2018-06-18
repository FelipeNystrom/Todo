const form = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const doneTodoList = document.querySelector('#done-todo-list');
const emptyDoneTodoList = document.querySelector('#emptyDoneTodoList');
const emptyTodoList = document.querySelector('#emptyTodoList');
const listFlex = document.querySelector('#listFlex');

let input = document.querySelector('#todo-input');
let check = document.querySelector('.check');

let listOfTodos = [];
let listOfDoneTodos = [];

const buildIdObject = (value, arr) => {
  let obj = {};

  if (arr.length === 0) {
    return (obj = { id: 0, todo: value.toUpperCase() });
  } else {
    return (obj = { id: arr.length, todo: value.toUpperCase() });
  }
};

const addTodoToList = todo => {
  listOfTodos.push(buildIdObject(todo, listOfTodos));

  let li = document.createElement('li');
  li.className = 'todo';

  let removeFromList = document.createElement('span');

  for (data of listOfTodos) {
    let todoId = `<input type="hidden" value="${data.id}">`;

    todoList.appendChild(
      li
    ).innerHTML = `<span>${data.todo.toUpperCase()}</span>`;

    li.appendChild(removeFromList).innerHTML =
      '<i class="fas fa-check-circle check"></i> ';

    li.insertAdjacentHTML('beforeend', todoId);

    if (listOfTodos.length !== 0) {
      listFlex.style.justifyContent = 'space-between';
      emptyTodoList.style.display = 'block';
    }
  }
};

const addTodoToDone = (movedTodo, id) => {
  listOfDoneTodos.push(buildIdObject(movedTodo, listOfDoneTodos));

  if (listOfDoneTodos.length !== 0) {
    doneSectionHeader.style.display = 'block';
    emptyDoneTodoList.style.display = 'block';
  }

  let li = document.createElement('li');
  li.className = 'done-todo';

  let span = document.createElement('span');

  for (data of listOfDoneTodos) {
    let todoId = `<input type="hidden" value="${data.id}">`;

    doneTodoList.appendChild(li).innerHTML = `<span>${movedTodo}</span>`;
    li.appendChild(span).innerHTML =
      '<i class="fas fa-times-circle remove"></i> ';
    li.insertAdjacentHTML('beforeend', todoId);
  }
};

const moveTodo = todo => {
  let removeLi = todo.parentNode.parentNode;
  let moveTextValue = removeLi.firstChild.innerHTML;
  let todoId = removeLi.lastChild.getAttribute('value');
  console.log(todoId);
  console.log(listOfTodos[0].id == todoId);
  listOfTodos = listOfTodos.filter(todo => todo.id != todoId);
  console.log(listOfTodos);

  addTodoToDone(moveTextValue);
  removeLi.parentNode.removeChild(removeLi);

  if (listOfTodos.length === 0) {
    listFlex.style.justifyContent = 'center';
    emptyTodoList.style.display = 'none';
  }
};

const removeTodo = todo => {
  let removeLi = todo.parentNode.parentNode;
  let todoId = removeLi.lastChild.getAttribute('value');
  listOfDoneTodos = listOfDoneTodos.filter(todo => todo.id != todoId);
  removeLi.parentNode.removeChild(removeLi);

  if (listOfDoneTodos.length === 0) {
    doneSectionHeader.style.display = 'none';
    emptyDoneTodoList.style.display = 'none';
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();
  addTodoToList(input.value);
  input.value = '';
});

todoList.addEventListener('click', e => {
  if (e.target.nodeName === 'I') {
    moveTodo(e.target);
  }
});

doneTodoList.addEventListener('click', e => {
  if (e.target.nodeName === 'I') {
    removeTodo(e.target);
  }
});

emptyTodoList.addEventListener('click', e => {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  listOfTodos = [];
});

emptyDoneTodoList.addEventListener('click', e => {
  while (doneTodoList.firstChild) {
    doneTodoList.removeChild(doneTodoList.firstChild);
  }
  doneSectionHeader.style.display = 'none';
  emptyDoneTodoList.style.display = 'none';
  listOfDoneTodos = [];
});
