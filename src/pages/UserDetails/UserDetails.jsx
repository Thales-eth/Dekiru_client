import styles from './UserDetails.module.css'
import UserService from '../../services/user.service'
import UserInfo from '../../components/UserInfo/UserInfo'
import Welcome from '../../components/Welcome/Welcome'
import LoadButton from '../../components/LoadButton/LoadButton'
import Interests from '../../components/Interests/Interests'
import userService from '../../services/user.service'
import ReviewsSection from '../../components/ReviewsSection/ReviewsSection'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {

    const [userData, setUserData] = useState({ username: "", avatar: "", interests: [], score: 0, reviews: [], penfriends: [] })
    const { avatar, interests } = userData

    const [allReviews, setAllReviews] = useState([])
    const [showLoader, setShowLoader] = useState(true)
    const [showButton, setShowButton] = useState(true)

    const { fadeOut, triggerFadeOut } = useContext(StylesContext)

    const { id: userId } = useParams()
    const { user, setUser } = useContext(AuthContext)
    const [isFriend, setIsFriend] = useState(user.penfriends.includes(userId))
    const [isFollower, setIsFollower] = useState(userData.penfriends.includes(user._id))

    const lastReviewIndex = userData.reviews.length - 1

    useEffect(() => {
        setIsFollower(userData.penfriends.includes(user._id))
        setShowLoader(lastReviewIndex !== allReviews.length - 1)
    }, [userData])

    function handleClick() {
        triggerFadeOut(`/reviews/create/${userId}`)
    }

    function loadReviews(e) {
        e.preventDefault()

        if (showLoader) setUserData({ ...userData, reviews: allReviews.slice(0, lastReviewIndex + 2) })
        else {
            setUserData({ ...userData, reviews: allReviews.slice(0, 2) })
            setShowLoader(true)
        }
    }

    async function makeFriendship() {
        try {
            const updatedUser = await userService.followFriend(user._id, userId).then(({ data }) => data)
            setUser(updatedUser)
            setIsFriend(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function breakFriendship() {
        try {
            const updatedUser = await userService.unfollowFriend(user._id, userId).then(({ data }) => data)
            setUser(updatedUser)
            setIsFriend(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [userId])

    useEffect(() => {
        setUserData({ ...userData, reviews: allReviews.slice(0, 2) })
        setShowButton(allReviews.length >= 2)
    }, [allReviews])

    async function getUserData() {
        try {
            const singleUser = await UserService.getOneUser(userId).then(({ data }) => data)
            await setUserData(singleUser)
            await setAllReviews(singleUser.reviews)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`${styles.UserDetails} ${fadeOut && styles.fadeOut}`}>
            <div className="banner">
                <Welcome message={"This is"} user={userData} buttonText={"Start Chat"} />
                <UserInfo user={userData} ProfilePic={avatar} />
            </div>

            {
                isFriend ?
                    <div className={styles.friendBtn}>
                        {
                            isFollower &&
                            <span>{userData?.username} follows you!</span>
                        }
                        <AiFillHeart onClick={breakFriendship} color='#bc002d' size={48} />
                    </div>
                    :
                    userId !== user._id
                    &&
                    <div className={styles.friendBtn}>
                        {
                            isFollower &&
                            <span>{userData?.username} follows you!</span>
                        }
                        <AiOutlineHeart onClick={makeFriendship} color='#bc002d' size={48} />
                    </div>
            }

            <Interests interests={interests} />

            <ReviewsSection showReview={true} setUserData={setUserData} userData={userData} handleClick={handleClick} />

            {
                showButton &&
                <LoadButton showLoader={showLoader} handleClick={loadReviews} />
            }

        </div>
    )
}

export default UserDetails