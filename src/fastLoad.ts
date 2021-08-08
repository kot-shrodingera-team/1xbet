import { log } from '@kot-shrodingera-team/germes-utils';
import { version } from '../package.json';
import showStake from './show_stake';

const fastLoad = async (): Promise<void> => {
  if (
    worker.GetSessionData(`${window.germesData.bookmakerName}.ShowStake`) ===
    '1'
  ) {
    log('Предыдущее переоткрытие купона незавершено', 'red');
    worker.SetSessionData(`${window.germesData.bookmakerName}.ShowStake`, '0');
    worker.JSFail();
    window.location.reload();
    return;
  }
  worker.SetSessionData(
    `${window.germesData.bookmakerName}.TransitionToEventPage`,
    '0'
  );
  log(`Быстрая загрузка (${version})`, 'steelblue');
  showStake();
};

export default fastLoad;
