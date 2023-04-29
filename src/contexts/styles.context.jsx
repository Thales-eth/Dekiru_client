import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { AuthContext } from './auth.context'
import { useNavigate } from 'react-router-dom'

const StylesContext = createContext()

const StylesContextWrapper = (props) => {
    const [fadeOut, setFadeOut] = useState(false)
    const { handleNavigation } = useContext(AuthContext)
    const navigate = useNavigate()

    function triggerFadeOut(link) {
        if (link.startsWith("https://checkout.stripe.com")) {
            window.open(link, "_blank");
            return
        }

        setFadeOut(true)
        setTimeout(() => {
            handleNavigation()
            navigate(link)
            setFadeOut(false)
        }, 200)
    }

    return (
        <StylesContext.Provider value={{ triggerFadeOut, fadeOut }}>{props.children}</StylesContext.Provider>
    )
}

export { StylesContextWrapper, StylesContext }