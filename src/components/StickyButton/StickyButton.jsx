import styles from './StickyButton.module.css'
import { Link } from 'react-router-dom'

const StickyButton = ({ text, handleClick }) => {
    return (
        <Link onClick={handleClick}>
            <div className={styles.createPost}>
                {text}
            </div>
        </Link>
    )
}

export default StickyButton