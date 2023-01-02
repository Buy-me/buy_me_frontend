import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, COLORS_STATUS, FONTS, icons, SIZES } from "../constants";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
import moment from "moment";

const OrderCard = ({ data, navigation }) => {
	return (
		<TouchableOpacity
			style={{
				width: "90%",
				height: 100,
				marginHorizontal: 20,
				marginVertical: 8,
				backgroundColor: COLORS.lightGray2,
				borderRadius: 10,
				display: "flex",
				justifyContent: "center",
			}}
			onPress={() => {navigation.navigate("Order Detail", {...data})}}>
			<View style={{ paddingLeft: 16, flexDirection: "row" }}>
				<View
					style={{
						flex: 1,
						paddingHorizontal: 14,
						justifyContent: "space-evenly",
					}}>
					<View>
						<Text
							style={{ ...FONTS.h3, color: COLORS.black, paddingVertical: 1 }}>
							ID {data.id} ● {moment(data.created_at).format("DD MMM, hh:mm")} ●{" "}
							{data.items.length} items
						</Text>
					</View>
					<View>
						<Text
							style={{
								...COLORS_STATUS[`${data.tracking_state}`],
								...FONTS.h3,
								paddingVertical: 1,
								textTransform: 'capitalize'
							}}>
							⬤ {data.tracking_state}
						</Text>
					</View>
					<View>
						<Text
							style={{ ...FONTS.h3, color: COLORS.gray4, paddingVertical: 1 }}>
							Total Price:{" "}
							<Text style={{ color: COLORS.primary }}>${data.total_price}</Text>
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					width: 20,
					height: 20,
					position: "absolute",
					right: 20,
					top: 35,
				}}>
				<Image
					source={icons.right}
					style={{
						width: 30,
						height: 30,
						tintColor: "#000",
					}}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default OrderCard;
