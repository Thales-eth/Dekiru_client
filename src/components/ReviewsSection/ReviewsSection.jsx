import SectionHeader from '../SectionHeader/SectionHeader'
import Reviews from '../Reviews/Reviews'
import ReviewButton from '../ReviewButton/ReviewButton'
import styles from './ReviewsSection.module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'

const ReviewsSection = ({ handleClick, setUserData, userData, showReview }) => {

    const { user } = useContext(AuthContext)

    return (
        <div className={styles.reviewsSection}>
            <div className={styles.reviewsHeader}>
                <SectionHeader text={"Reviews"} css={{ marginLeft: "220px" }} />
                {
                    showReview &&
                    <ReviewButton handleClick={handleClick} />
                }
            </div>

            {
                userData.reviews.length ?
                    <Reviews setUserData={setUserData} reviews={userData.reviews} />
                    :
                    user._id === userData._id
                        ?
                        <p className={styles.noReviews}>No Reviews. Ask for a Review! ༼ つ ◕_◕ ༽つ</p>
                        :
                        <Link className={styles.noReviews} onClick={handleClick}><p className={styles.reviewText}>This User has no Reviews Yet. Leave a Review!</p></Link>

            }

        </div>
    )
}

export default ReviewsSection