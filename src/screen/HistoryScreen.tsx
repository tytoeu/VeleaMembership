import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { Purchase, Topup, EearnCorn } from './tab_history'
import history_style from '../util/style/HistoryStyle'
import { StatusBar } from 'expo-status-bar'
import { useAppSelector } from '../hooks'
import { useState } from 'react'

const renderScene = SceneMap({
    Purchase: Purchase,
    EearnCorn: EearnCorn,
    Topup: Topup
});

const routes = [
    { key: 'Purchase', title: 'Purchase' },
    { key: 'EearnCorn', title: 'Eearn-corn' },
    { key: 'Topup', title: 'Top-up' }
];

const HistoryScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const renderTabBar = (props: any) => (
        <View style={[styles.tabContainer, { backgroundColor: theme.bgDark }]}>
            <TabBar
                {...props}
                style={[styles.tabBar]}
                indicatorStyle={styles.indicator}
                activeColor={'white'}
                inactiveColor={theme.color}
            />
        </View>
    );

    return (
        <View style={[history_style.container, { backgroundColor: theme.background }]}>
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

export default HistoryScreen

const styles = StyleSheet.create({
    tabContainer: {
        padding: 3,
        borderRadius: 20,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabBar: {
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        shadowColor: 'transparent'
    },
    indicator: {
        backgroundColor: '#b9770e',
        height: '80%',
        borderRadius: 20,
        marginVertical: 5
    }
});
