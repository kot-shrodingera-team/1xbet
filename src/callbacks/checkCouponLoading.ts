import { log } from '../logger';
import { getStakeCount } from '../stake-functions';
import { showStake } from '../initialization';
let loadingCount = 0;
export function checkCouponLoading(): boolean {
  if (getStakeCount() === 0) {
    log('Купон не открыт! ');
    showStake();
    return false;
  }
  if (loadingCount > 200) {
    log('Долгое ожидание загрузки купона');
    return false;
  }
  const succesModal = document.querySelector('.c-coupon-modal');
  const popUp = document.querySelector('.swal2-popup');
  const blockedCoupon = document.querySelector('.c-bet-box__overlay');
  if (succesModal) {
    log('Загрузка окончена ставка успешная');
    return false;
  } else if (popUp) {
    log('Загрузка окончена');
    return false;
  } else if (blockedCoupon) {
    log('Загрузка окончена купон заблокирован');
    return false;
  } else {
    loadingCount++;
    log('Идет загрузка купона');
    return true;
  }
}
