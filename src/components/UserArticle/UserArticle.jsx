import { Link } from 'react-router-dom'
import styles from './UserArticle.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const UserArticle = ({ user, link }) => {
    const { handleNavigation } = useContext(AuthContext)

    return (
        <Link to={link} onClick={handleNavigation}>
            <article className={`${styles.caseStudy} ${styles.case1}`} style={{ backgroundImage: `url(${user.avatar})` }}>
                <div className={styles.name}>{user.username}</div>
                <div className={styles.age}>{user.age}</div>
            </article>
        </Link>
    )
}

export default UserArticle