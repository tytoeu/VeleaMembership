import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../../hooks'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import LoginStyle from '../../util/style/LoginStyle'
import useInputText from '../../hooks/useInputText'
import styles from '../../util/style/Style'
import { StatusBar } from 'expo-status-bar'
import { Layout, ThemeErrorText } from '../../components'
import useAuth from '../../hooks/useAuth'
import { assets } from '../../../assets'
import React from 'react'
import { loginAction } from '../../redux/cache'
import { IUser } from '../../hooks/interface/ISignin'
import { actionCreateCard, actionForgetPassword } from '../../redux/temp'
import i18n from '../../localization'
import { TextInput } from 'react-native-paper'

const logo = assets.logo

const LoginScreen = () => {

    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { navigate } = useAppSelector((state) => state.temp)
    const { handleErrorChange, handleTextChange, input, error, setChecked, isChecked } = useInputText()
    const { signinMutation } = useAuth()
    const dispatch = useAppDispatch()
    const navigation = useAppNavigation()
    const validation = async () => {
        let isValid = true
        if (!input?.phone) {
            handleErrorChange('phone', i18n.t('Phone is required'))
            isValid = false
        }
        if (!input?.password) {
            handleErrorChange('password', i18n.t('Password is required'))
            isValid = false
        }

        if (isValid) {
            const data = { phone_number: input?.phone!, password: input?.password! }
            signinMutation.mutateAsync(data, {
                onSuccess: (data) => {
                    if (data.status) {
                        const user: IUser = { access_token: data.token, id: data.membership.id }
                        dispatch(loginAction(user));
                        navigation.navigate(navigate ?? 'Home')
                    } else {
                        if (data?.errors) {
                            data?.errors?.phone_number && handleErrorChange('phone', data?.errors?.phone_number[0])
                            data?.errors?.password && handleErrorChange('password', data?.errors?.password[0])
                            return
                        }
                        handleErrorChange('phone', data?.message)
                    }
                },
                onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
            })
        }
    }

    if (signinMutation.isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (
        <Layout>
            <View style={[LoginStyle.container]}>
                <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />

                <Image
                    source={logo.login}
                    style={{ width: 250, height: 200, resizeMode: 'contain' }}
                />

                <View style={LoginStyle.textConainter}>
                    <Text style={[LoginStyle.textTitle, { color: theme.color }]}>{i18n.t('Glade to see you again')}</Text>
                </View>
                <TextInput
                    mode='outlined'
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput }]}
                    label={i18n.t('Phone Number')}
                    onChangeText={text => handleTextChange('phone', text)}
                    onFocus={() => handleErrorChange('phone', '')}
                    onBlur={() => handleErrorChange('phone', input?.phone ? '' : i18n.t('Phone is required'))}
                    value={input?.phone}
                    keyboardType='number-pad'
                    error={error?.phone ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                />
                <View style={{ marginLeft: 20, alignSelf: 'flex-start' }}>
                    <ThemeErrorText textError={error?.phone!} />
                </View>

                <TextInput
                    mode='outlined'
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput }]}
                    label={i18n.t('Password')}
                    secureTextEntry={!isChecked}
                    onChangeText={text => handleTextChange('password', text)}
                    onFocus={() => handleErrorChange('password', '')}
                    onBlur={() => handleErrorChange('password', input?.password ? '' : i18n.t('Password is required'))}
                    value={input?.password}
                    keyboardType='number-pad'
                    error={error?.password ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                    right={<TextInput.Icon icon={isChecked ? 'eye' : 'eye-off'} onPress={() => setChecked(!isChecked)} />}
                />
                <View style={{ marginLeft: 20, alignSelf: 'flex-start' }}>
                    <ThemeErrorText textError={error?.password!} />
                </View>

                <View style={[styles.section_container, { marginTop: -18, marginBottom: 24 }]}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('phone-verify')
                        dispatch(actionForgetPassword(true))
                    }}>
                        <Text style={[styles.paragraph, { color: theme.color }]}>{i18n.t('Forgot Password?')}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.bgDark, borderWidth: 1, borderColor: theme.main }]}
                    onPress={validation}>
                    <Text style={[styles.buttonText, { color: theme.color }]}>{i18n.t('Login')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.bgDark }]}
                    onPress={() => {
                        navigation.navigate('qr-scanner-card')
                        dispatch(actionCreateCard(true))
                    }}>
                    {/* onPress={() => navigation.navigate('qr-scanner-card')}> */}
                    <Text style={[styles.buttonText, { color: theme.colorText }]}>{i18n.t('Register with membership card')}</Text>
                </TouchableOpacity>

                <View style={LoginStyle.bottomText}>
                    <Text style={[{ color: theme.color }]}>{i18n.t("Don't have account?")}</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('phone-verify')
                        dispatch(actionForgetPassword(false))
                    }}>
                        <Text style={[{ color: theme.color }]}> {i18n.t('Create Account')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    )
}

export default LoginScreen