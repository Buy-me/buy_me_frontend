import { Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";
import {
  COLORS,
  FONTS,
  icons,
  SIZES,
} from "../../constants";
import {
  CartQuantityButton,
  Header,
  IconButton,
  IconLabel,
  LineDivider,
  StepperInput,
  TextIconButton,
} from "../../component";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../api/cartApi";
import { setProductsCart } from "../../features/cart/cartSlice";

const FoodDetail = ({ navigation }) => {
  const dispatch = useDispatch()
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false)

  const { selectedFood } = useSelector(state => state.food)

  //Handler
  const handleAddToCart = async () => {
    const { response, err } = await cartApi.addToCart({
      food_id: selectedFood.id,
      quantity: foodQuantity
    })

    if (err) {
      ToastAndroid.show("This product is already added in the cart!", ToastAndroid.SHORT)
    }
    else {
      ToastAndroid.show("Product has been added!", ToastAndroid.SHORT)
      //update my cart
      const { response, err } = await cartApi.getMyCart()
      if (err) {
        console.log(err);
      }
      else {
        const data = response.data
        //update for redux store
        dispatch(setProductsCart(data))
      }
    }
  }

  //Renderer
  const renderHeader = () => {
    return (
      <Header
        title={"DETAILS"}
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
          <CartQuantityButton
            onPress={() => navigation.navigate("MyCart")}
          />
        }
      />
    );
  };

  const renderDetails = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Food card */}
        <View
          style={{
            height: 190,
            borderRadius: 15,
            backgroundColor: COLORS.white,
          }}
        >
          {/* calories and favourite */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: SIZES.base,
              paddingHorizontal: SIZES.radius,
            }}
          >
            {/* calories */}
            {/* <View style={{ flexDirection: "row" }}>
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
                  ...FONTS.body4,
                }}
              >
                {" "}
                70 calories
              </Text>
            </View> */}

            {/* favourite */}
            {/* <Image
              source={icons.love}
              style={{
                width: 20,
                height: 20,
                tintColor: foodItem?.isFavourite ? COLORS.primary : COLORS.gray,
              }}
            /> */}
          </View>

          <Image
            source={{ uri: selectedFood?.images.url }}
            resizeMode="contain"
            style={{
              height: 170,
              width: "100%",
            }}
          />
        </View>

        {/* Food Info */}
        <View style={{ marginTop: SIZES.padding }}>
          {/* Name and description */}
          <View style={{
            flexDirection: "column",
            // alignItems: "center"
          }}>
            <Text
              style={{
                ...FONTS.h1,
                // marginRight: 20
              }}
            >
              {selectedFood?.name}
            </Text>
            {/* rating */}
            <IconLabel
              containerStyle={{
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 0
              }}
              icon={icons.star}
              iconPosition="LEFT"
              iconStyle={{
                tintColor: "#FDD836",
                width: 15,
                height: 15,
              }}
              label={selectedFood?.rating.toFixed(1)}
              labelStyle={{ color: COLORS.gray }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.darkGray,
              textAlign: "justify",
              ...FONTS.body3,
            }}
          >
            {selectedFood?.description}
          </Text>

          {/* Add note */}
          <TextIconButton
            containerStyle={{
              flex: 1,
              height: 40,
              marginTop: 15
            }}
            icon={icons.note}
            iconStyle={{ tintColor: COLORS.transparentPrimray }}
            label="Add note..."
            labelStyle={{
              flex: 1,
              color: COLORS.transparentBlack1,
              textAlign: "left",
              marginLeft: 10,
              ...FONTS.h3,
            }}
          />

          {/* Quantity and Favourite */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
            }}
          >
            <StepperInput
              value={foodQuantity}
              onAdd={() => setFoodQuantity(foodQuantity + 1)}
              onMinus={() => {
                if (foodQuantity > 1) setFoodQuantity(foodQuantity - 1)
              }}
            />

            <TextIconButton
              containerStyle={{
                flex: 1,
                height: 55,
                marginLeft: SIZES.radius,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              icon={isFavourite ? icons.love : icons.favourite}
              iconStyle={{ tintColor: COLORS.white }}
              label={isFavourite ? "Remove Favourite" : "Add to Favourite"}
              labelStyle={{
                flex: 1,
                color: COLORS.white,
                textAlign: "center",
                ...FONTS.h3,
              }}
              onPress={() => setIsFavourite(!isFavourite)}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderExtraInfo = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Image
          source={images.profile}
          style={{
            width: 50,
            height: 50,
            borderRadius: SIZES.radius,
          }}
        />

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <Text style={{ ...FONTS.h3 }}>This is a restaurant</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
            1.2 KM away from you
          </Text>
        </View>
        <Rating rating={4} iconStyle={{ marginLeft: 3 }} /> */}
        {/* Category */}
        <IconLabel
          containerStyle={{
            marginHorizontal: SIZES.radius,
            paddingHorizontal: 0,
          }}
          iconPosition="LEFT"
          icon={icons.category}
          iconStyle={{ tintColor: COLORS.black }}
          label={"Coffee"} //TODO: CHANGE
        />

        {/* shipping */}
        <IconLabel
          containerStyle={{
            marginHorizontal: SIZES.radius,
            paddingHorizontal: 0,
          }}
          iconPosition="LEFT"
          icon={icons.dollar}
          iconStyle={{ tintColor: COLORS.black }}
          label="Free Shipping"
        />
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 100,
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}
      >
        {/* <TextButton
          buttonStyle={{
            flex: 1,
            flexDirection: "row",
            height: 60,
            // marginLeft: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          label={"Buy Now"}
          label2={"$15.99"}
          onPress={() => navigation.navigate("MyCart")}
        /> */}

        <TextIconButton
          containerStyle={{
            flex: 1,
            flexDirection: "row",
            height: 60,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
            justifyContent: "space-between",
            alignItems: "center"
          }}
          label={"Add to Cart"}
          labelStyle={{
            color: COLORS.white,
            textAlign: "left",
            ...FONTS.h3,
          }}
          label2={`$${(foodQuantity * selectedFood?.price).toFixed(2)}`}
          label2Style={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
          icon={icons.cart}
          iconStyle={{ tintColor: COLORS.white }}
          onPress={handleAddToCart}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* Body */}
      <ScrollView>
        {/* detail */}
        {renderDetails()}

        <LineDivider />

        {/* extra info */}
        {renderExtraInfo()}
      </ScrollView>

      {/* Footer */}
      <LineDivider />

      {renderFooter()}
    </View>
  );
};

export default FoodDetail;

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
  leftIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray2,
  },
});
