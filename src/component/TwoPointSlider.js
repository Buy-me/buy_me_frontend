import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { COLORS, FONTS, SIZES } from "../constants";

const TwoPointSlider = ({ values, min, max, postfix, onValueChange }) => {
  return (
    <MultiSlider
      onValuesChangeFinish={onValueChange}
      values={values}
      min={min}
      max={max}
      sliderLength={SIZES.width - SIZES.padding * 2 - 30}
      step={1}
      markerOffsetY={20}
      selectedStyle={{
        backgroundColor: COLORS.primary,
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
      }}
      minMarkerOverlapDistance={50}
      customMarker={(e) => {
        return (
          <View
            style={{
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 4,
                borderColor: COLORS.white,
                backgroundColor: COLORS.primary,
                ...styles.shadow,
                elevation: 2,
              }}
            ></View>
            <Text
              style={{
                marginTop: 5,
                color: COLORS.darkGray,
                ...FONTS.body3,
              }}
            >
              {""}
              {e.currentValue} {postfix}
            </Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});

export default TwoPointSlider;
