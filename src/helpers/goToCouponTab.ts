import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const goToCouponTab = async (): Promise<void> => {
  const couponTab = await getElement<HTMLElement>(
    '.c-tabs__header > button:nth-child(1)'
  );
  if (!couponTab.classList.contains('c-tabs__item--active')) {
    log('Открываем вкладку купона ставок', 'darksalmon', true);
    couponTab.click();
    await Promise.race([
      getElement(
        '.coupon__bets:not(.coupon__bets--opened) .coupon__no-bets',
        5000
      ),
      getElement('.c-bet-box:not(.c-bet-box--done)', 5000),
    ]);
    const emptyCoupon = document.querySelector(
      '.coupon__bets:not(.coupon__bets--opened) .coupon__no-bets'
    );
    const couponBet = document.querySelector(
      '.c-bet-box:not(.c-bet-box--done)'
    );
    if (!emptyCoupon && !couponBet) {
      throw new JsFailError('Не дождались появиления купона');
    }
    log('Переключились на вкладку купона ставок', 'cadetblue', true);
  } else {
    log('Уже открыта вкладка купона ставок', 'cadetblue', true);
  }
};

export default goToCouponTab;
