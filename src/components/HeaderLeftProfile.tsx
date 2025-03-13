import { NavigateStyle } from '../util/style/NavigateStyle'
import { View, Text, Image } from 'react-native'
import { useAppSelector } from '../hooks'
import { assets } from '../../assets'
import React from 'react'

const image = assets.img
const HeaderLeftProfile = () => {
    const { theme, auth } = useAppSelector((state) => state.cache)
    return (
        <View style={NavigateStyle.container}>
            <Image source={image.profile} style={NavigateStyle.profile} />
            <View>
                <Text style={[NavigateStyle.textName, { color: theme.color }]}>Mr. toeu ty</Text>
                <Text style={[NavigateStyle.wellcome, { color: theme.color }]}>Wellcome Back!</Text>
            </View>
        </View>
    )
}

export default HeaderLeftProfile
