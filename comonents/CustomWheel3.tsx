import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Path,
  Pattern,
  Image as SvgImage,
  Text as SvgText,
} from 'react-native-svg';

const WHEEL_SIZE = Dimensions.get('window').width * 0.8;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = WHEEL_SIZE / 2;

const sections = [
  {
    label: 'Mini',
    image: require('../assets/wheel2.png'),
    id: 'mini-pattern',
  },
  {
    label: 'Mega',
    image: require('../assets/wheel2.png'),
    id: 'mega-pattern',
  },
  {
    label: 'Double',
    image: require('../assets/wheel2.png'),
    id: 'double-pattern',
  },
  {
    label: '.',
    image: require('../assets/wheel2.png'),
    id: 'dot-pattern',
  },
  {
    label: 'Double',
    image: require('../assets/wheel2.png'),
    id: 'double2-pattern',
  },
  {
    label: 'Mini',
    image: require('../assets/wheel2.png'),
    id: 'mini2-pattern',
  },
  {
    label: 'Medium',
    image: require('../assets/wheel2.png'),
    id: 'medium-pattern',
  },
  {
    label: '£100',
    image: require('../assets/wheel2.png'),
    id: 'hundred-pattern',
  },
];

export const CustomWheel3 = () => {
  // Function to calculate the SVG path for a section
  const createSectionPath = index => {
    const angle = 360 / sections.length;
    const startAngle = index * angle - 90; // Start from top (subtract 90 degrees)
    const endAngle = startAngle + angle;

    // Convert angles to radians
    const startRadians = (startAngle * Math.PI) / 180;
    const endRadians = (endAngle * Math.PI) / 180;

    // Calculate points
    const startX = CENTER + RADIUS * Math.cos(startRadians);
    const startY = CENTER + RADIUS * Math.sin(startRadians);
    const endX = CENTER + RADIUS * Math.cos(endRadians);
    const endY = CENTER + RADIUS * Math.sin(endRadians);

    // Create path
    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M ${CENTER} ${CENTER}
            L ${startX} ${startY}
            A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${endX} ${endY}
            Z`;
  };

  // Function to calculate text position
  const getTextPosition = index => {
    const angle = 360 / sections.length;
    const currentAngle = (index * angle + angle / 2 - 90) * (Math.PI / 180);
    const distance = RADIUS * 0.6;

    return {
      x: CENTER + distance * Math.cos(currentAngle),
      y: CENTER + distance * Math.sin(currentAngle),
      rotation: index * angle + angle / 2,
    };
  };

  return (
    <View style={styles.container}>
      <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
        <Defs>
          {/* Define patterns for each section */}
          {sections.map((section, index) => (
            <Pattern
              key={section.id}
              id={section.id}
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={WHEEL_SIZE / 2}
              height={WHEEL_SIZE / 2}>
              <SvgImage
                href={section.image}
                width={WHEEL_SIZE / 2}
                height={WHEEL_SIZE / 2}
                preserveAspectRatio="xMidYMid slice"
              />
            </Pattern>
          ))}
        </Defs>

        {/* Border circle */}
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke="#000"
          strokeWidth="4"
          fill="none"
        />

        {/* Wheel sections */}
        {sections.map((section, index) => {
          const textPosition = getTextPosition(index);
          const pathId = `path-${index}`;

          return (
            <G key={index}>
              {/* Section path with image fill */}
              <Path
                d={createSectionPath(index)}
                fill={`url(#${section.id})`}
                stroke="#000"
                strokeWidth="2"
              />

              {/* Section text */}
              <G
                rotation={textPosition.rotation}
                origin={`${textPosition.x}, ${textPosition.y}`}>
                <SvgText
                  x={textPosition.x}
                  y={textPosition.y}
                  fill="white"
                  fontSize="20"
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  stroke="#000"
                  strokeWidth="1">
                  {section.label}
                </SvgText>
              </G>
            </G>
          );
        })}

        {/* Center circle */}
        <Circle cx={CENTER} cy={CENTER} r={RADIUS * 0.1} fill="#000" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
