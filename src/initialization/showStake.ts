import { log } from '../logger';
import { checkAuth } from './auth';
import { updateBalance } from './balance';
import { getElement, sleep } from '@kot-shrodingera-team/config/util';
import { clearCoupon, getStakeCount } from '../stake-functions';

export async function showStake(): Promise<void> {
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
  await waitLoadPage();

  log('Ожидаем загрузку coupon_content');
  await getElement('.coupon__content', 2000);
  const buttons = document.querySelectorAll('.bet-title');
  log('Очищаем купон');
  clearCoupon();
  await sleep(500);
  if (getStakeCount() >= 1) {
    log('Ошибка очистки! Есть открытые купоны!');
    return;
  }

  for (const button of buttons) {
    await sleep(100);
    (button as HTMLButtonElement).click();
  }

  openCoupon();
  await getElement('.coupon__content', 1000);
  if (getStakeCount() === 1) {
    log('Купон открыт!');
    worker.JSStop();
  }
  return;
}
function openCoupon() {
  const betId = worker.BetId.split('|');
  const couponButton = document.querySelector(
    `span[data-type="${betId[3]}"]`
  ) as HTMLButtonElement;
  if (couponButton) {
    log('Пытаемся открыть купон');
    couponButton.click();
    return;
  } else {
    log('Кнопка открытия купона не найдена, возможно событие закрыто.');
    worker.JSFail();
    return;
  }
}

async function waitLoadPage(): Promise<void> {
  await getElement('.bets_content betsscroll', 3000);
  await getElement('#sports_right', 2000);
}
