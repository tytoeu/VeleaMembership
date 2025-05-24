import { useAppDispatch, useAppNavigation, useAppSelector } from '../../hooks'
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import LoginStyle from '../../util/style/LoginStyle'
import useInputText from '../../hooks/useInputText'
import { StatusBar } from 'expo-status-bar'
import styles from '../../util/style/Style'
import { Layout, ThemeErrorText } from '../../components'
import { assets } from '../../../assets'
import Checkbox from 'expo-checkbox'
import React from 'react'
import { ISignup, IUser } from '../../hooks/interface/ISignin'
import { useRoute } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'
import { loginAction } from '../../redux/cache'
import { ToastMessage } from '../../components/ToastMessage'
import i18n from '../../localization'
import { TextInput } from 'react-native-paper'

const logo = assets.logo
type phoneType = { phone: string, opt_code: string }

const SignupScreen = () => {

    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { handleErrorChange, handleTextChange, input, error, setChecked, isChecked } = useInputText()
    const navigation = useAppNavigation()
    const routes = useRoute()
    const { phone, opt_code } = routes.params as phoneType
    const { signupMutation } = useAuth()
    const dispatch = useAppDispatch()

    const validation = () => {
        let isValid = true

        if (!input?.password) {
            handleErrorChange('password', i18n.t('Password is required'))
            isValid = false
        }
        if (!input?.fullname) {
            handleErrorChange('fullname', i18n.t('full-name is required'))
            isValid = false
        }

        if (input?.confirm_password !== input?.password) {
            handleErrorChange('confirm_password', i18n.t('Confirm-Password is not match'))
            isValid = false
        }

        if (input?.password && input?.password.length! !== 4) {
            handleErrorChange('password', 'Password must be 4 digits')
            isValid = false
        }

        if (isValid) {
            const data: ISignup = {
                full_name: input?.fullname!,
                dob: input?.date!,
                password: input?.password!,
                phone_number: phone,
                otp_code: opt_code,
            }

            // Call your signup function here with the data
            signupMutation.mutateAsync(data, {
                onSuccess: (data) => {
                    if (data?.status) {
                        const user: IUser = {
                            access_token: data.token,
                            full_name: data.membership.full_name,
                            phone_number: data.membership.phone_number,
                            id: data.membership.id,
                            dob: data.membership.dob,
                            password: input?.password!,
                            avatar: data.membership?.avatar
                        }
                        dispatch(loginAction(user))
                        ToastMessage(data.message, theme.color, theme.bgDark)
                    } else {
                        Alert.alert('Warning', data?.message || 'Something went wrong!')
                    }
                },
                onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
            })

        }

    }

    const formatDate = (text: string) => {
        // Remove any non-digit characters first
        const cleaned = text.replace(/\D/g, '');

        // If user types full 8 digits
        if (cleaned.length >= 8) {
            const day = cleaned.slice(0, 2).padStart(2, '0');
            const month = cleaned.slice(2, 4).padStart(2, '0');
            const year = cleaned.slice(4, 8);
            return `${day}-${month}-${year}`;
        }

        // If user types partial date, format progressively
        if (cleaned.length >= 4) {
            const day = cleaned.slice(0, 2);
            const month = cleaned.slice(2, 4);
            const rest = cleaned.slice(4);
            return `${day}-${month}${rest ? '-' + rest : ''}`;
        }

        if (cleaned.length > 2) {
            return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
        }

        return cleaned;
    };

    const handleDateChange = (text: string) => {
        const formatted = formatDate(text);
        handleTextChange('date', formatted); // or setInput({ ...input, date: formatted })
    }

    return (
        <Layout>
            <View style={[LoginStyle.container, { paddingHorizontal: 10 }]}>
                <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />

                <Image
                    source={logo.login}
                    style={{ width: 150, height: 100, resizeMode: 'contain' }}
                />

                <View style={LoginStyle.textConainter}>
                    <Text style={[LoginStyle.textTitle, { color: theme.color }]}>{i18n.t('Create Account')}</Text>
                </View>

                <TextInput
                    mode='outlined'
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput }]}
                    label={i18n.t('Full Name')}
                    placeholderTextColor={theme.colorText}
                    onChangeText={text => handleTextChange('fullname', text)}
                    onFocus={() => handleErrorChange('fullname', '')}
                    onBlur={() => handleErrorChange('fullname', input?.fullname ? '' : i18n.t('full-name is required'))}
                    error={error?.fullname ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />
                <View style={{ marginLeft: 20, alignSelf: 'flex-start' }}>
                    <ThemeErrorText textError={error?.fullname!} />
                </View>
                <TextInput
                    mode='outlined'
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput }]}
                    label={i18n.t('Date of Birth')}
                    placeholderTextColor={theme.colorText}
                    onFocus={() => handleErrorChange('date', '')}
                    onBlur={() => handleErrorChange('date', input?.date ? '' : 'date is required')}
                    returnKeyType='next'
                    keyboardType='number-pad'
                    value={input?.date}
                    onChangeText={handleDateChange}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />

                <TextInput
                    mode='outlined'
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput }]}
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
                <View style={{ marginLeft: 20, alignSelf: 'flex-start' }}>
                    <ThemeErrorText textError={error?.password!} />
                </View>
                <TextInput
                    mode='outlined'
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput }]}
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
                <View style={{ marginLeft: 20, alignSelf: 'flex-start' }}>
                    <ThemeErrorText textError={error?.confirm_password!} />
                </View>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.bgDark, marginTop: 20 }]}
                    disabled={signupMutation.isPending}
                    onPress={validation}>
                    {signupMutation.isPending ?
                        <ActivityIndicator color={theme.colorText} size={'small'} /> :
                        <Text style={[styles.buttonText, { color: theme.color }]}>{i18n.t('Create Account')}</Text>}
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

export default SignupScreen

