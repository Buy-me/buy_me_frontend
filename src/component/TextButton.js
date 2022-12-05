import { Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants";

const TextButton = ({
	buttonContainerStyle,
	label,
	labelStyle,
	disabled,
	onPress,
}) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			style={{
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: COLORS.primary,
				...buttonContainerStyle,
			}}
			onPress={onPress}
		>
			<Text
				style={{
					color: COLORS.white,
					...FONTS.h3,
					labelStyle,
				}}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export default TextButton;
