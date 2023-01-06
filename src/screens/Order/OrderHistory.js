import { useDrawerStatus } from "@react-navigation/drawer";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { Header, OrderCard } from "../../component";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";
import orderApi from "../../api/orderApi";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

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

	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState({
		cursor: "",
		limit: 1,
		next_cursor: "",
		page: 1,
		total: 2,
	});
	const [isRefresh, setIsRefresh] = useState(false)

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				const { response } = await orderApi.getMyOrders(pagination.limit, pagination.page);
				const dataFiltered = filterData(response.data);
				setData(dataFiltered);
				setPagination(response.paging);
			};
			fetchData();
		}, [])
	);

	const loadMore = () => {
		const fetchData = async () => {
			const { response } = await orderApi.getMyOrders(pagination.limit, pagination.page + 1);
			const dataFiltered = filterData(response.data);
			// Group by create date
			dataFiltered.forEach((ele1) => {
				for (const ele2 of data) {
					if(ele1.createDate === ele2.createDate) {
						ele1.data = [...ele2.data, ...ele1.data]
					}
				}
			})
			setData(dataFiltered);
			setPagination(response.paging);
			setIsRefresh(false);
		};
		if(pagination.page < Math.ceil(pagination.total / pagination.limit)) {
			setIsRefresh(true);
			fetchData();
		}
	};

	/**
	 * Filter data to easy display list
	 * @param {*} data
	 * @returns data filtered
	 */
	const filterData = (data) => {
		const dataFilteredObject = {};
		for (const item of data) {
			const createDate = moment(item.created_at).format("DD-MM-YYYY");
			if (dataFilteredObject[`${createDate}`] == null) {
				dataFilteredObject[`${createDate}`] = [item];
			} else dataFilteredObject[`${createDate}`].push(item);
		}
		const dataFilteredArrays = [];
		for (const key in dataFilteredObject) {
			if (Object.hasOwnProperty.call(dataFilteredObject, key)) {
				dataFilteredArrays.push({
					createDate: key,
					data: dataFilteredObject[key],
				});
			}
		}
		return dataFilteredArrays;
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
				title='ORDER HISTORY'
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
		const renderOrderContent = ({ item }) => {
			return (
				<View style={{ paddingTop: 10 }}>
					<Text style={{ paddingLeft: 26, ...FONTS.h3, color: COLORS.gray }}>
						{item.createDate}
					</Text>
					{item.data.map((order) => (
						<OrderCard
							data={order}
							key={`Order_card-${order.id}`}
							navigation={navigation}
						/>
					))}
				</View>
			);
		};
		return (
			<>
				<FlatList
					data={data}
					renderItem={renderOrderContent}
					keyExtractor={(item) => item.createDate}
					onEndReached={loadMore}
					onEndReachedThreshold={0}
					refreshing={isRefresh}
				/>
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
