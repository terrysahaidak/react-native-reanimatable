# react-native-reanimatable

> Easy way to create 60fps animations using [react-native-reanimated](https://github.com/kmagiera/react-native-reanimated).

## Warning

This is still very _*work in progress*_. Many things may change. It's not recommended to use it in production right now (but I will :D).

Many things are still missing. Check out our [roadmap](#roadmap).

## Installation

Install the library from npm:

```bash
npm i --save react-native-reanimatable
```
or
```bash
yarn add react-native-reanimatable
```

After that, follow the [Getting Started](https://github.com/kmagiera/react-native-reanimated#getting-started) of Reanimated, because the library uses it under the hood.

## Roadmap
- [ ] Add support for decay and spring type of animations
- [ ] Add support for keyframes (interpolation)
- [ ] Add support for mounting/unmounting animations
- [ ] Add more examples
- [ ] Add docs
- [ ] Add typings
- [ ] Add some out of the box animations (bounces, zooms etc)
- [ ] Add animation lifecycle
- [ ] Add support for color animations

## Example
```jsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
} from 'react-native';
import { Reanimatable, createAnimationConfig } from 'react-native-reanimatable';
import Animated from 'react-native-reanimated';

const config = createAnimationConfig({
  animation: {
    type: 'timing',
    duration: 300,
  },
  values: {
    width: { from: 100, to: 150 },
    height: { from: 100, to: 150 },
    translateY: { from: 0, to: 200 },
  },
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    marginBottom: 100,
  },
  animatableView: {
    height: 100,
    backgroundColor: 'red',
  },
});

export default class App extends React.PureComponent {
  state = {
    value: false,
  };

  toggleAnimation() {
    this.setState((state) => ({ value: !state.value }));
  }

  render() {
    return (
      <View style={s.container}>
        <Reanimatable
          config={config}
          value={this.state.value}
          containerStyle={s.animationContainer}
        >
          {({ width, height, translateY }) => (
            <Animated.View
              style={[
                s.animatableView,
                { width, height, transform: [{ translateY }] },
              ]}
            />
          )}
        </Reanimatable>

        <Button
          title="Toggle Animation"
          onPress={() => this.toggleAnimation()}
          style={s.button}
        />
      </View>
    );
  }
}
```

## License
[MIT](LICENSE)