import styles from './CtaCard.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { Link } from 'react-router-dom'

const CtaCard = ({ link }) => {

    const { handleNavigation } = useContext(AuthContext)

    return (
        <Link onClick={handleNavigation} to={link}>
            <div className={`${styles.card} ${styles.pinkCard}`}>
                <div className={styles.info}>
                    <h2>Find Someone Just <br /> Like <br /> <span>You</span></h2>
                    <p>Dekiru helps you find
                        people who share your same
                        interests.</p>
                </div>

                <div className={styles.cta}>
                    <div className={styles.ctaImages}>
                        <div className={`${styles.ctaBlock} ${styles.ctaBlock1}`}>
                        </div>
                        <div className={`${styles.ctaBlock} ${styles.ctaBlock2}`}>
                        </div>
                    </div>
                    <div className={styles.friendButton}>Find me a friend</div>
                </div>

            </div>
        </Link>
    )
}

export default CtaCard