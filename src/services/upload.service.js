import InitAxios from "./init.service";

class UploadService extends InitAxios {
    constructor() {
        super("upload")

        this.api.interceptors.request.use(config => {
            const authToken = localStorage.getItem("authToken")

            if (authToken) {
                config.headers = { Authorization: `Bearer ${authToken}` }
            }

            return config
        })
    }

    uploadPhoto(data) {
        return this.api.post("/", data)
    }

    uploadAudio(data) {
        return this.api.post("/audio", data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UploadService()
        }

        return this.instance
    }
}

export default UploadService.getInstance()