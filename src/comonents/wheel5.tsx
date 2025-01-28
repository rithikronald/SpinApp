import React, {useState} from 'react';
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

const SECTIONS = [
  {label: '₹100', angle: 0, uri: require('../assets/rupee.png')},
  {label: 'Mini', angle: 45, uri: require('../assets/mini.png')},
  {label: 'Mega', angle: 90, uri: require('../assets/mega.png')},
  {label: 'Double', angle: 135, uri: require('../assets/double.png')},
  {label: '?', angle: 180, uri: require('../assets/cashout2.png')},
  {label: 'Cash Out', angle: 225},
  {label: 'Double', angle: 270, uri: require('../assets/double.png')},
  {label: 'Mini', angle: 315, uri: require('../assets/mini.png')},
  {label: 'Medium', angle: 360, uri: require('../assets/medium.png')},
];

export const Wheel5 = () => {
  const spinValue = useState(new Animated.Value(0))[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState();

  const spinWheel = () => {
    const randomSpins = Math.floor(Math.random() * 3) + 3; // Between 3 to 7 spins
    const finalAngle =
      randomSpins * 180 +
      SECTIONS[Math.floor(Math.random() * SECTIONS.length)].angle;

    Animated.timing(spinValue, {
      toValue: finalAngle,
      duration: 3000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      // Calculate the final section
      const normalizedAngle = finalAngle % 360;
      const selectedSection = SECTIONS.find(
        section =>
          normalizedAngle >= section.angle &&
          normalizedAngle < section.angle + 45,
      );
      console.log(
        'Selected:',
        selectedSection ? selectedSection.label : 'Unknown',
      );
      console.log(selectedSection);
      setSelectedPrize(selectedSection);
      setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);
    });
  };

  return (
    <View className="flex justify-center items-center ">
      <ImageBackground
        className="w-[400px] h-[400px] animate-slow-spin"
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
          }}></Animated.Image>
        <TouchableOpacity
          onPress={spinWheel}
          className="w-[50px] h-[50px] absolute self-center top-[42%]">
          <Image
            className="w-[50px] h-[50px] absolute self-center"
            source={require('../assets/spin.png')}
          />
        </TouchableOpacity>
        <Image
          className="w-[50px] h-[30px] absolute self-center top-[7%]"
          resizeMode="center"
          source={require('../assets/pointer.png')}
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
});
