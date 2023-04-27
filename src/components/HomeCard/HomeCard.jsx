import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import styles from './HomeCard.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const HomeCard = ({ headerText, paragraph, src, link }) => {
    const { handleNavigation } = useContext(AuthContext)

    return (
        <Link to={link} onClick={handleNavigation}><div className={`${styles.card} ${styles.blackCard}`}>
            <div className={styles.info}>
                <h2>{headerText}</h2>
                <p>{paragraph}</p>
                <div className={styles.logo}>
                    <BsArrowRight color={"black"} size={24} />
                </div>
            </div>

            <img src={src} alt="flag" className={`${styles.flag}`} />
        </div>
        </Link>
    )
}

export default HomeCard
