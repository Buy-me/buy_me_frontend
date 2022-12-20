import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES } from '../../constants'
import { Header, IconButton } from '../../component'

const MyAccount = () => {

    const renderHeader = () => {
        return (
            <Header
                title={"MY ACCOUNT"}
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
                    <TouchableOpacity style={headerStyles.rightContainer}>
                        <Text style={headerStyles.rightText}>Edit</Text>
                    </TouchableOpacity>
                }
            />
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeader()}
        </View>
    )
}

export default MyAccount

const headerStyles = StyleSheet.create({
    container: {
        height: 50,
        marginHorizontal: SIZES.padding,
        marginTop: 40,
        // justifyContent: "center",
        // alignItems: "center"
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
    },
    rightContainer: {
        alignSelf: "center"
    },
    rightText: {
        color: COLORS.orange,
        fontWeight: "700",
        fontSize: 16,
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})