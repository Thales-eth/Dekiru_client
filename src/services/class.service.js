import InitAxios from "./init.service";

class ClassService extends InitAxios {
    constructor() {
        super("class")

        this.api.interceptors.request.use(config => {
            const authToken = localStorage.getItem("authToken")

            if (authToken) {
                config.headers = { Authorization: `Bearer ${authToken}` }
            }

            return config
        })
    }

    getAllClasses(skipValue) {
        return this.api.get(`/list/${skipValue}`)
    }

    getOneClass(id) {
        return this.api.get(`/getOne/${id}`)
    }

    createClass(body) {
        return this.api.post(`/create`, body)
    }

    joinClass(classId, userId) {
        return this.api.put(`/join/${classId}/${userId}`)
    }

    leaveClass(classId, userId) {
        return this.api.put(`/leave/${classId}/${userId}`)
    }

    editClass(id, body) {
        return this.api.put(`/edit/${id}`, body)
    }

    deleteClass(classId) {
        return this.api.delete(`/delete/${classId}`)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ClassService()
        }

        return this.instance
    }
}

export default ClassService.getInstance()