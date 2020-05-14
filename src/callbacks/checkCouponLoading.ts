import { log } from '../logger';

export function checkCouponLoading(): Boolean {
  log('Идет загрузка купона');
  return !Boolean(
    document.querySelector('.c-coupon-modal') ||
      document.querySelector('.swal2-popup')
  );
}
