import LoopAnimation from './components/LoopAnimation';
import Reanimatable from './components/Reanimatable';
import ScrollView from './components/ScrollView';
import * as animations from './core/animations';
import createConfig from './core/createConfig';
import createDelegate from './core/createDelegate';

module.exports = {
  Reanimatable,
  ScrollView,
  LoopAnimation,
  animations,
  createDelegate,
  createAnimationConfig: createConfig,
};
