import React from "react";
import { View, Image, ToastAndroid } from "react-native";

import { icons, SIZES, COLORS } from "../../constants";

import { FormInput, TextButton } from "../../component";
import AuthLayout from "./AuthLayout";
import utils from "../../utils";
import userApi from "../../api/userApi";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = React.useState("binhdinhreact@gmail.com");
  const [emailError, setEmailError] = React.useState("");

  function isEnabledResetPassword() {
    return email != "" && emailError == "";
  }

  const handleForgotPassword = async () => {
    const { response, err } = await userApi.forgotPassword({
      email: email,
    });

    if (err) {
      console.log(err);
      alert(utils.utils.capitalizeFirstLetter(err.message));
      return;
    }

    ToastAndroid.show(response.data, ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <AuthLayout
      screenName="signin"
      title="Forgot your password ?"
      subtitle="Enter your email address to retrieve your password"
      chidren={
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding * 2,
          }}
        >
          {/* Form Inputs */}
          {/* Email */}
          <FormInput
            label="Email"
            keyboardType="email-address"
            autoCompleteType="email"
            value={email}
            onChange={(value) => {
              // Validate email
              utils.utils.validateEmail(value, setEmailError);
              setEmail(value);
            }}
            errorMsg={emailError}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    email == "" || (email != "" && emailError == "")
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      email == ""
                        ? COLORS.gray
                        : email != "" && emailError == ""
                        ? COLORS.green
                        : COLORS.red,
                  }}
                ></Image>
              </View>
            }
          />
          <View
            style={{
              height: 40,
            }}
          ></View>

          {/* Reset Button */}
          <TextButton
            label="Reset Password"
            disabled={isEnabledResetPassword() ? false : true}
            buttonStyle={{
              height: 60,
              borderRadius: 10,
              backgroundColor: isEnabledResetPassword()
                ? COLORS.primary
                : COLORS.transparentPrimary,
            }}
            onPress={() => {
              handleForgotPassword();
            }}
          ></TextButton>
        </View>
      }
    ></AuthLayout>
  );
};

export default ForgotPassword;
