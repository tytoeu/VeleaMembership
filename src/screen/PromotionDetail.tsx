import { View, Text, StyleSheet, Image, Dimensions, Linking, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { useAppNavigation, useAppSelector } from '../hooks';
import RenderHtml from 'react-native-render-html';
import { BackNavigation } from '../components';

interface item {
    id: number;
    title: string;
    description: string;
    image: string;
    status: number;
    start_date: string;
    closing_date: string;
    created_at: string;
}

interface props {
    item: item
}

const WIDTH = Dimensions.get('screen').width
const PromotionDetail = () => {
    const router = useRoute();
    const { item } = router.params as props
    const { theme } = useAppSelector(state => state.cache)
    const nav = useAppNavigation()

    const tagsStyles = {
        p: {
            color: theme.color, // dark gray-blue text
            fontSize: 16,
            lineHeight: 24
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[_style.container, { backgroundColor: theme.background }]}>
            <BackNavigation
                background={'rgba(0,0,0,0.5)'}
                color={'white'}
                onPress={() => nav.goBack()}
            />
            <Image
                source={{ uri: item.image }}
                style={{
                    width: WIDTH,
                    height: WIDTH + 100,
                    objectFit: 'cover'
                }}
            />
            <View style={{ padding: 16 }}>
                <Text style={{ color: theme.color, fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                <RenderHtml
                    contentWidth={WIDTH}
                    source={{ html: item.description }}
                    tagsStyles={tagsStyles}
                    renderersProps={{ a: { onPress: (_event, href) => Linking.openURL(href) } }}
                />
            </View>
        </ScrollView>
    )
}

export default PromotionDetail

const _style = StyleSheet.create({
    container: {
        flex: 1,
    }
})