import { Platform } from "react-native";
import utils from "../utils";
import privateClient from "./client";

const profileEndpoints = {
    get: "/profile",
    patch: "/profile",
    postImage: "/upload"
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
    },
    uploadAvatar: async (data) => {
        console.log(data);

        let fileUrl = Platform.OS === "ios" ? data.url.replace('file://', '') : data.url
        let fileName = utils.utils.getFileName(fileUrl)
        let fileType = utils.utils.getFileType(fileUrl)
        // console.log(fileUrl);
        // console.log(fileType);

        const form = new FormData()
        form.append("file", {
            uri: fileUrl,
            name: fileName,
            type: fileType
        })
        // form.append("folder", "avatar")

        console.log(form);
        try {
            const response = await privateClient.post(profileEndpoints.postImage, form, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            return { response }
        }
        catch (err) {
            return { err }
        }
    }
}

export default profileApi