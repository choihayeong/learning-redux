# learning-redux

> learning vanilla-redux and react-redux

## Redux 설치

```bash
npm install redux
```

## `CreateStore`

### Store and Reducer

- store는 data(state)를 넣는 곳임.

    * state란 app에서 바뀌는 data를 말함 (`index.js`에서 `count` 변수가 state가 됨)

- `createStore` 함수를 `index.js`에 임포트

```javascript
import { createStore } from "redux";

// ...
let count = 0; // count 변수가 변화하는 데이터 이므로 state가 된다.
```

- `createStore` 함수는 `reducer`라는 함수 argument가 필요함

    * reducer는 store 데이터를 가공해주는 createStore 함수 argument임

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


### Action & `dispatch()`

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


### `subscribe()`

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

<hr /> 

## Redux: To do

- [three principles](https://redux.js.org/understanding/thinking-in-redux/three-principles)

    * mutation 하지 말 것 (new state object 사용)

```javascript
// ❌ 예시

const reducer = (state = [], action) => {
  console.log(action);

  switch(action.type) {
    case ADD_TODO:
      return state.push(action.text); // ❌ 이렇게 mutation 사용 하지 않음
    case DELETE_TODO: 
      return [];
    default:
      return state;
  }
};

```

```javascript
// 예시

const reducer = (state = [], action) => {
  console.log(action);

  switch(action.type) {
    case ADD_TODO:
      return [...state, { text: action.text }]; // 
    case DELETE_TODO: 
      return [];
    default:
      return state;
  }
};

const todoStore = createStore(reducer);

todoStore.subscribe(() => console.log(todoStore.getState()));

```


## `react-redux`

- `react-redux`와 `react-router-dom` 설치

```bash
npm i react-redux react-router-dom
```

- `/src/components/` 폴더 내 `App.jsx` 파일 생성 후 Router 관련 임포트

```javascript
// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../routers/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

function App () {
  return <RouterProvider router={router} />;
}

export default App;
```

- `main.jsx` 파일 수정

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- `index.html` 파일 수정

```html
<head>
  <!-- meta tags -->
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

- `/src/routes/` 폴더 생성 후 `Home.jsx`, `Detail.jsx` 파일 생성

```javascript
// Home.jsx

function Home () {
  return (
    <>
      <h1>To Do</h1>
      <form>
        <input type="text" />
        <button>Add</button>
      </form>
      <ul></ul>
    </>
  );
}

export default Home;
```

- `useState` 추가

```javascript
// Home.jsx
import { useState } from "react";

function Home() {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    console.log(text);
  }

  return(
    <>
      <h1>To Do</h1>
      <form>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul></ul>
    </>
  )
}

export default Home;
```

### Setting `store.js`

- `/src/store.jsx` 파일 생성

```javascript
import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

export const addTodo = text => {
  return {
    type: ADD,
    text
  };
};

export const deleteTodo = id => {
  return {
    type: DELETE,
    id
  };
};

const reducer = (state= [], action) => {
  switch(action.type) {
    case ADD:
      return [{text: action.text, id: Date.now()}, ...state];
    case DELETE:
      return state.filter(item => item !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
```

- `/src/main.jsx` 파일에 다음과 같이 작성

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import { Provider } from 'react-redux' // 추가
import store from './store' // 추가

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
```

### `mapStateToProps`

- [react-redux 공식문서: mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate)

- `Home.jsx` 에서 다음 함수를 추가

```javascript
import { connect } from "react-redux";

function Home() {
  return //...
}

function mapStateToProps (state, ownProps) {
  return {}; // 기본적으로 object 타입을 리턴
}

export default connect(mapStateToProps)(Home);
```
