import { AiFillStar } from 'react-icons/ai'

function getStars(rating, size = 24) {

    if (typeof rating !== "string") rating = rating.toString()

    const stars = Array.from({ length: Number(rating) }, (_, index) => {
        return <AiFillStar size={size} color='#FFE234' key={index} />
    })

    return stars
}

export default getStars