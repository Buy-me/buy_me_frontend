import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import categoryApi from "../../api/categoryApi";
import { HorizontalFoodCard, VerticalFoodCard } from "../../component";
import {
  COLORS,
  constants,
  dummyData,
  FONTS,
  icons,
  SIZES,
} from "../../constants";
import Search from "../Search/Search";
import FilterModal from "./FilterModal";
import {
  setSelectedCategory,
  setCategories,
} from "../../features/category/categorySlice";
import {
  setFoods,
  setIsLoading,
  setPopulars,
  setRecommends,
  setSelectedFood,
} from "../../features/food/foodSlice";
import foodApi from "../../api/foodApi";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import favouriteApi from "../../api/favouriteApi";
import { setFavouriteProducts } from "../../features/favourite/favouriteSlice";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.body3,
              textDecorationLine: "underline",
            }}
          ></Text>
        </TouchableOpacity>
      </View>
      {/* Content */}
      {children}
    </View>
  );
};

const DEFAULT_PAGINATION = {
  total_items: 3,
  total: 1,
  page: 1,
  limit: 3,
};

const Home = ({ type }) => {
  const navigation = useNavigation();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [populars, setPopulars] = useState([]);
  const [selectedMenuType, setSelectedMenuType] = useState({
    id: 1,
    name: "Newest",
    sort: "id desc",
  });
  const [filters, setFilters] = useState({
    search: "",
    minPrice: 0,
    maxPrice: 0,
    rating: 0,
  });
  const [search, setSearch] = useState("");
  let content;

  //Redux Category
  const dispatch = useDispatch();
  const { selectedCategory, categories } = useSelector(
    (state) => state.category
  );
  // Redux Food
  const { foods, rating, prices } = useSelector((state) => state.food);

  const { selectedAddress } = useSelector((state) => state.address);

  useEffect(() => {
    const getFoods = async () => {
      const { response, err } = await foodApi.getList(
        pagination,
        filters,
        selectedCategory?.id || 0,
        selectedMenuType.sort
      );

      if (err) {
        // enqueueSnackbar(err.message, {
        //   variant: "error",
        // });
        console.log(err.message);
        return;
      }
      //  dispatch(setIsLoading(false));
      //  dispatch(setFoods(response.data));
      //  dispatch(setRecommends(response.data));
      //  dispatch(setPopulars(response.data));
      dispatch(setFoods(response.data));
      setPagination({ ...response.paging, total_items: response.data.length });
    };

    getFoods();
  }, [
    pagination.page,
    pagination.limit,
    pagination.total,
    filters.search,
    filters.maxPrice,
    filters.minPrice,
    filters.rating,
    selectedCategory,
    selectedMenuType,
  ]);

  useEffect(() => {
    const getFavouriteList = async () => {
      const { response, err } = await favouriteApi.getList();
      dispatch(setFavouriteProducts(response.data));
    };
    getFavouriteList();
  }, []);

  useEffect(() => {
    const getPopularList = async () => {
      const { response, err } = await foodApi.getPopularList();

      console.log(err);
      console.log(response.data);
      setPopulars(response.data);
    };
    getPopularList();
  }, []);

  // handle render category first time
  useEffect(() => {
    const getCategories = async () => {
      const { response, err } = await categoryApi.getList();
      dispatch(setCategories(response.data));
    };
    getCategories();
  }, []);

  const handleFilter = () => {
    setPagination(DEFAULT_PAGINATION);
    setFilters({
      minPrice: prices[0],
      maxPrice: prices[1],
      rating: rating,
      search: search,
    });
  };

  const handleResetFilter = () => {
    setPagination(DEFAULT_PAGINATION);
    setFilters({
      minPrice: prices[0],
      maxPrice: prices[1],
      rating: rating,
      search: search,
    });
  };

  const handeClickItem = (item) => {
    navigation.navigate("FoodDetail", {
      foodId: item.id,
    });
  };

  const renderMenuTypes = () => {
    return (
      <FlatList
        horizontal
        keyExtractor={(item) => `${item.id}`}
        data={dummyData.menu}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index == dummyData.menu.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() => {
                setSelectedMenuType(item);
              }}
            >
              <Text
                style={{
                  color:
                    selectedMenuType.id == item.id
                      ? COLORS.primary
                      : COLORS.black,
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  // const renderRecommendedSection = () => {
  //   return (
  //     <Section
  //       title="Latest"
  //       onPress={() => console.log("Show All Recommended")}
  //     >
  //       {recommends.length != 0 ? (
  //         <FlatList
  //           data={recommends}
  //           keyExtractor={(item) => `${item.id}`}
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           renderItem={({ item, index }) => (
  //             <HorizontalFoodCard
  //               containerStyle={{
  //                 height: 160,
  //                 width: SIZES.width * 0.85,
  //                 marginVertical: 10,
  //                 marginLeft: index == 0 ? SIZES.padding : 18,
  //                 marginRight:
  //                   index == recommends.length - 1 ? SIZES.padding : 0,
  //                 paddingRight: SIZES.radius,
  //                 alignItems: "center",
  //                 borderColor: COLORS.lightGray1,
  //                 borderWidth: 1,
  //               }}
  //               imageStyle={{
  //                 marginLeft: 15,
  //                 marginRight: 10,
  //                 borderRadius: SIZES.radius,
  //                 height: 130,
  //                 width: 130,
  //                 alignSelf: "center",
  //               }}
  //               item={item}
  //               onPress={() => handeClickItem(item)}
  //             />
  //           )}
  //         />
  //       ) : (
  //         <View
  //           style={{
  //             marginHorizontal: SIZES.padding,
  //           }}
  //         >
  //           <Text style={{ ...FONTS.body4 }}>
  //             No items found. Please chose the orther category or try again
  //           </Text>
  //         </View>
  //       )}
  //     </Section>
  //   );
  // };

  const renderPopularSection = () => {
    return (
      <Section
        title="Popular"
        onPress={() => console.log("Show all popular items")}
      >
        {populars.length != 0 ? (
          <FlatList
            data={populars}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <VerticalFoodCard
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight: index == populars.length - 1 ? SIZES.padding : 0,
                  borderColor: COLORS.lightGray1,
                  borderWidth: 1,
                }}
                item={item}
                onPress={() => handeClickItem(item)}
              />
            )}
          />
        ) : (
          <View
            style={{
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text style={{ ...FONTS.body4 }}>
              No items found. Please chose the orther category or try again
            </Text>
          </View>
        )}
      </Section>
    );
  };

  const renderFoodCategories = () => {
    return (
      <FlatList
        data={categories}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setSelectedCategory(item));
            }}
            style={{
              flexDirection: "row",
              height: 55,
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight: index == categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
          >
            <Image
              source={{
                uri: item.icon.url,
              }}
              style={{
                // marginTop: 5,
                alignSelf: "center",
                marginRight: 5,

                height: 35,
                width: 35,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                marginRight: SIZES.base,
                color:
                  selectedCategory?.id == item.id
                    ? COLORS.white
                    : COLORS.darkGray,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

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
          borderColor: COLORS.lightGray1,
          borderWidth: 1,
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
          value={search}
          placeholder="search food..."
          onChangeText={(newText) => {
            setSearch(newText);
          }}
          onSubmitEditing={() => {
            handleFilter();
          }}
        />

        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
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

  const renderDeliveryTo = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.body3,
          }}
        >
          DELIVERY TO
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Address")}
        >
          <Text style={{ ...FONTS.h3 }}>
            {selectedAddress
              ? selectedAddress.title
              : "Choose the delivery addresses"}
          </Text>
          <Image
            source={icons.down_arrow}
            style={{
              marginLeft: SIZES.base,
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (type == constants.screens.home) {
    content = (
      <View>
        {/* Delivery Address */}
        {renderDeliveryTo()}
        {/* Category */}
        {renderFoodCategories()}
        {/*  Popular */}
        {renderPopularSection()}
        {/*  Recommended */}
        {/* {renderRecommendedSection()} */}

        {renderMenuTypes()}
      </View>
    );
  } else {
    content = null;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {renderSearch()}

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          handleFilter={handleFilter}
          handleResetFilter={handleResetFilter}
        />
      )}

      {/* Flat List */}
      <FlatList
        data={foods}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={content}
        ListFooterComponent={
          <View
            style={{
              height: 150,
            }}
          >
            {foods.length == 0 ? (
              <View
                style={{
                  marginHorizontal: SIZES.padding,
                }}
              >
                <Text style={{ ...FONTS.body4 }}>
                  No items found. Please chose the orther category or try again
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: "center",
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
                borderColor: COLORS.lightGray1,
                borderWidth: 1,
              }}
              imageStyle={{
                alignSelf: "center",
                height: 110,
                width: 110,
                marginHorizontal: 10,
                borderRadius: SIZES.radius,
              }}
              item={item}
              onPress={() => {
                handeClickItem(item);
                navigation.navigate("FoodDetail", {
                  foodId: item.id,
                });
              }}
            >
              {item.name}
            </HorizontalFoodCard>
          );
        }}
      />
    </View>
  );
};

export default Home;
