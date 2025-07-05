import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
    setShowTimePicker(true);
  };

  const onTimeChange = (event: any, selected: Date | undefined) => {
    setShowTimePicker(false);
    if (selected) {
      const hours = selected.getHours().toString().padStart(2, '0');
      const minutes = selected.getMinutes().toString().padStart(2, '0');
      setSelectedTime(`${hours}:${minutes}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Date</Text>

      <Calendar
        onDayPress={onDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
      />

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>
          Selected: {selectedDate} {selectedTime && `at ${selectedTime}`}
        </Text>
      </View>
    </View>
  );
};

export default CustomDateTimePicker;
