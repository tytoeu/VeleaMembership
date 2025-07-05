import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { useAppNavigation, useAppSelector } from '../../hooks';
import useLinkCard from '../../hooks/useLinkCard';
import { ToastMessage } from '../../components/ToastMessage';
import { DonutCart } from '../../components';

interface ICardNumber {
    card_number: string;
}

const ProcessLinkCard = () => {
    const router = useRoute()
    const data = router.params as ICardNumber
    const { theme } = useAppSelector(state => state.cache)
    const { checkCardInfoMutation, verifyInforCardMutation } = useLinkCard()
    const nav = useAppNavigation()
    const { isRegisterCard } = useAppSelector(state => state.temp)

    useEffect(() => {
        // if the card is already registered, we will check the card info
        // if not, we will go to register card screen
        if (isRegisterCard) {
            checkCardInfoMutation.mutateAsync(data.card_number, {
                onSuccess(response) {
                    console.log('response', response)
                    if (response?.status) {
                        // go to type password for login
                        setTimeout(() => {
                            if (response?.data) {
                                nav.navigate('login-password', { membership: response.data })
                            } else {
                                nav.navigate('Login')
                                ToastMessage('warning', response?.message || 'Card not found, please register a new card.')
                            }
                        }, 2000)
                    } else {
                        // go to register card
                        setTimeout(() => {
                            console.log(response)
                            if (response?.data?.status == true) {
                                nav.navigate('information-card', { cardInfor: response?.data })
                            } else {
                                nav.navigate('Login')
                                ToastMessage(response?.message || 'Card not found, please register a new card.', undefined, 'red')
                            }
                        }, 2000)
                    }
                },
                onError(error) {
                    console.error('Error fetching card info:', error)
                }
            })
        } else {
            // if the card is not registered, we will go to register card screen
            // but user membership is registered
            verifyInforCardMutation.mutateAsync(data.card_number, {
                onSuccess(response) {
                    if (response?.status) {
                        // go to type password for login
                        setTimeout(() => {
                            nav.navigate('Home')
                            ToastMessage(response?.message || 'Card not found, please register a new card.', undefined, 'red')
                        }, 2000)
                    } else {
                        // go to register card
                        setTimeout(() => {
                            if (response?.data?.status == true) {
                                nav.navigate('information-card', { cardInfor: response?.data })
                            } else {
                                nav.navigate('Home')
                                ToastMessage(response?.message || 'Card not found, please register a new card.', undefined, 'red')
                            }
                        }, 2000)
                    }
                },
                onError(error) {
                    console.error('Error fetching card info:', error)
                }
            })
        }
    }, [])

    return <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center' }]}>
        <DonutCart percentag={100} max={100} duration={3000} strokeWidth={5} />
        <Text style={{ color: theme.main, marginLeft: 12, fontFamily: 'R700' }}>Analyzing...!</Text>
    </View>
}

export default ProcessLinkCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})