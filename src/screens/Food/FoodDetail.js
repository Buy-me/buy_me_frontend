import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    COLORS,
    constants,
    dummyData,
    FONTS,
    icons,
    SIZES,
} from "../../constants"
import { CartQuantityButton, Header, IconButton } from '../../component'

const FoodDetail = () => {

    const renderHeader = () => {
        return (
            <Header
                title={"DETAILS"}
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 40,
                }}
                leftComponent={
                    <IconButton
                        icon={icons.back}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderRadius: SIZES.radius,
                            borderColor: COLORS.gray2,
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray2,
                        }}
                        onPress={() => console.log("go back")}
                    />
                }
                rightComponent={
                    <CartQuantityButton quantity={5}/>
                }
            />
        )
    }

    return (
        <View
            style={styles.container}
        >
            {/* Header */}
            {renderHeader()}

            {/* Body */}

            {/* Footer */}
        </View>
    )
}

export default FoodDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})