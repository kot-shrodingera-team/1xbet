import {
  getElement,
  awaiter,
  sleep,
  log,
} from '@kot-shrodingera-team/germes-utils';
import clearCoupon from './clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';
import { updateBalance } from '../stake_info/getBalance';
import expandAllMarkets from './expandAllMarkets';
import findBet from './findBet';
import setBetAcceptMode from './setBetAcceptMode';

let couponOpenning = false;

export const isCouponOpenning = (): boolean => couponOpenning;

const jsFail = (message = ''): void => {
  if (message) {
    log(message, 'red');
  }
  couponOpenning = false;
  worker.JSFail();
};

const showStake = async (): Promise<void> => {
  couponOpenning = true;
  const [gameId, betParameter, , marketId] = worker.BetId.split('|');
  await Promise.race([
    getElement('.error_page', 10000),
    getElement(`[id="${gameId}"]`, 10000),
  ]);
  if (document.querySelector('.error_page')) {
    jsFail('Событие не найдено');
    return;
  }
  const gameElement = document.querySelector(`[id="${gameId}"]`);
  if (!gameElement) {
    jsFail('Событие не найдено на странице');
    return;
  }
  log('Событие загрузилось', 'steelblue');
  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    jsFail();
    return;
  }
  updateBalance();
  await expandAllMarkets();
  await sleep(0); // Иначе после нажатия на кнопку разворачивания маркетов, они не будут найдены
  const betButton = findBet(gameId, marketId, betParameter);
  if (!betButton) {
    jsFail();
    return;
  }
  betButton.click();
  const betAdded = await awaiter(() => getStakeCount() === 1);
  if (!betAdded) {
    jsFail('Ставка не попала в купон');
    return;
  }
  log('Ставка успешно открыта', 'green');
  await sleep(0);
  setBetAcceptMode();
  couponOpenning = false;
  worker.JSStop();
};

export default showStake;
