import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { useAppSelector } from '../hooks'

interface IProp {
    isLoading: boolean
}

const ModalLoading: React.FC<IProp> = ({ isLoading }) => {
    const { theme } = useAppSelector(state => state.cache)
    return (
        <Modal backdropColor={'rgba(0,0,0,.1)'} statusBarTranslucent visible={isLoading}>
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size={'large'} color={theme.colorText} />
            </View>
        </Modal>
    )
}

export default ModalLoading