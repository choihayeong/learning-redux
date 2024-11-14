const addBtnEl = document.getElementById("addBtn");
const minusBtnEl = document.getElementById("minusBtn");
const result = document.querySelector("span");

let count = 0;

result.innerText = count;

const updateText = () => {
  result.innerText = count;
}


const clickAddBtn = () => {
  count = count + 1;
  updateText();
};

const clickMinusBtn = () => {
  count = count - 1;
  updateText();
};

addBtnEl.addEventListener("click", clickAddBtn);
minusBtnEl.addEventListener("click", clickMinusBtn);
