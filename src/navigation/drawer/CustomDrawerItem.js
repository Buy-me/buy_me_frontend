import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES, COLORS, FONTS } from "../../constants";
import { Text, Image } from "react-native";

const CustomDrawerItem = ({ label, icon, isFocus, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 40,
        marginBottom: SIZES.base,
        alignItems: "center",
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: isFocus ? COLORS.transparentBlack1 : null,
        // backgroundColor
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.white,
        }}
      />
      <Text
        style={{
          marginLeft: 15,
          color: COLORS.white,
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomDrawerItem;
