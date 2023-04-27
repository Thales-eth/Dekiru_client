import styles from './Students.module.css'
import UserService from '../../services/user.service'
import UserArticle from '../UserArticle/UserArticle'
import Loader from '../../components/Loader/Loader'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { useEffect, useState } from 'react'

const Students = () => {
    const [students, setStudents] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getStudents()
    }, [])

    async function getStudents() {
        const users = await UserService.getHomePageStudents().then(({ data }) => data)
        setStudents(users)
    }

    return (
        <div className={styles.students}>
            {
                students.length ?
                    students.map(student => {
                        return (
                            user ?
                                <UserArticle key={student._id} link={user._id === student._id ? "/profile" : `/users/${student._id}`} user={student} />
                                :
                                <UserArticle key={student._id} link={`/login`} user={student} />
                        )
                    })
                    :
                    <Loader />
            }
        </div>
    )
}

export default Students