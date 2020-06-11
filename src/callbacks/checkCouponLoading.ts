import { log } from '../logger';

export function checkCouponLoading(): boolean {
  const succesModal = document.querySelector('.c-coupon-modal');
  const popUp = document.querySelector('.swal2-popup');
  const blockedCoupon = document.querySelector('.c-bet-box__overlay');
  if (succesModal) {
    log('Загрузка окончена ставка успешная');
    return !succesModal;
  } else if (popUp) {
    log('Загрузка окончена');
    return !popUp;
  } else if (blockedCoupon) {
    log('Загрузка окончена купон заблокирован');
    return !blockedCoupon;
  } else {
    log('Идет загрузка купона');
    return true;
  }
}
