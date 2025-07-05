import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppNavigation, useAppSelector, useBackHandler } from '../../hooks'
import i18n from '../../localization'
import { TextInput } from 'react-native-paper'
import styles from '../../util/style/Style'
import { ThemeErrorText } from '../../components'
import useInputText from '../../hooks/useInputText'
import { actionForgetPassword } from '../../redux/temp'
import { assets } from '../../../assets'
import { useRoute } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'
import { loginAction } from '../../redux/cache'
import { IUser } from '../../hooks/interface/ISignin'
import { StatusBar } from 'expo-status-bar'
import { ToastMessage } from '../../components/ToastMessage'

const logo = assets.logo

type membershipType = {
    membership: {
        membership_id: number;
        card_number: string;
    },
    cardInfor: {
        membershipNumber: string,
        offerDiscount: number,
        limitOffer: number,
        limitType: string,
        expiredDate: string,
        membershipId: number,
        customerName: string,
        phone: string,
        dob: string,
        type: string;
        tierImage: string;
        membership_id: number | null;
    }
}

export default function LoginPassword() {
    const { theme, currentTheme } = useAppSelector(state => state.cache)
    const { handleErrorChange, handleTextChange, input, error, setChecked, isChecked } = useInputText()
    const { signinWithCardMutation } = useAuth()
    const nav = useAppNavigation()
    const dispatch = useAppDispatch()
    const backAction = useBackHandler()
    const router = useRoute();
    const { membership, cardInfor } = router.params as membershipType;
    const { navigate } = useAppSelector(state => state.temp)

    const handleFinish = () => {
        if (!input?.password) {
            handleErrorChange('password', i18n.t('Password is required'))
            return false
        }

        const dataJson = {
            membership_id: membership.membership_id,
            card_number: membership.card_number,
            password: input?.password!,
            cardInfor
        }

        signinWithCardMutation.mutateAsync(dataJson, {
            onSuccess: (data) => {
                if (data.status) {
                    const user: IUser = { access_token: data.token, id: data.membership.id }
                    dispatch(loginAction(user))
                    nav.navigate(navigate ?? 'Home')
                    ToastMessage(data?.message)
                } else {
                    handleErrorChange('password', data.message)
                }
            },
        })
    }

    if (signinWithCardMutation.isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (<View style={[{ backgroundColor: theme.background }, _styles.container]}>
        <View style={_styles.content}>

            <Image
                source={logo.login}
                style={{ width: 250, height: 200, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 }}
            />

            <Text style={[{ color: theme.color }, _styles.title]}>{i18n.t('Glade to see you again')}</Text>
            <Text style={[{ color: theme.colorText, fontSize: 12, marginTop: 5, paddingHorizontal: 3 }]}>{i18n.t('Please enter your password')}</Text>

            <View style={{ height: 25 }} />
            <TextInput
                style={[styles.inputStyle, { backgroundColor: theme.bgInput, width: '100%' }]}
                label={i18n.t('Password')}
                secureTextEntry={!isChecked}
                onChangeText={text => handleTextChange('password', text)}
                onFocus={() => handleErrorChange('password', '')}
                onBlur={() => handleErrorChange('password', input?.password ? '' : i18n.t('Password is required'))}
                keyboardType='default'
                maxLength={4}
                error={error?.password ? true : false}
                textColor={theme.color}
                outlineColor={theme.main}
                theme={{ colors: { onSurfaceVariant: theme.main } }}
            />
            <ThemeErrorText textError={error?.password!} />

            <View style={[styles.section_container, { marginTop: -18, marginBottom: 24, width: '100%' }]}>
                <TouchableOpacity onPress={() => {
                    nav.navigate('phone-verify')
                    dispatch(actionForgetPassword(true))
                }}>
                    <Text style={[styles.paragraph, { color: theme.color }]}>{i18n.t('Forgot Password?')}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity
            onPress={handleFinish}
            style={[_styles.button, { backgroundColor: theme.bgDark, width: '90%', borderRadius: 5 }]}>
            <Text style={[_styles.text_button, { color: theme.color }]}>{i18n.t('Finish')}</Text>
        </TouchableOpacity>
    </View>)
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: '90%',
        paddingTop: '20%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 3
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    text_button: {
        fontSize: 16,
        fontWeight: 'bold'
    },
})