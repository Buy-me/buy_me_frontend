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
import {
  IconButton,
  TextButtonTag,
  TextIconButton,
  TwoPointSlider,
} from "../../component";

// import Animated from "react-native-reanimated";
import { COLORS, constants, FONTS, icons, SIZES } from "../../constants";

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

const FilterModal = ({ isVisible, onClose }) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const modelAnimatedValue = useRef(new Animated.Value(0)).current;

  const [ratings, setRatings] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modelAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modelAnimatedValue, {
        toValue: 0,
        duration: 500,
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
            values={[3, 10]}
            min={1}
            max={20}
            postfix=""
            onValueChange={() => {
              (value) => console.log(value);
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
                    item.id == ratings ? COLORS.primary : COLORS.lightGray2,
                }}
                label={item.label}
                labelStyle={{
                  color: item.id == ratings ? COLORS.white : COLORS.gray,
                }}
                iconPosition="RIGHT"
                icon={icons.star}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: item.id == ratings ? COLORS.white : COLORS.gray,
                }}
                onPress={() => {
                  setRatings(item.id);
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
      <Section title={"Tags"}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {constants.tags.map((item, index) => {
            return (
              <TextButtonTag
                key={`Tags-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == tags ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                buttonContainerStyle={{
                  height: 50,
                  margin: 5,
                  paddingHorizontal: SIZES.padding,
                  alignItems: "center",
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == tags ? COLORS.primary : COLORS.lightGray2,
                }}
                onPress={() => setTags(item.id)}
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
            <TextButtonTag
              label={"Apply Filter"}
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                console.log("Aplly");
              }}
            ></TextButtonTag>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
