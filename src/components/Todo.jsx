import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";

const ToDo = ({text, id, onBtnClick}) => {
    return (
    
    <li>
        <Link to={`/${id}`}>{text}</Link>
        <button type="button" onClick={onBtnClick}>DEL</button>
    </li>)
};

const mapDispatchToProps = (dispath, ownProps) => {
    return {
        onBtnClick: () => dispath(actionCreators.deleteTodo(ownProps.id))
    };
};

export default connect(null, mapDispatchToProps)(ToDo);