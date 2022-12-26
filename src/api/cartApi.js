import privateClient from "./client";

const cartEndpoints = {
  addToCart: "/carts",
};

const cartApi = {
  addItemToCart: async (data) => {
    try {
      const response = await privateClient.post(cartEndpoints.addToCart, {
        ...data,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default cartApi;
