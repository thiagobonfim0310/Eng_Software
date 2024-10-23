import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import Abas from '../layout/Abas.js';
import TabelaCust from '../layout/TabelaCust.js';

import styles from "./Historico.module.css";

function Historico() {
    const [qualAba, setQualAba] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
    const [filteredData, setFilteredData] = useState([]); // Estado para dados filtrados
    const [acessos, setAcessos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [environments, setEnvironments] = useState([]); // Estado para ambientes

    const mudaAba = (event, newValue) => {
        setQualAba(newValue);
    };

    // Definição das colunas
    const columns = [
        { header: 'NOME', accessor: 'nome' },
        { header: 'STATUS', accessor: 'status' },
        { header: 'PORTA', accessor: 'porta' },
        { header: 'NÍVEL DE ACESSO', accessor: 'nivel' },
        { header: 'DATA DE ACESSO', accessor: 'data' }
    ];

    // Função para filtrar os dados
    const getFilteredData = useCallback(() => {
        let relevantData = [...acessos]; // Usando os acessos recebidos

        // Aplica o filtro de pesquisa, se houver
        if (searchTerm) {
            relevantData = relevantData.filter(item => 
                usuarios.find(user => user.id === item.user_id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtra com base na aba selecionada
        if (qualAba === 1) { // Aba "Realizados"
            relevantData = relevantData.filter(item => item.validated);
        } else if (qualAba === 2) { // Aba "Negados"
            relevantData = relevantData.filter(item => !item.validated);
        } else if (qualAba === 3) { // Aba "Criados"
            relevantData = relevantData.filter(item => !item.validated && item.user_id === null);
        }

        // Ordena os dados por data de criação (acesso) de forma decrescente
        relevantData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return relevantData; // Retorna os dados filtrados
    }, [qualAba, searchTerm, acessos, usuarios]); // Adiciona acessos e usuarios às dependências

    // Efeito para atualizar os dados filtrados quando a aba ou o termo de pesquisa mudarem
    useEffect(() => {
        async function fetchAcessos() {
            try {
                const response = await axios.get("http://localhost:3333/check-ins");
                setAcessos(response.data);  // Supondo que acessos seja um array
            } catch (error) {
                console.error("Erro ao buscar os acessos: ", error);
            }
        }

        async function fetchUsuarios() {
            try {
                const response = await axios.get("http://localhost:3333/users");
                setUsuarios(response.data);  // Supondo que users seja um array
            } catch (error) {
                console.error("Erro ao buscar os usuários: ", error);
            }
        }

        async function fetchEnvironments() {
            try {
                const response = await axios.get("http://localhost:3333/environments");
                setEnvironments(response.data); // Supondo que environments seja um array
            } catch (error) {
                console.error("Erro ao buscar os ambientes: ", error);
            }
        }

        fetchAcessos();
        fetchUsuarios(); 
        fetchEnvironments(); // Chama a função para buscar ambientes
    }, []); // Chama apenas uma vez no montamento do componente

    // Atualiza os dados filtrados
    useEffect(() => {
        setFilteredData(getFilteredData());
    }, [getFilteredData]); // Atualiza a dependência para getFilteredData

    return (
        <section className={styles.historico_container}>
            <h1>Histórico</h1>

            {/* Campo de pesquisa */}
            <div className={styles.search_container}>
                <input 
                    type="text" 
                    placeholder="Buscar por Nome" 
                    value={searchTerm} 
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }} 
                />
            </div>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={qualAba} aria-label="basic tabs example" onChange={mudaAba}>
                    <Tab label="Total de Acessos"/>
                    <Tab label="Realizados"/>
                    <Tab label="Negados"/>
                </Tabs>
            </Box>

            <Abas value={qualAba} index={0}>
                <TabelaCust 
                columns={columns} 
                data={filteredData.map(acesso => ({
                    nome: usuarios.find(user => user.id === acesso.user_id)?.name || 'Usuário Desconhecido', // Usando o nome do usuário
                    status: acesso.validated ? 'Realizado' : 'Negado',
                    porta: environments.find(env => env.id === acesso.environment_id)?.name || 'Ambiente Desconhecido', // Usando o nome do ambiente
                    nivel: usuarios.find(user => user.id === acesso.user_id)?.level?.name || 'Nível Desconhecido', // Usando o nome do nível
                    data: new Date(acesso.createdAt).toLocaleString(), // Formata a data
                }))} />
            </Abas>

            <Abas value={qualAba} index={1}>
                <TabelaCust 
                    columns={columns} 
                    data={filteredData
                        .filter(acesso => acesso.validated) // Filtra apenas os acessos validados (Realizados)
                        .map(acesso => ({
                            nome: usuarios.find(user => user.id === acesso.user_id)?.name || 'Usuário Desconhecido', // Usando o nome do usuário
                            status: acesso.validated ? 'Realizado' : 'Negado', // Neste caso, todos devem ser 'Realizado'
                            porta: environments.find(env => env.id === acesso.environment_id)?.name || 'Ambiente Desconhecido', // Usando o nome do ambiente
                            nivel: usuarios.find(user => user.id === acesso.user_id)?.level?.name || 'Nível Desconhecido', // Usando o nome do nível
                            data: new Date(acesso.createdAt).toLocaleString(), // Formata a data
                        }))} 
                />
            </Abas>

            <Abas value={qualAba} index={2}>
                <TabelaCust 
                    columns={columns} 
                    data={filteredData
                        .filter(acesso => !acesso.validated) // Filtra apenas os acessos não validados (Negados)
                        .map(acesso => ({
                            nome: usuarios.find(user => user.id === acesso.user_id)?.name || 'Usuário Desconhecido', // Usando o nome do usuário
                            status: acesso.validated ? 'Realizado' : 'Negado', // Neste caso, todos devem ser 'Negado'
                            porta: environments.find(env => env.id === acesso.environment_id)?.name || 'Ambiente Desconhecido', // Usando o nome do ambiente
                            nivel: usuarios.find(user => user.id === acesso.user_id)?.level?.name || 'Nível Desconhecido', // Usando o nome do nível
                            data: new Date(acesso.createdAt).toLocaleString(), // Formata a data
                        }))} 
                />
            </Abas>
        </section>
    );
}

export default Historico;
