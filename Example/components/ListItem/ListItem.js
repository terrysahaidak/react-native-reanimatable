import React from 'react';
import T from 'prop-types';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import s from './styles';

const ListItem = ({ onPress, title }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

ListItem.propTypes = {
  onPress: T.func,
  title: T.string,
};

export default ListItem;
