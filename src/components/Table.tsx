import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TableProps {
  headers: string[];
  data: string[][];
}

const Table: React.FC<TableProps> = ({ headers, data }) => (
  <View style={styles.table}>
    <View style={styles.row}>
      {headers.map((header, index) => (
        <Text key={index} style={styles.header}>
          {header}
        </Text>
      ))}
    </View>
    {data.map((row, index) => (
      <View key={index} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <Text key={cellIndex} style={styles.cell}>
            {cell}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    fontWeight: 'bold',
    flex: 1,
  },
  cell: {
    flex: 1,
  },
});

export default Table;
