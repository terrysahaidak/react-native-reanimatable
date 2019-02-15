import React from 'react';
import T from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import s from './styles';

const Button = ({ onPress, text }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={s.container}>
      <Text style={s.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  text: T.string,
  onPress: T.func,
};

export default Button;
