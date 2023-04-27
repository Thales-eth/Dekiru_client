import styles from './SignupPage.module.css'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import authService from '../../services/auth.service'
import UploadService from '../../services/upload.service'
import Errors from '../../components/Errors/Errors'
import Loader from '../../components/Loader/Loader'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

    const [canSee, setCanSee] = useState(false)
    const [userData, setUserData] = useState({ email: "", username: "", password: "", language: "", role: "Student", avatar: "", age: "", interests: [], location: { type: "Point", coordinates: [0, 0] } })
    const [showLoading, setShowLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const { storeToken, authenticateUser, handleNavigation } = useContext(AuthContext)
    const navigate = useNavigate()
    const errorRef = useRef(null)

    const changeVision = () => {
        setCanSee(!canSee)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowLoading(true)
        handleNavigation()
        let cloudinaryLink = ""
        if (userData.avatar) {
            cloudinaryLink = await UploadService.uploadPhoto(userData.avatar).then(({ data }) => data)
        }
        userData.avatar = cloudinaryLink
        try {
            const token = await authService.signup(userData).then(({ data }) => data.authToken)
            await storeToken(token)
            await authenticateUser()
            handleNavigation()
            navigate("/profile")
        }
        catch (error) {
            setErrors(error.response.data.err)
        }
    }

    useEffect(() => {
        if (errors.length) errorRef.current.scrollIntoView()
    }, [errors])

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
                            {
                                errors.length !== 0 &&
                                <Errors errorRef={errorRef} errors={errors} />
                            }
                        </>
                        :
                        <Loader />
                }
            </div>

        </>
    )
}

export default SignupPage