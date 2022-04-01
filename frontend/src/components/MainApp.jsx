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

function MainApp() {
  const [goal, setGoal] = useState("");
  const dispatch = useDispatch();
  const { goalSuccess, goalLoading, goalError, goals, msg } = useSelector(
    (state) => state.goals
  );
  const goalSubmit = (e) => {
    e.preventDefault();
    console.log("goalSubmitted.." + goal);
    clearFields(e);
    setGoal("");
    dispatch(assignGoal({name: goal}));
  };
  function clearFields(event) {
    Array.from(event.target).forEach((e) => (e.value = ""));
  }
  useEffect(() => {
    if (goalError) {
      toast.error(msg);
    }
    if (goalSuccess) {
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
    </Fragment>
  );
}

export default MainApp;
