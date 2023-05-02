import styles from './Services.module.css'
import HomeCard from '../HomeCard/HomeCard'
import CtaCard from '../CtaCard/CtaCard'
import SpainFlag from './assets/spain.png'
import JapanFlag from './assets/japan.png'
import { SPANISH_CARD_TEXT, SPANISH_CARD_SUBTEXT, JAPANESE_CARD_TEXT, JAPANESE_CARD_SUBTEXT } from '../../consts/index'

const Services = () => {
    return (
        <div className={styles.services}>
            <HomeCard link={"/posts"} src={JapanFlag} headerText={SPANISH_CARD_TEXT} paragraph={SPANISH_CARD_SUBTEXT} />
            <HomeCard link={"/posts"} src={SpainFlag} headerText={JAPANESE_CARD_TEXT} paragraph={JAPANESE_CARD_SUBTEXT} />
            <CtaCard link={"/match"} />
        </div>
    )
}

export default Services