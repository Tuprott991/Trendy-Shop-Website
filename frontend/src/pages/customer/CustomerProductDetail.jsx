import React from "react";
import { useParams } from "react-router-dom";

const CustomerProductDetail = () => {
 const { id } = useParams();
 console.log(id);
 return <div>CustomerProductDetail</div>;
};

export default CustomerProductDetail;
