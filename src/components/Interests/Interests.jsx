import styles from './Interests.module.css'
import Interest from '../Interest/Interest'
import SectionHeader from '../SectionHeader/SectionHeader'

const Interests = ({ interests }) => {
    return (
        <div className={styles.interests}>
            <SectionHeader text={"Interests"} css={{ marginLeft: "220px", marginTop: "150px" }} />
            <div className={styles.interestTags}>
                {
                    interests.map(interest => {
                        return (
                            <Interest key={interest} interest={interest} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Interests