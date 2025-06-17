import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import React from 'react'
import { actionNavigate } from '../redux/temp'
import { changeDarkModeAction, setNotificationCount } from '../redux/cache'

const HeaderRight = () => {
    const { theme, auth, currentTheme, countNotify } = useAppSelector((state) => state.cache)
    const nav = useAppNavigation()
    const dispatch = useAppDispatch()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 15 }}>
            <TouchableOpacity style={[styles.icon_bage, { backgroundColor: theme.bgDark }]} onPress={() => dispatch(changeDarkModeAction())}>
                <Ionicons name={currentTheme == 'light' ? 'sunny-outline' : 'sunny'} color={theme.btnColor} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.icon_bage, { backgroundColor: theme.bgDark }]} onPress={() => {
                if (!auth) {
                    dispatch(actionNavigate(null))
                    nav.navigate('Login')
                } else {
                    nav.navigate('QR')
                }
            }}>
                <Ionicons name='qr-code-outline' color={theme.btnColor} size={16} />
            </TouchableOpacity>
            <View style={[styles.icon_bage, { backgroundColor: theme.bgDark }]}>
                <Ionicons name='notifications-outline' color={theme.btnColor} size={20} onPress={() => {
                    nav.navigate('notification')
                    setTimeout(() => {
                        dispatch(setNotificationCount(0))
                    }, 3000)
                }} />
                <Text style={styles.count}>{countNotify > 9 ? `9+` : countNotify}</Text>
            </View>
        </View>
    )
}

export default HeaderRight

const styles = StyleSheet.create({
    icon_bage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        position: 'relative'
    },
    count: {
        position: 'absolute',
        width: 16,
        height: 16,
        backgroundColor: 'rgba(255, 0, 0,0.1)',
        borderRadius: 50,
        fontSize: 12,
        top: -3,
        right: -3,
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'red',
        fontWeight: 'bold'
    }
})