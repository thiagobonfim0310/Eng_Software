import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "./components/pages/Dashboard";
import Historico from "./components/pages/Historico";
import Permissoes from "./components/pages/Permissoes";
import Acesso from "./components/pages/Acesso";

import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";

function App() {
  return (
    <Router>
      <NavBar/>
      <SideBar/>

      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/historico" element={<Historico/>}/>
        <Route path="/permissoes" element={<Permissoes/>}/>
        <Route path="/acesso" element={<Acesso/>}/>
        
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>

    </Router>
  );
}

export default App;
