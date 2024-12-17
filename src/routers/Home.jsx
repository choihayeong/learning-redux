import { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../components/Todo";

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
                {toDos.map(item => (<ToDo key={item.id} {...item} />))}
            </ul>
        </>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        toDos: state
    };
}

function mapDispatchToProps(dispath) {
    return {
        addTodo: (text) => dispath(actionCreators.addTodo(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
