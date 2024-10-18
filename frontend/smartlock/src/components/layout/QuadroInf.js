import styles from "./QuadroInf.module.css";

function QuadroInf({ titulo, dado, tituloClassName, textoClassName }) {
    return (
        <div className={styles.quadro}>
            <span className={tituloClassName}>{titulo}</span>
            <div>
                {dado.map((item, index) => (
                    <p key={index} className={textoClassName}>{item}</p>
                ))}
            </div>
        </div>
    );
}

export default QuadroInf;
