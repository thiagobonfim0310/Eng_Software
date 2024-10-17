import styles from "./QuadroInf.module.css"

function QuadroInf( {titulo, dado} ){
    return(
        <div className={styles.quadro}>
            <spam>{titulo}</spam>
            <p>{dado}</p>
        </div>
    )
}

export default QuadroInf