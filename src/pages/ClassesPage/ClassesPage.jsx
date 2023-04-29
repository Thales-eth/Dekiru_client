import styles from './ClassesPage.module.css'
import classService from '../../services/class.service'
import Welcome from '../../components/Welcome/Welcome'
import UserInfo from '../../components/UserInfo/UserInfo'
import ReviewsSection from '../../components/ReviewsSection/ReviewsSection'
import stripeService from '../../services/stripe.service'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { StylesContext } from '../../contexts/styles.context'

const ClassesPage = () => {

    const [singleClass, setSingleClass] = useState({ teacher: { avatar: "", username: "", score: 0 }, title: "", description: "" })
    const [userData, setUserData] = useState({ username: "", avatar: "", interests: [], score: 0, reviews: [], penfriends: [] })
    const [stripePaymentInfo, setStripePaymentInfo] = useState({ url: "" })
    const { url } = stripePaymentInfo
    const { fadeOut, triggerFadeOut } = useContext(StylesContext)

    const { teacher, title } = singleClass
    const { id } = useParams()

    useEffect(() => {
        loadClass()
        loadPayment()
    }, [])

    function handleClick() {
        triggerFadeOut(`/reviews/create/${id}`)
    }

    async function loadClass() {
        const singleClass = await classService.getOneClass(id).then(({ data }) => data)
        setSingleClass(singleClass)
        setUserData(singleClass.teacher)
    }

    async function loadPayment() {
        const paymentInfo = await stripeService.createPaymentSession().then(({ data }) => data)
        setStripePaymentInfo(paymentInfo)
    }

    return (
        <div className={styles.classPlage}>
            <div className="banner">
                <Welcome link={url} message={`${title} with`} user={teacher} buttonText={"Book Class"} />
                <UserInfo user={teacher} ProfilePic={teacher.avatar} />
            </div>

            <ReviewsSection showReview={true} setUserData={setUserData} userData={userData} handleClick={handleClick} />

        </div>
    )
}

export default ClassesPage