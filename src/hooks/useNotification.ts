import { Platform } from 'react-native'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useAppSelector } from '.';
import { assets } from '../../assets';
const appConfig = assets.config

const useNotification = () => {

    const { auth } = useAppSelector(state => state.cache)

    useEffect(() => {

        registerForPushNotificationsAsync().then((token) => {
            token && updateTokenNotification(token)
        });

    }, [auth]);

    async function registerForPushNotificationsAsync() {

        let token: string;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('No permission for receive notification!');
            return;
        }

        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ??
                Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }

            token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

        } catch (e) {
            token = `${e}`;
        }
        return token;
    }

    async function updateTokenNotification(token: string) {
        if (token) {
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': appConfig.token
                },
                body: JSON.stringify({ "token": token, id: auth?.id ?? null })
            }

            const resposne = await fetch(`${appConfig.api}member/update-token`, options);

            if (!resposne.ok) {
                throw new Error('Failed to update token');
            }
            const data = await resposne.json();
            if (data.status !== 200) {
                throw new Error(data.message || 'Failed to update token');
            }
            return data;
        }
    }

    async function sendNotification() {
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "to": '',
                "title": "Notification",
                "subtitle": "Notify",
                "sound": "default",
                "badge": 1,
                "body": "You've got mail",
                "sticky": true
            }),
        });
    }

    return { registerForPushNotificationsAsync, sendNotification, updateTokenNotification }
}

export default useNotification