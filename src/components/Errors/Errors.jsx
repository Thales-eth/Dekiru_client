import styles from './Errors.module.css'

const Errors = ({ errorRef, errors }) => {

    return (
        errors.length !== 0 &&
        <div ref={errorRef} className={styles.errors}>
            {
                errors.map(error => {
                    return (
                        <p key={error} className='error'>{error}</p>
                    )
                })
            }
        </div>
    )
}

export default Errors