import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks';
import { ItemPrices } from '../hooks/interface/IMenu';

interface Props {
    onChange?: (selectedIds: number) => void;
    options: ItemPrices[]
}

const Size: React.FC<Props> = ({ onChange, options }) => {
    const [selectedId, setSelectedId] = useState<number>(options[0].id);
    const { theme } = useAppSelector(state => state.cache)

    useEffect(() => {
        onChange?.(selectedId)
    }, [selectedId, onChange]);

    const pick = (id: number) => setSelectedId(id);

    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={options}
                renderItem={({ item }) => {
                    const active = item.id === selectedId;
                    return (<TouchableOpacity
                        onPress={() => pick(item.id)}
                        className="bg-white dark:bg-white/10 mr-3 px-4 py-2 rounded-lg border-2" style={{ borderColor: active ? '#975542' : theme.bgDark }}>
                        <Text className='color-slate-900 dark:color-slate-50' style={{ color: active ? '#975542' : theme.colorText }}>{item.size}</Text>
                    </TouchableOpacity>)
                }}
            />
        </View>
    )
}

export default Size