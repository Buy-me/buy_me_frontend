import React from "react";
import { FONTS, COLORS } from "../constants";
import { Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

const TextButtonFilter = ({
  label,
  labelStyle,
  onPress,
  buttonContainerStyle,
}) => {
  return (
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
};

export default TextButtonFilter;
