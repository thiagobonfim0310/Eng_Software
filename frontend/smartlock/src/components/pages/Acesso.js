import React, { useEffect, useState } from "react";
import QuadroInf from "../layout/QuadroInf";
import styles from "./Acesso.module.css";

function Acesso() {
    const [levels, setLevels] = useState([]);
    const [acessos, setAcessos] = useState({}); // Para armazenar os acessos por nível
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [area, setArea] = useState("");
    const [currentNvl, setCurrentNvl] = useState("");
    const [selectedAreaToDelete, setSelectedAreaToDelete] = useState("");

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const response = await fetch("http://localhost:3333/levels");
                const data = await response.json();
                setLevels(data); // Armazena os níveis na variável de estado
                // Inicializa os acessos por nível
                const initialAcessos = {};
                data.forEach(level => {
                    initialAcessos[level.name] = []; // Inicia um array vazio para cada nível
                });
                setAcessos(initialAcessos);
            } catch (error) {
                console.error("Erro ao buscar níveis:", error);
            }
        };

        fetchLevels();
    }, []);

    const handleAddAccess = () => {
        if (!area) {
            alert("A área deve ser preenchida.");
            return;
        }

        setAcessos(prev => ({
            ...prev,
            [currentNvl]: [...prev[currentNvl], area] // Adiciona a área ao nível atual
        }));

        setIsAddModalOpen(false);
        setArea("");
        setCurrentNvl("");
    };

    const handleDeleteAccess = () => {
        if (!selectedAreaToDelete) {
            alert("Selecione uma área para remover.");
            return;
        }

        setAcessos(prev => ({
            ...prev,
            [currentNvl]: prev[currentNvl].filter(area => area !== selectedAreaToDelete) // Remove a área do nível atual
        }));

        setIsDeleteModalOpen(false);
        setSelectedAreaToDelete("");
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
                            {acessos[currentNvl]?.map((area, index) => (
                                <option key={index} value={area}>{area}</option>
                            ))}
                        </select>
                        <button onClick={handleDeleteAccess}>Remover</button>
                    </div>
                </div>
            )}

            <div className={styles.conteudo_conteiner}>
                <ul>
                    {levels.map(level => (
                        <li key={level.name}>
                            <QuadroInf 
                                titulo={level.name} 
                                dado={level.environments.map(env => env.environment.name)}
                                tituloClassName={styles.titulo} 
                                textoClassName={styles.texto}
                                botoes={[
                                    <button className={styles.edit_button} onClick={() => openAddModal(level.name)}>+</button>,
                                    <button className={styles.edit_button} onClick={() => openDeleteModal(level.name)}>-</button>
                                ]}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Acesso;