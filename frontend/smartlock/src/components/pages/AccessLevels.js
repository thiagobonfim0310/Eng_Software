import React, { useState, useEffect } from "react";
import "./AccessLevels.css";

const AccessLevels = () => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetchAccessLevels();
  }, []);

  const fetchAccessLevels = async () => {
    try {
      const response = await fetch("/accessLevels.json");
      const data = await response.json();
      setLevels(data);
    } catch (error) {
      console.error("Erro ao buscar níveis de acesso", error);
    }
  };

  return (
    <div className="access-levels-container">
      {levels.map((level, index) => (
        <div className="access-level-item" key={index}>
          <div className="level-title">{level.titulo}</div>
          <div className="access-text">Acesso a:</div>
          <ul className="access-list">
            {level.portas.map((porta, portaIndex) => (
              <li key={portaIndex}>{porta}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AccessLevels;
