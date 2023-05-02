import styles from './ReviewsPage.module.css'
import InputBlock from '../../components/InputBlock/InputBlock'
import TextArea from '../../components/TextArea/TextArea'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import CloseButton from '../../components/CloseButton/CloseButton'
import reviewsService from '../../services/reviews.service'
import getStars from '../../utils/getStars'
import Errors from '../../components/Errors/Errors'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { ErrorContext } from '../../contexts/error.context'

const ReviewsCreationPage = () => {

    const { user } = useContext(AuthContext)
    const [reviewInfo, setReviewInfo] = useState({ rating: "5", title: "", description: "", author: "" })
    const { title, rating, description } = reviewInfo
    const { errors, setErrors, errorRef } = useContext(ErrorContext)

    const { user_id } = useParams()
    const { fadeOut, triggerFadeOut, handleNavigation } = useContext(StylesContext)

    function handleClick() {
        triggerFadeOut(-1)
    }

    useEffect(() => {
        setReviewInfo({ ...reviewInfo, author: user._id })
    }, [user])

    useEffect(() => {
        if (errorRef.current) errorRef.current.scrollIntoView()
    }, [errors])

    useEffect(() => {
        handleNavigation()

        return () => {
            setErrors([])
        }
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setReviewInfo({ ...reviewInfo, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await reviewsService.createReview({ ...reviewInfo, rating: +rating }, user_id)
            handleClick()
        }
        catch (error) {
            console.log(error)
            setErrors(error.response.data.err)
        }
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
                        <span>{getStars(rating, 45)}</span>
                    </div>
                </div>
                <SubmitButton text={"Create"} />

                <Errors errorRef={errorRef} errors={errors} />
            </form>

            <CloseButton handleClick={handleClick} size={100} />

        </div>
    )
}

export default ReviewsCreationPage
