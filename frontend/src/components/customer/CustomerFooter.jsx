const CustomerFooter = () => {
 return (
  <div className="bg-green-700 w-full py-12">
   <div className="container mx-auto">
    <div className="grid md:grid-cols-4 gap-4 text-center">
     <div>
      <h1 className="text-white font-bold">Company</h1>
      <ul className="mt-4">
       <li className="text-white">About Us</li>
       <li className="text-white">Contact Us</li>
       <li className="text-white">Careers</li>
      </ul>
     </div>
     <div>
      <h1 className="text-white font-bold">Support</h1>
      <ul className="mt-4">
       <li className="text-white">FAQ</li>
       <li className="text-white">Help Desk</li>
       <li className="text-white">Forums</li>
      </ul>
     </div>
     <div>
      <h1 className="text-white font-bold">Legal</h1>
      <ul className="mt-4">
       <li className="text-white">Terms & Conditions</li>
       <li className="text-white">Privacy Policy</li>
       <li className="text-white">Cookie Policy</li>
      </ul>
     </div>
     <div>
      <h1 className="text-white font-bold">Social</h1>
      <ul className="mt-4">
       <li className="text-white">Facebook</li>
       <li className="text-white">Twitter</li>
       <li className="text-white">Instagram</li>
      </ul>
     </div>
    </div>
   </div>
   <div className="mt-8 text-center text-white">
    <p>&copy; 2024 Company. All Rights Reserved.</p>
   </div>
  </div>
 );
};

export default CustomerFooter;
