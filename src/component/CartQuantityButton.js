import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const CartQuantityButton = ({
  containerStyle,
  iconStyle,
  quantity = 0,
  onPress,
}) => {
  const [cartQuantity, setCartQuantity] = useState(quantity)
  const { products } = useSelector(state => state.cart)

  useEffect(() => {
    setCartQuantity(products.length)
  }, [products])

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightOrange2,
        ...containerStyle,
      }}
    >
      <Image
        source={icons.cart}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />

      {cartQuantity > 0 &&
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 15,
            height: 15,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body5,
              lineHeight: 0,
              fontSize: 10,
            }}
          >
            {quantity}
          </Text>
        </View>}

    </TouchableOpacity>
  );
};

export default CartQuantityButton;
