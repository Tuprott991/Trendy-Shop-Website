import axios from "axios";

const login = async (email, password) => {
 try {
  const response = await axios.post("http://localhost:8080/api/auth/login", {
   email: email,
   password: password,
  });
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

const signup = async (name, email, password, role) => {
 try {
  const response = await axios.post("http://localhost:8080/api/auth/signup", {
   name,
   email,
   password,
   role,
  });
  return response;
 } catch (e) {
  console.log(e.response);
  return e.response;
 }
};

export const authenticationService = {
 login,
 signup,
};
