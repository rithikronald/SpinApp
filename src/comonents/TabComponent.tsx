import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const colors1 = ['#FFBA01', '#E08304'];
const colors2 = ['#AA00FF', '#630095'];

export const TabComponent = ({onPress, text, isSelected, url}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex w-[20%] h-20 rounded-xl bg-primary/20 border border-purple-800 justify-center items-center p-1">
      <Image className="w-6 h-6" source={url} />
      <LinearGradient
        style={{
          padding: 1,
          borderRadius: 4,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
        colors={isSelected ? colors1 : colors2}>
        <Text className="text-white text-[10px] font-bold">{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
