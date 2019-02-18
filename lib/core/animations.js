import A, { Easing } from 'react-native-reanimated';

export const runTiming = ({
  clock,
  duration,
  oppositeClock,
  value,
  dest,
  easing,
  onFinish,
}) => {
  const state = {
    finished: new A.Value(0),
    position: new A.Value(0),
    time: new A.Value(0),
    frameTime: new A.Value(0),
  };

  const config = {
    duration,
    toValue: new A.Value(0),
    easing: easing || Easing.inOut(Easing.ease),
  };

  return A.block([
    // stop opposite clock before running our animation
    // to set last (previous) position as a current one
    oppositeClock ? A.cond(A.clockRunning(oppositeClock), A.stopClock(oppositeClock)) : 0,
    // run our animation clock
    A.cond(
      A.clockRunning(clock),
      // do nothing if our clock is already running
      0,
      // otherwise pre set all the values
      [
        // If the clock isn't running we reset all the animation params and start the clock
        A.set(state.finished, 0),
        A.set(state.time, 0),
        A.set(state.position, value),
        A.set(state.frameTime, 0),
        A.set(config.toValue, dest),
        A.startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    A.timing(clock, state, config),
    // if the animation is over we stop the clock
    A.cond(state.finished, A.block([A.stopClock(clock), onFinish])),
    // we made the block return the updated position
    A.set(value, state.position),
  ]);
};
