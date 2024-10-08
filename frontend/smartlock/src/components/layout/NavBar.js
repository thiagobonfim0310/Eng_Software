import logo from "../../img/logo.jpeg"

import styles from "./NavBar.module.css"

function NavBar(){
    return(
        <nav className={styles.navbar}>
            <img src={logo} alt="AccessMind"></img>
            <h1>AccessMind</h1>
            <p>Pesquisar</p>
            <p>Notificação</p>
        </nav>
    )
}

export default NavBar