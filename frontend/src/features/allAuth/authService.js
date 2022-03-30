import axios from "axios";

const API_URL = "/api/users/";
const API_LOGIN_URL = "/api/users/login";
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    if(!localStorage.getItem('user') || JSON.parse(localStorage.getItem('user')).length === 0){
    localStorage.setItem("user", JSON.stringify(response.data));
    }
  }
  return response.data;
};
const login = async(userData) =>{
  const response = await axios.post(API_LOGIN_URL, userData);
  if (response.data) {
    console.log("responseDataLogin" + JSON.stringify(response.data))
  }
  return response.data;
}
const logout = () =>{
  return localStorage.clear();
}
const authService = { register, login, logout };
export default authService;
