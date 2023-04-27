import InputBlock from '../../components/InputBlock/InputBlock'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import TextArea from '../../components/TextArea/TextArea'
import styles from './ReviewsEditPage.module.css'
import ReviewService from '../../services/reviews.service'
import CloseButton from '../../components/CloseButton/CloseButton'
import getStars from '../../utils/getStars'
import { StylesContext } from '../../contexts/styles.context'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

const ReviewsEditPage = () => {
    const { review_id, reviewed_user } = useParams()

    const [reviewInfo, setReviewInfo] = useState({ rating: "", title: "", description: "", author: "" })
    const { title, rating, description } = reviewInfo
    const { fadeOut, triggerFadeOut } = useContext(StylesContext)

    function handleClick() {
        triggerFadeOut(`/users/${reviewed_user}`)
    }

    useEffect(() => {
        loadReview()
    }, [])

    async function loadReview() {
        const currentReview = await ReviewService.getSingleReview(review_id).then(({ data }) => data)
        setReviewInfo(currentReview)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setReviewInfo({ ...reviewInfo, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await ReviewService.editReview(reviewInfo, review_id, reviewed_user)
            handleClick()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`${styles.ReviewsEditPage} ${fadeOut && styles.fadeOut}`}>
            <h1>Edit Review</h1>

            <form onSubmit={handleSubmit}>
                <InputBlock inputValue={title} handleChange={handleChange} type={"text"} value={"title"} />
                <TextArea inputValue={description} handleChange={handleChange} placeholder={"Description"} name={"description"} value={description} />
                <div className={styles.ratingInput}>
                    <label htmlFor="rating">Rating</label>
                    <br />
                    <input name='rating' type="range" value={rating} min="1" max="5" onChange={handleChange} />
                    <div className={styles.ratingStars}>
                        <span>{getStars(rating)}</span>
                    </div>
                </div>
                <SubmitButton text={"Edit"} />
            </form>

            <CloseButton handleClick={handleClick} size={100} />

        </div>
    )
}

export default ReviewsEditPage