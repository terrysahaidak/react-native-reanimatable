import { createKeys } from '../utils';

export const ANIMATION_STATE = {
  START_POINT: 0,
  PLAY_FORWARD: 1,
  END_POINT: 2,
  PLAY_BACKWARD: 3,
};

export const ANIMATION_TYPE = createKeys([
  'TRANSITION',
  'KEYFRAMES',
  'DELEGATE',
]);
