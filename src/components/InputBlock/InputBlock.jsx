import styles from './InputBlock.module.css'

const InputBlock = ({ value, type, handleChange, inputValue }) => {
    return (
        <div>
            <label htmlFor={value}></label>
            <input className={styles.input} name={value} value={inputValue} onChange={handleChange} autoFocus id={value} type={type} placeholder={value} />
        </div>

    )
}

export default InputBlock