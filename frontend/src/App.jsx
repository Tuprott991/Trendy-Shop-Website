import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./routes/routes.jsx";
import { DropdownProvider } from "./context/DropDownContext.jsx";

const App = () => {
 return (
  <AuthProvider>
   <DropdownProvider>
    <BrowserRouter>
     <AppRoutes />
    </BrowserRouter>
   </DropdownProvider>
  </AuthProvider>
 );
};

export default App;
