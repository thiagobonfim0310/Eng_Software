import React, { useState, useEffect, useCallback } from 'react'; 
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

    // Estado da modal para editar sala
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUserCpf, setCurrentUserCpf] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState(""); // Armazena o ID da sala selecionada
    const [rooms, setRooms] = useState([]); // Estado para armazenar as salas

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3333/users');
            setData(response.data);
            setFilteredData(sortData(response.data));
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, []);

    // Função para buscar salas existentes
    const fetchRooms = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3333/environments'); // Rota que lista todas as salas
            setRooms(response.data);
        } catch (error) {
            console.error("Erro ao buscar salas:", error);
        }
    }, []);

    const sortData = (data) => {
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    useEffect(() => {
        fetchData();
        fetchRooms(); // Chama a função para buscar salas
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

    const getRoomNames = (environments) => {
        return environments.map(env => env.environment.name).join(', ') || 'Nenhuma sala';
    };

    const columns = [
        { header: 'Nome', accessor: 'name' },
        { header: 'Tag', accessor: 'tag' },
        { header: 'CPF', accessor: 'cpf' },
        { header: 'Salas de Acesso', accessor: 'rooms' },
        { header: 'Criado Em', accessor: 'createdAt' },
        { header: 'Ações', accessor: 'actions' }
    ];

    const renderActions = (user) => (
        <div>
            <button onClick={() => openEditModal(user)}>Editar</button>
            <button onClick={() => handleDelete(user.cpf)}>Deletar</button>
        </div>
    );

    const openEditModal = (user) => {
        setCurrentUserCpf(user.cpf);
        setIsEditModalOpen(true);
    };

    const handleUpdateRoomName = async () => {
        if (!selectedRoomId) {
            alert("Uma sala deve ser selecionada.");
            return;
        }

        try {
            await axios.put(`http://localhost:3333/users/${currentUserCpf}`, { environmentId: selectedRoomId }); // Atualiza o ambiente do usuário
            alert("Ambiente do usuário atualizado com sucesso!");
            setIsEditModalOpen(false);
            setSelectedRoomId(""); // Limpa o estado da sala selecionada
            fetchData();
        } catch (error) {
            console.error("Erro ao atualizar ambiente do usuário:", error);
            alert("Erro ao atualizar ambiente do usuário. Tente novamente.");
        }
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
            )}

            {isEditModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={() => setIsEditModalOpen(false)}>&times;</span>
                        <h1>Editar Ambiente do Usuário</h1>
                        <select 
                            className={styles.dropdown} // Classe para estilização
                            value={selectedRoomId} 
                            onChange={(e) => setSelectedRoomId(e.target.value)} 
                        >
                            <option value="">Escolha uma sala</option>
                            {rooms.map(room => (
                                <option key={room.id} value={room.id}>{room.name}</option>
                            ))}
                        </select>
                        <button onClick={handleUpdateRoomName}>Salvar</button>
                    </div>
                </div>
            )}

            <TabelaCust 
                columns={columns} 
                data={filteredData.map(item => ({
                    ...item,
                    rooms: getRoomNames(item.environments),
                    createdAt: formatDate(item.createdAt),
                    actions: renderActions(item)
                }))} 
            />
        </section>
    );
}

export default Permissoes;
