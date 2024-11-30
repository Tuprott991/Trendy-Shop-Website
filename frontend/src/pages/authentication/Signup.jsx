import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { AiOutlineLock, AiOutlineUser, AiOutlineTeam } from "react-icons/ai";
import { authenticationService } from "../../services/authenticationService";
const Signup = () => {
 const { isAuthenticated, login } = useContext(AuthContext);

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  error: "",
 });

 if (isAuthenticated) {
  return <Navigate to="/" />;
 }

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password, confirmPassword, role } = formData;
  console.log(email, password, confirmPassword, role);
  if (password !== confirmPassword) {
   setFormData((prevData) => ({
    ...prevData,
    error: "Confirm Password doesn't match with password",
   }));
   const response = await authenticationService.signup(
    name,
    email,
    password,
    role
   );
   if (response.status == 200) {
    console.log(response.data);
    const loginResponse = await authenticationService.login(
     response.data.user.email,
     response.data.user.password
    );
    if (loginResponse.status == 200) {
     localStorage.setItem("token", loginResponse.data.token);
     localStorage.setItem("email", loginResponse.data.user.email);
     localStorage.setItem("name", loginResponse.data.user.name);
     localStorage.setItem("role", loginResponse.data.user.role);
     await login();
    } else {
     console.log(loginResponse);
    }
   } else {
    console.log(response);
    setFormData({
     email: "",
     password: "",
     error: response.data.message,
    });
   }
  }
 };

 return (
  <div className="flex flex-col justify-center px-6 py-12 mt-10">
   <div>
    <h1 className="text-[80px] font-bold text-center text-green-700 opacity-95">
     SoftWear
    </h1>
    <h2 className="text-center text-[14px] -mt-[20px] text-gray-900">
     Create an account
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
        type="name"
        name="name"
        id="name"
        required
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       />
      </div>
     </div>

     <div className="">
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineUser size={20} />
       </div>
       <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Your email"
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

     <div>
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineLock size={20} />
       </div>
       <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        required
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       />
      </div>
     </div>

     <div>
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineTeam size={20} />
       </div>
       <select
        name="role"
        id="role"
        required
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       >
        <option value="Customer">Customer</option>
        <option value="Retailer">Retailer</option>
       </select>
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
       SIGNUP
      </button>
     </div>
    </form>

    <div className="mt-4 text-center text-sm/6 text-gray-800 flex items-center justify-center">
     <p>{"Already have an account? "}</p>
     <Link
      to="/login"
      className="underline text-green-600 hover:text-green-900"
     >
      {" Login"}
     </Link>
    </div>
   </div>
  </div>
 );
};

export default Signup;
