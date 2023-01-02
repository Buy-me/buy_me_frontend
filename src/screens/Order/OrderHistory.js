import { useDrawerStatus } from "@react-navigation/drawer";
import { useEffect } from "react";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import {
	Header,
	OrderCard,
} from "../../component";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";
import orderApi from "../../api/orderApi";

const OrderHistory = ({ navigation, route }) => {
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

	const [data, setData] = useState({});
	const [pagination, setPagination] = useState({
		currentPage: 1,
		pageSize: 0,
		totalPage: 0,
	});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { response, error } = await orderApi.getMyOrders();
			const dataFiltered = filterData(response.data);
			setData(dataFiltered);
			setLoading(false);
		};
		fetchData();
	}, []);


	/**
	 * Filter data to easy display list
	 * @param {*} data 
	 * @returns data filtered
	 */
	const filterData = (data) => {
		const dataFiltered = {};
		for (const item of data) {
			const createDate = item.created_at.substring(0, 10);
			if (dataFiltered[`${createDate}`] == null) {
				dataFiltered[`${createDate}`] = [item];
			} else dataFiltered[`${createDate}`].push(item);
		}
		return dataFiltered;
	};

	const renderHeader = () => {
		return (
			<Header
				containerStyle={{
					height: 50,
					paddingHorizontal: SIZES.padding,
					alignItems: "center",
					marginTop: 40,
				}}
				title='Order History'
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

	const renderBody = () => {
		const getOrderContent = () => {
			let content = [];
			for (const key in data) {
				if (Object.hasOwnProperty.call(data, key)) {
					content.push(
						<View style={{paddingTop: 10}} key={key}>
							<Text
								style={{ paddingLeft: 26, ...FONTS.h3, color: COLORS.gray }}>
								{key}
							</Text>
							{
								data[key].map((item) => <OrderCard data={item} key={item.created_at} navigation={navigation} />)
							}
						</View>
					);
				}
			}
			return content;
		};
		return (
			<>
				<ScrollView>
					{getOrderContent()}
				</ScrollView>
			</>
		);
	};

	return (
		<Animated.View style={[{ flex: 1, backgroundColor: COLORS.white }, style]}>
			{renderHeader()}
			{renderBody()}
		</Animated.View>
	);
};

export default OrderHistory;
