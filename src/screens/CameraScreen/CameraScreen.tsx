import {View, Text, StyleSheet, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Camera,
  CameraPictureOptions,
  CameraRecordingOptions,
  CameraType,
  FlashMode,
} from 'expo-camera';
import {useEffect, useState, useRef} from 'react';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {CameraNavigationProp} from '../../types/navigation';

const CameraScreen = () => {
  const [hasPermissons, setHasPermissons] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const flashModes = [
    FlashMode.off,
    FlashMode.on,
    FlashMode.auto,
    FlashMode.torch,
  ];

  const flashModeToIcon = {
    [FlashMode.off]: 'flash-off',
    [FlashMode.on]: 'flash-on',
    [FlashMode.auto]: 'flash-auto',
    [FlashMode.torch]: 'highlight',
  };

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermisson = await Camera.requestCameraPermissionsAsync();
      const microphonePermisson =
        await Camera.requestMicrophonePermissionsAsync();
      setHasPermissons(
        cameraPermisson.status === 'granted' &&
          microphonePermisson.status === 'granted',
      );
    };
    getPermission();
  }, []);

  const camera = useRef<Camera>(null);
  const navigation = useNavigation<CameraNavigationProp>();

  const takePicture = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }
    const options: CameraPictureOptions = {
      quality: 0.5,
      base64: false,
      skipProcessing: true,
    };
    const result = await camera.current?.takePictureAsync(options);
    console.log(result);
  };
  const flipCamera = () => {
    setCameraType(currentCameraType =>
      currentCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back,
    );
  };

  const flipFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    const nextIndex =
      currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  if (hasPermissons === null) {
    return <Text>Loading...</Text>;
  }
  if (hasPermissons === false) {
    return <Text>No access to the camera</Text>;
  }

  const navigateToCreateScreen = () => {
    navigation.navigate('Create', {
      images: [
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg',
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
      ],
    });
  };

  const startRecording = async () => {
    if (!isCameraReady || !camera.current || isRecording) {
      return;
    }
    const options: CameraRecordingOptions = {
      quality: Camera.Constants.VideoQuality['640:480'],
      maxDuration: 60,
      maxFileSize: 10 * 1024 * 1024,
      mute: false,
    };

    setIsRecording(true);
    try {
      const result = await camera.current.recordAsync(options);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setIsRecording(false);
  };
  const stopRecording = () => {
    if (isRecording) {
      camera.current?.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flash}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={[styles.buttonContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <Pressable onPress={flipFlash}>
          <MaterialIcons
            name={flashModeToIcon[flash]}
            size={30}
            color={colors.white}
          />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
            <View
              style={[
                styles.circle,
                {backgroundColor: isRecording ? colors.red : colors.white},
              ]}
            />
          </Pressable>
        )}
        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
        <Pressable onPress={navigateToCreateScreen}>
          <MaterialIcons
            name="arrow-forward-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: colors.lightgrey,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
  circle: {
    width: 65,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});
export default CameraScreen;
