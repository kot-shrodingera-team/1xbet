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

const showStake = async (): Promise<void> => {
  const [gameId, betParameter, , marketId] = worker.BetId.split('|');
  await Promise.race([
    getElement('.error_page', 1000),
    getElement(`[id="${gameId}"]`, 10000),
  ]);
  if (document.querySelector('.error_page')) {
    log('Событие не найдено', 'red');
    worker.JSFail();
    return;
  }
  const gameElement = document.querySelector(`[id="${gameId}"]`);
  if (!gameElement) {
    log('Событие не найдено на странице', 'red');
    worker.JSFail();
    return;
  }
  log('Событие загрузилось', 'steelblue');
  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    worker.JSFail();
    return;
  }
  updateBalance();
  await expandAllMarkets();
  await sleep(0); // Иначе после нажатия на кнопку разворачивания маркетов, они не будут найдены
  const betButton = findBet(gameId, marketId, betParameter);
  if (!betButton) {
    worker.JSFail();
    return;
  }
  betButton.click();
  const betAdded = await awaiter(() => getStakeCount() === 1);
  if (!betAdded) {
    log('Ставка не попала в купон', 'red');
    worker.JSFail();
    return;
  }
  log('Ставка успешно открыта', 'green');
  await sleep(0);
  setBetAcceptMode();
  worker.JSStop();
};

export default showStake;
