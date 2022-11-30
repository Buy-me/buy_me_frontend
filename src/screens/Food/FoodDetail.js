import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    COLORS,
    constants,
    dummyData,
    FONTS,
    icons,
    SIZES,
} from "../../constants"
import { CartQuantityButton, Header, IconButton, IconLabel } from '../../component'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const FoodDetail = () => {

    const [foodItem, setFoodItem] = useState(dummyData.vegBiryani)

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
                        onPress={() => console.log("go back")}
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
                </View>
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
                {/* restaurant */}

            </ScrollView>

            {/* Footer */}
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