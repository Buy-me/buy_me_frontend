import privateClient from "./client";

const userEndpoints = {
  login: "/authenticate",
  register: "/register",
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
};

export default userApi;
