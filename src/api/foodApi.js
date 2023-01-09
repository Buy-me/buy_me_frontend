import privateClient from "./client";

const foodEndpoints = {
  list: "/foods",
  get: (foodId) => `/foods/${foodId}`,
  rating: (foodId) => `/foods/${foodId}/rating`,
  listRatingFood: (foodId) => `/foods/${foodId}/rating/list`,
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
          limit: 3,
        },
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getList: async (pagination, filters, categoryId, sort) => {
    try {
      const response = await privateClient.get(foodEndpoints.list, {
        params: {
          limit: pagination.limit,
          page: pagination.page,
          search: filters.search,
          rating: filters.rating,
          min_price: filters.minPrice,
          max_price: filters.maxPrice,
          category_id: categoryId || 0,
          sort: sort,
        },
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getPopularList: async () => {
    try {
      const response = await privateClient.get(foodEndpoints.list, {
        params: {
          limit: 4,
          sort: "updated_at desc",
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
  getRatingList: async (foodId) => {
    try {
      const response = await privateClient.get(
        foodEndpoints.listRatingFood(foodId)
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  get: async (foodId) => {
    try {
      const response = await privateClient.get(foodEndpoints.get(foodId));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default foodApi;
