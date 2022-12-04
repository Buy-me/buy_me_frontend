import React from 'react'
import { FONTS, COLORS } from '../constants'
import { Text, TouchableOpacity } from 'react-native'

const TextButton = ({
    buttonStyle,
    label, labelStyle,
    label2 = "", label2Style,
    onPress
}) => {

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

            {label2 !== "" &&
                <Text style={{
                    flex: 1,
                    textAlign: "right",
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...label2Style
                }}>
                    {label2}
                </Text>
            }
        </TouchableOpacity>
    )
}

export default TextButton