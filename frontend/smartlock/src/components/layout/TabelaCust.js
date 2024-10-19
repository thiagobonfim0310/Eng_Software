import styles from './TabelaCust.module.css'

function TabelaCust({ columns, data }){
    return(
        <table className={styles.tabela}>
            <thead>
                <tr>
                {columns.map((col, index) => (
                    <th key={index}>{col.header}</th>
                ))}
                </tr>
            </thead>

            <tbody>
                {data.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((col, colIndex) => (
                    <td key={colIndex}>{rowData[col.accessor]}</td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TabelaCust