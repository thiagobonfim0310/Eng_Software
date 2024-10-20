import * as React from 'react';
// import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react'

import Abas from '../layout/Abas.js'
import TabelaCust from '../layout/TabelaCust.js';

import styles from "./Historico.module.css"

function Historico(){
    const [qualAba, setQualAba] = useState(0)

    const mudaAba = (event, newValue) => {
        setQualAba(newValue);
    };

    const columns = [
        { header: 'NOME', accessor: 'nome' },
        { header: 'STATUS', accessor: 'status' },
        { header: 'PORTA', accessor: 'porta' },
        { header: 'NÍVEL DE ACESSO', accessor: 'nivel' },
        { header: 'DATA DE ACESSO', accessor: 'data' }
      ];
    
      const data = [
        { nome: 'João Silva',        status: 'Realizado', porta: '1',         nivel: 'Nível 1', data: 'Mar 23, 2024, 13:00 PM' },
        { nome: '-',                 status: 'Negado',    porta: 'Principal', nivel: '-',       data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Francisco Chaves',  status: 'Negado',    porta: '2',         nivel: 'Nível 3', data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Letícia Anjos',     status: 'Realizado', porta: '3',         nivel: 'Nível 2', data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Felipe Donato',     status: 'Criado',    porta: 'Principal', nivel: 'Nível 4', data: 'Mar 23, 2022, 13:00 PM' }
      ];

    const realizados = data.filter(item => item.status === 'Realizado');
    const negados    = data.filter(item => item.status === 'Negado');
    const criados    = data.filter(item => item.status === 'Criado');
    
    return(
        <section className={styles.historico_container}> 
            <h1>Histórico</h1>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={qualAba} aria-label="basic tabs example" onChange={mudaAba}>
                <Tab label="Total de Acessos"/>
                <Tab label="Realizados"/>
                <Tab label="Negados"/>
                <Tab label="Criados"/>
                </Tabs>
            </Box>

            <Abas value={qualAba} index={0}>
                <TabelaCust columns={columns} data={data}/>
            </Abas>

            <Abas value={qualAba} index={1}>
                <TabelaCust columns={columns} data={realizados}/>
            </Abas>

            <Abas value={qualAba} index={2}>
                <TabelaCust columns={columns} data={negados}/>
            </Abas>
            
            <Abas value={qualAba} index={3}>
                <TabelaCust columns={columns} data={criados}/>
            </Abas>
        </section>
    )
}

export default Historico