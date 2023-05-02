import InitAxios from "./init.service";

class ConversationService extends InitAxios {
    constructor() {
        super("conversation")

        this.api.interceptors.request.use(config => {
            const authToken = localStorage.getItem("authToken")

            if (authToken) {
                config.headers = { Authorization: `Bearer ${authToken}` }
            }

            return config
        })
    }

    getConversations() {
        return this.api.get("/list")
    }

    getUserConversations(userId) {
        return this.api.get(`/getUserConversations/${userId}`)
    }

    getOneConversation(id) {
        return this.api.get(`/getOne/${id}`)
    }

    joinConversation(participants) {
        return this.api.post(`/join`, { participants })
    }

    deleteConversation(id) {
        return this.api.delete(`/delete/${id}`)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ConversationService()
        }

        return this.instance
    }
}

export default ConversationService.getInstance()