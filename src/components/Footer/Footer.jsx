import { useContext } from 'react'
import styles from './Footer.module.css'
import { SlSocialInstagram } from 'react-icons/sl'
import { SlSocialTwitter } from 'react-icons/sl'
import { SlSocialYoutube } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Footer = () => {
    const { handleNavigation } = useContext(AuthContext)

    return (
        <div className={styles.footer}>
            <Link onClick={handleNavigation} className={styles.footerLink} to={"/about"}>About us</Link>

            <div className="logos">
                <Link target='_blank' to={"https://i1.sndcdn.com/artworks-000305743743-qkwj6z-t500x500.jpg"}>
                    <SlSocialInstagram className={styles.logo} color={"white"} size={48} />
                </Link>
                <Link target='_blank' to={"https://i1.sndcdn.com/artworks-000305743743-qkwj6z-t500x500.jpg"}>
                    <SlSocialTwitter className={styles.logo} color={"white"} size={48} />
                </Link>
                <Link target='_blank' to={"https://i1.sndcdn.com/artworks-000305743743-qkwj6z-t500x500.jpg"}>
                    <SlSocialYoutube className={styles.logo} color={"white"} size={48} />
                </Link>
            </div>

            <Link className={styles.footerLink} to={"/contact"}>Contact</Link>
        </div>
    )
}

export default Footer