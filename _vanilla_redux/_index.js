import { createStore } from "redux";

const addBtnEl = document.getElementById("addBtn");
const minusBtnEl = document.getElementById("minusBtn");
const result = document.querySelector("span");

result.innerText = 0;

const ADD = "add";
const MINUS = "minus";

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  result.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const increaseNumber = () => countStore.dispatch({ type: ADD });
const decreaseNumber = () => countStore.dispatch({ type: MINUS });

addBtnEl.addEventListener("click", increaseNumber);
minusBtnEl.addEventListener("click", decreaseNumber);
