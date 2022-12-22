import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const GrayLayout = ({ children, style }) => {
    return (
        <View style={{
            backgroundColor: COLORS.lightGray2,
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderRadius: 10,
            ...style

        }}>
            {children}
        </View>
    )
}

export default GrayLayout