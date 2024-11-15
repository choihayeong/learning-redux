import { createStore } from "redux";

const addBtnEl = document.getElementById("addBtn");
const minusBtnEl = document.getElementById("minusBtn");
const result = document.querySelector("span");

const countModifier = (count = 0, action) => {
  // console.log(action);

  if (action.type === "add") {
    return count + 1;
  } else if (action.type === "minus") {
    return count - 1;
  } else {
    return count;
  }  
};

const countStore = createStore(countModifier);

countStore.dispatch({ type: "add" });

console.log(countStore.getState());
