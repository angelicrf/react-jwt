import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../contents/Spinner";
import {
  getAllGoals,
  assignGoal,
  deleteGoals,
  reset,
} from "../features/allAuth/goalSlice";
import GoalItem from "./GoalItem";

function MainApp() {
  const [goal, setGoal] = useState("");
  const [isGoal, setisGoal] = useState(false);
  const [goalInt, setGoalInt] = useState(0);
  const [goalData, setGoalData] = useState([]);
  const dispatch = useDispatch();
  const { goalSuccess, goalLoading, goalError, goals, msg } = useSelector(
    (state) => state.goals
  );
  const goalSubmit = (e) => {
    e.preventDefault();
    console.log("goalSubmitted.." + goal);
    clearFields(e);
    setGoal("");
    dispatch(assignGoal({ name: goal }));
  };
  function clearFields(event) {
    Array.from(event.target).forEach((e) => (e.value = ""));
  }
  const showGoals = () => {
    dispatch(getAllGoals());
  };
  useEffect(() => {
    if (goalError) {
      toast.error(msg);
    }
    if (goalSuccess) {
      console.log("goalSuccess " + goalSuccess);
      setisGoal(true);
      console.log("fromSuccess " + goals.length);
      setGoalInt(goals.length);
      setGoalData(goals);
      console.log("data from useEffect " + JSON.stringify(goalData.length));
      dispatch(reset());
    }
  }, [goal, goalSuccess, goalLoading, goalError, goals, msg, dispatch]);
  if (goalLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="heading">
        <div className="form">
          <form onSubmit={goalSubmit}>
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="goalName">
                  <input
                    type="text"
                    name="goalName"
                    id="goalName"
                    defaultValue={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-block">
              Add a Goal
            </button>
          </form>
        </div>
     
      </div>
      <section className="heading">
          {isGoal ? (
            <button className="btn btn-block" type="submit" onClick={() => showGoals()}>showData</button>
          ) : (
            <div>No Goal has been assigned</div>
          )}
        </section>
      <div>
        {goalInt > 0 && goalData[0] !== undefined ? (
          <>
            <h2>{JSON.stringify(goalData.map((data) => data.user._id))}</h2>
            <h2>{JSON.stringify(goalData.map((data) => data.user.name))}</h2>
            <h2>{JSON.stringify(goalData.map((data) => data.user.email))}</h2>
            <h2>
              {JSON.stringify(goalData.map((data) => data.user.createdAt))}
            </h2>
          </>
        ) : (
          <div>No Goal has been assigned</div>
        )}
      </div>
    </Fragment>
  );
}

export default MainApp;
