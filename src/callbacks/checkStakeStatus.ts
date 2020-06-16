import { log } from '../logger';
import { updateBalance } from '../initialization';

export function checkStakeStatus() {
  const okButton = document.querySelector(
    'swal2-confirm swal2-styled'
  ) as HTMLButtonElement;
  if (
    document.querySelector('.swal2-title') &&
    document.querySelector('.swal2-title').textContent === 'Ошибка'
  ) {
    log('Ошибка');
    return false;
  }

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
