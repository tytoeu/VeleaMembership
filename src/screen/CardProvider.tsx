import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Linking } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, MD3Colors, ProgressBar } from 'react-native-paper';
import useLinkCard from '../hooks/useLinkCard';
import { Loading } from '../components';
import { useRoute } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks';
import { actionCreateCard } from '../redux/temp';

const WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = WIDTH - 40;
const SPACING = 10;
const SNAP = CARD_WIDTH + SPACING;
const MIN = 0;

interface IMembershipIier {
    id: number;
    name: string;
    description: string;
    amount: number;
    image: string;
}

interface IProp {
    balance: number
}

const CardProvider = () => {

    const router = useRoute()
    const { balance } = router.params as IProp
    const nav = useAppNavigation();
    const dispatch = useAppDispatch()

    const { membershipTierQuery } = useLinkCard()

    const DATA = membershipTierQuery.data?.data || [] as IMembershipIier[]
    const PATH_IMAGE = membershipTierQuery.data?.path_image

    const { theme, auth } = useAppSelector(state => state.cache)

    const listRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const currentIdx = Math.round(offsetX / SNAP);   // nearest snap point
        if (currentIdx !== activeIndex && currentIdx >= 0 && currentIdx < DATA.length) {
            setActiveIndex(currentIdx);
        }
    };

    const scrollTo = (i: number) => {
        listRef.current?.scrollToIndex({ index: i, animated: true });
    };

    const activeItem = DATA[activeIndex];

    const MAX = activeItem?.amount || 0; // merbership's point 

    const range = (balance - MIN) / (MAX - MIN) || 0

    const progress = Math.max(0, Math.min(1, range));

    const tagsStyles = {
        ul: {
            color: theme.color, // dark gray-blue text
            fontSize: 16,
            lineHeight: 24
        }
    };

    if (membershipTierQuery.isLoading) return <Loading />

    return (
        <View className='dark:bg-black flex-1'>
            <View>
                <FlatList
                    ref={listRef}
                    horizontal
                    pagingEnabled
                    snapToInterval={SNAP}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
                    data={DATA}
                    keyExtractor={item => item.id}
                    getItemLayout={(_, i) => ({
                        length: SNAP,
                        offset: SNAP * i,
                        index: i,
                    })}
                    renderItem={({ item, index }) => {
                        const imageUrl = `${PATH_IMAGE}${item.image}`
                        return (
                            <View
                                style={{
                                    width: CARD_WIDTH,
                                    height: 200,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                        )
                    }}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                />
            </View>

            <View style={{ marginHorizontal: 16 }} className=' p-3 bg-white dark:bg-white/10 rounded-lg mb-5 mt-5 overflow-hidden'>
                <Text style={{ fontSize: 20, fontWeight: '700', color: theme.color }}>
                    {activeItem.name}
                </Text>

                <ProgressBar
                    progress={progress}
                    color={MD3Colors.error50}
                    style={{ height: 8, marginBottom: 16, marginTop: 8 }}
                    fillStyle={{ borderRadius: 8 }}
                />

                <Text style={{ marginTop: 8, fontSize: 14, color: theme.color, marginBottom: 20 }}>
                    <RenderHTML
                        contentWidth={WIDTH}
                        source={{ html: activeItem.description }}
                        tagsStyles={tagsStyles}
                        renderersProps={{ a: { onPress: (_event, href) => Linking.openURL(href) } }}
                    />
                </Text>

            </View>

            <Button
                mode='contained'
                style={{ position: 'absolute', bottom: 0, alignSelf: 'center', width: '90%' }}
                onPress={() => {
                    if (auth) {
                        nav.navigate('qr-scanner-card')
                        dispatch(actionCreateCard(false))
                    } else {
                        nav.navigate('Login');
                    }
                }}
            >
                Link Card
            </Button>
        </View>
    );
}

export default CardProvider
