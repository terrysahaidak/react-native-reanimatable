import React from 'react';
import T from 'prop-types';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles';
import s from './styles';

const ListItem = ({ onPress, title }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>

      <Feather
        name="chevron-right"
        size={24}
        color={colors.icon}
      />
    </View>
  </TouchableWithoutFeedback>
);

ListItem.propTypes = {
  onPress: T.func,
  title: T.string,
};

export default ListItem;
