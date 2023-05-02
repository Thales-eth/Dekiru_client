import styles from './LoginPage.module.css'
import LoginForm from '../../components/LoginForm/LoginForm'
import authService from '../../services/auth.service'
import Errors from '../../components/Errors/Errors'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'
import { ErrorContext } from '../../contexts/error.context'
import { StylesContext } from '../../contexts/styles.context'

const LoginPage = () => {

    const { authenticateUser, storeToken } = useContext(AuthContext)
    const { handleNavigation } = useContext(StylesContext)

    const [canSee, setCanSee] = useState(false)
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const { errors, setErrors, errorRef } = useContext(ErrorContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (errorRef.current) errorRef.current.scrollIntoView()
    }, [errors])

    useEffect(() => {
        handleNavigation()

        return () => {
            setErrors([])
        }
    }, [])


    function handleInputChange(e) {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = await authService.login(loginData).then(({ data }) => data)
            const { authToken } = data
            await storeToken(authToken)
            await authenticateUser()
            navigate("/profile")
        }
        catch (error) {
            setErrors(error.response.data.err)
        }
    }

    const changeVision = () => {
        setCanSee(!canSee)
    }

    return (
        <div className={styles.loginPage}>
            <h1>Login</h1>
            <LoginForm loginData={loginData} changeVision={changeVision} canSee={canSee} setCanSee={setCanSee} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            <Errors errors={errors} errorRef={errorRef} />
        </div>
    )
}

export default LoginPage