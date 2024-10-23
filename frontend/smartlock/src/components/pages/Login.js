import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticação
    console.log("Username:", username);
    console.log("Password:", password);

    // Redireciona para /dashboard após o login
    navigate("/dashboard");
  };

  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="username" className={styles.label}>
            Usuário
          </label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.label}>
            Senha
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
