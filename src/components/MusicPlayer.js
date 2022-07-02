import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const MusicPlayer = () => {
  return (
    <View style={styles.container}>
      <Feather name="music" size={20} />
      <Text>Music Player</Text>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
