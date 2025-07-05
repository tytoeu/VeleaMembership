import StackNavigation from './StackNavigation'
import { useAppDispatch, useAppSelector } from '../hooks'
import i18n from '../localization'
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { setNotificationCount } from '../redux/cache';
import { useColorScheme } from 'nativewind';

const AppNavigation = () => {
  const { setColorScheme } = useColorScheme();
  const { locale, countNotify, currentTheme } = useAppSelector((state) => state.cache)
  const dispatch = useAppDispatch()
  i18n.locale = locale || 'kh'

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // recived response
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const notifications = response.notification.request.content.data
      });

    // recived
    notificationListener.current =
      Notifications.addNotificationReceivedListener((response) => {
        const notify = response.request.content
        if (response) {
          dispatch(setNotificationCount(countNotify + 1))
        }
      });

    // last recived
    Notifications.getLastNotificationResponseAsync().then(response => {
      if (response) {
        dispatch(setNotificationCount(countNotify + 1))
      }
    })

    return () => {
      responseListener.current?.remove();
      notificationListener.current?.remove();
    };
  }, [])

  useEffect(() => {
    setColorScheme(currentTheme)
  }, [currentTheme])

  return (<StackNavigation />)
}

export default AppNavigation