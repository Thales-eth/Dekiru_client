import styles from './ReviewButton.module.css'
import { Link } from 'react-router-dom'

const ReviewButton = ({ handleClick }) => {
    return (
        <Link onClick={handleClick} className={styles.reviewButton}>Review</Link>
    )
}

export default ReviewButton