import styles from './PaymentMsg.module.css'
import { Link, useNavigate } from 'react-router-dom'

const PaymentMsg = ({ msg, subMsg, link }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.paymentMsg}>
            <h1>{msg}</h1>
            <p>{subMsg}</p>
            <Link onClick={(e) => {
                e.preventDefault()
                navigate(link)
            }
            }>Check classes</Link>
        </div >
    )
}

export default PaymentMsg