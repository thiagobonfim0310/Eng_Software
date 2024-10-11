import logo from "../../img/logo.jpeg"

import styles from "./NavBar.module.css"
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

function NavBar(){
    return(
        <nav className={styles.navbar}>
            <img src={logo} alt="AccessMind"></img>
            <h1>AccessMind</h1>
            <CiSearch />
            <input name="search" defaultValue="Pesquisar..."/>
            <IoMdNotificationsOutline />
        </nav>
    )
}

export default NavBar