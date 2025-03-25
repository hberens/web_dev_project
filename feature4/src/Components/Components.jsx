import Main from "./Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favorites from "./Favorites/Favorites";
import Navbar from "./Shared/Navbar";
import { FavoritesProvider } from "../Context/FavoritesContext";
import Home from "./Home/Home.jsx";
import "../styles.css";
import { useState } from "react";
import AuthModule from "./Auth/Auth.jsx";
import AuthRegister from "./Auth/AuthRegister.jsx";
import AuthLogin from "./Auth/AuthLogin.jsx";
import ProtectedRoute from "../Common/Services/ProtectedRoute.jsx";

export default function Components() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <FavoritesProvider>
      {" "}
      {/* wrap entire app with FavoritesProvider to make it connect */}
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/*" element={<Main />} />
            <Route path="/favorites" element={<Favorites />} />
            {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
            <Route path="/auth" element={<AuthModule />} />
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/login" element={<AuthLogin />} />
            {/*<Route element={<ProtectedRoute />} />
              <Route path="/home" element={<Home />} />
            </Route>*/}
            {/*please wrap this home in a ProtectRoute*/}
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}