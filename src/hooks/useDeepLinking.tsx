// useDeepLinking.ts
import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

export default function useDeepLinking() {

    const [data, setData] = useState<null | Linking.ParsedURL>(null);

    useEffect(() => {
        const handleDeepLink = ({ url }: { url: string }) => {
            const parsed = Linking.parse(url);
            setData(parsed);
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);

        // If app is opened from a cold start
        (async () => {
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) {
                handleDeepLink({ url: initialUrl });
            }
        })();

        return () => subscription.remove();
    }, []);

    const prefix = Linking.createURL('/');

    const linking = {
        prefixes: [prefix, 'velea://', 'https://velea.asia'],
        config: {
            screens: {
                Home: 'home',
                'order-success': {
                    path: 'payment/success',
                    parse: {
                        orderId: (orderId: string) => (orderId),
                        status: (status: string) => status
                    }
                }
            },
        },
    };

    // open payment link
    const handlePay = async () => {
        const redirectUrl = Linking.createURL('payment');

        const paymentUrl = `https://velea.asia/fake-payment?redirect_uri=${encodeURIComponent(redirectUrl)}`;
        // const paymentUrl = `https://velea.asia/fake-payment`;

        const result = await WebBrowser.openAuthSessionAsync(paymentUrl, redirectUrl);

        if (result.type === 'success' && result.url) {
            const data = Linking.parse(result.url);
            console.log("Returned:", data);
            return { type: 'success', data: data.queryParams }
        }

        return { type: result.type, data: null }

    };

    return { linking, data, handlePay }
}
