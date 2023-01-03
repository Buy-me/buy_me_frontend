import privateClient from "./client";

const userEndpoints = {
  login: "/authenticate",
  register: "/register",
  forgotPassword: "/forgot-password",
  profile: "/profile",
};

const userApi = {
  login: async (data) => {
    try {
      const response = await privateClient.post(userEndpoints.login, {
        ...data,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  register: async (data) => {
    try {
      const response = await privateClient.post(userEndpoints.register, {
        ...data,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  forgotPassword: async (data) => {
    try {
      const response = await privateClient.post(userEndpoints.forgotPassword, {
        ...data,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  profile: async () => {
    try {
      const response = await privateClient.get(userEndpoints.profile);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
