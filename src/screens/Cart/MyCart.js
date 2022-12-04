import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../constants'
import { CartQuantityButton, FooterTotal, Header, IconButton, StepperInput } from '../../component'
import { SwipeListView } from 'react-native-swipe-list-view'

const MyCart = ({ navigation }) => {
    const [myCartList, setMyCartList] = useState(dummyData.myCart)

    // Handler
    const updateQuantityHandler = (newQty, id) => {
        const newCartList = myCartList.map(item =>
            item.id === id ? { ...item, qty: newQty } : item)

        setMyCartList(newCartList)
    }

    const removeCartItemGHandler = (id) => {
        let newCartList = [...myCartList]

        const index = newCartList.findIndex(item => item.id === id)
        newCartList.splice(index, 1)

        setMyCartList(newCartList)
    }

    //Renderer
    const renderHeader = () => {
        return (
            <Header
                title={"MY CART"}
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 40
                }}
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

    const renderCartList = () => {
        return (
            <SwipeListView
                data={myCartList}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding * 2,
                }}
                disableRightSwipe
                rightOpenValue={-75}
                renderItem={(data, rowMap) => (
                    <View style={{
                        height: 100,
                        backgroundColor: COLORS.lightGray2,
                        ...cartItemStyles.container
                    }}>
                        <View style={cartItemStyles.imageView}>
                            <Image
                                source={data.item.image}
                                resizeMode="contain"
                                style={cartItemStyles.image}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...FONTS.body3 }}>{data.item.name}</Text>
                            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>{data.item.price}</Text>
                        </View>

                        <StepperInput
                            containerStyle={cartItemStyles.stepperInput}
                            value={data.item.qty}
                            onAdd={() => updateQuantityHandler(data.item.qty + 1, data.item.id)}
                            onMinus={() => {
                                if (data.item.qty > 1) {
                                    updateQuantityHandler(data.item.qty - 1, data.item.id)
                                }
                            }}
                        />
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <IconButton
                        containerStyle={{
                            ...cartItemStyles.hiddenItem,
                            ...cartItemStyles.container
                        }}
                        icon={icons.delete_icon}
                        iconStyle={{ marginRight: 10 }}
                        onPress={() => removeCartItemGHandler(data.item.id)}
                    />
                )}
            />
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeader()}

            {/* Cart list */}
            {renderCartList()}

            {/* Footer */}
            <FooterTotal
                subTotal={40.03}
                shippingFee={0.00}
                total={40.03}
                onPress={() => console.log("yahoo")}
            />
        </View>
    )
}

export default MyCart

const cartItemStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius
    },
    imageView: {
        width: 90,
        height: 100,
        marginLeft: -10
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 10
    },
    stepperInput: {
        height: 50,
        width: 125,
        backgroundColor: COLORS.white
    },

    hiddenItem: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: COLORS.primary,
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,

    }
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