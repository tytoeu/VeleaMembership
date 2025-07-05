import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Additionals } from '../hooks/interface/IMenu';

interface Props {
    onChange?: (selectedIds: string[]) => void;
    options: Additionals[]
}

const MultiCheckbox: React.FC<Props> = ({ onChange, options }) => {
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    useEffect(() => {
        onChange?.(Object.entries(selected)
            .filter(([_, v]) => v)
            .map(([k]) => k));
    }, [selected, onChange]);

    const toggle = (id: string) =>
        setSelected(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <FlatList
            data={options}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <Pressable style={styles.row} onPress={() => toggle(item.id)}>
                    <Checkbox
                        value={selected[item.id] ?? false}
                        onValueChange={() => toggle(item.id)}
                        color={'#975542'}
                    />
                    <Text className='color-slate-900 dark:color-slate-50 ms-3'>{item.description}</Text>
                </Pressable>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default MultiCheckbox;

const styles = StyleSheet.create({
    center: { textAlign: 'center', marginTop: 24 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        marginRight: 16
    }
});
