import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { actionChangePersonalInfor } from '../redux/temp'
import i18n from '../localization'

const PersonalInforRight = () => {
    const { personalChange } = useAppSelector(state => state.temp)
    const { theme } = useAppSelector(state => state.cache)
    const dispatch = useAppDispatch();

    const handleChangePersonalInfor = () => {
        dispatch(actionChangePersonalInfor(personalChange ? false : true))
    }

    useEffect(() => {
        dispatch(actionChangePersonalInfor(false))
    }, [])

    return (
        <View style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={handleChangePersonalInfor}>
                <Text style={{ color: theme.color, fontSize: 16, fontFamily: 'R700' }}>{personalChange ? i18n.t('Cancel') : i18n.t('Edit')}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PersonalInforRight