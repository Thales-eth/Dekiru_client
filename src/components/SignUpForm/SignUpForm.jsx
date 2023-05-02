import styles from './SignUpForm.module.css'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useEffect, useRef, useState } from 'react'
import { TiDelete } from 'react-icons/ti'

const SignUpForm = ({ changeVision, canSee, userData, setUserData, handleSubmit, handleInputChange, showPassword }) => {

    const { email, username, password, age, language, interests, location } = userData

    const interestsInputRef = useRef(null);
    const [canAdd, setCanAdd] = useState(true)

    const handleFlagChange = (value) => {
        setUserData({ ...userData, language: value })
    }

    const handleFileUpload = (e) => {
        const picture = e.target.files[0]
        const uploadData = new FormData()

        uploadData.append("imageUrl", picture)

        setUserData({ ...userData, avatar: uploadData })
    }

    const handleInterestSubmit = async (e) => {
        e.preventDefault()
        if (userData.interests.length === 3) return
        const { value } = interestsInputRef.current
        await setUserData({ ...userData, interests: [...interests, value] })
        interestsInputRef.current.value = ""
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleInterestSubmit(e)
        }
    }

    const removeInterest = (userInterest) => {
        setUserData({ ...userData, interests: interests.filter(interest => interest !== userInterest) })
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude
                setUserData({ ...userData, location: { ...location, coordinates: [latitude, longitude] } })
            })
        }
    }

    useEffect(() => {
        if (interests.length === 3) setCanAdd(false)
        else {
            setCanAdd(true)
        }
    }, [interests])

    return (
        <form onSubmit={handleSubmit} className={styles.signupForm}>
            <div>
                <label htmlFor="username"></label>
                <input autoFocus name='username' value={username} onChange={handleInputChange} id='username' type="text" placeholder='Username' />
            </div>

            <div>
                <label htmlFor="age"></label>
                <input name='age' min={16} value={age} onChange={handleInputChange} id='age' type="number" placeholder='Age' />
            </div>

            <div>
                <label htmlFor="email"></label>
                <input name='email' value={email} autoComplete='username' onChange={handleInputChange} id='email' type="text" placeholder='Email' />
            </div>

            {
                showPassword &&
                <div className={styles.password}>
                    <label htmlFor=""></label>
                    <input autoComplete='current-password' name='password' value={password} onChange={handleInputChange} id='password' type={!canSee ? "password" : "text"} placeholder='Password' />
                    {
                        canSee ?
                            <AiFillEye onClick={changeVision} className={styles.pwdLogo} color={"#BC002D"} size={34} />
                            :
                            <AiFillEyeInvisible onClick={changeVision} className={styles.pwdLogo} color={"#BC002D"} size={34} />
                    }
                </div>
            }

            <div className={styles.interestInput}>
                <label htmlFor="interests"></label>
                <input onKeyDown={handleEnter} ref={interestsInputRef} name='interests' id='interests' type="text" placeholder='Add Interest' />
                {
                    canAdd ?
                        <div className={styles.interestBtn} onClick={handleInterestSubmit}>Add</div>
                        :
                        <p className={styles.limit}>Limit Reached!</p>
                }
            </div>

            <div className={styles.interests}>
                {
                    interests.map(interest => {
                        return (
                            <p className={styles.interest} key={interest}>{interest}
                                <TiDelete onClick={() => removeInterest(interest)} color='#bc002d' size={48} className={styles.limitDeleter}></TiDelete>
                            </p>
                        )
                    })
                }
            </div>

            <div className={styles.language} >
                <p>What is your native Language?</p>
                <div className={styles.languages}>
                    <div onClick={() => handleFlagChange("Spanish")} className={`${styles.spanish} ${language === "Spanish" && styles.active}`}></div>
                    <div onClick={() => handleFlagChange("Japanese")} className={`${styles.japanese} ${language === "Japanese" && styles.active}`}></div>
                </div>
            </div>

            <div className={styles.locationBtn} onClick={getLocation}>Share Location</div>

            <div className={styles.role} >
                <p>What's your role?</p>
                <select defaultValue={userData.role || "Student"} onChange={handleInputChange} name="role" id="role">
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>
            </div>

            <div className={styles.avatar}>
                <input
                    className={styles.fileInput}
                    name='avatar'
                    onChange={handleFileUpload}
                    id='avatar'
                    type="file"
                    placeholder='avatar'
                />
                <label htmlFor='avatar' className={styles.fileInputLabel}>
                    Upload Avatar
                </label>
            </div>

            <button type='submit'>Submit</button>
        </form >
    )
}

export default SignUpForm