import axios from "axios";
var qs = require("qs");
const API_URL = "/api/goals/";
export let arrayDeleteId = [];
const newGoal = async (thisToken, goalData) => {
  var data = qs.stringify({
    name: goalData.name,
  });
  console.log("goalData " + JSON.stringify(data));
  const config = {
    method: "post",
    url: "/api/goals/",
    headers: {
      Authorization: `Bearer ${thisToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getGoals = async (thisToken) => {
  const thisOption = {
    headers: {
      Authorization: `Bearer ${thisToken}`,
    },
  };
  const response = await axios.get(API_URL, thisOption);
  return response.data.originalId;
};
const deleteGoal = async (thisId, thisToken) => {
  console.log("deleteService called");
  const thisOption = {
    headers: {
      Authorization: `Bearer ${thisToken}`,
    },
  };
  const response = await axios.delete(API_URL + thisId, thisOption);
  console.log("deleteData " + JSON.stringify(response.data));
  return response.data;
};
export const deleteId = (thisDelId) => {
  arrayDeleteId.push(thisDelId);
  return arrayDeleteId;
};
export const resetArrayDelete = () => (arrayDeleteId = []);
const goalService = { deleteGoal, getGoals, newGoal, arrayDeleteId };
export default goalService;
