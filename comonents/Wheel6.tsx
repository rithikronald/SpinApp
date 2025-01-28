import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Animated, Easing, Text } from 'react-native';
import Svg, { Path, G, Text as SvgText } from 'react-native-svg';

const SECTIONS = [
  { label: 'Mini', color: '#8E44AD' },
  { label: 'Mega', color: '#2980B9' },
  { label: 'Double', color: '#F39C12' },
  { label: '?', color: '#E74C3C' },
  { label: 'Cash Out', color: '#27AE60' },
  { label: 'Double', color: '#BDC3C7' },
  { label: 'Mini', color: '#E74C3C' },
  { label: 'Medium', color: '#16A085' },
  { label: '₹100', color: '#D35400' },
];

const WHEEL_RADIUS = 150;
const SECTION_ANGLE = 360 / SECTIONS.length;

const getPathForSection = (index) => {
  const startAngle = (index * SECTION_ANGLE * Math.PI) / 180;
  const endAngle = ((index + 1) * SECTION_ANGLE * Math.PI) / 180;
  
  const x1 = WHEEL_RADIUS + WHEEL_RADIUS * Math.cos(startAngle);
  const y1 = WHEEL_RADIUS + WHEEL_RADIUS * Math.sin(startAngle);
  const x2 = WHEEL_RADIUS + WHEEL_RADIUS * Math.cos(endAngle);
  const y2 = WHEEL_RADIUS + WHEEL_RADIUS * Math.sin(endAngle);

  return `M${WHEEL_RADIUS},${WHEEL_RADIUS} L${x1},${y1} A${WHEEL_RADIUS},${WHEEL_RADIUS} 0 0,1 ${x2},${y2} Z`;
};

const WheelOfFortune = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [selectedSection, setSelectedSection] = useState(null);

  const spinWheel = () => {
    const randomSpins = Math.floor(Math.random() * 5) + 3; // Random between 3 to 7 full spins
    const randomStopAngle = Math.floor(Math.random() * 360); // Random final position
    const finalAngle = randomSpins * 360 + randomStopAngle;

    Animated.timing(spinValue, {
      toValue: finalAngle,
      duration: 3000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      const normalizedAngle = (finalAngle % 360 + SECTION_ANGLE / 2) % 360; // Align with center
      const selectedIndex = Math.floor(normalizedAngle / SECTION_ANGLE);
      setSelectedSection(SECTIONS[selectedIndex].label);
      console.log("Selected:", SECTIONS[selectedIndex].label);
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={spinWheel}>
        <Animated.View
          style={{
            transform: [{ rotate: spinValue.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
          }}
        >
          <Svg width={WHEEL_RADIUS * 2} height={WHEEL_RADIUS * 2} viewBox={`0 0 ${WHEEL_RADIUS * 2} ${WHEEL_RADIUS * 2}`}>
            <G>
              {SECTIONS.map((section, index) => (
                <Path key={index} d={getPathForSection(index)} fill={section.color} />
              ))}
            </G>
          </Svg>
        </Animated.View>
      </TouchableOpacity>

      {/* Static Text Layer (Doesn't Rotate) */}
      <View style={{ position: 'absolute' }}>
        <Svg width={WHEEL_RADIUS * 2} height={WHEEL_RADIUS * 2} viewBox={`0 0 ${WHEEL_RADIUS * 2} ${WHEEL_RADIUS * 2}`}>
          <G>
            {SECTIONS.map((section, index) => {
              const angle = (index * SECTION_ANGLE + SECTION_ANGLE / 2) * (Math.PI / 180);
              const x = WHEEL_RADIUS + (WHEEL_RADIUS - 30) * Math.cos(angle);
              const y = WHEEL_RADIUS + (WHEEL_RADIUS - 30) * Math.sin(angle);
              return (
                <SvgText
                  key={`text-${index}`}
                  x={x}
                  y={y}
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="white"
                >
                  {section.label}
                </SvgText>
              );
            })}
          </G>
        </Svg>
      </View>

      {selectedSection && (
        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>
          Selected: {selectedSection}
        </Text>
      )}
    </View>
  );
};

export default WheelOfFortune;
