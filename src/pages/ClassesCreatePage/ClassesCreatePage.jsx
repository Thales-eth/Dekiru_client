import styles from './ClassesCreatePage.module.css'
import InputBlock from '../../components/InputBlock/InputBlock'
import TextArea from '../../components/TextArea/TextArea'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import CloseButton from '../../components/CloseButton/CloseButton'
import classService from '../../services/class.service'
import { useEffect, useState } from 'react'
import { StylesContext } from '../../contexts/styles.context'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'

const ClassesCreatePage = () => {
    const [classInfo, setClassInfo] = useState({ title: "", description: "", teacher: "" })
    const { title, description } = classInfo
    const { user } = useContext(AuthContext)
    const { triggerFadeOut, fadeOut } = useContext(StylesContext)

    function handleClick() {
        triggerFadeOut("/classes")
    }

    useEffect(() => {
        setClassInfo({ ...classInfo, teacher: user })
    }, [user])

    function handleChange(e) {
        const { name, value } = e.target
        setClassInfo({ ...classInfo, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await classService.createClass(classInfo)
        handleClick()
    }

    return (
        <div className={`${styles.classCreationPage} ${fadeOut && styles.fadeOut}`}>
            <h1>Create Class</h1>

            <form onSubmit={handleSubmit}>
                <InputBlock handleChange={handleChange} inputValue={title} type={"text"} value={"title"} />
                <TextArea handleChange={handleChange} inputValue={description} placeholder={"Description"} name={"description"} />
                <SubmitButton text={"Create"} />
            </form>

            <CloseButton handleClick={handleClick} size={100} />
        </div>
    )
}

export default ClassesCreatePage