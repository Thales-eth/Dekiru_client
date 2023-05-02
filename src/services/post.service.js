import InitAxios from "./init.service";

class PostService extends InitAxios {
    constructor() {
        super("post")

        this.api.interceptors.request.use(config => {
            const authToken = localStorage.getItem("authToken")

            if (authToken) {
                config.headers = { Authorization: `Bearer ${authToken}` }
            }

            return config
        })
    }

    getAllPosts(skipValue) {
        return this.api.get(`/list/${skipValue}`)
    }

    getSinglePost(post_id) {
        return this.api.get(`/list/getOnePost/${post_id}`)
    }

    createPost(body) {
        return this.api.post("/create", body)
    }

    editPost(id, body) {
        return this.api.put(`/edit/${id}`, body)
    }

    deletePost(id) {
        return this.api.delete(`/delete/${id}`)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new PostService()
        }

        return this.instance
    }
}

export default PostService.getInstance()

