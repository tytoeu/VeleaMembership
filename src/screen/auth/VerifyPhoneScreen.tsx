import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useAppNavigation, useAppSelector } from "../../hooks";
import useErrorHandler from "../../hooks/useErrorHandler";
import pay_style from "../../util/style/pay_style";
import { Ionicons } from "@expo/vector-icons";
import useAuth from '../../hooks/useAuth';
import useInputText from '../../hooks/useInputText';
import { formatDate } from '../../helpers';
import i18n from '../../localization';
import { ThemeErrorText } from '../../components';

const VerifyPhoneScreen = () => {

    const { theme } = useAppSelector(state => state.cache)
    const { isforget } = useAppSelector(state => state.temp)
    const { sendToTelegramBot } = useErrorHandler();
    const nav = useAppNavigation()
    const { sendOtpMutation } = useAuth()
    const { handleErrorChange, handleTextChange, input, error } = useInputText()

    const onChangePhone = (text: string) => {
        // Remove non-digit characters
        let cleaned = text.replace(/\D/g, '');

        // If the first digit is not 0, add it
        if (!cleaned.startsWith('0')) {
            cleaned = '0' + cleaned;
        }

        // Limit to 9 digits only
        const phone = cleaned.slice(0, 12);

        handleTextChange('phone', phone);
    };

    const sentOpt = async () => {
        if (!input?.phone) {
            handleErrorChange('phone', i18n.t('Phone is required'))
            return
        }

        const data = {
            phone_number: input?.phone,
            device_id: "device_id1",
            calling_code: "+855",
            verify_date: formatDate(new Date()),
            isforget: isforget ? 1 : 0
        }

        try {
            sendOtpMutation.mutateAsync(data, {
                onSuccess: (data) => {
                    if (data?.status && data?.sms_res !== null) {
                        nav.navigate('verify-code', { phone: input?.phone })
                    }
                    else {
                        handleErrorChange('phone', data?.message || 'Something went wrong!')
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
                    <Ionicons name="call-outline" size={50} color={theme.color} />
                </View>
                <Text style={[{ color: theme.color, fontSize: 18, fontWeight: 'bold', paddingVertical: 10 }]}>{i18n.t('Your Phone')}</Text>
                <Text style={[{ color: theme.colorText }]}>{i18n.t('Please enter your phone number')}</Text>

                <View style={[{ backgroundColor: theme.bgDark, borderColor: error?.phone ? 'red' : theme.brInput }, _styles.input_container]}>
                    <Text style={[{ color: theme.color, fontSize: 16, paddingVertical: 10 }]}>+855</Text>
                    <TextInput
                        value={input?.phone}
                        onChangeText={text => onChangePhone(text)}
                        onBlur={() => handleErrorChange('phone', input?.phone ? '' : i18n.t('Phone is required'))}
                        onFocus={() => handleErrorChange('phone', '')}
                        returnKeyType='next'
                        placeholder="0XX-XXX-XXX"
                        keyboardType="phone-pad"
                        textContentType="oneTimeCode"
                        autoFocus={true}
                        style={[_styles.input, { color: theme.color, borderColor: theme.brInput }]}
                        placeholderTextColor={theme.colorText}
                        maxLength={12}
                    />
                </View>
                <ThemeErrorText textError={error?.phone!} />
            </View>

            <TouchableOpacity
                disabled={sendOtpMutation.isPending}
                style={[_styles.button, { backgroundColor: theme.bgDark }]}
                onPress={sentOpt}>
                {sendOtpMutation.isPending ?
                    <ActivityIndicator color={theme.colorText} size={'small'} /> :
                    <Text style={[_styles.text_button, { color: theme.color }]}>{i18n.t('Continue')}</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default VerifyPhoneScreen

const _styles = StyleSheet.create({
    input_container: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 25
    },
    input: {
        width: '90%',
        height: 50,
        paddingHorizontal: 10,
        marginVertical: 25,
        color: 'white',
        fontSize: 16,
        borderLeftWidth: 1,
        marginLeft: 10
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
        fontWeight: 'bold',
        color: 'white'
    }
})

