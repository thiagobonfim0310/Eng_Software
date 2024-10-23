import { useState, useEffect } from "react";
import axios from "axios";
import QuadroInf from "../layout/QuadroInf";
import styles from "./Dashboard.module.css";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Registro dos componentes necessários para o Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [totalAcessos, setTotalAcessos] = useState(0);
  const [totalNegados, setTotalNegados] = useState(0);
  const [totalNiveis, setTotalNiveis] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalAmbientes, setTotalAmbientes] = useState(0);
  const [totalTrancas, setTotalTrancas] = useState(0);

  // Fazendo a requisição para pegar o total de níveis
  useEffect(() => {
    async function fetchTotalNiveis() {
      try {
        const response = await axios.get("http://localhost:3333/levels");
        const niveis = response.data;
        setTotalNiveis(niveis.length); // Supondo que niveis seja um array
      } catch (error) {
        console.error("Erro ao buscar os níveis: ", error);
      }
    }

    async function fetchTotalUsuarios() {
      try {
        const response = await axios.get("http://localhost:3333/users");
        const usuarios = response.data;
        setTotalUsuarios(usuarios.length); // Supondo que users seja um array
      } catch (error) {
        console.error("Erro ao buscar os usuários: ", error);
      }
    }

    async function fetchTotalAmbientes() {
      try {
        const response = await axios.get("http://localhost:3333/environments");
        const ambientes = response.data;
        setTotalAmbientes(ambientes.length); // Supondo que ambientes seja um array
      } catch (error) {
        console.error("Erro ao buscar os ambientes: ", error);
      }
    }

    async function fetchTotalTrancas() {
      try {
        const response = await axios.get("http://localhost:3333/locks");
        const trancas = response.data;
        setTotalTrancas(trancas.length); // Supondo que trancas seja um array
      } catch (error) {
        console.error("Erro ao buscar as trancas: ", error);
      }
    }

    async function fetchTotalAcessos() {
      try {
        const response = await axios.get("http://localhost:3333/check-ins");
        const acessos = response.data;
        setTotalAcessos(acessos.length); // Supondo que acessos seja um array
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
        const negados = checkins.filter(
          (checkin) => checkin.validated === false
        );
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

  // Preparando os dados para o gráfico de pizza
  const pieData = {
    labels: ["Acessos Permitidos", "Acessos Negados"],
    datasets: [
      {
        label: "# de Acessos",
        data: [totalAcessos - totalNegados, totalNegados], // Calculando permitidos e negados
        backgroundColor: ["#36A2EB", "#FF6384"], // Cores diferentes para cada fatia
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const barData = {
    labels: ["Trancas", "Níveis", "Ambientes", "Usuários"],
    datasets: [
      {
        label: "Total",
        data: [totalTrancas, totalNiveis, totalAmbientes, totalUsuarios],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Define que o incremento será de 1 no eixo Y
          precision: 0, // Garante que não existam valores decimais
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Remove a legenda
      },
    },
  };

  return (
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
      {/* Adicionando o gráfico de pizza e gráfico em barras*/}
      <div className={styles.chartWrapper}>
        <div className={styles.chartItem}>
          <h2>Distribuição de Acessos</h2>
          <Pie data={pieData} />
        </div>
        <div className={styles.chartItem}>
          <h2>Gráfico de Barras</h2>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
