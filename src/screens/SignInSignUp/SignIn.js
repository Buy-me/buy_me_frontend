import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import { images, icons, FONTS, SIZES, COLORS } from "../../constants";

import { FormInput, TextButton } from "../../component";

import { AuthLayout } from "../";
import utils from "../../utils";
import userApi from "../../api/userApi";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState("binhdinhreact@gmail.com");
  const [password, setPassword] = React.useState("123456");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [showPass, setShowPass] = React.useState(false);

  function isEnabledSignIn() {
    return (
      email != "" && password != "" && emailError == "" && passwordError == ""
    );
  }

  const handleLogin = async () => {
    const { response, err } = await userApi.login({
      email: email,
      password: password,
    });

    if (err) {
      console.log(err);
      alert(utils.utils.capitalizeFirstLetter(err.message));
      return;
    }

    utils.utils.storeData("token", { token: response.data.token });
    ToastAndroid.show("Login successfully!", ToastAndroid.SHORT);
    navigation.navigate("Home");
  };

  return (
    <AuthLayout
      screenName="signin"
      title="Let's Sign You In"
      subtitle="Welcome back, you've been missed."
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
              height: 20,
            }}
          ></View>
          {/* Password */}
          <FormInput
            label="Password"
            secureTextEntry={!showPass}
            autoCompleteType="password"
            containerStyle={{
              marginTop: SIZES.radius,
            }}
            multiline={false}
            value={password}
            onChange={(value) => {
              // Validate email
              utils.utils.validatePassword(value, setPasswordError);
              setPassword(value);
            }}
            errorMsg={passwordError}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
                onPress={() => setShowPass(!showPass)}
              >
                <Image
                  source={showPass ? icons.eye : icons.eye_closed}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.gray,
                  }}
                ></Image>
              </TouchableOpacity>
            }
          />
          <View
            style={{
              height: 15,
            }}
          ></View>
          {/* Forgot Password */}
          <TextButton
            label="Forgot Password?"
            buttonStyle={{
              backgroundColor: null,
              alignItems: "flex-end",
            }}
            labelStyle={{
              color: COLORS.gray,
              ...FONTS.body5,
            }}
            // onPress={() => ""} // To Forgot Password
          ></TextButton>
          <View
            style={{
              height: 40,
            }}
          ></View>
          {/* Sign In Button */}
          <TextButton
            label="Sign In"
            disabled={isEnabledSignIn() ? false : true}
            buttonStyle={{
              height: 60,
              borderRadius: 10,
              backgroundColor: isEnabledSignIn()
                ? COLORS.primary
                : COLORS.transparentPrimary,
            }}
            onPress={() => {
              handleLogin();
            }}
          ></TextButton>
          {/* To Sign Up */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.darkGray,
                ...FONTS.body4,
              }}
            >
              Don't have an account?
            </Text>

            <TextButton
              label="Sign Up"
              buttonStyle={{
                marginLeft: 3,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.h4,
              }}
              onPress={() => navigation.navigate("SignUp")}
            ></TextButton>
          </View>
        </View>
      }
    ></AuthLayout>
  );
};

export default SignIn;
