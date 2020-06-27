import { getElement, awaiter } from '@kot-shrodingera-team/config/util';
import clearCoupon from './clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';
import { updateBalance } from '../stake_info/getBalance';
import expandAllMarkets from './expandAllMarkets';
import findBet from './findBet';

const showStake = async (): Promise<void> => {
  const betData = worker.BetId.split('|');
  const gameId = betData[0];
  const betParameter = betData[1];
  const marketId = betData[3];
  if (document.querySelector('.error_page')) {
    worker.Helper.WriteLine('Событие не найдено');
    worker.JSFail();
    return;
  }
  const gameElement = await getElement(`[id="${gameId}"]`);
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
  worker.JSStop();
};

export default showStake;
