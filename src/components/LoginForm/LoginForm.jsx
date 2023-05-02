import styles from './LoginForm.module.css'
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { StylesContext } from '../../contexts/styles.context'
import { useContext } from 'react'

const LoginForm = ({ changeVision, canSee, handleInputChange, handleSubmit, loginData }) => {

    const { email, password } = loginData
    const { handleNavigation } = useContext(StylesContext)

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div>
                <label htmlFor="email"></label>
                <input autoComplete='username' name='email' value={email} onChange={handleInputChange} autoFocus id='email' type="email" placeholder='Email' required />
            </div>

            <div className={styles.password}>
                <label htmlFor="password"></label>
                <input value={password} autoComplete="current-password" name='password' onChange={handleInputChange} id='password' type={!canSee ? "password" : "text"} placeholder='Password' required />
                {
                    canSee ?
                        <AiFillEye onClick={changeVision} className={styles.pwdLogo} color={"#BC002D"} size={34} />
                        :
                        <AiFillEyeInvisible onClick={changeVision} className={styles.pwdLogo} color={"#BC002D"} size={34} />
                }
            </div>

            <Link onClick={handleNavigation} to={"/signup"}><p className={styles.signupLink}>Haven't created your account yet?</p></Link>

            <button type='submit'>Submit</button>
        </form>
    )
}

export default LoginForm