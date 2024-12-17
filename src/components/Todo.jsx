import { connect } from "react-redux";
import { actionCreators } from "../store";

// eslint-disable-next-line react/prop-types
const ToDo = ({text, onBtnClick}) => {
    return <li>
        {text} <button type="button" onClick={onBtnClick}>DEL</button>
    </li>
};

const mapDispatchToProps = (dispath, ownProps) => {
    return {
        onBtnClick: () => dispath(actionCreators.deleteTodo(ownProps.id))
    };
};

export default connect(null, mapDispatchToProps)(ToDo);