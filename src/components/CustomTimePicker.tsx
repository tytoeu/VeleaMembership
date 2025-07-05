import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomTimePicker = () => {
    const [hour, setHour] = useState('14');
    const [minute, setMinute] = useState('00');

    const hours = [];
    for (let h = 14; h <= 23; h++) {
        hours.push(h.toString().padStart(2, '0'));
    }
    hours.push('00'); // Add midnight

    const minutes = ['00', '30'];

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Select Time</Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Picker
                    selectedValue={hour}
                    onValueChange={(value) => setHour(value)}
                    style={{ flex: 1 }}
                >
                    {hours.map(h => (
                        <Picker.Item key={h} label={h} value={h} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={minute}
                    onValueChange={(value) => setMinute(value)}
                    style={{ flex: 1 }}
                >
                    {minutes.map(m => (
                        <Picker.Item key={m} label={m} value={m} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

export default CustomTimePicker;
