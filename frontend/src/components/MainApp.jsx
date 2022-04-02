import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../contents/Spinner";
import { getAllGoals, assignGoal, reset } from "../features/allAuth/goalSlice";
import GoalItem from "./GoalItem";

function MainApp() {
  const [goal, setGoal] = useState("");
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
    window.location.reload();
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
      setGoalData(goals);
    }
    // dispatch(reset());
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
      <div>
        {goalSuccess ? (
          <>
            {goalData.length > 0 ? (
              <GoalItem displayGoal={goalData} />
            ) : (
              <div>No data assigned</div>
            )}
          </>
        ) : (
          <button className="btn" onClick={() => showGoals()}>
            {" "}
            ShowData
          </button>
        )}
      </div>
    </Fragment>
  );
}

export default MainApp;
