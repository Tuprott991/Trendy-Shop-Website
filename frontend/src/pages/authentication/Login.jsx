import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { authenticationService } from "../../services/authenticationService";
const Login = () => {
 const { isAuthenticated, login } = useContext(AuthContext);
 const [formData, setFormData] = useState({
  email: "",
  password: "",
  error: "",
 });

 if (isAuthenticated) {
  return <Navigate to="/" />;
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = formData;
  const response = await authenticationService.login(email, password);
  if (response.status == 200) {
   console.log(response.data);
   localStorage.setItem("token", response.data.token);
   localStorage.setItem("email", response.data.user.email);
   localStorage.setItem("name", response.data.user.name);
   localStorage.setItem("role", response.data.user.role);
   await login();
  } else {
   console.log(response);
   setFormData({
    email: "",
    password: "",
    error: response.data.message,
   });
  }
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };

 return (
  <div className="flex flex-col justify-center px-6 py-12 mt-10">
   <div>
    <h1 className="text-[80px] font-bold text-center text-green-700 opacity-95">
     SoftWear
    </h1>
    <h2 className="text-center text-[14px] -mt-[20px] text-gray-900">
     We're glad to see you back with us
    </h2>
   </div>

   <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-2">
     <div className="mt-2">
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineUser size={20} />
       </div>
       <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       />
      </div>
     </div>

     <div>
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineLock size={20} />
       </div>
       <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       />
      </div>
     </div>

     {formData.error && (
      <div className="text-red-500 text-sm text-left ml-2 mt-2">
       {formData.error}
      </div>
     )}

     <div>
      <button
       type="submit"
       className="rounded-3xl font-lg py-4 mt-5 flex w-full justify-center bg-gray-800 px-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-900 "
      >
       LOGIN
      </button>
     </div>
    </form>

    <div className="mt-4 text-center text-sm/6 text-gray-800 flex items-center justify-center">
     <p>{"Not registered yet? "}</p>
     <Link
      to="/signup"
      className="underline text-green-600 hover:text-green-900"
     >
      {" Create an account"}
     </Link>
    </div>
   </div>
  </div>
 );
};

export default Login;
