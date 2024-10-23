import logo from "../../img/logo.jpeg";
import styles from "./NavBar.module.css";
import NotificationIcon from "./NotificationIcon";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="AccessMind"></img>
        <h1>AccessMind</h1>
      </div>
      <div className={styles.notification}>
        <NotificationIcon />
      </div>
    </nav>
  );
}

export default NavBar;
