import LoopAnimation from './components/LoopAnimation';
import Reanimatable from './components/Reanimatable';
import * as animations from './core/animations';
import createConfig from './core/createConfig';
import createDelegate from './core/createDelegate';

module.exports = {
  Reanimatable,
  LoopAnimation,
  animations,
  createDelegate,
  createAnimationConfig: createConfig,
};
