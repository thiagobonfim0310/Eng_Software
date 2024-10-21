import React, { useState } from "react";
import axios from "axios";
import "./ListUsers.css";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [cpf, setCpf] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/users?cpf=${cpf}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  return (
    <div className="list-container">
      <h1>Lista de Usuários</h1>
      <input
        type="text"
        placeholder="Buscar por CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Nome: {user.name}, Tag: {user.tag}, CPF: {user.cpf}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
