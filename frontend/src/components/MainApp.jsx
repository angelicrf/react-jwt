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
      setisGoal(true);
      setGoalInt(goals.length);
      setGoalData(goals);
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
          <button
            className="btn btn-block"
            type="submit"
            onClick={() => showGoals()}
          >
            showData
          </button>
        ) : (
          <div>No Goal has been assigned</div>
        )}
      </section>
      <div>
        {goalInt > 0 && goalData[0] !== undefined ? (
          <GoalItem displayGoal={goalData} />
        ) : (
          <div>No Goal has been assigned</div>
        )}
      </div>
    </Fragment>
  );
}

export default MainApp;
