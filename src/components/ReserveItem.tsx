import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Button, TextInput } from 'react-native-paper'
import { useAppSelector } from '../hooks'
import styles from '../util/style/Style'
import useReserve from '../hooks/useReserve'
import useInputText from '../hooks/useInputText'
import ThemeErrorText from './ThemeErrorText'
import { ToastMessage } from './ToastMessage'

interface IReserve {
    statusName: string;
    bookingDate: string;
    tableCode: string;
    arrivalTime: string;
    covers: number;
    bookingCode: string;
    bookingId: number
}

interface IProp { item: IReserve }

const ReserveItem = (prop: IProp) => {
    const { theme } = useAppSelector(state => state.cache)
    const [isShowCancel, setShowCancel] = useState(false)
    const [bookingId, setBookingId] = useState(0)
    const { cancelBookingMutation, usedItemsInfiniteQuery } = useReserve()
    const { handleErrorChange, handleTextChange, input, error } = useInputText()

    const cancelAction = () => {

        if (!input?.reason) {
            handleErrorChange('reason', 'Field reason is required')
            return
        }

        cancelBookingMutation.mutateAsync({ bookingId, reason: input?.reason! }, {
            onSuccess: (response) => {
                if (response?.status) {
                    usedItemsInfiniteQuery.refetch()
                    setShowCancel(false)
                    return ToastMessage(response?.message)
                }
                setShowCancel(false)
                ToastMessage(response?.message, undefined, 'red')
            }
        })

    }

    const status = ['Arrived', 'Completed', 'Cancelled', 'InProgress'].includes(prop.item.statusName);

    return (<View className="w-full bg-white dark:bg-white/10 rounded-lg mb-5 p-3">
        <View className='py-3 mb-3 flex-row justify-between items-center' style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <Text className='font-bold color-black dark:color-slate-50'>{prop.item.bookingDate} - {prop.item.arrivalTime}</Text>
            <Text className='color-slate-800 dark:color-slate-200 text-[12px] font-medium'>{prop.item.bookingCode}</Text>
        </View>

        <View className='flex-row mb-5'>
            <View className='w-24 h-22 bg-[#975542] rounded-lg justify-center items-center'>
                <MaterialIcons name="table-bar" size={35} color="#fff" />
            </View>
            <View className='ml-3' style={{ width: '70%' }}>
                <Text className='tracking-tight font-bold color-black dark:color-white'>Velea Gastropup</Text>
                <View className='flex-row'>
                    <View className='flex-row items-center mt-2'>
                        <Ionicons name='time-outline' size={18} color={theme.colorText} />
                        <Text className='tracking-wide font-medium opacity-80 text-sm color-black dark:color-white/70 ml-3'>30 min</Text>
                    </View>
                    <View className='flex-row items-center mt-2 ml-5'>
                        <Ionicons name='people-outline' size={18} color={theme.colorText} />
                        <Text className='tracking-wide font-medium opacity-80 text-sm color-black dark:color-white/70 ml-3'>{prop.item.covers} cover</Text>
                    </View>
                </View>
                <View className='flex-row'>
                    <View className='flex-row items-center mt-2'>
                        <Ionicons name='restaurant-outline' size={16} color={theme.colorText} />
                        <Text numberOfLines={1} className='tracking-wide font-medium opacity-80 text-sm color-black dark:color-white/70 ml-3'>{prop.item.tableCode ? prop.item.tableCode : 'N/A'}</Text>
                    </View>
                </View>
            </View>
        </View>

        <View className='flex-row justify-center my-5'>
            <Button
                mode='contained'
                style={{ backgroundColor: theme.rgba }}
                buttonColor=''
                textColor='#999'
                onPress={() => {
                    setShowCancel(true)
                    setBookingId(prop.item.bookingId)
                }}
                disabled={status}
            >
                Cancel
            </Button>
            <View style={{ width: 20 }} />
            <Button
                mode='contained'
                style={{ backgroundColor: '#ffd3a2' }}
            >
                {prop.item.statusName}
            </Button>
        </View>

        <Modal visible={isShowCancel} animationType='fade' backdropColor={'rgba(0,0,0,0.1)'} statusBarTranslucent>
            <View className='flex-1 justify-center items-center'>
                <View style={{ width: '90%', padding: 16, backgroundColor: 'white', borderRadius: 8, paddingVertical: 30 }}>
                    <View className='justify-center items-center mb-5'>
                        <Ionicons name='warning-outline' size={70} color={'#999'} />
                        <Text>Do you want to cancel?</Text>
                    </View>
                    <TextInput
                        mode='outlined'
                        label={'Resean'}
                        keyboardType='default'
                        textColor={'#000'}
                        outlineColor={theme.main}
                        theme={{ colors: { onSurfaceVariant: theme.main } }}
                        style={[
                            styles.inputStyle,
                            {
                                backgroundColor: 'white',
                                width: '90%',
                                alignSelf: 'center',
                                minHeight: 100,
                                textAlignVertical: 'top'
                            }
                        ]}
                        returnKeyType='done'
                        multiline={true}
                        onChangeText={text => handleTextChange('reason', text)}
                    />
                    <View style={{ marginLeft: 16 }}>
                        <ThemeErrorText textError={error?.reason!} />
                    </View>

                    <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 0 }}>

                        <Button
                            mode='outlined'
                            style={{ width: '40%' }}
                            onPress={() => setShowCancel(false)}
                            textColor='#999'
                        >
                            No
                        </Button>
                        <Button
                            mode='contained'
                            style={{ width: '40%', backgroundColor: "#975542" }}
                            onPress={cancelAction}
                            textColor='white'
                            loading={cancelBookingMutation.isPending}
                            disabled={cancelBookingMutation.isPending}
                        >
                            Yes
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>

    </View>)
}

export default ReserveItem