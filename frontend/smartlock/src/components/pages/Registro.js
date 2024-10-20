import React, { useState } from "react";
import "./Registro.css";

function Registro({ onClose }) {
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");

  const handleSave = () => {
    const profile = { nome, nivel, tipo, data };
    // A lógica pra salvar o perfil no banco vem aqui
    console.log(profile);
    onClose(); // Fecha a janela de input após salvar
  };

  return (
    <div className="overlay">
      <div className="registro_container">
        <button className="close_button" onClick={onClose}>
          ×
        </button>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nível de Acesso"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tipo de Acesso"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data de Cadastro"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
}

export default Registro;
