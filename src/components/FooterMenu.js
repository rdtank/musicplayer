import React from 'react';
import {StyleSheet, View, Dimensions, Alert, BackHandler} from 'react-native';
import {Colors} from '../utils';
import IconButton from './IconButton';

const {width, height} = Dimensions.get('window');

const FooterMenu = props => {
  const {repeatMode, onPress} = props;

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    } else if (repeatMode == 'track') {
      return 'repeat-once';
    } else if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomIconWrapper}>
        <IconButton
          name="music"
          size={25}
          color={Colors.Red}
          onPress={() => {}}
        />
        <IconButton
          name={`${repeatIcon()}`}
          size={25}
          color={repeatMode !== 'off' ? Colors.Yellow : Colors.Red}
          onPress={onPress}
        />
        <IconButton
          name="share-variant"
          size={25}
          color={Colors.Red}
          onPress={() => {}}
        />
        <IconButton
          name="exit-to-app"
          size={25}
          color={Colors.Red}
          onPress={() => {
            Alert.alert('Exit!', 'Are you sure you want exit app?', [
              {
                text: 'No',
                onPress: () => null,
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => BackHandler.exitApp()},
            ]);
          }}
        />
      </View>
    </View>
  );
};

export default FooterMenu;

const styles = StyleSheet.create({
  bottomContainer: {
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.Teal,
  },
  bottomIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
