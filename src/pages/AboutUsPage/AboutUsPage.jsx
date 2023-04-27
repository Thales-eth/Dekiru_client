import styles from './AboutUsPage.module.css'
import ramen from './assets/ramen.png'
import me from './assets/Profilepic_.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

const AboutUsPage = () => {
    return (
        <div className={styles.aboutPage}>
            <h1>About Me...</h1>

            <p className={styles.motto}>I’m a fullstack developer
                obsessed with growth, learning
                and FOOD  </p>

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
                    <div style={{ "backgroundImage": `url(${ramen})` }} className={styles.ramen}></div>
                    <div style={{ "backgroundImage": `url(${me})` }} className={styles.profilePic}></div>
                </div>
            </div >
        </div >
    )
}

export default AboutUsPage