import InputBlock from '../../components/InputBlock/InputBlock'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import TextArea from '../../components/TextArea/TextArea'
import styles from './ContactPage.module.css'

const ContactPage = () => {
    return (
        <div className={styles.contactPage}>
            <h1>Contact us</h1>

            <form>
                <InputBlock type={"text"} value={"name"} />
                <InputBlock type={"email"} value={"email"} />
                <TextArea placeholder={"Subject"} />
                <SubmitButton text={"Submit"} />
            </form>
        </div>
    )
}

export default ContactPage