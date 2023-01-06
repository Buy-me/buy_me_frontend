import privateClient from "./client";

const cardEndpoints = {
    add: "/cards",
    get: "/my-card",
};

const cardApi = {
    getMyCard: async () => {
        try {
            const response = await privateClient.get(cardEndpoints.get)
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    addCard: async (data) => {
        try {
            const response = await privateClient.post(cardEndpoints.add, {
                ...data
            })
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
}

export default cardApi

