const screens = {
  main_layout: "MainLayout",
  home: "Home",
  search: "Search",
  cart: "Cart",
  favourite: "Favourite",
  notification: "My Address",
  settings: "Settings",
  my_wallet: "My Wallet",
};

const placeHolderInputs = {
  string: "Not updated",
  number: 0
}

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.search,
  },
  // {
  //   id: 2,
  //   label: screens.cart,
  // },
  {
    id: 2,
    label: screens.favourite,
  },
  {
    id: 3,
    label: screens.settings,
  },
];

const delivery_time = [
  {
    id: 1,
    label: "10 Mins",
  },
  {
    id: 2,
    label: "20 Mins",
  },
  {
    id: 3,
    label: "30 Mins",
  },
];

const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

const tags = [
  {
    id: 1,
    label: "Burger",
  },
  {
    id: 2,
    label: "Fast Food",
  },
  {
    id: 3,
    label: "Pizza",
  },
  {
    id: 4,
    label: "Asian",
  },
  {
    id: 5,
    label: "Dessert",
  },
  {
    id: 6,
    label: "Breakfast",
  },
  {
    id: 7,
    label: "Vegetable",
  },
  {
    id: 8,
    label: "Taccos",
  },
];

const track_order_status = [
  {
    title: "Order Pending",
    sub_title: "Your order is waiting for confirmed",
  },
  {
    title: "Order preparing",
    sub_title: "Your order is being prepared",
  },
  {
    title: "On the way",
    sub_title: "Hang on! Your food is on the way",
  },
  {
    title: "Delivered",
    sub_title: "Enjoy your meal!",
  },
];

export default {
  screens,
  bottom_tabs,
  delivery_time,
  ratings,
  tags,
  track_order_status,
  placeHolderInputs
};
