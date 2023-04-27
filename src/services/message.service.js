import InitAxios from "./init.service";

class MessageService extends InitAxios {
    constructor() {
        super("message")
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