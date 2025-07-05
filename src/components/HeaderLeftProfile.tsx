import { NavigateStyle } from '../util/style/NavigateStyle'
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import React from 'react'
import i18n from '../localization'
import { Ionicons } from '@expo/vector-icons'
import { actionNavigate } from '../redux/temp'

interface IProp {
    isProfile?: boolean;
    isLocation?: boolean;
}

const HeaderLeftProfile = (prop: IProp) => {
    const { theme, auth } = useAppSelector((state) => state.cache)
    const { tempAuth, addressSeleted } = useAppSelector((state) => state.temp)
    const nav = useAppNavigation()
    const dispatch = useAppDispatch();
    const sheetRef = useAppSelector((state) => state.temp.ref)

    if (prop.isLocation) {
        return (<Pressable className='flex-row ps-4' onPress={() => sheetRef?.present()}>
            <Ionicons name='location-outline' color={"#bc3900"} size={30} />
            <View>
                <Text className='ps-2 font-bold color-orange-600'>{addressSeleted?.labelName}</Text>
                <Text numberOfLines={1} className='ps-2 font-bold color-orange-700 w-64'>{addressSeleted?.address1}</Text>
            </View>
        </Pressable>)
    }

    return (
        <TouchableOpacity style={NavigateStyle.container} onPress={() => {
            if (!auth) {
                nav.navigate('Login')
                dispatch(actionNavigate(null))
            } else {
                nav.navigate('Account')
            }
        }}>
            {tempAuth?.avatar ? <Image source={{ uri: tempAuth?.avatar }} style={NavigateStyle.profile} /> :
                <Ionicons name='person-circle-outline' style={NavigateStyle.profile} size={42} color={theme.colorText} />}
            <View>
                <Text style={[NavigateStyle.textName, { color: theme.color }]}>{tempAuth?.name}</Text>
                <Text style={[NavigateStyle.wellcome, { color: theme.color }]}>{i18n.t('Wellcome Back!')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HeaderLeftProfile
