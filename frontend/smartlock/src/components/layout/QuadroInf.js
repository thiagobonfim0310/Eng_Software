import styles from "./QuadroInf.module.css";

function QuadroInf({ titulo, dado, tituloClassName, textoClassName, botoes = [] }) {
    return (
        <div className={styles.quadro}>
            <div className={styles.titulo_container}>
                <span className={tituloClassName}>{titulo}</span>
                {botoes.length > 0 && (
                    <div className={styles.botao_container}>
                        {botoes.map((botao, index) => (
                            <span key={index} className={styles.botao}>{botao}</span>
                        ))}
                    </div>
                )}
            </div>
            <div>
                {dado.map((item, index) => (
                    <p key={index} className={textoClassName}>{item}</p>
                ))}
            </div>
        </div>
    );
}

export default QuadroInf;