import {  BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Dashboard from "./components/pages/Dashboard";
import Historico from "./components/pages/Historico";
import Permissoes from "./components/pages/Permissoes";
import Acesso from "./components/pages/Acesso";

import Container from "./components/layout/Container";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";

function App() {
  return (
    <Router>
      <NavBar/>
      <SideBar/>

      <Container>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/historico" element={<Historico/>}/>
          <Route path="/permissoes" element={<Permissoes/>}/>
          <Route path="/acesso" element={<Acesso/>}/>
        </Routes>
      </Container>

    </Router>
  );
}

export default App;
