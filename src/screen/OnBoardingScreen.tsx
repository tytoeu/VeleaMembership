import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import styles from '../util/style/Style';
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks';
import { onBoardingDoneAction } from '../redux/cache';

const pages = [

    {
        backgroundColor: '#fff',
        image: <Image
            source={{ uri: 'https://img.freepik.com/premium-photo/chinese-woman-glasses-is-seng-bard-0cebe_1233959-46219.jpg?uid=R103809456&ga=GA1.1.925930140.1715152431&semt=ais_hybrid' }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper'
    },
    {
        backgroundColor: '#fff',
        image: <Image
            source={{ uri: 'https://img.freepik.com/free-photo/medium-shot-young-man-having-fun_23-2151194050.jpg?uid=R103809456&ga=GA1.1.925930140.1715152431&semt=ais_hybrid' }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper'
    },

]

const OnBoardingScreen = () => {
    const { theme } = useAppSelector((state) => state.cache)
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()

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

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} translucent />
            <Onboarding
                pages={pages}
                onDone={() => { navigation.navigate('Login'); dispatch(onBoardingDoneAction(true)) }}
                onSkip={() => navigation.navigate('Login')}
                imageContainerStyles={{ width: '100%', height: '85%', paddingBottom: 20 }}
                containerStyles={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: theme.background }}
                titleStyles={{ color: theme.color }}
                subTitleStyles={{ color: theme.color, textAlign: 'left' }}
                bottomBarColor={theme.background}
                DoneButtonComponent={DoneButton}
                SkipButtonComponent={SkipButton}
                DotComponent={DotComponent}
                NextButtonComponent={NexButton}
            />
        </View>
    )
}

export default OnBoardingScreen