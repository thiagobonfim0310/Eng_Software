import QuadroInf from "../layout/QuadroInf";
import styles from "./Acesso.module.css";

function Acesso() {
    const nvl1 = ['Acesso total'];
    const nvl2 = ['Porta principal', 'Sala 1', 'Sala 2', 'Lab 1', 'Lab 2'];
    const nvl3 = ['Porta principal', 'Sala 1', 'Sala 2', 'Lab 1'];
    const nvl4 = ['Porta principal', 'Sala 1', 'Lab 1'];
    const visi = ['Porta principal'];

    return (
        <section className={styles.acesso_container}>
            <h1>Acesso</h1>

            <div className={styles.conteudo_conteiner}>
                <ul>
                    <li>
                        <QuadroInf 
                            titulo="Nível 1" 
                            dado={nvl1} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Nível 2" 
                            dado={nvl2} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Nível 3" 
                            dado={nvl3} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Nível 4" 
                            dado={nvl4} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                    <li>
                        <QuadroInf 
                            titulo="Visitante" 
                            dado={visi} 
                            tituloClassName={styles.titulo} 
                            textoClassName={styles.texto} 
                        />
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Acesso;
