import { log } from '@kot-shrodingera-team/germes-utils';
import getLastBetId from '../helpers/getLastBetId';
import goToCouponTab from '../helpers/goToCouponTab';

const preOpenBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*            Обновление номера купона последней успешной ставки            */
  /* ======================================================================== */

  if (worker.GetSessionData('1xbet.LastBetId') === null) {
    log('Обновляем номер купона последней успешной ставки', 'darksalmon', true);
    const lastBetId = await getLastBetId();
    if (lastBetId === null) {
      worker.SetSessionData('1xbet.LastBetId', 'null');
    } else {
      worker.SetSessionData('1xbet.LastBetId', lastBetId);
    }
  }

  /* ======================================================================== */
  /*                   Переключение на вкладку купона ставок                  */
  /* ======================================================================== */

  await goToCouponTab();
};

export default preOpenBet;
