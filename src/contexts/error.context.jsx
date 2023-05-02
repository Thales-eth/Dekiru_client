import { createContext, useRef, useState } from "react"

const ErrorContext = createContext()

const ErrorWrapper = (props) => {

    const [errors, setErrors] = useState([])
    const errorRef = useRef(null)

    return (
        <ErrorContext.Provider value={{ errors, setErrors, errorRef }}>{props.children}</ErrorContext.Provider>
    )
}

export { ErrorContext, ErrorWrapper }