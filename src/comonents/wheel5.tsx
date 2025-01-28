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
  {label: '₹100', angle: 270, uri: require('../assets/rupee.png')},
  {label: 'Medium', angle: 315, uri: require('../assets/medium.png')},
];

export const Wheel5 = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState();
  const bounceValue = useRef(new Animated.Value(1)).current; // Initial scale of 1

  const resetWheel = () => {
    spinValue.setValue(0);
  };

  const spinWheel = () => {
    if (isSpinning) return; // Prevent multiple spins
    setIsSpinning(true);

    // Generate random number of complete rotations (3-5 rotations)
    const numberOfRotations = Math.floor(Math.random() * 3) + 3;

    // Generate random section to land on
    const randomSectionIndex = Math.floor(Math.random() * SECTIONS.length);
    const sectionAngle = SECTIONS[randomSectionIndex].angle;

    // Calculate final rotation value (complete rotations + section angle)
    const finalRotation = numberOfRotations * 360 + sectionAngle;

    // Start the spin animation
    Animated.sequence([
      // First spin to final position
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
      // Animation complete callback
      const selectedSection = SECTIONS[randomSectionIndex];
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
          resetWheel();
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
