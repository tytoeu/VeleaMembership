import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useAppSelector } from '../hooks'
import { StatusBar } from 'expo-status-bar'
import HomeStyle from '../util/style/HomeStyle'
import useGetPost from '../hooks/useGetPost'
import menuStyle from '../util/style/MenuStyle'

const MenuScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const { infiniteQuery, deletePostMutation, createPostMutation } = useGetPost()
    const daraArr = infiniteQuery.data?.pages.flatMap(page => page) || [];

    const onEndReached = () => {
        if (infiniteQuery.hasNextPage && !infiniteQuery.isLoading) {
            infiniteQuery.fetchNextPage()
        }
    }

    const ListFooterComponent = () => {
        if (infiniteQuery.isFetchingNextPage) {
            return <ActivityIndicator size={'small'} color={'#ddd'} />;
        }

        return null
    }

    return (
        <View style={[HomeStyle.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <FlatList
                data={daraArr}
                renderItem={({ item, index }) => {
                    return (<View style={[menuStyle.card, { backgroundColor: theme.bgDark }]} >
                        <Text style={[menuStyle.textTitle, { color: theme.color }]}>{item.title}</Text>
                        <Text style={[menuStyle.text, { color: theme.color }]}>{item.body}</Text>
                    </View>)
                }}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                scrollEventThrottle={50}
                ListFooterComponent={ListFooterComponent}
                ListFooterComponentStyle={{ padding: 10 }}
                contentContainerStyle={{ paddingTop: 10 }}
            />
        </View>
    )
}

export default MenuScreen