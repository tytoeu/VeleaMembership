import { View, Text, ScrollView, Image, ActivityIndicator, Alert, Pressable, RefreshControl } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { Authorization, MenuNavigation } from '../components'
import { ToastMessage } from '../components/ToastMessage'
import * as DocumentPicker from 'expo-document-picker';
import history_style from '../util/style/HistoryStyle'
import React, { useCallback, useEffect } from 'react'
import useDashbaord from '../hooks/useDashbaord'
import { Ionicons } from '@expo/vector-icons'
import { convertToBase64 } from '../helpers'
import { loginAction } from '../redux/cache'
import { StatusBar } from 'expo-status-bar'
import styles from '../util/style/Style'
import useAuth from '../hooks/useAuth'
import i18n from '../localization'
import { actionNavigate } from '../redux/temp';

const MAX_FILE_SIZE = 5 * 1024 * 1024

const AccountScreen = () => {
    const { theme, currentTheme, locale, auth } = useAppSelector((state) => state.cache)
    const { personalChange } = useAppSelector(state => state.temp)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    const { logoutMutation, updateAvatarMutation } = useAuth()
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

    const pickDocument = async () => {
        if (!auth) {
            return ToastMessage('Please login first')
        }
        let result = await DocumentPicker.getDocumentAsync({
            multiple: false,
            type: 'image/*',
            copyToCacheDirectory: true
        });

        if (!result.canceled) {
            const assets = result.assets[0]
            const uriFile = assets.uri
            const name = assets.name
            const size = assets.size!

            if (size > MAX_FILE_SIZE) {
                Alert.alert('File too large', 'Please select a file smaller than 1 MB.')
                return
            }

            const base64 = await convertToBase64(uriFile)

            const dataJson = {
                id: auth?.id!,
                image: base64,
                filename: name
            }

            updateAvatarMutation.mutateAsync(dataJson, {
                onSuccess: (data) => {
                    if (data?.status) {
                        fetchMemberInfoMutation.mutate()
                        setTimeout(() => {
                            ToastMessage(data?.message)
                        }, 2000)
                    } else {
                        ToastMessage(data?.message, undefined, 'white')
                    }
                }
            })
        }
    };

    // reload data
    const onRefresh = useCallback(() => {
        fetchMemberInfoMutation.mutate()
    }, []);

    if (logoutMutation.isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    if (isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={isPending} />}
            style={[history_style.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <View style={{ marginHorizontal: 16, paddingBottom: 20 }}>

                <Pressable style={[history_style.card, { backgroundColor: theme.bgDark }]} onPress={pickDocument}>
                    {data?.membership?.avatar ?
                        <Image source={{ uri: data?.membership.avatar }} style={history_style.profile} />
                        :
                        <Ionicons name='person-circle-outline' style={history_style.profile} size={65} color={theme.colorText} />}
                    <Text style={[history_style.name_text, { color: theme.color }]}>{data?.membership?.name ?? 'Guest'}</Text>
                </Pressable>

                {auth && <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text={i18n.t('Personal information')} icon='person-outline' onPress={() => navigation.navigate('personal-info', { membership: data?.membership })} />
                    <MenuNavigation text={i18n.t('Change password')} icon='key-outline' onPress={() => navigation.navigate('change-password')} />
                    <MenuNavigation text={i18n.t('Location')} icon='location-outline' disabledborderBottom={true} onPress={() => navigation.navigate('location', { item: null })} />
                </View>}

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text={i18n.t('Dark mode')} icon='moon-outline' option={currentTheme == 'dark' ? i18n.t('On') : i18n.t('Off')} onPress={() => navigation.navigate('DarkMode')} />
                    <MenuNavigation text={i18n.t('Change language')} icon='language-outline' option={locale == 'kh' ? i18n.t('Khmer') : i18n.t('English')} disabledborderBottom={true} onPress={() => navigation.navigate('Language')} />
                </View>

                <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                    <MenuNavigation text={i18n.t('term-condition')} icon='document-text-outline' disabledborderBottom={auth ? false : true} onPress={() => navigation.navigate('term')} />
                    {auth && <MenuNavigation text={i18n.t('Delete Account')} icon='trash-outline' disabledborderBottom={true} onPress={() => navigation.navigate('personal-info', { membership: data?.membership })} />}
                </View>

                {auth ?
                    <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                        <MenuNavigation text={i18n.t('Logout')} icon='exit-outline' disabledborderBottom={true} onPress={handleLogout} />
                    </View> :
                    <View style={[history_style.card, { backgroundColor: theme.bgDark }]}>
                        <MenuNavigation text={i18n.t('Login')} icon='key-outline' disabledborderBottom={true} onPress={() => {
                            navigation.navigate('Login')
                            dispatch(actionNavigate('Account'))
                        }} />
                    </View>}
            </View>

        </ScrollView>
    )
}

export default AccountScreen