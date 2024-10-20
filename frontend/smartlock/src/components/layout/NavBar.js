import logo from "../../img/logo.jpeg"

import styles from "./NavBar.module.css"
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

function NavBar(){
    return(
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src={logo} alt="AccessMind"></img>
                <h1>AccessMind</h1>
            </div>
            <div className={styles.search}>
                <CiSearch />
                <input type="search" placeholder="Pesquisar..."/>
            </div>
            <div className={styles.notification}>
                <IoMdNotificationsOutline />
            </div>
        </nav>
    )
}

export default NavBar