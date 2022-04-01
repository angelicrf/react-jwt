import { Fragment } from "react";

function GoalItem({ displayGoal }) {
  return (
    <Fragment>
      <div>
        <h2>{JSON.stringify(displayGoal.map((data) => data.user._id))}</h2>
        <h2>{JSON.stringify(displayGoal.map((data) => data.user.name))}</h2>
        <h2>{JSON.stringify(displayGoal.map((data) => data.user.email))}</h2>
        <h2>
          {JSON.stringify(displayGoal.map((data) => data.user.createdAt))}
        </h2>
      </div>
    </Fragment>
  );
}

export default GoalItem;
