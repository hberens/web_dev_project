import Main from "./Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favorites from "./Favorites/Favorites";
import Navbar from "./Shared/Navbar";
import { FavoritesProvider } from "../Context/FavoritesContext";
import Home from "./Home/Home.jsx";
import "../styles.css";
import { useState, useEffect } from "react";
import AuthModule from "./Auth/Auth.jsx";
import AuthRegister from "./Auth/AuthRegister.jsx";
import AuthLogin from "./Auth/AuthLogin.jsx";
import ProtectedRoute from "../Common/Services/ProtectedRoute.jsx";
import Account from "./Account/Account.jsx"
import AuthRoute from "../Common/Services/AuthRoute.jsx";

export default function Components() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on app load
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <FavoritesProvider>
      {" "}
      {/* wrap entire app with FavoritesProvider to make it connect */}
      <Router>
        <div>
          <Navbar isAuthenticated={isAuthenticated}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/*" element={<Main />} />
            <Route path="/favorites" element={<Favorites />} />
            {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
            <Route element={<AuthRoute />}>
              <Route path="/auth" element={<AuthModule />} />
              <Route path="/register" element={<AuthRegister />} />
              <Route path="/login" element={<AuthLogin setIsAuthenticated={setIsAuthenticated} />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Account setIsAuthenticated={setIsAuthenticated}/>} />
            </Route>
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