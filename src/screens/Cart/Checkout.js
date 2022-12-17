import { useEffect } from "react";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
	FooterTotal,
	Header,
	IconButton,
	InfoCard,
	TextIconButton,
} from "../../component";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";

const Checkout = ({ navigation, route }) => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		pageSize: 2,
		totalPage: 2,
	});
	const [isCashActive, setIsCashActive] = useState(true);
	useEffect(() => {
		let { selectedCard } = route.params;
		setSelectedCard(selectedCard);
	});

	const renderHeader = () => {
		return (
			<Header
				title='CHECKOUT'
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

	const renderBody = () => {
		return (
			<ScrollView>
				<InfoCard
					icon={icons.address}
					title='Address'
					body={[
						"Thai Binh | 0903456782",
						"University of Information Technology, Ho Chi Minh City",
					]}
				/>
				<InfoCard icon={icons.alarm} title='Delivery now  -  9:20 - 28/11' />
				<View style={{ paddingLeft: 56 }}>
					<Text style={{ ...FONTS.h2 }}>Bubble Store</Text>
					<ScrollView>{renderFoodCard()}</ScrollView>
					<TextIconButton
						label={
							pagination.currentPage !== pagination.totalPage
								? "See more"
								: "Shorten"
						}
						labelStyle={{
							color: COLORS.gray4,
							...FONTS.h3,
						}}
						icon={
							pagination.currentPage !== pagination.totalPage
								? icons.chevronDown
								: icons.chevronUp
						}
						iconPosition='RIGHT'
						iconStyle={{
							width: 25,
							height: 25,
							marginTop: 1,
							marginRight: SIZES.base,
							tintColor: COLORS.gray4,
						}}
						onPress={() =>
							setPagination({
								...pagination,
								currentPage:
									pagination.currentPage !== pagination.totalPage
										? pagination.currentPage + 1
										: pagination.currentPage - 1,
							})
						}
					/>
				</View>
				<InfoCard icon={icons.ticket} title='Add coupon' />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						paddingBottom: 30,
					}}>
					<TextIconButton
						containerStyle={{
							borderWidth: 1,
							borderColor: isCashActive ? COLORS.gray4 : COLORS.orange,
							borderRadius: 5,
							width: "40%",
							height: 30,
						}}
						label='Card'
						labelStyle={{
							...FONTS.body3,
							color: isCashActive ? COLORS.gray4 : COLORS.orange,
						}}
						icon={icons.creditCard}
						iconPosition='RIGHT'
						iconStyle={{
							tintColor: isCashActive ? COLORS.gray4 : COLORS.orange,
						}}
						onPress={() => setIsCashActive(false)}
					/>
					<TextIconButton
						containerStyle={{
							borderWidth: 1,
							borderColor: isCashActive ? COLORS.orange : COLORS.gray4,
							borderRadius: 5,
							width: "40%",
							height: 30,
						}}
						label='Cash'
						labelStyle={{
							...FONTS.body3,
							color: isCashActive ? COLORS.orange : COLORS.gray4,
						}}
						icon={icons.cash}
						iconPosition='RIGHT'
						iconStyle={{
							tintColor: isCashActive ? COLORS.orange : COLORS.gray4,
						}}
						onPress={() => setIsCashActive(true)}
					/>
				</View>
			</ScrollView>
		);
	};

	const renderFoodCard = () => {
		const data = [];
		for (let i = 0; i < pagination.currentPage * pagination.pageSize; i++) {
			if (dummyData.myCart[i] != null) {
				data[i] = dummyData.myCart[i];
			}
		}
		return data.map((item, index) => {
			return (
				<View
					key={index}
					style={{
						padding: 14,
						flexDirection: "row",
					}}>
					<Image
						source={item.image}
						style={{
							width: 60,
							height: 60,
						}}
					/>
					<View style={{ justifyContent: "center", paddingLeft: 15, flex: 2 }}>
						<Text style={{ ...FONTS.h3 }}>{item.name}</Text>
						<Text
							style={{
								...FONTS.h3,
								color: COLORS.orange,
							}}>
							${item.price}
						</Text>
					</View>
					<Text
						style={{
							alignSelf: "center",
							paddingRight: 20,
							...FONTS.h3,
						}}>
						{item.qty}
					</Text>
				</View>
			);
		});
	};

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.white }}>
			{renderHeader()}
			{renderBody()}
			<FooterTotal
				subTotal={40.03}
				shippingFee={0.0}
				total={40.03}
				onPress={() => navigation.navigate("Success")}
			/>
		</View>
	);
};

export default Checkout;
