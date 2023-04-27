import styles from './ProfilePage.module.css'
import UserInfo from '../../components/UserInfo/UserInfo'
import Welcome from '../../components/Welcome/Welcome'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import userService from '../../services/user.service'
import UserArticle from '../../components/UserArticle/UserArticle'
import Interests from '../../components/Interests/Interests'
import ReviewsSection from '../../components/ReviewsSection/ReviewsSection'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ClassProfileCard from '../../components/ClassProfileCard/ClassProfileCard'

const ProfilePage = () => {
    const { user, handleNavigation } = useContext(AuthContext)
    const { triggerFadeOut, fadeOut } = useContext(StylesContext)

    const [classes, setClasses] = useState([])
    const [friends, setFriends] = useState([])
    const [matches, setMatches] = useState([])

    function handleClick() {
        triggerFadeOut('/profile/delete')
    }

    useEffect(() => {
        getPopulatedUser()
    }, [user])

    async function getPopulatedUser() {
        try {
            const populatedUser = await userService.getPopulatedUser(user._id).then(({ data }) => data)
            setClasses(populatedUser.classes)
            setFriends(populatedUser.penfriends)
            setMatches(populatedUser.matches)
        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <div className={`${styles.profilePage} ${fadeOut && styles.fadeOut}`}>

            <div className="banner">
                <Welcome link={"/profile/edit"} message={"Welcome back,"} user={user} buttonText={"Edit Profile"} />
                <UserInfo user={user} ProfilePic={user.avatar} />
            </div>

            <Interests interests={user.interests} />

            <div className={styles.classesSection}>

                <SectionHeader text={"Classes"} />

                <div className={styles.classes}>

                    {
                        classes.length ?
                            classes.map(userClass => {
                                return (
                                    <ClassProfileCard key={userClass._id} singleClass={userClass} setAllClasses={setClasses} cardWidth={"500px"} cardHeight={"250px"} photoWidth={"100px"} photoHeight={"100px"} />
                                )
                            })
                            :
                            <Link onClick={handleNavigation} to={"/classes"}><button className={styles.profileBtn}>Join a class</button></Link>
                    }

                </div>

            </div>

            <div className={styles.matchesSection}>
                <SectionHeader text={"Matches"} />

                <div className={styles.carrousel}>
                    {
                        matches.length ?
                            matches.map(match => {
                                return (
                                    <UserArticle link={`/users/${match._id}`} key={match._id} user={match} />
                                )
                            })
                            :
                            <Link to={"/match"}>Get a Match</Link>
                    }
                </div>
            </div>

            <ReviewsSection userData={user} showReview={false} />

            <div className={styles.friendsSection}>

                <SectionHeader text={"Friends"} />


                <div className={styles.carrousel}>
                    {
                        friends.length ?
                            friends.map(friend => {
                                return (
                                    <UserArticle link={`/users/${friend._id}`} key={friend._id} user={friend} />
                                )
                            })
                            :
                            <Link onClick={handleNavigation} to={"/posts"}><button className={styles.profileBtn}>Make Friends</button></Link>
                    }

                </div>

                <div className={styles.buttonPlacer}>
                    <div onClick={handleClick} className={styles.deleteButton}>Delete profile</div>
                </div>

            </div>
        </div >

    )
}

export default ProfilePage