import styles from './Conversation.module.css'
import getHumanHour from '../../utils/getHumanHour'
import EmojiPicker from 'emoji-picker-react';
import uploadService from '../../services/upload.service';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { HiDownload } from 'react-icons/hi'
import { AiOutlineDownCircle } from 'react-icons/ai'
import { useContext, useEffect, useRef, useState } from 'react'
import { AiFillPicture } from 'react-icons/ai'
import { BsFillEmojiLaughingFill, BsFillSendFill } from 'react-icons/bs'
import { AuthContext } from '../../contexts/auth.context'
import { Link } from 'react-router-dom';

const Conversation = ({ setMsg, msg, handleFileInput, currentConversation, handleMessageChange, handleSubmit, msgValue }) => {

    const { user } = useContext(AuthContext)
    const [showEmojis, setShowEmojis] = useState(false)
    const messagesRef = useRef(null)
    const pickerRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [currentConversation])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    function handleClickOutside(e) {
        if (pickerRef.current && !pickerRef.current.contains(e.target)) setShowEmojis(false)
    }

    function scrollToBottom() {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }

    function handleEmojiClick(emojiObject) {
        const { emoji } = emojiObject
        setMsg({ ...msg, message: `${msg.message} ${emoji}` })
        setShowEmojis(false)
    }

    async function addAudioElement(blob) {
        const url = URL.createObjectURL(blob);

        const fileUrl = await blobUrlToFile(url)

        const formData = new FormData()
        formData.append("audioUrl", fileUrl)

        const cloudinaryUrl = await uploadService.uploadAudio(formData).then(({ data }) => data)
        console.log("WHO THE FUCK ==>", cloudinaryUrl)
    }

    async function blobUrlToFile(blobUrl) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const filename = `audio_${Date.now()}.wav`;
        return new File([blob], filename, { type: 'audio/wav' });
    }

    return (
        <div className={styles.conversation}>
            {
                currentConversation.messages.length > 0 &&
                <AiOutlineDownCircle onClick={scrollToBottom} className={styles.downBottom} size={50} />
            }
            <div ref={messagesRef} className={styles.messages}>
                {
                    currentConversation.messages.map((message) => {
                        const { message: msgContent, sender } = message
                        return (
                            <div key={message._id} className={user._id === sender._id ? styles.messageBlock : styles.otherMessageBlock}>
                                {
                                    msgContent.startsWith("https://res.cloudinary.com/")
                                        ?
                                        <div className={styles.imageBlock}>
                                            <img className={styles.picMsg} src={msgContent} alt="" />
                                            <div className={styles.donwload}>
                                                <Link target='_blank' to={msgContent} download onClick={(e) => e.stopPropagation()}>
                                                    <HiDownload size={20} color='black' />
                                                </Link>
                                            </div>
                                        </div>
                                        :
                                        msgContent.startsWith("blob")
                                            ?
                                            <audio controls src={msgContent}></audio>
                                            :
                                            <p className={user._id === message.sender._id ? styles.conversationMsg : styles.defaultMsg} >
                                                {msgContent}
                                            </p>
                                }
                                <div className={styles.avatarBlock}>
                                    <Link to={`/users/${sender._id}`}><img className={styles.avatar} src={sender.avatar} alt="" /></Link>
                                    <span>{getHumanHour(message.createdAt)}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className={styles.inputBlock}>
                <input onKeyDown={handleSubmit} value={msgValue} name='message' onChange={handleMessageChange} className={styles.chatInput} placeholder='Type a Message' type="text" />
                <BsFillSendFill onClick={(e) => handleSubmit(e, true)} className={styles.sendIcon} color='black' size={40} />
            </div>
            <div className={styles.invisibleImageInput}>
                <input onChange={handleFileInput} type="file" id='msgImage' />
                <label htmlFor="msgImage">
                    <AiFillPicture className={styles.picIcon} color='black' size={40} />
                </label>

                <AudioRecorder onRecordingComplete={addAudioElement} />
            </div>
            <BsFillEmojiLaughingFill onClick={() => setShowEmojis(!showEmojis)} className={styles.emojiIcon} color='black' size={40} />
            {showEmojis &&
                <div ref={pickerRef} className={styles.emojiPicker}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} suggestedEmojisMode={"recent"} emojiStyle='google' />
                </div>
            }
        </div>
    )
}

export default Conversation