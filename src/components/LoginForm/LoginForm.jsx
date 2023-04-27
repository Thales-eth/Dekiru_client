import styles from './LoginForm.module.css'
import { Link } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const LoginForm = ({ changeVision, canSee, handleInputChange, handleSubmit, loginData }) => {

    const { email, password } = loginData
    const { handleNavigation } = useContext(AuthContext)

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div>
                <label htmlFor="email"></label>
                <input name='email' value={email} onChange={handleInputChange} autoFocus id='email' type="email" placeholder='Email' required />
            </div>

            <div className={styles.password}>
                <label htmlFor=""></label>
                <input value={password} name='password' onChange={handleInputChange} id='password' type={!canSee ? "password" : "text"} placeholder='Password' required />
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