import {
  Keyboard,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  inputStyle,
  value = "",
  prependComponent,
  inputComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = "default",
  autoCompleteType = "off",
  autoCapitalize = "none",
  errorMsg = "",
  maxLength,
  editable = true,
  multiline
}) => {
  return (
    <View style={{ ...containerStyle }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>{label}</Text>
        <Text style={{ color: COLORS.red, ...FONTS.body3 }}>{errorMsg}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          height: SIZES.height > 800 ? 55 : 45,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.height > 800 ? SIZES.base : 0,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          ...inputContainerStyle,
        }}
      >
        {prependComponent}
        {inputComponent !== undefined ? (
          inputComponent
        ) : (
          <TouchableWithoutFeedback
            onPress={editable ? null : Keyboard.dismiss}
          >
            <TextInput
              style={{ flex: 1, ...inputStyle }}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoComplete={autoCompleteType}
              autoCapitalize={autoCapitalize}
              maxLength={maxLength}
              onChangeText={(text) => onChange(text)}
              editable={editable}
              multiline={multiline}
              numberOfLines={5}
            />
          </TouchableWithoutFeedback>
        )}
        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;
