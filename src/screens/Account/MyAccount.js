import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES } from '../../constants'
import { Header, IconButton, InfoRow, LineDivider } from '../../component'
import GrayLayout from '../../component/GrayLayout'
import { color } from 'react-native-reanimated'

const MyAccount = ({ navigation }) => {

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
                    <TouchableOpacity
                        style={headerStyles.rightContainer}
                        onPress={() => navigation.navigate("EditAccount")}
                    >
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

            {/* Content */}
            <View style={styles.contentContainer}>
                <GrayLayout>
                    <InfoRow
                        title={"Full Name"}
                        value={"Dinh Huynh Thai Binh"}
                    />

                    <LineDivider lineStyle={{
                        backgroundColor: COLORS.gray2,
                        marginVertical: 20
                    }} />

                    <InfoRow
                        title={"Phone Number"}
                        value={"0988877766"}
                    />

                    <LineDivider lineStyle={{
                        backgroundColor: COLORS.gray2,
                        marginVertical: 20
                    }} />

                    <InfoRow
                        title={"User ID"}
                        value={"312321220"}
                    />
                </GrayLayout>

                <GrayLayout style={{ marginTop: 15 }}>
                    <InfoRow
                        title={"ID Card"}
                        value={"Not updated"}
                    />

                    <LineDivider lineStyle={{
                        backgroundColor: COLORS.gray2,
                        marginVertical: 20
                    }} />

                    <InfoRow
                        title={"Date of Birth"}
                        value={"03/03/2001"}
                    />

                    <LineDivider lineStyle={{
                        backgroundColor: COLORS.gray2,
                        marginVertical: 20
                    }} />

                    <InfoRow
                        title={"Gender"}
                        value={"Male"}
                    />

                    <LineDivider lineStyle={{
                        backgroundColor: COLORS.gray2,
                        marginVertical: 20
                    }} />

                    <InfoRow
                        title={"Joined"}
                        value={"03/04/2023"}
                    />

                    <LineDivider lineStyle={{
                        backgroundColor: COLORS.gray2,
                        marginVertical: 20
                    }} />

                    <InfoRow
                        title={"Email"}
                        value={"tbinh@gmail.com"}
                    />

                    <LineDivider lineStyle={{
                        backgroundColor: COLORS.gray2,
                        marginVertical: 20
                    }} />

                    <InfoRow
                        title={"Address"}
                        value={"jsajdpasdkajdlksjdlasj dsadsalkdj"}
                    />
                </GrayLayout>
            </View>

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
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        marginHorizontal: SIZES.padding,
        paddingVertical: 15
    }
})