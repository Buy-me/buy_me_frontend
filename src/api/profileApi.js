import privateClient from "./client";

const profileEndpoints = {
    get: "/profile",
    patch: "/profile"
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
    },
    updateProfile: async (data) => {
        try {
            const response = await privateClient.patch(profileEndpoints.patch, {
                ...data
            })
            return { response }
        }
        catch (err) {
            return { err }
        }
    }
}

export default profileApi