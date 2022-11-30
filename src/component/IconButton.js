import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    COLORS,
} from '../constants'

const IconButton = ({
    containerStyle,
    icon,
    iconStyle,
    onPress
}) => {

    return (
        <TouchableOpacity
            style={{ ...containerStyle }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{ ...styles.icon, ...iconStyle }}
            />
        </TouchableOpacity>
    )
}

export default IconButton

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        tintColor: COLORS.white,
    }
})