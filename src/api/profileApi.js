import privateClient from "./client";

const profileEndpoints = {
    get: "/profile",
};

const profileApi = {
    getProfile: async () => {
        try {
            const response = await privateClient.get(profileEndpoints.get)
            return { response }
        }
        catch (err) {
            return { err }
        }
    }
}

export default profileApi