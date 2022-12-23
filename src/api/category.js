import privateClient from "../client/private.client";

const categoryEndpoints = {
  list: "/categories",
};

const categoryApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(categoryEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default categoryApi;
