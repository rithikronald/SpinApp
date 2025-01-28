import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TabComponent} from '../comonents/TabComponent';
import {Wheel5} from '../comonents/wheel5';

export const Home = () => {
  return (
    <LinearGradient
      style={styles.backgroundStyle}
      colors={['#7600EB', '#2B0552']}>
      <View className="flex flex-1 p-5">
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
