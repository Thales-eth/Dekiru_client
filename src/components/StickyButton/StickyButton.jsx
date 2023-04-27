import { Link } from 'react-router-dom'
import styles from './StickyButton.module.css'

const StickyButton = ({ text, handleClick }) => {
    return (
        <Link onClick={handleClick}><div className={styles.createPost}>
            {text}
        </div></Link>
    )
}

export default StickyButton