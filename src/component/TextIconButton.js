import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../constants";

const TextIconButton = ({
  containerStyle,
  label,
  labelStyle,
  label2,
  label2Style,
  icon,
  iconPosition = "LEFT",
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
      onPress={onPress}
    >
      {iconPosition == "LEFT" && (
        <Image
          source={icon}
          style={{
            ...style.image,
            ...iconStyle,
          }}
        />
      )}

      {!label2 ?
        <Text
          style={{
            ...FONTS.body3,
            ...labelStyle,
          }}
        >
          {label}
        </Text>
        :
        <View style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 10,
          alignSelf: "center"
        }}>
          <Text
            style={{
              ...FONTS.body3,
              ...labelStyle,
            }}
          >
            {label}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              ...label2Style,
            }}
          >
            {label2}
          </Text>
        </View>
      }

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
