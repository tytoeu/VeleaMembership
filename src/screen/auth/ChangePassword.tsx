import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../../hooks';
import useErrorHandler from '../../hooks/useErrorHandler';
import styles from '../../util/style/Style';
import useInputText from '../../hooks/useInputText';
import Checkbox from 'expo-checkbox';
import useAuth from '../../hooks/useAuth';
import { useRoute } from '@react-navigation/native';
import { ToastMessage } from '../../components/ToastMessage';
import { TextInput } from 'react-native-paper';
import { ThemeErrorText } from '../../components';
import i18n from '../../localization';
import { IChangePassword } from '../../hooks/interface/ISignin';
import { actionForgetPassword } from '../../redux/temp';

const ChangePassword = () => {
    const { theme, auth } = useAppSelector(state => state.cache)
    const { sendToTelegramBot } = useErrorHandler();
    const { handleErrorChange, handleTextChange, input, error, setChecked, isChecked } = useInputText()
    const { changePasswordMutation } = useAuth()
    const nav = useAppNavigation()
    const dispatch = useAppDispatch()

    const resetPassword = async () => {
        let isValid = true

        if (input?.confirm_password !== input?.newPassword) {
            handleErrorChange('confirm_password', i18n.t('Confirm-Password is not match'))
            isValid = false
        }

        if (input?.newPassword && input?.newPassword.length! !== 4) {
            handleErrorChange('newPassword', i18n.t('Password must be 4 digits'))
            isValid = false
        }

        if (!input?.newPassword) {
            handleErrorChange('newPassword', i18n.t('Password is required'))
            isValid = false
        }
        if (!input?.oldPassword) {
            handleErrorChange('oldPassword', i18n.t('Password is required'))
            isValid = false
        }

        if (!input?.confirm_password) {
            handleErrorChange('confirm_password', i18n.t('Confirm-Password is required'))
            isValid = false
        }

        if (isValid) {
            const data: IChangePassword = {
                id: auth?.id!,
                password: input?.newPassword!,
                old_password: input?.oldPassword!
            }

            console.log('DATA', data)
            changePasswordMutation.mutateAsync(data, {
                onSuccess: (data) => {
                    if (data?.status) {
                        nav.goBack()
                        ToastMessage(data.message, theme.color, theme.bgDark)
                    } else {
                        handleErrorChange('oldPassword', data?.message || 'Something went wrong!')
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
                    label={i18n.t('Old password')}
                    secureTextEntry={!isChecked}
                    onChangeText={text => handleTextChange('oldPassword', text)}
                    onFocus={() => handleErrorChange('oldPassword', '')}
                    onBlur={() => handleErrorChange('oldPassword', input?.oldPassword ? '' : i18n.t('Password is required'))}
                    keyboardType='number-pad'
                    maxLength={4}
                    error={error?.oldPassword ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />
                <ThemeErrorText textError={error?.oldPassword!} />

                <TextInput
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput, width: '100%' }]}
                    label={i18n.t('New password')}
                    secureTextEntry={!isChecked}
                    onChangeText={text => handleTextChange('newPassword', text)}
                    onFocus={() => handleErrorChange('newPassword', '')}
                    onBlur={() => handleErrorChange('newPassword', input?.newPassword ? '' : i18n.t('Password is required'))}
                    keyboardType='number-pad'
                    maxLength={4}
                    error={error?.newPassword ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />
                <ThemeErrorText textError={error?.newPassword!} />

                <TextInput
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput, width: '100%' }]}
                    label={i18n.t('Confirm Password')}
                    secureTextEntry={!isChecked}
                    onChangeText={text => handleTextChange('confirm_password', text)}
                    onFocus={() => handleErrorChange('confirm_password', '')}
                    onBlur={() => handleErrorChange('confirm_password', input?.confirm_password ? '' : i18n.t('Confirm-Password is required'))}
                    keyboardType='number-pad'
                    maxLength={4}
                    error={error?.confirm_password ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />
                <ThemeErrorText textError={error?.confirm_password!} />

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
                onPress={resetPassword}
                disabled={changePasswordMutation.isPending}
                style={[_styles.button, { backgroundColor: theme.bgDark }]}>
                {changePasswordMutation.isPending ?
                    <ActivityIndicator color={theme.colorText} size={'small'} /> :
                    <Text style={[_styles.text_button, { color: theme.color }]}>{i18n.t('Continue')}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default ChangePassword

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