import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { useAppNavigation, useAppSelector } from '../../hooks';
import useErrorHandler from '../../hooks/useErrorHandler';
import styles from '../../util/style/Style';
import useInputText from '../../hooks/useInputText';
import useAuth from '../../hooks/useAuth';
import { useRoute } from '@react-navigation/native';
import { ToastMessage } from '../../components/ToastMessage';
import { TextInput } from 'react-native-paper';
import { ThemeErrorText } from '../../components';
import i18n from '../../localization';
type phoneType = { phone: string, opt_code: string }

const ResetPassword = () => {
    const { theme, auth } = useAppSelector(state => state.cache)
    const { sendToTelegramBot } = useErrorHandler();
    const { handleErrorChange, handleTextChange, input, error, setChecked, isChecked } = useInputText()
    const { resetPasswordMutation } = useAuth()
    const nav = useAppNavigation()
    const routes = useRoute()
    const { phone, opt_code } = routes.params as phoneType

    const resetPassword = async () => {
        let isValid = true

        if (input?.confirm_password !== input?.password) {
            handleErrorChange('confirm_password', i18n.t('Confirm-Password is not match'))
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
            const data = {
                phone_number: phone,
                otp_code: opt_code,
                password: input?.password!
            }
            resetPasswordMutation.mutateAsync(data, {
                onSuccess: (data) => {
                    if (data?.status) {
                        auth ? nav.navigate('Account') : nav.navigate('Login')
                        ToastMessage(data.message, theme.color, theme.bgDark)
                    } else {
                        Alert.alert('Warning', data?.message || 'Something went wrong!')
                    }
                },
                onError: (error) => {
                    sendToTelegramBot(error)
                    Alert.alert('Error', 'Something went wrong! ' + error?.message)
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
                    keyboardType='default'
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
                    keyboardType='default'
                    error={error?.password ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />

                <ThemeErrorText textError={error?.confirm_password!} />

            </View>
            <TouchableOpacity
                onPress={resetPassword}
                disabled={resetPasswordMutation.isPending}
                style={[_styles.button, { backgroundColor: theme.bgDark }]}>
                {resetPasswordMutation.isPending ?
                    <ActivityIndicator color={theme.colorText} size={'small'} /> :
                    <Text style={[_styles.text_button, { color: theme.color }]}>{i18n.t('Continue')}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default ResetPassword

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