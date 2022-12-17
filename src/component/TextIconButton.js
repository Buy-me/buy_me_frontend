import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants";

const TextIconButton = ({
	containerStyle,
	label,
	labelStyle,
	icon,
	iconPosition,
	iconStyle,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				...containerStyle,
			}}
			onPress={onPress}>
			{iconPosition == "LEFT" && (
				<Image
					source={icon}
					style={{
						...style.image,
						...iconStyle,
					}}
				/>
			)}
			<Text
				style={{
					...FONTS.body3,
					...labelStyle,
				}}>
				{label}
			</Text>
			{iconPosition == "RIGHT" && (
				<Image
					source={icon}
					style={{
						...style.image,
						...iconStyle,
					}}
				/>
			)}
		</TouchableOpacity>
	);
};

const style = StyleSheet.create({
  image: {
    marginLeft: 5,
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
  },
});

export default TextIconButton;
