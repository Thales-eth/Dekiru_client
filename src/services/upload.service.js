import InitAxios from "./init.service";

class UploadService extends InitAxios {
    constructor() {
        super("upload")
    }

    uploadPhoto(data) {
        return this.api.post("/", data)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UploadService()
        }

        return this.instance
    }
}

export default UploadService.getInstance()