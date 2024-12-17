import { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function Home({ toDos, addTodo }) {
    const [text, setText] = useState("");
    function onChange(e) {
        setText(e.target.value);
    }
    function onSubmit(e) {
        e.preventDefault();
        setText("");
        addTodo(text);
    }

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {JSON.stringify(toDos)}
            </ul>
        </>
    );
}

function mapStateToProps(state, ownProps) {
    // console.log(state, ownProps);
    return {
        toDos: state
    };
}

function mapDispatchToProps(dispath) {
    console.log(dispath);

    return {
        addTodo: (text) => dispath(actionCreators.addTodo(text))
    }
}


// export default connect(null, mapDispatchToProps)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);