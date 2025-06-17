import { View, Text, ActivityIndicator, Image, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useAppNavigation, useAppSelector } from '../hooks'
import useLinkCard from '../hooks/useLinkCard'
import { StatusBar } from 'expo-status-bar'
import Animated, { Easing, FadeInDown } from 'react-native-reanimated'
import QRCode from 'react-native-qrcode-svg'
import i18n from '../localization'
import { useRoute } from '@react-navigation/native'
import { formatDate } from '../helpers'
import { ICardInformation } from '../hooks/interface/ISignin'
import { ToastMessage } from '../components/ToastMessage'

const WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = WIDTH - 40;

interface ICardData {
    cardInfor: {
        membershipNumber: string,
        offerDiscount: number,
        limitOffer: number,
        limitType: string,
        expiredDate: string,
        membershipId: number,
        customerName: string,
        phone: string,
        dob: string,
        type: string;
        tierImage: string;
        membership_id: number | null;
    }
}

const CardInformationScreen = () => {

    const { theme, auth, currentTheme } = useAppSelector(state => state.cache)
    const { isRegisterCard } = useAppSelector(state => state.temp)
    const { linkCardMutation } = useLinkCard()
    const nav = useAppNavigation()
    const router = useRoute();

    const data = router.params
    const { cardInfor } = data as ICardData;

    const handleFinish = () => {
        if (isRegisterCard) {

            if (cardInfor.membership_id) {
                const membership = {
                    membership_id: cardInfor.membership_id,
                    card_number: cardInfor.membershipNumber
                }
                nav.navigate('login-password', { membership, cardInfor })
            } else {
                nav.navigate('create-password', { data })
            }

        }
        else {
            const dataJson: ICardInformation = {
                ...cardInfor,
                membership_id: auth?.id || 0,
            }

            linkCardMutation.mutateAsync(dataJson, {
                onSuccess(data) {
                    console.log('Link card response:', data)
                    if (data?.status) {
                        nav.navigate('BottomTab')
                        ToastMessage(data.message)
                    } else {
                        nav.navigate('BottomTab')
                        Alert.alert('Warning', data.message || 'Card not found, please register a new card.')
                    }
                },
                onError(error) {
                    console.error('Error linking card:', error)
                }
            })
        }
    }

    useEffect(() => {
        const { routes } = nav.getState()
        const filterRoutes = routes.filter(route => route.name !== 'process-link-card' && route.name !== 'qr-scanner-card');

        nav.reset({
            index: filterRoutes.length - 1,
            routes: filterRoutes as any[]
        });

    }, [])

    if (linkCardMutation.isPending) {
        <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (
        <Animated.View
            entering={FadeInDown.duration(500).easing(Easing.ease).delay(100)}
            style={[styles.container, { backgroundColor: theme.background }]}>

            <View>
                <View style={{ marginVertical: 30 }}>
                    <Text style={[styles.congrate_title, { color: theme.color }]}>Congratulations 🎉</Text>
                    <Text style={[{ color: theme.colorText }, styles.congrate_sub]}>Welcome to velea membership mobile.</Text>
                </View>

                <View style={styles.card_container}>
                    <View style={[styles.card]}>
                        <Image
                            source={{ uri: cardInfor.tierImage }}
                            style={{ width: '100%', height: '100%', borderRadius: 12 }}
                            resizeMode='cover'
                        />
                    </View>
                </View>

                <View style={{ height: 16 }} />

                <View style={styles.card_container}>
                    <View style={[styles.card]}>
                        <View style={styles.card_body}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.text, { color: 'white', fontSize: 60, fontFamily: 'R900', marginBottom: -5 }]}>{`${cardInfor.offerDiscount}$ `}</Text>
                                <Text style={{ color: 'white', fontSize: 12, fontFamily: 'R700', opacity: 0.8 }}>EXP: {formatDate(new Date(cardInfor.expiredDate))}</Text>
                            </View>
                            <View style={{ width: '50%', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', paddingVertical: 15 }}>
                                <Text style={[styles.text, { color: 'white', textTransform: 'uppercase', fontSize: 12, fontFamily: 'R900' }]}>Membership Card</Text>

                                <View style={{ width: '55%', height: '60%', borderRadius: 8, alignSelf: 'center', backgroundColor: 'white', opacity: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <QRCode value={cardInfor.membershipNumber} size={90} logoBackgroundColor='transparent' ecl='M' />
                                </View>
                                <Text style={[styles.text, { color: 'white', fontSize: 12, fontFamily: 'R900', opacity: 0.8 }]}>{cardInfor.membershipNumber}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {isRegisterCard ?
                <TouchableOpacity
                    onPress={handleFinish}
                    style={[styles.button, { backgroundColor: theme.bgDark }]}>
                    <Text style={[styles.text_button, { color: theme.color }]}>{i18n.t('Continue')}</Text>
                </TouchableOpacity> :
                <TouchableOpacity
                    onPress={handleFinish}
                    style={[styles.button, { backgroundColor: theme.bgDark }]}>
                    <Text style={[styles.text_button, { color: theme.color }]}>{i18n.t('Finish')}</Text>
                </TouchableOpacity>}

        </Animated.View>
    )
}

export default CardInformationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card_body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    card_container: {
        height: 200,
        borderRadius: 12,
        width: CARD_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    text_promotion: {
        marginLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: -12
    },
    cardBack: {
        backgroundColor: '#1e293b',
    },
    card: {
        backgroundColor: '#0c4a6e',
        backfaceVisibility: 'hidden',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: CARD_WIDTH,
        height: 200,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    button: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25
    },
    text_button: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    congrate_title: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'R900',
        marginBottom: 5
    },
    congrate_sub: {
        textAlign: 'center',
        fontFamily: 'R500',
        fontSize: 16
    }
})