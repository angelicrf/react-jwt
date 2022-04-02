import { Fragment} from "react";
import { FaUserEdit} from "react-icons/fa";
import {
  deleteGoals,
} from "../features/allAuth/goalSlice";
import { useDispatch } from "react-redux";

function GoalItem({ displayGoal}) {
    const dispatch = useDispatch();
    const deleteGoalItem = (delId) => {
     dispatch(deleteGoals());
    };
  return (
    <Fragment>
      <div>
        {displayGoal.map((gl) => (        
          <div key={gl._id}>          
            <button className="btn" onClick={() => deleteGoalItem(gl._id)}><FaUserEdit /></button><span>Goal Id : {gl._id}</span>
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
