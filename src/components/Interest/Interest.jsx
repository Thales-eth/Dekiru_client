import styles from './Interest.module.css'

const Interest = ({ interest }) => {
    return (
        <div className={styles.circleTag}>{interest}</div>
    )
}

export default Interest