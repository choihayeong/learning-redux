# learning-redux

> learning vanilla-redux and react-redux

- [TIL: react-redux](https://broooksy.tistory.com/category/TIL/react-redux)


### `mapDispatchToProps`

- [react-redux 공식문서: mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch)

```javascript
import { connect } from "react-redux";

function Home({toDos, dispatch}) {
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodo(text));
  };

  return (
    //...
  )
}

function mapStateToProps(state) {
  return {
    toDos: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

```

- `state`가 필요하지 않다면 첫 번째 argument를 `null`로 넣어줌

```jsx
export default connect(null, mapDispatchToProps)(Home);
```

