import styles from './ReviewsPage.module.css'
import InputBlock from '../../components/InputBlock/InputBlock'
import TextArea from '../../components/TextArea/TextArea'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import CloseButton from '../../components/CloseButton/CloseButton'
import reviewsService from '../../services/reviews.service'
import getStars from '../../utils/getStars'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'

const ReviewsCreationPage = () => {

    const { user } = useContext(AuthContext)
    const [reviewInfo, setReviewInfo] = useState({ rating: "5", title: "", description: "", author: "" })
    const { title, rating, description } = reviewInfo

    const { user_id } = useParams()
    const { fadeOut, triggerFadeOut } = useContext(StylesContext)

    function handleClick() {
        triggerFadeOut(-1)
    }

    useEffect(() => {
        setReviewInfo({ ...reviewInfo, author: user })
    }, [user])

    function handleChange(e) {
        const { name, value } = e.target
        setReviewInfo({ ...reviewInfo, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await reviewsService.createReview({ ...reviewInfo, rating: +rating }, user_id)
        handleClick()
    }

    return (
        <div className={`${styles.ReviewsCreationPage} ${fadeOut && styles.fadeOut}`}>
            <h1>Create Review</h1>

            <form onSubmit={handleSubmit}>
                <InputBlock inputValue={title} handleChange={handleChange} type={"text"} value={"title"} />
                <TextArea inputValue={description} handleChange={handleChange} placeholder={"Description"} name={"description"} />
                <div className={styles.ratingInput}>
                    <label htmlFor="rating">Rating</label>
                    <br />
                    <input name='rating' type="range" value={rating} min="1" max="5" onChange={handleChange} />
                    <div className={styles.ratingStars}>
                        <span>{getStars(rating)}</span>
                    </div>
                </div>
                <SubmitButton text={"Create"} />
            </form>

            <CloseButton handleClick={handleClick} size={100} />

        </div>
    )
}

export default ReviewsCreationPage
