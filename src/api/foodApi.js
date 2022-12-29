import privateClient from "./client";

const foodEndpoints = {
  list: "/foods",
  get: "/foods",
  rating: (foodId) => `/foods/${foodId}/rating`,
};

const foodApi = {
  getList: async (params) => {
    console.log(params);
    try {
      const response = await privateClient.get(foodEndpoints.list, {
        params: {
          sort: params.sort,
          category_id: params.categoryId || 0,
          min_price: params.minPrice || 0,
          max_price: params.maxPrice || 0,
          rating: params.rating || 0,
          search: params.search || "",
        },
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  rating: async (foodId, data) => {
    try {
      const response = await privateClient.post(foodEndpoints.rating(foodId), {
        ...data,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default foodApi;
