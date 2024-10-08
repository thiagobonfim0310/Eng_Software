import { Link } from 'react-router-dom'

import styles from './SideBar.module.css'
import Container from './Container'

function SideBar(){
    return(
        <div className={styles.sidebar}>
            <Container>
                <ul>
                    <li>
                        <p>Usuário</p>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/historico">Histórico</Link>
                    </li>
                    <li>
                        <Link to="/permissoes">Permissões</Link>
                    </li>
                    <li>
                        <Link to="/acesso">Acesso</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        Perfil
                    </li>
                    <li>
                        Configurações
                    </li>
                </ul>
            </Container>
      </div>
    )
}

export default SideBar