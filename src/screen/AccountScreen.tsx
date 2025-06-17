import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { View, Text, ScrollView, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import history_style from '../util/style/HistoryStyle'
import { Authorization, MenuNavigation } from '../components'
import { Ionicons } from '@expo/vector-icons'
import { loginAction } from '../redux/cache'
import { Button } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import styles from '../util/style/Style'
import useAuth from '../hooks/useAuth'
import { assets } from '../../assets'
import i18n from '../localization'
import React, { useEffect } from 'react'
import useDashbaord from '../hooks/useDashbaord'
import { actionStoreTempAuth } from '../redux/temp'

const AccountScreen = () => {
    const { theme, currentTheme, locale, auth } = useAppSelector((state) => state.cache)
    const { personalChange } = useAppSelector(state => state.temp)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    const { logoutMutation } = useAuth()
    const { fetchMemberInfoMutation } = useDashbaord()

    const { isPending, data } = fetchMemberInfoMutation

    useEffect(() => { fetchMemberInfoMutation.mutate() }, [auth, personalChange])

    const handleLogout = () => {
        logoutMutation.mutateAsync(null, {
            onSuccess: (data) => {
                dispatch(loginAction(null))
            },
            onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
        })
    }

    if (logoutMutation.isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    if (!auth) { return (<Authorization navigate='Account' />) }

    if (isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (
        <ScrollView style={[history_style.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <View style={{ marginHorizontal: 16, paddingBottom: 20 }}>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    {data?.membership?.avatar ? <Image source={{ uri: data?.membership.avatar }} style={history_style.profile} /> :
                        <Ionicons name='person-circle-outline' style={history_style.profile} size={65} color={theme.colorText} />}
                    <Text style={[history_style.name_text, { color: theme.color }]}>{data?.membership?.name}</Text>
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text={i18n.t('Personal information')} icon='person-outline' onPress={() => navigation.navigate('personal-info', { membership: data?.membership })} />
                    <MenuNavigation text={i18n.t('Change password')} icon='key-outline' disabledborderBottom={true} onPress={() => navigation.navigate('change-password')} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text={i18n.t('Dark mode')} icon='moon-outline' option={currentTheme == 'dark' ? i18n.t('On') : i18n.t('Off')} onPress={() => navigation.navigate('DarkMode')} />
                    <MenuNavigation text={i18n.t('Change language')} icon='language-outline' option={locale == 'kh' ? i18n.t('Khmer') : i18n.t('English')} disabledborderBottom={true} onPress={() => navigation.navigate('Language')} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text={i18n.t('Logout')} icon='exit-outline' disabledborderBottom={true} onPress={handleLogout} />
                </View>
            </View>
        </ScrollView>
    )
}

export default AccountScreen