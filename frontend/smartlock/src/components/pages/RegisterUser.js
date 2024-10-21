import React, { useState } from "react";
import axios from "axios";
import "./RegisterUser.css";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [cpf, setCpf] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3333/users",
        {
          name,
          tag,
          cpf,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Usuário registrado:", response.data);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Registrar Usuário</h1>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <button onClick={handleRegister}>Registrar</button>
      </div>
    </div>
  );
};

export default RegisterUser;
