import React, { useState, useEffect, useCallback } from 'react';
import { GoTrash } from "react-icons/go";
import axios from 'axios';
import TabelaCust from '../layout/TabelaCust.js';
import styles from "./Permissoes.module.css";

function Permissoes() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    // Estado da modal para registrar permissão
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [tag, setTag] = useState("");
    const [cpf, setCpf] = useState("");

    // Estado da modal para editar e remover salas
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
    const [currentUserCpf, setCurrentUserCpf] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [roomToRemoveId, setRoomToRemoveId] = useState("");
    const [selectedLevel, setSelectedLevel] = useState('');
    const [rooms, setRooms] = useState([]);
    const [levels, setLevels] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3333/users');
            setData(response.data);
            setFilteredData(sortData(response.data));
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, []);

    const fetchRooms = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3333/environments');
            setRooms(response.data);
        } catch (error) {
            console.error("Erro ao buscar salas:", error);
        }
    }, []);

    const sortData = (data) => {
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    const fetchLevels = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3333/levels');
            setLevels(response.data);
        } catch (error) {
            console.error("Erro ao buscar níveis:", error);
        }
    }, []);

    useEffect(() => {
        if (isLevelModalOpen) {
            fetchLevels();
        }
    }, [isLevelModalOpen, fetchLevels]);

    useEffect(() => {
        fetchData();
        fetchRooms();
    }, [fetchData, fetchRooms]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        return `${formattedDate}, ${formattedTime}`;
    };

    const handleSearch = (term) => {
        const filtered = data.filter(user =>
            user.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredData(sortData(filtered));
    };

    const handleDelete = async (cpf) => {
        try {
            const response = await axios.delete(`http://localhost:3333/users/${cpf}`);
            alert(response.data.message);
            fetchData();
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            alert("Erro ao deletar usuário. Tente novamente.");
        }
    };

    const validateFields = () => {
        if (!name || !tag || !cpf) {
            alert("Todos os campos devem ser preenchidos.");
            return false;
        }
        if (data.some(user => user.cpf === cpf)) {
            alert("CPF já registrado.");
            return false;
        }
        if (data.some(user => user.tag === tag)) {
            alert("Tag já registrada.");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateFields()) return;

        try {
            await axios.post(
                "http://localhost:3333/users",
                { name, tag, cpf },
                { headers: { "Content-Type": "application/json" } }
            );

            alert("Permissão registrada com sucesso!");
            setIsModalOpen(false);
            setName(""); setTag(""); setCpf("");
            fetchData();
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Erro ao registrar permissão. Tente novamente.");
        }
    };

    const openEditModal = (user) => {
        setCurrentUserId(user.id); // Presumindo que o ID do usuário está disponível como user.id
        setIsEditModalOpen(true);
    };

    const openRemoveModal = (user) => {
        setCurrentUserCpf(user.cpf);
        setIsRemoveModalOpen(true);
    };

    const handleUpdateRoomName = async () => {
        if (!selectedRoomId) {
            alert("Uma sala deve ser selecionada.");
            return;
        }
    
        try {
            await axios.put(`http://localhost:3333/users/${currentUserId}`, { environmentId: selectedRoomId });
            alert("Ambiente do usuário atualizado com sucesso!");
            setIsEditModalOpen(false);
            setSelectedRoomId("");
            fetchData();
        } catch (error) {
            console.error("Erro ao atualizar ambiente do usuário:", error);
            alert("Erro ao atualizar ambiente do usuário. Tente novamente.");
        }
    };
    

    const handleRemoveRoom = async () => {
        if (!roomToRemoveId) {
            alert("Uma sala deve ser selecionada.");
            return;
        }
    
        try {
            await axios.delete(`http://localhost:3333/users/${currentUserCpf}/environments/${roomToRemoveId}`);
            alert("Sala removida com sucesso!");
            setIsRemoveModalOpen(false); // Fecha o modal
            setRoomToRemoveId(""); // Limpa o estado
            fetchData(); // Atualiza os dados da tabela
        } catch (error) {
            console.error("Erro ao remover sala:", error);
            alert("Erro ao remover sala. Tente novamente.");
        }
    };

    const openLevelModal = (user) => {
        setCurrentUserCpf(user.cpf); // Definindo o CPF do usuário
        setSelectedLevel(user.level?.id || ""); // Define o nível atual do usuário, se houver
        setIsLevelModalOpen(true); // Abre a modal
    };
    
    const handleSaveLevel = async () => {
        if (!selectedLevel) {
            alert("Um nível deve ser selecionado.");
            return;
        }
    
        console.log("CPF do usuário atual:", currentUserCpf); // Verifica o CPF antes de enviar
    
        try {
            await axios.put(
                `http://localhost:3333/users/${currentUserCpf}/level`,
                { levelId: selectedLevel },
                { headers: { "Content-Type": "application/json" } }
            );
            alert("Nível do usuário atualizado com sucesso!");
            setIsLevelModalOpen(false);
            setSelectedLevel("");
            fetchData(); // Atualiza os dados da lista
        } catch (error) {
            console.error("Erro ao atualizar nível do usuário:", error.response?.data || error.message);
            alert(`Erro ao atualizar nível do usuário. Tente novamente.${currentUserCpf} ${selectedLevel}`);
        }
    };
    
    
    

    const columns = [
        { header: 'Nome', accessor: 'name' },
        { header: 'Tag', accessor: 'tag' },
        { header: 'CPF', accessor: 'cpf' },
        { header: 'Salas de Acesso', accessor: 'rooms' },
        { header: 'Nível de Acesso', accessor: 'level' }, // Nova coluna
        { header: 'Criado Em', accessor: 'createdAt' },
        { header: 'Ações', accessor: 'actions' }
    ];

    const renderActions = (user) => (
        <div className={styles.actionsContainer}>
            <div className={styles.topRow}>
                <button className={`${styles.actionButton} ${styles.greenButton}`} onClick={() => openEditModal(user)}>
                    + Sala
                </button>
                <button className={`${styles.actionButton} ${styles.greenButton}`} onClick={() => openLevelModal(user)}>
                    + Nível
                </button>
                <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => handleDelete(user.cpf)}>
                    <GoTrash />
                </button>
            </div>
            <div className={styles.bottomRow}>
                <button className={`${styles.actionButton} ${styles.redButton}`} onClick={() => openRemoveModal(user)}>
                    - Sala
                </button>
                <button className={`${styles.actionButton} ${styles.redButton}`} onClick={() => { /* Função para deletar nível */ }}>
                    - Nível
                </button>
            </div>
        </div>
    );

    const getRoomNames = (environments) => {
        return environments.map(env => env.environment.name).join(', ') || 'Nenhuma sala';
    };

    return (
        <section className={styles.permissoes_container}>
            <h1>Permissões</h1>

            <div className={styles.search_container}>
                <input
                    type="text"
                    placeholder="Buscar por Nome"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />
                <button
                    className={styles.add_permission_button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Adicionar Permissão
                </button>
            </div>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h1>Registrar Permissão</h1>
                        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
                        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                        <button onClick={handleRegister}>Registrar</button>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsEditModalOpen(false)}>&times;</span>
                        <h1>Editar Ambiente do Usuário</h1>
                        <select className={styles.dropdown} value={selectedRoomId} onChange={(e) => setSelectedRoomId(e.target.value)}>
                            <option value="">Escolha uma sala</option>
                            {rooms.map(room => (
                                <option key={room.id} value={room.id}>{room.name}</option>
                            ))}
                        </select>
                        <button onClick={handleUpdateRoomName}>Salvar</button>
                    </div>
                </div>
            )}

            {isRemoveModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsRemoveModalOpen(false)}>&times;</span>
                        <h1>Remover Sala do Usuário</h1>
                        <select className={styles.dropdown} value={roomToRemoveId} onChange={(e) => setRoomToRemoveId(e.target.value)}>
                            <option value="">Escolha uma sala</option>
                            {data.find(user => user.cpf === currentUserCpf)?.environments.map(env => (
                                <option key={env.environment.id} value={env.environment.id}>
                                    {env.environment.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleRemoveRoom}>Remover</button>
                    </div>
                </div>
            )}

            {isLevelModalOpen && ( 
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span 
                            className={styles.close} 
                            onClick={() => setIsLevelModalOpen(false)}
                        >
                            &times;
                        </span>
                        <h1>Editar Nível do Usuário</h1>
                        <select 
                            className={styles.dropdown} 
                            value={selectedLevel} 
                            onChange={(e) => setSelectedLevel(e.target.value)}
                        >
                            <option value="">Escolha um nível</option>
                            {levels.map(level => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
                        </select>
                        <button onClick={handleSaveLevel}>Salvar</button>
                    </div>
                </div>
            )}


            <TabelaCust 
                columns={columns} 
                data={filteredData.map(user => ({
                    ...user,
                    rooms: getRoomNames(user.environments),
                    level: user.level?.name || 'Sem nível', // Adiciona o nome do nível ou 'Sem nível'
                    createdAt: formatDate(user.createdAt),
                    actions: renderActions(user)
                }))} 
            />
        </section>
    );
}

export default Permissoes;
