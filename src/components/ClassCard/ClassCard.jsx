import styles from './ClassCard.module.css'
import classService from '../../services/class.service'
import CloseButton from '../CloseButton/CloseButton'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'

const ClassCard = ({ singleClass, setAllClasses, setAllClassesCopy }) => {

    const { title, description, teacher } = singleClass
    const { triggerFadeOut } = useContext(StylesContext)
    const { user } = useContext(AuthContext)

    async function deleteClass(id) {
        await classService.deleteClass(id).then(({ data }) => data)
        const allClases = await classService.getAllClasses(0).then(({ data }) => data)
        setAllClasses(allClases)
        setAllClassesCopy(allClases)
    }

    async function joinClass() {
        await classService.joinClass(singleClass._id, user._id)
        triggerFadeOut(`/class/${singleClass._id}`)
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

            <Link onClick={() => triggerFadeOut(teacher._id !== user._id ? `/class/${singleClass._id}` : "/profile")} >
                <div className={styles.info}>
                    <p>{title}</p>
                    <p className={styles.description}>{description}</p>
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
            </Link>

            <div className={styles.personDetails}>
                <Link onClick={() => triggerFadeOut(teacher._id === user._id ? '/profile' : `/class/${singleClass._id}`)}>
                    <img src={teacher.avatar} alt="avatar" />
                </Link>
                <p>{teacher.username}</p>
            </div>
        </div>
    )
}

export default ClassCard