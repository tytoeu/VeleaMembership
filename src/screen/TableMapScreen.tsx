
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
} from 'react-native';

const initialTables = [
  { id: '1', name: 'T1', x: 50, y: 100, status: 'available' },
  { id: '2', name: 'T2', x: 150, y: 100, status: 'reserved' },
  { id: '3', name: 'T3', x: 250, y: 200, status: 'occupied' },
];

const TableMapScreen = () => {
  const [tables, setTables] = useState(initialTables);

  const positions = useRef(
    tables.reduce((acc, table) => {
      acc[table.id] = new Animated.ValueXY({ x: table.x, y: table.y });
      return acc;
    }, {})
  ).current;

  const updatePosition = (id, x, y) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === id ? { ...table, x, y } : table
      )
    );
  };

  return (
    <View style={styles.container}>
      {tables.map((table) => {
        const pan = positions[table.id];

        const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: Animated.event(
            [null, { dx: pan.x, dy: pan.y }],
            { useNativeDriver: false }
          ),
          onPanResponderRelease: (_, gesture) => {
            const newX = table.x + gesture.dx;
            const newY = table.y + gesture.dy;
            positions[table.id].setOffset({ x: 0, y: 0 });
            positions[table.id].setValue({ x: 0, y: 0 });
            updatePosition(table.id, newX, newY);
          },
        });

        return (
          <Animated.View
            key={table.id}
            {...panResponder.panHandlers}
            style={[
              styles.table,
              {
                backgroundColor:
                  table.status === 'available'
                    ? 'green'
                    : table.status === 'reserved'
                      ? 'gray'
                      : 'orange',
                transform: [
                  { translateX: pan.x },
                  { translateY: pan.y }
                ],
              },
            ]}
          >
            <Text style={styles.text}>{table.name}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f8f8f8',
  },
  table: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TableMapScreen;
