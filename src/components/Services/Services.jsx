import styles from './Services.module.css'
import HomeCard from '../HomeCard/HomeCard'
import CtaCard from '../CtaCard/CtaCard'
import SpainFlag from './assets/spain.png'
import JapanFlag from './assets/japan.png'

const Services = () => {
    return (
        <div className={styles.services}>
            <HomeCard link={"/posts"} src={JapanFlag} headerText={"Aprende Japonés con Nativos"} paragraph={"Chatea y practica japonés en conversaciones con gente como tú."} />
            <HomeCard link={"/posts"} src={SpainFlag} headerText={"他の人とスペイン<語しゃべりたい？"} paragraph={"スペイン人と練習しましょう"} />
            <CtaCard link={"/match"} />
        </div>
    )
}

export default Services