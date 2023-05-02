import styles from './Students.module.css'
import UserService from '../../services/user.service'
import UserArticle from '../UserArticle/UserArticle'
import Loader from '../../components/Loader/Loader'
import { useEffect, useState } from 'react'

const Students = () => {
    const [students, setStudents] = useState([])

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
                            <UserArticle key={student._id} link={`/users/${student._id}`} user={student} />
                        )
                    })
                    :
                    <Loader />
            }
        </div>
    )
}

export default Students