/**
 * Remember to put this into a subfolder named Card
 */
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CardItem, Header, IconButton, TextButton } from "../../component";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import cardApi from "../../api/cardApi";

const MyCard = ({ navigation }) => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		cardApi.getMyCard().then(({ response }) => {
			setData(response.data);
		});
	});

	//Renderers
	const renderHeader = () => {
		return (
			<Header
				title={"MY CARD"}
				containerStyle={headerStyles.container}
				leftComponent={
					<IconButton
						icon={icons.back}
						containerStyle={headerStyles.leftContainer}
						iconStyle={headerStyles.leftIcon}
						onPress={() => navigation.goBack()}
					/>
				}
				rightComponent={<View style={{ width: 40 }} />}
			/>
		);
	};

	const renderMyCards = () => {
		return (
			<View>
				{data.map((item, index) => (
					<CardItem
						key={`MyCard-${item.id}`}
						item={{
							...item,
							icon: dummyData.cardsIcon[item.type_card],
							name: item.type_card,
						}}
						isSelected={
							`${selectedCard?.key}-${selectedCard?.id}` == `MyCard-${item.id}`
						}
						onPress={() => setSelectedCard({ ...item, key: "MyCard" })}
					/>
				))}
			</View>
		);
	};

	const renderAddNewCard = () => {
        // Reduce the loop
        const haveLoopInfo = {}
		return (
			<View style={{ marginTop: SIZES.padding }}>
				<Text style={{ ...FONTS.h3 }}>Save card</Text>

				{dummyData.allCards.map((item, index) => {
                    if(!haveLoopInfo[item.name]) {
                        data.forEach((element) => {
                            if (element.type_card === item.name) {
                                haveLoopInfo[item.name] = true;
                                item = { ...element, ...item };
                            }
                        });
                    }
					return (
						<CardItem
							key={`NewCard-${item.id}`}
							item={item}
							isSelected={
								`${selectedCard?.key}-${selectedCard?.id}` ==
								`NewCard-${item.id}`
							}
							onPress={() => setSelectedCard({ ...item, key: "NewCard" })}
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
					label={
						selectedCard?.key == "NewCard" ? "Save" : "Proceed to Checkout"
					}
					onPress={
						selectedCard?.key == "NewCard"
							? () => navigation.navigate("Add Card", { selectedCard })
							: () => navigation.navigate("Checkout", { selectedCard })
					}
				/>
			</View>
		);
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
			}}>
			{/* Header */}
			{renderHeader()}

			{/* Cards list */}
			<ScrollView contentContainerStyle={styles.scrollContentContainer}>
				{renderMyCards()}

				{renderAddNewCard()}
			</ScrollView>

			{/* Footer */}
			{renderFooter()}
		</View>
	);
};

export default MyCard;

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
