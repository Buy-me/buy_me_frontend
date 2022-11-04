import { useDrawerStatus } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useSelector, useDispatch } from "react-redux";
import { Header } from "../component";
import { COLORS, constants, dummyData, icons, SIZES } from "../constants";
import { setSelectedTab } from "../features/tab/tabSlice";

const MainLayout = ({ navigation }) => {
  const isDrawerOpen = useDrawerStatus() === "open";
  const scaleAnim = useSharedValue(1);
  const borderAnim = useSharedValue(1);
  useEffect(() => {
    if (isDrawerOpen) {
      scaleAnim.value = 0.8;
      borderAnim.value = 30;
    } else {
      scaleAnim.value = 1;
      borderAnim.value = 1;
    }
  }, [isDrawerOpen]);
  const style = useAnimatedStyle(() => {
    return {
      borderRadius: borderAnim.value,
      transform: [
        {
          scale: withTiming(scaleAnim.value, {
            // duration: 100,
          }),
        },
      ],
    };
  });

  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state) => state.tab);

  useEffect(() => {
    dispatch(setSelectedTab(constants.screens.home));
  }, []);

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          backgroundColor: COLORS.white,
        },
        style,
      ]}
    >
      {/* Header */}
      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
          marginTop: 40,
        }}
        title={selectedTab.toUpperCase()}
        leftComponent={
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.openDrawer()}
          >
            <Image source={icons.menu} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.openDrawer()}
          >
            <Image
              source={dummyData.myProfile?.profile_image}
              style={{
                height: 40,
                width: 40,
                borderRadius: SIZES.radius,
              }}
            />
          </TouchableOpacity>
        }
      />
      {/* Content */}
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>Content</Text>
      </View>
      {/* Footer */}
      <View
        style={{
          height: 100,
          justifyContent: "flex-end",
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: "absolute",
            top: -20,
            left: 0,
            right: 0,
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        {/* Tabs */}
      </View>
    </Animated.View>
  );
};

export default MainLayout;
