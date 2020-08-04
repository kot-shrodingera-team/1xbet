import { getElement, awaiter, sleep } from '@kot-shrodingera-team/config/util';
import clearCoupon from './clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';
import { updateBalance } from '../stake_info/getBalance';
import expandAllMarkets from './expandAllMarkets';
import findBet from './findBet';
import setBetAcceptMode from './setBetAcceptMode';

const showStake = async (): Promise<void> => {
  const [gameId, betParameter, , marketId] = worker.BetId.split('|');
  if (document.querySelector('.error_page')) {
    worker.Helper.WriteLine('Событие не найдено');
    worker.JSFail();
    return;
  }
  const gameElement = await getElement(`[id="${gameId}"]`, 10000);
  if (!gameElement) {
    worker.Helper.WriteLine('Событие не загрузилось');
    worker.JSFail();
    return;
  }
  worker.Helper.WriteLine('Событие загрузилось');
  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    worker.JSFail();
    return;
  }
  updateBalance();
  worker.Helper.WriteLine('Раскрываем все маркеты');
  await expandAllMarkets(gameElement);
  worker.Helper.WriteLine('Раскрыли все маркеты');
  const betButton = findBet(gameId, marketId, betParameter);
  if (!betButton) {
    worker.JSFail();
    return;
  }
  betButton.click();
  const betAdded = await awaiter(() => getStakeCount() === 1);
  if (!betAdded) {
    worker.Helper.WriteLine('Ставка не попала в купон');
    worker.JSFail();
    return;
  }
  worker.Helper.WriteLine('Ставка успешно открыта');
  await sleep(0);
  if (!setBetAcceptMode()) {
    worker.Helper.WriteLine('Не удалось поменять режим принятия ставки');
    worker.JSFail();
    return;
  }
  worker.JSStop();
};

export default showStake;
