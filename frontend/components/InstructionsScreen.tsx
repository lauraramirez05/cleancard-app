import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';

export default function InstructionsScreen() {
  const test = require('../assets/test.jpeg');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title='Skip'
          color='blue'
          onPress={() => navigation.navigate('Camera Screen')}
        />
      </View>
      <Swiper showsPagination={true} loop={false}>
        <View style={styles.slide}>
          <Text style={styles.textTitle}>Welcome to Cleancard</Text>
          <Text style={styles.subText}>
            Capture{' '}
            <Text
              style={{ fontWeight: 'bold', color: 'rgba(30, 144, 255, 1)' }}
            >
              5 photos
            </Text>{' '}
            in{' '}
            <Text
              style={{ fontWeight: 'bold', color: 'rgba(30, 144, 255, 1)' }}
            >
              different light settings
            </Text>
          </Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Position the Test Horizontally</Text>
          <Text style={styles.subText}>
            Center the test within the highlighted area.
          </Text>
          <View style={styles.testContainer}>
            <Text style={{ fontSize: 32 }}>✅</Text>
            <Image source={test} style={styles.testImage} />
          </View>
          <View style={styles.testContainer}>
            <Text style={{ fontSize: 32 }}>❌</Text>
            <Image
              source={test}
              style={[styles.testImage, { transform: [{ rotate: '-90deg' }] }]}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Ensure the Area is Well-Lit</Text>
          <Text style={styles.subText}>
            Place the test in a well-lit area to avoid shadows or glare.
          </Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Maintain a clear background</Text>
          <Text style={styles.subText}>
            Make sure the background is clear and free from clutter.
          </Text>
        </View>
        <View style={[styles.slide]}>
          <Text style={styles.text}>Verify Image Clarity</Text>
          <Text style={styles.subText}>
            Before submitting ensure the image is sharp and legible.
          </Text>
          <View style={styles.imageContainer}>
            <Ionicons
              name='camera'
              size={25}
              color='white'
              onPress={() => navigation.navigate('Camera Screen')}
            />
          </View>
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 20,
  },
  slide: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  testImage: {
    width: '50%',
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  testContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
  },

  imageContainer: {
    position: 'absolute',
    bottom: -80,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 40,
    marginTop: 30,
  },
});
