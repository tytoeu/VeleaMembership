import { View, Text, ScrollView, Linking } from 'react-native'
import React from 'react'

const data = [
    {
        label: '1. Registration & Eligibility',
        value: 'To participate, users must register an account in the VELEA mobile app. All users aged 18 and above are eligible to join the loyalty program upon registration.'
    },
    {
        label: '2. How to Earn Points',
        value: `Customers earn points by showing their unique QR code in the VELEA app to the cashier before completing payment at any VELEA store. Points are calculated based on the value of the transaction and are automatically credited to the user's account.`
    },
    {
        label: '3. QR Code Usage',
        value: `Users must present their QR code before payment. Points cannot be retroactively applied to past transactions. Each QR code is linked to the user's account and should not be shared with others.`
    },
    {
        label: '4. Redeeming Rewards',
        value: `Points can be redeemed in the VELEA app through a random reward system. Available rewards include food and drink items. Once a reward is revealed, it is final and non-exchangeable.`
    },
    {
        label: '5. Reward Collection',
        value: `Redeemed rewards will appear as a digital voucher in the VELEA app. To claim the item, users must visit a VELEA store and present the voucher at the counter. Each voucher has an expiration date and must be used before it expires.`
    },
    {
        label: '6. Points Validity & Limits',
        value: `Points are valid for 12 months from the date of earning. VELEA reserves the right to limit daily redemptions or adjust point earning rules as needed.`
    },
    {
        label: '7. Fair Use & Disclaimer',
        value: `The reward system is for engagement and entertainment purposes. It is not gambling. Abuse, fraud, or manipulation of the system may result in account suspension or removal from the program.`
    },
    {
        label: '8. Changes to the Program',
        value: `VELEA reserves the right to modify, pause, or terminate the loyalty program or its terms at any time. Notice of significant changes will be communicated via the app.`
    },
]

const TermCondition = () => {
    return (
        <ScrollView className='dark:bg-black flex-1'>
            <View className='p-6'>
                <Text className='color-green-950 dark:color-slate-300 font-extrabold text-lg'>
                    VELEA Loyalty Program - Terms & Conditions
                </Text>
                <Text className='text-[14px] leading-6 -tracking-wide font-normal pt-4 color-black dark:color-slate-300'>
                    The VELEA Loyalty Program rewards customers for shopping at VELEA stores using the VELEA mobile app. Participation in this program is subject to the following terms and conditions:
                </Text>

                {data.map((item, index) => (<View key={index}>
                    <Text className='pt-3 font-extrabold color-green-950 dark:color-slate-300 text-[15px]'>
                        {item.label}
                    </Text>

                    <Text className='text-[14px] leading-6 -tracking-wide font-normal pt-2 color-black dark:color-slate-300'>
                        {item.value}
                    </Text>
                </View>))}

                <Text className='pt-3 font-extrabold color-green-950 dark:color-slate-300 text-[15px]'>
                    9. Contact Information
                </Text>

                <Text className='text-[14px] leading-6 -tracking-wide font-normal pt-2 text-black dark:text-slate-300'>
                    For support or questions related to the loyalty program, users can contact VELEA via the app or by emailing{' '}
                    <Text
                        className='text-blue-500 underline'
                        onPress={() => Linking.openURL('mailto:it4@ptc-computer.com.kh')}
                    >
                        it4@ptc-computer.com.kh
                    </Text>{' '}
                    or{' '}
                    <Text
                        className='text-blue-500 underline'
                        onPress={() => Linking.openURL('https://velea.asia/velea-profile')}
                    >
                        https://velea.asia/velea-profile
                    </Text>
                </Text>
                <View className='h-10' />
            </View>
        </ScrollView>
    )
}

export default TermCondition