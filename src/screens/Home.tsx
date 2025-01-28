import React, {useState} from 'react';
import {Animated, Image, PanResponder, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TabComponent} from '../comonents/TabComponent';
import {Wheel5} from '../comonents/wheel5';

export const Home = () => {
  // const [position, setPosition] = useState({x: 0, y: 0});

  // const handleTouchMove = event => {
  //   const {locationX, locationY} = event.nativeEvent;
  //   setPosition({x: locationX, y: locationY});
  // };

  const [position] = useState(new Animated.ValueXY({x: 0, y: 0}));

  // Initialize PanResponder
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt, gestureState) => {
      // Update position when touch starts
      position.setOffset({
        x: position.x._value,
        y: position.y._value,
      });
      position.setValue({x: 0, y: 0});
    },

    onPanResponderMove: (evt, gestureState) => {
      // Center the pointer on the touch point by subtracting half the image dimensions
      const adjustedGestureState = {
        ...gestureState,
        dx: gestureState.dx - 40 / 2,
        dy: gestureState.dy - 40 / 2,
      };

      // Update position as touch moves
      Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        {useNativeDriver: false},
      )(evt, adjustedGestureState);
    },

    onPanResponderRelease: () => {
      // Reset offset when touch ends
      position.flattenOffset();
    },
  });

  return (
    <LinearGradient
      style={styles.backgroundStyle}
      colors={['#7600EB', '#2B0552']}>
      <View className="flex flex-1 p-5" {...panResponder.panHandlers}>
        <View className="flex flex-1 justify-around">
          <View className="flex w-full h-[40%]">
            <Image
              className="w-[100%] "
              resizeMode="contain"
              source={require('../assets/Banner.png')}
            />
            <View className="flex w-full justify-center items-center">
              <Image
                resizeMode="contain"
                className="w-[100px]"
                source={require('../assets/earnings.png')}
              />
            </View>
            <View className="flex w-full justify-center items-center">
              <Image source={require('../assets/ProgressBar.png')} />
            </View>
            <View className="flex w-full  justify-center items-center">
              <Image
                className="w-[50%] "
                resizeMode="center"
                source={require('../assets/cashout.png')}
              />
            </View>
          </View>
          <View className="flex h-[50%]">
            <Wheel5 />
          </View>
        </View>
        <View className="flex flex-row justify-around self-end w-full">
          <TabComponent
            url={require('../assets/home.png')}
            isSelected={true}
            onPress={() => {}}
            text={'Home'}
          />
          <TabComponent
            url={require('../assets/chest.png')}
            isSelected={false}
            onPress={() => {}}
            text={'More Spin'}
          />
          <TabComponent
            url={require('../assets/invitation.png')}
            isSelected={false}
            onPress={() => {}}
            text={'Invitation'}
          />
          <TabComponent
            url={require('../assets/coin.png')}
            isSelected={false}
            onPress={() => {}}
            text={'Cash Out'}
          />
        </View>
        {/* <Image
          source={require('../assets/cursor.png')}
          style={[
            styles.cursor,
            {
              left: position.x - 20, // Offset to center the image
              top: position.y - 20,
            },
          ]}
        /> */}
        {/* <Animated.Image
          source={require('../assets/cursor.png')}
          style={[
            {
              width: 40,
              height: 40,
              position: 'absolute',
              transform: [{translateX: position.x}, {translateY: position.y}],
            },
          ]}
          resizeMode="contain"
        /> */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    height: '100%',
    width: '100%',
  },
  cursor: {
    width: 40, // Adjust size of the cursor
    height: 40,
    position: 'absolute',
  },
});
