import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import IconButton from "./IconButton";

const StepperInput = ({ containerStyle, value = 1, onAdd, onMinus }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: 130,
        height: 60,
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
    >
      <IconButton
        containerStyle={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        icon={icons.minus}
        iconStyle={{
          ...styles.defaultIcon,
          tintColor: value > 1 ? COLORS.primary : COLORS.gray,
        }}
        onPress={onMinus}
      />

      <View style={styles.textView}>
        <Text style={{ ...FONTS.h2 }}>{value}</Text>
      </View>

      <IconButton
        containerStyle={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        icon={icons.plus}
        iconStyle={styles.defaultIcon}
        onPress={onAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.primary,
  },
  textView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StepperInput;
