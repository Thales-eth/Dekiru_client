import CloseButton from '../../components/CloseButton/CloseButton'
import InputBlock from '../../components/InputBlock/InputBlock'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import TextArea from '../../components/TextArea/TextArea'
import styles from './ClassesEditPage.module.css'
import classService from '../../services/class.service'
import { StylesContext } from '../../contexts/styles.context'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

const ClassesEditPage = () => {

    const { triggerFadeOut, fadeOut } = useContext(StylesContext)
    const { class_id } = useParams()

    const [classInfo, setClassInfo] = useState({ title: "", description: "", teacher: "" })
    const { title, description } = classInfo

    function handleClick() {
        triggerFadeOut(-1)
    }

    useEffect(() => {
        loadClasses()
    }, [])

    async function loadClasses() {
        const singleClass = await classService.getOneClass(class_id).then(({ data }) => data)
        setClassInfo(singleClass)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setClassInfo({ ...classInfo, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await classService.editClass(class_id, classInfo)
        handleClick()
    }

    return (
        <div className={`${styles.classEditPage} ${fadeOut && styles.fadeOut}`}>
            <h1>Edit Class</h1>

            <form onSubmit={handleSubmit}>
                <InputBlock inputValue={title} handleChange={handleChange} type={"text"} value={"title"} />
                <TextArea inputValue={description} handleChange={handleChange} placeholder={"Description"} name={"description"} />
                <SubmitButton text={"Edit"} />
            </form>

            <CloseButton handleClick={handleClick} size={100} />

        </div>
    )
}

export default ClassesEditPage