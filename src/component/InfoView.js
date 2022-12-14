import { useState } from "react";
import { Image, Text, View } from "react-native";
import { icons, SIZES } from "../constants";
import IconButton from "./IconButton";

const InfoView = (icon, title, ...body) => {
	const [height, setHeight] = useState();
	const onResize = (event) => {
		const { height } = event.nativeEvent.layout;
		setHeight(height);
	};
	const renderBody = () => {
		return body.forEach((text) => {
			return (
				<Text
					style={{
						fontSize: SIZES.h2,
						paddingTop: 8,
						textAlign: "left",
						maxWidth: "90%",
					}}
				>
					{text}
				</Text>
			);
		});
	};
	return (
		<View onLayout={onResize}>
			<View
				style={{
					paddingVertical: SIZES.radius,
					paddingHorizontal: SIZES["padding-20"],
				}}
			>
				<View>
					<Image source={icon} />
					<Text style={{ ...SIZES.h2, paddingLeft: SIZES.radius }}>
						{title}
					</Text>
					{renderBody()}
				</View>
			</View>
			<IconButton
				icon={icons.right}
				containerStyle={{
					width: 20,
					height: 20,
					position: "absolute",
					right: 20,
					bottom: height / 2,
				}}
				iconStyle={{
					tintColor: "#000",
				}}
				onPress={() => {}}
			/>
		</View>
	);
};

export default InfoView;
