import { Fragment } from "react";
import { FaUserEdit } from "react-icons/fa";
import { deleteGoals } from "../features/allAuth/goalSlice";
import {
  deleteId,
  arrayDeleteId,
  resetArrayDelete,
} from "../features/allAuth/goalService";
import { useDispatch } from "react-redux";

function GoalItem({ displayGoal }) {
  const dispatch = useDispatch();
  const deleteGoalItem = (delId) => {
    deleteId(delId);
    let arrayValue = arrayDeleteId[0];
    console.log("arrayValue ", arrayValue);
    if (arrayValue !== null) {
      dispatch(deleteGoals());
      resetArrayDelete();
      window.location.reload();
    }
  };
  return (
    <Fragment>
      <div>
        {displayGoal.map((gl) => (
          <div key={gl._id}>
            <button className="btn" onClick={() => deleteGoalItem(gl._id)}>
              <FaUserEdit />
            </button>
            <span>Goal Id : {gl._id}</span>
            <h2>User Id: {gl.user}</h2>
            <h2>Goal Title: {gl.name}</h2>
            <h2>Created at Date: {gl.createdAt}</h2>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default GoalItem;
