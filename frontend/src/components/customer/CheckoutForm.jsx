import React, { useEffect, useState } from "react";

const CheckoutForm = ({ onFormStatusChange }) => {
 const [formData, setFormData] = useState({
  name: "",
  address: "",
  city: "",
  phone: "",
  email: "",
 });
 useEffect(() => {
  const isFormValid = Object.values(formData).every((field) => field !== "");
  onFormStatusChange(isFormValid);
 }, [formData, onFormStatusChange]);
 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
 };

 return (
  <form className="px-6 py-5">
   <div className="mb-4">
    <label className="block text-gray-700 mb-2">Name</label>
    <input
     type="text"
     name="name"
     required
     value={formData.name}
     onChange={handleChange}
     className="w-full border rounded-lg p-2 mb-1 focus:outline-green-500"
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-700 mb-2">Street address</label>
    <input
     type="text"
     name="address"
     required
     value={formData.address}
     onChange={handleChange}
     className="w-full border rounded-lg p-2 mb-1 focus:outline-green-500"
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-700 mb-2">Town/City</label>
    <input
     type="text"
     name="city"
     required
     value={formData.city}
     onChange={handleChange}
     className="w-full border rounded-lg p-2 mb-1 focus:outline-green-500"
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-700 mb-2">Phone number</label>
    <input
     type="text"
     name="phone"
     required
     value={formData.phone}
     onChange={handleChange}
     className="w-full border rounded-lg p-2 mb-1 focus:outline-green-500"
    />
   </div>
   <div className="mb-4">
    <label className="block text-gray-700 mb-2">Email</label>
    <input
     type="email"
     name="email"
     required
     value={formData.email}
     onChange={handleChange}
     className="w-full border rounded-lg p-2 mb-1 focus:outline-green-500"
    />
   </div>
  </form>
 );
};

export default CheckoutForm;
