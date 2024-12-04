import { createStore } from "redux";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");
const ulEl = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  console.log(action);

  switch(action.type) {
    case ADD_TODO:
      return [...state, { text: action.text }];
    case DELETE_TODO: 
      return [];
    default:
      return state;
  }
};

const todoStore = createStore(reducer);

todoStore.subscribe(() => console.log(todoStore.getState()));

const onSubmit = e => {
  e.preventDefault();

  const toDo = inputEl.value;
  inputEl.value = "";
  todoStore.dispatch({ type: ADD_TODO, text: toDo });
};

formEl.addEventListener("submit", onSubmit);
