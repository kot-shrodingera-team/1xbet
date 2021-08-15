import { log } from '@kot-shrodingera-team/germes-utils';
import getLastBetsIds from '../helpers/getLastBetsIds';
import goToCouponTab from '../helpers/goToCouponTab';

const preOpenBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                Обновление номеров купонов успешных ставок                */
  /* ======================================================================== */

  const workerLastBetsIds = worker.GetSessionData('1xbet.LastBetsIds');
  if (workerLastBetsIds === null) {
    log('Обновляем номера купонов успешных ставок в истории', 'steelblue');
    const lastBetsIds = await getLastBetsIds();
    worker.SetSessionData('1xbet.LastBetsIds', JSON.stringify(lastBetsIds));
  } else if (workerLastBetsIds === '[]') {
    log('Нет номеров купонов успешных ставок (история пуста)', 'steelblue');
  } else {
    log('Номера купонов успешных ставок', 'steelblue', true);
    log(JSON.stringify(workerLastBetsIds), 'white', true);
  }

  /* ======================================================================== */
  /*                   Переключение на вкладку купона ставок                  */
  /* ======================================================================== */

  await goToCouponTab();
};

export default preOpenBet;
