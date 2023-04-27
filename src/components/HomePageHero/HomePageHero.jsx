import { Link, useNavigate } from 'react-router-dom'
import styles from './HomePageHero.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const HomePageHero = () => {
    const { handleNavigation } = useContext(AuthContext)
    const navigate = useNavigate()

    const triggerNavigation = (link, e) => {
        e.preventDefault()
        handleNavigation()
        navigate(link)
    }

    return (
        <div className={styles.hero}>
            <h2 className={`${styles.spanish} ${styles.text}`}>Aprende Japonés <br />Hoy</h2>
            <h2 className={`${styles.japanese} ${styles.text}`}>スペイン語を<br />勉強しましょう！</h2>
            <p>Learning languages is a social act.</p>
            <div className={styles.mainButtons}>
                <Link onClick={(e) => triggerNavigation("/posts", e)} className={styles.japanButton}>Find Friends</Link>
                <Link onClick={(e) => triggerNavigation("/classes", e)} className={styles.blackButton}>Classes</Link>
            </div>
        </div>
    )
}

export default HomePageHero