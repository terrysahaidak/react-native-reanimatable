import { createDelegate } from 'react-native-reanimatable';

export const MAX_HEADER_HEIGHT = 168;
export const delegate = createDelegate('scroll', [
  'contentOffset',
  'y',
]);
