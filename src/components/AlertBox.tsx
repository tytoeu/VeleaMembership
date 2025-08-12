import { View, Text, Modal, Dimensions, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

interface AlertBoxProps {
    visible?: boolean;
    onClose?: (value?: boolean) => void;
    onPress?: (value?: string) => void;
    onReject?: (value?: string) => void;
    title?: string;
    message?: string;
    bottonText?: string;
    rejectText?: string;
}

const WIDTH = Dimensions.get('screen').width;
const BOX_WIDTH = WIDTH - 100;

const AlertBox: FC<AlertBoxProps> = ({
    visible = false,
    onClose,
    onPress,
    onReject,
    title = 'Alert',
    message = 'This is an alert message.',
    bottonText = 'Accept',
    rejectText = 'Reject',
}) => {
    return (
        <Modal backdropColor={'rgba(0, 0, 0, 0.3)'} visible={visible} onRequestClose={onClose ? () => onClose() : undefined}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View
                    entering={FadeInDown.duration(300).delay(30).easing(Easing.ease)}
                    className='bg-white dark:bg-gray-800 pt-5 pb-2 rounded-lg shadow-lg'
                    style={{ width: BOX_WIDTH }}>
                    <TouchableOpacity onPress={onClose ? () => onClose() : undefined} style={{ position: 'absolute', right: 0, top: 0, padding: 10, zIndex: 5 }}>
                        <Ionicons name='close' size={24} color='red' />
                    </TouchableOpacity>

                    <Text className='text-lg font-bold text-center dark:text-white text-gray-900'>{title}</Text>
                    <Text className='text-sm text-center dark:text-gray-300 text-gray-700 mt-2'>{message}</Text>

                    <View className='mt-4 flex-row justify-center items-center border-t border-gray-200 dark:border-gray-700'>
                        <Text className='text-blue-400 text-center p-3 font-bold' onPress={onReject ? () => onReject() : undefined} >
                            {rejectText}
                        </Text>
                        {onPress ? <Text className='text-blue-500 text-center p-3 font-bold' onPress={onPress ? () => onPress() : undefined}>
                            {bottonText}
                        </Text> : undefined}
                    </View>

                </Animated.View>
            </View>
        </Modal>
    )
}

export default AlertBox