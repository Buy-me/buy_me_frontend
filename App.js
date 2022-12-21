import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from "./src/app/store";
import CustomDrawer from "./src/navigation/drawer/CustomDrawer";
import Success from "./src/screens/Cart/Success";
import DeliveryStatus from "./src/screens/Delivery/DeliveryStatus";
import FoodDetail from "./src/screens/Food/FoodDetail";
import MyCart from "./src/screens/Cart/MyCart";
import MyCard from "./src/screens/Card/MyCard";
import AddCard from "./src/screens/Card/AddCard";
import Checkout from "./src/screens/Cart/Checkout";
import MyAccount from "./src/screens/Account/MyAccount";
import { EditAccount } from "./src/screens";

const Stack = createNativeStackNavigator();

const App = () => {
	const [fontsLoaded] = useFonts({
		"Poppins-Black": require("./src/assets/fonts/Poppins-Black.ttf"),
		"Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
		"Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
		"Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName={"Home"}>
					<Stack.Screen name='Home' component={CustomDrawer} />
					<Stack.Screen name='FoodDetail' component={FoodDetail} />
					<Stack.Screen name='MyCart' component={MyCart} />
					<Stack.Screen name='MyCard' component={MyCard} />
					<Stack.Screen name='Add Card' component={AddCard} />
					<Stack.Screen name='Checkout' component={Checkout} />
					<Stack.Screen name="MyAccount" component={MyAccount} />
					<Stack.Screen name="EditAccount" component={EditAccount} />
					<Stack.Screen
						name='Success'
						component={Success}
						options={{ gestureEnabled: false }}
					/>
					<Stack.Screen
						name='Delivery Status'
						component={DeliveryStatus}
						options={{ gestureEnabled: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
