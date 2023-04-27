import styles from './ProfileDeletePage.module.css'
import userService from '../../services/user.service'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileDeletePage = () => {

    const { user, logout, handleNavigation } = useContext(AuthContext)
    const navigate = useNavigate()
    const [fadeOut, setFadeOut] = useState(false)

    async function handleClick(canDelete) {

        if (canDelete) {
            await userService.deleteUser(user._id)
            setFadeOut(true)
            setTimeout(() => {
                logout()
            }, 300)
        }

        else {
            setFadeOut(true)
            setTimeout(() => {
                handleNavigation()
                navigate("/profile")
            }, 300)
        }
    }

    return (
        <div className={`${styles.ProfileDeletePage} ${fadeOut && styles.fadeOut}`}>
            <h1>Delete Profile</h1>
            <p>Are you sure you want to delete your profile?</p>
            <div className={styles.buttons}>
                <button onClick={() => handleClick(true)}>Yes</button>
                <button onClick={() => handleClick(false)}>No</button>
            </div>
        </div>
    )
}

export default ProfileDeletePage