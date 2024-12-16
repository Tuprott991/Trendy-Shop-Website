import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./routes/routes.jsx";
import { DropdownProvider } from "./context/DropDownContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const App = () => {
 return (
  <AuthProvider>
   <CartProvider>
    <DropdownProvider>
     <BrowserRouter>
      <AppRoutes />
     </BrowserRouter>
    </DropdownProvider>
   </CartProvider>
  </AuthProvider>
 );
};

export default App;
