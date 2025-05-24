import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks'
import useDashbaord from '../../hooks/useDashbaord'
import { StatusBar } from 'expo-status-bar'

const PersonalInfor = () => {
    const { currentTheme, theme } = useAppSelector(state => state.cache)
    const { fetchMemberInfoMutation } = useDashbaord()

    const { isPending, data } = fetchMemberInfoMutation

    useEffect(() => { fetchMemberInfoMutation.mutate() }, [])

    const ThemeTextInfo = ({ label, value }: { label: string, value: string }) => {
        return <View style={[styles.theme_text_container, { borderBottomColor: theme.bgInput }]}>
            <Text style={[{ color: theme.color }, styles.label]}>{label}</Text>
            <Text style={[{ color: theme.colorText }, styles.value]}>{value}</Text>
        </View>
    }

    if (isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (
        <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <View style={styles.content}>
                <Text style={[{ color: theme.color }, styles.title]}>My Information</Text>
                <ThemeTextInfo label='Name' value={data?.name!} />
                <ThemeTextInfo label='Gender' value={data?.gender! || 'Other'} />
                <ThemeTextInfo label='Date of Birth' value={data?.dob!} />
                <ThemeTextInfo label='Phone Number' value={data?.phone!} />
                <ThemeTextInfo label='Register Date' value={data?.created_at!} />
            </View>
        </View>
    )
}

export default PersonalInfor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '90%',
        flex: 1
    },
    title: {
        fontSize: 16,
        marginTop: 20,
        fontFamily: 'R700'
    },
    theme_text_container: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        paddingBottom: 10
    },
    label: {
        fontFamily: 'R700',
        fontSize: 14
    },
    value: {
        paddingTop: 8,
        fontFamily: 'R500'
    }
})