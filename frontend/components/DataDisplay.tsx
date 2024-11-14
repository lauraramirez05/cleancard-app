import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function DataDisplay({ biomarkersData }) {
  // const chartData = {
  //   labels: [
  //     'Lvl 1',
  //     'Lvl 2',
  //     'Lvl 3',
  //     'Lvl 4',
  //     'Lvl 5',
  //     'Lvl 6',
  //     'Lvl 7',
  //     'Lvl 8',
  //   ], // x-axis labels
  //   datasets: [
  //     {
  //       data: biomarkersData, // y-axis values
  //     },
  //   ],
  // };

  const numColumns = biomarkersData[0].length;

  const result = [];

  for (let col = 0; col < numColumns; col++) {
    const columnValues = biomarkersData.map((row) => row[col]);

    const min = Math.min(...columnValues);
    const max = Math.max(...columnValues);
    const mean =
      columnValues.reduce((sum, value) => sum + value, 0) / columnValues.length;

    result.push({ min, max, mean });

    console.log(result);
  }

  return (
    <View style={styles.chartContainer}>
      {result.map((data, index) => (
        <View key={index} style={styles.barContainer}>
          <Text>Level {index}</Text>
          <View style={styles.bar}>
            {/* Min Line */}
            <View
              style={[
                styles.line,
                { left: `${data.min * 100}%`, backgroundColor: 'red' },
              ]}
            />
            {/* Max Line */}
            <View
              style={[
                styles.line,
                { left: `${data.max * 100}%`, backgroundColor: 'green' },
              ]}
            />
            {/* Mean Circle */}
            <View
              style={[
                styles.circle,
                { left: `${data.mean * 100}%`, backgroundColor: 'blue' },
              ]}
            >
              {/* Mean Value Bubble */}
              <Text style={styles.bubble}>{data.mean.toFixed(3)}</Text>
            </View>
          </View>
          <View style={styles.labels}>
            <Text>0</Text>
            <Text>1</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    alignItems: 'center',
  },
  barContainer: {
    marginVertical: 10,
    width: '80%',
  },
  bar: {
    width: '100%',
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    position: 'relative', // Ensures absolute positioning of elements
  },
  line: {
    position: 'absolute',
    top: 0,
    width: 2, // Line thickness
    height: '100%', // Full height of the bar
  },
  circle: {
    position: 'absolute',
    top: '50%', // Vertically center the circle
    left: '50%',
    width: 12, // Circle size
    height: 12,
    borderRadius: 6, // To make it a circle
    transform: [{ translateX: -6 }, { translateY: -6 }], // Center the circle horizontally and vertically
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    position: 'absolute',
    top: -30, // Position above the circle
    left: '-50%', // Center the bubble horizontally over the circle
    backgroundColor: 'white',
    paddingVertical: 5, // Increase vertical padding for better height
    paddingHorizontal: 10, // Increase horizontal padding for more width
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    minWidth: 40, // Minimum width for the bubble (increase if needed)
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
