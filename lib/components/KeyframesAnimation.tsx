import React from 'react'
import { InteractionManager } from 'react-native'
import T from 'prop-types'
import A from 'react-native-reanimated'

// TODO: Typing
class KeyframesAnimation extends React.PureComponent {
  _operations: any

  constructor(props) {
    super(props)

    const { values, operations } = props.generate()
    this._operations = operations

    this.state = {
      values,
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const animation = this._operations.createAnimation()

      this.setState({
        animation,
      })
    })
  }

  reset() {
    this._operations.reset()
  }

  render() {
    return (
      <React.Fragment>
        {this.state.animation && (
          <A.Code exec={this.state.animation} />
        )}
        {this.props.children(this.state.values)}
      </React.Fragment>
    );
  }
}

KeyframesAnimation.propTypes = {
  children: T.func,
  generate: T.func,
};

export default KeyframesAnimation;
