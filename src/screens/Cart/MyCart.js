import { Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import {
  CartQuantityButton,
  FooterTotal,
  Header,
  IconButton,
  StepperInput,
} from "../../component";
import { SwipeListView } from "react-native-swipe-list-view";
import { useEffect } from "react";
import cartApi from "../../api/cartApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductQuantity,
  setProductsCart,
  setSubTotal,
} from "../../features/cart/cartSlice";

const MyCart = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, subTotal } = useSelector((state) => state.cart);

  const updateMyCart = async () => {
    //to get data from the backend
    const { response, err } = await cartApi.getMyCart();

    if (err) {
      console.log(err);
    } else {
      const data = response.data;
      //set data for redux store
      dispatch(setProductsCart(data));
    }
  };

  useEffect(() => {
    updateMyCart();
  }, []);

  useEffect(() => {
    let result = 0;
    for (let item of products) {
      result += item.food_data.price * item.quantity;
    }

    dispatch(setSubTotal(result));
  }, [products]);

  // Handler
  const updateQuantityHandler = async (newQty, id) => {
    dispatch(setProductQuantity({ newQty, id }));
    const { response, err } = await cartApi.updateFromCart({
      food_id: id,
      quantity: newQty,
    });

    // if (err) {
    //     console.log(err);
    // }
    // else {
    //     console.log(response);
    // }
  };

  const removeCartItemGHandler = async (id) => {
    const { response, err } = await cartApi.deleteFromCart({ food_id: id });

    if (err) {
      ToastAndroid.show("Cannot do this now!", ToastAndroid.SHORT);
    } else {
      updateMyCart();
      ToastAndroid.show(
        "Product has been removed from cart!",
        ToastAndroid.SHORT
      );
    }
  };

  //Renderer
  const renderHeader = () => {
    return (
      <Header
        title={"MY CART"}
        containerStyle={headerStyles.container}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={headerStyles.leftContainer}
            iconStyle={headerStyles.leftIcon}
            onPress={() => navigation.goBack()}
          />
        }
        // rightComponent={
        //     <CartQuantityButton />
        // }
      />
    );
  };

  const renderCartList = () => {
    return products.length > 0 ? (
      <SwipeListView
        data={products}
        keyExtractor={(item) => `${item.food_id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
        }}
        disableRightSwipe
        rightOpenValue={-75}
        renderItem={(data, rowMap) => (
          <View
            style={{
              height: 100,
              backgroundColor: COLORS.white,
              ...cartItemStyles.container,
            }}
          >
            <View style={cartItemStyles.imageView}>
              <Image
                source={{ uri: data.item.food_data.images.url }}
                resizeMode="contain"
                style={cartItemStyles.image}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...FONTS.body3 }}>{data.item.food_data.name}</Text>
              <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
                ${data.item.food_data.price.toFixed(2)}
              </Text>
            </View>

            <StepperInput
              containerStyle={cartItemStyles.stepperInput}
              value={data.item.quantity}
              onAdd={() =>
                updateQuantityHandler(data.item.quantity + 1, data.item.food_id)
              }
              onMinus={() => {
                if (data.item.quantity > 1) {
                  updateQuantityHandler(
                    data.item.quantity - 1,
                    data.item.food_id
                  );
                }
              }}
            />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconButton
            containerStyle={{
              ...cartItemStyles.hiddenItem,
              ...cartItemStyles.container,
            }}
            icon={icons.delete_icon}
            iconStyle={{ marginRight: 10 }}
            onPress={() => removeCartItemGHandler(data.item.food_id)}
          />
        )}
      />
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
          }}
        >
          Your cart is empty
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* Cart list */}
      {renderCartList()}

      {/* Footer */}
      <FooterTotal
        disabled={products.length > 0 ? false : true}
        subTotal={subTotal}
        shippingFee={0.0}
        total={subTotal}
        onPress={() => navigation.navigate("MyCard")}
      />
    </View>
  );
};

export default MyCart;

const cartItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  imageView: {
    width: 90,
    height: 100,
    marginLeft: -10,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 10,
  },
  stepperInput: {
    height: 50,
    width: 125,
    backgroundColor: COLORS.lightGray2,
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
  leftIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray2,
  },
});
