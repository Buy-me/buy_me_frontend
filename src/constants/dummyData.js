import icons from "./icons";
import images from "./images";

const myProfile = {
	name: "ByThaiBinh",
	profile_image: images.profile,
	address: "No. 88, Jln Padungan, Kuching",
};

const sizes = [
	{
		id: 0,
		label: `12"`,
	},
	{
		id: 1,
		label: `14"`,
	},
	{
		id: 2,
		label: `16"`,
	},
	{
		id: 3,
		label: `18"`,
	},
];

const categories = [
	{
		id: 1,
		name: "Fast Food",
		icon: icons.burger,
	},
	{
		id: 2,
		name: "Fruit Item",
		icon: icons.cherry,
	},
	{
		id: 3,
		name: "Rice Item",
		icon: icons.rice,
	},
];

const hamburger = {
	id: 1,
	name: "Hamburger",
	description: "Chicken patty hamburger",
	categories: [1, 2],
	price: 15.99,
	calories: 78,
	isFavourite: true,
	image: require("../assets/dummyData/hamburger.png"),
};

const hotTacos = {
	id: 2,
	name: "Hot Tacos",
	description: "Mexican tortilla & tacos",
	categories: [1, 3],
	price: 10.99,
	calories: 78,
	isFavourite: false,
	image: require("../assets/dummyData/hot_tacos.png"),
};

const vegBiryani = {
	id: 3,
	name: "Veg Biryani",
	description:
		"Indian Vegetable Biryani Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
	categories: [1, 2, 3],
	price: 10.99,
	calories: 78,
	isFavourite: true,
	image: require("../assets/dummyData/veg_biryani.png"),
};

const wrapSandwich = {
	id: 4,
	name: "Wrap Sandwich",
	description: "Grilled vegetables sandwich",
	categories: [1, 2],
	price: 10.99,
	calories: 78,
	isFavourite: true,
	image: require("../assets/dummyData/wrap_sandwich.png"),
};

const myCart = [
	{
		qty: 1,
		...wrapSandwich,
	},
	{
		qty: 2,
		...vegBiryani,
	},
	{
		qty: 3,
		...hotTacos,
	},
];

const menu = [
	{
		id: 1,
		name: "Newest",
		list: [hamburger, hotTacos, wrapSandwich],
		sort: "id desc",
	},
	{
		id: 2,
		name: "Trending",
		list: [hamburger, hotTacos, wrapSandwich],
		sort: "id desc",
	},
	{
		id: 3,
		name: "Price High to Low",
		list: [hamburger, vegBiryani, wrapSandwich],
		sort: "price desc",
	},
	{
		id: 4,
		name: "Price Low to High",
		list: [hamburger, vegBiryani, wrapSandwich],
		sort: "price asc",
	},
];

const myCards = [
	{
		id: 0,
		name: "Google Pay",
		icon: icons.google,
		card_no: "0123456789",
	},
	{
		id: 1,
		name: "Visa",
		icon: icons.visa,
		card_no: "0123456789",
	},
];

const cardsIcon = {
	["Apple Pay"]: require("../assets/icons/apple.png"),
	["Visa"]: require("../assets/icons/visa.png"),
	["PayPal"]: require("../assets/icons/paypal.png"),
	["Google Pay"]: require("../assets/icons/google.png"),
	["Master Card"]: require("../assets/icons/mastercard.png"),
};

const allCards = [
  {
      id: 1,
      name: "Apple Pay",
      icon: require("../assets/icons/apple.png")
  },
  {
      id: 2,
      name: "Visa",
      icon: require("../assets/icons/visa.png"),
  },
  {
      id: 3,
      name: "PayPal",
      icon: require("../assets/icons/paypal.png"),
  },
  {
      id: 4,
      name: "Google Pay",
      icon: require("../assets/icons/google.png"),
  },
  {
      id: 5,
      name: "Master Card",
      icon: require("../assets/icons/mastercard.png"),
  },
]


export default {
	myProfile,
	categories,
	menu,
	vegBiryani,
	sizes,
	myCart,
	myCards,
	cardsIcon,
  allCards
};
