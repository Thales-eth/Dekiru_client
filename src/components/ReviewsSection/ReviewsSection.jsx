import styles from './ReviewsSection.module.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import Reviews from '../Reviews/Reviews'
import ReviewButton from '../ReviewButton/ReviewButton'
import { NO_REVIEWS_MSG, LEAVE_REVIEW_MSG } from '../../consts'
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
                    <Reviews setUserData={setUserData} reviews={userData.reviews} teacherId={userData._id} />
                    :
                    user._id === userData._id
                        ?
                        <p className={styles.noReviews}>{NO_REVIEWS_MSG}</p>
                        :
                        <Link className={styles.noReviews} onClick={handleClick}><p className={styles.reviewText}>{LEAVE_REVIEW_MSG}</p></Link>

            }

        </div>
    )
}

export default ReviewsSection