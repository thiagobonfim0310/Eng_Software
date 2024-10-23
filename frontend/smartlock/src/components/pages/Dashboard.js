import { useState, useEffect } from "react";
import axios from "axios";
import QuadroInf from "../layout/QuadroInf"
import styles from "./Dashboard.module.css"

function Dashboard(){
    const [totalAcessos,   setTotalAcessos]   = useState(0);
    const [totalNegados,   setTotalNegados]   = useState(0);
    const [totalNiveis,    setTotalNiveis]    = useState(0);
    const [totalUsuarios,  setTotalUsuarios]  = useState(0);
    const [totalAmbientes, setTotalAmbientes] = useState(0);
    const [totalTrancas,   setTotalTrancas]   = useState(0);

    // Fazendo a requisição para pegar o total de níveis
    useEffect(() => {
        async function fetchTotalNiveis() {
            try {
                const response = await axios.get("http://localhost:3333/levels");
                const niveis = response.data;
                setTotalNiveis(niveis.length);  // Supondo que niveis seja um array
            } catch (error) {
                console.error("Erro ao buscar os níveis: ", error);
            }
        }

        async function fetchTotalUsuarios() {
            try {
                const response = await axios.get("http://localhost:3333/users");
                const usuarios = response.data;
                setTotalUsuarios(usuarios.length);  // Supondo que users seja um array
            } catch (error) {
                console.error("Erro ao buscar os usuários: ", error);
            }
        }

        async function fetchTotalAmbientes() {
            try {
                const response = await axios.get("http://localhost:3333/environments");
                const ambientes = response.data;
                setTotalAmbientes(ambientes.length);  // Supondo que ambientes seja um array
            } catch (error) {
                console.error("Erro ao buscar os ambientes: ", error);
            }
        }

        async function fetchTotalTrancas() {
            try {
                const response = await axios.get("http://localhost:3333/locks");
                const trancas = response.data;
                setTotalTrancas(trancas.length);  // Supondo que trancas seja um array
            } catch (error) {
                console.error("Erro ao buscar as trancas: ", error);
            }
        }

        async function fetchTotalAcessos() {
            try {
                const response = await axios.get("http://localhost:3333/check-ins");
                const acessos = response.data;
                setTotalAcessos(acessos.length);  // Supondo que acessos seja um array
            } catch (error) {
                console.error("Erro ao buscar os acessos: ", error);
            }
        }

        async function fetchTotalNegados() {
            try {
                const response = await axios.get("http://localhost:3333/check-ins");
                const checkins = response.data;

                // Debug: logando os check-ins para verificar a estrutura
                console.log("Check-ins recebidos:", checkins);

                // Filtra os acessos que não foram validados
                const negados = checkins.filter(checkin => checkin.validated === false);
                setTotalNegados(negados.length);

                // Debug: logando os negados
                console.log("Acessos negados:", negados);
            } catch (error) {
                console.error("Erro ao buscar os acessos negados: ", error);
            }
        }

        fetchTotalNiveis();
        fetchTotalUsuarios();
        fetchTotalAmbientes();
        fetchTotalTrancas();
        fetchTotalAcessos();
        fetchTotalNegados();
    }, []);

    return(
        <section className={styles.dashboard_container}> 
            <h1>Dashboard</h1>

            <div className={styles.conteudo_conteiner}>
                <ul>
                    <li>
                        <QuadroInf 
                            titulo="Total de Acessos" 
                            dado={[totalAcessos]} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Total Negados" 
                            dado={[totalNegados]} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Total de Trancas" 
                            dado={[totalTrancas]} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Total de Ambientes" 
                            dado={[totalAmbientes]} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Total de Níveis" 
                            dado={[totalNiveis]} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Total de Usuários" 
                            dado={[totalUsuarios]} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                </ul>
            </div>

        </section>
    )
}

export default Dashboard