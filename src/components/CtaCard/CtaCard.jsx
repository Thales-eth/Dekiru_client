import styles from './CtaCard.module.css'
import { DEKIRU_MOTTO } from '../../consts/index'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StylesContext } from '../../contexts/styles.context'

const CtaCard = ({ link }) => {

    const { handleNavigation } = useContext(StylesContext)

    return (
        <Link onClick={handleNavigation} to={link}>
            <div className={`${styles.card} ${styles.pinkCard}`}>
                <div className={styles.info}>
                    <h2>Find Someone Just <br /> Like <br /> <span>You</span></h2>
                    <p>{DEKIRU_MOTTO}</p>
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