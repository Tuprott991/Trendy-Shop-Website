import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./routes/routes.jsx";

const App = () => {
 return (
  <AuthProvider>
   <BrowserRouter>
    <AppRoutes />
   </BrowserRouter>
  </AuthProvider>
 );
};

export default App;
