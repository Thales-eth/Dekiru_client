import styles from './CloseButton.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'

const CloseButton = ({ handleClick, size, color }) => {
    return (
        <AiFillCloseCircle onClick={handleClick} className={styles.closeBtn} color={color || "BC002D"} size={size} style={{ "zIndex": 1 }} />
    )
}

export default CloseButton