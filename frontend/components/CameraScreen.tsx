import React, { useRef, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import ProgressBar from './ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import { sendFile } from '../service/sendFile';
import DataDisplay from './DataDisplay';

export interface ImageProp {
  fullWidth: string;
  cropped: string | null;
}

const useCameraPermission = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const requestCameraPermission = async () => {
    const { status } = await requestPermission();
    return status === 'granted';
  };

  return { permission, requestCameraPermission };
};

const CameraScreen = () => {
  const { permission, requestCameraPermission } = useCameraPermission();
  const [cameraProps, setCameraProps] = useState({
    facing: 'back',
    flash: 'off',
  });
  const [images, setImages] = useState<ImageProp[]>([]);
  const [currImage, setCurrImage] = useState<ImageProp | null>(null);
  const [response, setResponse] = useState([]);
  const camRef = useRef<Camera>(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button title='Grant Permission' onPress={requestCameraPermission} />
      </View>
    );
  }

  const toggleProperty = (
    prop: keyof typeof cameraProps,
    option1: string,
    option2: string
  ) => {
    setCameraProps((prev) => ({
      ...prev,
      [prop]: prev[prop] === option1 ? option2 : option1,
    }));
  };

  const takePicture = async () => {
    if (camRef.current) {
      try {
        const imgData = await camRef.current.takePictureAsync({ base64: true });
        setCurrImage({ fullWidth: imgData.uri, cropped: null });
      } catch (err) {
        console.error('Error taking picture', err);
      }
    }
  };

  const retakePhoto = () => setCurrImage(null);

  const nextPhoto = () => {
    if (currImage) {
      setImages((prev) => [...prev, currImage]);
      sendFile(currImage, setResponse);

      console.log('1', response);
      setCurrImage(null);
    }
  };


  if (images.length === 2) {
    return (
      <View style={styles.container}>
        <DataDisplay biomarkersData={response} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={images.length} totalSteps={5} />
      {!currImage?.fullWidth ? (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing={cameraProps.facing}
            ref={camRef}
          />
          <View style={styles.fullHighlightTop}>
            <Text style={styles.messageText}>
              Please put the whole test within the frame
            </Text>
          </View>
          <View style={styles.clearArea}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <View style={styles.fullHighlightBottom}>
            <Text style={styles.flashlightText}>Turn on the flashlight</Text>
            <Ionicons
              name={`${cameraProps.flash === 'off' ? 'flash-off' : 'flash'}`}
              size={25}
              color='white'
              onPress={() => toggleProperty('flash', 'on', 'off')}
            />
            <Ionicons
              name='camera'
              size={25}
              color='white'
              onPress={takePicture}
            />
          </View>
        </View>
      ) : (
        <>
          <Image source={{ uri: currImage.fullWidth }} style={styles.camera} />
          <View style={styles.buttonGroup}>
            <Button title='Retake Photo' onPress={retakePhoto} />
            <Button title='Next' onPress={nextPhoto} />
          </View>
        </>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },

  messageText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
    lineHeight: 22, // Adjust for better spacing if needed
  },

  icon: {
    position: 'absolute',
    top: 65,
  },

  flashlightText: {
    position: 'absolute',
    top: 20,
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    lineHeight: 22, // Adjust for better spacing if needed
  },

  cameraContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: {
    flex: 1,
    width: '100%',
  },

  fullHighlightTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullHighlightBottom: {
    position: 'absolute',
    top: '60%',
    left: 0,
    width: '100%',
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },

  clearArea: {
    position: 'absolute',
    top: '30%',
    width: '100%', // Adjust the width of the clear area
    height: '30%', // Adjust the height of the clear area
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 0,
  },

  corner: {
    position: 'absolute',
    width: 40, // Size of the corner border
    height: 40, // Size of the corner border
  },
  // Positioning each corner
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopColor: 'blue',
    borderLeftColor: 'blue',
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderRightColor: 'blue',
    borderTopColor: 'blue',
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderLeftColor: 'blue',
    borderBottomColor: 'blue',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderRightColor: 'blue',
    borderBottomColor: 'blue',
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 60,
  },

  responseText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  responseData: {
    fontSize: 16,
    marginBottom: 20,
  },
});
