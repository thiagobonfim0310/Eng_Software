import { Link } from 'react-router-dom'

import styles from './SideBar.module.css'
import { SideBarData } from './SideBarData'

function SideBar(){
    return(
        <div className={styles.sidebar}>
            <ul>
                <li>
                    Usuário
                </li>
                <hr/>
                
                {SideBarData.map((item, index) => {
                    return (
                        <li key={index} className={styles[item.cName]}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                        </li>
                    );
                })}

                <hr/>
                <li>Perfil</li>
                <li>Configurações</li>
            </ul>
        </div>
    )
}

export default SideBar