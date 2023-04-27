import { Link } from 'react-router-dom'
import styles from './ReviewButton.module.css'

const ReviewButton = ({ handleClick }) => {
    return (
        <Link onClick={handleClick} className={styles.reviewButton}>Review</Link>
    )
}

export default ReviewButton