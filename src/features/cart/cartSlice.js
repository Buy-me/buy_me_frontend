import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [
		{
			food_id: 2,
			food_data: {
				id: 2,
				status: 1,
				created_at: "2022-12-22T09:58:34Z",
				updated_at: "2022-12-29T10:40:56Z",
				restaurant_id: 1,
				category_id: 7,
				name: "Chicken Drum Sticks (500g)",
				images: {
					id: 0,
					url: "http://food-delivery-tb.s3-website-ap-southeast-1.amazonaws.com/category/786384824.jpg",
					width: 750,
					height: 500,
					cloud_name: "s3",
					extension: ".jpg",
				},
				price: 3.2,
				description: "Drum sticks are definitely the finest part of chicken.",
				rating: 4.25,
			},
			quantity: 1,
			status: 1,
			created_at: "2022-12-26T09:28:14Z",
			updated_at: "2022-12-26T09:28:14Z",
		},
		{
			food_id: 3,
			food_data: {
				id: 3,
				status: 1,
				created_at: "2022-12-22T10:03:30Z",
				updated_at: "2023-01-01T11:08:05Z",
				restaurant_id: 1,
				category_id: 7,
				name: "Chicken Wings (500g)",
				images: {
					id: 0,
					url: "http://food-delivery-tb.s3-website-ap-southeast-1.amazonaws.com/category/721238428.jpg",
					width: 750,
					height: 500,
					cloud_name: "s3",
					extension: ".jpg",
				},
				price: 2.8,
				description: "Wings are definitely the finest part of chicken.",
				rating: 4.3235292,
			},
			quantity: 1,
			status: 1,
			created_at: "2022-12-26T09:37:04Z",
			updated_at: "2022-12-26T09:37:04Z",
		},
		{
			food_id: 4,
			food_data: {
				id: 4,
				status: 1,
				created_at: "2022-12-22T10:08:14Z",
				updated_at: "2023-01-01T07:28:31Z",
				restaurant_id: 1,
				category_id: 7,
				name: "Pork Rump (500g)",
				images: {
					id: 0,
					url: "http://food-delivery-tb.s3-website-ap-southeast-1.amazonaws.com/category/73244208.jpg",
					width: 750,
					height: 500,
					cloud_name: "s3",
					extension: ".jpg",
				},
				price: 6,
				description:
					" Pork butt, also known as Boston butt or pork shoulder, is a cut of meat from the upper portion of a pig's front shoulder",
				rating: 5,
			},
			quantity: 1,
			status: 1,
			created_at: "2022-12-29T09:26:43Z",
			updated_at: "2022-12-29T09:26:43Z",
		},
	],
	subTotal: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.products.push(action.payload);
		},
		setProductsCart: (state, action) => {
			state.products = [...action.payload];
		},
		setProductQuantity: (state, action) => {
			const result = action.payload;
			let index = state.products.findIndex(
				(item) => item.food_id === result.id
			);
			if (index > -1) {
				state.products[index].quantity = result.newQty;
			} else {
				console.log("ERROR! While updating quantity");
			}
		},
		setSubTotal: (state, action) => {
			state.subTotal = action.payload;
		},
		emptyCart: (state, action) => {
			state.products = [];
			state.subTotal = 0;
		},
	},
});

export const {
	addProduct,
	setSubTotal,
	setProductQuantity,
	setProductsCart,
	emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
