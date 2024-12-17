import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = ({toDos}) => {
    const paramId = useParams().id;
    const toDo = toDos.find(item => item.id === parseInt(paramId));

    console.log(toDo);

    return (
        <>
            <h2>{toDo?.text}</h2>
            <p>Created at: {toDo?.id}</p>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        toDos: state
    };
};

export default connect(mapStateToProps)(Detail);