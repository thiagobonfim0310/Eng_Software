import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TabelaCust from "../layout/TabelaCust.js";
import styles from "./Trancas.module.css";

function Trancas() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveroomModalOpen, setIsRemoveroomModalOpen] = useState(false); // Estado do novo modal
  const [currentLockId, setCurrentLockId] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [rooms, setRooms] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3333/locks");
      console.log("Locks Data: ", response.data);
      setData(response.data);
      setFilteredData(sortData(response.data));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3333/environments");
      setRooms(response.data);
      console.log("Ambientes (Rooms) recebidos:", response.data);
    } catch (error) {
      console.error("Erro ao buscar ambientes:", error);
    }
  }, []);

  const sortData = (data) => {
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  useEffect(() => {
    fetchData();
    fetchRooms();
  }, [fetchData, fetchRooms]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  const handleSearch = (term) => {
    const filtered = data.filter((lock) =>
      lock.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(sortData(filtered));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3333/locks/${id}`);
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar tranca:", error);
      alert("Erro ao deletar tranca. Tente novamente.");
    }
  };

  const validateFields = () => {
    if (!name) {
      alert("Todos os campos devem ser preenchidos.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;
    try {
      await axios.post(
        "http://localhost:3333/locks",
        { name },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Tranca registrada com sucesso!");
      setIsModalOpen(false);
      setName("");
      fetchData();
    } catch (error) {
      console.error("Erro ao registrar tranca:", error);
      alert("Erro ao registrar tranca. Tente novamente.");
    }
  };

  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Salas", accessor: "environmentName" }, // Alterado para environmentName
    { header: "Criado Em", accessor: "createdAt" },
    { header: "Ações", accessor: "actions" },
  ];

  const renderActions = (lock) => (
    <div className={styles.actionsContainer}>
      <div className={styles.topRow}>
        <button
          className={`${styles.actionButton} ${styles.greenButton}`}
          onClick={() => openRoomModal(lock)}
        >
          + Sala
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => handleDelete(lock.id)}
        >
          Deletar
        </button>
      </div>
      <div className={styles.bottomRow}>
        <button
          className={`${styles.actionButton} ${styles.redButton}`}
          onClick={() => openRemoveRoomModal(lock)}
        >
          - Sala
        </button>
      </div>
    </div>
  );

  const openRoomModal = (lock) => {
    setCurrentLockId(lock.id);
    setIsEditModalOpen(true);
  };

  const openRemoveRoomModal = (lock) => {
    setCurrentLockId(lock.id);
    setSelectedRoomId(lock.environmentId || ""); // Define o nível atual do usuário, se houver
    setIsRemoveroomModalOpen(true); // Abre o modal
};

  const handleUpdateRoom = async () => {
    if (!selectedRoomId) {
      alert("Uma sala deve ser selecionada.");
      return;
    }
    try {
      await axios.put(`http://localhost:3333/locks/${currentLockId}`, {
        environmentId: selectedRoomId,
      });
      alert("Sala da tranca adicionada com sucesso!");
      setIsEditModalOpen(false);
      setSelectedRoomId("");
      fetchData();
    } catch (error) {
      console.error("Erro ao adicionar sala da tranca:", error);
      alert("Erro ao adicionar sala da tranca. Tente novamente.");
    }
  };

  const handleRemoveRoom = async () => {
    try {
      await axios.delete(
        `http://localhost:3333/locks/${currentLockId}/environments/${selectedRoomId}`
      );
      alert("Sala removida com sucesso!");
      setIsRemoveroomModalOpen(false);
      setSelectedRoomId("");
      fetchData();
    } catch (error) {
      console.error("Erro ao remover sala:", error);
      alert("Erro ao remover sala. Tente novamente.");
    }
  };

  // Mapeia os locks para incluir o nome do ambiente
  const getEnvironmentName = (environmentId) => {
    const environment = rooms.find((room) => room.id === environmentId);
    return environment ? environment.name : "N/A"; // Retorna "N/A" se não encontrar
  };

  return (
    <section className={styles.trancas_container}>
      <h1>Trancas</h1>
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
          className={styles.add_lock_button}
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Tranca
        </button>
      </div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <span
              className={styles.close}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h1>Registrar Tranca</h1>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleRegister}>Registrar</button>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <span
              className={styles.close}
              onClick={() => setIsEditModalOpen(false)}
            >
              &times;
            </span>
            <h1>
              Adicionar Sala da Tranca
            </h1>
            <select
              className={styles.dropdown}
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
            >
              <option value="">Escolha uma sala</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            <button onClick={handleUpdateRoom}>Salvar</button>
          </div>
        </div>
      )}

      {isRemoveroomModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <h1>Remover Sala</h1>
                        <p>
                            Tem certeza que deseja remover a sala ?
                        </p>
                        <div className={styles.button_container}>
                            <button 
                                className={`${styles.confirmButton} ${styles.greenButton}`} 
                                onClick={handleRemoveRoom}
                            >
                                Confirmar
                            </button>
                            <button 
                                className={`${styles.confirmButton} ${styles.redButton}`} 
                                onClick={() => setIsRemoveroomModalOpen(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

      <TabelaCust
        columns={columns}
        data={filteredData.map((lock) => ({
          name: lock.name,
          environmentName: getEnvironmentName(lock.environmentId), // Mapeia para o nome do ambiente
          createdAt: formatDate(lock.createdAt),
          actions: renderActions(lock),
        }))}
      />
    </section>
  );
}

export default Trancas;
