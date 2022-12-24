import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        // paddingTop: 10,
        ...containerStyle,
      }}
    >
      {/* Images */}
      <Image source={{ uri: item.images.url }} style={imageStyle} />
      {/* Info */}

      <View style={{ flex: 1 }}>
        {/* Name */}
        <Text
          style={{
            ...FONTS.h3,
            fontSize: 17,
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        {/* Description */}
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.darkGray2,
            fontSize: 17,
          }}
          numberOfLines={1}
        >
          {item.description}
        </Text>

        {/* Price */}
        <Text
          style={{
            ...FONTS.h2,
            marginTop: SIZES.base,
          }}
          numberOfLines={1}
        >
          ${item.price}
        </Text>
      </View>
      {/* Calories */}

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 3,
          right: SIZES.radius,
        }}
      >
        <Image
          source={icons.calories}
          style={{
            width: 30,
            height: 30,
          }}
        />

        <Text
          style={{
            color: COLORS.darkGray2,
            ...FONTS.body5,
          }}
        >
          {item.calories || 100} Calories
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;
