import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const preOpenBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                   Переключение на вкладку купона ставок                  */
  /* ======================================================================== */

  const couponTab = await getElement<HTMLElement>(
    '.c-tabs__header > button:first-child'
  );
  if (!couponTab.classList.contains('c-tabs__item--active')) {
    log('Открыта не вкладка купона ставок', 'crimson');
    log('Открываем вкладку купона ставок', 'orange');
    couponTab.click();
    await Promise.race([
      getElement('.coupon__no-bets', 5000),
      getElement('.c-bet-box:not(.c-bet-box--done)', 5000),
    ]);
    const emptyCoupon = document.querySelector('.coupon__no-bets');
    const couponBet = document.querySelector(
      '.c-bet-box:not(.c-bet-box--done)'
    );
    if (emptyCoupon || couponBet) {
      log('Переключились на вкладку купона ставок', 'steelblue');
    } else {
      throw new JsFailError(
        'Не удалось переключиться на вкладку купона ставок'
      );
    }
  }
};

export default preOpenBet;
