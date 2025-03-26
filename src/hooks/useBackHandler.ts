import { BackHandler, Alert, AppState } from 'react-native'
import React, { useEffect, useState } from 'react'

const useBackHandler = () => {
    const [appState, setAppState] = useState(AppState.currentState);
    useEffect(() => {
        const onBackPress = () => {
            Alert.alert(
                'Exit App', 'Are you sure you want to exit?',
                [
                    {
                        text: ('Cancel'),
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: ('Exit'),
                        onPress: () => BackHandler.exitApp(),
                    },
                ],
                { cancelable: false }
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        const handleAppStateChange = (nextAppState: any) => {
            if (appState.match(/active/) && nextAppState === 'background') {
                console.log('App has gone to the background (home button pressed)');
            }

            // action check shift
            if (nextAppState === 'active') {

            }
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
            backHandler.remove();
        };
    }, []);

    return appState
}

export default useBackHandler