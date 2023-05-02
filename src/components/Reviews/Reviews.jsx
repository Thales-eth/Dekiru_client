import styles from './Reviews.module.css'
import ReviewCard from '../ReviewCard/ReviewCard'

const ReviewSection = ({ reviews, setUserData, teacherId }) => {
    console.log("LAS REVIEWS =>", reviews)

    return (
        <div className={styles.reviews}>
            {
                reviews.map(review => {
                    return (
                        <ReviewCard key={review._id}
                            reviewId={review._id}
                            setUserData={setUserData}
                            rating={review.rating}
                            cardWidth={"1000px"}
                            cardHeight={"400px"}
                            title={review.title}
                            text={review.description}
                            photoWidth={"200px"}
                            photoHeight={"200px"}
                            name={review.author?.username}
                            ratingMargin={"20px"}
                            teacherId={teacherId}
                            id={review.author?._id}
                            src={review.author?.avatar} />
                    )
                })
            }
        </div>
    )
}

export default ReviewSection