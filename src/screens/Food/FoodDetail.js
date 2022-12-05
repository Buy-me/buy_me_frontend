import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    COLORS,
    constants,
    dummyData,
    FONTS,
    icons,
    images,
    SIZES,
} from "../../constants"
import { CartQuantityButton, Header, IconButton, IconLabel, LineDivider, Rating, StepperInput, TextButton } from '../../component'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const FoodDetail = ({ navigation }) => {

    const [foodItem, setFoodItem] = useState(dummyData.vegBiryani)
    const [selectedSize, setSelectedSize] = useState(0)
    const [foodQuantity, setFoodQuantity] = useState(1)

    const renderHeader = () => {
        return (
            <Header
                title={"DETAILS"}
                containerStyle={headerStyles.container}
                leftComponent={
                    <IconButton
                        icon={icons.back}
                        containerStyle={headerStyles.leftContainer}
                        iconStyle={headerStyles.leftIcon}
                        onPress={() => navigation.goBack()}
                    />
                }
                rightComponent={
                    <CartQuantityButton quantity={5} />
                }
            />
        )
    }

    const renderDetails = () => {
        return (
            <View style={{
                marginTop: SIZES.radius,
                marginBottom: SIZES.padding,
                paddingHorizontal: SIZES.padding
            }}>
                {/* Food card */}
                <View style={{
                    height: 190,
                    borderRadius: 15,
                    backgroundColor: COLORS.lightGray2
                }}>
                    {/* calories and favourite */}
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: SIZES.base,
                        paddingHorizontal: SIZES.radius
                    }}>
                        {/* calories */}
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={icons.calories}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                            <Text style={{
                                color: COLORS.darkGray2,
                                ...FONTS.body4
                            }}> {foodItem?.calories} calories</Text>
                        </View>

                        {/* favourite */}
                        <Image
                            source={icons.love}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: foodItem?.isFavourite ? COLORS.primary : COLORS.gray
                            }}
                        />
                    </View>

                    <Image
                        source={foodItem?.image}
                        resizeMode="contain"
                        style={{
                            height: 170,
                            width: "100%"
                        }}
                    />
                </View>

                {/* Food Info */}
                <View style={{ marginTop: SIZES.padding }}>
                    {/* Name and description */}
                    <Text style={{
                        ...FONTS.h1
                    }}>{foodItem?.name}</Text>
                    <Text style={{
                        marginTop: SIZES.base,
                        color: COLORS.darkGray,
                        textAlign: "justify",
                        ...FONTS.body3
                    }}>{foodItem?.description}</Text>

                    {/* rating, duration and shipping */}
                    <View style={{
                        flexDirection: "row",
                        marginTop: SIZES.padding
                    }}>
                        {/* rating */}
                        <IconLabel
                            containerStyle={{ backgroundColor: COLORS.primary, marginRight: SIZES.radius }}
                            icon={icons.star}
                            label="4.5"
                            labelStyle={{ color: COLORS.white }}
                        />

                        {/* duration */}
                        <IconLabel
                            containerStyle={{ marginHorizontal: SIZES.radius, paddingHorizontal: 0 }}
                            icon={icons.clock}
                            iconStyle={{ tintColor: COLORS.black }}
                            label="30 Mins"
                        />

                        {/* shipping */}
                        <IconLabel
                            containerStyle={{ marginHorizontal: SIZES.radius, paddingHorizontal: 0 }}
                            icon={icons.dollar}
                            iconStyle={{ tintColor: COLORS.black }}
                            label="Free Shipping"
                        />
                    </View>

                    {/* sizes */}
                    <View style={{
                        flexDirection: "row",
                        marginTop: SIZES.padding,
                        alignItems: "center"
                    }}>
                        <Text style={{ ...FONTS.h3 }}>
                            Sizes:
                        </Text>

                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginLeft: SIZES.padding
                        }}>
                            {dummyData.sizes.map((item, index) => (
                                <TextButton
                                    key={`size-${index}`}
                                    buttonStyle={{
                                        width: 55,
                                        height: 55,
                                        margin: SIZES.base,
                                        borderWidth: 1,
                                        borderRadius: SIZES.radius,
                                        borderColor: selectedSize !== item.id ? COLORS.gray2 : COLORS.primary,
                                        backgroundColor: selectedSize !== item.id ? null : COLORS.primary
                                    }}
                                    label={item.label}
                                    labelStyle={{
                                        color: selectedSize !== item.id ? COLORS.gray2 : COLORS.white,
                                        ...FONTS.body2,

                                    }}
                                    onPress={() => setSelectedSize(item.id)}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={{
                flexDirection: "row",
                height: 100,
                alignItems: "center",
                paddingHorizontal: SIZES.padding,
                paddingBottom: SIZES.radius,
            }}>
                <StepperInput
                    value={foodQuantity}
                    onAdd={() => setFoodQuantity(foodQuantity + 1)}
                    onMinus={() => setFoodQuantity((prev) => {
                        if(prev > 1) return prev - 1
                    })}
                />

                <TextButton
                    buttonStyle={{
                        flex: 1,
                        flexDirection: "row",
                        height: 60,
                        marginLeft: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}   
                    label={"Buy Now"}
                    label2={"$15.99"}
                    onPress={() => navigation.navigate("MyCart")}
                />
                
            </View>
        )
    }

    const renderRestaurant = () => {
        return (
            <View style={{
                flexDirection: "row",
                marginVertical: SIZES.padding,
                paddingHorizontal: SIZES.padding,
                alignItems: "center"
            }}>
                <Image
                    source={images.profile}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: SIZES.radius
                    }}
                />

                <View style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    justifyContent: "center"
                }}>
                    <Text style={{ ...FONTS.h3 }}>This is a restaurant</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>1.2 KM away from you</Text>
                </View>
                <Rating rating={4} iconStyle={{ marginLeft: 3 }} />
            </View>
        )
    }

    return (
        <View
            style={styles.container}
        >
            {/* Header */}
            {renderHeader()}

            {/* Body */}
            <ScrollView

            >
                {/* detail */}
                {renderDetails()}

                <LineDivider />

                {/* restaurant */}
                {renderRestaurant()}
            </ScrollView>

            {/* Footer */}
            <LineDivider />

            {renderFooter()}
        </View>
    )
}

export default FoodDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
})

const headerStyles = StyleSheet.create({
    container: {
        height: 50,
        marginHorizontal: SIZES.padding,
        marginTop: 40,
    },
    leftContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray2,
    },
    leftIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.gray2,
    }
})