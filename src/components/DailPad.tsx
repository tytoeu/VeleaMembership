import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useAppSelector } from '../hooks'
import { Ionicons } from '@expo/vector-icons'

const WIDTH = Dimensions.get('screen').width
const dailPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del']
const DAIL_PAD_SIZE = WIDTH * 0.2
const DAIL_PAD_TEXT_SIZE = DAIL_PAD_SIZE * 0.3
const _SPACING = 20

const DailPad = ({ onPress }: { onPress: (item: typeof dailPad[number]) => void }) => {
    const { theme } = useAppSelector(state => state.cache)
    return (
        <FlatList
            data={dailPad}
            keyExtractor={(_, index) => index.toString()}
            columnWrapperStyle={{ gap: _SPACING }}
            contentContainerStyle={{ gap: _SPACING }}
            renderItem={({ item, index }) => {
                return (<TouchableOpacity
                    onPress={() => {
                        onPress(item)
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
                            color: 'white',
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