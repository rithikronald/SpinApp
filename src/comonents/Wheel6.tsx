// import React, {useState} from 'react';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Animated, {
//   Easing,
//   runOnJS,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';

// const SECTIONS = [
//   'Mini',
//   'Mega',
//   'Double',
//   'Cash Out',
//   'Double',
//   'Mini',
//   'Medium',
//   '₹100',
// ];
// const TOTAL_SECTIONS = SECTIONS.length;
// const ROTATION_PER_SECTION = 360 / TOTAL_SECTIONS;

// const WheelOfFortune = () => {
//   const rotation = useSharedValue(0);
//   const [selected, setSelected] = useState('');

//   const spinWheel = () => {
//     const randomSpins = Math.floor(Math.random() * 5) + 3; // Random spins between 3 and 7
//     const randomOffset = Math.floor(Math.random() * TOTAL_SECTIONS); // Random section
//     const finalRotation =
//       360 * randomSpins + randomOffset * ROTATION_PER_SECTION;

//     rotation.value = withTiming(
//       finalRotation,
//       {
//         duration: 4000,
//         easing: Easing.out(Easing.exp),
//       },
//       () => {
//         runOnJS(setSelected)(SECTIONS[randomOffset]); // Set the selected section
//         console.log('Selected:', SECTIONS[randomOffset]);
//       },
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[styles.wheel, {transform: [{rotate: `${rotation.value}deg`}]}]}>
//         <Image source={require('../assets/wheel3.png')} style={styles.image} />
//       </Animated.View>
//       <TouchableOpacity onPress={spinWheel} style={styles.button}>
//         <Text style={styles.buttonText}>Spin</Text>
//       </TouchableOpacity>
//       {selected ? (
//         <Text style={styles.result}>Selected: {selected}</Text>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   wheel: {width: 300, height: 300, position: 'absolute'},
//   image: {width: '100%', height: '100%', resizeMode: 'contain'},
//   button: {
//     marginTop: 320,
//     padding: 15,
//     backgroundColor: '#ff5733',
//     borderRadius: 10,
//   },
//   buttonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
//   result: {marginTop: 20, fontSize: 22, fontWeight: 'bold'},
// });

// export default WheelOfFortune;
