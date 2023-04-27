import styles from './Finder.module.css'
import JapanFlag from '../../components/assets/japan.png'
import SpainFlag from '../../components/assets/spain.png'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { HiSearch } from 'react-icons/hi';
import { BiReset } from 'react-icons/bi'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useRef, useState } from 'react';
import userService from '../../services/user.service';

const Finder = ({ title, setAllPosts, postsCopy }) => {

    const [activeLanguage, setActiveLanguage] = useState(null)
    const { user } = useContext(AuthContext)

    const inputRef = useRef(null)

    const triggerLanguageFilter = (language) => {
        setActiveLanguage(language)

        const filteredByLanguagePosts = postsCopy.filter(post => post.author.language === language)
        setAllPosts(filteredByLanguagePosts)
    }

    const handleInputChange = (e) => {
        const { value } = e.target

        const filteredPosts = postsCopy.filter(post => {
            return (post.author.username.toLowerCase().startsWith(value.toLowerCase())
                || post.author.interests.map(interest => interest.toLowerCase()).includes(value.toLowerCase())
                || post.description.replaceAll(/[^a-zA-Z\s]/g, "").toLowerCase().split(" ").includes(value.toLowerCase())
                || post.title.replaceAll(/[^a-zA-Z\s]/g, "").toLowerCase().split(" ").includes(value.toLowerCase()))
        })
        setAllPosts(filteredPosts)
    }

    const resetFilters = () => {
        setAllPosts(postsCopy)
        setActiveLanguage(null)
        inputRef.current.value = ""
    }

    const filterByLocation = async () => {
        try {
            const nearByUsers = await userService.getNearUsers(user._id, user.location.coordinates).then(({ data }) => data)
            const nearByPosts = nearByUsers.map(({ posts }) => posts).flat()
            setAllPosts(nearByPosts)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.finder}>
            <h1>{title}</h1>
            <input ref={inputRef} onChange={handleInputChange} placeholder='Search interests, people or topics' type="text" />
            <HiSearch className={styles.magnifyingGlass} size={48} color='#A4A4A4' />
            <div className={styles.filters}>
                <div className={styles.flags}>
                    <img className={`${styles.flag} ${activeLanguage === "Spanish" ? styles.active : ""}`} onClick={() => triggerLanguageFilter("Spanish")} src={SpainFlag} alt="spanish" />
                    <img className={`${styles.flag} ${activeLanguage === "Japanese" ? styles.active : ""}`} onClick={() => triggerLanguageFilter("Japanese")} src={JapanFlag} alt="japanese" />
                    <BiReset onClick={resetFilters} className={styles.reset} size={100} />
                </div>

                <div className={styles.markerBlock}>
                    <FaMapMarkerAlt onClick={filterByLocation} className={styles.marker} size={100} color='black' />
                    <br />
                    <span>Near Me</span>
                </div>
            </div>
        </div>
    )
}

export default Finder