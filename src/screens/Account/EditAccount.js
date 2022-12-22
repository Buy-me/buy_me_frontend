import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES } from '../../constants'
import { FormInput, GrayLayout, Header, IconButton, TextButton } from '../../component'
import { useState } from 'react'
import Utils from "../../utils";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'

const EditAccount = ({ navigation }) => {
    const { utils } = Utils

    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [idCard, setIdCard] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [gender, setGender] = useState("male")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    const [errorMsg, setErrorMsg] = useState("")

    const [showDatePicker, setShowDatePicker] = useState(false)
    const showPicker = () => {
        setShowDatePicker(!showDatePicker)
    }

    const onPickDate = (event, selectedDate) => {
        setShowDatePicker(false)
        // utils.convertToDateString(selectedDate)
        setDateOfBirth(selectedDate)
    }

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
                    onPress={() => {
                        navigation.goBack()
                    }}
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
                    <GrayLayout>
                        <FormInput
                            label={"Full Name"}
                            maxLength={50}
                            value={fullName}
                            inputContainerStyle={{ backgroundColor: "white" }}
                            onChange={(value) => {
                                setFullName(value)
                                utils.validateInput(value, 0, setErrorMsg)
                            }}
                            errorMsg={errorMsg}
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
                                utils.validateInput(value, 0, setErrorMsg)
                            }}
                            errorMsg={errorMsg}
                        />

                        <FormInput
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
                        />

                        <FormInput
                            label={"Date of Birth"}
                            value={utils.convertToDateString(dateOfBirth)}
                            placeholder="DD/MM/YYYY"
                            containerStyle={{ marginTop: 15 }}
                            inputContainerStyle={{
                                backgroundColor: "white",
                                alignItems: "center"
                            }}
                            onChange={(value) => {
                                console.log("alooo");
                                utils.validateInput(value, 0, setErrorMsg)
                            }}
                            errorMsg={errorMsg}
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
                            // value={gender}
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
                            errorMsg={errorMsg}
                        />



                        <FormInput
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
                        />
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