import React from "react";
import { FONTS, COLORS } from "../constants";
import { Text, TouchableOpacity } from "react-native";

const TextButtonTag = ({
  label,
  labelStyle,
  onPress,
  buttonContainerStyle,
}) => {
  return (
    <TouchableOpacity
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
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButtonTag;
