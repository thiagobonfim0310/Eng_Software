import QuadroInf from "../layout/QuadroInf"
import styles from "./Acesso.module.css"

function Acesso(){
    return(
        <section className={styles.acesso_container}> 
            <h1>Acesso</h1>

            <div className={styles.conteudo_conteiner}>
                <QuadroInf titulo="Nível 1" dados="adkjflkjdhf"/>
                <QuadroInf titulo="Nível 2" dados="adkjflkjdhf"/>
                <QuadroInf titulo="Nível 3" dados="adkjflkjdhf"/>
                <QuadroInf titulo="Nível 4" dados="adkjflkjdhf"/>
                <QuadroInf titulo="Visitante" dados="adkjflkjdhf"/>
            </div>
        </section>
    )
}

export default Acesso