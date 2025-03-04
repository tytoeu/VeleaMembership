import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import home_style from '../util/style/HomeStyle'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import { CriditCard, MenuTransaction, TransactionHistory } from '../components'

const HomeScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)

    const Footer = () => (<ActivityIndicator style={{ paddingBottom: 10 }} color={theme.color} />)
    return (
        <View style={[home_style.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <CriditCard code='5555 7777 9999 333' balance={'$12,500.00'} />
            <MenuTransaction />
            <Text style={[home_style.tran_history_text, { color: theme.color }]}>Transaction History</Text>
            <FlatList
                data={Array.from({ length: 10 })}
                renderItem={({ item, index }) => <TransactionHistory index={index} />}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={{ width: '90%', marginTop: 16 }}
                ListFooterComponent={Footer}
            />
        </View>
    )
}

export default HomeScreen