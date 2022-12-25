import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ColorSpace } from "react-native-reanimated";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const VerticalFoodCard = ({ containerStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        padding: SIZES.radius,
        alignItems: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Calories Section And Favourite*/}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {/* Calories */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
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

        {/* Favourite */}
        {/* <Image
          source={icons.love}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavourite ? COLORS.primary : COLORS.gray,
          }}
        /> */}
      </View>

      {/* Image */}
      <View
        style={{
          height: 150,
          width: 150,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{
            uri: item.images.url,
          }}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: SIZES.radius,
          }}
        />
      </View>

      {/* Info */}
      <View
        style={{
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.darkGray2,
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {item.description}
        </Text>
        <Text
          style={{
            marginTop: SIZES.radius,
            ...FONTS.h2,
          }}
        >
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
