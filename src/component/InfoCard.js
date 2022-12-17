import { useState } from "react";
import { Image, Text, View } from "react-native";
import { FONTS, icons, SIZES } from "../constants";
import IconButton from "./IconButton";

const InfoCard = ({ icon, title, body }) => {
	const [height, setHeight] = useState(0);
	const onResize = (event) => {
		const { height } = event.nativeEvent.layout;
		setHeight(height);
	};
	const renderBody = () => {
		if (body?.length > 0) {
			return body.map((text, index) => {
				return (
					<Text
						key={index}
						style={{
							...FONTS.body3,
							paddingTop: 8,
							textAlign: "left",
							maxWidth: "90%",
						}}>
						{text}
					</Text>
				);
			});
		}
	};
	return (
		<View>
			<View
				onLayout={onResize}
				style={{
					marginVertical: SIZES.radius,
					paddingHorizontal: SIZES["padding-20"],
				}}>
				<View style={{ flexDirection: "row" }}>
					<Image source={icon} style={{ width: 20, height: 20 }} />
					<View style={{ paddingLeft: SIZES.radius }}>
						<Text style={{ ...FONTS.body3 }}>{title}</Text>
						{renderBody()}
					</View>
				</View>
			</View>
			<IconButton
				icon={icons.right}
				containerStyle={{
					width: 20,
					height: 20,
					position: "absolute",
					right: 20,
					top: height / 2,
				}}
				iconStyle={{
					tintColor: "#000",
				}}
				onPress={() => {}}
			/>
		</View>
	);
};

export default InfoCard;
