import { useEffect, useState } from "react";
import { Image, ImageBackground, Text, ToastAndroid, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import addressApi from "../../api/addressApi";
import {
  FormInput,
  FormInputCheck,
  Header,
  IconButton,
  RadioButton,
  TextButton,
} from "../../component";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";
import {
  addAddress,
  setAddressList,
} from "../../features/address/addressSlice";
import Utils from "../../utils";
import utils from "../../utils/Utils";

const AddAddress = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  //Redux
  const dispatch = useDispatch();

  function isEnableAddAddress() {
    return address != "" && title != "";
  }

  const handleAdd = async () => {
    const { response, err } = await addressApi.addAddress({
      title,
      address,
    });
    if (err) {
      alert(utils.utils.capitalizeFirstLetter(err.message));
      return;
    }
    dispatch(addAddress(response.data));
    ToastAndroid.show("Address has been added!", ToastAndroid.SHORT);
  };

  const renderHeader = () => {
    return (
      <Header
        title="ADD NEW ADDRESS"
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

  const renderForm = () => {
    const { utils } = Utils;
    return (
      <View style={{ marginTop: SIZES.padding * 2 }}>
        <FormInput
          label="Title Address"
          keyboardType="default"
          containerStyle={{}}
          maxLength={100}
          value={title}
          onChange={(value) => {
            utils.validateInput(value, 1, setTitleError);
            setTitle(value);
          }}
          errorMsg={titleError}
          appendComponent={<FormInputCheck value={title} error={titleError} />}
        />

        <FormInput
          label="Address"
          value={address}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => {
            utils.validateInput(value, 1, setAddressError);
            setAddress(value);
          }}
          errorMsg={addressError}
          appendComponent={
            <FormInputCheck value={address} error={addressError} />
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
          label="Add Address"
          disabled={!isEnableAddAddress()}
          buttonStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableAddAddress()
              ? COLORS.primary
              : COLORS.transparentPrimray,
          }}
          onPress={() => {
            handleAdd();
            navigation.goBack();
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
        {renderForm()}
      </KeyboardAwareScrollView>
      {renderFooter()}
    </View>
  );
};

export default AddAddress;
