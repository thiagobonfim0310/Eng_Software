import QuadroInf from "../layout/QuadroInf"
import styles from "./Dashboard.module.css"

function Dashboard(){
    const totalAcessos = [1234]
    const totalNegados = [123]

    return(
        <section className={styles.dashboard_container}> 
            <h1>Dashboard</h1>

            <div className={styles.conteudo_conteiner}>
                <ul>
                    <li>
                        <QuadroInf 
                            titulo="Total de acessos" 
                            dado={totalAcessos} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Total Negados" 
                            dado={totalNegados} 
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