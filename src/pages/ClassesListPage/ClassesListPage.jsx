import styles from './ClassesListPage.module.css'
import classService from '../../services/class.service'
import StickyButton from '../../components/StickyButton/StickyButton'
import Loader from '../../components/Loader/Loader'
import ClassCard from '../../components/ClassCard/ClassCard'
import ClassFinder from '../../components/ClassFinder/ClassFinder'
import { NO_MORE_CLASSES_MSG } from '../../consts'
import { AuthContext } from '../../contexts/auth.context'
import { StylesContext } from '../../contexts/styles.context'
import { useContext, useEffect, useState } from 'react'

const ClassesListPage = () => {

    const { user } = useContext(AuthContext)
    const { triggerFadeOut, fadeOut } = useContext(StylesContext)
    const [allClasses, setAllClasses] = useState([])
    const [allClassesCopy, setAllClassesCopy] = useState([])
    const [canShow, setCanShow] = useState(false)
    const [dontShow, setDontShow] = useState(false)
    const [page, setPage] = useState(0)

    function handleClick() {
        triggerFadeOut("/classes/create")
    }

    function changePage() {
        setPage(page => page + 4)
    }

    useEffect(() => {
        loadClasses()
    }, [page])

    useEffect(() => {
        setEventListeners()

        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [])

    function setEventListeners() {
        document.addEventListener("scroll", handleScroll)
    }

    function handleScroll() {
        if (dontShow) {
            document.removeEventListener("scroll", handleScroll)
            return
        }

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setCanShow(true)
            changePage()
        }
    }

    async function loadClasses() {
        const classesList = await classService.getAllClasses(page).then(({ data }) => data)

        if (!classesList.length) {
            setDontShow(true)
            return
        }

        setCanShow(false)
        setAllClasses([...allClasses, ...classesList])
        setAllClassesCopy([...allClasses, ...classesList])
    }

    return (
        <div className={`${styles.classListPage} ${fadeOut && styles.fadeOut}`}>
            <ClassFinder allClassesCopy={allClassesCopy} setAllClasses={setAllClasses} />

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.classes}>
                    {
                        allClasses.map(singleClass => {
                            return (
                                <ClassCard key={singleClass._id} singleClass={singleClass} setAllClasses={setAllClasses} setAllClassesCopy={setAllClassesCopy} />
                            )
                        })
                    }
                </div>
            </div>

            {
                (canShow && !dontShow)
                    ?
                    <Loader />
                    :
                    dontShow &&
                    <p className="noPosts">{NO_MORE_CLASSES_MSG}</p>
            }


            {
                user.role === "Teacher" &&
                <StickyButton handleClick={handleClick} text={"Create a Class"} />
            }
        </div>
    )
}

export default ClassesListPage