import styles from './NavBar.module.css'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const NavBar = ({ isChat }) => {

    const location = useLocation()

    const { user, logout } = useContext(AuthContext)

    return (
        <header>
            <nav className={styles.navBar} style={isChat ? { "backgroundColor": "#F5F7FB" } : { "backgroundColor": "white" }}>
                <h1 className={styles.logo}><Link to={"/"}>Dekiru</Link></h1>

                <ul className={`${styles.flexContainer} ${styles.navList}`}>
                    <li><Link className={location.pathname === "/" ? styles.active : ""} to={"/"}>Home</Link></li>
                    <li><Link className={location.pathname === "/classes" ? styles.active : ""} to={"/classes"}>Classes</Link></li>
                    <li><Link className={location.pathname === "/users" ? styles.active : ""} to={"/users"}>Users</Link></li>
                    {
                        user && <li><Link className={location.pathname === "/users" ? styles.active : ""} to={"/conversations"}>Chat</Link></li>
                    }
                    <li><Link className={location.pathname === "/posts" ? styles.active : ""} to={"/posts"}>Posts</Link></li>
                </ul>

                <div className={styles.authButtons}>
                    {
                        user ?
                            <>
                                <Link className={`${styles.genericButton} ${styles.signupButton}`} to={"/profile"}>My Profile</Link>
                                <Link className={`${styles.loginButton} ${styles.genericButton}`} onClick={logout}>Logout</Link>
                            </>
                            :
                            <>
                                <Link className={`${styles.loginButton} ${styles.genericButton}`} to={"/login"}>Login</Link>
                                <Link className={`${styles.signupButton} ${styles.genericButton}`} to={"/signup"}>Sign up</Link>
                            </>
                    }
                </div>

            </nav>
        </header >
    )
}

export default NavBar