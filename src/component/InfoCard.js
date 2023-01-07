import { useState } from "react";
import { Image, Text, View } from "react-native";
import { FONTS, icons, SIZES } from "../constants";
import IconButton from "./IconButton";

const InfoCard = ({
	icon,
	iconButtonStyle,
	titleStyle,
	title,
	body,
	onPress,
}) => {
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
							maxWidth: "95%"
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
					paddingHorizontal: 20,
				}}>
				<View style={{ flexDirection: "row" }}>
					<Image source={icon} style={{ width: 20, height: 20 }} />
					<View style={{ paddingLeft: SIZES.radius }}>
						<Text style={{ ...titleStyle }}>{title}</Text>
						{renderBody()}
					</View>
				</View>
			</View>
			<IconButton
				icon={icons.right}
				containerStyle={{
					width: 100,
					height: "100%",
					position: "absolute",
					right: -20,
					alignItems: "center",
					top: height / 2,
					...iconButtonStyle,
				}}
				iconStyle={{
					tintColor: "#000",
				}}
				onPress={onPress}
			/>
		</View>
	);
};

export default InfoCard;
