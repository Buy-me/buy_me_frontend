import { useState } from "react";
import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	FooterTotal,
	Header,
	IconButton,
	InfoCard,
	TextIconButton,
} from "../../component";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import orderApi from "../../api/orderApi";

const Checkout = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { products, subTotal } = useSelector((state) => state.cart);
	const { selectedAddress } = useSelector((state) => state.address);
	const { profile } = useSelector((state) => state.user);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		pageSize: 2,
		totalPage: 2,
	});
	const [isCashActive, setIsCashActive] = useState(true);

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
					titleStyle={{ ...FONTS.h3 }}
					body={[
						`${profile?.first_name + profile.last_name} | ${profile.phone}`,
						`${
							selectedAddress?.address || "Please choose the delivery address"
						}`,
					]}
					onPress={() => {
						navigation.navigate("Address");
					}}
				/>
				<InfoCard
					iconButtonStyle={{ display: "none" }}
					icon={icons.alarm}
					title='The order will be delivered in 30 minutes'
					titleStyle={{ ...FONTS.body3 }}
				/>
				<View style={{ paddingLeft: 56 }}>
					<Text style={{ ...FONTS.h2 }}>Product</Text>
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
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						paddingBottom: 30,
						paddingTop: 10,
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
			if (products[i] != null) {
				data[i] = products[i];
			}
		}
		return data.map((item, index) => {
			const foodData = item?.food_data;
			return (
				<View
					key={index}
					style={{
						padding: 14,
						flexDirection: "row",
						paddingBottom: 5,
					}}>
					<Image
						source={{
							uri: foodData?.images?.url,
						}}
						style={{
							width: 60,
							height: 60,
						}}
					/>
					<View style={{ justifyContent: "center", paddingLeft: 15, flex: 2 }}>
						<Text style={{ ...FONTS.h4, maxWidth: 150 }}>{foodData.name}</Text>
						<Text
							style={{
								...FONTS.h3,
								color: COLORS.orange,
							}}>
							${foodData.price}
						</Text>
					</View>
					<Text
						style={{
							alignSelf: "center",
							paddingRight: 20,
							...FONTS.h3,
						}}>
						{item.quantity}
					</Text>
				</View>
			);
		});
	};

	const checkout = () => {
		if (!selectedAddress) {
			ToastAndroid.show(
				"Please choose address before checkout",
				ToastAndroid.SHORT
			);
			return;
		}
		const formatProductItem = products?.map((item) => {
			const foodData = item.food_data;
			return {
				discount: 0,
				price: foodData?.price,
				quantity: item.quantity,
				food_origin: {
					...foodData,
				},
			};
		});
		
		orderApi
			.createOrder({
				total_price: subTotal,
				name: profile?.first_name + profile.last_name,
				title_address: selectedAddress?.title,
				detail_address: selectedAddress?.address,
				phone: "0394116517",
				items: [...formatProductItem],
			})
			.then(({ response }) => {
				navigation.navigate("Success", { id: response?.data });
			})
			.catch((err) => {
				ToastAndroid.show(err, ToastAndroid.SHORT);
			});
	};

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.white }}>
			{renderHeader()}
			{renderBody()}
			<FooterTotal
				subTotal={subTotal}
				shippingFee={0.0}
				total={subTotal}
				onPress={checkout}
			/>
		</View>
	);
};

export default Checkout;
