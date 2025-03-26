import SmsRetriever from "react-native-sms-retriever";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from "../../hooks";
import useErrorHandler from "../../hooks/useErrorHandler";

type userInfo = {
    fullname: string,
    phone: string,
    password: string
}

const VerifyCodeScreen = () => {
    const routes = useRoute()
    const { theme } = useAppSelector(state => state.cache)
    const { sendToTelegramBot } = useErrorHandler();
    const { phone, fullname } = routes.params as userInfo
    const [otp, setOtp] = useState("");
    console.log(phone)

    useEffect(() => {
        const startListening = async () => {
            try {
                const registered = await SmsRetriever.startSmsRetriever();
                console.log("SMS Retriever started:", registered);

                if (registered) {
                    SmsRetriever.addSmsListener((event) => {
                        console.log("Received SMS:", event.message);

                        // Extract OTP (Assuming a 6-digit OTP)
                        const otpMatch = event?.message?.match(/\b\d{6}\b/);
                        if (otpMatch) {
                            setOtp(otpMatch[0]);
                        }

                        SmsRetriever.removeSmsListener();
                    });
                }
            } catch (error) {
                sendToTelegramBot(error)
            }
        };

        startListening();
        return () => SmsRetriever.removeSmsListener();
    }, []);


    return (
        <View style={[_styles.container, { backgroundColor: theme.background }]}>
            <View style={[_styles.content]}>
                <Text style={[{ color: theme.color }, _styles.text]}>We have sent the verification {'\n'} code to your SMS: {phone}</Text>
                <TextInput
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="Enter OTP Code"
                    keyboardType="numeric"
                    textContentType="oneTimeCode"
                    style={[_styles.inputstyle, { borderBottomColor: theme.brInput, color: theme.color }]}
                    placeholderTextColor={theme.colorText}

                />

                <TouchableOpacity style={[_styles.btn, { backgroundColor: theme.color }]} onPress={() => sendToTelegramBot('Hello')}>
                    <Text style={{ color: theme.background, fontSize: 16, fontFamily: 'R700' }}>Verify</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VerifyCodeScreen

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    content: {
        width: '90%',
        paddingTop: 16
    },
    textTitle: {
        fontSize: 20,
        fontFamily: 'R900',
        opacity: 0.9
    },
    text: {
        fontSize: 15,
        marginTop: 16,
        lineHeight: 25
    },
    inputstyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginTop: 8,
        height: 45
    },
    btn: {
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 22,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 16
    }
})