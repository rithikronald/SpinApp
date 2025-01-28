import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export const WheelSpinner = () => {
  // Animation value for rotation
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);

  // Function to handle the spin animation
  const startSpinning = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Reset any existing rotation
    spinValue.setValue(0);

    // Generate random number of full rotations (between 5 and 10)
    const randomRotations = Math.floor(Math.random() * 5) + 5;

    Animated.timing(spinValue, {
      toValue: randomRotations,
      duration: 5000, // 5 seconds
      easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Custom easing for realistic spin
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
    });
  };

  // Interpolate rotation value
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={startSpinning}
        disabled={isSpinning}
        style={styles.spinnerContainer}>
        <Animated.Image
          source={require('../assets/wheel2.png')} // Replace with your wheel image path
          style={[
            styles.wheelImage,
            {
              transform: [{rotate: spin}],
            },
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    width: Dimensions.get('window').width * 0.8, // 80% of screen width
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelImage: {
    width: '100%',
    height: '100%',
  },
});
