import { Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";
import {
  CartQuantityButton,
  FooterTotal,
  Header,
  IconButton,
  StepperInput,
} from "../../component";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  setAddressList,
  setSelectedAddress,
} from "../../features/address/addressSlice";
import addressApi from "../../api/addressApi";
import utils from "../../utils";

const address = [
  {
    id: 0,
    title: "Le Quy Don Highschool",
    address: "123 Tran Hung Dao Street, Ward 2, District 1",
  },
  {
    id: 1,
    title: "Le Quy Don Highschool",
    address: "123 Tran Hung Dao Street, Ward 2, District 1",
  },
  {
    id: 2,
    title: "University of Informaton Technology",
    address: "123 Tran Hung Dao Street, Ward 2, District 1",
  },
  {
    id: 3,
    title: "Ben Thanh Market",
    address: "123 Tran Hung Dao Street, Ward 2, District 1",
  },
];
const Address = ({ navigation }) => {
  const dispatch = useDispatch();
  const { addressList } = useSelector((state) => state.address);

  // handle render address first time
  useEffect(() => {
    const getAddresses = async () => {
      const { response, err } = await addressApi.getList();

      if (err) {
        // console.log(err);
        alert(utils.utils.capitalizeFirstLetter(err.message));
        return;
      }
      dispatch(setAddressList(response.data));
    };
    getAddresses();
  }, []);

  //handle delete address

  const handleDelete = async (item) => {
    const { err } = await addressApi.deleteAddress(item.id);
    if (err) {
      alert(utils.utils.capitalizeFirstLetter(err.message));
      return;
    }
    dispatch(deleteAddress(item.id));
    ToastAndroid.show("Delete successfully!", ToastAndroid.SHORT);
  };

  //Renderer
  const renderHeader = () => {
    return (
      <Header
        title={"ADDRESS LIST"}
        containerStyle={headerStyles.container}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={headerStyles.leftContainer}
            iconStyle={headerStyles.leftIcon}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={
          <IconButton
            icon={icons.address}
            containerStyle={headerStyles.rightContainer}
            iconStyle={headerStyles.rightIcon}
            onPress={() => navigation.navigate("Add Address")}
          />
        }
      />
    );
  };

  const renderAddressList = () => {
    return (
      <SwipeListView
        data={addressList}
        keyExtractor={(item) => `Address_${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          // marginBottom: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          borderTopColor: COLORS.lightGray1,
          borderTopWidth: 1,
        }}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                ...FONTS.h4,
                textAlign: "center",
                color: COLORS.darkGray,
              }}
            >
              You still don't have a shipping address
            </Text>
          </View>
        }
        disableRightSwipe
        rightOpenValue={-75}
        renderItem={(data, rowMap) => (
          <View
            style={{
              height: 100,
              backgroundColor: COLORS.lightGray2,
              ...cartItemStyles.container,
            }}
          >
            {/* <View style={cartItemStyles.imageView}>
              <Image
                source={icons.recent}
                resizeMode="contain"
                style={cartItemStyles.image}
              /> */}

            <IconButton
              icon={icons.recent}
              containerStyle={cartItemStyles.imageView}
              iconStyle={cartItemStyles.image}
              onPress={() => {
                dispatch(setSelectedAddress(data.item));
                navigation.goBack();
              }}
            />
            {/* </View> */}
            <View style={{ flex: 1 }}>
              <Text
                style={{ ...FONTS.h3, color: COLORS.darkGray }}
                numberOfLines={2}
              >
                {data.item.title}
              </Text>
              <Text
                style={{ ...FONTS.body4, color: COLORS.darkGray2 }}
                numberOfLines={3}
              >
                {data.item.address}
              </Text>
            </View>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconButton
            containerStyle={{
              ...cartItemStyles.container,
              ...cartItemStyles.hiddenItem,
            }}
            icon={icons.delete_icon}
            iconStyle={{ marginRight: 10 }}
            onPress={() => handleDelete(data.item)}
          />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* Cart list */}
      {renderAddressList()}
    </View>
  );
};

export default Address;

const cartItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    paddingVertical: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  imageView: {
    width: 80,
    height: 80,
    marginLeft: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "70%",
    height: "70%",
    position: "absolute",
    tintColor: COLORS.darkGray,
  },
  stepperInput: {
    height: 50,
    width: 125,
    backgroundColor: COLORS.white,
  },

  hiddenItem: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.primary,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

const headerStyles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: SIZES.padding,
    marginTop: 40,
  },
  leftContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray2,
  },
  rightContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray2,
  },
  leftIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray2,
  },
  rightIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.primary,
    marginTop: -5,
  },
});
