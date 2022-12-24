import privateClient from "./client";

const foodEndpoints = {
  list: "/foods",
  get: "/foods",
};

const foodApi = {
  getList: async (params) => {
    console.log(params);
    try {
      const response = await privateClient.get(foodEndpoints.list, {
        params: {
          sort: params.sort,
        },
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default foodApi;
