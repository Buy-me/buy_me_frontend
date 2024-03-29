import { Image, Text, View } from "react-native";
import React from "react";
import { FONTS, SIZES } from "../constants";

const IconLabel = ({
  containerStyle,
  icon,
  iconStyle,
  iconPosition="LEFT",
  label,
  labelStyle,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: SIZES.base,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
    >
      {iconPosition == "LEFT" && (
        <Image
          source={icon}
          style={{
            width: 20,
            height: 20,
            ...iconStyle,
          }}
        />
      )}
      <Text
        style={{
          marginLeft: SIZES.base,
          ...FONTS.body3,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
      {iconPosition == "RIGHT" && (
        <Image
          source={icon}
          style={{
            width: 20,
            height: 20,
            ...iconStyle,
          }}
        />
      )}
    </View>
  );
};

export default IconLabel;
