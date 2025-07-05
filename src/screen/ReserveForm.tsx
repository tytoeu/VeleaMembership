import { View, Text, Platform, Modal, FlatList, TouchableOpacity, Pressable, } from 'react-native'
import React, { useState } from 'react'
import { CustomTimePicker, Layout, ThemeErrorText } from '../components'
import { Button, TextInput } from 'react-native-paper'
import { useAppNavigation, useAppSelector } from '../hooks'
import styles from '../util/style/Style'
import useInputText from '../hooks/useInputText'
import { Calendar } from 'react-native-calendars';
import { formatDataDB, formatDate } from '../helpers'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'
import useReserve from '../hooks/useReserve'
import { Picker } from '@react-native-picker/picker'
import { IBooking } from '../hooks/interface/IBooking'
import { ToastMessage } from '../components/ToastMessage'
import i18n from '../localization'

const ReserveForm = () => {
    const { theme } = useAppSelector(state => state.cache)
    const { tempAuth } = useAppSelector(state => state.temp)
    const nav = useAppNavigation()
    const { handleErrorChange, handleTextChange, input, error } = useInputText()
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const [showTags, setshowTags] = useState(false)
    const [tags, setTags] = useState<string[]>([]);
    const TODAY = formatDataDB(new Date())

    const [hour, setHour] = useState('14');
    const [minute, setMinute] = useState('00');

    const hours = [];
    for (let h = 14; h <= 23; h++) {
        hours.push(h.toString().padStart(2, '0'));
    }
    hours.push('00'); // Add midnight

    const minutes = ['00', '30'];

    const { tagUseQuery, postBookingMutation, usedItemsInfiniteQuery } = useReserve()
    const data = tagUseQuery.data?.data ?? []

    const bookingAction = () => {
        let isValid = true
        if (!input?.cover) {
            handleErrorChange('cover', 'Cover is reqired')
            isValid = false
        }
        if (!input?.booking_date) {
            handleErrorChange('booking_date', 'Booking date is reqired')
            isValid = false
        }

        if (isValid) {
            const jsonData: IBooking = {
                timeArrival: `${hour}:${minute}`,
                booking_date: input?.booking_date!,
                cover: Number(input?.cover)!,
                comment: input?.description!,
                full_name: tempAuth?.name!,
                tags: tags,
                phone: tempAuth?.phone
            }

            postBookingMutation.mutateAsync(jsonData, {
                onSuccess: (response => {
                    console.log(response)
                    if (response?.status) {
                        ToastMessage(response?.message)
                        usedItemsInfiniteQuery.refetch()
                        nav.goBack()
                    } else {
                        ToastMessage(response?.message, undefined, 'red')
                    }
                })
            });
        }
    }

    const onTimeChange = (event: any, selected: Date | undefined) => {
        setShowTimePicker(false);
        if (selected) {
            const hours = selected.getHours().toString().padStart(2, '0');
            const minutes = selected.getMinutes().toString().padStart(2, '0');
            handleTextChange('time_arrived', `${hours}:${minutes}`)
        }
    };

    const onSelectTags = (tag: string) => {
        setTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <View className='flex-1 dark:bg-black p-3'>
            <Layout>
                <TextInput
                    mode='outlined'
                    label={'Cover Member'}
                    keyboardType='number-pad'
                    error={error?.cover ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput, width: '100%' }]}
                    onFocus={() => handleErrorChange('cover', '')}
                    onChangeText={text => handleTextChange('cover', text)}
                    returnKeyType='next'
                    value={input?.cover}
                />
                <ThemeErrorText textError={error?.cover!} />

                <TextInput
                    mode='outlined'
                    label={'Booking Date'}
                    keyboardType='default'
                    error={error?.booking_date ? true : false}
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput, width: '100%' }]}
                    onFocus={() => handleErrorChange('booking_date', '')}
                    value={input?.booking_date}
                    onPress={() => setShowDate(true)}
                    returnKeyType='next'
                />
                <ThemeErrorText textError={error?.booking_date!} />

                <TextInput
                    mode='outlined'
                    label={'Tag'}
                    keyboardType='default'
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                    style={[styles.inputStyle, { backgroundColor: theme.bgInput, width: '100%' }]}
                    returnKeyType='next'
                    onPress={() => setshowTags(true)}
                    value={tags?.toString()}
                />

                <TextInput
                    mode='outlined'
                    label={'Comment'}
                    keyboardType='default'
                    textColor={theme.color}
                    outlineColor={theme.main}
                    theme={{ colors: { onSurfaceVariant: theme.main } }}
                    style={[
                        styles.inputStyle,
                        {
                            backgroundColor: theme.bgInput,
                            width: '100%',
                            minHeight: 130, // height like textarea
                            textAlignVertical: 'top' // aligns text at the top (important!)
                        }
                    ]}
                    returnKeyType='done'
                    onChangeText={text => handleTextChange('description', text)}
                    value={input?.description}
                    multiline={true}
                />

                {/* {showTimePicker && <DateTimePicker
                    mode="time"
                    value={new Date()}
                    is24Hour={true}
                    display={'spinner'}
                    onChange={onTimeChange}

                />} */}

                <View style={{ padding: 20, borderWidth: 1, borderColor: theme.main, marginBottom: 12, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, marginBottom: 10, color: theme.main }}>Select Time</Text>

                    <View style={{ flexDirection: 'row', width: '60%' }}>
                        <Picker
                            selectedValue={hour}
                            onValueChange={(value) => setHour(value)}
                            style={{ flex: 1, color: theme.color }}
                            dropdownIconColor={theme.colorText}
                        >
                            {hours.map(h => (
                                <Picker.Item key={h} label={`${h}`} value={h} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={minute}
                            onValueChange={(value) => setMinute(value)}
                            style={{ flex: 1, color: theme.color }}
                            dropdownIconColor={theme.colorText}
                        >
                            {minutes.map(m => (
                                <Picker.Item key={m} label={`${m}`} value={m} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <Button
                    mode='contained'
                    onPress={bookingAction}
                    contentStyle={{ height: 50 }}
                    style={{ borderRadius: 8, marginTop: 5, backgroundColor: theme.main }}
                    labelStyle={{ color: '#fff' }}
                    disabled={postBookingMutation.isPending}
                    loading={postBookingMutation.isPending}
                >
                    {i18n.t('Request Reserve')}
                </Button>
            </Layout>

            <Modal animationType='fade' visible={showDate} statusBarTranslucent backdropColor={'rgba(0,0,0,0.2)'} onRequestClose={() => setShowDate(false)}>
                <Pressable className='justify-center flex-1' style={{ padding: 20 }} onPress={() => setShowDate(false)}>
                    <Calendar
                        markingType='period'
                        onDayPress={day => {
                            const date = formatDate(new Date(day.dateString))
                            handleTextChange('booking_date', date)
                            setShowDate(false)
                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            height: 350,
                        }}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#999'
                        }}
                        minDate={TODAY}
                    />
                </Pressable>
            </Modal>

            <Modal animationType='fade' visible={showTags} statusBarTranslucent backdropColor={'rgba(0,0,0,0.2)'} onRequestClose={() => setshowTags(false)}>
                <Pressable className='justify-center flex-1 items-center' style={{ padding: 20 }} onPress={() => setshowTags(false)}>
                    <View className='bg-white' style={{ height: 300, width: '80%', borderRadius: 5 }}>
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => {
                                const isSelected = tags.includes(item?.name);
                                return (<TouchableOpacity onPress={() => onSelectTags(item?.name)} className='p-3 w-full mb-3 rounded-sm' style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>{item?.name}</Text>
                                    {isSelected && (
                                        <Ionicons name='checkmark-outline' size={18} color="green" />
                                    )}
                                </TouchableOpacity>)
                            }}
                            contentContainerStyle={{ padding: 16 }}
                            showsVerticalScrollIndicator={false}
                        />
                        <Button
                            onPress={() => setshowTags(false)}
                            style={{ marginVertical: 16, marginHorizontal: 20 }}
                        >
                            OK
                        </Button>
                    </View>
                </Pressable>
            </Modal>

        </View>
    )
}

export default ReserveForm