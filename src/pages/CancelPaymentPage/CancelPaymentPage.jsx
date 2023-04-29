import PaymentMsg from '../../components/PaymentMsg/PaymentMsg'
import styles from './CancelPaymentPage.module.css'

const CancelPaymentPage = () => {
    return (
        <PaymentMsg msg={"Payment cancelled!"} subMsg={"Check other classes:"} link={"/classes"} />
    )
}

export default CancelPaymentPage