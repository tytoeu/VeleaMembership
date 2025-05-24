import { View, Text, Image, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks';
import Onboarding from 'react-native-onboarding-swiper';
import { onBoardingDoneAction } from '../redux/cache';
import styles from '../util/style/Style';
import React, { useEffect } from 'react'
import useDashbaord from '../hooks/useDashbaord';
import { assets } from '../../assets';
import { IOnboard } from '../hooks/interface/IDashboard';

const asset = assets.config

const OnBoardingScreen = () => {
    const { theme, currentTheme } = useAppSelector((state) => state.cache)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    const { onboard } = useDashbaord()

    const data: IOnboard[] = onboard.data || [];

    const DoneButton = ({ ...props }) => (
        <TouchableOpacity style={{ marginRight: 20 }} {...props}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.color }}>
                Done
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

    useEffect(() => {
        onboard.mutate()
    }, [])

    const onboardingData = data.map(item => ({
        backgroundColor: '#fff',
        title: item.title,
        subtitle: item.description,
        image: (
            <Image
                source={{ uri: asset.originImage + item.image }}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
        )
    }))

    if (onboard.isPending) {
        return <View style={[{ backgroundColor: theme.background }, styles.container]}>
            <StatusBar barStyle={currentTheme == 'light' ? 'dark-content' : 'light-content'} translucent />
            <ActivityIndicator color={theme.color} size={'large'} />
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} translucent />
            {onboardingData.length && <Onboarding
                pages={onboardingData}
                onDone={() => { navigation.navigate('Login'); dispatch(onBoardingDoneAction(true)) }}
                onSkip={() => navigation.navigate('Login')}
                imageContainerStyles={{ width: '100%', height: '85%', paddingBottom: 20 }}
                containerStyles={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: theme.background }}
                titleStyles={{ color: theme.color }}
                subTitleStyles={{ color: theme.colorText, textAlign: 'left' }}
                bottomBarColor={theme.background}
                DoneButtonComponent={DoneButton}
                SkipButtonComponent={SkipButton}
                DotComponent={DotComponent}
                NextButtonComponent={NexButton}
            />}
        </View>
    )
}

export default OnBoardingScreen