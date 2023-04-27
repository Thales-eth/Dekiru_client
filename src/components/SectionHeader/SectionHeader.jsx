import styles from './SectionHeader.module.css'

const SectionHeader = ({ text, css }) => {
    return (
        <h3 style={css}>{text}:</h3>
    )
}

export default SectionHeader