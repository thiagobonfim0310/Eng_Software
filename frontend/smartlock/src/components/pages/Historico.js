import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Abas from '../layout/Abas.js';
import TabelaCust from '../layout/TabelaCust.js';

import styles from "./Historico.module.css";

function Historico() {
    const [qualAba, setQualAba] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
    const [filteredData, setFilteredData] = useState([]); // Estado para dados filtrados

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

    // Usando useMemo para memorizar os dados
    const data = useMemo(() => [
        { nome: 'João Silva', status: 'Realizado', porta: '1', nivel: 'Nível 1', data: 'Mar 23, 2024, 13:00 PM' },
        { nome: '-', status: 'Negado', porta: 'Principal', nivel: '-', data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Francisco Chaves', status: 'Negado', porta: '2', nivel: 'Nível 3', data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Letícia Anjos', status: 'Realizado', porta: '3', nivel: 'Nível 2', data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Felipe Donato', status: 'Criado', porta: 'Principal', nivel: 'Nível 4', data: 'Mar 23, 2022, 13:00 PM' }
    ], []); // O array data será memorado e não recriado a cada renderização

    // Função para filtrar os dados
    const getFilteredData = useCallback(() => {
        let relevantData = data; // Por padrão, exibe todos os dados

        // Filtra com base na aba selecionada
        if (qualAba === 1) { // Aba "Realizados"
            relevantData = relevantData.filter(item => item.status === 'Realizado');
        } else if (qualAba === 2) { // Aba "Negados"
            relevantData = relevantData.filter(item => item.status === 'Negado');
        } else if (qualAba === 3) { // Aba "Criados"
            relevantData = relevantData.filter(item => item.status === 'Criado');
        }

        // Aplica o filtro de pesquisa, se houver
        if (searchTerm) {
            relevantData = relevantData.filter(item => 
                item.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return relevantData; // Retorna os dados filtrados
    }, [qualAba, searchTerm, data]); // Adiciona data às dependências

    // Efeito para atualizar os dados filtrados quando a aba ou o termo de pesquisa mudarem
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
                    <Tab label="Criados"/>
                </Tabs>
            </Box>

            {/* Aqui garantimos que as tabelas exibam os dados filtrados de acordo com a aba selecionada */}
            <Abas value={qualAba} index={0}>
                <TabelaCust columns={columns} data={filteredData} />
            </Abas>

            <Abas value={qualAba} index={1}>
                <TabelaCust columns={columns} data={filteredData.filter(item => item.status === 'Realizado')} />
            </Abas>

            <Abas value={qualAba} index={2}>
                <TabelaCust columns={columns} data={filteredData.filter(item => item.status === 'Negado')} />
            </Abas>

            <Abas value={qualAba} index={3}>
                <TabelaCust columns={columns} data={filteredData.filter(item => item.status === 'Criado')} />
            </Abas>
        </section>
    );
}

export default Historico;
