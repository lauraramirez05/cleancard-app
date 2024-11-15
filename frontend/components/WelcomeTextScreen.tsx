import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeTextScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>Welcome to Cleancard</Text>
      </View>
      <View>
        <Text style={styles.subText}>
          Ready to get started? Capture{' '}
          <Text style={{ fontWeight: 'bold', color: 'rgba(30, 144, 255, 1)' }}>
            5 photos
          </Text>{' '}
          of your device in different light settings for the most accurate
          results. Let’s begin the process.
        </Text>
      </View>
      <View>
        <Button
          title='Next'
          onPress={() => navigation.navigate('Instructions')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titleContainer: {
    marginTop: 80,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 32,
  },

  subText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'left',
    // paddingHorizontal: 15,
    marginBottom: 20,
    lineHeight: 40,
  },
});
