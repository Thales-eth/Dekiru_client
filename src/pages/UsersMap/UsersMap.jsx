import styles from './UsersMap.module.css'
import userService from '../../services/user.service'
import Map from '../../components/Map/Map'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useRef, useState } from 'react'


const UsersMap = () => {

    const [nearUsers, setNearUsers] = useState([])
    const { user } = useContext(AuthContext)
    // const mapReference = useRef(null)

    useEffect(() => {
        loadNearestUsers()
    }, [])

    async function loadNearestUsers() {
        try {
            const nearestUsers = await userService.getNearUsers(user._id, user.location.coordinates).then(({ data }) => data)
            setNearUsers(nearestUsers)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.mapPage}>
            <h1>Closer Penfriends!</h1>
            <Map users={nearUsers} />
        </div>
    )
}

export default UsersMap