import React from 'react';
import T from 'prop-types';
import A from 'react-native-reanimated';

class ScrollView extends React.PureComponent {
  componentDidMount() {
    if (this.props.initialScrollPosition) {
      this.scrollTo({
        ...this.props.initialScrollPosition,
        animated: false,
      });
    }
  }

  componentWillUnmount() {
    this.props.delegate.reset();
  }

  _ref = React.createRef();
  scrollPosition = 0;

  scrollTo(value) {
    global.requestAnimationFrame(() =>
      this._ref.current._component.scrollTo(value),
    );
  }

  _onScroll(value) {
    if (this.props.onScroll) {
      this.props.onScroll(value);
    }

    this.scrollPosition = value;
  }

  _onScrollEndDrag(evt) {
    this.props.snapPoints.forEach((item) => {
      const { from, to, snap } = item;

      if (this.scrollPosition > from && this.scrollPosition <= to) {
        this.scrollTo(
          this.props.vertical ? { x: snap } : { y: snap },
        );
      }
    });

    if (this.props.onScrollEndDrag) {
      this.props.onScrollEndDrag(evt);
    }
  }

  render() {
    const { delegate } = this.props;

    const props = {
      ...this.props,
      onScroll: delegate.event,
      onScrollEndDrag: (evt) => this._onScrollEndDrag(evt),
    };

    return (
      <React.Fragment>
        <A.Code
          exec={A.block([
            A.call([delegate.value], (r) => this._onScroll(r[0])),
            delegate.value,
          ])}
        />
        <A.ScrollView ref={this._ref} {...props} />
      </React.Fragment>
    );
  }
}

ScrollView.propTypes = {
  delegate: T.shape({
    event: T.object,
    reset: T.func,
  }),
  onScroll: T.func,
  onScrollEndDrag: T.func,
  vertical: T.bool,
  initialScrollPosition: T.shape({
    x: T.number,
    y: T.number,
  }),
  snapPoints: T.arrayOf(
    T.shape({
      from: T.number,
      to: T.number,
      snap: T.number,
    }),
  ),
};

export default ScrollView;
