import { Platform } from "react-native";
import utils from "../utils";
import privateClient from "./client";
import publicClient from "./publicClient";

const profileEndpoints = {
  get: "/profile",
  patch: "/profile",
  postImage: "/upload",
};

const profileApi = {
  getProfile: async () => {
    try {
      const response = await privateClient.get(profileEndpoints.get);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateProfile: async (data) => {
    try {
      const response = await privateClient.patch(profileEndpoints.patch, {
        ...data,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  uploadAvatar: async (avatar) => {
    let formData = new FormData();

    formData.append("file", avatar);
    formData.append("folder", "avatar");

    try {
      const response = await publicClient.post(
        profileEndpoints.postImage,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default profileApi;
