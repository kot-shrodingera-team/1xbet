import { log } from '@kot-shrodingera-team/germes-utils';
import { version } from '../package.json';

const fastLoad = async (): Promise<void> => {
  log(`Быстрая загрузка (${version})`, 'steelblue');
  worker.Helper.LoadUrl(worker.EventUrl.replace(/_/g, '-'));
};

export default fastLoad;
