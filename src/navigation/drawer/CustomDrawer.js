import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainLayout } from "../../screens";
import { COLORS } from "../../constants";
import { setSelectedTab } from "../../features/tab/tabSlice";

import { useDispatch, useSelector } from "react-redux";

import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  const { selectedTab } = useSelector((state) => state.tab);
  console.log("selectedTab", selectedTab);

  const dispatch = useDispatch();
  const setTab = (tab) => {
    dispatch(setSelectedTab(tab));
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Drawer.Navigator
        useLegacyImplementation
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          drawerType: "slide",
          overlayColor: "transparent",
          drawerStyle: {
            flex: 1,
            width: "65%",
            paddingRight: 20,
            backgroundColor: "transparent",
          },
          sceneContainerStyle: {
            backgroundColor: "transparent",
          },
        }}
        initialRouteName="MainLayout"
        drawerContent={(props) => {
          return (
            <CustomDrawerContent
              selectedTab={selectedTab}
              setSelectedTab={setTab}
              navigation={props.navigation}
            />
          );
        }}
      >
        <Drawer.Screen name="MainLayout">
          {(props) => <MainLayout {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
