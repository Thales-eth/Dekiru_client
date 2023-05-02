import InitAxios from "./init.service";

class MessageService extends InitAxios {
    constructor() {
        super("message")

        this.api.interceptors.request.use(config => {
            const authToken = localStorage.getItem("authToken")

            if (authToken) {
                config.headers = { Authorization: `Bearer ${authToken}` }
            }

            return config
        })
    }

    getConversationMessages(conversation_id) {
        return this.api.get(`/list/${conversation_id}`)
    }

    createMessage(conversation_id, message) {
        return this.api.post(`/create/${conversation_id}`, message)
    }

    deleteMessage(message_id, conversation_id) {
        return this.api.delete(`/delete/${message_id}/${conversation_id}`)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new MessageService()
        }

        return this.instance
    }
}

export default MessageService.getInstance()