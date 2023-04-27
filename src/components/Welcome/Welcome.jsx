import styles from './Welcome.module.css'
import conversationService from '../../services/conversation.service'
import { Link } from 'react-router-dom'
import { StylesContext } from '../../contexts/styles.context'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const Welcome = ({ user, message, buttonText, link }) => {
    const { triggerFadeOut } = useContext(StylesContext)
    const { user: loggedUser } = useContext(AuthContext)

    async function startChat(e) {
        e.preventDefault()
        try {
            await conversationService.joinConversation([user._id, loggedUser._id])
            triggerFadeOut("/conversations")
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.welcome}>
            <h1>{message} {user.username}</h1>
            <Link onClick={(e) => link ? triggerFadeOut(link) : startChat(e)} className={styles.editBtn}>{buttonText}</Link>
        </div>
    )
}

export default Welcome