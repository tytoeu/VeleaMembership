// import SmsRetriever from "react-native-sms-retriever";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useAppNavigation, useAppSelector } from "../../hooks";
import useErrorHandler from "../../hooks/useErrorHandler";
import { Ionicons } from "@expo/vector-icons";
import pay_style from "../../util/style/pay_style";
import useInputText from "../../hooks/useInputText";
import useAuth from "../../hooks/useAuth";
import { formatDate } from "../../helpers";
import i18n from "../../localization";
import { ThemeErrorText } from "../../components";

type phoneType = {
    phone: string
}
const VerifyCodeScreen = () => {
    const routes = useRoute()
    const { theme } = useAppSelector(state => state.cache)
    const { isforget } = useAppSelector(state => state.temp)
    const { sendToTelegramBot } = useErrorHandler();
    const { phone } = routes.params as phoneType
    const nav = useAppNavigation()
    const { handleErrorChange, handleTextChange, input, error } = useInputText()
    const { verifyOtpMutation, sendOtpMutation } = useAuth()

    // useEffect(() => {
    //     const startListening = async () => {
    //         try {
    //             const registered = await SmsRetriever.startSmsRetriever();
    //             console.log("SMS Retriever started:", registered);

    //             if (registered) {
    //                 SmsRetriever.addSmsListener((event) => {
    //                     // Extract OTP (Assuming a 6-digit OTP)
    //                     const otpMatch = event?.message?.match(/\b\d{6}\b/);
    //                     if (otpMatch) {
    //                         handleTextChange('otp_code', otpMatch[0])
    //                         handleErrorChange('otp_code', '')
    //                     }

    //                     SmsRetriever.removeSmsListener();
    //                 });
    //             }
    //         } catch (error) {
    //             sendToTelegramBot(error)
    //         }
    //     };

    //     startListening();
    //     return () => SmsRetriever.removeSmsListener();
    // }, []);


    const verifyCode = async () => {
        if (!input?.otp_code) {
            handleErrorChange('otp_code', i18n.t('Code is required'))
            return
        }

        const data = {
            phone_number: phone,
            otp_code: input?.otp_code,
        }

        try {
            verifyOtpMutation.mutateAsync(data, {
                onSuccess: (data) => {
                    if (data?.status) {
                        //reset-password
                        if (isforget) {
                            nav.navigate('reset-password', { phone: phone, opt_code: input?.otp_code })
                        } else {
                            nav.navigate('sign-up', { phone: phone, opt_code: input?.otp_code })
                        }
                    } else {
                        handleErrorChange('otp_code', data?.message || 'Something went wrong!')
                    }
                    console.log(data)
                },
                onError: (error) => {
                    sendToTelegramBot(error)
                }
            })
        } catch (error) {
            sendToTelegramBot(error)
        }
    }

    const sentOpt = async () => {

        const data = {
            phone_number: phone,
            device_id: "device_id1",
            calling_code: "+855",
            verify_date: formatDate(new Date())
        }

        try {
            sendOtpMutation.mutateAsync(data, {
                onSuccess: (data) => {
                    if (data?.status && data?.sms_res !== null) {
                        nav.navigate('verify-code', { phone: input?.phone })
                    }
                    else {
                        Alert.alert('Warning', data?.message || 'Something went wrong!')
                    }
                    console.log(data)
                },
                onError: (error) => {
                    sendToTelegramBot(error)
                }
            })
        } catch (error) {
            sendToTelegramBot(error)
        }
    }

    return (
        <View style={[{ backgroundColor: theme.background, flex: 1, justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center' }]}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={[pay_style.contain_image, { backgroundColor: theme.bgDark }]}>
                    <Ionicons name="document-lock-outline" size={50} color={theme.color} />
                </View>
                <Text style={[{ color: theme.color, fontSize: 18, fontWeight: 'bold', paddingVertical: 10 }]}>{i18n.t('Verification Code')}</Text>
                <Text style={[{ color: theme.colorText, textAlign: 'center', lineHeight: 22 }]}>{i18n.t('We have sent a verification code')} {`\n`} {i18n.t('to your mobile number')}</Text>

                <View style={[{ backgroundColor: theme.bgDark, borderColor: error?.otp_code ? 'red' : theme.brInput }, _styles.input_container]}>
                    <TextInput
                        value={input?.otp_code}
                        onChangeText={text => handleTextChange('otp_code', text)}
                        onBlur={() => handleErrorChange('otp_code', input?.otp_code ? '' : i18n.t('Code is required'))}
                        onFocus={() => handleErrorChange('otp_code', '')}
                        placeholder={i18n.t("Code 6 digit")}
                        keyboardType="phone-pad"
                        textContentType="oneTimeCode"
                        autoFocus={true}
                        style={[_styles.input, { color: theme.color }]}
                        placeholderTextColor={theme.colorText}
                        returnKeyType="done"
                        maxLength={6}

                    />
                </View>
                <View style={{ height: 25 }} />
                <ThemeErrorText textError={error?.otp_code!} />

                <TouchableOpacity style={_styles.resennd_code}
                    onPress={sentOpt}
                    disabled={sendOtpMutation.isPending}>
                    <Text style={[{ color: theme.colorText, fontSize: 14, fontWeight: 'bold' }]}>{i18n.t('Resend code')}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={verifyCode}
                disabled={verifyOtpMutation.isPending}
                style={[_styles.button, { backgroundColor: theme.bgDark }]}>
                {verifyOtpMutation.isPending ?
                    <ActivityIndicator color={theme.colorText} size={'small'} /> :
                    <Text style={[_styles.text_button, { color: theme.color }]}>{i18n.t('Continue')}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default VerifyCodeScreen

const _styles = StyleSheet.create({
    input_container: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 25
    },
    input: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        marginVertical: 25,
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
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
    resennd_code: {
        borderRadius: 10,
        alignSelf: 'flex-end',
        paddingVertical: 16,
        marginTop: -30
    }
})