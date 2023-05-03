import styles from './HomeCard.module.css'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StylesContext } from '../../contexts/styles.context'

const HomeCard = ({ headerText, paragraph, src, link }) => {
    const { handleNavigation } = useContext(StylesContext)

    return (
        <Link to={link} onClick={handleNavigation}><div className={`${styles.card} ${styles.blackCard}`}>
            <div className={styles.info}>
                <h2>{headerText}</h2>
                <p>{paragraph}</p>
                <div className={styles.logo}>
                    <BsArrowRight className={styles.arrowLogo} color={"black"} size={24} />
                </div>
            </div>

            <img src={src} alt="flag" className={`${styles.flag}`} />
        </div>
        </Link>
    )
}

export default HomeCard
