import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  createAnimationConfig,
  Reanimatable,
} from 'react-native-reanimatable';
import s from './styles';
import { MAX_HEADER_HEIGHT, delegate } from './constants';
import { SearchBox } from '../';

const animation = createAnimationConfig({
  animation: {
    delegate,
  },
  keyframes: {
    '-100': {
      fontSize: 36,
      height: MAX_HEADER_HEIGHT + 100,
    },
    0: {
      fontSize: 34,
      height: MAX_HEADER_HEIGHT,
    },
    88: {
      headingOpacity: 1,
      opacity: 0,
    },
    90: {
      headingOpacity: 0,
      opacity: 1,
    },
    103: {
      height: MAX_HEADER_HEIGHT - 103,
    },
  },
});

const Header = () => (
  <Reanimatable config={animation}>
    {({
      height,
      fontSize,
      paddingBottom,
      opacity,
      headingOpacity,
    }) => (
      <Animated.View style={[s.container, { height }]}>
        <Animated.View style={[s.bottomContainer, { paddingBottom }]}>
          <Animated.Text
            style={[
              s.bigHeader,
              { fontSize, opacity: headingOpacity },
            ]}
          >
            Delegation
          </Animated.Text>

          <SearchBox />
        </Animated.View>
        <View style={s.topContainer}>
          <Animated.Text style={[s.smallHeader, { opacity }]}>
            Delegation
          </Animated.Text>
        </View>
      </Animated.View>
    )}
  </Reanimatable>
);

export default Header;
