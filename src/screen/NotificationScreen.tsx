import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useAppSelector } from "../hooks"
import { useState } from "react"
import { Inbox, Notify } from "./tab_notify"
import i18n from "../localization"


const NotificationScreen = () => {

    const { theme, currentTheme } = useAppSelector(state => state.cache)
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const renderScene = SceneMap({ Inbox, Notify });

    const routes = [
        { key: 'Inbox', title: i18n.t('My Inbox') },
        { key: 'Notify', title: i18n.t('Notify') }
    ];

    const renderTabBar = (props: any) => (
        <View style={[styles.tabContainer, { backgroundColor: theme.bgDark }]}>
            <TabBar
                {...props}
                style={[styles.tabBar]}
                indicatorStyle={styles.indicator}
                activeColor={'white'}
                inactiveColor={theme.color}
                activeOpacity={0}
                pressColor={theme.bgDark}
            />
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar style={currentTheme == 'light' ? 'dark' : 'light'} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
                tabBarPosition='top'
                lazy
                lazyPreloadDistance={2}
            />
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabContainer: {
        borderRadius: 10,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginBottom: 10,
        marginTop: 20
    },
    tabBar: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        marginHorizontal: 10
    },
    indicator: {
        backgroundColor: '#b9770e',
        height: '80%',
        borderRadius: 10,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3
    },
})