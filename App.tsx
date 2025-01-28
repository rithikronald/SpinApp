import React from 'react';
import {View} from 'react-native';
import './global.css';
import {Home} from './src/screens/Home';

function App(): React.JSX.Element {
  return (
    <View className="flex flex-1">
      <Home />
    </View>
  );
}

export default App;
