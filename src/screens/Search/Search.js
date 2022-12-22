import React from "react";
import { Image, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, icons, SIZES, FONTS } from "../../constants";

const Search = () => {
  const renderSearch = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/* Icons */}
        <Image
          source={icons.search}
          style={{
            tintColor: COLORS.black,
            height: 20,
            width: 20,
          }}
        />

        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder="search food..."
        />

        <TouchableOpacity>
          <Image
            source={icons.filter}
            style={{
              tintColor: COLORS.black,
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* {renderSearch()} */}
    </View>
  );
};

export default Search;
