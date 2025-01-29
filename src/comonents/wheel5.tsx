import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Easing,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// const SECTIONS = [
//   {label: '₹100', angle: 0, uri: require('../assets/rupee.png')},
//   {label: 'Mini', angle: 45, uri: require('../assets/mini.png')},
//   {label: 'Mega', angle: 90, uri: require('../assets/mega.png')},
//   {label: 'Double', angle: 135, uri: require('../assets/double.png')},
//   {label: '?', angle: 180, uri: require('../assets/cashout2.png')},
//   {label: 'Cash Out', angle: 225},
//   {label: 'Double', angle: 270, uri: require('../assets/double.png')},
//   {label: 'Mini', angle: 315, uri: require('../assets/mini.png')},
//   {label: 'Medium', angle: 360, uri: require('../assets/medium.png')},
// ];
const SECTIONS = [
  {label: 'Mini', angle: 0, uri: require('../assets/mini.png')},
  {label: 'Mega', angle: 45, uri: require('../assets/mega.png')},
  {label: 'Double', angle: 90, uri: require('../assets/double.png')},
  {label: 'Cash Out', angle: 135, uri: require('../assets/cashout2.png')},
  {label: 'Double', angle: 180, uri: require('../assets/double.png')},
  {label: 'Mini', angle: 225, uri: require('../assets/mini.png')},
  {label: 'Medium', angle: 270, uri: require('../assets/medium.png')},
  {label: '₹100', angle: 315, uri: require('../assets/rupee.png')},
];

export const Wheel5 = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState();
  const bounceValue = useRef(new Animated.Value(1)).current; // Initial scale of 1

  const getSelectedSection = finalRotation => {
    const numberOfSegments = SECTIONS.length;
    const oneTurn = 360;
    const angleBySegment = oneTurn / numberOfSegments;
    const deg = Math.abs(Math.round(finalRotation % 360));
    const res =
      (SECTIONS.length - Math.floor(deg / angleBySegment)) % numberOfSegments;
    console.log('RESULT', res);
    // Normalize the rotation to 0-360 degrees
    const normalizedRotation = finalRotation % 360;

    // Since the wheel rotates clockwise but our sections are defined counter-clockwise,
    // we need to invert the rotation angle
    const invertedRotation = (360 - normalizedRotation) % 360;

    // Find the section that contains this angle
    // Each section is 45 degrees (360/8 sections)
    const sectionIndex = Math.floor(invertedRotation / 45);
    console.log('Rotation', finalRotation);
    console.log('normalizedRotation', normalizedRotation);
    console.log('invertedRotation', invertedRotation);
    console.log('SelectIndex', sectionIndex);
    return SECTIONS[res];
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Generate random number of complete rotations (3-5 rotations)
    const numberOfRotations = Math.floor(Math.random() * 3) + 3;

    // Generate random additional angle (0-360)
    const randomAngle = Math.floor(Math.random() * 360);

    // Calculate final rotation value
    // const finalRotation = numberOfRotations * 360 + randomAngle;
    const finalRotation = numberOfRotations * 360 + randomAngle;

    //New Code

    Animated.sequence([
      // Main spin animation
      Animated.timing(spinValue, {
        toValue: finalRotation,
        duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Small bounce back
      Animated.timing(spinValue, {
        toValue: finalRotation - 10,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // Final settling
      Animated.timing(spinValue, {
        toValue: finalRotation,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Calculate which section is at the top when wheel stops
      const selectedSection = getSelectedSection(finalRotation);
      console.log('Selected Section:', selectedSection.label);
      setSelectedPrize(selectedSection);

      // Show modal after a short delay
      setTimeout(() => {
        setIsModalOpen(true);
      }, 500);

      // Reset wheel after 5 seconds
      setTimeout(() => {
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          setIsSpinning(false);
          spinValue.setValue(0);
        });
      }, 2000);
    });
  };

  useEffect(() => {
    const startBounceAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.spring(bounceValue, {
            toValue: 1.1, // Slightly scale up
            friction: 1, // Lower friction for faster, smoother bounce
            tension: 100, // Higher tension for faster bounce
            useNativeDriver: true,
          }),
          Animated.spring(bounceValue, {
            toValue: 1, // Scale back to normal
            friction: 1, // Lower friction for faster, smoother bounce
            tension: 100, // Higher tension for faster bounce
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startBounceAnimation();
  }, [bounceValue]);

  return (
    <View className="flex justify-center items-center ">
      <ImageBackground
        className="w-[90%] h-[350px] animate-slow-spin"
        source={require('../assets/turn.png')}
      />
      <ImageBackground
        className="w-[300px] h-[300px] absolute"
        source={require('../assets/circle.png')}
      />
      <View className="absolute">
        <Animated.Image
          source={require('../assets/wheel5.png')}
          style={{
            width: 350,
            height: 350,
            transform: [
              {
                rotate: spinValue.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        />
        <TouchableOpacity
          onPress={spinWheel}
          disabled={isSpinning}
          className="w-[50px] h-[50px] absolute self-center top-[38%]">
          <Image
            className="w-[70px] h-[70px] absolute self-center"
            source={require('../assets/spin.png')}
          />
        </TouchableOpacity>
        <Image
          className="w-[50px] h-[30px] absolute self-center top-[7%]"
          resizeMode="center"
          source={require('../assets/pointer.png')}
        />
        {/* <Image
          className="w-[70px] h-[70px] absolute top-[46%] left-[46%]"
          resizeMode="center"
          source={require('../assets/cursor.png')}
        /> */}
        <Animated.Image
          source={require('../assets/cursor.png')} // Replace with your image
          style={[styles.image, {transform: [{scale: bounceValue}]}]}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsModalOpen(!isModalOpen);
        }}>
        <View className="flex-1 justify-center items-center bg-black/70 p-8">
          {selectedPrize && (
            <>
              <View className="flex w-full items-end">
                <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                  <Image
                    className="w-6 h-5"
                    resizeMode="contain"
                    source={require('../assets/x.png')}
                  />
                </TouchableOpacity>
              </View>
              <LinearGradient
                style={styles.modalView}
                colors={['#7600EB', '#2B0552']}>
                <ImageBackground
                  className="w-full h-full flex justify-center items-center p-16"
                  resizeMode="contain"
                  source={require('../assets/backgroundStar.png')}>
                  <Image
                    className="w-20 h-16"
                    resizeMode="center"
                    source={selectedPrize.uri}
                  />
                  <Text className="text-3xl font-bold color-[#FEBD01] my-4">
                    Congratulations!
                  </Text>
                  <Text className="text-white font-bold text-sm text-center mb-8">
                    {`You have win a ${selectedPrize.label} cash it will be credited on your spin app wallet`}
                  </Text>
                  <LinearGradient
                    style={{
                      padding: 2,
                      borderRadius: 6,
                      width: 140,
                      height: 26,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    colors={['#FFBA01', '#E08304']}>
                    <Text className="text-white italic font-bold">
                      Cash Out
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </LinearGradient>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    height: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: '48%',
    left: '48%',
  },
});
