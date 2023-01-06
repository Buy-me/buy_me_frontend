import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { CardItem, Header, IconButton, TextButton } from "../../component";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import cardApi from "../../api/cardApi";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useEffect } from "react";

const MyWallet = ({ navigation }) => {
	const isDrawerOpen = useDrawerStatus() === "open";
	const scaleAnim = useSharedValue(1);
	const borderAnim = useSharedValue(1);
	useEffect(() => {
		if (isDrawerOpen) {
			scaleAnim.value = 0.8;
			borderAnim.value = 30;
		} else {
			scaleAnim.value = 1;
			borderAnim.value = 1;
		}
	}, [isDrawerOpen]);
	const style = useAnimatedStyle(() => {
		return {
			borderRadius: borderAnim.value,
			transform: [
				{
					scale: withTiming(scaleAnim.value, {
						// duration: 100,
					}),
				},
			],
		};
	});

	const [selectedCard, setSelectedCard] = useState(null);
	const [data, setData] = useState([]);

	useFocusEffect(
		useCallback(() => {
			cardApi.getMyCard().then(({ response }) => {
				setData(response.data);
				setSelectedCard(null);
			});
		}, [])
	);

	//Renderers
	const renderHeader = () => {
		return (
			<Header
				containerStyle={{
					height: 50,
					paddingHorizontal: SIZES.padding,
					alignItems: "center",
					marginTop: 40,
				}}
				title='MY WALLET'
				leftComponent={
					<TouchableOpacity
						style={{
							height: 40,
							width: 40,
							alignItems: "center",
							justifyContent: "center",
							borderWidth: 1,
							borderColor: COLORS.gray2,
							borderRadius: SIZES.radius,
						}}
						onPress={() => navigation.openDrawer()}>
						<Image source={icons.menu} />
					</TouchableOpacity>
				}
				rightComponent={
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							borderRadius: SIZES.radius,
						}}
						onPress={() => navigation.navigate("Review")}>
						<Image
							source={dummyData.myProfile?.profile_image}
							style={{
								height: 40,
								width: 40,
								borderRadius: SIZES.radius,
							}}
						/>
					</TouchableOpacity>
				}
			/>
		);
	};

	const renderMyCards = () => {
		const haveLoopIcon = {};
		return (
			<View>
				{data.map((item, index) => {
					// Loop to map icon to card infor
					if (!haveLoopIcon[item.type_card]) {
						dummyData.allCards.forEach((element) => {
							if (element.type_card === item.type_card) {
								haveLoopIcon[item.type_card] = true;
								item = { ...element, ...item };
							}
						});
					}
					return (
						<CardItem
							key={`MyCard-${item.id}`}
							item={{
								...item,
								icon: dummyData.cardsIcon[item.type_card],
								name: item.type_card,
							}}
							isSelected={
								`${selectedCard?.key}-${selectedCard?.id}` ==
								`MyCard-${item.id}`
							}
							onPress={() => setSelectedCard({ ...item, key: "MyCard" })}
						/>
					);
				})}
			</View>
		);
	};

	const renderAddNewCard = () => {
		// Reduce the loop
		const haveLoopInfo = {};
		return (
			<View style={{ marginTop: SIZES.padding }}>
				<Text style={{ ...FONTS.h3 }}>Save card</Text>

				{dummyData.allCards.map((item, index) => {
					let isNewCard = true;
					if (!haveLoopInfo[item.type_card]) {
						data.forEach((element) => {
							if (element.type_card === item.type_card) {
								haveLoopInfo[item.type_card] = true;
								item = { ...element, ...item };
								isNewCard = false;
							}
						});
					}
					return (
						<CardItem
							key={`SaveCard-${item.id}`}
							item={item}
							isSelected={
								`${selectedCard?.key}-${selectedCard?.id}` ==
								`SaveCard-${item.id}`
							}
							onPress={() => setSelectedCard({ ...item, key: "SaveCard" })}
						/>
					);
				})}
			</View>
		);
	};

	const renderFooter = () => {
		return (
			<View
				style={{
					paddingTop: SIZES.radius,
					paddingBottom: SIZES.padding,
					paddingHorizontal: SIZES.padding,
				}}>
				<TextButton
					disabled={selectedCard == null}
					buttonStyle={{
						height: 60,
						borderRadius: SIZES.radius,
						backgroundColor:
							selectedCard == null ? COLORS.gray : COLORS.primary,
					}}
					label={selectedCard?.key == "SaveCard" ? "Save" : "Detail"}
					onPress={
						selectedCard?.key == "SaveCard"
							? () => navigation.navigate("Add Card", { selectedCard })
							: () => navigation.navigate("Card Detail", { selectedCard })
					}
				/>
			</View>
		);
	};

	return (
		<Animated.View style={[{ flex: 1, backgroundColor: COLORS.white }, style]}>
			{/* Header */}
			{renderHeader()}

			{/* Cards list */}
			<ScrollView contentContainerStyle={styles.scrollContentContainer}>
				{renderMyCards()}

				{renderAddNewCard()}
			</ScrollView>

			{/* Footer */}
			{renderFooter()}
		</Animated.View>
	);
};

export default MyWallet;

const headerStyles = StyleSheet.create({
	container: {
		height: 50,
		marginHorizontal: SIZES.padding,
		marginTop: 40,
	},
	leftContainer: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: SIZES.radius,
		borderColor: COLORS.gray2,
	},
	leftIcon: {
		width: 20,
		height: 20,
		tintColor: COLORS.gray2,
	},
});

const styles = StyleSheet.create({
	scrollContentContainer: {
		flexGrow: 1,
		marginTop: SIZES.radius,
		paddingHorizontal: SIZES.padding,
		paddingBottom: SIZES.radius,
	},
});
