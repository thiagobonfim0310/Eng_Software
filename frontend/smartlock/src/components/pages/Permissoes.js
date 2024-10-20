import TabelaCust from "../layout/TabelaCust";
import Adicionar from "./Adicionar"

import styles from "./Permissoes.module.css"

function Permissoes(){
    const columns = [
        { header: 'NOME', accessor: 'nome' },
        { header: 'NÍVEL DE ACESSO', accessor: 'nivel' },
        { header: 'TIPO DE ACESSO', accessor: 'tipo' },
        { header: 'DATA DE CADASTRO', accessor: 'data' }
      ];
    
      const data = [
        { nome: 'João Silva',     nivel: 'Nível 1', tipo: 'Permanente', data: 'Mar 23, 2024, 13:00 PM' },
        { nome: 'Sheldon Cooper', nivel: 'Nível 2', tipo: 'Temporário', data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Helena Santos',  nivel: 'Nível 3', tipo: 'Permanente', data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Letícia Anjos',  nivel: 'Nível 2', tipo: 'Temporário', data: 'Mar 23, 2022, 13:00 PM' },
        { nome: 'Felipe Donato',  nivel: 'Nível 4', tipo: 'Permanente', data: 'Mar 23, 2022, 13:00 PM' }
      ];

    return(
        <section className={styles.permissoes_container}> 
            <div className={styles.cabecalho}>
                <h1>Permissões</h1>
                <Adicionar/>
            </div>

            <div className={styles.conteudo_container}>
                <TabelaCust columns={columns} data={data}/>
            </div>
        </section>
    )
}

export default Permissoes