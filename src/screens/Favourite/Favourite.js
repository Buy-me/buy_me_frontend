import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "../../api/cartApi";
import favouriteApi from "../../api/favouriteApi";
import { IconButton } from "../../component";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { setFavouriteProducts } from "../../features/favourite/favouriteSlice";
import utils from "../../utils";

const Favourite = () => {
  // const [myFavouriteList, setMyFavouriteList] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { favouriteProducts } = useSelector(state => state.favourite)

  useEffect(() => {
    const getFavouriteList = async () => {
      const { response, err } = await favouriteApi.getList();
      dispatch(setFavouriteProducts(response.data))
    };
    getFavouriteList();
  }, []);

  const handleAddToCart = (item) => {
    const addTocart = async () => {
      const { response, err } = await cartApi.addItemToCart({
        food_id: item.id,
        quantity: 1,
      });
      if (err) {
        alert(utils.utils.capitalizeFirstLetter(err.message));
        return;
      }

      ToastAndroid.show("Item has been added to cart!", ToastAndroid.SHORT);
      navigation.navigate("MyCart");
    };
    addTocart();
  };

  const removeItem = (item) => {
    const removeItem = async () => {
      const { response, err } = await favouriteApi.removeItem({
        food_id: item.id,
      });
      if (err) {
        console.log(err);
        alert(utils.utils.capitalizeFirstLetter(err.message));
        return;
      }

      ToastAndroid.show(
        "Item has been deleted from favourite!",
        ToastAndroid.SHORT
      );

      const list = await favouriteApi.getList();
      dispatch(setFavouriteProducts(list.response.data));
    };
    removeItem();
  };
  const renderFavouriteList = () => {
    return (
      <SwipeListView
        data={favouriteProducts}
        keyExtractor={(item) => `${item.id}`}
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
              borderColor: COLORS.lightGray1,
              borderWidth: 1,
            }}
          >
            <View style={cartItemStyles.imageView}>
              <Image
                source={{
                  uri: data.item.images.url,
                }}
                resizeMode="contain"
                style={cartItemStyles.image}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...FONTS.body3 }} numberOfLines={1}>
                {data.item.name}
              </Text>
              <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
                ${data.item.price}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleAddToCart(data.item);
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 80,
                  backgroundColor: COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                  }}
                >
                  Buy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconButton
            containerStyle={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              justifyContent: "flex-end",
              marginBottom: SIZES.radius,
              backgroundColor: COLORS.primary,
              borderColor: COLORS.lightGray2,
              borderWidth: 1,
            }}
            icon={icons.delete_icon}
            iconStyle={{ marginRight: 10 }}
            onPress={() => removeItem(data.item)}
          />
        )}
      />
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* {renderHeader()} */}

      {/* Cart list */}
      {renderFavouriteList()}

      {/* Footer */}
      {/* <FooterTotal
        subTotal={40.03}
        shippingFee={0.0}
        total={40.03}
        onPress={() => navigation.navigate("MyCard")}
      /> */}
    </View>
  );
};

const cartItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  imageView: {
    width: 100,
    alignSelf: "center",
    height: 100,
    marginLeft: -10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  stepperInput: {},

  hiddenItem: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.primary,
    marginBottom: SIZES.radius,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
export default Favourite;
