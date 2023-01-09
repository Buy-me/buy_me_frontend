import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import {
  GrayLayout,
  IconLabel,
  LineDivider,
  TextIconButton,
} from "../../component";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView>
      <View style={styles.contentContainer}>
        <GrayLayout>
          <TouchableOpacity onPress={() => navigation.navigate("MyAccount")}>
            <IconLabel
              icon={icons.user}
              iconStyle={{
                tintColor: COLORS.black,
                width: 25,
                height: 25,
              }}
              label={"My Account"}
              labelStyle={{
                ...FONTS.body3,
                fontSize: 18,
                marginLeft: 35,
              }}
              containerStyle={{ alignItems: "center" }}
            />
          </TouchableOpacity>

          <LineDivider
            lineStyle={{
              backgroundColor: COLORS.white,
              marginVertical: 15,
            }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <IconLabel
              icon={icons.padlock}
              iconStyle={{
                tintColor: COLORS.black,
                width: 25,
                height: 25,
              }}
              label={"Change Password"}
              labelStyle={{
                ...FONTS.body3,
                fontSize: 18,
                marginLeft: 35,
              }}
              containerStyle={{ alignItems: "center" }}
            />
          </TouchableOpacity>

          <LineDivider
            lineStyle={{
              backgroundColor: COLORS.white,
              marginVertical: 15,
            }}
          />

          <TouchableOpacity onPress={handleLogout}>
            <IconLabel
              icon={icons.logout}
              iconStyle={{
                tintColor: COLORS.black,
                width: 25,
                height: 25,
              }}
              label={"Logout"}
              labelStyle={{
                ...FONTS.body3,
                fontSize: 18,
                marginLeft: 35,
              }}
              containerStyle={{ alignItems: "center" }}
            />
          </TouchableOpacity>
        </GrayLayout>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: SIZES.padding,
    paddingVertical: 15,
  },
});
