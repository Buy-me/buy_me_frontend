import privateClient from "./client";

const foodEndpoints = {
    add: "/carts",
    get: "/my-cart"
};

const cartApi = {
    getMyCart: async () => {
        try {
            const response = await privateClient.get(foodEndpoints.get)
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    addToCart: async (params) => {
        console.log(params);
        try {
            
        }
        catch (err) {

        }
    }
}

export default cartApi