import styles from './ClassFinder.module.css'
import JapanFlag from '../../components/assets/japan.png'
import SpainFlag from '../../components/assets/spain.png'
import userService from '../../services/user.service'
import { useContext, useRef, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { HiSearch } from 'react-icons/hi';
import { BiReset } from 'react-icons/bi'
import { AuthContext } from '../../contexts/auth.context'

const ClassFinder = ({ setAllClasses, allClassesCopy }) => {

    const { user } = useContext(AuthContext)
    const [activeLanguage, setActiveLanguage] = useState(null)

    const inputRef = useRef(null)

    const triggerLanguageFilter = (language) => {
        setActiveLanguage(language)

        const classesFilteredByLanguage = allClassesCopy.filter(singleClass => singleClass.teacher.language === language)
        setAllClasses(classesFilteredByLanguage)
    }

    const handleInputChange = (e) => {
        const { value } = e.target

        const filteredClasses = allClassesCopy.filter(singleClass => {
            return (singleClass.teacher.username.toLowerCase().startsWith(value.toLowerCase())
                || singleClass.teacher.interests.map(interest => interest.toLowerCase()).includes(value.toLowerCase())
                || singleClass.description.replaceAll(/[^a-zA-Z\s]/g, "").toLowerCase().split(" ").includes(value.toLowerCase())
                || singleClass.title.replaceAll(/[^a-zA-Z\s]/g, "").toLowerCase().split(" ").includes(value.toLowerCase()))
        })
        setAllClasses(filteredClasses)
    }

    const resetFilters = () => {
        setAllClasses(allClassesCopy)
        setActiveLanguage(null)
        inputRef.current.value = ""
    }

    const filterByLocation = async () => {
        try {
            const nearByUsers = await userService.getNearUsers(user._id, user.location.coordinates).then(({ data }) => data)
            const nearByClasses = nearByUsers.map(({ classes }) => classes).flat()
            setAllClasses(nearByClasses)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.finder}>
            <h1>Classes</h1>
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

export default ClassFinder