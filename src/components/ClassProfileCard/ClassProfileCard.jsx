import styles from './ClassProfileCard.module.css'
import CloseButton from '../CloseButton/CloseButton'
import classService from '../../services/class.service'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AiFillEdit } from 'react-icons/ai'

const ClassProfileCard = ({ singleClass, setProfileUser, photoWidth, photoHeight }) => {

    const { user } = useContext(AuthContext)
    const { triggerFadeOut } = useContext(StylesContext)

    async function deleteClass(singleClassId) {
        try {
            const updatedUser = await classService.leaveClass(singleClassId, user._id).then(({ data }) => data)
            setProfileUser(updatedUser)
        }
        catch (error) {
            console.log(error)
        }
    }

    function triggerActions() {
        triggerFadeOut(`/classes/edit/${singleClass._id}`)
    }

    function triggerClassNavigation() {
        triggerFadeOut(`/class/${singleClass._id}`)
    }

    async function leaveClass() {
        const updatedUser = await classService.leaveClass(singleClass._id, user._id).then(({ data }) => data)
        setProfileUser(updatedUser)
    }

    return (
        <div className={styles.classCard}>
            <div className={styles.icons}>
                {
                    user.role === "Teacher" &&
                    <>
                        <CloseButton handleClick={() => deleteClass(singleClass._id)} size={50} />
                        <Link className={styles.editIcon} onClick={triggerActions}><AiFillEdit size={50} className={styles.editBtn} /></Link>
                    </>
                }

                {
                    user.role === "Student" &&
                    <CloseButton handleClick={leaveClass} size={24} color={"red"} />
                }
            </div>

            <div className={styles.info}>
                <Link onClick={triggerClassNavigation}><p className={styles.title}>{singleClass?.title}</p></Link>
                <p>{singleClass?.text}</p>
            </div>

            <div className={styles.personInfo}>
                <img className={styles.cardPhoto} src={singleClass.teacher.avatar} alt="teacher" style={{ "width": photoWidth, "height": photoHeight }} />
                <br />
                <span>{singleClass.teacher.username}</span>
            </div>
        </div>
    )
}

export default ClassProfileCard