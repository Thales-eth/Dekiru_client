import styles from './PostsListPage.module.css'
import PostCard from '../../components/PostCard/PostCard'
import Finder from '../../components/Finder/Finder'
import StickyButton from '../../components/StickyButton/StickyButton'
import PostService from '../../services/post.service'
import Loader from '../../components/Loader/Loader'
import { NO_MORE_POSTS_MSG } from '../../consts'
import { StylesContext } from '../../contexts/styles.context'
import { useContext, useEffect, useState } from 'react'

const PostsListPage = () => {

    const { triggerFadeOut, fadeOut } = useContext(StylesContext)
    const [allPosts, setAllPosts] = useState([])
    const [postsCopy, setPostsCopy] = useState([])

    const [canShow, setCanShow] = useState(false)
    const [dontShow, setDontShow] = useState(false)
    const [page, setPage] = useState(0)

    function handleClick() {
        triggerFadeOut("/posts/create")
    }

    function changePage() {
        setPage(page => page + 4)
    }

    useEffect(() => {
        loadPosts()
    }, [page])

    useEffect(() => {
        setEventListeners()

        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [])

    function setEventListeners() {
        document.addEventListener("scroll", handleScroll)
    }

    function handleScroll() {
        if (dontShow) {
            document.removeEventListener("scroll", handleScroll)
            return
        }

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setCanShow(true)
            changePage()
        }
    }

    async function loadPosts() {
        const postsList = await PostService.getAllPosts(page).then(({ data }) => data)
        if (!postsList.length) {
            setDontShow(true)
            return
        }
        setCanShow(false)
        setAllPosts([...allPosts, ...postsList])
        setPostsCopy([...allPosts, ...postsList])
    }

    return (
        <div className={`${styles.postPage} ${fadeOut && styles.fadeOut}`}>
            <Finder postsCopy={postsCopy} title={"Posts"} setAllPosts={setAllPosts} />

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.posts}>
                    {
                        allPosts.length !== 0 && allPosts.map(post => {
                            return (
                                <PostCard setPostsCopy={setPostsCopy} setAllPosts={setAllPosts} key={post._id} post={post} />
                            )
                        })
                    }
                </div>
            </div>

            {
                (canShow && !dontShow)
                    ?
                    <Loader />
                    :
                    dontShow &&
                    <p className="noPosts">{NO_MORE_POSTS_MSG}</p>
            }

            <StickyButton text={"Create a Post"} handleClick={handleClick} />
        </div >
    )
}

export default PostsListPage