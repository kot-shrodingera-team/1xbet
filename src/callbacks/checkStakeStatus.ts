import { log } from '../logger';

export function checkStakeStatus() {
  if (document.querySelector('.c-bet-box__overlay')) {
    log('Исход заблокирован');
    return false;
  }
  if (document.querySelector('.c-coupon-modal')) {
    log('Ставка принята');
    return true;
  }
}
