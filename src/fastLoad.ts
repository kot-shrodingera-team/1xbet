import { log } from '@kot-shrodingera-team/germes-utils';
import { version } from '../package.json';
import { clearGermesData } from './bookmakerApi';
import showStake from './show_stake';

const fastLoad = async (): Promise<void> => {
  log(`Быстрая загрузка (${version})`, 'steelblue');
  clearGermesData();
  showStake();
};

export default fastLoad;
