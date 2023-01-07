import moment from "moment";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FooterTotal, Header, IconButton, LineDivider } from "../../component";
import { COLORS, COLORS_STATUS, FONTS, icons, SIZES } from "../../constants";

const OrderDetail = ({ route, navigation }) => {
	const data = route.params;

	const renderHeader = () => {
		return (
			<Header
				title='ORDER DETAIL'
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
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							width: 80,
							borderWidth: 1,
							borderRadius: SIZES.radius,
							borderColor: COLORS.gray2,
						}}
						onPress={() => navigation.navigate("Delivery Status", {
							id: data.id,
							// State start from 0
							currentStep: data.status - 1,
							isGoBack: true,
						})}
						>
						<Text
							style={{
								fontFamily: "Poppins-SemiBold",
								fontSize: 16,
								lineHeight: 16,
								color: COLORS.primary,
								textAlignVertical: "center",
							}}>
							Check Status
						</Text>
					</TouchableOpacity>
				}
			/>
		);
	};
	const renderFoodCard = () => {
		return data.items.map((item, index) => {
			const foodData = item.food_origin;
			return (
				<View
					key={index}
					style={{
						padding: 14,
						flexDirection: "row",
					}}>
					<Image
						source={{
							uri: foodData.images.url,
						}}
						style={{
							width: 60,
							height: 60,
						}}
					/>
					<View style={{ justifyContent: "center", paddingLeft: 15, flex: 2 }}>
						<Text style={{ ...FONTS.h3 }}>{foodData.name}</Text>
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
	const renderOrderDetail = () => {
		return (
			<View
				style={{
					marginTop: SIZES.radius,
					paddingTop: SIZES.padding,
					borderRadius: SIZES.radius,
					borderWidth: 2,
					borderColor: COLORS.lightGray2,
					backgroundColor: COLORS.white2,
					flex: 1,
					paddingBottom: 200,
				}}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 20,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Order ID</Text>
					<Text style={{ color: COLORS.gray, ...FONTS.body3 }}>{data.id}</Text>
				</View>
				<LineDivider
					lineStyle={{
						backgroundColor: COLORS.lightGray2,
					}}
				/>
				<View
					style={{
						marginTop: SIZES.padding,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 15,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Name</Text>
					<Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
						{data.name}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 15,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Phone</Text>
					<Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
						{data.phone}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 15,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Address</Text>
					<Text
						style={{
							color: COLORS.gray,
							...FONTS.body3,
							maxWidth: "50%",
							textAlign: "right",
						}}>
						{data.detail_address}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 15,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Payment method</Text>
					<Text
						style={{
							color: COLORS.gray,
							...FONTS.body3,
							maxWidth: "50%",
							textAlign: "right",
						}}>
						{data.type}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 15,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Create date</Text>
					<Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
						{moment(data.created_at).format("DD-MM-YYYY")}
					</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 15,
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Status</Text>
					<Text
						style={{
							...COLORS_STATUS[`${data.tracking_state}`],
							...FONTS.body3,
							textTransform: "capitalize",
						}}>
						{data.tracking_state}
					</Text>
				</View>
				<LineDivider
					lineStyle={{
						backgroundColor: COLORS.lightGray2,
					}}
				/>

				<View
					style={{
						marginTop: SIZES.padding,
						justifyContent: "space-between",
						paddingHorizontal: SIZES.padding,
					}}>
					<Text style={{ ...FONTS.h3 }}>Product</Text>
					{renderFoodCard()}
				</View>
			</View>
		);
	};

	return (
		<View
			style={{
				marginTop: SIZES.radius,
				height: "100%",
			}}>
			{/* Header */}
			{renderHeader()}

			{/* Track Order */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1 }}>
					{renderOrderDetail()}
					<View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
						<FooterTotal
							subTotal={data.total_price}
							shippingFee={0.0}
							total={data.total_price}
							visible={false}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
export default OrderDetail;
