import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { icons, COLORS } from "../constants";

const Rating = ({
  rating,
  iconStyle,
  activeColor = COLORS.orange,
  inactiveColor = COLORS.lightOrange3,
}) => {
  const renderStars = () => {
    const arrs = [1, 2, 3, 4, 5];

    return arrs.map((item, index) => (
      <Image
        key={index}
        source={icons.star}
        style={{
          tintColor: item <= rating ? activeColor : inactiveColor,
          ...styles.rateIcon,
          ...iconStyle,
        }}
      />
    ));
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {/* {new Array(5).map((item, index) => (
                <Image
                    source={icons.star}
                    style={{
                        tintColor: index + 1 <= rating ? activeColor : inactiveColor,
                        ...styles.rateIcon,
                        ...iconStyle
                    }}
                />
            ))} */}
      {renderStars()}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rateIcon: {
    height: 15,
    width: 15,
  },
});
