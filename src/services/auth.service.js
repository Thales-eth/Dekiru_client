import InitAxios from "./init.service";

class AuthService extends InitAxios {
    constructor() {
        super('auth')
    }

    signup(body) {
        return this.api.post("/signup", body)
    }

    login(body) {
        return this.api.post("/login", body)
    }

    getLoggedUser(token) {
        const headers = { Authorization: `Bearer ${token}` }

        return this.api.get("/getLoggedUser", { headers })
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService()
        }

        return this.instance
    }
}

export default AuthService.getInstance()