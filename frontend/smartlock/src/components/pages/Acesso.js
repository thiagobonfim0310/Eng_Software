import React, { useEffect, useState } from "react";
import axios from "axios";
import QuadroInf from "../layout/QuadroInf";
import styles from "./Acesso.module.css";

function Acesso() {
    const [levels, setLevels] = useState([]);
    const [acessos, setAcessos] = useState({});
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newLevelName, setNewLevelName] = useState(""); // Estado para o nome do novo nível
    const [currentNvl, setCurrentNvl] = useState("");
    const [environments, setEnvironments] = useState([]);
    const [selectedEnvironmentId, setSelectedEnvironmentId] = useState([]);
    const [selectedAreaToDelete, setSelectedAreaToDelete] = useState("");
    const [levelToDelete, setLevelToDelete] = useState(""); // Para armazenar o nível a ser deletado
    const [isDeleteDropdownOpen, setIsDeleteDropdownOpen] = useState(false); // Para controlar a exibição do dropdown

     // Novo estado para armazenar o nome do novo ambiente
     const [newEnvironmentName, setNewEnvironmentName] = useState("");
     const [isAddEnvModalOpen, setIsAddEnvModalOpen] = useState(false); // Controle do modal de adicionar ambiente

    const [isDeleteEnvModalOpen, setIsDeleteEnvModalOpen] = useState(false); // Controle do modal de deletar ambiente
 
     // Função para adicionar um novo ambiente
     const handleAddEnvironment = async () => {
         if (!newEnvironmentName) {
             alert("Por favor, insira um nome para o ambiente.");
             return;
         }
 
         try {
             const response = await fetch("http://localhost:3333/environments", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify({ name: newEnvironmentName }), // Enviando o nome do novo ambiente
             });
 
             if (response.ok) {
                 alert("Ambiente adicionado com sucesso.");
                 setIsAddEnvModalOpen(false);
                 setNewEnvironmentName(""); // Limpar o campo após adicionar
                 fetchEnvironments(); // Atualiza a lista de ambientes
             } else {
                 alert("Erro ao adicionar ambiente. O ambiente pode já existir.");
             }
         } catch (error) {
             console.error("Erro ao adicionar ambiente:", error);
             alert("Erro ao adicionar ambiente.");
         }
     };
 
     useEffect(() => {
         fetchLevels();
     }, []);

    // Função para buscar níveis
    const fetchLevels = async () => {
        try {
            const response = await fetch("http://localhost:3333/levels");
            const data = await response.json();
            setLevels(data);
            const initialAcessos = {};
            data.forEach(level => {
                initialAcessos[level.name] = [];
            });
            setAcessos(initialAcessos);
        } catch (error) {
            console.error("Erro ao buscar níveis:", error);
        }
    };

    // Fetch dos environments ao abrir o modal de edição
    const fetchEnvironments = async () => {
        try {
            const response = await fetch("http://localhost:3333/environments");
            const data = await response.json();
            setEnvironments(data);
        } catch (error) {
            console.error("Erro ao buscar environments:", error);
        }
    };

    // Fetch dos níveis ao montar o componente
    useEffect(() => {
        fetchLevels();
        fetchEnvironments();
    }, []);

    const openEditModal = (nivel) => {
        setCurrentNvl(nivel);
        setIsEditModalOpen(true);
        fetchEnvironments(); // Carregar environments ao abrir o modal
    };

    const openDeleteModal = (nivel) => {
        setCurrentNvl(nivel);
        setIsDeleteModalOpen(true);
        // Carregar salas atribuídas ao nível selecionado
        const level = levels.find(level => level.name === nivel);
        if (level) {
            const assignedAreas = level.environments.map(env => ({
                id: env.environment.id, 
                name: env.environment.name 
            }));
            setAcessos((prev) => ({ ...prev, [nivel]: assignedAreas }));
        }
    };

    const handleAddLevel = async () => {
        if (!newLevelName) {
            alert("Por favor, insira um nome para o nível.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3333/levels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newLevelName }), // Enviando o nome do novo nível
            });

            if (response.ok) {
                alert("Nível adicionado com sucesso.");
                setIsAddModalOpen(false);
                setNewLevelName(""); // Limpar o campo após adicionar
                fetchLevels(); // Re-fetch levels to update the state
            } else {
                alert("Erro ao adicionar nível. O nível pode já existir.");
            }
        } catch (error) {
            console.error("Erro ao adicionar nível:", error);
            alert("Erro ao adicionar nível.");
        }
    };

    const handleUpdateEnvironment = async () => {
        if (!selectedEnvironmentId) {
            alert("Selecione um ambiente para adicionar.");
            return;
        }

        const levelToUpdate = levels.find(level => level.name === currentNvl);
        if (!levelToUpdate) {
            alert("Nível não encontrado.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3333/levels/${levelToUpdate.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ environmentId: selectedEnvironmentId }),
            });

            if (response.ok) {
                alert("Ambiente atribuído ao nível com sucesso.");
                setIsEditModalOpen(false);
                setSelectedEnvironmentId("");
                fetchLevels(); // Re-fetch levels to update the state
            } else if (response.status === 404) {
                alert("Nível não encontrado.");
            } else {
                alert("Erro ao atribuir ambiente ao nível.");
            }
        } catch (error) {
            console.error("Erro ao atualizar ambiente:", error);
            alert("Erro ao atribuir ambiente ao nível.");
        }
    };

    // Função para deletar um ambiente existente
    const handleDeleteEnvironment = async () => {
        if (!selectedEnvironmentId) {
            alert("Por favor, selecione um ambiente para deletar.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3333/environments/${selectedEnvironmentId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Ambiente deletado com sucesso.");
                setEnvironments((prev) => prev.filter(env => env.id !== selectedEnvironmentId)); // Remove o ambiente deletado do estado local
                setIsDeleteEnvModalOpen(false);
                setSelectedEnvironmentId("");
                fetchLevels();
            } else if (response.status === 404) {
                alert("Ambiente não encontrado.");
            } else {
                alert("Erro ao deletar o ambiente.");
            }
        } catch (error) {
            console.error("Erro ao deletar ambiente:", error);
            alert("Erro ao deletar ambiente.");
        }
    };

    const handleDeleteLevel = async (id) => {
        try {
            await axios.delete(`http://localhost:3333/levels/${id}`);
            setLevels(prevLevels => prevLevels.filter(level => level.id !== id));
            alert("Nível deletado com sucesso.");
        } catch (error) {
            console.error("Erro ao deletar nível:", error);
            alert("Erro ao deletar nível.");
        } finally {
            setLevelToDelete("");
            setIsDeleteDropdownOpen(false); // Fecha o dropdown após deletar
        }
    };

    const toggleDeleteDropdown = () => {
        setIsDeleteDropdownOpen(!isDeleteDropdownOpen);
    };

    const handleRemoveEnvironment = async () => {
        if (!selectedAreaToDelete) {
            alert("Selecione uma sala para remover.");
            return;
        }

        const levelToUpdate = levels.find(level => level.name === currentNvl);
        if (!levelToUpdate) {
            alert("Nível não encontrado.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3333/levels/${levelToUpdate.id}/${selectedAreaToDelete}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Ambiente removido do nível com sucesso.");
                setIsDeleteModalOpen(false);
                setSelectedAreaToDelete("");
                fetchLevels(); // Re-fetch levels to update the state
            } else if (response.status === 404) {
                alert("Nível ou ambiente não encontrado.");
            } else {
                alert("Erro ao remover ambiente do nível.");
            }
        } catch (error) {
            console.error("Erro ao remover ambiente:", error);
            alert("Erro ao remover ambiente do nível.");
        }
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
                <button 
                    className={styles.add_environment_button} 
                    onClick={() => setIsAddEnvModalOpen(true)} // Abre o modal para adicionar ambiente
                >
                    Adicionar Ambiente
                </button>
                <button 
                    className={styles.delete_level_button} 
                    onClick={toggleDeleteDropdown}
                >
                    Deletar Nível
                </button>
                <button 
                    className={styles.delete_environment_button} 
                    onClick={() => setIsDeleteEnvModalOpen(true)} // Abre o modal para deletar ambiente
                >
                    Deletar Ambiente
                </button>
            </div>

            {isDeleteEnvModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsDeleteEnvModalOpen(false)}>&times;</span>
                        <h1>Deletar Ambiente</h1>
                        <select 
                            value={selectedEnvironmentId} 
                            onChange={(e) => setSelectedEnvironmentId(e.target.value)}
                        >
                            <option value="">Selecione um ambiente</option>
                            {environments.map(env => (
                                <option key={env.id} value={env.id}>{env.name}</option>
                            ))}
                        </select>
                        <button onClick={handleDeleteEnvironment}>Deletar</button>
                    </div>
                </div>
            )}

            {isAddEnvModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsAddEnvModalOpen(false)}>&times;</span>
                        <h1>Adicionar Ambiente</h1>
                        <input
                            type="text"
                            placeholder="Nome do Ambiente"
                            value={newEnvironmentName}
                            onChange={(e) => setNewEnvironmentName(e.target.value)}
                        />
                        <button onClick={handleAddEnvironment}>Adicionar</button> {/* Botão para adicionar ambiente */}
                    </div>
                </div>
            )}

            {isDeleteDropdownOpen && (
                    <div className={styles.dropdown}>
                        <select 
                            value={levelToDelete} 
                            onChange={(e) => setLevelToDelete(e.target.value)}
                        >
                            <option value="">Selecione um nível</option>
                            {levels.map(level => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                        <button onClick={() => levelToDelete && handleDeleteLevel(levelToDelete)}>Confirmar Deleção</button>
                    </div>
            )}

            {isAddModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsAddModalOpen(false)}>&times;</span>
                        <h1>Adicionar Nível</h1>
                        <input
                            type="text"
                            placeholder="Nome do Nível"
                            value={newLevelName}
                            onChange={(e) => setNewLevelName(e.target.value)}
                        />
                        <button onClick={handleAddLevel}>Adicionar</button> {/* Botão para adicionar nível */}
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
                            <option value="">Selecione uma sala</option>
                            {acessos[currentNvl]?.map((area, index) => (
                                <option key={index} value={area.id}>{area.name}</option> // Usando o nome da sala
                            ))}
                        </select>
                        <button onClick={handleRemoveEnvironment}>Remover</button>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsEditModalOpen(false)}>&times;</span>
                        <h1>Editar Ambiente do Usuário</h1>
                        <select 
                            className={styles.dropdown} 
                            value={selectedEnvironmentId} 
                            onChange={(e) => setSelectedEnvironmentId(e.target.value)}
                        >
                            <option value="">Escolha um ambiente</option>
                            {environments.map(env => (
                                <option key={env.id} value={env.id}>{env.name}</option>
                            ))}
                        </select>
                        <button onClick={handleUpdateEnvironment}>Salvar</button>
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
                                    <button 
                                        className={styles.edit_button} 
                                        onClick={() => openEditModal(level.name)}
                                    >
                                        +
                                    </button>,
                                    <button 
                                        className={styles.edit_button} 
                                        onClick={() => openDeleteModal(level.name)} // Chamando a função para abrir o modal de remoção
                                    >
                                        -
                                    </button>,
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