import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  console.log("userData" + JSON.stringify( userData))
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    console.log("responseData" + JSON.stringify(response.data))
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const authService = { register };
export default authService;
