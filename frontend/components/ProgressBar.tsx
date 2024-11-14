import React, { useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

export default function ProgressBar({ currentStep, totalSteps }) {
  const circles = Array.from({ length: totalSteps }, (_, index) => index);

  return (
    <View style={styles.progressBar}>
      {circles.map((step, index) => (
        <View
          key={index}
          style={[
            styles.circle,
            index < currentStep ? styles.completed : styles.incomplete,
          ]}
        ></View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#dcdcdc',
  },
  completed: {
    backgroundColor: '#4caf50', // Green for completed
  },
  incomplete: {
    backgroundColor: '#dcdcdc', // Light gray for incomplete
  },
});
