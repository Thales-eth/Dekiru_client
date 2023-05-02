import styles from './UserInfo.module.css'
import SpainFlag from "../../components/assets/spain.png"
import JapanFlag from "../../components/assets/japan.png"
import getStars from '../../utils/getStars'

const UserInfo = ({ user, ProfilePic }) => {
    return (
        <div className={styles.userInfo}>
            <div className={styles.me}>
                <img src={user.language === 'Spanish' ? SpainFlag : JapanFlag} className={styles.languageFlag} />
                <img src={ProfilePic} className={styles.profilePic} />
            </div>
            <div className={styles.rating}><span>{getStars(user.score, 40)}</span></div>
        </div>
    )
}

export default UserInfo