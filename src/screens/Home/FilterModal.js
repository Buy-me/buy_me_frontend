import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  TextButtonTag,
  TextIconButton,
  TextButtonFilter,
  TwoPointSlider,
} from "../../component";

// import Animated from "react-native-reanimated";
import { COLORS, constants, FONTS, icons, SIZES } from "../../constants";
import { setSelectedCategory } from "../../features/category/categorySlice";
import {
  setIsLoading,
  setPrices,
  setRating,
} from "../../features/food/foodSlice";

const Section = ({ title, children, containerStyle }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        ...containerStyle,
      }}
    >
      <Text style={{ ...FONTS.h3 }}>{title}</Text>
      {children}
    </View>
  );
};

const FilterModal = ({
  isVisible,
  onClose,
  handleFilter,
  handleResetFilter,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const modelAnimatedValue = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const { selectedCategory, categories } = useSelector(
    (state) => state.category
  );

  const { rating, prices } = useSelector((state) => state.food);

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modelAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modelAnimatedValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modelAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  const renderPrice = () => {
    return (
      <Section title="Pricing Range (USD)">
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TwoPointSlider
            values={prices}
            min={1}
            max={20}
            postfix=""
            onValueChange={(values) => {
              dispatch(setPrices(values));
            }}
          />
        </View>
      </Section>
    );
  };

  const renderRatings = () => {
    return (
      <Section
        title="Ratings"
        containerStyle={{
          marginTop: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {constants.ratings.map((item, index) => {
            return (
              <TextIconButton
                key={`Rating-${index}`}
                containerStyle={{
                  flex: 1,
                  height: 50,
                  margin: 5,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == rating ? COLORS.primary : COLORS.lightGray2,
                }}
                label={item.label}
                labelStyle={{
                  color: item.id == rating ? COLORS.white : COLORS.gray,
                }}
                iconPosition="RIGHT"
                icon={icons.star}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: item.id == rating ? COLORS.white : COLORS.gray,
                }}
                onPress={() => {
                  dispatch(setRating(item.id));
                }}
              />
            );
          })}
        </View>
      </Section>
    );
  };

  const renderTags = () => {
    return (
      <Section title={"Categories"}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {categories.map((item, index) => {
            return (
              <TextButtonTag
                key={`Tags-${index}`}
                label={item.name}
                labelStyle={{
                  color:
                    item.id == selectedCategory?.id
                      ? COLORS.white
                      : COLORS.gray,
                  ...FONTS.body3,
                }}
                buttonContainerStyle={{
                  height: 50,
                  margin: 5,
                  paddingHorizontal: SIZES.padding,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == selectedCategory?.id
                      ? COLORS.primary
                      : COLORS.lightGray2,
                }}
                onPress={() => dispatch(setSelectedCategory(item))}
              ></TextButtonTag>
            );
          })}
        </View>
      </Section>
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack7,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setShowFilterModal(false);
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                ...FONTS.h3,
                fontSize: 18,
              }}
            >
              Filter Your Search
            </Text>
            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => setShowFilterModal(false)}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}
          >
            {renderPrice()}
            {renderRatings()}
            {renderTags()}
          </ScrollView>
          {/* Button */}
          <View
            style={{
              position: "absolute",
              bottom: 150,
              left: 0,
              right: 0,
              height: 110,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TextButtonTag
                label={"Reset"}
                labelStyle={{
                  color: COLORS.primary,
                }}
                buttonContainerStyle={{
                  flex: 1,
                  height: 50,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}
                onPress={() => {
                  setShowFilterModal(false);
                  dispatch(setIsLoading(true));
                  dispatch(setPrices([0, 0]));
                  dispatch(setRating(0));
                  handleResetFilter();
                }}
              ></TextButtonTag>
              <TextButtonTag
                label={"Apply Filter"}
                buttonContainerStyle={{
                  flex: 2,
                  height: 50,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.primary,
                  marginLeft: 20,
                }}
                onPress={() => {
                  setShowFilterModal(false);
                  dispatch(setIsLoading(true));
                  handleFilter();
                }}
              ></TextButtonTag>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
