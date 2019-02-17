import React from 'react';
import Animated from 'react-native-reanimated';
import {
  createAnimationConfig,
  Reanimatable,
} from 'react-native-reanimatable';
import Ionicons from '@expo/vector-icons/Ionicons';
import s from './styles';
import { delegate } from '../Header/constants';
import { colors } from '../../../../styles';

const searchAnimation = createAnimationConfig({
  animation: {
    delegate,
  },
  keyframes: {
    0: {
      height: 36,
      opacity: 1,
      paddingBottom: 15,
    },
    8: {
      opacity: 0,
    },
    36: {
      height: 0,
      paddingBottom: 15,
    },
    51: {
      paddingBottom: 0,
    },
  },
});

const Search = () => (
  <Reanimatable config={searchAnimation}>
    {({ height, opacity, paddingBottom }) => (
      <Animated.View style={{ paddingBottom }}>
        <Animated.View style={[s.container, { height }]}>
          <Animated.Text style={[s.icon, { opacity }]}>
            <Ionicons
              name="ios-search"
              size={20}
              color={colors.textSecondary}
            />
          </Animated.Text>

          <Animated.Text style={[s.text, { opacity }]}>
            Search
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    )}
  </Reanimatable>
);

export default Search;
