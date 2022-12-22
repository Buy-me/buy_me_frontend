import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const InfoRow = ({ title, value }) => {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <Text style={{
                color: COLORS.gray,
                fontSize: 15
            }}>
                {title}
            </Text>
            <Text
                style={{
                    color: COLORS.black,
                    fontSize: 15,
                    fontWeight: "600",
                }}
                numberOfLines={1}
                ellipsizeMode="head"
            >
                {value}
            </Text>
        </View>
    )
}

export default InfoRow