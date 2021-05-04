import {
  log,
  getElement,
  checkBookerHost,
  getWorkerParameter,
} from '@kot-shrodingera-team/germes-utils';
import {
  NewUrlError,
  JsFailError,
} from '@kot-shrodingera-team/germes-utils/errors';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import { updateBalance } from '../stake_info/getBalance';
import clearCoupon from './clearCoupon';

const preCheck = async (): Promise<void> => {
  if (!checkBookerHost()) {
    log('Открыта не страница конторы (или зеркала)', 'crimson');
    window.location.href = new URL(worker.BookmakerMainUrl).href;
    throw new NewUrlError('Открываем страницу БК');
  }

  if (!/\/live/.test(window.location.pathname)) {
    log('Открыт не Live', 'crimson');
    window.location.pathname = '/ru/live/';
    throw new NewUrlError('Переходим на Live');
  } else {
    log('Открыт Live', 'steelblue');
    const betslip = await getElement('.coupon', 15000);
    if (!betslip) {
      throw new JsFailError('Купон не появился');
    }
  }

  await authStateReady();
  worker.Islogin = checkAuth();
  worker.JSLogined();
  if (!worker.Islogin) {
    throw new JsFailError('Нет авторизации');
  }
  log('Есть авторизация', 'steelblue');
  updateBalance();

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

  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }

  if (!getWorkerParameter('fakeAuth')) {
    const refreshBalanceButton = document.querySelector<HTMLElement>(
      '.show_bonusProgress'
    );
    if (refreshBalanceButton) {
      log('Обновляем баланс', 'orange');
      refreshBalanceButton.click();
    } else {
      log('Не найдена кнопка обновления баланса', 'crimson');
    }
    updateBalance();
  }
};

export default preCheck;
