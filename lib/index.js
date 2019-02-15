import LoopAnimation from './components/LoopAnimation';
import Reanimatable from './components/Reanimatable';
import * as animations from './core/animations';
import createConfig from './core/createConfig';

module.exports = {
  Reanimatable,
  LoopAnimation,
  animations,
  createAnimationConfig: createConfig,
};
