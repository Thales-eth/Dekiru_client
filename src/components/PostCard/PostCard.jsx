import styles from './PostCard.module.css'
import CloseButton from '../CloseButton/CloseButton'
import { AiFillEdit } from 'react-icons/ai'
import postService from '../../services/post.service'
import { Link } from 'react-router-dom'
import { StylesContext } from '../../contexts/styles.context'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const PostCard = ({ post, setAllPosts, setPostsCopy }) => {

    const { title, description, author } = post
    const { triggerFadeOut } = useContext(StylesContext)
    const { user } = useContext(AuthContext)

    async function deletePost(id) {
        const filteredPosts = await postService.deletePost(id).then(({ data }) => data)
        setAllPosts(filteredPosts)
        setPostsCopy(filteredPosts)
    }

    return (
        <div className={styles.postCard}>
            {
                author._id === user._id &&
                <>
                    <CloseButton handleClick={() => deletePost(post._id)} size={20} color={"white"} />
                    <Link onClick={() => triggerFadeOut(`/posts/edit/${post._id}`)}><AiFillEdit className={styles.editBtn} size={20} color='white' /></Link>
                </>
            }
            <div className={styles.info}>
                <p>{title}</p>
                <p>{description}</p>
                <div className={styles.interests}>
                    {
                        author.interests.map(interest => {
                            return (
                                <div key={interest} className={styles.interest}>{interest}</div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={styles.personDetails}>
                <Link onClick={() => triggerFadeOut(author._id === user._id ? '/profile' : `/users/${author._id}`)}>
                    <img src={author.avatar} alt="avatar" />
                </Link>
                <p>{author.username}</p>
            </div>
        </div>
    )
}

export default PostCard