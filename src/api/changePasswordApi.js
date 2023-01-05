import privateClient from "./client";

const changePasswordEndpoints = {
    patch: "/change-password",
};

const changePasswordApi = {
    changePassword: async (data) => {
        try {
            const response = await privateClient.patch(changePasswordEndpoints.patch, {
                ...data
            })
            return { response }
        }
        catch (err) {
            return { err }
        }
    }
}

export default changePasswordApi