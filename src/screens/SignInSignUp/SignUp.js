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

const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState("binhdinhreact@gmail.com");
  const [username, setUsername] = React.useState("thaibinhdeptrai");
  const [password, setPassword] = React.useState("123456");
  const [emailError, setEmailError] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [showPass, setShowPass] = React.useState(false);

  function isEnabledSignUp() {
    return (
      email != "" &&
      username != "" &&
      password != "" &&
      emailError == "" &&
      usernameError == "" &&
      passwordError == ""
    );
  }

  const handleResgister = async () => {
    const { err } = await userApi.register({
      email: email,
      password: password,
      first_name: username,
      last_name: username,
    });
    if (err) {
      alert(utils.utils.capitalizeFirstLetter(err.message));
      return;
    }
    ToastAndroid.show("Register successfully!", ToastAndroid.SHORT);
    navigation.navigate("SignIn");
  };

  return (
    <AuthLayout
      screenName="signup"
      title="Getting Started"
      subtitle="Create an account to continue!"
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
          {/* Username */}
          <FormInput
            label="Username"
            keyboardType="username"
            autoCompleteType="username"
            value={username}
            onChange={(value) => {
              utils.utils.validateUsername(value, setUsernameError);
              setUsername(value);
            }}
            errorMsg={usernameError}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.correct}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: username == "" ? COLORS.gray : COLORS.green,
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
              height: 40,
            }}
          ></View>
          {/* Sign Up Button */}
          <TextButton
            label="Sign Up"
            disabled={isEnabledSignUp() ? false : true}
            buttonStyle={{
              height: 60,
              borderRadius: 10,
              backgroundColor: isEnabledSignUp()
                ? COLORS.primary
                : COLORS.transparentPrimary,
            }}
            onPress={() => {
              handleResgister();
            }}
          ></TextButton>
          {/* To Sign In */}
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
              Already have an account?
            </Text>

            <TextButton
              label="Sign In"
              buttonStyle={{
                marginLeft: 3,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.h4,
              }}
              onPress={() => navigation.navigate("SignIn")}
            ></TextButton>
          </View>
        </View>
      }
    ></AuthLayout>
  );
};

export default SignUp;
