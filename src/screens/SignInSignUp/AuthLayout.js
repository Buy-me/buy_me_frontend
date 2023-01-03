import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";

import { images, FONTS, SIZES, COLORS } from "../../constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AuthLayout = ({
  title,
  subtitle,
  screenName,
  titleContainerStyle,
  chidren,
}) => {
  return (
    <ImageBackground
      source={
        screenName == "signin" ? images.signin_pattern1 : images.signin_pattern2
      }
      resizeMode="cover"
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
      }}
    >
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* App Icon */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              marginTop: SIZES.padding - 40,
              height: 200,
              width: 200,
            }}
          ></Image>
        </View>

        {/* Title & Subtitle */}
        <View
          style={{
            marginTop: SIZES.padding - 30,
            ...titleContainerStyle,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              ...FONTS.h2,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.darkGray,
              marginTop: SIZES.base,
              ...FONTS.body3,
            }}
          >
            {subtitle}
          </Text>
        </View>

        {/* Content Children */}
        {chidren}
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default AuthLayout;
