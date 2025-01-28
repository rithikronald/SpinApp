import React, {useState} from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';

const SECTIONS = [
  {label: '₹100', angle: 0},
  {label: 'Mini', angle: 45},
  {label: 'Mega', angle: 90},
  {label: 'Double', angle: 135},
  {label: '?', angle: 180},
  {label: 'Cash Out', angle: 225},
  {label: 'Double', angle: 270},
  {label: 'Mini', angle: 315},
  {label: 'Medium', angle: 360},
];

export const Wheel5 = () => {
  const spinValue = useState(new Animated.Value(0))[0];
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    });
  };

  return (
    <View className="flex justify-center items-center ">
      <ImageBackground
        className="w-[420px] h-[420px] animate-slow-spin"
        source={require('../assets/turn.png')}
      />
      <TouchableOpacity className="absolute" onPress={spinWheel}>
        <Animated.Image
          source={require('../assets/wheel2.png')}
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
      </TouchableOpacity>
    </View>
  );
};
