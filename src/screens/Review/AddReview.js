import { useEffect, useState } from "react";
import { Image, ImageBackground, Text, ToastAndroid, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import addressApi from "../../api/addressApi";
import foodApi from "../../api/foodApi";
import {
  FormInput,
  FormInputCheck,
  Header,
  IconButton,
  TextButton,
} from "../../component";
import {
  COLORS,
  dummyData,
  FONTS,
  icons,
  images,
  SIZES,
} from "../../constants";
import { addAddress } from "../../features/address/addressSlice";
import Utils from "../../utils";
import utils from "../../utils/Utils";

const AddReview = ({ navigation, route }) => {
  const [foodItem, setFoodItem] = useState(null);

  const [comment, setComent] = useState("");
  const [rating, setRating] = useState(5);
  const [commentErr, setCommentErr] = useState("");

  const { foodId } = route.params;

  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const getFood = async () => {
      const { response, err } = await foodApi.get(foodId);

      if (err) {
        // console.log(err);
        alert(utils.utils.capitalizeFirstLetter(err.message));
        return;
      }
      setFoodItem(response.data);
    };
    getFood();
  }, [foodId]);

  function isEnableRating() {
    return comment != "";
  }

  const handleRating = async () => {
    const { response, err } = await foodApi.rating(foodId, {
      rating,
      comment,
    });
    if (err) {
      alert(utils.utils.capitalizeFirstLetter(err.message));
      return;
    }
    ToastAndroid.show("Rating succcessfully!", ToastAndroid.SHORT);
  };

  const renderHeader = () => {
    return (
      <Header
        title="REVIEW ITEM"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={
          <View
            style={{
              width: 40,
            }}
          />
        }
      />
    );
  };
  const back = () => {
    navigation.goBack();
  };

  const renderItem = () => {
    return (
      <View
        style={{
          height: 160,
          borderRadius: 15,
          marginTop: 20,
          backgroundColor: COLORS.white,
          // backgroundColor: COLORS.red,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: foodItem?.images.url }}
          resizeMode="contain"
          style={{
            height: 170,
            width: "100%",
          }}
        />
      </View>
    );
  };
  const renderForm = () => {
    const { utils } = Utils;
    return (
      <View style={{ flexDirection: "column", marginTop: SIZES.padding * 2 }}>
        <Rating
          type="custom"
          showRating={false}
          onFinishRating={(raing) => {
            setRating(raing);
          }}
          startingValue={rating}
          imageSize={40}
          jumpValue={0.5}
          fractions={1}
          style={{
            flex: 1,
            height: 10,
            marginBottom: 40,
          }}
        />

        <FormInput
          label="Comment"
          value={comment}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            height: 300,
            padding: SIZES.padding,
            alignItems: "flex-start",
          }}
          inputStyle={{
            textAlignVertical: "top",
          }}
          onChange={(value) => {
            utils.validateInput(value, 1, setCommentErr);
            setComent(value);
          }}
          errorMsg={commentErr}
          appendComponent={
            <FormInputCheck
              value={comment}
              error={commentErr}
              style={{
                height: "100%",
                justifyContent: "flex-end",
              }}
            />
          }
        />
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View
        style={{
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TextButton
          label="Submit Rating"
          disabled={!isEnableRating()}
          buttonStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableRating()
              ? COLORS.primary
              : COLORS.transparentPrimray,
          }}
          onPress={() => {
            handleRating();
            setTimeout(function () {
              back();
            }, 500);
          }}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renderHeader()}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {renderItem()}
        {renderForm()}
      </KeyboardAwareScrollView>
      {renderFooter()}
    </View>
  );
};

export default AddReview;
