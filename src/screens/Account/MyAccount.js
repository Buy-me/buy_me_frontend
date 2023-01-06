import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES, constants } from '../../constants'
import { Header, IconButton, InfoRow, LineDivider } from '../../component'
import GrayLayout from '../../component/GrayLayout'
import { useEffect } from 'react'
import profileApi from '../../api/profileApi'
import { useState } from 'react'
import moment from 'moment/moment'
import utils from '../../utils/Utils'

const MyAccount = ({ navigation, route }) => {
    const [profile, setProfile] = useState(null)

    const getLatestProfile = async () => {
        const { response, err } = await profileApi.getProfile()
        if (err) {
            console.log(err);
        }
        else {
            const data = response.data
            setProfile(data)
        }
    }

    useEffect(() => {
        getLatestProfile()
    }, [route.params])

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
                        onPress={() => navigation.navigate("EditAccount", {
                            firstName: profile?.first_name,
                            lastName: profile?.last_name,
                            phoneNumber: profile?.phone,
                            dateOfBirth: profile?.birth_date,
                            gender: profile?.gender,
                            avatar: profile?.avatar
                        })}
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
            <ScrollView>
                <View style={styles.contentContainer}>
                    <View style={{
                        alignSelf: "center",
                    }}>
                        <Image
                            source={{ uri: profile?.avatar.url || profile?.avatar.uri }}
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 10
                            }}
                        />
                    </View>

                    <GrayLayout style={{ marginTop: 15 }}>
                        <InfoRow
                            title={"Full Name"}
                            value={profile?.first_name ? `${profile.first_name} ${profile.last_name}` : constants.placeHolderInputs.string}
                        />

                        <LineDivider lineStyle={{
                            backgroundColor: COLORS.gray2,
                            marginVertical: 20
                        }} />

                        <InfoRow
                            title={"Phone Number"}
                            value={profile?.phone ? profile.phone : constants.placeHolderInputs.string}
                        />

                        <LineDivider lineStyle={{
                            backgroundColor: COLORS.gray2,
                            marginVertical: 20
                        }} />

                        <InfoRow
                            title={"User ID"}
                            value={profile?.id}
                        />
                    </GrayLayout>

                    <GrayLayout style={{ marginTop: 15 }}>
                        <InfoRow
                            title={"Date of Birth"}
                            value={profile?.birth_date ? moment(profile?.birth_date).format("DD-MM-YYYY") : constants.placeHolderInputs.string}
                        />

                        <LineDivider lineStyle={{
                            backgroundColor: COLORS.gray2,
                            marginVertical: 20
                        }} />

                        <InfoRow
                            title={"Gender"}
                            value={profile?.gender ? utils.capitalizeFirstLetter(profile?.gender) : constants.placeHolderInputs.string}
                        />

                        <LineDivider lineStyle={{
                            backgroundColor: COLORS.gray2,
                            marginVertical: 20
                        }} />

                        <InfoRow
                            title={"Joined"}
                            value={moment(profile?.created_at).format("DD-MM-YYYY")}
                        />

                        <LineDivider lineStyle={{
                            backgroundColor: COLORS.gray2,
                            marginVertical: 20
                        }} />

                        <InfoRow
                            title={"Email"}
                            value={profile?.email}
                        />
                    </GrayLayout>
                </View>
            </ScrollView>
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