import styles from './UserArticle.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StylesContext } from '../../contexts/styles.context'

const UserArticle = ({ user, link }) => {
    const { triggerNavigation } = useContext(StylesContext)

    return (
        <Link onClick={e => triggerNavigation(link, e)}>
            <article className={`${styles.caseStudy} ${styles.case1}`} style={{ backgroundImage: `url(${user.avatar})` }}>
                <div className={styles.name}>{user.username}</div>
                <div className={styles.age}>{user.age}</div>
            </article>
        </Link>
    )
}

export default UserArticle