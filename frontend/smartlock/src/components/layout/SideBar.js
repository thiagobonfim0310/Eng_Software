import { Link } from 'react-router-dom'

import styles from './SideBar.module.css'
import Container from './Container'
import { SideBarData } from './SideBarData'

function SideBar(){
    return(
        <div className={styles.sidebar}>
            <Container>
                <ul>
                    <li>
                        <p>Usuário</p>
                    </li>
                    
                    {SideBarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                            </li>
                        );
                    })}
                    
                    <li>Perfil</li>
                    <li>Configurações</li>
                </ul>
            </Container>
        </div>
    )
}

export default SideBar