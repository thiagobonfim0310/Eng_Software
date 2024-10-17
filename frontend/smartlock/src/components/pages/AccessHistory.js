import React, { useState, useEffect } from "react";
import "./AccessHistory.css";

const AccessHistory = () => {
  const [accessAttempts, setAccessAttempts] = useState([]);

  useEffect(() => {
    fetchAccessAttempts();
  }, []);

  const fetchAccessAttempts = async () => {
    try {
      const response = await fetch("/accessAttempts.json");
      const data = await response.json();
      setAccessAttempts(data);
    } catch (error) {
      console.error("Erro ao buscar tentativas de acesso", error);
    }
  };

  return (
    <div className="access-history-container">
      <h1>Histórico de Acesso</h1>
      <div className="access-history-header">
        <span className="header-nome">NOME</span>
        <span className="header-status">STATUS</span>
        <span className="header-porta">PORTA</span>
        <span className="header-nivel">NÍVEL DE ACESSO</span>
        <span className="header-data">DATA DE ACESSO</span>
      </div>
      {accessAttempts.map((attempt, index) => (
        <div className="access-history-item" key={index}>
          <span className="item-nome">{attempt.nome}</span>
          <span className="item-status">{attempt.status}</span>
          <span className="item-porta">{attempt.porta}</span>
          <span className="item-nivel">{attempt.nivel}</span>
          <span className="item-data">{attempt.data}</span>
        </div>
      ))}
    </div>
  );
};

export default AccessHistory;
