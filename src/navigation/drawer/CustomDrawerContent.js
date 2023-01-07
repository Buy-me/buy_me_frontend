import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  COLORS,
  constants,
  dummyData,
  FONTS,
  icons,
  SIZES,
} from "../../constants";
import CustomDrawerItem from "./CustomDrawerItem";

const CustomDrawerContent = ({ navigation, setSelectedTab, selectedTab }) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
        }}
      >
        {/* Close */}
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{
                height: 30,
                width: 30,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
          onPress={() => console.log("Profile")}
        >
          <Image
            source={dummyData.myProfile?.profile_image}
            style={{
              height: 50,
              width: 50,
              borderRadius: SIZES.radius,
            }}
          />

          <View
            style={{
              marginLeft: SIZES.radius,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              {dummyData.myProfile?.name}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body4,
              }}
            >
              View Your Profile
            </Text>
          </View>
        </TouchableOpacity>
        {/* Drawer Items */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding,
          }}
        >
          <CustomDrawerItem
            label={constants.screens.home}
            icon={icons.home}
            isFocus={selectedTab === constants.screens.home}
            onPress={() => {
              setSelectedTab(constants.screens.home);
              navigation.navigate("MainLayout");
            }}
          />
          <CustomDrawerItem
            label={constants.screens.my_wallet}
            icon={icons.wallet}
            isFocus={selectedTab === constants.screens.my_wallet}
            onPress={() => {
              setSelectedTab(constants.screens.my_wallet);
              navigation.navigate("My Wallet");
            }}
          />
          <CustomDrawerItem
            label={constants.screens.notification}
            icon={icons.notification}
            isFocus={selectedTab === constants.screens.notification}
            onPress={() => {
              setSelectedTab(constants.screens.notification);
              navigation.navigate("Address");
            }}
          />
          <CustomDrawerItem
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocus={selectedTab === constants.screens.favourite}
            onPress={() => {
              setSelectedTab(constants.screens.favourite);
              navigation.navigate("MainLayout");
            }}
          />
          {/* Line Divider */}
          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          ></View>
          <CustomDrawerItem label={"Track Your Order"} icon={icons.location} onPress={() => navigation.navigate("Order History")} />
          <CustomDrawerItem label={"My Cart"} icon={icons.coupon} onPress={() => navigation.navigate("MyCart")}/>
          <CustomDrawerItem
            label={"Settings"}
            icon={icons.setting}
            onPress={() => navigation.navigate("MyAccount")}
          />
          <CustomDrawerItem
            label={"Invite a  Friend"}
            icon={icons.profile}
            onPress={() => navigation.navigate("ChangePassword")}
          />
          <CustomDrawerItem label={"Help Center"} icon={icons.help} />
        </View>

        {/* Logout */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <CustomDrawerItem
            label={"Logout"}
            icon={icons.logout}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
