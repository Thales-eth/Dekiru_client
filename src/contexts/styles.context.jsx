import React, { useState } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'

const StylesContext = createContext()

const StylesContextWrapper = (props) => {
    const [fadeOut, setFadeOut] = useState(false)
    const navigate = useNavigate()

    function handleNavigation() {
        window.scrollTo(0, 0)
    }

    function triggerFadeOut(link) {
        if (typeof link === "string" && link.startsWith("https://checkout.stripe.com")) {
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

    function triggerNavigation(link, e) {
        e.preventDefault()
        handleNavigation()
        navigate(link)
    }

    return (
        <StylesContext.Provider value={{ fadeOut, handleNavigation, triggerFadeOut, triggerNavigation }}>{props.children}</StylesContext.Provider>
    )
}

export { StylesContextWrapper, StylesContext }