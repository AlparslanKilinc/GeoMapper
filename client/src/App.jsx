import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import NavBar from './components/NavBar';
import MapCreationWrapper from "./components/MapCreationWrapper";
import ExplorePage from "./components/ExplorePage";

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/mapCreation" element={<MapCreationWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
