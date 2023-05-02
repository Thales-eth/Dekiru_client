import styles from './ReviewCard.module.css'
import getStars from '../../utils/getStars'
import reviewService from '../../services/reviews.service'
import CloseButton from '../CloseButton/CloseButton'
import { AiFillEdit } from 'react-icons/ai'
import { AuthContext } from '../../contexts/auth.context'
import { Link, useParams } from 'react-router-dom'
import { StylesContext } from '../../contexts/styles.context'
import { useContext } from 'react'


const ReviewCard = ({ src, setUserData, reviewId, id, title, text, rating, cardWidth, cardHeight, photoWidth, photoHeight, name, teacherId, ratingMargin }) => {

    const { user } = useContext(AuthContext)
    const { triggerFadeOut, handleNavigation } = useContext(StylesContext)
    const { user_id: userId } = useParams()

    async function deleteReview(reviewId) {
        try {
            if (teacherId) {
                const updatedUser = await reviewService.deleteReview(reviewId, teacherId).then(({ data }) => data)
                setUserData(updatedUser)
                return
            }
            const updatedUser = await reviewService.deleteReview(reviewId, userId).then(({ data }) => data)
            setUserData(updatedUser)
        }
        catch (error) {
            console.log(error)
        }
    }

    function triggerActions() {
        triggerFadeOut(teacherId ? `/reviews/edit/${reviewId}/${teacherId}` : `/reviews/edit/${reviewId}/${userId}`)
    }

    return (
        <div className={styles.classCard} style={{ width: `${cardWidth}`, height: `${cardHeight}` }}>
            {
                user._id === id &&
                <div className={styles.icons}>
                    <CloseButton handleClick={() => deleteReview(reviewId)} size={50} />
                    <Link className={styles.editIcon} onClick={triggerActions}><AiFillEdit size={50} className={styles.editBtn} /></Link>
                </div>

            }
            <div className={styles.info}>
                <p className={styles.title}>{title}</p>
                <p>{text}</p>
                <div style={{ "marginTop": ratingMargin }}>{getStars(rating ? rating : 0, 30)}<span></span></div>
            </div>

            <div className={styles.personInfo}>
                <Link onClick={handleNavigation} to={user._id !== id ? `/users/${id}` : `/profile`}>
                    <img className={styles.cardPhoto} src={src} alt="teacher" style={{ "width": photoWidth, "height": photoHeight }} />
                </Link>
                <br />
                <span>{name}</span>
            </div>
        </div>
    )
}

export default ReviewCard