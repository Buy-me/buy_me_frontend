import { Image, View } from "react-native";
import { COLORS, icons } from "../constants";

const FormInputCheck = ({ value, error, style }) => {
  return (
    <View style={{ justifyContent: "center", ...style }}>
      <Image
        source={
          value == "" || (value != "" && error == "")
            ? icons.correct
            : icons.cancel
        }
        style={{
          height: 20,
          width: 20,
          tintColor:
            value == ""
              ? COLORS.gray
              : value != "" && error == ""
              ? COLORS.green
              : COLORS.red,
        }}
      />
    </View>
  );
};
export default FormInputCheck;
