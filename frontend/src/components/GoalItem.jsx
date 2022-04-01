import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteGoals, reset } from "../features/allAuth/goalSlice";

function GoalItem() {
  const dispatch = useDispatch();
  const { goals, msg } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
     console.log("GoalAndMSg "  + goals + msg)
  }, [goals, msg, dispatch]);

  return (
    <Fragment>    
     <div>
     {console.log("Goals are " + JSON.stringify(goals))}
            {goals.map((data) => {
              console.log("mapData " + JSON.stringify(data))(
                <h1 key={data.user._id}>{goals.user._id}</h1>
              );
            })}
     </div>
    </Fragment>
  );
}

export default GoalItem;
