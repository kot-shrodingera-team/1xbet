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
  await waitLoadPage();
  log('Ожидаем загрузку coupon_content');
  await getElement('.coupon__content', 3000);
  log('Очищаем купон');
  clearCoupon();
  await sleep(500);
  if (getStakeCount() > 1) {
    log('Ошибка очистки! Купонов больше 1.');
    return;
  }
  openCoupon();
  await getElement('.coupon__content', 1000);
  if (getStakeCount() === 1) {
    log('Купон открыт!');
    worker.JSStop();
  }
  return;
}
async function openCoupon() {
  const betId = worker.BetId.split('|');
  const couponButton = document.querySelector(
    `span[data-type="${betId[3]}"]`
  ) as HTMLButtonElement;
  if (couponButton) {
    log('Пытаемся открыть купон');
    couponButton.click();
  } else {
    log('Кнопка открытия купона не найдена, возможно событие закрыто.');
    worker.JSFail();
  }
}

async function waitLoadPage(): Promise<void> {
  await getElement('#loc_info', 3000);
  await getElement('.games_content', 5000);
  await getElement('#cxl-badge', 5000);
}
