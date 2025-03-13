import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { View, Text, Button, TouchableOpacity, Image } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import LoginStyle from '../util/style/LoginStyle'
import useInputText from '../hooks/useInputText'
import { loginAction } from '../redux/cache'
import { StatusBar } from 'expo-status-bar'
import styles from '../util/style/Style'
import { Layout } from '../components'
import { assets } from '../../assets'
import Checkbox from 'expo-checkbox'
import React from 'react'

const logo = assets.logo

const SignupScreen = () => {

    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { handleErrorChange, handleTextChange, input, error, setChecked, isChecked } = useInputText()
    const dispatch = useAppDispatch()
    const navigation = useAppNavigation()

    const validation = () => {
        let isValid = true
        if (!input?.phone) {
            handleErrorChange('phone', 'Phone is required')
            isValid = false
        }
        if (!input?.password) {
            handleErrorChange('password', 'Password is required')
            isValid = false
        }
        if (!input?.fullname) {
            handleErrorChange('fullname', 'Full-Fame is required')
            isValid = false
        }

        console.log(error)
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
                    <Text style={[LoginStyle.textTitle, { color: theme.color }]}>Wellcome Back!</Text>
                    <Text style={[LoginStyle.textTitle, { color: theme.color }]}>Glade to see you, Again!</Text>
                </View>

                <TextInput
                    style={[styles.inputStyle, { color: theme.color, borderColor: error?.fullname ? 'red' : theme.brInput }]}
                    placeholder='Type your full-name'
                    placeholderTextColor={theme.colorText}
                    onChangeText={text => handleTextChange('fullname', text)}
                    onFocus={() => handleErrorChange('fullname', '')}
                    onBlur={() => handleErrorChange('fullname', input?.fullname ? '' : 'full-name is required')}
                />

                <TextInput
                    style={[styles.inputStyle, { color: theme.color, borderColor: error?.phone ? 'red' : theme.brInput }]}
                    placeholder='Type your phone'
                    placeholderTextColor={theme.colorText}
                    onChangeText={text => handleTextChange('phone', text)}
                    onFocus={() => handleErrorChange('phone', '')}
                    onBlur={() => handleErrorChange('phone', input?.phone ? '' : 'Phone is required')}
                />

                <TextInput
                    style={[styles.inputStyle, { color: theme.color, borderColor: error?.password ? 'red' : theme.brInput }]}
                    placeholder='Type your password'
                    placeholderTextColor={theme.colorText}
                    secureTextEntry={!isChecked}
                    onChangeText={text => handleTextChange('password', text)}
                    onFocus={() => handleErrorChange('password', '')}
                    onBlur={() => handleErrorChange('password', input?.password ? '' : 'Password is required')}
                />

                <TouchableOpacity style={styles.section} onPress={() => setChecked(!isChecked)}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : theme.brInput}
                    />
                    <Text style={[styles.paragraph, { color: theme.color }]}>{isChecked ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.btnColor }]}
                    onPress={validation}>
                    <Text style={[styles.buttonText, { color: theme.background }]}>Signup</Text>
                </TouchableOpacity>

                <Text style={[LoginStyle.text, { color: theme.color }]}>Or signin with</Text>
                <View style={LoginStyle.iconContainer}>
                    <TouchableOpacity style={[LoginStyle.icon, { backgroundColor: theme.bgDark }]}>
                        <Ionicons name='logo-facebook' size={24} color={theme.btnColor} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[LoginStyle.icon, { backgroundColor: theme.bgDark }]}>
                        <Ionicons name='logo-google' size={22} color={theme.btnColor} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[LoginStyle.icon, { backgroundColor: theme.bgDark }]}>
                        <AntDesign name="apple-o" size={22} color={theme.btnColor} />
                    </TouchableOpacity>
                </View>

                <View style={LoginStyle.bottomText}>
                    <Text style={[{ color: theme.color }]}>Have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[{ color: theme.color }]}> Sign-In Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Layout>
    )
}

export default SignupScreen