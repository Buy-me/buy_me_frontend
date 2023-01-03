import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { Header, IconButton } from "../../component";

import utils from "../../utils";
import { Rating } from "react-native-ratings";
import foodApi from "../../api/foodApi";
import { useIsFocused } from "@react-navigation/native";

const ratings = [
  {
    id: 0,
    address: "Nice is delicioussssss",
    rating: 4.5,
  },
  {
    id: 1,
    address: "Nice is delicioussssss",
    rating: 5,
  },
  {
    id: 2,
    title: "University of Informaton Technology",
    rating: 4,
  },
  {
    id: 3,
    address: "Nice is delicioussssss",
    rating: 1,
  },
  {
    id: 4,
    address: "Nice is delicioussssss",
    rating: 2,
  },
];
const Review = ({ route, navigation }) => {
  if (!route.params) {
    navigation.navigate("Home");
    return;
  }
  const [reviewList, setReviewList] = useState([]);
  const isFocused = useIsFocused();

  const { foodId } = route.params;

  // handle render address first time
  useEffect(() => {
    const getReviews = async () => {
      const { response, err } = await foodApi.getRatingList(foodId);

      if (err) {
        // console.log(err);
        alert(utils.utils.capitalizeFirstLetter(err.message));
        return;
      }

      setReviewList(response.data);
    };

    if (isFocused) {
      console.log("reload");
      getReviews();
    }
  }, [isFocused]);

  //handle delete address
  //Renderer
  const renderHeader = () => {
    return (
      <Header
        title={"REVIEW LIST"}
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
            icon={icons.review}
            containerStyle={headerStyles.rightContainer}
            iconStyle={headerStyles.rightIcon}
            onPress={() =>
              navigation.navigate("Add Review", {
                foodId: foodId,
              })
            }
          />
        }
      />
    );
  };

  const renderReviewList = () => {
    return (
      <FlatList
        keyExtractor={(item) => `review_${item.id}`}
        data={reviewList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
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
              This product has no reviews yet
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: COLORS.lightGray2,
              ...reviewItemStyles.container,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                icon={icons.user}
                containerStyle={reviewItemStyles.imageView}
                iconStyle={reviewItemStyles.image}
              />
              <View
                style={{ alignItems: "flex-start", justifyContent: "center" }}
              >
                <Text
                  style={{ ...FONTS.h3, color: COLORS.darkGray }}
                  numberOfLines={2}
                >
                  {item.user.first_name + item.user.last_name || "N/A"}
                </Text>
                <Rating
                  type="custom"
                  showRating={false}
                  onFinishRating={() => {}}
                  startingValue={item.rating}
                  jumpValue={0.5}
                  fractions={1}
                  imageSize={20}
                  tintColor={COLORS.lightGray2}
                  style={{
                    flex: 1,
                    height: 10,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                paddingVertical: SIZES.radius,
              }}
            >
              <Text>{item?.comment}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 30 }}></View>}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* Cart list */}
      {renderReviewList()}
    </View>
  );
};

export default Review;

const reviewItemStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    paddingVertical: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  imageView: {
    paddingTop: 3,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    tintColor: COLORS.darkGray,
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
    // marginTop: -5,
  },
});
