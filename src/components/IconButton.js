import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../utils';

const IconButton = props => {
  const {name, size, color, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  color: Colors.Yellow,
};

export default IconButton;
