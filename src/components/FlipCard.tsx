// FlipCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks';
import { ICard } from '../hooks/interface/IDashboard';
import QRCode from 'react-native-qrcode-svg';
import { actionCreateCard } from '../redux/temp';

const WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = WIDTH - 40;

interface FlipCardProps {
    frontText: string;
    backText: string;
    isCreated?: boolean;
    item: ICard;
    index: number
}

const FlipCard: React.FC<FlipCardProps> = ({ isCreated, item, index }) => {
    const { theme, auth } = useAppSelector(state => state.cache);
    const [isFlipped, setIsFlipped] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const nav = useAppNavigation()
    const dispatch = useAppDispatch()

    const frontInterpolate = animation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = animation.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    const flipCard = () => {
        if (isFlipped) {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true
            }).start();
        } else {
            Animated.spring(animation, {
                toValue: 180,
                useNativeDriver: true,
            }).start();
        }
        setIsFlipped(!isFlipped);
    };

    if (isCreated) {
        return (<TouchableOpacity
            activeOpacity={0.8} style={[styles.card_container, { backgroundColor: theme.bgDark }]}
            onPress={() => {
                if (auth) {
                    nav.navigate('qr-scanner-card')
                    dispatch(actionCreateCard(false))
                } else {
                    nav.navigate('Login');
                }
            }}>
            <Ionicons name='add-circle-outline' size={50} color={theme.background} />
        </TouchableOpacity>)
    }

    return (
        <TouchableWithoutFeedback onPress={flipCard}>
            <View style={styles.card_container}>
                <Animated.View
                    style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
                    <Image
                        source={{ uri: item.tier_image ?? '' }}
                        style={{ width: '100%', height: '100%', borderRadius: 12 }}
                        resizeMode='cover'
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.card,
                        styles.cardBack,
                        {
                            transform: [{ rotateY: backInterpolate }],
                            position: 'absolute',
                            top: 0,
                        },
                    ]}>
                    {/* <Text style={styles.text}>🔒 Back of Card</Text> */}
                    <View style={styles.card_body}>
                        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.text, { color: 'white', fontSize: 60, fontFamily: 'R900', marginLeft: 10, marginBottom: -5 }]}>{`${item.offer_discount} `}</Text>
                            <Text style={{ color: 'white', fontSize: 12, fontFamily: 'R700', opacity: 0.8 }}>EXP: {item.expire_date}</Text>
                        </View>
                        <View style={{ width: '50%', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', paddingVertical: 15 }}>
                            <Text style={[styles.text, { color: 'white', textTransform: 'uppercase', fontSize: 12, fontFamily: 'R900' }]}>Membership Card</Text>

                            <View style={{ width: '55%', height: '60%', borderRadius: 8, alignSelf: 'center', backgroundColor: 'white', opacity: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                <QRCode value={`${item.card_number}`} size={90} logoBackgroundColor='transparent' />
                            </View>
                            <Text style={[styles.text, { color: 'white', fontSize: 12 }]}>{item.card_number}</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
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
    }
});

export default FlipCard;
