import React, {useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Circle, G, Path} from 'react-native-svg';

export const WheelOfFortune = () => {
  const spinValue = new Animated.Value(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const startSpin = () => {
    if (isSpinning) return;
    console.log('Spingg');
    setIsSpinning(true);
    const randomSpin = Math.floor(Math.random() * 360) + 1800; // 5 full rotations + random stop

    Animated.timing(spinValue, {
      toValue: randomSpin,
      duration: 5000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
    });
  };

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.wheelContainer,
          {transform: [{rotate: spinInterpolate}]},
        ]}>
        {/* Wheel SVG */}
        <Svg width="250" height="250" viewBox="0 0 250 250">
          <Circle cx="125" cy="125" r="120" fill="gold" />
          <G>
            <Path d="M125 5 L5 125 L125 245 L245 125 Z" fill="red" />
            <Path d="M125 5 L245 125 L125 245 L5 125 Z" fill="blue" />
          </G>
        </Svg>
      </Animated.View>

      {/* Spin Button */}
      <TouchableOpacity style={styles.spinButton} onPress={startSpin}>
        <Text style={styles.spinText}>Spin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  wheelContainer: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
  },
  spinText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
