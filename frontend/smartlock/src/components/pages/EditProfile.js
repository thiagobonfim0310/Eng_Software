import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedTag, setEditedTag] = useState("");
  const [editedCpf, setEditedCpf] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:3333/users");
      setProfiles(response.data);
    } catch (error) {
      console.error("Erro ao buscar perfis", error);
    }
  };

  const handleEdit = (profile) => {
    console.log("Editando perfil:", profile);
    setEditingProfile(profile.cpf);
    setEditedName(profile.name || "");
    setEditedTag(profile.tag || "");
    setEditedCpf(profile.cpf || "");
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3333/users/${editedCpf}`,
        {
          name: editedName,
          tag: editedTag,
          cpf: editedCpf,
        }
      );
      setProfiles(
        profiles.map((profile) =>
          profile.cpf === editedCpf ? response.data : profile
        )
      );
      setEditingProfile(null);
    } catch (error) {
      console.error("Erro ao salvar perfil", error);
    }
  };

  return (
    <section>
      <article className="profile-header">
        <span className="profile-item">Nome</span>
        <span className="profile-item">Tag</span>
        <span className="profile-item">CPF</span>
        <span className="profile-item">Ações</span>
      </article>
      {profiles.map((profile) => (
        <Profile
          key={profile.cpf}
          {...profile}
          onEdit={() => handleEdit(profile)}
        />
      ))}
      {editingProfile && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editando: {editedName}</h2>
            <input
              type="text"
              placeholder="Nome"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tag"
              value={editedTag}
              onChange={(e) => setEditedTag(e.target.value)}
            />
            <input
              type="text"
              placeholder="CPF"
              value={editedCpf}
              onChange={(e) => setEditedCpf(e.target.value)}
            />
            <button onClick={handleSave}>Salvar</button>
            <button onClick={() => setEditingProfile(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </section>
  );
};

const Profile = ({ name, tag, cpf, onEdit }) => {
  return (
    <article className="profile-container">
      <span className="profile-item">{name}</span>
      <span className="profile-item">{tag}</span>
      <span className="profile-item">{cpf}</span>
      <button onClick={onEdit}>Editar</button>
    </article>
  );
};

export default ProfileList;
