import axios from "axios";
var qs = require('qs');
const API_URL = "/api/golas/";

const newGoal = async (thisToken, goalData) => {
 
  var data = qs.stringify({
    'name': goalData.name 
  });
  console.log("goalData " + JSON.stringify(data));
  var config = {
    method: 'post',
    url: '/api/goals/',
    headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDQ3OTkyZGVmYzBhMDFmNjMzN2NlMyIsImlhdCI6MTY0ODczNzExNCwiZXhwIjoxNjUyMTkzMTE0fQ.-vPqZqKMVM5iFYE6M239kneGvGXpzXZJnsBLzCFzMio', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
};
const getGoals = async (thisId, thisToken) => {
  const thisOption = {
    headers: {
      Authorization: `Bearer ${thisToken}`,
    },
  };
  const response = await axios.get(API_URL + thisId, thisOption);
  return response.data;
};
const deleteGoal = async (thisId, thisToken) => {
  const thisOption = {
    headers: {
      Authorization: `Bearer ${thisToken}`,
    },
  };
  const response = await axios.delete(API_URL + thisId, thisOption);
  return response.data;
};

const goalService = { deleteGoal, getGoals, newGoal };
export default goalService;
