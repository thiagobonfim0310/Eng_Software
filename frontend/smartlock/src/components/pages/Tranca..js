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
  const [roomId, setRoomId] = useState(""); // Alterado para roomId
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLockId, setCurrentLockId] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(""); // Alterado para selectedRoomId
  const [actionType, setActionType] = useState(""); // Continua igual, pois é genérico
  const [rooms, setRooms] = useState([]); // Alterado para rooms

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3333/locks");
      console.log("Locks Data: ", response.data); // Verifique os dados retornados
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
      // Adiciona o console.log para verificar os dados e listar os nomes das salas
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
    fetchRooms(); // Alterado para fetchRooms
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
    if (!name || !roomId) {
      // Alterado para roomId
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
        { name, roomId },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Tranca registrada com sucesso!");
      setIsModalOpen(false);
      setName("");
      setRoomId("");
      fetchData();
    } catch (error) {
      console.error("Erro ao registrar tranca:", error);
      alert("Erro ao registrar tranca. Tente novamente.");
    }
  };

  const getRoomNames = (rooms) => {
    console.log("Rooms data for lock:", rooms); // Adicionando o console.log
    return rooms && rooms.length > 0
      ? rooms.map((room) => room.name).join(", ")
      : "Nenhuma sala";
  };

  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Salas", accessor: "rooms" }, // Alterado para "Salas"
    { header: "Criado Em", accessor: "createdAt" },
    { header: "Ações", accessor: "actions" },
  ];

  const renderActions = (lock) => (
    <div className={styles.actionsContainer}>
      <div className={styles.topRow}>
        <button
          className={`${styles.actionButton} ${styles.greenButton}`}
          onClick={() => openRoomModal(lock, "add")}
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
          onClick={() => openRoomModal(lock, "remove")}
        >
          - Sala
        </button>
      </div>
    </div>
  );

  const openRoomModal = (lock, action) => {
    setCurrentLockId(lock.id);
    setIsEditModalOpen(true);
    setActionType(action);
  };

  const handleModalSave = () => {
    if (actionType === "add") {
      handleUpdateRoom();
    } else {
      handleRemoveRoom();
    }
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
    if (!selectedRoomId) {
      alert("Uma sala deve ser selecionada.");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:3333/locks/${currentLockId}/environments/${selectedRoomId}`
      );
      alert("Sala removida com sucesso!");
      setIsEditModalOpen(false); // Fecha o modal
      setSelectedRoomId(""); // Limpa o estado
      fetchData(); // Atualiza os dados da tabela
    } catch (error) {
      console.error("Erro ao remover sala:", error);
      alert("Erro ao remover sala. Tente novamente.");
    }
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
            <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              {" "}
              {/* Alterado para roomId */}
              <option value="">Escolha uma sala</option>
              {rooms.map(
                (
                  room // Alterado para rooms
                ) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                )
              )}
            </select>
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
              {actionType === "add" ? "Adicionar" : "Remover"} Sala da Tranca
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
            <button onClick={handleModalSave}>Salvar</button>
          </div>
        </div>
      )}

      <TabelaCust
        columns={columns}
        data={filteredData.map((lock) => ({
          name: lock.name,
          rooms: getRoomNames(lock.rooms),
          createdAt: formatDate(lock.createdAt),
          actions: renderActions(lock),
        }))}
      />
    </section>
  );
}

export default Trancas;
