import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import Historico from "./components/pages/Historico";
import Permissoes from "./components/pages/Permissoes";
import Acesso from "./components/pages/Acesso";
import RegisterUser from "./components/pages/RegisterUser";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import ListUsers from "./components/pages/ListUsers";
import ProfileList from "./components/pages/EditProfile";

function App() {
  return (
    <Router>
      <NavBar />
      <SideBar />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/permissoes" element={<Permissoes />} />
        <Route path="/acesso" element={<Acesso />} />
        <Route path="/registro" element={<RegisterUser />} />
        <Route path="/list" element={<ListUsers />} />
        <Route path="/profile" element={<ProfileList />} />

        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
