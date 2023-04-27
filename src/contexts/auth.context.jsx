import { createContext, useEffect, useState } from "react"
import authService from "../services/auth.service"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProviderWrapper = (props) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const handleNavigation = () => {
        window.scrollTo(0, 0)
    }

    const authenticateUser = async () => {
        const token = localStorage.getItem("authToken")

        if (token) {
            try {
                const userData = await authService.getLoggedUser(token).then(({ data }) => data)
                setIsLoading(false)
                setUser(userData)
            }
            catch (error) {
                setIsLoading(false)
                logout()
            }
        }

        else {
            setIsLoading(false)
        }
    }

    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }

    const logout = async () => {
        await localStorage.removeItem("authToken")
        await setUser(null)
        navigate("/login")
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authenticateUser, user, setUser, logout, storeToken, isLoading, setIsLoading, handleNavigation }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }