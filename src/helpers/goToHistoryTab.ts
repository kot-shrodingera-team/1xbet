import {
  awaiter,
  getElement,
  log,
  text,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const goToHistoryTab = async (): Promise<void> => {
  const couponTab = await getElement<HTMLElement>(
    '.c-tabs__header > button:nth-child(2)'
  );
  if (!couponTab.classList.contains('c-tabs__item--active')) {
    log('Открываем вкладку истории ставок', 'darksalmon', true);
    couponTab.click();
    await Promise.race([
      awaiter(() => {
        const emptyBets = document.querySelector(
          '.coupon__bets--opened .coupon__no-bets'
        );
        if (!emptyBets) {
          return false;
        }
        if (/У вас нет открытых купонов/i.test(text(emptyBets))) {
          return emptyBets;
        }
        return false;
      }, 5000),
      getElement('.coupon__bets--opened .c-bet-box--done', 5000),
    ]);
    const emptyBets = document.querySelector(
      '.coupon__bets--opened .coupon__no-bets'
    );
    const lastBet = document.querySelector(
      '.coupon__bets--opened .c-bet-box--done'
    );
    if (!emptyBets && !lastBet) {
      throw new JsFailError('Не дождались загрузки истории ставок');
    }
    log('Переключились на вкладку истории ставок', 'cadetblue', true);
  } else {
    log('Уже открыта вкладка истории ставок', 'cadetblue', true);
  }
};

export default goToHistoryTab;
