import React, { useState } from "react";
import CheckoutForm from "../../components/customer/CheckoutForm";
import OrderSummary from "../../components/customer/OrderSummary";

const CustomerCheckout = () => {
 const [isFormComplete, setIsFormComplete] = useState(false);
 const handleFormStatus = (status) => {
  setIsFormComplete(status);
 };
 return (
  <div className="bg-gray-100 pb-6">
   <div className="px-14 pt-6 h-full">
    <div className="text-2xl font-bold ">Checkout</div>

    <div className="flex items-start justify-between gap-8">
     <div className="bg-white w-1/2 mt-4 rounded-lg border border-gray-200 shadow-md">
      <CheckoutForm onFormStatusChange={handleFormStatus}></CheckoutForm>
     </div>
     <div className="bg-white w-1/2 mt-4 rounded-lg border border-gray-200 shadow-md">
      <OrderSummary isFormComplete={isFormComplete}></OrderSummary>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CustomerCheckout;
