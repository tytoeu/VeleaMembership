import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '../../hooks'

const BalanceRules = () => {

    const { theme } = useAppSelector(state => state.cache)

    const ThemeTextTitle = ({ title }: { title: string }) => {
        return <Text className='pt-3 font-extrabold color-green-950 dark:color-slate-300 text-[15px]'>
            {title}
        </Text>
    }

    const ThemeTextDescrription = ({ description, symbol }: { description: string, symbol?: boolean }) => {
        return (<View className='flex-row' style={{ width: '93%', marginBottom: 8 }}>
            {!symbol && <Ionicons name='radio-button-on-outline' color={theme.colorText} size={12} style={{ marginRight: 10, marginTop: 4 }} />}
            <Text className='text-[14px] leading-6 -tracking-wide font-normal color-black dark:color-slate-300'>{description}</Text>
        </View>)
    }

    return (
        <ScrollView className='dark:bg-black flex-1'>
            <View className='p-6'>
                <ThemeTextTitle title='1. How You Earn Balance' />
                <View className='w-full p-3 bg-white dark:bg-white/10 rounded-lg mb-5 mt-5 overflow-hidden'>
                    <ThemeTextDescrription description='You can receive balance after completing a booking.' />
                    <ThemeTextDescrription description='The balance amount you earn depends on your spending behavior and booking history (such as how often or how much you spend).' />
                    <ThemeTextDescrription description='This system is available to all users.' />
                </View>

                <ThemeTextTitle title='2. From Cashier Top-Up' />
                <View className='w-full p-3 bg-white dark:bg-white/10 rounded-lg mb-5 mt-5 overflow-hidden'>
                    <ThemeTextDescrription description='You can deposit money directly with the cashier. This amount will be added to your app balance.' />
                </View>

                <ThemeTextTitle title='3. Balance Usage' />
                <View className='w-full p-3 bg-white dark:bg-white/10 rounded-lg mb-5 mt-5 overflow-hidden'>
                    <ThemeTextDescrription description='Your balance can be used to:' symbol />
                    <ThemeTextDescrription description='Exchange for Points' />
                    <ThemeTextDescrription description='Redeem Products or F&B items offered in the app' />
                </View>

                <ThemeTextTitle title='4. Conditions' />
                <View className='w-full p-3 bg-white dark:bg-white/10 rounded-lg mb-5 mt-5 overflow-hidden'>
                    <ThemeTextDescrription description='Balance is non-refundable and non-transferable' />
                    <ThemeTextDescrription description='Cannot be exchanged for cash' />
                    <ThemeTextDescrription description='Valid only within the VELEA app ecosystem' />
                </View>

                <ThemeTextTitle title='5. Policy Disclaimer' />
                <View className='w-full p-3 bg-white dark:bg-white/10 rounded-lg mb-5 mt-5 overflow-hidden'>
                    <ThemeTextDescrription description='VELEA may update or change the balance earning rules at any time based on business needs.' />
                    <ThemeTextDescrription description='Inactive accounts or suspected misuse may lead to adjustment or removal of balance.' />
                </View>

                <View className='h-10' />
            </View>
        </ScrollView>
    )
}

export default BalanceRules