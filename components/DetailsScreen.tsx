import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function InstructionsScreen() {
  const navigation = useNavigation();

  const steps = [
    "We'll prompt you to take a photo, guiding you on positioning.",
    'If needed, you can retake any photo to make sure it’s just right.',
    'Once all photos are taken, we’ll send them off for processing, and you can relax while we do the rest.',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How to Capture the Photos:</Text>
      <Text style={styles.description}>
        We're here to guide you every step of the way. For the best results,
        we’ll take five simple photos of your device under different lighting
        conditions. Here’s how it works:
      </Text>
      {steps.map((step, index) => (
        <Text key={index} style={styles.step}>
          {index + 1}. {step}
        </Text>
      ))}
      <Text style={styles.finalNote}>
        If at any point you need to take a break, just let us know, and we’ll
        pause the process. You’re in control.
      </Text>

      <Button
        title='Start'
        onPress={() => navigation.navigate('Camera Capture')}
        color='blue'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'left',
  },
  finalNote: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});
