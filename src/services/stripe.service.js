import InitAxios from "./init.service";

class StripeService extends InitAxios {
    constructor() {
        super("payment")
    }

    createPaymentSession() {
        // AQUÍ YO NECESITARÉ EL PRICE ID CUANDO LO HAGA DE MANERA PROGRAMÁTICA
        return this.api.post("/create-checkout-session")
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new StripeService()
        }

        return this.instance
    }
}

export default StripeService.getInstance()