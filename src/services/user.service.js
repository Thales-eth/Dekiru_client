import InitAxios from "./init.service";

class UserService extends InitAxios {
    constructor() {
        super("user")

        this.api.interceptors.request.use(config => {
            const authToken = localStorage.getItem("authToken")

            if (authToken) {
                config.headers = { Authorization: `Bearer ${authToken}` }
            }

            return config
        })
    }

    getHomePageStudents() {
        return this.api.get('/listHomeUsers')
    }

    getUserClasses(id) {
        return this.api.get(`/getUserClasses/${id}`)
    }

    getUserFriends(id) {
        return this.api.get(`/getUserFriends/${id}`)
    }

    getNearUsers(user_id, coordinates) {
        return this.api.post(`/getNearUsers/${user_id}`, { coordinates })
    }

    getMatch(id) {
        return this.api.get(`/getUserMatch/${id}`)
    }

    getOneUser(id) {
        return this.api.get(`/getOneUser/${id}`)
    }

    getPopulatedUser(id) {
        return this.api.get(`/getPopulatedUser/${id}`)
    }

    editOneUser(id, content) {
        return this.api.put(`/edit/${id}`, content)
    }

    followFriend(id, friendId) {
        return this.api.put(`/makeFriend/${friendId}/${id}`)
    }

    unfollowFriend(id, friendId) {
        return this.api.put(`/unfollow/${friendId}/${id}`)
    }

    deleteUser(id) {
        return this.api.delete(`/delete/${id}`)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService()
        }

        return this.instance
    }
}

export default UserService.getInstance()