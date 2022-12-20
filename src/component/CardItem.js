import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";

const CardItem = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: isSelected ? COLORS.primary : COLORS.lightGray2,
      }}
      onPress={onPress}
    >
      <View style={styles.imageView}>
        <Image
          source={item.icon}
          resizeMode="center"
          style={{ width: 35, height: 35 }}
        />
      </View>

      <Text style={styles.text}>{item.name}</Text>

      <View
        style={{
          ...styles.radioBtn,
          borderColor: isSelected ? COLORS.primary : COLORS.lightGray1,
        }}
      >
        <View style={isSelected ? styles.selected : styles.unselected} />
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    borderWidth: 2,
    borderRadius: SIZES.radius,
  },
  imageView: {
    width: 60,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: SIZES.radius,
    borderColor: COLORS.lightGray2,
  },
  text: {
    flex: 1,
    marginLeft: SIZES.radius,
    ...FONTS.h3,
  },

  radioBtn: {
    borderRadius: 180,
    padding: 2,
    borderWidth: 2,
    borderColor: COLORS.lightGray1,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    width: 15,
    height: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 180,
  },
  unselected: {
    width: 15,
    height: 15,
  },
});
