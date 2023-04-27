import styles from './MatchPage.module.css'
import Loader from '../../components/Loader/Loader'
import userService from '../../services/user.service'
import UserArticle from '../../components/UserArticle/UserArticle'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { Link } from 'react-router-dom'

const MatchPage = () => {

    const [canShow, setCanShow] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [isRevealed, setIsRevealed] = useState(false)
    const [match, setMatch] = useState(null)
    const { user } = useContext(AuthContext)
    const numbers = []
    for (let i = 0; i < 40; i++) numbers.push(i)

    useEffect(() => {
        if (user._id) {
            loadMatchUser()
        }
    }, [user])

    async function loadMatchUser() {
        const matchUser = await userService.getMatch(user._id).then(({ data }) => data)
        setCanShow(true)
        if (matchUser) {
            setMatch(matchUser)
        }
        else {
            setHasError(true)
        }
    }

    function handleReveal() {
        setIsRevealed(true)
    }

    return (
        <div className={styles.matchPage}>
            {
                !isRevealed ?
                    < div className={styles.confettiContainer}>
                        {
                            !canShow ?
                                <Loader />
                                :
                                !hasError
                                    ?
                                    <div className={styles.matchReveal}>
                                        <h1>It's a Match!</h1>
                                        <button onClick={handleReveal}>Reveal Match</button>
                                        {
                                            numbers.map(number => {
                                                const randomLeft = Math.floor(Math.random() * 100) + 1
                                                const randomTop = Math.floor(Math.random() * 100) + 1
                                                const style = { left: `${randomLeft}%`, top: `${randomTop}%` }

                                                return (
                                                    <div key={number} style={style} className={styles.confetti}></div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className={styles.noMatchMsg}>
                                        <p>No tienes Match ╯°□°）╯︵ ┻━┻</p>
                                        <Link to={"/profile/edit"} className={styles.link}>Forgotten adding interests?</Link>
                                    </div>
                        }
                    </div>
                    :
                    <div className={styles.matchBlock}>
                        {
                            match &&
                            <UserArticle link={`/users/${match?._id}`} user={match} />
                        }

                    </div>
            }
        </div >
    )
}

export default MatchPage
