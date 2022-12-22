import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FormInput, FormInputCheck, GrayLayout, Header, IconButton, TextButton } from '../../component'
import { COLORS, icons, SIZES } from '../../constants'
import { useState } from 'react'
import utils from '../../utils/Utils'

const ChangePassword = ({ navigation }) => {

    const [currentPwd, setCurrentPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [retypeNewPwd, setRetypeNewPwd] = useState("")

    const [errorMsg, setErrorMsg] = useState("")

    const renderHeader = () => {
        return (
            <Header
                title={"CHANGE PASSWORD"}
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
                    label={"Change Password"}
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

            <View style={styles.contentContainer}>
                <GrayLayout>
                    <FormInput
                        label={"Current Password"}
                        maxLength={20}
                        value={currentPwd}
                        inputContainerStyle={{ backgroundColor: "white" }}
                        onChange={(value) => {
                            setCurrentPwd(value)
                            utils.validateInput(value, 6, setErrorMsg)
                        }}
                        appendComponent={
                            <FormInputCheck error={errorMsg} value={currentPwd} />
                        }
                        secureTextEntry={true}
                        errorMsg={errorMsg}
                    />

                    <FormInput
                        label={"New Password"}
                        maxLength={20}
                        value={newPwd}
                        containerStyle={{ marginTop: 15 }}
                        inputContainerStyle={{ backgroundColor: "white" }}
                        onChange={(value) => {
                            setNewPwd(value)
                            utils.validateInput(value, 6, setErrorMsg)
                        }}
                        appendComponent={
                            <FormInputCheck error={errorMsg} value={newPwd} />
                        }
                        secureTextEntry={true}
                        errorMsg={errorMsg}
                    />

                    <FormInput
                        label={"Retype New Password"}
                        maxLength={20}
                        value={retypeNewPwd}
                        containerStyle={{ marginTop: 15 }}
                        inputContainerStyle={{ backgroundColor: "white" }}
                        onChange={(value) => {
                            setRetypeNewPwd(value)
                            utils.validateInput(value, 6, setErrorMsg)
                        }}
                        appendComponent={
                            <FormInputCheck error={errorMsg} value={retypeNewPwd} />
                        }
                        secureTextEntry={true}
                        errorMsg={errorMsg}
                    />
                </GrayLayout>
            </View>

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default ChangePassword

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
        flex: 1,
        marginHorizontal: SIZES.padding,
        paddingVertical: 15
    }
})