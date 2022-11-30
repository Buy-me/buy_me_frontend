import React from 'react'
import {
    FONTS,
    COLORS
} from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native'

const TextButton = ({ buttonStyle, label, labelStyle, onPress }) => {


    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                ...buttonStyle
            }}
            onPress={onPress}
        >
            <Text style={{
                color: COLORS.white,
                ...FONTS.h3,
                ...labelStyle
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton