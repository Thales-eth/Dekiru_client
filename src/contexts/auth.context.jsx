import { createContext, useEffect, useState } from "react"
import authService from "../services/auth.service"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProviderWrapper = (props) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const authenticateUser = async () => {
        const token = localStorage.getItem("authToken")

        if (!token) {
            setIsLoading(false)
            return
        }

        try {
            const userData = await authService.getLoggedUser(token).then(({ data }) => data)
            setUser(userData)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }

    const getToken = () => {
        return localStorage.getItem("authToken")
    }

    const logout = async () => {
        await localStorage.removeItem("authToken")
        setUser(null)
        setIsLoading(false)
        navigate("/login")
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authenticateUser, user, setUser, logout, storeToken, getToken, isLoading, setIsLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }