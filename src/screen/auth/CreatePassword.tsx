import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../../hooks';
import { IRegisterWithCard, IUser } from '../../hooks/interface/ISignin';
import useErrorHandler from '../../hooks/useErrorHandler';
import useInputText from '../../hooks/useInputText';
import { useRoute } from '@react-navigation/native';
import { ThemeErrorText } from '../../components';
import { loginAction } from '../../redux/cache';
import { TextInput } from 'react-native-paper';
import styles from '../../util/style/Style';
import useAuth from '../../hooks/useAuth';
import i18n from '../../localization';
import React from 'react'

interface IInformationCard {
    data: {
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
        }
    }
}

const CreatePassword = () => {
    const { theme, auth } = useAppSelector(state => state.cache)
    const { navigate } = useAppSelector(state => state.temp)
    const { sendToTelegramBot } = useErrorHandler();
    const { handleErrorChange, handleTextChange, input, error, setChecked, isChecked } = useInputText()
    const { signupWithCardMutation } = useAuth()
    const nav = useAppNavigation()
    const routes = useRoute()
    const dispatch = useAppDispatch()
    const { data } = routes.params as IInformationCard;

    const resetPassword = async () => {
        let isValid = true

        if (input?.confirm_password !== input?.password) {
            handleErrorChange('confirm_password', i18n.t('Confirm-Password is not match'))
            isValid = false
        }

        if (input?.password && input?.password.length! !== 4) {
            handleErrorChange('password', i18n.t('Password must be 4 digits'))
            isValid = false
        }

        if (!input?.password) {
            handleErrorChange('password', i18n.t('Password is required'))
            isValid = false
        }
        if (!input?.confirm_password) {
            handleErrorChange('confirm_password', i18n.t('Confirm-Password is required'))
            isValid = false
        }

        if (isValid) {
            const dataJson: IRegisterWithCard = {
                ...data.cardInfor,
                password: input?.password!,
            }

            signupWithCardMutation.mutateAsync(dataJson, {
                onSuccess: (data) => {
                    if (data.status) {
                        const user: IUser = { access_token: data.token, id: data.membership.id }
                        dispatch(loginAction(user))
                        nav.navigate(navigate ?? 'Home')
                    } else {
                        handleErrorChange('password', data.message)
                    }
                },
                onError: (error) => {
                    sendToTelegramBot(error)
                    Alert.alert(i18n.t('Error'), i18n.t('Something went wrong, please try again later'))
                }
            })
        }

    }

    return (
        <View style={[{ backgroundColor: theme.background }, _styles.container]}>
            <View style={_styles.content}>
                <Text style={[{ color: theme.color }, _styles.title]}>{i18n.t('Create New Password')}</Text>
                <Text style={[{ color: theme.colorText, fontSize: 12, marginTop: 5 }]}>{i18n.t('Please enter your new password')}</Text>

                <View style={{ height: 20 }} />
                <TextInput
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput, width: '100%' }]}
                    label={i18n.t('Password')}
                    secureTextEntry={!isChecked}
                    onChangeText={text => handleTextChange('password', text)}
                    onFocus={() => handleErrorChange('password', '')}
                    onBlur={() => handleErrorChange('password', input?.password ? '' : i18n.t('Password is required'))}
                    keyboardType='number-pad'
                    maxLength={4}
                    error={error?.password ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />
                <ThemeErrorText textError={error?.password!} />
                <View style={{ height: 10 }} />
                <TextInput
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput, width: '100%' }]}
                    label={i18n.t('Confirm Password')}
                    secureTextEntry={!isChecked}
                    onChangeText={text => handleTextChange('confirm_password', text)}
                    onFocus={() => handleErrorChange('confirm_password', '')}
                    onBlur={() => handleErrorChange('confirm_password', input?.confirm_password ? '' : i18n.t('Confirm-Password is required'))}
                    keyboardType='number-pad'
                    maxLength={4}
                    error={error?.password ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />

                <ThemeErrorText textError={error?.confirm_password!} />

            </View>
            <TouchableOpacity
                onPress={resetPassword}
                disabled={signupWithCardMutation.isPending}
                style={[_styles.button, { backgroundColor: theme.bgDark }]}>
                {signupWithCardMutation.isPending ?
                    <ActivityIndicator color={theme.colorText} size={'small'} /> :
                    <Text style={[_styles.text_button, { color: theme.color }]}>{i18n.t('Finish')}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default CreatePassword

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: '90%',
        paddingTop: 25
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
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