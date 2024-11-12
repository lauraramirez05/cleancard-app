import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Cleancard</Text>
      <Text style={styles.subText}>
        Your partner in early detection and peace of mind
      </Text>
      <Text style={styles.instructionText}>
        This app will guide you through capturing five photos of your Cleancard
        diagnostic device to ensure accurate results.
      </Text>
      <Button
        title='Get Started'
        onPress={() => navigation.navigate('Instructions')}
        color='#4CAF50'
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Learn more about Cleancard</Text>
        {/* Optionally, add a link or button to learn more */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});
