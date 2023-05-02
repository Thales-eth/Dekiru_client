import styles from './AboutUsPage.module.css'
import { ABOUT_ME_MOTTO } from '../../consts'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

const me = "https://res.cloudinary.com/dagndlfhj/image/upload/v1682536679/movie-gallery/pmelgswuysdldnylvlwv.png"
const ramen = "https://res.cloudinary.com/dagndlfhj/image/upload/v1682797421/ramen-min_tr6dlr.jpg"

const AboutUsPage = () => {
    return (
        <div className={styles.aboutPage}>
            <h1>About Me...</h1>

            <p className={styles.motto}>{ABOUT_ME_MOTTO}</p>

            <Link to="mailto:dan.console.log@gmail.com" className={styles.ctaButton}>Let's talk</Link>

            <div className={styles.me}>
                <div className={styles.message}>
                    <p> <span>
                        Me pretty much
                    </span>
                    </p>
                    <div>
                        <BsArrowRight className={styles.arrow} color={"black"} size={40} />
                    </div>
                </div>

                <div className={styles.photos}>
                    <img src={ramen} className={styles.ramen} />
                    <img src={me} className={styles.profilePic} />
                </div>
            </div >
        </div >
    )
}

export default AboutUsPage