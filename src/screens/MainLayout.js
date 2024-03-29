import { useDrawerStatus } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useSelector, useDispatch } from "react-redux";
import { CartQuantityButton, Header } from "../component";
import {
  COLORS,
  constants,
  dummyData,
  FONTS,
  icons,
  SIZES,
} from "../constants";
import { setSelectedTab } from "../features/tab/tabSlice";
import FoodDetail from "./Food/FoodDetail";
import Home from "./Home/Home";
import { useRef } from "react";
import Search from "./Search/Search";
import Favourite from "./Favourite/Favourite";
// import Notification from "./Notification/Notification";
import { useState } from "react";
import Settings from "./Setting/Settings";

const TabButton = ({
  label,
  isFocused,
  icon,
  onPress,
  outerContainerStyle,
  innerContainerStyle,
}) => {
  return (
    <TouchableWithoutFeedback
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          outerContainerStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              flexDirection: "row",
              width: "80%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            },
            innerContainerStyle,
          ]}
        >
          <Image
            source={icon}
            style={{
              width: 20,
              height: 20,
              tintColor: isFocused ? COLORS.white : COLORS.gray,
            }}
          />
          {isFocused && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: isFocused ? COLORS.white : COLORS.gray,
                ...FONTS.h3,
              }}
            >
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({ navigation }) => {
  const isDrawerOpen = useDrawerStatus() === "open";
  const [showFooter, setShowFooter] = useState(true);
  const scaleAnim = useSharedValue(1);
  const flatListRef = useRef();
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
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setShowFooter(false);
    });
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setShowFooter(true);
    });

    () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!selectedTab) {
      return;
    }

    if (selectedTab == constants.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab == constants.screens.search) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      searchTabFlex.value = withTiming(4, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      searchTabFlex.value = withTiming(1, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    // if (selectedTab == constants.screens.cart) {
    //   flatListRef?.current?.scrollToIndex({
    //     index: 2,
    //     animated: false,
    //   });
    //   cartTabFlex.value = withTiming(4, { duration: 500 });
    //   cartTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    // } else {
    //   cartTabFlex.value = withTiming(1, { duration: 500 });
    //   cartTabColor.value = withTiming(COLORS.white, { duration: 500 });
    // }

    if (selectedTab == constants.screens.favourite) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false,
      });
      favouriteTabFlex.value = withTiming(4, { duration: 500 });
      favouriteTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      favouriteTabFlex.value = withTiming(1, { duration: 500 });
      favouriteTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab == constants.screens.settings) {
      flatListRef?.current?.scrollToIndex({
        index: 3,
        animated: false,
      });
      settingTabFlex.value = withTiming(4, { duration: 500 });
      settingTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      settingTabFlex.value = withTiming(1, { duration: 500 });
      settingTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
  }, [selectedTab]);

  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);
  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.white);
  // const cartTabFlex = useSharedValue(1);
  // const cartTabColor = useSharedValue(COLORS.white);
  const favouriteTabFlex = useSharedValue(1);
  const favouriteTabColor = useSharedValue(COLORS.white);
  const settingTabFlex = useSharedValue(1);
  const settingTabColor = useSharedValue(COLORS.white);

  // reanimated

  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });
  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });
  const searchFlexStyle = useAnimatedStyle(() => {
    return {
      flex: searchTabFlex.value,
    };
  });
  const searchColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: searchTabColor.value,
    };
  });
  // const cartFlexStyle = useAnimatedStyle(() => {
  //   return {
  //     flex: cartTabFlex.value,
  //   };
  // });
  // const cartColorStyle = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: cartTabColor.value,
  //   };
  // });
  const favouriteFlexStyle = useAnimatedStyle(() => {
    return {
      flex: favouriteTabFlex.value,
    };
  });
  const favouriteColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: favouriteTabColor.value,
    };
  });
  const settingFlexStyle = useAnimatedStyle(() => {
    return {
      flex: settingTabFlex.value,
    };
  });
  const settingColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: settingTabColor.value,
    };
  });

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
      {/* <FoodDetail /> */}

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
          <CartQuantityButton onPress={() => navigation.navigate("MyCart")} />
        }
      />
      {/* Content */}
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: 0,
                animated: false,
              });
            });
          }}
          snapToInterval={SIZES.padding}
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}
              >
                {item.label == constants.screens.home && (
                  <Home type={constants.screens.home} />
                )}
                {item.label == constants.screens.search && (
                  <Home type={constants.screens.search} />
                )}
                {/* {item.label == constants.screens.cart && <CartTab />} */}
                {item.label == constants.screens.favourite && <Favourite />}
                {item.label == constants.screens.settings && <Settings />}
              </View>
            );
          }}
        />
      </View>
      {/* Footer */}
      {showFooter ? (
        <View
          style={{
            height: 100,
            justifyContent: "flex-end",
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 4 }}
            colors={[COLORS.transparent, COLORS.gray]}
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
          <View
            style={{
              width: "100%",
              flex: 1,
              flexDirection: "row",
              paddingHorizontal: SIZES.radius,
              paddingBottom: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: COLORS.white,
            }}
          >
            <TabButton
              label={constants.screens.home}
              icon={icons.home}
              isFocused={selectedTab === constants.screens.home}
              outerContainerStyle={homeFlexStyle}
              innerContainerStyle={homeColorStyle}
              onPress={() => dispatch(setSelectedTab(constants.screens.home))}
            />

            <TabButton
              label={constants.screens.search}
              icon={icons.search}
              isFocused={selectedTab === constants.screens.search}
              outerContainerStyle={searchFlexStyle}
              innerContainerStyle={searchColorStyle}
              onPress={() => dispatch(setSelectedTab(constants.screens.search))}
            />

            {/* <TabButton
            label={constants.screens.cart}
            icon={icons.cart}
            isFocused={selectedTab === constants.screens.cart}
            outerContainerStyle={cartFlexStyle}
            innerContainerStyle={cartColorStyle}
            onPress={() => {
              dispatch(setSelectedTab(constants.screens.cart));
              // navigation.navigate("FoodDetail");
            }}
          /> */}

            <TabButton
              label={constants.screens.favourite}
              icon={icons.favourite}
              isFocused={selectedTab === constants.screens.favourite}
              outerContainerStyle={favouriteFlexStyle}
              innerContainerStyle={favouriteColorStyle}
              onPress={() =>
                dispatch(setSelectedTab(constants.screens.favourite))
              }
            />

            <TabButton
              label={constants.screens.settings}
              icon={icons.setting}
              isFocused={selectedTab === constants.screens.settings}
              outerContainerStyle={settingFlexStyle}
              innerContainerStyle={settingColorStyle}
              onPress={() =>
                dispatch(setSelectedTab(constants.screens.settings))
              }
            />
          </View>
        </View>
      ) : null}
    </Animated.View>
  );
};

export default MainLayout;
