import { createKeys } from '../utils'

// TODO: RENAME THIS

export const ANIMATION_STATE = {
  START_POINT: 0,
  PLAY_FORWARD: 1,
  END_POINT: 2,
  PLAY_BACKWARD: 3,
}

export const ANIMATION_TYPE = createKeys([
  'TRANSITION',
  'INTERPOLATION_TRANSITION',
  'KEYFRAMES',
  'DELEGATE',
])
