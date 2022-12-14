import { useEffect } from "react";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CardItem, Header, IconButton, InfoView } from "../../component";
import { COLORS, dummyData, FONTS, SIZES } from "../../constants";

const Checkout = ({ navigation, route }) => {
	const [selectedCard, setSelectedCard] = useState(null);
	useEffect(() => {
		let { selectedCard } = route.params;
		setSelectedCard(selectedCard);
	});

	const renderHeader = () => {
		return (
			<Header
				title="CHECKOUT"
				containerStyle={{
					height: 50,
					marginHorizontal: SIZES.padding,
					marginTop: 40,
				}}
				leftComponent={
					<IconButton
						icon={icons.back}
						containerStyle={{
							width: 40,
							height: 40,
							justifyContent: "center",
							alignItems: "center",
							borderWidth: 1,
							borderRadius: SIZES.radius,
							borderColor: COLORS.gray2,
						}}
						iconStyle={{
							width: 20,
							height: 20,
							tintColor: COLORS.gray2,
						}}
						onPress={() => navigation.goBack()}
					/>
				}
				rightComponent={
					<View
						style={{
							width: 40,
						}}
					/>
				}
			/>
		);
	};

	const renderMyCards = () => {
		return (
			<View>
				{selectedCard &&
					dummyData.myCards.map((item, index) => {
						return (
							<CardItem
								key={`MyCard-${item.id}`}
								item={item}
								isSelected={
									`${selectedCard?.key}-${selectedCard.id}` ==
									`MyCard-${item.id}`
								}
								onPress={() => setSelectedCard({ ...item, key: "MyCard" })}
							/>
						);
					})}
			</View>
		);
	};

	const renderDeliveryAddr = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding,
				}}
			>
				<Text style={{ ...FONTS.h3 }}>Delivery Address</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginTop: SIZES.radius,
						paddingVertical: SIZES.radius,
						paddingHorizontal: SIZES.padding,
						borderWidth: 2,
						borderRadius: SIZES.radius,
						borderColor: COLORS.lightGray2,
					}}
				>
					<Image source={icons.lo} style={{ width: 40, height: 40 }} />
					<Text
						style={{ marginLeft: SIZES.radius, width: "85%", ...FONTS.body3 }}
					>
						300 Post Street San Francisco, CA
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.white }}>
			{renderHeader()}
			{/* <KeyboardAwareScrollView
				keyboardDismissMode="on-drag"
				extraScrollHeight={-200}
				contentContainerStyle={{
					flexGrow: 1,
					paddingHorizontal: SIZES.padding,
					paddingBottom: 20,
				}}
			>
				{renderMyCards()}
			</KeyboardAwareScrollView> */}
			<InfoView />
		</View>
	);
};

export default Checkout;
