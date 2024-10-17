import * as React from 'react';
// import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react'

import Abas from '../layout/Abas.js'

import styles from "./Historico.module.css"

function Historico(){
    const [qualAba, setQualAba] = useState(0)

    const mudaAba = (event, newValue) => {
        setQualAba(newValue);
    };
    
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
                Total de Acessos
            </Abas>

            <Abas value={qualAba} index={1}>
                Realizados
            </Abas>

            <Abas value={qualAba} index={2}>
                Negados
            </Abas>
            
            <Abas value={qualAba} index={3}>
                Criados
            </Abas>
        </section>
    )
}

export default Historico