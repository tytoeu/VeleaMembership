import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useAppNavigation, useAppSelector, useBackHandler } from '../hooks'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { FONT_SIZE, HEIGHT, SPACING, WIDTH } from '../helpers'
import { StatusBar } from 'expo-status-bar'
import { assets } from '../../assets'
import React from 'react'

const PaySuccess = () => {
    const { theme } = useAppSelector(state => state.cache)
    const NAV = useAppNavigation()
    const backAction = useBackHandler()
    return (
        <View style={[styles.wrap_container, { backgroundColor: theme.background }]}>
            <StatusBar style={'light'} />
            <Image
                source={assets.logo.login}
                style={StyleSheet.absoluteFill}
                blurRadius={50}
            />

            <View style={[styles.icon_wrap]}>
                <Ionicons name='checkmark-outline' color={theme.color} size={SPACING * 3.2} />
            </View>
            <Text style={[styles.text_suc, { color: theme.color }]}>Thank you</Text>

            <View style={[styles.card_wrap, { backgroundColor: theme.rgba }]} >
                <View style={[styles.card_top, { borderBottomColor: theme.colorText }]}>
                    <View style={[styles.icon_wrap, { backgroundColor: theme.rgba, borderWidth: 2, borderColor: theme.brInput }]}>
                        <MaterialCommunityIcons name="bank-outline" color={theme.color} size={SPACING * 3} />
                    </View>
                    <View style={[styles.text_wrap, { marginLeft: SPACING * 1.5, flexDirection: 'column', alignItems: 'flex-start' }]}>
                        <Text style={[styles.currency, { color: theme.color }]}>8.00 USD</Text>
                        <Text style={[styles.text_sub, { color: theme.color }]}>VELEA Gastropup</Text>
                    </View>
                </View>

                <View style={styles.text_wrap}>
                    <Text style={[styles.text, { color: theme.color, opacity: 0.8 }]}>Invoice</Text>
                    <Text style={[styles.text, { color: theme.color }]}>#99797689876</Text>
                </View>
                <View style={styles.text_wrap}>
                    <Text style={[styles.text, { color: theme.color, opacity: 0.8 }]}>Date</Text>
                    <Text style={[styles.text, { color: theme.color }]}>17-03-2025</Text>
                </View>
            </View>

            <TouchableOpacity style={[styles.button]} onPress={() => NAV.navigate('Home')}>
                <Text style={[styles.text, { color: theme.color }]}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PaySuccess

const styles = StyleSheet.create({
    wrap_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING * 1.5
    },
    text: {
        fontSize: SPACING * 1.5,
        fontFamily: 'R700',
        opacity: 0.8
    },
    card_wrap: {
        width: WIDTH * 0.9,
        minHeight: HEIGHT * 0.15,
        padding: SPACING * 1.5,
        marginTop: SPACING * 2,
        borderRadius: SPACING / 2
    },
    text_suc: {
        fontSize: FONT_SIZE * 1.2,
        fontFamily: 'R700',
        marginTop: SPACING * 0.5,
        textTransform: 'uppercase'
    },
    icon_wrap: {
        width: WIDTH * 0.13,
        height: WIDTH * 0.13,
        borderRadius: WIDTH / 2,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card_top: {
        flexDirection: 'row',
        marginBottom: SPACING * 1.5,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        paddingBottom: SPACING * 1.5
    },
    currency: {
        fontSize: SPACING * 2,
        fontFamily: 'R700'
    },
    text_sub: {
        fontSize: SPACING,
        fontFamily: 'R500',
        opacity: 0.8,
        marginTop: SPACING * 0.5
    },
    button: {
        position: 'absolute',
        bottom: SPACING,
        left: '50%',
        transform: [{ translateX: -WIDTH * 0.45 }],
        backgroundColor: '#af601a',
        width: WIDTH * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT * 0.05,
        borderRadius: SPACING
    }
})