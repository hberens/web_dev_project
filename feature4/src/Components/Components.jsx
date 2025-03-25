import Main from "./Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Favorites from "./Favorites/Favorites";
import Navbar from "./Shared/Navbar";
import { FavoritesProvider } from "../Context/FavoritesContext";
import Home from "./Home/Home.jsx";
import "../styles.css";

export default function Components() {
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
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}