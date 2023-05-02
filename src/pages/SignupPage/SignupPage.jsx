import styles from './SignupPage.module.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import authService from '../../services/auth.service'
import UploadService from '../../services/upload.service'
import Errors from '../../components/Errors/Errors'
import Loader from '../../components/Loader/Loader'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StylesContext } from '../../contexts/styles.context'
import { ErrorContext } from '../../contexts/error.context'

const SignupPage = () => {

    const [canSee, setCanSee] = useState(false)
    const [userData, setUserData] = useState({ email: "", username: "", password: "", language: "", role: "Student", avatar: "", age: "", interests: [], location: { type: "Point", coordinates: [0, 0] } })
    const { errors, setErrors, errorRef } = useContext(ErrorContext)

    const { storeToken, authenticateUser } = useContext(AuthContext)
    const { handleNavigation } = useContext(StylesContext)

    const [showLoading, setShowLoading] = useState(false)

    const navigate = useNavigate()

    const changeVision = () => {
        setCanSee(!canSee)
    }

    useEffect(() => {
        if (errorRef.current && errors.length > 0) errorRef.current.scrollIntoView()
    }, [errors])

    useEffect(() => {
        handleNavigation()

        return () => {
            setErrors([])
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let cloudinaryLink = ""

        if (userData.avatar) {
            cloudinaryLink = await UploadService.uploadPhoto(userData.avatar).then(({ data }) => data)
        }

        try {
            const token = await authService.signup({ ...userData, avatar: cloudinaryLink }).then(({ data }) => data.authToken)
            setShowLoading(true)
            await storeToken(token)
            await authenticateUser()
            handleNavigation()
            navigate("/profile")
        }
        catch (error) {
            setShowLoading(false)
            setErrors(error.response.data.err)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    return (
        <>
            <div className={styles.signupPage}>
                {
                    !showLoading ?
                        <>
                            <h1>Signup</h1>
                            <SignUpForm showPassword={true} changeVision={changeVision} canSee={canSee} userData={userData}
                                setUserData={setUserData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
                            <Errors errorRef={errorRef} errors={errors} />
                        </>
                        :
                        <Loader />
                }
            </div>

        </>
    )
}

export default SignupPage