import { createKeys } from '../utils'
import { AnimationState, AnimationType } from 'react-native-reanimatable'

// TODO: RENAME THIS

export const ANIMATION_STATE: AnimationState = {
  START_POINT: 0,
  PLAY_FORWARD: 1,
  END_POINT: 2,
  PLAY_BACKWARD: 3,
}

export const ANIMATION_TYPE: AnimationType = createKeys([
  'TRANSITION',
  'INTERPOLATION_TRANSITION',
  'KEYFRAMES',
  'DELEGATE',
])
