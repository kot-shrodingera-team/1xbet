import { log, checkUrl, sleep } from '@kot-shrodingera-team/germes-utils';
import clearCoupon from './clearCoupon';
import { updateBalance } from '../stake_info/getBalance';
import setBetAcceptMode from './setBetAcceptMode';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';
import openBet from './openBet';
import openEvent from './openEvent';
import preCheck from './preCheck';
import { maximumStakeReady } from '../stake_info/getMaximumStake';

let couponOpenning = false;

export const isCouponOpenning = (): boolean => couponOpenning;

const showStake = async (): Promise<void> => {
  localStorage.setItem('couponOpening', '1');
  couponOpenning = true;
  try {
    await authStateReady();
    worker.Islogin = checkAuth();
    worker.JSLogined();
    if (!worker.Islogin) {
      throw new JsFailError('Нет авторизации');
    }
    log('Есть авторизация', 'steelblue');

    const couponCleared = await clearCoupon();
    if (!couponCleared) {
      throw new JsFailError('Не удалось очистить купон');
    }
    const refreshBalanceButton = document.querySelector(
      '.show_bonusProgress'
    ) as HTMLElement;
    if (refreshBalanceButton) {
      log('Обновляем баланс', 'orange');
      refreshBalanceButton.click();
    } else {
      log('Не найдена кнопка обновления баланса', 'crimson');
    }
    updateBalance();

    await preCheck();

    await openEvent();

    await openBet();

    const maximumStakeLoaded = await maximumStakeReady();
    if (!maximumStakeLoaded) {
      throw new JsFailError('Максимальная ставка не появилась');
    }

    log('Ставка успешно открыта', 'green');
    await sleep(0);
    setBetAcceptMode();
    couponOpenning = false;
    localStorage.setItem('couponOpening', '0');
    worker.JSStop();
  } catch (error) {
    if (error instanceof JsFailError) {
      log(error.message, 'red');
      couponOpenning = false;
      localStorage.setItem('couponOpening', '0');
      worker.JSFail();
    }
    if (error instanceof NewUrlError) {
      log(error.message, 'orange');
    }
  }
};

export default showStake;
