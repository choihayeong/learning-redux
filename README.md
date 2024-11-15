# learning-redux

> learning vanilla-redux and react-redux

## Redux 설치

```bash
npm install redux
```

## Store and Reducer

- store는 data(state)를 넣는 곳임.

    * state란 app에서 바뀌는 data를 말함 (`index.js`에서 `count` 변수가 state가 됨)

- `createStore` 함수를 `index.js`에 임포트

```javascript
import { createStore } from "redux";

// ...
let count = 0; // count 함수가 변화하는 데이터 이므로 state가 된다.
```

- `createStore` 함수는 `reducer`라는 함수 argument가 필요함

    * reducer는 store 데이터를 가공해주는 함수 argument임

```javascript
import { createStore } from "redux";

const reducer = () => {};

const store = createStore(reducer);
let count = 0;

//...
```

- `console.log(countStore)` 중요한 속성 : `countStore.getState()`

```javascript
import { createStore } from "redux";

const countModifier = () => {
    return "hello stranger :P";
};

const countStore = createStore(countModifier);

console.log(countStore);
```

```javascript
console.log(countStore.getState()); // countModifier 함수의 리턴 값이 콘솔에 뜬다. => data를 가공시켜줌
```

- 다음과 같이 reducer의 리턴값을 reducer의 argument인 count(state)로 반환하는 함수로 만든다.

```javascript
import { createStore } from "redux";

const countModifier = (count = 0) => {
    return count;
};

const countStore = createStore(countModifier);

console.log(countStore.getState()); // count 값인 0이 콘솔에 뜬다.
```


## Action & `dispatch()`

- reducer 함수의 두 번째 argument는 action이라고 한다. `dispatch()`를 사용해서 reducer에 action 값을 보내줌

```javascript
import { createStore } from "redux";

const countModifier = (count = 0, action) => {
    if (action.type === "ADD") {
        return count + 1;
    } else if (action.type === "MINUS") {
        return count - 1;
    } else {
        return count;
    }
};

const countStore = createStore(countModifier);

countStore.dispatch({ type: "ADD" });

console.log(countStore.getState()); // count + 1를 한 1이 콘솔에 뜬다.
```


## `subscribe()`

- html에 렌더링 시켜줌

```javascript
import { createStore } from "redux";

const addBtnEl = document.getElementById("addBtn");
const minusBtnEl = document.getElementById("minusBtn");
const result = document.querySelector("span");

result.innerText = 0;

const countStore = createStore(countModifier);

const onChange = () => {
    result.innerText = countStore.getState();
};

countStore.subscribe(onChange);

addBtnEl.addEventListener("click", () => countStore.dispatch({ type: "add" }));
minusBtnEl.addEventListener("click", () => countStore.dispatch({ type: "minus" }));
```
