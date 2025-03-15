import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useAppSelector } from '../hooks'
import { Ionicons } from '@expo/vector-icons'

const WIDTH = Dimensions.get('screen').width
const DAIL_PAD_SIZE = WIDTH * 0.2
const DAIL_PAD_TEXT_SIZE = DAIL_PAD_SIZE * 0.3
const _SPACING = 20

type IProp = {
    onPress: (item: any) => void,
    data: any
}

const DailPad = (prop: IProp) => {
    const { theme } = useAppSelector(state => state.cache)
    return (
        <FlatList
            data={prop.data}
            keyExtractor={(_, index) => index.toString()}
            columnWrapperStyle={{ gap: _SPACING }}
            contentContainerStyle={{ gap: _SPACING }}
            renderItem={({ item, index }) => {
                return (<TouchableOpacity
                    onPress={() => {
                        prop.onPress(item)
                    }}
                    disabled={item === '' ? true : false}>
                    <View
                        style={{
                            width: DAIL_PAD_SIZE,
                            height: DAIL_PAD_SIZE,
                            borderRadius: DAIL_PAD_SIZE,
                            backgroundColor: typeof item !== 'number' ? 'transparent' : theme.bgDark,
                            justifyContent: "center",
                            alignItems: 'center'
                        }}
                    >
                        {item === 'del' ? <Ionicons name='backspace-outline' color={theme.color} size={DAIL_PAD_TEXT_SIZE} /> : <Text style={{
                            color: theme.color,
                            fontSize: DAIL_PAD_TEXT_SIZE,
                            fontFamily: 'R700'
                        }}>{item}</Text>}

                    </View>
                </TouchableOpacity>)
            }}
            numColumns={3}
            key={3}
            style={{ flexGrow: 0 }}
            scrollEnabled={false}
        />
    )
}

export default DailPad