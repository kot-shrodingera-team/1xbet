import { log } from '../logger';
import { checkAuth } from './auth';
import { updateBalance } from './balance';
import { getElement, sleep } from '@kot-shrodingera-team/config/util';
import { clearCoupon, getStakeCount, awaiter } from '../stake-functions';

export async function showStake(): Promise<void> {
  const betId = worker.BetId.split('|');
  if (typeof worker == 'undefined') {
    log('worker не найден! Перезагружаем страницу');
    location.reload();
  }
  log('Ожидаем загрузку страницы');
  if (document.querySelector('.error_page')) {
    worker.JSFail();
    log('Такой ставки уже не существует!');
    return;
  }
  await awaiter(() => {
    return document.getElementById(betId[0]);
  }, 20000);

  // if (document.querySelector('c-bet-box')) {
  //   log('c-bet-box не появился');
  //   worker.JSFail();
  //   return;
  // }
  log('Очищаем купон');
  clearCoupon();

  await awaiter(() => getStakeCount() === 0, 1000);
  await getElement('.c-bet-box', 2000);
  log('Ожидаем загрузку коэфа');

  if (getStakeCount() >= 1) {
    log('Ошибка очистки! Есть открытые купоны!');
    worker.JSFail();
    return;
  }

  const currentPeriodBlock = document.getElementById(betId[0]);
  if (!currentPeriodBlock) {
    log('Не нашли блок текущего периода ');
    worker.JSFail();
    return;
  }
  const marketHeaderButtons = [
    ...currentPeriodBlock.querySelectorAll('.bet-title.min'),
  ] as HTMLElement[];
  console.log(marketHeaderButtons);
  for (const button of marketHeaderButtons) {
    button.click();
    await sleep(0);
  }
  await sleep(500);

  const betButton = findButton();
  console.log(betButton);
  if (!betButton) {
    log('Ставка не найдена');
    worker.JSFail();
    return;
  }
  betButton.click();
  updateBalance();
  await getElement('.coupon__content', 1000);
  await getElement('.c-bet-box', 2000);
  log('Ожидаем загрузку коэфа');
  await sleep(500);
  if (getStakeCount() === 1) {
    log('Купон открыт!');
    worker.JSStop();
    return;
  }
  log('Ставка не попала в купон');
  worker.JSFail();
  return;
}
function findButton() {
  let resultButton = null;
  const betId = worker.BetId.split('|');
  const currentPeriodBlock = document.getElementById(betId[0]);
  if (betId[1] !== 'null') {
    const couponButtons = currentPeriodBlock.querySelectorAll(
      `span[data-type="${betId[3]}"]`
    ) as any;
    if (couponButtons) {
      couponButtons.forEach((item: any) => {
        if (item.textContent.includes(betId[1])) {
          log('Нашли нужную кнопку');
          resultButton = item;
          return;
        }
      });
      return resultButton;
    }
    log('Не нашли эту ставку!');
    return;
  }

  resultButton = currentPeriodBlock.querySelector(
    `span[data-type="${betId[3]}"]`
  ) as any;
  return resultButton;
}
