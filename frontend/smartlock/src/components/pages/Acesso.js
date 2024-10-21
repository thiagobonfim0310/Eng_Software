import React, { useState } from "react";
import QuadroInf from "../layout/QuadroInf";
import styles from "./Acesso.module.css";

function Acesso() {
    const [nvl1, setNvl1] = useState(['Acesso total']);
    const [nvl2, setNvl2] = useState(['Porta principal', 'Sala 1', 'Sala 2', 'Lab 1', 'Lab 2']);
    const [nvl3, setNvl3] = useState(['Porta principal', 'Sala 1', 'Sala 2', 'Lab 1']);
    const [nvl4, setNvl4] = useState(['Porta principal', 'Sala 1', 'Lab 1']);
    const [visi, setVisi] = useState(['Porta principal']);

    // Estados da modal de adicionar e remover acessos
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [area, setArea] = useState("");
    const [currentNvl, setCurrentNvl] = useState(""); // Nível atual para edição

    // Estado para o dropdown de deletar
    const [selectedAreaToDelete, setSelectedAreaToDelete] = useState("");

    const handleAddAccess = () => {
        if (!area) {
            alert("A área deve ser preenchida.");
            return;
        }

        // Lógica para adicionar o acesso ao nível correto
        switch (currentNvl) {
            case "nvl1":
                setNvl1([...nvl1, area]);
                break;
            case "nvl2":
                setNvl2([...nvl2, area]);
                break;
            case "nvl3":
                setNvl3([...nvl3, area]);
                break;
            case "nvl4":
                setNvl4([...nvl4, area]);
                break;
            case "visi":
                setVisi([...visi, area]);
                break;
            default:
                break;
        }

        setIsAddModalOpen(false);
        setArea("");
        setCurrentNvl(""); // Limpa o nível atual
    };

    const handleDeleteAccess = () => {
        if (!selectedAreaToDelete) {
            alert("Selecione uma área para remover.");
            return;
        }

        // Lógica para deletar o acesso correto
        switch (currentNvl) {
            case "nvl1":
                setNvl1(nvl1.filter(area => area !== selectedAreaToDelete));
                break;
            case "nvl2":
                setNvl2(nvl2.filter(area => area !== selectedAreaToDelete));
                break;
            case "nvl3":
                setNvl3(nvl3.filter(area => area !== selectedAreaToDelete));
                break;
            case "nvl4":
                setNvl4(nvl4.filter(area => area !== selectedAreaToDelete));
                break;
            case "visi":
                setVisi(visi.filter(area => area !== selectedAreaToDelete));
                break;
            default:
                break;
        }

        setIsDeleteModalOpen(false);
        setSelectedAreaToDelete(""); // Limpa o dropdown após a remoção
    };

    const openAddModal = (nivel) => {
        setCurrentNvl(nivel);
        setIsAddModalOpen(true);
    };

    const openDeleteModal = (nivel) => {
        setCurrentNvl(nivel);
        setIsDeleteModalOpen(true);
    };

    return (
        <section className={styles.acesso_container}>
            <div className={styles.cabecalho}>
                <h1>Acesso</h1>
                <button 
                    className={styles.add_permission_button} 
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Adicionar Acesso
                </button>
            </div>

            {isAddModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsAddModalOpen(false)}>&times;</span>
                        <h1>Adicionar Acesso</h1>
                        <input
                            type="text"
                            placeholder="Área"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />
                        <button onClick={handleAddAccess}>Adicionar</button>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsDeleteModalOpen(false)}>&times;</span>
                        <h1>Remover Acesso</h1>
                        <select
                            value={selectedAreaToDelete}
                            onChange={(e) => setSelectedAreaToDelete(e.target.value)}
                        >
                            <option value="">Selecione uma área</option>
                            {currentNvl === "nvl1" && nvl1.map((area, index) => (
                                <option key={index} value={area}>{area}</option>
                            ))}
                            {currentNvl === "nvl2" && nvl2.map((area, index) => (
                                <option key={index} value={area}>{area}</option>
                            ))}
                            {currentNvl === "nvl3" && nvl3.map((area, index) => (
                                <option key={index} value={area}>{area}</option>
                            ))}
                            {currentNvl === "nvl4" && nvl4.map((area, index) => (
                                <option key={index} value={area}>{area}</option>
                            ))}
                            {currentNvl === "visi" && visi.map((area, index) => (
                                <option key={index} value={area}>{area}</option>
                            ))}
                        </select>
                        <button onClick={handleDeleteAccess}>Remover</button>
                    </div>
                </div>
            )}

            <div className={styles.conteudo_conteiner}>
                <ul>
                    <li>
                        <QuadroInf 
                            titulo="Nível 1" 
                            dado={nvl1} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto}
                            botoes={[
                                <button className={styles.edit_button} onClick={() => openAddModal("nvl1")}>+</button>,
                                <button className={styles.edit_button} onClick={() => openDeleteModal("nvl1")}>-</button>
                            ]}
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Nível 2" 
                            dado={nvl2} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto}
                            botoes={[
                                <button className={styles.edit_button} onClick={() => openAddModal("nvl2")}>+</button>,
                                <button className={styles.edit_button} onClick={() => openDeleteModal("nvl2")}>-</button>
                            ]}
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Nível 3" 
                            dado={nvl3} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto}
                            botoes={[
                                <button className={styles.edit_button} onClick={() => openAddModal("nvl3")}>+</button>,
                                <button className={styles.edit_button} onClick={() => openDeleteModal("nvl3")}>-</button>
                            ]}
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Nível 4" 
                            dado={nvl4} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                            botoes={[
                                <button className={styles.edit_button} onClick={() => openAddModal("nvl4")}>+</button>,
                                <button className={styles.edit_button} onClick={() => openDeleteModal("nvl4")}>-</button>
                            ]}
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Visitante" 
                            dado={visi} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                            botoes={[
                                <button className={styles.edit_button} onClick={() => openAddModal("visi")}>+</button>,
                                <button className={styles.edit_button} onClick={() => openDeleteModal("visi")}>-</button>
                            ]}
                        />
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Acesso;
