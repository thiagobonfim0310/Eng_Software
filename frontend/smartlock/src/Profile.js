import React from "react";

import "./Profile.css";

// PESSOA; NOME; NIVEL DE ACESSO; TIPO DE ACESSO; DATA DE CADASTRO;
// Sheldon Cooper; Nível 2; Temporario; Mar 23,2024

// Futuramente vira de um banco de dados
// Criado um array para os perfis dos cadastrados
const profiles = [
  {
    nome: "Sheldon Cooper",
    nivel: "2",
    tipo: "Temporario",
    data: "Mar 23, 2024",
  },
  {
    nome: "João Silva",
    nivel: "1",
    tipo: "Permanente",
    data: "Mar 23, 2024",
  },
  {
    nome: "Helena Santos",
    nivel: "3",
    tipo: "Permanente",
    data: "Mar 23, 2022",
  },
  {
    nome: "Felipe Donato",
    nivel: "4",
    tipo: "Permanente",
    data: "Mar 23, 2022",
  },
];

// Essa é a lista dos perfis no momento os objetos estão estaticos
// Essa function é a que está sendo renderizada
function ProfileList() {
  return (
    <section>
      <article className="profile-header">
        <span className="profile-item">Nome</span>
        <span className="profile-item">Nível de Acesso</span>
        <span className="profile-item">Tipo de Acesso</span>
        <span className="profile-item">Data de Cadastro</span>
      </article>
      {profiles.map((profile) => (
        <Profile key={profile.nome} {...profile}></Profile>
      ))}
    </section>
  );
}

const Profile = ({ nome, nivel, tipo, data }) => {
  // const { nome, nivel, tipo, data } = props;

  return (
    <article className="profile-container">
      <span className="profile-item">{nome}</span>
      <span className="profile-item">{nivel}</span>
      <span className="profile-item">{tipo}</span>
      <span className="profile-item">{data}</span>
    </article>
  );
};

export default ProfileList;
