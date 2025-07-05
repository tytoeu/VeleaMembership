import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppNavigation, useAppSelector } from '../hooks'
import { searchAction } from '../redux/menu'

const SearchHeaderRight = () => {
    const { theme } = useAppSelector(state => state.cache)
    const nav = useAppNavigation()
    const dispatch = useAppDispatch()
    return (
        <View className='w-full h-14 rounded-2xl overflow-hidden bg-white dark:bg-white/10 me-5 flex-row items-center ps-5'>
            <Ionicons onPress={() => nav.goBack()} name='arrow-back-outline' color={theme.colorText} size={26} />
            <TextInput
                className='h-full w-96 px-3 color-slate-950 dark:color-slate-100 -tracking-tighter'
                keyboardType='default'
                returnKeyType='search'
                autoFocus={true}
                placeholder='Search...'
                placeholderTextColor={theme.colorText}
                onSubmitEditing={(e) => {
                    const searchText = e.nativeEvent.text.trim();
                    dispatch(searchAction(searchText))
                }}

            />
        </View>
    )
}

export default SearchHeaderRight