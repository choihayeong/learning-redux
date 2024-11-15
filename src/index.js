import { createStore } from "redux";

const addBtnEl = document.getElementById("addBtn");
const minusBtnEl = document.getElementById("minusBtn");
const result = document.querySelector("span");

result.innerText = 0;

const countModifier = (count = 0, action) => {
  if (action.type === "add") {
    return count + 1;
  } else if (action.type === "minus") {
    return count - 1;
  } else {
    return count;
  }  
};

const countStore = createStore(countModifier);

const onChange = () => {
  result.innerText = countStore.getState();
};

countStore.subscribe(onChange);

addBtnEl.addEventListener("click", () => countStore.dispatch({ type: "add" }));
minusBtnEl.addEventListener("click", () => countStore.dispatch({ type: "minus" }));
