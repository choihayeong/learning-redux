import { createStore } from "redux";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const ulEl = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action) => {
  console.log(action);

  switch(action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO: 
      return state.filter(item => item.id !== parseInt(action.id));
    default:
      return state;
  }
};

const todoStore = createStore(reducer);

todoStore.subscribe(() => console.log(todoStore.getState()));

const dispatchDeleteTodo = e => {
  const id = parseInt(e.target.parentNode.id);

  todoStore.dispatch(deleteTodo(id));
};

const setTodos = () => {
  const toDos = todoStore.getState();
  ulEl.innerHTML = "";

  toDos.forEach(item => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.innerText = "Delete";
    button.addEventListener("click", dispatchDeleteTodo);
    li.id = item.id;
    li.innerText = item.text;

    li.appendChild(button);
    ulEl.appendChild(li);
  });
};

todoStore.subscribe(setTodos);

const dispatchAddTodo = text => {
  todoStore.dispatch(addTodo(text));
};

const onSubmit = e => {
  e.preventDefault();

  const toDo = inputEl.value;
  inputEl.value = "";
  dispatchAddTodo(toDo);
};

formEl.addEventListener("submit", onSubmit);
