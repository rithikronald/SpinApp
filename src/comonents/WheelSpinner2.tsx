import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const WheelSpinner2 = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  // Define wheel sections (adjust angles based on your wheel image)
  const sections = [
    {name: 'Mini', startAngle: 0, endAngle: 45},
    {name: 'Mega', startAngle: 45, endAngle: 90},
    {name: 'Double', startAngle: 90, endAngle: 135},
    {name: '.', startAngle: 135, endAngle: 180},
    {name: 'Double', startAngle: 180, endAngle: 225},
    {name: 'Mini', startAngle: 225, endAngle: 270},
    {name: 'Medium', startAngle: 270, endAngle: 315},
    {name: '£100', startAngle: 315, endAngle: 360},
  ];

  // Function to normalize angle to 0-360 range
  const normalizeAngle = angle => {
    const normalized = angle % 360;
    return normalized < 0 ? normalized + 360 : normalized;
  };

  // Function to determine which section the arrow is pointing to
  const getSelectedSection = finalAngle => {
    const normalizedAngle = normalizeAngle(finalAngle);
    return sections.find(
      section =>
        normalizedAngle >= section.startAngle &&
        normalizedAngle < section.endAngle,
    );
  };

  const startSpinning = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedSection(null);

    // Reset any existing rotation
    spinValue.setValue(0);

    // Generate random number of full rotations (between 5 and 10)
    const randomRotations = Math.floor(Math.random() * 5) + 5;
    // Generate random additional angle (0-360 degrees)
    const randomFinalAngle = Math.random() * 360;
    const finalValue = randomRotations + randomFinalAngle / 360;

    Animated.timing(spinValue, {
      toValue: finalValue,
      duration: 5000, // 5 seconds
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      // Calculate final position
      const finalAngle = (finalValue * 360) % 360;
      const section = getSelectedSection(finalAngle);
      setSelectedSection(section);
    });
  };

  // Interpolate rotation value
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Arrow indicator */}
      <View style={styles.arrow}>
        <Text style={styles.arrowText}>↓</Text>
      </View>

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

      {selectedSection && (
        <Text style={styles.resultText}>Selected: {selectedSection.name}</Text>
      )}
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
    width: Dimensions.get('window').width * 0.8,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelImage: {
    width: '100%',
    height: '100%',
  },
  arrow: {
    position: 'absolute',
    top: '10%',
    zIndex: 1,
  },
  arrowText: {
    fontSize: 40,
    color: '#000',
  },
  resultText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
