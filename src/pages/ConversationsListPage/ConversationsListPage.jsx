import styles from './ConversationsListPage.module.css'
import ChatCard from '../../components/ChatCard/ChatCard'
import Conversation from '../../components/Conversation/Conversation'
import conversationService from '../../services/conversation.service'
import io from 'socket.io-client'
import messageService from '../../services/message.service'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import uploadService from '../../services/upload.service'

const ConversationsListPage = () => {

    const [conversations, setConversations] = useState([])
    const [currentConversation, setCurrentConversation] = useState({ participants: [], messages: [] })
    const { user } = useContext(AuthContext)
    const [msg, setMsg] = useState({ sender: user._id, message: "" })
    const invisibleRef = useRef(null)

    const socket = io.connect(`http://localhost:5005`, { transports: ['websocket'] })

    useEffect(() => {
        loadConversations()
    }, [])

    async function handleConversationChange(conversation) {
        const populatedConversation = await messageService.getConversationMessages(conversation._id).then(({ data }) => data)
        setCurrentConversation(populatedConversation)
        loadConversations()
    }

    async function loadConversations() {
        const allConversations = await conversationService.getUserConversations(user._id).then(({ data }) => data)
        setConversations(allConversations)
    }

    function handleMessageChange(e) {
        const { name, value } = e.target
        setMsg({ ...msg, [name]: value })
    }

    async function handleFileInput(e) {
        // NO ESTÁS CREANDO EL LINK COMO MENSAJE Y, POR LO TANTO, NO HAY PERSISTENCIA...
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("imageUrl", file)
        try {
            const cloudinaryLink = await uploadService.uploadPhoto(formData).then(({ data }) => data)
            handleSubmit("", true, { sender: user._id, message: cloudinaryLink })
            // setCurrentConversation({ ...currentConversation, messages: [...currentConversation.messages, { ...currentConversation.messages.at(-1), message: cloudinaryLink }] })
        }
        catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit(e, bool, message = msg) {
        if (e.key === "Enter" || bool) {
            try {
                socket.emit('createMessage', { conversation_id: currentConversation._id, message });

                socket.on('myCustomEventResponse', (data) => {
                    console.log("LLEGA O NO???", data)
                    handleConversationChange(currentConversation)
                    setMsg({ sender: user._id, message: "" })
                });
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className={styles.ConversationsListPage}>
            <div className={styles.chats}>
                {
                    conversations.map(conversation => {
                        const { participants } = conversation
                        const targetParticipant = participants[0]._id !== user._id ? participants[0] : participants[1]
                        return (
                            <div key={conversation._id}>
                                <ChatCard lastMessage={conversation.messages.at(-1)} onClick={() => handleConversationChange(conversation)} key={targetParticipant._id} username={targetParticipant.username} avatar={targetParticipant.avatar} />
                                <hr />
                            </div>
                        )
                    })
                }
            </div>

            <Conversation handleFileInput={handleFileInput} msg={msg} setMsg={setMsg} msgValue={msg.message} handleMessageChange={handleMessageChange} handleSubmit={handleSubmit} currentConversation={currentConversation} />
        </div>
    )
}

export default ConversationsListPage