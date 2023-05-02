import InitAxios from "./init.service";

class ReviewService extends InitAxios {
    constructor() {
        super("review")

        this.api.interceptors.request.use(config => {
            const authToken = localStorage.getItem("authToken")

            if (authToken) {
                config.headers = { Authorization: `Bearer ${authToken}` }
            }

            return config
        })
    }

    getUserReviews(user_id) {
        return this.api.get(`/list/${user_id}`)
    }

    getSingleReview(review_id) {
        return this.api.get(`/getOneReview/${review_id}`)
    }

    createReview(body, user_id) {
        return this.api.post(`/create/${user_id}`, body)
    }

    editReview(body, review_id, reviewed_id) {
        return this.api.put(`/edit/${review_id}/${reviewed_id}`, body)
    }

    deleteReview(review_id, user_id) {
        return this.api.delete(`/delete/${review_id}/${user_id}`)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ReviewService()
        }

        return this.instance
    }
}

export default ReviewService.getInstance()