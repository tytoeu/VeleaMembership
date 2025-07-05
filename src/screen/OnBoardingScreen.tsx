import { View, Text, Image, StatusBar, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks';
import Onboarding from 'react-native-onboarding-swiper';
import { onBoardingDoneAction } from '../redux/cache';
import styles from '../util/style/Style';
import React, { useEffect } from 'react'
import useDashbaord from '../hooks/useDashbaord';
import { IOnboard } from '../hooks/interface/IDashboard';

const OnBoardingScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    const { onboard } = useDashbaord()

    const data: IOnboard[] = onboard.data || [];

    useEffect(() => {
        onboard.mutate()
    }, [])

    const onboardingData = data.map(item => ({
        backgroundColor: '#fff',
        title: item.title,
        subtitle: item.description,
        image: (
            <Image
                source={{ uri: item.image }}
                style={[{ resizeMode: 'contain' }, StyleSheet.absoluteFillObject]}
                resizeMode='cover'
            />
        )
    }))

    if (onboard.isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar barStyle={currentTheme == 'light' ? 'light-content' : 'light-content'} translucent />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    const DoneButton = ({ ...props }) => (
        <TouchableOpacity style={{ marginRight: 20, backgroundColor: 'red', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }} {...props}>
            <Text style={{ fontSize: 12, fontWeight: "bold", color: 'white' }}>
                Get Started
            </Text>
        </TouchableOpacity>
    );
    const NexButton = ({ ...props }) => (
        <TouchableOpacity style={{ marginRight: 20 }} {...props}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.color }}>
                Next
            </Text>
        </TouchableOpacity>
    );

    const SkipButton = ({ ...props }) => (
        <TouchableOpacity style={{ marginLeft: 20 }} {...props}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.color }}>
                Skip
            </Text>
        </TouchableOpacity>
    );

    const DotComponent = ({ selected }: { selected: boolean }) => (
        <View
            style={{
                width: selected ? 12 : 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: selected ? theme.color : "#ccc",
            }}
        />
    );


    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
            {onboardingData.length && <Onboarding
                pages={onboardingData}
                onDone={() => { navigation.navigate('BottomTab'); dispatch(onBoardingDoneAction(true)) }}
                onSkip={() => navigation.navigate('BottomTab')}
                imageContainerStyles={{ width: '100%', height: '100%' }}
                containerStyles={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: theme.background }}
                titleStyles={{ color: theme.color }}
                subTitleStyles={{ color: theme.colorText, textAlign: 'left' }}
                bottomBarColor={theme.background}
                DoneButtonComponent={DoneButton}
                SkipButtonComponent={SkipButton}
                DotComponent={DotComponent}
                NextButtonComponent={NexButton}
                controlStatusBar={false}
                bottomBarHighlight={true}
            />}
        </View>
    )
}

export default OnBoardingScreen