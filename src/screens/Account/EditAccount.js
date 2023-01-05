import { Image, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, icons, images, SIZES } from '../../constants'
import { FormInput, GrayLayout, Header, IconButton, TextButton } from '../../component'
import { useState } from 'react'
import Utils from "../../utils";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'
import { useEffect } from 'react'
import profileApi from '../../api/profileApi'
import moment from 'moment'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from "expo-image-picker"

const EditAccount = ({ navigation, route }) => {
    const { utils } = Utils

    const [avatar, setAvatar] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    // const [idCard, setIdCard] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [gender, setGender] = useState("male")
    // const [email, setEmail] = useState("")
    // const [address, setAddress] = useState("")

    // const [errorMsg, setErrorMsg] = useState("")
    const [firstNameErr, setFirstNameErr] = useState("")
    const [lastNameErr, setLastNameErr] = useState("")
    const [phoneErr, setPhoneErr] = useState("")
    const [dobErr, setDOBErr] = useState("")
    const [genderErr, setGenderErr] = useState("")

    useEffect(() => {
        const data = { ...route.params }

        setAvatar(data?.avatar)
        setFirstName(data?.firstName)
        setLastName(data?.lastName)
        setPhoneNumber(data?.phoneNumber)
        setDateOfBirth(new Date(data?.dateOfBirth))
        setGender(data?.gender)
    }, [])

    const [showDatePicker, setShowDatePicker] = useState(false)
    const showPicker = () => {
        setShowDatePicker(!showDatePicker)
    }

    const onPickDate = (event, selectedDate) => {
        setShowDatePicker(false)
        // utils.convertToDateString(selectedDate)
        setDateOfBirth(selectedDate)
    }

    const handlePickImage = async () => {
        // let result = await DocumentPicker.getDocumentAsync({
        //     type: "image/*"
        // })
        // // console.log(result);
        // if (result.type === "success") {
        //     // console.log(result);
        //     setAvatar({
        //         ...avatar,
        //         url: result.uri,
        //         name: result.name
        //     })
        // }
        // else {
        //     ToastAndroid.show("Something wrong", ToastAndroid.SHORT)
        // }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        })

        if (!result.cancelled) {
            setAvatar({
                ...avatar,
                url: result.uri,
                // name: result.name
            })
        }
    }

    const handleSave = async () => {
        // const data = {
        //     first_name: firstName,
        //     last_name: lastName,
        //     phone: phoneNumber,
        //     gender: gender,
        //     birth_date: dateOfBirth.toISOString()
        //     //avatar
        // }
        // const { response, err } = await profileApi.updateProfile(data)

        // if (err) {
        //     ToastAndroid.show("Error while updating profile!", ToastAndroid.SHORT)
        // }
        // else {
        //     navigation.navigate("MyAccount", { msg: "changed!" })
        //     ToastAndroid.show("Your profile has been updated!", ToastAndroid.SHORT)
        // }

        const { response, err } = await profileApi.uploadAvatar(avatar);
        if (err) {
            console.log(err);
        }
        else {
            console.log(response);
        }
    }

    //Renderer
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
            />
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
                    label={"Save"}
                    onPress={handleSave}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeader()}

            <ScrollView>
                <View style={styles.contentContainer}>
                    <TouchableOpacity
                        onPress={handlePickImage}
                        style={{
                            alignSelf: "center",
                            borderColor: COLORS.primary,
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 5
                        }}
                    >
                        <Image
                            source={
                                avatar ? { uri: avatar.url } : images.profile
                            }
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 10
                            }}
                        />
                    </TouchableOpacity>

                    <GrayLayout style={{ marginTop: 25 }}>
                        <FormInput
                            label={"First Name"}
                            maxLength={50}
                            value={firstName}
                            inputContainerStyle={{ backgroundColor: "white" }}
                            onChange={(value) => {
                                setFirstName(value)
                                utils.validateInput(value, 0, setFirstNameErr)
                            }}
                            errorMsg={firstNameErr}
                        />

                        <FormInput
                            label={"Last Name"}
                            maxLength={50}
                            value={lastName}
                            containerStyle={{ marginTop: 15 }}
                            inputContainerStyle={{ backgroundColor: "white" }}
                            onChange={(value) => {
                                setLastName(value)
                                utils.validateInput(value, 0, setLastNameErr)
                            }}
                            errorMsg={lastNameErr}
                        />

                        <FormInput
                            label={"Phone Number"}
                            maxLength={11}
                            value={phoneNumber}
                            keyboardType="numeric"
                            containerStyle={{ marginTop: 15 }}
                            inputContainerStyle={{
                                backgroundColor: "white",
                            }}
                            onChange={(value) => {
                                setPhoneNumber(value)
                                utils.validateInput(value, 0, setPhoneErr)
                            }}
                            errorMsg={phoneErr}
                        />

                        {/* <FormInput
                            label={"ID Card"}
                            maxLength={10} //????
                            keyboardType="numeric"
                            value={idCard}
                            containerStyle={{ marginTop: 15 }}
                            inputContainerStyle={{
                                backgroundColor: "white",
                            }}
                            onChange={(value) => {
                                setIdCard(value)
                                utils.validateInput(value, 0, setErrorMsg)
                            }}
                            errorMsg={errorMsg}
                        /> */}

                        <FormInput
                            label={"Date of Birth"}
                            value={moment(dateOfBirth).format("DD-MM-YYYY")}
                            placeholder="DD/MM/YYYY"
                            containerStyle={{ marginTop: 15 }}
                            inputContainerStyle={{
                                backgroundColor: "white",
                                alignItems: "center"
                            }}
                            errorMsg={dobErr}
                            editable={false}
                            appendComponent={
                                <IconButton
                                    icon={icons.calendar}
                                    containerStyle={{
                                        width: 30, height: 30,
                                    }}
                                    onPress={showPicker}
                                    iconStyle={{ tintColor: COLORS.gray }}
                                />
                            }
                        />
                        {showDatePicker &&
                            <RNDateTimePicker
                                value={dateOfBirth}
                                mode={"date"}
                                onChange={onPickDate}
                            />
                        }

                        <FormInput
                            label={"Gender"}
                            value={gender}
                            placeholder="Select gender"
                            containerStyle={{ marginTop: 15 }}
                            inputContainerStyle={{ backgroundColor: COLORS.white }}
                            inputComponent={
                                <Picker
                                    style={{ flex: 1, alignSelf: "center" }}
                                    selectedValue={gender}
                                    onValueChange={(value) => setGender(value)}
                                >
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                    <Picker.Item label="Others" value="others" />
                                </Picker>
                            }
                            errorMsg={genderErr}
                        />



                        {/* <FormInput
                            label={"Email"}
                            value={email}
                            keyboardType={"email-address"}
                            containerStyle={{ marginTop: 15 }}
                            inputContainerStyle={{
                                backgroundColor: "white",
                            }}
                            onChange={(value) => {
                                setEmail(value)
                                utils.validateInput(value, 0, setErrorMsg)
                            }}
                            errorMsg={errorMsg}
                        />

                        <FormInput
                            label={"Address"}
                            value={address}
                            containerStyle={{ marginTop: 15 }}
                            inputContainerStyle={{
                                backgroundColor: "white",
                            }}
                            onChange={(value) => {
                                setAddress(value)
                                utils.validateInput(value, 0, setErrorMsg)
                            }}
                            errorMsg={errorMsg}
                        /> */}
                    </GrayLayout>
                </View>
            </ScrollView>

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default EditAccount

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
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    contentContainer: {
        marginHorizontal: SIZES.padding,
        paddingVertical: 15
    }
})