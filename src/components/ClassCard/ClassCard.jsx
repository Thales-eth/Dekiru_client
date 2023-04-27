import styles from './ClassCard.module.css'
import classService from '../../services/class.service'
import CloseButton from '../CloseButton/CloseButton'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'


const ClassCard = ({ singleClass, setAllClasses }) => {

    const { title, description, teacher } = singleClass
    const { triggerFadeOut } = useContext(StylesContext)
    const { user } = useContext(AuthContext)

    async function deleteClass(id) {
        const filteredClasses = await classService.deleteClass(id, teacher._id).then(({ data }) => data)
        setAllClasses(filteredClasses)
    }

    async function joinClass() {
        await classService.joinClass(singleClass._id, user._id)
        triggerFadeOut('/profile')
    }

    return (
        <div className={styles.classCard}>
            {
                teacher._id === user._id &&
                <>
                    <CloseButton handleClick={() => deleteClass(singleClass._id)} size={20} color={"white"} />
                    <Link onClick={() => triggerFadeOut(`/classes/edit/${singleClass._id}`)}><AiFillEdit className={styles.editBtn} size={20} color='white' /></Link>
                </>
            }

            {
                user.role !== "Teacher" &&
                <BsFillBookmarkFill onClick={joinClass} color='white' className={styles.save} />
            }

            <div className={styles.info}>
                <p>{title}</p>
                <p>{description}</p>
                <div className={styles.interests}>
                    {
                        teacher.interests.map(interest => {
                            return (
                                <div key={interest} className={styles.interest}>{interest}</div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={styles.personDetails}>
                <Link onClick={() => triggerFadeOut(teacher._id === user._id ? '/profile' : `/users/${teacher._id}`)}>
                    <img src={teacher.avatar} alt="avatar" />
                </Link>
                <p>{teacher.username}</p>
            </div>
        </div>
    )
}

export default ClassCard