// Função quebrada

import React, { useState } from "react";
import "./AdicionarBotao.css"; // Importe o novo CSS
import Registro from "./RegisterUser"; // Importe o novo componente

function Adicionar() {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput);
  };

  return (
    <section className="adicionar_container">
      <button className="adicionar_botao" onClick={handleClick}>
        Adicionar
      </button>

      {showInput && <Registro onClose={() => setShowInput(false)} />}
    </section>
  );
}

export default Adicionar;
