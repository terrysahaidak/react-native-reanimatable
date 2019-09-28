import React from 'react'
import T from 'prop-types'

// TODO: This crap looks ugly and not long term
interface IDelegateAnimationProps {
  children: (...args: any[]) => any,
  generate: (...args: any[]) => any
}

// TODO: This `any`
interface IDelegateAnimationState {
  values: any,
}

class DelegateAnimation extends React.PureComponent<IDelegateAnimationProps, IDelegateAnimationState> {
  constructor(props) {
    super(props)

    const { values } = props.generate();

    this.state = {
      values,
    }
  }

  render() {
    return this.props.children(this.state.values)
  }
}

// TODO: Look into fixing propTypes crap
DelegateAnimation.propTypes = {
  children: T.func,
  generate: T.func,
};

export default DelegateAnimation;
