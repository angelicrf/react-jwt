import { Fragment } from "react";

function GoalItem({ displayGoal }) {
  return (
    <Fragment>
      <div>
        {displayGoal.map((gl) => (
          <div key={gl.user._id}>
            <h2>{gl.user.name}</h2>
            <h2>{gl.user.email}</h2>
            <h2>{gl.user._id}</h2>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default GoalItem;
