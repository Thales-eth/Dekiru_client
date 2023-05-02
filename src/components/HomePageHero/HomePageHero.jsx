import styles from './HomePageHero.module.css'
import { HOME_PAGE_BANNER_MOTTO, HOME_PAGE_BANNER_JAPANESE_TEXT, HOME_PAGE_BANNER_JAPANESE_SUBTEXT } from '../../consts/index'
import { Link } from 'react-router-dom'
import { StylesContext } from '../../contexts/styles.context'
import { useContext } from 'react'

const HomePageHero = () => {

    const { triggerNavigation } = useContext(StylesContext)

    return (
        <div className={styles.hero}>
            <h2 className={`${styles.spanish} ${styles.text}`}>Aprende Japonés <br />Hoy</h2>
            <h2 className={`${styles.japanese} ${styles.text}`}>{HOME_PAGE_BANNER_JAPANESE_TEXT}<br />{HOME_PAGE_BANNER_JAPANESE_SUBTEXT}</h2>
            <p>{HOME_PAGE_BANNER_MOTTO}</p>
            <div className={styles.mainButtons}>
                <Link onClick={(e) => triggerNavigation("/posts", e)} className={styles.japanButton}>Find Friends</Link>
                <Link onClick={(e) => triggerNavigation("/classes", e)} className={styles.blackButton}>Classes</Link>
            </div>
        </div>
    )
}

export default HomePageHero