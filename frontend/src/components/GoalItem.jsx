import { Fragment } from "react";
import { FaUserEdit} from "react-icons/fa";
import {
  deleteGoals,
  reset,
} from "../features/allAuth/goalSlice";
import { useDispatch } from "react-redux";

function GoalItem({ displayGoal}) {
    const dispatch = useDispatch();
    const deleteGoalItem = () => {
     dispatch(deleteGoals());
    };
  return (
    <Fragment>
      <div>
        {displayGoal.map((gl) => (        
          <div key={gl.user._id}> 
            <button className="btn" onClick={() => deleteGoalItem()}><FaUserEdit /></button>
            <h2>{gl.user.name}  </h2>
            <h2>{gl.user.email}</h2>
            <h2>{gl.user._id}</h2>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default GoalItem;
