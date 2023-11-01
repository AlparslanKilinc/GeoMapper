import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'https://geomapper-ylm6.onrender.com/auth'
});
export const getLoggedIn = () => api.get(`/loggedIn/`);
export const loginUser = (userName, password) => {
  return api.post(`/login/`, {
    userName: userName,
    password: password
  });
};
export const logoutUser = () => api.get(`/logout/`);
export const registerUser = (userName, firstName, lastName, email, password, passwordVerify) => {
  return api.post(`/register/`, {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    passwordVerify: passwordVerify
  });
};
export const updateUser = (firstName, lastName, userName, bio, id) => {
  return api.post(`/updateUser/${id}`, {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    bio: bio
  });
};
const apis = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  updateUser
};
export default apis;
