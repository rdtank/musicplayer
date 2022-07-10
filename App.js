import React from 'react';
import {View, StatusBar} from 'react-native';
import MusicPlayer from './src/screen/MusicPlayer';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <MusicPlayer />
    </View>
  );
};

export default App;
