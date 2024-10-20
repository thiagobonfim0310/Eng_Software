import React, { useState, useEffect } from "react";
import "./Profile.css";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Aqui fica a lógica pra integração com o banco de dados
  const fetchProfiles = async () => {
    try {
      const response = await fetch("/profiles.json");
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Erro ao buscar perfis", error);
    }
  };

  // Aqui fica a lógica pra integração com o banco de dados
  const handleDelete = (nome) => {
    const confirmed = window.confirm(
      `Tem certeza que gostaria de excluir ${nome}?`
    );
    if (confirmed) {
      setProfiles(profiles.filter((profile) => profile.nome !== nome));
    }
  };

  return (
    <section>
      <article className="profile-header">
        <span className="profile-item">Nome</span>
        <span className="profile-item">Nível de Acesso</span>
        <span className="profile-item">Tipo de Acesso</span>
        <span className="profile-item">Data de Cadastro</span>
        <span className="profile-item">Ações</span>
      </article>
      {profiles.map((profile) => (
        <Profile key={profile.nome} {...profile} onDelete={handleDelete} />
      ))}
    </section>
  );
};

const Profile = ({ nome, nivel, tipo, data, onDelete }) => {
  return (
    <article className="profile-container">
      <span className="profile-item">{nome}</span>
      <span className="profile-item">{nivel}</span>
      <span className="profile-item">{tipo}</span>
      <span className="profile-item">{data}</span>
      <button onClick={() => onDelete(nome)}>Delete</button>
    </article>
  );
};

export default ProfileList;
