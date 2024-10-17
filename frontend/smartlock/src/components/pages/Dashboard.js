import QuadroInf from "../layout/QuadroInf"
import styles from "./Dashboard.module.css"

function Dashboard(){
    return(
        <section className={styles.dashboard_container}> 
            <h1>Dashboard</h1>

            <div className={styles.conteudo_conteiner}>
                <QuadroInf titulo="Total de acessos" dado="1234"/>
                <QuadroInf titulo="Total Negados" dado="123"/>
            </div>

        </section>
    )
}

export default Dashboard