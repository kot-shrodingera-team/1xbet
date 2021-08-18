import { log } from '@kot-shrodingera-team/germes-utils';
import getLastBetId from '../helpers/getLastBetId';
import goToCouponTab from '../helpers/goToCouponTab';

const preOpenBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                Обновление номеров купонов успешных ставок                */
  /* ======================================================================== */

  const workerLastBetsIds = worker.GetSessionData('1xbet.LastBetsId');
  if (workerLastBetsIds === null) {
    log(
      'Обновляем номер купона последней успешной ставки в истории',
      'steelblue'
    );
    const lastBetId = await getLastBetId();
    worker.SetSessionData('1xbet.LastBetsId', lastBetId);
  } else if (workerLastBetsIds === 'null') {
    log(
      'Нет номера купона последней успешной ставки в истории (история пуста)',
      'steelblue'
    );
  } else {
    log(
      `Номер купона последней успешной ставки: ${workerLastBetsIds}`,
      'steelblue'
    );
  }

  /* ======================================================================== */
  /*                   Переключение на вкладку купона ставок                  */
  /* ======================================================================== */

  await goToCouponTab();
};

export default preOpenBet;
