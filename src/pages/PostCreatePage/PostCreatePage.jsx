import styles from './PostCreatePage.module.css'
import InputBlock from '../../components/InputBlock/InputBlock'
import TextArea from '../../components/TextArea/TextArea'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import CloseButton from '../../components/CloseButton/CloseButton'
import postService from '../../services/post.service'
import { useEffect, useState } from 'react'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'

const PostCreatePage = () => {

    const { user } = useContext(AuthContext)
    const { triggerFadeOut, fadeOut } = useContext(StylesContext)

    const [postInfo, setPostInfo] = useState({ title: "", description: "", author: "" })
    const { title, description } = postInfo

    function handleClick() {
        triggerFadeOut("/posts")
    }

    useEffect(() => {
        setPostInfo({ ...postInfo, author: user })
    }, [user])

    function handleChange(e) {
        const { name, value } = e.target
        setPostInfo({ ...postInfo, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await postService.createPost(postInfo)
        handleClick()
    }

    return (
        <div className={`${styles.postCreationPage} ${fadeOut && styles.fadeOut}`}>
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>
                <InputBlock inputValue={title} handleChange={handleChange} type={"text"} value={"title"} />
                <TextArea inputValue={description} handleChange={handleChange} placeholder={"Description"} name={"description"} />
                <SubmitButton text={"Create"} />
            </form>

            <CloseButton handleClick={handleClick} size={100} />

        </div>
    )
}

export default PostCreatePage