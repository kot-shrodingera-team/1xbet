import { log } from '../logger';
import { updateBalance } from '../initialization';

export function checkStakeStatus() {
  if (document.querySelector('.c-coupon-modal')) {
    log('Ставка принята');
    updateBalance();
    return true;
  }

  if (document.querySelector('.c-bet-box__overlay')) {
    log('Исход заблокирован');
    return false;
  }

  log('Недокументированный статус ставки');
  return false;
}
